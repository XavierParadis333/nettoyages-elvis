import { useEffect, useRef, useState } from 'react'
import {
  Phone,
  MapPin,
  Clock,
  Star,
  ChevronRight,
  Home,
  Building2,
  Sparkles,
  ArrowRight,
  Mail,
  CheckCircle2,
} from 'lucide-react'

/* ─── Image loader helper ─── */
function Img({
  src,
  alt,
  className = '',
  eager = false,
}: {
  src: string
  alt: string
  className?: string
  eager?: boolean
}) {
  const ref = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true)
  }, [])

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={`${className} ${loaded ? 'loaded' : ''}`}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      onLoad={() => setLoaded(true)}
    />
  )
}

export default function App() {
  /* Cursor glow */
  const glowRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px'
        glowRef.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  /* Navbar scroll */
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const services = [
    {
      icon: Home,
      title: 'Nettoyage résidentiel',
      desc: 'Entretien régulier hebdomadaire ou bimensuel, grand ménage saisonnier, nettoyage lors de déménagements.',
      points: ['Cuisine et salles de bain', 'Aspirateur et planchers', 'Fenêtres intérieures'],
      img: '/images/service-1.webp',
    },
    {
      icon: Building2,
      title: 'Nettoyage commercial',
      desc: 'Bureaux, commerces, cliniques et espaces post-construction ou post-rénovation pris en charge avec rigueur.',
      points: ['Espaces de travail', 'Post-construction', 'Entretien contrat'],
      img: '/images/service-2.webp',
    },
    {
      icon: Sparkles,
      title: 'Nettoyage spécialisé',
      desc: 'Tapis, matelas, meubles rembourrés (tissu et cuir), lavage de vitres — des soins pour chaque surface.',
      points: ['Tapis & matelas', 'Meubles rembourrés', 'Lavage de vitres'],
      img: '/images/service-3.webp',
    },
  ]

  const stats = [
    { value: '15+', label: 'Ans d\'expérience' },
    { value: '500+', label: 'Clients satisfaits' },
    { value: '98%', label: 'Taux de satisfaction' },
    { value: '2008', label: 'Fondée à St-Bruno' },
  ]

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      {/* Cursor glow */}
      <div ref={glowRef} className="cursor-glow" aria-hidden />

      {/* ── NAVBAR ── */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '0 40px',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(28,43,74,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '20px', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
          E.L.V.I.S.
          <span style={{ display: 'block', fontSize: '9px', letterSpacing: '0.18em', fontWeight: 400, color: 'var(--color-accent-light)', marginTop: '-2px' }}>
            NETTOYAGES
          </span>
        </div>

        {/* Nav links — visual decorators */}
        <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {['Services', 'À propos', 'Contact'].map((l) => (
            <span
              key={l}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.65)',
                cursor: 'pointer',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
            >
              {l}
            </span>
          ))}
        </nav>

        {/* Right — phone + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <a
            href="tel:5144341957"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}
          >
            <Phone size={14} />
            (514) 434-1957
          </a>
          <a
            href="tel:5144341957"
            style={{
              padding: '10px 20px',
              background: 'var(--color-accent)',
              color: '#FFFFFF',
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontWeight: 600,
              textDecoration: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              borderRadius: '1px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#2a6bc5'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-accent)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Soumission gratuite
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background: 'var(--color-dark)',
        }}
      >
        {/* Background image */}
        <div className="img-wrap" style={{ position: 'absolute', inset: 0 }}>
          <Img src="/images/hero.webp" alt="Équipe Nettoyages E.L.V.I.S." eager className="w-full h-full object-cover" />
        </div>
        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(20,33,61,0.90) 0%, rgba(20,33,61,0.55) 60%, rgba(20,33,61,0.30) 100%)' }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', padding: '0 40px', paddingTop: '120px' }}>
          <div className="label" style={{ color: 'var(--color-accent-light)', marginBottom: '24px' }}>
            St-Bruno-de-Montarville — Depuis 2008
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(52px, 7vw, 88px)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              lineHeight: 1.0,
              maxWidth: '780px',
              marginBottom: '28px',
            }}
          >
            La propreté,{' '}
            <span style={{ color: 'var(--color-accent-light)', fontStyle: 'italic', fontWeight: 600 }}>
              livrée
            </span>{' '}
            chez vous.
          </h1>
          <p
            style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.75)',
              maxWidth: '520px',
              lineHeight: 1.7,
              marginBottom: '40px',
            }}
          >
            Services de nettoyage résidentiel et commercial avec soin et discrétion. Votre temps a de la valeur — laissez-nous vous en redonner.
          </p>

          {/* Phone prominent */}
          <a
            href="tel:5144341957"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '22px',
              fontWeight: 700,
              fontFamily: 'var(--font-heading)',
              color: '#FFFFFF',
              textDecoration: 'none',
              marginBottom: '40px',
            }}
          >
            <Phone size={20} style={{ color: 'var(--color-accent-light)' }} />
            (514) 434-1957
          </a>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="tel:5144341957"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 32px',
                background: 'var(--color-accent)',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '14px',
                letterSpacing: '0.08em',
                borderRadius: '1px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2a6bc5'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(58,123,213,0.35)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-accent)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Soumission gratuite <ArrowRight size={16} />
            </a>
            <button
              style={{
                padding: '16px 32px',
                background: 'transparent',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.35)',
                fontWeight: 500,
                fontSize: '14px',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                borderRadius: '1px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.75)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Nos services
            </button>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section
        style={{
          background: 'var(--color-dark)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.value}
              style={{
                padding: '48px 0',
                textAlign: 'center',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '44px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  marginBottom: '8px',
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(168,197,232,0.7)', fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ background: 'var(--color-bg)', padding: 'var(--section-py) 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          {/* Header */}
          <div style={{ marginBottom: '72px' }}>
            <div className="accent-line" />
            <div className="label" style={{ marginBottom: '16px' }}>Ce que nous faisons</div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(36px, 4vw, 52px)',
                fontWeight: 800,
                color: 'var(--color-dark)',
                letterSpacing: '-0.02em',
                maxWidth: '480px',
              }}
            >
              Des services à la hauteur de votre intérieur.
            </h2>
          </div>

          {/* Cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
            {services.map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.title}
                  style={{
                    background: '#FFFFFF',
                    overflow: 'hidden',
                    transition: 'all 0.35s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)'
                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(28,43,74,0.10)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Image */}
                  <div className="img-wrap" style={{ height: '240px' }}>
                    <Img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                  </div>
                  {/* Content */}
                  <div style={{ padding: '32px' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        background: 'rgba(58,123,213,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                        borderRadius: '1px',
                      }}
                    >
                      <Icon size={18} color="var(--color-accent)" />
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '20px',
                        fontWeight: 700,
                        color: 'var(--color-dark)',
                        marginBottom: '12px',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {s.title}
                    </h3>
                    <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '20px' }}>
                      {s.desc}
                    </p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {s.points.map((p) => (
                        <li key={p} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-text-muted)' }}>
                          <CheckCircle2 size={13} color="var(--color-accent)" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginTop: '24px',
                        fontSize: '12px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        color: 'var(--color-accent)',
                        cursor: 'pointer',
                      }}
                    >
                      En savoir plus <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── ÉDITORIAL — À PROPOS ── */}
      <section style={{ background: '#FFFFFF', padding: 'var(--section-py) 0' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 40px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
          }}
        >
          {/* Image side */}
          <div style={{ position: 'relative' }}>
            <div className="img-wrap" style={{ height: '560px' }}>
              <Img src="/images/editorial.webp" alt="L'équipe Nettoyages E.L.V.I.S." className="w-full h-full object-cover" />
            </div>
            {/* Badge flottant */}
            <div
              style={{
                position: 'absolute',
                bottom: '-24px',
                right: '-24px',
                background: 'var(--color-dark)',
                color: '#FFFFFF',
                padding: '28px 32px',
                boxShadow: '0 8px 40px rgba(28,43,74,0.25)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                {[1,2,3,4,5].map((i) => <Star key={i} size={12} fill="#A8C5E8" color="#A8C5E8" />)}
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 800, lineHeight: 1, marginBottom: '4px' }}>
                98%
              </div>
              <div style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(168,197,232,0.8)' }}>
                Satisfaction client
              </div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <div className="accent-line" />
            <div className="label" style={{ marginBottom: '20px' }}>Notre histoire</div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(32px, 3.5vw, 48px)',
                fontWeight: 800,
                color: 'var(--color-dark)',
                letterSpacing: '-0.02em',
                marginBottom: '28px',
                lineHeight: 1.1,
              }}
            >
              Plus qu'un nettoyage — une relation de confiance.
            </h2>
            <p style={{ fontSize: '17px', color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: '24px' }}>
              Depuis 2008, l'équipe E.L.V.I.S. intervient dans les maisons et commerces de la Montérégie avec la même philosophie : un travail irréprochable, un respect total de votre espace et de votre vie privée.
            </p>
            <p style={{ fontSize: '17px', color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: '40px' }}>
              Nous desservons St-Bruno-de-Montarville et les environs, du lundi au vendredi de 8h à 20h. Chaque intervention est personnalisée selon vos besoins, votre fréquence et votre budget.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
              {[
                'Équipe formée, assurée et digne de confiance',
                'Produits professionnels sans odeurs agressives',
                'Flexibilité horaire — semaine et fins de semaine sur entente',
              ].map((p) => (
                <div key={p} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={18} color="var(--color-accent)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{p}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <a
                href="tel:5144341957"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 28px',
                  background: 'var(--color-dark)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '13px',
                  letterSpacing: '0.08em',
                  borderRadius: '1px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-accent)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--color-dark)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                Nous appeler <Phone size={14} />
              </a>
              <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                Lun–Ven, 8h–20h
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position: 'relative', padding: 'var(--section-py) 0', overflow: 'hidden', background: 'var(--color-dark-alt)' }}>
        {/* Background image */}
        <div className="img-wrap" style={{ position: 'absolute', inset: 0 }}>
          <img src="/images/cta.webp" alt="Nettoyage professionnel" className="w-full h-full object-cover" style={{ opacity: 0.25, width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(20,33,61,0.92) 0%, rgba(28,43,74,0.80) 100%)' }} />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 40px',
            textAlign: 'center',
          }}
        >
          <div className="label" style={{ color: 'var(--color-accent-light)', marginBottom: '24px', display: 'block' }}>
            Prêt à commencer ?
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              marginBottom: '24px',
              lineHeight: 1.05,
            }}
          >
            Votre maison mérite le meilleur.
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.70)', lineHeight: 1.7, marginBottom: '48px' }}>
            Contactez-nous pour une soumission gratuite et sans engagement. Nous nous adaptons à votre horaire.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="tel:5144341957"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '18px 40px',
                background: 'var(--color-accent)',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '16px',
                borderRadius: '1px',
                transition: 'all 0.35s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2a6bc5'
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(58,123,213,0.40)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-accent)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <Phone size={18} />
              (514) 434-1957
            </a>
            <a
              href="https://maps.google.com/?q=50+Rabastalière+Ouest,+St-Bruno-de-Montarville,+QC"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '18px 40px',
                background: 'transparent',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '14px',
                border: '1px solid rgba(255,255,255,0.30)',
                borderRadius: '1px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.70)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.30)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <MapPin size={16} />
              Nous trouver
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0F1B32', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '72px 0 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '48px', marginBottom: '56px' }}>
            {/* Brand */}
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '22px', color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '4px' }}>
                E.L.V.I.S.
              </div>
              <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(168,197,232,0.7)', marginBottom: '20px' }}>
                Nettoyages
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.50)', lineHeight: 1.8, maxWidth: '280px' }}>
                Votre partenaire de confiance en nettoyage résidentiel et commercial à St-Bruno-de-Montarville depuis 2008.
              </p>
            </div>

            {/* Services */}
            <div>
              <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(168,197,232,0.6)', marginBottom: '20px', fontWeight: 600 }}>
                Services
              </div>
              {['Nettoyage résidentiel', 'Nettoyage commercial', 'Tapis & matelas', 'Meubles rembourrés', 'Lavage de vitres'].map((l) => (
                <div key={l} style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', marginBottom: '10px', cursor: 'pointer', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >
                  {l}
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div>
              <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(168,197,232,0.6)', marginBottom: '20px', fontWeight: 600 }}>
                Navigation
              </div>
              {['Accueil', 'Services', 'À propos', 'Contact', 'Soumission'].map((l) => (
                <div key={l} style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', marginBottom: '10px', cursor: 'pointer', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >
                  {l}
                </div>
              ))}
            </div>

            {/* Contact */}
            <div>
              <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(168,197,232,0.6)', marginBottom: '20px', fontWeight: 600 }}>
                Contact
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <a href="tel:5144341957" style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'rgba(255,255,255,0.70)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.70)')}
                >
                  <Phone size={14} color="var(--color-accent)" />
                  (514) 434-1957
                </a>
                <a href="mailto:e.l.v.i.s.-treat-me-nice@hotmail.com" style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'rgba(255,255,255,0.70)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s', wordBreak: 'break-all' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.70)')}
                >
                  <Mail size={14} color="var(--color-accent)" />
                  e.l.v.i.s.-treat-me-nice@hotmail.com
                </a>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', color: 'rgba(255,255,255,0.55)', fontSize: '14px' }}>
                  <MapPin size={14} color="var(--color-accent)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  50, Rabastalière Ouest, St-Bruno-de-Montarville, QC J3V 1Y0
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'rgba(255,255,255,0.55)', fontSize: '14px' }}>
                  <Clock size={14} color="var(--color-accent)" />
                  Lun–Ven : 8h–20h
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.06)',
              paddingTop: '32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.30)' }}>
              © 2024 Nettoyages E.L.V.I.S. Inc. — Tous droits réservés.
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>
              St-Bruno-de-Montarville, QC
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
