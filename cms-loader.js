/* =========================================================
   cms-loader.js — 관리자 화면(Pages CMS)에서 고친 내용을 불러와요.
   content/*.json 을 읽어서 data.js 위에 덮어쓴 다음 script.js 를 실행해요.
   어떤 파일을 못 읽으면 그 부분만 data.js 내용 그대로 보여줘요.
   (이 파일은 자동으로 만든 거라 보통은 고칠 필요 없어요)
   ========================================================= */
(() => {
  const SCRIPT = 'script.js?v=202611210140';
  const TUPLES = [["heroTicket.info",["k","v"]],["blueprint.labels",["k","v"]],["blueprint.spare.*.rows",["k","v"]],["blueprint.stack.*.rows",["k","v"]],["spec.cells",["k","v"]],["home.note.list",["no","title","done"]],["characters.tabs",["key","label"]],["W.member.*.spec",["k","v"]],["W.member.*.profile.rows",["k","v"]],["W.member.*.talk.*.replies",["who","text"]],["W.member.*.sections.*.rows",["k","v"]],["W.member.*.sections.*.groups.*.items",["k","v"]],["A.items",["title","date","img"]],["A.rows",["text","date"]],["A.info",["k","v"]],["A.table",["k","v"]],["A.groups",["name","handle","items"]],["A.crew",["top","small","name","img","link"]]];
  const FILES = [["basic",["brand","title","pair","pairs","pairLabels","heroTicket","studio","online","residence","venue","passLabel","footer","marquee","credit","clinic","cursor"]],["intro",["intro"]],["home",["home"]],["apps",null],["music",["bgm"]],["members",["memberOpen","members"]],["characters",null],["world-seiran",null],["world-arch",null],["world-frontline",null],["world-etc",null],["chat",["chat","toasts"]],["memo",["memo"]],["records",["records"]],["notice",["notice"]],["neighbors",["neighbors"]],["links",["links"]],["internet",["internet"]],["game",["game"]],["widgets",["monitor","pedal"]],["drawing",["blueprint","spec"]]];
  const SPECIAL = ["about","inventory","linked","ooc","prompt"];

  const run = () => { const s = document.createElement('script'); s.src = SCRIPT; document.body.appendChild(s); };
  if (typeof SITE !== 'object' || !window.fetch) { run(); return; }

  const isObj = o => o && typeof o === 'object' && !Array.isArray(o);
  const clone = o => JSON.parse(JSON.stringify(o));
  // CMS가 빈칸을 null 로 저장해도 깨지지 않게
  const clean = o => Array.isArray(o) ? o.map(clean) : isObj(o) ? Object.fromEntries(Object.entries(o).map(([k, v]) => [k, clean(v)])) : (o == null ? '' : o);

  // 관리자 화면용 {k, v} → 홈페이지용 ['k', 'v']
  const at = (o, parts, fn) => {
    if (o == null) return;
    const [h, ...rest] = parts;
    if (h === '*') { if (Array.isArray(o)) o.forEach(x => at(x, rest, fn)); return; }
    if (!rest.length) { if (Array.isArray(o[h])) o[h] = fn(o[h]); return; }
    at(o[h], rest, fn);
  };
  const back = (o, prefix) => TUPLES.filter(([p]) => p.indexOf(prefix) === 0).forEach(([p, keys]) =>
    at(o, p.slice(prefix.length).split('.'), a => a.map(r => isObj(r) ? keys.map(k => k === 'items' ? (Array.isArray(r[k]) ? r[k] : []) : (r[k] === undefined ? '' : r[k])) : r)));

  // 빠진 칸 채우기 : 관리자 화면이 빈 목록을 지워도 홈페이지가 깨지지 않게
  //  - 원래 모든 항목에 있던 칸(필수)은 비어 있으면 빈 값으로 채우고
  //  - 일부 항목에만 있던 칸(선택)은 관리자 화면이 빈 값으로 저장했으면 지워요 (빈 칸 때문에 화면이 바뀌지 않게)
  const emptyLike = v => Array.isArray(v) ? [] : isObj(v) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, emptyLike(x)])) : typeof v === 'string' ? '' : typeof v === 'boolean' ? false : v;
  const union = arr => arr.filter(isObj).reduce((t, o) => { for (const k in o) if (t[k] === undefined || (Array.isArray(t[k]) && !t[k].length)) t[k] = o[k]; return t; }, {});
  const deepEmpty = v => v === '' || v === false || v == null || (Array.isArray(v) && v.every(deepEmpty)) || (isObj(v) && Object.values(v).every(deepEmpty));
  function fillList(nv, ov) {
    const objs = ov.filter(isObj);
    if (!objs.length) return nv;
    const t = union(objs);
    const req = Object.keys(t).filter(k => objs.every(o => k in o));
    return nv.map((x, i) => {
      if (!isObj(x)) return x;
      const r = Object.assign({}, x), orig = isObj(ov[i]) ? ov[i] : null;
      req.forEach(k => { if (!(k in r)) r[k] = emptyLike(t[k]); });
      for (const k in r) {
        if (k in t) r[k] = fill(r[k], orig && k in orig ? orig[k] : t[k], false);
        if (!req.includes(k) && !(orig && k in orig) && deepEmpty(r[k])) delete r[k];
      }
      return r;
    });
  }
  function fill(nv, ov, real) {
    if (Array.isArray(ov)) {
      if (!Array.isArray(nv)) return real ? ov : [];
      return fillList(nv, ov);
    }
    if (isObj(ov)) {
      if (!isObj(nv)) return real ? ov : emptyLike(ov);
      const r = Object.assign({}, nv);
      for (const k in ov) r[k] = k in nv ? fill(nv[k], ov[k], real) : (real ? ov[k] : emptyLike(ov[k]));
      return r;
    }
    return nv === undefined ? ov : nv;
  }

  const get = f => fetch('content/' + f + '.json?t=' + Date.now(), { cache: 'no-store' }).then(r => r.ok ? r.json() : null).catch(() => null);

  const apply = (f, keys, d) => {
    d = clean(d);
    if (keys) {
      back(d, '');
      keys.forEach(k => { if (k in d) SITE[k] = fill(d[k], SITE[k], true); });
    } else if (f === 'characters') {
      back(d, 'characters.');
      const W = SITE.characters.worlds, base = Object.assign({}, SITE.characters);
      delete base.worlds; delete d.worlds;
      SITE.characters = fill(d, base, true);
      SITE.characters.worlds = W;
    } else if (f.indexOf('world-') === 0) {
      const w = f.slice(6), W = SITE.characters.worlds;
      back(d, 'W.');
      W[w] = fill(d, W[w] || {}, true);
    } else if (f === 'apps') {
      const old = SITE.extraApps || [];
      const byId = {};
      (d.grid || []).forEach(a => { if (isObj(a)) byId[a.id] = Object.assign({ type: 'grid' }, a); });
      (d.list || []).forEach(a => { if (isObj(a)) byId[a.id] = Object.assign({ type: 'list' }, a); });
      SPECIAL.forEach(t => { if (isObj(d[t]) && d[t].id) byId[d[t].id] = Object.assign({ type: t }, d[t]); });
      const order = (Array.isArray(d.order) ? d.order : []).filter(id => byId[id]);
      Object.keys(byId).forEach(id => order.includes(id) || order.push(id));
      SITE.extraApps = order.map(id => {
        const a = byId[id]; back(a, 'A.');
        const same = old.find(o => o.id === id);
        return fill(a, same || union(old.filter(o => o.type === a.type)), !!same);
      });
    }
  };

  Promise.all(FILES.map(([f]) => get(f))).then(list => {
    list.forEach((d, i) => { if (isObj(d)) { try { apply(FILES[i][0], FILES[i][1], d); } catch (e) { console.warn('cms-loader', FILES[i][0], e); } } });
  }).catch(() => {}).then(run);
})();
