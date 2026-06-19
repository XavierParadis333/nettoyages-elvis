import { useEffect, useRef, useState } from 'react'
import {
  Phone, MapPin, Clock, Star, ChevronRight,
  Home, Building2, Sparkles, ArrowRight, Mail, CheckCircle2,
} from 'lucide-react'

function Img({ src, alt, className = '', eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  const ref = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { if (ref.current?.complete) setLoaded(true) }, [])
  return (
    <img
      ref={ref} src={src} alt={alt}
      className={`${className} ${loaded ? 'loaded' : ''}`}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      onLoad={() => setLoaded(true)}
    />
  )
}

const BTN: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 10,
  padding: '14px 28px', background: 'var(--color-accent)',
  color: '#FFF', textDecoration: 'none', fontWeight: 600,
  fontSize: 14, letterSpacing: '0.08em', borderRadius: 1,
  transition: 'all 0.3s ease', border: 'none', cursor: 'pointer',
}

export default function App() {
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

  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const services = [
    {
      icon: Home, title: 'Nettoyage résidentiel',
      desc: 'Entretien régulier hebdomadaire ou bimensuel, grand ménage saisonnier, nettoyage lors de déménagements.',
      points: ['Cuisine et salles de bain', 'Aspirateur et planchers', 'Fenêtres intérieures'],
      img: '/images/service-1.webp',
    },
    {
      icon: Building2, title: 'Nettoyage commercial',
      desc: 'Bureaux, commerces, cliniques et espaces post-construction ou post-rénovation pris en charge avec rigueur.',
      points: ['Espaces de travail', 'Post-construction', 'Entretien contrat'],
      img: '/images/service-2.webp',
    },
    {
      icon: Sparkles, title: 'Nettoyage spécialisé',
      desc: 'Tapis, matelas, meubles rembourrés (tissu et cuir), lavage de vitres — des soins pour chaque surface.',
      points: ['Tapis & matelas', 'Meubles rembourrés', 'Lavage de vitres'],
      img: '/images/service-3.webp',
    },
  ]

  const stats = [
    { value: '15+', label: "Ans d'expérience" },
    { value: '500+', label: 'Clients satisfaits' },
    { value: '98%', label: 'Taux de satisfaction' },
    { value: '2008', label: 'Fondée à St-Bruno' },
  ]

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <div ref={glowRef} className="cursor-glow" aria-hidden />

      {/* ── NAVBAR ── */}
      <header
        className="navbar"
        style={{
          background: scrolled ? 'rgba(28,43,74,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
        }}
      >
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 20, color: '#FFF', letterSpacing: '-0.02em' }}>
          E.L.V.I.S.
          <span style={{ display: 'block', fontSize: 9, letterSpacing: '0.18em', fontWeight: 400, color: 'var(--color-accent-light)', marginTop: -2 }}>
            NETTOYAGES
          </span>
        </div>

        <nav className="navbar-nav">
          {['Services', 'À propos', 'Contact'].map((l) => (
            <span key={l} style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', cursor: 'pointer', transition: 'color 0.3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
            >{l}</span>
          ))}
        </nav>

        <div className="navbar-right">
          <a href="tel:5144341957" className="navbar-phone">
            <Phone size={14} />(514) 434-1957
          </a>
          <a href="tel:5144341957" style={{ ...BTN, padding: '10px 18px', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#2a6bc5'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-accent)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Soumission
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'var(--color-dark)' }}>
        <div className="img-wrap" style={{ position: 'absolute', inset: 0 }}>
          <Img src="/images/hero.webp" alt="Équipe Nettoyages E.L.V.I.S." eager />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg,rgba(20,33,61,0.90) 0%,rgba(20,33,61,0.55) 60%,rgba(20,33,61,0.30) 100%)' }} />

        <div className="hero-content">
          <div className="label" style={{ color: 'var(--color-accent-light)', marginBottom: 24 }}>
            St-Bruno-de-Montarville — Depuis 2008
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(40px,7vw,88px)', fontWeight: 800, color: '#FFF', letterSpacing: '-0.02em', lineHeight: 1.0, maxWidth: 780, marginBottom: 24 }}>
            La propreté,{' '}
            <span style={{ color: 'var(--color-accent-light)', fontStyle: 'italic', fontWeight: 600 }}>livrée</span>{' '}
            chez vous.
          </h1>
          <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(255,255,255,0.75)', maxWidth: 520, lineHeight: 1.7, marginBottom: 32 }}>
            Services de nettoyage résidentiel et commercial avec soin et discrétion. Votre temps a de la valeur — laissez-nous vous en redonner.
          </p>

          <a href="tel:5144341957" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 'clamp(18px,3vw,22px)', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#FFF', textDecoration: 'none', marginBottom: 32 }}>
            <Phone size={20} style={{ color: 'var(--color-accent-light)' }} />
            (514) 434-1957
          </a>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="tel:5144341957"
              style={{ ...BTN, padding: '14px 28px', fontSize: 14 }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#2a6bc5'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(58,123,213,0.35)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-accent)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              Soumission gratuite <ArrowRight size={16} />
            </a>
            <button
              style={{ padding: '14px 28px', background: 'transparent', color: '#FFF', border: '1px solid rgba(255,255,255,0.35)', fontWeight: 500, fontSize: 14, letterSpacing: '0.08em', cursor: 'pointer', borderRadius: 1, transition: 'all 0.3s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.75)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Nos services
            </button>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: 'var(--color-dark)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={s.value} style={{ padding: '40px 0', textAlign: 'center', borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px,4vw,44px)', fontWeight: 800, color: '#FFF', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 8 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(168,197,232,0.7)', fontWeight: 500 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section-py" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ marginBottom: 56 }}>
            <div className="accent-line" />
            <div className="label" style={{ marginBottom: 16 }}>Ce que nous faisons</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px,4vw,52px)', fontWeight: 800, color: 'var(--color-dark)', letterSpacing: '-0.02em', maxWidth: 480 }}>
              Des services à la hauteur de votre intérieur.
            </h2>
          </div>

          <div className="services-grid">
            {services.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.title} style={{ background: '#FFF', overflow: 'hidden', transition: 'all 0.35s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(28,43,74,0.10)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div className="img-wrap" style={{ height: 220 }}>
                    <Img src={s.img} alt={s.title} />
                  </div>
                  <div style={{ padding: '28px 28px 32px' }}>
                    <div style={{ width: 40, height: 40, background: 'rgba(58,123,213,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, borderRadius: 1 }}>
                      <Icon size={18} color="var(--color-accent)" />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: 'var(--color-dark)', marginBottom: 10, letterSpacing: '-0.01em' }}>
                      {s.title}
                    </h3>
                    <p style={{ fontSize: 15, color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 16 }}>{s.desc}</p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {s.points.map((p) => (
                        <li key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--color-text-muted)' }}>
                          <CheckCircle2 size={13} color="var(--color-accent)" />{p}
                        </li>
                      ))}
                    </ul>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 20, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--color-accent)', cursor: 'pointer' }}>
                      En savoir plus <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── ÉDITORIAL ── */}
      <section className="section-py" style={{ background: '#FFF' }}>
        <div className="container">
          <div className="editorial-grid">
            {/* Image */}
            <div style={{ position: 'relative' }}>
              <div className="img-wrap editorial-img">
                <Img src="/images/editorial.webp" alt="L'équipe Nettoyages E.L.V.I.S." />
              </div>
              <div className="badge-float">
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  {[1,2,3,4,5].map((i) => <Star key={i} size={12} fill="#A8C5E8" color="#A8C5E8" />)}
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800, lineHeight: 1, marginBottom: 4 }}>98%</div>
                <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(168,197,232,0.8)' }}>Satisfaction client</div>
              </div>
            </div>

            {/* Text */}
            <div>
              <div className="accent-line" />
              <div className="label" style={{ marginBottom: 20 }}>Notre histoire</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(26px,3.5vw,48px)', fontWeight: 800, color: 'var(--color-dark)', letterSpacing: '-0.02em', marginBottom: 24, lineHeight: 1.1 }}>
                Plus qu'un nettoyage — une relation de confiance.
              </h2>
              <p style={{ fontSize: 16, color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: 20 }}>
                Depuis 2008, l'équipe E.L.V.I.S. intervient dans les maisons et commerces de la Montérégie avec la même philosophie : un travail irréprochable, un respect total de votre espace et de votre vie privée.
              </p>
              <p style={{ fontSize: 16, color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: 32 }}>
                Nous desservons St-Bruno-de-Montarville et les environs, du lundi au vendredi de 8h à 20h. Chaque intervention est personnalisée selon vos besoins.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
                {[
                  'Équipe formée, assurée et digne de confiance',
                  'Produits professionnels sans odeurs agressives',
                  'Flexibilité horaire — fins de semaine sur entente',
                ].map((p) => (
                  <div key={p} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <CheckCircle2 size={18} color="var(--color-accent)" style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 15, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{p}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                <a href="tel:5144341957"
                  style={{ ...BTN, background: 'var(--color-dark)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-accent)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-dark)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  Nous appeler <Phone size={14} />
                </a>
                <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Lun–Ven, 8h–20h</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-py" style={{ position: 'relative', overflow: 'hidden', background: 'var(--color-dark-alt)' }}>
        <div className="img-wrap" style={{ position: 'absolute', inset: 0 }}>
          <img src="/images/cta.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25 }} loading="lazy" />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(20,33,61,0.92) 0%,rgba(28,43,74,0.80) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 800, margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          <div className="label" style={{ color: 'var(--color-accent-light)', marginBottom: 24, display: 'block' }}>Prêt à commencer ?</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px,5vw,60px)', fontWeight: 800, color: '#FFF', letterSpacing: '-0.02em', marginBottom: 20, lineHeight: 1.05 }}>
            Votre maison mérite le meilleur.
          </h2>
          <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.7, marginBottom: 40 }}>
            Contactez-nous pour une soumission gratuite et sans engagement. Nous nous adaptons à votre horaire.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <a href="tel:5144341957"
              style={{ ...BTN, padding: '16px 32px', fontSize: 16, fontWeight: 700 }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#2a6bc5'; e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(58,123,213,0.40)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-accent)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <Phone size={18} />(514) 434-1957
            </a>
            <a href="https://maps.google.com/?q=50+Rabastalière+Ouest,+St-Bruno-de-Montarville,+QC" target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 32px', background: 'transparent', color: '#FFF', textDecoration: 'none', fontWeight: 500, fontSize: 14, border: '1px solid rgba(255,255,255,0.30)', borderRadius: 1, transition: 'all 0.3s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.70)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.30)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <MapPin size={16} />Nous trouver
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0F1B32', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '64px 0 36px' }}>
        <div className="container">
          <div className="footer-grid">
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 22, color: '#FFF', letterSpacing: '-0.02em', marginBottom: 4 }}>E.L.V.I.S.</div>
              <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(168,197,232,0.7)', marginBottom: 16 }}>Nettoyages</div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.50)', lineHeight: 1.8, maxWidth: 280 }}>
                Votre partenaire de confiance en nettoyage résidentiel et commercial à St-Bruno depuis 2008.
              </p>
            </div>

            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(168,197,232,0.6)', marginBottom: 16, fontWeight: 600 }}>Services</div>
              {['Nettoyage résidentiel', 'Nettoyage commercial', 'Tapis & matelas', 'Meubles rembourrés', 'Lavage de vitres'].map((l) => (
                <div key={l} style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginBottom: 10, cursor: 'pointer', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >{l}</div>
              ))}
            </div>

            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(168,197,232,0.6)', marginBottom: 16, fontWeight: 600 }}>Navigation</div>
              {['Accueil', 'Services', 'À propos', 'Contact', 'Soumission'].map((l) => (
                <div key={l} style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginBottom: 10, cursor: 'pointer', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >{l}</div>
              ))}
            </div>

            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(168,197,232,0.6)', marginBottom: 16, fontWeight: 600 }}>Contact</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href="tel:5144341957" style={{ display: 'flex', gap: 10, alignItems: 'center', color: 'rgba(255,255,255,0.70)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.70)')}
                ><Phone size={14} color="var(--color-accent)" />(514) 434-1957</a>
                <a href="mailto:e.l.v.i.s.-treat-me-nice@hotmail.com" style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'rgba(255,255,255,0.70)', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s', wordBreak: 'break-all' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.70)')}
                ><Mail size={14} color="var(--color-accent)" style={{ marginTop: 2, flexShrink: 0 }} />e.l.v.i.s.-treat-me-nice@hotmail.com</a>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>
                  <MapPin size={14} color="var(--color-accent)" style={{ marginTop: 2, flexShrink: 0 }} />
                  50, Rabastalière Ouest, St-Bruno-de-Montarville, QC J3V 1Y0
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>
                  <Clock size={14} color="var(--color-accent)" />Lun–Ven : 8h–20h
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 28 }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.30)' }}>© 2024 Nettoyages E.L.V.I.S. Inc. — Tous droits réservés.</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>St-Bruno-de-Montarville, QC</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
