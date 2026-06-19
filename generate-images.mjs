import { writeFile, mkdir, access } from 'fs/promises'
import { constants } from 'fs'
import path from 'path'

const TOKEN = process.env.REPLICATE_API_TOKEN
if (!TOKEN) {
  console.error('❌ REPLICATE_API_TOKEN manquant. Exécuter : $env:REPLICATE_API_TOKEN="..." avant ce script.')
  process.exit(1)
}

const ENDPOINT = 'https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions'
const OUT_DIR = './public/images'

// Palette froide / clinique — lumière matinale froide, bleus navy et blancs
const IMAGES = [
  {
    name: 'hero.webp',
    aspect_ratio: '16:9',
    prompt: 'Professional cleaning team two women in navy uniforms cleaning a bright modern kitchen, cold morning window light, editorial documentary style, muted navy and white palette, candid, natural imperfections, 35mm film grain, photorealistic, 4K, no plastic look, no CGI, no text, no watermark',
  },
  {
    name: 'service-1.webp',
    aspect_ratio: '4:3',
    prompt: 'Woman cleaning professional vacuuming light hardwood floors in a minimalist white living room, cold diffused overcast light, editorial style, white and pale blue palette, candid, natural imperfections, 35mm film grain, photorealistic, 4K, no plastic look, no CGI, no text, no watermark',
  },
  {
    name: 'service-2.webp',
    aspect_ratio: '4:3',
    prompt: 'Professional cleaner in navy uniform wiping large office windows in modern open-plan office space, cold blue morning light, editorial style, navy and white palette, candid, natural imperfections, 35mm film grain, photorealistic, 4K, no plastic look, no CGI, no text, no watermark',
  },
  {
    name: 'service-3.webp',
    aspect_ratio: '4:3',
    prompt: 'Close up of professional carpet cleaning machine on light beige carpet, steam rising, cold clinical light, editorial product style, blue and cream palette, candid, natural imperfections, 35mm film grain, photorealistic, 4K, no plastic look, no CGI, no text, no watermark',
  },
  {
    name: 'editorial.webp',
    aspect_ratio: '3:2',
    prompt: 'Two professional cleaners in navy uniforms talking and smiling in a clean bright hallway, seen from behind and side angle, cold natural window light, editorial candid style, navy white and grey palette, candid, natural imperfections, 35mm film grain, photorealistic, 4K, no plastic look, no CGI, no text, no watermark',
  },
  {
    name: 'cta.webp',
    aspect_ratio: '16:9',
    prompt: 'Immaculate clean modern living room after professional cleaning, fresh white linen sofa, afternoon cold blue light through large windows, editorial interior style, white silver and light blue palette, candid, natural imperfections, 35mm film grain, photorealistic, 4K, no plastic look, no CGI, no text, no watermark',
  },
]

async function fileExists(p) {
  try { await access(p, constants.F_OK); return true } catch { return false }
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function generate(image, retryCount = 0) {
  const outPath = path.join(OUT_DIR, image.name)
  if (await fileExists(outPath)) {
    console.log(`⏭  ${image.name} déjà présent — ignoré.`)
    return
  }

  const body = JSON.stringify({
    input: {
      prompt: image.prompt,
      aspect_ratio: image.aspect_ratio,
      num_outputs: 1,
      output_format: 'webp',
      output_quality: 90,
      go_fast: true,
      num_inference_steps: 4,
    },
  })

  console.log(`🎨 Génération : ${image.name}…`)
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      Prefer: 'wait',
    },
    body,
  })

  if (res.status === 429) {
    const retryAfter = parseInt(res.headers.get('retry-after') || '12', 10)
    const wait = (retryAfter + 2) * 1000
    console.log(`⏳ Rate-limited. Attente ${retryAfter + 2}s…`)
    await sleep(wait)
    return generate(image, retryCount + 1)
  }

  if (res.status === 402) {
    console.error('❌ Erreur 402 : pas de crédit sur ce compte Replicate. Vérifier le solde sur replicate.com.')
    process.exit(1)
  }

  if (!res.ok) {
    const txt = await res.text()
    console.error(`❌ Erreur ${res.status} pour ${image.name} :`, txt)
    if (retryCount === 0) {
      console.error('Arrêt — première image échouée.')
      process.exit(1)
    }
    return
  }

  const json = await res.json()
  const outputUrl = Array.isArray(json.output) ? json.output[0] : json.output

  if (!outputUrl) {
    console.error('❌ Pas d\'URL dans la réponse :', JSON.stringify(json))
    return
  }

  const imgRes = await fetch(outputUrl)
  const buf = Buffer.from(await imgRes.arrayBuffer())
  await writeFile(outPath, buf)
  console.log(`✅ ${image.name} sauvegardé (${Math.round(buf.length / 1024)} KB)`)
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })

  // Test avec la première image ; arrêt si échec
  await generate(IMAGES[0])

  // Générer les 5 suivantes avec pause de 12s
  for (let i = 1; i < IMAGES.length; i++) {
    await sleep(12000)
    await generate(IMAGES[i])
  }

  console.log('\n🎉 Génération terminée. Vérifier public/images/')
}

main().catch((e) => { console.error(e); process.exit(1) })
