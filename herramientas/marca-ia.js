// Añade a una Revista IA el logo de Endodoncia Badajoz, la red neuronal y la etiqueta «Inteligencia artificial».
// Uso: node herramientas/marca-ia.js numeros/ia-AAAAMMDD.html   (idempotente)
const fs=require('fs');const f=process.argv[2];let h=fs.readFileSync(f,'utf8');
if(h.includes('eb-brand')){console.log('ya aplicado');process.exit(0)}
const css=`<style>/*marca-eb*/
.cover{position:relative;isolation:isolate}
.eb-brand{display:inline-flex;align-items:center;gap:10px;justify-self:start;padding:5px 14px 5px 5px;border-radius:999px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);font:600 14px/1 var(--display,system-ui),system-ui,sans-serif;color:var(--ink);letter-spacing:.01em;text-decoration:none}
.eb-brand .eb-logo{width:34px;height:34px;border-radius:50%;background:#fff;display:grid;place-items:center;flex:none}
.eb-brand img{width:24px;height:24px;display:block}
.eb-brand small{font-weight:500;color:var(--muted);font-size:12px;margin-left:2px}
.eb-net{position:absolute;right:0;top:112px;width:min(240px,30%);height:auto;z-index:-1;opacity:.95;pointer-events:none}
.eb-net line{stroke:url(#ebg);stroke-width:1.2;opacity:.45}
.eb-net circle{fill:#0b1020;stroke:url(#ebg);stroke-width:2}
.eb-net circle.on{fill:url(#ebg);animation:ebpulse 2.4s ease-in-out infinite}
.eb-net circle.on:nth-of-type(2n){animation-delay:.8s}.eb-net circle.on:nth-of-type(3n){animation-delay:1.6s}
@keyframes ebpulse{0%,100%{opacity:.35}50%{opacity:1}}
.pill.ai{display:inline-flex;align-items:center;gap:6px;background:linear-gradient(90deg,rgba(127,140,255,.22),rgba(255,111,156,.22));border-color:rgba(179,155,255,.45)}
.pill.ai svg{width:14px;height:14px}
@media (max-width:640px){.eb-net{opacity:.3;width:55%;top:60px}}
</style>`;
// red neuronal 3-4-3
const L=[[40,[40,100,160]],[150,[20,75,125,180]],[260,[40,100,160]]];
let lines='',nodes='';let k=0;
for(let i=0;i<2;i++)for(const a of L[i][1])for(const b of L[i+1][1])lines+=`<line x1="${L[i][0]}" y1="${a}" x2="${L[i+1][0]}" y2="${b}"/>`;
for(const [x,ys] of L)for(const y of ys){nodes+=`<circle class="${(k++%2)?'on':''}" cx="${x}" cy="${y}" r="${x===150?8:7}"/>`}
const svg=`<svg class="eb-net" viewBox="0 0 300 200" aria-hidden="true"><defs><linearGradient id="ebg" x1="0" x2="1"><stop offset="0" stop-color="#7f8cff"/><stop offset=".5" stop-color="#ff6f9c"/><stop offset="1" stop-color="#3fe0c5"/></linearGradient></defs>${lines}${nodes}</svg>`;
const brand=`<a class="eb-brand" href="https://revistas.endodonciabadajoz.com/" aria-label="Endodoncia Badajoz"><span class="eb-logo"><img src="../logo.png" alt=""></span>Endodoncia Badajoz<small>· Revistas</small></a>`;
const chip=`<span class="pill ai"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="url(#ebg)" d="M12 2l2.2 6.3L20.5 10l-6.3 2.2L12 18.5l-2.2-6.3L3.5 10l6.3-1.7z"/><path fill="#3fe0c5" d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z"/></svg>Inteligencia artificial</span>`;
const n0=h.length;
h=h.replace('<header class="cover">',css+'<header class="cover">'+svg+brand);
h=h.replace(/<span class="pill ink">[^<]*<\/span>/,m=>m+chip);
if(h.split('eb-brand').length<3||!h.includes('pill ai')){console.log('fallo');process.exit(1)}
fs.writeFileSync(f,h);console.log('ok',n0,h.length);
