'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const GALLERY = [
  { src: '/Haladi/Haladi (3).jpg',             label: 'Haladi' },
  { src: '/Modelling/High Fashions (2).jpg',   label: 'Modelling' },
  { src: '/Modelling/Modernlooks (1).jpg',     label: 'Modelling' },
  { src: '/Prewedding/prewedding (2).JPG',     label: 'Pre Wedding' },
  { src: '/Haladi/Haladi (6).jpg',             label: 'Haladi' },
  { src: '/Modelling/Modernlooks (2).jpg',     label: 'Modelling' },
  { src: '/Modelling/Modernlooks (4).jpg',     label: 'Modelling' },
  { src: '/Prewedding/prewedding (3).jpg',     label: 'Pre Wedding' },
  { src: '/Modelling/Modernlooks (5).jpg',     label: 'Modelling' },
  { src: '/Productshoot/Productshoot (1).jpg', label: 'Product Shoot' },
  { src: '/Modelling/Modernlooks (6).jpg',     label: 'Modelling' },
  { src: '/Productshoot/Productshoot (2).jpg', label: 'Product Shoot' },
  { src: '/Modelling/Modernlooks (8).jpg',     label: 'Modelling' },
  { src: '/Modelling/Modernlooks (10).jpg',    label: 'Modelling' },
  { src: '/Productshoot/Productshoot (3).jpg', label: 'Product Shoot' },
];

const SERVICES = [
  'Marathi Photography','Pre Wedding Photography','Wedding Photography',
  'Baby Shoot','Modelling Shoot','Portfolio','Food Photography','Commercial Shoots',
];

