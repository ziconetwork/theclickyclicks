'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// ── Exact filenames visible in the screenshot ─────────────────────────────────
const PRODUCTS = [
  // Cameras
  { name: 'Sony FX3 Cinema Camera',          img: '/Rentals/sony-fx3-full-frame-cinema-camera (1).jpg' },
  { name: 'Sony FX6 Cinema Camera',          img: '/Rentals/sony-fx6-full-frame-cinema-camera.jpg' },
  { name: 'Sony FX9 XDCAM Camera',           img: '/Rentals/sony-pxw-fx9-xdcam-6k-full-frame-camera.jpg' },
  { name: 'Sony A7 III',                     img: '/Rentals/sony-a7-iii-e-mount.png' },
  { name: 'Sony A7 IV',                      img: '/Rentals/sony--a7-iv-e-mount.jpg' },
  { name: 'Sony A7R IV',                     img: '/Rentals/sony-a7r-iv-e-mount.jpg' },
  { name: 'Sony A7R V',                      img: '/Rentals/sony-a7r-v-camera-e-mount.jpg' },
  { name: 'Sony A7S III',                    img: '/Rentals/sony-a7s-iii-e-mount.jpg' },
  { name: 'Canon EOS R5',                    img: '/Rentals/canon-eos-r5-mirrorless-digital-camera.jpg' },
  { name: 'Canon EOS R5 Mark II',            img: '/Rentals/canon-eos--r5-mark-ii-camera.jpg' },
  { name: 'Canon EOS R6',                    img: '/Rentals/canon-eos-r6-mirrorless-digital-camera.jpg' },
  { name: 'Canon EOS R6 Mark II',            img: '/Rentals/canon-eos-r6-mark-ii camera.jpg' },
  { name: 'Canon 5D Mark IV with 24-70mm',   img: '/Rentals/canon-5d-mark-iv-with-24-70mm-lens.jpg' },
  { name: 'GoPro Hero 11',                   img: '/Rentals/gopro-hero-11.jpg' },
  { name: 'GoPro Hero 13 Black',             img: '/Rentals/gopro-hero-13-black.jpg' },
  { name: 'Insta 360 X3 Camera',             img: '/Rentals/insta-360x3-camera.jpg' },
  // Sony Lenses
  { name: 'Sony FE 14mm F1.8 GM',            img: '/Rentals/sony-fe-14mm-f1.8-gm-lens.jpg' },
  { name: 'Sony FE 24mm F1.4 GM',            img: '/Rentals/sony-fe-24mm-f1.4-gm-lens.jpg' },
  { name: 'Sony FE 35mm F1.4 GM',            img: '/Rentals/sony-fe-35mm--f1.4-gm-lens.jpg' },
  { name: 'Sony FE 50mm F1.2 GM',            img: '/Rentals/sony-fe-50mm--f1.2-gm-lens.jpg' },
  { name: 'Sony FE 50mm F1.8',               img: '/Rentals/sony-fe-50mm-f1.8-lens.jpg' },
  { name: 'Sony FE 85mm F1.4 GM',            img: '/Rentals/sony-fe-85mm-f1.4-gm-lens.jpg' },
  { name: 'Sony FE 90mm Macro F2.8 G OSS',   img: '/Rentals/sony-fe-90mm-macro-f2.8-g-oss-lens.jpg' },
  { name: 'Sony FE 100mm F2.8 STF GM OSS',   img: '/Rentals/sony-fe-100mm-f2.8-stf-gm-oss-lens.jpg' },
  { name: 'Sony FE 135mm F1.8 GM (1)',        img: '/Rentals/sony-fe-135mm-f1.8-gm-lens (1).jpg' },
  { name: 'Sony FE 135mm F1.8 GM',           img: '/Rentals/sony-fe-135mm-f1.8-gm-lens.jpg' },
  { name: 'Sony FE 200-600mm F5.6-6.3 G OSS',img: '/Rentals/sony-fe-200-600mm-f5.6-6.3-g-oss-lens.jpg' },
  { name: 'Sony FE 100-400mm F4.5-5.6 GM',   img: '/Rentals/sony-fe-100-400mm-f4.5-5.6-gm-oss-lens.jpg' },
  { name: 'Sony FE 12-24mm F2.8 GM',         img: '/Rentals/sony-fe-12-24mm-f2.8-gm-lens.jpg' },
  { name: 'Sony FE 12-24mm F4 G',            img: '/Rentals/sony-fe-12-24mm-f4-g-lens.jpg' },
  { name: 'Sony FE 16-35mm F2.8 GM',         img: '/Rentals/sony-fe-16-35mm-f2.8-gm-lens.jpg' },
  { name: 'Sony FE 24-70mm F2.8 GM',         img: '/Rentals/sony-fe-24-70mm-f2.8-gm-lens.jpg' },
  { name: 'Sony FE 70-200mm F2.8 GM',        img: '/Rentals/sony-fe-70-200mm-f2.8-gm-lens.jpg' },
  // Canon Lenses
  { name: 'Canon RF 15-35mm F2.8L IS',       img: '/Rentals/canon-rf-15-35mm-f2.8l-is-lens.jpg' },
  { name: 'Canon RF 24-70mm F2.8L IS',       img: '/Rentals/canon-rf-24-70mm-f2.8l-is-lens.jpg' },
  { name: 'Canon RF 24-105mm F4L IS',        img: '/Rentals/canon-rf-24-105mm-f4l-is-lens.jpg' },
  { name: 'Canon RF 35mm F1.8 Macro IS STM', img: '/Rentals/canon-rf-35mm-f1.8-macro-is-stm-lens.jpg' },
  { name: 'Canon RF 50mm F1.2',              img: '/Rentals/canon-rf-50mm-1.2.jpg' },
  { name: 'Canon RF 50mm F1.8 STM',          img: '/Rentals/canon-rf-50mm-f1.8-stm-lens.jpg' },
  { name: 'Canon RF 70-200mm F2.8L IS',      img: '/Rentals/canon-rf-70-200mm-f2.8l-is-lens.jpg' },
  { name: 'Canon RF 85mm F1.2 L USM',        img: '/Rentals/canon-rf-85mm-f-1.2-l-usm-lens.jpg' },
  { name: 'Canon RF 85mm F2 Macro IS STM',   img: '/Rentals/canon-rf-85mm-f2-macro-is-stm-lens.jpg' },
  { name: 'Canon RF 100mm F2.8L Macro IS',   img: '/Rentals/canon-rf-100mm-f2.8-l-macro-is-usm-lens.jpg' },
];

