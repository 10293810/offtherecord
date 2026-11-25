/* ❄ Snowball 3D — 스노우볼 장면 (three.js r128) */
(function () {
  const T = window.THREE;
  const rnd = (a, b) => a + Math.random() * (b - a);

  /* ---------- 질감 ---------- */
  const canvasTex = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); const t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding; return t; };
  const fuzzTex = () => canvasTex(256, 256, (g, w, h) => { g.fillStyle = '#fff'; g.fillRect(0, 0, w, h); for (let i = 0; i < 9000; i++) { const v = 200 + Math.random() * 55 | 0; g.fillStyle = `rgb(${v},${v},${v})`; const x = Math.random() * w, y = Math.random() * h; g.fillRect(x, y, 1 + Math.random() * 2, 1); } });
  const FUZZ = fuzzTex(); FUZZ.wrapS = FUZZ.wrapT = T.RepeatWrapping; FUZZ.repeat.set(3, 3);
  const snowTex = canvasTex(512, 512, (g, w, h) => { g.fillStyle = '#F6F4FA'; g.fillRect(0, 0, w, h); for (let i = 0; i < 26000; i++) { const v = 228 + Math.random() * 27 | 0; g.fillStyle = `rgba(${v - 6},${v - 8},${v},.9)`; g.fillRect(Math.random() * w, Math.random() * h, 1.6, 1.6); } });
  snowTex.wrapS = snowTex.wrapT = T.RepeatWrapping; snowTex.repeat.set(6, 6);
  const dotTex = canvasTex(64, 64, (g) => { const r = g.createRadialGradient(32, 32, 0, 32, 32, 32); r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(.45, 'rgba(255,255,255,.9)'); r.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = r; g.fillRect(0, 0, 64, 64); });
  const glowTex = canvasTex(128, 128, (g) => { const r = g.createRadialGradient(64, 64, 0, 64, 64, 64); r.addColorStop(0, 'rgba(255,236,170,.9)'); r.addColorStop(.3, 'rgba(255,226,150,.35)'); r.addColorStop(1, 'rgba(255,220,140,0)'); g.fillStyle = r; g.fillRect(0, 0, 128, 128); });

  const plush = (hex, rough = 1) => new T.MeshStandardMaterial({ color: hex, roughness: rough, metalness: 0, flatShading: true, bumpMap: FUZZ, bumpScale: .012 });
  const mat = (hex, o = {}) => new T.MeshStandardMaterial(Object.assign({ color: hex, roughness: .8, metalness: 0, flatShading: true }, o));
  const ico = (r, d = 2) => new T.IcosahedronGeometry(r, d);
  const M = (g, m, x = 0, y = 0, z = 0) => { const o = new T.Mesh(g, m); o.position.set(x, y, z); return o; };

  /* ---------- 얼굴 (구 앞쪽 덮개에 그림) ---------- */
  const faceTex = (face, dark) => canvasTex(256, 256, (g) => {
    const ink = dark ? '#FFFFFF' : '#3A3440'; g.lineCap = 'round'; g.lineJoin = 'round';
    const ex = [92, 164], ey = 118;
    const eye = (x, k) => { g.strokeStyle = g.fillStyle = ink; g.lineWidth = 7;
      if (k === 'smile') { g.beginPath(); g.arc(x, ey + 6, 13, Math.PI * 1.15, Math.PI * 1.85); g.stroke(); }
      else if (k === 'sleepy') { g.beginPath(); g.arc(x, ey - 6, 13, Math.PI * .15, Math.PI * .85); g.stroke(); }
      else if (k === 'line') { g.beginPath(); g.moveTo(x - 12, ey); g.lineTo(x + 12, ey); g.stroke(); }
      else if (k === 'sparkle') { g.beginPath(); g.ellipse(x, ey, 13, 15, 0, 0, Math.PI * 2); g.fill(); g.fillStyle = '#fff'; g.beginPath(); g.arc(x - 4, ey - 6, 5, 0, 7); g.fill(); g.beginPath(); g.arc(x + 5, ey + 5, 2.6, 0, 7); g.fill(); }
      else if (k === 'x') { g.beginPath(); g.moveTo(x - 9, ey - 9); g.lineTo(x + 9, ey + 9); g.moveTo(x + 9, ey - 9); g.lineTo(x - 9, ey + 9); g.stroke(); }
      else { g.beginPath(); g.ellipse(x, ey, 8, 10, 0, 0, Math.PI * 2); g.fill(); g.fillStyle = '#fff'; g.beginPath(); g.arc(x - 2.4, ey - 3.4, 2.8, 0, 7); g.fill(); } };
    const L = { smile: 'smile', wink: 'dot', sleepy: 'sleepy', sparkle: 'sparkle', o: 'dot', calm: 'line', x: 'x' }[face] || 'dot';
    const R = { wink: 'smile' }[face] || L;
    eye(ex[0], L); eye(ex[1], R);
    g.fillStyle = 'rgba(244,150,170,.55)'; [[64, 150], [192, 150]].forEach(([x, y]) => { g.beginPath(); g.ellipse(x, y, 20, 12, 0, 0, 7); g.fill(); });
    g.strokeStyle = g.fillStyle = ink; g.lineWidth = 6;
    if (face === 'o') { g.beginPath(); g.ellipse(128, 164, 8, 10, 0, 0, 7); g.fill(); }
    else { g.beginPath(); g.moveTo(116, 156); g.quadraticCurveTo(122, 166, 128, 156); g.quadraticCurveTo(134, 166, 140, 156); g.stroke(); }
  });
  const faceCap = (r, tex) => { const m = new T.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }); return new T.Mesh(new T.SphereGeometry(r * 1.012, 32, 16, Math.PI / 2 - .78, 1.56, Math.PI / 2 - .62, 1.24), m); };

  /* ---------- 캐릭터 ---------- */
  const FUR = { white: ['#FBFAF7', '#FFFFFF'], cream: ['#F3DFC2', '#FFF3E2'], cocoa: ['#BE8E69', '#EBD3BD'], gray: ['#C3C6D0', '#ECEDF1'], peach: ['#F2C1B0', '#FFE6DC'], mint: ['#B5E3CF', '#E8F7F0'], lilac: ['#CBC3E6', '#EFEBFA'], black: ['#4B4852', '#D9D6DE'] };
  const ACCC = { red: '#D9606B', mint: '#79CCA9', gold: '#E6C36E', sky: '#8EBFE6', pink: '#F2A7B8' };
  const critter = (c) => {
    const G = new T.Group(), [F0, B0] = FUR[c.fur] || FUR.white;
    let F = F0, B = B0;
    if (c.kind === 'panda') { F = '#FBFAF7'; B = '#FFFFFF'; }
    if (c.kind === 'fox' && !['white', 'gray', 'black'].includes(c.fur)) F = '#EFA36C';
    const pm = plush(F), pb = plush(B), dark = plush('#4B4852'), ac = ACCC[c.ac] || ACCC.red;
    const head = new T.Group(); head.position.y = .98; G.add(head);
    if (c.kind === 'snowman') {
      const sn = plush('#FFFFFF'); G.add(M(ico(.46), sn, 0, .42, 0)); head.add(M(ico(.42), sn, 0, 0, 0));
      [0, 1, 2].forEach(i => G.add(M(ico(.04, 1), dark, 0, .62 - i * .15, .42 - i * .02)));
      const n = M(new T.ConeGeometry(.06, .3, 6), mat('#EF9A5B'), 0, -.02, .5); n.rotation.x = Math.PI / 2; head.add(n);
      head.add(faceCap(.42, faceTex(c.face, false)));
    } else if (c.kind === 'penguin') {
      G.add(M(ico(.44), dark, 0, .44, 0)); const bel = M(ico(.36), pb, 0, .42, .12); bel.scale.set(1, 1.05, .8); G.add(bel);
      head.add(M(ico(.46), dark)); const fw = M(ico(.36), pb, 0, -.04, .16); fw.scale.set(1.05, .9, .8); head.add(fw);
      const bk = M(new T.ConeGeometry(.07, .16, 6), mat('#EFB45B'), 0, -.08, .48); bk.rotation.x = Math.PI / 2; head.add(bk);
      [-1, 1].forEach(d => { const f = M(ico(.11, 1), mat('#EFB45B'), d * .16, .03, .2); f.scale.set(1, .4, 1.4); G.add(f); const w = M(ico(.13, 1), dark, d * .42, .5, 0); w.scale.set(.5, 1.3, .9); w.rotation.z = d * .4; G.add(w); });
      head.add(faceCap(.46, faceTex(c.face, false)));
    } else {
      const body = M(ico(.42), pm, 0, .42, 0); body.scale.set(1.05, .98, .95); G.add(body);
      const bel = M(ico(.27), pb, 0, .4, .2); bel.scale.set(1, 1.05, .6); G.add(bel);
      [-1, 1].forEach(d => { const a = M(ico(.13, 1), c.kind === 'panda' ? dark : pm, d * .4, .5, .12); a.scale.set(.9, 1.25, .9); a.rotation.z = d * .5; G.add(a);
        const f = M(ico(.14, 1), c.kind === 'panda' ? dark : pm, d * .19, .06, .18); f.scale.set(1, .6, 1.25); G.add(f); });
      const hd = M(ico(.5), pm); hd.scale.set(1.08, .96, 1); head.add(hd);
      if (['bear', 'fox', 'hamster', 'cat'].includes(c.kind)) { const mz = M(ico(.2, 1), pb, 0, -.15, .38); mz.scale.set(1.25, .8, .7); head.add(mz); }
      if (c.kind === 'hamster') [-1, 1].forEach(d => { const ch = M(ico(.16, 1), pb, d * .3, -.12, .26); head.add(ch); });
      if (c.kind === 'panda') [-1, 1].forEach(d => { const p = M(ico(.11, 1), dark, d * .17, .02, .42); p.scale.set(1, 1.25, .5); p.rotation.z = -d * .5; head.add(p); });
      const ear = { rabbit: () => [-1, 1].forEach(d => { const e = M(ico(.14, 1), pm, d * .2, .62, 0); e.scale.set(.85, 2.4, .6); e.rotation.z = -d * .18; head.add(e); const ei = M(ico(.08, 1), plush('#F6C3CB'), d * .2, .62, .07); ei.scale.set(.7, 2.6, .4); ei.rotation.z = -d * .18; head.add(ei); }),
        cat: () => [-1, 1].forEach(d => { const e = M(new T.ConeGeometry(.17, .3, 4), pm, d * .3, .46, 0); e.rotation.z = -d * .35; head.add(e); }),
        fox: () => [-1, 1].forEach(d => { const e = M(new T.ConeGeometry(.19, .4, 4), pm, d * .3, .5, 0); e.rotation.z = -d * .3; head.add(e); const t = M(new T.ConeGeometry(.08, .16, 4), dark, d * .37, .66, 0); t.rotation.z = -d * .3; head.add(t); }),
        bear: () => [-1, 1].forEach(d => { head.add(M(ico(.15, 1), pm, d * .36, .38, 0)); head.add(M(ico(.08, 1), pb, d * .36, .38, .08)); }),
        panda: () => [-1, 1].forEach(d => head.add(M(ico(.15, 1), dark, d * .36, .38, 0))),
        hamster: () => [-1, 1].forEach(d => { head.add(M(ico(.1, 1), pm, d * .3, .42, 0)); head.add(M(ico(.055, 1), plush('#F6C3CB'), d * .3, .42, .05)); }) }[c.kind];
      ear && ear();
      const nose = M(ico(.045, 1), c.kind === 'cat' || c.kind === 'rabbit' ? mat('#E98E9B') : dark, 0, -.08, .5); nose.scale.set(1.3, .9, .8); head.add(nose);
      head.add(faceCap(.5 * 1.04, faceTex(c.face, false)));
      if (c.kind === 'fox' || c.kind === 'cat') { const tl = M(ico(.14, 1), pm, .32, .22, -.32); tl.scale.set(.8, .8, 1.8); tl.rotation.x = .6; G.add(tl); }
    }
    /* 소품 */
    const am = plush(ac);
    if (c.acc === 'scarf') { const s = M(new T.TorusGeometry(.33, .085, 8, 20), am, 0, .74, 0); s.rotation.x = Math.PI / 2; s.scale.set(1, 1, .9); G.add(s); const tl = M(new T.BoxGeometry(.14, .3, .06), am, .18, .58, .3); tl.rotation.z = .15; G.add(tl); }
    if (c.acc === 'santa') { const h = new T.Group(); h.position.set(.04, .42, -.02); h.rotation.z = -.25; h.add(M(new T.ConeGeometry(.4, .62, 10), am, 0, .3, 0)); const b = M(new T.TorusGeometry(.38, .09, 8, 22), plush('#FFFFFF'), 0, 0, 0); b.rotation.x = Math.PI / 2; h.add(b); h.add(M(ico(.1, 1), plush('#FFFFFF'), .12, .62, 0)); head.add(h); }
    if (c.acc === 'muffs') { const band = M(new T.TorusGeometry(.5, .04, 6, 20, Math.PI), am, 0, .05, 0); head.add(band); [-1, 1].forEach(d => head.add(M(ico(.16, 1), plush(ac), d * .52, .02, 0))); }
    if (c.acc === 'bow') { const b = new T.Group(); b.position.set(.24, .44, .1); b.rotation.z = -.4; [-1, 1].forEach(d => { const w = M(new T.ConeGeometry(.12, .2, 6), am, d * .1, 0, 0); w.rotation.z = d * Math.PI / 2; b.add(w); }); b.add(M(ico(.05, 1), am)); head.add(b); }
    if (c.acc === 'crown') { const cr = new T.Group(); cr.position.y = .46; const gm = mat('#E6C36E', { metalness: .6, roughness: .35 }); cr.add(M(new T.CylinderGeometry(.22, .24, .1, 12, 1, true), gm)); for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2, s = M(new T.ConeGeometry(.05, .14, 4), gm, Math.cos(a) * .22, .11, Math.sin(a) * .22); cr.add(s); } cr.add(M(ico(.04, 1), mat(ac === '#E6C36E' ? '#D9606B' : ac), 0, .07, .23)); head.add(cr); }
    if (c.acc === 'halo') { const h = M(new T.TorusGeometry(.26, .035, 8, 28), new T.MeshStandardMaterial({ color: '#F4D98C', emissive: '#E6C36E', emissiveIntensity: .6, roughness: .3 }), 0, .68, 0); h.rotation.x = Math.PI / 2 - .2; head.add(h); }
    if (c.acc === 'heart') { const s = new T.Shape(); s.moveTo(0, -.1); s.bezierCurveTo(-.22, .06, -.12, .2, 0, .1); s.bezierCurveTo(.12, .2, .22, .06, 0, -.1); const g = new T.ExtrudeGeometry(s, { depth: .06, bevelEnabled: true, bevelSize: .02, bevelThickness: .02, bevelSegments: 2 }); const h = M(g, mat('#F29BB2', { roughness: .5 }), 0, .42, .42); h.scale.set(1.4, 1.4, 1.4); G.add(h); }
    if (c.acc === 'wings') { const wm = new T.MeshStandardMaterial({ color: '#FFFFFF', roughness: .6, flatShading: true, transparent: true, opacity: .95 }); [-1, 1].forEach(d => { const w = M(ico(.22, 1), wm, d * .36, .62, -.32); w.scale.set(1.1, 1.3, .25); w.rotation.z = d * -.6; w.rotation.y = d * .5; G.add(w); }); }
    G.traverse(o => { if (o.isMesh) o.castShadow = true; });
    G.userData.head = head;
    return G;
  };

  /* ---------- 작은 소품 ---------- */
  const lowTree = (h = 1, c1 = '#3E8A6A', c2 = '#5CA585', snow = true) => {
    const g = new T.Group(); const tm = mat(c1), tm2 = mat(c2), sm = mat('#FFFFFF');
    g.add(M(new T.CylinderGeometry(.05 * h, .07 * h, .2 * h, 6), mat('#8B6248'), 0, .1 * h, 0));
    [[.48, .5, .38], [.38, .42, .7], [.26, .34, .98]].forEach(([r, hh, y], i) => { const k = M(new T.ConeGeometry(r * h, hh * h, 7), i % 2 ? tm2 : tm, 0, y * h, 0); k.rotation.y = i; g.add(k); if (snow) { const s = M(new T.ConeGeometry(r * h * .55, hh * h * .32, 7), sm, 0, (y + hh * .36) * h, 0); s.rotation.y = i; g.add(s); } });
    return g;
  };
  const house = (w, h, wall, roof, light = true) => {
    const g = new T.Group();
    const wt = canvasTex(128, 128, (x) => { x.fillStyle = wall; x.fillRect(0, 0, 128, 128); const cols = 3, rows = 3; for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) { if (Math.random() < .25) continue; x.fillStyle = light ? '#FFE3A1' : '#C9D3E0'; x.fillRect(14 + i * 38, 14 + j * 38, 22, 24); x.fillStyle = 'rgba(0,0,0,.12)'; x.fillRect(24 + i * 38, 14 + j * 38, 2, 24); } });
    const body = M(new T.BoxGeometry(w, h, w * .8), new T.MeshStandardMaterial({ map: wt, roughness: .9, emissive: '#FFD58A', emissiveMap: wt, emissiveIntensity: light ? .35 : 0 }), 0, h / 2, 0); g.add(body);
    const rf = M(new T.ConeGeometry(w * .78, h * .55, 4), mat(roof), 0, h + h * .27, 0); rf.rotation.y = Math.PI / 4; rf.scale.z = .8; g.add(rf);
    const sn = M(new T.ConeGeometry(w * .8, h * .2, 4), mat('#FFFFFF'), 0, h + h * .45, 0); sn.rotation.y = Math.PI / 4; sn.scale.z = .8; g.add(sn);
    return g;
  };

  /* ---------- 장면 ---------- */
  const SCENES = {
    night: { sky: ['#2B2850', '#5B4F82', '#8C7EAD'], ground: '#EFEAF5', hemi: ['#B9AEE6', '#4E3F6E', .62], key: '#FFE2B8', fog: '#5B4F82', houses: ['#D9C9E8', '#E8D7EA', '#C7B7DD', '#F0E1EC'], roofs: ['#8C6A9E', '#B27C9A', '#6E5A8E'], moon: true, light: true },
    mint: { sky: ['#7FC6AC', '#B5E2D0', '#E3F5EE'], ground: '#F3F8F6', hemi: ['#FFFFFF', '#86BFA8', .72], key: '#FFF8EE', fog: '#B5E2D0', houses: ['#FFF8EC', '#E2F2EA', '#F6E6D6', '#DDEBF5'], roofs: ['#4FAE8A', '#6E9FCB', '#D9707A'], moon: false, light: false },
    pink: { sky: ['#E7A6B9', '#F4CCD7', '#FCEAEF'], ground: '#FFF5F7', hemi: ['#FFF1F5', '#C68A9C', .72], key: '#FFF4EC', fog: '#F9DFE6', houses: ['#FFFFFF', '#FBE8EE', '#F6EEE3', '#FFF3E6'], roofs: ['#E89AA8', '#C98BB0', '#79CCA9'], moon: false, light: true },
    blue: { sky: ['#1E3557', '#3D6189', '#7FA2C6'], ground: '#EEF3FA', hemi: ['#B9D0F0', '#2E4A6E', .62], key: '#FFE8C8', fog: '#3D6189', houses: ['#DCE7F3', '#EAF1F8', '#C9D8EA', '#F3EBE0'], roofs: ['#5D7FA8', '#8EBFE6', '#B5838F'], moon: true, light: true }
  };
  const BASES = { walnut: ['#5A3826', '#3F271B'], maple: ['#D9B47E', '#B98F5A'], mint: ['#7ECBA9', '#5CAE8C'], pink: ['#EBA9B8', '#CF8698'], white: ['#F2F2F4', '#CFD2D9'] };
  const BANDS = { gold: '#E1BE6A', silver: '#C9CED6', rose: '#E3A1A5' };

  const mount = (host, st) => {
    const W = () => host.clientWidth || 320, H = () => host.clientHeight || 320;
    const R = new T.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, alpha: false });
    R.setPixelRatio(Math.min(2, window.devicePixelRatio || 1)); R.setSize(W(), H()); R.outputEncoding = T.sRGBEncoding; R.toneMapping = T.ACESFilmicToneMapping; R.toneMappingExposure = .92;
    R.shadowMap.enabled = true; R.shadowMap.type = T.PCFSoftShadowMap;
    host.appendChild(R.domElement); R.domElement.style.cssText = 'width:100%;height:100%;display:block;border-radius:inherit;touch-action:none';
    const S = new T.Scene(), cam = new T.PerspectiveCamera(38, W() / H(), .1, 100);
    cam.position.set(0, 2.0, 6.0); cam.lookAt(0, 1.62, 0);
    const hemi = new T.HemisphereLight('#fff', '#888', 1); S.add(hemi);
    const key = new T.DirectionalLight('#fff', .7); key.position.set(3, 6, 5); key.castShadow = true; key.shadow.mapSize.set(1024, 1024); key.shadow.camera.left = -3; key.shadow.camera.right = 3; key.shadow.camera.top = 4; key.shadow.camera.bottom = -2; S.add(key);
    const fill = new T.PointLight('#FFD9A8', .5, 8); fill.position.set(-2, 2.6, 2.4); S.add(fill);
    let world = new T.Group(); S.add(world);
    const globe = new T.Group(); S.add(globe);
    let inner = new T.Group(); globe.add(inner);
    let chars = [];

    /* 유리 */
    const GR = 1.6, GC = 1.74, BK = .8;
    const rim = new T.ShaderMaterial({ transparent: true, depthWrite: false, uniforms: { c: { value: new T.Color('#FFFFFF') } },
      vertexShader: 'varying vec3 vN;varying vec3 vV;void main(){vec4 mv=modelViewMatrix*vec4(position,1.);vN=normalize(normalMatrix*normal);vV=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}',
      fragmentShader: 'uniform vec3 c;varying vec3 vN;varying vec3 vV;void main(){float f=pow(1.-max(dot(vN,vV),0.),2.6);gl_FragColor=vec4(c,.015+f*.42);}' });
    const glass = M(new T.SphereGeometry(GR, 64, 48), rim, 0, GC, 0); globe.add(glass);
    const streak = M(new T.TubeGeometry(new T.CatmullRomCurve3([-.9, -.3, -.55, -.1, .25, .35, .45, .6].reduce((a, v, i, arr) => (i % 2 ? a : a.concat([new T.Vector3(arr[i], arr[i + 1], 0)])), []).map(v => { const z = Math.sqrt(Math.max(0, GR * GR - v.x * v.x - v.y * v.y)) * .99; return new T.Vector3(v.x * 1.25, v.y * 1.25 + GC, z); })), 40, .03, 6, false), new T.MeshBasicMaterial({ color: '#FFFFFF', transparent: true, opacity: .22, depthWrite: false }));
    globe.add(streak);
    /* 받침 */
    let baseG = new T.Group(); globe.add(baseG);
    const buildBase = () => {
      globe.remove(baseG); baseG = new T.Group(); globe.add(baseG);
      const [b1, b2] = BASES[st.base] || BASES.walnut, wood = new T.MeshStandardMaterial({ color: b1, roughness: .55, metalness: .05 });
      const pts = [[0, 0], [1.72, 0], [1.78, .06], [1.74, .16], [1.6, .22], [1.62, .48], [1.5, .58], [1.42, .62], [0, .62]].map(([x, y]) => new T.Vector2(x * BK, y));
      const b = M(new T.LatheGeometry(pts, 64), wood); b.receiveShadow = b.castShadow = true; baseG.add(b);
      const ring = M(new T.TorusGeometry(1.615 * BK, .045, 10, 80), new T.MeshStandardMaterial({ color: BANDS[st.band] || BANDS.gold, metalness: .75, roughness: .28 }), 0, .36, 0); ring.rotation.x = Math.PI / 2; baseG.add(ring);
      const r2 = M(new T.TorusGeometry(1.74 * BK, .025, 8, 80), new T.MeshStandardMaterial({ color: BANDS[st.band] || BANDS.gold, metalness: .75, roughness: .28 }), 0, .11, 0); r2.rotation.x = Math.PI / 2; baseG.add(r2);
      const dark = M(new T.CylinderGeometry(1.5 * BK, 1.5 * BK, .04, 64), new T.MeshStandardMaterial({ color: b2, roughness: .7 }), 0, .62, 0); baseG.add(dark);
      /* 이름표 */
      if (st.plate) { const tx = canvasTex(512, 96, (g) => { g.clearRect(0, 0, 512, 96); g.font = '800 46px "DM Mono", ui-monospace, monospace'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = st.base === 'white' || st.base === 'maple' ? '#5B4636' : '#FFF6E6'; g.fillText(String(st.plate).slice(0, 18), 256, 50); });
        const p = M(new T.CylinderGeometry(1.625 * BK, 1.625 * BK, .17, 64, 1, true, -1.1, 2.2), new T.MeshBasicMaterial({ map: tx, transparent: true, depthWrite: false }), 0, .24, 0); p.rotation.y = Math.PI; baseG.add(p); }
    };
    /* 안쪽 (눈 언덕 · 트리 · 캐릭터) */
    const buildInner = () => {
      globe.remove(inner); inner = new T.Group(); globe.add(inner);
      const mound = M(new T.SphereGeometry(1.16 / Math.sin(.42), 48, 16, 0, Math.PI * 2, 0, .42), new T.MeshStandardMaterial({ color: '#FFFFFF', map: snowTex, roughness: 1 }), 0, .62 - (1.16 / Math.sin(.42)) * Math.cos(.42) + .02, 0); mound.receiveShadow = true;
      const lid = M(new T.CircleGeometry(1.48 * Math.sin(.42), 48), new T.MeshStandardMaterial({ color: '#FFFFFF' }), 0, .64, 0); lid.rotation.x = -Math.PI / 2;
      inner.add(mound);
      const tr = lowTree(1.35, '#3E8A6A', '#5CA585'); tr.position.set(0, .66, -.55); inner.add(tr);
      const star = M(new T.OctahedronGeometry(.11, 0), new T.MeshStandardMaterial({ color: '#F6D47A', emissive: '#E6B84E', emissiveIntensity: .8, metalness: .3, roughness: .3 }), 0, .66 + 1.38 * 1.35 * .78, -.55); inner.add(star);
      const orn = ['#D9606B', '#8EBFE6', '#F2D58C', '#F2A7B8']; for (let i = 0; i < 9; i++) { const a = i * 2.4, y = .25 + (i / 9) * .8, r = .42 * (1 - i / 11); inner.add(M(ico(.045, 1), mat(orn[i % 4], { roughness: .3, metalness: .2 }), Math.cos(a) * r, .66 + y * 1.35, -.55 + Math.sin(a) * r)); }
      [[-.86, -.3, .45], [.84, -.34, .5]].forEach(([x, z, s]) => { const t = lowTree(s); t.position.set(x, .62, z); inner.add(t); });
      chars = [];
      const n = st.count === 1 ? 1 : 2, pos = n === 1 ? [[0, .3]] : [[-.5, .32], [.52, .32]];
      for (let i = 0; i < n; i++) { const ch = critter(st.c[i] || st.c[0]); const s = n === 1 ? .8 : .66; ch.scale.setScalar(s); ch.position.set(pos[i][0], .64, pos[i][1]); ch.rotation.y = n === 1 ? 0 : (i ? -.28 : .28); ch.userData.y0 = .64; ch.userData.ph = i * 1.7; inner.add(ch); chars.push(ch); }
    };
    /* 바깥 세상 */
    let snowOut, stars;
    const buildWorld = () => {
      S.remove(world); world = new T.Group(); S.add(world);
      const sc = SCENES[st.scene] || SCENES.night;
      S.background = canvasTex(4, 256, (g) => { const gr = g.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, sc.sky[0]); gr.addColorStop(.6, sc.sky[1]); gr.addColorStop(1, sc.sky[2]); g.fillStyle = gr; g.fillRect(0, 0, 4, 256); });
      S.fog = new T.Fog(sc.fog, 11, 28);
      hemi.color.set(sc.hemi[0]); hemi.groundColor.set(sc.hemi[1]); hemi.intensity = sc.hemi[2]; key.color.set(sc.key);
      const gnd = M(new T.CircleGeometry(30, 64), new T.MeshStandardMaterial({ color: sc.ground, map: snowTex, roughness: 1 }), 0, 0, 0); gnd.rotation.x = -Math.PI / 2; gnd.receiveShadow = true; world.add(gnd);
      for (let i = 0; i < 7; i++) { const d = M(ico(rnd(.5, 1.1), 1), mat('#FFFFFF', { roughness: 1 }), rnd(-6, 6), -.25, rnd(-1, 3)); d.scale.y = .35; if (Math.abs(d.position.x) < 2.2) d.position.x += 3 * Math.sign(d.position.x || 1); world.add(d); }
      /* 집들 */
      let x = -9.5; while (x < 9.5) { const w = rnd(.9, 1.4), h = rnd(1.2, 2.3), hs = house(w, h, sc.houses[Math.random() * 4 | 0], sc.roofs[Math.random() * 3 | 0], sc.light); hs.position.set(x, 0, rnd(-7.4, -6)); hs.rotation.y = rnd(-.15, .15); world.add(hs); x += w + rnd(.05, .4); }
      for (let i = 0; i < 9; i++) { const t = lowTree(rnd(.6, 1.2)); const sx = (Math.random() < .5 ? -1 : 1) * rnd(2.6, 7); t.position.set(sx, 0, rnd(-4.2, 1.5)); world.add(t); }
      /* 가랜드 (위쪽 전구 줄 · 삼각 깃발) */
      const lights = ['#F2D58C', '#F2A7B8', '#8ED9B8', '#AFD6F0', '#E8E2FF'];
      const curve = new T.CatmullRomCurve3([new T.Vector3(-4.6, 3.55, 1.6), new T.Vector3(-2.3, 3.05, 1.9), new T.Vector3(0, 3.35, 1.8), new T.Vector3(2.3, 3.05, 1.9), new T.Vector3(4.6, 3.55, 1.6)]);
      world.add(M(new T.TubeGeometry(curve, 80, .02, 4), mat('#4E6B5E')));
      for (let i = 0; i <= 26; i++) { const p = curve.getPoint(i / 26); const col = lights[i % 5]; world.add(M(ico(.042, 1), new T.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: sc.light ? 1.1 : .5 }), p.x, p.y - .08, p.z)); if (sc.light) { const gl = new T.Sprite(new T.SpriteMaterial({ map: glowTex, color: col, transparent: true, depthWrite: false, blending: T.AdditiveBlending, opacity: .55 })); gl.scale.set(.45, .45, 1); gl.position.set(p.x, p.y - .08, p.z); world.add(gl); } }
      const bunt = new T.CatmullRomCurve3([new T.Vector3(-6, 3.1, -3.2), new T.Vector3(0, 2.6, -3.4), new T.Vector3(6, 3.1, -3.2)]);
      for (let i = 0; i <= 30; i++) { const p = bunt.getPoint(i / 30); const f = M(new T.ConeGeometry(.09, .2, 3), mat(['#E89AA8', '#F2D58C', '#79CCA9', '#FFFFFF', '#8EBFE6'][i % 5]), p.x, p.y - .1, p.z); f.rotation.x = Math.PI; world.add(f); }
      /* 달 · 별 */
      if (sc.moon) { const mc = canvasTex(256, 256, (g) => { g.fillStyle = '#FFF1C2'; g.beginPath(); g.arc(128, 128, 90, 0, 7); g.fill(); g.globalCompositeOperation = 'destination-out'; g.beginPath(); g.arc(170, 100, 84, 0, 7); g.fill(); });
        const mo = new T.Sprite(new T.SpriteMaterial({ map: mc, transparent: true, fog: false })); mo.scale.set(1.3, 1.3, 1); mo.position.set(2.7, 3.75, -5); world.add(mo);
        const gl = new T.Sprite(new T.SpriteMaterial({ map: glowTex, transparent: true, opacity: .45, fog: false, depthWrite: false })); gl.scale.set(3.6, 3.6, 1); gl.position.copy(mo.position); world.add(gl); }
      const sp = new Float32Array(240 * 3); for (let i = 0; i < 240; i++) { sp[i * 3] = rnd(-12, 12); sp[i * 3 + 1] = rnd(3, 9); sp[i * 3 + 2] = rnd(-9, -6); }
      const sg = new T.BufferGeometry(); sg.setAttribute('position', new T.BufferAttribute(sp, 3));
      stars = new T.Points(sg, new T.PointsMaterial({ size: .07, map: dotTex, transparent: true, depthWrite: false, color: sc.moon ? '#FFFFFF' : '#FFFFFF', opacity: sc.moon ? .85 : .0, fog: false })); world.add(stars);
      /* 바깥에 내리는 눈 */
      const on = 260, op = new Float32Array(on * 3); for (let i = 0; i < on; i++) { op[i * 3] = rnd(-8, 8); op[i * 3 + 1] = rnd(0, 7); op[i * 3 + 2] = rnd(-5, 4); }
      const og = new T.BufferGeometry(); og.setAttribute('position', new T.BufferAttribute(op, 3));
      snowOut = new T.Points(og, new T.PointsMaterial({ size: .06, map: dotTex, transparent: true, depthWrite: false, color: '#FFFFFF', opacity: .9 })); world.add(snowOut);
    };
    /* 스노우볼 안의 눈 */
    let snowIn, vel;
    const buildSnow = () => {
      if (snowIn) globe.remove(snowIn);
      const n = [140, 320, 620][st.snow] ?? 320, p = new Float32Array(n * 3); vel = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) { const a = rnd(0, Math.PI * 2), r = Math.sqrt(Math.random()) * 1.2; p[i * 3] = Math.cos(a) * r; p[i * 3 + 1] = rnd(.7, GC + 1.2); p[i * 3 + 2] = Math.sin(a) * r; vel[i * 3 + 1] = -rnd(.002, .006); }
      const g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(p, 3));
      snowIn = new T.Points(g, new T.PointsMaterial({ size: .05, map: dotTex, transparent: true, depthWrite: false, color: '#FFFFFF' }));
      globe.add(snowIn);
      if (st.glitter) { const gp = new Float32Array(60 * 3); for (let i = 0; i < 60; i++) { gp[i * 3] = rnd(-1.1, 1.1); gp[i * 3 + 1] = rnd(.8, GC + 1); gp[i * 3 + 2] = rnd(-1.1, 1.1); } const gg = new T.BufferGeometry(); gg.setAttribute('position', new T.BufferAttribute(gp, 3)); const gl = new T.Points(gg, new T.PointsMaterial({ size: .045, map: dotTex, color: '#F6D47A', transparent: true, depthWrite: false })); gl.userData.glit = true; snowIn.add(gl); }
    };
    buildWorld(); buildBase(); buildInner(); buildSnow();

    /* 움직임 · 손으로 돌리기 */
    let shake = 0, yaw = 0, pitch = 0, vyaw = 0, drag = null, t0 = performance.now(), raf = 0, alive = true;
    const el = R.domElement;
    el.addEventListener('pointerdown', e => { drag = { x: e.clientX, y: e.clientY }; try { el.setPointerCapture(e.pointerId); } catch (_) {} });
    el.addEventListener('pointermove', e => { if (!drag) return; vyaw = (e.clientX - drag.x) * .01; yaw += vyaw; pitch = Math.max(-.25, Math.min(.25, pitch + (e.clientY - drag.y) * .004)); drag = { x: e.clientX, y: e.clientY }; });
    const up = () => { drag = null; }; el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    el.addEventListener('dblclick', () => { shake = 1; });
    const loop = (now) => {
      if (!alive) return; raf = requestAnimationFrame(loop);
      if (!host.isConnected) { api.dispose(); return; }
      const t = (now - t0) / 1000;
      if (!drag) { if (st.motion === 'spin') yaw += .004; vyaw *= .94; yaw += vyaw * .2; if (st.motion !== 'spin') yaw *= .985; pitch *= .95; }
      globe.rotation.y = yaw; globe.rotation.x = pitch;
      if (shake > 0) { globe.position.x = Math.sin(t * 40) * .05 * shake; shake = Math.max(0, shake - .012); } else globe.position.x = 0;
      chars.forEach(c => { const b = st.motion === 'bounce' ? Math.abs(Math.sin(t * 3 + c.userData.ph)) * .06 : Math.sin(t * 1.6 + c.userData.ph) * .012; c.position.y = c.userData.y0 + b; if (c.userData.head) c.userData.head.rotation.z = Math.sin(t * 1.2 + c.userData.ph) * (st.motion === 'bounce' ? .12 : .05); });
      /* 안의 눈 */
      const p = snowIn.geometry.attributes.position.array, n = p.length / 3;
      for (let i = 0; i < n; i++) {
        let x = p[i * 3], y = p[i * 3 + 1], z = p[i * 3 + 2];
        if (shake > .5) { vel[i * 3] += rnd(-.012, .012) * shake; vel[i * 3 + 1] += rnd(-.006, .02) * shake; vel[i * 3 + 2] += rnd(-.012, .012) * shake; }
        vel[i * 3] *= .965; vel[i * 3 + 2] *= .965; vel[i * 3 + 1] = vel[i * 3 + 1] * .965 - .00018;
        x += vel[i * 3] + Math.sin(t * .8 + i) * .0008; y += vel[i * 3 + 1]; z += vel[i * 3 + 2];
        const dy = y - GC, d = Math.sqrt(x * x + dy * dy + z * z); if (d > GR - .08) { const k = (GR - .08) / d; x *= k; z *= k; y = GC + dy * k; vel[i * 3] *= -.3; vel[i * 3 + 2] *= -.3; }
        if (y < .68) { y = .68; vel[i * 3 + 1] = 0; if (shake <= .2 && Math.random() < .004) { y = GC + rnd(.4, 1.2); const a = rnd(0, 7), r = Math.sqrt(Math.random()) * 1.1; x = Math.cos(a) * r; z = Math.sin(a) * r; vel[i * 3 + 1] = -rnd(.002, .005); } }
        p[i * 3] = x; p[i * 3 + 1] = y; p[i * 3 + 2] = z;
      }
      snowIn.geometry.attributes.position.needsUpdate = true;
      snowIn.children.forEach(g => { g.material.opacity = .55 + .45 * Math.sin(t * 5); g.rotation.y = t * .2; });
      /* 바깥 눈 */
      if (snowOut) { const q = snowOut.geometry.attributes.position.array; for (let i = 0; i < q.length; i += 3) { q[i + 1] -= .006 + (i % 7) * .0006; q[i] += Math.sin(t + i) * .002; if (q[i + 1] < 0) q[i + 1] = 7; } snowOut.geometry.attributes.position.needsUpdate = true; }
      R.render(S, cam);
    };
    const ro = new ResizeObserver(() => { R.setSize(W(), H()); cam.aspect = W() / H(); cam.updateProjectionMatrix(); }); ro.observe(host);
    raf = requestAnimationFrame(loop);
    const api = {
      update(part) { if (part === 'world') buildWorld(); else if (part === 'base') buildBase(); else if (part === 'snow') buildSnow(); else buildInner(); },
      shake() { shake = 1; },
      snapshot() { R.render(S, cam); return R.domElement.toDataURL('image/png'); },
      dispose() { alive = false; cancelAnimationFrame(raf); ro.disconnect(); R.dispose(); }
    };
    return api;
  };
  window.SB3 = { mount };
})();
