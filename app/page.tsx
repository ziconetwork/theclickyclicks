'use client';
import { useState, useEffect, useCallback, useRef } from 'react';

// ─── THEME ────────────────────────────────────────────────────────────────────
const C = {
  bg:     '#090806',
  bgCard: '#111009',
  bgDark: '#060504',
  gold:   '#c8a84b',
  goldHi: '#e5c96e',
  goldLo: 'rgba(200,168,75,0.15)',
  goldBr: 'rgba(200,168,75,0.25)',
  cream:  '#f2ede4',
  muted:  'rgba(242,237,228,0.5)',
  faint:  'rgba(242,237,228,0.12)',
  ghost:  'rgba(242,237,228,0.06)',
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Raleway:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Raleway',sans-serif;background:#090806;color:#f2ede4;-webkit-font-smoothing:antialiased}
::selection{background:#c8a84b;color:#090806}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:#09080600}
::-webkit-scrollbar-thumb{background:#c8a84b;border-radius:2px}
.serif{font-family:'Playfair Display',serif}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes bar{from{width:0}to{width:100%}}
@keyframes glow{0%,100%{opacity:.5}50%{opacity:1}}
@keyframes up{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
`;

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const WA_P = 'https://wa.me/917975163441?text=';
const WA_R = 'https://wa.me/919880736666?text=';
const waP  = (s:string) => `${WA_P}${encodeURIComponent(`Hi, I'd like to book a ${s} session with The Clicky Clicks. Please share details.`)}`;
const waR  = (s:string) => `${WA_R}${encodeURIComponent(`Hi Nagarjun, I'm interested in renting the ${s}. Please share availability and pricing.`)}`;

type Page = 'home'|'rentals'|string;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SVCS = [
  {id:'maternity',  short:'Maternity',  label:'Maternity Photography',  desc:'Capturing the radiance and joy of new beginnings.',           cover:'maternity1.png',  imgs:['maternity1.png','maternity2.png','maternity3.png','maternity4.png','maternity5.png','maternity6.png','maternity7.png','maternity8.png']},
  {id:'prewedding', short:'Pre-Wedding', label:'Pre-Wedding Photography', desc:'Your love story, beautifully told before the big day.',        cover:'preWedding1.png', imgs:['preWedding1.png','preWedding2.png','preWedding3.png','preWedding4.png','preWedding5.png','preWedding6.png','preWedding7.png','preWedding8.png']},
  {id:'wedding',    short:'Wedding',    label:'Wedding Photography',     desc:'Every vow and emotion, preserved with artistry.',              cover:'Wedding1.png',    imgs:['Wedding1.png','Wedding2.png','Wedding3.png','Wedding4.png','Wedding5.png','Wedding6.png','Wedding7.png','Wedding8.png']},
  {id:'baby',       short:'Baby Shoot', label:'Baby Shoot',              desc:'Tiny moments that become lifelong treasures.',                 cover:'babyshoot1.png',  imgs:['babyshoot1.png','babyshoot2.png','babyshoot3.png','babyshoots.png','babyshoot5.png','babyshoot6.png','babyshoot7.png','babyshoot8.png']},
  {id:'modelling',  short:'Modelling',  label:'Modelling Shoot',         desc:'Powerful portraits that define your brand and presence.',      cover:'modelling1.png',  imgs:['modelling1.png','modelling2.png','modelling3.png','modelling4.png','modelling5.png','modelling6.png','modelling7.png','modelling8.png']},
  {id:'portfolio',  short:'Portfolio',  label:'Portfolio Shoots',        desc:'A professional portfolio that opens doors.',                   cover:'Portfolio1.png',  imgs:['Portfolio1.png','Portfolio2.png','Portfolio3.png','Portfolio4.png','Portfolio5.png','Portfolio6.png','Portfolio7.png','Portfolio8.png']},
  {id:'product',    short:'Product',    label:'Product Photography',     desc:'Visuals engineered to make your products irresistible.',       cover:'product1.png',    imgs:['product1.png','product2.png','Product3.png','Product4.png','product5.png','product6.png','product7.png','product8.png']},
  {id:'commercial', short:'Commercial', label:'Commercial Photography',  desc:'Campaign imagery that commands attention and builds brands.',  cover:'commercial1.png', imgs:['commercial1.png','commercial2.png','commercial3.png','Commercial4.png','commercial5.png','commercial6.png','commercial7.png','commercial8.png']},
];

type Gear = {name:string;img:string;brand:string;type:'camera'|'lens'};
const GEAR:Gear[] = [
  {name:'Sony FX3',                           img:'Sony-fx3.jpg',                    brand:'Sony',  type:'camera'},
  {name:'Sony FX2',                           img:'sony-fx2.jpg',                    brand:'Sony',  type:'camera'},
  {name:'Sony A7 V',                          img:'sony-a7v.jpg',                    brand:'Sony',  type:'camera'},
  {name:'Sony FX6',                           img:'sony-fx6.jpg',                    brand:'Sony',  type:'camera'},
  {name:'Sony FX9',                           img:'sony-fx9.jpg',                    brand:'Sony',  type:'camera'},
  {name:'Sony A7 III',                        img:'sony-a7iii.jpg',                  brand:'Sony',  type:'camera'},
  {name:'Sony A7 IV',                         img:'sony-a7iv.jpg',                   brand:'Sony',  type:'camera'},
  {name:'Sony A7S III',                       img:'sony-a7siii.jpg',                 brand:'Sony',  type:'camera'},
  {name:'Sony A7R IV',                        img:'sony-a7riv.jpg',                  brand:'Sony',  type:'camera'},
  {name:'Sony A7R V',                         img:'sony-a7rv.jpg',                   brand:'Sony',  type:'camera'},
  {name:'Nikon ZR (with Adapter)',            img:'nikon-zr.jpg',                    brand:'Nikon', type:'camera'},
  {name:'Canon EOS R5 Mark II',               img:'canon-eos-r5-mark-ii.jpg',        brand:'Canon', type:'camera'},
  {name:'Canon EOS R5',                       img:'canon-eos-r5.jpg',                brand:'Canon', type:'camera'},
  {name:'Canon EOS R6 Mark II',               img:'canon-eos-r6-mark-ii.jpg',        brand:'Canon', type:'camera'},
  {name:'Canon EOS R6',                       img:'canon-eos-r6.jpg',                brand:'Canon', type:'camera'},
  {name:'Sony FE 14mm F1.8 GM',              img:'sony-fe-14mm-f1-8-gm.jpg',        brand:'Sony',  type:'lens'},
  {name:'Sony FE 24mm F1.4 GM',              img:'sony-fe-24mm-f1-4-gm.jpg',        brand:'Sony',  type:'lens'},
  {name:'Sony FE 35mm F1.4 GM',              img:'sony-fe-35mm-f1-4-gm.jpg',        brand:'Sony',  type:'lens'},
  {name:'Sony FE 50mm F1.2 GM',              img:'sony-fe-50mm-f1-2-gm.jpg',        brand:'Sony',  type:'lens'},
  {name:'Sony FE 50mm F1.4 GM',              img:'sony-fe-50mm-f1-4-gm.jpg',        brand:'Sony',  type:'lens'},
  {name:'Sony FE 50mm F1.8',                 img:'sony-fe-50mm-f1-8.jpg',            brand:'Sony',  type:'lens'},
  {name:'Sony FE 85mm F1.4 GM',              img:'sony-fe-85mm-f1-4-gm.jpg',        brand:'Sony',  type:'lens'},
  {name:'Sony FE 85mm F1.8',                 img:'sony-fe-85mm-f1-8.jpg',            brand:'Sony',  type:'lens'},
  {name:'Sony FE 90mm Macro F2.8 G OSS',     img:'sony-fe-90mm-macro.jpg',           brand:'Sony',  type:'lens'},
  {name:'Sony FE 100mm F2.8 STF GM OSS',     img:'sony-fe-100mm-stf.jpg',            brand:'Sony',  type:'lens'},
  {name:'Sony FE 135mm F1.8 GM',             img:'sony-fe-135mm-f1-8-gm.jpg',       brand:'Sony',  type:'lens'},
  {name:'Sony FE 200–600mm F5.6–6.3 G OSS',  img:'sony-fe-200-600mm.jpg',           brand:'Sony',  type:'lens'},
  {name:'Sony 28–135mm FE F4 G OSS',         img:'sony-fe-28-135mm.jpg',             brand:'Sony',  type:'lens'},
  {name:'Sony FE 12–24mm F4 G',              img:'sony-fe-12-24mm-f4.jpg',           brand:'Sony',  type:'lens'},
  {name:'Sony FE 24–105mm F4 G OSS',         img:'sony-fe-24-105mm.jpg',             brand:'Sony',  type:'lens'},
  {name:'Sony FE 16–35mm F2.8 GM',           img:'sony-fe-16-35mm-f2-8-gm.jpg',     brand:'Sony',  type:'lens'},
  {name:'Sony FE 24–70mm F2.8 GM',           img:'sony-fe-24-70mm-f2-8-gm.jpg',     brand:'Sony',  type:'lens'},
  {name:'Sony FE 70–200mm F2.8 GM',          img:'sony-fe-70-200mm-f2-8-gm.jpg',    brand:'Sony',  type:'lens'},
  {name:'Sony FE 24–70mm F2.8 GM II',        img:'sony-fe-24-70mm-f2-8-gm-ii.jpg',  brand:'Sony',  type:'lens'},
  {name:'Sony FE 70–200mm F2.8 GM II',       img:'sony-fe-70-200mm-f2-8-gm-ii.jpg', brand:'Sony',  type:'lens'},
  {name:'Sony FE 12–24mm F2.8 GM',           img:'sony-fe-12-24mm-f2-8-gm.jpg',     brand:'Sony',  type:'lens'},
  {name:'Sony FE 100–400mm F4.5–5.6 GM OSS', img:'sony-fe-100-400mm.jpg',           brand:'Sony',  type:'lens'},
  {name:'Sony 28–70mm',                      img:'sony-28-70mm.jpg',                 brand:'Sony',  type:'lens'},
  {name:'Sony 50–150mm F2',                  img:'sony-50-150mm-f2.jpg',             brand:'Sony',  type:'lens'},
  {name:'Canon RF 50mm F1.8 STM',            img:'canon-rf-50mm-f1-8.jpg',           brand:'Canon', type:'lens'},
  {name:'Canon RF 85mm F2 Macro IS STM',     img:'canon-rf-85mm-f2-macro.jpg',       brand:'Canon', type:'lens'},
  {name:'Canon RF 70–200mm F2.8L IS',        img:'canon-rf-70-200mm-f2-8l.jpg',      brand:'Canon', type:'lens'},
  {name:'Canon RF 24–105mm F4L IS',          img:'canon-rf-24-105mm-f4l.jpg',        brand:'Canon', type:'lens'},
  {name:'Canon RF 15–35mm F2.8L IS',         img:'canon-rf-15-35mm-f2-8l.jpg',       brand:'Canon', type:'lens'},
  {name:'Canon RF 50mm F1.2',                img:'canon-rf-50mm-f1-2.jpg',            brand:'Canon', type:'lens'},
  {name:'Canon RF 24–70mm F2.8L IS',         img:'canon-rf-24-70mm-f2-8l.jpg',       brand:'Canon', type:'lens'},
  {name:'Canon RF 85mm F1.2L USM',           img:'canon-rf-85mm-f1-2l.jpg',          brand:'Canon', type:'lens'},
  {name:'Canon RF 35mm F1.8 Macro IS STM',   img:'canon-rf-35mm-f1-8-macro.jpg',     brand:'Canon', type:'lens'},
  {name:'RF 35mm F1.4',                      img:'canon-rf-35mm-f1-4.jpg',            brand:'Canon', type:'lens'},
  {name:'RF 85mm F1.4',                      img:'canon-rf-85mm-f1-4.jpg',            brand:'Canon', type:'lens'},
  {name:'RF 28–70mm',                        img:'canon-rf-28-70mm.jpg',              brand:'Canon', type:'lens'},
];

// ─── ATOMS ────────────────────────────────────────────────────────────────────
function SafeImg({src,alt,style,cls}:{src:string;alt:string;style?:React.CSSProperties;cls?:string}) {
  const [err,setErr]=useState(false);
  if(err) return (
    <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg,#181410,#0d0b08)',...style}}>
      <span style={{fontSize:24,opacity:.2}}>📷</span>
    </div>
  );
  return <img src={`/${src}`} alt={alt} onError={()=>setErr(true)} className={cls} style={{width:'100%',height:'100%',objectFit:'cover',display:'block',...style}} />;
}

function Label({children}:{children:React.ReactNode}) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
      <div style={{width:24,height:1,background:C.gold,flexShrink:0}}/>
      <span style={{color:C.gold,fontSize:10,fontFamily:'monospace',letterSpacing:'.48em',textTransform:'uppercase',whiteSpace:'nowrap'}}>{children}</span>
    </div>
  );
}

function Rule({w=48}:{w?:number}) {
  return <div style={{height:1,width:w,background:`linear-gradient(90deg,${C.gold},transparent)`,margin:'14px 0'}}/>;
}

function GBtn({href,onClick,children,ghost}:{href?:string;onClick?:()=>void;children:React.ReactNode;ghost?:boolean}) {
  const s:React.CSSProperties={
    display:'inline-flex',alignItems:'center',gap:8,padding:'12px 28px',
    fontFamily:"'Raleway',sans-serif",fontWeight:600,fontSize:11,letterSpacing:'.28em',textTransform:'uppercase',
    cursor:'pointer',textDecoration:'none',border:'none',transition:'all .22s',
    background: ghost ? 'transparent' : `linear-gradient(135deg,${C.gold},${C.goldHi})`,
    color: ghost ? C.gold : '#090806',
    outline: ghost ? `1px solid ${C.goldBr}` : 'none',
  };
  const hi=(e:React.MouseEvent<HTMLElement>)=>{ e.currentTarget.style.background= ghost ? C.goldLo : C.goldHi; };
  const lo=(e:React.MouseEvent<HTMLElement>)=>{ e.currentTarget.style.background= ghost ? 'transparent' : `linear-gradient(135deg,${C.gold},${C.goldHi})`; };
  if(href) return <a href={href} target="_blank" rel="noopener noreferrer" style={s} onMouseEnter={hi} onMouseLeave={lo}>{children}</a>;
  return <button style={s} onClick={onClick} onMouseEnter={hi} onMouseLeave={lo}>{children}</button>;
}

function WaBtn({href,sm}:{href:string;sm?:boolean}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:7,
        background:'#25D366',color:'#fff',padding:sm?'8px 12px':'12px 26px',
        fontWeight:600,fontSize:sm?9:11,letterSpacing:'.2em',textTransform:'uppercase',
        textDecoration:'none',transition:'background .2s',width:sm?'100%':undefined}}
      onMouseEnter={e=>(e.currentTarget.style.background='#1ebe5b')}
      onMouseLeave={e=>(e.currentTarget.style.background='#25D366')}>
      <svg viewBox="0 0 24 24" fill="currentColor" style={{width:sm?12:15,height:sm?12:15,flexShrink:0}}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
      {sm ? 'WhatsApp' : 'Chat on WhatsApp'}
    </a>
  );
}

// ─── PRELOADER ────────────────────────────────────────────────────────────────
function Preloader({onDone}:{onDone:()=>void}) {
  const [ph,setPh]=useState<'a'|'b'|'c'>('a');
  useEffect(()=>{
    const t1=setTimeout(()=>setPh('b'),500);
    const t2=setTimeout(()=>setPh('c'),2400);
    const t3=setTimeout(onDone,3000);
    return()=>{clearTimeout(t1);clearTimeout(t2);clearTimeout(t3)};
  },[onDone]);
  return (
    <div style={{position:'fixed',inset:0,zIndex:9999,background:C.bgDark,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
      opacity:ph==='c'?0:1,transition:'opacity .5s',pointerEvents:ph==='c'?'none':'all'}}>
      <div style={{position:'relative',width:108,height:108,marginBottom:28}}>
        <div style={{position:'absolute',inset:0,borderRadius:'50%',border:`1px solid ${C.goldBr}`,animation:'spin 9s linear infinite'}}/>
        <div style={{position:'absolute',inset:9,borderRadius:'50%',border:`1px solid ${C.goldLo}`}}/>
        <div style={{position:'absolute',inset:18,borderRadius:'50%',background:C.bgDark,overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <img src="/logo.png" alt="logo" style={{width:'82%',height:'82%',objectFit:'contain'}}
            onError={(e:any)=>{e.target.style.display='none';(e.target.parentNode as HTMLElement).innerHTML=`<span style="font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:700;color:${C.gold}">TC</span>`;}}/>
        </div>
      </div>
      <div style={{textAlign:'center',opacity:ph==='b'||ph==='c'?1:0,transform:ph==='b'||ph==='c'?'translateY(0)':'translateY(18px)',transition:'all .65s'}}>
        <div className="serif" style={{color:C.cream,fontSize:'clamp(1.6rem,5vw,2.8rem)',fontWeight:400,letterSpacing:'.22em',textTransform:'uppercase'}}>The Clicky Clicks</div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10,marginTop:9}}>
          <div style={{height:1,width:26,background:`linear-gradient(90deg,transparent,${C.gold})`}}/>
          <span style={{color:C.gold,fontSize:9,letterSpacing:'.42em',textTransform:'uppercase',fontFamily:'monospace',animation:'glow 2s ease-in-out infinite'}}>Visual Stories That Last</span>
          <div style={{height:1,width:26,background:`linear-gradient(90deg,${C.gold},transparent)`}}/>
        </div>
      </div>
      <div style={{position:'absolute',bottom:0,left:0,height:2,background:`linear-gradient(90deg,transparent,${C.gold},transparent)`,animation:'bar 2.4s ease-in-out forwards'}}/>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Nav({cur,go}:{cur:Page;go:(p:Page)=>void}) {
  const [open,setOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>40);
    window.addEventListener('scroll',fn,{passive:true});
    return()=>window.removeEventListener('scroll',fn);
  },[]);

  const links=[
    {l:'Home',p:'home'},{l:'Maternity',p:'maternity'},{l:'Pre-Wedding',p:'prewedding'},
    {l:'Wedding',p:'wedding'},{l:'Baby Shoot',p:'baby'},{l:'Modelling',p:'modelling'},
    {l:'Portfolio',p:'portfolio'},{l:'Product',p:'product'},{l:'Commercial',p:'commercial'},{l:'Rentals',p:'rentals'},
  ];

  const nav=(p:string)=>{go(p);setOpen(false);window.scrollTo(0,0);};

  return (
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:200,transition:'all .35s',
      background:scrolled?'rgba(6,5,4,.96)':'transparent',
      backdropFilter:scrolled?'blur(16px)':'none',
      borderBottom:scrolled?`1px solid ${C.goldBr}`:'1px solid transparent'}}>
      <div style={{maxWidth:1380,margin:'0 auto',padding:'0 20px',height:62,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <button onClick={()=>nav('home')} style={{display:'flex',alignItems:'center',gap:10,background:'none',border:'none',cursor:'pointer',flexShrink:0}}>
          <div style={{height:44,width:44,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <img src="/logo.png" alt="logo"
              style={{maxWidth:44,maxHeight:44,width:'auto',height:'auto',objectFit:'contain',display:'block'}}
              onError={(e:any)=>{
                e.target.style.display='none';
                const p=e.target.parentNode as HTMLElement;
                p.innerHTML=`<span style="font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:${C.gold};line-height:1">TC</span>`;
              }}/>
          </div>
          <div className="nbrand">
            <div className="serif" style={{color:C.cream,fontSize:16,letterSpacing:'.08em',lineHeight:1.1}}>The Clicky Clicks</div>
            <div style={{color:C.gold,fontSize:8,letterSpacing:'.45em',textTransform:'uppercase',fontFamily:'monospace'}}>Bangalore</div>
          </div>
        </button>

        <div className="nlinks" style={{display:'flex',gap:0,alignItems:'center'}}>
          {links.map(({l,p})=>(
            <button key={p} onClick={()=>nav(p)}
              style={{background:'none',border:'none',borderBottom:`1px solid ${cur===p?C.gold:'transparent'}`,
                cursor:'pointer',padding:'5px 9px',fontFamily:"'Raleway',sans-serif",
                fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',fontWeight:cur===p?600:400,
                color:cur===p?C.gold:C.muted,transition:'color .2s'}}>
              {l}
            </button>
          ))}
        </div>

        <button onClick={()=>setOpen(!open)} className="nburger"
          style={{display:'none',background:'none',border:`1px solid ${C.goldBr}`,cursor:'pointer',padding:'8px 10px',flexDirection:'column',gap:4.5}}>
          <span style={{display:'block',width:19,height:1.5,background:C.gold,transition:'all .3s',transform:open?'rotate(45deg) translateY(6px)':'none'}}/>
          <span style={{display:'block',width:19,height:1.5,background:C.gold,transition:'all .3s',opacity:open?0:1}}/>
          <span style={{display:'block',width:19,height:1.5,background:C.gold,transition:'all .3s',transform:open?'rotate(-45deg) translateY(-6px)':'none'}}/>
        </button>
      </div>

      {open&&(
        <div style={{background:'rgba(6,5,4,.98)',borderTop:`1px solid ${C.goldBr}`,padding:'6px 20px 18px'}}>
          {links.map(({l,p})=>(
            <button key={p} onClick={()=>nav(p)}
              style={{display:'block',width:'100%',textAlign:'left',background:'none',border:'none',
                borderBottom:`1px solid ${C.ghost}`,padding:'12px 0',cursor:'pointer',
                fontFamily:"'Raleway',sans-serif",fontSize:11,letterSpacing:'.28em',textTransform:'uppercase',
                color:cur===p?C.gold:C.muted}}>
              {l}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media(max-width:980px){.nlinks{display:none!important}.nburger{display:flex!important}}
        @media(max-width:440px){.nbrand{display:none!important}}
      `}</style>
    </nav>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({go}:{go:(p:Page)=>void}) {
  return (
    <footer style={{background:C.bgDark,borderTop:`1px solid ${C.goldBr}`,padding:'52px 6vw 28px'}}>
      <div style={{maxWidth:1380,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:44,marginBottom:44}}>
        <div>
          <div className="serif" style={{color:C.cream,fontSize:22,letterSpacing:'.06em',marginBottom:6}}>The Clicky Clicks</div>
          <Rule w={36}/>
          <p style={{color:C.muted,fontSize:13,lineHeight:1.85,fontWeight:300}}>Bangalore's premier photography studio. Crafting visual stories from personal milestones to brand campaigns.</p>
        </div>
        <div>
          <div style={{color:C.gold,fontSize:9,letterSpacing:'.42em',textTransform:'uppercase',fontFamily:'monospace',marginBottom:15}}>Services</div>
          {SVCS.map(s=>(
            <button key={s.id} onClick={()=>{go(s.id);window.scrollTo(0,0);}}
              style={{display:'block',background:'none',border:'none',cursor:'pointer',color:C.muted,fontSize:13,padding:'3px 0',textAlign:'left',transition:'color .2s'}}
              onMouseEnter={e=>(e.currentTarget.style.color=C.gold)}
              onMouseLeave={e=>(e.currentTarget.style.color=C.muted)}>
              {s.short}
            </button>
          ))}
        </div>
        <div>
          <div style={{color:C.gold,fontSize:9,letterSpacing:'.42em',textTransform:'uppercase',fontFamily:'monospace',marginBottom:15}}>Contact</div>
          {[
            {icon:'📞',t:'Vedanth — 7975163441',h:'tel:+917975163441'},
            {icon:'📞',t:'Nagarjun (Rentals) — 9880736666',h:'tel:+919880736666'},
            {icon:'📍',t:'Bangalore — View on Maps',h:'https://maps.app.goo.gl/nseBHa3zvMqa1AnTA'},
          ].map(c=>(
            <a key={c.t} href={c.h} target={c.h.startsWith('http')?'_blank':undefined} rel="noopener noreferrer"
              style={{color:C.muted,fontSize:13,textDecoration:'none',display:'flex',gap:9,alignItems:'flex-start',marginBottom:10,transition:'color .2s'}}
              onMouseEnter={e=>(e.currentTarget.style.color=C.gold)}
              onMouseLeave={e=>(e.currentTarget.style.color=C.muted)}>
              <span style={{color:C.gold,flexShrink:0}}>{c.icon}</span>{c.t}
            </a>
          ))}
        </div>
      </div>
      <div style={{borderTop:`1px solid ${C.ghost}`,paddingTop:22,textAlign:'center'}}>
        <p style={{color:'rgba(242,237,228,.15)',fontSize:10,fontFamily:'monospace',letterSpacing:'.28em',textTransform:'uppercase'}}>
          © 2025 The Clicky Clicks · Bangalore · All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO SLIDER
// ═══════════════════════════════════════════════════════════════════════════════
const SLIDES = [
  'slide1.jpg','slide2.jpg','slide3.jpg','slide4.jpg','slide5.jpg',
  'slide6.jpg','slide7.jpg','slide8.jpg','slide9.jpg','slide10.jpg',
];

function HeroSlider({go}:{go:(p:Page)=>void}) {
  const [cur, setCur]         = useState(0);
  const [sliding, setSliding] = useState(false);

  const touchStart = useRef<number|null>(null);
  const mouseStart = useRef<number|null>(null);
  const isDragging = useRef(false);

  const TOTAL = SLIDES.length;

  const goTo = useCallback((n: number) => {
    if (sliding) return;
    setSliding(true);
    setCur((n + TOTAL) % TOTAL);
    setTimeout(() => setSliding(false), 600);
  }, [sliding, TOTAL]);

  const next = useCallback(() => goTo(cur + 1), [cur, goTo]);
  const prev = useCallback(() => goTo(cur - 1), [cur, goTo]);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [next, prev]);

  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStart.current = null;
  };
  const onMouseDown  = (e: React.MouseEvent) => { mouseStart.current = e.clientX; isDragging.current = false; };
  const onMouseMove  = (e: React.MouseEvent) => { if (mouseStart.current !== null && Math.abs(e.clientX - mouseStart.current) > 5) isDragging.current = true; };
  const onMouseUp    = (e: React.MouseEvent) => {
    if (mouseStart.current === null) return;
    const diff = mouseStart.current - e.clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    mouseStart.current = null;
  };
  const onMouseLeave = () => { mouseStart.current = null; };

  return (
    <section
      style={{position:'relative',height:'calc(100vh - 62px)',overflow:'hidden',background:C.bgDark,cursor:'grab',userSelect:'none',marginTop:62}}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave}
    >
      {/* ── SLIDES ── */}
      {SLIDES.map((img, i) => {
        let tx = '100%';
        if (i === cur) tx = '0%';
        else if (i === (cur - 1 + TOTAL) % TOTAL) tx = '-100%';
        return (
          <div key={i} style={{
            position:'absolute',inset:0,
            transform:`translateX(${tx})`,
            transition:sliding?'transform .55s cubic-bezier(.42,0,.18,1)':'none',
            zIndex:i===cur?2:1,willChange:'transform',
          }}>
            <SafeImg src={img} alt={`slide ${i+1}`} style={{objectFit:'cover',pointerEvents:'none'}}/>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom, rgba(6,5,4,.7) 0%, rgba(6,5,4,.0) 20%), linear-gradient(to top, rgba(6,5,4,.88) 0%, rgba(6,5,4,.3) 45%, rgba(6,5,4,.08) 100%)'}}/>
          </div>
        );
      })}

      {/* ── BRAND TEXT + CTA BUTTONS — unified flex container ── */}
      <div
        className="hero-bottom"
        style={{
          position:'absolute',
          bottom:'clamp(80px,11vh,120px)',
          left:'6vw',
          right:'6vw',
          zIndex:10,
          display:'flex',
          flexDirection:'row',
          alignItems:'flex-end',
          justifyContent:'space-between',
          gap:20,
          flexWrap:'wrap',
        }}
      >
        {/* Brand text */}
        <div style={{pointerEvents:'none',flex:'1 1 260px',minWidth:0}}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
            <span style={{color:C.gold,fontSize:10,fontFamily:'monospace',letterSpacing:'.48em',textTransform:'uppercase'}}>
              Bangalore's Premier Photography Studio
            </span>
          </div>
          <h1 className="serif" style={{color:C.cream,fontSize:'clamp(2.8rem,7vw,7.5rem)',fontWeight:400,lineHeight:.9,letterSpacing:'.01em',marginBottom:20}}>
            The<br/>
            <span style={{fontStyle:'italic',color:C.gold}}>Clicky</span><br/>
            Clicks
          </h1>
          <p style={{color:'rgba(242,237,228,.6)',fontSize:'clamp(13px,1.2vw,15px)',maxWidth:400,lineHeight:1.8,fontWeight:300}}>
            Visual stories crafted with passion — from personal milestones to powerful brand campaigns.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="hero-ctas" style={{display:'flex',flexDirection:'column',gap:12,alignItems:'flex-end',flexShrink:0,pointerEvents:'all'}}>
          <GBtn onClick={()=>document.getElementById('svc-section')?.scrollIntoView({behavior:'smooth'})}>
            Our Services
          </GBtn>
          <WaBtn href={waP('photography')}/>
        </div>
      </div>



      {/* ── SLIDE COUNTER ── */}
      <div style={{position:'absolute',top:82,right:'6vw',zIndex:10}}>
        <span className="serif" style={{color:C.gold,fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:400}}>
          {String(cur+1).padStart(2,'0')}
        </span>
        <span style={{color:'rgba(200,168,75,.35)',fontSize:12,margin:'0 6px'}}>/</span>
        <span style={{color:'rgba(200,168,75,.35)',fontSize:12,fontFamily:'monospace'}}>
          {String(TOTAL).padStart(2,'0')}
        </span>
      </div>

      {/* ── DOT INDICATORS ── */}
      <div style={{position:'absolute',bottom:70,left:'50%',transform:'translateX(-50%)',display:'flex',gap:7,zIndex:10}}>
        {SLIDES.map((_,i)=>(
          <button key={i} onClick={e=>{e.stopPropagation();goTo(i);}}
            style={{width:i===cur?26:6,height:6,borderRadius:3,background:i===cur?C.gold:'rgba(200,168,75,.28)',border:'none',cursor:'pointer',transition:'all .4s ease',padding:0}}/>
        ))}
      </div>

      {/* ── STATS BAR ── */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,zIndex:10,background:'rgba(6,5,4,.75)',backdropFilter:'blur(12px)',borderTop:`1px solid ${C.goldBr}`,padding:'12px 6vw',display:'flex',justifyContent:'center',gap:'clamp(20px,5vw,72px)',flexWrap:'wrap'}}>
        {[['500+','Projects'],['8','Genres'],['Bangalore','Studio']].map(([v,l])=>(
          <div key={l} style={{textAlign:'center'}}>
            <div className="serif" style={{color:C.gold,fontSize:'clamp(1.1rem,2vw,1.6rem)',fontWeight:400,lineHeight:1}}>{v}</div>
            <div style={{color:'rgba(242,237,228,.35)',fontSize:8,letterSpacing:'.32em',textTransform:'uppercase',fontFamily:'monospace',marginTop:2}}>{l}</div>
          </div>
        ))}
      </div>

      {/* ── SCROLL HINT ── */}
      <div style={{position:'absolute',bottom:56,left:'6vw',zIndex:10,display:'flex',alignItems:'center',gap:8,opacity:.5}}>
        <span style={{color:C.muted,fontSize:8,fontFamily:'monospace',letterSpacing:'.4em',textTransform:'uppercase'}}>Scroll</span>
        <div style={{width:1,height:28,background:`linear-gradient(to bottom,${C.gold},transparent)`}}/>
      </div>

      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        @media(max-width:600px){
          .hero-bottom{
            flex-direction:column!important;
            align-items:flex-start!important;
            bottom:clamp(90px,12vh,110px)!important;
            gap:18px!important;
          }
          .hero-ctas{
            align-items:stretch!important;
            width:100%!important;
          }
          .hero-ctas button,
          .hero-ctas a{
            width:100%!important;
            justify-content:center!important;
          }
        }
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════════════════════════════════════════
function Home({go}:{go:(p:Page)=>void}) {
  return (
    <div style={{background:C.bg}}>

      <HeroSlider go={go}/>

      {/* ── SERVICES SHOWCASE ── */}
      <section id="svc-section" style={{padding:'90px 4vw',maxWidth:1380,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:60}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10,marginBottom:14}}>
            <div style={{width:24,height:1,background:C.gold}}/>
            <span style={{color:C.gold,fontSize:10,fontFamily:'monospace',letterSpacing:'.48em',textTransform:'uppercase'}}>What We Offer</span>
            <div style={{width:24,height:1,background:C.gold}}/>
          </div>
          <h2 className="serif" style={{color:C.cream,fontSize:'clamp(2rem,4vw,3.5rem)',fontWeight:400}}>
            Our <span style={{color:C.gold,fontStyle:'italic'}}>Services</span>
          </h2>
          <p style={{color:C.muted,fontSize:14,maxWidth:480,margin:'14px auto 0',lineHeight:1.8,fontWeight:300}}>
            Click any service to explore our work and book a session.
          </p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))',gap:4}}>
          {SVCS.map((s,i)=>(
            <button key={s.id} onClick={()=>{go(s.id);window.scrollTo(0,0);}}
              style={{position:'relative',aspectRatio:'4/5',overflow:'hidden',background:C.bgCard,border:`1px solid ${C.ghost}`,cursor:'pointer',display:'block',padding:0}}
              className={`sv-${i}`}>
              <div style={{position:'absolute',inset:0,transition:'transform .65s'}} className={`sv-img-${i}`}>
                <SafeImg src={s.cover} alt={s.short}/>
              </div>
              <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(6,5,4,.94) 25%,rgba(6,5,4,.08) 65%,transparent)'}}/>
              <div style={{position:'absolute',inset:0,border:`1px solid ${C.gold}`,opacity:0,transition:'opacity .3s'}} className={`sv-brd-${i}`}/>
              <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'22px 20px',textAlign:'left'}}>
                <div style={{height:1,background:`linear-gradient(90deg,${C.gold},transparent)`,marginBottom:10,transition:'width .45s',width:28}} className={`sv-ln-${i}`}/>
                <div className="serif" style={{color:C.cream,fontSize:20,fontWeight:400,letterSpacing:'.03em',marginBottom:5}}>{s.short}</div>
                <div style={{color:C.muted,fontSize:11,fontWeight:300,lineHeight:1.5,marginBottom:10}}>{s.desc}</div>
                <div style={{color:C.gold,fontSize:9,fontFamily:'monospace',letterSpacing:'.3em',textTransform:'uppercase'}}>View Gallery →</div>
              </div>
              <style>{`
                .sv-${i}:hover .sv-img-${i}{transform:scale(1.07)!important}
                .sv-${i}:hover .sv-brd-${i}{opacity:1!important}
                .sv-${i}:hover .sv-ln-${i}{width:72%!important}
              `}</style>
            </button>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section style={{background:C.bgDark,borderTop:`1px solid ${C.goldBr}`,borderBottom:`1px solid ${C.goldBr}`,padding:'90px 6vw'}}>
        <div style={{maxWidth:1380,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:70,alignItems:'center'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:4,order:1}} className="about-imgs">
            <div style={{gridRow:'span 2',overflow:'hidden',background:C.bgCard,border:`1px solid ${C.ghost}`}}>
              <SafeImg src="maternity1.png" alt="photography" style={{height:'100%',minHeight:340}}/>
            </div>
            <div style={{overflow:'hidden',background:C.bgCard,border:`1px solid ${C.ghost}`,aspectRatio:'1'}}>
              <SafeImg src="Wedding1.png" alt="photography"/>
            </div>
            <div style={{overflow:'hidden',background:C.bgCard,border:`1px solid ${C.ghost}`,aspectRatio:'1'}}>
              <SafeImg src="modelling1.png" alt="photography"/>
            </div>
          </div>
          <div style={{order:2}}>
            <Label>About The Clicky Clicks</Label>
            <h2 className="serif" style={{color:C.cream,fontSize:'clamp(1.8rem,3.5vw,3.2rem)',fontWeight:400,lineHeight:1.15,marginBottom:16}}>
              Every Moment Has a<br/><span style={{color:C.gold,fontStyle:'italic'}}>Story Worth Telling.</span>
            </h2>
            <Rule w={56}/>
            <p style={{color:C.muted,lineHeight:1.9,marginBottom:16,fontWeight:300,fontSize:14}}>
              The Clicky Clicks is Bangalore's premier photography studio built for individuals, models, couples, families, and businesses. We blend creativity, technical excellence, and production-grade standards in every single frame.
            </p>
            <p style={{color:C.muted,lineHeight:1.9,marginBottom:30,fontWeight:300,fontSize:14}}>
              Beyond photography, our professional camera equipment rentals make us a complete one-stop destination for visual creation in Bangalore.
            </p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:36}}>
              {['Professional lighting & studio','Creative direction included','Outdoor & indoor locations','High-res edited deliverables'].map(f=>(
                <div key={f} style={{display:'flex',gap:9,alignItems:'flex-start'}}>
                  <span style={{color:C.gold,fontSize:11,flexShrink:0,marginTop:2}}>✦</span>
                  <span style={{color:C.muted,fontSize:13,lineHeight:1.6}}>{f}</span>
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
              <GBtn onClick={()=>{go('rentals');window.scrollTo(0,0);}}>View Rentals</GBtn>
              <WaBtn href={waP('photography')}/>
            </div>
          </div>
        </div>
      </section>

      {/* ── RENTALS CTA BAND ── */}
      <section id="rentals-band" style={{padding:'80px 6vw',maxWidth:1380,margin:'0 auto',display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between',gap:40}}>
        <div style={{maxWidth:520}}>
          <Label>Also Available</Label>
          <h2 className="serif" style={{color:C.cream,fontSize:'clamp(1.8rem,3.5vw,3rem)',fontWeight:400,lineHeight:1.1,marginBottom:12}}>
            Studio &amp; Equipment<br/><span style={{color:C.gold,fontStyle:'italic'}}>Rentals</span>
          </h2>
          <Rule/>
          <p style={{color:C.muted,lineHeight:1.85,fontWeight:300,fontSize:14}}>Sony, Canon &amp; Nikon cameras — professional lenses — all maintained and production-ready for your next project.</p>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <GBtn onClick={()=>{go('rentals');window.scrollTo(0,0);}}>Browse Rental Gear</GBtn>
          <WaBtn href={`${WA_R}${encodeURIComponent('Hi Nagarjun, I would like to enquire about equipment rentals at The Clicky Clicks.')}`}/>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section style={{background:C.bgDark,borderTop:`1px solid ${C.goldBr}`,padding:'88px 6vw',textAlign:'center'}}>
        <div style={{maxWidth:600,margin:'0 auto'}}>
          <Label>Get in Touch</Label>
          <h2 className="serif" style={{color:C.cream,fontSize:'clamp(2rem,5vw,4rem)',fontWeight:400,lineHeight:1.05,marginBottom:12}}>
            Book Your <span style={{color:C.gold,fontStyle:'italic'}}>Shoot Today</span>
          </h2>
          <Rule w={54}/>
          <p style={{color:C.muted,marginBottom:34,fontWeight:300,fontSize:15,lineHeight:1.8}}>
            Looking for professional photography or studio rentals in Bangalore?
          </p>
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:20,marginBottom:38}}>
            {[{t:'Vedanth — 7975163441',h:'tel:+917975163441'},{t:'View on Google Maps',h:'https://maps.app.goo.gl/nseBHa3zvMqa1AnTA'}].map(c=>(
              <a key={c.t} href={c.h} target={c.h.startsWith('http')?'_blank':undefined} rel="noopener noreferrer"
                style={{color:C.muted,textDecoration:'none',fontFamily:'monospace',fontSize:12,display:'flex',alignItems:'center',gap:7,transition:'color .2s'}}
                onMouseEnter={e=>(e.currentTarget.style.color=C.gold)}
                onMouseLeave={e=>(e.currentTarget.style.color=C.muted)}>
                <span style={{color:C.gold}}>{c.h.startsWith('tel')?'📞':'📍'}</span>{c.t}
              </a>
            ))}
          </div>
          <WaBtn href={waP('photography')}/>
        </div>
      </section>

      <Footer go={go}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// GALLERY PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function Gallery({svc,go}:{svc:typeof SVCS[0];go:(p:Page)=>void}) {
  const [lb,setLb]=useState<number|null>(null);
  useEffect(()=>{
    const fn=(e:KeyboardEvent)=>{
      if(lb===null)return;
      if(e.key==='ArrowRight')setLb(p=>p!==null?Math.min(p+1,svc.imgs.length-1):null);
      if(e.key==='ArrowLeft') setLb(p=>p!==null?Math.max(p-1,0):null);
      if(e.key==='Escape')    setLb(null);
    };
    window.addEventListener('keydown',fn);
    return()=>window.removeEventListener('keydown',fn);
  },[lb,svc.imgs.length]);

  return (
    <div style={{background:C.bg,minHeight:'100vh'}}>
      <section style={{padding:'90px 6vw 52px',maxWidth:1380,margin:'0 auto'}}>
        <button onClick={()=>{go('home');window.scrollTo(0,0);}}
          style={{background:'none',border:'none',cursor:'pointer',color:C.gold,fontFamily:'monospace',fontSize:10,letterSpacing:'.32em',textTransform:'uppercase',marginBottom:26,display:'flex',alignItems:'center',gap:7}}>
          ← Back to Home
        </button>
        <Label>The Clicky Clicks</Label>
        <h1 className="serif" style={{color:C.cream,fontSize:'clamp(2.2rem,5.5vw,5rem)',fontWeight:400,lineHeight:1,marginBottom:13,letterSpacing:'.02em'}}>{svc.label}</h1>
        <Rule w={56}/>
        <p style={{color:C.muted,fontSize:15,maxWidth:480,lineHeight:1.8,fontWeight:300}}>{svc.desc}</p>
      </section>

      <section style={{padding:'0 3px 80px',maxWidth:1380,margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))',gap:3}}>
          {svc.imgs.map((img,i)=>(
            <div key={i} onClick={()=>setLb(i)}
              style={{position:'relative',aspectRatio:'3/4',overflow:'hidden',background:C.bgCard,cursor:'pointer',border:`1px solid ${C.ghost}`}}
              className={`gw-${i}`}>
              <div style={{position:'absolute',inset:0}}><SafeImg src={img} alt={`${svc.short} ${i+1}`} cls={`gi-${i}`} style={{transition:'transform .6s'}}/></div>
              <div style={{position:'absolute',inset:0,background:'rgba(6,5,4,0)',transition:'background .35s'}} className={`go-${i}`}/>
              <div style={{position:'absolute',bottom:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${C.gold},transparent)`,transform:'scaleX(0)',transformOrigin:'left',transition:'transform .4s'}} className={`gb-${i}`}/>
              <style>{`
                .gw-${i}:hover .gi-${i}{transform:scale(1.06)!important}
                .gw-${i}:hover .go-${i}{background:rgba(6,5,4,.2)!important}
                .gw-${i}:hover .gb-${i}{transform:scaleX(1)!important}
              `}</style>
            </div>
          ))}
        </div>
      </section>

      <section style={{background:C.bgDark,borderTop:`1px solid ${C.goldBr}`,padding:'66px 6vw',textAlign:'center'}}>
        <Label>Ready to Create Your Story?</Label>
        <h2 className="serif" style={{color:C.cream,fontSize:'clamp(1.7rem,3.5vw,3rem)',fontWeight:400,marginBottom:28}}>
          Book Your <span style={{color:C.gold,fontStyle:'italic'}}>{svc.short}</span> Session
        </h2>
        <WaBtn href={waP(svc.label)}/>
      </section>

      {lb!==null&&(
        <div onClick={()=>setLb(null)}
          style={{position:'fixed',inset:0,zIndex:999,background:'rgba(4,3,2,.96)',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div onClick={e=>e.stopPropagation()} style={{position:'relative',maxWidth:'90vw',maxHeight:'90vh'}}>
            <img src={`/${svc.imgs[lb]}`} alt="" style={{maxWidth:'90vw',maxHeight:'85vh',objectFit:'contain',display:'block',border:`1px solid ${C.goldBr}`}}/>
            {lb>0&&<button onClick={()=>setLb(lb-1)} style={{position:'absolute',left:-46,top:'50%',transform:'translateY(-50%)',background:'transparent',border:`1px solid ${C.goldBr}`,color:C.gold,width:34,height:34,cursor:'pointer',fontSize:20,display:'flex',alignItems:'center',justifyContent:'center'}}>‹</button>}
            {lb<svc.imgs.length-1&&<button onClick={()=>setLb(lb+1)} style={{position:'absolute',right:-46,top:'50%',transform:'translateY(-50%)',background:'transparent',border:`1px solid ${C.goldBr}`,color:C.gold,width:34,height:34,cursor:'pointer',fontSize:20,display:'flex',alignItems:'center',justifyContent:'center'}}>›</button>}
            <button onClick={()=>setLb(null)} style={{position:'absolute',top:-38,right:0,background:'none',border:'none',color:C.gold,cursor:'pointer',fontSize:22}}>✕</button>
            <div style={{textAlign:'center',marginTop:10,color:'rgba(242,237,228,.25)',fontFamily:'monospace',fontSize:10,letterSpacing:'.28em'}}>{lb+1} / {svc.imgs.length}</div>
          </div>
        </div>
      )}
      <Footer go={go}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// RENTALS PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function Rentals({go}:{go:(p:Page)=>void}) {
  const [type, setType]=useState<'all'|'camera'|'lens'>('all');
  const [brand,setBrand]=useState<'all'|'Sony'|'Canon'|'Nikon'>('all');

  const items=GEAR.filter(g=>(type==='all'||g.type===type)&&(brand==='all'||g.brand===brand));

  const bCol={Sony:{bg:'rgba(0,90,210,.14)',br:'rgba(60,130,230,.3)',tx:'#88b4ff'},Canon:{bg:'rgba(210,20,20,.14)',br:'rgba(230,60,60,.3)',tx:'#ff9090'},Nikon:{bg:'rgba(20,160,20,.12)',br:'rgba(60,190,60,.28)',tx:'#88de88'}};

  const Fb=({label,active,fn}:{label:string;active:boolean;fn:()=>void})=>(
    <button onClick={fn}
      style={{padding:'8px 18px',cursor:'pointer',fontFamily:"'Raleway',sans-serif",
        fontSize:10,fontWeight:active?600:400,letterSpacing:'.2em',textTransform:'uppercase',
        background:active?`linear-gradient(135deg,${C.gold},${C.goldHi})`:'transparent',
        color:active?C.bgDark:C.muted,
        border:`1px solid ${active?C.gold:C.goldBr}`,
        transition:'all .22s'}}
      onMouseEnter={e=>{if(!active){(e.currentTarget as HTMLButtonElement).style.borderColor=C.gold;(e.currentTarget as HTMLButtonElement).style.color=C.gold;}}}
      onMouseLeave={e=>{if(!active){(e.currentTarget as HTMLButtonElement).style.borderColor=C.goldBr;(e.currentTarget as HTMLButtonElement).style.color=C.muted;}}}>
      {label}
    </button>
  );

  return (
    <div style={{background:C.bg,minHeight:'100vh'}}>

      <section style={{padding:'90px 6vw 56px',maxWidth:1380,margin:'0 auto',borderBottom:`1px solid ${C.goldBr}`}}>
        <button onClick={()=>{go('home');window.scrollTo(0,0);}}
          style={{background:'none',border:'none',cursor:'pointer',color:C.gold,fontFamily:'monospace',fontSize:10,letterSpacing:'.32em',textTransform:'uppercase',marginBottom:26,display:'flex',alignItems:'center',gap:7}}>
          ← Back to Home
        </button>
        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'flex-end',gap:32}}>
          <div>
            <Label>The Clicky Clicks — Nagarjun S</Label>
            <h1 className="serif" style={{color:C.cream,fontSize:'clamp(2.2rem,5.5vw,5rem)',fontWeight:400,lineHeight:1,letterSpacing:'.02em'}}>
              Equipment<br/><span style={{color:C.gold,fontStyle:'italic'}}>Rentals</span>
            </h1>
            <Rule w={56}/>
            <p style={{color:C.muted,fontSize:14,maxWidth:480,lineHeight:1.85,fontWeight:300}}>
              Premium cameras and professional lenses — maintained and production-ready. Available for photographers, filmmakers &amp; content creators across Bangalore.
            </p>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:11}}>
            <div style={{display:'flex',alignItems:'center',gap:13,padding:'14px 18px',background:C.bgCard,border:`1px solid ${C.goldBr}`}}>
              <span style={{fontSize:20}}>🎥</span>
              <div>
                <div style={{color:C.cream,fontWeight:600,fontSize:14}}>Nagarjun S</div>
                <a href="tel:+919880736666" style={{color:C.gold,fontFamily:'monospace',fontSize:11,textDecoration:'none'}}>+91 98807 36666</a>
              </div>
            </div>
            <WaBtn href={`${WA_R}${encodeURIComponent('Hi Nagarjun, I would like to enquire about equipment rentals at The Clicky Clicks. Please share availability and pricing.')}`}/>
          </div>
        </div>
      </section>

      <section style={{background:C.bgDark,padding:'18px 6vw',borderBottom:`1px solid ${C.goldBr}`}}>
        <div style={{maxWidth:1380,margin:'0 auto',display:'flex',flexWrap:'wrap',gap:24}}>
          {['Professionally maintained','Latest-gen gear','Flexible durations','Trusted across Bangalore'].map(f=>(
            <div key={f} style={{display:'flex',gap:8,alignItems:'center'}}>
              <span style={{color:C.gold,fontSize:10}}>✦</span>
              <span style={{color:C.muted,fontSize:12}}>{f}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:'32px 6vw 0',maxWidth:1380,margin:'0 auto'}}>
        <div style={{background:C.bgCard,border:`1px solid ${C.goldBr}`,padding:'22px 24px'}}>
          <div style={{display:'flex',flexWrap:'wrap',gap:28,alignItems:'flex-end'}}>
            <div>
              <div style={{color:C.gold,fontSize:9,fontFamily:'monospace',letterSpacing:'.42em',textTransform:'uppercase',marginBottom:9}}>Category</div>
              <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                {(['all','camera','lens'] as const).map(t=>(
                  <Fb key={t} label={t==='all'?'All':t==='camera'?'Cameras':'Lenses'} active={type===t} fn={()=>setType(t)}/>
                ))}
              </div>
            </div>
            <div style={{width:1,height:40,background:C.goldBr}}/>
            <div>
              <div style={{color:C.gold,fontSize:9,fontFamily:'monospace',letterSpacing:'.42em',textTransform:'uppercase',marginBottom:9}}>Brand</div>
              <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                {(['all','Sony','Canon','Nikon'] as const).map(b=>(
                  <Fb key={b} label={b==='all'?'All Brands':b} active={brand===b} fn={()=>setBrand(b)}/>
                ))}
              </div>
            </div>
            <div style={{marginLeft:'auto',display:'flex',alignItems:'flex-end',gap:10}}>
              <span className="serif" style={{color:C.gold,fontSize:26,fontWeight:400,lineHeight:1}}>{items.length}</span>
              <span style={{color:C.muted,fontFamily:'monospace',fontSize:9,letterSpacing:'.3em',textTransform:'uppercase',paddingBottom:3}}>items</span>
              {(type!=='all'||brand!=='all')&&(
                <button onClick={()=>{setType('all');setBrand('all');}}
                  style={{background:'none',border:`1px solid ${C.goldBr}`,color:C.gold,cursor:'pointer',fontFamily:'monospace',fontSize:9,letterSpacing:'.22em',textTransform:'uppercase',padding:'4px 11px',marginLeft:4}}>
                  Clear
                </button>
              )}
            </div>
          </div>
          {(type!=='all'||brand!=='all')&&(
            <div style={{marginTop:12,display:'flex',alignItems:'center',gap:8,borderTop:`1px solid ${C.ghost}`,paddingTop:10}}>
              <span style={{color:C.muted,fontSize:10,fontFamily:'monospace'}}>Active:</span>
              {brand!=='all'&&<span style={{background:C.goldLo,color:C.gold,padding:'2px 9px',fontSize:9,fontFamily:'monospace',letterSpacing:'.2em',textTransform:'uppercase',border:`1px solid ${C.goldBr}`}}>{brand}</span>}
              {type!=='all'&&<span style={{background:C.goldLo,color:C.gold,padding:'2px 9px',fontSize:9,fontFamily:'monospace',letterSpacing:'.2em',textTransform:'uppercase',border:`1px solid ${C.goldBr}`}}>{type==='camera'?'Cameras':'Lenses'}</span>}
            </div>
          )}
        </div>
      </section>

      <section style={{padding:'24px 4vw 80px',maxWidth:1380,margin:'0 auto'}}>
        {items.length===0?(
          <div style={{textAlign:'center',padding:'80px 20px'}}>
            <span style={{fontSize:44,opacity:.2}}>📷</span>
            <p style={{color:C.muted,marginTop:14,fontFamily:'monospace',fontSize:11,letterSpacing:'.3em',textTransform:'uppercase'}}>No items match your filters</p>
          </div>
        ):(
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(168px,1fr))',gap:10}}>
            {items.map((item,i)=>{
              const bc=bCol[item.brand as keyof typeof bCol]||bCol.Sony;
              return (
                <div key={i} style={{background:C.bgCard,border:`1px solid ${C.ghost}`,display:'flex',flexDirection:'column',transition:'border-color .28s,transform .28s'}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=C.goldBr;(e.currentTarget as HTMLDivElement).style.transform='translateY(-2px)';}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=C.ghost;(e.currentTarget as HTMLDivElement).style.transform='translateY(0)';}}>
                  <div style={{position:'relative',paddingTop:'100%',background:'#0d0b08',overflow:'hidden'}}>
                    <div style={{position:'absolute',inset:0,padding:12}}>
                      <SafeImg src={item.img} alt={item.name} style={{objectFit:'contain'}} cls={`ri-${i}`}/>
                    </div>
                    <div style={{position:'absolute',top:7,left:7,background:bc.bg,border:`1px solid ${bc.br}`,padding:'2px 7px',fontSize:8,fontFamily:'monospace',letterSpacing:'.18em',textTransform:'uppercase',color:bc.tx}}>{item.brand}</div>
                    <div style={{position:'absolute',top:7,right:7,background:C.goldLo,border:`1px solid ${C.goldBr}`,padding:'2px 7px',fontSize:8,fontFamily:'monospace',letterSpacing:'.18em',textTransform:'uppercase',color:C.gold}}>{item.type}</div>
                    <style>{`.ri-${i}{transition:transform .5s}.ri-${i}:hover{transform:scale(1.07)!important}`}</style>
                  </div>
                  <div style={{padding:'11px 11px 13px',display:'flex',flexDirection:'column',gap:9,flex:1}}>
                    <div style={{color:C.cream,fontSize:11.5,fontWeight:500,lineHeight:1.4,flex:1}}>{item.name}</div>
                    <WaBtn href={waR(item.name)} sm/>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section style={{background:C.bgDark,borderTop:`1px solid ${C.goldBr}`,padding:'78px 6vw',textAlign:'center'}}>
        <Label>Ready to Gear Up?</Label>
        <h2 className="serif" style={{color:C.cream,fontSize:'clamp(1.8rem,4vw,3.4rem)',fontWeight:400,lineHeight:1.1,marginBottom:10}}>
          Gear for the Visionary.<br/><span style={{color:C.gold,fontStyle:'italic'}}>Tools for the Pro.</span>
        </h2>
        <Rule w={54}/>
        <p style={{color:C.muted,maxWidth:440,margin:'0 auto 34px',lineHeight:1.85,fontWeight:300,fontSize:14}}>Call or WhatsApp to check availability, pricing, and custom packages.</p>
        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:14}}>
          <GBtn ghost href="tel:+919880736666">📞 Call Nagarjun</GBtn>
          <WaBtn href={`${WA_R}${encodeURIComponent('Hi Nagarjun, I would like to enquire about camera and equipment rentals. Please share availability and pricing.')}`}/>
        </div>
      </section>

      <Footer go={go}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [loaded,setLoaded]=useState(false);
  const [page,  setPage  ]=useState<Page>('home');
  const go=useCallback((p:Page)=>setPage(p),[]);
  const svc=SVCS.find(s=>s.id===page);

  return (
    <>
      <style suppressHydrationWarning>{CSS}</style>
      {!loaded&&<Preloader onDone={()=>setLoaded(true)}/>}
      <div style={{opacity:loaded?1:0,transition:'opacity .55s'}}>
        <Nav cur={page} go={go}/>
        <main>
          {page==='home'    && <Home    go={go}/>}
          {page==='rentals' && <Rentals go={go}/>}
          {svc              && <Gallery svc={svc} go={go}/>}
        </main>
      </div>
    </>
  );
}