// Extra products without known images (show placeholder card)
const EXTRA_PRODUCTS = [
  'Sony FX2','Sony A7V','Sony FE 50mm F1.4 GM','Sony FE 85mm F1.8',
  'Sony 28-135mm FE F4 G OSS','Sony FE 24-105mm F4 G OSS',
  'Sony FE 24-70mm F2.8 GM II','Sony FE 70-200mm F2.8 GM II',
  'Canon RF 35mm F1.4','Canon RF 85mm F1.4','Canon RF 28-70mm',
  'Nikon ZR Camera with Adapter','Sony 28-70mm Lens','Sony 50-150mm F2',
  'Aputure INFINIBAR PB12 RGB 8-Light Kit','Aputure XT26 Light',
  'Aputure Nova P600c RGBWW Panel','Aputure Nova P300C RGBWW Light',
  'Aputure LS 1200X Pro','Aputure LS 1200d Pro','Aputure LS 600C Pro RGB',
  'Aputure LS 600x Pro','Aputure LS 600d Pro','Aputure LS 300X Bi-Color',
  'Aputure LS 300D II','Aputure LS 120D II','Aputure Amaron F22C RGBWW',
  'Aputure MC Pro 8-Light Kit','Amaron PT2C 2ft RGB Tube','Godox LC500R LED Lightstick',
];

const WA = 'https://wa.me/919880736666';