const WA = 'https://wa.me/917975163441';

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [fadeOut, setFadeOut]             = useState(false);
  const [loaded, setLoaded]               = useState<Record<string,boolean>>({});

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 2000);
    const t2 = setTimeout(() => setPreloaderDone(true), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Montserrat:wght@300;400;500;600&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth;-webkit-tap-highlight-color:transparent}
        body{background:#090909;color:#f0ece4;font-family:'Montserrat',sans-serif;overflow-x:hidden}

        /* ── TOGGLE NAV ── */
        .page-toggle{
          position:fixed;top:16px;left:50%;transform:translateX(-50%);
          z-index:1000;display:flex;
          background:rgba(10,10,10,0.85);
          border:1px solid rgba(201,169,110,0.25);
          backdrop-filter:blur(12px);
          border-radius:50px;
          padding:4px;
          gap:4px;
        }
        .toggle-btn{
          padding:8px 20px;border-radius:50px;
          font-family:'Montserrat',sans-serif;font-size:0.65rem;
          letter-spacing:0.15em;text-transform:uppercase;
          text-decoration:none;border:none;cursor:pointer;
          transition:background 0.25s,color 0.25s;
          white-space:nowrap;
        }
        .toggle-btn.active{background:#c9a96e;color:#090909;font-weight:600}
        .toggle-btn.inactive{background:transparent;color:#c9a96e}

        /* ── PRELOADER ── */
        .preloader{
          position:fixed;inset:0;background:#090909;
          display:flex;align-items:center;justify-content:center;
          z-index:9999;transition:opacity 0.8s ease;
        }
        .preloader.fade{opacity:0;pointer-events:none}
        .pre-logo{width:140px;height:auto;animation:pulse 1.6s ease-in-out infinite}
        @keyframes pulse{0%,100%{opacity:0.6;transform:scale(1)}50%{opacity:1;transform:scale(1.06)}}

        /* ── HERO ── */
        .hero{position:relative;width:100vw;height:100svh;overflow:hidden;background:#111}
        .hero-slide{
          position:absolute;inset:0;
          background-size:cover;background-position:center;
          opacity:0;transition:opacity 1.2s ease;
        }
        .hero-slide.on{opacity:1}
        .hero-overlay{
          position:absolute;inset:0;
          background:linear-gradient(to bottom,rgba(9,9,9,0.2) 0%,rgba(9,9,9,0.1) 40%,rgba(9,9,9,0.75) 100%);
          display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;
          padding:0 1rem;
        }
        .hero-eye{font-size:0.6rem;letter-spacing:0.5em;text-transform:uppercase;color:#c9a96e}
        .hero-h1{
          font-family:'Cormorant Garamond',serif;
          font-size:clamp(2.8rem,10vw,7rem);font-weight:300;
          letter-spacing:0.08em;color:#f5f0e8;text-align:center;
          text-shadow:0 4px 60px rgba(0,0,0,0.5);
        }
        .hero-sub{font-size:clamp(0.6rem,2.5vw,0.8rem);letter-spacing:0.3em;text-transform:uppercase;color:#c9a96e}
        .hero-cta{
          margin-top:1rem;
          display:inline-flex;align-items:center;gap:8px;
          border:1px solid rgba(201,169,110,0.6);
          color:#c9a96e;padding:10px 24px;
          font-family:'Montserrat',sans-serif;font-size:0.65rem;
          letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;
          transition:background 0.25s,color 0.25s;
        }
        .hero-cta:hover{background:#c9a96e;color:#090909}
        .dots{
          position:absolute;bottom:1.5rem;left:50%;transform:translateX(-50%);
          display:flex;gap:6px;
        }
        .dot{width:5px;height:5px;border-radius:50%;background:rgba(201,169,110,0.3);cursor:pointer;transition:background 0.3s,transform 0.3s}
        .dot.on{background:#c9a96e;transform:scale(1.5)}

        /* ── SHARED TYPOGRAPHY ── */
        .eyebrow{font-size:0.6rem;letter-spacing:0.45em;text-transform:uppercase;color:#c9a96e;margin-bottom:0.5rem}
        .sec-title{font-family:'Cormorant Garamond',serif;font-size:clamp(1.8rem,5vw,3rem);font-weight:300;line-height:1.15}
        .gold-line{width:45px;height:1px;background:#c9a96e;margin-top:1rem}

        /* ── GALLERY HERO (opening section) ── */
        .gallery-hero{
          position:relative;
          padding-top:0;background:#090909;
        }
        /* Brand header floats over first row */
        .brand-bar{
          position:relative;z-index:2;
          display:flex;flex-direction:column;align-items:center;
          padding:5.5rem 1rem 2rem;
          background:linear-gradient(to bottom,rgba(9,9,9,0.95) 0%,rgba(9,9,9,0.6) 60%,transparent 100%);
          pointer-events:none;
        }
        .brand-eye{font-size:0.6rem;letter-spacing:0.5em;text-transform:uppercase;color:#c9a96e;margin-bottom:0.5rem}
        .brand-h1{
          font-family:'Cormorant Garamond',serif;
          font-size:clamp(2.8rem,9vw,6.5rem);font-weight:300;
          letter-spacing:0.08em;color:#f5f0e8;text-align:center;
          text-shadow:0 2px 40px rgba(0,0,0,0.8);
        }
        .brand-sub{font-size:clamp(0.6rem,2vw,0.75rem);letter-spacing:0.35em;text-transform:uppercase;color:#c9a96e;margin-top:4px}
        .brand-bar-wa{
          pointer-events:all;
          margin-top:1.25rem;
          display:inline-flex;align-items:center;gap:8px;
          border:1px solid rgba(201,169,110,0.55);color:#c9a96e;
          padding:9px 22px;font-family:'Montserrat',sans-serif;
          font-size:0.62rem;letter-spacing:0.15em;text-transform:uppercase;
          text-decoration:none;transition:background 0.25s,color 0.25s;
        }
        .brand-bar-wa:hover{background:#c9a96e;color:#090909}

        /* Masonry grid */
        .masonry{max-width:1400px;margin:0 auto;padding:0 8px 8px;columns:3;column-gap:8px}
        .m-item{break-inside:avoid;margin-bottom:8px;position:relative;overflow:hidden;background:#111;cursor:pointer}
        .m-item img{width:100%;display:block;opacity:0;transition:opacity 0.45s ease,transform 0.5s ease}
        .m-item img.vis{opacity:1}
        .m-item:hover img{transform:scale(1.04)}
        .m-cap{
          position:absolute;bottom:0;left:0;right:0;
          background:linear-gradient(transparent,rgba(0,0,0,0.65));
          padding:1.5rem 0.75rem 0.55rem;
          font-size:0.55rem;letter-spacing:0.22em;text-transform:uppercase;
          color:rgba(201,169,110,0.9);opacity:0;transition:opacity 0.3s;
        }
        .m-item:hover .m-cap{opacity:1}
        @media(max-width:700px){.masonry{columns:2}}
        @media(max-width:380px){.masonry{columns:1}}

        /* ── ABOUT ── */
        .about-wrap{padding:4rem 1.25rem;max-width:1100px;margin:0 auto}
        .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
        @media(max-width:720px){.about-grid{grid-template-columns:1fr;gap:2rem}}
        .about-body{font-size:0.9rem;line-height:2;color:#9e9890;font-weight:300;margin-top:0.5rem}
        .stat{border-left:2px solid rgba(201,169,110,0.3);padding-left:1rem;margin-bottom:1.5rem}
        .stat-n{font-family:'Cormorant Garamond',serif;font-size:2.5rem;font-weight:300;color:#c9a96e;line-height:1}
        .stat-l{font-size:0.6rem;letter-spacing:0.3em;text-transform:uppercase;color:#5a5550;margin-top:3px}

        /* ── SERVICES ── */
        .svc-sec{background:#0e0e0e;padding:4rem 1.25rem}
        .svc-inner{max-width:1200px;margin:0 auto}
        .svc-grid{
          display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
          gap:1px;background:rgba(201,169,110,0.08);
          border:1px solid rgba(201,169,110,0.08);margin-top:2.5rem;
        }
        .svc-card{
          background:#0a0a0a;padding:1.5rem 1.25rem;
          display:flex;flex-direction:column;gap:1rem;
          position:relative;transition:background 0.3s;
        }
        .svc-card::after{
          content:'';position:absolute;bottom:0;left:0;right:0;height:2px;
          background:linear-gradient(90deg,transparent,#c9a96e,transparent);
          transform:scaleX(0);transform-origin:center;transition:transform 0.4s;
        }
        .svc-card:hover{background:#0d0d0d}
        .svc-card:hover::after{transform:scaleX(1)}
        .svc-num{font-family:'Cormorant Garamond',serif;font-size:0.7rem;color:rgba(201,169,110,0.3)}
        .svc-name{font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:600;color:#f0ece4;flex:1}
        .wa-btn{
          display:inline-flex;align-items:center;gap:6px;
          border:1px solid rgba(201,169,110,0.4);background:transparent;color:#c9a96e;
          padding:8px 14px;font-family:'Montserrat',sans-serif;
          font-size:0.6rem;letter-spacing:0.12em;text-transform:uppercase;
          text-decoration:none;transition:background 0.25s,color 0.25s;
          align-self:flex-start;cursor:pointer;
        }
        .wa-btn:hover{background:#c9a96e;color:#0a0a0a}
        .cinfo{font-size:0.6rem;color:#4a4540;letter-spacing:0.04em}

        /* ── FOOTER ── */
        .footer{background:#060606;border-top:1px solid rgba(201,169,110,0.1);padding:2.5rem 1rem;text-align:center}
        .foot-logo{width:70px;margin:0 auto 0.75rem;opacity:0.55}
        .foot-txt{font-size:0.65rem;color:#3a3530;letter-spacing:0.1em}

        @media(max-width:500px){.svc-grid{grid-template-columns:1fr 1fr}}
        @media(max-width:360px){.svc-grid{grid-template-columns:1fr}}
      `}</style>

      {/* PRELOADER */}
      {!preloaderDone && (
        <div className={`preloader${fadeOut?' fade':''}`}>
          <img src="/logo.png" alt="Clicky Clicks" className="pre-logo" />
        </div>
      )}

      {/* TOGGLE NAV */}
      <nav className="page-toggle">
        <span className="toggle-btn active">📷 Clicky Clicks</span>
        <Link href="/rentals" className="toggle-btn inactive">🎥 Rentals</Link>
      </nav>

      {/* GALLERY — opens the page, brand floats on top */}
      <section className="gallery-hero">
        <div className="brand-bar">
          <p className="brand-eye">Bangalore&apos;s Finest</p>
          <h1 className="brand-h1">Clicky Clicks</h1>
          <p className="brand-sub">Photography &amp; Rentals · Bangalore</p>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="brand-bar-wa">
            💬 Book a Session
          </a>
        </div>

        <div className="masonry">
          {GALLERY.map(({src,label}) => (
            <div key={src} className="m-item">
              <img
                src={encodeURI(src)}
                alt={label}
                loading="lazy"
                className={loaded[src]?'vis':''}
                onLoad={()=>setLoaded(p=>({...p,[src]:true}))}
              />
              <div className="m-cap">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <div className="about-wrap">
        <div className="about-grid">
          <div>
            <p className="eyebrow">Who We Are</p>
            <h2 className="sec-title" style={{marginTop:'0.5rem'}}>About Clicky Clicks<br/>Photography</h2>
            <div className="gold-line" style={{marginBottom:'1.5rem'}} />
            <p className="about-body">
              We are one of the best photography and rental services in Bangalore.
              We specialize in wedding, pre-wedding, baby shoots, modelling, portfolio,
              food and commercial photography with high-end professional equipment.
            </p>
          </div>
          <div>
            {[{n:'500+',l:'Projects Completed'},{n:'8+',l:'Photography Genres'},{n:'100%',l:'Client Satisfaction'}].map(({n,l})=>(
              <div key={l} className="stat">
                <div className="stat-n">{n}</div>
                <div className="stat-l">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div className="svc-sec">
        <div className="svc-inner">
          <p className="eyebrow">What We Offer</p>
          <h2 className="sec-title">Our Services</h2>
          <div className="svc-grid">
            {SERVICES.map((s,i)=>(
              <div key={s} className="svc-card">
                <div className="svc-num">0{i+1}</div>
                <div className="svc-name">{s}</div>
                <a href={WA} target="_blank" rel="noopener noreferrer" className="wa-btn">💬 WhatsApp</a>
                <div className="cinfo">Vedanth Koushik · 7975163441</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <img src="/logo.png" alt="Clicky Clicks" className="foot-logo" />
        <p className="foot-txt">© {new Date().getFullYear()} Clicky Clicks Photography · Bangalore</p>
      </footer>
    </>
  );
}
