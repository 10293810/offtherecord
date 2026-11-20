/* =========================================================
   cms-loader.js — 관리자 화면(Pages CMS)에서 고친 내용을 불러와요.
   content/ 폴더의 JSON을 읽어서 data.js 내용 위에 덮어쓴 다음 script.js를 실행해요.
   JSON을 못 읽으면 data.js 내용 그대로 보여줘요.
   ========================================================= */
(() => {
  const WORLDS = ['seiran', 'frontline', 'etc'];   // 관리자 화면에서 고치는 캐릭터 정리 앱
  const SCRIPT = 'script.js?v=202611210120';

  // CMS가 비운 칸을 null로 저장해도 홈페이지가 깨지지 않게 '' 로 바꿔요
  const clean = o => {
    if (Array.isArray(o)) return o.map(clean);
    if (o && typeof o === 'object') { const r = {}; for (const k in o) r[k] = clean(o[k]); return r; }
    return o == null ? '' : o;
  };
  const arr = a => Array.isArray(a) ? a : [];
  const obj = o => (o && typeof o === 'object' && !Array.isArray(o)) ? o : {};
  // 관리자 화면용 {k, v} 모양 → 홈페이지용 ['k', 'v'] 모양
  const pairs = (a, x, y) => arr(a).map(r => Array.isArray(r) ? r : [obj(r)[x] ?? '', obj(r)[y] ?? '']);

  const member = m => {
    m = obj(m);
    const profile = obj(m.profile);
    return Object.assign({}, m, {
      tags: arr(m.tags),
      spec: pairs(m.spec, 'k', 'v'),
      theme: Object.assign({ title: 'CHARACTER SONG', src: '' }, obj(m.theme)),
      profile: Object.assign({}, profile, { rows: pairs(profile.rows, 'k', 'v') }),
      prompts: arr(m.prompts),
      gallery: arr(m.gallery),
      music: arr(m.music),
      talk: arr(m.talk).map(t => Object.assign({}, obj(t), { replies: pairs(obj(t).replies, 'who', 'text') }))
    });
  };
  const pair = p => { p = obj(p); return Object.assign({}, p, { a: obj(p.a), b: obj(p.b) }); };

  const run = () => { const s = document.createElement('script'); s.src = SCRIPT; document.body.appendChild(s); };

  const W = (typeof SITE === 'object' && SITE.characters && SITE.characters.worlds) || null;
  if (!W || !window.fetch) { run(); return; }

  Promise.all(WORLDS.map(w =>
    fetch('content/' + w + '.json?t=' + Date.now(), { cache: 'no-store' })
      .then(r => r.ok ? r.json() : null).catch(() => null)
  )).then(list => {
    list.forEach((d, i) => {
      if (!d || !W[WORLDS[i]]) return;
      d = clean(d);
      if (Array.isArray(d.member)) W[WORLDS[i]].member = d.member.map(member);
      if (Array.isArray(d.pair)) W[WORLDS[i]].pair = d.pair.map(pair);
    });
  }).catch(() => {}).then(run);
})();