// Rental gallery images from public/Rentals/ (first 10 for gallery)
const RENTAL_GALLERY = [
  '/Rentals/sony-fx3-full-frame-cinema-camera (1).jpg',
  '/Rentals/sony-fx6-full-frame-cinema-camera.jpg',
  '/Rentals/sony-a7r-v-camera-e-mount.jpg',
  '/Rentals/sony-a7s-iii-e-mount.jpg',
  '/Rentals/canon-eos-r5-mirrorless-digital-camera.jpg',
  '/Rentals/canon-eos--r5-mark-ii-camera.jpg',
  '/Rentals/sony-fe-50mm--f1.2-gm-lens.jpg',
  '/Rentals/sony-fe-24-70mm-f2.8-gm-lens.jpg',
  '/Rentals/canon-rf-85mm-f-1.2-l-usm-lens.jpg',
  '/Rentals/sony-fe-135mm-f1.8-gm-lens.jpg',
  '/Rentals/gopro-hero-13-black.jpg',
  '/Rentals/insta-360x3-camera.jpg',
];

export default function Rentals() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [fadeOut, setFadeOut]             = useState(false);
  const [gLoaded, setGLoaded]             = useState<Record<string,boolean>>({});
  const [pLoaded, setPLoaded]             = useState<Record<string,boolean>>({});

  useEffect(()=>{
    const t1=setTimeout(()=>setFadeOut(true),2000);
    const t2=setTimeout(()=>setPreloaderDone(true),2800);
    return()=>{clearTimeout(t1);clearTimeout(t2)};
  },[]);

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:wght@300;400;600&family=Montserrat:wght@300;400;500;600&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth;-webkit-tap-highlight-color:transparent}
        body{background:#080808;color:#e8e4dc;font-family:'Montserrat',sans-serif;overflow-x:hidden}

        /* ── TOGGLE NAV ── */
        .page-toggle{
          position:fixed;top:16px;left:50%;transform:translateX(-50%);
          z-index:1000;display:flex;
          background:rgba(8,8,8,0.88);
          border:1px solid rgba(180,140,60,0.25);
          backdrop-filter:blur(12px);
          border-radius:50px;padding:4px;gap:4px;
        }
        .toggle-btn{
          padding:8px 20px;border-radius:50px;
          font-family:'Montserrat',sans-serif;font-size:0.65rem;
          letter-spacing:0.15em;text-transform:uppercase;
          text-decoration:none;border:none;cursor:pointer;
          transition:background 0.25s,color 0.25s;white-space:nowrap;
        }
        .toggle-btn.active{background:#b48c3c;color:#080808;font-weight:600}
        .toggle-btn.inactive{background:transparent;color:#b48c3c}

        /* ── PRELOADER ── */
        .preloader{position:fixed;inset:0;background:#080808;display:flex;align-items:center;justify-content:center;z-index:9999;transition:opacity 0.8s ease}
        .preloader.fade{opacity:0;pointer-events:none}
        .pre-logo{width:140px;height:auto;animation:pulse 1.6s ease-in-out infinite}
        @keyframes pulse{0%,100%{opacity:0.6;transform:scale(1)}50%{opacity:1;transform:scale(1.06)}}

        /* ── HERO SECTION ── */
        .hero-sec{
          min-height:100svh;display:flex;flex-direction:column;
          align-items:center;justify-content:center;
          padding:7rem 1.5rem 4rem;text-align:center;
          background:radial-gradient(ellipse at 50% 55%,rgba(180,140,60,0.1) 0%,transparent 65%),#0d0d0d;
          position:relative;overflow:hidden;
        }
        .hero-sec::before{
          content:'NAGARJUN';
          position:absolute;font-family:'Bebas Neue',sans-serif;
          font-size:clamp(8rem,25vw,22rem);color:rgba(180,140,60,0.04);
          letter-spacing:0.05em;pointer-events:none;
          top:50%;left:50%;transform:translate(-50%,-50%);white-space:nowrap;
        }
        .hero-eye{font-size:0.6rem;letter-spacing:0.55em;text-transform:uppercase;color:#b48c3c;margin-bottom:1rem}
        .hero-brand{
          font-family:'Bebas Neue',sans-serif;
          font-size:clamp(3.5rem,14vw,10rem);
          letter-spacing:0.04em;line-height:0.9;
          background:linear-gradient(135deg,#e8e4dc 20%,#b48c3c 80%);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
        }
        .hero-rentals{
          font-family:'Bebas Neue',sans-serif;
          font-size:clamp(2rem,8vw,5rem);
          letter-spacing:0.15em;color:#b48c3c;
          -webkit-text-fill-color:transparent;
          -webkit-text-stroke:1px #b48c3c;
        }
        .gold-divider{width:80px;height:2px;background:linear-gradient(90deg,transparent,#b48c3c,transparent);margin:1.5rem auto}
        .hero-sub{font-size:clamp(0.6rem,2vw,0.8rem);letter-spacing:0.25em;text-transform:uppercase;color:#6a6560;max-width:420px;line-height:1.8}
        .hero-wa{
          margin-top:2rem;display:inline-flex;align-items:center;gap:8px;
          border:1px solid rgba(180,140,60,0.5);color:#b48c3c;
          padding:12px 28px;font-family:'Montserrat',sans-serif;
          font-size:0.65rem;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;
          transition:background 0.25s,color 0.25s;
        }
        .hero-wa:hover{background:#b48c3c;color:#080808}

        /* ── GALLERY ── */
        .gallery-sec{padding:4rem 1rem 3rem;background:#0b0b0b}
        .sec-head{max-width:1300px;margin:0 auto 2rem}
        .eyebrow{font-size:0.6rem;letter-spacing:0.45em;text-transform:uppercase;color:#b48c3c;margin-bottom:0.5rem}
        .sec-title{font-family:'Cormorant Garamond',serif;font-size:clamp(1.8rem,5vw,3rem);font-weight:300;line-height:1.15}
        .gold-line{width:45px;height:1px;background:#b48c3c;margin-top:1rem}
        .gal-grid{max-width:1300px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
        @media(max-width:900px){.gal-grid{grid-template-columns:repeat(3,1fr)}}
        @media(max-width:600px){.gal-grid{grid-template-columns:repeat(2,1fr)}}
        .gal-item{aspect-ratio:1/1;overflow:hidden;background:#111;position:relative}
        .gal-item img{width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 0.4s,transform 0.5s}
        .gal-item img.vis{opacity:1}
        .gal-item:hover img{transform:scale(1.06)}

        /* ── PRODUCTS SECTION ── */
        .prod-sec{padding:4rem 1rem;background:#0c0c0c}
        .prod-inner{max-width:1300px;margin:0 auto}
        .prod-grid{
          display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
          gap:12px;margin-top:2.5rem;
        }
        @media(max-width:480px){.prod-grid{grid-template-columns:repeat(2,1fr);gap:8px}}
        .prod-card{
          background:#0f0f0f;border:1px solid rgba(180,140,60,0.1);
          display:flex;flex-direction:column;
          overflow:hidden;transition:border-color 0.3s,transform 0.3s;
          position:relative;
        }
        .prod-card:hover{border-color:rgba(180,140,60,0.4);transform:translateY(-3px)}
        .prod-img-wrap{aspect-ratio:1/1;overflow:hidden;background:#111;position:relative}
        .prod-img-wrap img{width:100%;height:100%;object-fit:contain;padding:10%;opacity:0;transition:opacity 0.4s,transform 0.5s}
        .prod-img-wrap img.vis{opacity:1}
        .prod-card:hover .prod-img-wrap img{transform:scale(1.05)}
        .prod-no-img{
          aspect-ratio:1/1;background:#111;
          display:flex;align-items:center;justify-content:center;
          font-size:2rem;color:rgba(180,140,60,0.2);
        }
        .prod-body{padding:0.9rem;display:flex;flex-direction:column;gap:0.75rem;flex:1}
        .prod-name{font-family:'Cormorant Garamond',serif;font-size:0.9rem;font-weight:600;color:#d8d0c0;line-height:1.4;flex:1}
        .wa-btn{
          display:inline-flex;align-items:center;gap:5px;
          border:1px solid rgba(180,140,60,0.35);background:transparent;color:#b48c3c;
          padding:7px 12px;font-family:'Montserrat',sans-serif;
          font-size:0.58rem;letter-spacing:0.1em;text-transform:uppercase;
          text-decoration:none;transition:background 0.25s,color 0.25s;
          align-self:flex-start;cursor:pointer;
        }
        .wa-btn:hover{background:#b48c3c;color:#080808}
        .cinfo{font-size:0.58rem;color:#3e3a35;letter-spacing:0.04em}

        /* ── FOOTER ── */
        .footer{background:#050505;border-top:1px solid rgba(180,140,60,0.1);padding:2.5rem 1rem;text-align:center}
        .foot-logo{width:65px;margin:0 auto 0.75rem;opacity:0.5}
        .foot-txt{font-size:0.62rem;color:#332f2a;letter-spacing:0.1em}
      `}</style>

      {/* PRELOADER */}
      {!preloaderDone&&(
        <div className={`preloader${fadeOut?' fade':''}`}>
          <img src="/logo.png" alt="Nagarjun's Rentals" className="pre-logo" />
        </div>
      )}

      {/* TOGGLE NAV */}
      <nav className="page-toggle">
        <Link href="/" className="toggle-btn inactive">📷 Clicky Clicks</Link>
        <span className="toggle-btn active">🎥 Rentals</span>
      </nav>

      {/* HERO */}
      <section className="hero-sec">
        <p className="hero-eye">Professional Equipment · Bangalore</p>
        <div className="hero-brand">Nagarjun&apos;s</div>
        <div className="hero-rentals">Rentals</div>
        <div className="gold-divider" />
        <p className="hero-sub">Professional Camera &amp; Lighting Equipment Rentals in Bangalore</p>
        <a href={WA} target="_blank" rel="noopener noreferrer" className="hero-wa">
          💬 Enquire on WhatsApp
        </a>
      </section>

      {/* GALLERY STRIP */}
      <section className="gallery-sec">
        <div className="sec-head">
          <p className="eyebrow">Our Equipment</p>
          <h2 className="sec-title">Featured Gear</h2>
          <div className="gold-line" />
        </div>
        <div className="gal-grid">
          {RENTAL_GALLERY.map(src=>(
            <div key={src} className="gal-item">
              <img src={encodeURI(src)} alt="rental gear" loading="lazy"
                className={gLoaded[src]?'vis':''}
                onLoad={()=>setGLoaded(p=>({...p,[src]:true}))} />
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="prod-sec">
        <div className="prod-inner">
          <p className="eyebrow">Available for Rent</p>
          <h2 className="sec-title">All Equipment</h2>
          <div className="gold-line" />

          {/* Cards WITH images */}
          <div className="prod-grid">
            {PRODUCTS.map(({name,img})=>(
              <div key={name} className="prod-card">
                <div className="prod-img-wrap">
                  <img src={encodeURI(img)} alt={name} loading="lazy"
                    className={pLoaded[img]?'vis':''}
                    onLoad={()=>setPLoaded(p=>({...p,[img]:true}))} />
                </div>
                <div className="prod-body">
                  <div className="prod-name">{name}</div>
                  <a href={WA} target="_blank" rel="noopener noreferrer" className="wa-btn">💬 WhatsApp</a>
                  <div className="cinfo">Nagarjun S · 9880736666</div>
                </div>
              </div>
            ))}

            {/* Cards WITHOUT images */}
            {EXTRA_PRODUCTS.map(name=>(
              <div key={name} className="prod-card">
                <div className="prod-no-img">📷</div>
                <div className="prod-body">
                  <div className="prod-name">{name}</div>
                  <a href={WA} target="_blank" rel="noopener noreferrer" className="wa-btn">💬 WhatsApp</a>
                  <div className="cinfo">Nagarjun S · 9880736666</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <img src="/logo.png" alt="Nagarjun's Rentals" className="foot-logo" />
        <p className="foot-txt">© {new Date().getFullYear()} Nagarjun&apos;s Rentals · Bangalore</p>
      </footer>
    </>
  );
}