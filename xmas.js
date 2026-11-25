/* 🎄 크리스마스 꾸미기 — 이 파일만 index.html 에서 빼면 원래대로 돌아가요 (2026.12.26 0시부터는 저절로 꺼져요) */
(function () {
  if (Date.now() >= new Date('2026-12-26T00:00:00+09:00').getTime()) return;
  const start = () => {
window.__X = {
  add(sel, html, css) { document.querySelectorAll(sel).forEach(t => { if (getComputedStyle(t).position === 'static') t.style.position = 'relative'; const d = document.createElement('div'); d.className = 'xm'; d.style.cssText = 'position:absolute;pointer-events:none;z-index:30;' + (css || ''); d.innerHTML = html; t.appendChild(d); }); },
  snow(n, col, sh) { ['#intro', '#desk'].forEach(s => { const host = document.querySelector(s); if (!host) return; const L = document.createElement('div'); L.className = 'xm'; L.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:60;overflow:hidden'; let h = ''; for (let i = 0; i < n; i++) { const z = 2 + Math.random() * 5, x = Math.random() * 100, y = Math.random() * 100, o = .45 + Math.random() * .5; h += `<i style="position:absolute;left:${x}%;top:${y}%;width:${z}px;height:${z}px;border-radius:50%;background:${col};opacity:${o};box-shadow:${sh};filter:blur(${z > 5 ? .6 : 0}px)"></i>`; } L.innerHTML = h; host.appendChild(L); }); },
  flake(sz, col) { return `<svg width="${sz}" height="${sz}" viewBox="-12 -12 24 24" fill="none" stroke="${col}" stroke-width="1.4" stroke-linecap="round">${[0,60,120].map(a=>`<g transform="rotate(${a})"><line x1="0" y1="-10" x2="0" y2="10"/><path d="M-3 -7 L0 -4 L3 -7 M-3 7 L0 4 L3 7"/></g>`).join('')}</svg>`; }
};

window.__O = {
  css(t){const s=document.createElement('style');s.textContent=t;document.head.appendChild(s);},
  svgs(sel, inner, vb){document.querySelectorAll(sel).forEach(s=>{s.setAttribute('viewBox',vb||'-12 -12 24 24');s.innerHTML=inner;});},
  put(sel, html, css){document.querySelectorAll(sel).forEach(t=>{const d=document.createElement('span');d.className='xo';d.style.cssText='position:absolute;pointer-events:none;'+(css||'');d.innerHTML=html;t.appendChild(d);});},
  flake(c,w){return `<g fill="none" stroke="${c}" stroke-width="${w||1.6}" stroke-linecap="round">${[0,60,120].map(a=>`<g transform="rotate(${a})"><line y1="-10" y2="10"/><path d="M-3.2 -7.4 L0 -4.6 L3.2 -7.4 M-3.2 7.4 L0 4.6 L3.2 7.4"/></g>`).join('')}</g><circle r="1.6" fill="${c}"/>`;},
  star(c,c2){return `<path d="M0 -11 L3.1 -3.6 L11 -3.4 L4.8 1.6 L7 9.6 L0 5 L-7 9.6 L-4.8 1.6 L-11 -3.4 L-3.1 -3.6Z" fill="${c}" stroke="${c2||c}" stroke-width="1" stroke-linejoin="round"/><path d="M-2 -5 L0 -9 L1 -5Z" fill="#fff" opacity=".6"/>`;},
  bow(c,c2){return `<path d="M0 -1 C-4 -9 -11 -8 -10 -3 C-9 1 -4 1 0 -1Z M0 -1 C4 -9 11 -8 10 -3 C9 1 4 1 0 -1Z" fill="${c}"/><path d="M-1 0 L-5 10 L-2.6 8.6 L-1.4 11 L0.4 0Z M1 0 L5 10 L2.6 8.6 L1.4 11 L-0.4 0Z" fill="${c2}"/><circle r="2.4" fill="${c2}"/>`;}
};

window.__GLOBE = (variant) => {
  let sn=''; const R=Math.random; for(let i=0;i<34;i++){const a=R()*Math.PI*2,r=Math.sqrt(R())*56,x=72+Math.cos(a)*r,y=66+Math.sin(a)*r*.85;const z=.8+R()*1.8;sn+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${z.toFixed(1)}" fill="#fff" opacity="${(.75+R()*.25).toFixed(2)}"/>`;}
  const tree=(x,y,s,c1,c2)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -26 L10 -10 L5 -10 L13 2 L6 2 L15 14 L-15 14 L-6 2 L-13 2 L-5 -10 L-10 -10Z" fill="${c1}"/><path d="M0 -26 L10 -10 L5 -10 L13 2 L6 2 L15 14 L0 14Z" fill="${c2}"/><path d="M-9 -9 Q0 -6 8 -10 M-11 3 Q0 6 12 2" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".9"/><rect x="-2" y="14" width="4" height="4" fill="#B79A7A"/><path d="M0 -31 l1.4 3 3.2.2-2.5 2 .9 3.1L0 -24.6l-3 1.7.9-3.1-2.5-2 3.2-.2Z" fill="#F0CF7C"/></g>`;
  return `<svg width="143" height="196" viewBox="0 0 144 196" style="overflow:visible">
<defs>
 <radialGradient id="sgG" cx="38%" cy="30%" r="75%"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".7"/><stop offset=".5" stop-color="#EAF8F2" stop-opacity=".12"/><stop offset=".85" stop-color="#CDEDE0" stop-opacity=".3"/><stop offset="1" stop-color="#A9DCC7" stop-opacity=".6"/></radialGradient>
 <linearGradient id="sgSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D6F0E6"/><stop offset="1" stop-color="#EEF9F4"/></linearGradient>
 <linearGradient id="sgBase" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ADBC0"/><stop offset=".55" stop-color="#6CC3A0"/><stop offset="1" stop-color="#4FA987"/></linearGradient>
 <linearGradient id="sgBand" x1="0" x2="1"><stop offset="0" stop-color="#E2BF6A"/><stop offset=".5" stop-color="#F7E2A6"/><stop offset="1" stop-color="#D9B35B"/></linearGradient>
 <clipPath id="sgC"><circle cx="72" cy="68" r="62"/></clipPath>
 <filter id="sgSh" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#2F7F63" flood-opacity=".18"/></filter>
</defs>
<ellipse cx="72" cy="182" rx="50" ry="6" fill="#2F7F63" opacity=".12"/>
<g filter="url(#sgSh)">
 <g clip-path="url(#sgC)">
  <rect x="0" y="0" width="144" height="140" fill="url(#sgSky)"/>
  <path d="M8 104 Q40 90 72 98 T138 94 L144 140 L0 140Z" fill="#FFFFFF"/>
  <path d="M8 104 Q40 90 72 98 T138 94" stroke="#D3EEE2" stroke-width="1.4" fill="none"/>
  ${tree(52,92,1.05,'#7FCFB0','#68BC9C')}${tree(86,98,.78,'#94D9BE','#7CC8AA')}${tree(104,100,.55,'#A6E0C9','#8FD2B7')}
  <g transform="translate(30 98)"><circle r="7" fill="#fff" stroke="#D9EFE6"/><circle cy="-10" r="5" fill="#fff" stroke="#D9EFE6"/><circle cx="-1.6" cy="-11" r=".9" fill="#41574F"/><circle cx="1.6" cy="-11" r=".9" fill="#41574F"/><path d="M0 -9.6 l3 1 -3 .6Z" fill="#EFA46B"/><path d="M-5 -6 Q0 -3.5 5 -6" stroke="#E48C93" stroke-width="2" fill="none" stroke-linecap="round"/></g>
  ${sn}
 </g>
 <circle cx="72" cy="68" r="62" fill="url(#sgG)"/>
 <circle cx="72" cy="68" r="62" fill="none" stroke="#FFFFFF" stroke-width="2" opacity=".9"/>
 <circle cx="72" cy="68" r="62" fill="none" stroke="#BFE3D3" stroke-width="1" opacity=".8"/>
 <path d="M30 36 A50 50 0 0 1 64 14" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none" opacity=".85"/>
 <circle cx="26" cy="50" r="3.2" fill="#fff" opacity=".9"/>
 <path d="M112 96 A50 50 0 0 1 96 116" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".6"/>
 <ellipse cx="72" cy="118" rx="40" ry="7" fill="#5FB894"/>
 <path d="M32 118 Q72 126 112 118 L126 156 Q72 168 18 156Z" fill="url(#sgBase)"/>
 <path d="M32 118 Q72 126 112 118 L113.5 123 Q72 131 30.5 123Z" fill="#fff" opacity=".35"/>
 <path d="M21 144 Q72 154 123 144 L124.6 151 Q72 162 19.4 151Z" fill="url(#sgBand)"/>
 <path d="M18 156 Q72 168 126 156 L124 166 Q72 178 20 166Z" fill="#4A9E7F"/>
 <g transform="translate(72 150)"><path d="M0 0 C-5 -7 -13 -6 -12 -1 C-11 3 -5 2 0 0Z M0 0 C5 -7 13 -6 12 -1 C11 3 5 2 0 0Z" fill="#E48C93"/><path d="M-1 1 L-5 9 L-2.6 8 L-1.6 10 L.6 1Z M1 1 L5 9 L2.6 8 L1.6 10 L-.6 1Z" fill="#CC6B74"/><circle r="2.6" fill="#CC6B74"/></g>
</g>
</svg>`;
};

window.__D = (() => {
  const R = (a, b) => a + Math.random() * (b - a);
  const G1 = '#4E9B7C', G2 = '#69B795', G3 = '#8ACFB1', RED = '#D9707A', RED2 = '#BF5562', GOLD = '#E6C36E', GOLD2 = '#CFA651';
  const needles = (pts, len, n) => { let h = ''; pts.forEach(([x, y, a]) => { for (let k = 0; k < 7; k++) { const t = a + (k - 3) * .5 + R(-.2, .2), l = len * R(.75, 1.05), cx = x + Math.cos(t) * l * .45, cy = y + Math.sin(t) * l * .45; h += `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${(l * .55).toFixed(1)}" ry="${(l * .17).toFixed(1)}" transform="rotate(${(t * 180 / Math.PI).toFixed(0)} ${cx.toFixed(1)} ${cy.toFixed(1)})" fill="${[G1, G2, G3, G2, G1, G3, G2][k]}"/>`; } h += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(len * .28).toFixed(1)}" fill="${G1}"/>`; }); return h; };
  const berries = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="-3" cy="1" r="3.4" fill="${RED}"/><circle cx="3" cy="2" r="3.2" fill="${RED2}"/><circle cx="0" cy="-3.4" r="3" fill="#E68E96"/><circle cx="-4" cy="0" r=".9" fill="#fff" opacity=".8"/><circle cx="-.9" cy="-4.4" r=".8" fill="#fff" opacity=".8"/></g>`;
  const bow = (x, y, s, c1 = RED, c2 = RED2) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 C-5 -8 -14 -7 -13 -1 C-12 4 -5 3 0 0Z M0 0 C5 -8 14 -7 13 -1 C12 4 5 3 0 0Z" fill="${c1}"/><path d="M0 0 C-4 -5 -9 -5 -10 -2" stroke="#fff" stroke-width="1" fill="none" opacity=".4"/><path d="M-1 1 L-6 12 L-3 10.6 L-1.8 13 L.8 1Z M1 1 L6 12 L3 10.6 L1.8 13 L-.8 1Z" fill="${c2}"/><rect x="-3" y="-2.6" width="6" height="5.4" rx="2" fill="${c2}"/></g>`;
  const bell = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-5 4 Q-5 -5 0 -5 Q5 -5 5 4 L6.5 6 L-6.5 6Z" fill="${GOLD}"/><path d="M-3 3 Q-3 -3 0 -4" stroke="#FFF3CF" stroke-width="1.2" fill="none"/><circle cy="7" r="1.6" fill="${GOLD2}"/></g>`;
  return {
    wreath(d) { const r = d / 2 - 8, c = d / 2; let pts = []; for (let i = 0; i < 96; i++) { const a = i / 96 * Math.PI * 2; pts.push([c + Math.cos(a) * r, c + Math.sin(a) * r, a + Math.PI / 2 * (i % 2 ? 1 : -1)]); }
      let h = `<svg width="${d}" height="${d + 10}" viewBox="0 0 ${d} ${d + 10}" style="overflow:visible"><circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="${G2}" stroke-width="5" opacity=".55"/>${needles(pts, 9, 3)}`;
      [[.15, 1], [.42, .9], [.62, 1], [.85, .9]].forEach(([t, s]) => { const a = (t * 2 - .5) * Math.PI; h += berries(c + Math.cos(a) * r, c + Math.sin(a) * r, s); });
      [.28, .74].forEach(t => { const a = (t * 2 - .5) * Math.PI; h += `<circle cx="${c + Math.cos(a) * r}" cy="${c + Math.sin(a) * r}" r="2.2" fill="${GOLD}"/>`; });
      h += bow(c, c + r + 2, d > 120 ? 1.5 : 1.1); return h + '</svg>'; },
    swag(w, sag, bowAt) { let pts = []; for (let i = 0; i <= 40; i++) { const t = i / 40, x = t * w, y = 6 + Math.sin(t * Math.PI) * sag; pts.push([x, y, Math.PI / 2 + (i % 2 ? .9 : -.9)]); }
      let h = `<svg width="${w}" height="${sag + 30}" viewBox="0 0 ${w} ${sag + 30}" style="overflow:visible">${needles(pts, 8, 3)}`;
      [.22, .5, .78].forEach(t => { const x = t * w, y = 6 + Math.sin(t * Math.PI) * sag; h += berries(x, y + 2, .8) + bell(x + 9, y + 8, .9); });
      if (bowAt !== undefined) { h += bow(bowAt * w, 6 + Math.sin(bowAt * Math.PI) * sag, 1.2); }
      return h + '</svg>'; },
    corner(s) { let pts = []; for (let i = 0; i <= 14; i++) { const t = i / 14; pts.push([4 + t * 46, 4 + t * 4, Math.PI / 2 + (i % 2 ? 1 : -1)]); pts.push([4 + t * 4, 4 + t * 40, (i % 2 ? 0 : Math.PI)]); }
      return `<svg width="${60 * s}" height="${56 * s}" viewBox="0 0 60 56" style="overflow:visible">${needles(pts, 7, 2)}${berries(12, 12, 1)}${bell(22, 18, 1)}${bow(8, 8, .9)}</svg>`; },
    bauble(len, col, col2, pat) { return `<svg width="34" height="${len + 40}" viewBox="-17 0 34 ${len + 40}" style="overflow:visible"><line x1="0" y1="0" x2="0" y2="${len}" stroke="${GOLD2}" stroke-width="1"/><rect x="-4.5" y="${len}" width="9" height="6" rx="1.5" fill="${GOLD}"/><circle cy="${len + 19}" r="13" fill="${col}"/>${pat === 'stripe' ? `<path d="M-12 ${len + 15} Q0 ${len + 20} 12 ${len + 15}" stroke="${col2}" stroke-width="2.2" fill="none"/><path d="M-12.6 ${len + 22} Q0 ${len + 27} 12.6 ${len + 22}" stroke="${col2}" stroke-width="1.4" fill="none" stroke-dasharray="2 2"/>` : pat === 'dot' ? [-6, 0, 6].map((x, i) => `<circle cx="${x}" cy="${len + 19 + (i % 2 ? 3 : -1)}" r="1.8" fill="${col2}"/>`).join('') : `<path d="M0 ${len + 10} l2.2 4.6 5 .4-3.8 3.2 1.2 5L0 ${len + 26.4}l-4.6 2.8 1.2-5-3.8-3.2 5-.4Z" fill="${col2}"/>`}<ellipse cx="-4.6" cy="${len + 13}" rx="3.4" ry="5" fill="#fff" opacity=".55" transform="rotate(30 -4.6 ${len + 13})"/></svg>`; },
    star(len) { return `<svg width="30" height="${len + 34}" viewBox="-15 0 30 ${len + 34}" style="overflow:visible"><line x1="0" y1="0" x2="0" y2="${len}" stroke="${GOLD2}" stroke-width="1"/><path d="M0 ${len} l4 8.4 9.2.8-7 6 2.2 9L0 ${len + 19.4}l-8.4 4.8 2.2-9-7-6 9.2-.8Z" fill="${GOLD}" stroke="${GOLD2}" stroke-width=".8" stroke-linejoin="round"/><path d="M-1 ${len + 5} l1 -2 1 2Z" fill="#fff" opacity=".7"/></svg>`; },
    GOLD, RED, G2
  };
})();

window.__D.wreathThin = (d) => { const c=d/2, r=d/2-4; let h=`<svg width="${d}" height="${d+8}" viewBox="0 0 ${d} ${d+8}" style="overflow:visible"><circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="#8ACFB1" stroke-width="1.3"/>`;
 for(let i=0;i<18;i++){const a=i/18*Math.PI*2,x=c+Math.cos(a)*r,y=c+Math.sin(a)*r,t=a*180/Math.PI+(i%2?40:-40);h+=`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="3.6" ry="1.5" fill="${i%2?'#69B795':'#8ACFB1'}" transform="rotate(${t.toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;}
 [.12,.38,.88].forEach(f=>{const a=(f*2-.5)*Math.PI;h+=`<circle cx="${(c+Math.cos(a)*r).toFixed(1)}" cy="${(c+Math.sin(a)*r).toFixed(1)}" r="2.2" fill="#D9707A"/>`;});
 return h+'</svg>'; };

window.__GIFT=(w,h,c1,c2,rib)=>`<svg width="${w}" height="${h+12}" viewBox="0 0 ${w} ${h+12}" style="overflow:visible"><rect x="0" y="12" width="${w}" height="${h}" rx="3" fill="${c1}"/><rect x="-2" y="8" width="${w+4}" height="10" rx="2.5" fill="${c2}"/><rect x="${w/2-4}" y="8" width="8" height="${h+4}" fill="${rib}"/><rect x="0" y="${12+h*.1}" width="${w}" height="3" fill="#000" opacity=".05"/><g transform="translate(${w/2} 8)"><path d="M0 0 C-4 -8 -12 -7 -11 -2 C-10 2 -4 2 0 0Z M0 0 C4 -8 12 -7 11 -2 C10 2 4 2 0 0Z" fill="${rib}"/><circle r="2.4" fill="${rib}"/></g><path d="M2 9 Q${w*.3} 4 ${w*.5} 7 T${w+2} 8 L${w+2} 12 L-2 12Z" fill="#fff"/></svg>`;

window.__CH = {
 santa: (s=1) => `<svg width="${70*s}" height="${84*s}" viewBox="0 0 70 84" style="overflow:visible">
  <ellipse cx="35" cy="82" rx="24" ry="3.5" fill="#2F6F5A" opacity=".14"/>
  <rect x="21" y="70" width="11" height="10" rx="4" fill="#3C3F46"/><rect x="38" y="70" width="11" height="10" rx="4" fill="#3C3F46"/>
  <path d="M12 52 Q12 34 35 34 Q58 34 58 52 L58 66 Q58 74 35 74 Q12 74 12 66Z" fill="#D9606B"/>
  <rect x="12" y="56" width="46" height="7" fill="#3C3F46"/><rect x="30" y="55" width="10" height="9" rx="2" fill="#E6C36E"/><rect x="33" y="57.5" width="4" height="4" fill="#3C3F46"/>
  <path d="M12 66 Q35 76 58 66 L58 70 Q35 80 12 70Z" fill="#fff"/>
  <path d="M33 34 L37 34 L37 74 L33 74Z" fill="#fff" opacity=".9"/>
  <ellipse cx="9" cy="54" rx="6" ry="10" fill="#D9606B" transform="rotate(14 9 54)"/><circle cx="7" cy="63" r="4.5" fill="#fff"/>
  <ellipse cx="61" cy="54" rx="6" ry="10" fill="#D9606B" transform="rotate(-14 61 54)"/><circle cx="63" cy="63" r="4.5" fill="#fff"/>
  <circle cx="35" cy="24" r="14" fill="#F7D9C8"/>
  <path d="M20 26 Q22 46 35 48 Q48 46 50 26 Q44 32 35 31 Q26 32 20 26Z" fill="#fff"/>
  <path d="M28 31 Q31.5 28 35 31 Q38.5 28 42 31 Q38.5 33 35 32 Q31.5 33 28 31Z" fill="#F2F2F2"/>
  <circle cx="35" cy="28" r="2.6" fill="#EBA2A2"/>
  <circle cx="30" cy="22" r="1.6" fill="#3C3F46"/><circle cx="40" cy="22" r="1.6" fill="#3C3F46"/>
  <circle cx="25.5" cy="26" r="2.4" fill="#F2AEB0" opacity=".8"/><circle cx="44.5" cy="26" r="2.4" fill="#F2AEB0" opacity=".8"/>
  <path d="M20 16 Q22 2 38 4 Q52 6 56 18 L50 18 Q46 12 38 12 Q28 12 26 17Z" fill="#D9606B"/>
  <path d="M38 4 Q50 4 56 18" stroke="#BF4E59" stroke-width="1.2" fill="none"/>
  <rect x="18" y="14" width="36" height="7" rx="3.5" fill="#fff"/><circle cx="57" cy="20" r="4.6" fill="#fff"/></svg>`,
 deer: (s=1, scarf='#8ED3B5') => `<svg width="${72*s}" height="${80*s}" viewBox="0 0 72 80" style="overflow:visible">
  <ellipse cx="36" cy="78" rx="22" ry="3.4" fill="#2F6F5A" opacity=".14"/>
  <g stroke="#B88A5E" stroke-width="3" stroke-linecap="round" fill="none"><path d="M24 16 Q18 6 20 -2 M20 6 Q13 4 11 -2 M21 10 Q14 12 10 9"/><path d="M48 16 Q54 6 52 -2 M52 6 Q59 4 61 -2 M51 10 Q58 12 62 9"/></g>
  <path d="M16 56 Q16 40 36 40 Q56 40 56 56 L56 68 Q56 76 36 76 Q16 76 16 68Z" fill="#C79A6E"/>
  <ellipse cx="36" cy="62" rx="11" ry="10" fill="#F1DDC3"/>
  <rect x="22" y="70" width="9" height="8" rx="3.5" fill="#7A5A3E"/><rect x="41" y="70" width="9" height="8" rx="3.5" fill="#7A5A3E"/>
  <ellipse cx="17" cy="24" rx="7" ry="4" fill="#C79A6E" transform="rotate(-24 17 24)"/><ellipse cx="55" cy="24" rx="7" ry="4" fill="#C79A6E" transform="rotate(24 55 24)"/>
  <ellipse cx="17.5" cy="24" rx="4" ry="2" fill="#F2BFC0" transform="rotate(-24 17.5 24)"/><ellipse cx="54.5" cy="24" rx="4" ry="2" fill="#F2BFC0" transform="rotate(24 54.5 24)"/>
  <circle cx="36" cy="28" r="15" fill="#C79A6E"/>
  <ellipse cx="36" cy="35" rx="9" ry="7" fill="#F1DDC3"/>
  <circle cx="36" cy="31" r="4.2" fill="#E2545F"/><circle cx="34.6" cy="29.8" r="1.2" fill="#fff" opacity=".8"/>
  <circle cx="29.5" cy="24" r="1.8" fill="#3C3F46"/><circle cx="42.5" cy="24" r="1.8" fill="#3C3F46"/>
  <circle cx="25" cy="30" r="2.4" fill="#F2AEB0" opacity=".7"/><circle cx="47" cy="30" r="2.4" fill="#F2AEB0" opacity=".7"/>
  <path d="M19 42 Q36 50 53 42 L53 48 Q36 56 19 48Z" fill="${scarf}"/><path d="M44 47 L49 60 L54 58 L50 46Z" fill="${scarf}"/><path d="M45 52 l6 -2 M47 56 l6 -2" stroke="#fff" stroke-width="1.2" opacity=".7"/></svg>`,
 sleigh: (w=260) => `<svg width="${w}" height="${w*.32}" viewBox="0 0 260 84" style="overflow:visible"><path d="M250 64 Q200 74 150 60" stroke="#BFE3D3" stroke-width="2" stroke-dasharray="2 6" stroke-linecap="round" fill="none"/>
  ${[0,30,60].map(x=>`<g transform="translate(${x} ${x*.08})" fill="#8FCFB3"><path d="M8 30 Q8 22 18 22 L34 22 Q40 22 40 28 L40 31 Q40 34 36 34 L12 34 Q8 34 8 30Z"/><path d="M36 22 L42 12 L46 13 L42 22Z"/><circle cx="46" cy="12" r="5"/><path d="M45 7 L42 0 M47 7 L51 1 M42 3 L39 1 M50 3 L53 2" stroke="#8FCFB3" stroke-width="1.6" stroke-linecap="round"/><path d="M12 34 L10 42 M18 34 L17 42 M30 34 L32 42 M36 34 L38 42" stroke="#8FCFB3" stroke-width="2.4" stroke-linecap="round"/></g>`).join('')}
  <circle cx="111" cy="17" r="2.4" fill="#E2545F"/>
  <path d="M40 30 L118 40" stroke="#C9E7DA" stroke-width="1.2"/>
  <g transform="translate(118 26)" fill="#8FCFB3"><path d="M0 14 Q4 30 26 30 L60 30 Q70 30 72 22 L76 6 L70 6 L66 18 L10 18 Q6 18 4 10Z"/><path d="M-4 36 Q30 40 70 36 Q78 35 80 30" stroke="#8FCFB3" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="40" cy="8" r="8" fill="#E8A4A9"/><path d="M33 4 Q40 -10 48 2Z" fill="#E8A4A9"/><circle cx="49" cy="2" r="2.4" fill="#fff"/><rect x="54" y="6" width="12" height="12" rx="2" fill="#F1D79A"/></g></svg>`
};

const XO = window.__O, D = window.__D, CH = window.__CH;
const K = (sel, key, html, css) => document.querySelectorAll(sel).forEach(t => {
  if (t.querySelector(`:scope > .xm[data-k="${key}"]`)) return;
  if (getComputedStyle(t).position === 'static') t.style.position = 'relative';
  const d = document.createElement('div'); d.className = 'xm'; d.dataset.k = key;
  d.style.cssText = 'position:absolute;pointer-events:none;z-index:30;' + (css || ''); d.innerHTML = html; t.appendChild(d); });
const SV = (sel, inner) => document.querySelectorAll(sel).forEach(s => { if (s.dataset.xm) return; s.dataset.xm = 1; s.setAttribute('viewBox', '-12 -12 24 24'); s.innerHTML = inner; });
const PHONE = () => matchMedia('(max-width:720px),(max-height:500px)').matches;
const cap = h => `<svg viewBox="0 0 300 22" preserveAspectRatio="none" style="width:100%;height:${h || 20}px;display:block;filter:drop-shadow(0 2px 2px rgba(90,150,130,.16))"><path d="M0 8 Q10 0 22 6 T48 7 Q60 1 74 8 T102 6 Q118 0 132 9 T160 7 Q176 0 190 8 T220 6 Q236 1 250 9 T280 6 Q292 2 300 8 L300 0 L0 0Z" fill="#fff"/><path d="M14 6 q4 9 8 0 M96 7 q3 11 7 0 M184 8 q3 8 6 0 M262 8 q4 12 8 0" fill="#fff"/></svg>`;
const tag = t => `<span style="font:800 10px 'DM Mono',monospace;letter-spacing:.24em;color:#6FC4A2;white-space:nowrap">${t}</span>`;

/* 모양 바꾸기 + 기본 스타일 (한 번만) */
XO.css(`.gt-cr::before,.gt-cr::after{display:none!important}
.gt-rings circle{stroke-dasharray:1.5 7!important;stroke-linecap:round!important;stroke-width:2.2!important;stroke:#C6E6D8!important}
.gt-ball,.gt-db,.gt-bstar{display:none!important}
.gt-tk,.gt-stub,form.gt-gate,.sy-hero,.apps-panel,.spec{overflow:visible!important}
.xm-snow{position:fixed;inset:0;pointer-events:none;z-index:60;overflow:hidden}
.xm-snow i{position:absolute;top:-12px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff,#D4EEF0 70%);box-shadow:0 0 0 1px rgba(110,185,170,.5),0 1px 3px rgba(80,150,140,.2);animation:xmFall linear infinite;will-change:transform}
@keyframes xmFall{0%{transform:translate3d(0,-20px,0)}50%{transform:translate3d(14px,55vh,0)}100%{transform:translate3d(-6px,112vh,0)}}
@media (prefers-reduced-motion:reduce){.xm-snow i{animation:none;top:auto}}`);

const snow = host => { if (!host || host.querySelector(':scope > .xm-snow')) return; const L = document.createElement('div'); L.className = 'xm-snow xm'; let h = '';
  const n = PHONE() ? 18 : 34; for (let i = 0; i < n; i++) { const z = 1.6 + Math.random() * 3.2; h += `<i style="left:${(Math.random() * 100).toFixed(1)}%;width:${z.toFixed(1)}px;height:${z.toFixed(1)}px;opacity:${(.55 + Math.random() * .4).toFixed(2)};animation-duration:${(12 + Math.random() * 12).toFixed(1)}s;animation-delay:-${(Math.random() * 24).toFixed(1)}s"></i>`; }
  L.innerHTML = h; host.appendChild(L); };

const run = () => {
  SV('.gt-sp, .dfx-sp', XO.flake('#7FCFB0', 1.4));
  K('.gt-cr', 'cr', `<svg width="22" height="22" viewBox="-12 -12 24 24">${XO.flake('#9ED9C2', 1.3)}</svg>`, 'left:-1px;top:-1px');
  snow(document.getElementById('intro')); snow(document.getElementById('desk'));
  /* 비번 카드 */
  K('form.gt-gate', 'cap', cap(), 'left:-2px;right:-2px;top:-6px;z-index:2');
  const l = document.querySelector('.gt-lock'); if (l && l.offsetParent) K('form.gt-gate', 'wr', D.wreath(86), `left:calc(50% - 43px);top:${l.offsetTop - 12.5}px;z-index:0`);
  K('form.gt-gate', 'st', D.star(40), 'right:40px;top:4px;z-index:1');
  K('form.gt-gate', 'bb', D.bauble(16, '#F1D79A', '#fff', 'dot'), 'right:72px;top:4px;z-index:1');
  K('form.gt-gate', 'deer', CH.deer(.8), 'left:22px;top:-58px;z-index:3');
  /* 입장 티켓 */
  K('.gt-stub', 'cap', cap(), 'left:-1px;right:-1px;top:-6px;z-index:2');
  K('.en-hit', 'cap', cap(10), 'left:10px;right:10px;top:-4px;z-index:2');
  { const v = document.querySelector('.gt-vin'); if (v && v.offsetWidth) { const w = Math.round(v.offsetWidth * 1.07); K('.gt-vin', 'wr', D.wreathThin(w), `left:calc(50% - ${w / 2}px);top:calc(50% - ${w / 2}px);z-index:3`); } }
  if (!PHONE()) {
    const sc = .86;
    K('.gt-tk', 'grp', `<div style="position:relative;width:330px;height:180px">
      <div style="position:absolute;left:0;bottom:0">${window.__GIFT(60, 44, '#F4F1EA', '#E9E3D6', '#D9707A')}</div>
      <div style="position:absolute;left:52px;bottom:0">${window.__GIFT(34, 26, '#F1D79A', '#E8C97E', '#D9707A')}</div>
      <div style="position:absolute;left:96px;bottom:${-(196 - 170) * sc}px;transform:scale(${sc});transform-origin:50% 100%">${window.__GLOBE()}</div>
      <div style="position:absolute;left:226px;bottom:0">${window.__GIFT(42, 32, '#8ED3B5', '#7CC7A6', '#E6C36E')}</div>
      <div style="position:absolute;left:262px;bottom:-2px">${CH.deer(.82)}</div>
      <div style="position:absolute;left:-14px;right:-6px;bottom:-7px;height:12px;border-radius:50%;background:radial-gradient(closest-side,rgba(60,120,100,.2),transparent)"></div></div>`, 'right:30px;bottom:calc(100% - 6px);z-index:4');
    K('#intro .gt-stage', 'sleigh', CH.sleigh(230), 'left:500px;top:118px;z-index:2;opacity:.95');
    K('.gt-tk', 'santa', CH.santa(.95), 'left:-40px;bottom:-6px;z-index:5');
  }
  /* 메인 */
  K('.sy-hero', 'cap', cap(), 'left:-1px;right:-1px;top:-6px;z-index:2');
  K('.apps-panel', 'cap', cap(), 'left:-1px;right:-1px;top:-6px;z-index:2');
  K('.spec', 'cap', cap(16), 'left:-1px;right:-1px;top:-5px');
  K('#winlayer .win.passwin', 'cap', cap(), 'left:-1px;right:-1px;top:-6px;z-index:40');
  if (!PHONE()) {
    K('.sy-hero', 'corner', D.corner(1.2), 'left:-6px;top:-6px;z-index:3');
    K('.sy-hero', 'b1', D.bauble(18, '#8ED3B5', '#fff', 'stripe'), 'left:560px;top:2px;z-index:3');
    K('.sy-hero', 'b2', D.star(34), 'left:594px;top:2px;z-index:3');
    K('.sy-hero', 'b3', D.bauble(10, '#F2B7BC', '#fff', 'dot'), 'left:628px;top:2px;z-index:3');
    K('.sy-hero', 'santa', CH.santa(.8), 'left:720px;top:-58px;z-index:4');
    K('.apps-panel', 'swag', D.swag(240, 14, 1), 'right:-8px;top:-10px;z-index:3');
    K('.apps-panel', 'deer', CH.deer(.66), 'left:120px;top:-46px;z-index:4');
    K('#winlayer .win.passwin', 'corner', D.corner(1), 'right:-6px;top:-6px;transform:scaleX(-1);z-index:41');
    K('.spec', 'bb', D.bauble(14, '#8ED3B5', '#fff', 'star'), 'right:46px;top:0;z-index:3');
  }
};
let q = 0; const go = () => { if (!q) q = requestAnimationFrame(() => { q = 0; try { run(); } catch (e) {} }); };
run(); new MutationObserver(go).observe(document.body, { childList: true, subtree: true }); setTimeout(go, 1500); setTimeout(go, 4000);

  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
