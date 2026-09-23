import { useEffect, useRef } from 'react'
import { useLang } from '../i18n'
import { LEGAL } from '../legal'

const H2 = {
  fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:18,
  color:'#f0ede6', margin:'40px 0 12px', letterSpacing:'-0.01em',
}
const P = {
  fontFamily:'Inter,sans-serif', fontSize:15,
  color:'rgba(240,237,230,0.6)', lineHeight:1.8, margin:'0 0 14px',
}

export default function LegalPage({ page, onClose }) {
  const { lang } = useLang()
  const t = LEGAL[lang]
  const doc = t[page]
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0)
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [page, onClose])

  return (
    <div
      ref={scrollRef}
      role="dialog" aria-modal="true" aria-labelledby="legal-title"
      data-lenis-prevent
      style={{
        position:'fixed', inset:0, zIndex:2000,
        background:'#080808', overflowY:'auto',
        padding:'clamp(24px,5vw,64px) clamp(20px,5vw,80px) 80px',
      }}
    >
      <article style={{ maxWidth:760, margin:'0 auto' }}>
        <button onClick={onClose} style={{
          background:'none', border:'none', cursor:'pointer', padding:0,
          fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:14,
          color:'#5ed29c', marginBottom:48,
        }}>{t.back}</button>

        <h1 id="legal-title" style={{
          fontFamily:'Inter,sans-serif', fontWeight:900,
          fontSize:'clamp(32px,5vw,52px)', color:'#f0ede6',
          letterSpacing:'-0.02em', lineHeight:1.1, margin:'0 0 12px',
        }}>{doc.title}</h1>
        <p style={{ ...P, fontSize:13, color:'rgba(240,237,230,0.35)', margin:0 }}>
          {t.updatedLabel}: {doc.updated}
        </p>

        {doc.sections.map(({ h, body }) => (
          <section key={h}>
            <h2 style={H2}>{h}</h2>
            {body.map((item, i) => item.list ? (
              <ul key={i} style={{ ...P, paddingLeft:20 }}>
                {item.list.map(li => <li key={li} style={{ marginBottom:10 }}>{li}</li>)}
              </ul>
            ) : (
              <p key={i} style={P}>{item}</p>
            ))}
          </section>
        ))}

        {doc.notice && (
          <p style={{
            ...P, fontSize:13, marginTop:48, padding:'20px 24px',
            border:'1px solid rgba(94,210,156,0.2)', borderRadius:12,
            background:'rgba(94,210,156,0.04)', color:'rgba(240,237,230,0.55)',
          }}>{doc.notice}</p>
        )}
      </article>
    </div>
  )
}
