/* =========================================================
   script.js — 동작 담당 (보통은 수정할 필요 없어요)
   내용 수정은 data.js 에서!
   ========================================================= */
(() => {
/* ---------- 제작자(나) 모드 : 주소 끝에 ?owner 를 붙여 한 번 들어오면 이 브라우저에선 계속 ✎ EDIT 가 보여요 (?guest 로 끄기) ---------- */
const OWNER = (() => { try { const q = location.search + location.hash; if (/owner|#edit\b/i.test(q)) localStorage.setItem('syOwner', '1'); if (/guest/i.test(q)) localStorage.removeItem('syOwner'); return localStorage.getItem('syOwner') === '1'; } catch (e) { return false; } })();
/* 홈페이지에 저장하고 10분이 지나면(새 data.js 가 반영된 뒤) 이 브라우저에 임시로 남겨둔 수정본 · 사진을 정리해요 */
const SYE_CLEAN = OWNER && (() => { try { const t = +localStorage.getItem('sye-pub-at') || 0; if (t && Date.now() - t > 10 * 60e3 && !(+localStorage.getItem('sye-pend') || 0)) { localStorage.removeItem('sye-draft'); localStorage.removeItem('sye-pub-at'); return true; } } catch (e) {} return false; })();
let SYE_ON = OWNER && (() => { try { return localStorage.getItem('syEdit') === '1'; } catch (e) { return false; } })();
/* 이 브라우저에 남은 수정본(draft) 정리 : 홈페이지 내용과 같거나, 예전에 올라가 있던 내용 그대로인 칸은 지워서
   새로 바뀐 data.js 가 가려지지 않게 해요 (내가 직접 고친 칸만 남아요) */
const SITE0 = OWNER ? JSON.parse(JSON.stringify(SITE)) : null;   // 처음 불러온 data.js 그대로 (비교용)
const SYE_BASE = {"brand":{"name":"SETLIST-01","sub":"MOON STUDIO","start":"P2U","home":"SYRINGE-01","homeSub":"ARCH CLINIC"},"online":"PROTOCOL ONLINE","venue":"ARCH MEDICAL CENTER","credit":{"top":"© ↳ PpLE","bottom":"Syringe."},"clinic":{"kicker":"ARCH CLINIC · RESIDENCE","title":"UNRELEASED","chips":["LOVE DISORDER CLINIC +","5.0 mL · STERILE // OPEN 24H"],"tab":"INFIRMARY · OPEN 24H","nav":"LUVINFO"},"spec":{"sub":"DRAWING Nº SY-01 · ARCH CLINIC","title":"SPEC SHEET","cells":[["GUIDE","PURE"],["SENTINEL","UXI"],["SINCE P2U","D+{d}"],["TODAY","{today}"],["DRAWN BY","↳ PpLE"],["SCALE","1 : 1"]]},"pairs":[{"a":"PURE","b":"UXI","since":"2026-04-24","passNo":"No. PU-0424","status":"BONDED","barcode":"A-CLASS GUIDE × S-CLASS SENTINEL","image":"","imageBack":"","note":"맨 앞줄 오른쪽, 앵콜 마지막 소절"},{"a":"PAIR","b":"TWO","since":"2026-02-14","passNo":"No. PT-0214","status":"ON STAGE","barcode":"GUITAR × DRUM","image":"","imageBack":"","note":"두 번째 페어 메모를 적어주세요"},{"a":"PAIR","b":"THREE","since":"2025-12-25","passNo":"No. PT-1225","status":"ENCORE","barcode":"BASS × KEYBOARD","image":"","imageBack":"","note":"세 번째 페어 메모를 적어주세요"}],"pair":{"a":"PURE","b":"UXI","aRole":"FRONT ROW · No.1 FAN","bRole":"LEAD VOCAL · 月とナイフ","pill":"MIDNIGHT ENCORE LIVE ✦","since":"2026-04-24","nextGoal":200,"passNo":"No. PU-0424","status":"BONDED","barcode":"A-CLASS GUIDE × S-CLASS SENTINEL","image":""},"pairLabels":{"first":"ADMITTED","pair":"PAIR","status":"STATUS","together":"TOGETHER FOR","flip":"뒤집기"},"intro":{"nav":["01 · ARCHIVE","02 · SETLIST","03 · KEY"],"live":"LIVE","liveLine":"BPM <b>{d}</b> · ROOM 07 · MIC ON","kicker":"月とナイフ — BACKSTAGE ARCHIVE","vol":"VOL. 05","title":["OFF THE","RECORD"],"roles":["LEAD VOCAL","FRONT ROW"],"pill":"ENCORE NIGHT ✦","tune":["TUNING · ","FILLING THE KEY","READY ✦"],"marquee":"OFF THE RECORD ✦ 月とナイフ LIVE TOUR 2026 ✦ HANA × REN ✦ LEAVING BEFORE THE ENCORE IS NOT ALLOWED ✦","onair":["SOUNDCHECK","· ON AIR"],"gate":["ENTRANCE","STAND BY","OPEN","WELCOME"],"buttons":["LOADING","ENTER","ADMITTED"],"entry":{"brand":"UNRELEASED","sub":"moon studio","room":"ROOM 0101","gate":["STAND BY","OPEN","OPENING"],"load":["UNLOCKING ROOM 0101","READY — 자물쇠를 눌러 주세요"]},"clinic":{"nav":["HOME","CATEGORY","NOTICE","LUVINFO"],"online":"NOW ADMITTING","status":["READING CHART","CHECKING PULSE","SYMPTOM: LOVE","NO CURE FOUND","ADMISSION READY"]},"seconds":2.6},"extraApps":[{"id":"gallery","name":"Gallery","type":"grid","items":[["제목 1","10.26",""],["제목 2","10.23",""],["제목 3","10.20",""],["제목 4","10.17",""],["제목 5","10.14",""],["제목 6","10.11",""]]},{"id":"letters","name":"Letters","type":"grid","items":[["편지 1","10.26",""],["편지 2","10.23",""],["편지 3","10.20",""]]},{"id":"lockbox","name":"Lock Box","type":"list","rows":[["항목 1","10.25"],["항목 2","10.23"],["항목 3","10.21"]]},{"id":"setlist","name":"Setlist","type":"grid","items":[["곡 1","10.26",""],["곡 2","10.23",""],["곡 3","10.20",""]]},{"id":"camera","name":"Camera","type":"grid","items":[["사진 1","10.26",""],["사진 2","10.23",""],["사진 3","10.20",""]]},{"id":"calendar","name":"Calendar","type":"list","rows":[["일정 1","10.25"],["일정 2","10.23"],["일정 3","10.21"]]},{"id":"archive","name":"Archive","type":"list","rows":[["기록 1","10.25"],["기록 2","10.23"],["기록 3","10.21"]]},{"id":"about","name":"Profile","icon":"idcard","type":"about","no":"NO. 2026-HANA","title":"PROFILE","sub":"ABOUT // SELF INTRO","handle":"@handle","info":[["STATUS","여기에 상태를 적어요"],["TYPE","여기에 타입을 적어요"]],"infoNote":"*짧은 메모가 들어가요","table":[["항목 1","메모가 들어가요"],["항목 2","메모가 들어가요"],["항목 3","-"],["항목 4","메모가 들어가요\n두 줄도 돼요"]],"ng":["NG","주의할 점 제목","주의할 점 설명이 들어가요"],"valid":"VALID UNTIL: PERMANENT","org":"MOON STUDIO","stamp":"APPROVED"},{"id":"list","name":"List","icon":"list","type":"inventory","chip":"LOCKED","title":"INVENTORY","sub":"LIST // DATABASE","intro":"여기에 리스트 설명이 들어가요. 짧게 적어주세요.","groups":[["그룹 이름 1","@handle",["항목","항목","항목"]],["그룹 이름 2","@handle",["항목"]],["그룹 이름 3","@handle",["항목","항목"]]]},{"id":"linked","name":"Linked","icon":"link","type":"linked","title":"LINKED","sub":"DOSSIERS","tag":"LINKED DOSSIERS","no":"NO. 2026-10-29","banner":{"img":"","link":""},"crewTitle":"CREW BANNER","crewSub":"♥ 맞배너","crew":[["처방전","TEAM","@name","",""],["처방전","TEAM","@name","",""],["처방전","TEAM","@name","",""],["처방전","TEAM","@name","",""]]},{"id":"ooc","name":"OOC","type":"ooc","room":"ROOM 04","sub":"ARCHIVE // COPY & PASTE","hint":"분류를 누르면 OOC가 나와요. COPY를 누르면 바로 복사돼요.","cats":[{"k":"HELLO","n":"인사","items":["(( 안녕하세요! 오늘도 잘 부탁드려요 ))","(( 늦은 시간에 인사드려요, 편하게 이어 주세요 ))","(( 처음 뵙겠습니다! 잘 부탁드려요 ))"]},{"k":"LATE","n":"늦은 답장","items":["(( 답이 늦어 죄송해요! 천천히 이어갈게요 ))","(( 오늘은 답이 조금 느릴 수 있어요 ))"]},{"k":"AWAY","n":"자리 비움","items":["(( 잠깐 자리 비울게요, 금방 올게요! ))","(( 밥 먹고 올게요 ))","(( 오늘은 여기까지 할게요, 내일 이어가요 ))"]},{"k":"THANKS","n":"감사","items":["(( 오늘도 함께해 주셔서 감사해요 ))","(( 덕분에 너무 즐거웠어요! ))"]},{"k":"BYE","n":"마무리","items":["(( 수고하셨어요! 좋은 밤 보내세요 ))","(( 다음에 또 이어가요, 감사합니다 ))"]},{"k":"ETC","n":"기타","items":["(( 여기에 OOC 문구가 들어가요 ))"]}]},{"id":"prompt","name":"Prompt","type":"prompt","room":"ROOM 05","sub":"BACKGROUND + OUTFIT","hint":"세로 · 가로 사진이 섞여도 각자 모양에 맞게 보여요.","cats":[{"k":"DAILY","n":"일상","items":[{"t":"하늘색 오후","image":"","images":["","",""],"bg":"cozy cafe by the window, soft afternoon sunlight, pale blue walls, potted plants, light bokeh","fit":"oversized sky blue knit sweater, pleated white skirt, loafers, small silver earrings"},{"t":"새벽 옥상","wide":true,"image":"","images":["","",""],"bg":"rooftop at dawn, pale blue sky, city lights fading, light haze, calm and lonely atmosphere","fit":"white hoodie, mint windbreaker over it, wide denim pants, canvas sneakers"},{"t":"여기에 제목","image":"","images":["","",""],"bg":"여기에 배경 프롬프트가 들어가요.","fit":"여기에 의상 프롬프트가 들어가요."}]},{"k":"STAGE","n":"무대","items":[{"t":"유리 라이브하우스","wide":true,"image":"","images":["","",""],"bg":"small live house stage, glass panels, mint spotlight, scattered confetti, empty seats, wide angle","fit":"cropped mint stage jacket, glossy pastel fabric, silver zipper details, white wide pants"},{"t":"앵콜 무대","image":"","images":["","",""],"bg":"concert stage after encore, blue laser lights, floating sparkles, smoky air, audience lightsticks","fit":"sheer white blouse, sky blue corset vest, star hair pins, platform boots"}]},{"k":"SEASON","n":"계절","items":[{"t":"눈 오는 밤","wide":true,"image":"","images":["","",""],"bg":"snowy street at night, warm shop lights, falling snow, quiet blue tone, soft glow","fit":"long cream coat, mint muffler, knitted gloves, white earmuffs"}]}]},{"id":"album","name":"Album","type":"grid","items":[["사진 1","11.04",""],["사진 2","11.02",""],["사진 3","10.30",""]]},{"id":"guestbook","name":"Guest Book","type":"list","rows":[["방명록 1","11.04"],["방명록 2","11.02"],["방명록 3","10.30"]]},{"id":"diary","name":"Diary","type":"list","rows":[["일기 1","11.04"],["일기 2","11.02"],["일기 3","10.30"]]},{"id":"shop","name":"Shop","type":"grid","items":[["상품 1","11.04",""],["상품 2","11.02",""],["상품 3","10.30",""]]},{"id":"stickers","name":"Stickers","type":"grid","items":[["스티커 1","11.04",""],["스티커 2","11.02",""],["스티커 3","10.30",""]]},{"id":"radio","name":"Radio","type":"list","rows":[["방송 1","11.04"],["방송 2","11.02"],["방송 3","10.30"]]},{"id":"mail","name":"Mail","type":"list","rows":[["항목 1","11.15"],["항목 2","11.12"],["항목 3","11.09"]]},{"id":"map","name":"Map","type":"list","rows":[["항목 1","11.15"],["항목 2","11.12"],["항목 3","11.09"]]},{"id":"settings","name":"Settings","type":"list","rows":[["항목 1","11.15"],["항목 2","11.12"],["항목 3","11.09"]]},{"id":"notes","name":"Notes","type":"list","rows":[["항목 1","11.15"],["항목 2","11.12"],["항목 3","11.09"]]},{"id":"wishlist","name":"Wishlist","type":"list","rows":[["항목 1","11.15"],["항목 2","11.12"],["항목 3","11.09"]]},{"id":"video","name":"Video","type":"list","rows":[["항목 1","11.15"],["항목 2","11.12"],["항목 3","11.09"]]},{"id":"xgame","name":"Game","type":"list","rows":[["항목 1","11.15"],["항목 2","11.12"],["항목 3","11.09"]]},{"id":"search","name":"Search","type":"list","rows":[["항목 1","11.15"],["항목 2","11.12"],["항목 3","11.09"]]},{"id":"weather","name":"Weather","type":"list","rows":[["항목 1","11.15"],["항목 2","11.12"],["항목 3","11.09"]]},{"id":"contacts","name":"Contacts","type":"list","rows":[["항목 1","11.15"],["항목 2","11.12"],["항목 3","11.09"]]},{"id":"cloud","name":"Cloud","type":"list","rows":[["항목 1","11.15"],["항목 2","11.12"],["항목 3","11.09"]]},{"id":"alarm","name":"Alarm","type":"list","rows":[["항목 1","11.15"],["항목 2","11.12"],["항목 3","11.09"]]},{"id":"wallet","name":"Wallet","type":"list","rows":[["항목 1","11.15"],["항목 2","11.12"],["항목 3","11.09"]]},{"id":"library","name":"Library","type":"list","rows":[["항목 1","11.15"],["항목 2","11.12"],["항목 3","11.09"]]},{"id":"stats","name":"Stats","type":"list","rows":[["항목 1","11.15"],["항목 2","11.12"],["항목 3","11.09"]]},{"id":"scan","name":"Scan","type":"list","rows":[["항목 1","11.15"],["항목 2","11.12"],["항목 3","11.09"]]},{"id":"pharmacy","name":"Pharmacy","type":"list","rows":[["항목 1","11.15"],["항목 2","11.12"],["항목 3","11.09"]]},{"id":"vitals","name":"Vitals","type":"list","rows":[["항목 1","11.15"],["항목 2","11.12"],["항목 3","11.09"]]}]};   // 테마 바꾸기 전 내용 (예전 수정본 정리용)
const SYE_OLD = {"brand":["u0o6ul"],"title":["7wm8ks"],"pair":["190n3mn"],"pairs":["1j5zkc8"],"pairLabels":["19meff0"],"heroTicket":["13a3uc3"],"studio":["664do9"],"online":["a8ojfi"],"residence":["1nlav7m"],"venue":["18rnmsz"],"passLabel":["1s1xibj"],"footer":["1cdq8b0"],"marquee":["1s3ogt5"],"credit":["1e5wm5l"],"clinic":["1w7fn05"],"cursor":["137so3u"],"intro":["f97by8","1otue6n"],"extraApps":["o2njmk","jn7ybg"],"home":["17d8bm0"],"blueprint":["kmzeet"],"spec":["8qfz1i"],"bgm":["1f2r0ez"],"memberOpen":["efwnq4"],"members":["qy5fs2"],"characters":["l3g4mc"],"chat":["9d0puz"],"toasts":["cfmjcw"],"monitor":["wej6ae"],"pedal":["1owetwf"],"memo":["krlcuc"],"records":["htrjpy"],"notice":["zs1qpn"],"neighbors":["7r54zp"],"internet":["12mqh9x"],"game":["924z6h"],"links":["1s1qu8y"]};
const SYE_DRAFT = OWNER ? (() => { try {
  const d = JSON.parse(localStorage.getItem('sye-draft') || 'null'); if (!d || typeof d !== 'object') return null;
  const hs = t => { let x = 2166136261; for (let i = 0; i < t.length; i++) { x ^= t.charCodeAt(i); x = Math.imul(x, 16777619); } return (x >>> 0).toString(36); };
  let ch = false;
  // 내가 안 고친 칸(예전 내용 그대로인 칸)은 새 홈페이지 내용으로 : 예전 내용(SYE_BASE) · 내 수정본 · 지금 내용을 한 칸씩 비교해요
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const m3 = (b, mine, now) => { if (same(mine, b)) return now; if (same(mine, now)) return now;
    if (mine && now && b && typeof mine === 'object' && typeof now === 'object' && typeof b === 'object' && Array.isArray(mine) === Array.isArray(now) && Array.isArray(b) === Array.isArray(now)) {
      if (Array.isArray(mine)) { if (mine.length !== b.length || now.length !== b.length) return mine; return mine.map((x, i) => m3(b[i], x, now[i])); }
      const r = {}; new Set([...Object.keys(now), ...Object.keys(mine)]).forEach(k => { r[k] = !(k in mine) ? now[k] : !(k in now) ? mine[k] : (k in b) ? m3(b[k], mine[k], now[k]) : mine[k]; }); return r; }
    return mine; };
  Object.keys(d).forEach(k => { if (k in SYE_BASE && k in SITE) { const v = m3(SYE_BASE[k], d[k], SITE[k]); if (!same(v, d[k])) { d[k] = v; ch = true; } } });
  Object.keys(d).forEach(k => { if (!(k in SITE)) return; const j = JSON.stringify(d[k]); if (j === JSON.stringify(SITE[k]) || (SYE_OLD[k] || []).includes(hs(j))) { delete d[k]; ch = true; } });
  if (ch) localStorage.setItem('sye-draft', JSON.stringify(d));
  return Object.keys(d).length ? d : null;
} catch (e) { return null; } })() : null;
const RAW = SYE_DRAFT ? Object.assign({}, SITE, SYE_DRAFT) : SITE;   // 글 수정은 이 브라우저에만 저장 → JS 내보내기로 진짜 반영
const S = JSON.parse(JSON.stringify(RAW));
/* 사진 자리 : 사진 칸마다 '어느 칸인지' 표시를 붙여서, 편집 모드에서 누르면 그 칸에 사진을 넣어요 */
const SLOTS = new Map(), SLOT_URL = {};
const slotTok = (path, val) => { const t = '⁣' + SLOTS.size + '⁣'; SLOTS.set(t, { path, val }); return t; };
const SRC = v => { const x = SLOTS.get(v); return x ? (SLOT_URL[x.path] || x.val || '') : (v || ''); };
const SPATH = v => (SLOTS.get(v) || {}).path || '';
const pv = (...vs) => vs.find(v => v && SRC(v)) || vs.find(v => SLOTS.has(v)) || '';
function SYE_TZ(o, p) {
  for (const k of Object.keys(o)) { const v = o[k], pp = p.concat(k);
    if (typeof v === 'string' && !Array.isArray(o) && /^(image|imageBack|photo|card|hero|avatar|cover|thumb|banner|img|back|front)$/.test(k)) o[k] = slotTok(pp.join('.'), v);
    else if (Array.isArray(v) && /^(gallery|images)$/.test(k) && v.every(x => typeof x === 'string')) v.forEach((x, i) => { v[i] = slotTok(pp.concat(i).join('.'), x); });
    else if (typeof v === 'string' && k === 'src' && pp[0] === 'notice') o[k] = slotTok(pp.join('.'), v);
    else if (v && typeof v === 'object' && k !== 'intro') SYE_TZ(v, pp); }
}
SYE_TZ(S, []);
/* 글자 바로 고치기 (제작자 전용) : 글자마다 '어느 칸인지' 보이지 않는 표시를 붙여 두고, 편집 모드에서 누르면 그 자리에서 고쳐요 */
const TXT_PATH = [];
const UN = s => typeof s === 'string' ? s.replace(/⁤[​‌‍⁠]*⁢?|⁡/g, '') : s;
function SYE_TT(o, p, pk) {
  const DENY = /^(id|key|type|icon|src|url|href|link|color|attrColor|since|date|theme|style|side|group|cursor|from|app|zone|zones|k|cls|mode|word|before|after|code|year|el|grade|clsColor)$/;
  const ok = v => v && !/[⁣<>{}\n\r]/.test(v) && !/^[a-z0-9_\-.]+$/.test(v) && !/^#[0-9a-f]{3,8}$/i.test(v) && !/^(https?:|data:|blob:|\.{0,2}\/)/.test(v) && !/^[\d\s.:\-\/+%x×]+$/i.test(v);
  for (const k of Object.keys(o)) {
    if (!p.length && (k === 'intro' || k === 'cursor')) continue;
    const v = o[k], key = Array.isArray(o) ? pk : k, pp = p.concat(Array.isArray(o) ? +k : k);
    if (typeof v === 'string') { if (!DENY.test(key) && ok(v)) { o[k] = '⁤' + TXT_PATH.length.toString(4).replace(/[0-3]/g, d => '​‌‍⁠'[d]) + '⁢' + v + '⁡'; TXT_PATH.push(pp); } }
    else if (v && typeof v === 'object' && !DENY.test(key)) SYE_TT(v, pp, key);
  }
}
if (OWNER) SYE_TT(S, [], '');
if (OWNER && navigator.clipboard && navigator.clipboard.writeText) { const w0 = navigator.clipboard.writeText.bind(navigator.clipboard); try { navigator.clipboard.writeText = t => w0(UN(t)); } catch (e) {} }
const SYE_FAST = (() => { try { const f = sessionStorage.getItem('sye-fast') === '1'; sessionStorage.removeItem('sye-fast'); return f; } catch (e) { return false; } })();
if (OWNER && SYE_FAST && S.intro) S.intro.seconds = .3;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pad = n => String(n).padStart(2, '0');
/* 메인 글씨 (UNRELEASED) : 굵은 몽세라트 + 'I' 또는 'L' 자리를 캡슐 💊 로 (보내준 SYRINGE 로고처럼) */
const CAPS_SVG = (L) => L
  ? `<svg class="tcap L" viewBox="0 0 54 72" aria-hidden="true"><rect class="tc-fo" x="11" y="53" width="41" height="18"/><g class="tc-cap"><rect class="tc-bd" x="2.5" y="2.5" width="22" height="68" rx="11"/><clipPath id="tcc${L}"><rect x="6.5" y="6.5" width="14" height="60" rx="7"/></clipPath><g clip-path="url(#tcc${L})"><g class="tc-slosh"><rect class="tc-lq" x="-20" y="37" width="70" height="40"/><path class="tc-wv" d="M-20 37q3.75-3 7.5 0t7.5 0t7.5 0t7.5 0t7.5 0t7.5 0t7.5 0t7.5 0t7.5 0v3h-60z"/></g></g><rect class="tc-in" x="6.5" y="6.5" width="14" height="60" rx="7"/><path class="tc-hl" d="M10.5 12v16"/></g></svg>`
  : `<svg class="tcap" viewBox="0 0 27 72" aria-hidden="true"><g class="tc-cap"><rect class="tc-bd" x="2.5" y="2.5" width="22" height="68" rx="11"/><clipPath id="tcc0"><rect x="6.5" y="6.5" width="14" height="60" rx="7"/></clipPath><g clip-path="url(#tcc0)"><rect class="tc-lq" x="0" y="36" width="30" height="40"/></g><rect class="tc-in" x="6.5" y="6.5" width="14" height="60" rx="7"/><path class="tc-hl" d="M10.5 12v16"/></g></svg>`;
let TCAP_N = 0;
function titleHTML(t) {   // 메인 글씨 : 그냥 프리텐다드 글자로 (캡슐 없이)
  return esc(String(t ?? '').replace(/[\u2064\u2061\u2062\u200B\u200C\u200D\u2060]/g, ''));
}

const MQ_MOB = '(max-width:720px),(max-aspect-ratio:4/5) and (max-width:1100px),(max-height:599px)';   // 휴대폰 + 세로로 긴 패드는 휴대폰처럼 위에서 아래로 (참고한 홈페이지처럼)
const isMobile = () => matchMedia(MQ_MOB).matches;

/* ---------- 화면 비율 맞추기 (1440×900 기준) ---------- */
const BASE_W = 1440, BASE_H = 900;
const WIN_W = 1034, WIN_H = 846;
const WZ = 1.0;   // 아이콘 창 크기 배율 (전체화면에서 너무 크지 않게 1.2 → 1.0)
const WZ_C = 1.2;   // 캐릭터 목록·상세창 배율 (그대로)
const WZ_CHAR = 1.0;   // 전체화면에서 캐릭터 목록·상세창 글씨 배율 (작을수록 글씨 작게)
const WIN_SMALL = 1.1, WIN_SMALL_CHAR = 1.06;   // 작은 창에서 창 글씨를 더 키우는 최대 배율 (1 = 안 키움)   // 창 안 글씨 크기 배율 (1 = 원래 크기)   // 창 위치·크기는 예전 1034×846 기준 숫자를 화면에 맞춰 늘려요
// 아이패드 · 아이폰 · 맥 사파리는 CSS zoom 이 글자를 제대로 줄이지 못해요(웹킷 버그) → 통째로 transform 으로 축소
const WKZ = (() => { const u = navigator.userAgent; return /AppleWebKit/.test(u) && !/Chrome|Chromium|Edg|OPR|Android/.test(u); })();
if (WKZ) document.documentElement.classList.add('wkz');
let Z = 1, SX = 1;   // SX = 가로로 넓은 화면에서 시안 구도를 그대로 채우려고 옆으로 늘리는 배율
function fit() {
  const intro = $('#intro'), desk = $('#desk');
  if (isMobile()) { Z = 1; SX = 1; [intro, desk].forEach(el => el && (el.style.zoom = '', el.style.width = '', el.style.height = '', el.style.transform = '')); return; }
  Z = Math.min(innerWidth / BASE_W, innerHeight / BASE_H);
  SX = 1;   // 넓은 화면은 늘리지 않고 시안(1440) 구도 그대로, 양옆만 빈 배경
  [intro, desk].forEach(el => { if (!el) return; if (WKZ) { el.style.zoom = ''; el.style.transformOrigin = '0 0'; el.style.transform = `scale(${Z})`; } else el.style.zoom = Z; el.style.width = innerWidth / Z + 'px'; el.style.height = innerHeight / Z + 'px'; });
  if (desk) { desk.style.width = innerWidth / Z / SX + 'px'; desk.style.transformOrigin = '0 0'; desk.style.transform = WKZ ? `scale(${Z * SX}, ${Z})` : SX > 1.0005 ? `scaleX(${SX.toFixed(4)})` : ''; }
  // 세로로 긴 창: 메인 화면은 전체화면과 똑같은 1440×900 모양 그대로 가운데에 (위아래만 여백)
  // 메인 화면은 페이지 전체를 한 덩어리(1440×900)로 보고, 창 크기에 맞춰 비율 그대로 통째로 커지고 작아져요
  // 메인 화면: 페이지 전체를 같은 비율로 줄이고 키우되, 창을 빈틈없이 꽉 채워요
  if (desk) { desk.style.left = '0px'; desk.style.top = '0px'; layoutTall(); layoutWide(); }
  const pw = document.querySelector('.win.passwin');
  if (pw) placePass(pw);
}
// 오른쪽 BACKSTAGE PASS 창 자리 (가운데 1440×900 무대 기준 오른쪽 칸)
// 오른쪽 D-DAY 창: 화면 오른쪽에 붙이고, 창 크기와 상관없이 전체화면일 때와 같은 실제 크기로 유지해요
function passZoom(any) {
  if (isMobile() || (!any && innerWidth < 900)) return 1;
  const full = Math.min((screen.availWidth || innerWidth) / BASE_W, (screen.availHeight || innerHeight) / BASE_H);
  return Math.max(1, Math.min(1.2, full / Z));   // 1.2 = 작은 창에서 커지는 최대치 (너무 크면 열쇠·앱을 가려요)
}
const passWide = () => { if (isMobile()) return 1; const W = innerWidth / Z; return Math.max(1, Math.min(1.5, W * .236 / (308 * .877 * passZoom()))); };   // 보내준 사진 비율: 출입증 = 화면 폭의 22.4%
function placePass(el) {
  if (isMobile()) return;
  if (syOn()) return syPass(el);   // SYRINGE 시안 배치
  const c = passZoom(), W = deskW();
  const z = c * .877 * passWide();   // 시안: 출입증 카드 0.877배
  if (WKZ) { el.style.transformOrigin = '0 0'; el.style.transform = `scale(${z})`; el.dataset.wz = 1; el.style.width = '308px'; el.style.left = Math.round(W - 24 - 308 * z) + 'px'; el.style.top = '66px'; layoutWide(); return; }
  el.style.zoom = z; el.dataset.wz = z;
  el.style.width = '308px'; el.style.left = Math.round((W - 24 - 308 * z) / z) + 'px'; el.style.top = Math.round(66 / z) + 'px';
  layoutWide();
}
// 가로로 넓은 창: 양옆 빈 곳 없이 왼쪽 묶음 · 가운데 열쇠 · 오른쪽 D-DAY 를 펼쳐요
function layoutWide() { layoutTall(); }
fit();
// 창 크기 바꿀 때 버벅이지 않게: 한 화면(프레임)에 한 번만 다시 배치하고, 그동안 움직임 효과는 잠깐 꺼요
let fitRaf = 0, rzT = 0;
addEventListener('resize', () => { const d = document.getElementById('desk'); d && d.classList.add('sy-rz'); clearTimeout(rzT); rzT = setTimeout(() => d && d.classList.remove('sy-rz'), 220); if (!fitRaf) fitRaf = requestAnimationFrame(() => { fitRaf = 0; fit(); }); });
// 처음 열릴 때 창 폭이 휴대폰 ↔ PC 기준(720px)을 넘나들면 (패드 미리보기 등) 그 화면에 맞게 다시 불러와요
const MOB0 = isMobile(); let mobT = 0;
addEventListener('resize', () => { clearTimeout(mobT); mobT = setTimeout(() => { if (isMobile() !== MOB0) location.reload(); }, 250); });
document.fonts && document.fonts.ready.then(() => fit());

/* ---------- 아이콘 ---------- */
const P = {
  school: '<path d="M2.5 9.5 12 5l9.5 4.5L12 14Z"/><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5"/><path d="M21.5 9.5V15"/>',
  swords: '<path d="M14.5 17.5 3 6V3h3l11.5 11.5"/><path d="M13 19l6-6M16 16l4 4M19 21l2-2"/><path d="M14.5 6.5 18 3h3v3l-3.5 3.5"/><path d="M5 14l4 4M7 17l-3 3M3 19l2 2"/>',
  sentinel: '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8 7.5 9.5 4.3-1.5 7.5-4.9 7.5-9.5V6Z"/><path d="M7.8 12s1.6-2.8 4.2-2.8 4.2 2.8 4.2 2.8-1.6 2.8-4.2 2.8-4.2-2.8-4.2-2.8Z"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>',
  sparkle: '<path d="M12 3c.6 4.2 1.8 5.4 6 6-4.2.6-5.4 1.8-6 6-.6-4.2-1.8-5.4-6-6 4.2-.6 5.4-1.8 6-6Z"/><path d="M18.5 14.5c.3 1.9.8 2.4 2.5 2.7-1.7.3-2.2.8-2.5 2.7-.3-1.9-.8-2.4-2.5-2.7 1.7-.3 2.2-.8 2.5-2.7Z"/><circle cx="5.5" cy="17.5" r="1.3"/>',
  moon: '<path d="M19.5 14.6A7.8 7.8 0 1 1 9.4 4.5a6.2 6.2 0 0 0 10.1 10.1Z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  folder: '<path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H9l2 2h8.5A1.5 1.5 0 0 1 21 9.5v8a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5Z"/>',
  folderF: '<path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H9l2 2h8.5A1.5 1.5 0 0 1 21 9.5v8a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5Z" fill="currentColor" fill-opacity=".25"/>',
  bell: '<path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15Z"/><path d="M10 21h4"/>',
  heartpulse: '<path d="M20.4 12.6 12 21l-8.4-8.4A5 5 0 0 1 12 6a5 5 0 0 1 8.4 6.6Z"/><path d="M3.5 12.5h4l1.5-3 3 6 1.5-3h7"/>',
  heart: '<path d="M20.4 12.6 12 21l-8.4-8.4A5 5 0 0 1 12 6a5 5 0 0 1 8.4 6.6Z" fill="currentColor" fill-opacity=".25"/>',
  grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>',
  grid4: '<circle cx="7.5" cy="7.5" r="3.5"/><circle cx="16.5" cy="7.5" r="3.5"/><circle cx="7.5" cy="16.5" r="3.5"/><circle cx="16.5" cy="16.5" r="3.5"/>',
  idcard: '<rect x="3" y="5" width="18" height="14" rx="3"/><circle cx="8.5" cy="11" r="2"/><path d="M5.8 16c.6-1.4 1.6-2 2.7-2s2.1.6 2.7 2M14 10h4M14 13.5h4"/>',
  chat: '<path d="M4 18.5V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H8Z"/><path d="M9 10.5h.01M12 10.5h.01M15 10.5h.01" stroke-width="2.6"/>',
  radar: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="m12 12 5.5-5.5"/><circle cx="12" cy="12" r="1.2"/>',
  sliders: '<path d="M5 4v6M5 14v6M12 4v10M12 18v2M19 4v2M19 10v10"/><rect x="3" y="10" width="4" height="4" rx="1"/><rect x="10" y="14" width="4" height="4" rx="1"/><rect x="17" y="6" width="4" height="4" rx="1"/>',
  file: '<path d="M6 3h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M14 3v4h4M8.5 12h7M8.5 15.5h7"/>',
  music: '<path d="M9 18V6l11-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
  note: '<path d="M10 17V5l8-1"/><circle cx="7.5" cy="17" r="2.5" fill="currentColor"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3Z"/>',
  pick: '<path d="M12 21.5c-1.8 0-8-8-8-13.2C4 5 7.6 2.8 12 2.8S20 5 20 8.3c0 5.2-6.2 13.2-8 13.2Z"/><path d="M9 9.5c1-.9 2-1.3 3-1.3"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  tkUser: '<circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 5-5 8-5s6.5 1 8 5"/>',
  tkSmile: '<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
  tkPen: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
  tkMenu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
  tkArrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  minus: '<path d="M6 12h12"/>',
  play: '<path d="M7 4.5v15l12-7.5Z" fill="currentColor"/>',
  pause: '<rect x="6" y="4.5" width="4" height="15" rx="1" fill="currentColor"/><rect x="14" y="4.5" width="4" height="15" rx="1" fill="currentColor"/>',
  prev: '<path d="M18 5v14l-9-7Z" fill="currentColor"/><path d="M6 5v14"/>',
  next: '<path d="M6 5v14l9-7Z" fill="currentColor"/><path d="M18 5v14"/>',
  shuffle: '<path d="M3 7h3.5c4.5 0 6.5 10 11 10H21M3 17h3.5c1.6 0 2.9-1.2 4-2.8M14 9.8c1-1.6 2.2-2.8 3.8-2.8H21M18 4l3 3-3 3M18 14l3 3-3 3"/>',
  repeat: '<path d="M4 11V9a3 3 0 0 1 3-3h13l-3-3M20 13v2a3 3 0 0 1-3 3H4l3 3"/>',
  vol: '<path d="M4 9.5h3.5L12 5v14l-4.5-4.5H4Z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
  dl: '<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>',
  share: '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/><circle cx="12" cy="16" r="1.3" fill="currentColor"/>',
  chevl: '<path d="m15 6-6 6 6 6"/>', chevr: '<path d="m9 6 6 6-6 6"/>', chevup: '<path d="m6 15 6-6 6 6"/>',
  refresh: '<path d="M20 12a8 8 0 1 1-2.4-5.7L20 8.5M20 4v4.5h-4.5"/>',
  send: '<path d="M4 12 20 4l-5 16-3.5-6.5Z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  list: '<path d="M10 6h10M10 12h10M10 18h10"/><path d="M3.5 6l1.5 1.5L7.5 5M3.5 12l1.5 1.5 2.5-2.5M3.5 18l1.5 1.5 2.5-2.5"/>',
  ext: '<path d="M7 17 17 7M9 7h8v8"/>',
  page: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M4 9h16"/>',
  disc: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.5"/>',
  game: '<path d="M14 4l6 6-9 9-4 1 1-4 9-9"/><path d="M12 8l4 4"/>',
  pen: '<path d="M4 20l4-1 11-11-3-3L5 16Z"/><path d="M14 7l3 3"/>',
  gallery: '<path d="M3 5h18v14H3z M3 16l5-5 4 4 3-3 6 6"/>',
  letters: '<path d="M3 6h18v12H3z M3 6l9 7 9-7"/>',
  lockbox: '<path d="M6 10h12v10H6z M8 10V7a4 4 0 018 0v3 M12 14v2"/>',
  setlist: '<path d="M8 6h12 M8 12h12 M8 18h12 M4 6h0.01 M4 12h0.01 M4 18h0.01"/>',
  camera: '<path d="M3 7h4l2-3h6l2 3h4v13H3z M12 10a3.5 3.5 0 110 7 3.5 3.5 0 010-7z"/>',
  calendar: '<path d="M4 6h16v14H4z M4 10h16 M8 3v4 M16 3v4 M8 14h2 M12 14h2"/>',
  archive: '<path d="M3 5h18v4H3z M5 9v10h14V9 M10 13h4"/>',
  polaroid: '<path d="M5 3h14v18H5z M7 5h10v10H7z"/>',
  tickets: '<path d="M3 7h18v4a2 2 0 000 4v4H3v-4a2 2 0 000-4z M14 7v10"/>',
  moonlight: '<path d="M20 14A8 8 0 1110 4a6 6 0 0010 10z M17 3l.6 1.4L19 5l-1.4.6L17 7l-.6-1.4L15 5l1.4-.6z"/>',
  ooc: '<path d="M4 5h12v9H8l-4 3z"/><path d="M16 9h4v8l-3-2h-6v-1"/><path d="M7.5 9.5h.01M10 9.5h.01M12.5 9.5h.01"/>',
  prompt: '<path d="M4 4h12l4 4v12H4z"/><path d="M8 10l2.5 2L8 14M12 15h4"/>',
  album: '<path d="M3 7h18v12H3z M7 4h10 M9 13a3 3 0 106 0 3 3 0 00-6 0"/>',
  guestbook: '<path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3z M5 17a3 3 0 013-3h11 M9 8h6"/>',
  diary: '<path d="M6 3h11a2 2 0 012 2v16H8a2 2 0 01-2-2z M9 7h7 M9 11h7"/>',
  shop: '<path d="M5 8h14l-1 12H6z M9 8a3 3 0 016 0"/>',
  stickers: '<path d="M5 5h10l4 4v10H5z M15 5v4h4"/>',
  radio: '<path d="M4 9h16v11H4z M8 5l8 4 M8 15a2 2 0 104 0 2 2 0 00-4 0 M16 13h2"/>'
};
const ic = (n, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" ${extra}>${P[n] || ''}</svg>`;
const fillIcons = (root = document) => $$('[data-icon]', root).forEach(el => { if (!el.dataset.done) { el.innerHTML = ic(el.dataset.icon); el.dataset.done = 1; } });

/* ---------- 이미지 자리 ---------- */
const hash = s => [...String(s)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
const V = s => ['', 'v2', 'v3', 'v4'][hash(s) % 4];
const imgPosCss = p => `object-position:${+p[0]}% ${+p[1]}%;transform:translate(${+p[3] || 0}%,${+p[4] || 0}%) scale(${+p[2] || 1});transform-origin:${+p[0]}% ${+p[1]}%`;
function ph(src, { cls = '', label = '', seed = label || cls, icon = '', style = '' } = {}) {
  const sp = SPATH(src); src = SRC(src);
  const ip = sp && S.imgPos && S.imgPos[sp];
  return `<div class="ph ${V(seed)} ${cls}${sp && !src ? ' is-empty' : ''}" ${sp ? `data-slot="${esc(sp)}"` : ''} data-label="${esc(label)}" ${style ? `style="${style}"` : ''}>${src ? `<img src="${esc(src)}" alt="" loading="lazy"${ip ? ` style="${imgPosCss(ip)}"` : ''}>` : icon ? `<span class="ph-ic">${ic(icon)}</span>` : ''}</div>`;
}
// 사진 자리 따로 쓰기 : own 자리(예: 첫 화면 사진)에 사진이 없으면 fb(목록 사진)를 대신 보여주되, 누르면 own 자리에 넣어져요
function phFb(own, fb, o = {}) { if (!SPATH(own)) return ph(pv(own, fb), o); if (SRC(own) || !SRC(fb)) return ph(own, o).replace(/data-slot="([^"]*)"/, a0 => SPATH(fb) ? `${a0} data-fb="${esc(SPATH(fb))}"` : a0); const sp = SPATH(own), ip = (S.imgPos || {})[sp];
  return ph(own, o).replace(' is-empty', ' is-fb').replace(/data-slot="([^"]*)"/, (a0) => `${a0} data-fb="${esc(SPATH(fb))}"`).replace(/>(<span class="ph-ic">[\s\S]*?<\/span>)?<\/div>$/, `><img src="${esc(SRC(fb))}" alt="" loading="lazy"${ip ? ` style="${imgPosCss(ip)}"` : ''}></div>`); }
function barcode(w = 74, h = 21, seed = 'x') {
  let x = 0, out = '', s = hash(seed);
  while (x < w) { s = (s * 1103515245 + 12345) >>> 0; const bw = .7 + (s % 3) * .6; if ((s >> 4) % 3) out += `<rect x="${x.toFixed(1)}" y="0" width="${bw.toFixed(1)}" height="${h}"/>`; x += bw + .8 + ((s >> 8) % 2) * .6; }
  return `<svg viewBox="0 0 ${w} ${h}" fill="currentColor" preserveAspectRatio="none">${out}</svg>`;
}
const ecg = (w = 300, h = 24) => `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><path d="M0 ${h * .6} ${Array.from({ length: Math.round(w / 50) }, (_, i) => { const x = i * 50; return `H${x + 18} L${x + 21} ${h * .45} L${x + 24} ${h * .6} H${x + 30} L${x + 33} ${h * .05} L${x + 37} ${h * .95} L${x + 40} ${h * .6}`; }).join(' ')} H${w}"/></svg>`;

/* ---------- 날짜 ---------- */
const DAY = 864e5;
const today = new Date(); today.setHours(0, 0, 0, 0);
const since = new Date(S.pair.since + 'T00:00:00');
const dnum = Math.floor((today - since) / DAY) + 1;
const nextDate = new Date(since.getTime() + (S.pair.nextGoal - 1) * DAY);
const left = Math.max(0, S.pair.nextGoal - dnum);
const pct = Math.min(100, Math.round(dnum / S.pair.nextGoal * 100));
const MON = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const ymd = d => `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
const hms = d => `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

/* ---------- 공통 바인딩 ---------- */
$$('[data-bind]').forEach(el => { el.textContent = el.dataset.bind.split('.').reduce((o, k) => o?.[k], S) ?? ''; });
$$('.today-long').forEach(el => el.textContent = `${MON[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`);
$$('.since-ab').forEach(el => el.textContent = `${S.pair.a[0]}×${S.pair.b[0]}`);
$$('.dplus').forEach(el => el.textContent = `D+${dnum}`);
$$('.nextd').forEach(el => el.textContent = `NEXT D+${S.pair.nextGoal}`);
$$('.big-title').forEach(el => { el.innerHTML = `${esc(S.title.before)}<span class="mic-i"></span>${esc(S.title.after)}`; el.classList.toggle('tilt', S.title.tilt !== false); });
$$('.pair-ab').forEach(el => el.innerHTML = `${esc(S.pair.a)}<em>×</em>${esc(S.pair.b)}`);
$$('.pair-roles').forEach(el => el.innerHTML = `${esc(S.pair.aRole)}<br>${esc(S.pair.bRole)}`);
$$('.pair-pill').forEach(el => el.textContent = S.pair.pill);
$$('.mq-track').forEach(el => { const t = esc(S.marquee).replace(/✦/g, '<b>✦</b>').repeat(2); el.innerHTML = `<span>${t}</span><span>${t}</span>`; });
document.title = (S.credit.bottom || 'Setlist').replace(/\.$/, '');
fillIcons();

/* ---------- 클릭 효과 ---------- */
document.addEventListener('pointerdown', e => {
  const host = $('#intro:not(.out)') || $('#desk');
  const fx = document.createElement('i'); fx.className = 'click-fx';
  const r = host.getBoundingClientRect(), z = isMobile() ? 1 : Z;
  fx.style.left = (e.clientX - r.left) / z / (host.id === 'desk' ? SX : 1) + 'px';
  fx.style.top = (e.clientY - r.top) / z + 'px';
  host.appendChild(fx); setTimeout(() => fx.remove(), 600);
}, true);

/* ---------- 클로버 열쇠 (입장 화면 · 메인 가운데에서 같이 써요) ---------- */
const KEY_KP = ["<rect class=\"kw\" x=\"-9\" y=\"24\" width=\"18\" height=\"80\" rx=\"3\"/><line class=\"kth\" x1=\"-4\" y1=\"34\" x2=\"-4\" y2=\"94\"/><g transform=\"translate(0 0) rotate(45)\"><g transform=\"translate(0 -14) scale(0.74 1)\"><path class=\"km\" d=\"M0 0 C-77.9 -24.6 -83.6 -105.0 -39.4 -106.6 C-13.1 -107.4 0 -88.6 0 -73.8 C0 -88.6 13.1 -107.4 39.4 -106.6 C83.6 -105.0 77.9 -24.6 0 0 Z\"/><path d=\"M0 0 C-77.9 -24.6 -83.6 -105.0 -39.4 -106.6 C-13.1 -107.4 0 -88.6 0 -73.8 C0 -88.6 13.1 -107.4 39.4 -106.6 C83.6 -105.0 77.9 -24.6 0 0 Z\" fill=\"url(#kDots)\"/><path class=\"kln\" d=\"M0 0 C-77.9 -24.6 -83.6 -105.0 -39.4 -106.6 C-13.1 -107.4 0 -88.6 0 -73.8 C0 -88.6 13.1 -107.4 39.4 -106.6 C83.6 -105.0 77.9 -24.6 0 0 Z\"/><path class=\"kth\" d=\"M0 -6.6 L0 -24.6\"/></g></g><g transform=\"translate(0 0) rotate(135)\"><g transform=\"translate(0 -14) scale(0.74 1)\"><path class=\"km\" d=\"M0 0 C-77.9 -24.6 -83.6 -105.0 -39.4 -106.6 C-13.1 -107.4 0 -88.6 0 -73.8 C0 -88.6 13.1 -107.4 39.4 -106.6 C83.6 -105.0 77.9 -24.6 0 0 Z\"/><path d=\"M0 0 C-77.9 -24.6 -83.6 -105.0 -39.4 -106.6 C-13.1 -107.4 0 -88.6 0 -73.8 C0 -88.6 13.1 -107.4 39.4 -106.6 C83.6 -105.0 77.9 -24.6 0 0 Z\" fill=\"url(#kDots)\"/><path class=\"kln\" d=\"M0 0 C-77.9 -24.6 -83.6 -105.0 -39.4 -106.6 C-13.1 -107.4 0 -88.6 0 -73.8 C0 -88.6 13.1 -107.4 39.4 -106.6 C83.6 -105.0 77.9 -24.6 0 0 Z\"/><path class=\"kth\" d=\"M0 -6.6 L0 -24.6\"/></g></g><g transform=\"translate(0 0) rotate(225)\"><g transform=\"translate(0 -14) scale(0.74 1)\"><path class=\"km\" d=\"M0 0 C-77.9 -24.6 -83.6 -105.0 -39.4 -106.6 C-13.1 -107.4 0 -88.6 0 -73.8 C0 -88.6 13.1 -107.4 39.4 -106.6 C83.6 -105.0 77.9 -24.6 0 0 Z\"/><path d=\"M0 0 C-77.9 -24.6 -83.6 -105.0 -39.4 -106.6 C-13.1 -107.4 0 -88.6 0 -73.8 C0 -88.6 13.1 -107.4 39.4 -106.6 C83.6 -105.0 77.9 -24.6 0 0 Z\" fill=\"url(#kDots)\"/><path class=\"kln\" d=\"M0 0 C-77.9 -24.6 -83.6 -105.0 -39.4 -106.6 C-13.1 -107.4 0 -88.6 0 -73.8 C0 -88.6 13.1 -107.4 39.4 -106.6 C83.6 -105.0 77.9 -24.6 0 0 Z\"/><path class=\"kth\" d=\"M0 -6.6 L0 -24.6\"/></g></g><g transform=\"translate(0 0) rotate(315)\"><g transform=\"translate(0 -14) scale(0.74 1)\"><path class=\"km\" d=\"M0 0 C-77.9 -24.6 -83.6 -105.0 -39.4 -106.6 C-13.1 -107.4 0 -88.6 0 -73.8 C0 -88.6 13.1 -107.4 39.4 -106.6 C83.6 -105.0 77.9 -24.6 0 0 Z\"/><path d=\"M0 0 C-77.9 -24.6 -83.6 -105.0 -39.4 -106.6 C-13.1 -107.4 0 -88.6 0 -73.8 C0 -88.6 13.1 -107.4 39.4 -106.6 C83.6 -105.0 77.9 -24.6 0 0 Z\" fill=\"url(#kDots)\"/><path class=\"kln\" d=\"M0 0 C-77.9 -24.6 -83.6 -105.0 -39.4 -106.6 C-13.1 -107.4 0 -88.6 0 -73.8 C0 -88.6 13.1 -107.4 39.4 -106.6 C83.6 -105.0 77.9 -24.6 0 0 Z\"/><path class=\"kth\" d=\"M0 -6.6 L0 -24.6\"/></g></g><g transform=\"rotate(0) scale(1.708)\"><path class=\"kln\" d=\"M-9 -58 C-16 -74 -4 -86 0 -76 C4 -86 16 -74 9 -58\"/><circle class=\"kw\" cx=\"0\" cy=\"-90\" r=\"4.5\"/></g><g transform=\"rotate(90) scale(1.708)\"><path class=\"kln\" d=\"M-9 -58 C-16 -74 -4 -86 0 -76 C4 -86 16 -74 9 -58\"/><circle class=\"kw\" cx=\"0\" cy=\"-90\" r=\"4.5\"/></g><g transform=\"rotate(270) scale(1.708)\"><path class=\"kln\" d=\"M-9 -58 C-16 -74 -4 -86 0 -76 C4 -86 16 -74 9 -58\"/><circle class=\"kw\" cx=\"0\" cy=\"-90\" r=\"4.5\"/></g><circle class=\"kw\" cx=\"0\" cy=\"0\" r=\"29\"/><circle class=\"kth\" cx=\"0\" cy=\"0\" r=\"22\"/><g transform=\"translate(0 11)\"><path class=\"kcut\" d=\"M0 0 C-22.8 -7.2 -24.5 -30.7 -11.5 -31.2 C-3.8 -31.4 0 -25.9 0 -21.6 C0 -25.9 3.8 -31.4 11.5 -31.2 C24.5 -30.7 22.8 -7.2 0 0 Z\"/></g>", "<ellipse class=\"kw\" cx=\"0\" cy=\"98\" rx=\"14\" ry=\"8.4\"/><rect class=\"kw\" x=\"-19\" y=\"108\" width=\"38\" height=\"13\" rx=\"3\"/><line class=\"kth\" x1=\"-17\" y1=\"114.5\" x2=\"17\" y2=\"114.5\"/><ellipse class=\"kw\" cx=\"0\" cy=\"130\" rx=\"12\" ry=\"7.0\"/>", "<rect class=\"kw\" x=\"-11\" y=\"140\" width=\"22\" height=\"418\" rx=\"2\"/><line class=\"kth\" x1=\"-8\" y1=\"148\" x2=\"-8\" y2=\"550\"/><line class=\"kth\" x1=\"-11\" y1=\"172\" x2=\"11\" y2=\"180\"/><line class=\"kth\" x1=\"-11\" y1=\"184\" x2=\"11\" y2=\"192\"/><line class=\"kth\" x1=\"-11\" y1=\"196\" x2=\"11\" y2=\"204\"/><line class=\"kth\" x1=\"-11\" y1=\"208\" x2=\"11\" y2=\"216\"/><line class=\"kth\" x1=\"-11\" y1=\"220\" x2=\"11\" y2=\"228\"/><line class=\"kth\" x1=\"-11\" y1=\"232\" x2=\"11\" y2=\"240\"/><line class=\"kth\" x1=\"-11\" y1=\"244\" x2=\"11\" y2=\"252\"/><line class=\"kth\" x1=\"-11\" y1=\"256\" x2=\"11\" y2=\"264\"/><rect class=\"kw\" x=\"-15\" y=\"300\" width=\"30\" height=\"9\" rx=\"3\"/><line class=\"kth\" x1=\"-13\" y1=\"304.5\" x2=\"13\" y2=\"304.5\"/><rect class=\"kw\" x=\"-11\" y=\"556\" width=\"22\" height=\"8\" rx=\"3\"/>", "<path class=\"kw\" d=\"M11 464.0 L58.15 464.0 C67.35 464.0 71.94999999999999 470.9 71.94999999999999 480.1 L71.94999999999999 487.0 L58.15 487.0 L58.15 498.5 L74.25 498.5 L74.25 523.8 L60.449999999999996 523.8 L60.449999999999996 535.3 L71.94999999999999 535.3 C71.94999999999999 549.1 65.05 556.0 55.849999999999994 556.0 L11 556.0 Z\"/><g transform=\"translate(35.15 505.4)\"><path class=\"kcut\" d=\"M0 0 C-9.8 -3.1 -10.6 -13.2 -5.0 -13.5 C-1.7 -13.6 0 -11.2 0 -9.3 C0 -11.2 1.7 -13.6 5.0 -13.5 C10.6 -13.2 9.8 -3.1 0 0 Z\" transform=\"rotate(180)\"/></g><line class=\"kth\" x1=\"16.75\" y1=\"473.2\" x2=\"16.75\" y2=\"546.8\"/>"];
const KEY_VB = '-170 -170 340 745', KEY_RATIO = 340 / 745;
function keySVG(mode) {
  // mode: face(앞뒤 면) · edge(두께 바깥) · core(두께 안쪽)
  const C = mode === 'face' ? { w: '#F7FDFE', s: '#65C8D6', m: '#E3F6EF', c: '#FFFFFF', dots: 1 }
    : mode === 'edge' ? { w: '#CBEEF2', s: '#A3DDE5', m: '#C9ECE0', c: '#CBEEF2', dots: 0 }
    : mode === 'edge2' ? { w: '#76C4CE', s: '#76C4CE', m: '#76C4CE', c: '#76C4CE', dots: 0 }
    : mode === 'core2' ? { w: '#9CD9E2', s: '#9CD9E2', m: '#9CD9E2', c: '#9CD9E2', dots: 0 }
    : { w: '#DFF4F7', s: '#BAE6EC', m: '#D6F1E7', c: '#DFF4F7', dots: 0 };
  const css = `.kw{fill:${C.w};stroke:${C.s};stroke-width:1.8;stroke-linejoin:round}.km{fill:${C.m}}.kln{fill:none;stroke:${C.s};stroke-width:1.9;stroke-linejoin:round;stroke-linecap:round}.kth{fill:none;stroke:${C.s};stroke-width:1.3;opacity:.75;stroke-linecap:round}.kcut{fill:${C.c};stroke:${C.s};stroke-width:1.8}`;
  let parts = [3, 2, 1, 0].map(i => KEY_KP[i]).join('');
  if (!C.dots) parts = parts.replace(/ fill="url\(#kDots\)"/g, ' fill="none"');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${KEY_VB}"><style>${css}</style><defs><pattern id="kDots" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.1" fill="#fff" opacity=".85"/></pattern></defs>${parts}</svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
const KEY_IMG = { face: keySVG('face'), edge: keySVG('edge'), core: keySVG('core') };
const KEY_IMG_IN = { face: KEY_IMG.face, edge: keySVG('edge2'), core: keySVG('core2') };   // 입장화면 열쇠 (시안 색)
// 열쇠 + 궤도 고리 만들기 (box: 열쇠가 들어가는 칸, CX·CY: 가운데, KH: 열쇠 높이)
function buildKey(root, { CX, CY, KH, rings, fill, img }) {
  const KI = img || KEY_IMG;
  const KW = KH * KEY_RATIO;
  const fl = $('.k-float', root); fl.style.cssText = `left:${(CX - KW / 2).toFixed(1)}px;top:${CY - KH / 2}px;width:${KW.toFixed(1)}px;height:${KH}px`;
  let layers = '';
  for (let z = -12; z <= 12; z += 2) layers += `<img class="kl" src="${Math.abs(z) <= 6 ? KI.core : KI.edge}" alt="" style="transform:translateZ(${z}px)">`;
  const face = z => fill ? `<img class="kf ghost" src="${KI.face}" alt="" style="transform:translateZ(${z}px)"><img class="kf fillc" src="${KI.face}" alt="" style="transform:translateZ(${z}px)">`
    : `<img class="kf" src="${KEY_IMG.face}" alt="" style="transform:translateZ(${z}px)">`;
  $('.k-spin', root).innerHTML = layers + face(-13.6) + face(13.6);
  $('.k-rings', root).innerHTML = ringsHTML(CX, CY, rings);
}
function ringsHTML(CX, CY, rings) {
  const star = c => `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="${c}"><path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z"/></svg>`;
  return rings.map(([R, tilt, dur, dir, border, orbs]) => `<div class="k-ring" style="left:${CX - R}px;top:${CY - R}px;width:${2 * R}px;height:${2 * R}px;transform:rotateZ(${tilt}deg) rotateX(72deg)">
    <div class="k-orbit" style="border:${border};animation-duration:${dur};animation-direction:${dir}">${orbs.map(o => { const a = o.a * Math.PI / 180;
      const inner = o.k === 'note' ? `<span style="display:block;width:100%;height:100%;color:${o.c};filter:drop-shadow(0 2px 3px rgba(49,172,189,.2))">${o.n === 2 ? STN_NOTE : STN_8}</span>` : o.k === 'moon' ? `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="${o.c}" style="display:block;filter:drop-shadow(0 2px 3px rgba(49,172,189,.2))"><path d="M20 14A8 8 0 1110 4a6 6 0 0010 10z"/></svg>` : o.k === 'dot' ? `<span class="o-dot"></span>` : o.k === 'star' ? star(o.c) : o.k === 'chip' ? `<span class="o-chip" style="background:${o.c}"></span>` : `<span class="o-planet" style="background:radial-gradient(circle at 35% 35%,#fff,${o.c} 62%)"></span>`;
      return `<div class="k-orb" style="left:${R + R * Math.cos(a)}px;top:${R + R * Math.sin(a)}px"><div class="k-bb" style="left:${-o.s / 2}px;top:${-o.s / 2}px;width:${o.s}px;height:${o.s}px;animation-duration:${dur};animation-direction:${dir}">${inner}</div></div>`; }).join('')}</div></div>`).join('');
}
const STAR = (c, s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${c}"><path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z"/></svg>`;
/* ---------- 클로버 자물쇠 + 열쇠 (스티커 펜던트 · 메인 홈) ---------- */
const DUO_LEAF = 'M0 0 C-77.9 -24.6 -83.6 -105.0 -39.4 -106.6 C-13.1 -107.4 0 -88.6 0 -73.8 C0 -88.6 13.1 -107.4 39.4 -106.6 C83.6 -105.0 77.9 -24.6 0 0 Z';
const DUO_SW = 'M-9 -58 C-16 -74 -4 -86 0 -76 C4 -86 16 -74 9 -58';
const DUO_HEART = 'M0 0 C-22.8 -7.2 -24.5 -30.7 -11.5 -31.2 C-3.8 -31.4 0 -25.9 0 -21.6 C0 -25.9 3.8 -31.4 11.5 -31.2 C24.5 -30.7 22.8 -7.2 0 0 Z';
function duoClover(center) {
  const L = (r, inner) => `<g transform="rotate(${r})"><g transform="translate(0 -14) scale(0.74 1)">${inner}</g></g>`;
  const R = [45, 135, 225, 315];
  const edge = R.map(r => L(r, `<path class="de1" d="${DUO_LEAF}"/>`)).join('') + '<circle class="de1" r="30"/>'
    + R.map(r => L(r, `<path class="de2" d="${DUO_LEAF}"/>`)).join('') + '<circle class="de2" r="30"/>';
  const leaves = R.map(r => L(r, `<path class="dlf" d="${DUO_LEAF}"/><g transform="translate(0 -52) scale(.78) translate(0 52)"><path class="dst" d="${DUO_LEAF}"/></g>`)).join('');
  const sw = [0, 90, 270].map(r => `<g transform="rotate(${r}) scale(1.708)"><path class="dsw" d="${DUO_SW}"/><circle class="dsc" cx="0" cy="-90" r="4.2"/></g>`).join('');
  const rays = [20, 70, 110, 160, 200, 250, 290, 340].map(r => `<line class="dry" x1="0" y1="-35" x2="0" y2="-42" transform="rotate(${r})"/>`).join('');
  return edge + leaves + sw + rays + `<circle class="dcw" r="29"/><circle class="dci" r="22.5"/>` + center;
}
const DUO_CSS = '.de1{fill:#5FB0BD;stroke:#5FB0BD;stroke-width:13;stroke-linejoin:round;vector-effect:non-scaling-stroke}.de2{fill:#fff;stroke:#fff;stroke-width:9.5;stroke-linejoin:round;vector-effect:non-scaling-stroke}'
  + '.dlf{fill:#E7F5F3;stroke:#5FB0BD;stroke-width:2.3;stroke-linejoin:round;vector-effect:non-scaling-stroke}.dst{fill:none;stroke:#8CCBD3;stroke-width:1.3;stroke-dasharray:3.4 3.4;vector-effect:non-scaling-stroke}'
  + '.dsw{fill:none;stroke:#5FB0BD;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}.dsc{fill:#fff;stroke:#5FB0BD;stroke-width:1.6}.dry{stroke:#5FB0BD;stroke-width:1.6;stroke-linecap:round}'
  + '.dcw{fill:#fff;stroke:#5FB0BD;stroke-width:2.4}.dci{fill:none;stroke:#5FB0BD;stroke-width:1.3}.dho{fill:#5FB0BD}'
  + '.kw{fill:#F4FBFB;stroke:#5FB0BD;stroke-width:2}.kth{fill:none;stroke:#8CCBD3;stroke-width:1.3;stroke-linecap:round}.kcut{fill:#fff;stroke:#5FB0BD;stroke-width:1.8}'
  + '.dbw{fill:#F4FBFB;stroke:#5FB0BD;stroke-width:2.4;stroke-linejoin:round}.dln{fill:none;stroke:#5FB0BD;stroke-width:2.4;stroke-linecap:round}'
  + '.de1g *{fill:#5FB0BD;stroke:#5FB0BD;stroke-width:13;stroke-linejoin:round}.de2g *{fill:#fff;stroke:#fff;stroke-width:9.5;stroke-linejoin:round}';
function duoKeySVG() {
  // 열쇠: 머리(클로버 + 하트) · 손잡이 · 몸통 · 열쇠 날 (원래 열쇠 모양 그대로, 스티커 테두리)
  const D = 100;   // 막대 줄인 길이
  const shaft = KEY_KP[1] + KEY_KP[2].replace('height="418"', `height="${418 - D}"`).replace('y2="550"', `y2="${550 - D}"`).replace('y="556"', `y="${556 - D}"`) + `<g transform="translate(0 ${-D})">${KEY_KP[3]}</g>`;
  // 머리: 자물쇠와 똑같은 네잎클로버 (자물쇠 시안에서 그대로 가져오고 가운데만 하트)
  const head = `<rect class="kw" x="-9" y="60" width="18" height="44" rx="3"/><g transform="translate(-320 -330)">` + DUO_LOCK.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')
    .replace(/<circle cx="320" cy="324.2"[^>]*><\/circle>/, '').replace(/<path d="M315.2 330.0[^>]*><\/path>/, '')
    .replace(/<path d="M320 422 V448"[^>]*><\/path>/, '').replace(/<circle cx="320" cy="454"[^>]*><\/circle>/, '').replace(/<g class="kd-bow">[\s\S]*?<\/g>/, '')
    .replace(/id="lkDots"/g, 'id="lkDotsK"').replace(/url\(#lkDots\)/g, 'url(#lkDotsK)')
    + `<g transform="translate(320 341) scale(.62)"><path d="${DUO_HEART}" fill="#fff" stroke="#38ACBA" stroke-width="3.2" stroke-linejoin="round"/></g></g>`;
  return `<svg class="kd-svg" viewBox="-175 -175 350 655"><style>${DUO_CSS}</style><g class="de1g">${shaft}</g><g class="de2g">${shaft}</g>${shaft}${head}</svg>`;
}
// 자물쇠: 보내준 시안(LockV2N) 그대로
const DUO_LOCK = '<svg class="kd-lsvg" viewBox="0 0 960 640"><defs><pattern id="lkDots" width="9" height="9" patternUnits="userSpaceOnUse"><rect width="9" height="9" fill="#E3F6F2"></rect></pattern></defs><g transform="rotate(-90 320 218)"><path d="M320 202 C342 192 350 210 336 216 C350 224 342 244 320 234" fill="none" stroke="#38ACBA" stroke-width="4.0" stroke-linecap="round"></path><circle cx="364" cy="218" r="7.0" fill="#FFFFFF" stroke="#38ACBA" stroke-width="3"></circle></g><path d="M0.0 0.0 C-30.0 -30.0 -65.0 -50.0 -60.0 -80.0 C-55.0 -115.0 -15.0 -110.0 0.0 -85.0 C15.0 -110.0 55.0 -115.0 60.0 -80.0 C65.0 -50.0 30.0 -30.0 0.0 0.0 Z" transform="translate(320 330) rotate(45)" fill="#FFFFFF" stroke="#38ACBA" stroke-width="10" stroke-linejoin="round"></path><path d="M0.0 0.0 C-30.0 -30.0 -65.0 -50.0 -60.0 -80.0 C-55.0 -115.0 -15.0 -110.0 0.0 -85.0 C15.0 -110.0 55.0 -115.0 60.0 -80.0 C65.0 -50.0 30.0 -30.0 0.0 0.0 Z" transform="translate(320 330) rotate(135)" fill="#FFFFFF" stroke="#38ACBA" stroke-width="10" stroke-linejoin="round"></path><path d="M0.0 0.0 C-30.0 -30.0 -65.0 -50.0 -60.0 -80.0 C-55.0 -115.0 -15.0 -110.0 0.0 -85.0 C15.0 -110.0 55.0 -115.0 60.0 -80.0 C65.0 -50.0 30.0 -30.0 0.0 0.0 Z" transform="translate(320 330) rotate(225)" fill="#FFFFFF" stroke="#38ACBA" stroke-width="10" stroke-linejoin="round"></path><path d="M0.0 0.0 C-30.0 -30.0 -65.0 -50.0 -60.0 -80.0 C-55.0 -115.0 -15.0 -110.0 0.0 -85.0 C15.0 -110.0 55.0 -115.0 60.0 -80.0 C65.0 -50.0 30.0 -30.0 0.0 0.0 Z" transform="translate(320 330) rotate(315)" fill="#FFFFFF" stroke="#38ACBA" stroke-width="10" stroke-linejoin="round"></path><path d="M0.0 0.0 C-30.0 -30.0 -65.0 -50.0 -60.0 -80.0 C-55.0 -115.0 -15.0 -110.0 0.0 -85.0 C15.0 -110.0 55.0 -115.0 60.0 -80.0 C65.0 -50.0 30.0 -30.0 0.0 0.0 Z" transform="translate(320 330) rotate(45)" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6.5" stroke-linejoin="round"></path><path d="M0.0 0.0 C-30.0 -30.0 -65.0 -50.0 -60.0 -80.0 C-55.0 -115.0 -15.0 -110.0 0.0 -85.0 C15.0 -110.0 55.0 -115.0 60.0 -80.0 C65.0 -50.0 30.0 -30.0 0.0 0.0 Z" transform="translate(320 330) rotate(135)" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6.5" stroke-linejoin="round"></path><path d="M0.0 0.0 C-30.0 -30.0 -65.0 -50.0 -60.0 -80.0 C-55.0 -115.0 -15.0 -110.0 0.0 -85.0 C15.0 -110.0 55.0 -115.0 60.0 -80.0 C65.0 -50.0 30.0 -30.0 0.0 0.0 Z" transform="translate(320 330) rotate(225)" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6.5" stroke-linejoin="round"></path><path d="M0.0 0.0 C-30.0 -30.0 -65.0 -50.0 -60.0 -80.0 C-55.0 -115.0 -15.0 -110.0 0.0 -85.0 C15.0 -110.0 55.0 -115.0 60.0 -80.0 C65.0 -50.0 30.0 -30.0 0.0 0.0 Z" transform="translate(320 330) rotate(315)" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6.5" stroke-linejoin="round"></path><path d="M0.0 0.0 C-30.0 -30.0 -65.0 -50.0 -60.0 -80.0 C-55.0 -115.0 -15.0 -110.0 0.0 -85.0 C15.0 -110.0 55.0 -115.0 60.0 -80.0 C65.0 -50.0 30.0 -30.0 0.0 0.0 Z" transform="translate(0 0) translate(320 330) rotate(45)" fill="#C4EBE7"></path><path d="M0.0 0.0 C-30.0 -30.0 -65.0 -50.0 -60.0 -80.0 C-55.0 -115.0 -15.0 -110.0 0.0 -85.0 C15.0 -110.0 55.0 -115.0 60.0 -80.0 C65.0 -50.0 30.0 -30.0 0.0 0.0 Z" transform="translate(320 330) rotate(45)" fill="url(#lkDots)" stroke="#38ACBA" stroke-width="2.2" stroke-linejoin="round"></path><path d="M0.0 0.0 C-30.0 -30.0 -65.0 -50.0 -60.0 -80.0 C-55.0 -115.0 -15.0 -110.0 0.0 -85.0 C15.0 -110.0 55.0 -115.0 60.0 -80.0 C65.0 -50.0 30.0 -30.0 0.0 0.0 Z" transform="translate(0 0) translate(320 330) rotate(135)" fill="#C4EBE7"></path><path d="M0.0 0.0 C-30.0 -30.0 -65.0 -50.0 -60.0 -80.0 C-55.0 -115.0 -15.0 -110.0 0.0 -85.0 C15.0 -110.0 55.0 -115.0 60.0 -80.0 C65.0 -50.0 30.0 -30.0 0.0 0.0 Z" transform="translate(320 330) rotate(135)" fill="url(#lkDots)" stroke="#38ACBA" stroke-width="2.2" stroke-linejoin="round"></path><path d="M0.0 0.0 C-30.0 -30.0 -65.0 -50.0 -60.0 -80.0 C-55.0 -115.0 -15.0 -110.0 0.0 -85.0 C15.0 -110.0 55.0 -115.0 60.0 -80.0 C65.0 -50.0 30.0 -30.0 0.0 0.0 Z" transform="translate(0 0) translate(320 330) rotate(225)" fill="#C4EBE7"></path><path d="M0.0 0.0 C-30.0 -30.0 -65.0 -50.0 -60.0 -80.0 C-55.0 -115.0 -15.0 -110.0 0.0 -85.0 C15.0 -110.0 55.0 -115.0 60.0 -80.0 C65.0 -50.0 30.0 -30.0 0.0 0.0 Z" transform="translate(320 330) rotate(225)" fill="url(#lkDots)" stroke="#38ACBA" stroke-width="2.2" stroke-linejoin="round"></path><path d="M0.0 0.0 C-30.0 -30.0 -65.0 -50.0 -60.0 -80.0 C-55.0 -115.0 -15.0 -110.0 0.0 -85.0 C15.0 -110.0 55.0 -115.0 60.0 -80.0 C65.0 -50.0 30.0 -30.0 0.0 0.0 Z" transform="translate(0 0) translate(320 330) rotate(315)" fill="#C4EBE7"></path><path d="M0.0 0.0 C-30.0 -30.0 -65.0 -50.0 -60.0 -80.0 C-55.0 -115.0 -15.0 -110.0 0.0 -85.0 C15.0 -110.0 55.0 -115.0 60.0 -80.0 C65.0 -50.0 30.0 -30.0 0.0 0.0 Z" transform="translate(320 330) rotate(315)" fill="url(#lkDots)" stroke="#38ACBA" stroke-width="2.2" stroke-linejoin="round"></path><path d="M0.0 0.0 C-24.0 -24.0 -52.0 -40.0 -48.0 -64.0 C-44.0 -92.0 -12.0 -88.0 0.0 -68.0 C12.0 -88.0 44.0 -92.0 48.0 -64.0 C52.0 -40.0 24.0 -24.0 0.0 0.0 Z" transform="translate(320 330) rotate(45) translate(0 -10.0)" fill="none" stroke="#38ACBA" stroke-width="1.3" stroke-dasharray="2 5" stroke-linecap="round" opacity="0.65"></path><path d="M0.0 0.0 C-24.0 -24.0 -52.0 -40.0 -48.0 -64.0 C-44.0 -92.0 -12.0 -88.0 0.0 -68.0 C12.0 -88.0 44.0 -92.0 48.0 -64.0 C52.0 -40.0 24.0 -24.0 0.0 0.0 Z" transform="translate(320 330) rotate(135) translate(0 -10.0)" fill="none" stroke="#38ACBA" stroke-width="1.3" stroke-dasharray="2 5" stroke-linecap="round" opacity="0.65"></path><path d="M0.0 0.0 C-24.0 -24.0 -52.0 -40.0 -48.0 -64.0 C-44.0 -92.0 -12.0 -88.0 0.0 -68.0 C12.0 -88.0 44.0 -92.0 48.0 -64.0 C52.0 -40.0 24.0 -24.0 0.0 0.0 Z" transform="translate(320 330) rotate(225) translate(0 -10.0)" fill="none" stroke="#38ACBA" stroke-width="1.3" stroke-dasharray="2 5" stroke-linecap="round" opacity="0.65"></path><path d="M0.0 0.0 C-24.0 -24.0 -52.0 -40.0 -48.0 -64.0 C-44.0 -92.0 -12.0 -88.0 0.0 -68.0 C12.0 -88.0 44.0 -92.0 48.0 -64.0 C52.0 -40.0 24.0 -24.0 0.0 0.0 Z" transform="translate(320 330) rotate(315) translate(0 -10.0)" fill="none" stroke="#38ACBA" stroke-width="1.3" stroke-dasharray="2 5" stroke-linecap="round" opacity="0.65"></path><circle cx="324" cy="334" r="30" fill="#C4EBE7" stroke="none"></circle><circle cx="320" cy="330" r="30" fill="#FFFFFF" stroke="#38ACBA" stroke-width="2.4"></circle><circle cx="320" cy="330" r="23" fill="none" stroke="#38ACBA" stroke-width="1.6"></circle><path d="M344.0 354.0 L349.7 359.7" stroke="#38ACBA" stroke-width="1.6" stroke-linecap="round"></path><path d="M296.0 354.0 L290.3 359.7" stroke="#38ACBA" stroke-width="1.6" stroke-linecap="round"></path><path d="M296.0 306.0 L290.3 300.3" stroke="#38ACBA" stroke-width="1.6" stroke-linecap="round"></path><path d="M344.0 306.0 L349.7 300.3" stroke="#38ACBA" stroke-width="1.6" stroke-linecap="round"></path><circle cx="320" cy="324.2" r="9.6" fill="#38ACBA"></circle><path d="M315.2 330.0 L324.8 330.0 L323.4 348.2 L316.6 348.2 Z" fill="#38ACBA"></path><path d="M320 422 V448" stroke="#38ACBA" stroke-width="2.4"></path><circle cx="320" cy="454" r="6" fill="#FFFFFF" stroke="#38ACBA" stroke-width="2.4"></circle><g class="kd-bow"><path d="M320 460 V470" stroke="#38ACBA" stroke-width="2.2"></path><path d="M320 480 C305.6 459.2 278.4 462.4 280.0 478.4 C281.6 492.8 305.6 488.0 320 480 Z" fill="url(#lkDots)" stroke="#38ACBA" stroke-width="2.2"></path><path d="M320 480 C334.4 459.2 361.6 462.4 360.0 478.4 C358.4 492.8 334.4 488.0 320 480 Z" fill="url(#lkDots)" stroke="#38ACBA" stroke-width="2.2"></path><path d="M317.6 483.2 C312.0 494.4 310.4 500.8 304.0 508.8 L312.0 507.2 L315.2 513.6 C318.4 502.4 320 492.8 320 484.8 Z" fill="url(#lkDots)" stroke="#38ACBA" stroke-width="2" stroke-linejoin="round"></path><path d="M322.4 483.2 C328.0 494.4 329.6 500.8 336.0 508.8 L328.0 507.2 L324.8 513.6 C321.6 502.4 320 492.8 320 484.8 Z" fill="url(#lkDots)" stroke="#38ACBA" stroke-width="2" stroke-linejoin="round"></path><circle cx="320" cy="480" r="6.4" fill="#FFFFFF" stroke="#38ACBA" stroke-width="2.4"></circle></g><path d="M204 314 C182 304 174 322 188 328 C174 336 182 356 204 346" fill="none" stroke="#38ACBA" stroke-width="4.0" stroke-linecap="round"></path><circle cx="160" cy="330" r="7.0" fill="#FFFFFF" stroke="#38ACBA" stroke-width="3"></circle><path d="M436 314 C458 304 466 322 452 328 C466 336 458 356 436 346" fill="none" stroke="#38ACBA" stroke-width="4.0" stroke-linecap="round"></path><circle cx="480" cy="330" r="7.0" fill="#FFFFFF" stroke="#38ACBA" stroke-width="3"></circle></svg>';
// 자물쇠 · 열쇠 크기/자리 (시안 960×640 좌표) — s: 크기 배율, c: 가운데
const DUO_CFG = { lockS: .7, lockC: [372, 318], keyS: 1, keyC: [648, 290] };
var DUO_W = 540, TITLE_CV = null;
// 큰 글씨 옆 둥둥 떠다니는 음표 · 별 · 달 · 구슬 (아주 조그맣게)
const STN_NOTE = '<svg viewBox="0 0 24 24"><path d="M9 17.5V5l10-2v11.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="6.5" cy="17.8" rx="3.4" ry="2.7" fill="currentColor"/><ellipse cx="16.5" cy="15.3" rx="3.4" ry="2.7" fill="currentColor"/></svg>';
const STN_8 = '<svg viewBox="0 0 24 24"><path d="M12 18V3c2 2.5 6 3.5 6 8" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="9" cy="18.3" rx="3.6" ry="2.8" fill="currentColor"/></svg>';
const STN_STAR = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z"/></svg>';
const STN_MOON = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M20 14A8 8 0 1110 4a6 6 0 0010 10z"/></svg>';
const STNOTES_UNUSED = '<div>' + [
  [STN_8, 16, -58, 24, '#38ACBA', 0, 6.2], [STN_STAR, 48, -22, 12, '#57D2E3', -1.5, 4.6], [STN_NOTE, 30, 26, 20, '#5FC3CF', -3, 7],
  [null, 66, -60, 9, '', -2.2, 5.4], [STN_MOON, 70, 10, 13, '#86E4F1', -4, 6.6], [STN_STAR, 6, 58, 9, '#3FB8D8', -1, 5]
].map(([svg, x, y, sz, c, dl, du]) => `<i class="stn" style="left:${x}px;top:${y}px;width:${sz}px;height:${sz}px;color:${c};animation-delay:${dl}s;animation-duration:${du}s">${svg || '<span class="o-dot"></span>'}</i>`).join('') + '</div>';
function buildDuo(root) {
  const C = DUO_CFG;
  // 각자 차지하는 칸 (시안 기준 가운데에서 위아래 · 양옆 거리)
  const lb = [C.lockC[0] - 160 * C.lockS, C.lockC[1] - 124 * C.lockS, C.lockC[0] + 160 * C.lockS, C.lockC[1] + 183 * C.lockS];
  const kb = [C.keyC[0] - 110 * C.keyS, C.keyC[1] - 220 * C.keyS, C.keyC[0] + 110 * C.keyS, C.keyC[1] + 162 * C.keyS];
  const bx0 = Math.min(lb[0], kb[0]), bx1 = Math.max(lb[2], kb[2]), by0 = Math.min(lb[1], kb[1]), by1 = Math.max(lb[3], kb[3]);
  const bx = (bx0 + bx1) / 2, by = (by0 + by1) / 2, F = 718 / (by1 - by0);   // 둘 다 합친 높이 = 지금 열쇠 높이
  // 궤도: 자물쇠 + 열쇠 둘을 한 번에 감싸며 돌아요 (기존 열쇠 궤도처럼 별 · 달 · 구슬이 같이 돎)
  const R1 = (bx1 - bx0) / 2 + 46, k = 1 / F;
  // 진한 궤도 2개 (별 · 달 · 구슬 · 음표가 따라 돌아요) + 연한 점선 궤도 2개 (뒤에 깔려요)
  const rings = [
    [R1, -9, '80s', 'normal', '1.7px solid rgba(49,172,189,0.55)', [{ a: 20, k: 'moon', s: 40, c: '#6ADAE9' }, { a: 150, k: 'note', s: 34, c: '#38ACBA' }, { a: 250, k: 'star', s: 28, c: '#57D2E3' }]],
    [R1 * .8, 8, '56s', 'reverse', '1.5px solid rgba(49,172,189,0.48)', [{ a: 80, k: 'dot', s: 18 }, { a: 210, k: 'star', s: 22, c: '#3FB8D8' }, { a: 320, k: 'note', s: 28, c: '#5FC3CF', n: 2 }]]]
    .map(([R, t, d, dir, b, o]) => [R, t, d, dir, b, o.map(x => Object.assign({}, x, { s: x.s * k }))]);
  // 궤도 밖에서 둥둥 떠다니는 아이들
  const hw = (bx1 - bx0) / 2, hh = (by1 - by0) / 2, fs = k * 2;
  const FL = [[STN_STAR, -hw - 34, -hh * .55, 15, '#57D2E3', 0, 5.2], [STN_8, hw + 18, -hh * .7, 22, '#38ACBA', -2, 6.4], [null, -hw * .35, -hh - 6, 10, '', -1, 4.8],
    [STN_NOTE, -hw - 18, hh * .42, 19, '#5FC3CF', -3.4, 7], [STN_MOON, hw + 26, hh * .28, 15, '#86E4F1', -1.6, 6], [STN_STAR, hw * .12, hh + 4, 11, '#3FB8D8', -4, 5.6], [null, hw * .55, -hh - 14, 8, '', -2.6, 5]];
  const floats = FL.map(([svg, x, y, sz, c, dl, du]) => `<i class="stn" style="left:${(x - sz * fs / 2).toFixed(1)}px;top:${(y - sz * fs / 2).toFixed(1)}px;width:${(sz * fs).toFixed(1)}px;height:${(sz * fs).toFixed(1)}px;color:${c};animation-delay:${dl}s;animation-duration:${du}s">${svg || '<span class="o-dot"></span>'}</i>`).join('');
  const EW = 2 * R1 + 30;
  DUO_W = EW * F * .53;
  root.innerHTML = `<div class="k-duo" style="left:${(194 - bx * F).toFixed(1)}px;top:${(350 - by * F).toFixed(1)}px;transform:scale(${F.toFixed(4)})">
    <div class="kd-u" style="left:${bx}px;top:${by}px"><i class="kd-ell a" style="left:${-EW / 2}px;top:${-EW * .15}px;width:${EW}px;height:${EW * .3}px"></i><i class="kd-ell b" style="left:${-EW / 2}px;top:${-EW * .15}px;width:${EW}px;height:${EW * .3}px"></i><div class="k-rings">${ringsHTML(0, 0, rings)}</div>${floats}</div>
    <div class="kd-pos" style="transform:translate(${C.lockC[0] - 320 * C.lockS}px,${C.lockC[1] - 330 * C.lockS}px) scale(${C.lockS})"><div class="kd-lockart">${DUO_LOCK}</div></div>
    <div class="kd-pos" style="transform:translate(${C.keyC[0] - 648 * C.keyS}px,${C.keyC[1] - 290 * C.keyS}px) scale(${C.keyS})"><div class="kd-keyart">${duoKeySVG()}</div></div></div>`;
}
const dust = list => list.map(([x, y, r, c, d]) => `<span class="dust" style="left:${x}px;top:${y}px;animation-duration:${d}">${STAR(c, r)}</span>`).join('');

// 입장화면 젤리 글씨 (OFF THE RECORD)
function jellyTitle(L, G) {
  // G: 크기 설정 (없으면 입장화면 크기)
  G = Object.assign({ rs: 1, fs: 157, y1: 125, y2: 262, c1: 74, c2: 211, per: 79.2, max: 560, w: 780, h: 281, cx: 282.8, cy: 146.4, rx: 318.4, ry: 150.4, glow: true, id: 'ot' }, G || {});
  const a = String(L[0] || ''), b = String(L[1] || ''), P = G.id;
  const tl = t => Math.min(G.max, Math.max(160, t.length * G.per)).toFixed(0);
  const ell = `M${(G.cx - G.rx).toFixed(1)} ${G.cy} a${G.rx} ${G.ry} 0 1 0 ${(2 * G.rx).toFixed(1)} 0 a${G.rx} ${G.ry} 0 1 0 ${(-2 * G.rx).toFixed(1)} 0`;
  const ow = Math.round(G.cx * 2 + 0.5), oh = Math.round(G.cy * 2 - 2);
  const line = (t, y, g, clipH, id) => `<g filter="url(#${P}s)"><text x="6" y="${y}" textLength="${tl(t)}" lengthAdjust="spacingAndGlyphs" class="ot-t" style="font-size:${G.fs}px" fill="url(#${g})" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round">${esc(t)}</text></g>
    <clipPath id="${id}"><rect x="0" y="0" width="640" height="${clipH}"/></clipPath>
    <text x="6" y="${y}" textLength="${tl(t)}" lengthAdjust="spacingAndGlyphs" class="ot-t" style="font-size:${G.fs}px" fill="url(#${P}h)" clip-path="url(#${id})" opacity=".7">${esc(t)}</text>
    <text x="6" y="${y}" textLength="${tl(t)}" lengthAdjust="spacingAndGlyphs" class="ot-t" style="font-size:${G.fs}px" fill="none" stroke="rgba(49,172,189,0.3)" stroke-width="1">${esc(t)}</text>`;
  const rider = (s0, delay, inner) => { const s = Math.round(s0 * G.rs); return `<span class="ot-ride" style="width:${s}px;height:${s}px;margin:${-Math.floor(s / 2)}px 0 0 ${-Math.floor(s / 2)}px;offset-path:path('${ell}');animation-delay:${delay}s">${inner.replace(/width="\d+" height="\d+"/, `width="${s}" height="${s}"`).replace(/width:\d+px;height:\d+px/, `width:${s}px;height:${s}px`)}</span>`; };
  const bub = s => `<span class="ot-bub" style="width:${s}px;height:${s}px"></span>`;
  return `<svg class="ot-orbit" width="${ow}" height="${oh}"><g transform="rotate(-7 ${G.cx} ${G.cy})"><path d="${ell}" fill="none" stroke="#BEEAF0" stroke-width="1.2" stroke-dasharray="2 7" stroke-linecap="round" opacity=".8"/></g></svg>
  ${G.glow ? '<div class="ot-glow"></div>' : ''}
  <svg class="ot-svg" width="${G.w}" height="${G.h}" viewBox="0 0 ${G.w} ${G.h}"><defs>
    <linearGradient id="${P}b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7FE3D2" stop-opacity=".78"/><stop offset=".55" stop-color="#5BC8F0" stop-opacity=".62"/><stop offset="1" stop-color="#67DAE9" stop-opacity=".75"/></linearGradient>
    <linearGradient id="${P}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#86E4F1" stop-opacity=".78"/><stop offset=".55" stop-color="#57D2E3" stop-opacity=".62"/><stop offset="1" stop-color="#3FCFB8" stop-opacity=".75"/></linearGradient>
    <linearGradient id="${P}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".95"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>
    <filter id="${P}s" x="-10%" y="-10%" width="120%" height="150%"><feDropShadow dx="0" dy="9" stdDeviation="9" flood-color="#31ACBD" flood-opacity=".22"/></filter></defs>
    ${line(a, G.y1, P + 'b', G.c1, P + 'c1')}${line(b, G.y2, P + 'a', G.c2, P + 'c2')}</svg>
  ${G.glow ? '<div class="ot-gloss"></div>' : ''}
  <div class="ot-riders" style="width:${ow}px;height:${oh}px;transform-origin:${G.cx}px ${G.cy}px">${rider(19, 0, `<svg width="19" height="19" viewBox="0 0 24 24" fill="#94E2ED" class="ot-moon"><path d="M20 14A8 8 0 1110 4a6 6 0 0010 10z"/></svg>`)}${rider(13, -16, `<svg width="13" height="13" viewBox="0 0 24 24" fill="#3FCFB8" class="ot-tw"><path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z"/></svg>`)}${rider(9, -32, bub(9))}${rider(9, -8, `<svg width="9" height="9" viewBox="0 0 24 24" fill="#79DFED" class="ot-tw"><path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z"/></svg>`)}${rider(7, -40, bub(7))}</div>`;
}

/* =========================================================
   INTRO
   ========================================================= */
(function intro() {
  /* ---------- 입장 화면 : 큰 글씨 + 유리 패널 + 오른쪽 카드 (영상 구도 참고, 민트 테마) ---------- */
  const I = S.intro || {}, K = I.clinic || {}, IN = $('#intro');
  const PL = (S.pairs && S.pairs[0]) || S.pair || {}, pc = (() => { try { return pairCalc(PL); } catch (e) { return { d: 0 }; } })();
  const A = PL.a || 'PURE', B = PL.b || 'UXI';
  const word = UN(K.title || S.clinic?.title || 'UNRELEASED');
  const chip = UN(String(S.clinic?.chips?.[0] || 'LOVE DISORDER CLINIC')).replace(/\s*\+\s*$/, '');
  const STAT = K.status || ['READING CHART', 'CHECKING PULSE', 'SYMPTOM: LOVE', 'NO CURE FOUND', 'ADMISSION READY'];
  const lock = DUO_LOCK.replace('viewBox="0 0 960 640"', 'viewBox="142 192 356 330"').replace(/#38ACBA/g, '#2F9C74').replace(/#C4EBE7/g, '#C9EDDC').replace(/#E3F6F2/g, '#E6F6EE').replace(/id="lkDots"/g, 'id="lkDotsI"').replace(/url\(#lkDots\)/g, 'url(#lkDotsI)').replace('class="kd-lsvg"', 'class="gx-lock"');
  const since = PL.since ? PL.since.replace(/-/g, '.') : '';
  const ring = `${chip}  ✦  ${A} × ${B}  ✦  OPEN 24H  ✦  `;
  // 주사기 눈금 (0 ~ 5.0 mL)
  const ticks = Array.from({ length: 51 }, (_, k) => `<i class="${k % 10 ? (k % 5 ? '' : 'h') : 'l'}">${k % 10 ? '' : `<em>${(k / 10).toFixed(1)}</em>`}</i>`).join('');
  // 바코드 : 글자로 정해지는 줄무늬 (매번 같은 모양)
  const bars = (seed, n) => { let h = 0; for (const ch of String(seed)) h = (h * 31 + ch.charCodeAt(0)) >>> 0; let o = ''; for (let k = 0; k < n; k++) { h = (h * 1103515245 + 12345) >>> 0; const w = 1 + (h >>> 16) % 3; o += `<i style="width:${w}px;animation-delay:${(k * .012).toFixed(3)}s"></i>`; } return o; };
  const cut = word.startsWith('UN') && word.length > 4 ? 2 : Math.ceil(word.length / 2);
  const letters = (t, d0) => [...t].map((c, k) => `<span style="animation-delay:${(d0 + k * .045).toFixed(3)}s">${esc(c)}</span>`).join('');
  const sp = (cls, sz) => `<svg class="gt-sp ${cls}" width="${sz}" height="${sz}" viewBox="0 0 24 24"><path d="M12 1.5C12.6 8 16 11.4 22.5 12 16 12.6 12.6 16 12 22.5 11.4 16 8 12.6 1.5 12 8 11.4 11.4 8 12 1.5z"/></svg>`;
  const ini = (A[0] || 'P') + (B[0] || 'U'), LOGO = S.brand && S.brand.image;
  const OUT = (K.outline || word) + ' ♪ ', IMG = /^(data:|https?:|media\/|\.?\/)/.test(PL.image || '') ? PL.image : '';
  const LK = I.lock || {}, PW = String(LK.password ?? '').trim();
  let locked = !!PW; try { if (sessionStorage.getItem('gt-pass') === PW) locked = false; } catch (e) {}
  IN.className = 'gx gt' + (locked ? ' locked' : '');
  { const r = Math.random(); IN.classList.add(r < .4 ? 'aur-0' : r < .75 ? 'aur-1' : 'aur-2'); }   // 비눗방울 오로라 : 그날 컨디션 (없음 · 은은 · 잘 보임) 랜덤
  if (OWNER) setTimeout(() => { const ob = document.createElement('button'); ob.type = 'button'; ob.className = 'gt-own'; ob.textContent = '✎ 입장 화면 · 비밀번호 수정'; ob.addEventListener('click', e => { e.stopPropagation(); dispatchEvent(new CustomEvent('sye-intro')); }); IN.appendChild(ob); }, 50);
  IN.innerHTML = `<div class="gt-bg"><i class="gt-blob b1"></i><i class="gt-blob b2"></i><i class="gt-blob b3"></i>
      <svg class="gt-rings" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet"><circle cx="500" cy="520" r="470"/><circle class="d" cx="500" cy="520" r="360"/></svg>
      <div class="gt-out"><div>${esc(OUT.repeat(6))}</div></div>
      <i class="gt-cr c1"></i><i class="gt-cr c2"></i><i class="gt-cr c3"></i><i class="gt-cr c4"></i></div>
    ${locked ? `<form class="gt-gate" autocomplete="off"><div class="gt-lock"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path class="sh" d="M15 21v-6a9 9 0 0 1 18 0v6"/><rect x="10" y="21" width="28" height="21" rx="6" fill="#fff"/><path d="M24 29v5"/></svg></div>
      <small>${esc(LK.title || 'MEMBERS ONLY')}</small><p>${esc(LK.text || '비밀번호를 입력해 주세요')}</p>
      <label class="gt-pw"><input type="password" name="pw" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="PASSWORD" aria-label="비밀번호"><button type="submit" aria-label="들어가기"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></label>
      <em class="gt-err"></em></form>` : ''}
    <div class="gt-stage">
      <header class="gt-top"><b class="gt-stk"><i></i>✦ ${esc(S.brand?.home || 'UNRELEASED-01')}</b><span class="gt-est">EST. 2026 · ${esc(S.brand?.homeSub || 'SEIRAN UNIV. BAND')} // ${esc(A)} × ${esc(B)}</span>
        <div class="gt-chips"><span><i></i>${esc(S.online || 'CLUB ROOM OPEN')}</span><span><i></i>OPEN 24H</span></div></header>
      <div class="gt-par p1">${sp('s1', 34)}${sp('s2', 15)}</div><div class="gt-par p2">${sp('s3', 30)}${sp('s4', 13)}</div><div class="gt-par p3">${sp('s5', 26)}${sp('s6', 12)}</div>
      <div class="gt-ball"><i class="gt-str"></i><div class="gt-db gt-bubble"><i class="gt-film"></i><i class="gt-hl"></i><i class="gt-hl2"></i></div><span class="gt-bstar"><svg viewBox="0 0 24 24"><defs><linearGradient id="gtSg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#CFF0E1"/><stop offset="1" stop-color="#7FD7B1"/></linearGradient></defs><path d="M12 1.5C12.6 8 16 11.4 22.5 12 16 12.6 12.6 16 12 22.5 11.4 16 8 12.6 1.5 12 8 11.4 11.4 8 12 1.5z" fill="url(#gtSg)" stroke="#fff" stroke-width=".6"/></svg></span><i class="gt-halo"></i>${sp('gl', 18)}</div>
      <section class="gt-tk">
        <div class="gt-main">
          <span class="gt-tab"><i></i>${esc(K.online || 'NOW REHEARSING')}</span>
          <p class="gt-kick">${esc(S.clinic?.kicker || 'SEIRAN UNIV. · LIGHT MUSIC CLUB')}<em>·</em>OPEN 24H</p>
          <span class="gt-on"><i></i>ON AIR</span>
          <div class="gt-vin"><div class="gt-ph${OWNER ? ' own' : ''}" data-slot="${esc(SPATH(LOGO) || 'brand.image')}">${SRC(LOGO) ? `<img src="${esc(SRC(LOGO))}" alt="">` : `<span class="ph-ic gt-mono"><b>${esc(ini)}</b><i>✦</i></span>`}${OWNER ? '<em class="gt-up">사진 · 로고 넣기</em>' : ''}</div>
            <span class="gt-bub"><i></i>${esc(K.bubble || '조용히 들어와 주세요 ♪')}</span></div>
          <div class="gt-tt"><h1 class="gx-word"><b>${letters(word.slice(0, cut), .55)}</b><em>${letters(word.slice(cut), .55 + cut * .045)}</em></h1>
            <p><span>✦</span>${esc(A)} × ${esc(B)} // ${esc(K.sub || 'FRONT ROW × LEAD VOCAL')}<code>${esc(K.tag || 'off the record')}</code></p></div>
        </div>
        <div class="gt-perf"></div>
        <div class="gt-stub">
          <div class="gt-adm"><small>ADMIT ONE</small><strong>${esc((K.stub || 'OTR').slice(0, 1))}<em>${esc((K.stub || 'OTR').slice(1, -1))}</em>${esc((K.stub || 'OTR').slice(-1))}</strong></div>
          <div class="gt-lot"><small>SEAT</small><b>${esc(PL.passNo || 'TICKET No. 0424')}</b></div>
          <div class="gt-meter"><div class="gt-mt"><b class="gx-stat">${esc(STAT[0])}</b><span class="gx-ml">${esc(K.unit || 'VOL')} <em>0.0</em></span><span class="gx-pct">0%</span></div><div class="gt-track"><i></i></div></div>
          <div class="gt-bc">${bars(A + B + (PL.passNo || ''), 64)}</div>
          <button class="en-hit gx-enter" disabled><span class="gx-fill"></span><i class="gt-shine"></i><b class="gx-bt">LOADING 0</b><i class="gt-arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg></i></button>
        </div>
      </section>
      <footer class="gt-foot"><span>✦ ${esc(S.brand?.homeSub || 'SEIRAN UNIV. BAND')}</span><b>© 2026 <strong>${esc(word)}</strong> · ${esc(A)} × ${esc(B)}</b><span class="r">FREE // OPEN 24H<i class="gt-bc sm">${bars(word, 34)}</i></span></footer>
    </div>`;
  const css = document.createElement('style');
  css.textContent = `
.tcap-w{display:inline-block;height:.72em;vertical-align:baseline;margin:0 .03em 0 .035em;position:relative}
.tcap-w .tcap{display:block;height:100%;width:auto;overflow:visible}
.tcap .tc-bd{fill:#fff;stroke:currentColor;stroke-width:5}
.tcap .tc-fo{fill:currentColor}
.tcap .tc-lq{fill:#7FD6B0}
.tcap .tc-wv{fill:#7FD6B0}
.tcap .tc-in{fill:none;stroke:currentColor;stroke-width:1.6;opacity:.5}
.tcap .tc-hl{stroke:#fff;stroke-width:2.6;stroke-linecap:round;opacity:.9}
#intro .gx-word .tcap-w{color:#fff;filter:none}
#intro .gx-word .tcap .tc-bd{fill:rgba(255,255,255,.35);stroke:#fff}
#intro .gx-word .tcap .tc-lq,#intro .gx-word .tcap .tc-wv{fill:#A6EBCB}
#intro .gx-word .tcap .tc-in{stroke:#fff;opacity:.8}
#wdim{position:fixed;inset:0;background:rgba(236,246,241,.34);-webkit-backdrop-filter:blur(9px) saturate(1.15);backdrop-filter:blur(9px) saturate(1.15);opacity:0;pointer-events:none;transition:opacity .3s ease}
#wdim.on{opacity:1;pointer-events:auto}
body.dark #wdim{background:rgba(12,21,24,.45)}
html.wdim-on #desk .topbar,html.wdim-on #desk .taskbar{z-index:31}
.win{animation:winPop .32s cubic-bezier(.2,.9,.2,1)!important}
.win.closing{animation:winOut .2s ease forwards!important}
@keyframes winPop{from{opacity:0;transform:translateY(12px) scale(.97)}}
@keyframes winOut{to{opacity:0;transform:translateY(8px) scale(.98)}}
#desk .apps .app-tile{font-weight:700!important}
#desk .app-tile .app-ic{transition:transform .25s cubic-bezier(.34,1.56,.64,1),box-shadow .25s}
#desk .app-tile:hover .app-ic{transform:translateY(-3px)}
#desk .app-tile:active .app-ic{transform:scale(.92)}
/* OOC · Prompt : 프로필 · 리스트 · 링크드 창과 같은 서류철 모양 */
.win.rmzw .win-b{overflow:hidden}
.rmz.rm{padding:0!important;height:100%;color:#22444F;--ink:#22444F;--ln:#DFF3F5;--g2:#31ACBD;--mut:#628E94;--soft:#F0FBFC}
.rmz.rm::before{display:none!important}
.rmz .rm-scroll{position:static!important;inset:auto!important;padding:14px 22px 22px!important;border-radius:0!important}
.rmz .rmz-hint b{color:#31ACBD}
.rmz .rm-panel{background:#fff!important;border:1.5px solid #DFF3F5!important;border-radius:16px!important;box-shadow:0 6px 14px -8px rgba(49,172,189,.2)!important;padding:12px!important;animation:cx-rise .45s cubic-bezier(.22,.9,.25,1) both}
.rmz .rm-chips{gap:6px}
.rmz .rm-chip{height:30px!important;padding:0 10px 0 12px!important;border-radius:99px!important;border:1.5px solid #DFF3F5!important;background:#F3FCFD!important;color:#2A96A5!important;box-shadow:none!important;font-size:12px!important;font-weight:700!important;gap:6px}
.rmz .rm-chip > i{display:none!important}
.rmz .rm-chip em{background:#fff!important;color:#31ACBD!important}
.rmz .rm-chip.on{background:linear-gradient(90deg,#57D2E3,#31ACBD)!important;color:#fff!important;border-color:transparent!important;box-shadow:0 6px 14px -6px rgba(49,172,189,.5)!important}
.rmz .rm-chip.on em{background:rgba(255,255,255,.3)!important;color:#fff!important}
.rmz .rm-sh{margin:2px 2px 0!important;padding-bottom:8px;border-bottom:1.5px dashed #DFF3F5}
.rmz .rm-sh > b{font-size:14px!important;background:none!important;-webkit-text-fill-color:#2A96A5!important;color:#2A96A5!important}
.rmz .rm-sh > span{font-size:13px!important}
.rmz .rm-sh > i{display:none}
.rmz .rm-sh small{margin-left:auto;font:700 10px 'Pretendard',sans-serif!important;color:#31ACBD!important;background:#F0FBFC;padding:3px 9px;border-radius:99px;letter-spacing:.06em!important}
.rmz .rm-list{gap:10px}
.rmz .rm-item{border:1.5px solid #DFF3F5!important;border-radius:16px!important;box-shadow:0 6px 14px -8px rgba(49,172,189,.2)!important;padding:12px 16px 10px!important}
.rmz .rm-tick{display:none}
.rmz .rm-item p{font-size:12.5px!important;line-height:1.6!important}
.rmz .rm-if{margin-top:8px!important;padding-top:8px;border-top:1px solid #E9F5F7}
.rmz .rm-if small{color:#54AFBB!important;font:700 10px 'Pretendard',sans-serif!important;letter-spacing:.1em}
.rmz .rm-copy{height:26px!important;border:1.5px solid #DFF3F5!important;color:#2A96A5!important;font:800 10px 'Pretendard',sans-serif!important;letter-spacing:.1em;box-shadow:none!important}
.rmz .rm-copy.on,.rmz .rm-copy.done{background:linear-gradient(90deg,#57D2E3,#31ACBD)!important;color:#fff!important;border-color:transparent!important}
.rmz .rm-seg{background:#fff!important;border:1.5px solid #DFF3F5!important;border-radius:16px!important;box-shadow:0 6px 14px -8px rgba(49,172,189,.2)!important}
.rmz .rm-knob{background:linear-gradient(90deg,#57D2E3,#31ACBD)!important;border-radius:12px!important}
.rmz .rm-seg button{color:#2A96A5}
.rmz .rm-seg button.on{color:#fff}
.rmz .rm-grid{margin-top:0!important;background:#fff;border:1.5px solid #DFF3F5;border-radius:16px;padding:12px;box-shadow:0 6px 14px -8px rgba(49,172,189,.2)}
.rmz .rm-th .rm-fr{border-radius:10px!important;border:1.5px solid #DFF3F5!important}
.rmz .rm-tl small{color:#54AFBB!important}
.rmz .rm-tl b{color:#22444F!important;font-size:12px!important}
.rmz .rm-note{color:#84B6BD!important;font-size:11px!important;text-align:center}
.rmz .rm-dh{background:#fff;border:1.5px solid #DFF3F5;border-radius:16px;padding:10px 12px;margin:0!important}
.rmz .rm-back{border-color:#DFF3F5!important;color:#2A96A5!important}
.rmz .rm-det,.rmz .rm-res{margin-top:0!important}
.rmz .rm-res{background:#fff!important;border:1.5px solid #DFF3F5!important;border-radius:16px!important;padding:12px!important}
.rmz .rm-slot{border-color:#DFF3F5!important}
.rmz .dz-body{gap:12px}
/* 창 크기 조절 손잡이 */
.win .wgrip{position:absolute;right:2px;bottom:2px;width:16px;height:16px;cursor:nwse-resize;z-index:20;opacity:0;transition:opacity .2s}
.win .wgrip::before{content:'';position:absolute;right:4px;bottom:4px;width:7px;height:7px;border-right:2px solid #A6CFC0;border-bottom:2px solid #A6CFC0;border-radius:0 0 3px 0}
.win:hover .wgrip,.win.sizing .wgrip{opacity:1}
.win.sizing{transition:none!important;user-select:none}
.win .sh-grab{display:none}
/* 휴대폰 : 창은 아래에서 올라오는 시트 + 뒤 반투명 (참고 홈페이지처럼) */
@media (max-width:720px),(max-aspect-ratio:4/5) and (max-width:1100px),(max-height:599px){
  html.msheet #winlayer{z-index:80!important}
  #desk #winlayer .win:not(.passwin){position:fixed!important;left:0!important;right:0!important;top:auto!important;bottom:0!important;width:auto!important;height:min(88dvh,780px)!important;max-height:88dvh!important;border-radius:24px 24px 0 0!important;zoom:1!important;animation:sheetUp .38s cubic-bezier(.2,.9,.2,1)!important;box-shadow:0 -12px 40px rgba(20,60,50,.22)!important;padding-top:18px!important;overflow:hidden!important}
  #desk #winlayer .win:not(.passwin).closing{animation:sheetDown .22s ease forwards!important}
  #desk #winlayer .win .sh-grab{display:block;position:absolute;left:0;right:0;top:0;height:22px;z-index:30;touch-action:none;cursor:grab}
  #desk #winlayer .win .sh-grab::before{content:'';position:absolute;left:50%;top:7px;width:42px;height:5px;margin-left:-21px;border-radius:99px;background:rgba(30,70,60,.22)}
  #wdim{position:fixed!important;inset:0!important;background:rgba(20,45,40,.22)!important;-webkit-backdrop-filter:blur(6px)!important;backdrop-filter:blur(6px)!important}
  .mobile-pass .pass > *{min-width:0}
  .mobile-pass .pass-top strong{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:-.02em}
  .mobile-pass .together{min-width:0;overflow:hidden}
  .mobile-pass .together b{font-size:34px!important;letter-spacing:-.03em!important}
}
@keyframes sheetUp{from{transform:translateY(100%)}to{transform:none}}
@keyframes sheetDown{to{transform:translateY(105%)}}
html:not(.sye-editing) .cx-add{display:none!important}
.ph[data-slot]{overflow:hidden}
.sye-ebar .sye-st{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;white-space:nowrap}
.sye-ebar .sye-st .dot{width:7px;height:7px;border-radius:50%;background:#FFB648;box-shadow:0 0 0 3px rgba(255,182,72,.25);animation:syeP 1.6s infinite}
.sye-ebar .sye-st .ok{font-style:normal;color:#7FE0B6}
.sye-ebar .sye-st b{color:#FFD08A}
.sye-ebar .sye-tip{font-size:10.5px;opacity:.6;white-space:nowrap;margin:0 4px}
.sye-ebar button.attn{position:relative;background:#3FAE84!important;color:#fff!important}
.sye-ebar button.attn::after{content:'';position:absolute;right:2px;top:2px;width:7px;height:7px;border-radius:50%;background:#FFB648}
@keyframes syeP{50%{opacity:.4}}
html.sye-editing [data-slot].sye-drop{outline:3px dashed #3FAE84!important;outline-offset:-3px;filter:brightness(1.05)}
html.sye-editing [data-slot].sye-drop::before{content:'여기에 놓기';position:absolute;inset:0;z-index:5;display:grid;place-items:center;background:rgba(63,174,132,.35);color:#fff;font:800 13px 'Pretendard',sans-serif}
html.sye-editing [data-slot].sye-adj{outline:3px solid #3FAE84!important;outline-offset:-3px;cursor:move!important;overflow:hidden}
html.sye-editing [data-slot].sye-adj > img{transition:none!important}
.sye-adjbar{position:fixed;z-index:100001;display:none;align-items:center;gap:5px;padding:5px 5px 5px 12px;border-radius:99px;background:#1E2A27;color:#fff;font:600 11px 'Pretendard',sans-serif;box-shadow:0 10px 26px rgba(0,0,0,.25)}
.sye-adjbar.on{display:flex}
.sye-adjbar span{opacity:.75;margin-right:4px;white-space:nowrap}
.sye-adjbar button{height:28px;min-width:28px;padding:0 10px;border-radius:99px;border:0;background:rgba(255,255,255,.12);color:#fff;font:800 12px 'Pretendard',sans-serif;cursor:pointer}
.sye-adjbar button.pri{background:#3FAE84}
@media (max-width:720px),(max-aspect-ratio:4/5) and (max-width:1100px),(max-height:599px){.sye-ebar .sye-tip{display:none}.sye-ebar{max-width:calc(100vw - 16px);overflow-x:auto}}
/* ===== 참고한 홈페이지들의 움직임 (캡슐 흔들림 · 반짝 점 · 차례로 떠오르기 · 숫자 올라가기 · 하트 톡 · 음악 숨쉬기) ===== */
@keyframes capWob{0%,70%,100%{transform:none}78%{transform:rotate(-12deg)}88%{transform:rotate(7deg)}94%{transform:rotate(-3deg)}}
@keyframes slosh{to{transform:translateX(-15px)}}
@keyframes liveBlink{0%{box-shadow:0 0 0 0 rgba(92,199,154,.55)}70%,100%{box-shadow:0 0 0 6px rgba(92,199,154,0)}}
@keyframes liRise{from{opacity:0;translate:0 26px}to{opacity:1;translate:0 0}}
@keyframes liFade{from{opacity:0}to{opacity:1}}
@keyframes appIn{0%{opacity:0;scale:.6}70%{opacity:1;scale:1.06}100%{opacity:1;scale:1}}
@keyframes ixCap{0%,100%{transform:none}25%{transform:rotate(-14deg)}55%{transform:rotate(9deg)}80%{transform:rotate(-4deg)}}
@keyframes hrtPop{0%{scale:.6}60%{scale:1.25}100%{scale:1}}
@keyframes barFill{from{width:0}}
@keyframes msgPop{from{opacity:0;translate:0 6px;scale:.97}}
@keyframes bgmBreathe{50%{box-shadow:0 0 0 6px rgba(63,174,132,.18),0 6px 16px rgba(63,174,132,.3)}}
@keyframes discSpin{to{transform:rotate(360deg)}}
@keyframes mqRun{to{transform:translateX(-50%)}}
.tcap .tc-cap{transform-box:fill-box;transform-origin:50% 100%;animation:capWob 4.6s ease-in-out infinite}
.tcap .tc-slosh{animation:slosh 2.4s linear infinite}
.sy-pill i,#desk .top-r .pill .led,#intro .gx-eye i,.dz-tag i{animation:liveBlink 1.8s ease-out infinite!important}
body.entered #desk .sy-hero{animation:liRise .75s cubic-bezier(.2,.8,.2,1) both}
body.entered #desk .stage .leftcol .apps-panel{animation:liRise .75s .1s cubic-bezier(.2,.8,.2,1) both}
body.entered #desk .apps .app-tile{animation:appIn .5s cubic-bezier(.3,1.3,.5,1) both;animation-delay:calc(.22s + var(--i,0) * 16ms)}
body.entered #desk #winlayer .win.passwin,body.entered #desk .stage .mobile-pass{animation:liRise .75s .2s cubic-bezier(.2,.8,.2,1) both}
body.entered #desk .sy-bar i{animation:barFill 1.4s .45s cubic-bezier(.2,.8,.2,1) both}
#desk .apps .app-tile:hover .app-ic svg{animation:ixCap .7s ease-in-out}
#desk .apps .app-tile:hover .app-ic{box-shadow:0 10px 20px rgba(30,70,60,.14)!important}
.hrt-pop,.hrt-pop svg{animation:hrtPop .45s cubic-bezier(.3,1.6,.5,1)}
#desk .tasks .task{animation:msgPop .3s cubic-bezier(.2,.9,.2,1)}
.toast{animation:msgPop .35s cubic-bezier(.2,.9,.2,1)}
#desk .mini.playing{animation:bgmBreathe 2.4s ease-in-out infinite}
#desk .mini.playing .mini-cover{animation:discSpin 6s linear infinite;border-radius:50%!important}
#desk .sy-nav button,#desk .top-r .sq,#desk .topnav button{transition:transform .2s cubic-bezier(.3,1.5,.5,1),background .2s}
#desk .sy-nav button:hover,#desk .top-r .sq:hover{transform:translateY(-2px)}
#desk .sy-nav button:active,#desk .top-r .sq:active,#desk .topnav button:active{transform:scale(.9)}
.dz-card,.rmz .rm-item{transition:transform .25s cubic-bezier(.2,.8,.2,1),box-shadow .25s}
.dz-card:hover,.rmz .rm-item:hover{transform:translateY(-2px);box-shadow:0 12px 22px -10px rgba(49,172,189,.35)!important}
.m7-mq{display:none}
@media (prefers-reduced-motion:reduce){.tcap .tc-cap,.tcap .tc-slosh,body.entered #desk .apps .app-tile,body.entered #desk .sy-hero,body.entered #desk .stage .leftcol .apps-panel,.m7-mq > div{animation:none!important}}
#intro.gt{position:fixed;inset:0;z-index:50;overflow:hidden;background:#FEFEFE!important;background-image:none!important;color:#14231E;font-family:'Pretendard','Inter',sans-serif;--ink:#14231E;--m:#3FAE84;--m2:#6FD0A6;--mut:#6E7E78;--ln:#DCE8E2;cursor:default}
#intro.gt *{box-sizing:border-box}
#intro.gt .gt-bg{position:absolute;inset:0;pointer-events:none}
#intro.gt .gt-bg::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle,rgba(60,72,90,.13) 1px,transparent 1.5px);background-size:18px 18px;background-position:9px 9px}
#intro.gt .gt-blob{position:absolute;border-radius:50%;filter:blur(60px);opacity:.7;animation:gt-blob 14s ease-in-out infinite alternate}
#intro.gt .gt-blob.b1{left:-10%;top:-14%;width:42vw;height:36vw;background:#C6EDDA}
#intro.gt .gt-blob.b2{right:-10%;bottom:-14%;width:42vw;height:36vw;background:#C6EDDA;animation-name:gt-blob2}
@keyframes gt-blob2{to{transform:translate(-4vw,-3vh) scale(1.08)}}
#intro.gt .gt-blob.b3{left:38%;top:30%;width:30vw;height:26vw;background:#E5F8EE;animation-delay:-9s}
@keyframes gt-blob{to{transform:translate(4vw,3vh) scale(1.08)}}
#intro.gt .gt-rings{position:absolute;left:50%;top:50%;width:min(110vh,110vw);height:min(110vh,110vw);transform:translate(-50%,-50%)}
#intro.gt .gt-rings circle{fill:none;stroke:rgba(20,35,30,.13);stroke-width:1.2;stroke-dasharray:3000;stroke-dashoffset:3000;animation:gt-draw 2.6s .2s cubic-bezier(.6,.1,.2,1) forwards}
#intro.gt .gt-rings circle.d{stroke-dasharray:2 7;stroke-dashoffset:0;opacity:0;animation:gt-fade 1.4s 1s forwards,gt-spin 90s linear infinite;transform-origin:500px 520px}
@keyframes gt-draw{to{stroke-dashoffset:0}}
@keyframes gt-fade{to{opacity:1}}
@keyframes gt-spin{to{transform:rotate(360deg)}}
#intro.gt .gt-out{position:absolute;left:0;right:0;bottom:-3vh;overflow:hidden;white-space:nowrap}
#intro.gt .gt-out div{display:inline-block;font:900 min(26vh,22vw)/1 'Pretendard',sans-serif;letter-spacing:-.04em;color:transparent;-webkit-text-stroke:1.4px rgba(20,35,30,.12);animation:gt-mq 80s linear infinite}
@keyframes gt-mq{to{transform:translateX(-50%)}}
#intro.gt .gt-cr{position:absolute;width:22px;height:22px;opacity:.5}
#intro.gt .gt-cr::before,#intro.gt .gt-cr::after{content:'';position:absolute;background:var(--ink)}
#intro.gt .gt-cr::before{left:10px;top:0;width:1.4px;height:22px}#intro.gt .gt-cr::after{top:10px;left:0;height:1.4px;width:22px}
#intro.gt .gt-cr.c1{left:22px;top:22px}#intro.gt .gt-cr.c2{right:22px;top:22px}#intro.gt .gt-cr.c3{left:22px;bottom:22px}#intro.gt .gt-cr.c4{right:22px;bottom:22px}
#intro.gt .gt-stage{position:absolute;left:0;top:0;width:1440px;height:900px;transform-origin:0 0}
/* 위 줄 */
#intro.gt .gt-top{position:absolute;left:64px;right:64px;top:44px;height:52px;display:flex;align-items:center;gap:22px}
#intro.gt .gt-stk{display:inline-flex;align-items:center;gap:9px;height:44px;padding:0 20px 0 16px;border-radius:12px;background:#16201C;color:#fff;font:900 16px/1 'Pretendard',sans-serif;letter-spacing:-.01em;transform:rotate(-4deg);box-shadow:4px 5px 0 rgba(20,35,30,.12);animation:gt-stk .9s .35s cubic-bezier(.3,1.6,.5,1) both}
#intro.gt .gt-stk i{width:7px;height:7px;border-radius:50%;background:#fff}
@keyframes gt-stk{from{transform:translateY(-70px) rotate(-22deg);opacity:0}}
#intro.gt .gt-est{font:700 11px 'Inter',sans-serif;letter-spacing:.08em;color:var(--mut);animation:gt-rise .7s .6s both}
#intro.gt .gt-chips{margin-left:auto;display:flex;gap:10px}
#intro.gt .gt-chips span{height:36px;padding:0 16px;border-radius:99px;background:rgba(255,255,255,.85);display:inline-flex;align-items:center;gap:8px;font:800 11px 'Inter',sans-serif;letter-spacing:.08em;box-shadow:0 4px 14px rgba(20,35,30,.05);animation:gt-rise .7s both}
#intro.gt .gt-chips span:nth-child(1){animation-delay:.5s}#intro.gt .gt-chips span:nth-child(2){animation-delay:.6s}
#intro.gt .gt-chips i,#intro.gt .gt-tab i,#intro.gt .gt-on i{width:7px;height:7px;border-radius:50%;background:var(--m);box-shadow:0 0 0 3px rgba(63,174,132,.2);animation:gt-bl 1.6s infinite}
@keyframes gt-bl{50%{opacity:.35}}
@keyframes gt-rise{from{transform:translateY(16px);opacity:0}}
/* 반짝이 */
#intro.gt .gt-par{position:absolute;pointer-events:none}
#intro.gt .gt-par.p1{left:96px;top:200px}#intro.gt .gt-par.p2{left:1230px;top:130px}#intro.gt .gt-par.p3{left:1310px;top:700px}
#intro.gt .gt-sp{position:absolute;fill:#fff;stroke:#3C4F48;stroke-width:1.2;stroke-linejoin:round;animation:gt-tw 3.2s ease-in-out infinite}
#intro.gt .gt-sp.s2{left:44px;top:42px;animation-delay:-1.1s}#intro.gt .gt-sp.s4{left:38px;top:52px;animation-delay:-2s}#intro.gt .gt-sp.s6{left:-34px;top:44px;animation-delay:-.6s}
#intro.gt .gt-sp.s3,#intro.gt .gt-sp.s5{animation-delay:-1.6s}
@keyframes gt-tw{0%,100%{transform:scale(1) rotate(0)}50%{transform:scale(.55) rotate(45deg);opacity:.6}}
/* 미러볼 */
#intro.gt .gt-ball{position:absolute;left:1000px;top:112px;width:176px;height:176px;z-index:3;animation:gt-drop 1.3s .5s cubic-bezier(.3,1.4,.5,1) both}
#intro.gt .gt-db{position:absolute;inset:0;border-radius:50%;overflow:hidden;animation:gt-bob 5s 1.8s ease-in-out infinite;
  background:radial-gradient(circle at 50% 50%,rgba(236,248,242,.8) 0 40%,rgba(204,238,222,.85) 72%,rgba(140,208,178,.9) 100%),radial-gradient(circle at 50% 120%,rgba(127,205,170,.35),transparent 60%);
  box-shadow:0 26px 40px -22px rgba(47,120,95,.4),inset 0 0 0 1px rgba(255,255,255,.95),inset 0 -12px 26px rgba(95,180,150,.18);-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}
#intro.gt .gt-film{position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 210deg,rgba(255,226,236,0),rgba(255,214,228,.85) 8%,rgba(255,238,200,.75) 16%,rgba(214,246,232,.6) 26%,rgba(190,228,255,.85) 36%,rgba(255,226,236,0) 46%,rgba(255,226,236,0) 70%,rgba(190,228,255,.6) 80%,rgba(255,226,236,0) 92%);-webkit-mask:radial-gradient(circle,transparent 52%,#000 82%,rgba(0,0,0,.55) 100%);mask:radial-gradient(circle,transparent 52%,#000 82%,rgba(0,0,0,.55) 100%);opacity:1;filter:blur(2px);animation:gt-film 14s linear infinite}
#intro.gt.aur-0 .gt-film{opacity:0!important}
#intro.gt.aur-1 .gt-film{opacity:.55!important}
#intro.gt.aur-2 .gt-film{opacity:1!important;-webkit-mask:radial-gradient(circle,transparent 44%,#000 78%,rgba(0,0,0,.7) 100%)!important;mask:radial-gradient(circle,transparent 44%,#000 78%,rgba(0,0,0,.7) 100%)!important;animation-duration:9s!important}
#intro.gt .gt-hl{position:absolute;left:17%;top:12%;width:36%;height:20%;border-radius:50%;background:radial-gradient(ellipse,#fff 0 30%,rgba(255,255,255,0) 72%);transform:rotate(-32deg);filter:blur(.6px)}
#intro.gt .gt-hl2{position:absolute;right:20%;bottom:15%;width:12%;height:6%;border-radius:50%;background:rgba(255,255,255,.7);transform:rotate(-32deg);filter:blur(1px)}
#intro.gt .gt-bstar{position:absolute;right:-14%;top:-8%;width:34%;z-index:2;filter:drop-shadow(0 8px 10px rgba(47,120,95,.3));animation:gt-bst 3.6s ease-in-out infinite}
#intro.gt .gt-bstar svg{width:100%;height:auto;display:block}
@keyframes gt-film{to{transform:rotate(360deg)}}
@keyframes gt-bst{0%,100%{transform:rotate(0) scale(1)}50%{transform:rotate(14deg) scale(.86)}}
#intro.gt .gt-glint{position:absolute;width:16px;height:16px;background:radial-gradient(circle,#fff 0 18%,transparent 55%);border-radius:50%;animation:gt-glint 2.6s ease-in-out infinite}
#intro.gt .gt-glint::before,#intro.gt .gt-glint::after{content:'';position:absolute;left:50%;top:50%;background:#fff;border-radius:2px;transform:translate(-50%,-50%)}
#intro.gt .gt-glint::before{width:2px;height:16px}#intro.gt .gt-glint::after{width:16px;height:2px}
#intro.gt .gt-glint.g1{left:28%;top:22%}#intro.gt .gt-glint.g2{left:62%;top:52%;animation-delay:-.9s;transform:scale(.7)}#intro.gt .gt-glint.g3{left:40%;top:70%;animation-delay:-1.7s;transform:scale(.55)}
#intro.gt .gt-halo{position:absolute;left:-40%;top:-40%;width:180%;height:180%;border-radius:50%;background:radial-gradient(circle,rgba(127,215,177,.28),transparent 60%);z-index:-1;animation:gt-halo 4s ease-in-out infinite;pointer-events:none}
@keyframes gt-glint{0%,100%{opacity:0;scale:.4}45%{opacity:1;scale:1}}
@keyframes gt-halo{50%{opacity:.55;transform:scale(.92)}}
#intro.gt .gt-str{width:1px!important;background:linear-gradient(transparent,rgba(20,35,30,.22))!important}
#intro.gt .gt-ball svg.gt-sp{width:20px;height:20px;filter:none;left:128px;top:18px;animation:gt-tw 2.4s -.8s ease-in-out infinite}
@keyframes gt-drop{from{transform:translateY(-420px)}}
@keyframes gt-bob{50%{transform:translateY(8px) rotate(3deg)}}
/* 티켓 */
#intro.gt .gt-tk{position:absolute;left:130px;top:250px;width:1180px;height:420px;border-radius:36px;background:linear-gradient(115deg,rgba(255,255,255,.92),rgba(244,251,247,.86) 55%,rgba(226,245,235,.9));border:1.5px solid #fff;box-shadow:0 30px 70px -24px rgba(20,35,30,.22),0 2px 0 rgba(255,255,255,.9) inset;-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);animation:gt-tk 1.1s .25s cubic-bezier(.2,.9,.25,1) both}
@keyframes gt-tk{from{transform:translateY(80px) scale(.96);opacity:0;filter:blur(8px)}}
#intro.gt .gt-main{position:absolute;left:0;top:0;bottom:0;width:860px}
#intro.gt .gt-tab{position:absolute;left:60px;top:-22px;height:44px;padding:0 22px;border-radius:99px;background:#16201C;color:#fff;display:inline-flex;align-items:center;gap:10px;font:900 14px 'Inter',sans-serif;letter-spacing:.03em;animation:gt-rise .6s .9s both}
#intro.gt .gt-tab i{background:var(--m2)}
#intro.gt .gt-kick{position:absolute;left:62px;top:48px;margin:0;font:800 12.5px 'Inter',sans-serif;letter-spacing:.08em;color:var(--mut)}
#intro.gt .gt-kick em{font-style:normal;margin:0 10px}
#intro.gt .gt-on{position:absolute;right:46px;top:40px;height:34px;padding:0 15px;border-radius:99px;background:#fff;border:1px solid var(--ln);display:inline-flex;align-items:center;gap:8px;font:900 11.5px 'Inter',sans-serif;letter-spacing:.06em}
#intro.gt .gt-on i{background:#F06A6A;box-shadow:0 0 0 3px rgba(240,106,106,.2)}
#intro.gt .gt-vin{position:absolute;left:56px;top:98px;width:196px;height:196px;animation:gt-pop .8s .7s cubic-bezier(.3,1.5,.5,1) both}
#intro.gt .gt-ph{position:absolute;inset:0;border-radius:50%;overflow:hidden;background:linear-gradient(135deg,#E9F8F0,#CBEEDD);border:7px solid #fff;box-shadow:0 14px 28px -10px rgba(20,35,30,.3),0 0 0 1.5px #DCE8E2;display:grid;place-items:center}
#intro.gt .gt-ph > img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;animation:none}
#intro.gt .gt-mono{position:relative;display:flex;align-items:center;justify-content:center}
#intro.gt .gt-mono b{font:900 64px/1 'Pretendard',sans-serif;letter-spacing:-.06em;background:linear-gradient(180deg,#6FD0A6,#3FAE84);-webkit-background-clip:text;background-clip:text;color:transparent}
#intro.gt .gt-mono i{position:absolute;right:-20px;top:-10px;font-style:normal;font-size:20px;color:#16201C;animation:gt-tw 3s ease-in-out infinite}
#intro.gt .gt-ph.own{cursor:pointer}
#intro.gt .gt-up{position:absolute;inset:0;display:grid;place-items:center;background:rgba(20,35,30,.45);color:#fff;font:800 13px 'Pretendard',sans-serif;font-style:normal;opacity:0;transition:opacity .2s;z-index:2}
#intro.gt .gt-ph.own:hover .gt-up{opacity:1}
@keyframes gt-pop{from{transform:scale(.3) rotate(-40deg);opacity:0}}
#intro.gt .gt-bub{position:absolute;left:50%;top:calc(100% + 14px);transform:translateX(-50%);white-space:nowrap;height:42px;padding:0 18px;border-radius:99px;background:#fff;border:2px solid #16201C;box-shadow:0 4px 0 #16201C;display:inline-flex;align-items:center;gap:8px;font:800 14px 'Pretendard',sans-serif;animation:gt-bub .7s 1.5s cubic-bezier(.3,1.6,.5,1) both}
#intro.gt .gt-bub::before{content:'';position:absolute;left:50%;top:-9px;width:13px;height:13px;margin-left:-6.5px;background:#fff;border-left:2px solid #16201C;border-top:2px solid #16201C;transform:rotate(45deg)}
#intro.gt .gt-bub i{width:7px;height:7px;border-radius:50%;background:var(--m)}
@keyframes gt-bub{from{transform:translateX(-50%) scale(.4);opacity:0}}
#intro.gt .gt-tt{position:absolute;left:290px;right:40px;top:132px}
#intro.gt .gt-tt h1{margin:0;font:900 var(--tfs,104px)/1.02 'Pretendard',sans-serif;letter-spacing:-.055em;white-space:nowrap;display:inline-block;padding-right:.04em}
#intro.gt .gt-tt h1 b{background:linear-gradient(180deg,#7ED9B2,#3FAE84);-webkit-background-clip:text;background-clip:text;color:transparent}
#intro.gt .gt-tt h1 b span{background:inherit;-webkit-background-clip:text;background-clip:text}
#intro.gt .gt-tt h1 em{font-style:normal;background:linear-gradient(180deg,#7ED9B2,#3FAE84);-webkit-background-clip:text;background-clip:text;color:transparent}
#intro.gt .gt-tt h1 span{display:inline-block;animation:gt-ch .7s cubic-bezier(.2,1.3,.4,1) both}
#intro.gt .gt-tt h1 em span{background:inherit;-webkit-background-clip:text;background-clip:text}
@keyframes gt-ch{from{transform:translateY(.5em) rotate(6deg);opacity:0}}
#intro.gt .gt-tt p{margin:16px 0 0 4px;display:flex;white-space:nowrap;align-items:center;gap:10px;font:800 17px 'Pretendard',sans-serif;letter-spacing:-.01em;color:#24332D;animation:gt-rise .7s 1.2s both}
#intro.gt .gt-tt p span{color:var(--m);font-size:20px}
#intro.gt .gt-tt code{flex:none;white-space:nowrap;margin-left:6px;height:34px;padding:0 12px;border-radius:7px;background:#16201C;color:#fff;display:inline-flex;align-items:center;font:800 15px 'Pretendard',sans-serif}
#intro.gt .gt-perf{position:absolute;left:860px;top:30px;bottom:30px;border-left:2px dashed #CFDDD6}
#intro.gt .gt-perf::before,#intro.gt .gt-perf::after{content:'';position:absolute;left:-14px;width:26px;height:26px;border-radius:50%;background:#FEFEFE;box-shadow:inset 0 0 0 1.5px #fff}
#intro.gt .gt-perf::before{top:-44px}#intro.gt .gt-perf::after{bottom:-44px}
#intro.gt .gt-stub{position:absolute;left:862px;right:0;top:0;bottom:0;padding:44px 40px 40px 44px;display:flex;flex-direction:column}
#intro.gt .gt-adm{display:flex;justify-content:space-between;align-items:flex-start}
#intro.gt .gt-stub small{font:800 11px 'Inter',sans-serif;letter-spacing:.12em;color:var(--mut)}
#intro.gt .gt-adm strong{font:900 72px/.85 'Pretendard',sans-serif;letter-spacing:-.06em}
#intro.gt .gt-adm strong em{font-style:normal;color:var(--m)}
#intro.gt .gt-lot{display:flex;justify-content:space-between;align-items:baseline;margin-top:14px}
#intro.gt .gt-lot b{font:800 11.5px 'Inter',sans-serif;letter-spacing:.06em}
#intro.gt .gt-meter{margin-top:auto}
#intro.gt .gt-mt{display:flex;align-items:baseline;gap:10px;margin-bottom:8px}
#intro.gt .gx-stat{font:800 10.5px 'Inter',sans-serif;letter-spacing:.12em;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#intro.gt .gx-ml{margin-left:auto;font:700 10.5px 'Inter',sans-serif;color:var(--mut);white-space:nowrap}
#intro.gt .gx-ml em{font-style:normal;font-weight:900;color:var(--m)}
#intro.gt .gx-pct{display:none!important}
#intro.gt .gt-track{height:3px;border-radius:99px;background:#DCEBE4;overflow:hidden}
#intro.gt .gt-track i{display:block;height:100%;width:var(--lp,0%);background:linear-gradient(90deg,#9BE3C3,#3FAE84)}
#intro.gt .gt-bc{display:flex;gap:2px;height:30px;margin:18px 0 22px;overflow:hidden}
#intro.gt .gt-bc i{flex:none;height:100%;background:#16201C;transform-origin:bottom;animation:gt-bar .4s 1s both}
#intro.gt .gt-bc i:nth-child(3n){opacity:.85}
@keyframes gt-bar{from{transform:scaleY(0)}}
#intro.gt .en-hit.gx-enter{position:relative!important;left:auto!important;top:auto!important;width:100%!important;height:70px!important;margin:0!important;padding:0 0 0 0!important;border-radius:99px!important;border:0!important;background:#DDEBE4!important;overflow:hidden;display:flex!important;align-items:center;justify-content:center;gap:10px;color:var(--ink);box-shadow:none;transition:transform .2s,box-shadow .3s}
#intro.gt .gx-fill{position:absolute;left:0;top:0;bottom:0;width:var(--lp,0%);background:linear-gradient(90deg,#B4E9D1,#7FD3AE)}
#intro.gt .gx-bt{position:relative;font:900 22px/1 'Inter',sans-serif;letter-spacing:-.01em;white-space:nowrap}
#intro.gt .gt-arr{position:relative;width:22px;height:22px;display:none}
#intro.gt .gt-arr svg{width:100%;height:100%}
#intro.gt .gt-shine{position:absolute;top:0;bottom:0;left:-40%;width:30%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.55),transparent);opacity:0}
#intro.gt.ready .en-hit.gx-enter{background:linear-gradient(135deg,#5FCC9E,#2F9C74)!important;color:#fff;cursor:pointer;box-shadow:0 16px 30px -8px rgba(47,156,116,.55);animation:gt-rdy .5s cubic-bezier(.3,1.6,.5,1)}
#intro.gt.ready .gx-fill{opacity:0}
#intro.gt.ready .gt-arr{display:block}
#intro.gt.ready .gt-shine{opacity:1;animation:gt-shine 2.6s 1s ease-in-out infinite}
#intro.gt.ready .en-hit.gx-enter:hover{transform:translateY(-2px);box-shadow:0 20px 36px -8px rgba(47,156,116,.6)}
#intro.gt.ready .en-hit.gx-enter:hover .gt-arr{transform:translate(2px,-2px)}
#intro.gt.ready .en-hit.gx-enter:active{transform:scale(.97)}
@keyframes gt-rdy{50%{transform:scale(1.04)}}
@keyframes gt-shine{0%{left:-40%}45%,100%{left:120%}}
/* 아래 줄 */
#intro.gt .gt-foot{position:absolute;left:70px;right:70px;bottom:52px;display:flex;align-items:center;justify-content:space-between;font:800 11.5px 'Inter',sans-serif;letter-spacing:.08em;animation:gt-rise .8s 1.3s both}
#intro.gt .gt-foot > b{height:40px;padding:0 22px;border-radius:99px;background:rgba(255,255,255,.8);display:inline-flex;align-items:center;gap:6px;font:600 13px 'Inter',sans-serif;letter-spacing:0;color:var(--mut)}
#intro.gt .gt-foot > b strong{color:var(--ink);font-weight:900}
#intro.gt .gt-foot .r{display:flex;align-items:center;gap:14px}
#intro.gt .gt-foot .gt-bc.sm{height:20px;margin:0;gap:1.5px}
/* 나갈 때 : 티켓 반쪽이 찢어져 나가요 */
#intro.gt.leaving .gt-stub{animation:gt-tear .8s cubic-bezier(.5,0,.3,1) forwards}
#intro.gt.leaving .gt-main,#intro.gt.leaving .gt-perf{animation:gt-down .8s .15s cubic-bezier(.6,0,.3,1) forwards}
#intro.gt.leaving .gt-tk{background:transparent;border-color:transparent;box-shadow:none;-webkit-backdrop-filter:none;backdrop-filter:none;transition:all .25s}
#intro.gt.leaving .gt-main{background:linear-gradient(115deg,rgba(255,255,255,.92),rgba(244,251,247,.86));border-radius:36px 0 0 36px}
#intro.gt.leaving .gt-stub{background:linear-gradient(115deg,rgba(244,251,247,.9),rgba(226,245,235,.92));border-radius:0 36px 36px 0}
#intro.gt.leaving .gt-ball{animation:gt-up .9s .1s cubic-bezier(.6,0,.3,1) forwards}
#intro.gt.leaving .gt-top,#intro.gt.leaving .gt-foot,#intro.gt.leaving .gt-par{transition:opacity .5s;opacity:0}
@keyframes gt-tear{30%{transform:translate(14px,6px) rotate(4deg)}to{transform:translate(180px,260px) rotate(24deg);opacity:0}}
@keyframes gt-down{to{transform:translateY(80px);opacity:0}}
@keyframes gt-up{to{transform:translateY(-480px)}}
#intro.gt.out{opacity:0;pointer-events:none;transition:opacity .7s ease!important}
#intro .gt-own{position:absolute;left:50%;bottom:18px;transform:translateX(-50%);z-index:20;height:36px;padding:0 16px;border-radius:99px;border:1.5px dashed #8FD9B8;background:rgba(255,255,255,.92);color:#2F9C74;font:800 12px 'Pretendard',sans-serif;cursor:pointer;box-shadow:0 8px 18px -10px rgba(20,35,30,.4)}
.in-fm{z-index:2147483000!important}
/* 잠금 화면 : 배경만 보이고 가운데 비밀번호 칸 */
#intro.gt.locked .gt-stage{display:none!important}
#intro.gt .gt-gate{position:absolute;left:50%;top:50%;width:340px;margin:0;transform:translate(-50%,-50%);padding:34px 30px 26px;border-radius:30px;background:rgba(255,255,255,.72);border:1.5px solid #fff;box-shadow:0 30px 60px -26px rgba(20,35,30,.28);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);display:flex;flex-direction:column;align-items:center;text-align:center;z-index:5;animation:gt-gin .9s .2s cubic-bezier(.2,.9,.25,1) both}
@keyframes gt-gin{from{transform:translate(-50%,-44%) scale(.96);opacity:0;filter:blur(6px)}}
#intro.gt .gt-lock{width:64px;height:64px;border-radius:20px;background:linear-gradient(135deg,#6FD0A6,#3FAE84);color:#16201C;display:grid;place-items:center;box-shadow:0 12px 24px -8px rgba(47,156,116,.55);animation:gt-bob 4s 1.2s ease-in-out infinite}
#intro.gt .gt-lock svg{width:36px;height:36px;overflow:visible}
#intro.gt .gt-lock .sh{transition:transform .45s cubic-bezier(.3,1.6,.5,1);transform-origin:33px 21px}
#intro.gt .gt-gate small{margin-top:18px;font:900 11px 'Inter',sans-serif;letter-spacing:.18em;color:var(--m)}
#intro.gt .gt-gate p{margin:6px 0 18px;font:800 16px 'Pretendard',sans-serif;color:var(--ink)}
#intro.gt .gt-pw{position:relative;display:flex;width:100%;height:54px;border-radius:99px;background:#fff;border:1.5px solid var(--ln);box-shadow:0 4px 12px rgba(20,35,30,.05);transition:border-color .2s,box-shadow .2s}
#intro.gt .gt-pw:focus-within{border-color:#8FD9B8;box-shadow:0 0 0 4px rgba(63,174,132,.14)}
#intro.gt .gt-pw input{flex:1;min-width:0;border:0;outline:0;background:none;padding:0 0 0 22px;font:800 16px 'Inter',sans-serif;letter-spacing:.2em;color:var(--ink)}
#intro.gt .gt-pw input::placeholder{font-size:11px;letter-spacing:.2em;color:#A9B8B2}
#intro.gt .gt-pw button{flex:none;width:44px;height:44px;margin:4px;border:0;border-radius:50%;background:#16201C;color:#fff;display:grid;place-items:center;cursor:pointer;transition:transform .2s}
#intro.gt .gt-pw button:hover{transform:translateX(2px)}
#intro.gt .gt-pw button svg{width:18px;height:18px}
#intro.gt .gt-err{height:16px;margin-top:10px;font:700 12px 'Pretendard',sans-serif;font-style:normal;color:#E0606A}
#intro.gt .gt-gate.no{animation:gt-shake .42s}
#intro.gt .gt-gate.no .gt-pw{border-color:#F2A3A9}
@keyframes gt-shake{20%,60%{transform:translate(calc(-50% - 9px),-50%)}40%,80%{transform:translate(calc(-50% + 9px),-50%)}}
#intro.gt .gt-gate.ok .gt-lock .sh{transform:translateY(-6px) rotate(18deg)}
#intro.gt .gt-gate.ok .gt-lock{animation:gt-rdy .5s}
#intro.gt .gt-gate.bye{transition:opacity .45s,transform .45s;opacity:0;transform:translate(-50%,-56%) scale(.94)}
#intro.gt.m .gt-gate{width:min(340px,calc(100% - 32px))}
/* 휴대폰 · 세로 화면 : 티켓을 세로로 */
#intro.gt.m .gt-stage{position:absolute;inset:0;width:auto;height:auto;transform:none!important;overflow-y:auto;overflow-x:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:84px 16px 70px}
#intro.gt.m .gt-top{position:absolute;left:18px;right:18px;top:18px;height:44px}
#intro.gt.m .gt-est,#intro.gt.m .gt-chips span:nth-child(2){display:none}
#intro.gt.m .gt-stk{height:36px;font-size:13px;padding:0 14px 0 12px}
#intro.gt.m .gt-chips span{height:30px;font-size:9.5px;padding:0 12px}
#intro.gt.m .gt-par.p1{left:14px;top:80px}#intro.gt.m .gt-par.p2{left:auto;right:56px;top:96px}#intro.gt.m .gt-par.p3{left:auto;right:40px;top:auto;bottom:90px}
#intro.gt.m .gt-ball{left:auto;right:16px;top:58px;width:64px;height:64px}
@media (min-width:600px){#intro.gt.m .gt-ball{right:8%;top:62px;width:92px;height:92px}}
#intro.gt.m .gt-tk{position:relative;left:auto;top:auto;width:100%;max-width:440px;height:auto;border-radius:28px;flex:none}
#intro.gt.m .gt-main{position:relative;width:auto;padding:44px 22px 22px;display:flex;flex-direction:column;align-items:center;text-align:center}
#intro.gt.m .gt-tab{left:22px;top:-18px;height:36px;font-size:11.5px;padding:0 16px}
#intro.gt.m .gt-kick{position:static;font-size:10px}
#intro.gt.m .gt-on{display:none}
#intro.gt.m .gt-vin{position:relative;left:auto;top:auto;width:120px;height:120px;margin:18px 0 62px}
#intro.gt.m .gt-ph{border-width:5px}#intro.gt.m .gt-mono b{font-size:40px}#intro.gt.m .gt-mono i{font-size:14px;right:-14px}
#intro.gt.m .gt-bub{height:34px;font-size:12px;padding:0 14px}
#intro.gt.m .gt-tt{position:relative;left:auto;right:auto;top:auto;width:100%}
#intro.gt.m .gt-tt p{justify-content:center;flex-wrap:wrap;font-size:12px;margin:8px 0 0;gap:6px}
#intro.gt.m .gt-tt code{height:26px;font-size:11.5px;margin:0}
#intro.gt.m .gt-perf{position:relative;left:auto;top:auto;bottom:auto;margin:0 22px;border-left:0;border-top:2px dashed #CFDDD6}
#intro.gt.m .gt-perf::before,#intro.gt.m .gt-perf::after{top:-14px;bottom:auto}
#intro.gt.m .gt-perf::before{left:-36px}#intro.gt.m .gt-perf::after{left:auto;right:-36px}
#intro.gt.m .gt-stub{position:relative;left:auto;padding:20px 22px 22px}
#intro.gt.m .gt-adm strong{font-size:44px}
#intro.gt.m .gt-meter{margin-top:16px}
#intro.gt.m .gt-bc{height:22px;margin:14px 0 16px}
#intro.gt.m .en-hit.gx-enter{height:58px!important}
#intro.gt.m .gx-bt{font-size:18px}
#intro.gt.m .gt-foot{position:absolute;left:16px;right:16px;bottom:16px;justify-content:center}
#intro.gt.m .gt-foot > span{display:none}
#intro.gt.m .gt-foot > b{height:32px;font-size:11px;padding:0 16px}
#intro.gt.m.leaving .gt-stub{animation-name:gt-down}
#intro.gt.m.leaving .gt-main,#intro.gt.m.leaving .gt-stub{border-radius:28px}
`;
  document.head.appendChild(css);
  const stage = $('.gt-stage', IN), h1 = $('.gt-tt h1', IN), tt = $('.gt-tt', IN);
  // 1440×900 시안을 화면에 맞게 줄이고 늘려요 · 큰 글씨는 칸에 맞게
  const fitT = () => {
    const m = isMobile(); IN.classList.toggle('m', m);
    if (!m) { const W = IN.clientWidth || innerWidth, H = IN.clientHeight || innerHeight, k = Math.min(W / 1440, H / 900); stage.style.transform = `translate(${(W - 1440 * k) / 2}px,${(H - 900 * k) / 2}px) scale(${k})`; }
    else stage.style.transform = '';
    if (IN.classList.contains('locked')) return;
    h1.style.setProperty('--tfs', '104px'); const W = tt.clientWidth - 8, w = h1.scrollWidth;
    h1.style.setProperty('--tfs', Math.min(m ? 72 : 112, 104 * W / Math.max(1, w)).toFixed(1) + 'px');
  };
  fitT(); addEventListener('resize', fitT); document.fonts && document.fonts.ready.then(fitT); setTimeout(fitT, 400); setTimeout(fitT, 1200);
  // 미러볼이 빙글빙글 (세로줄 너비가 바뀌면서 돌아가 보여요)
  const FC = $('.gt-fc', IN), R0 = 88, ROWS = 9, PAL = ['#FFFFFF', '#E6F7EE', '#CDEFDF', '#B5E6D0', '#F3FBF7', '#DDF3EA', '#FBEFF3', '#FBF5E2'];
  const facets = []; for (let r = 0; r < ROWS; r++) { const la0 = -Math.PI / 2 + r * Math.PI / ROWS, la1 = la0 + Math.PI / ROWS, n = Math.max(4, Math.round(18 * Math.cos((la0 + la1) / 2))); for (let c = 0; c < n; c++) facets.push({ la0, la1, lo0: c * 2 * Math.PI / n, lo1: (c + 1) * 2 * Math.PI / n, col: PAL[(r * 7 + c * 3 + (c * r) % 5) % PAL.length], tw: Math.random() * 6.28 }); }
  const fEls = facets.map(() => { const e = document.createElementNS('http://www.w3.org/2000/svg', 'path'); FC && FC.appendChild(e); return e; });
  const TILT = .32, ct = Math.cos(TILT), st0 = Math.sin(TILT);
  const P3 = (la, lo, rot) => { const x = Math.cos(la) * Math.sin(lo + rot), y = Math.sin(la), z = Math.cos(la) * Math.cos(lo + rot); return [x * R0, (y * ct - z * st0) * R0, y * st0 + z * ct]; };
  const drawBall = (rot, t) => { facets.forEach((f, k) => { const g = .06, pts = [[f.la0 + g * .5, f.lo0 + g * .35], [f.la0 + g * .5, f.lo1 - g * .35], [f.la1 - g * .5, f.lo1 - g * .35], [f.la1 - g * .5, f.lo0 + g * .35]].map(([a, b]) => P3(a, b, rot));
      const z = pts.reduce((s2, p) => s2 + p[2], 0) / 4, e = fEls[k]; if (z <= .02) { e.setAttribute('d', ''); return; }
      e.setAttribute('d', 'M' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L') + 'Z'); e.setAttribute('fill', f.col);
      const shine = Math.max(0, Math.sin(t * 1.3 + f.tw)); e.setAttribute('fill-opacity', (.55 + .45 * z).toFixed(2)); e.style.filter = shine > .97 ? 'brightness(1.12)' : ''; }); };
  const lon = []; let rot = 0, rl = 0;
  const spin = now => { if (!IN.isConnected) return; if (rl) rot += Math.min(.05, (now - rl) / 1000) * .32; rl = now;   // 천천히 (멍하게 보기 좋게)
    lon.forEach((e, k) => { const ph = rot + k * Math.PI * 2 / lon.length, x = Math.sin(ph) * 86, rx = Math.abs(x).toFixed(1);
      e.setAttribute('d', `M0 -86 A${rx} 86 0 0 ${x >= 0 ? 1 : 0} 0 86`); e.classList.toggle('bk', Math.cos(ph) < 0); });
    requestAnimationFrame(spin); };
  requestAnimationFrame(spin);
  // 마우스 따라 살짝 움직이는 배경 (PC)
  const par = [[$('.gt-ball', IN), 14], [$('.gt-par.p1', IN), 22], [$('.gt-par.p2', IN), 18], [$('.gt-par.p3', IN), 26], [$('.gt-out', IN), -10], [$('.gt-rings', IN), 6]];
  IN.addEventListener('pointermove', e => { if (IN.classList.contains('m') || IN.classList.contains('leaving')) return; const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
    par.forEach(([el, k]) => { if (!el) return; el.style.translate = `${(x * k).toFixed(1)}px ${(y * k).toFixed(1)}px`; }); });
  const hit = $('.en-hit', IN), bt = $('.gx-bt', IN), stat = $('.gx-stat', IN), pct = $('.gx-pct', IN), ml = $('.gx-ml em', IN);
  const dur = (I.seconds || 2.6) * 1000; let t0 = 0, done = false, leaving = false;
  function setP(p) {
    const r = p >= 100, n = Math.floor(p);
    IN.style.setProperty('--lp', p + '%'); pct.textContent = n + '%'; ml.textContent = (p / 20).toFixed(1);
    bt.textContent = r ? (K.enter || 'ENTER') : 'LOADING ' + n;
    stat.textContent = r ? STAT[STAT.length - 1] : STAT[Math.min(STAT.length - 2, Math.floor(p / 100 * (STAT.length - 1)))];
    if (r && !IN.classList.contains('ready')) try { SFX.ready && SFX.ready(); } catch (e) {}
    IN.classList.toggle('ready', r); hit.disabled = !r;
  }
  setP(0);
  const begin = () => { fitT(); if (IN.classList.contains('locked')) return; if (t0) return; document.documentElement.classList.remove('fonts-wait'); t0 = performance.now() + 1400; requestAnimationFrame(step); };
  if (document.fonts && document.fonts.load) { Promise.all(['900 40px "Pretendard"', '700 14px "Pretendard"'].map(f => document.fonts.load(f).catch(() => {}))).then(begin); setTimeout(begin, 900); } else begin();
  function step(now) { if (leaving) return; if (now < t0) return requestAnimationFrame(step); const p = Math.max(0, Math.min(100, (now - t0) / dur * 100)); setP(p); if (p < 100) requestAnimationFrame(step); else done = true; }
  // 비밀번호 : 맞으면 자물쇠가 열리고 입장 화면이 나와요 (이 창을 닫기 전까진 다시 안 물어봐요)
  const gate = $('.gt-gate', IN);
  if (gate) { const inp = $('input', gate), err = $('.gt-err', gate);
    setTimeout(() => { try { inp.focus({ preventScroll: true }); } catch (e) {} }, 900);
    inp.addEventListener('input', () => { gate.classList.remove('no'); err.textContent = ''; try { SFX.key(); } catch (e) {} });
    gate.addEventListener('submit', e => { e.preventDefault(); if (gate.classList.contains('ok')) return;
      if (inp.value.trim() !== PW) { gate.classList.remove('no'); void gate.offsetWidth; gate.classList.add('no'); err.textContent = LK.wrong || '비밀번호가 달라요'; inp.select(); try { SFX.wrong(); } catch (e) {} return; }
      try { sessionStorage.setItem('gt-pass', PW); } catch (e) {} try { SFX.unlock(); } catch (e) {} inp.blur();
      gate.classList.add('ok'); setTimeout(() => gate.classList.add('bye'), 520);
      setTimeout(() => { gate.remove(); IN.classList.remove('locked'); fitT(); begin(); setTimeout(fitT, 300); }, 950); }); }
  const php = $('.gt-ph.own', IN);
  php && php.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); if (window.__syePick) window.__syePick(php.dataset.slot); }, true);
  let hv = 0; hit.addEventListener('pointerenter', () => { if (!done || leaving || Date.now() - hv < 400) return; hv = Date.now(); try { SFX.hover(); } catch (e) {} });
  hit.addEventListener('click', () => {
    if (!done || leaving) return; leaving = true; bt.textContent = K.admitted || 'WELCOME';
    try { SFX.tear(); } catch (e) {}
    setTimeout(() => IN.classList.add('leaving'), 160);
    setTimeout(() => { document.body.classList.add('entered'); startToasts(); IN.classList.add('out'); }, 1050);
    setTimeout(() => IN.remove(), 2000);
  });
  // 주인 모드에서 글 · 사진을 저장하고 다시 불러올 땐 입장 화면 없이 바로 메인으로 (고치던 창은 다시 열려요)
  if (OWNER && SYE_FAST) { leaving = true; IN.style.display = 'none'; document.body.classList.add('entered'); IN.classList.add('out'); try { startToasts(); } catch (e) {} setTimeout(() => IN.remove(), 30); }
})();

/* =========================================================
   DESKTOP
   ========================================================= */
const APPS = [
  { id: 'dday', name: 'D-DAY', icon: 'heartpulse', t: 'soft' },
  { id: 'grp-seiran', name: '東京青藍大学', icon: 'school', t: 'lav' },
  { id: 'member', name: 'ARCH', icon: 'sentinel', t: 'teal' },
  { id: 'grp-frontline', name: 'FRONTLINE', icon: 'swords', t: 'rose' },
  { id: 'grp-etc', name: 'ETC.', icon: 'sparkle', t: 'lilac' },
  { id: 'memo', name: 'Memo', icon: 'file', t: 'cream' },
  { id: 'player', name: 'Player', icon: 'music', t: 'ink' },
  { id: 'talk', name: 'TALK', icon: 'chat', t: 'blue', badge: (S.chat.rooms || []).reduce((a, r) => a + (+r.unread || 0), 0) || 4 },
  { id: 'internet', name: 'Internet', icon: 'globe', t: 'blue' },
  { id: 'pedal', name: 'Pedal Board', icon: 'sliders', t: '' },
  { id: 'links', name: 'Link Hub', icon: 'grid4', t: 'mint' },
  { id: 'records', name: 'Records', icon: 'folder', t: 'cream' }
];
// 홈 화면에는 없지만 오른쪽 위 앱 목록(⊞)에서는 열 수 있는 앱
const EXTRA_APPS = [{ id: 'monitor', name: 'Stage Monitor', icon: 'radar', t: 'navy' }];
const EXTRA_T = { gallery: 'blue', letters: 'mint', lockbox: 'ink', setlist: 'soft', camera: 'cream', calendar: 'blue', archive: 'mint', polaroid: 'soft', tickets: 'cream', moonlight: 'navy', about: 'soft', list: 'cream', linked: 'navy' };
let talkBadge = 4;
// 앱 칸 색 (디자인 5가지를 순서대로 돌려 써요)
const TILE_MAP = [0, 4, 1, 0, 3, 2, 1, 4, 0, 1, 3, 2, 0, 4, 1, 3, 2, 0, 4, 1, 2, 3, 0, 4];
const appHTML = (a, i = 0) => `<button class="app app-tile ${a.seen ? 'seen' : ''}" data-open="${a.id}"><span class="app-ic tilebox t-${a.t || ''}">${ic(a.icon)}${a.badge ? `<span class="badge">${a.badge}</span>` : ''}${a.seen ? '<span class="ndot"></span>' : ''}</span>${esc(a.name)}</button>`;
// 6×4 칸 = 원래 앱 12개 + Stage Monitor + Notice + 새 칸 10개 (data.js 의 extraApps)
// SYRINGE 시안 (10×5) 에서 늘어난 칸 아이콘
Object.assign(P, {
  // 10×6 으로 늘어난 칸
  sofa: '<path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/><path d="M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M6 18v2M18 18v2"/>',
  headphones: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
  shirt: '<path d="M8 3l-5 3 2 4 3-1v12h8V9l3 1 2-4-5-3a4 4 0 0 1-8 0z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  lab: '<path d="M9 3h6M10 3v6L4.6 18.4A2 2 0 0 0 6.3 21.5h11.4a2 2 0 0 0 1.7-3.1L14 9V3"/><path d="M7.2 15h9.6"/>',
  ward: '<path d="M3 6v13M3 15h18v4M21 15v-3a3 3 0 0 0-3-3h-7v6"/><circle cx="7" cy="11.5" r="2"/>',
  chart: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3"/>',
  pmonitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4M6 10h3l1.5-2.5 2.5 5 1.5-2.5H18"/>',
  exam: '<path d="M6 3v6a5 5 0 0 0 10 0V3"/><path d="M11 14v2a4 4 0 0 0 8 0v-2"/><circle cx="19" cy="12" r="2"/>',
  thermo: '<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 10v6"/>',
  vaccine: '<path d="M18 3l3 3M16.5 4.5l3 3M18 6l-9 9M15 5l4 4M6 18l-3 3M8 12l4 4M10 10l2 2M7.5 14.5l2 2"/><path d="M13 7l4 4-7 7H6v-4z"/>',
  firstaid: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M12 10.5v6M9 13.5h6"/>',
  ticket: '<path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4z"/><path d="M14 7v2M14 11v2M14 15v2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  map: '<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/>',
  notes: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 3v18M13 8h3M13 12h3"/>',
  wishlist: '<path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 000-7.8z"/>',
  video: '<path d="M7 4l12 8-12 8z"/>',
  xgame: '<rect x="2.5" y="7" width="19" height="11" rx="5"/><path d="M7 11v3M5.5 12.5h3"/><circle cx="15.5" cy="12" r=".8"/><circle cx="17.5" cy="13.8" r=".8"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  weather: '<path d="M17.5 19H8a5 5 0 11.9-9.9A6 6 0 0119 11a4 4 0 01-1.5 8z"/>',
  contacts: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0113 0M16 4.5a3.5 3.5 0 010 7M18.5 14a6 6 0 013 6"/>',
  cloud: '<path d="M16 16l-4-4-4 4M12 12v9"/><path d="M20.4 18.4A5 5 0 0018 9h-1.3A8 8 0 103 16.3"/>',
  alarm: '<circle cx="12" cy="13" r="7"/><path d="M12 10v3l2 2M5 4L3 6M19 4l2 2M7 20l-1.5 1.5M17 20l1.5 1.5"/>',
  wallet: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M16 15h2"/><path d="M5 6l11-3 1 3"/>',
  library: '<path d="M4 4h4v16H4zM10 4h4v16h-4z"/><path d="M15.5 5l3.8-1 3 15.5-3.8 1z"/>',
  stats: '<path d="M4 20V10h4v10M10 20V5h4v15M16 20v-7h4v7M3 20h18"/>',
  scan: '<path d="M3 8V5a2 2 0 012-2h3M16 3h3a2 2 0 012 2v3M21 16v3a2 2 0 01-2 2h-3M8 21H5a2 2 0 01-2-2v-3M7 12h10"/>',
  pharmacy: '<path d="M10.5 20.5l10-10a4.95 4.95 0 00-7-7l-10 10a4.95 4.95 0 007 7z"/><path d="M8.5 8.5l7 7"/>',
  vitals: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
  playlist: '<path d="M4 6h11M4 11h11M4 16h7"/><path d="M17 18.5V9l4-1.5"/><circle cx="15.5" cy="18.5" r="2"/>',
  metronome: '<path d="M9 3h6l4 18H5z"/><path d="M12 15l5-9M8 17h8"/>',
  snapshot: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><rect x="7" y="6" width="10" height="9" rx=".5"/>',
  backstage: '<rect x="5" y="6" width="14" height="15" rx="2"/><path d="M10 3h4v4h-4zM8.5 15h7M8.5 18h4"/><circle cx="12" cy="11" r="1.8"/>',
  tourbus: '<rect x="3" y="5" width="18" height="12" rx="2.5"/><path d="M3 11h18M8 5v6M14 5v6"/><circle cx="7.5" cy="18.5" r="1.6"/><circle cx="16.5" cy="18.5" r="1.6"/>',
  ampli: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="12" cy="13.5" r="4"/><circle cx="12" cy="13.5" r="1.2"/><path d="M6.5 7h.01M9.5 7h.01M17 7h1"/>',
  syplus: '<path d="M12 5v14M5 12h14"/>'
});
const GRID_APPS = APPS.concat(EXTRA_APPS, [{ id: 'notice', name: 'Notice', icon: 'bell', t: 'soft' }],
  (S.extraApps || []).map(x => ({ id: 'x-' + x.id, name: x.name, icon: x.icon || x.id, t: x.color || EXTRA_T[x.id] || 'soft' }))).slice(0, 72);
// D-DAY 바로 옆으로 : Profile · List · Linked · OOC · Prompt (나머지는 한 칸씩 뒤로)
{ const FRONT = ['x-about', 'x-list', 'x-linked', 'x-ooc', 'x-prompt'], mv = FRONT.map(id => GRID_APPS.find(a => a.id === id)).filter(Boolean);
  mv.forEach(a => GRID_APPS.splice(GRID_APPS.indexOf(a), 1)); GRID_APPS.splice(GRID_APPS.findIndex(a => a.id === 'dday') + 1, 0, ...mv); }
$('.apps').innerHTML = GRID_APPS.map((a, i) => appHTML(a, i)).join('');
$('#launcher').innerHTML = `<h6>APPLICATIONS · ${GRID_APPS.length}</h6><div class="lgrid">${GRID_APPS.map((a, i) => appHTML(a, i)).join('')}</div>`;
// 시안 아이콘 창 폴더 모양
$('.apps-panel')?.insertAdjacentHTML('afterbegin', `<svg class="ot-folder" width="880" height="526" viewBox="0 0 880 526"><defs><linearGradient id="fdg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#F3FAFB"/></linearGradient><filter id="fds" x="-10%" y="-10%" width="120%" height="125%"><feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#123B48" flood-opacity="0.06"/></filter></defs><path d="M0 14A14 14 0 0 1 14 0H156A14 14 0 0 1 170 14V20A14 14 0 0 0 184 34H864A16 16 0 0 1 880 50V510A16 16 0 0 1 864 526H16A16 16 0 0 1 0 510Z" fill="url(#fdg)" stroke="#CFE6EA" stroke-width="1.2" filter="url(#fds)"/></svg>`);
// 시안 아이콘 칸 색 (자리 순서대로)
const OT_MAP = [0, 4, 1, 0, 3, 2, 1, 4, 0, 1, 3, 2, 0, 4, 1, 3, 2, 0, 4, 1, 2, 3, 0, 4, 1, 3, 0, 2, 4, 0, 4, 1];
$$('.apps-panel .apps .app-ic.tilebox').forEach((t, i) => t.classList.add('os' + OT_MAP[i % OT_MAP.length]));
function markSeen(id) {
  $$(`.app[data-open="${id}"]`).forEach(a => { a.classList.add('seen'); const i = $('.app-ic', a); if (!$('.ndot', i)) i.insertAdjacentHTML('beforeend', '<span class="ndot"></span>'); });
}
function setBadge(n) { $$('.app[data-open=talk] .app-ic').forEach(i => { let b = $('.badge', i); if (!b) { i.insertAdjacentHTML('beforeend', '<span class="badge"></span>'); b = $('.badge', i); } b.textContent = n; }); }

$('.bticks') && (() => { let t = ''; for (let i = 0; i < 60; i++) { const a = i * 6 * Math.PI / 180, lg = i % 5 === 0; if (i % 7 === 3) continue; t += `<line x1="${(Math.cos(a) * 90).toFixed(1)}" y1="${(Math.sin(a) * 90).toFixed(1)}" x2="${(Math.cos(a) * (lg ? 100 : 95)).toFixed(1)}" y2="${(Math.sin(a) * (lg ? 100 : 95)).toFixed(1)}"/>`; } $('.bticks').innerHTML = t; })();

const DOW = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
function tick() {
  const d = new Date(); $('.clock').textContent = `${MON[d.getMonth()]} ${d.getDate()} · ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  const HT = S.heroTicket; if (!HT || !$('.ht-info')) return;
  const cells = [['DATE', `${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${DOW[d.getDay()]}`], ['DOORS', `${pad(d.getHours())}:${pad(d.getMinutes())}`], ...(HT.info || [])];
  $('.ht-info').innerHTML = cells.map(([k, v]) => `<div><small>${esc(k)}</small><b>${esc(v)}</b></div>`).join('');
}
(function home() {
  const H = S.home || {}, HT = S.heroTicket || {};
  const D = v => String(v ?? '').replace('{d}', dnum);
  $('.hk-a').textContent = H.kicker || ''; $('.hk-b').textContent = H.vol || '';
  // 메인 큰 젤리 글씨 + NOW PLAYING 카드
  // 메인 큰 글씨 (UNRELEASED.)
  $('.ho-title').innerHTML = `<div class="st-big"><span>${titleHTML(H.word || 'UNRELEASED')}<i>.</i></span></div>`;
  const hz = () => { const t = $('.ho-title'); if (isMobile()) t.style.setProperty('zoom', ((innerWidth - 40) / 880).toFixed(3), 'important'); else t.style.removeProperty('zoom'); }; hz(); addEventListener('resize', hz);
  // 휴대폰: NOW PLAYING 버튼을 누르면 카드가 열려요
  $('.ho-np').insertAdjacentHTML('beforebegin', `<div class="ho-npb-row"><button class="ho-npb"><i></i><span>${esc((H.nowPlaying || {}).title || 'NOW PLAYING')} ♪</span></button></div>`);
  $('.ho-npb').addEventListener('click', e => { e.stopPropagation(); const o = $('.h-otr').classList.toggle('np-open'); $('.ho-npb span').textContent = o ? 'CLOSE  ✕' : `${(H.nowPlaying || {}).title || 'NOW PLAYING'} ♪`; });
  const NP = H.nowPlaying || {};
  $('.ho-np').innerHTML = `<div class="np-h"><b>${esc(NP.title || 'NOW PLAYING')}</b><i></i></div>
    <div class="np-m"><div class="np-disc"><span class="np-shine"></span><span class="np-core"></span></div>
    <div class="np-list">${(NP.list || []).map((t, i) => `<div class="${i + 1 === NP.on ? 'on' : ''}"><b>${pad(i + 1)}</b>${esc(t)}</div>`).join('')}</div></div>
    <div class="np-bar"><span></span></div><div class="np-time"><span>${esc((NP.time || [])[0] || '')}</span><span>${esc((NP.time || [])[1] || '')}</span></div>`;
  // SOUNDCHECK ONLINE : 첫 단어만 굵게
  $$('.top-r .pill [data-bind="online"]').forEach(el => { const t = el.textContent, k = t.indexOf(' '); if (k > 0) el.innerHTML = `<b>${esc(t.slice(0, k))}</b>${esc(t.slice(k))}`; });
  // 큰 SETLIST (위 절반은 꽉 찬 글자, 아래 절반은 테두리 글자 + 가위가 점선을 따라 오가요)
  drawTitle();
})();
// 세로로 긴 창: 남는 높이만큼 SETLIST 글자를 키우고(최대 2배), 그래도 남으면 왼쪽 묶음을 가운데로
function layoutTall() {
  const desk = $('#desk'); if (!desk || isMobile()) return;
  if (syOn()) return syLayout();   // SYRINGE 시안 배치
  // 시안(1440×900) 구도 그대로 : 왼쪽 묶음(큰 글씨 + 아이콘 창) 880×766 · 가운데 열쇠 · 오른쪽 출입증
  // 가로로 넓은 창 → 구도는 그대로 가운데에 (양옆은 배경) / 세로로 긴 창 → 왼쪽 묶음이 같이 커져요
  const W = innerWidth / Z / SX, stageH = innerHeight / Z - 104, c = passZoom(), pz = .877 * c * passWide(), pw = 308 * pz;
  const ox = 0, passL = W - 24 - pw;
  const P = (n, v) => desk.style.setProperty(n, v);
  const fold = (w, h = 526) => { const fo = desk.querySelector('.ot-folder'); if (!fo || (+fo.getAttribute('width') === w && +fo.getAttribute('height') === h)) return; fo.setAttribute('width', w); fo.setAttribute('height', h); fo.setAttribute('viewBox', `0 0 ${w} ${h}`); fo.querySelector('path').setAttribute('d', `M0 14A14 14 0 0 1 14 0H156A14 14 0 0 1 170 14V20A14 14 0 0 0 184 34H${w - 16}A16 16 0 0 1 ${w} 50V${h - 16}A16 16 0 0 1 ${w - 16} ${h}H16A16 16 0 0 1 0 ${h - 16}Z`); };
  {   // 모든 PC 화면 같은 구도(보내준 사진): 왼쪽 큰 글씨+아이콘 탭 · 오른쪽 출입증 · 열쇠는 출입증 아래 — 왼쪽 묶음이 출입증 앞까지, 열쇠는 출입증 아래
    P('--ox', '0px');
    const k = Math.max(1, Math.min(stageH / 796, (passL - 52) / 880, 1.25));   // 세로로 긴 창: 왼쪽 묶음 전체를 같이 키움
    const H = stageH / k, lw = (passL - 52) / k, apw = lw - 22, pv = 24;
    let aph = Math.max(492, H - 12 - 203), inner = aph - 2 * pv;
    const ts = Math.max(1, Math.min(1.3, (apw - 36) / 8 * .63 / 67, ((inner - 3 * 18) / 4 - 6) / 80));
    let rg = Math.max(18, (inner - 4 * (80 * ts + 6)) / 3), extra = 0;
    // 세로로 긴 창도 왼쪽 묶음 전체가 같이 커져서(k) PC 화면과 같은 비율로 보여요 (큰 글씨를 세로로 늘리지 않음)
    const tsy = 1 + Math.min(.3, extra / 180), G = 180 * (tsy - 1), apt = 203 + G, top = 6 + (extra - G) / 2;   // 남는 높이는 큰 글씨가 세로로 받고, 그래도 남으면 위아래로 나눠요
    P('--lw', lw.toFixed(1) + 'px'); P('--tsx', (lw / 880).toFixed(4)); P('--tsy', tsy.toFixed(4)); P('--ts', ts.toFixed(4)); P('--rg', rg.toFixed(1) + 'px');
    const stb = desk.querySelector('.st-big'), sbw = stb && stb.firstElementChild ? stb.firstElementChild.offsetWidth : 0;
    if (stb) {
      const sx = (sbw > 300 ? lw * .9285 / sbw : lw / 880).toFixed(4);
      // 글자 모양(위·아래 끝)을 실제 글꼴로 재서, 어느 기기에서든 위 줄 아래 ~ 아이콘 탭 위 사이에 딱 맞게 (아이콘 탭과 살짝 띄움)
      let m = null; try { if (!document.fonts || document.fonts.check("900 110px 'Pretendard'")) { const cx = (TITLE_CV || (TITLE_CV = document.createElement('canvas').getContext('2d'))); cx.font = "900 110px 'Pretendard'"; m = cx.measureText(stb.textContent || 'UNRELEASED.'); } } catch (e) {}
      const L = 102.3;   // 110px × .93
      if (m && m.fontBoundingBoxAscent && m.actualBoundingBoxAscent) {
        // 패드 사파리는 글씨를 몰래 더 크게 그려요 → 실제 폭 ÷ 원래 폭(f)만큼 위아래도 커진 걸로 보고 계산
        const n = (stb.textContent || '').length, w0 = m.width - .04 * 110 * n, f = sbw > 300 && w0 > 300 ? Math.max(.8, Math.min(1.6, sbw / w0)) : 1;
        const b = f * ((L - (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent)) / 2 + m.fontBoundingBoxAscent), g0 = b - f * m.actualBoundingBoxAscent, g1 = b + f * m.actualBoundingBoxDescent, c = f * L / 2;
        const Tt = 5.2, Tb = apt - 34 - 24.8, sy = (Tb - Tt) / (g1 - g0), y = Tt - c - (g0 - c) * sy;
        stb.style.top = y.toFixed(1) + 'px'; stb.style.transform = `scale(${sx},${sy.toFixed(4)})`;
      } else { stb.style.top = ''; stb.style.transform = `scale(${sx},${(1.76 * tsy).toFixed(4)})`; }
    }
    P('--apt', apt.toFixed(1) + 'px'); P('--aph', aph.toFixed(1) + 'px'); P('--pv', pv + 'px'); P('--lh', (apt + aph).toFixed(1) + 'px'); fold(Math.round(apw), Math.round(aph + 34)); P('--apw', apw.toFixed(1) + 'px');
    P('--tdy', ((apt - 34) / 2 - 125.5).toFixed(1) + 'px');   // 큰 글씨: 위 줄 가까이 올리고, 아이콘 탭과는 적당히 띄워요
    P('--lcs', k.toFixed(4)); P('--lct', top.toFixed(1) + 'px');
    const pBot = 14 + 470 * pz, avail = stageH - pBot, s2 = Math.max(.46, Math.min(1.3, avail / 400, pw / (DUO_W || 540)));
    P('--s2', s2.toFixed(4)); P('--kx', (passL + pw / 2 - 103 * s2).toFixed(1) + 'px'); P('--ktop', (pBot + avail / 2 - 351 * s2 + 2).toFixed(1) + 'px');
    desk.dataset.stack = '1'; drawTitle(); return;
  }
  P('--lw', '880px'); P('--tsx', '1'); P('--ts', '1'); ['--rg', '--apt', '--aph', '--pv', '--lh', '--apw', '--tdy'].forEach(n => desk.style.removeProperty(n)); fold(880);
  P('--ox', ox.toFixed(1) + 'px');
  const kV = stageH / 796, kMid = (passL - ox - 24 - 24 - 210 * .8) / 880;
  let k = 1, stack = false;
  if (kV > 1) {
    if (kV <= kMid) k = kV;
    else { const kS = Math.min(kV, (passL - ox - 48) / 880); if (kS > kMid + .04) { k = kS; stack = true; } else k = Math.max(1, kMid); }
  }
  const top = Math.max(4, (stageH - 766 * k) / 2), leftEnd = ox + 24 + 880 * k;
  P('--lcs', k.toFixed(4)); P('--lct', top.toFixed(1) + 'px');
  let s2, kx, ktop;
  if (!stack) {
    const room = passL - leftEnd;
    s2 = Math.max(.7, Math.min(1.3, Math.max(1, kV), (room - 24) / 210));
    kx = (leftEnd + passL) / 2 - 129 * s2; ktop = stageH / 2 - 351 * s2;
  } else {
    const pBot = 14 + 470 * pz, avail = stageH - pBot;
    s2 = Math.max(.5, Math.min(1.3, avail / 720, (W - 24 - leftEnd - 12) / 210));
    kx = passL + pw / 2 - 103 * s2; ktop = pBot + avail / 2 - 351 * s2;
  }
  P('--s2', s2.toFixed(4)); P('--kx', kx.toFixed(1) + 'px'); P('--ktop', ktop.toFixed(1) + 'px');
  desk.dataset.stack = stack ? '1' : '';
  drawTitle();
}
function drawTitle() {
  const svg = $('.h-svg'); if (!svg) return;
  const word = esc(`${S.title.before}I${S.title.after}`);
  svg.innerHTML = `<text x="0" y="104" textLength="330" lengthAdjust="spacingAndGlyphs" class="hn-word" transform="scale(1 .82)" style="transform-origin:0 0">${word}</text>`;
}
(function note() {
  const N = (S.home || {}).note || {};
  $('.hn-kick').textContent = N.kicker || '';
  $('.hn-list').innerHTML = (N.list || []).map(([n, t, on]) => `<li class="${on ? 'on' : ''}"><i>${on ? '✓' : ''}</i><b>${esc(n)}</b>${esc(t)}</li>`).join('');
  const st = N.sticky || [];
  $('.hn-sticky small').textContent = st[0] || ''; $('.hn-sticky b').innerHTML = esc(st[1] || '').replace(/\n|\\n/g, '<br>');
  $('.hn-sticky span').innerHTML = `${esc(st[2] || '')}<em>${ic('moon')}</em>`;
  $('.hn-dust').innerHTML = dust([[600, 26, 12, '#22B5A0', '4s'], [608, 214, 9, '#31ACBD', '5s'], [6, 228, 8, '#A5E6EF', '4.6s']]);
})();
(function homeRest() {
  const H = S.home || {}, D = v => String(v ?? '').replace('{d}', dnum);
  // 별 가랜드
  const GX = [[11,5,14,'#31ACBD','3s'],[50,16,9,'#22B5A0','3.6s'],[86,18,11,'#A5E6EF','4.2s'],[122,7,14,'#31ACBD','4.8s'],[162,6,9,'#22B5A0','3s'],[198,14,11,'#A5E6EF','3.6s'],[233,17,14,'#31ACBD','4.2s'],[272,12,9,'#22B5A0','4.8s'],[308,4,11,'#A5E6EF','3s'],[344,9,14,'#31ACBD','3.6s'],[384,20,9,'#22B5A0','4.2s'],[420,14,11,'#A5E6EF','4.8s'],[455,4,14,'#31ACBD','3s'],[494,8,9,'#22B5A0','3.6s'],[530,16,11,'#A5E6EF','4.2s'],[566,15,14,'#31ACBD','4.8s'],[606,8,9,'#22B5A0','3s']];
  $('.h-garland').innerHTML = `<div class="hz"><svg class="hg-line" width="632" height="28" viewBox="0 0 632 28" fill="none"><path d="M0 6 Q 79 20 158 6 T 316 6 T 474 6 T 632 6"/></svg>${dust(GX)}</div>`;
  // 가운데 열쇠
  $('.ks-t').textContent = H.keyTitle || ''; $('.ks-s').textContent = D(H.keySub);
  $('.ks-dust').innerHTML = dust([[40,90,12,'#31ACBD','4s'],[430,120,10,'#22B5A0','5s'],[40,560,12,'#22B5A0','6s'],[430,580,12,'#31ACBD','4.5s'],[230,70,8,'#22B5A0','5.5s'],[30,330,9,'#31ACBD','7s'],[450,330,9,'#22B5A0','6.5s'],[120,640,8,'#31ACBD','5s'],[370,650,9,'#22B5A0','4.2s'],[120,150,8,'#31ACBD','6.8s']].map(([x, ...r]) => [Math.round(x * .78), ...r]));
  const MK = isMobile();   // 휴대폰 시안: 열쇠 CX 244 · CY 380 · 높이 640, 궤도 222/178/136
  buildDuo($('.ks-3d'));
  // 아래 바 D-DAY 알약 (모서리 + 표시는 없앴어요)
  $('.tb-r').insertAdjacentHTML('beforeend', `<button class="st-dd" data-open="dday">♥ D+${dnum}</button>`);

  fillIcons($('.stage'));
})();
tick(); setInterval(tick, 10000);

try { if (localStorage.getItem('setlist-dark') === '1') document.body.classList.add('dark'); } catch (e) {}
$('.theme-btn').onclick = () => { const on = document.body.classList.toggle('dark'); try { localStorage.setItem('setlist-dark', on ? '1' : '0'); } catch (e) {} };

/* ---------- 악기 스택 디자인 (style.css가 예전 버전이어도 항상 같게 보이도록) ---------- */
(function(){const st=document.createElement('style');st.textContent=`/* ---------- 악기 스택 (넓은 화면 가운데) ---------- */
body.wide .blueprint.stack{pointer-events:auto}
.st-frame{position:absolute;inset:0}
.st-frame .c{position:absolute;width:26px;height:26px;border:1.5px solid var(--blue);opacity:.7}
.st-frame .c.k-tl{left:0;top:0;border-right:0;border-bottom:0}.st-frame .c.k-tr{right:0;top:0;border-left:0;border-bottom:0}
.st-frame .c.k-bl{left:0;bottom:0;border-right:0;border-top:0}.st-frame .c.k-br{right:0;bottom:0;border-left:0;border-top:0}
.st-cap{position:absolute;font:700 6.5px var(--mono);letter-spacing:.24em;color:var(--blue2);line-height:1.8}
.st-cap b{display:block;font-weight:800;font-size:7px}
.st-cap small{display:block;color:var(--ink3);font-size:6px}
.st-cap.cap-tl{left:16px;top:12px}.st-cap.cap-bl{left:16px;bottom:10px}.st-cap.cap-br{right:16px;bottom:10px;text-align:right}
.st-dots{position:absolute;right:-2px;top:50%;display:flex;flex-direction:column;gap:6px;transform:translateY(-50%)}
.st-dots i{width:6px;height:6px;border-radius:50%;border:1px solid var(--blue);opacity:.7}
.st-dots i.on{background:var(--blue)}
.st-item{position:absolute;transform:translate(-50%,-50%) rotate(var(--r));transition:transform .35s cubic-bezier(.3,1.4,.5,1),filter .3s;cursor:pointer}
.st-item img{width:100%;display:block;user-select:none}
.st-item.on{transform:translate(-50%,-52%) rotate(var(--r)) scale(1.05);filter:drop-shadow(0 8px 12px rgba(51,172,188,.22));z-index:20!important}
body.dark .st-item img{filter:brightness(.92) saturate(1.1)}
.st-spec{position:absolute;width:118px;transform:translateY(-6px);opacity:0;transition:opacity .25s,transform .25s;pointer-events:none;z-index:30;font:600 6.5px var(--mono);letter-spacing:.16em;color:var(--ink2)}
.st-spec.R{right:0}.st-spec.L{left:0}
.st-spec.on{opacity:1;transform:none}
.st-spec b{display:block;font:800 9px var(--mono);letter-spacing:.2em;color:var(--blue2);padding-bottom:4px;border-bottom:1px solid var(--blue);margin-bottom:4px}
.st-spec small{display:block;color:var(--ink3);margin-bottom:3px;font-size:6px}
.st-spec div{display:flex;justify-content:space-between;padding:2.5px 0;border-bottom:1px solid var(--line)}
.st-spec div span:first-child{color:var(--ink3)}
.st-spec{background:color-mix(in srgb,var(--bg) 85%,transparent);padding:6px 8px;border-radius:6px}
.st-note{position:absolute;transform:rotate(var(--r));font:italic 400 13px/1.15 'Snell Roundhand','Segoe Script','Bradley Hand',cursive;color:var(--blue);opacity:.75;pointer-events:none;white-space:nowrap}
`;document.head.appendChild(st);})();
/* ---------- 악기 그림 데이터 (img 폴더 없이 코드 안에 내장) ---------- */
const ART = {};   // (내장 그림 없음 · 악기 그림을 쓰려면 data.js 의 src 에 이미지 주소를 넣어요)
/* ---------- 넓은 화면 전용: 도면 + SPEC SHEET ---------- */
// 도면 스타일 (style.css 버전과 상관없이 항상 같은 모양으로 보이도록 여기에 같이 넣어둠)
const BP_CSS = `.blueprint,.spec{display:none}
body.wide .blueprint{display:block;position:absolute;left:calc(56.1% + 22px);right:362px;top:24px;bottom:84px;pointer-events:none}
.blueprint svg{width:100%;height:100%;overflow:visible}
.bp-line{fill:none;stroke:var(--blue,#35C4D8);stroke-width:1.6;stroke-linejoin:round}
.bp-fret line{stroke:var(--blue,#35C4D8);stroke-width:.8;opacity:.6}
.bp-str{stroke:var(--blue,#35C4D8);stroke-width:.6;opacity:.45}
.bp-body{fill:#e3f8f0;opacity:.95}
body.dark .bp-body{fill:rgba(95,224,181,.18)}
.bp-pu{fill:none;stroke:var(--blue,#35C4D8);stroke-width:1.4}
.bp-dim{stroke:var(--blue,#35C4D8);stroke-width:.8;opacity:.6}
.bp-arrow{fill:none;stroke:var(--blue,#35C4D8);stroke-width:.8;opacity:.6}
.bp-dimt{fill:var(--ink3,#9DB7BA);font:600 10px var(--mono,'Space Grotesk',Arial,sans-serif);letter-spacing:.24em}
.bp-detail{fill:none;stroke:var(--blue,#35C4D8);stroke-width:.8;opacity:.6}
.bp-node{fill:#fff;stroke:var(--blue,#35C4D8);stroke-width:1.4}
.bp-lead{fill:none;stroke:var(--blue,#35C4D8);stroke-width:.8;opacity:.7}
.bp-lab circle{fill:none;stroke:var(--blue,#35C4D8);stroke-width:1.2}
.bp-lab .t{fill:var(--blue2,#28A9BB);font:800 14px var(--mono,'Space Grotesk',Arial,sans-serif);letter-spacing:.16em}
.bp-lab .s{fill:var(--ink3,#9DB7BA);font:600 9.5px var(--mono,'Space Grotesk',Arial,sans-serif);letter-spacing:.16em}
.bp-neck{fill:#F5FDFE;stroke:var(--blue,#35C4D8);stroke-width:1.5}
.bp-head{fill:#F5FDFE;stroke:var(--blue,#35C4D8);stroke-width:1.6}
body.dark .bp-neck,body.dark .bp-head,body.dark .bp-guard{fill:rgba(255,255,255,.06)}
.bp-guard{fill:#fff;stroke:var(--blue,#35C4D8);stroke-width:1.2;stroke-dasharray:0}
.bp-key{fill:#fff;stroke:var(--blue,#35C4D8);stroke-width:1.3}
.bp-thin{stroke:var(--blue,#35C4D8);stroke-width:1}
.bp-hole{fill:#fff;stroke:var(--blue,#35C4D8);stroke-width:1.2}
.bp-knob{fill:#fff;stroke:var(--blue,#35C4D8);stroke-width:1.4}
.bp-pole{fill:var(--blue,#35C4D8)}
.bp-pu{fill:#E9F7F9;stroke:var(--blue,#35C4D8);stroke-width:1.4}
.bp-bridge{fill:#fff;stroke:var(--blue,#35C4D8);stroke-width:1.4}
.bp-saddle{fill:#DEF2F5;stroke:var(--blue,#35C4D8);stroke-width:.9}
.bp-mark circle{fill:var(--blue,#35C4D8);opacity:.55}
.bp-str line{stroke:var(--blue,#35C4D8);stroke-width:.7;opacity:.55}
.bp-fret line{stroke:var(--blue,#35C4D8);stroke-width:.9;opacity:.65}
.bp-lab .t{font-size:12px!important}
.bp-lab .s{font-size:8px!important}
body.wide .blueprint{pointer-events:none}
.blueprint .g-part{pointer-events:visiblePainted;cursor:pointer}
.g-part *{transition:stroke .2s,fill .2s,stroke-width .2s}
.bp-w{fill:#F5FDFE;stroke:var(--blue,#35C4D8);stroke-width:1.6;stroke-linejoin:round}
body.dark .bp-w{fill:rgba(255,255,255,.05)}
.bp-mesh line{stroke:var(--blue,#35C4D8);stroke-width:.7;opacity:.45}
.bp-tick line{stroke:var(--blue,#35C4D8);stroke-width:1;opacity:.7}
.bp-mint{fill:var(--mint,#5fe0b5);stroke:var(--blue,#35C4D8);stroke-width:1}
.bp-pin{fill:#fff;stroke:var(--blue,#35C4D8);stroke-width:1.3}
.bp-cable{fill:none;stroke:var(--blue,#35C4D8);stroke-width:9;stroke-linecap:round}
.bp-cable2{fill:none;stroke:#F5FDFE;stroke-width:6;stroke-linecap:round}
body.dark .bp-cable2{stroke:#152327}
.bp-dimg line{stroke:var(--blue,#35C4D8);stroke-width:.9;opacity:.6}
.bp-dimg text{fill:var(--ink3,#9DB7BA);font:600 8px var(--mono,'Space Grotesk',Arial,sans-serif);letter-spacing:.24em}
.g-part.on .bp-line,.g-part.on .bp-w{stroke:var(--mint2,#2fbf8f);stroke-width:2.4}
.g-part.on .bp-body,.g-part.on .bp-w{fill:#d6f6ea}
.g-part.on .bp-cable{stroke:var(--mint2,#2fbf8f)}
.g-lab{opacity:0;transition:opacity .2s;pointer-events:none}
.g-lab.on{opacity:1}
.g-lab line{stroke:var(--blue,#35C4D8);stroke-width:1.1;stroke-dasharray:3 3}
.g-lab .g-pin{fill:#fff;stroke:var(--blue,#35C4D8);stroke-width:2}
.g-lab rect{fill:var(--card,#fff);stroke:var(--line,#E3EFF0);filter:drop-shadow(0 6px 10px rgba(34,78,92,.15))}
.g-lab .t{fill:var(--blue2,#28A9BB);font:800 10px var(--mono,'Space Grotesk',Arial,sans-serif);letter-spacing:.14em}
.g-lab .s{fill:var(--ink3,#9DB7BA);font:600 7px var(--mono,'Space Grotesk',Arial,sans-serif);letter-spacing:.12em}
.bp-img{width:100%;height:100%;object-fit:contain;transform:rotate(10deg)}
.bp-body{fill:#e3f8f0}.bp-line{fill:none;stroke:var(--blue,#35C4D8);stroke-width:1.6;stroke-linejoin:round}.bp-thin{stroke:var(--blue,#35C4D8);stroke-width:1;fill:none}.bp-detail{fill:none;stroke:var(--blue,#35C4D8);stroke-width:.8;opacity:.6}.bp-dimt{fill:var(--ink3,#9DB7BA);font:600 10px var(--mono,Arial);letter-spacing:.24em}`;
(function blueprint() {
  const B = S.blueprint; if (!B) return;
  const L = B.labels;
  const bp = $('.blueprint');
  // 직접 넣은 이미지가 있으면 그걸 기울여서 표시
  if (SRC(B.image)) { bp.innerHTML = `<img class="bp-img" src="${esc(SRC(B.image))}" alt="">`; }
  else if (B.stack && B.stack.length) {
    // ---- 악기 스택 (내 도안 이미지들을 사선으로 쌓기) ----
    // 각 항목: x, y = 가운데 기준 위치(%), w = 너비(%), r = 기울기(°), side = 설명 위치
    bp.classList.add('stack');
    bp.innerHTML = `<div class="st-frame"><i class="c k-tl"></i><i class="c k-tr"></i><i class="c k-bl"></i><i class="c k-br"></i>
      <div class="st-cap cap-tl"><b>${esc(B.capTop?.[0] || '')}</b><small>${esc(B.capTop?.[1] || '')}</small></div>
      <div class="st-cap cap-bl"><b>${esc(B.capBottom?.[0] || '')}</b><small>${esc(B.capBottom?.[1] || '')}</small></div>
      <div class="st-cap cap-br"><small>${esc(B.capRight?.[0] || '')}</small><small>${esc(B.capRight?.[1] || '')}</small></div>
      <div class="st-dots"><i></i><i></i><i></i><i class="on"></i></div>
      ${B.stack.map((it, i) => `<div class="st-item" data-k="${i}" style="left:${it.x}%;top:${it.y}%;width:${it.w}%;--r:${it.r || 0}deg;z-index:${it.z || i + 1}">
        <img src="${ART[it.src] || esc(it.src)}" alt="${esc(it.name)}" draggable="false"></div>`).join('')}
      ${B.stack.map((it, i) => `<div class="st-spec ${it.side === 'L' ? 'L' : 'R'}" data-k="${i}" style="top:${it.labelY ?? it.y}%">
        <b>${pad(i + 1)}. ${esc(it.name)}</b><small>${esc(it.model || '')}</small>
        ${(it.rows || []).map(([k, v]) => `<div><span>${esc(k)}</span><span>${esc(v)}</span></div>`).join('')}</div>`).join('')}
      ${(B.notes || []).map(n => `<div class="st-note" style="left:${n.x}%;top:${n.y}%;--r:${n.r || 0}deg">${esc(n.text).replace(/\n/g, '<br>')}</div>`).join('')}
    </div>`;
    $$('.st-item', bp).forEach(el => {
      const k = el.dataset.k, sp = bp.querySelector(`.st-spec[data-k="${k}"]`);
      el.addEventListener('mouseenter', () => { el.classList.add('on'); sp?.classList.add('on'); });
      el.addEventListener('mouseleave', () => { el.classList.remove('on'); sp?.classList.remove('on'); });
    });
  }
  else {
  // ---- 클로버 열쇠 도면 (세로로 그린 뒤 12° 기울임) ----
  const KP = KEY_KP;
  const KCSS = `.kw{fill:#F5FDFE;stroke:#35C4D8;stroke-width:1.6;stroke-linejoin:round}.km{fill:#e3f8f0}.kln{fill:none;stroke:#35C4D8;stroke-width:1.7;stroke-linejoin:round;stroke-linecap:round}.kth{fill:none;stroke:#35C4D8;stroke-width:1;opacity:.75;stroke-linecap:round}.kcut{fill:#fff;stroke:#35C4D8;stroke-width:1.3}
    .g-part{transition:filter .2s}.g-part.on .kw,.g-part.on .kln,.g-part.on .kcut{stroke:#2fbf8f;stroke-width:2.2}.g-part.on .km,.g-part.on .kw{fill:#d6f6ea}`;
  const DEG = 12, CX = 172, CY = 470, MID = 230, A = DEG * Math.PI / 180;
  const T = (x, y) => { const ry = y - MID; return [CX + x * Math.cos(A) - ry * Math.sin(A), CY + x * Math.sin(A) + ry * Math.cos(A)]; };
  const anchors = [[0, -150], [0, 114], [0, 215], [70, 500]];
  const labs = L.map((l, i) => {
    if (!anchors[i]) return '';
    const [x, y] = T(...anchors[i]); const right = i !== 1; const w = 128;
    const lx = right ? x + 34 : x - 34 - w, ly = y - 18;
    return `<g class="g-lab" data-k="${i}"><line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(right ? lx : lx + w).toFixed(1)}" y2="${(ly + 18).toFixed(1)}"/><circle class="g-pin" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4"/>
      <rect x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" width="${w}" height="36" rx="8"/><text x="${(lx + 10).toFixed(1)}" y="${(ly + 16).toFixed(1)}" class="t">${esc(l[0])}</text><text x="${(lx + 10).toFixed(1)}" y="${(ly + 28).toFixed(1)}" class="s">${esc(l[1])}</text></g>`; }).join('');
  bp.classList.remove('stack');
  bp.innerHTML = `<div class="st-frame"><i class="c k-tl"></i><i class="c k-tr"></i><i class="c k-bl"></i><i class="c k-br"></i>
      <div class="st-cap cap-tl"><b>${esc(B.capTop?.[0] || '')}</b><small>${esc(B.capTop?.[1] || '')}</small></div>
      <div class="st-cap cap-bl"><b>${esc(B.capBottom?.[0] || '')}</b><small>${esc(B.capBottom?.[1] || '')}</small></div>
      <div class="st-cap cap-br"><small>${esc(B.capRight?.[0] || '')}</small><small>${esc(B.capRight?.[1] || '')}</small></div></div>
    <svg class="key-svg" viewBox="40 110 290 700" preserveAspectRatio="xMidYMid meet" style="transform:translate(${B.keyX ?? -6}%, ${B.keyY ?? 0}%) scale(${(B.keySize ?? 85) / 100})">
    <style>${BP_CSS}${KCSS}</style>
    <defs><pattern id="kDots" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.1" fill="#fff" opacity=".85"/></pattern></defs>
    <g transform="translate(${CX} ${CY}) rotate(${DEG}) translate(0 ${-MID})">
      <g class="bp-dimg"><line x1="140" y1="150" x2="140" y2="560"/><line x1="132" y1="150" x2="148" y2="150"/><line x1="132" y1="560" x2="148" y2="560"/>
      <text transform="translate(156 355) rotate(90)" text-anchor="middle">${esc(B.dim || '')}</text></g>
      ${[3, 2, 1, 0].map(i => `<g class="g-part" data-k="${i}">${KP[i]}</g>`).join('')}
      <circle class="bp-detail" cx="34" cy="516" r="52"/>
    </g>${labs}</svg>`;
  $$('.g-part', bp).forEach(g => {
    g.addEventListener('mouseenter', () => { bp.querySelector(`.g-lab[data-k="${g.dataset.k}"]`)?.classList.add('on'); g.classList.add('on'); });
    g.addEventListener('mouseleave', () => { bp.querySelector(`.g-lab[data-k="${g.dataset.k}"]`)?.classList.remove('on'); g.classList.remove('on'); });
  });
  }
  const SP = S.spec;
  const today = new Date();
  $('.spec').innerHTML = `<div class="sp-h"><small>${esc(SP.sub)}</small><b>${esc(SP.title)}</b><span class="sp-ic">${ic('moon')}</span></div>
    <div class="sp-g">${SP.cells.map(([k, v]) => `<div><small>${esc(k)}</small><b class="${/\{d\}/.test(v) ? 'blue' : ''}">${esc(String(v).replace('{d}', dnum).replace('{today}', `${MON[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`))}</b></div>`).join('')}</div>`;
})();

/* ---------- 창 관리 ---------- */
const layer = $('#winlayer');
const wins = new Map();
let Zi = 10, focused = null;
const deskW = () => $('#desk').offsetWidth || BASE_W;
const deskH = () => $('#desk').offsetHeight || BASE_H;
// CATEGORY(Records) · NOTICE · 폴더 창은 원래 자리(위 메뉴 아래)에서 열리고 뒤 화면도 흐려지지 않아요 (퓨어.kr 처럼)
const PLAIN_WIN = /^(records|notice|folder|player|talk|talkroom)$/;
function openWin(id, def) {
  if (wins.has(id)) { const w = wins.get(id); w.el.classList.remove('min'); focusWin(id); return w; }
  const el = document.createElement('div');
  el.className = `win ${def.cls || ''}`;
  // 화면 크기에 맞춰 위치·너비를 같은 비율로 늘려요
  const fx = Math.max(1, deskW() / WIN_W), fy = Math.max(1, deskH() / WIN_H);
  const w = Math.min(def.w, deskW() - 24), h = def.h && Math.min(def.h, deskH() - 72 - 72);
  let x = Math.round(def.x * fx), y = Math.round(72 + (def.y - 46) * fy);
  x = Math.max(12, Math.min(x, deskW() - w - 12));
  // 창 안 글씨를 조금 크게 (창 전체를 WZ 배 확대 · 자리는 그대로)
  // 작은 창에서는 글씨를 살짝만 더 키워요 (WIN_SMALL = 최대 배율)
  const wz = (isMobile() || id === 'pass' || WKZ) ? 1 : def.abs ? WZ_CHAR / Z : PLAIN_WIN.test(id) ? WZ : WZ / Z;   // CATEGORY · NOTICE · 폴더 창은 퓨어.kr 처럼 화면 크기에 맞춰 같이 줄고 늘어요   // 창 크기 고정 : 화면이 크든 작든 실제 크기는 같아요 (높이만 화면에 맞춰 줄어요 · 퓨어.kr 처럼)   // 캐릭터 창: 전체화면에서는 WZ_CHAR 배율   // 작은 창에서도 전체화면과 같은 글씨 크기
  if (def.abs) el.style.cssText = `left:${def.x / wz}px;top:${def.y / wz}px;width:${def.w / wz}px;height:${def.h / wz}px`;
  else el.style.cssText = `left:${Math.max(12, Math.min(x, deskW() - w * wz - 12)) / wz}px;top:${y / wz}px;width:${Math.min(w, (deskW() - 24) / wz)}px;${h ? `height:${Math.min(h * wz, deskH() - 144 - 16) / wz}px` : ''}`;
  if (wz !== 1) { el.style.zoom = wz; el.dataset.wz = wz; }
  if (id === 'pass') placePass(el);
  const head = def.head || `<span class="win-ic ${def.num ? 'num' : ''} ${def.icCls || ''}">${def.num ? esc(def.num) : ic(def.icon || 'folder')}</span><span class="win-t">${esc(def.title)}</span><span class="win-s">${esc(def.sub || '')}</span>`;
  el.innerHTML = `<div class="win-h">${head}${def.acc ? '<i class="acc"></i>' : ''}${def.noBtns ? '' : `<div class="win-btns">${def.extraBtns || ''}<button data-a="min" title="최소화">${ic('minus')}</button><button data-a="close" title="닫기">${ic('x')}</button></div>`}</div>
    <div class="win-b"></div>${def.foot ? `<div class="win-f ${def.footCls || ''}">${def.foot}</div>` : ''}`;
  layer.appendChild(el);
  const rec = { id, el, body: $('.win-b', el), task: def.task || def.title, def };
  wins.set(id, rec);
  el.addEventListener('pointerdown', () => focusWin(id));
  el.addEventListener('click', e => {
    const a = e.target.closest('[data-a]'); if (!a || !el.contains(a)) return;
    e.stopPropagation(); a.dataset.a === 'min' ? minWin(id) : closeWin(id);
  });
  dragify(el, $('.win-h', el));
  def.render && def.render(rec.body, rec);
  // 창 자리: 화면 가운데 (여러 개면 살짝씩 비껴서) — 참고한 홈페이지처럼 가운데 팝업
  if (!isMobile() && !def.abs && !def.keepPos && id !== 'pass' && !PLAIN_WIN.test(id)) {
    const wz2 = +el.dataset.wz || 1, ww = el.offsetWidth * wz2, hh = el.offsetHeight * wz2, n = [...wins.values()].filter(o => o.id !== 'pass' && o.id !== id && !o.el.classList.contains('min')).length % 5;
    const T = 70, Bm = 72, cx = Math.round((deskW() - ww) / 2) + n * 26, cy = Math.round(T + Math.max(0, (deskH() - T - Bm - hh) / 2)) + n * 22;
    el.style.left = Math.max(12, Math.min(cx, deskW() - ww - 12)) / wz2 + 'px'; el.style.top = Math.max(64, Math.min(cy, deskH() - hh - 64)) / wz2 + 'px';
  }
  // CATEGORY(Records) · NOTICE 창은 위 메뉴 버튼 바로 밑에 붙어서 열려요 (화면 크기와 상관없이)
  if (!isMobile() && /^(records|notice)$/.test(id)) {
    const btn = $(`#desk .topnav [data-open="${id}"]`), dk = $('#desk');   // 각자 자기 메뉴 버튼 바로 밑에
    if (btn && dk) { const br = btn.getBoundingClientRect(), dr = dk.getBoundingClientRect(), k = (dr.width / deskW()) || 1, wz2 = +el.dataset.wz || 1, ww = el.offsetWidth * wz2;
      const x = Math.max(12, Math.min((br.left - dr.left) / k - 14, deskW() - ww - 12)), y = (br.bottom - dr.top) / k + 7;
      el.style.left = x / wz2 + 'px'; el.style.top = y / wz2 + 'px'; }
  }
  // 음악 플레이어는 오른쪽 위에 세로로 길게 붙어서 열려요 (퓨어.kr 처럼 · 뒤 화면은 그대로)
  if (!isMobile() && id === 'player') {
    const wz2 = +el.dataset.wz || 1, ww = el.offsetWidth * wz2;
    el.style.left = Math.max(12, deskW() - ww - 24) / wz2 + 'px'; el.style.top = 60 / wz2 + 'px';
  }
  // 옮겨 둔 자리 기억 (다시 열면 그 자리에서) · 크기 조절 손잡이 · 휴대폰은 아래에서 올라오는 시트
  if (!isMobile() && id !== 'pass') {
    const sp = WPOS[id], wz2 = +el.dataset.wz || 1;
    if (sp && !def.abs && !/^(records|notice|player|talk|talkroom)$/.test(id)) { el.style.left = Math.max(-el.offsetWidth + 80, Math.min(sp.x, (deskW() - 60) / wz2)) + 'px'; el.style.top = Math.max(64 / wz2, Math.min(sp.y, (deskH() - 90) / wz2)) + 'px'; if (sp.w) el.style.width = sp.w + 'px'; if (sp.h) el.style.height = sp.h + 'px'; }
    if (!def.abs && !/rmzw|cydet/.test(def.cls || '')) { const g = document.createElement('i'); g.className = 'wgrip'; g.title = '크기 조절'; el.appendChild(g); gripify(el, g, id); }
  }
  if (isMobile() && id !== 'pass') { const g = document.createElement('i'); g.className = 'sh-grab'; el.prepend(g); sheetDrag(el, g, id); }
  focusWin(id); updatePostFlag();
  if (id === 'chardet' || id === 'agent') {   // 옆 창이 목록 창 뒤에서 미끄러져 나와요 (transform 만 써서 깜빡임 없이)
    el.style.animation = 'none';
    el.animate([{ opacity: 0, transform: 'translateX(-120px) scale(.97)' }, { opacity: 1, offset: .55 }, { opacity: 1, transform: 'none' }], { duration: 560, easing: 'cubic-bezier(.22,.9,.25,1)' });
    cxShift();
  }
  return rec;
}
const setSub = (id, sub) => { const w = wins.get(id); if (w) { const s = $('.win-s', w.el); if (s) s.textContent = sub; } };
const setTask = (id, t) => { const w = wins.get(id); if (w) { w.task = t; renderTasks(); } };
function focusWin(id) { const w = wins.get(id); if (!w) return; w.el.style.zIndex = ++Zi; focused = id; if (CX_IDS.includes(id)) cxDim(true); renderTasks(); syncDim(); }
function minWin(id) { const w = wins.get(id); if (!w) return; w.el.classList.add('min'); if (focused === id) focused = null; if (CX_IDS.includes(id)) cxDim(); renderTasks(); syncDim(); }
// 창 뒤 반투명 배경 : 맨 위 창만 또렷하게, 뒤는 흐리게 (바깥을 누르면 맨 위 창이 닫혀요)
function syncDim() {
  let d = $('#wdim');
  if (!d) { d = document.createElement('div'); d.id = 'wdim'; layer.appendChild(d); d.addEventListener('click', () => { if (document.documentElement.classList.contains('sye-editing')) return; const t = topWin(); if (t) closeWin(t.id); }); }
  const t = topWin(), on = !!t && (isMobile() || (!CX_IDS.includes(t.id) && !PLAIN_WIN.test(t.id)));
  d.classList.toggle('on', on); document.documentElement.classList.toggle('wdim-on', on); document.documentElement.classList.toggle('msheet', on && isMobile());
  if (on) d.style.zIndex = (+t.el.style.zIndex || Zi) - 1;
}
function topWin() { return [...wins.values()].filter(w => w.id !== 'pass' && !w.el.classList.contains('min') && !w.el.classList.contains('closing')).sort((a, b) => (+b.el.style.zIndex || 0) - (+a.el.style.zIndex || 0))[0]; }
// 캐릭터 정리 창 뒤 흐린 배경
const CX_IDS = ['chars', 'chardet', 'agent'];
function cxDim(front) {
  let d = $('#cxdim');
  if (!d) { d = document.createElement('div'); d.id = 'cxdim'; layer.appendChild(d); d.addEventListener('click', () => { closeWin('chardet'); closeWin('agent'); closeWin('chars'); }); }
  const a = wins.get('chars'), b = wins.get('chardet') || wins.get('agent'), on = !isMobile() && !!a && !a.el.classList.contains('min');
  d.classList.toggle('on', on); syncGrpDots();
  if (on && front) { const top = focused; d.style.zIndex = ++Zi; a.el.style.zIndex = ++Zi; if (b) b.el.style.zIndex = ++Zi; if (top === 'chars') a.el.style.zIndex = ++Zi; }
}
function closeWin(id) {
  const w = wins.get(id); if (!w) return;
  w.def.onClose && w.def.onClose();
  w.el.classList.add('closing'); wins.delete(id); if (focused === id) focused = null;
  if (id === 'chardet' || id === 'agent') setTimeout(cxShift, 0);
  setTimeout(() => w.el.remove(), 180); if (CX_IDS.includes(id)) cxDim(); renderTasks(); updatePostFlag();
  const t = topWin(); if (t && focused == null) { focused = t.id; renderTasks(); } syncDim();
}
function updatePostFlag() { document.body.classList.toggle('post-open', [...wins.keys()].some(k => k.startsWith('post-'))); }
// 앱 아이콘 초록 점: 그 앱 창을 내렸을(_) 때만 표시
const APP_WIN = { dday: 'pass' };
function syncAllDots() {
  $$('.app[data-open]').forEach(a => {
    const id = a.dataset.open; let on;
    if (typeof GRP_APPS !== 'undefined' && GRP_APPS[id]) { const w = wins.get('chars'); on = !!(w && w.el.classList.contains('min') && charWorld === GRP_APPS[id]); }
    else { const w = wins.get(APP_WIN[id] || id); on = !!(w && w.el.classList.contains('min')); }
    const i = $('.app-ic', a); a.classList.toggle('seen', on);
    const d = $('.ndot', i); if (on && !d) i.insertAdjacentHTML('beforeend', '<span class="ndot"></span>'); if (!on && d) d.remove();
  });
}
function renderTasks() { setTimeout(syncAllDots, 0);
  $('.tasks').innerHTML = [...wins.values()].map(w => `<button class="task ${focused === w.id && !w.el.classList.contains('min') ? 'on' : ''}" data-task="${w.id}"><span>${esc(w.task)}</span></button>`).join('');
}
$('.tasks').addEventListener('click', e => {
  const b = e.target.closest('[data-task]'); if (!b) return;
  const w = wins.get(b.dataset.task);
  if (focused === w.id && !w.el.classList.contains('min')) minWin(w.id);
  else { w.el.classList.remove('min'); focusWin(w.id); }
});
/* 창 자리 기억 (드래그 · 크기 조절 후 저장 / 정렬 버튼으로 초기화) */
const WPOS = (() => { try { return JSON.parse(localStorage.getItem('syWinPos') || '{}') || {}; } catch (e) { return {}; } })();
const saveWPos = el => { const rec = [...wins.values()].find(w => w.el === el); if (!rec || rec.id === 'pass' || rec.def.abs || isMobile()) return;
  WPOS[rec.id] = { x: Math.round(parseFloat(el.style.left) || 0), y: Math.round(parseFloat(el.style.top) || 0), w: el._sized ? Math.round(el.offsetWidth) : undefined, h: el._sized ? Math.round(el.offsetHeight) : undefined };
  try { localStorage.setItem('syWinPos', JSON.stringify(WPOS)); } catch (e) {} };
function gripify(el, g) {
  g.addEventListener('pointerdown', e => {
    if (isMobile() || e.button !== 0) return; e.preventDefault(); e.stopPropagation();
    const sx = e.clientX, sy = e.clientY, sw = el.offsetWidth, sh = el.offsetHeight, wz = +el.dataset.wz || 1; g.setPointerCapture(e.pointerId); el.classList.add('sizing');
    const mv = ev => { el.style.width = Math.max(260, Math.min((deskW() - 24) / wz, sw + (ev.clientX - sx) / Z / wz)) + 'px'; el.style.height = Math.max(180, Math.min((deskH() - 140) / wz, sh + (ev.clientY - sy) / Z / wz)) + 'px'; };
    const up = () => { g.removeEventListener('pointermove', mv); g.removeEventListener('pointerup', up); el.classList.remove('sizing'); el._sized = true; saveWPos(el); };
    g.addEventListener('pointermove', mv); g.addEventListener('pointerup', up);
  });
}
/* 휴대폰 시트 : 위 손잡이를 아래로 끌면 닫혀요 */
function sheetDrag(el, g, id) {
  let sy = 0, dy = 0, on = false;
  g.addEventListener('pointerdown', e => { on = true; sy = e.clientY; dy = 0; g.setPointerCapture(e.pointerId); el.style.transition = 'none'; });
  g.addEventListener('pointermove', e => { if (!on) return; dy = Math.max(0, e.clientY - sy); el.style.transform = `translateY(${dy}px)`; });
  const end = () => { if (!on) return; on = false; el.style.transition = 'transform .25s ease'; if (dy > 90) { el.style.transform = 'translateY(110%)'; setTimeout(() => closeWin(id), 200); } else el.style.transform = ''; setTimeout(() => el.style.transition = '', 260); };
  g.addEventListener('pointerup', end); g.addEventListener('pointercancel', end);
  g.addEventListener('click', () => { if (dy < 4) closeWin(id); });
}
// Esc : 맨 위 창 닫기
addEventListener('keydown', e => { if (e.key !== 'Escape' || e.target.closest?.('input,textarea,[contenteditable]')) return; const t = topWin(); if (t) closeWin(t.id); });
function dragify(el, handle) {
  handle.addEventListener('pointerdown', e => {
    if (e.target.closest('button,[data-a],.btab,.dots3') || isMobile()) return;
    const sx = e.clientX, sy = e.clientY, ox = parseFloat(el.style.left), oy = parseFloat(el.style.top), wz = +el.dataset.wz || 1;
    handle.setPointerCapture(e.pointerId);
    const mv = ev => {
      el.style.left = Math.min((deskW() - 60) / wz, Math.max(-el.offsetWidth + 80, ox + (ev.clientX - sx) / Z / SX / wz)) + 'px';
      el.style.top = Math.min((deskH() - 90) / wz, Math.max(64 / wz, oy + (ev.clientY - sy) / Z / wz)) + 'px';
    };
    const up = () => { handle.removeEventListener('pointermove', mv); handle.removeEventListener('pointerup', up); handle.removeEventListener('pointercancel', up); if (Math.abs(parseFloat(el.style.left) - ox) + Math.abs(parseFloat(el.style.top) - oy) > 2) saveWPos(el); };
    handle.addEventListener('pointermove', mv); handle.addEventListener('pointerup', up); handle.addEventListener('pointercancel', up);
  });
}

/* ---------- 알림 ---------- */
function toast({ title, text, icon = 'bell', icCls = '', avatar, app, alert, act, onClick }) {
  const el = document.createElement('div');
  el.className = 'toast' + (alert ? ' alert' : '');
  el.innerHTML = `<span class="ic ${avatar !== undefined ? 'av' : icCls}">${avatar !== undefined ? ph(avatar, { seed: title }) : ic(icon)}</span>
    <div><b>${esc(title)}</b><p>${esc(text)}</p>${act ? `<span class="act">${esc(act)}</span>` : ''}</div><span class="tm">지금</span><button class="x">${ic('x')}</button>`;
  $('#toasts').appendChild(el);
  const kill = () => { el.classList.add('out'); setTimeout(() => el.remove(), 300); };
  $('.x', el).onclick = e => { e.stopPropagation(); kill(); };
  el.onclick = () => { onClick ? onClick() : app && openApp(app); kill(); };
  setTimeout(kill, 8000);
}

/* ---------- 앱 열기 ---------- */
// 캐릭터 정리 앱 4개: 창을 내렸을(_) 때만 초록 점
const GRP_APPS = { 'grp-seiran': 'seiran', member: 'arch', 'grp-frontline': 'frontline', 'grp-etc': 'etc' };
function syncGrpDots() {
  const w = wins.get('chars'), mn = w && w.el.classList.contains('min');
  Object.entries(GRP_APPS).forEach(([id, wd]) => $$(`.app[data-open="${id}"]`).forEach(a => {
    const on = !!(mn && charWorld === wd), i = $('.app-ic', a); a.classList.toggle('seen', on);
    const d = $('.ndot', i); if (on && !d) i.insertAdjacentHTML('beforeend', '<span class="ndot"></span>'); if (!on && d) d.remove(); }));
}
/* ---------- TALK : 대화방 목록 + 대화 창 ---------- */
const TK_ME = () => S.chat.me || { name: '나', avatar: '' };
const TK_ROOMS = () => S.chat.rooms || [{ name: S.chat.partner, status: S.chat.status, avatar: S.chat.avatar, time: '', unread: 4, messages: S.chat.messages || [], replies: S.chat.replies || [], incoming: S.chat.incoming || [] }];
const TK_READ = new Set();   // 이번에 열어 본 방은 안 읽음 숫자를 지워요
const TK_UNREAD = i => TK_READ.has(i) ? 0 : (+(TK_ROOMS()[i] || {}).unread || 0);
let TK_CUR = -1;
// 목록 · 대화 창을 나란히 가운데에 (PC) — 캐릭터 목록 · 상세 창처럼
function tkPlace() {
  if (isMobile()) return;
  const L = wins.get('talk'), Rm = wins.get('talkroom'); if (!L) return;
  const lw = L.el.offsetWidth, rw = 400, gap = 14, H = Math.min(620, deskH() - 144 - 16);
  const x0 = Math.max(12, Math.round((deskW() - lw - gap - rw) / 2)), y0 = Math.max(64, Math.round(72 + (deskH() - 72 - 72 - H) / 2));
  L.el.style.left = x0 + 'px'; L.el.style.top = y0 + 'px'; L.el.style.height = H + 'px';
  if (Rm) { Rm.el.style.left = x0 + lw + gap + 'px'; Rm.el.style.top = y0 + 'px'; Rm.el.style.height = H + 'px'; Rm.el.style.width = rw + 'px'; }
}
function openTalkRoom(i) {
  const R = TK_ROOMS(), r = R[i]; if (!r) return; TK_CUR = i; TK_READ.add(i);
  const L = wins.get('talk'); if (L) { $$('.tk-row', L.el).forEach(x => x.classList.toggle('on', +x.dataset.room === i)); const u = $(`.tk-row[data-room="${i}"] .tk-meta i`, L.el); u && u.remove(); }
  const me = TK_ME();
  const isG = !!r.group || (r.messages || []).some(m => m.name), names = [...new Set((r.messages || []).filter(m => m.name).map(m => m.name))];
  const head = () => `<div class="chat-head"><button type="button" class="back" title="닫기">${ic('chevl')}</button><div class="tk-hc"><div class="tk-stack">${ph(r.avatar, { cls: 'tk-hav', seed: r.name })}${isG ? names.slice(0, 2).map(n => `<div class="ph tk-hav ${V(n)}"></div>`).join('') : ''}</div><b>${esc(r.name)}</b><small><i></i>${esc(r.status || '')}</small></div><button type="button" class="cx-add tk-ed" data-tked title="대화 수정">${ic('tkMenu')}</button></div>
    ${r.notice ? `<div class="tk-pin"><b>공지</b><span>${esc(r.notice)}</span></div>` : ''}`;
  const fill = (b) => {
    b.style.overflow = 'hidden';
    b.innerHTML = `<div class="chat"><div class="chat-list"></div><form class="chat-in"><button type="button" class="plus">${ic('plus')}</button><label><input placeholder="메시지 입력" maxlength="200"><span class="sm">${ic('tkSmile')}</span><button>${ic('tkArrow')}</button></label></form></div>`;
    const list = $('.chat-list', b); let last = null;
    const dd = new Date(); list.insertAdjacentHTML('beforeend', `<div class="tk-day">${dd.getMonth() + 1}월 ${dd.getDate()}일 ${'일월화수목금토'[dd.getDay()]}요일</div>`);
    const add = (m, anim = true) => {
      const key = m.from + '|' + (m.name || '');
      if (key !== last) {
        const who = m.from === 'me' ? me : { name: m.name || r.name, avatar: m.name ? '' : r.avatar };
        list.insertAdjacentHTML('beforeend', `<div class="who ${m.from}">${ph(who.avatar, { cls: 'av', seed: who.name })}<span>${esc(who.name)}</span></div>`);
        last = key;
      }
      const d = document.createElement('div'); d.className = `msg ${m.from} ${m.emo || /^\p{Extended_Pictographic}$|^[♥♡]$/u.test(m.text || '') ? 'emo' : ''}`; if (!anim) d.style.animation = 'none';
      d.textContent = m.text; list.appendChild(d);
      if (m.react) list.insertAdjacentHTML('beforeend', `<span class="tk-re ${m.from}">${esc(m.react)}</span>`);
      if (m.stamp) { const n2 = new Date(); list.insertAdjacentHTML('beforeend', `<span class="tk-rd"><em>1</em>${n2.getHours() < 12 ? '오전' : '오후'} ${n2.getHours() % 12 || 12}:${pad(n2.getMinutes())}</span>`); }
      list.scrollTop = list.scrollHeight; return d;
    };
    (r.messages || []).forEach(m => add(m, false));
    list.scrollTop = list.scrollHeight;
    let ri = 0; b.addMsg = m => add(m);
    $('form', b).onsubmit = e => {
      e.preventDefault(); const inp = $('input', b), v = inp.value.trim(); if (!v) return;
      add({ from: 'me', text: v, stamp: 1 }); inp.value = '';
      const rp = r.replies || []; if (!rp.length) return;
      setTimeout(() => { $$('.tk-rd em', list).forEach(x => x.remove()); const t = add({ from: 'them', text: '' }); t.innerHTML = '<span class="typing"><i></i><i></i><i></i></span>';
        setTimeout(() => { t.textContent = rp[ri++ % rp.length]; list.scrollTop = list.scrollHeight; }, 1300); }, 500);
    };
  };
  const ex = wins.get('talkroom');
  if (ex) { const h = $('.win-h', ex.el); if (h) { const btns = $('.win-btns', h); h.innerHTML = head(); btns && h.appendChild(btns); } fill(ex.body); ex.el.classList.remove('min'); focusWin('talkroom'); }
  else {
    const rec = openWin('talkroom', { cls: 'chatwin tkroom', title: r.name, task: 'TALK · 대화', x: 660, y: 90, w: 400, h: 620, head: head(), render: fill });
    if (!isMobile()) rec.el.animate([{ opacity: 0, transform: 'translateX(-60px) scale(.98)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: 'cubic-bezier(.22,.9,.25,1)' });
  }
  const w = wins.get('talkroom'); w.task = r.name; renderTasks();
  w.el.onclick = e => {
    if (e.target.closest('[data-tked]')) { e.stopPropagation(); dispatchEvent(new CustomEvent('sye-talk', { detail: { i: TK_CUR } })); return; }
    if (e.target.closest('.chat-head .back')) { e.stopPropagation(); closeWin('talkroom'); }
  };
  tkPlace();
}
// 제작자 : 저장하고 다시 불러오면 그 대화방을 다시 열어줘요
if (OWNER) try { const ro = sessionStorage.getItem('sye-talk-open'); if (ro != null) { sessionStorage.removeItem('sye-talk-open'); const t0 = Date.now(), iv = setInterval(() => { if (document.querySelector('#intro') && Date.now() - t0 < 9000) return; clearInterval(iv); setTimeout(() => { openApp('talk'); if (+ro >= 0) setTimeout(() => openTalkRoom(+ro), 300); }, 600); }, 300); } } catch (e) {}
function openApp(id) { closeLauncher(); if (id.startsWith('x-')) return openExtra(id.slice(2)); if (id.startsWith('grp-')) return openChars(id.slice(4)); if (id === 'member' && S.characters?.worlds?.arch) return openChars('arch'); DEFS[id] && DEFS[id](); }
document.addEventListener('click', e => {
  const o = e.target.closest('[data-open]');
  if (o) {
    if (o.classList.contains('app')) { const i = $('.app-ic', o); i.classList.remove('sparkle'); void i.offsetWidth; }
    openApp(o.dataset.open); return;
  }
  const n = e.target.closest('[data-nav]');
  if (n) {
    const v = n.dataset.nav;
    if (v === 'home') { closeLauncher(); [...wins.keys()].forEach(k => k !== 'pass' && minWin(k)); }
    if (v === 'launcher') { e.stopPropagation(); if (!isMobile()) { closeLauncher(); tidyWins(); } else $('#launcher').classList.toggle('open'); }
    return;
  }
  if (!e.target.closest('#launcher')) closeLauncher();
});
// 창 정렬: 최근에 본 창 2개만 남기고 나머지는 닫고, D-DAY 창은 제자리로 · 남은 창은 화면 안으로 가지런히
function tidyWins() {
  Object.keys(WPOS).forEach(k => delete WPOS[k]); try { localStorage.removeItem('syWinPos'); } catch (e) {}
  const z = w => +w.el.style.zIndex || 0;
  const list = [...wins.values()].filter(w => w.id !== 'pass').sort((a, b) => z(b) - z(a));
  const live = list.filter(w => !w.el.classList.contains('min'));
  const keep = new Set(live.slice(0, 2).map(w => w.id));
  // 캐릭터 목록 + 상세창은 한 묶음
  if (keep.has('chardet') || keep.has('agent')) keep.add('chars');
  if (keep.has('chars')) { wins.has('chardet') && keep.add('chardet'); wins.has('agent') && keep.add('agent'); }
  let n = 0;
  list.forEach(w => { if (!keep.has(w.id)) { closeWin(w.id); n++; } });
  // D-DAY 창 제자리
  if (wins.has('pass')) { const p = wins.get('pass').el; p.classList.remove('min'); placePass(p); }
  else if (DEFS.pass && !isMobile()) { DEFS.pass(); }
  // 남은 창: 화면 밖으로 나간 부분이 있으면 안으로 들여요
  [...keep].map(id => wins.get(id)).filter(Boolean).forEach(w => {
    const el = w.el, wz = +el.dataset.wz || 1, W = deskW(), H = deskH();
    const L = parseFloat(el.style.left) || 0, T = parseFloat(el.style.top) || 0;
    const nl = Math.max(12 / wz, Math.min(L, (W - el.offsetWidth * wz - 12) / wz)), nt = Math.max(64 / wz, Math.min(T, (H - el.offsetHeight * wz - 70) / wz));
    if (Math.abs(nl - L) > 1 || Math.abs(nt - T) > 1) { el.style.transition = 'left .35s cubic-bezier(.2,.8,.2,1),top .35s cubic-bezier(.2,.8,.2,1)'; el.style.left = nl + 'px'; el.style.top = nt + 'px'; setTimeout(() => el.style.transition = '', 400); }
  });
  if (keep.has('chars')) cxDim(true);
  // 작은 알림
  let t = $('#tidyToast');
  if (!t) { t = document.createElement('div'); t.id = 'tidyToast'; document.body.appendChild(t); }
  t.innerHTML = `<i>${ic('grid')}</i><span>${n ? '창을 다시 정렬했어요' : '정리할 창이 없어요'}</span><b>✓</b>`;
  t.classList.remove('on'); void t.offsetWidth; t.classList.add('on');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('on'), 2200);
}
{ const st = document.createElement('style'); st.textContent = `#tidyToast{position:fixed;left:50%;top:64px;z-index:9000;display:flex;align-items:center;gap:9px;height:38px;padding:0 16px 0 6px;border-radius:99px;background:#fff;border:1px solid #DDE8E3;box-shadow:0 10px 26px rgba(29,74,64,.16);font:700 12.5px 'IBM Plex Sans KR','Inter',sans-serif;color:#1D4A40;transform:translate(-50%,-14px);opacity:0;pointer-events:none;transition:transform .35s cubic-bezier(.2,.9,.3,1.2),opacity .25s}
#tidyToast.on{transform:translate(-50%,0);opacity:1}
#tidyToast i{width:26px;height:26px;border-radius:50%;background:#3FAE84;color:#fff;display:grid;place-items:center}#tidyToast i svg{width:13px;height:13px}
#tidyToast b{color:#3FAE84;font-size:13px}`; document.head.appendChild(st); }
function closeLauncher() { $('#launcher').classList.remove('open'); }
$('.to-top').onclick = () => { $('.stage').scrollTo({ top: 0, behavior: 'smooth' }); };

/* =========================================================
   PLAYER (전역 음악)
   ========================================================= */
const audio = $('#audio');
const PL = { i: 0, on: false, pos: 0 };
const secs = t => { const [m, s] = String(t || '0:00').split(':').map(Number); return (m || 0) * 60 + (s || 0); };
const fmt = s => `${Math.floor(s / 60)}:${pad(Math.floor(s % 60))}`;
const cur = () => S.bgm[PL.i] || {};
const dur = () => (cur().src && isFinite(audio.duration) && audio.duration) || secs(cur().time);
function load(i, autoplay = true) {
  PL.i = (i + S.bgm.length) % S.bgm.length; PL.pos = 0;
  const t = cur();
  if (t.src) audio.src = SRC(t.src) || t.src; else { audio.removeAttribute('src'); audio.load(); }
  audio.loop = !!t.loop;   // loop: true 인 곡(배경음악)은 끝나면 처음부터 다시
  autoplay ? play() : syncPlayer();
}
// 다음 곡 : rotate: true 인 배경음악끼리는 차례대로 돌아가요 (마지막 곡 다음엔 다시 첫 곡)
function nextI() {
  const n = S.bgm.length; if (!S.bgm[PL.i] || !S.bgm[PL.i].rotate) return PL.i + 1;
  for (let k = 1; k <= n; k++) { const j = (PL.i + k) % n; if (S.bgm[j] && S.bgm[j].rotate && S.bgm[j].src) return j; }
  return PL.i + 1;
}
function play() { PL.on = true; if (cur().src) audio.play().catch(() => {}); syncPlayer(); }
function pause() { PL.on = false; audio.pause(); syncPlayer(); }
function toggle() { PL.on ? pause() : play(); try { PL.on ? localStorage.removeItem('bgm-off') : localStorage.setItem('bgm-off', '1'); } catch (e) {} }
/* 배경음악 : 홈페이지에 들어와서 처음 누르는 순간 작게 서서히 시작 (끄면 이 브라우저에서는 다음에도 꺼진 채로)
   BGM_VOL = 크기 (0 ~ 1 · 0.35 = 작게~중간) */
const BGM_VOL = 0.35;
audio.volume = BGM_VOL;
(() => {
  const first = (S.bgm || [])[0]; if (!first || !first.src || !(first.loop || first.rotate)) return;
  let off = false; try { off = localStorage.getItem('bgm-off') === '1'; } catch (e) {}
  if (off) return;
  const go = e => {
    if (e && e.target && e.target.closest && e.target.closest('.mini-play,.mp-ctrl,.tp-play')) { stop(); return; }   // 재생 버튼을 직접 누른 거면 그 버튼에 맡겨요
    stop(); if (PL.on) return;
    if (PL.i !== 0) load(0, false);
    audio.volume = 0; play();
    const t0 = Date.now(), iv = setInterval(() => { const k = Math.min(1, (Date.now() - t0) / 2200); audio.volume = BGM_VOL * k; if (k >= 1) clearInterval(iv); }, 50);
  };
  const stop = () => { document.removeEventListener('pointerdown', go, true); document.removeEventListener('keydown', go, true); };
  document.addEventListener('pointerdown', go, true); document.addEventListener('keydown', go, true);
})();
setInterval(() => {
  if (!PL.on) return;
  PL.pos = cur().src ? audio.currentTime : PL.pos + .25;
  if (PL.pos >= dur()) { load(nextI()); return; }
  syncProgress();
}, 250);
audio.addEventListener('ended', () => load(nextI()));
function syncPlayer() {
  const t = cur();
  $('.mini-title').textContent = t.title || '';
  $('.mini').classList.toggle('playing', PL.on);
  $('.mini-play').innerHTML = ic(PL.on ? 'pause' : 'play');
  $('.mini-cover').innerHTML = SRC(t.cover) ? `<img src="${esc(SRC(t.cover))}" alt="">` : '';
  const w = wins.get('player');
  if (w) {
    $('.mp-np h4', w.el).textContent = t.title; $('.mp-np p', w.el).textContent = t.artist;
    const mg = w.el.classList.contains('mglass');
    $('.mp-art', w.el).innerHTML = mg ? (SRC(t.cover) ? `<img src="${esc(SRC(t.cover))}" alt="">` : '') : ph(t.cover, { label: t.artist, seed: t.title });
    if (mg) { const sp = SPATH(t.cover); if (sp) $('.mp-art', w.el).dataset.slot = sp; else delete $('.mp-art', w.el).dataset.slot; }   // 제작자 편집 : 표지 자리를 누르면 사진 넣기
    $('.mp-lyric', w.el).innerHTML = mg ? `<b>LYRIC</b><span>${esc(t.line || '')}</span>` : `<b>♪</b>${esc(t.line || '')}`;
    w.el.classList.toggle('playing', PL.on);
    $('.mp-ctrl .big', w.el).innerHTML = ic(PL.on ? 'pause' : 'play');
    $$('.mp-list button', w.el).forEach(b => b.classList.toggle('on', +b.dataset.t === PL.i));
  }
  $$('.tplayer').forEach(tp => { const me = +tp.dataset.bgm === PL.i; $('.pp', tp).innerHTML = ic(me && PL.on ? 'pause' : 'play'); });
  syncProgress();
}
function syncProgress() {
  const d = dur(), p = d ? PL.pos / d : 0;
  const w = wins.get('player');
  if (w) {
    $('.mp-prog .bar i', w.el).style.width = p * 100 + '%';
    $('.mp-prog .t1', w.el).textContent = fmt(PL.pos); $('.mp-prog .t2', w.el).textContent = PL.on || PL.pos ? fmt(d) : '0:00';
    $$('.mp-wave i', w.el).forEach((b, i, a) => { b.classList.toggle('on', i / a.length < p); b.style.height = PL.on ? (2 + Math.random() * 12) + 'px' : '2px'; });
  }
  $$('.tplayer').forEach(tp => {
    const me = +tp.dataset.bgm === PL.i, dd = secs((S.bgm[+tp.dataset.bgm] || {}).time);
    const q = me ? p * 100 : 0;
    $('.tp-bar i', tp).style.width = q + '%'; $('.tp-bar b', tp).style.left = q + '%';
    $('.tp-time', tp).textContent = `${me ? fmt(PL.pos) : '0:00'} / ${fmt(me ? d : dd)}`;
  });
}
$('.mini-play').onclick = e => { e.stopPropagation(); toggle(); };
$('.mini').onclick = e => { if (!e.target.closest('.mini-play')) openApp('player'); };
load(0, false);

/* =========================================================
   창 정의 (위치·크기는 영상과 같은 1034×846 기준)
   ========================================================= */
let postCascade = 0;
const DEFS = {
  pass: () => openWin('pass', {
    cls: 'navyhead passwin', icon: 'syplus', title: S.venue, task: 'D-DAY', x: 662, y: 64, w: 317,
    extraBtns: (S.pairs || []).length > 1 ? `<button data-pair="-1" title="이전 페어">${ic('chevl')}</button><button data-pair="1" title="다음 페어">${ic('chevr')}</button>` : '',
    render(b) { b.style.overflow = 'visible'; b.innerHTML = passHTML(); }
  }),

  dday: () => {
    if (isMobile()) { $('.mobile-pass')?.scrollIntoView({ behavior: 'smooth' }); }
    else if (wins.has('pass')) { wins.get('pass').el.classList.remove('min'); focusWin('pass'); } else DEFS.pass();
    toast({ title: 'D-DAY', text: `${S.pair.a} × ${S.pair.b} 함께한 지 ${dnum}일째 ♥`, icon: 'heartpulse' });
  },

  /* ----- Records: 카테고리 트리 ----- */
  records: () => openWin('records', {
    icon: 'folder', title: 'Records', sub: '카테고리', task: 'Records', x: 86, y: 59, w: 318, h: 293,
    foot: `<span>${S.records.folders.length + 1}개 항목</span><span>${esc(S.footer)}</span>`,
    render(b) {
      b.innerHTML = `<div class="ex-bar"><div class="nav2"><button>${ic('chevl')}</button><button>${ic('chevr')}</button></div>
        <div class="crumb"><span class="ci">${ic('moon')}</span>${esc(S.brand.start)}<span class="sep">›</span>Records</div></div>
        <div class="tree"><div class="tree-head"><span>이름</span><span>종류</span></div>
          <div class="tree-row root" data-f="all"><span class="ti-root">${ic('folderF')}</span>${esc(S.records.root)}<span class="cnt">전체</span></div>
          ${S.records.folders.map(x => `<div class="tree-row child" data-f="${x.id}"><span class="ti-${x.icon}">${ic(x.icon === 'folder' ? 'folderF' : x.icon)}</span>${esc(x.name)}<span class="cnt">폴더</span></div>`).join('')}</div>`;
      b.addEventListener('click', e => { const r = e.target.closest('[data-f]'); if (r) openFolder(r.dataset.f); });
    }
  }),

  notice: () => openWin('notice', {
    icon: 'folder', title: 'Notice', sub: '공지사항', task: 'Notice', acc: true, x: 268, y: 74, w: 656, h: 616,
    foot: `<span>${S.notice.posts.length}개 기록</span><span>${esc(S.footer)}</span>`,
    render(b) {
      b.innerHTML = `${exBar(['Records', 'Notice'])}
        <div class="grid-cards">
          <div class="card lock"><div class="lk"><div class="lockbox" data-label="${esc(S.notice.lockLabel)}">${ic('lock')}</div></div></div>
          ${S.notice.posts.slice().sort((a, b) => (b.no || 0) - (a.no || 0)).map((p, i) => `<div class="card" data-npost="${p.no}"><div class="phw"><div class="nthumb">${(p.images.length ? p.images.concat(p.images).slice(0, 3) : [{ src: '' }]).map((im, k) => `<div class="bn ph v3" ${SPATH(im.src) ? `data-slot="${esc(SPATH(im.src))}"` : ''} data-label="${esc(S.title.before + 'I' + S.title.after)}">${SRC(im.src) ? `<img src="${esc(SRC(im.src))}" alt="">` : ''}</div>`).join('')}</div><span class="no">No.${pad(i + 1)}</span></div>
            <h4>${esc(p.title)}<span class="tg">${esc(p.tag)}</span></h4><p class="ex">${esc(p.excerpt || '')}</p><div class="cf"><span>${esc(p.date)}</span>${ic('share')}</div></div>`).join('')}
        </div>`;
      b.addEventListener('click', e => { const c = e.target.closest('[data-npost]'); if (c) openNotice(+c.dataset.npost); });
    }
  }),

  /* ----- Member ----- */
  member: () => {
    let who = S.memberOpen ?? 0, tab = 'profile';
    openWin('member', {
      head: `<span class="dots3 g"><i></i><i></i><i></i></span><span class="win-t" style="font-weight:800">MEMBER PROFILE</span><span class="win-s mcode"></span>`, acc: true,
      cls: 'memberwin', title: 'Profile', task: 'Profile', x: 238, y: 72, w: 557, h: 690,
      foot: `<span class="mf">FILE 01 / 02</span><span class="sig"><i style="height:3px"></i><i style="height:5px"></i><i style="height:7px"></i><i style="height:9px;opacity:.35"></i></span><span>${esc(S.venue)}</span>`, footCls: 'mono',
      render(b, rec) {
        b.style.cssText = 'display:flex;flex-direction:column;overflow:hidden';
        const draw = () => {
          const m = S.members[who];
          rec.el.classList.toggle('dark', m.theme === 'dark');
          $('.mcode', rec.el).textContent = `MOON TERMINAL · ${m.code || ''}`;
          $('.mf', rec.el).textContent = `FILE 0${tab === 'gallery' ? 2 : 1} / 02`;
          let body;
          if (tab === 'gallery') body = `<div class="mp-gal"><div class="mp-gal-h">${esc(m.name)} · GALLERY<small>${m.gallery.length} PHOTOS</small></div><div class="g">${m.gallery.map((g, i) => ph(g, { seed: m.name + i, icon: 'heart' })).join('')}</div></div>`;
          else {
            body = `<div class="mp-hero ph ${V(m.name)} ${m.theme === 'dark' ? '' : 'lt'}" data-slot="${esc(SPATH(m.hero))}">${SRC(m.hero) ? `<img src="${esc(SRC(m.hero))}" alt="">` : `<span class="ph-ic">${ic('mic')}</span>`}<span class="ent">${esc(m.badge)}</span>
              <div class="cap"><small>${esc(m.level)}</small><h3>${esc(m.name)}</h3><p>${esc(m.quote)}</p></div></div>`;
            if (m.directive) body += `<div class="mp-sec directive"><small>${esc(m.directive.label)}</small><b>${esc(m.directive.title)}</b><p>${esc(m.directive.sub)}</p></div>`;
            if (m.report) body += `<div class="mp-sec"><h4>${esc(m.report.title)}</h4><div class="bx">${m.report.paragraphs.map(p => `<p style="margin-bottom:12px">${p}</p>`).join('')}</div></div>`;
            if (m.note) body += `<div class="mp-sec quote"><small>${esc(m.note.label)}</small>${esc(m.note.text)}</div>`;
            if (m.headline) body += `<div class="mp-headline">${esc(m.headline)}</div>`;
            if (m.role) body += `<div class="mp-sec"><h4>${esc(m.role.title)}</h4>${m.role.entries.map(en => `<div class="entry"><b>${esc(en.name)}</b>${en.text}</div>`).join('')}</div>`;
          }
          b.innerHTML = `<div class="mp-tabs">${S.members.map((x, i) => `<button class="mp-tab ${i === who ? 'on' : ''}" data-who="${i}">${ph(x.avatar, { cls: 'av', seed: x.name })}<span><b>${esc(x.name)}</b><small>${esc(x.tag)}</small></span></button>`).join('')}</div>
            <div class="mp-body"><div class="mp-sub"><button class="${tab === 'profile' ? 'on' : ''}" data-tab="profile"><i>01</i>PROFILE</button><button class="${tab === 'gallery' ? 'on' : ''}" data-tab="gallery"><i>02</i>GALLERY</button>
            <span class="r"><button data-song="${m.bgm}">♪ BGM</button><button data-song="${m.song}">♪ CHARACTER SONG</button></span></div>
            <div class="mp-scroll">${body}</div></div>`;
        };
        b.addEventListener('click', e => {
          const w = e.target.closest('[data-who]'); if (w) { who = +w.dataset.who; tab = 'profile'; draw(); return; }
          const t = e.target.closest('[data-tab]'); if (t) { tab = t.dataset.tab; draw(); return; }
          const s = e.target.closest('[data-song]'); if (s) load(+s.dataset.song);
        });
        draw();
      }
    });
  },

  /* ----- Messenger ----- */
  talk: () => {   // TALK : 왼쪽은 대화방 목록 (카톡처럼) · 방을 누르면 오른쪽에 대화 창
    const rec = openWin('talk', {
      cls: 'tkwin', icon: 'chat', title: 'TALK', sub: '채팅', task: 'TALK', x: 300, y: 90, w: 340, h: 620,
      render(b) {
        const me = TK_ME(), R = TK_ROOMS();
        const last = r => { const m = (r.messages || [])[r.messages.length - 1]; return m ? (m.from === 'me' ? '나: ' : m.name ? m.name + ': ' : '') + m.text : ''; };
        const grp = r => !!r.group || (r.messages || []).some(m => m.name);
        b.innerHTML = `<div class="tk">
          <div class="tk-top"><b>Talk</b><span class="tk-tbtn"><button type="button" class="cx-add tk-add" data-tkadd title="새 대화방">${ic('tkPen')}</button><button type="button" class="tk-x" data-tkx title="닫기">${ic('x')}</button></span></div>
          <div class="tk-search">${ic('search')}<input placeholder="검색" aria-label="대화방 검색"></div>
          <div class="tk-tabs"><button type="button" class="on" data-f="all">전체 ${R.reduce((a, r, i) => a + TK_UNREAD(i), 0) || ''}</button><button type="button" data-f="un">안 읽음</button><button type="button" data-f="grp">단톡</button></div>
          <div class="tk-list">${R.map((r, i) => `<div class="tk-row" data-room="${i}" data-grp="${grp(r) ? 1 : 0}" role="button" tabindex="0">${ph(r.avatar, { cls: 'tk-av', seed: r.name })}<div class="tk-tx"><b>${esc(r.name)}</b><p>${esc(last(r))}</p></div><div class="tk-meta"><small>${esc(r.time || '')}</small>${TK_UNREAD(i) ? `<i>${TK_UNREAD(i) > 99 ? '99+' : TK_UNREAD(i)}</i>` : ''}</div></div>`).join('')}</div>
          <nav class="tk-nav"><span class="on">${ic('chat')}채팅</span><span>${ic('tkUser')}친구</span><span>${ic('settings')}설정</span></nav></div>`;
        let F = 'all', Q = '';
        const filt = () => $$('.tk-row', b).forEach(r => { const i = +r.dataset.room, ok = (F === 'all' || (F === 'un' && TK_UNREAD(i)) || (F === 'grp' && r.dataset.grp === '1')) && (!Q || r.textContent.toLowerCase().includes(Q)); r.style.display = ok ? '' : 'none'; });
        b.addEventListener('click', e => {
          if (e.target.closest('[data-tkadd]')) { dispatchEvent(new CustomEvent('sye-talk', { detail: { i: null } })); return; }
          if (e.target.closest('[data-tkx]')) { closeWin('talkroom'); closeWin('talk'); return; }
          const f = e.target.closest('.tk-tabs [data-f]'); if (f) { F = f.dataset.f; $$('.tk-tabs button', b).forEach(x => x.classList.toggle('on', x === f)); filt(); return; }
          const r = e.target.closest('.tk-row'); if (r && !(SYE_ON && e.target.closest('[data-slot]'))) openTalkRoom(+r.dataset.room);
        });
        $('.tk-search input', b).addEventListener('input', e => { Q = e.target.value.trim().toLowerCase(); filt(); });
      }
    });
    tkPlace();
    return rec;
  },

  /* ----- Stage Monitor ----- */
  monitor: () => {
    const M = S.monitor;
    openWin('monitor', {
      icon: 'radar', icCls: '', title: M.title, sub: M.sub, x: 405, y: 121, w: 590, h: 606,
      render(b) {
        const zp = [[30, 25], [70, 25], [30, 74], [70, 74]];
        const pos = (z, dx, dy) => { const p = zp[Math.max(0, M.zones.indexOf(z))]; return [p[0] + dx, p[1] + dy]; };
        let [ax, ay] = pos(M.a.zone, 8, 4), [bx, by] = pos(M.b.zone, -12, -10);
        let dist = M.distance, gauge = M.gauge;
        b.innerHTML = `<div class="mon">
          <div class="bx"><div class="lbl">TRACKING<b><i class="led"></i>LIVE</b></div>
            <div class="radar"><div class="ring2"></div><div class="sweep"></div><svg viewBox="0 0 100 100" preserveAspectRatio="none"><line class="ln" x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" vector-effect="non-scaling-stroke"/></svg><i class="c"></i>
              ${M.zones.map((z, i) => `<span class="z" style="left:${zp[i][0]}%;top:${zp[i][1]}%">${esc(z)}</span>`).join('')}
              <span class="p a" style="left:${ax}%;top:${ay}%"><i></i>${esc(M.a.name)}</span><span class="p b" style="left:${bx}%;top:${by}%"><i></i>${esc(M.b.name)}</span></div>
            <div class="mon-stats"><div><small>거리</small><b class="dist">${dist}m</b></div><div><small>${esc(M.a.name)} 위치</small><b>${esc(M.a.zone)}</b></div><div><small>${esc(M.b.name)} 위치</small><b>${esc(M.b.zone)}</b></div></div></div>
          <div class="rc">
            <div class="bx"><div class="lbl">VITALS<span>TEMPO</span></div>
              ${[M.a, M.b].map((p, i) => `<div class="vital ${i ? 'b' : ''}">${ph(p.avatar, { cls: 'av', seed: p.name })}<div><b>${esc(p.name)}</b><small>${esc(p.tag)}</small></div><div class="bpm"><span data-bpm="${i}">${p.bpm}</span><small>♥ BPM</small></div>${ecg(260, 30)}</div>`).join('')}</div>
            <div class="bx gauge"><div class="lbl">ENCORE NEED<span>${esc(M.b.name)}</span></div>
              <svg viewBox="0 0 120 68"><path d="M12 62a48 48 0 0 1 96 0" fill="none" stroke="var(--soft2)" stroke-width="9" stroke-linecap="round"/><path class="g-arc" d="M12 62a48 48 0 0 1 96 0" fill="none" stroke="var(--red)" stroke-width="9" stroke-linecap="round" pathLength="100" stroke-dasharray="${gauge} 100" style="transition:stroke-dasharray .8s"/></svg>
              <div class="gv"><span class="gnum">${gauge}</span><small>%</small></div><span class="gl">${esc(M.gaugeLabel)}</span>
              <div class="sc">${M.scale.map(s => `<span>${esc(s)}</span>`).join('')}</div>
              <button class="btn-navy enc">${esc(M.button)}</button><div class="last">${esc(M.last)}</div></div>
          </div></div>
          <div class="mon-log">${M.log.map(l => `<div class="${l.warn ? 'warn' : ''}"><span>${esc(l.t)}</span>${esc(l.text)}</div>`).join('')}</div>
          <div class="mon-foot"><span><b>●</b> MONITORING</span><span>${esc(M.footer)}</span><span class="t"></span></div>`;
        const log = $('.mon-log', b);
        $('.enc', b).onclick = () => {
          const t = hms(new Date());
          log.insertAdjacentHTML('beforeend', `<div><span>${t}</span>${esc(M.button)} · 전송 완료</div>`); log.scrollTop = log.scrollHeight;
          gauge = 18; $('.g-arc', b).setAttribute('stroke-dasharray', `${gauge} 100`); $('.gnum', b).textContent = gauge;
          $('.gl', b).textContent = M.scale[0]; $('.gl', b).style.color = 'var(--mint2)'; $('.g-arc', b).setAttribute('stroke', 'var(--mint2)');
          $('.last', b).textContent = M.last.replace('—', t.slice(0, 5));
        };
        const iv = setInterval(() => {
          if (!document.body.contains(b)) return clearInterval(iv);
          $('.mon-foot .t', b).textContent = hms(new Date());
          if (Math.random() < .35) { dist += Math.random() < .5 ? 1 : -1; $('.dist', b).textContent = dist + 'm'; }
          $$('[data-bpm]', b).forEach((el, i) => el.textContent = [M.a, M.b][i].bpm + Math.round(Math.random() * 4 - 2));
          if (gauge < 100 && Math.random() < .3) { gauge = Math.min(100, gauge + 4); $('.g-arc', b).setAttribute('stroke-dasharray', `${gauge} 100`); $('.gnum', b).textContent = gauge; }
        }, 1000);
        $('.mon-foot .t', b).textContent = hms(new Date());
        setTimeout(() => { if (document.body.contains(b)) toast({ title: M.alert.title, text: M.alert.text, alert: true, icon: 'radar', act: M.alert.act, onClick: () => $('.enc', b)?.click() }); }, 1500);
      }
    });
  },

  /* ----- Pedal Board ----- */
  pedal: () => {
    const PD = S.pedal;
    openWin('pedal', {
      cls: 'pedalwin pb2', title: PD.title, x: 182, y: 78, w: 414, h: 688,
      head: `<div class="pd-head"><span class="tile">${ic('sliders')}</span><span><b>${esc(PD.title)}</b><small>${esc(PD.code)}</small></span><span class="st"><i class="led"></i>${esc(PD.status)}</span></div>`,
      render(b) {
        let sel = []; const found = new Set();
        const lum = c => { const h = (c || '#fff').replace('#', ''), n = parseInt(h.length === 3 ? h.split('').map(x => x + x).join('') : h, 16); return ((n >> 16) * .299 + ((n >> 8) & 255) * .587 + (n & 255) * .114) / 255; };
        const pedal = (it, cls = '') => `<span class="pb-ped ${cls} ${lum(it.color) > .62 ? 'lt' : 'dk'}" style="--c:${it.color}"><i class="pb-led"></i><span class="pb-kn"><i></i><i></i></span><b>${esc(it.en)}</b><span class="pb-fs"></span></span>`;
        b.innerHTML = `<div class="pb">
          <div class="pb-chain"><div class="pb-ch-h"><span>SIGNAL CHAIN</span><b class="dex">도감 0 / ${PD.total}</b></div>
            <div class="pb-rig"><span class="pb-jack"><i></i>IN</span><i class="pb-cable"></i>
              <div class="pb-slots">${[0, 1, 2].map(i => `<span class="pb-slot" data-s="${i}"><em>${pad(i + 1)}</em></span>`).join('<i class="pb-cable sm"></i>')}</div>
              <i class="pb-cable"></i><span class="pb-amp"><span class="pb-grill"></span><span class="pb-vu"><i></i></span><small>AMP</small></span></div>
            <div class="pb-stats">${PD.stats.map((s, i) => `<div><small>${esc(s.label)}</small><b><span class="sv" data-i="${i}">${Number(s.value).toFixed(s.fix)}</span><em>${esc(s.unit)}</em></b></div>`).join('')}</div></div>
          <p class="pb-mission"><span>오늘의 미션</span><b>${esc(PD.mission)}</b></p>
          <div class="pb-shelf-h"><b>페달 고르기</b><small>눌러서 연결 · 최대 3개</small></div>
          <div class="pb-shelf">${PD.items.map(it => `<button type="button" class="pb-pick" data-it="${it.key}">${pedal(it)}<span class="pb-nm"><b>${esc(it.name)}</b></span></button>`).join('')}</div>
          <div class="pb-act"><button type="button" class="go">${ic('music')}톤 만들기</button><button type="button" class="clr">비우기</button></div>
          <div class="pb-res"><i></i><span>${esc(PD.hint)}</span></div></div>`;
        const res = $('.pb-res', b);
        const slots = () => {
          $$('.pb-slot', b).forEach((s, i) => { const it = PD.items.find(x => x.key === sel[i]); s.classList.toggle('on', !!it); s.innerHTML = it ? pedal(it, 'sm') : `<em>${pad(i + 1)}</em>`; });
          const last = PD.items.find(x => x.key === sel.at(-1));
          $('.pb-vu i', b).style.width = sel.length / 3 * 100 + '%';
          $('.pb-amp', b).classList.toggle('live', sel.length === 3);
          $('.go', b).classList.toggle('ready', sel.length === 3);
          if (last) res.innerHTML = `<i style="--c:${last.color}"></i><span>${esc(last.name)} 연결 · ${sel.length}/3</span>`;
          else res.innerHTML = `<i></i><span>${esc(PD.hint)}</span>`;
        };
        b.addEventListener('click', e => {
          const it = e.target.closest('[data-it]'); if (it && sel.length < 3) { sel.push(it.dataset.it); slots(); it.classList.remove('hit'); void it.offsetWidth; it.classList.add('hit'); }
          const sl = e.target.closest('.pb-slot.on'); if (sl) { sel.splice(+sl.dataset.s, 1); slots(); }
          if (e.target.closest('.clr')) { sel = []; slots(); }
          if (e.target.closest('.go')) {
            if (sel.length < 3) { res.innerHTML = `<i></i><span>페달을 3개 연결해 주세요 ✦</span>`; return; }
            const key = [...sel].sort().join(), r = PD.recipes.find(x => [...x.combo].sort().join() === key) || PD.fail;
            const isNew = r !== PD.fail && !found.has(r.name); if (r !== PD.fail) found.add(r.name);
            $('.dex', b).textContent = `도감 ${found.size} / ${PD.total}`;
            const col = PD.items.find(x => x.key === sel[0]).color;
            sel = []; slots();
            res.classList.remove('pop'); void res.offsetWidth; res.classList.add('pop');
            res.innerHTML = `<i style="--c:${col}"></i><span><b>${esc(r.name)}</b>${isNew ? '<span class="new">NEW</span>' : ''}<small>${esc(r.desc)}</small></span>`;
          }
        });
        const iv = setInterval(() => {
          if (!document.body.contains(b)) return clearInterval(iv);
          $$('.sv', b).forEach(el => { const s = PD.stats[+el.dataset.i]; if (s.jitter) el.textContent = (s.value + Math.round(Math.random() * s.jitter * 2 - s.jitter)).toFixed(s.fix); });
        }, 1500);
      }
    });
  },

  /* ----- Memo ----- */
  memo: () => openWin('memo', {
    icon: 'file', icCls: 'cream', title: 'Memo', x: 182, y: 173, w: 317, h: 370,
    render(b) {
      let pg = 0; b.style.overflow = 'hidden';
      const draw = () => {
        const m = S.memo[pg];
        b.innerHTML = `<div class="memo"><div class="memo-tabs">${S.memo.map((x, i) => `<button class="${i === pg ? 'on' : ''}" data-pg="${i}">${esc(x.tab)}</button>`).join('')}</div>
          <div class="memo-b">${m.sections.map((s, si) => `<h4>${esc(s.title)}</h4>${s.note ? `<div class="note">${esc(s.note)}</div>` : ''}${s.items.map((it, i) => it.plain ? `<label style="padding-left:18px"><span>${esc(it.text)}</span></label>` : `<label><input type="checkbox" data-s="${si}" data-i="${i}" ${it.done ? 'checked' : ''}><span>${esc(it.text)}</span></label>`).join('')}`).join('')}</div>
          <div class="memo-pg"><button data-mv="-1">‹</button>${pg + 1} / ${S.memo.length}<button data-mv="1">›</button></div></div>`;
      };
      b.addEventListener('click', e => {
        const t = e.target.closest('[data-pg]'); if (t) { pg = +t.dataset.pg; draw(); }
        const mv = e.target.closest('[data-mv]'); if (mv) { pg = (pg + +mv.dataset.mv + S.memo.length) % S.memo.length; draw(); }
      });
      b.addEventListener('change', e => { const d = e.target.dataset; if (d.i != null) S.memo[pg].sections[d.s].items[d.i].done = e.target.checked; });
      draw();
    }
  }),

  /* ----- Player ----- */
  player: () => openWin('player', {
    cls: 'mglass', icon: 'music', title: 'NOW PLAYING', task: 'Player', x: 686, y: 53, w: 336, h: 738,
    render(b) {
      // 민트 유리 플레이어 : 큰 표지 · 제목 · 진행 막대 · ◀ ▶ ▶ · 가사 한 줄 · 곡 목록 (표지 사진은 글씨 없이)
      const mini = (t, i) => SRC(t.cover) ? `<img src="${esc(SRC(t.cover))}" alt="">` : `<i style="filter:hue-rotate(${(i % 3) * -14}deg) brightness(${1 + (i % 3) * .06})"></i>`;
      b.innerHTML = `<div class="mplayer mg"><div class="mg-glow"></div><div class="mp-art"></div>
        <div class="mp-np"><div><h4></h4><p></p></div><span class="mg-heart">${ic('heart')}</span></div>
        <div class="mp-prog"><div class="bar"><i></i></div><div class="mg-t"><span class="t1">0:00</span><span class="t2">0:00</span></div></div>
        <div class="mp-ctrl"><button data-p="prev">${ic('prev')}</button><button class="big" data-p="tog"></button><button data-p="next">${ic('next')}</button></div>
        <div class="mp-lyric"></div>
        <div class="mp-list">${S.bgm.map((t, i) => t.src ? `<button data-t="${i}"><span class="mg-mini">${mini(t, i)}</span><span class="mg-tt">${esc(t.title.replace(/^Snow Rehearsal \((.*)\)$/, '$1'))}</span><em>${esc(t.time || '')}</em><span class="mg-eq"><i></i><i></i><i></i></span></button>` : '').join('')}</div>
        <div class="mp-vol">${ic('vol')}<input type="range" min="0" max="1" step=".01" value="${audio.volume}"></div></div>`;
      b.addEventListener('click', e => {
        const p = e.target.closest('[data-p]');
        if (p) ({ tog: toggle, prev: () => load(PL.i - 1), next: () => load(nextI()) })[p.dataset.p]();
        const t = e.target.closest('[data-t]'); if (t) load(+t.dataset.t);
        const pr = e.target.closest('.mp-prog .bar'); if (pr) { const r = pr.getBoundingClientRect(), f = (e.clientX - r.left) / r.width; PL.pos = f * dur(); if (cur().src) audio.currentTime = PL.pos; syncProgress(); }
      });
      $('input[type=range]', b).oninput = e => audio.volume = e.target.value;
      syncPlayer();
    }
  }),

  /* ----- Neighbors ----- */
  neighbors: () => openWin('neighbors', {
    cls: 'browser', noBtns: true, title: 'Neighbors', x: 681, y: 68, w: 337, h: 559,
    head: `<span class="dots3"><i data-a="close" title="닫기"></i><i data-a="min" title="최소화"></i><i></i></span><span class="btab on">${ic('heart')}Neighbors</span>`,
    render(b) {
      const N = S.neighbors;
      b.innerHTML = `<div class="nb"><div class="addr">${ic('page')}moon://neighbors <small>/link</small></div>
        <a class="nb-card mine" href="${esc(N.mine.link || '#')}"><div class="nb-h"><span>✦ MY STUDIO · BANNER EXCHANGE</span><i></i></div>${ph(N.mine.banner, { cls: 'nb-ban', label: S.title.before + 'I' + S.title.after, seed: 'mine' })}
          <div class="nb-f"><div><b>${esc(N.mine.name)}</b><p>${esc(N.mine.desc)}</p></div>${barcode(62, 20, 'mine')}</div></a>
        <div class="nb-sec">NEIGHBORS</div>
        ${N.list.map(n => `<a class="nb-card" href="${esc(n.link)}" target="_blank" rel="noopener"><div class="nb-h"><span>✦ REFERRAL No.${esc(n.no)}</span><i></i></div>${ph(n.banner, { cls: 'nb-ban', seed: n.name, icon: 'heart' })}
          <div class="nb-f"><div><b>${esc(n.name)}</b><p>${esc(n.desc)}</p></div>${barcode(62, 20, n.name)}</div></a>`).join('')}</div>`;
    }
  }),

  /* ----- Internet ----- */
  internet: () => {
    const F = S.internet.flix, G = S.internet.stats; let tab = 'flix', hero = 0;
    const head = () => `<span class="dots3"><i data-a="close" title="닫기"></i><i data-a="min" title="최소화"></i><i></i></span>
      <span class="btab ${tab === 'flix' ? 'on' : ''}" data-bt="flix"><span class="fav" style="background:#111">${esc(F.name[0])}</span>${esc(F.name)}</span>
      <span class="btab ${tab === 'gg' ? 'on' : ''}" data-bt="gg"><span class="fav" style="background:#2799A9">${esc(G.name[0])}</span>${esc(G.name)}</span>`;
    openWin('internet', {
      cls: 'browser', noBtns: true, title: 'Internet', x: 218, y: 72, w: 598, h: 637, head: head(),
      render(b, rec) {
        b.style.overflow = 'hidden';
        const draw = () => {
          $('.win-h', rec.el).innerHTML = head();
          const h = hero ? F.hero2 : F.hero;
          const page = tab === 'flix'
            ? `<div class="flix"><div class="flix-nav"><b>${esc(F.name)}</b><span>홈</span><span>시리즈</span><span>영화</span><span>내가 찜한</span>${ph('', { cls: 'av', seed: 'me' })}</div>
                <div class="flix-hero ph ${hero ? 'v4' : 'v3'}" data-slot="${esc(SPATH(h.image))}">${SRC(h.image) ? `<img src="${esc(SRC(h.image))}" alt="">` : ''}${h.big ? `<div class="big">${esc(h.big[0])}<em>${esc(h.big[1])}</em><small>${esc(h.sub || '')}</small></div>` : ''}
                  <div class="cap"><span class="bd">${esc(h.badge)}</span><h3>${esc(h.title)}</h3><p>${esc(h.meta)}</p><div class="bar"><i style="width:${h.progress}%"></i></div><span class="tm">${esc(h.time)}</span></div>
                  <div class="act"><button>▶ 이어보기</button><button>+ 찜</button></div></div>
                <div class="flix-row"><h5>${esc(F.viewer)} 님이 시청 중인 콘텐츠</h5><div class="r">${F.row.map((r, i) => `<div class="it ${(hero ? 3 : 0) === i ? 'on' : ''}" data-row="${i}">${ph(r.image, { seed: r.title, icon: 'mic', style: `--w:${r.w || 40}%` })}<b>${esc(r.title)}</b><small>${esc(r.meta)}</small></div>`).join('')}</div></div></div>`
            : `<div class="gg"><div class="gg-nav">${esc(G.name)}<span>${esc(G.player)}</span></div>
                <div class="gg-prof">${ph('', { cls: 'av', seed: G.player })}<div><h4>${esc(G.player)}</h4><small>${esc(G.sub)}</small><span class="tag">전적 갱신</span></div>
                  <div class="gg-tier"><span class="gem"></span><div><b>${esc(G.tier)}</b><small>${esc(G.lp)}</small></div></div>
                  <div class="gg-rate" style="background:conic-gradient(var(--blue) ${G.rate}%,var(--red) 0)"><span><span>${G.rate}%<small>${esc(G.rateSub)}</small></span></span></div></div>
                <div class="gg-h">최근 티켓팅</div>
                ${G.history.map(m => `<div class="gg-m ${m.win ? '' : 'lose'}"><div><b>${esc(m.result)}</b><small>${esc(m.mode)}<br>${esc(m.min)}</small></div><span class="ic">${esc(m.icon)}</span><span>${esc(m.role)}</span><span class="sc">${esc(m.score)}<small>K/D/A</small></span><span class="df">${esc(m.diff)}</span></div>`).join('')}
                <div class="gg-tip"><small>${esc(G.tip.label)}</small><b>${esc(G.tip.title)}</b><p>${esc(G.tip.text)}</p><span class="by">${esc(G.tip.by)}</span></div></div>`;
          b.innerHTML = `<div class="br"><div class="br-url"><span class="nav2">${ic('chevl')}${ic('chevr')}${ic('refresh')}</span><span class="u">${ic('page')}<b>${esc(tab === 'flix' ? F.domain : G.domain)}</b>${esc(tab === 'flix' ? F.path : G.path)}</span></div><div class="br-page">${page}</div></div>`;
        };
        rec.el.addEventListener('click', e => {
          const t = e.target.closest('[data-bt]'); if (t) { tab = t.dataset.bt; draw(); }
          const r = e.target.closest('[data-row]'); if (r) { hero = +r.dataset.row === 3 ? 1 : 0; draw(); }
        });
        b.addEventListener('mouseover', e => { if (!matchMedia('(hover:hover)').matches) return; const r = e.target.closest('[data-row]'); if (r) { const nh = +r.dataset.row === 3 ? 1 : 0; if (nh !== hero) { hero = nh; draw(); } } });
        draw();
      }
    });
  },

  /* ----- Game ----- */
  game: () => openWin('game', {
    cls: 'gamewin', title: S.game.name, x: 68, y: 72, w: 899, h: 618,
    head: `<span class="game-lg">${esc(S.game.logo)}</span><span class="game-tt">${esc(S.game.name)}</span><span class="game-st">CLIENT</span>`,
    render(b) {
      const G = S.game; b.style.overflow = 'hidden';
      b.innerHTML = `<div class="game"><div class="game-top"><button class="play">PLAY</button><nav><b>홈</b><span>전적</span><span>컬렉션</span><span>상점</span></nav>
          <div class="cur"><span class="g1">${esc(G.coins)}</span><span class="g2">${esc(G.gems)}</span><span class="me">${ph('', { cls: 'av', seed: G.player })}<span>${esc(G.player)}<small>${esc(G.lv)}</small></span></span></div></div>
        <div class="game-main"><div class="game-news"><small>${esc(G.patch)}</small><h3>${esc(G.mode)}</h3><div class="en">${esc(G.modeEn)}</div><p>${esc(G.desc)}</p><button class="gplay">지금 플레이 ›</button><div class="orb"><span>✦</span></div></div>
          <div class="game-hist"><b>최근 전적</b><span style="color:#728F93;font-size:8px">${esc(G.mode)}</span><div class="gh">아직 전적이 없어요. 게임을 플레이하세요.</div></div></div>
        <div class="game-fr"><h6>${esc(G.social)}</h6>${G.friends.map(f => `<div class="f ${f.on ? 'on' : 'off'}">${ph('', { cls: 'av', seed: f.name })}<span>${esc(f.name)}<small>${esc(f.status)}</small></span></div>`).join('')}</div></div>`;
      let plays = 0;
      b.addEventListener('click', e => {
        if (e.target.closest('.play,.gplay')) {
          plays++; const sc = 80 + Math.floor(Math.random() * 20);
          $('.gh', b).innerHTML = `<span style="color:var(--mint)">${esc(G.mode)} · 승리</span> &nbsp; 떼창 게이지 ${sc}% · ${plays}판째 — 앵콜을 지켜냈어요!`;
        }
      });
    }
  }),

  /* ----- Link Hub ----- */
  links: () => openWin('links', {
    cls: 'hub lha', title: 'Link Hub', x: 645, y: 108, w: 348, h: 600, noBtns: true, head: `<span class="cw-drag"></span>`,
    render(b) {
      const L = S.links || [];
      b.innerHTML = `<div class="lha-w"><div class="lha-hd"><span class="lha-num">06</span><div><small>LINK HUB</small><b>LINKS</b><em>RECORD SHELF // TAP TO GO</em></div><button type="button" class="lha-x" data-a="close" title="닫기">${ic('x')}</button></div><div class="lha-dash"></div>
        <div class="lha-gr">${L.map((l, i) => `<a class="lha-it c${i % 6}" href="${esc(l.url)}" target="_blank" rel="noopener"><span class="lha-sl"><i class="lha-vn"></i><span class="lha-cv">${ph(l.image, { cls: 'th', seed: l.name + i })}<em>Nº${pad(i + 1)}</em></span></span><b>${esc(l.name)}</b><p>${esc(l.desc)}</p></a>`).join('')}</div>
        <div class="lha-f"><span>✦ ${esc(S.brand.start)} PERSONAL DIRECTORY</span><span>${L.length} LINKS</span></div></div>`;
      b.addEventListener('click', e => { if (SYE_ON && e.target.closest('.lha-it')) e.preventDefault(); }, true);   // 편집 중에는 링크로 안 넘어가요 (사진 넣기 · 글자 고치기)
    }
  })
};


(function(){const st=document.createElement('style');st.textContent=`
/* ---------- 캐릭터 정리 창 ---------- */
.win.charwin,.win.chardet{border-radius:20px;background:var(--card);overflow:hidden}
.win.charwin::before,.win.chardet::before{content:"";position:absolute;left:24px;right:24px;top:0;height:3px;border-radius:0 0 3px 3px;background:linear-gradient(90deg,var(--mint),var(--navy));z-index:3}
.win.charwin .win-h,.win.chardet .win-h{position:absolute;left:0;right:0;top:0;height:46px;border:0;background:transparent;z-index:4;padding:0 10px 0 0;justify-content:flex-end}
.win.charwin .win-h .cw-drag,.win.chardet .win-h .cw-drag{flex:1;height:100%}
.win.charwin .win-btns button,.win.chardet .win-btns button{width:26px;height:26px;border-radius:50%;background:var(--card);border:1px solid var(--line)}
.win.charwin .win-b,.win.chardet .win-b{overflow:hidden}
.cw{display:flex;height:100%;padding:14px 12px 12px 10px;gap:10px}
.cw-strip{flex:none;width:22px;border-radius:11px;background:radial-gradient(var(--mint) 1px,transparent 1.3px) 0 0/6px 6px,color-mix(in srgb,var(--mint) 22%,var(--card));border:1px solid color-mix(in srgb,var(--mint) 60%,transparent);display:flex;flex-direction:column;align-items:center;padding-top:10px;gap:8px;overflow:hidden}
.cw-strip b{font:800 11px var(--disp);color:var(--navy)}
body.dark .cw-strip b{color:#fff}
.cw-strip span{writing-mode:vertical-rl;font:700 7.5px var(--mono);letter-spacing:.32em;color:var(--blue2);white-space:nowrap}
.cw-main{flex:1;min-width:0;display:flex;flex-direction:column;overflow:auto}
.cw-head{display:flex;align-items:center;gap:10px;padding:16px 0 12px;border-bottom:1.5px dashed var(--line)}
.cw-no{font:900 44px/1 var(--disp);letter-spacing:-.06em;color:var(--navy);-webkit-mask:linear-gradient(#000 52%,transparent 52%),radial-gradient(#000 1.1px,transparent 1.4px) 0 0/4px 4px;mask:linear-gradient(#000 52%,transparent 52%),radial-gradient(#000 1.1px,transparent 1.4px) 0 0/4px 4px}
body.dark .cw-no{color:#D3EEF1}
.cw-head h3{font:900 15px/1.05 var(--disp);color:var(--navy);letter-spacing:.01em}
body.dark .cw-head h3{color:#fff}
.cw-head h3 i{display:inline-block;width:4px;height:9px;margin-left:5px;vertical-align:1px;background:radial-gradient(circle,var(--mint2) 1.6px,transparent 1.9px) 0 0/4px 4.5px}
.cw-head small{display:block;margin-top:5px;font:700 7px var(--mono);letter-spacing:.24em;color:var(--blue2)}
.cw-tabs{display:flex;flex-wrap:wrap;gap:5px;margin-top:12px}
.cw-tabs button{height:24px;padding:0 11px;border-radius:999px;border:1px solid var(--line);font:700 8.5px var(--mono);letter-spacing:.06em;color:var(--ink)}
.cw-tabs button.on{background:var(--navy);border-color:var(--navy);color:#fff}
.cw-add{display:flex;justify-content:flex-end;margin-top:9px}
.cw-addbtn{height:24px;padding:0 12px;border-radius:999px;border:1.5px dashed var(--blue);color:var(--blue2);font:700 8.5px var(--sans)}
.cw-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:12px}
.cw-card{position:relative;aspect-ratio:3/4;border-radius:10px;overflow:hidden;padding:0;box-shadow:0 0 0 0 var(--navy);transition:transform .2s,box-shadow .2s}
.cw-card .ph{position:absolute;inset:0}
.cw-card .ph::after{display:none}
.cw-card:hover{transform:translateY(-2px)}
.cw-card.on{box-shadow:0 0 0 2px var(--card),0 0 0 4px var(--navy)}
.cw-cap{position:absolute;left:0;right:0;bottom:0;padding:22px 7px 7px;text-align:left;color:#fff;background:linear-gradient(transparent,rgba(14,29,34,.7))}
.cw-cap small{display:block;font:500 6.5px var(--sans);opacity:.9}
.cw-cap b{display:block;font:800 10.5px var(--sans);margin-top:1px}
.cw-cap em{display:block;font:500 6.5px var(--mono);font-style:normal;letter-spacing:.06em;opacity:.85}
.cw-empty{margin-top:12px;padding:16px 12px;border:1.5px dashed var(--line);border-radius:10px;font:600 7.5px var(--mono);letter-spacing:.14em;color:var(--ink3)}
.win.chardet .win-b{display:flex;flex-direction:column;padding:10px 10px 10px}
.cd-head{position:relative;padding:12px 14px;border-radius:14px;background:var(--card);box-shadow:0 0 0 1px var(--line),0 6px 14px -10px rgba(34,78,92,.3)}
.cd-head small{display:block;font:700 6.5px var(--sans);letter-spacing:.06em;color:var(--blue2)}
.cd-head b{display:block;font:800 16px var(--sans);color:var(--ink);margin-top:3px}
.cd-head span{display:block;font:600 9px var(--sans);color:var(--ink2)}
.cd-head em{display:block;font:600 8.5px var(--sans);color:var(--blue2);margin-top:3px}
.cd-tags{display:flex;gap:4px;margin-top:8px}
.cd-tags i{font:600 7px var(--sans);font-style:normal;height:17px;display:inline-flex;align-items:center;padding:0 8px;border-radius:999px;background:var(--soft2);color:var(--navy)}
.cd-tags i.ed{background:none;border:1px solid var(--line);color:var(--ink2)}
.cd-stand{flex:1;margin-top:10px;border-radius:14px;overflow:hidden;position:relative;min-height:0}
.cd-stand .ph{position:absolute;inset:0}
.cd-stand .ph::after{display:none}
.cd-panel{flex:1;min-height:0;margin-top:10px;border-radius:14px;background:var(--card);box-shadow:0 0 0 1px var(--line);display:flex;flex-direction:column;overflow:hidden}
.cd-tabs{display:grid;grid-template-columns:repeat(4,1fr);gap:3px;margin:8px;padding:3px;border-radius:9px;background:var(--soft)}
.cd-tabs button{height:22px;border-radius:7px;font:700 7px var(--mono);letter-spacing:.12em;color:var(--ink3)}
.cd-tabs button.on{background:var(--card);color:var(--blue2);box-shadow:0 1px 4px rgba(0,0,0,.08)}
.cd-body{flex:1;overflow:auto;padding:0 10px 12px;font-size:9.5px;color:var(--ink)}
.cd-body p{line-height:1.7;margin:4px 0 6px}
.cd-sec{font:700 7px var(--mono);letter-spacing:.14em;color:var(--blue2);margin:8px 0 5px}
.cd-rows div{display:grid;grid-template-columns:80px 1fr;padding:6px 0;border-bottom:1px solid var(--line)}
.cd-rows span{color:var(--ink3);font-size:8.5px}
.cd-rows b{font-weight:600}
.cd-pr{border:1px solid var(--line);border-radius:9px;margin-bottom:7px;overflow:hidden}
.cd-pr-h{display:flex;justify-content:space-between;align-items:center;padding:7px 9px;background:color-mix(in srgb,var(--mint) 14%,var(--card));font-weight:700}
.cd-pr-h button,.cd-copyall{height:18px;padding:0 9px;border-radius:999px;background:var(--navy);color:#fff;font:700 7px var(--mono);letter-spacing:.12em}
.cd-pr-b{padding:9px;color:var(--ink2)}
.cd-copyall{height:22px;padding:0 12px}
.cd-song{display:flex;align-items:center;gap:9px;width:100%;padding:8px 6px;border-bottom:1px solid var(--line);text-align:left}
.cd-song span{font:600 7.5px var(--mono);color:var(--ink3)}
.cd-song b{flex:1;font-size:10px}
.cd-song small{display:block;font-weight:400;font-size:7.5px;color:var(--ink3)}
.cd-song svg{width:10px;height:10px;color:var(--blue2)}
.cd-talk{border:1px solid var(--line);border-radius:10px;padding:9px;margin-top:8px}
.cd-talk-h{display:flex;align-items:center;gap:8px}
.cd-talk-h .av{width:24px;height:24px;border-radius:50%;flex:none}
.cd-talk-h .av::after{display:none}
.cd-talk-h div{flex:1}
.cd-talk-h b{font-size:9.5px}
.cd-talk-h b i{font:700 5.5px var(--mono);font-style:normal;letter-spacing:.1em;margin-left:4px;padding:2px 5px;border-radius:4px;background:color-mix(in srgb,var(--blue) 18%,var(--card));color:var(--blue2);vertical-align:1px}
.cd-talk-h small{display:block;font-size:7px;color:var(--ink3)}
.cd-talk-h > span{font:700 7.5px var(--mono);color:var(--blue2)}
.cd-rep{margin-top:5px;padding:6px 8px;border-radius:6px;background:color-mix(in srgb,var(--mint) 16%,var(--card));font-size:8.5px}
.cd-rep.b{background:var(--soft)}
.cd-foot{display:flex;align-items:center;gap:8px;margin-top:10px;padding:5px 5px 5px 6px;border-radius:999px;background:var(--card);box-shadow:0 0 0 1px var(--line)}
.cd-play{width:24px;height:24px;border-radius:50%;background:var(--soft2);color:var(--navy);display:grid;place-items:center;flex:none}
.cd-play svg{width:9px;height:9px}
.cd-foot span{flex:1;min-width:0;font-size:8.5px;color:var(--ink2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cd-toggle{flex:none;height:26px;padding:0 12px;border-radius:999px;background:var(--navy);color:#fff;font:700 7.5px var(--mono);letter-spacing:.14em}
`;document.head.appendChild(st);})();
(function(){const st=document.createElement('style');st.textContent=`
/* ---------- 캐릭터 정리 창 · 도면 스타일 ---------- */
.win.cxwin,.win.cydet{border-radius:16px;background:#F8FDFE;background-image:linear-gradient(rgba(46,179,197,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(46,179,197,.07) 1px,transparent 1px);background-size:14px 14px}
body.dark .win.cxwin,body.dark .win.cydet{background-color:#152327}
.win.cxwin::after,.win.cydet::after{content:"";position:absolute;inset:8px;border:1.2px solid rgba(53,196,216,.45);border-radius:10px;pointer-events:none}
.win.cxwin .win-h,.win.cydet .win-h{position:absolute;left:0;right:0;top:0;height:44px;border:0;background:transparent;z-index:4;padding:0 16px 0 0;justify-content:flex-end}
.win.cxwin .cw-drag,.win.cydet .cw-drag{flex:1;height:100%}
.win.cxwin .win-btns button,.win.cydet .win-btns button{width:24px;height:24px;border-radius:50%;background:#fff;border:1px solid var(--line)}
.win.cxwin .win-b,.win.cydet .win-b{overflow:hidden}
.cx{display:flex;flex-direction:column;height:100%;padding:20px 22px 18px}
.cx-top small{display:block;font:700 6.5px var(--mono);letter-spacing:.22em;color:var(--blue2)}
.cx-top h3{font:900 21px/.95 var(--disp);letter-spacing:-.03em;color:var(--navy);margin-top:5px}
body.dark .cx-top h3{color:#fff}
.cx-top h3 i{font-style:normal;color:var(--mint2)}
.cx-tabs{display:flex;gap:5px;margin-top:12px}
.cx-tabs button{display:flex;align-items:center;gap:5px;height:24px;padding:0 9px;border-radius:5px;border:1.2px solid rgba(53,196,216,.4);background:#fff;font:700 8.5px var(--mono);letter-spacing:.06em;color:var(--blue2)}
.cx-tabs button svg{width:10px;height:10px}
.cx-tabs button em{font-style:normal;font-size:7px;opacity:.6}
.cx-tabs button.on{background:var(--blue);border-color:var(--blue);color:#fff}
.cx-meta{display:flex;justify-content:space-between;align-items:center;margin-top:10px}
.cx-meta span{font:700 6.5px var(--mono);letter-spacing:.2em;color:var(--ink3)}
.cx-add{height:22px;padding:0 9px;border-radius:5px;border:1.2px dashed var(--blue);background:#fff;color:var(--blue2);font:700 8px var(--sans)}
.cx-scroll{flex:1;min-height:0;overflow:auto;margin:6px -6px 0;padding:6px}
.cx-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px 9px}
.cx-card{position:relative;padding:6px;text-align:left}
.cx-card .k{position:absolute;width:8px;height:8px;border:0 solid var(--blue)}
.cx-card .k.tl{left:0;top:0;border-width:1.2px 0 0 1.2px}.cx-card .k.tr{right:0;top:0;border-width:1.2px 1.2px 0 0}
.cx-card .k.bl{left:0;bottom:0;border-width:0 0 1.2px 1.2px}.cx-card .k.br{right:0;bottom:0;border-width:0 1.2px 1.2px 0}
.cx-ph{aspect-ratio:4/5;border-radius:3px;transition:transform .2s}
.cx-ph::after{display:none}
.cx-card:hover .cx-ph{transform:translateY(-2px)}
.cx-card.on .cx-ph{box-shadow:0 0 0 2px #fff,0 0 0 3.5px var(--mint2)}
.cx-nm{display:flex;align-items:center;gap:4px;margin-top:6px;font:800 9.5px var(--sans);color:var(--ink);white-space:nowrap;overflow:hidden}
.cx-nm b{flex:none;width:14px;height:14px;border-radius:50%;border:1.2px solid var(--blue);display:grid;place-items:center;font:800 6px var(--disp);color:var(--blue2)}
.cx-card small{display:block;margin-top:2px;font:600 5.5px var(--mono);letter-spacing:.06em;color:var(--ink3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cx-empty{padding:16px 12px;border:1.2px dashed rgba(53,196,216,.4);border-radius:6px;background:#fff;font:600 7px var(--mono);letter-spacing:.14em;color:var(--ink3)}
.cx-foot{display:grid;grid-template-columns:1fr 1fr 1fr;border:1.2px solid rgba(53,196,216,.45);background:#fff;margin-top:8px}
.cx-foot div{padding:6px 8px}
.cx-foot div+div{border-left:1.2px solid rgba(53,196,216,.3)}
.cx-foot small{display:block;font:700 5.5px var(--mono);letter-spacing:.2em;color:var(--ink3)}
.cx-foot b{display:block;font:800 9px var(--disp);color:var(--navy);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.win.cydet .win-b{display:flex;flex-direction:column;padding:18px 20px 18px}
.cy-top small{font:700 6.5px var(--mono);letter-spacing:.22em;color:var(--blue2)}
.cy-hero{display:flex;gap:12px;margin-top:12px;align-items:flex-start}
.cy-photo{position:relative;flex:none;width:118px;padding:5px}
.cy-photo .ph{aspect-ratio:3/4;border-radius:3px}
.cy-photo .ph::after{display:none}
.cy-photo .k,.cy-stand .k{position:absolute;width:9px;height:9px;border:0 solid var(--blue)}
.cy-photo .k.tl,.cy-stand .k.tl{left:0;top:0;border-width:1.3px 0 0 1.3px}.cy-photo .k.tr,.cy-stand .k.tr{right:0;top:0;border-width:1.3px 1.3px 0 0}
.cy-photo .k.bl,.cy-stand .k.bl{left:0;bottom:0;border-width:0 0 1.3px 1.3px}.cy-photo .k.br,.cy-stand .k.br{right:0;bottom:0;border-width:0 1.3px 1.3px 0}
.cy-info{flex:1;min-width:0;padding-top:6px}
.cy-info small{display:block;font:700 6px var(--mono);letter-spacing:.14em;color:var(--blue2)}
.cy-info > b{display:block;font:800 16px/1.15 var(--sans);color:var(--ink);margin-top:3px}
.cy-info > span{display:block;font:600 8px var(--sans);color:var(--ink2);margin-top:1px}
.cy-info em{display:block;font:600 8.5px var(--sans);font-style:normal;color:var(--blue2);margin-top:5px}
.cy-info .cd-tags{display:flex;gap:4px;margin-top:6px}
.cy-info .cd-tags i{font:600 6.5px var(--sans);font-style:normal;padding:2px 6px;border-radius:3px;background:#fff;border:1px solid rgba(53,196,216,.4);color:var(--blue2)}
.cy-info .cd-tags i.ed{border-color:var(--line);color:var(--ink2)}
.cy-spec{display:grid;grid-template-columns:1fr 1fr;gap:6px 8px;margin-top:10px;padding-top:8px;border-top:1.2px solid rgba(53,196,216,.3)}
.cy-spec small{font:700 5.5px var(--mono);letter-spacing:.18em;color:var(--ink3)}
.cy-spec b{display:block;font:800 10px var(--disp);color:var(--navy);margin-top:1px}
body.dark .cy-spec b,body.dark .cy-info > b{color:#fff}
.cy-tabs{display:grid;grid-template-columns:repeat(4,1fr);margin-top:12px;border:1.2px solid rgba(53,196,216,.45);background:#fff}
.cy-tabs button{height:24px;font:700 7px var(--mono);letter-spacing:.14em;color:var(--blue2)}
.cy-tabs button+button{border-left:1.2px solid rgba(53,196,216,.3)}
.cy-tabs button.on{background:var(--blue);color:#fff}
.cy-body{flex:1;min-height:0;overflow:auto;margin-top:8px;font-size:9.5px;color:var(--ink)}
.cy-body p{line-height:1.7;margin:3px 0 6px}
.cy-body .cd-sec{font:700 7px var(--mono);letter-spacing:.14em;color:var(--blue2);margin:8px 0 4px}
.cy-body .cd-rows div{display:grid;grid-template-columns:80px 1fr;padding:6px 0;border-bottom:1px dashed rgba(53,196,216,.3)}
.cy-body .cd-rows span{color:var(--ink3);font-size:8.5px}
.cy-body .cd-rows b{font-weight:600}
.cy-body .cd-pr{border:1.2px solid rgba(53,196,216,.45);background:#fff;margin-bottom:7px}
.cy-body .cd-pr-h{display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:#eaf8f2;font-weight:700}
.cy-body .cd-pr-h button,.cy-body .cd-copyall{height:17px;padding:0 8px;background:var(--blue);color:#fff;font:700 6.5px var(--mono);letter-spacing:.12em}
.cy-body .cd-pr-b{padding:8px;color:var(--ink2)}
.cy-body .cd-copyall{height:22px;padding:0 12px}
.cy-body .cd-song{display:flex;align-items:center;gap:9px;width:100%;padding:8px 6px;border-bottom:1px dashed rgba(53,196,216,.3);text-align:left}
.cy-body .cd-song span{font:600 7.5px var(--mono);color:var(--ink3)}
.cy-body .cd-song b{flex:1;font-size:10px}
.cy-body .cd-song small{display:block;font-weight:400;font-size:7.5px;color:var(--ink3)}
.cy-body .cd-song svg{width:10px;height:10px;color:var(--blue2)}
.cy-body .cd-talk{border:1px solid var(--line);border-radius:5px;background:#fff;padding:9px;margin-bottom:7px}
.cy-body .cd-talk-h{display:flex;align-items:center;gap:7px}
.cy-body .cd-talk-h .av{width:22px;height:22px;border-radius:50%;flex:none}
.cy-body .cd-talk-h .av::after{display:none}
.cy-body .cd-talk-h div{flex:1}
.cy-body .cd-talk-h b{font-size:9.5px}
.cy-body .cd-talk-h b i{font:700 5.5px var(--mono);font-style:normal;letter-spacing:.1em;margin-left:4px;padding:2px 4px;border-radius:3px;background:#E6F7FA;color:var(--blue2);vertical-align:1px}
.cy-body .cd-talk-h small{display:block;font-size:7px;color:var(--ink3)}
.cy-body .cd-talk-h > span{font:700 7.5px var(--mono);color:var(--blue2)}
.cy-body .cd-rep{margin-top:5px;padding:6px 8px;border-radius:3px;background:#eaf8f2;font-size:8.5px}
.cy-body .cd-rep.b{background:var(--soft)}
.cy-stand{position:relative;flex:1;min-height:0;margin-top:12px;padding:6px}
.cy-stand .ph{position:absolute;inset:6px;border-radius:3px}
.cy-stand .ph::after{display:none}
.cy-stand-cap{position:absolute;left:6px;right:6px;bottom:6px;padding:30px 12px 10px;color:#fff;background:linear-gradient(transparent,rgba(14,29,34,.7))}
.cy-stand-cap small{display:block;font:700 6px var(--mono);letter-spacing:.14em;opacity:.9}
.cy-stand-cap b{display:block;font:800 16px var(--sans);margin-top:2px}
.cy-stand-cap span{font:600 8px var(--sans);opacity:.85}
.cy-foot{display:flex;align-items:center;gap:7px;margin-top:10px;padding:4px;border:1.2px solid rgba(53,196,216,.45);background:#fff;border-radius:5px}
.cy-foot .cd-play{width:22px;height:22px;border-radius:3px;background:var(--soft2);color:var(--navy);display:grid;place-items:center;flex:none}
.cy-foot .cd-play svg{width:8px;height:8px}
.cy-foot span{flex:1;min-width:0;font-size:8px;color:var(--ink2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cy-foot .cd-toggle{flex:none;height:22px;padding:0 10px;border-radius:3px;background:var(--blue);color:#fff;font:700 6.5px var(--mono);letter-spacing:.14em}
`;document.head.appendChild(st);})();
(function(){const st=document.createElement('style');st.textContent=`
/* 캐릭터 창 수정: 꺾쇠 없음 · 카드형 목록 · 사진 보기 */
.cx-card{background:#fff;border:1.2px solid rgba(53,196,216,.35);padding:5px 5px 7px}
body.dark .cx-card{background:#1A2B31}
.cx-card .k,.cy-photo .k{display:none}
.cy-photo{padding:0}
.cy-foot > i{flex:1}
.cy-photoview{flex:1;min-height:0;margin-top:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:14px;border:1.2px solid rgba(53,196,216,.45);background:#fff}
body.dark .cy-photoview{background:#1A2B31}
.cy-pv{width:min(100%,250px);aspect-ratio:4/5;position:relative}
.cy-pv .ph{position:absolute;inset:0;border-radius:3px}
.cy-pv .ph::after{display:none}
.cy-pv-cap{text-align:center;margin-top:12px}
.cy-pv-cap small{display:block;font:700 6px var(--mono);letter-spacing:.14em;color:var(--blue2)}
.cy-pv-cap b{display:block;font:800 15px var(--sans);color:var(--ink);margin-top:3px}
.cy-pv-cap span{font:600 8px var(--sans);color:var(--ink2)}

/* 상세창 · 사진 전환 (v3) */
.cy-foot{display:none!important}
.cy-foot2{display:flex;justify-content:flex-end;margin-top:10px;flex:none}
.cy-foot2 .cd-toggle{height:28px;padding:0 16px;border-radius:4px;background:var(--blue);color:#fff;font:700 7.5px var(--mono);letter-spacing:.16em;box-shadow:0 3px 0 rgba(37,80,93,.18);transition:transform .15s,background .15s}
.cy-foot2 .cd-toggle:hover{background:var(--navy);transform:translateY(-1px)}
.cy-pcard{position:relative;margin-top:10px;padding:12px 14px 12px;background:#fff;border:1.2px solid rgba(53,196,216,.45);border-radius:5px;flex:none;background-image:linear-gradient(rgba(53,196,216,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(53,196,216,.06) 1px,transparent 1px);background-size:10px 10px}
body.dark .cy-pcard{background-color:#1A2B31}
.cy-pcard small{display:block;font:700 6px var(--mono);letter-spacing:.16em;color:var(--blue2)}
.cy-pcard > b{display:block;font:800 19px/1.1 var(--sans);color:var(--ink);margin-top:4px;letter-spacing:-.01em}
body.dark .cy-pcard > b{color:#fff}
.cy-pcard > span{display:block;font:600 9px var(--sans);color:var(--ink2);margin-top:2px}
.cy-pcard em{display:block;font:600 8.5px var(--sans);font-style:italic;color:var(--blue2);margin-top:5px}
.cy-pcard .cd-tags{display:flex;gap:4px;margin-top:7px}
.cy-pcard .cd-tags i{font:600 6.5px var(--sans);font-style:normal;padding:2px 7px;border-radius:3px;background:#fff;border:1px solid rgba(53,196,216,.4);color:var(--blue2)}
.cy-pcard .cd-tags i.ed{border-style:dashed;border-color:var(--line);color:var(--ink2)}
.cy-pcard > .cy-pno{position:absolute;top:10px;right:12px;margin:0;font:700 6px var(--mono);letter-spacing:.16em;color:#fff;background:var(--blue);padding:3px 6px;border-radius:3px}
.cy-pstage{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;margin-top:12px}
.cy-pstage .cy-pv{height:100%;max-height:100%;max-width:100%;width:auto;aspect-ratio:4/5;position:relative}
.cy-pstage .cy-pv .ph{position:absolute;inset:0;border-radius:2px;box-shadow:0 6px 18px rgba(37,80,93,.14)}
.cy-pstage .cy-pv .ph::after{display:none}
.cy-pstage .cy-pv img{width:100%;height:100%;object-fit:cover}

/* 캐릭터 목록 v4 · 페어 */
.cx-card > small{display:block;margin-top:6px;font:600 6px var(--mono);letter-spacing:.08em;color:var(--ink3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cx-card > .cx-nm{margin-top:2px}
.cx-card > .cx-nm b{display:none}
.cy-pcard.nt{margin-top:22px}
.cp-list{display:flex;flex-direction:column;gap:10px;padding:2px 2px 6px}
.cp-card{display:block;width:100%;text-align:left;background:#fff;border:1.2px solid rgba(53,196,216,.35);border-radius:5px;padding:8px 9px 8px;transition:border-color .15s,box-shadow .15s,transform .15s}
.cp-card:hover{transform:translateY(-1px);border-color:rgba(53,196,216,.7)}
.cp-card.on{border-color:var(--blue);box-shadow:0 0 0 2px rgba(53,196,216,.18)}
body.dark .cp-card{background:#1A2B31}
.cp-h{display:flex;align-items:center;gap:6px}
.cp-badge{font:700 6px var(--mono);font-style:normal;letter-spacing:.14em;color:#fff;background:var(--blue);padding:3px 6px;border-radius:3px;flex:none}
.cp-h b{font:800 10px var(--sans);color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
body.dark .cp-h b{color:#fff}
.cp-h span{margin-left:auto;font:600 7px var(--sans);color:var(--ink2);opacity:.7;white-space:nowrap}
.cp-ph{position:relative;aspect-ratio:16/9;margin-top:7px;border-radius:3px;overflow:hidden}
.cp-ph .ph{position:absolute;inset:0;border-radius:0}
.cp-ph .ph::after{display:none}
.cp-d{position:absolute;top:6px;right:6px;font:800 8px var(--sans);font-style:normal;color:var(--navy);background:#fff;padding:3px 7px;border-radius:3px;box-shadow:0 2px 6px rgba(37,80,93,.15)}
.cp-ov{position:absolute;left:0;right:0;bottom:0;padding:16px 10px 8px;background:linear-gradient(transparent,rgba(26,57,67,.78))}
.cp-ov b{display:block;font:800 11px var(--sans);color:#fff}
.cp-ov b i{font-style:normal;opacity:.7;margin:0 5px;font-weight:600}
.cp-ov small{display:block;font:700 6.5px var(--mono);letter-spacing:.12em;color:#A6EEF8;margin-top:2px}
.cp-f{display:flex;align-items:center;justify-content:space-between;margin-top:7px}
.cp-f span{font:700 6.5px var(--mono);letter-spacing:.18em;color:var(--ink2)}
.cp-f b{font:700 7px var(--sans);color:var(--blue2)}
.cy-pcard .cd-tags i.st{background:var(--blue);border-color:var(--blue);color:#fff;font-family:var(--mono);letter-spacing:.08em}
.cz-body{flex:1;min-height:0;overflow:auto;margin-top:12px;padding:10px;background:#fff;border:1.2px solid rgba(53,196,216,.45);border-radius:5px;scrollbar-width:none}
.cz-body::-webkit-scrollbar{display:none}
body.dark .cz-body{background:#1A2B31}
.cz-ph{position:relative;aspect-ratio:16/9;border-radius:3px;overflow:hidden;animation:czin .35s ease}
.cz-ph.flip{animation:czflip .4s ease}
@keyframes czin{from{opacity:0}to{opacity:1}}
@keyframes czflip{from{transform:rotateY(90deg)}to{transform:none}}
.cz-ph .ph{position:absolute;inset:0;border-radius:0}
.cz-ph .ph::after{display:none}
.cz-flip{position:absolute;right:6px;bottom:6px;font:700 7px var(--sans);color:var(--navy);background:#fff;padding:4px 8px;border-radius:3px;box-shadow:0 2px 6px rgba(37,80,93,.15)}
.cz-mem{display:flex;align-items:center;gap:6px;margin-top:10px}
.cz-mem > i{font-style:normal;font-weight:800;color:var(--blue);font-size:10px}
.cz-chip{flex:1;min-width:0;display:flex;align-items:center;gap:6px;padding:4px 8px 4px 4px;border:1.2px solid rgba(53,196,216,.3);border-radius:4px;background:#fff;text-align:left;cursor:default}
.cz-chip.lk{cursor:pointer}.cz-chip.lk:hover{border-color:var(--blue)}
body.dark .cz-chip{background:#152327}
.cz-chip .av{width:22px;height:22px;border-radius:50%;flex:none;position:relative}
.cz-chip span{min-width:0}
.cz-chip b{display:block;font:800 8.5px var(--sans);color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
body.dark .cz-chip b{color:#fff}
.cz-chip small{display:block;font:600 6.5px var(--sans);color:var(--ink2)}
.cz-memo{margin-top:8px;padding:7px 9px;background:var(--soft2);border-left:2px solid var(--blue);font:500 8px/1.5 var(--sans);color:var(--ink);border-radius:2px}
.cz-stat{display:grid;grid-template-columns:1fr 1fr;margin-top:10px;border:1.2px solid rgba(53,196,216,.35);border-radius:4px;overflow:hidden}
.cz-stat > div{padding:7px 9px;border-right:1px solid rgba(53,196,216,.2);border-bottom:1px solid rgba(53,196,216,.2)}
.cz-stat > div:nth-child(2n){border-right:0}.cz-stat > div:nth-child(n+3){border-bottom:0}
.cz-stat small{display:block;font:700 6px var(--mono);letter-spacing:.16em;color:var(--ink2);opacity:.8}
.cz-stat b{display:block;font:800 10px var(--sans);color:var(--ink);margin-top:3px}
body.dark .cz-stat b{color:#fff}
.cz-bar{height:4px;margin-top:10px;border-radius:2px;background:rgba(53,196,216,.15);overflow:hidden}
.cz-bar i{display:block;height:100%;background:linear-gradient(90deg,var(--blue),#5fe0b5);border-radius:2px}

/* v5 · 캐릭터 정리 창 크기 · 떠 있는 사진 화면 · 페어 */
.win.cydet.float{background:transparent!important;background-image:none!important;box-shadow:none!important;border:0!important;backdrop-filter:none!important}
.win.cydet.float::after{display:none}
.win.cydet.float .win-b{padding:0 0 4px}
.win.cydet.float .win-h{height:40px;padding-right:10px}
.win.cydet.float .cy-pcard{margin-top:0;background:#fff;background-image:none;border:1.2px solid rgba(53,196,216,.4);border-radius:10px;box-shadow:0 8px 24px rgba(37,80,93,.12);padding:14px 16px 13px}
body.dark .win.cydet.float .cy-pcard{background:#1A2B31}
.win.cydet.float .cy-pstage,.win.cydet.float .cf-stage{margin-top:12px}
.win.cydet.float .cy-pv .ph{box-shadow:0 10px 28px rgba(37,80,93,.18)}
.cy-pcard > b .en{font:700 9px var(--sans);color:var(--ink2);margin-left:6px;letter-spacing:0}
.cf-stage{flex:1;min-height:0;position:relative;display:flex;align-items:center;justify-content:center}
.cf-stage .cy-pv{height:100%;max-height:100%;max-width:calc(100% - 44px);aspect-ratio:4/5;position:relative;animation:czin .35s ease}
.cf-stage .cy-pv .ph{position:absolute;inset:0;border-radius:2px}
.cf-stage .cy-pv .ph::after{display:none}
.cf-stage .cy-pv img{width:100%;height:100%;object-fit:cover}
.cf-side{position:absolute;right:0;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:10px}
.cf-av{width:34px;height:34px;border-radius:50%;padding:2px;background:#fff;border:1.2px solid rgba(53,196,216,.3);box-shadow:0 4px 12px rgba(37,80,93,.15);transition:transform .15s,border-color .15s;opacity:.7}
.cf-av .av{width:100%;height:100%;border-radius:50%;position:relative;overflow:hidden}
.cf-av .av img{width:100%;height:100%;object-fit:cover}
.cf-av.on{opacity:1;border:2px solid var(--blue);transform:scale(1.12)}
.cf-av:hover{opacity:1}
/* 페어 상세(PAIR LOG) · 배경 칸 없이 */
.cy-pcard.nt:not(.fl){background:transparent;background-image:none;border:0;padding:0 2px;margin-top:22px}
.cz-body{background:transparent!important;border:0!important;padding:0 2px!important}
.cz-memo{background:rgba(53,196,216,.08)}
.cz-stat{background:#fff}
body.dark .cz-stat{background:#1A2B31}

/* v6 · 페어 사진 뒤집기 · 사진 비율 통일 */
.cz-ph.flip{animation:none;overflow:visible!important;cursor:pointer;aspect-ratio:16/9}
.cz-ph.flip .face{border-radius:3px}
.cz-ph .flip-hint{position:absolute;right:7px;bottom:7px;z-index:3;width:22px;height:22px;border-radius:50%;background:rgba(25,39,43,.55);color:#fff;display:grid;place-items:center;pointer-events:none}
.cz-ph .flip-hint svg{width:10px;height:10px}
.cz-ph .pb-txt b{font-size:20px}
.cf-stage,.cy-pstage{container-type:size}
.cf-stage .cy-pv,.cy-pstage .cy-pv{height:auto!important;max-height:none!important;width:min(calc(100% - 44px),80cqh)!important;max-width:none!important;aspect-ratio:4/5}
.cy-pstage .cy-pv{width:min(100%,80cqh)!important}

#cxdim{position:fixed;inset:0;background:rgba(217,240,243,.45);backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px);opacity:0;pointer-events:none;transition:opacity .25s}
#cxdim.on{opacity:1;pointer-events:auto}
body.dark #cxdim{background:rgba(12,21,24,.5)}

/* v7 · 글자 크기 키우기 (창 크기에 맞춰) */
.cx{padding:24px 26px 20px}
.cx-top h3{font-size:30px;line-height:1;margin-top:0}
.cx-tabs{gap:7px;margin-top:16px}
.cx-tabs button{height:32px;padding:0 13px;font-size:11px;gap:7px}
.cx-tabs button svg{width:13px;height:13px}
.cx-tabs button em{font-size:9px}
.cx-meta{margin-top:14px}
.cx-meta span{font-size:8.5px}
.cx-add{height:28px;padding:0 12px;font-size:10.5px}
.cx-grid{gap:12px 11px}
.cx-card{padding:6px 6px 9px}
.cx-card > small{font-size:8px;margin-top:8px}
.cx-card > .cx-nm{font-size:13px;margin-top:3px}
.cx-empty{font-size:9px;padding:20px 14px}
.cx-foot div{padding:8px 11px}
.cx-foot small{font-size:7.5px}
.cx-foot b{font-size:12px;margin-top:3px}
.cp-list{gap:13px}
.cp-card{padding:10px 11px}
.cp-h{gap:8px}
.cp-badge{font-size:8px;padding:4px 8px}
.cp-h b{font-size:13.5px}
.cp-h span{font-size:9px}
.cp-ph{margin-top:9px}
.cp-d{font-size:10.5px;padding:4px 9px;top:8px;right:8px}
.cp-ov{padding:22px 13px 10px}
.cp-ov b{font-size:14.5px}
.cp-ov small{font-size:8.5px}
.cp-f{margin-top:9px}
.cp-f span{font-size:8.5px}
.cp-f b{font-size:10px}
/* 상세 · 프로필 */
.win.cydet .win-b{padding:26px 26px 22px}
.cy-hero{gap:18px;margin-top:6px}
.cy-photo{width:178px}
.cy-info{padding-top:8px}
.cy-info small{font-size:8.5px}
.cy-info > b{font-size:25px;margin-top:5px}
.cy-info > span{font-size:11.5px;margin-top:2px}
.cy-info em{font-size:11.5px;margin-top:8px}
.cy-info .cd-tags{gap:6px;margin-top:10px}
.cy-info .cd-tags i{font-size:9px;padding:4px 10px}
.cy-spec{gap:10px 12px;margin-top:14px;padding-top:12px}
.cy-spec small{font-size:7.5px}
.cy-spec b{font-size:15px;margin-top:2px}
.cy-tabs{grid-template-columns:repeat(3,1fr);margin-top:18px}
.cy-tabs button{height:36px;font-size:10px;letter-spacing:.18em;display:flex;align-items:center;justify-content:center;text-align:center}
.cy-body{margin-top:12px;font-size:12.5px}
.cy-body p{line-height:1.75;margin:4px 0 10px}
.cy-body .cd-sec{font-size:9.5px;margin:14px 0 6px}
.cy-body .cd-rows div{grid-template-columns:120px 1fr;padding:9px 0}
.cy-body .cd-rows span{font-size:11.5px}
.cy-body .cd-pr-h{padding:9px 11px;font-size:12px}
.cy-body .cd-pr-h button,.cy-body .cd-copyall{height:22px;padding:0 11px;font-size:8.5px}
.cy-body .cd-pr-b{padding:11px;font-size:12px}
.cy-body .cd-copyall{height:28px;padding:0 14px}
.cd-gal{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.cd-gal .ph{aspect-ratio:4/5;border-radius:3px}
.cd-gal .ph::after{display:none}
.cy-foot2{margin-top:14px}
.cy-foot2 .cd-toggle{height:36px;padding:0 20px;font-size:10px}
/* 떠 있는 사진 화면 (멤버 · 페어) */
.win.cydet.float .cy-pcard{padding:20px 22px 18px}
.win.cydet.float .cy-pcard small{font-size:8.5px}
.win.cydet.float .cy-pcard > b{font-size:26px;margin-top:6px}
.win.cydet.float .cy-pcard > b .en{font-size:11.5px}
.win.cydet.float .cy-pcard em{font-size:11.5px;margin-top:8px}
.win.cydet.float .cy-pcard .cd-tags{gap:6px;margin-top:11px}
.win.cydet.float .cy-pcard .cd-tags i{font-size:9px;padding:4px 10px}
.win.cydet.float .cy-pstage,.win.cydet.float .cf-stage{flex:none;container-type:normal;margin-top:16px;display:flex;justify-content:center}
.win.cydet.float .cy-pstage .cy-pv{width:min(calc(100% - 40px),300px)!important}
.win.cydet.float .cf-stage .cy-pv{width:min(calc(100% - 100px),290px)!important}
.win.cydet.float .cf-side{right:4px}
.win.cydet.float .cf-av{width:40px;height:40px}
.win.cydet.float .cy-foot2{margin-top:16px}
/* 페어 상세 */
.cy-pcard.nt:not(.fl){margin-top:6px}
.cy-pcard.nt:not(.fl) small{font-size:8.5px}
.cy-pcard.nt:not(.fl) > b{font-size:25px;margin-top:5px}
.cy-pcard.nt:not(.fl) > span{font-size:11.5px}
.cy-pcard.nt:not(.fl) em{font-size:11.5px;margin-top:7px}
.cy-pcard.nt:not(.fl) .cd-tags{gap:6px;margin-top:10px}
.cy-pcard.nt:not(.fl) .cd-tags i{font-size:9px;padding:4px 10px}
.cz-body{margin-top:16px}
.cz-mem{gap:8px;margin-top:14px}
.cz-chip{padding:6px 10px 6px 6px;gap:8px}
.cz-chip .av{width:30px;height:30px}
.cz-chip b{font-size:12px}
.cz-chip small{font-size:8.5px}
.cz-memo{margin-top:12px;padding:10px 12px;font-size:11.5px}
.cz-stat{margin-top:14px}
.cz-stat > div{padding:10px 12px}
.cz-stat small{font-size:8px}
.cz-stat b{font-size:14px;margin-top:4px}
.cz-bar{height:5px;margin-top:14px}
.cz-ph .pb-txt b{font-size:24px}
.cz-ph .pb-txt small{font-size:8.5px}
.cz-ph .pb-txt p{font-size:11px}
/* ARCH 목록 (F · LIGHT ROSTER) */
.rs-sec{display:flex;align-items:baseline;justify-content:space-between;margin-top:8px}
.rs-sec b{font:900 17px var(--sans);color:var(--navy);letter-spacing:-.01em}
body.dark .rs-sec b{color:#fff}
.rs-sec span{font:900 11px var(--sans);letter-spacing:.02em}
.rs-ln{height:2px;border-radius:1px;margin:6px 0 12px}
.rs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:11px;margin-bottom:10px}
.rs-card{position:relative;aspect-ratio:3/4;border-radius:7px;overflow:hidden;border:1.5px solid rgba(29,53,61,.25);background:#0E1112;box-shadow:0 6px 14px rgba(27,58,68,.2);transition:transform .15s,box-shadow .15s;padding:0;text-align:left}
.rs-card:hover{transform:translateY(-2px)}
.rs-card.on{border-color:var(--blue);box-shadow:0 0 0 2px var(--blue),0 6px 14px rgba(27,58,68,.2)}
.rs-card .ph{position:absolute;inset:0;border-radius:0}
.rs-card .ph::after{display:none}
.rs-card .ph img{width:100%;height:100%;object-fit:cover;object-position:50% 20%}
.rs-card .ov{position:absolute;left:0;right:0;bottom:0;padding:34px 10px 10px;background:linear-gradient(transparent,rgba(16,19,20,.94))}
.rs-card .ov b{display:block;font:900 14px var(--sans);color:#fff}
.rs-card .ov i{display:inline-block;margin-top:5px;font:800 9px var(--sans);font-style:normal;color:#fff;padding:3px 9px;border-radius:999px}
/* ARCH 상세 (AGENT PROFILE) */
.agentwin .mp-sec .bx p{margin-bottom:12px}
.ag-rows{display:flex;flex-direction:column;gap:8px}
.ag-rows div{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:10px 12px;border-radius:4px;background:var(--soft)}
.win.dark .ag-rows div{background:#162226}
.ag-rows span{font:600 10.5px var(--sans);color:var(--ink3);letter-spacing:.02em}
.ag-rows b{font:600 11.5px var(--sans);color:var(--ink);text-align:right}
.win.dark .ag-rows b{color:#fff}
.ag-rows b.at{color:#608E94;font-weight:800}
.win.dark .ag-rows b.at{color:#7fd6e0}
.ag-ev{margin-top:16px}
.ag-ev small{display:block;font:600 10.5px var(--sans);color:var(--ink3);margin-bottom:8px}
.ag-ev p{border-left:3px solid #A1BABE;background:var(--soft);padding:12px 14px;font-size:11px;line-height:1.85;font-style:italic;color:var(--ink2)}
.win.dark .ag-ev p{border-color:#7fd6e0;background:#162226;color:#D8E9EC}
.win.dark .agentwin h4,.win.dark.agentwin .mp-sec h4{color:#7fd6e0}
.win.dark.agentwin .ag-t h4{color:#fff;border-bottom:3px solid #7fd6e0}
.agentwin .ag-t h4{border-bottom:3px solid #A1BABE}
.ag-gl{font:500 10.5px var(--sans);color:var(--ink3);margin:12px 0 6px;letter-spacing:.02em}
.ag-a ul{list-style:none;padding:0;margin:0}
.ag-a li{font-size:11px;line-height:1.8;color:var(--ink2);padding-left:12px;position:relative;margin-bottom:4px}
.ag-a li::before{content:"•";position:absolute;left:0;color:var(--ink3)}
.ag-a li b{color:var(--ink)}
.win.dark .ag-a li b{color:#fff}
.ag-w{border-color:#e8c547!important;background:rgba(232,197,71,.06)}
.ag-w h4{color:#c99a12!important;border-bottom-color:rgba(232,197,71,.35)!important}
.win.dark .ag-w h4{color:#e8c547!important}
.ag-w p{font-size:11px;line-height:1.85;color:var(--ink2)}
.win.dark .ag-w p{color:#D8E9EC}
.mp-sec .bx .hl{text-decoration:none;color:#3aa7c4}
.win.dark .mp-sec .bx .hl{color:#7fd6e0;text-shadow:0 0 8px rgba(127,214,224,.5)}
/* D-DAY 창 사진 세로로 */
.pass-img{height:196px}

/* v8 */
.app-ic.t-lav{background:linear-gradient(180deg,#F7FDFE,#E9F7F9);border-color:#D9EFF2;color:#64B6C1}
.app-ic.t-teal{background:linear-gradient(180deg,#f3fbfa,#def2ef);border-color:#cbe8e3;color:#2a8f86}
.app-ic.t-rose{background:linear-gradient(180deg,#fff7f5,#fbe7e3);border-color:#f2d6d0;color:#c95f55}
.app-ic.t-lilac{background:linear-gradient(180deg,#fdf6fb,#f5e5f0);border-color:#ecd3e4;color:#b35a93}
body.dark .app-ic.t-lav,body.dark .app-ic.t-teal,body.dark .app-ic.t-rose,body.dark .app-ic.t-lilac{background:var(--soft);border-color:var(--line)}
.win.cxwin,.win.cydet{background:rgba(255,255,255,.9)!important;background-image:none!important;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
body.dark .win.cxwin,body.dark .win.cydet{background:rgba(21,35,39,.9)!important}
.win.cydet.float{background:transparent!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
.cx-tabs button.ico{justify-content:center;width:44px;padding:0}
.cx-tabs button.ico svg{width:15px;height:15px}
.cp-card{border-radius:12px}
.cp-ph{border-radius:8px}
.win.cydet.float .cy-pstage,.win.cydet.float .cf-stage{flex:1;min-height:0;align-items:center}
.win.cydet.float .cy-pstage .cy-pv{width:min(calc(100% - 40px),330px)!important}
.win.cydet.float .cf-stage .cy-pv{width:min(calc(100% - 100px),320px)!important}
.win.cydet.float .cy-foot2{margin-top:12px}
.pass-img{height:184px}

/* v9 · A · TAB (목록 창 브라우저 탭 머리 / 상세 창 MEMBER PROFILE 머리) */
.win.cxwin::after,.win.cydet:not(.float)::after{display:none}
.win.cxwin .win-h{position:relative;height:50px;background:rgba(239,247,248,.95);border-bottom:0;padding:0 14px 0 16px;align-items:flex-end;justify-content:flex-start;gap:12px}
.win.cxwin .win-h .dots3{align-self:center}
.win.cxwin .win-h .win-btns,.win.cydet:not(.float) .win-h .win-btns{align-self:center;margin-left:0}
.win.cxwin .win-btns button,.win.cydet:not(.float) .win-btns button{border:0;background:transparent;width:24px;height:24px;border-radius:7px}
.win.cxwin .win-btns button:hover,.win.cydet:not(.float) .win-btns button:hover{background:var(--soft2)}
.cxh-tabs{display:flex;gap:3px;align-items:flex-end}
.btab.cxt{height:38px;padding:0 16px;gap:8px;font:800 12px var(--sans);color:var(--ink2);border-radius:11px 11px 0 0}
.btab.cxt.on{background:#fff;color:var(--ink)}
body.dark .btab.cxt.on{background:#152327}
.btab.cxt em{font-style:normal;font:700 10px var(--mono);color:var(--ink3)}
.btab.cxt .fav{width:20px;height:20px;border-radius:6px;color:#fff}
.btab.cxt .fav svg{width:12px;height:12px;color:#fff}
.btab.cxt .f-member{background:var(--blue)}.btab.cxt .f-pair{background:#e06c8a}.btab.cxt .f-au{background:#b35a93}
.btab.cxt.ico{padding:0 12px}
.cx{padding:20px 24px 20px}
.cx-top2{display:flex;align-items:center;justify-content:space-between;gap:10px}
.cx-top2 h3{font:900 28px/1.1 var(--disp);letter-spacing:-.03em;color:var(--navy)}
body.dark .cx-top2 h3{color:#fff}
.cx-meta{margin-top:6px}
/* 상세 창 머리 */
.win.cydet:not(.float) .win-h{position:relative;height:52px;background:transparent;border-bottom:1px solid var(--line);padding:0 14px 0 18px;justify-content:flex-start;gap:12px}
.win.cydet:not(.float) .win-h .acc{left:18px;width:46px;height:3px}
.win.cydet .win-h .cyh-t{font:900 15px var(--sans);letter-spacing:.01em}
.win.cydet .win-h .cyh-s{font:600 11px var(--sans)}
.win.cydet .win-h .cw-drag{flex:1}
.win.cydet.float .win-h .dots3,.win.cydet.float .win-h .cyh-t,.win.cydet.float .win-h .cyh-s,.win.cydet.float .win-h .acc{display:none}
.win.cydet:not(.float) .win-b{padding-top:72px}
.cy-tabs2{display:flex;align-items:center;gap:4px;margin-top:18px;padding:6px;border-radius:12px;background:var(--soft);flex:none}
body.dark .cy-tabs2{background:#1C2C31}
.cy-tabs2 button[data-ct]{height:36px;padding:0 12px;border-radius:9px;font:800 10.5px var(--mono);letter-spacing:.14em;color:var(--ink3);white-space:nowrap}
.cy-tabs2 button[data-ct] i{font-style:normal;opacity:.6;margin-right:5px}
.cy-tabs2 button[data-ct].on{background:#fff;color:var(--blue2);box-shadow:0 2px 8px rgba(34,78,92,.08)}
body.dark .cy-tabs2 button[data-ct].on{background:#152327;color:#fff}
.cy-song{margin-left:auto;height:32px;padding:0 13px;border-radius:999px;border:1.2px solid var(--line);background:#fff;color:var(--blue2);font:800 9.5px var(--mono);letter-spacing:.12em;white-space:nowrap}
body.dark .cy-song{background:transparent;color:var(--mint)}

.win.cydet:not(.float) .win-b{padding-top:20px}
.cy-tabs2{gap:2px;padding:5px;margin-top:16px}
.cy-tabs2 button[data-ct]{padding:0 9px;font-size:9.5px;letter-spacing:.1em}
.cy-tabs2 button[data-ct] i{margin-right:4px}
.cy-song{padding:0 10px;font-size:8.5px;letter-spacing:.06em;height:30px}

/* v10 */
.win.cxwin .win-h .dots3{align-self:flex-end;margin-bottom:15px}
.win.cxwin .win-h .dots3 i{cursor:pointer}
.win.cxwin .win-h .dots3 i[data-a=close]:hover{filter:brightness(.85)}
.btab.cxt .fav{background:#EFF8FA!important;box-shadow:inset 0 0 0 1px rgba(53,196,216,.18)}
.btab.cxt .f-member svg{color:#53B2BF!important}
.btab.cxt .f-pair{background:#fbf0f2!important;box-shadow:inset 0 0 0 1px rgba(200,110,130,.2)!important}.btab.cxt .f-pair svg{color:#c27386!important}
.btab.cxt .f-au{background:#f6f0f8!important;box-shadow:inset 0 0 0 1px rgba(150,100,170,.2)!important}.btab.cxt .f-au svg{color:#9a72ad!important}
.cx-ph{aspect-ratio:4/5.4}
.cp-ph{aspect-ratio:16/9.8}
.cy-song{width:34px;height:34px;padding:0;display:grid;place-items:center;font-size:15px;letter-spacing:0;flex:none}

/* v11 · 상세창 PROFILE / ARCHIVE */
.cy-sw{display:grid;grid-template-columns:1fr 1fr;gap:4px;padding:4px;border-radius:11px;background:var(--soft);flex:none;margin-bottom:16px}
body.dark .cy-sw{background:#1C2C31}
.cy-sw button{display:flex;align-items:center;gap:8px;height:40px;padding:0 9px;border-radius:8px;color:var(--ink3);text-align:left}
.cy-sw button.on{background:#fff;color:var(--blue2);box-shadow:0 2px 8px rgba(34,78,92,.08)}
body.dark .cy-sw button.on{background:#152327;color:#fff}
.cy-sw .ic{width:24px;height:24px;border-radius:50%;display:grid;place-items:center;background:var(--soft2);font-size:11px;flex:none}
.cy-sw .on .ic{background:var(--blue);color:#fff}
.cy-sw b{display:block;font:900 11px var(--sans);letter-spacing:.02em}
.cy-sw small{display:block;font:700 7px var(--mono);letter-spacing:.14em;opacity:.8;margin-top:1px}
.cy-hero{margin-top:0}
.cy-body{margin-top:18px}
.cy-body > .cd-sec:first-child{margin-top:0}
.cd-bars div{display:grid;grid-template-columns:64px 1fr 28px;align-items:center;gap:10px;margin:6px 0;font:600 11.5px var(--sans);color:var(--ink2)}
.cd-bars i{height:6px;border-radius:4px;background:var(--soft2);position:relative;overflow:hidden}
.cd-bars i::after{content:"";position:absolute;inset:0;width:var(--v);border-radius:4px;background:linear-gradient(90deg,var(--blue),var(--mint))}
.cd-bars b{font:800 10.5px var(--mono);color:var(--navy);text-align:right}
body.dark .cd-bars b{color:#fff}
.cd-memo{position:relative;margin:22px 2px 6px;padding:15px 15px 13px;background:#F7FDFE;border-radius:4px;box-shadow:0 6px 14px -9px rgba(34,78,92,.3),0 0 0 1px #E0F1F4}
body.dark .cd-memo{background:#1A2B31;box-shadow:0 0 0 1px #2A3E44}
.cd-memo::before{content:"";position:absolute;left:50%;top:-9px;width:70px;height:18px;transform:translateX(-50%) rotate(-2deg);background:rgba(175,226,233,.55);border-left:2px dotted rgba(255,255,255,.7);border-right:2px dotted rgba(255,255,255,.7)}
.cd-memo small{display:block;font:800 9px var(--mono);letter-spacing:.2em;color:var(--blue2);margin-bottom:5px}
.cd-memo p{margin:0!important;font-size:12.5px;line-height:1.7}
.cy-pills{display:flex;gap:6px;flex:none}
.cy-pills button{height:30px;padding:0 13px;border-radius:999px;border:1.2px solid var(--line);background:#fff;font:800 9.5px var(--mono);letter-spacing:.14em;color:var(--ink3)}
.cy-pills button.on{background:var(--blue);border-color:var(--blue);color:#fff}
body.dark .cy-pills button:not(.on){background:transparent}
.cy-body.arch{margin-top:12px}
.cy-body .cd-pr{border-radius:10px;overflow:hidden}
.cy-body .cd-pr-h button{border-radius:999px}
.cd-gal{gap:8px}.cd-gal .ph{border-radius:8px}
.cy-foot3{display:flex;justify-content:space-between;align-items:center;margin-top:14px;flex:none}
.cy-foot3 .cy-song{margin:0}
.cy-foot3 .cd-toggle{height:36px;padding:0 20px;border-radius:4px;background:var(--blue);color:#fff;font:700 10px var(--mono);letter-spacing:.16em;box-shadow:0 3px 0 rgba(37,80,93,.18)}

/* v12 */
*{scrollbar-width:none}
*::-webkit-scrollbar{display:none;width:0;height:0}
.cd-bars{margin-bottom:22px}
.cx-ph{aspect-ratio:4/4.8}
.cp-ph{aspect-ratio:16/8.4}
.win.cydet.float .cy-pstage .cy-pv,.win.cydet.float .cf-stage .cy-pv{aspect-ratio:4/5.6}

/* v13 */
.cy-sw button{height:34px;gap:7px}
.cy-sw .ic{width:20px;height:20px;font-size:10px}
.cx-ph{aspect-ratio:4/5}

/* v14 */
.win.cydet .win-h .dots3 i{cursor:pointer}
.win.cydet.float .win-h .dots3{display:flex!important;align-self:center;padding:6px 8px;border-radius:999px;background:rgba(255,255,255,.85);box-shadow:0 2px 8px rgba(34,78,92,.12)}
.win.cydet.float .win-h{justify-content:flex-start;padding-left:4px}
.cy-pcard > b .en{font:600 11.5px var(--sans);color:var(--ink3);margin-left:8px;letter-spacing:.02em;opacity:.8}
.cy-pcard.nt:not(.fl) > b .en{font-size:11.5px}
.cy-tabs2{margin-top:18px}
.cy-tabs2 .cy-song{margin-left:auto;width:28px;height:28px;font-size:11px;padding:0;display:grid;place-items:center;border-radius:50%;flex:none}
.cy-foot3{justify-content:flex-end}
.cy-foot3 .cd-toggle{height:30px;padding:0 15px;font-size:9px}

.win.cydet.float .win-b{padding-top:38px!important}
.win.cydet.float .win-h{height:34px}

.cy-tabs2{margin-top:0;margin-bottom:16px}
`;document.head.appendChild(st);})();
/* =========================================================
   캐릭터 정리 창 (東京青藍大学 · ARCH · FRONTLINE · ETC.)
   ========================================================= */
let charWorld = 'seiran', charTabKey = 'member', charSel = null, charView = 'panel', charTab = 'profile';
const charAudio = new Audio();
const CHAR_TAB_ICON = { member: 'idcard', pair: 'heart', au: 'sparkle' };
function cworld() { return (S.characters?.worlds || {})[charWorld] || { name: '', member: [], pair: [], au: [] }; }
// 캐릭터 정리 창 크기: CHAR_H(높이) · 목록 창은 높이×0.70, 상세 창은 높이×0.62 (화면 가운데 정렬)
const CHAR_H = 0;   // 0 = 화면 높이에 꽉 차게 / 숫자를 넣으면 그 높이 이하로
function charLayout() {
  if (isMobile()) return null;
  const avail = deskH() - 72 - 72 - 8, gap = 14;
  // OOC · 프로필 창과 같은 크기 : OOC 창(440×640)에 같은 배율을 곱한 높이 (화면이 작으면 화면에 맞춰 줄어요)
  const ooc = Math.min(640 * WZ / Z, deskH() - 144 - 16);
  let H = Math.min(CHAR_H || ooc, avail, ooc);
  const maxW = deskW() - 40; if (H * 1.32 + gap > maxW) H = Math.floor((maxW - gap) / 1.32);
  const W1 = Math.round(H * .70), W2 = Math.round(H * .62);
  const x1 = Math.max(12, Math.round((deskW() - W1 - gap - W2) / 2)), y = Math.round(72 + (deskH() - 72 - 72 - H) / 2);
  return { solo: Math.max(12, Math.round((deskW() - W1) / 2)), list: { x: x1, y, w: W1, h: H, abs: true }, det: { x: x1 + W1 + gap, y, w: W2, h: H, abs: true } };
}
// ARCH 목록 (그룹별 줄 + 속성 뱃지 카드)
const RS_EL = { '불': '#D65745', '물': '#5296D5', '번개': '#EAC645', '얼음': '#9BCACB', '풀': '#79A86B', '바람': '#65C97A', '무속성': '#A6A6A6' }, RS_INK = { '번개': '#3A3320', '얼음': '#24393A', '무속성': '#2E2E2E' }, RS_GR = ['', 'SS', 'S', 'A', 'B', 'C'];
function rsBadge(el, gr) { return gr ? `${gr}급 ${el}` : el === '무속성' ? '무속성' : `${el} 속성`; }
function rsElOf(m) { if (m.el && RS_EL[m.el]) return m.el; const a = String(m.attr || ''); return Object.keys(RS_EL).find(k => a.includes(k)) || (/전기/.test(a) ? '번개' : '무속성'); }
function rsInk(c) { const m = /^#?([0-9a-f]{6})$/i.exec(String(c).trim()); if (!m) return '#fff'; const n = parseInt(m[1], 16), r = n >> 16, g = n >> 8 & 255, b = n & 255; return (r * .299 + g * .587 + b * .114) > 168 ? '#2B2F33' : '#fff'; }
function rosterHTML(W, list, isOn) {
  const G = (W.groups || []).slice(), keys = G.map(g => g.key);
  if (list.some(m => !keys.includes(m.group))) G.push({ key: '__etc', name: 'ETC.', cls: '', color: '#8EB2B7' });
  return G.map(g => { const ms = list.map((m, i) => [m, i]).filter(([m]) => g.key === '__etc' ? !keys.includes(m.group) : m.group === g.key); if (!ms.length) return '';
    return `<div class="rs-blk" style="--gc:${esc(g.color || '#8EB2B7')};--cc:${esc(g.clsColor || g.color || '#8EB2B7')}"><div class="rs-sec"><b>${esc(g.name)}</b><span>${esc(g.cls || '')}</span></div><div class="rs-ln"></div>
      <div class="rs-grid">${ms.map(([m, i]) => `<button class="rs-card ${isOn(i) ? 'on' : ''}" data-ci="${i}">${phFb(m.card, m.hero, { seed: m.name + i })}<div class="ov"><b>${esc(m.name)}</b>${m.attr || m.el ? (() => { const e = rsElOf(m); return `<i style="background:${RS_EL[e]};color:${RS_INK[e] || '#fff'}">${esc(m.attr || rsBadge(e, ''))}</i>`; })() : ''}</div></button>`).join('')}</div></div>`; }).join('');
}
// FRONTLINE : 소속팀(카드 위 작은 글씨 = 소속)별로 나눠서 보여줘요 · 팀이 없는 캐릭터는 맨 아래 무소속
const FL_TEAMS = [
  { key: 'RED ZONE', ko: '레드 존', tag: 'HIGH RISK', slug: 'red', color: '#E0565B', match: /red\s*zone|레드\s*존/i },
  { key: 'SILVER SLOT', ko: '실버 슬롯', tag: 'PRECISION', slug: 'silver', color: '#97A4AD', match: /silver\s*slot|실버\s*슬롯/i },
  { key: 'CROWN GATE', ko: '크라운 게이트', tag: 'SPOTLIGHT', slug: 'crown', color: '#CFA046', match: /crown\s*gate|크라운\s*게이트/i },
  { key: 'BLACK VEIL', ko: '블랙 베일', tag: 'CLASSIFIED', slug: 'black', color: '#23282B', match: /black\s*veil|블랙\s*베일/i },
  { key: 'NO AFFILIATION', ko: '무소속', tag: 'INDEPENDENT', slug: 'none', color: '#3FAE84', match: null }];
const FL_IC = {
  red: '<path d="M12 3.8L21.2 19.6H2.8z"/><path d="M12 9.8v4.6M12 16.9v.2"/>',
  silver: '<circle cx="12" cy="12" r="6.8"/><path d="M12 2.8v5M12 16.2v5M2.8 12h5M16.2 12h5"/><circle cx="12" cy="12" r=".9"/>',
  crown: '<path d="M3.6 17.5h16.8l1-9.5-5 3.8L12 5l-4.4 6.8-5-3.8z"/><path d="M4.5 20.5h15"/>',
  black: '<path d="M2.8 12s3.4-5.8 9.2-5.8 9.2 5.8 9.2 5.8-3.4 5.8-9.2 5.8S2.8 12 2.8 12z"/><circle cx="12" cy="12" r="2.4"/><path d="M4 4l16 16"/>',
  none: '<circle cx="12" cy="12" r="8.4"/><path d="M12 7.2V12l3.2 2"/>' };
function teamsOf(W) { return W && (W.teams || (W === (S.characters?.worlds || {}).frontline || /frontline/i.test(W.name || '') ? FL_TEAMS : null)); }
function cxCardHTML(m, i, isOn) { return `<button class="cx-card ${isOn(i) ? 'on' : ''}" data-ci="${i}">
          ${ph(m.card, { cls: 'cx-ph', seed: m.name + i })}
          <span class="cx-ov"><small>${esc(m.dept)}</small><span class="cx-nm">${esc(m.name)}</span>${m.en ? `<em class="cx-en">${esc(m.en)}</em>` : ''}</span></button>`; }

// 한국어 → 로마자 (표준 로마자 표기 · 성씨는 흔한 영어 표기) : 수정 창 '제안' 칩에만 써요
const RK_I = ['g','kk','n','d','tt','r','m','b','pp','s','ss','','j','jj','ch','k','t','p','h'], RK_V = ['a','ae','ya','yae','eo','e','yeo','ye','o','wa','wae','oe','yo','u','wo','we','wi','yu','eu','ui','i'],
  RK_F = ['','k','k','k','n','n','n','t','l','k','m','l','l','l','p','l','m','p','p','t','t','ng','t','t','k','t','p','t'];
const RK_SUR = { 김:'Kim',이:'Lee',박:'Park',최:'Choi',정:'Jung',강:'Kang',조:'Cho',윤:'Yoon',장:'Jang',임:'Lim',한:'Han',오:'Oh',서:'Seo',신:'Shin',권:'Kwon',황:'Hwang',안:'Ahn',송:'Song',류:'Ryu',유:'Yoo',홍:'Hong',전:'Jeon',고:'Ko',문:'Moon',양:'Yang',손:'Son',배:'Bae',백:'Baek',허:'Heo',남:'Nam',심:'Shim',노:'Noh',하:'Ha',곽:'Kwak',성:'Sung',차:'Cha',주:'Joo',우:'Woo',구:'Koo',민:'Min',진:'Jin',지:'Ji',엄:'Eom',채:'Chae',원:'Won',천:'Cheon',방:'Bang',공:'Kong',현:'Hyun',함:'Ham',변:'Byun',염:'Yeom',여:'Yeo',추:'Choo',도:'Do',소:'So',석:'Seok',선:'Sun',설:'Seol',마:'Ma',길:'Gil',연:'Yeon',위:'Wi',표:'Pyo',명:'Myung',기:'Ki',반:'Ban',왕:'Wang',금:'Geum',옥:'Ok',인:'In',제:'Je',모:'Mo',탁:'Tak',국:'Kook',나:'Na',태:'Tae',봉:'Bong',경:'Kyung',피:'Pi',범:'Beom' };
function rkWord(w) { let o = '', pf = -1; for (const ch of w) { const c = ch.charCodeAt(0) - 0xAC00; if (c < 0 || c > 11171) { o += ch; pf = -1; continue; } const ini = Math.floor(c / 588), fin = c % 28; o += (ini === 5 && pf === 8 ? 'l' : RK_I[ini]) + RK_V[Math.floor(c % 588 / 28)] + RK_F[fin]; pf = fin; } return o; }
const rkCap = w => w ? w[0].toUpperCase() + w.slice(1) : w;
function romaKo(name) { const t = String(name).trim(); if (!t) return []; const ws = t.split(/\s+/);
  if (ws.length > 1) return [ws.map(w => rkCap(rkWord(w))).join(' ')];
  const syl = [...t], out = [];
  if (syl.length >= 2 && syl.length <= 4) { const sur = RK_SUR[syl[0]] || rkCap(rkWord(syl[0])), giv = rkCap(rkWord(syl.slice(1).join(''))); out.push(`${sur} ${giv}`, `${giv} ${sur}`); }
  out.push(rkCap(rkWord(t))); return out; }
// 학부 이름 한국어 → 일본어 (목록에 있는 것만 · 없으면 제안 안 해요)
const JP_DEPT = { '인문':'人文','언어':'言語','디자인':'デザイン','법':'法','법학':'法','경제':'経済','경영':'経営','상':'商','상학':'商','문':'文','문학':'文','이공':'理工','이':'理','이학':'理','공':'工','공학':'工','정보':'情報','의':'医','의학':'医','치':'歯','치의학':'歯','간호':'看護','약':'薬','약학':'薬','교육':'教育','음악':'音楽','미술':'美術','예술':'芸術','사회':'社会','국제':'国際','국제교양':'国際教養','외국어':'外国語','심리':'心理','체육':'体育','스포츠과학':'スポーツ科学','건축':'建築','농':'農','농학':'農','환경':'環境','미디어':'メディア','영상':'映像','정치경제':'政治経済','관광':'観光','복지':'福祉','사회복지':'社会福祉','생활과학':'生活科学','영양':'栄養','문화구상':'文化構想','종합정책':'総合政策','상경':'商経','영문':'英文','신학':'神','종교':'宗教','철학':'哲','역사':'歴史','사학':'史','수학':'数','물리':'物理','화학':'化','생명과학':'生命科学','컴퓨터':'コンピュータ','게임':'ゲーム','애니메이션':'アニメーション','패션':'ファッション','실용음악':'ポピュラー音楽','연극영화':'演劇映画','무용':'舞踊' };
function jaDept(v) { const t = String(v).trim().replace(/\s+/g, ''); const m = /^(.*?)(학부|학과|대학원|대학|부|과)?$/.exec(t); const stem = m[1], suf = m[2] || '학부';
  const J = JP_DEPT[stem] || JP_DEPT[stem.replace(/학$/, '')]; if (!J) return '';
  return J + ({ '학부': '学部', '부': '学部', '학과': '学科', '과': '学科', '대학원': '大学院', '대학': '学部' }[suf] || '学部'); }
// 東京青藍大学 : 학년별 (1年生 ~ 4年生 · 학년 없으면 맨 아래)
const GR_Y = [['1年生', 'FRESHMAN', '#8DB4E2'], ['2年生', 'SOPHOMORE', '#5B8FCF'], ['3年生', 'JUNIOR', '#3769AE'], ['4年生', 'SENIOR', '#20457E']];
function gradesHTML(W, list, isOn) {
  const Y = [...GR_Y, ['学年未設定', '', '#A7B1BA']];
  return Y.map(([y, en, c], k) => { const ms = list.map((m, i) => [m, i]).filter(([m]) => k < 4 ? m.year === y : !GR_Y.some(g => g[0] === m.year)); if (!ms.length) return '';
    return `<section class="sr-yr" style="--yc:${c}"><div class="sr-yh"><b class="sr-yt">${esc(y)}</b><span class="sr-yl"></span><em>${String(ms.length).padStart(2, '0')}</em></div>
      <div class="cx-grid">${ms.map(([m, i]) => cxCardHTML(m, i, isOn)).join('')}</div></section>`; }).join('');
}
function teamsHTML(W, list, isOn) {
  const T = teamsOf(W).map(t => ({ ...t, match: t.match instanceof RegExp ? t.match : (t.match ? new RegExp(t.match, 'i') : null) })), last = T.find(t => !t.match) || T[T.length - 1];
  const pick = m => T.find(t => t.match && t.match.test(m.dept || '')) || last;
  return T.map(t => { const ms = list.map((m, i) => [m, i]).filter(([m]) => pick(m) === t); if (!ms.length) return '';
    return `<section class="fl-team fl-${esc(t.slug || 'x')}" style="--tc:${esc(t.color)}"><div class="fl-th"><span class="fl-em"><svg viewBox="0 0 24 24">${FL_IC[t.slug] || FL_IC.none}</svg></span><div class="fl-tt"><b>${esc(t.key)}</b><small>${esc(t.ko || '')}${t.tag ? ` <i>·</i> ${esc(t.tag)}` : ''}</small></div><span class="fl-deco"></span><em>${String(ms.length).padStart(2, '0')}</em></div>
      <div class="cx-grid">${ms.map(([m, i]) => cxCardHTML(m, i, isOn)).join('')}</div></section>`; }).join('');
}
function charNow() { if (!charSel) return null; const w = (S.characters?.worlds || {})[charSel.w]; const m = w && (w[charSel.t] || [])[charSel.i]; return m ? { w, m } : null; }
let pairOv = null, cxAnim = true;   // 페어 목록 창 위에 띄운 페어 (번호)
// 캐릭터 목록 창 : 혼자일 땐 가운데, 옆 창(상세)이 열리면 왼쪽으로 밀려나요
function cxShift() {
  const L = charLayout(), a = wins.get('chars'); if (!L || !a) return;
  const side = wins.get('chardet') || wins.get('agent'), wz = +a.el.dataset.wz || 1;
  const x = side ? L.list.x : L.solo, from = parseFloat(a.el.style.left) || 0, to = x / wz;
  if (Math.abs(from - to) < 1) return;
  a.el.style.left = to + 'px';   // 자리는 바로 옮기고, 보이는 움직임은 transform 으로 (가볍게)
  a.el.animate([{ transform: `translateX(${(from - to) * wz}px)` }, { transform: 'none' }], { duration: 560, easing: 'cubic-bezier(.22,.9,.25,1)' });
}
function openChars(wid) {
  const C = S.characters || {};
  if (wid && wid !== charWorld) { charWorld = wid; charTabKey = 'member'; pairOv = null; }
  if (!wins.get('chars') || wid) cxAnim = true;
  const render = b => {
    const W = cworld(), list = W[charTabKey] || [];
    const today = new Date(), isPair = charTabKey === 'pair';
    const isOn = i => charSel && charSel.w === charWorld && charSel.t === charTabKey && charSel.i === i;
    const cur = charSel && charSel.w === charWorld ? charNow() : null, selName = cur ? cur.m.name : '';
    if (isPair && pairOv != null && list[pairOv]) { b.innerHTML = `<div class="cx pf-ov">${pairFloatHTML(W, list[pairOv])}</div>`;
      const hd0 = b.closest('.win')?.querySelector('.cxh-tabs');
      if (hd0) hd0.innerHTML = (C.tabs || []).map(([k, t]) => `<button class="btab cxt ${k === charTabKey ? 'on' : ''} ${k === 'au' ? 'ico' : ''}" data-ck="${k}" title="${esc(t)}"><span class="fav f-${k}">${ic(CHAR_TAB_ICON[k] || 'idcard')}</span>${k === 'au' ? '' : `${esc(t)}<em>${(W[k] || []).length}</em>`}</button>`).join('');
      return; }
    b.innerHTML = `<div class="cx ${cxAnim ? 'anim' : ''}">
      <div class="cx-top2"><div class="cxt-t"><h3>${esc(W.title || W.name)}</h3><div class="cx-meta"><span>${esc(W.name)} · ${isPair ? 'PAIR' : 'MEMBER'} // SCALE 1:1 · ${list.length} PCS</span></div></div><button class="cx-add">+ ${isPair ? '페어' : '캐릭터'} 추가</button></div>
      <div class="dz-rule cxr"><i></i></div>
      <div class="cx-scroll">${!list.length ? `<div class="cx-empty">NO ${isPair ? 'PAIR' : 'CHARACTER'} · 오른쪽 위 + 버튼으로 추가해요</div>`
        : isPair ? `<div class="cp-list">${list.map((m, i) => { const A = m.a || {}, B = m.b || {}; return `<button class="cp-card ${isOn(i) ? 'on' : ''}" data-ci="${i}">
          <div class="cp-h">${m.badge ? `<i class="cp-badge">✦ ${esc(m.badge)}</i>` : ''}<b>${esc(m.name)}</b><span>${esc(m.tags || '')}</span></div>
          <div class="cp-ph">${ph(m.photo, { seed: m.name + i, label: 'PAIR · 16:9' })}${m.since ? `<em class="cp-d">D+${pairDays(m.since)}</em>` : ''}<div class="cp-ov"><b>${esc(A.name || '')}<i>×</i>${esc(B.name || '')}</b><small>${esc(m.en || '')}</small></div></div>
          <div class="cp-f"><span>${esc(m.status || '')}</span><b>페어 프로필 →</b></div></button>`; }).join('')}</div>`
        : W.style === 'roster' ? rosterHTML(W, list, isOn)
        : W.grades ? gradesHTML(W, list, isOn)
        : teamsOf(W) ? teamsHTML(W, list, isOn)
        : `<div class="cx-grid">${list.map((m, i) => `<button class="cx-card ${isOn(i) ? 'on' : ''}" data-ci="${i}">
          ${ph(m.card, { cls: 'cx-ph', seed: m.name + i })}
          <span class="cx-ov"><small>${esc(m.dept)}</small><span class="cx-nm">${esc(m.name)}</span>${m.en ? `<em class="cx-en">${esc(m.en)}</em>` : ''}</span></button>`).join('')}</div>`}</div>
    </div>`;
    cxAnim = false;
    const hd = b.closest('.win')?.querySelector('.cxh-tabs');
    if (hd) hd.innerHTML = (C.tabs || []).map(([k, t]) => `<button class="btab cxt ${k === charTabKey ? 'on' : ''} ${k === 'au' ? 'ico' : ''}" data-ck="${k}" title="${esc(t)}"><span class="fav f-${k}">${ic(CHAR_TAB_ICON[k] || 'idcard')}</span>${k === 'au' ? '' : `${esc(t)}<em>${(W[k] || []).length}</em>`}</button>`).join('');
  };
  const w = wins.get('chars');
  if (w) { render(w.body); w.el.classList.remove('min'); focusWin('chars'); setTask('chars', cworld().name); return; }
  openWin('chars', {
    cls: 'cxwin', title: 'Characters', task: cworld().name, x: 180, y: 60, w: 360, h: 680, ...(charLayout()?.list || {}), ...(charLayout() && !wins.get('chardet') && !wins.get('agent') ? { x: charLayout().solo } : {}),
    head: `<span class="dots3"><i data-a="close" title="닫기"></i><i data-a="min" title="최소화"></i><i></i></span><div class="cxh-tabs"></div><span class="cw-drag"></span>`, noBtns: true,
    onClose: () => { closeWin('chardet'); closeWin('agent'); charAudio.pause(); },
    render(b, rec) {
      render(b);
      $('.cxh-tabs', rec.el).addEventListener('click', e => { const t = e.target.closest('[data-ck]'); if (t) { e.stopPropagation(); charTabKey = t.dataset.ck; pairOv = null; cxAnim = true; render(b); } });
      b.addEventListener('click', e => {
        const t = e.target.closest('[data-ck]'); if (t) { charTabKey = t.dataset.ck; render(b); return; }
        // 페어 : 목록 창 위에 캐릭터 사진(동그라미 두 개) 화면 → PAIR 버튼을 누르면 옆 창에 페어 상세
        if (pairOv != null && charTabKey === 'pair') {
          const cw = cworld(), pm = (cw.pair || [])[pairOv] || {};
          if (e.target.closest('.pf-x')) { pairOv = null; cxAnim = true; render(b); return; }
          const sd = e.target.closest('[data-side]'); if (sd) { pairSide = sd.dataset.side; render(b); return; }
          const pfs = e.target.closest('[data-pfsong]'); if (pfs) { const J = pairSideInfo(cw, pm[pfs.dataset.pfsong] || {}); charPlay(J.theme?.src, J.theme?.title || 'CHARACTER SONG'); return; }
          if (e.target.closest('.cp-log')) { charSel = { w: charWorld, t: 'pair', i: pairOv }; pairView = 'log'; pairFlip = false; openCharDetail(); return; }
          return;
        }
        const c = e.target.closest('[data-ci]'); if (c) {
          if (charTabKey === 'pair') { pairOv = null; pairSide = 'a'; pairView = 'float'; pairFlip = false; charSel = { w: charWorld, t: 'pair', i: +c.dataset.ci }; render(b); openCharDetail(); return; }   // 영상처럼: 오른쪽에 캐릭터 사진 창
          charSel = { w: charWorld, t: charTabKey, i: +c.dataset.ci }; charView = 'photo'; charTab = 'profile'; pairFlip = false; pairView = 'float'; pairSide = 'a'; render(b); openCharDetail(); return; }
        if (e.target.closest('.cx-add')) { if (OWNER) dispatchEvent(new CustomEvent('sye-char', { detail: { w: charWorld, t: charTabKey, i: null } })); else toast({ title: '캐릭터 추가', text: 'data.js 의 characters → worlds 안 MEMBER·PAIR·AU 에 캐릭터를 넣어주세요', icon: 'idcard' }); }
      });
    }
  });
}
function charDetailHTML() {
  const cur = charNow(); if (!cur) return '';
  const { w, m } = cur;
  if (charSel.t === 'pair') return pairView === 'log' ? pairDetailHTML(w, m) : pairFloatHTML(w, m);
  if (!['profile', 'prompt', 'gallery'].includes(charTab)) charTab = 'profile';
  const tags = `<div class="cd-tags">${(m.tags || []).map(t => `<i>${esc(t)}</i>`).join('')}<i class="ed">✎ 줄 추가 · 삭제</i></div>`;
  const foot = `<div class="cy-foot2"><button class="cd-toggle">${charView === 'photo' ? 'PROFILE' : 'PHOTO'} ↗</button></div>`;
  const top = `<div class="cy-top"><small>SPEC SHEET · No.${pad(charSel.i + 1)}</small></div>`;
  if (charView === 'photo') { const tg = (m.tags || []).filter(Boolean), song = m.theme || {};   // 영상처럼: 위 정보 카드 · 큰 사진 · 아래 노래 + PROFILE
    return `<div class="cy-pcard fl"><button class="pf-x" title="닫기">${ic('x')}</button><small>${esc(w.name)}${m.dept ? ' · ' + esc(m.dept) : ''}</small><b>${esc(m.name)}${m.en ? `<span class="pf-en">${esc(m.en)}</span>` : ''}</b>${m.quote ? `<em>“${esc(m.quote)}”</em>` : ''}
      <div class="cd-tags">${tg.map(t => `<i>${esc(t)}</i>`).join('')}</div></div>
    <div class="cf-stage"><div class="cy-pv">${phFb(m.photo, m.card, { seed: m.name + 0, icon: 'idcard' })}</div></div>
    <div class="pf-bar"><button class="pf-song" data-msong="1"><span class="pf-play">${ic('play')}</span><b>${esc(song.title || 'CHARACTER SONG')}</b><i>···</i></button><button class="pf-pair cd-toggle">PROFILE ↗</button></div>`; }
  let tb = '';
  const GL = (m.gallery && m.gallery.length) ? m.gallery : ['', '', ''];
  const galHTML = (L) => `<div class="cd-gal">${L.map((g, i) => ph(g, { seed: m.name + 'g' + i, icon: 'heart' })).join('')}</div>`;
  if (charTab === 'profile') { const P = m.profile || {}, ST = m.stats || [];
    tb = `<div class="cd-sec">기본 정보</div><div class="cd-rows">${(P.rows || []).map(([k, v]) => `<div><span>${esc(k)}</span><b>${esc(v)}</b></div>`).join('')}</div>
      ${P.personality ? `<div class="cd-sec">성격</div><p>${esc(P.personality)}</p>` : ''}
      ${P.memo ? `<div class="cd-memo"><small>MEMO</small><p>${esc(P.memo)}</p></div>` : ''}`; }
  else if (false) { const P = m.profile || {}; tb = `<div class="cd-sec">기본 정보</div><div class="cd-rows">${(P.rows || []).map(([k, v]) => `<div><span>${esc(k)}</span><b>${esc(v)}</b></div>`).join('')}</div>
      ${P.personality ? `<div class="cd-sec">성격</div><p>${esc(P.personality)}</p>` : ''}${P.memo ? `<div class="cd-sec">MEMO</div><p>${esc(P.memo)}</p>` : ''}`; }
  else if (charTab === 'prompt') { const L = m.prompts || []; tb = `${L.map((p, i) => `<div class="cd-pr"><div class="cd-pr-h">☾ ${esc(p.title)}<button data-copy="${i}">COPY</button></div><div class="cd-pr-b">${esc(p.text)}</div></div>`).join('')}
      ${L.length ? '<button class="cd-copyall">COPY ALL</button>' : ''}`; }
  else if (charTab === 'gallery') tb = galHTML(GL);
  else if (charTab === 'music') tb = (m.music || []).map((x, i) => `<button class="cd-song" data-song="${i}"><span>${pad(i + 1)}</span><b>${esc(x.title)}<small>${esc(x.artist || '')}</small></b>${ic('play')}</button>`).join('') || '<div class="cx-empty">노래를 추가해 주세요</div>';
  else tb = (m.talk || []).map(t => `<div class="cd-talk"><div class="cd-talk-h">${ph(t.avatar, { cls: 'av', seed: t.name })}<div><b>${esc(t.name)}${t.best ? '<i>BEST</i>' : ''}</b><small>${esc(t.relation || '')} · “${esc(t.call || '')}”</small></div><span>♥ ${Number(t.likes || 0).toLocaleString()}</span></div>
      <p>${esc(t.text)}</p>${(t.replies || []).map(([n, x], j) => `<div class="cd-rep ${j % 2 ? 'b' : ''}"><b>${esc(n)}</b> ${esc(x)}</div>`).join('')}</div>`).join('');
  const arch = charTab !== 'profile';
  const sw = `<div class="cy-sw"><button class="${arch ? '' : 'on'}" data-ct="profile"><span class="ic">♢</span><b>PROFILE</b></button><button class="${arch ? 'on' : ''}" data-ct="prompt"><span class="ic">✦</span><b>ARCHIVE</b></button></div>`;
  const foot2 = `<div class="cy-foot3"><button class="cd-toggle">${charView === 'photo' ? 'PROFILE' : 'PHOTO'} ↗</button></div>`;
  return `<div class="cy-tabs2">${['profile', 'prompt', 'gallery'].map((t, i) => `<button class="${t === charTab ? 'on' : ''}" data-ct="${t}"><i>0${i + 1}</i>${t.toUpperCase()}</button>`).join('')}<button class="cy-song" title="CHARACTER SONG">♪</button></div><div class="cy-hero"><div class="cy-photo">${ph(pv(m.card, m.photo), { seed: m.name + 0 })}</div>
      <div class="cy-info"><small>${esc(w.name)} · ${esc(m.dept)}</small><b>${esc(m.name)}</b><em>“${esc(m.quote)}”</em>${tags}
        <div class="cy-spec">${(m.spec || []).slice(0, 4).map(([k, v]) => `<div><small>${esc(k)}</small><b>${esc(v)}</b></div>`).join('')}</div></div></div>
    <div class="cy-body">${tb}</div>${foot2}`;
}
let pairFlip = false, pairView = 'float', pairSide = 'a';
function syncDet() { const d = wins.get('chardet'); if (!d) return; d.el.classList.toggle('float', !!charSel && (charSel.t === 'pair' ? pairView !== 'log' : charView === 'photo'));
  const cn = charNow(); if (!cn) return; const pr = charSel.t === 'pair';
  $('.cyh-t', d.el).textContent = pr ? 'PAIR PROFILE' : 'MEMBER PROFILE';
  $('.cyh-s', d.el).textContent = cn.m.name || ''; fitDet(d.el); }
// 상세창: 창 높이가 모자라면(전체화면 등) 간격만 촘촘하게 해서 스크롤 없이 한 번에 보이게
function fitDet(el) {
  el.classList.remove('fit');
  const b = el.querySelector('.cy-body'); if (!b || charTab !== 'profile' || el.classList.contains('float')) return;
  if (b.scrollHeight > b.clientHeight + 1) el.classList.add('fit');
}
addEventListener('resize', () => { const d = wins.get('chardet'); if (d) requestAnimationFrame(() => fitDet(d.el)); });
// 페어 속 캐릭터 정보: a/b 에 적은 값 → 없으면 link 로 연결된 MEMBER 의 값
function pairSideInfo(w, x) {
  const mm = x.link ? (w.member || []).find(y => UN(y.name) === UN(x.link)) : null;
  return { name: x.name || mm?.name || '', en: x.en ?? mm?.en ?? '', sub: x.sub || mm?.dept || mm?.tag || '', quote: x.quote ?? mm?.quote ?? '', tags: x.tags || mm?.tags || [],
    photo: pv(x.photo, mm?.photo, mm?.card, mm?.hero), avatar: pv(x.avatar, mm?.avatar, mm?.card), theme: x.theme || mm?.theme || null,
    // 전환 동그라미 : 페어에 따로 넣은 게 있으면 그것 · 아니면 캐릭터 설정대로 (같게 = 목록 사진 / 모두 따로 = 캐릭터 동그라미 자리)
    avHTML: o => SRC(x.avatar) || !mm ? phFb(x.avatar, x.photo, o) : mm.picMode === 'sep' ? phFb(mm.avatar, mm.card, o) : ph(pv(mm.card, mm.photo), o) };
}
function pairFloatHTML(w, m) {
  const sides = ['a', 'b'].filter(k => m[k]); if (!sides.includes(pairSide)) pairSide = sides[0] || 'a';
  const I = pairSideInfo(w, m[pairSide] || {});
  const tg = Array.isArray(I.tags) ? I.tags : [I.tags];
  const song = I.theme || {};
  return `<div class="cy-pcard fl"><button class="pf-x" title="닫기">${ic('x')}</button><small>${esc(w.name)}${I.sub ? ' · ' + esc(I.sub) : ''}</small><b>${esc(I.name)}${I.en ? `<span class="pf-en">${esc(I.en)}</span>` : ''}</b>${I.quote ? `<em>“${esc(I.quote)}”</em>` : ''}
    <div class="cd-tags">${tg.filter(Boolean).map(t => `<i>${esc(t)}</i>`).join('')}</div></div>
  <div class="cf-stage"><div class="cy-pv" data-k="${pairSide}">${ph(I.photo, { seed: I.name + 0, icon: 'idcard' })}</div>
    <div class="cf-side">${sides.map(k => { const J = pairSideInfo(w, m[k]); return `<button class="cf-av ${k === pairSide ? 'on' : ''}" data-side="${k}" title="${esc(J.name)}">${J.avHTML({ cls: 'av', seed: J.name || k })}</button>`; }).join('')}</div></div>
  <div class="pf-bar"><button class="pf-song" data-pfsong="${pairSide}"><span class="pf-play">${ic('play')}</span><b>${esc(song.title || 'CHARACTER SONG')}</b><i>···</i></button><button class="pf-pair cp-log">PAIR ↗</button></div>`;
}
function pairDays(since) { const t = new Date(String(since).replace(/\./g, '-') + 'T00:00:00'); if (isNaN(t)) return 0; const n = new Date(); n.setHours(0, 0, 0, 0); return Math.floor((n - t) / 864e5) + 1; }
function pairDetailHTML(w, m) {
  const A = m.a || {}, B = m.b || {}, n = m.since ? pairDays(m.since) : 0;
  const next = (m.next && m.next > n) ? m.next : Math.ceil((n + 1) / 100) * 100;
  const chip = (x, k) => `<button class="cz-chip ${x.link ? 'lk' : ''}" ${x.link ? `data-link="${k}"` : ''}>${ph(x.avatar, { cls: 'av', seed: x.name || k })}<span><b>${esc(x.name || '')}</b><small>${esc(x.sub || '')}${x.link ? ' ↗' : ''}</small></span></button>`;
  return `<div class="cy-pcard nt"><small>${esc(w.name)} · DUET</small><b>${esc(m.name)}${m.en ? `<span class="en">${esc(m.en)}</span>` : ''}</b>${m.quote ? `<em>“${esc(m.quote)}”</em>` : ''}
    <div class="cd-tags">${m.tags ? `<i>${esc(m.tags)}</i>` : ''}${m.status ? `<i class="st">● ${esc(m.status)}</i>` : ''}<i class="ed">✎ 줄 추가 · 삭제</i></div></div>
  <div class="cz-body">
    <div class="cz-ph flip"><div class="flip-in">
      <div class="face front">${ph(m.photo, { seed: m.name + 'a', label: 'PHOTO · 16:9' })}</div>
      <div class="face back" data-slot="${esc(SPATH(m.back))}">${SRC(m.back) ? `<img src="${esc(SRC(m.back))}" alt="">` : `<div class="pb-txt"><small>${esc(w.name)} · DUET</small><b>${esc(A.name || '')}<em>×</em>${esc(B.name || '')}</b><p>${esc(m.since || '')} · D+${n}</p></div>`}</div></div>
      <span class="flip-hint" title="뒤집기">${ic('refresh')}</span></div>
    <div class="cz-mem">${chip(A, 'a')}<i>×</i>${chip(B, 'b')}</div>
    ${m.memo ? `<div class="cz-memo">${esc(m.memo)}</div>` : ''}
    <div class="cz-stat"><div><small>SINCE</small><b>${esc(m.since || '—')}</b></div><div><small>STATUS</small><b>${esc(m.status || '—')}</b></div><div><small>TOGETHER</small><b>D+${n}</b></div><div><small>NEXT</small><b>D+${next}</b></div></div>
  </div><div class="cy-foot2"><button class="cd-toggle cp-log">CHARACTER ↗</button></div>`;
}
function charPlay(src, title) {
  if (!src) { toast({ title: '♪ ' + (title || ''), text: 'data.js 에서 src 에 노래 주소를 넣으면 재생돼요', icon: 'music' }); return; }
  if (typeof pause === 'function') pause();
  if (!charAudio.src.endsWith(src)) { charAudio.src = src; charAudio.play().catch(() => {}); }
  else charAudio.paused ? charAudio.play().catch(() => {}) : charAudio.pause();
}
function openCharDetail() {
  const cn = charNow(); if (!cn) return;
  if (cn.w.style === 'roster' && charSel.t !== 'pair') { if (wins.get('chardet')) closeWin('chardet'); return openAgent(); }
  if (wins.get('agent')) closeWin('agent');
  const w = wins.get('chardet');
  if (w) { w.body.innerHTML = charDetailHTML(); syncDet(); w.el.classList.remove('min'); focusWin('chardet'); return; }
  openWin('chardet', {
    cls: 'cydet', title: 'Profile', task: 'Profile', x: 552, y: 60, w: 340, h: 680, ...(charLayout()?.det || {}),
    head: `<span class="dots3"><i></i><i></i><i></i></span><span class="win-t cyh-t">MEMBER PROFILE</span><span class="win-s cyh-s"></span><span class="cw-drag"></span>`, acc: true,
    onClose: () => charAudio.pause(),
    render(b) {
      const re = () => { b.innerHTML = charDetailHTML(); syncDet(); };
      re();
      charAudio.onplay = charAudio.onpause = () => { const p = b.querySelector('.cd-play'); if (p) p.innerHTML = ic(!charAudio.paused ? 'pause' : 'play'); };
      b.addEventListener('click', e => {
        const c = charNow(); if (!c) return; const M = c.m;
        if (e.target.closest('.pf-x')) { closeWin('chardet'); return; }
        if (e.target.closest('[data-msong]')) { charPlay(M.theme?.src, M.theme?.title || 'CHARACTER SONG'); return; }
        const pfs = e.target.closest('[data-pfsong]'); if (pfs) { const J = pairSideInfo(c.w, M[pfs.dataset.pfsong] || {}); charPlay(J.theme?.src, J.theme?.title || 'CHARACTER SONG'); return; }
        if (e.target.closest('.cz-flip')) { pairFlip = !pairFlip; re(); return; }
        const sd = e.target.closest('[data-side]'); if (sd) { pairSide = sd.dataset.side; re(); return; }
        if (e.target.closest('.cp-log')) { if (pairView === 'log' && wins.get('chars')) { pairOv = charSel.i; charTabKey = 'pair'; openChars(); return; } pairView = pairView === 'log' ? 'float' : 'log'; re(); return; }
        const lk = e.target.closest('[data-link]'); if (lk) { const nm = (M[lk.dataset.link] || {}).link, W = c.w, j = (W.member || []).findIndex(x => UN(x.name) === UN(nm));
          if (j < 0) { toast({ title: nm || '캐릭터', text: 'MEMBER 에서 같은 이름의 캐릭터를 찾지 못했어요', icon: 'idcard' }); return; }
          charSel = { w: charSel.w, t: 'member', i: j }; charView = 'panel'; charTab = 'profile'; if (wins.get('chars')) { charTabKey = 'member'; openChars(); } openCharDetail(); return; }
        if (e.target.closest('.cd-toggle')) { charView = charView === 'photo' ? 'panel' : 'photo'; re(); return; }
        const t = e.target.closest('[data-ct]'); if (t) { charTab = t.dataset.ct; re(); return; }
        const cp = e.target.closest('[data-copy]'); if (cp) { navigator.clipboard?.writeText(M.prompts[+cp.dataset.copy].text); cp.textContent = 'COPIED'; setTimeout(() => cp.textContent = 'COPY', 1200); return; }
        const ca = e.target.closest('.cd-copyall'); if (ca) { navigator.clipboard?.writeText(M.prompts.map(p => `[${p.title}]\n${p.text}`).join('\n\n')); ca.textContent = 'COPIED ✓'; setTimeout(() => ca.textContent = 'COPY ALL', 1200); return; }
        const sg = e.target.closest('[data-song]'); if (sg) { const x = M.music[+sg.dataset.song]; charPlay(x.src, x.title); return; }
        if (e.target.closest('.cd-play') || e.target.closest('.cy-song')) charPlay(M.theme?.src, M.theme?.title || 'CHARACTER SONG');
      });
    }
  });
}

/* ---------- ARCH 상세 (AGENT PROFILE) ---------- */
let agentTab = 'profile';
function agentSecHTML(x) {
  if (x.type === 'directive') return `<div class="mp-sec directive"><small>${esc(x.label || '')}</small><b>${esc(x.title || '')}</b><p>${esc(x.sub || '')}</p></div>`;
  if (x.type === 'report') return `<div class="mp-sec"><h4>${esc(x.title || '')}</h4><div class="bx">${(x.paragraphs || []).map(p => `<p>${p}</p>`).join('')}</div></div>`;
  if (x.type === 'table') return `<div class="mp-sec ag-t"><h4>${esc(x.title || '')}</h4><div class="ag-rows">${(x.rows || []).map(([k, v]) => `<div><span>${esc(k)}</span><b class="${/^\[/.test(v) ? 'at' : ''}">${esc(v)}</b></div>`).join('')}</div>
      ${x.eval ? `<div class="ag-ev"><small>${esc(x.evalLabel || '')}</small><p>${esc(x.eval)}</p></div>` : ''}</div>`;
  if (x.type === 'analysis') return `<div class="mp-sec ag-a"><h4>${esc(x.title || '')}</h4>${(x.groups || []).map(g => `<div class="ag-gl">${esc(g.label || '')}</div><ul>${(g.items || []).map(([k, v]) => `<li><b>${esc(k)}:</b> ${esc(v)}</li>`).join('')}</ul>`).join('')}</div>`;
  if (x.type === 'protocol') return `<div class="mp-sec ag-w"><h4>⚠ ${esc(x.title || '')}</h4><p>${x.text || ''}</p></div>`;
  return '';
}
// ARCH 프로필 : 위 동그라미 줄 = 이 캐릭터 + 이 캐릭터의 상대(duo) 캐릭터들 (목록의 다른 캐릭터가 아니에요)
let agentWho = 0, agentKey = '';
function drawAgent(rec) {
  const cn = charNow(); if (!cn) return; const { w: W } = cn, m0 = cn.m, b = rec.body;
  const key = charSel.w + '/' + charSel.i; if (key !== agentKey) { agentKey = key; const mm = ((S.characters?.worlds || {})[charSel.w]?.[charSel.t] || [])[charSel.i]; agentWho = mm && mm.duoFirst ? 1 : 0; }
  // 캐릭터 하나 = 칸 두 개 : 01 채팅하는 캐릭터 · 02 내 페르소나 (캐릭터마다 따로)
  const duo = Array.isArray(m0.duo) ? m0.duo : []; if (agentWho > 1) agentWho = 0;
  const P = duo[0] || { name: '페르소나', tag: 'PERSONA', level: '[ PERSONA FILE ]', quote: OWNER && SYE_ON ? '‘위의 02 칸을 눌러 이 캐릭터의 페르소나를 만들어요.’' : '‘아직 페르소나가 없어요.’', gallery: [], sections: [], _empty: true };
  const m = agentWho ? P : m0;
  rec.el.classList.toggle('dark', m.theme === 'dark');
  $('.mcode', rec.el).textContent = `${W.term || 'TERMINAL'} · ${m.code || ''}`;
  $('.mf', rec.el).textContent = `FILE 0${agentTab === 'gallery' ? 2 : 1} / 02`;
  const ft = $('.ft', rec.el); if (ft) ft.textContent = W.footer || S.venue;
  const strip = m0.duoFirst ? [[P, 1], [m0, 0]] : [[m0, 0], [P, 1]], ROLE = ['CHARACTER', 'PERSONA'];
  let body;
  if (agentTab === 'gallery') { const G = m.gallery || []; body = `<div class="mp-gal"><div class="mp-gal-h">${esc(m.name)} · GALLERY<small>${G.length} PHOTOS</small></div><div class="g">${G.map((g, i) => ph(g, { seed: m.name + i, icon: 'heart' })).join('')}</div></div>`; }
  else { const hs = SPATH(m.hero) || SPATH(pv(m.hero, m.card)), hsrc = SRC(m.hero) || SRC(m.card), hip = hs && (S.imgPos || {})[hs];
  body = `<div class="mp-hero ph ${V(m.name)} ${m.theme === 'dark' ? '' : 'lt'}" data-slot="${esc(hs)}"${SPATH(m.card) && SPATH(m.card) !== hs ? ` data-fb="${esc(SPATH(m.card))}"` : ''}>${hsrc ? `<img src="${esc(hsrc)}" alt=""${hip ? ` style="${imgPosCss(hip)}"` : ''}>` : `<span class="ph-ic">${ic('idcard')}</span>`}${m.badge ? `<span class="ent">${esc(m.badge)}</span>` : ''}
      <div class="cap"><small>${esc(m.level || '')}</small><h3>${esc(m.name)}</h3><p>${esc(m.quote || '')}</p></div></div>${(m.sections || []).map(agentSecHTML).join('')}`; }
  b.innerHTML = `<div class="mp-tabs" style="grid-template-columns:repeat(2,minmax(0,1fr))">${strip.map(([x, k]) => `<button class="mp-tab ${k === agentWho ? 'on' : ''}${x._empty ? ' empty' : ''}" data-whok="${k}"${x._empty && OWNER && SYE_ON ? ' data-duo-add="1"' : ''}>${phFb(x.avatar, x.card, { cls: 'av', seed: x.name })}<span><b>${esc(x.name)}</b><small>${String(strip.findIndex(z => z[1] === k) + 1).padStart(2, '0')} · ${ROLE[k]}</small></span></button>`).join('')}${OWNER && SYE_ON ? `<button class="mp-swap" data-duo-swap="1" title="캐릭터 · 페르소나 자리 바꾸기">⇄</button>` : ''}</div>
    <div class="mp-body"><div class="mp-sub"><button class="${agentTab === 'profile' ? 'on' : ''}" data-tab="profile"><i>01</i>PROFILE</button><button class="${agentTab === 'gallery' ? 'on' : ''}" data-tab="gallery"><i>02</i>GALLERY</button>
    <span class="r">${m.bgm != null ? `<button data-song="${m.bgm}">♪ BGM</button>` : ''}${m.song != null ? `<button data-song="${m.song}">♪ CHARACTER SONG</button>` : ''}</span></div>
    <div class="mp-scroll">${body}</div></div>`;
}
function openAgent() {
  const ex = wins.get('agent'); agentTab = 'profile';
  if (ex) { drawAgent(ex); ex.el.classList.remove('min'); focusWin('agent'); return; }
  openWin('agent', {
    head: `<span class="dots3 g"><i></i><i></i><i></i></span><span class="win-t" style="font-weight:800">AGENT PROFILE</span><span class="win-s mcode"></span>`, acc: true,
    cls: 'memberwin agentwin', title: 'Profile', task: 'Profile', x: 552, y: 60, w: 440, h: 680, ...(charLayout()?.det || {}),
    foot: `<span class="mf">FILE 01 / 02</span><span class="sig"><i style="height:3px"></i><i style="height:5px"></i><i style="height:7px"></i><i style="height:9px;opacity:.35"></i></span><span class="ft"></span>`, footCls: 'mono',
    render(b, rec) {
      b.style.cssText = 'display:flex;flex-direction:column;overflow:hidden';
      drawAgent(rec);
      b.addEventListener('click', e => {
        const dd = e.target.closest('[data-duo-del]'); if (dd) { e.stopPropagation(); if (confirm('이 상대 캐릭터를 지울까요?')) dispatchEvent(new CustomEvent('sye-duo', { detail: { w: charSel.w, i: charSel.i, del: +dd.dataset.duoDel } })); return; }
        const ds = e.target.closest('[data-duo-swap]'); if (ds) { e.stopPropagation(); dispatchEvent(new CustomEvent('sye-duo', { detail: { w: charSel.w, i: charSel.i, swap: true } })); return; }
        const da = e.target.closest('[data-duo-add]'); if (da) { dispatchEvent(new CustomEvent('sye-duo', { detail: { w: charSel.w, i: charSel.i } })); return; }
        const w = e.target.closest('[data-whok]'); if (w) { agentWho = +w.dataset.whok; agentTab = 'profile'; drawAgent(rec); focusWin('agent'); return; }
        const t = e.target.closest('[data-tab]'); if (t) { agentTab = t.dataset.tab; drawAgent(rec); return; }
        const sg = e.target.closest('[data-song]'); if (sg) load(+sg.dataset.song);
      });
    }
  });
}

/* ---------- 6×4 새 칸 창 ---------- */
function openExtra(key) {
  const X = (S.extraApps || []).find(x => x.id === key); if (!X) return;
  if (['about', 'inventory', 'linked'].includes(X.type)) return openDossier(X);
  if (X.type === 'ooc' || X.type === 'prompt') return openRoom(X);
  const n = (S.extraApps || []).indexOf(X);
  openWin('x-' + key, {
    icon: X.icon || X.id, title: X.name, sub: 'SETLIST / APPLICATIONS', task: X.name, cls: 'xwin',
    x: 380 + (n % 4) * 26, y: 70 + (n % 4) * 18, w: 300, h: 520,
    render(b) {
      b.classList.add('xw');
      if (X.type === 'grid') {
        const bg = ['#31ACBD', '#D3F2EC', '#E4F6F9', '#22B5A0', '#E4F6F9', '#31ACBD'];
        b.innerHTML = `<div class="xw-path">${ic('folder')}SETLIST / <b>${esc(X.name)}</b></div>
          <div class="xw-grid">${(X.items || []).map(([t, dt, src], i) => `<div style="animation-delay:${(.08 + i * .05).toFixed(2)}s"><div class="xw-ph" style="background:${bg[i % 6]};color:${[0, 3, 5].includes(i % 6) ? '#fff' : '#628E94'}">${src ? `<img src="${esc(src)}" alt="">` : '[사진]'}</div><b>${esc(t)}</b><small>${esc(dt)}</small></div>`).join('')}</div>`;
      } else {
        b.innerHTML = `<div class="xw-big">${esc(X.name)}</div>
          ${(X.rows || []).map(([t, dt], i) => `<div class="xw-row ${i ? '' : 'on'}" style="animation-delay:${(.06 + i * .05).toFixed(2)}s"><i></i><span>${esc(t)}</span><small>${esc(dt)}</small></div>`).join('')}`;
      }
    }
  });
}

/* ---------- OOC 보관함 · 프롬프트 보관함 (ROOM 04 · 05 시안 → SYRINGE 민트) ---------- */
const RM_STAR = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7z"/></svg>';
const RM_KEY = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M9 15a4 4 0 110-8 4 4 0 010 8z M13 11h8 M18 11v3 M21 11v2"/></svg>';
const RM_COPY = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 9h10v10H9z M5 15V5h10"/></svg>';
const RM_OK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>';
function rmCopy(text) { text = UN(text);
  const fb = () => { try { const ta = document.createElement('textarea'); ta.value = text; ta.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); } catch (e) {} };
  try { if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).catch(fb); else fb(); } catch (e) { fb(); }
}
function openRoom(X) {
  const isP = X.type === 'prompt', num = String(X.room || '').replace(/\D/g, '').padStart(2, '0') || (isP ? '05' : '04');
  const st = { cat: 0, sel: null, copied: null }; let tm = 0;
  const wz0 = WZ * Math.min(WIN_SMALL, passZoom(true)), w = 440, h = 640;
  const btn = (key, label, on) => { const d = st.copied === key; return `<button class="rm-copy ${d ? 'done' : on ? 'on' : ''}" data-cp="${esc(key)}">${d ? RM_OK : RM_COPY}${d ? (label === 'COPY BOTH' ? 'COPIED BOTH' : 'COPIED') : label}</button>`; };
  const cats = X.cats || [];
  const oocBody = () => { const c = cats[st.cat] || { items: [] };
    return `<div class="rm-panel"><div class="rm-chips">${cats.map((x, i) => `<button class="rm-chip ${i === st.cat ? 'on' : ''}" data-cat="${i}"><i></i>${esc(x.n)}<em>${(x.items || []).length}</em></button>`).join('')}</div></div>
      <div class="rm-sh"><b>${esc(c.k || '')}</b><span>${esc(c.n || '')}</span><i></i><small>${(c.items || []).length} OOC</small></div>
      <div class="rm-list">${(c.items || []).map((t, i) => `<div class="rm-item" style="animation-delay:${(i * .05).toFixed(2)}s"><i class="rm-tick"></i><p>${esc(t)}</p><div class="rm-if"><small>No.${pad(i + 1)}</small>${btn(st.cat + '-' + i, 'COPY')}</div></div>`).join('')}</div>`; };
  const pBody = () => { const c = cats[st.cat] || { items: [] }, L = c.items || [], no = i => esc(String(c.k || '').slice(0, 3)) + '-' + pad(i + 1);
    const seg = `<div class="rm-seg" style="--n:${Math.max(1, cats.length)}"><span class="rm-knob" style="left:calc(5px + ${st.cat} * (100% - 10px) / ${Math.max(1, cats.length)})"></span>${cats.map((x, i) => `<button class="${i === st.cat ? 'on' : ''}" data-cat="${i}"><b>${esc(x.k)}</b><span>${esc(x.n)} · ${(x.items || []).length}</span></button>`).join('')}</div>`;
    if (st.sel == null || !L[st.sel]) return seg + `<div class="rm-grid">${L.map((e, i) => `<button class="rm-th ${e.wide ? 'wide' : 'tall'}" data-sel="${i}"><div class="rm-fr">${ph(e.image, { cls: 'rm-ph', seed: 'pr' + e.t, icon: 'gallery' })}</div><div class="rm-tl"><small>${no(i)}</small><b>${esc(e.t)}</b></div></button>`).join('')}</div><div class="rm-note">— 사진을 눌러 프롬프트 보기 —</div>`;
    const e = L[st.sel], i = st.sel, k = st.cat + '-' + i;
    const slot = (key, kk, n, text, cls) => `<div class="rm-slot"><div class="rm-sl-h"><span class="rm-sic ${cls}">${cls === 'bg' ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18l6-8 4 5 3-3 5 6z M16.5 7.5a1.5 1.5 0 100-.01"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7a2 2 0 112-2 M14 5c0 1.2-2 1.6-2 3 M12 8L3 16h18z"/></svg>'}</span><b>${kk}</b><span>${n}</span>${btn(k + key, 'COPY')}</div><div class="rm-pre">${esc(text || '')}</div></div>`;
    const slots = slot('b', 'BACKGROUND', '배경', e.bg, 'bg') + slot('f', 'OUTFIT', '의상', e.fit, 'fit');
    const res = (e.images && e.images.length ? e.images : ['', '', '']).slice(0, 3);
    return seg + `<div class="rm-dh"><button class="rm-back" data-back="1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>PHOTOS</button><small>${no(i)}</small><b>${esc(e.t)}</b></div>
      <div class="rm-panel rm-det ${e.wide ? 'wide' : 'tall'}">${e.wide ? `<div class="rm-big">${ph(e.image, { cls: 'rm-ph', seed: 'pr' + e.t, label: '예시 사진 · 가로', icon: 'gallery' })}</div><div class="rm-slots">${slots}</div>`
        : `<div class="rm-two"><div class="rm-big">${ph(e.image, { cls: 'rm-ph', seed: 'pr' + e.t, label: '예시 사진', icon: 'gallery' })}</div><div class="rm-slots">${slots}</div></div>`}
        <div class="rm-all">${btn(k + 'a', 'COPY BOTH', true)}</div></div>
      <div class="rm-res"><div class="rm-rh"><span class="rm-rok">${RM_OK}</span><b>RESULT</b><span>적용하면 이렇게 나와요</span></div><div class="rm-r3 ${e.wide ? 'wide' : ''}">${res.map((im, j) => ph(im, { cls: 'rm-ph', seed: 'res' + e.t + j, label: '결과 ' + (j + 1), icon: 'gallery' })).join('')}</div></div>`; };
  openWin('x-' + X.id, {
    cls: 'dzwin rmzw', title: X.name, task: X.name, noBtns: true, head: `<span class="cw-drag"></span>`,
    x: Math.max(12, Math.round((deskW() - w * wz0) / 2)), y: 72 + Math.max(0, Math.round((deskH() - 144 - h * wz0) / 2)), w, h,
    render(b, rec) {
      const draw = () => {
        const keep = b.querySelector('.rm-scroll')?.scrollTop || 0;
        b.innerHTML = `<div class="dz rm rmz"><div class="dz-head"><span class="dz-num">${num}</span><div><span class="dz-chip">${esc(X.room || X.chip || '')}</span><b>${esc(X.title || X.name)}</b><small>${esc(X.sub || '')}</small></div><button class="dz-x" data-x="1" title="닫기">${ic('x')}</button></div>
          <div class="dz-rule"><i></i></div>
          <div class="dz-body rm-scroll">${X.hint ? `<div class="dz-card dz-intro rmz-hint">${esc(X.hint).replace(/COPY/g, '<b>COPY</b>')}</div>` : ''}${isP ? pBody() : oocBody()}</div></div>`;
        const sc = b.querySelector('.rm-scroll'); if (sc) sc.scrollTop = keep;
        dragify(rec.el, $('.dz-head', b));
      };
      draw();
      b.addEventListener('click', e => {
        if (e.target.closest('[data-slot]') && document.documentElement.classList.contains('sye-editing')) return;
        if (e.target.closest('[data-x]')) { closeWin('x-' + X.id); return; }
        const ct = e.target.closest('[data-cat]'); if (ct) { st.cat = +ct.dataset.cat; st.sel = null; st.copied = null; draw(); b.querySelector('.rm-scroll').scrollTop = 0; return; }
        const sl = e.target.closest('[data-sel]'); if (sl) { st.sel = +sl.dataset.sel; st.copied = null; draw(); return; }
        if (e.target.closest('[data-back]')) { st.sel = null; st.copied = null; draw(); return; }
        const cp = e.target.closest('[data-cp]'); if (cp) {
          const key = cp.dataset.cp, c = cats[st.cat] || {}; let text = '';
          if (!isP) { const [ci, ii] = key.split('-').map(Number); text = (cats[ci]?.items || [])[ii] || ''; }
          else { const m = key.match(/^(\d+)-(\d+)([bfa])$/), it = m && (cats[+m[1]]?.items || [])[+m[2]]; if (it) text = m[3] === 'b' ? it.bg : m[3] === 'f' ? it.fit : `BACKGROUND: ${it.bg}\nOUTFIT: ${it.fit}`; }
          rmCopy(text || ''); st.copied = key; draw(); clearTimeout(tm); tm = setTimeout(() => { st.copied = null; draw(); }, 1400);
        }
      });
    }
  });
}
/* ---------- 자기소개 · 리스트 · 링크 창 (서류철 디자인) ---------- */
function openDossier(X) {
  const order = (S.extraApps || []).filter(x => ['about', 'inventory', 'linked'].includes(x.type));
  const num = pad(order.indexOf(X) + 1);
  const br = t => esc(t || '').replace(/\n|\\n/g, '<br>');
  let body = '';
  if (X.type === 'about') {
    body = `<div class="dz-card dz-info"><b class="dz-handle">${ic('chat')}${esc(X.handle || '')}</b>
        ${(X.info || []).map(([k, v], i) => `<div class="dz-kv"><small>${esc(k)}</small><span>${esc(v)}${i === (X.info.length - 1) && X.infoNote ? `<em>${esc(X.infoNote)}</em>` : ''}</span></div>`).join('')}</div>
      <div class="dz-card dz-table"><div class="dz-th"><span>ITEM</span><span>Notes</span></div>
        ${(X.table || []).map(([a, b], i) => `<div class="dz-tr" style="animation-delay:${(.12 + i * .05).toFixed(2)}s"><span>✦ ${esc(a)}</span><small>${br(b)}</small></div>`).join('')}</div>
      ${X.ng ? `<div class="dz-card dz-ng"><div><i>${esc(X.ng[0])}</i><b>✕ ${esc(X.ng[1])}</b></div><p>${esc(X.ng[2] || '')}</p></div>` : ''}
      <div class="dz-foot"><div><b>${esc(X.valid || '')}</b><small>${esc(X.org || '')}</small></div><span class="dz-stamp">${esc(X.stamp || 'APPROVED')}</span></div>`;
  } else if (X.type === 'inventory') {
    body = `${X.intro ? `<div class="dz-card dz-intro">${esc(X.intro)}</div>` : ''}
      ${(X.groups || []).map(([n, h, items], i) => `<div class="dz-card dz-grp" style="animation-delay:${(.1 + i * .06).toFixed(2)}s"><div class="dz-gh"><b>✦ ${esc(n)}</b>${h ? `<span>${esc(h)}</span>` : ''}</div>
        <div class="dz-chips">${(items || []).map(t => `<i>${esc(t)}</i>`).join('')}</div></div>`).join('')}`;
  } else {
    const B = X.banner || {};
    body = `<div class="dz-tagrow"><span class="dz-tag"><i></i>${esc(X.tag || '')}</span><small>${esc(X.no || '')}</small></div>
      <a class="dz-banner" ${B.link ? `href="${esc(B.link)}" target="_blank" rel="noopener"` : ''}>${ph(B.img, { seed: 'linked-banner', icon: 'link' })}<span class="dz-open">OPEN LINK ↗</span><i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i></a>
      <div class="dz-crew"><div class="dz-ch"><b>${esc(X.crewTitle || '')}</b><span>${esc(X.crewSub || '')}</span></div>
        <div class="dz-cg">${(X.crew || []).map(([top, r, nm, img, lk], i) => `<a class="dz-cc" ${lk ? `href="${esc(lk)}" target="_blank" rel="noopener"` : ''} style="animation-delay:${(.1 + i * .05).toFixed(2)}s"><div class="dz-cct"><b>✚ ${esc(top)}</b><i>${esc(r)}</i></div>${ph(img, { seed: 'crew' + i, icon: 'heart' })}<div class="dz-ccf"><small>성명</small><b>${esc(nm)}</b><span>님</span><button class="dz-heart" title="좋아요">${ic('heart')}</button></div></a>`).join('')}</div></div>`;
  }
  const wz0 = WZ * Math.min(WIN_SMALL, passZoom(true)), w = 400, h = 600;
  openWin('x-' + X.id, {
    cls: 'dzwin', title: X.name, task: X.name, noBtns: true,
    head: `<span class="cw-drag"></span>`,
    x: Math.max(12, Math.round((deskW() - w * wz0) / 2)), y: 72 + Math.max(0, Math.round((deskH() - 144 - h * wz0) / 2)), w, h,
    render(b, rec) {
      b.innerHTML = `<div class="dz"><div class="dz-head"><span class="dz-num">${num}</span><div>${X.no && X.type !== 'linked' ? `<span class="dz-chip">${esc(X.no)}</span>` : X.chip ? `<span class="dz-chip">${esc(X.chip)}</span>` : ''}<b>${esc(X.title || X.name)}</b><small>${esc(X.sub || '')}</small></div><button class="dz-x" data-a="close" title="닫기">${ic('x')}</button></div>
        <div class="dz-rule"><i></i></div><div class="dz-body">${body}</div></div>`;
      b.addEventListener('click', e => { const hb = e.target.closest('.dz-heart'); if (hb) { e.preventDefault(); e.stopPropagation(); hb.classList.toggle('on'); } });
      dragify(rec.el, $('.dz-head', b));
    }
  });
}

/* ---------- 폴더 창 · 글 ---------- */
function exBar(path) {
  return `<div class="ex-bar"><div class="nav2"><button data-back>${ic('chevl')}</button><button>${ic('chevr')}</button></div>
    <div class="crumb"><span class="ci">${ic('moon')}</span>${esc(S.brand.start)}${path.map((p, i) => `<span class="sep">›</span>${i === path.length - 1 ? `<b>${esc(p)}</b>` : esc(p)}`).join('')}</div>
    <div class="nav2"><button>${ic('grid')}</button><button>${ic('list')}</button></div></div>`;
}
function folderPosts(fid) { return fid === 'all' ? S.records.posts : S.records.posts.filter(p => p.folder === fid); }
function cardHTML(p, i) {
  return `<div class="card" data-post="${p.no}"><div class="phw">${ph(p.thumb, { label: p.thumbLabel || '', seed: p.title, icon: p.music ? '' : 'moon' })}<span class="no">No.${pad(i + 1)}</span></div>
    <h4><span>${esc(p.title)}</span><span class="tg">${esc(p.tag)}</span></h4>${p.excerpt ? `<p class="ex">${esc(p.excerpt)}</p>` : ''}
    <div class="cf"><span>${esc(p.date)}</span>${ic('share')}</div></div>`;
}
function openFolder(fid) {
  const f = S.records.folders.find(x => x.id === fid);
  const name = f ? f.name : '전체', sub = f ? f.name : '전체 기록';
  const render = b => {
    const list = folderPosts(fid);
    b.innerHTML = `${exBar(['Records', name])}${list.length ? `<div class="grid-cards">${list.map(cardHTML).join('')}</div>` : `<div class="empty">아직 이 폴더에 기록이 없어요.</div>`}`;
  };
  const w = wins.get('folder');
  if (w) {
    render(w.body); setSub('folder', sub); setTask('folder', name);
    $('.win-f span', w.el).textContent = `${folderPosts(fid).length}개 기록`;
    w.el.classList.remove('min'); focusWin('folder'); return;
  }
  openWin('folder', {
    icon: 'folder', title: 'Records', sub, task: name, acc: true, x: 68, y: 90, w: 656, h: 616,
    foot: `<span>${folderPosts(fid).length}개 기록</span><span>${esc(S.footer)}</span>`,
    render(b) {
      render(b);
      b.addEventListener('click', e => {
        if (e.target.closest('[data-back]')) { openApp('records'); return; }
        const c = e.target.closest('[data-post]'); if (c) openPost(+c.dataset.post);
      });
    }
  });
}
function openPost(no) {
  const p = S.records.posts.find(x => x.no === no); if (!p) return;
  const f = S.records.folders.find(x => x.id === p.folder) || {};
  const rel = S.records.posts.filter(x => x.folder === p.folder && x.no !== p.no);
  const bi = p.music ? (p.music.bgm ?? 0) : null;
  const k = postCascade++ % 3;
  openWin('post-' + no, {
    cls: 'postwin', num: '#' + no, title: 'Live Record', sub: p.title, task: p.title, acc: true, x: 119 + k * 30, y: 76, w: 676, h: 688,
    render(b) {
      const bg = (S.bgm[bi] || {});
      b.innerHTML = `<div class="post"><div class="post-h"><span class="post-folder">${ic('folder')}${esc(f.name || '')}</span><span>LIVE RECORD · FILE <b>No.${String(no).padStart(4, '0')}</b></span></div>
        <span class="tg">● ${esc(p.tag)}</span><h2>${esc(p.title)}</h2><div class="date"><span>${esc(p.date)}</span><button>${ic('share')}</button></div>
        ${p.music ? `<div class="tplayer ${p.dark === 'green' ? 'g' : ''}" data-bgm="${bi}"><div class="tp-top">${ph(bg.cover, { cls: 'tp-cover', label: p.thumbLabel || '', seed: p.music.title })}<div style="flex:1;min-width:0"><small>${esc(p.music.label)}</small><h5>${esc(p.music.title)}</h5><p>${esc(p.music.artist)}</p>
            <div class="tp-ctrl"><button class="pp">${ic('play')}</button><div class="tp-bar"><i></i><b></b></div><span class="tp-time">0:00 / ${esc(bg.time || '0:00')}</span><span class="tp-vol">${ic('vol')}<i></i></span><a class="tp-dl" ${bg.src ? `href="${esc(bg.src)}" download` : ''}>${ic('dl')}</a></div></div></div>
            <div class="tp-lyr">${p.music.lyrics.map(esc).join('<br>')}</div></div>` : ''}
        <div class="post-sep"></div>
        ${p.body ? `<div class="post-body">${p.body}</div>` : ''}
        ${p.link ? `<div class="post-link"><a href="${esc(p.link)}" target="_blank" rel="noopener">${esc(p.link)}</a></div>` : ''}
        ${p.after ? `<div class="post-body">${p.after}</div>` : ''}
        ${p.music ? '' : `<div class="post-end">${ecg(180, 24).replace('<path', '<path stroke="var(--blue)" stroke-width="1.4" fill="none"')}</div>`}
        ${rel.length ? `<div class="related"><h3>같은 카테고리 글</h3><div class="grid-cards">${rel.map(r => `<div class="card" data-post="${r.no}">${ph(r.thumb, { label: r.thumbLabel || '', seed: r.title })}<h4>${esc(r.title)}</h4><div class="cf">${esc(r.date)}</div></div>`).join('')}</div></div>` : ''}</div>`;
      b.addEventListener('click', e => {
        if (e.target.closest('.pp')) { if (PL.i === bi) toggle(); else load(bi); }
        const c = e.target.closest('[data-post]'); if (c) openPost(+c.dataset.post);
      });
      syncPlayer();
    }
  });
}
function openNotice(no) {
  const p = S.notice.posts.find(x => x.no === no); if (!p) return;
  openWin('npost-' + no, {
    cls: 'postwin', num: '#' + no, title: 'Notice', sub: p.title, task: p.title, acc: true, x: 238, y: 73, w: 678, h: 668,
    render(b) {
      b.innerHTML = `<div class="post"><span class="tg">● ${esc(p.tag)}</span><h2>${esc(p.title)}</h2><div class="date"><span>${esc(p.date)}</span><button>${ic('share')}</button></div><div class="post-sep"></div>
        ${p.images.map((im, i) => `${i ? `<div class="nmid">${ic('disc')}</div>` : ''}${ph(im.src, { cls: 'banner-img', label: S.title.before + 'I' + S.title.after, seed: 'banner' + i })}
          <div class="dlrow">${ic('folderF')}<div><b>${esc(im.name)}</b><small>${esc(im.size)}</small></div>${SRC(im.src) ? `<a class="dl" href="${esc(SRC(im.src))}" download>${ic('dl')}</a>` : `<span class="dl">${ic('dl')}</span>`}</div>
          <div class="durl">${esc(im.url || '')}</div>`).join('')}
        ${OWNER ? `<div class="sye-pdel"><button type="button" data-pdel="${p.no}">이 글 지우기</button></div>` : ''}<div class="fields">${(p.fields || []).map(f => `<h5 class="${f.dim ? 'dim' : ''}">✦ ${esc(f.label)} ✦</h5><p class="${f.dim ? 'dim' : ''}">${f.value}</p>`).join('')}<hr></div></div>`;
    }
  });
}

/* ---------- BACKSTAGE PASS (여러 페어) ---------- */
let pairIdx = 0;
function pairCalc(p) {
  const st = new Date(p.since + 'T00:00:00');
  const d = Math.floor((today - st) / DAY) + 1;
  const goal = p.nextGoal || (Math.floor(d / 100) + 1) * 100;
  return { st, d, goal, left: Math.max(0, goal - d), pct: Math.min(100, Math.round(d / goal * 100)), next: new Date(st.getTime() + (goal - 1) * DAY) };
}
function passHTML() {
  const list = (S.pairs && S.pairs.length) ? S.pairs : [S.pair];
  const p = list[pairIdx % list.length], c = pairCalc(p), L = S.pairLabels || {};
  const back = SRC(p.imageBack) ? `<img src="${esc(SRC(p.imageBack))}" alt=""><i class="corner c1"></i><i class="corner c2"></i><i class="corner c3"></i><i class="corner c4"></i>` : `<div class="pb-txt"><small>${esc(p.passNo)}</small><b>${esc(p.a)}<em>×</em>${esc(p.b)}</b><p>${esc(p.note || '')}</p></div>`;
  return `<div class="pass" data-i="${pairIdx}">
    <div class="pass-top"><div><span>${esc(S.passLabel)}${list.length > 1 ? ` <i class="pcnt">· ${pairIdx % list.length + 1}/${list.length}</i>` : ''}</span><strong>${esc(S.venue)}</strong></div><b>${esc(p.passNo)}</b></div>
    <div class="pass-img flip"><div class="flip-in">
      <div class="face front">${ph(p.image, { seed: 'pass' + p.a + p.b, icon: 'heart' })}<i class="corner c1"></i><i class="corner c2"></i><i class="corner c3"></i><i class="corner c4"></i></div>
      <div class="face back">${back}</div></div>
      <span class="pass-tag">${esc(S.heroTicket?.passBand || 'ALL ACCESS')}</span><span class="flip-hint" title="${esc(L.flip || '뒤집기')}">${ic('refresh')}</span></div>
    <div class="pass-meta"><div><small>${esc(L.first || 'FIRST LIVE')}</small><b>${ymd(c.st)}</b></div><div><small>${esc(L.pair || 'PAIR')}</small><b>${esc(p.a)} × ${esc(p.b)}</b></div><div><small>${esc(L.status || 'STATUS')}</small><span class="st-chip">${esc(p.status)}</span></div></div>
    <div class="ot-dbox"><div class="together"><small>${esc(L.together || 'TOGETHER FOR')}</small><b><em>D+</em>${c.d}</b></div>
    <div class="nextrow"><b>NEXT · D+${c.goal}</b><span>${c.left}일 남음</span></div>
    <div class="pbar"><i style="width:${c.pct}%"></i></div>
    <div class="nextsub"><span>${ymd(c.next)}</span><span class="ns-pct">${c.pct}%</span></div></div>
    <div class="pass-perf"></div>
    <div class="barcode">${barcode(84, 24, p.barcode)}<span>${esc(p.barcode)}</span></div></div>`;
}
function swapPair(dir) {
  const list = (S.pairs && S.pairs.length) ? S.pairs : [S.pair];
  pairIdx = (pairIdx + dir + list.length) % list.length;
  syHero();
  $$('.pass').forEach(el => {
    el.classList.add(dir > 0 ? 'out-l' : 'out-r');
    setTimeout(() => { const host = el.parentElement; el.outerHTML = passHTML(); const n = host.querySelector('.pass'); n.classList.add(dir > 0 ? 'in-r' : 'in-l'); requestAnimationFrame(() => requestAnimationFrame(() => n.classList.remove('in-r', 'in-l'))); }, 180);
  });
}
document.addEventListener('click', e => {
  const pb = e.target.closest('[data-pair]'); if (pb) { e.stopPropagation(); swapPair(+pb.dataset.pair); return; }
  const fb = e.target.closest('.flip'); if (fb) fb.classList.toggle('flipped');
}, true);

/* =========================================================
   시작
   ========================================================= */
let started = false;
function startDesk() {
  if (started) return; started = true;
  if (isMobile()) $('.stage').insertAdjacentHTML('beforeend', `<div class="mobile-pass"><div class="win-h" style="background:var(--navy);color:#fff;border:0;height:38px"><span class="win-ic" style="color:#fff">${ic('moon')}</span><span class="win-t" style="font:700 9.5px var(--mono);letter-spacing:.16em">${esc(S.venue)}</span>${(S.pairs || []).length > 1 ? `<div class="win-btns"><button data-pair="-1">${ic('chevl')}</button><button data-pair="1">${ic('chevr')}</button></div>` : ''}</div>${passHTML()}</div>`);
  else DEFS.pass();
}
// 입장 버튼을 누른 뒤에 알림 시작
let toastsOn = false;
function startToasts() {
  if (toastsOn) return; toastsOn = true;
  let inc = 0;
  (S.toasts || []).forEach(t => setTimeout(() => {
    if (t.app === 'game') toast({ title: S.game.name, text: S.game.invite, icon: 'game', icCls: 'dk', app: 'game' });
    if (t.app === 'talk') {
      const R0 = TK_ROOMS()[0] || {}, IN = R0.incoming || []; if (!IN.length) return;
      const text = IN[inc++ % IN.length];
      setBadge(++talkBadge);
      toast({ title: R0.name, text, avatar: R0.avatar, app: 'talk' });
      const w = wins.get('talkroom'); if (w && TK_CUR === 0 && w.body.addMsg) w.body.addMsg({ from: 'them', text });
    }
  }, (t.delay || 30) * 1000));
}
/* ---------- 새 디자인 스타일 (가장 마지막에 넣어서 항상 적용) ---------- */
(function(){const st=document.createElement('style');st.id='design-css';st.textContent=`/* =========================================================
   새 디자인 (모눈 민트 · 6×4) — 색 · 글꼴 · 배치 · 움직임
   ========================================================= */
:root{--blue:#31ACBD;--blue2:#2A96A5;--navy:#22444F;--navy2:#1A343C;--ink:#22444F;--ink2:#628E94;--ink3:#A2C3C8;--line:#DEEEF0;--soft:#F4FAFB;--soft2:#E4F6F9;--mint:#5FD3BC;--mint2:#22B5A0;--bg:#FFFFFF;--grid:rgba(49,172,189,.08);
  --dm:'Space Grotesk','Pretendard','Noto Sans JP',sans-serif}
@keyframes tr-spinY{to{transform:rotateY(360deg)}}
@keyframes tr-float{0%,100%{transform:translateY(0) rotateX(9deg) rotateZ(12.6deg)}50%{transform:translateY(-10px) rotateX(11deg) rotateZ(13.8deg)}}
@keyframes tr-orbit{to{transform:rotateZ(360deg)}}
@keyframes tr-bb{from{transform:rotateZ(0deg) rotateX(-72deg)}to{transform:rotateZ(-360deg) rotateX(-72deg)}}
@keyframes tr-tw{0%,100%{opacity:.25}50%{opacity:1}}
@keyframes tr-shadow{0%,100%{transform:scaleX(1);opacity:.45}50%{transform:scaleX(.86);opacity:.28}}
@keyframes tr-marq{to{transform:translateX(-50%)}}
@keyframes tr-in{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes tr-fade{from{opacity:0}to{opacity:1}}
@keyframes tr-pop{from{opacity:0;transform:translateY(16px) scale(.92)}to{opacity:1;transform:none}}
@keyframes tr-blink{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes tr-snipf{0%{left:-14px;transform:scaleX(1)}46%{left:calc(100% + 7px);transform:scaleX(1)}50%{left:calc(100% + 7px);transform:scaleX(-1)}96%{left:-14px;transform:scaleX(-1)}100%{left:-14px;transform:scaleX(1)}}
@keyframes tr-snip6{0%{transform:translateX(0) scaleX(1)}46%{transform:translateX(618px) scaleX(1)}50%{transform:translateX(618px) scaleX(-1)}96%{transform:translateX(0) scaleX(-1)}100%{transform:translateX(0) scaleX(1)}}
@keyframes tr-wave{from{stroke-dashoffset:1020}to{stroke-dashoffset:0}}
@keyframes tr-tumble{0%{transform:rotateX(0deg) rotateY(0deg) rotateZ(0deg)}25%{transform:rotateX(38deg) rotateY(90deg) rotateZ(12deg)}50%{transform:rotateX(-8deg) rotateY(180deg) rotateZ(-14deg)}75%{transform:rotateX(-40deg) rotateY(270deg) rotateZ(8deg)}100%{transform:rotateX(0deg) rotateY(360deg) rotateZ(0deg)}}
@keyframes tr-wander2{0%{transform:translate(0px,0px)}20%{transform:translate(-46px,-22px)}40%{transform:translate(34px,-36px)}60%{transform:translate(52px,18px)}80%{transform:translate(-18px,38px)}100%{transform:translate(-50px,8px)}}
@keyframes tr-glow{0%{opacity:0;transform:scale(.5)}45%{opacity:1;transform:scale(1)}100%{opacity:.85;transform:scale(1.15)}}
@keyframes tr-gpress{0%{transform:translateY(0) scale(1)}70%{transform:translateY(58px) scale(.97)}100%{transform:translateY(52px) scale(.98)}}

/* ---------- 열쇠 · 궤도 (공용) ---------- */
.k-rings,.k-ring,.k-orbit,.k-orb{transform-style:preserve-3d}
.k-ring{position:absolute}
.k-orbit{position:absolute;inset:0;border-radius:50%;animation:tr-orbit 60s linear infinite}
.k-orb{position:absolute;width:0;height:0}
.k-bb{position:absolute;animation:tr-bb 60s linear infinite}
.k-bb svg{display:block}
.o-chip{display:block;width:100%;height:60%;margin-top:20%;border-radius:2px;box-shadow:inset 0 0 0 1.5px #fff}
.o-planet{display:block;width:100%;height:100%;border-radius:50%}
.k-float{position:absolute;animation:tr-float 8s ease-in-out infinite;transform-style:preserve-3d}
.k-spin{position:absolute;inset:0;transform-style:preserve-3d}
.k-spin img{position:absolute;left:0;top:0;width:100%;height:100%;user-select:none;-webkit-user-drag:none}
.home-spin{animation:tr-spinY 14s linear infinite}
.kl{transition:opacity .3s ease}
.dust{position:absolute;animation:tr-tw 4s ease-in-out infinite;line-height:0}
.dust svg{display:block}

/* =========================================================
   첫 화면
   ========================================================= */
#intro{background:#EBF7F8!important;background-image:none!important;color:var(--navy);font-family:var(--sans);overflow:hidden}
#intro.out{opacity:0;pointer-events:none;transition:opacity .8s ease!important}
.in-frame{position:absolute;left:12px;top:12px;right:12px;bottom:12px;border-radius:28px;background:#fff;background-image:linear-gradient(rgba(49,172,189,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(49,172,189,.08) 1px,transparent 1px);background-size:44px 44px}
.in-stage{position:absolute;left:calc(50% - 720px);top:calc(50% - 450px);width:1440px;height:900px;transition:opacity .5s ease}
html.fonts-wait .in-stage,html.fonts-wait .in-ticket-cut{opacity:0}
.in-stage > *{position:absolute}
.in-top{left:44px;top:38px;display:flex;align-items:center;gap:44px}
.in-logo{display:flex;align-items:center;gap:12px}
.in-logo-ic{width:42px;height:42px;box-sizing:border-box;border-radius:50%;border:2px solid #22B5A0;display:grid;place-items:center;color:var(--navy)}
.in-logo-ic svg{width:18px;height:18px;stroke-width:2.2}
.in-logo b{display:block;font:900 19px/1.1 var(--disp);letter-spacing:.05em}
.in-logo small{display:block;font:400 8px/1.3 var(--dm);letter-spacing:.24em;color:#22B5A0}
.in-nav{display:flex;gap:34px;font:500 12px var(--mono);letter-spacing:.22em}
.in-live,.in-nav{display:none!important}
.in-live{left:72px;top:150px;width:600px}
.in-live-t{display:flex;align-items:center;gap:12px;font:500 13px var(--mono);letter-spacing:.2em}
.in-badge{height:22px;padding:0 9px;border-radius:5px;background:#22B5A0;color:#fff;display:flex;align-items:center;font-weight:700}
.in-bpm b{font-weight:700;font-size:17px}
.in-wave{display:block;margin-top:14px}
.in-wave .w0{stroke:var(--navy);stroke-width:1.5;opacity:.4}
.in-wave .w1{stroke:#22B5A0;stroke-width:2.5;stroke-linejoin:round;stroke-dasharray:120 900;animation:tr-wave 3s linear infinite}
.in-kick{left:72px;top:410px;width:620px;display:flex;align-items:center;gap:14px;font:700 13px var(--mono);letter-spacing:.22em;animation:tr-in .8s .1s ease-out both}
.in-kick span{flex-grow:1;height:0;border-top:1.5px solid rgba(34,68,79,.3)}
.in-kick .ik-b{color:#22B5A0}
.in-title{left:68px;top:452px;animation:tr-in .8s .2s ease-out both}
.st-word{position:relative;display:inline-block}
.st-ghost,.st-fill,.st-line{font:900 132px/.86 var(--disp);letter-spacing:-.03em;white-space:nowrap}
.st-ghost{visibility:hidden}
.st-fill{position:absolute;left:0;top:0;color:var(--navy);clip-path:inset(0 0 49% 0)}
.st-line{position:absolute;left:20px;top:2px;color:#fff;-webkit-text-stroke:0;text-shadow:2.20px 0.00px 0 var(--navy),2.13px 0.57px 0 var(--navy),1.91px 1.10px 0 var(--navy),1.56px 1.56px 0 var(--navy),1.10px 1.91px 0 var(--navy),0.57px 2.13px 0 var(--navy),0.00px 2.20px 0 var(--navy),-0.57px 2.13px 0 var(--navy),-1.10px 1.91px 0 var(--navy),-1.56px 1.56px 0 var(--navy),-1.91px 1.10px 0 var(--navy),-2.13px 0.57px 0 var(--navy),-2.20px 0.00px 0 var(--navy),-2.13px -0.57px 0 var(--navy),-1.91px -1.10px 0 var(--navy),-1.56px -1.56px 0 var(--navy),-1.10px -1.91px 0 var(--navy),-0.57px -2.13px 0 var(--navy),-0.00px -2.20px 0 var(--navy),0.57px -2.13px 0 var(--navy),1.10px -1.91px 0 var(--navy),1.56px -1.56px 0 var(--navy),1.91px -1.10px 0 var(--navy),2.13px -0.57px 0 var(--navy);clip-path:inset(51% -10px -10px -10px)}
.st-cut{position:absolute;left:-10px;right:-20px;top:57px;height:0;border-top:2px dashed var(--navy)}
.st-snip{position:absolute;left:-14px;top:44px;color:var(--navy);animation:tr-snipf 16s ease-in-out infinite}
.in-pair{left:72px;top:622px;display:flex;align-items:center;gap:18px;animation:tr-in .8s .3s ease-out both}
.ip-ab{font:900 34px var(--disp);letter-spacing:.02em}
.ip-ab em,.htk-pair em{font-style:normal;color:#22B5A0}
.in-pair > i{width:0;height:32px;border-left:1.5px solid rgba(34,68,79,.3)}
.ip-roles{font:500 11px/1.5 var(--mono);letter-spacing:.2em}
.ip-pill{height:32px;padding:0 16px;border-radius:99px;border:1.5px solid var(--navy);display:flex;align-items:center;font:700 12px var(--mono);letter-spacing:.2em}
.in-tune{left:72px;top:682px;width:610px;animation:tr-in .8s .35s ease-out both}
.it-row{display:flex;justify-content:space-between;align-items:flex-end}
.it-word{font:500 12px var(--mono);letter-spacing:.22em}
.it-word b{font-weight:700}
.it-pct{font:500 32px/.9 var(--mono)}
.it-pct small{font-size:13px}
.it-bar{margin-top:8px;position:relative;height:5px;border-radius:99px;background:#E1EFF1}
.it-bar i{position:absolute;left:0;top:0;bottom:0;width:0;border-radius:99px;background:linear-gradient(90deg,#fff,#22B5A0)}
.it-stars{margin-top:12px;display:flex;justify-content:space-between;color:#C7E0E4}
.it-stars svg{transform:scale(.85);transition:fill .3s ease,transform .3s ease;fill:#C7E0E4}
.it-stars svg.on{fill:#22B5A0;transform:scale(1.15)}
.in-ticket-cut{position:absolute;left:0;right:0;top:calc(50% + 312px);height:68px;pointer-events:none;transition:opacity .5s}
.in-ticket-cut i{position:absolute;top:0;width:68px;height:68px;border-radius:50%;background:#EBF7F8}
.in-ticket-cut .nl{left:-22px}.in-ticket-cut .nr{right:-22px}
.in-ticket-cut span{position:absolute;left:60px;right:60px;top:33px;height:0;border-top:2px dashed rgba(49,172,189,.45)}
.in-mq{left:40px;top:812px;width:880px;height:46px;border-radius:23px;background:#22B5A0;overflow:hidden;display:flex;align-items:center}
.in-mq-t{display:flex;white-space:nowrap;animation:tr-marq 36s linear infinite;font:700 14px var(--mono);letter-spacing:.22em;color:#fff}
.in-mq-t span{padding-right:30px}
.in-onair{left:1030px;top:26px;height:46px;padding:0 20px;border-radius:23px;background:#fff;display:flex;align-items:center;gap:9px;font:500 13px var(--mono);letter-spacing:.18em}
.in-onair i{width:8px;height:8px;border-radius:50%;background:#34C79D;animation:tr-blink 1.4s ease-in-out infinite}
.in-onair b{font-weight:700}
.in-date{left:1270px;top:26px;height:46px;box-sizing:border-box;padding:0 18px;border-radius:23px;border:1.5px solid #C7E0E4;display:flex;align-items:center;font:700 13px var(--mono);letter-spacing:.16em}
.in-gate{left:978px;top:826px;font:500 12px/1.5 var(--mono);letter-spacing:.2em}
.ig-k{color:var(--blue)}
.ig-v{display:flex;align-items:center;gap:7px}
.ig-v i{width:7px;height:7px;border-radius:50%;background:#A2C3C8;transition:background .3s}
#intro.ready .ig-v i{background:#34C79D}
.ig-v b{font-weight:700}
.in-enter{left:1110px;top:814px;width:304px;height:68px}
.in-btn{position:absolute;inset:0;box-sizing:border-box;border-radius:34px;background:#E4EFF0;border:3px solid transparent;display:flex;align-items:center;justify-content:space-between;padding:0 6px 0 28px;font:900 24px var(--disp);letter-spacing:.08em;color:#A2C3C8;cursor:default}
.in-btn i{width:52px;height:52px;border-radius:50%;background:#fff;display:grid;place-items:center;color:#A2C3C8}
.in-btn i svg{width:18px;height:18px;stroke-width:2.4}
#intro.ready .in-btn{background:var(--navy);border-color:#22B5A0;color:#fff;font-size:26px;cursor:pointer;animation:tr-pop .45s ease-out both}
#intro.ready .in-btn i{background:#22B5A0;color:var(--navy)}
#intro.ready .in-btn i svg{stroke-width:2.6}
.in-replay{left:1408px;top:806px;width:24px;height:24px;color:#A2C3C8;display:grid;place-items:center}
.in-replay svg{width:14px;height:14px;stroke-width:2.4}
.in-dust{left:0;top:0;width:0;height:0}
.in-keywrap{left:985px;top:107.5px;width:419.7px;height:660.5px;animation:tr-wander2 22s ease-in-out infinite alternate}
.in-keyscale{position:absolute;left:0;top:0;width:488px;height:768px;transform:scale(.86);transform-origin:0 0;perspective:1400px}
.in-group{position:absolute;left:0;top:0;width:488px;height:768px;transform-style:preserve-3d;transform-origin:244px 360px}
.in-spin{animation:tr-tumble 16s linear infinite}
.kf.ghost{opacity:.28;filter:saturate(0) brightness(1.15)}
.kf.fillc{clip-path:inset(100% 0 0 0);transition:clip-path .2s linear}
#intro.leaving .in-group{animation:tr-gpress .8s cubic-bezier(.6,0,.3,1) forwards}
#intro.leaving .in-spin{animation:none}
#intro.leaving .kf.fillc{transition:clip-path .9s cubic-bezier(.6,0,.3,1) .1s}
.in-glow{position:absolute;left:-29.4px;top:56.4px;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.95) 0%,rgba(255,255,255,.55) 35%,rgba(255,255,255,0) 68%);opacity:0;pointer-events:none}
#intro.leaving .in-glow{animation:tr-glow 1.1s .45s ease-out both}

/* =========================================================
   메인 화면
   ========================================================= */
#desk{background-color:var(--card);background-image:linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px);background-size:44px 44px}
body:not(.entered) #desk{opacity:0}
body.entered #desk{animation:tr-fade 1s ease both}
/* 위 줄 */
.topbar{left:16px!important;right:16px;top:10px;width:auto!important;height:52px;border-radius:10px;background:var(--card)!important;backdrop-filter:none;border:0!important;box-shadow:0 0 0 1px rgba(222,238,240,.5);padding:0 14px 0 10px!important;gap:30px;z-index:40}
.logo-dark{height:36px!important;width:auto!important;padding:0 14px 0 5px!important;border-radius:7px!important;background:var(--blue)!important;align-self:center!important;gap:8px}
.logo-dark .logo-ic{width:26px!important;height:26px!important;background:rgba(255,255,255,.16)!important;border:0!important;color:#fff!important}
.logo-dark .logo-ic svg{width:12px!important;height:12px!important;stroke-width:2.4}
.logo-dark b{font:900 16px/1 var(--disp)!important;letter-spacing:.05em!important;color:#fff}
.logo-dark small{font:400 7px/1 var(--dm)!important;letter-spacing:.22em!important;color:#BFF0DF!important;margin-top:2px!important}
.topnav{gap:24px!important;margin-left:0!important}
.topnav button{height:auto!important;padding:0!important;background:none!important;border-radius:0!important;font:500 13px var(--mono)!important;letter-spacing:.14em!important;color:var(--navy)!important;gap:6px!important}
.topnav button[data-nav=home]{color:var(--blue)!important;font-weight:700!important}
.topnav button:hover{color:var(--blue)!important}
.topnav svg{width:13px!important;height:13px!important;stroke-width:2.1}
.top-r{gap:12px!important}
.top-r .pill{height:28px!important;width:auto!important;padding:0 12px!important;border-radius:99px;border:1px solid var(--line)!important;background:none!important;font:500 12px var(--mono)!important;letter-spacing:.14em!important;color:var(--navy)!important;margin:0!important;gap:6px}
.top-r .pill .led{width:6px;height:6px;background:#22B5A0}
.clock{font:500 12px var(--mono)!important;letter-spacing:.14em!important;color:var(--ink2)!important}
.sq{width:30px!important;height:30px!important;border-radius:7px!important;border:1px solid var(--line)!important;background:var(--card)!important;color:var(--navy)!important}
.sq svg{width:13px!important;height:13px!important}
/* 아래 줄 */
.taskbar{left:16px!important;right:16px!important;bottom:10px!important;height:52px!important;border-radius:10px!important;background:var(--card)!important;backdrop-filter:none!important;box-shadow:0 0 0 1px rgba(222,238,240,.5)!important;padding:0 14px 0 10px!important;gap:8px!important}
.start{height:34px!important;width:auto!important;padding:0 14px 0 12px!important;border-radius:7px!important;background:var(--blue)!important;color:#fff!important;gap:7px!important;font:700 13px var(--mono)!important;letter-spacing:.12em!important}
.start svg{width:12px!important;height:12px!important;stroke-width:2.4}
.tasks{gap:8px!important;margin-left:0!important}
.task{height:34px!important;padding:0 12px!important;border-radius:7px!important;border:1px solid var(--line);background:var(--card);color:var(--navy)!important;font:700 12px var(--mono)!important;letter-spacing:.12em!important;gap:7px!important;animation:tr-pop .3s ease-out both}
.task::before{width:5px!important;height:5px!important;background:#22B5A0!important;opacity:1!important}
.task.on{background:var(--soft2)!important;border-color:transparent;color:var(--blue)!important;font-weight:500!important}
.task.on::before{background:var(--blue)!important}
.mini{height:36px!important;min-width:220px;width:auto!important;padding:0 3px!important;border-radius:7px!important;background:var(--navy)!important;border:0!important;gap:9px!important;margin-right:0!important}
.mini-cover{width:30px!important;height:30px!important;border-radius:5px!important;background:linear-gradient(150deg,#58CBDB,#7FD8C4)!important}
.mini-cover::after{display:none}
.mini-t small{font:400 7px var(--dm)!important;letter-spacing:.2em!important;color:#BFF0DF!important}
.mini-t b{font:700 13px var(--mono)!important;letter-spacing:.04em!important}
.mini-play{width:30px!important;height:30px!important;border-radius:5px!important;background:#fff!important;color:var(--navy)!important}
.mini-play svg{width:10px!important;height:10px!important}
.tb-r{gap:8px!important}
.tb-r .sq{width:30px!important;height:30px!important}
.credit{border:0!important;padding:0!important;margin-left:4px!important;width:auto!important;text-align:right;font:900 13px/1.15 var(--disp)!important;letter-spacing:.05em!important;color:var(--navy)}
.credit small{font:400 7px var(--dm)!important;letter-spacing:.16em!important;color:var(--ink2)!important}
#toasts{bottom:74px!important;right:16px!important}
.launcher{left:16px!important;bottom:70px!important}
.launcher .app-ic.tilebox{width:40px;height:40px}
.launcher .app-ic.tilebox svg{width:16px;height:16px}
.launcher .app-tile{font-size:10px;gap:5px}

/* 가운데 1440×900 무대 */
.stage{left:0!important;top:72px!important;width:100%!important;height:auto!important;bottom:72px!important;overflow:visible!important}
.stage::before,.stage::after{content:"";position:absolute;border-radius:50%;pointer-events:none}
.stage::before{left:520px;top:-332px;width:720px;height:720px;background:#DAF3F6;filter:blur(90px)}
.stage::after{left:-160px;top:auto;bottom:-120px;width:520px;height:420px;background:#D3F2EC;filter:blur(80px)}
body.dark .stage::before,body.dark .stage::after{opacity:.12}
.stage > section{position:absolute;z-index:1}
body:not(.entered) .stage > section{animation-play-state:paused!important}
.hz{position:relative;transform:scale(var(--k,1));transform-origin:0 0}
.h-garland .hz{width:632px;height:28px}
.h-title{left:30px;top:calc(8px + var(--g,0px));width:632px;animation:tr-in .7s ease-out both}
.h-kick{display:flex;justify-content:space-between;font:700 14px var(--mono);letter-spacing:.14em;color:var(--blue)}
.h-word{position:relative;margin-top:12px}
.h-svg{display:block;overflow:visible}
.hw-fill,.hw-line{font-family:var(--disp);font-weight:900;font-size:150px;letter-spacing:-.03em}
.hw-fill{fill:var(--blue)}
.hw-line{fill:none;stroke:var(--blue);stroke-width:2.5}
.hw-cut{stroke:var(--navy);stroke-width:2;stroke-dasharray:6 5}
.hw-snip{fill:none;stroke:var(--navy);stroke-width:2;stroke-linecap:round;animation:tr-snip6 16s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
.h-garland{left:30px;top:calc(8px + var(--g,0px) + 190px * var(--k,1));width:632px;height:28px;animation:tr-in .7s .12s ease-out both}
.hg-line{position:absolute;left:0;top:0}
.hg-line path{stroke:#A3D0D6;stroke-width:1.2}
/* 앱 */
.apps-panel{left:30px!important;top:calc(8px + 2 * var(--g,0px) + 272px * var(--k,1))!important;bottom:0!important;width:632px!important;height:auto!important;display:flex;flex-direction:column;box-sizing:border-box;border-radius:20px!important;background:var(--card)!important;box-shadow:none!important;padding:30px 18px 26px!important;animation:tr-in .7s .24s ease-out both}
.panel-tab{left:24px!important;top:-34px!important;width:auto!important;height:34px!important;box-sizing:border-box;padding:0 20px 0 16px!important;border-radius:14px 14px 0 0!important;background:var(--card)!important;display:flex;align-items:center;gap:8px!important;color:var(--navy)!important}
.panel-tab::after,.panel-tab::before{content:""!important;display:block!important;position:absolute!important;bottom:0!important;top:auto!important;width:14px!important;height:14px!important;border:0!important;box-shadow:none!important}
.panel-tab::after{right:-14px!important;left:auto!important;background:radial-gradient(circle at 100% 0,transparent 13.5px,var(--card) 14px)!important}
.panel-tab::before{display:none!important}
.panel-tab svg{width:15px;height:15px;stroke-width:2.1}
.panel-tab span{font:900 19px var(--disp);letter-spacing:.06em}
.apps{position:static!important;display:grid!important;grid-template-columns:repeat(6,minmax(0,1fr))!important;gap:28px 6px!important}
.app.app-tile{display:flex;flex-direction:column;align-items:center;gap:8px;font:600 10.5px var(--mono);letter-spacing:.02em;white-space:nowrap;color:var(--navy);line-height:1.15}
.app-ic.tilebox{position:relative;width:60px;height:60px;box-sizing:border-box;border-radius:8px;display:flex;align-items:center;justify-content:center;box-shadow:none;border:0;transition:transform .18s ease}
.app-tile:hover .tilebox{transform:translateY(-4px)}
.app-tile:active .tilebox{transform:scale(.94)}
.app-ic.tilebox svg{width:22px;height:22px;stroke-width:1.9}
.app-ic.tilebox.s0{background:var(--card);color:var(--navy);border:2px solid var(--navy)}
.app-ic.tilebox.s1{background:#31ACBD;color:#fff}
.app-ic.tilebox.s2{background:#22B5A0;color:#fff}
.app-ic.tilebox.s3{background:#D3F2EC;color:#0E7C6C}
.app-ic.tilebox.s4{background:#E4F6F9;color:#31ACBD}
.app-ic.tilebox .badge{right:-6px;top:-6px;width:17px;min-width:0;height:17px;padding:0;border:0;border-radius:50%;background:#F05468;font:800 11px var(--mono);display:flex;align-items:center;justify-content:center}
.app-ic.tilebox .ndot{right:-4px;top:-4px;width:9px;height:9px;background:#22B5A0;border:2px solid var(--card)}
/* 앱 아래 티켓 */
.h-ticket{left:30px;top:630px;width:632px;height:190px;box-sizing:border-box;border-radius:14px;background:var(--card);padding:16px 18px 0;display:flex;flex-direction:column;animation:tr-in .7s .3s ease-out both}
.htk-top{display:flex;justify-content:space-between;align-items:baseline;gap:10px}
.ht-tour{font:700 12px var(--mono);letter-spacing:.14em;color:var(--blue);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.htk-no{font:400 9px var(--dm);color:#6E9BA2;white-space:nowrap}
.h-ticket .ht-info{display:flex;margin-top:14px}
.h-ticket .ht-info div{flex:1;padding-left:12px;border-left:1px solid #D7E6E9}
.h-ticket .ht-info div:first-child{padding-left:0;border:0}
.h-ticket .ht-info small{display:block;font:400 7px var(--dm);letter-spacing:.16em;color:#6E9BA2}
.h-ticket .ht-info b{display:block;margin-top:4px;font:900 30px/1 var(--disp);color:var(--navy);letter-spacing:.02em}
.h-ticket .ht-info div:last-child b{color:#22B5A0}
.htk-bot{position:relative;margin:auto -18px 0;height:62px;padding:0 18px;border-top:2px dashed var(--navy);display:flex;align-items:center;gap:14px}
.htk-bot::before,.htk-bot::after{content:"";position:absolute;top:-11px;width:20px;height:20px;border-radius:50%;background:#EFF8FA}
.htk-bot::before{left:-10px}.htk-bot::after{right:-10px}
body.dark .htk-bot::before,body.dark .htk-bot::after{background:var(--bg)}
.htk-bar{width:120px;height:24px;color:var(--navy)}
.htk-bar svg{width:100%;height:100%;display:block}
.htk-pair{font:900 22px var(--disp);letter-spacing:.03em}
.htk-pill{height:28px;padding:0 13px;border-radius:99px;border:1.5px solid var(--navy);display:flex;align-items:center;font:700 11px var(--mono);letter-spacing:.18em}
.htk-admit{margin-left:auto;font:400 9px var(--dm);letter-spacing:.2em;color:#22B5A0;display:flex;align-items:center;gap:6px}
.htk-admit::before{content:"";width:6px;height:6px;border-radius:50%;background:#22B5A0}
/* 가운데 열쇠 */
.keysec{left:692px;top:8px;bottom:0;width:388px;height:auto;perspective:1400px;animation:tr-fade 1.1s .2s ease-out both}
.ks-head{display:none!important;position:absolute;left:6px;top:8px;right:6px;display:flex;justify-content:space-between;align-items:baseline;z-index:2}
.ks-t{font:900 22px var(--disp);letter-spacing:.04em;color:var(--navy)}
.ks-s{font:700 14px var(--mono);letter-spacing:.12em;color:var(--blue)}
.ks-dust{position:absolute;left:0;top:var(--kt,0px)}
.ks-shadow{position:absolute;left:104px;top:calc(var(--kt,0px) + 630px);width:180px;height:22px;border-radius:50%;background:radial-gradient(ellipse,rgba(36,72,83,.22),rgba(36,72,83,0) 70%);animation:tr-shadow 8s ease-in-out infinite}
.ks-3d{position:absolute;left:0;top:var(--kt,0px);width:488px;height:768px;transform-style:preserve-3d;pointer-events:none}
.ks-mq{position:absolute;left:0;right:0;bottom:0;height:46px;border-radius:6px;background:#D3F2EC;overflow:hidden;display:flex;align-items:center}
.ks-mq .mq-track{display:flex;white-space:nowrap;animation:tr-marq 36s linear infinite!important;font:800 15px var(--mono)!important;letter-spacing:.14em!important;color:var(--navy)!important}
.ks-mq .mq-track span{padding-right:30px}
body.dark .ks-mq{background:#123a37}
/* 오른쪽 BACKSTAGE PASS (D-DAY 창) */
.win.passwin{border-radius:6px!important;background:var(--card)!important;box-shadow:0 18px 40px -22px rgba(34,68,79,.35),0 0 0 1px rgba(222,238,240,.6)!important;overflow:visible!important}
.win.passwin .win-h{height:30px!important;background:transparent!important;border:0!important;padding:0 8px!important;justify-content:flex-end;color:var(--ink3)}
.win.passwin .win-h::before{content:"";position:absolute;left:50%;top:14px;width:54px;height:10px;margin-left:-27px;border-radius:99px;background:var(--card);box-shadow:inset 0 1px 2px rgba(36,72,83,.2)}
.win.passwin .win-ic,.win.passwin .win-t,.win.passwin .win-s,.win.passwin .acc{display:none!important}
.win.passwin .win-btns{gap:2px}
.win.passwin .win-btns button{width:20px;height:20px;border-radius:5px;background:transparent;color:var(--ink3)}
.win.passwin .win-btns button:hover{background:var(--soft2);color:var(--navy)}
.win.passwin .win-btns svg{width:10px;height:10px}
.pass{padding:0 18px!important;color:var(--navy)}
.pass-top{display:flex!important;justify-content:space-between;align-items:flex-end!important;padding:2px 0 0!important;border:0!important;font:inherit!important;color:inherit!important}
.pass-top span{display:block;font:700 13px var(--mono);letter-spacing:.14em;color:#22B5A0}
.pass-top .pcnt{font-style:normal}
.pass-top strong{display:block;font:900 21px/1.05 var(--disp);letter-spacing:.02em;color:var(--navy);white-space:nowrap}
.pass-top b{font:400 9px var(--dm)!important;letter-spacing:0!important;color:#6E9BA2!important}
.pass .pass-img{margin-top:11px;height:calc(176px + var(--ph,0px))!important;border-radius:4px}
.pass .flip .face{border-radius:4px}
.pass .face.front .ph{background:linear-gradient(155deg,#31ACBD 0%,#58CBDB 55%,#7FD8C4 100%)}
.pass .corner{display:none!important}
.pass-tag{position:absolute;left:0;bottom:0;z-index:3;height:24px;padding:0 10px;background:#22B5A0;color:#fff;display:flex;align-items:center;font:800 12px var(--mono);letter-spacing:.12em;border-radius:0 4px 0 4px;pointer-events:none}
.pass .flip-hint{right:8px!important;bottom:8px!important;width:26px!important;height:26px!important;background:rgba(255,255,255,.92)!important;color:var(--blue)!important;backdrop-filter:none!important}
.pass .flip-hint svg{width:12px;height:12px;stroke-width:2.2}
.pass-meta{display:grid!important;grid-template-columns:1.1fr 1fr .9fr!important;margin:11px 0 0!important;padding:0!important;border:0!important}
.pass-meta small{font:400 7px var(--dm)!important;letter-spacing:.16em!important;color:#6E9BA2!important;margin:0!important}
.pass-meta b,.pass-meta .st-chip{font:800 16px/1.15 var(--mono)!important;color:var(--navy)}
.pass-meta > div:last-child{text-align:right}
.pass-meta .st-chip{background:none!important;color:#137D5C!important;padding:0!important;border:0!important;display:inline}
.pass-meta .st-chip::before{content:"● "!important;display:inline!important;position:static!important;width:auto!important;height:auto!important;background:none!important;border:0!important;border-radius:0!important;margin:0!important;animation:none!important}
.together{margin-top:11px!important;padding-top:8px;border-top:2px solid var(--navy)}
.together small{font:400 8px var(--dm)!important;letter-spacing:.16em!important;color:#6E9BA2!important;margin-bottom:4px!important}
.together b{font:900 54px/.9 var(--disp)!important;letter-spacing:-.03em!important;color:var(--blue)!important;letter-spacing:0!important}
.together b em{font-size:inherit!important;color:inherit!important;margin:0!important}
.nextrow{margin-top:11px!important;font:800 15px var(--mono)!important}
.nextrow span{color:var(--blue)!important;font-weight:800!important}
.pbar{position:relative;height:12px!important;margin:9px 0 6px!important;background:none!important;overflow:visible!important;border-radius:0!important}
.pbar::before{content:"";position:absolute;left:0;right:0;top:5px;height:2px;border-radius:99px;background:#E1EFF1}
.pbar i{position:absolute!important;left:0;top:5px;height:2px!important;border-radius:99px;background:var(--blue)!important}
.pbar b{position:absolute;top:0;width:12px;height:12px;margin-left:-6px;box-sizing:border-box;border-radius:50%;background:#fff;border:3px solid #22B5A0}
.nextsub{font:400 8px var(--dm)!important;color:#6E9BA2!important;margin-bottom:0!important}
.pass-perf{position:relative;margin:14px -18px 0;height:0;border-top:2px dashed var(--navy)}
.pass-perf::before,.pass-perf::after{content:"";position:absolute;top:-11px;width:20px;height:20px;border-radius:50%;background:#EFF8FA}
.pass-perf::before{left:-10px}.pass-perf::after{right:-10px}
body.dark .pass-perf::before,body.dark .pass-perf::after{background:var(--bg)}
.pass .barcode{height:46px;margin:0 -18px!important;padding:0 18px!important;background:none!important;gap:12px!important;color:var(--navy)}
.pass .barcode svg{width:84px!important;height:24px!important}
.pass .barcode span{font:800 14px var(--mono)!important;letter-spacing:.1em!important;color:var(--navy)!important}


/* v-final · 아이콘 색 (예전 색) */
.app-ic.tilebox{background:#fff;border:1px solid #DEEEF0;color:#31ACBD}
.app-ic.tilebox.t-soft{background:#EFF9FB;border-color:#DCF0F3;color:#3BB4C4}
.app-ic.tilebox.t-blue{background:linear-gradient(180deg,#67D1DF,#3BB4C4);color:#fff;border:0}
.app-ic.tilebox.t-navy{background:#2F5B69;color:#fff;border:0}
.app-ic.tilebox.t-ink{background:#22444F;color:#fff;border:0}
.app-ic.tilebox.t-dark{background:#22444F;color:#7FD8C4;border:0}
.app-ic.tilebox.t-mint{background:#E3F6F1;border-color:#C9ECE2;color:#1C9A88}
.app-ic.tilebox.t-cream{background:#F3FBFC;border-color:#DFF1F3;color:#54BDCC}
.app-ic.tilebox.t-lav{background:#EEF9FA;border-color:#DBF0F3;color:#5EB7C3}
.app-ic.tilebox.t-teal{background:#DFF3F1;border-color:#C5E8E4;color:#1E8E86}
.app-ic.tilebox.t-rose{background:#ECF8F9;border-color:#D6EEF1;color:#46AFBD}
.app-ic.tilebox.t-lilac{background:#F0F9FB;border-color:#DFF1F3;color:#72C3CE}
body.dark .app-ic.tilebox:not(.t-blue):not(.t-navy):not(.t-ink):not(.t-dark){background:var(--soft);border-color:var(--line)}
/* 열쇠 칸을 살짝 왼쪽으로 (출입증이 궤도를 가리지 않게) */
.stage .keysec{left:var(--kx,672px)!important}
/* ---------- 입장 화면 · OFF THE RECORD 젤리 시안 ---------- */
#intro{--disp:'Big Shoulders Display','Pretendard','Noto Sans JP',sans-serif;--mono:'Barlow Condensed','Pretendard','Noto Sans JP',sans-serif;--dm:'DM Mono',monospace;font-family:'IBM Plex Sans KR','Pretendard',sans-serif}
#intro .in-nav{display:flex!important}
.in-onair span{font-weight:500}
@keyframes tr-gl{0%,30%{background-position:120% 0}70%,100%{background-position:-60% 0}}
@keyframes tr-ride{from{offset-distance:0%}to{offset-distance:100%}}
.in-ticket-cut{display:none!important}
.in-divline{left:40px;right:40px;top:790px;height:1px;background:linear-gradient(90deg,transparent,#D3EFF3 15%,#BFEDE4 85%,transparent)}
.in-kick{top:288px}
.in-title{left:62px;top:318px}
.ot-wrap{position:relative;width:780px;height:281px}
.ot-orbit{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
.ot-glow{position:absolute;left:-20px;top:0;width:672px;height:281px;border-radius:50%;background:radial-gradient(ellipse at 40% 50%,rgba(165,230,239,.45),rgba(127,227,210,.18) 55%,transparent 72%);filter:blur(8px)}
.ot-svg{position:absolute;left:0;top:0;overflow:visible}
.ot-t{font:900 157px var(--disp)}
.ot-gloss{position:absolute;left:0;top:0;width:576px;height:281px;background:linear-gradient(110deg,transparent 42%,rgba(255,255,255,.75) 50%,transparent 58%);background-size:300% 100%;mix-blend-mode:soft-light;animation:tr-gl 5s ease-in-out infinite;pointer-events:none}
.ot-riders{position:absolute;left:0;top:0;width:633px;height:321px;transform:rotate(-7deg);transform-origin:282.8px 146.4px;pointer-events:none}
.ot-ride{position:absolute;left:0;top:0;offset-rotate:0deg;animation:tr-ride 48s linear infinite}
.ot-ride svg{display:block}
.ot-moon{filter:drop-shadow(0 2px 3px rgba(49,172,189,.2))}
.ot-tw{animation:tr-tw 3.4s ease-in-out infinite}
.ot-bub{display:block;border-radius:50%;background:radial-gradient(circle at 32% 30%,#fff 0 20%,rgba(165,230,239,.85) 55%,rgba(79,214,192,.65));box-shadow:0 2px 4px rgba(49,172,189,.15)}
.in-pair{gap:10px}
.in-pair > i{display:none}
.ip-ab{margin-right:8px}
.ip-roles{display:flex;gap:10px}
.ip-chip,.ip-pill{height:30px;padding:0 14px;box-sizing:border-box;border-radius:99px;display:flex;align-items:center;font:700 11px var(--mono);letter-spacing:.2em}
.ip-chip{background:rgba(255,255,255,.72);border:1.5px solid #D3EFF3;box-shadow:0 4px 12px rgba(49,172,189,.08),inset 0 1px 0 #fff;color:#54AFBB}
.ip-pill{position:relative;padding:0 16px;background:linear-gradient(135deg,#96EBF7 0%,#57D2E3 55%,#3FCFB8 100%);box-shadow:0 8px 20px rgba(49,172,189,.22),inset 0 2px 0 rgba(255,255,255,.55);border:1.5px solid rgba(255,255,255,.9);font-weight:800;color:#fff;overflow:hidden}
.ip-pill::after{content:"";position:absolute;left:6px;right:6px;top:2px;height:40%;border-radius:99px;background:linear-gradient(rgba(255,255,255,.55),rgba(255,255,255,0))}
.it-word{color:#54AFBB}
.it-word b{color:#22B5A0}
.it-pct{font:900 38px/.9 var(--disp);background:linear-gradient(135deg,#79DFED,#3FCFB8);-webkit-background-clip:text;background-clip:text;color:transparent}
.it-pct small{font-size:15px}
.it-bar{margin-top:10px;height:16px;box-sizing:border-box;border-radius:99px;background:rgba(255,255,255,.72);border:1.5px solid #D3EFF3;box-shadow:0 4px 12px rgba(49,172,189,.08),inset 0 1px 0 #fff;padding:2px}
.it-bar i{position:relative;display:block;left:auto;top:auto;bottom:auto;height:100%;border-radius:99px;background:linear-gradient(90deg,#A5E6EF,#67DAE9 60%,#4FD6C0);box-shadow:0 0 10px rgba(103,218,233,.35);overflow:hidden;transition:width .2s linear}
.it-bar i::after{content:"";position:absolute;left:4px;right:4px;top:1px;height:45%;border-radius:99px;background:linear-gradient(rgba(255,255,255,.75),rgba(255,255,255,0))}
.it-stars{padding:0 2px}
.it-stars svg{width:12px;height:12px}
.in-mq{left:40px;top:816px;width:880px;height:44px;box-sizing:border-box;border-radius:22px;background:rgba(255,255,255,.72);border:1.5px solid #D3EFF3;box-shadow:0 4px 12px rgba(49,172,189,.08),inset 0 1px 0 #fff;-webkit-mask:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);mask:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}
.in-mq-t{font:700 13px var(--mono);letter-spacing:.24em;color:#57D2E3}
.in-mq-t b{color:#3FCFB8}
.ig-k{font-weight:600;color:#77CCD8}
.in-btn{background:rgba(255,255,255,.72);border:1.5px solid #D3EFF3;box-shadow:0 4px 12px rgba(49,172,189,.08),inset 0 1px 0 #fff;border-radius:34px;padding:0 7px 0 28px;color:#ADD9DF}
.in-btn i{box-shadow:0 2px 6px rgba(49,172,189,.1)}
#intro.ready .in-btn{background:linear-gradient(135deg,#96EBF7 0%,#57D2E3 55%,#3FCFB8 100%);box-shadow:0 8px 20px rgba(49,172,189,.22),inset 0 2px 0 rgba(255,255,255,.55);border:2px solid rgba(255,255,255,.95);color:#fff;overflow:hidden}
#intro.ready .in-btn::before{content:"";position:absolute;left:14px;right:14px;top:3px;height:42%;border-radius:99px;background:linear-gradient(rgba(255,255,255,.6),rgba(255,255,255,0));pointer-events:none}
#intro.ready .in-btn span{position:relative;text-shadow:0 1px 2px rgba(34,68,79,.25)}
#intro.ready .in-btn i{position:relative;background:#fff;color:#31ACBD;box-shadow:0 3px 8px rgba(34,68,79,.18)}
.in-keywrap{left:823px;top:62px;width:488px;height:768px}
.in-keyscale{transform:none}
@keyframes tr-gturn{0%{transform:perspective(900px) rotateX(0deg) rotate(0deg) scale(1)}20%{transform:perspective(900px) rotateX(16deg) rotate(4deg) scale(.95)}70%{transform:perspective(900px) rotateX(22deg) rotate(-94deg) scale(.96)}85%{transform:perspective(900px) rotateX(18deg) rotate(-88deg) scale(.97)}100%{transform:perspective(900px) rotateX(0deg) rotate(-90deg) scale(1)}}
#intro.leaving .in-group{animation:tr-gturn 1.5s cubic-bezier(.5,0,.25,1) forwards}
.in-glow{left:4px;top:120px;width:480px;height:480px}
#intro.leaving .in-glow{animation:tr-glow 1.2s .95s ease-out both}
/* ---------- 휴대폰 ---------- */
@media (max-width:720px),(max-aspect-ratio:4/5) and (max-width:1100px),(max-height:599px){
  .in-stage{left:0;top:0;width:100%;height:100%}
  .in-ticket-cut,.in-mq,.in-onair,.in-date,.in-replay,.in-live,.in-nav{display:none}
  #intro .in-nav{display:none!important}
  .in-top{left:20px;top:22px}
  .in-keywrap{left:50%;top:64px;margin-left:-118px;transform:scale(.56);transform-origin:0 0;animation:none}
  .in-kick{left:20px;right:20px;width:auto;top:auto;bottom:330px;font-size:10px;gap:8px}
  .in-title{left:16px;top:auto;bottom:250px}
  .in-title{bottom:250px}
  .in-kick{bottom:412px!important}
  .ot-wrap{transform:scale(.54);transform-origin:0 100%}
  .in-mq,.in-divline{display:none}
  .st-ghost,.st-fill,.st-line{font-size:23vw}
  .st-cut{top:.43em;font-size:23vw}
  .st-snip{top:calc(23vw * .36)}
  .in-pair{left:20px;top:auto;bottom:200px;gap:10px}
  .ip-ab{font-size:26px}.in-pair > i,.ip-roles{display:none}
  .in-tune{left:20px;right:20px;width:auto;top:auto;bottom:112px}
  .in-gate{left:20px;top:auto;bottom:34px}
  .in-enter{left:auto;right:16px;top:auto;bottom:22px;width:200px;height:60px}
  .in-btn{font-size:20px!important;padding-left:20px}.in-btn i{width:46px;height:46px}
  .topbar{left:6px!important;right:6px;top:6px;height:46px;gap:8px;position:fixed}
  .logo-dark{padding-right:10px!important}
  .stage{position:absolute!important;left:0!important;right:0;top:52px!important;width:auto!important;height:auto!important;bottom:0!important;overflow:auto!important;padding:20px 12px 90px}
  .stage::before,.stage::after{display:none}
  .stage > section{position:relative!important;left:auto!important;top:auto!important;width:100%!important}
  .h-svg{width:100%;height:auto}
  .h-word{height:auto}
  .h-garland{display:none}
  .apps-panel{margin-top:50px}
  .apps{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:20px 4px!important}
  .h-ticket{margin-top:16px;height:auto}
  .h-ticket .ht-info{flex-wrap:wrap;row-gap:10px}
  .h-ticket .ht-info b{font-size:22px}
  .htk-pill,.htk-admit{display:none}
  .keysec{width:388px!important;height:740px;zoom:.9;margin:16px auto 0}
  .taskbar{left:6px!important;right:6px!important;bottom:6px!important}
  .mini{min-width:0;flex:1}
  .topnav button{font-size:0!important;gap:0!important}
  .topnav button[data-nav=home]{font-size:11px!important}
  .topnav svg{width:15px!important;height:15px!important}
  .top-r .pill,.clock,.credit{display:none!important}
  .htk-bot{height:auto;padding:10px 18px;flex-wrap:wrap}
  .htk-bar{display:none}
  .ht-tour{white-space:normal}
}

/* v-6x4 */
.h-ticket{display:none!important}
.apps{flex:1;align-content:space-evenly;max-height:440px}
.xw{padding:18px 20px!important;display:flex;flex-direction:column;gap:14px;overflow:auto}
.xw-path{display:flex;align-items:center;gap:8px;font:500 13px var(--mono);letter-spacing:.1em;color:#628E94}
.xw-path svg{width:13px;height:13px}
.xw-path b{color:var(--navy);font-weight:700}
.xw-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.xw-grid > div{display:flex;flex-direction:column;gap:6px;animation:tr-in .4s ease-out both}
.xw-ph{height:118px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:11px;overflow:hidden}
.xw-ph img{width:100%;height:100%;object-fit:cover}
.xw-grid b{font:700 14px var(--mono)}
.xw-grid small{margin-top:-6px;font:400 9px var(--dm);color:#628E94}
.xw-big{font:900 46px/.9 var(--disp);color:var(--blue)}
.xw-row{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:6px;background:var(--card);box-shadow:0 0 0 1px var(--line);animation:tr-in .4s ease-out both}
.xw-row.on{background:#D3F2EC;box-shadow:none}
.xw-row i{width:8px;height:8px;border-radius:50%;background:#E1EFF1}
.xw-row.on i{background:#22B5A0}
.xw-row span{flex-grow:1;font-size:13px}
.xw-row small{font:400 9px var(--dm);color:#628E94}
@media (max-width:720px),(max-aspect-ratio:4/5) and (max-width:1100px),(max-height:599px){.apps-panel{height:auto!important}}

body.boxed{background:#EBF7F8}
body.boxed #desk{border-radius:22px;overflow:hidden;box-shadow:0 0 0 1px rgba(222,238,240,.8)}
body.boxed.dark{background:#0A1316}

/* 왼쪽 덩어리 (전체화면 비율 그대로 같이 커짐) */
.stage .leftcol{position:absolute;left:30px;top:var(--lt,8px);width:632px;height:748px;transform:scale(var(--k,1));transform-origin:0 0;z-index:1}
.stage .leftcol > section{position:absolute}
.stage .leftcol .h-title{left:0;top:0}
.stage .leftcol .h-garland{position:absolute!important;left:0!important;top:calc(197px + var(--gm,0px))!important}
.stage .leftcol .h-title{animation:tr-in .7s ease-out both}
.stage .leftcol .apps-panel{left:0!important;top:272px!important;bottom:auto!important;height:476px!important}
.stage .leftcol .hz{transform:none}
.stage .keysec{left:var(--kl,692px);top:8px;bottom:auto;height:var(--ksh,748px);transform:scale(var(--ks,1));transform-origin:0 0}
body:not(.entered) .stage section{animation-play-state:paused!important}
@media (max-width:720px),(max-aspect-ratio:4/5) and (max-width:1100px),(max-height:599px){
  .stage .leftcol{position:static;transform:none;width:auto;height:auto}
  .stage .leftcol > section{position:relative;left:auto!important;top:auto!important;height:auto!important}
  .stage .keysec{transform:none;left:auto}
}

html,body{background:#fff}
body:not(.dark){background-color:#fff;background-image:linear-gradient(rgba(49,172,189,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(49,172,189,.08) 1px,transparent 1px);background-size:44px 44px}

/* ---- 창 크기에 맞춰 빈틈없이 채우기 ---- */
body:not(.dark){background-image:none}
.stage{top:72px!important;bottom:72px!important;height:auto!important}
.stage .leftcol{top:8px!important;height:var(--ksh,748px)!important;transform:none!important;width:632px!important}
.stage .leftcol .hz.ltop{position:absolute;left:0;top:var(--gt,0px);width:632px;transform:scale(var(--k,1));transform-origin:0 0}
.stage .leftcol .h-title{position:static!important}
.stage .leftcol .h-garland{position:absolute!important;left:0!important;top:calc(197px + var(--gm,0px))!important}
.stage .leftcol .h-title{animation:tr-in .7s ease-out both}
.stage .leftcol .apps-panel{top:var(--pt,272px)!important;height:var(--phh,476px)!important;display:flex!important;flex-direction:column;justify-content:center;padding-top:calc(30px * var(--pp,1))!important;padding-bottom:calc(26px * var(--pp,1))!important}
.stage .leftcol .apps{flex:none!important;max-height:none!important;zoom:var(--a,1);width:calc(596px / var(--a,1))!important;align-content:start!important}
.stage .keysec{left:var(--kx,672px)!important;top:8px!important;height:var(--ksh,748px)!important;transform:none!important}
.stage .ks-3d,.stage .ks-dust{top:var(--kt,0px)!important;transform:scale(var(--s2,1));transform-origin:194px 0}
.stage .ks-dust{transform-origin:194px 0}
.stage .ks-shadow{top:calc(var(--kt,0px) + 630px * var(--s2,1))!important}


/* 상세창 탭 바 얇게 */
.cy-tabs2{padding:3px!important;border-radius:10px!important}
.cy-tabs2 button[data-ct]{height:27px!important;border-radius:7px!important;font-size:9px!important}
.cy-tabs2 .cy-song{width:24px!important;height:24px!important;font-size:10px!important}

/* 상세창: 사진 조금 작게 · _ × 버튼 */
.cy-photo{width:41%!important;max-width:170px}
.win.cydet .win-h .win-btns{display:flex!important;align-self:center;gap:4px;margin-left:auto}
.win.cydet .win-h .win-btns button{width:26px;height:26px;border-radius:7px;background:transparent;border:0;color:var(--ink2)}
.win.cydet .win-h .win-btns button:hover{background:var(--soft2);color:var(--navy)}
.win.cydet .win-h .dots3 i{cursor:default}
.win.cydet.float .win-h .win-btns button{background:rgba(255,255,255,.85);box-shadow:0 2px 8px rgba(34,78,92,.12)}

.win.cydet.float .cy-pstage,.win.cydet.float .cf-stage{container-type:size!important;flex:1!important;min-height:0!important}
.win.cydet.float .cy-pstage .cy-pv{width:min(calc(100% - 40px),330px,calc(100cqh * 4 / 5.6))!important}
.win.cydet.float .cf-stage .cy-pv{width:min(calc(100% - 100px),320px,calc(100cqh * 4 / 5.6))!important}

/* ---- 메인 제목 : 셋리스트 메모장 ---- */
.stage .leftcol .h-garland.gone,.h-note .h-garland{display:none!important}
.h-note{position:relative;width:632px;height:236px;animation:tr-in .7s ease-out both}
.hn-paper{position:absolute;left:0;top:14px;width:556px;height:216px;background:#fff;border-radius:3px;box-shadow:0 10px 26px -14px rgba(34,68,79,.35),0 0 0 1px rgba(222,238,240,.8);
  background-image:linear-gradient(transparent 31px,rgba(49,172,189,.13) 31px,rgba(49,172,189,.13) 32px,transparent 32px);background-size:100% 32px;background-position:0 14px;padding:18px 24px 0 54px;box-sizing:border-box}
.hn-paper::before{content:"";position:absolute;left:40px;top:0;bottom:0;width:1.5px;background:rgba(34,181,160,.45)}
.hn-holes{position:absolute;left:12px;top:10px;bottom:10px;width:14px;background:radial-gradient(circle,#EBF7F8 4.2px,rgba(49,172,189,.25) 4.6px,transparent 5.2px) 0 0/14px 26px repeat-y}
.hn-tape{position:absolute;left:170px;top:6px;width:96px;height:24px;transform:rotate(-2deg);background:rgba(175,226,233,.65);border-left:2px dotted rgba(255,255,255,.7);border-right:2px dotted rgba(255,255,255,.7);z-index:2}
.hn-kick{font:800 11px var(--mono);letter-spacing:.2em;color:#22B5A0}
.h-note .h-svg{display:block;width:380px;height:92px;margin-top:0;overflow:visible}
.hn-word{font:900 146px var(--disp);letter-spacing:-.02em;fill:var(--blue)}
.hn-list{list-style:none;margin:4px 0 0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:6px 18px;max-width:420px}
.hn-list li{display:flex;align-items:center;gap:8px;font:800 11px var(--mono);letter-spacing:.12em;color:var(--navy);white-space:nowrap}
.hn-list li i{width:14px;height:14px;border-radius:3px;border:1.5px solid #A2C3C8;display:grid;place-items:center;font:900 10px/1 var(--sans);font-style:normal;color:#fff;flex:none}
.hn-list li.on i{background:#22B5A0;border-color:#22B5A0}
.hn-list li b{color:var(--blue)}
.hn-list li.on{color:#83AAAF}
.hn-sticky{position:absolute;right:6px;top:62px;width:150px;height:150px;box-sizing:border-box;padding:16px 16px 14px;background:#D3F2EC;transform:rotate(4deg);box-shadow:0 10px 18px -10px rgba(34,68,79,.4);display:flex;flex-direction:column;z-index:3}
.hn-sticky::before{content:"";position:absolute;left:50%;top:-8px;width:56px;height:16px;margin-left:-28px;background:rgba(255,255,255,.6);transform:rotate(-3deg)}
.hn-sticky small{font:800 10px var(--mono);letter-spacing:.2em;color:#178C80}
.hn-sticky b{margin-top:6px;font:900 26px/1.05 var(--disp);color:var(--navy);letter-spacing:-.01em}
.hn-sticky span{margin-top:auto;display:flex;align-items:center;justify-content:space-between;font:800 10px var(--mono);letter-spacing:.16em;color:#178C80}
.hn-sticky span em{color:var(--blue);display:grid}
.hn-sticky span em svg{width:13px;height:13px}
.hn-dust{position:absolute;left:0;top:0}
body.dark .hn-paper{background-color:#1A2B31}
body.dark .hn-sticky{background:#123a37}
@media (max-width:720px),(max-aspect-ratio:4/5) and (max-width:1100px),(max-height:599px){
  .h-note{width:100%;height:auto;padding-bottom:10px}
  .hn-paper{position:relative;width:calc(100% - 64px);height:auto;padding:16px 14px 14px 42px;top:auto;margin-top:16px}
  .hn-paper::before{left:32px}.hn-holes{left:8px}
  .h-note .h-svg{width:100%;height:auto}
  .hn-list{grid-template-columns:1fr;gap:4px}
  .hn-list li{font-size:9.5px}
  .hn-tape{left:30%}
  .hn-sticky{width:110px;height:118px;right:5px;top:auto;bottom:10px;padding:12px}
  .hn-sticky b{font-size:19px}
  .hn-kick{font-size:9px}
  .hn-dust{display:none}
}
.cydet.fit .cy-tabs2{margin-bottom:10px}
.cydet.fit .cy-spec{gap:6px 12px;margin-top:10px;padding-top:8px}
.cydet.fit .cy-body{margin-top:10px}
.cydet.fit .cy-body .cd-sec{margin:8px 0 3px}
.cydet.fit .cy-body .cd-rows div{padding:5px 0}
.cydet.fit .cy-body p{margin:2px 0 4px}
.cydet.fit .cd-memo{margin:14px 2px 2px;padding:11px 14px 9px}
.cydet.fit .cy-foot3{margin-top:8px}
/* 폴더 모양이 보이게 : 탭 + 아이콘 창 테두리에 은은한 선과 그림자 */
.apps-panel{filter:drop-shadow(0 0 .6px rgba(49,172,189,.55)) drop-shadow(0 12px 22px rgba(34,68,79,.10))}
body.dark .apps-panel{filter:drop-shadow(0 0 .6px rgba(149,235,246,.45)) drop-shadow(0 12px 22px rgba(0,0,0,.35))}
/* 패드(터치) : 눌리는 곳은 모두 터치되게 */
[data-open],[data-nav],[data-pair],.flip,[data-a],[data-ct],[data-ck],[data-ci],[data-side],[data-link],[data-copy],[data-song],[data-who],[data-row],[data-bt],.cz-flip,.cp-log,.cd-toggle,.cy-song,.cd-play,.cd-copyall,.flip-hint{cursor:pointer;-webkit-tap-highlight-color:transparent}
@media (min-width:721px) and (min-aspect-ratio:4/5) and (min-height:600px),(min-width:1101px) and (min-height:600px){.win-h{touch-action:none}}
/* =========================================================
   메인 홈 · OFF THE RECORD 시안
   ========================================================= */
@media (min-width:721px) and (min-aspect-ratio:4/5) and (min-height:600px),(min-width:1101px) and (min-height:600px){
#desk{--otf:'Big Shoulders Display','Pretendard','Noto Sans JP',sans-serif;--otb:'Barlow Condensed','Pretendard','Noto Sans JP',sans-serif;--otm:'DM Mono',monospace}
.stage::before{left:520px;top:-332px}
/* 위 · 아래 바 */
.topbar{height:54px!important;border-radius:18px!important;padding:0 10px 0 9px!important;gap:24px!important;background:rgba(255,255,255,.72)!important;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1.5px solid #D3EFF3!important;box-shadow:0 8px 22px rgba(49,172,189,.10),inset 0 1px 0 #fff!important}
.logo-dark{position:relative;height:36px!important;padding:0 16px 0 5px!important;border-radius:11px!important;background:linear-gradient(135deg,#96EBF7 0%,#57D2E3 55%,#3FCFB8 100%)!important;box-shadow:0 6px 16px rgba(49,172,189,.22),inset 0 2px 0 rgba(255,255,255,.5)!important;border:1.5px solid rgba(255,255,255,.9)!important;overflow:hidden}
.logo-dark::after{content:'';position:absolute;left:8px;right:8px;top:2px;height:42%;border-radius:11px;background:linear-gradient(rgba(255,255,255,.6),rgba(255,255,255,0));pointer-events:none}
.logo-dark .logo-ic{position:relative;z-index:1;width:26px!important;height:26px!important;background:#fff!important;color:#31ACBD!important}
.logo-dark .logo-ic svg{width:13px!important;height:13px!important;fill:#31ACBD;stroke:none}
.logo-dark > div{position:relative;z-index:1}
.logo-dark b{font:900 15px/1 var(--otf)!important;letter-spacing:.05em!important;color:#fff!important}
.logo-dark small{font:400 7px/1 var(--otm)!important;letter-spacing:.22em!important;color:rgba(255,255,255,.85)!important;margin-top:2px!important}
.topnav{gap:6px!important}
.topnav button{height:32px!important;padding:0 12px!important;border-radius:11px!important;font:600 13px var(--otb)!important;letter-spacing:.14em!important;color:#54AFBB!important;border:1.5px solid transparent!important}
.topnav button[data-nav=home]{padding:0 14px!important;background:#fff!important;border-color:#D3EFF3!important;box-shadow:0 2px 6px rgba(49,172,189,.08)!important;color:#31ACBD!important;font-weight:700!important}
.topnav button[data-nav=home]::before{content:'';width:13px;height:13px;margin-right:6px;background:currentColor;-webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.1' stroke-linejoin='round'%3E%3Cpath d='M20 14A8 8 0 1110 4a6 6 0 0010 10z'/%3E%3C/svg%3E") center/contain no-repeat;mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.1' stroke-linejoin='round'%3E%3Cpath d='M20 14A8 8 0 1110 4a6 6 0 0010 10z'/%3E%3C/svg%3E") center/contain no-repeat}
.topnav button:hover{color:#31ACBD!important}
.top-r{gap:10px!important;font:500 12px var(--otb)!important;letter-spacing:.14em!important;color:#84B6BD!important}
.top-r .pill{height:30px!important;padding:0 12px!important;border-radius:11px!important;background:rgba(255,255,255,.8)!important;border:1.5px solid #D3EFF3!important;font:500 12px var(--otb)!important;letter-spacing:.14em!important;color:#54AFBB!important;gap:7px!important}
.top-r .pill b{font-weight:700;color:#22444F}
.top-r .pill .led{width:7px!important;height:7px!important;background:#3FCFB8!important;box-shadow:0 0 0 3px rgba(63,207,184,.2)!important;animation:tr-blink 1.6s ease-in-out infinite}
.top-r .clock{font:500 12px var(--otb)!important;letter-spacing:.14em!important;color:#84B6BD!important}
.top-r .sq,.tb-r .sq{width:32px!important;height:32px!important;border-radius:10px!important;background:rgba(255,255,255,.85)!important;border:1.5px solid #D3EFF3!important;box-shadow:none!important;color:#54AFBB!important}
.top-r .sq svg,.tb-r .sq svg{width:13px!important;height:13px!important;stroke-width:2.1}
.taskbar{height:54px!important;border-radius:18px!important;padding:0 10px!important;gap:8px!important;background:rgba(255,255,255,.72)!important;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1.5px solid #D3EFF3!important;box-shadow:0 8px 22px rgba(49,172,189,.10),inset 0 1px 0 #fff!important}
.start{position:relative;height:34px!important;padding:0 15px 0 12px!important;border-radius:11px!important;background:linear-gradient(135deg,#96EBF7 0%,#57D2E3 55%,#3FCFB8 100%)!important;box-shadow:0 6px 16px rgba(49,172,189,.22),inset 0 2px 0 rgba(255,255,255,.5)!important;border:1.5px solid rgba(255,255,255,.9)!important;color:#fff!important;font:800 13px var(--otb)!important;letter-spacing:.12em!important;overflow:hidden}
.start::after{content:'';position:absolute;left:8px;right:8px;top:2px;height:42%;border-radius:11px;background:linear-gradient(rgba(255,255,255,.6),rgba(255,255,255,0));pointer-events:none}
.start svg{position:relative;z-index:1;width:12px!important;height:12px!important;fill:#fff;stroke:none}
.start span{position:relative;z-index:1}
.task{height:34px!important;padding:0 13px!important;border-radius:11px!important;background:rgba(255,255,255,.85)!important;border:1.5px solid #D3EFF3!important;box-shadow:none!important;color:#31ACBD!important;font:700 12px var(--otb)!important;letter-spacing:.12em!important}
.task::before{background:#3FCFB8!important}
.mini{height:38px!important;min-width:230px!important;padding:0 4px!important;border-radius:11px!important;background:#fff!important;border:1.5px solid #D3EFF3!important;gap:9px!important}
.mini-cover{position:relative;width:30px!important;height:30px!important;border-radius:50%!important;background:linear-gradient(150deg,#96EBF7,#3FCFB8)!important;box-shadow:inset 0 0 0 2px rgba(255,255,255,.8);animation:tr-orbit 8s linear infinite}
.mini-cover::before{content:'';position:absolute;left:12px;top:12px;width:6px;height:6px;border-radius:50%;background:#fff}
.mini-t{color:#22444F!important}
.mini-t small{font:400 7px var(--otm)!important;letter-spacing:.2em!important;color:#84B6BD!important}
.mini-t b{font:700 13px var(--otb)!important;letter-spacing:.04em!important;color:#22444F!important}
.mini-eq{display:none!important}
.mini-play{position:relative;width:30px!important;height:30px!important;border-radius:50%!important;background:linear-gradient(135deg,#96EBF7 0%,#57D2E3 55%,#3FCFB8 100%)!important;box-shadow:0 6px 16px rgba(49,172,189,.22),inset 0 2px 0 rgba(255,255,255,.5)!important;border:1.5px solid rgba(255,255,255,.9)!important;color:#fff!important;overflow:hidden}
.mini-play svg{width:10px!important;height:10px!important;fill:#fff}
.credit{text-align:right}
.credit small{font:400 7px var(--otm)!important;letter-spacing:.16em!important;color:#84B6BD!important}
.credit b{font:900 13px var(--otf)!important;letter-spacing:.05em!important;background:linear-gradient(135deg,#57D2E3,#3FCFB8);-webkit-background-clip:text;background-clip:text;color:transparent!important}
/* 왼쪽 위 : 젤리 글씨 + NOW PLAYING */
.stage .leftcol{left:24px!important;top:var(--lct,4px)!important;width:790px!important;scale:var(--lcs,1);transform-origin:0 0!important}
.stage .leftcol .hz.ltop{width:790px!important;height:300px;top:var(--gt,0px)!important;transform:none;scale:var(--lk,1);transform-origin:0 0!important;animation:tr-in .7s ease-out both}
.h-otr{position:relative;width:790px;height:300px}
.ho-kick{display:flex;align-items:center;gap:14px;font:700 14px var(--otb);letter-spacing:.14em;color:#31ACBD}
.ho-kick i{flex-grow:1;height:1.5px;background:#DEEEF0}
.ho-kick .hk-b{color:#22B5A0}
.ho-title{position:absolute;left:0;top:28px;width:790px;height:251px}
.ho-title .ot-t{font-family:var(--otf)!important}
.ho-np{position:absolute;left:552px;top:40px;width:200px;transform:scale(1.19);transform-origin:0 0;box-sizing:border-box;border-radius:18px;background:rgba(255,255,255,.78);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1.5px solid #D3EFF3;box-shadow:0 10px 26px rgba(49,172,189,.10),inset 0 1px 0 #fff;padding:10px;cursor:pointer}
.np-h{display:flex;justify-content:space-between;align-items:center;padding:0 2px 8px}
.np-h b{font:900 15px var(--otf);letter-spacing:.06em;background:linear-gradient(135deg,#3DC6D8,#3FCFB8);-webkit-background-clip:text;background-clip:text;color:transparent}
.np-h i{width:7px;height:7px;border-radius:50%;background:#3FCFB8;box-shadow:0 0 0 3px rgba(63,207,184,.2);animation:tr-blink 1.6s ease-in-out infinite}
.np-m{display:flex;gap:10px;align-items:center}
.np-disc{position:relative;width:90px;height:90px;flex-shrink:0;border-radius:50%;background:radial-gradient(circle,#fff 0 9px,rgba(255,255,255,0) 9.5px 15px,rgba(255,255,255,.85) 15.5px 25px,transparent 25.5px),conic-gradient(from 20deg,#C4F4FA,#96EBF7,#7FE3D2,#C9F3EA,#A6EEF8,#C4F4FA);box-shadow:0 8px 18px rgba(49,172,189,.2),inset 0 0 0 2px rgba(255,255,255,.85);animation:tr-orbit 14s linear infinite}
.np-shine{position:absolute;left:14px;top:10px;width:46px;height:22px;border-radius:50%;background:rgba(255,255,255,.55);transform:rotate(-30deg);filter:blur(1px)}
.np-core{position:absolute;left:50%;top:50%;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;background:linear-gradient(135deg,#96EBF7,#57D2E3 55%,#3FCFB8);box-shadow:inset 0 0 0 1.5px #fff}
.np-list{display:flex;flex-direction:column;gap:5px}
.np-list div{display:flex;gap:5px;align-items:center;white-space:nowrap;font:600 11px var(--otb);letter-spacing:.05em;color:#50848B}
.np-list div.on{font-weight:800;color:#31ACBD}
.np-list b{color:#3FCFB8}
.np-bar{margin-top:10px;height:10px;box-sizing:border-box;border-radius:99px;background:rgba(255,255,255,.85);border:1.5px solid #D3EFF3;padding:1.5px}
.np-bar span{display:block;height:100%;width:42%;border-radius:99px;background:linear-gradient(90deg,#A5E6EF,#67DAE9 60%,#4FD6C0);animation:tr-prog 18s linear infinite alternate}
@keyframes tr-prog{from{width:30%}to{width:88%}}
.np-time{margin-top:5px;display:flex;justify-content:space-between;padding:0 2px;font:400 8px var(--otm);color:#84B6BD}
/* 아이콘 창 : 폴더 모양 */
.stage .leftcol .apps-panel{left:0!important;width:790px!important;top:calc(var(--pt,316px) + 4px)!important;height:var(--phh,428px)!important;box-sizing:border-box!important;border-radius:0 16px 16px 16px!important;background:transparent!important;border:0!important;box-shadow:none!important;filter:none!important;padding:18px 18px 0!important;justify-content:flex-start!important;animation:tr-in .7s .24s ease-out both}
.apps-panel .ot-folder{position:absolute;left:0;top:-34px;z-index:-1;overflow:visible;pointer-events:none}
.apps-panel{isolation:isolate}
.panel-tab{left:0!important;top:-34px!important;height:34px!important;padding:0 18px 0 14px!important;background:transparent!important;border:0!important;box-shadow:none!important;gap:8px!important}
.panel-tab::before,.panel-tab::after{display:none!important}
.panel-tab svg{width:15px!important;height:15px!important;color:#57D2E3;stroke:#57D2E3}
.panel-tab span{font:900 19px var(--otf)!important;letter-spacing:.06em!important;background:linear-gradient(135deg,#3DC6D8,#3FCFB8);-webkit-background-clip:text;background-clip:text;color:transparent!important}
.stage .leftcol .apps{display:grid!important;grid-template-columns:repeat(6,minmax(0,1fr))!important;gap:16px 6px!important;width:auto!important;zoom:1!important;padding:0!important;margin:0!important}
.apps .app-tile{padding:0!important;gap:6px!important;font:600 13px var(--otb)!important;letter-spacing:.04em!important;color:#22444F!important;height:auto!important;min-height:0!important}
.apps .app-ic.tilebox{width:64px!important;height:64px!important;border-radius:12px!important}
.apps .app-ic.tilebox svg{width:24px!important;height:24px!important;stroke-width:1.9}
.apps .app-ic.tilebox.os0{background:rgba(255,255,255,.92)!important;color:#31ACBD!important;border:2px solid #D3EFF3!important;box-shadow:0 4px 10px rgba(49,172,189,.10)!important}
.apps .app-ic.tilebox.os1{background:linear-gradient(rgba(255,255,255,.55),rgba(255,255,255,0) 46%),linear-gradient(135deg,#96EBF7,#57D2E3 55%,#4BC4D4)!important;color:#fff!important;border:0!important;box-shadow:0 6px 14px rgba(49,172,189,.24),inset 0 0 0 1.5px rgba(255,255,255,.7)!important}
.apps .app-ic.tilebox.os2{background:linear-gradient(rgba(255,255,255,.55),rgba(255,255,255,0) 46%),linear-gradient(135deg,#7FE3D2,#3FCFB8 55%,#22B5A0)!important;color:#fff!important;border:0!important;box-shadow:0 6px 14px rgba(34,181,160,.24),inset 0 0 0 1.5px rgba(255,255,255,.7)!important}
.apps .app-ic.tilebox.os3{background:linear-gradient(rgba(255,255,255,.55),rgba(255,255,255,0) 46%),linear-gradient(160deg,#F2FCF9,#D6F3EC)!important;color:#16A08A!important;border:0!important;box-shadow:0 4px 10px rgba(49,172,189,.10),inset 0 0 0 1.5px rgba(255,255,255,.9)!important}
.apps .app-ic.tilebox.os4{background:linear-gradient(rgba(255,255,255,.55),rgba(255,255,255,0) 46%),linear-gradient(160deg,#F5FDFE,#DFF6F9)!important;color:#31ACBD!important;border:0!important;box-shadow:0 4px 10px rgba(49,172,189,.10),inset 0 0 0 1.5px rgba(255,255,255,.9)!important}
.apps .app-ic .badge{right:-6px!important;top:-6px!important;width:17px!important;height:17px!important;min-width:0!important;padding:0!important;border-radius:50%!important;background:linear-gradient(135deg,#FF7A8C,#F05468)!important;box-shadow:0 2px 6px rgba(240,84,104,.35),inset 0 0 0 1.5px #fff!important;color:#fff!important;font:800 11px var(--otb)!important;display:flex!important;align-items:center;justify-content:center;border:0!important}
/* 가운데 열쇠 */
.stage .keysec{left:var(--kx,838px)!important;top:var(--ktop,8px)!important;width:284px!important;height:var(--ksh,740px)!important;perspective:1400px;animation:tr-fade 1.1s .2s ease-out both}
.stage .ks-3d{left:0!important;top:0!important;transform-origin:0 0!important;transform:translate(calc(142px - 145px * var(--s2,1)),calc(var(--kt,0px) + 89.25px * var(--s2,1))) scale(calc(.745 * var(--s2,1)))!important}
.stage .ks-dust{left:0!important;top:0!important;transform-origin:0 0!important;transform:translate(calc(142px - 142px * var(--s2,1)),var(--kt,0px)) scale(var(--s2,1))!important}
.stage .ks-shadow{left:calc(142px - 68px * var(--s2,1))!important;top:calc(var(--kt,0px) + 558px * var(--s2,1))!important;width:calc(134px * var(--s2,1))!important;height:calc(22px * var(--s2,1))!important}
.ks-mq{height:44px!important;border-radius:14px!important;background:rgba(255,255,255,.72)!important;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1.5px solid #D3EFF3!important;box-shadow:0 8px 22px rgba(49,172,189,.10),inset 0 1px 0 #fff!important;-webkit-mask:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.ks-mq .mq-track{font:800 14px var(--otb)!important;letter-spacing:.16em!important;color:#57D2E3!important}
.ks-mq .mq-track b{color:#3FCFB8}
/* 오른쪽 출입증 카드 */
.win.passwin{border-radius:22px!important;background:rgba(255,255,255,.74)!important;border:1.5px solid #D3EFF3!important;box-shadow:0 10px 28px rgba(49,172,189,.10),inset 0 1px 0 #fff!important;overflow:visible!important}
.win.passwin > .win-h{position:absolute!important;left:0;right:0;top:0;height:26px!important;background:transparent!important;border:0!important;padding:0 10px!important;z-index:3;justify-content:center}
.win.passwin > .win-h::before{content:'';position:absolute;left:50%;top:12px;width:48px;height:8px;margin-left:-24px;border-radius:99px;background:rgba(255,255,255,.9);box-shadow:inset 0 1px 2px rgba(49,172,189,.25)}
.win.passwin > .win-h .win-ic,.win.passwin > .win-h .win-t,.win.passwin > .win-h .win-s,.win.passwin > .win-h .acc{display:none!important}
.win.passwin > .win-h .win-btns{position:absolute;right:10px;top:8px;gap:2px}
.win.passwin > .win-h .win-btns button{width:20px!important;height:20px!important;border-radius:6px!important;background:transparent!important;color:#A3D0D6!important;border:0!important}
.win.passwin > .win-h .win-btns button svg{width:11px!important;height:11px!important}
.win.passwin .win-b{padding:0!important;background:transparent!important}
.passwin .pass{padding:16px!important;padding-top:20px!important;display:flex!important;flex-direction:column;gap:12px!important;background:transparent!important}
.passwin .pass-top{display:flex;justify-content:space-between;align-items:center;padding:0!important;border:0!important;margin:0!important}
.passwin .pass-top span{display:block;font:700 12px var(--otb)!important;letter-spacing:.18em!important;color:#22B5A0!important}
.passwin .pass-top span .pcnt{font-style:normal;color:#22B5A0!important}
.passwin .pass-top strong{display:block;font:900 24px/1 var(--otf)!important;color:#22444F!important;letter-spacing:0!important}
.passwin .pass-top > b{display:none!important}
.passwin .pass-img{height:168px!important;margin:0!important;border-radius:16px!important;overflow:hidden;box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.6)}
.passwin .pass-img .face.front .ph,.passwin .pass-img .face.front > div:first-child{background:linear-gradient(155deg,#A6EEF8 0%,#67DAE9 55%,#6FDCC8 100%)!important}
.passwin .pass-img .face.front::before{content:'';position:absolute;left:10px;right:10px;top:6px;height:34%;border-radius:10px;background:linear-gradient(rgba(255,255,255,.45),rgba(255,255,255,0));z-index:2;pointer-events:none}
.passwin .pass-img .corner,.passwin .pass-tag{display:none!important}
.passwin .pass-meta{display:flex!important;gap:6px!important;padding:0!important;margin:0!important;border:0!important}
.passwin .pass-meta > div{height:24px;padding:0 9px;box-sizing:border-box;border-radius:99px;background:rgba(255,255,255,.8);border:1.5px solid #D3EFF3;display:inline-flex!important;align-items:center;white-space:nowrap;flex:none!important}
.passwin .pass-meta small{display:none!important}
.passwin .pass-meta b,.passwin .pass-meta .st-chip{font:700 10px var(--otb)!important;letter-spacing:.12em!important;color:#54AFBB!important;background:none!important;border:0!important;padding:0!important;height:auto!important}
.passwin .pass-meta .st-chip::before{content:'● '}
.passwin .ot-dbox{position:relative;border-radius:16px;background:rgba(255,255,255,.7);border:1.5px solid #E4F6F9;padding:12px 14px 14px}
.passwin .together{display:flex!important;justify-content:space-between;align-items:flex-end;margin:0!important;padding:0!important;border:0!important}
.passwin .together small{font:400 9px var(--otm)!important;letter-spacing:.16em!important;color:#84B6BD!important}
.passwin .together b{font:900 58px/.9 var(--otf)!important;background:linear-gradient(135deg,#79DFED,#3DC6D8 50%,#3FCFB8);-webkit-background-clip:text;background-clip:text;color:transparent!important;filter:drop-shadow(0 4px 6px rgba(49,172,189,.18));letter-spacing:0!important}
.passwin .together b em{font-style:normal;font-size:inherit!important;color:inherit!important}
.passwin .nextrow{margin:10px 0 0!important;display:flex!important;justify-content:space-between;align-items:center;font:800 14px var(--otb)!important;color:#22444F!important;padding:0!important;border:0!important}
.passwin .nextrow b{font:inherit!important;color:#22444F!important}
.passwin .nextrow span{font:inherit!important;color:#31ACBD!important}
.passwin .pbar{position:relative;margin:8px 0 0!important;height:14px!important;box-sizing:border-box;border-radius:99px!important;background:rgba(255,255,255,.74)!important;border:1.5px solid #D3EFF3;padding:2px}
.passwin .pbar i{position:relative!important;display:block;left:auto!important;top:auto!important;height:100%!important;border-radius:99px!important;background:linear-gradient(90deg,#A5E6EF,#67DAE9 60%,#4FD6C0)!important;overflow:hidden}
.passwin .pbar i::after{content:'';position:absolute;left:4px;right:4px;top:1px;height:45%;border-radius:99px;background:linear-gradient(rgba(255,255,255,.75),rgba(255,255,255,0))}
.passwin .nextsub{margin-top:6px!important;display:flex!important;justify-content:space-between;font:400 8px var(--otm)!important;color:#84B6BD!important;padding:0!important}
.passwin .pass-perf{margin:2px -16px 0!important;height:6px!important;border:0!important;background:linear-gradient(90deg,transparent,#D3EFF3 12%,#BFEDE4 88%,transparent) 0 50%/100% 1.5px no-repeat!important}
.passwin .pass-perf::before,.passwin .pass-perf::after{display:none!important}
.passwin .barcode{margin:-6px -16px -16px!important;height:46px;padding:0 16px!important;display:flex!important;align-items:center;gap:12px!important;border:0!important;background:none!important}
.passwin .barcode svg{height:22px!important;width:auto!important}
.passwin .barcode svg rect{fill:#A3D0D6}
.passwin .barcode span{font:800 13px var(--otb)!important;letter-spacing:.12em!important;color:#54AFBB!important}
}
/* 페어 목록 : 이름 · 영어 이름 크게, D+ 칸 둥글고 크게 */
.cp-ov b{font-size:18px!important}
.cp-ov small{font-size:10.5px!important;margin-top:3px!important}
.cp-d{font-size:13px!important;padding:6px 13px!important;border-radius:99px!important;top:10px!important;right:10px!important}
/* 페어 : 목록 창 위 캐릭터 화면 (영상 시안) */
.pf-ov{display:flex!important;flex-direction:column;height:100%;min-height:0}
.pf-ov .cy-pcard.fl{position:relative;flex:none;margin:0!important;background:#fff!important;background-image:none!important;border:1.5px solid #E4F6F9!important;border-radius:16px!important;box-shadow:0 8px 20px rgba(49,172,189,.10)!important;padding:16px 18px 14px!important}
.pf-ov .cy-pcard.fl small{display:block;font:700 9px var(--mono);letter-spacing:.14em;color:var(--blue2)}
.pf-ov .cy-pcard.fl b{display:block;font:900 20px var(--sans);color:var(--ink);margin-top:4px}
.pf-ov .cy-pcard.fl em{display:block;font:600 12px var(--sans);font-style:italic;color:#3DC6D8;margin-top:6px}
.pf-ov .cd-tags{margin-top:8px}
.pf-x{position:absolute;right:12px;top:12px;width:28px;height:28px;border-radius:50%;border:1.5px solid #D3EFF3;background:#fff;color:#31ACBD;display:grid;place-items:center;cursor:pointer}
.pf-x svg{width:12px;height:12px;stroke-width:2.4}
.pf-en{margin-left:6px;font:600 11px var(--sans);color:var(--ink2)}
.pf-ov .cf-stage{flex:1;min-height:0;position:relative;display:flex;align-items:center;justify-content:center;container-type:size;margin-top:12px}
.pf-ov .cf-stage .cy-pv{width:min(calc(100% - 100px),320px,calc(100cqh * 4 / 5.6))!important;aspect-ratio:4/5.6;height:auto!important}
.pf-ov .cf-side{right:4px}
.pf-bar{flex:none;display:flex;gap:10px;align-items:center;margin-top:12px}
.pf-song{flex:1;min-width:0;height:40px;border-radius:12px;background:#fff;border:1.5px solid #E4F6F9;display:flex;align-items:center;gap:10px;padding:0 12px 0 6px;cursor:pointer;color:#22444F}
.pf-play{width:28px;height:28px;border-radius:50%;background:#ECF8F9;color:#31ACBD;display:grid;place-items:center;flex:none}
.pf-play svg{width:10px;height:10px;fill:currentColor}
.pf-song b{flex:1;min-width:0;text-align:left;font:700 12px var(--sans);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pf-song i{font-style:normal;color:#A2C3C8;letter-spacing:.1em}
.pf-pair{flex:none;height:40px;padding:0 18px;border-radius:12px;background:linear-gradient(135deg,#57D3E4,#3DC6D8)!important;color:#fff!important;font:800 12px var(--mono);letter-spacing:.14em;box-shadow:0 6px 14px rgba(49,172,189,.25);cursor:pointer;border:0}
/* 페어 목록 카드 : 영상처럼 */
.cp-ov small{color:#7FE3D2!important;letter-spacing:.06em!important}
.cp-f span{color:#3DC6D8!important;font-weight:800!important}
/* ---------- 캐릭터 창 움직임 ---------- */
@keyframes cx-slide{0%{opacity:0;transform:translateX(-140px) scale(.96)}60%{opacity:1}100%{opacity:1;transform:none}}
@keyframes cx-rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes cx-pop{0%{opacity:0;transform:scale(.6)}70%{transform:scale(1.08)}100%{opacity:1;transform:none}}
.cx.anim .cp-list > *,.cx.anim .cx-grid > *,.cx.anim .rs-grid > *{animation:cx-rise .45s cubic-bezier(.22,.9,.25,1) both}
.cp-list > :nth-child(2),.cx-grid > :nth-child(2),.rs-grid > :nth-child(2){animation-delay:.06s}
.cp-list > :nth-child(3),.cx-grid > :nth-child(3),.rs-grid > :nth-child(3){animation-delay:.12s}
.cp-list > :nth-child(4),.cx-grid > :nth-child(4),.rs-grid > :nth-child(4){animation-delay:.18s}
.cp-list > :nth-child(n+5),.cx-grid > :nth-child(n+5),.rs-grid > :nth-child(n+5){animation-delay:.24s}
.pf-ov .cy-pcard.fl{animation:cx-rise .45s cubic-bezier(.22,.9,.25,1) both}
.pf-ov .cf-stage{animation:cx-rise .5s .08s cubic-bezier(.22,.9,.25,1) both}
.pf-ov .cf-side .cf-av{animation:cx-pop .45s cubic-bezier(.22,.9,.25,1) both}
.pf-ov .cf-side .cf-av:nth-child(1){animation-delay:.25s}.pf-ov .cf-side .cf-av:nth-child(2){animation-delay:.33s}
.pf-ov .pf-bar{animation:cx-rise .45s .16s cubic-bezier(.22,.9,.25,1) both}
.pf-ov .cf-av{transition:transform .25s ease,box-shadow .25s ease}
.pf-ov .cf-av:hover{transform:scale(1.08)}
.pf-pair,.pf-song{transition:transform .18s ease,box-shadow .18s ease}
.pf-pair:hover{transform:translateY(-2px);box-shadow:0 10px 20px rgba(49,172,189,.3)}
.pf-song:hover{transform:translateY(-1px)}
.cp-card,.cx-card,.rs-card{transition:transform .2s ease,box-shadow .2s ease,border-color .2s}
.cp-card:hover,.cx-card:hover,.rs-card:hover{transform:translateY(-3px)!important;box-shadow:0 10px 22px rgba(49,172,189,.14)}
/* 페어 캐릭터 화면 : 판(바탕)만 메인 홈 같은 연한 모눈종이, 사진 칸은 그대로 */
.win.cxwin .win-b:has(.pf-ov),.win.cxwin .win-b:has(.pf-ov) .cx{background-color:#fff!important;background-image:linear-gradient(rgba(49,172,189,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(49,172,189,.08) 1px,transparent 1px)!important;background-size:22px 22px!important}
.win.cxwin .win-b:has(.pf-ov) .cx{background:transparent!important}
.pf-ov .cy-pv .ph:has(img){background:none!important;box-shadow:none!important;border-radius:0!important}
.pf-ov .cy-pv .ph:has(img)::after{display:none}
.pf-ov .cy-pv .ph img{object-fit:contain!important;object-position:50% 100%;-webkit-mask-image:linear-gradient(to bottom,#000 0%,#000 74%,rgba(0,0,0,.55) 90%,rgba(0,0,0,.08) 100%);mask-image:linear-gradient(to bottom,#000 0%,#000 74%,rgba(0,0,0,.55) 90%,rgba(0,0,0,.08) 100%)}   /* 아래쪽만 자연스럽게 흐려져요 */
/* ---------- 자기소개 · 리스트 · 링크 창 ---------- */
.win.dzwin{border-radius:24px!important;background:#F3FCFD!important;background-image:linear-gradient(rgba(49,172,189,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(49,172,189,.06) 1px,transparent 1px)!important;background-size:22px 22px!important;border:1.5px solid #D3EFF3!important;box-shadow:0 22px 50px -14px rgba(34,78,92,.35),inset 0 1px 0 #fff!important;overflow:hidden}
.win.dzwin::before{content:'';position:absolute;left:28px;right:28px;top:0;height:4px;border-radius:0 0 4px 4px;background:linear-gradient(90deg,#5FD3BC,#31ACBD);z-index:2}
.win.dzwin > .win-h{display:none!important}
.win.dzwin .win-b{padding:0!important;background:transparent!important;overflow:hidden;display:flex;flex-direction:column}
.dz{display:flex;flex-direction:column;height:100%;min-height:0;font-family:'IBM Plex Sans KR','Pretendard',sans-serif;color:#22444F}
.dz-head{position:relative;flex:none;display:flex;align-items:center;gap:14px;padding:22px 22px 12px;cursor:move;animation:cx-rise .45s cubic-bezier(.22,.9,.25,1) both}
.dz-num{font:900 64px/.8 'Big Shoulders Display',sans-serif;letter-spacing:-.02em;background:linear-gradient(160deg,#79DFED,#31ACBD 70%);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-mask:linear-gradient(#000 45%,transparent 45%),radial-gradient(#000 1.4px,transparent 1.7px) 0 0/4px 4px;mask:linear-gradient(#000 45%,transparent 45%),radial-gradient(#000 1.4px,transparent 1.7px) 0 0/4px 4px}
.dz-head > div{display:flex;flex-direction:column;align-items:flex-start}
.dz-chip{height:20px;padding:0 10px;border-radius:99px;border:1.5px solid #D3EFF3;background:#fff;font:800 9px 'Barlow Condensed',sans-serif;letter-spacing:.14em;color:#31ACBD;display:inline-flex;align-items:center;margin-bottom:4px}
.dz-head b{font:900 24px/1 'Big Shoulders Display',sans-serif;letter-spacing:.02em;color:#2A96A5}
.dz-head small{margin-top:4px;font:700 10px 'Barlow Condensed',sans-serif;letter-spacing:.16em;color:#22B5A0}
.dz-x{position:absolute;right:16px;top:16px;width:32px;height:32px;border-radius:50%;background:#fff;border:1.5px solid #D3EFF3;color:#31ACBD;display:grid;place-items:center;box-shadow:0 4px 10px rgba(49,172,189,.12);transition:transform .25s ease}
.dz-x:hover{transform:rotate(90deg)}
.dz-x svg{width:13px;height:13px;stroke-width:2.4}
.dz-rule{flex:none;margin:0 22px;height:8px;border-bottom:1.5px dashed #A2DCE4;position:relative}
.dz-rule i{position:absolute;right:0;bottom:-5px;width:22px;height:8px;background:repeating-linear-gradient(115deg,#79DFED 0 3px,transparent 3px 6px)}
.dz-body{flex:1;min-height:0;overflow:auto;padding:14px 22px 22px;display:flex;flex-direction:column;gap:12px;scrollbar-width:thin;scrollbar-color:#A2DCE4 transparent}
.dz-card{background:#fff;border:1.5px solid #DFF3F5;border-radius:16px;box-shadow:0 6px 14px -8px rgba(49,172,189,.2);animation:cx-rise .45s cubic-bezier(.22,.9,.25,1) both}
.dz-info{padding:14px 18px;display:flex;flex-direction:column;gap:8px}
.dz-handle{display:flex;align-items:center;gap:8px;font:800 14px 'IBM Plex Sans KR',sans-serif;color:#22444F;padding-left:2px}
.dz-handle svg{width:13px;height:13px;color:#A2DCE4}
.dz-kv{display:grid;grid-template-columns:76px 1fr;align-items:start;gap:8px}
.dz-kv small{font:800 10px 'Barlow Condensed',sans-serif;letter-spacing:.16em;color:#54AFBB;padding-top:2px}
.dz-kv span{font:500 12.5px/1.5 'IBM Plex Sans KR',sans-serif}
.dz-kv em{display:block;font:500 10.5px 'IBM Plex Sans KR',sans-serif;font-style:normal;color:#84B6BD}
.dz-table{overflow:hidden;padding:0}
.dz-th{display:grid;grid-template-columns:1.2fr 1fr;padding:10px 16px;background:#F0FBFC;font:800 10px 'Barlow Condensed',sans-serif;letter-spacing:.14em;color:#31ACBD}
.dz-tr{display:grid;grid-template-columns:1.2fr 1fr;gap:8px;padding:10px 16px;border-top:1px solid #E9F5F7;animation:cx-rise .4s both}
.dz-tr span{font:700 12px 'IBM Plex Sans KR',sans-serif}
.dz-tr small{font:500 11px/1.5 'IBM Plex Sans KR',sans-serif;color:#628E94}
.dz-ng{padding:12px 16px;border-left:5px solid #A2DCE4}
.dz-ng div{display:flex;align-items:center;gap:8px}
.dz-ng i{font:800 10px 'Barlow Condensed',sans-serif;font-style:normal;letter-spacing:.1em;color:#fff;background:#2A96A5;padding:2px 8px;border-radius:5px}
.dz-ng b{font:800 13px 'IBM Plex Sans KR',sans-serif;color:#2A96A5}
.dz-ng p{margin:6px 0 0;font:500 11.5px/1.5 'IBM Plex Sans KR',sans-serif;color:#628E94}
.dz-foot{display:flex;align-items:center;justify-content:space-between;padding:10px 2px 0;border-top:1.5px dashed #D3EFF3;margin-top:4px}
.dz-foot b{display:block;font:800 11px 'Barlow Condensed',sans-serif;letter-spacing:.12em;color:#2A96A5}
.dz-foot small{font:700 9px 'Barlow Condensed',sans-serif;letter-spacing:.14em;color:#84B6BD}
.dz-stamp{width:64px;height:64px;border-radius:50%;border:2px dashed #79DFED;display:grid;place-items:center;font:900 10px 'Barlow Condensed',sans-serif;letter-spacing:.1em;color:#57D2E3;transform:rotate(-14deg);box-shadow:inset 0 0 0 4px #fff,inset 0 0 0 5.5px #D3EFF3;animation:tr-stamp .6s .4s cubic-bezier(.3,1.4,.5,1) both}
@keyframes tr-stamp{0%{opacity:0;transform:rotate(-14deg) scale(1.8)}70%{opacity:1;transform:rotate(-14deg) scale(.94)}100%{opacity:1;transform:rotate(-14deg) scale(1)}}
.dz-intro{padding:12px 16px;font:500 12px/1.6 'IBM Plex Sans KR',sans-serif;color:#50848B;border-left:5px solid #5FD3BC}
.dz-grp{padding:12px 16px}
.dz-gh{display:flex;align-items:center;justify-content:space-between;padding-bottom:8px;border-bottom:1.5px dashed #DFF3F5}
.dz-gh b{font:800 14px 'IBM Plex Sans KR',sans-serif;color:#22444F}
.dz-gh span{font:700 10px 'IBM Plex Sans KR',sans-serif;color:#31ACBD;background:#F0FBFC;padding:3px 9px;border-radius:99px}
.dz-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.dz-chips i{font-style:normal;font:600 11px 'IBM Plex Sans KR',sans-serif;color:#2A96A5;background:#F3FCFD;border:1.5px solid #DFF3F5;padding:4px 11px;border-radius:99px}
.dz-tagrow{display:flex;align-items:center;justify-content:space-between}
.dz-tag{display:inline-flex;align-items:center;gap:6px;height:24px;padding:0 11px;border-radius:99px;background:#EAF7F3;border:1.5px solid #CFEDE5;font:800 10px 'Barlow Condensed',sans-serif;letter-spacing:.14em;color:#2A96A5}
.dz-tag i{width:7px;height:7px;border-radius:50%;background:#34C79D;animation:tr-blink 1.6s infinite}
.dz-tagrow small{font:700 10px 'Barlow Condensed',sans-serif;letter-spacing:.12em;color:#54AFBB}
.dz-banner{position:relative;display:block;height:132px;border-radius:14px;overflow:hidden;border:1.5px solid #D3EFF3;box-shadow:0 8px 18px -10px rgba(49,172,189,.35);animation:cx-rise .45s .08s both;transition:transform .25s ease}
.dz-banner:hover{transform:translateY(-2px)}
.dz-banner .ph{position:absolute;inset:0;background:linear-gradient(135deg,#DFF5F8,#A6EEF8 55%,#7FE3D2)!important}
.dz-banner .ph::after{display:none}
.dz-banner .ph-ic{color:#fff}
.dz-open{position:absolute;right:10px;top:10px;height:22px;padding:0 10px;border-radius:99px;background:#fff;border:1.5px solid #D3EFF3;font:800 9px 'Barlow Condensed',sans-serif;letter-spacing:.14em;color:#2A96A5;display:flex;align-items:center}
.dz-banner > i{position:absolute;width:8px;height:8px;border-radius:50%;background:#fff;border:1.5px solid #A2DCE4}
.dz-banner .c1{left:6px;top:6px}.dz-banner .c2{right:6px;bottom:6px}.dz-banner .c3{left:6px;bottom:6px}.dz-banner .c4{right:6px;top:6px;display:none}
.dz-crew{background:rgba(255,255,255,.6);border:1.5px solid #DFF3F5;border-radius:16px;padding:12px;background-image:radial-gradient(rgba(103,218,233,.25) 1px,transparent 1.4px);background-size:12px 12px}
.dz-ch{display:flex;justify-content:space-between;align-items:center;padding:0 4px 10px;border-bottom:1.5px dashed #D3EFF3;margin-bottom:10px}
.dz-ch b{font:800 11px 'Barlow Condensed',sans-serif;letter-spacing:.16em;color:#54AFBB}
.dz-ch span{font:700 11px 'IBM Plex Sans KR',sans-serif;color:#2A96A5}
.dz-cg{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.dz-cc{display:block;background:#fff;border:1.5px solid #D3EFF3;border-radius:12px;overflow:hidden;color:inherit;text-decoration:none;animation:cx-rise .4s both;transition:transform .2s ease,box-shadow .2s ease}
.dz-cc:hover{transform:translateY(-3px);box-shadow:0 10px 18px -8px rgba(49,172,189,.35)}
.dz-cct{display:flex;justify-content:space-between;align-items:center;padding:5px 9px;background:linear-gradient(90deg,#57D2E3,#79DFED)}
.dz-cct b{font:800 11px 'IBM Plex Sans KR',sans-serif;color:#fff}
.dz-cct i{font:italic 800 9px 'Barlow Condensed',sans-serif;color:#fff}
.dz-cc .ph{height:58px;margin:6px 6px 0;border-radius:6px;background:linear-gradient(135deg,#ECF8F9,#D3EFF3)!important}
.dz-cc .ph::after{display:none}
.dz-cc .ph-ic{color:#A2DCE4}
.dz-ccf{display:flex;align-items:center;gap:5px;padding:6px 8px}
.dz-ccf small{font:600 8.5px 'IBM Plex Sans KR',sans-serif;color:#84B6BD}
.dz-ccf b{font:800 11.5px 'IBM Plex Sans KR',sans-serif;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dz-ccf span{font:600 9px 'IBM Plex Sans KR',sans-serif;color:#84B6BD}
.dz-heart{width:24px;height:24px;border-radius:50%;border:1.5px dashed #79DFED;background:#fff;color:#57D2E3;display:grid;place-items:center;flex:none;transition:transform .2s ease}
.dz-heart svg{width:11px;height:11px}
.dz-heart.on{background:#57D2E3;color:#fff;border-style:solid;animation:cx-pop .35s both}
@media (max-width:720px),(max-aspect-ratio:4/5) and (max-width:1100px),(max-height:599px){.win.dzwin{border-radius:0!important}.dz-num{font-size:52px}}
/* ---------- 입장 화면 · 반짝이 × 크리스탈 눈금 (Entry3 시안) ---------- */
@keyframes en-float{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-10px) rotate(-1deg)}}
@keyframes en-sw{from{transform:rotate(-10deg)}to{transform:rotate(10deg)}}
@keyframes en-tw{0%,100%{opacity:.25;transform:scale(.7)}50%{opacity:1;transform:scale(1)}}
@keyframes en-blink{0%,100%{opacity:1}50%{opacity:.3}}
@keyframes en-pulse{0%,100%{transform:scale(.92)}50%{transform:scale(1.06)}}
@keyframes en-burst{0%{transform:translateY(0) scale(.2);opacity:0}18%{opacity:1}70%{opacity:1}100%{transform:translateY(-280px) scale(1.1) rotate(40deg);opacity:0}}
@keyframes en-ring{0%{transform:scale(.6);opacity:1}100%{transform:scale(4.4);opacity:0}}
@keyframes en-bob{0%,100%{translate:0 0}50%{translate:0 -9px}}
#intro.en2{background:#EFF8F9!important;background-image:none!important;font-family:'IBM Plex Sans KR','Pretendard',sans-serif;color:#123B48;overflow:hidden}
#intro.en2.out{opacity:0;pointer-events:none;transition:opacity 1s ease!important}
.en-bg{position:absolute;inset:0;pointer-events:none}
.en-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(18,59,72,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(18,59,72,.05) 1px,transparent 1px);background-size:40px 40px}
.en-b1{position:absolute;right:-160px;top:-220px;width:760px;height:640px;border-radius:50%;background:#BDEFF2;opacity:.5;filter:blur(100px)}
.en-b2{position:absolute;left:-200px;bottom:-240px;width:760px;height:600px;border-radius:50%;background:#C9F2EA;opacity:.45;filter:blur(100px)}
.en-head{position:absolute;left:24px;right:24px;top:0;height:52px;z-index:6;display:flex;align-items:center;border-bottom:1px solid #CFE6EA}
.en-logo{display:flex;align-items:center;gap:8px}
.en-logo i{width:22px;height:22px;border-radius:50%;background:#1FA8B8;display:grid;place-items:center;color:#fff}
.en-logo i svg{width:11px;height:11px;fill:#fff;stroke:none}
.en-logo b{font:400 14px 'Archivo Black',sans-serif;letter-spacing:-.01em;color:#123B48}
.en-logo small{font:400 9.5px 'DM Mono',monospace;color:#7C979E}
.en-hr{margin-left:auto;display:flex;align-items:center;gap:18px;font:400 10.5px 'Archivo Black',sans-serif;color:#123B48}
.en-room{display:flex;align-items:center;gap:6px}
.en-room em{font-style:normal;color:#7C979E}
.en-dot{width:7px;height:7px;border-radius:50%;background:#A8C9CE;animation:en-blink 1.6s infinite}
#intro.ready .en-dot{background:#1FA8B8}
.en-clock{color:#7C979E}
.en-stage{position:absolute;left:calc(50% - 720px);top:calc(50% - 450px);width:1440px;height:900px;transition:opacity .5s}
html.fonts-wait .en-stage{opacity:0}
.en-halo{position:absolute;left:270px;top:90px;width:660px;height:660px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.9) 0%,rgba(255,255,255,0) 65%);pointer-events:none}
.en-spark svg{position:absolute;animation:en-tw 3s ease-in-out infinite;filter:drop-shadow(0 0 4px rgba(143,228,236,.9))}
.en-glow{position:absolute;left:520px;top:200px;width:400px;height:400px;border-radius:50%;z-index:1;background:radial-gradient(circle,rgba(143,228,236,.55) 0%,rgba(143,228,236,0) 65%);opacity:0;transition:opacity .6s;animation:en-pulse 2.2s ease-in-out infinite;pointer-events:none}
#intro.ready:not(.leaving) .en-glow{opacity:1}
.en-deco{position:absolute;inset:0;z-index:1;pointer-events:none;transition:opacity .7s ease}
.en-deco > div{position:absolute;animation:en-bob 4s ease-in-out infinite}
.en-deco svg{display:block}
.en-deco .tw{animation:en-tw 3.2s ease-in-out infinite}
.en-deco .sh,.en-bits .sh{filter:drop-shadow(0 2px 3px rgba(18,59,72,.18))}
.en-bub{display:block;border-radius:50%;background:radial-gradient(circle at 32% 30%,#fff 0 22%,rgba(143,228,236,.9) 58%,rgba(94,214,200,.75));box-shadow:0 2px 5px rgba(18,59,72,.15)}
#intro.leaving .en-deco{opacity:0}
.en-lockbox{position:absolute;left:380px;top:76px;width:420px;height:460px;transform:scale(1.62);transform-origin:0 0;z-index:2;pointer-events:none}
.en-lockfloat{position:absolute;inset:0;animation:en-float 5s ease-in-out infinite;transform-origin:210px 0}
#intro.leaving .en-lockfloat{animation:none}
.en-lockfloat > div,.en-leaf{position:absolute;inset:0;transform-origin:210px 200px}
.en-lockfloat svg{position:absolute;left:0;top:0;overflow:visible}
.en-pend{transform-origin:210px 324px;animation:en-sw 2.6s ease-in-out infinite alternate}
.en-wing{transition:opacity .6s ease}
.en-leaf{transition:opacity 1s ease-in .2s}
.en-med{transition:opacity .25s ease}
#intro.leaving .en-wing,#intro.leaving .en-leaf,#intro.leaving .en-med{opacity:0}
.en-burst{inset:auto!important;left:120px!important;top:110px!important;width:180px;height:180px;border-radius:50%;background:radial-gradient(circle,#fff 0%,rgba(255,255,255,.95) 35%,rgba(230,248,249,.6) 55%,rgba(230,248,249,0) 70%);transform:scale(.3);opacity:0;transition:transform 1.4s cubic-bezier(.3,.1,.3,1),opacity .5s ease-out;transform-origin:50% 50%!important}
#intro.leaving .en-burst{transform:scale(14);opacity:1}
.en-fx{position:absolute;inset:0;z-index:3;pointer-events:none}
.en-ring{position:absolute;left:660px;top:340px;width:120px;height:120px;box-sizing:border-box;border-radius:50%;border:2px solid rgba(255,255,255,.95);box-shadow:0 0 18px rgba(143,228,236,.8);opacity:0}
#intro.leaving .en-ring{animation:en-ring 1.3s cubic-bezier(.2,.7,.3,1) forwards}
.en-bits > div{position:absolute;left:720px;top:400px;width:0;height:0}
.en-bits span{position:absolute;left:-8px;top:-8px;opacity:0;display:block}
.en-bits span svg{display:block}
.en-bits .tw{animation:en-tw 3.2s ease-in-out infinite}
#intro.leaving .en-bits > div > span{animation-name:en-burst;animation-timing-function:cubic-bezier(.2,.7,.3,1);animation-fill-mode:forwards}
.en-hit{position:absolute;left:510px;top:170px;width:420px;height:470px;z-index:6;border:0;padding:0;background:transparent;border-radius:50%;cursor:default}
.en-hit:not([disabled]){cursor:pointer}
.en-load{position:absolute;left:480px;top:790px;width:480px;z-index:3;transition:opacity .6s}
#intro.leaving .en-load{opacity:0}
.en-lt{display:flex;justify-content:space-between;align-items:baseline;font:400 11px 'Archivo Black',sans-serif;letter-spacing:.06em;color:#123B48}
.en-pct{color:#1FA8B8}
.en-bar{position:relative;margin-top:10px;height:8px;border-radius:99px;background:#DCEFF1;box-shadow:inset 0 1px 2px rgba(18,59,72,.08)}
.en-bar i{position:absolute;left:0;top:0;bottom:0;width:0;border-radius:99px;background:linear-gradient(90deg,#8FDCE3,#1FA8B8)}
.en-ms{margin-top:14px;display:flex;gap:8px}
.en-ms span{flex:1;display:flex;justify-content:center}
.en-ms svg{overflow:visible;transform:scale(.85);transition:transform .35s cubic-bezier(.3,1.6,.5,1)}
.en-ms .cr{fill:#fff;transition:fill .3s}
.en-ms span.on svg{transform:scale(1.15)}
.en-ms span.on .cr{fill:#5ED6C8}
@media (max-width:720px),(max-aspect-ratio:4/5) and (max-width:1100px),(max-height:599px){
  .en-head{left:16px;right:16px}
  .en-hr .en-clock{display:none}
  .en-stage{left:50%;top:50%;width:1440px;height:900px;transform:translate(-50%,-50%) scale(var(--enS,.66));transform-origin:50% 50%}
  .en-load{left:520px;width:400px;top:740px}
  .en-lt{font-size:12px}
}
/* =========================================================
   메인 홈 · 새틴 880 (UNRELEASED) 시안
   ========================================================= */
.o-dot{display:block;width:100%;height:100%;border-radius:50%;background:radial-gradient(circle at 32% 30%,#fff 0 20%,rgba(165,230,239,.85) 55%,rgba(121,223,237,.65));box-shadow:0 2px 4px rgba(49,172,189,.15)}
@keyframes e-eq{from{transform:scaleY(.3)}to{transform:scaleY(1)}}
@keyframes e-blink{0%,100%{opacity:1}50%{opacity:.3}}
@media (min-width:721px) and (min-aspect-ratio:4/5) and (min-height:600px),(min-width:1101px) and (min-height:600px){
#desk{--sa:'Archivo Black','Big Shoulders Display',sans-serif;--sm:'DM Mono',monospace;background-color:#EFF8F9!important;background-image:linear-gradient(rgba(18,59,72,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(18,59,72,.055) 1px,transparent 1px)!important;background-size:40px 40px!important;color:#123B48}
.stage::before{left:auto!important;right:-160px;top:-272px!important;width:620px!important;height:560px!important;background:#BDEFF2!important;opacity:.35!important;filter:blur(90px)!important}
.stage::after{left:-200px!important;bottom:-272px!important;top:auto!important;width:640px!important;height:520px!important;background:#C9F2EA!important;opacity:.3!important;filter:blur(90px)!important}
.st-cross{position:absolute;width:14px;height:14px;z-index:7;pointer-events:none;background:linear-gradient(#7C979E,#7C979E) 6px 0/1.5px 14px no-repeat,linear-gradient(#7C979E,#7C979E) 0 6px/14px 1.5px no-repeat}
.st-cross.tl{left:10px;top:10px}.st-cross.tr{right:10px;top:10px}.st-cross.bl{left:10px;bottom:10px}.st-cross.br{right:10px;bottom:10px}
/* 위 바 */
.topbar{left:calc(24px + var(--ox,0px))!important;right:calc(24px + var(--ox,0px))!important;top:0!important;height:52px!important;border-radius:0!important;padding:0!important;gap:34px!important;background:transparent!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;border:0!important;box-shadow:none!important}
.logo-dark{height:auto!important;padding:0!important;border:0!important;border-radius:0!important;background:none!important;box-shadow:none!important;gap:8px!important;overflow:visible}
.logo-dark::after{display:none!important}
.logo-dark .logo-ic{width:22px!important;height:22px!important;border-radius:50%!important;background:#1FA8B8!important;color:#fff!important}
.logo-dark .logo-ic svg{width:11px!important;height:11px!important;fill:#fff!important;stroke:none!important}
.logo-dark > div{display:flex!important;flex-direction:row!important;align-items:center;gap:8px}
.logo-dark b{font:400 14px/1 var(--sa)!important;letter-spacing:-.01em!important;color:#123B48!important}
.logo-dark small{font:400 9.5px/1 var(--sm)!important;letter-spacing:0!important;color:#7C979E!important;margin:0!important;text-transform:none}
.topnav{gap:26px!important}
.topnav button{position:relative;height:auto!important;padding:6px 2px!important;border:0!important;border-radius:0!important;background:none!important;box-shadow:none!important;font:400 11px var(--sa)!important;letter-spacing:.04em!important;color:#7C979E!important}
.topnav button svg{display:none!important}
.topnav button[data-nav=home]{padding:6px 2px!important;background:none!important;color:#123B48!important;box-shadow:none!important}
.topnav button[data-nav=home]::before{display:none!important}
.topnav button[data-nav=home]::after{content:'';position:absolute;left:0;right:0;bottom:0;height:3px;border-radius:2px;background:#1FA8B8}
.topnav button:hover{color:#123B48!important}
.top-r{gap:18px!important;font:400 10.5px var(--sa)!important;letter-spacing:0!important;color:#123B48!important}
.top-r .pill{height:auto!important;padding:0!important;border:0!important;background:none!important;gap:6px!important;font:400 10.5px var(--sa)!important;letter-spacing:0!important;color:#7C979E!important}
.top-r .pill b{font-weight:400!important;color:#123B48!important}
.top-r .pill .led{width:7px!important;height:7px!important;background:#5ED6C8!important;box-shadow:none!important;animation:e-blink 1.6s infinite}
.top-r .clock{font:400 10.5px var(--sa)!important;letter-spacing:0!important;color:#7C979E!important}
.top-r .sq{width:28px!important;height:28px!important;border-radius:50%!important;background:none!important;border:1px solid #CFE6EA!important;color:#123B48!important}
.top-r .sq svg{width:12px!important;height:12px!important;stroke-width:2}
/* 아래 바 */
.taskbar{left:calc(24px + var(--ox,0px))!important;right:calc(24px + var(--ox,0px))!important;bottom:0!important;height:52px!important;border-radius:0!important;padding:0!important;gap:14px!important;background:transparent!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;border:0!important;border-top:1px solid #CFE6EA!important;box-shadow:none!important}
.taskbar .start{display:none!important}
.tb-r{display:contents!important}
.mini{order:0;height:auto!important;min-width:0!important;padding:0!important;border:0!important;background:none!important;box-shadow:none!important;gap:14px!important;display:flex!important;align-items:center}
.mini-cover{display:none!important}
.mini-play{order:-1;width:28px!important;height:28px!important;border-radius:50%!important;background:#1FA8B8!important;border:0!important;box-shadow:none!important;color:#fff!important}
.mini-play svg{width:11px!important;height:11px!important;fill:#fff}
.mini-play::after{display:none!important}
.mini-t{display:flex!important;flex-direction:row!important;align-items:center;gap:6px}
.mini-t small{display:none!important}
.mini-t b{font:400 11px var(--sa)!important;letter-spacing:0!important;color:#123B48!important;text-transform:uppercase}
.mini-t b::after{content:' — 月とナイフ';color:#7C979E}
.mini-eq{display:flex!important;gap:2px;height:13px;align-items:flex-end;width:auto!important}
.mini-eq i{display:block!important;width:3px!important;height:100%!important;background:#1FA8B8!important;border-radius:0!important;transform-origin:bottom;animation:e-eq .5s ease-in-out infinite alternate!important;margin:0!important}
.mini-eq i:nth-child(2){animation-duration:.65s!important;animation-delay:.1s!important}
.mini-eq i:nth-child(3){animation-duration:.8s!important;animation-delay:.2s!important}
.tasks{order:1;gap:8px!important;margin:0!important}
.task{height:26px!important;padding:0 11px!important;border-radius:99px!important;background:#fff!important;border:1px solid #CFE6EA!important;box-shadow:none!important;color:#123B48!important;font:400 10px var(--sa)!important;letter-spacing:0!important}
.task::before{background:#5ED6C8!important}
.tb-r > .sq{display:none!important}
.st-dd{order:2;margin-left:auto;height:26px;padding:0 12px;border-radius:99px;background:#1FA8B8;color:#fff;font:400 10.5px var(--sa);display:flex;align-items:center;gap:6px;border:0;cursor:pointer}
.credit{order:3;display:flex!important;flex-direction:row!important;align-items:center;gap:0;text-align:left;margin:0!important}
.credit small,.credit b{font:400 10.5px var(--sa)!important;letter-spacing:0!important;color:#7C979E!important;background:none!important;-webkit-text-fill-color:#7C979E!important}
.credit b::before{content:' · '}
/* 큰 글씨 */
.stage{top:52px!important;bottom:52px!important}
.stage .leftcol{left:calc(24px + var(--ox,0px))!important;top:var(--lct,14px)!important;width:var(--lw,880px)!important;height:var(--lh,766px)!important;scale:var(--lcs,1);transform-origin:0 0!important}
.stage .leftcol .hz.ltop{left:0!important;top:0!important;width:var(--lw,880px)!important;height:224px!important;scale:1!important}
.h-otr{width:var(--lw,880px)!important;height:224px!important}
.ho-kick,.ho-np,.ho-npb-row{display:none!important}
.ho-title{position:absolute!important;left:0!important;top:0!important;width:var(--lw,880px)!important;height:224px!important}
.st-big{position:absolute;left:7px;top:calc(65.4px + var(--tdy,0px));font:400 110px var(--sa);transform:scale(var(--tsx,1),calc(1.76 * var(--tsy,1)));transform-origin:0 50%;line-height:.93;letter-spacing:-.04em;white-space:nowrap}
.st-big span{background:linear-gradient(180deg,#1B4D5C 0%,#123B48 60%,#0E3340 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.st-big i{font-style:normal;color:#1FA8B8;-webkit-text-fill-color:#1FA8B8}
/* 아이콘 창 8×4 */
.stage .leftcol .apps-panel{left:0!important;top:var(--apt,274px)!important;width:var(--apw,var(--lw,880px))!important;height:var(--aph,492px)!important;padding:var(--pv,30px) 18px var(--pv,30px)!important;border-radius:0 16px 16px 16px!important}
.panel-tab svg{color:#1FA8B8!important;stroke:#1FA8B8!important}
.panel-tab span{font:400 15px var(--sa)!important;letter-spacing:-.01em!important;background:none!important;-webkit-background-clip:border-box!important;background-clip:border-box!important;color:#123B48!important}
.stage .leftcol .apps{grid-template-columns:repeat(8,minmax(0,1fr))!important;gap:min(var(--rg,32px),14px) 6px!important;height:100%!important;align-content:space-between!important}
.apps .app-tile{font:400 calc(10.5px * var(--ts,1)) var(--sa)!important;letter-spacing:-.005em!important;color:#123B48!important;gap:6px!important;white-space:nowrap}
.apps .app-ic.tilebox{width:calc(67px * var(--ts,1))!important;height:calc(67px * var(--ts,1))!important;border-radius:calc(12px * var(--ts,1))!important}
.apps .app-ic.tilebox svg{width:calc(25px * var(--ts,1))!important;height:calc(25px * var(--ts,1))!important}
.apps .app-ic.tilebox.os0{background:linear-gradient(180deg,#FFFFFF,#F4FAFB)!important;color:#123B48!important;border:1px solid #D6ECEE!important;box-shadow:inset 0 1px 0 #fff,0 4px 10px rgba(18,59,72,.07)!important}
.apps .app-ic.tilebox.os1{background:linear-gradient(180deg,#38C2CF 0%,#1B9CAB 100%)!important;color:#fff!important;border:0!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.2),0 6px 14px rgba(31,168,184,.2)!important}
.apps .app-ic.tilebox.os2{background:linear-gradient(180deg,#215666 0%,#0F3542 100%)!important;color:#fff!important;border:0!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 6px 14px rgba(18,59,72,.2)!important}
.apps .app-ic.tilebox.os3{background:linear-gradient(180deg,#E8F7F8 0%,#D2EFF0 100%)!important;color:#168F9E!important;border:0!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.7)!important}
.apps .app-ic.tilebox.os4{background:linear-gradient(180deg,#F5FBFB,#EBF5F6)!important;color:#123B48!important;border:1px solid #DCEEF0!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.7)!important}
.apps .app-ic .badge{background:#FF5A6E!important;box-shadow:0 0 0 2px #fff!important;font:400 9px var(--sa)!important}
/* 가운데 열쇠 */
.stage .keysec{left:var(--kx,916px)!important;top:var(--ktop,47px)!important;width:300px!important;height:768px!important;transform:scale(var(--s2,1))!important;transform-origin:0 0!important;perspective:1400px}
.stage .ks-3d{left:0!important;top:0!important;width:488px!important;height:768px!important;transform:translateX(0) scale(.53)!important;transform-origin:0 350px!important}
.stage .ks-dust,.stage .ks-shadow,.ks-mq{display:none!important}
.ks-ell{position:absolute;left:4px;top:312px;width:198px;height:77px;border-radius:50%;border:1px solid rgba(18,59,72,.3);pointer-events:none}
.ks-ell.a{transform:rotate(-8deg)}.ks-ell.b{transform:rotate(24deg)}
/* 오른쪽 출입증 */
.win.passwin{border-radius:22px!important;background:linear-gradient(180deg,#FFFFFF,#F4FAFB)!important;border:1px solid #D6ECEE!important;box-shadow:inset 0 1px 0 #fff,0 10px 24px rgba(18,59,72,.07)!important}
.win.passwin > .win-h::before{background:#EFF8F9!important;box-shadow:inset 0 0 0 1.4px #CFE6EA!important}
.passwin .pass-top span,.passwin .pass-top span .pcnt{font:400 11px var(--sa)!important;letter-spacing:.02em!important;color:#1FA8B8!important}
.passwin .pass-top strong{font:400 21px/1.05 var(--sa)!important;letter-spacing:-.02em!important;color:#123B48!important}
.passwin .pass-img{box-shadow:none!important}
.passwin .pass-img .face.front .ph,.passwin .pass-img .face.front > div:first-child{background:linear-gradient(rgba(255,255,255,.12),rgba(255,255,255,0) 40%),linear-gradient(180deg,#38C2CF,#18949F)!important}
.passwin .pass-img .face.front::before{display:none}
.passwin .pass-meta > div{background:#fff!important;border:1.4px solid #CFE6EA!important}
.passwin .pass-meta b,.passwin .pass-meta .st-chip{font:400 9.5px var(--sa)!important;letter-spacing:.01em!important;color:#123B48!important}
.passwin .ot-dbox{background:transparent!important;border:0!important;padding:6px 2px 4px!important}
.passwin .together small{font:400 9px var(--sm)!important;color:#7C979E!important}
.passwin .together b{font:400 48px/.95 var(--sa)!important;letter-spacing:-.04em!important;background:none!important;-webkit-background-clip:border-box!important;background-clip:border-box!important;color:#1FA8B8!important;-webkit-text-fill-color:#1FA8B8;filter:none!important}
.passwin .nextrow{font:400 12.5px var(--sa)!important;color:#123B48!important}
.passwin .nextrow span{color:#1FA8B8!important}
.passwin .pbar{height:6px!important;background:#CFE6EA!important;border:0!important;padding:0!important}
.passwin .pbar i{background:#1FA8B8!important}
.passwin .pbar i::after{display:none}
.passwin .nextsub{color:#7C979E!important}
.passwin .pass-perf{background:linear-gradient(90deg,#CFE6EA,#CFE6EA) 0 50%/100% 1.5px no-repeat!important}
.passwin .barcode svg,.passwin .barcode svg rect{fill:#123B48!important;color:#123B48}
.passwin .barcode span{font:400 11px var(--sa)!important;letter-spacing:.02em!important;color:#123B48!important}
}
/* 휴대폰 : 큰 글씨만 새 시안으로 */
@media (max-width:720px),(max-aspect-ratio:4/5) and (max-width:1100px),(max-height:599px){
  .ho-title{width:880px!important;height:250px!important;margin-bottom:10px!important}
  .st-big{position:absolute;left:7px;top:65.4px;font:900 110px 'Pretendard',sans-serif;transform:scaleY(1.76)!important;transform-origin:0 50%;line-height:.93;letter-spacing:-.04em;white-space:nowrap}
  .st-big span{background:linear-gradient(180deg,#1B4D5C,#123B48 60%,#0E3340);-webkit-background-clip:text;background-clip:text;color:transparent}
  .st-big i{font-style:normal;color:#1FA8B8;-webkit-text-fill-color:#1FA8B8}
  .st-big .tcap-w{color:#123B48;-webkit-text-fill-color:#123B48}
  .ks-ell,.st-cross,.st-dd{display:none!important}
}
.stn{position:absolute;display:block;opacity:.85;animation:stn-f 6s ease-in-out infinite;filter:drop-shadow(0 2px 3px rgba(49,172,189,.18))}
.stn svg{display:block;width:100%;height:100%}
@keyframes stn-f{0%,100%{transform:translateY(0) rotate(-8deg)}50%{transform:translateY(-7px) rotate(8deg)}}

/* ---------- OOC · 프롬프트 보관함 창 ---------- */
.win.rmwin{background:#fff!important;background-image:linear-gradient(rgba(30,70,55,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(30,70,55,.06) 1px,transparent 1px)!important;background-size:44px 44px!important;overflow:hidden!important}
.win.rmwin::before{display:none!important}
.win.rmwin,.win.rmwin .win-b{overflow:clip!important}
.win.rmwin .rm::before{content:'';position:absolute;right:-120px;top:-140px;width:360px;height:360px;border-radius:50%;background:radial-gradient(#DCEFE6,transparent 70%);pointer-events:none;z-index:-1}
.rm{position:relative;z-index:1;height:100%;display:flex;flex-direction:column;padding:16px 16px 18px;box-sizing:border-box;color:#1E2A27;font-family:'IBM Plex Sans KR',sans-serif;--g1:#7FD6B2;--g2:#3FAE84;--g3:#5CC79A;--ln:#D6E9E0;--ink:#1E2A27;--mut:#4A6B60;--soft:linear-gradient(180deg,#ECF8F2 0%,#D8EFE4 100%)}
.rm *{box-sizing:border-box}
.rm-tabrow{display:flex;align-items:flex-end;height:40px;cursor:grab;flex:none}
.rm-tab{position:relative;z-index:2;height:40px;padding:0 20px 0 16px;border-radius:18px 18px 0 0;background:rgba(255,255,255,.96);border:1.5px solid var(--ln);border-bottom:0;display:flex;align-items:center;gap:7px;font:400 10px 'Archivo Black',sans-serif;letter-spacing:.04em;color:var(--g2)}
.rm-tab small{font:400 8.5px 'DM Mono',monospace;letter-spacing:.16em;color:#8A9894}
.rm-ki svg{display:block;width:15px;height:15px;stroke-width:2.2}
.rm-pill{margin:0 0 6px auto;height:24px;padding:0 10px;border-radius:99px;background:#fff;border:1.5px solid var(--ln);display:inline-flex;align-items:center;font:400 8.5px 'Archivo Black',sans-serif;letter-spacing:.04em;color:var(--g2)}
.rm-card{position:relative;flex:1;min-height:0;margin-top:-1.5px;border-radius:0 24px 24px 24px;background:linear-gradient(180deg,#fff,#F3FAF6);border:1.5px solid var(--ln);box-shadow:0 18px 40px rgba(30,70,55,.12),inset 0 1px 0 #fff;overflow:visible}
.rm-scroll{position:absolute;inset:0;overflow-x:hidden;overflow-y:auto;padding:18px 18px 20px;border-radius:inherit;scrollbar-width:thin}
.rm-wm{position:absolute;right:26px;bottom:60px;opacity:.07;transform:rotate(-30deg);color:var(--g2);pointer-events:none}
.rm-wm svg{width:180px;height:180px;stroke-width:1.2}
.rm-charm{position:absolute;right:-13px;top:96px;z-index:4;display:flex;flex-direction:column;align-items:center;transform-origin:50% 4px;animation:rm-sway 3.6s ease-in-out infinite alternate;pointer-events:none}
.rm-charm .rg{width:16px;height:16px;border-radius:50%;border:3px solid #A6E3C9}
.rm-charm .ln{width:2px;height:6px;margin-top:-2px;background:#A6E3C9}
.rm-ck{display:block;width:40px;height:78px;margin-top:-6px;filter:drop-shadow(0 6px 8px rgba(30,70,55,.25))}
.rm-ck svg{width:100%;height:100%}
@keyframes rm-sway{from{transform:rotate(-3deg)}to{transform:rotate(3deg)}}
@keyframes rm-orb{to{transform:rotate(360deg)}}
@keyframes rm-tw{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}
@keyframes rm-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.rm-head{position:relative;display:flex;align-items:center;gap:22px}
.rm-num{position:relative;flex:none}
.rm-num > span{display:inline-block;font:400 46px/.9 'Archivo Black',sans-serif;letter-spacing:-.03em;transform:scaleY(1.45);transform-origin:0 100%;background:linear-gradient(180deg,#5CC79A,#3FAE84);-webkit-background-clip:text;background-clip:text;color:transparent}
.rm-orb{position:absolute;left:-22px;top:50%;width:120px;height:120px;margin-top:-60px;transform:rotate(-16deg) scaleY(.34);pointer-events:none;border-radius:50%;border:1.5px solid rgba(30,70,55,.25)}
.rm-orb > div{position:absolute;inset:0;animation:rm-orb 9s linear infinite}
.rm-orb i{position:absolute;left:50%;border-radius:50%}
.rm-orb i:first-child{top:-5px;width:10px;height:10px;margin-left:-5px;background:#5CC79A;box-shadow:0 0 0 3px rgba(92,199,154,.2)}
.rm-orb i:last-child{bottom:-4px;width:8px;height:8px;margin-left:-4px;background:#A6E3C9}
.rm-num em{position:absolute;display:flex;animation:rm-tw 2.4s infinite}
.rm-num em svg{width:13px;height:13px}
.rm-num .s1{right:-6px;top:-8px;color:#5CC79A}
.rm-num .s2{left:-10px;bottom:-4px;color:#A6E3C9;animation-duration:3s;animation-delay:.8s}
.rm-num .s2 svg{width:9px;height:9px}
.rm-tt{flex:1;min-width:0}
.rm-tt b{display:inline-block;font:400 29px/.9 'Archivo Black',sans-serif;letter-spacing:-.03em;color:var(--ink);transform:scaleY(1.45);transform-origin:0 100%}
.rm-tt small{display:block;margin-top:5px;font:400 10px 'Archivo Black',sans-serif;letter-spacing:.04em;color:var(--g2)}
.rm-x{flex:none;width:40px;height:40px;border-radius:50%;border:0;background:linear-gradient(180deg,#7FD6B2,#3FAE84);box-shadow:0 6px 14px rgba(63,174,132,.25),inset 0 1px 0 rgba(255,255,255,.25);color:#fff;display:grid;place-items:center;cursor:pointer}
.rm-x svg{width:16px;height:16px}
.rm-div{margin:16px 0;height:16px;display:flex;align-items:center;gap:9px}
.rm-div i{flex:1;height:1.5px;background:linear-gradient(90deg,var(--ln),#C7EBDA)}
.rm-div i.r{flex:none;width:64px;background:linear-gradient(90deg,#C7EBDA,transparent)}
.rm-div em{display:flex}
.rm-div em svg{width:11px;height:11px}
.rm-div .t1{color:#A6E3C9;animation:rm-tw 2.2s infinite}
.rm-div .t2{color:#5CC79A;animation:rm-tw 2.2s 1.1s infinite}
.rm-div .mo{color:var(--g2)}
.rm-div .mo svg{width:14px;height:14px}
.rm-hint{display:flex;align-items:center;gap:7px;margin-bottom:12px;font-size:12.5px;color:var(--mut)}
.rm-hint em{display:flex;color:var(--g2)}
.rm-hint em svg{width:12px;height:12px}
.rm-hint b{font-weight:700;color:var(--g2)}
.rm-panel{border-radius:20px;background:rgba(255,255,255,.8);border:1.5px solid var(--ln);box-shadow:0 10px 26px rgba(30,70,55,.08),inset 0 1px 0 #fff;padding:14px}
.rm-chips{display:flex;flex-wrap:wrap;gap:7px}
.rm-chip{position:relative;height:34px;padding:0 10px 0 24px;border-radius:9px 99px 99px 9px;border:1.5px solid var(--ln);background:rgba(255,255,255,.95);color:var(--g2);box-shadow:0 2px 6px rgba(30,70,55,.06);display:inline-flex;align-items:center;gap:6px;font:700 12.5px 'IBM Plex Sans KR',sans-serif;cursor:pointer;transition:.2s}
.rm-chip > i{position:absolute;left:8px;top:50%;width:7px;height:7px;translate:0 -50%;border-radius:50%;background:#fff;box-shadow:inset 0 1px 2px rgba(30,70,55,.4)}
.rm-chip em{min-width:18px;height:18px;padding:0 5px;border-radius:99px;display:inline-flex;align-items:center;justify-content:center;font:400 8px 'Archivo Black',sans-serif;font-style:normal;background:#ECF8F2;color:var(--mut)}
.rm-chip.on{background:linear-gradient(180deg,#7FD6B2,#3FAE84);color:#fff;border-color:transparent;box-shadow:0 6px 14px rgba(30,70,55,.2),inset 0 1px 0 rgba(255,255,255,.25)}
.rm-chip.on em{background:rgba(255,255,255,.3);color:#fff}
.rm-sh{margin:16px 2px 9px;display:flex;align-items:center;gap:9px}
.rm-sh > b{font:400 15px/1 'Archivo Black',sans-serif;background:linear-gradient(180deg,#5CC79A,#3FAE84);-webkit-background-clip:text;background-clip:text;color:transparent}
.rm-sh > span{font-weight:700;font-size:15px;color:var(--ink)}
.rm-sh > i{flex:1;height:1.5px;background:linear-gradient(90deg,var(--ln),transparent)}
.rm-sh small{font:400 9px 'DM Mono',monospace;letter-spacing:.16em;color:#8A9894}
.rm-list{display:flex;flex-direction:column;gap:9px}
.rm-item{position:relative;border-radius:15px;background:#fff;border:1.5px solid #E4F2EB;box-shadow:0 6px 14px rgba(30,70,55,.06);padding:13px 14px 11px;animation:rm-in .35s ease both}
.rm-tick{position:absolute;left:14px;top:-1.5px;width:30px;height:4px;border-radius:0 0 4px 4px;background:linear-gradient(180deg,#7FD6B2,#3FAE84)}
.rm-item p{margin:0;font-size:14px;line-height:1.6;color:var(--ink);user-select:all}
.rm-if{margin-top:9px;display:flex;align-items:center;justify-content:space-between}
.rm-if small{font:400 9.5px 'DM Mono',monospace;color:var(--g2)}
.rm-copy{flex:none;height:28px;padding:0 11px;border-radius:99px;border:1.5px solid var(--ln);background:rgba(255,255,255,.95);color:var(--g2);box-shadow:0 2px 6px rgba(30,70,55,.06);display:inline-flex;align-items:center;gap:5px;font:400 9px 'Archivo Black',sans-serif;letter-spacing:.04em;cursor:pointer;transition:.2s}
.rm-copy svg{width:12px;height:12px}
.rm-copy.on{background:linear-gradient(180deg,#7FD6B2,#3FAE84);color:#fff;border-color:transparent;box-shadow:0 6px 14px rgba(30,70,55,.2)}
.rm-copy.done{background:linear-gradient(180deg,#8FE0C0,#4DBE92);color:#fff;border-color:transparent;box-shadow:0 6px 14px rgba(63,174,132,.25)}
.rm-seg{position:relative;display:grid;grid-template-columns:repeat(var(--n),1fr);padding:5px;border-radius:20px;background:var(--soft);border:1.5px solid var(--ln);box-shadow:inset 0 2px 4px rgba(30,70,55,.08)}
.rm-knob{position:absolute;top:5px;bottom:5px;width:calc((100% - 10px) / var(--n));border-radius:15px;background:linear-gradient(180deg,#7FD6B2,#3FAE84);box-shadow:0 6px 14px rgba(63,174,132,.22),inset 0 1px 0 rgba(255,255,255,.25);transition:left .3s ease}
.rm-seg button{position:relative;height:48px;border:0;background:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--mut);transition:color .3s}
.rm-seg button.on{color:#fff}
.rm-seg b{font:400 10px/1 'Archivo Black',sans-serif;letter-spacing:.04em}
.rm-seg span{margin-top:3px;font:700 11.5px 'IBM Plex Sans KR',sans-serif}
.rm-grid{margin-top:14px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px 10px}
.rm-th{border:0;padding:0;background:none;cursor:pointer;text-align:left;animation:rm-in .35s ease both}
.rm-fr{height:170px;display:flex;align-items:center}
.rm .rm-ph{position:relative;width:100%;height:100%;border-radius:14px!important;border:2px solid #fff;box-shadow:0 0 0 1.5px var(--ln),0 8px 16px rgba(30,70,55,.14);overflow:hidden;background:linear-gradient(180deg,#7FD6B2,#3FAE84)!important}
.rm .rm-ph img{width:100%;height:100%;object-fit:cover}
.rm .rm-ph .ph-ic{color:#fff}
.rm .rm-ph::after{color:rgba(255,255,255,.95)!important;font:400 8px 'DM Mono',monospace!important;letter-spacing:.2em!important}
.rm-th.wide .rm-ph{height:94px}
.rm-th:hover .rm-ph{transform:translateY(-3px);transition:transform .2s}
.rm-tl{margin-top:6px;padding:0 2px;display:flex;align-items:center;gap:5px;min-width:0}
.rm-tl small{font:400 8.5px 'DM Mono',monospace;color:var(--g2);flex:none}
.rm-tl b{font-weight:700;font-size:12.5px;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rm-note{margin-top:14px;text-align:center;font:400 9.5px 'DM Mono',monospace;letter-spacing:.2em;color:#8A9894}
.rm-dh{margin-top:14px;display:flex;align-items:center;gap:9px}
.rm-dh small{font:400 9.5px 'DM Mono',monospace;color:var(--g2)}
.rm-dh b{font-weight:700;font-size:15px;color:var(--ink)}
.rm-back{height:32px;padding:0 13px 0 7px;border-radius:99px;border:1.5px solid var(--ln);background:#fff;cursor:pointer;display:inline-flex;align-items:center;gap:3px;font:400 9.5px 'Archivo Black',sans-serif;letter-spacing:.04em;color:var(--g2)}
.rm-back svg{width:15px;height:15px}
.rm-det{margin-top:11px;padding:11px}
.rm-two{display:grid;grid-template-columns:128px 1fr;gap:11px}
.rm-sl-h > span:not(.rm-sic){white-space:nowrap}
.rm-two .rm-big{height:230px}
.rm-det.wide .rm-big{height:240px}
.rm-slots{display:flex;flex-direction:column;gap:11px;min-width:0}
.rm-det.wide .rm-slots{margin-top:13px}
.rm-slot{flex:1;display:flex;flex-direction:column;gap:6px;min-width:0}
.rm-sl-h{display:flex;align-items:center;gap:7px}
.rm-sl-h > b{font:400 9px 'Archivo Black',sans-serif;letter-spacing:.04em;color:var(--ink)}
.rm-sl-h > span:not(.rm-sic){font-weight:700;font-size:11.5px;color:var(--mut)}
.rm-sl-h .rm-copy{margin-left:auto}
.rm-sic{flex:none;width:24px;height:24px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 3px 8px rgba(30,70,55,.18);background:linear-gradient(180deg,#7FD6B2,#3FAE84)}
.rm-sic.fit{background:linear-gradient(180deg,#A6E3C9,#5CC79A)}
.rm-sic svg{width:13px;height:13px}
.rm-pre{flex:1;border-radius:11px;background:var(--soft);border:1.5px solid #E4F2EB;padding:9px 11px;font:400 11.5px/1.6 'DM Mono',monospace;color:var(--ink);word-break:break-word;user-select:all}
.rm-all{margin-top:11px}
.rm-all .rm-copy{width:100%;height:34px;border-radius:11px;justify-content:center;font-size:10px;gap:7px}
.rm-res{margin-top:12px;border-radius:20px;background:linear-gradient(160deg,rgba(236,248,242,.85),rgba(255,255,255,.85));border:1.5px solid var(--ln);padding:11px 13px 13px}
.rm-rh{display:flex;align-items:center;gap:7px;margin-bottom:9px}
.rm-rok{width:28px;height:28px;border-radius:9px;display:inline-flex;align-items:center;justify-content:center;color:#fff;background:linear-gradient(180deg,#7FD6B2,#3FAE84);box-shadow:0 4px 10px rgba(30,70,55,.2)}
.rm-rok svg{width:15px;height:15px}
.rm-rh b{font:400 10.5px 'Archivo Black',sans-serif;letter-spacing:.04em;color:var(--ink)}
.rm-rh > span:last-child{font-weight:700;font-size:12px;color:var(--mut)}
.rm-r3{display:flex;gap:9px}
.rm-r3 .rm-ph{flex:1;height:150px;background:var(--soft)!important}
.rm-r3.wide .rm-ph{height:90px}
.rm-r3 .rm-ph .ph-ic{color:#fff}
@media (max-width:720px),(max-aspect-ratio:4/5) and (max-width:1100px),(max-height:599px){.rm-charm{display:none}.rm-two{grid-template-columns:1fr}.rm-grid{grid-template-columns:repeat(2,1fr)}}
/* 캐릭터 칸 : 사진이 칸을 꽉 채우고 이름은 사진 위 아래쪽에 (178x150 방식) */
.cx-grid .cx-card{position:relative!important;display:block!important;padding:0!important;border:0!important;border-radius:18px!important;overflow:hidden!important;background:none!important;box-shadow:0 12px 22px -16px rgba(20,60,45,.55)!important;text-align:left!important;transition:transform .2s!important}
.cx-grid .cx-card:hover{transform:translateY(-3px)}
.cx-grid .cx-card.on{outline:3px solid #3FAE84;outline-offset:2px}
.cx-grid .cx-card .cx-ph{display:block!important;position:relative!important;width:100%!important;height:auto!important;aspect-ratio:3/4!important;margin:0!important;border-radius:0!important;border:0!important}
.cx-grid .cx-card .cx-ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.cx-grid .cx-card .cx-ov{position:absolute;left:0;right:0;bottom:0;z-index:2;padding:34px 12px 11px;background:linear-gradient(transparent,rgba(20,42,36,.72));color:#fff;pointer-events:none;display:flex;flex-direction:column;gap:2px}
.cx-grid .cx-card .cx-ov small{display:block!important;margin:0!important;font:700 9px/1.3 'DM Mono',monospace!important;letter-spacing:.1em!important;color:rgba(255,255,255,.88)!important}
.cx-grid .cx-card .cx-ov .cx-nm{display:block!important;margin:0!important;font:800 14.5px/1.25 'IBM Plex Sans KR',sans-serif!important;color:#fff!important;word-break:keep-all;white-space:normal!important;overflow:visible!important;overflow-wrap:anywhere}
.cx-grid .cx-card .cx-ov .cx-en{display:block;font:500 10px/1.3 'DM Mono',monospace;font-style:normal;color:rgba(255,255,255,.82)}
.win.cydet.float .cf-stage .cy-pv{width:min(calc(100% - 70px),360px,calc((100cqh - 18px) * 4 / 5.6))!important}
.win.cydet.float .cf-stage:not(:has(.cf-side)) .cy-pv{width:min(calc(100% - 20px),380px,calc((100cqh - 18px) * 4 / 5.6))!important}
.cy-pv .ph:has(img) img{filter:drop-shadow(0 18px 26px rgba(30,60,50,.18))}
/* 캐릭터 · 페어 상세 사진 : 사진을 넣으면 배경 없이 전신(투명 PNG)이 그대로 서 있게 */
.cy-pv .ph:not(.is-empty):has(img),.cy-pstage .cy-pv .ph:not(.is-empty):has(img){background:none!important;box-shadow:none!important;border-radius:0!important}
.cy-pv .ph:has(img) img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;object-position:center bottom}
.cy-pv .ph.is-empty,.cy-pv .ph:not(:has(img)){border-radius:22px!important}
/* 자물쇠 + 열쇠 (시안 LockV2N 배치 · 960×640 기준) */
.k-duo{position:absolute;width:960px;height:640px;transform-origin:0 0;transform-style:preserve-3d}
.kd-u{position:absolute;width:0;height:0;transform-style:preserve-3d}
.kd-ell{position:absolute;border-radius:50%;border:1.3px dashed rgba(49,172,189,.3);pointer-events:none}
.kd-ell.a{transform:rotate(-14deg) scale(.94)}.kd-ell.b{transform:rotate(12deg) scale(1.04,1.25)}
.kd-pos{position:absolute;left:0;top:0;width:960px;height:640px;transform-origin:0 0;pointer-events:none}
.kd-lockart{position:absolute;left:0;top:0;width:960px;height:640px;animation:lk-a 6s ease-in-out infinite;transform-origin:320px 120px;pointer-events:none}
.kd-lsvg{display:block;width:100%;height:100%;overflow:visible;filter:drop-shadow(0 14px 20px rgba(18,59,72,.12))}
.kd-bow{transform-box:view-box;transform-origin:320px 454px;animation:lk-sw 2.6s ease-in-out infinite alternate}
.kd-keyart{position:absolute;left:546px;top:70px;width:204px;height:382px;animation:lk-b 6s ease-in-out infinite;transform-origin:50% 25%;pointer-events:none}
.kd-svg{display:block;width:100%;height:100%;overflow:visible;filter:drop-shadow(0 14px 20px rgba(18,59,72,.12))}
@keyframes lk-a{0%,100%{transform:translateY(0) rotate(-8deg)}50%{transform:translateY(-10px) rotate(-5deg)}}
@keyframes lk-sw{from{transform:rotate(-10deg)}to{transform:rotate(10deg)}}
@keyframes lk-b{0%,100%{transform:translateY(-6px) rotate(12deg)}50%{transform:translateY(4px) rotate(9deg)}}
@media (max-width:720px),(max-aspect-ratio:4/5) and (max-width:1100px),(max-height:599px){.kd-ell{display:none}.stage .ks-3d{translate:29px 0;scale:.92}}
/* ---------- 휴대폰 (모바일 시안) ---------- */
@media (max-width:720px),(max-aspect-ratio:4/5) and (max-width:1100px),(max-height:599px){
  .in-kick,.in-title,.in-pair,.in-tune,.in-keywrap,.in-top,.in-onair,.in-date{scale:none}
  #desk{background-size:30px 30px}
  .topbar{left:0!important;right:0!important;top:0!important;height:56px!important;border-radius:0!important;box-shadow:0 1px 0 var(--line)!important;padding:0 14px!important;gap:8px!important}
  .logo-dark{height:34px!important;padding:0 12px 0 4px!important;border-radius:9px!important;background:var(--navy)!important}
  .logo-dark small{display:none!important}
  .logo-dark b{font-size:15px!important}
  .top-r{order:1;margin-left:auto!important;gap:8px!important}
  .top-r .pill,.clock,.top-r .sq[data-nav=launcher]{display:none!important}
  .topnav{order:2;gap:8px!important}
  .topnav button[data-nav=home]{display:none!important}
  .topnav button,.top-r .theme-btn{width:36px!important;height:36px!important;font-size:0!important;justify-content:center;border:1px solid var(--line)!important;border-radius:10px!important;background:var(--card)!important;color:var(--navy)!important}
  .topnav svg,.top-r .theme-btn svg{width:15px!important;height:15px!important}
  .top-r .theme-btn{display:grid!important;place-items:center;color:var(--blue)!important}
  .stage{display:flex!important;flex-direction:column;gap:0;left:0!important;right:0!important;top:56px!important;bottom:0!important;width:auto!important;height:auto!important;padding:18px 14px 96px!important;overflow:auto!important}
  .stage .leftcol{display:contents!important}
  .stage > *,.stage .leftcol > *{flex-shrink:0!important}
  .stage .h-garland{display:block!important}
  .stage .hz.ltop{position:relative!important;left:auto;top:auto!important;width:100%!important;transform:none!important;order:1}
  .stage .leftcol .h-title,.stage .leftcol .h-garland{position:relative!important;left:auto!important;top:auto!important;width:100%!important}
  .h-kick{font-size:11px!important}
  .h-word{margin-top:6px!important}
  .h-svg{width:100%!important;height:auto!important}
  .h-garland{height:auto!important;margin-top:6px}
  .h-garland .hz{transform:scale(calc((100vw - 28px) / 632px))!important}
  .stage .h-garland{height:calc((100vw - 28px) * 28 / 632)!important;overflow:visible}
  .stage .keysec{order:2;position:relative!important;left:auto!important;top:auto!important;width:388px!important;height:700px!important;margin:4px auto 0!important;zoom:.66;transform:none!important;flex:none;animation:none!important}
  .stage .ks-3d,.stage .ks-dust{top:-10px!important;transform:none!important}
  .stage .ks-3d{transform:scale(.65)!important;transform-origin:194px 120px!important}
  .stage .ks-shadow{top:640px!important}
  .ks-mq{display:none!important}
  .mobile-pass{order:3;margin-top:8px!important;border-radius:14px!important;box-shadow:0 0 0 1px var(--line)!important;background:var(--card)!important}
  .mobile-pass > .win-h{display:none!important}
  .mobile-pass .ot-dbox{display:contents}
  .h-otr{position:relative;width:100%;height:auto}
  .ho-kick{display:flex;align-items:center;gap:8px;font:700 10px 'Barlow Condensed',sans-serif;letter-spacing:.14em;color:#31ACBD}
  .ho-kick i{flex-grow:1;height:1.5px;background:#DEEEF0}
  .ho-kick .hk-b{color:#22B5A0}
  .ho-title{position:relative;width:790px;height:251px;zoom:.45;margin-top:10px}
  .ho-title .ot-t{font-family:'Big Shoulders Display',sans-serif!important}
  .ho-np,.ot-folder{display:none!important}
  .ns-pct{display:none}
  .mobile-pass .pass{display:grid!important;grid-template-columns:110px 1fr;column-gap:14px;padding:14px!important;align-items:end}
  .mobile-pass .pass-img{grid-column:1;grid-row:1 / span 4;height:110px!important;margin:0!important;align-self:center}
  .mobile-pass .pass-top{grid-column:2;order:1}
  .mobile-pass .pass-top b,.mobile-pass .pcnt,.mobile-pass .pass-meta,.mobile-pass .nextsub,.mobile-pass .pass-perf,.mobile-pass .barcode,.mobile-pass .pass-tag,.mobile-pass .flip-hint{display:none!important}
  .mobile-pass .pass-top span{font-size:11px}
  .mobile-pass .pass-top strong{font-size:17px}
  .mobile-pass .together{grid-column:2;order:2;margin-top:4px!important;padding-top:0!important;border:0!important}
  .mobile-pass .together b{font-size:38px!important}
  .mobile-pass .together small{font-size:7px!important}
  .mobile-pass .pbar{grid-column:2;order:3;margin:4px 0 0!important}
  .mobile-pass .nextrow{grid-column:2;order:4;margin-top:2px!important;font-size:10px!important}
  .stage .leftcol .apps-panel{order:4;position:relative!important;left:auto!important;top:auto!important;width:100%!important;height:auto!important;margin-top:52px!important;padding:18px 10px 16px!important;border-radius:20px!important;box-shadow:0 0 0 1px var(--line)!important}
  .stage .leftcol .apps{zoom:1!important;width:auto!important;grid-template-columns:repeat(6,minmax(0,1fr))!important;gap:14px 2px!important}
  .app.app-tile{font-size:9px!important;gap:5px!important;white-space:normal;text-align:center;line-height:1.1}
  .app-ic.tilebox{width:44px!important;height:44px!important;border-radius:10px!important}
  .app-ic.tilebox svg{width:17px!important;height:17px!important}
  .taskbar{left:0!important;right:0!important;bottom:0!important;border-radius:0!important;height:64px!important;padding:0 14px!important;box-shadow:0 -1px 0 var(--line)!important}
  .tasks,.tb-r .sq,.credit{display:none!important}
  .tb-r{flex:1}
  .mini{flex:1;min-width:0!important;height:42px!important}
  .start{height:42px!important}
}

/* ---------- 휴대폰 · OFF THE RECORD 시안 ---------- */
@media (max-width:720px),(max-aspect-ratio:4/5) and (max-width:1100px),(max-height:599px){
  #desk{font-family:'IBM Plex Sans KR','Pretendard',sans-serif}
  .topbar{left:10px!important;right:10px!important;top:10px!important;height:54px!important;border-radius:16px!important;padding:0 9px!important;gap:8px!important;background:rgba(255,255,255,.78)!important;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1.5px solid #D3EFF3!important;box-shadow:0 8px 22px rgba(49,172,189,.10),inset 0 1px 0 #fff!important}
  .logo-dark{position:relative;height:36px!important;padding:0 14px 0 5px!important;border-radius:11px!important;background:linear-gradient(135deg,#96EBF7 0%,#57D2E3 55%,#3FCFB8 100%)!important;box-shadow:0 6px 16px rgba(49,172,189,.22),inset 0 2px 0 rgba(255,255,255,.5)!important;border:1.5px solid rgba(255,255,255,.9)!important;overflow:hidden;gap:7px!important}
  .logo-dark::after{content:'';position:absolute;left:8px;right:8px;top:2px;height:42%;border-radius:99px;background:linear-gradient(rgba(255,255,255,.6),rgba(255,255,255,0));pointer-events:none}
  .logo-dark .logo-ic{position:relative;z-index:1;width:24px!important;height:24px!important;background:#fff!important;color:#31ACBD!important;border:0!important}
  .logo-dark .logo-ic svg{width:12px!important;height:12px!important;fill:#31ACBD;stroke:none}
  .logo-dark > div{position:relative;z-index:1}
  .logo-dark b{font:900 14px/1 'Big Shoulders Display',sans-serif!important;letter-spacing:.05em!important;color:#fff!important}
  .top-r{gap:6px!important} .topnav{gap:6px!important}
  .topnav button,.top-r .theme-btn{width:34px!important;height:34px!important;box-sizing:border-box;border-radius:10px!important;background:rgba(255,255,255,.9)!important;border:1.5px solid #D3EFF3!important;box-shadow:none!important;color:#54AFBB!important}
  .top-r .theme-btn{color:#31ACBD!important}
  .topnav svg,.top-r .theme-btn svg{width:15px!important;height:15px!important;stroke-width:2.1}
  .stage{top:64px!important;padding:18px 20px 120px!important;gap:16px!important}
  .h-otr{display:flex;flex-direction:column}
  .ho-kick{gap:10px!important;font:700 11px 'Barlow Condensed',sans-serif!important;letter-spacing:.14em!important}
  .ho-title{position:relative!important;left:auto!important;top:auto!important;width:350px!important;height:151px!important;zoom:calc((100vw - 40px) / 350px)!important;margin-top:14px!important}
  .ho-npb-row{display:flex;justify-content:flex-end;margin-top:10px}
  .ho-npb{height:30px;padding:0 12px;box-sizing:border-box;border-radius:10px;background:rgba(255,255,255,.88);border:1.5px solid #D3EFF3;box-shadow:0 4px 10px rgba(49,172,189,.08);display:flex;align-items:center;gap:6px;font:700 11px 'Barlow Condensed',sans-serif;letter-spacing:.14em;color:#31ACBD;white-space:pre}
  .ho-npb i{width:16px;height:16px;border-radius:50%;background:conic-gradient(from 20deg,#C4F4FA,#96EBF7,#7FE3D2,#C9F3EA,#A6EEF8,#C4F4FA);box-shadow:inset 0 0 0 1.5px #fff;animation:tr-orbit 6s linear infinite}
  .ho-np{display:none!important}
  .h-otr.np-open .ho-np{display:block!important;position:relative!important;left:auto!important;top:auto!important;width:100%!important;transform:none!important;margin-top:16px;box-sizing:border-box;border-radius:18px;background:rgba(255,255,255,.78)!important;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1.5px solid #D3EFF3!important;box-shadow:0 8px 22px rgba(49,172,189,.10),inset 0 1px 0 #fff!important;padding:10px;animation:tr-pop .35s ease-out both}
  .np-h{display:flex;justify-content:space-between;align-items:center;padding:0 2px 8px}
  .np-h b{font:900 15px 'Big Shoulders Display',sans-serif;letter-spacing:.06em;background:linear-gradient(135deg,#3DC6D8,#3FCFB8);-webkit-background-clip:text;background-clip:text;color:transparent}
  .np-h i{width:7px;height:7px;border-radius:50%;background:#3FCFB8;box-shadow:0 0 0 3px rgba(63,207,184,.2);animation:tr-blink 1.6s ease-in-out infinite}
  .np-m{display:flex;gap:10px;align-items:center}
  .np-disc{position:relative;width:84px;height:84px;flex-shrink:0;border-radius:50%;background:radial-gradient(circle,#fff 0 9px,rgba(255,255,255,0) 9.5px 15px,rgba(255,255,255,.85) 15.5px 25px,transparent 25.5px),conic-gradient(from 20deg,#C4F4FA,#96EBF7,#7FE3D2,#C9F3EA,#A6EEF8,#C4F4FA);box-shadow:0 8px 18px rgba(49,172,189,.2),inset 0 0 0 2px rgba(255,255,255,.85);animation:tr-orbit 14s linear infinite}
  .np-shine{position:absolute;left:14px;top:10px;width:46px;height:22px;border-radius:50%;background:rgba(255,255,255,.55);transform:rotate(-30deg);filter:blur(1px)}
  .np-core{position:absolute;left:50%;top:50%;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;background:linear-gradient(135deg,#96EBF7,#57D2E3 55%,#3FCFB8);box-shadow:inset 0 0 0 1.5px #fff}
  .np-list{flex-grow:1;display:grid;grid-template-columns:1fr 1fr;gap:8px 10px}
  .np-list div{display:flex;gap:5px;align-items:center;white-space:nowrap;font:600 11px 'Barlow Condensed',sans-serif;letter-spacing:.05em;color:#50848B}
  .np-list div.on{font-weight:800;color:#31ACBD}
  .np-list b{color:#3FCFB8}
  .np-bar{margin-top:10px;height:10px;box-sizing:border-box;border-radius:99px;background:rgba(255,255,255,.85);border:1.5px solid #D3EFF3;padding:1.5px}
  .np-bar span{display:block;height:100%;width:42%;border-radius:99px;background:linear-gradient(90deg,#A5E6EF,#67DAE9 60%,#4FD6C0);animation:tr-prog 18s linear infinite alternate}
  .np-time{margin-top:5px;display:flex;justify-content:space-between;padding:0 2px;font:400 8px 'DM Mono',monospace;color:#84B6BD}
  /* 열쇠 */
  .stage .keysec{zoom:1!important;width:100%!important;height:300px!important;margin:0!important;perspective:1400px}
  .stage .ks-3d{left:calc(50% - 95px)!important;top:2px!important;transform:scale(.39)!important;transform-origin:0 0!important}
  .stage .ks-dust,.stage .ks-shadow{display:none!important}
  /* 출입증 */
  .mobile-pass{position:relative;margin-top:0!important;border-radius:20px!important;background:rgba(255,255,255,.78)!important;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1.5px solid #D3EFF3!important;box-shadow:0 8px 22px rgba(49,172,189,.10),inset 0 1px 0 #fff!important;overflow:hidden}
  .mobile-pass::before{content:'';position:absolute;left:50%;top:10px;width:44px;height:7px;margin-left:-22px;border-radius:99px;background:rgba(255,255,255,.95);box-shadow:inset 0 1px 2px rgba(49,172,189,.25);z-index:2}
  .mobile-pass .pass{display:grid!important;grid-template-columns:104px 1fr!important;column-gap:12px!important;row-gap:0!important;padding:27px 14px 0!important;align-items:start!important;background:transparent!important}
  .mobile-pass .pass-img{grid-column:1!important;grid-row:1 / span 3!important;width:104px!important;height:104px!important;border-radius:14px!important;margin:0!important;overflow:hidden;box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.6)}
  .mobile-pass .pass-img .face.front .ph,.mobile-pass .pass-img .face.front > div:first-child{background:linear-gradient(155deg,#A6EEF8,#67DAE9 55%,#6FDCC8)!important}
  .mobile-pass .pass-img .corner,.mobile-pass .pass-tag,.mobile-pass .flip-hint{display:none!important}
  .mobile-pass .pass-top{grid-column:2!important;grid-row:1!important;display:block!important;padding:0!important;margin:0!important;border:0!important}
  .mobile-pass .pass-top > b{display:none!important}
  .mobile-pass .pass-top span{display:block;font:700 10px 'Barlow Condensed',sans-serif!important;letter-spacing:.16em!important;color:#22B5A0!important}
  .mobile-pass .pass-top .pcnt{display:inline!important;font-style:normal;color:#22B5A0!important}
  .mobile-pass .pass-top strong{display:block;font:900 19px/1 'Big Shoulders Display',sans-serif!important;color:#22444F!important}
  .mobile-pass .pass-meta{grid-column:2!important;grid-row:2!important;display:flex!important;flex-wrap:wrap;gap:4px!important;margin:8px 0 0!important;padding:0!important;border:0!important}
  .mobile-pass .pass-meta > div{height:22px;padding:0 8px;box-sizing:border-box;border-radius:99px;background:rgba(255,255,255,.85);border:1.5px solid #D3EFF3;display:inline-flex!important;align-items:center;white-space:nowrap;flex:none!important}
  .mobile-pass .pass-meta > div:nth-child(2){display:none!important}
  .mobile-pass .pass-meta small{display:none!important}
  .mobile-pass .pass-meta b,.mobile-pass .pass-meta .st-chip{font:700 10px 'Barlow Condensed',sans-serif!important;letter-spacing:.12em!important;color:#54AFBB!important;background:none!important;border:0!important;padding:0!important;height:auto!important}
  .mobile-pass .pass-meta .st-chip::before{content:'● '}
  .mobile-pass .together{grid-column:2!important;grid-row:3!important;align-self:end;display:flex!important;justify-content:space-between;align-items:flex-end;margin:6px 0 0!important;padding:0!important;border:0!important}
  .mobile-pass .together small{font:400 7px 'DM Mono',monospace!important;letter-spacing:.14em!important;color:#84B6BD!important}
  .mobile-pass .together b{font:900 38px/.85 'Big Shoulders Display',sans-serif!important;background:linear-gradient(135deg,#79DFED,#3DC6D8 50%,#3FCFB8);-webkit-background-clip:text;background-clip:text;color:transparent!important}
  .mobile-pass .together b em{font-style:normal;color:inherit!important;font-size:inherit!important}
  .mobile-pass .pbar{grid-column:1 / -1!important;grid-row:4!important;margin:10px 0 0!important;height:12px!important;box-sizing:border-box;border-radius:99px!important;background:rgba(255,255,255,.8)!important;border:1.5px solid #D3EFF3;padding:2px}
  .mobile-pass .pbar i{position:relative!important;display:block;left:auto!important;top:auto!important;height:100%!important;border-radius:99px!important;background:linear-gradient(90deg,#A5E6EF,#67DAE9 60%,#4FD6C0)!important}
  .mobile-pass .nextrow{grid-column:1 / -1!important;grid-row:5!important;display:flex!important;justify-content:space-between;margin:10px 0 0!important;padding:0!important;font:800 12px 'Barlow Condensed',sans-serif!important;color:#22444F!important;border:0!important}
  .mobile-pass .nextrow b{font:inherit!important;color:#22444F!important}
  .mobile-pass .nextrow span{font:inherit!important;color:#31ACBD!important}
  .mobile-pass .nextsub{display:none!important}
  .mobile-pass .pass-perf{display:block!important;grid-column:1 / -1!important;grid-row:6!important;margin:10px -14px 0!important;height:1.5px!important;border:0!important;background:linear-gradient(90deg,transparent,#D3EFF3 12%,#BFEDE4 88%,transparent)!important}
  .mobile-pass .pass-perf::before,.mobile-pass .pass-perf::after{display:none!important}
  .mobile-pass .barcode{display:flex!important;grid-column:1 / -1!important;grid-row:7!important;height:38px;align-items:center;gap:10px!important;margin:0!important;padding:0!important;border:0!important;background:none!important}
  .mobile-pass .barcode svg{height:18px!important;width:auto!important}
  .mobile-pass .barcode svg rect{fill:#A3D0D6}
  .mobile-pass .barcode span{font:800 11px 'Barlow Condensed',sans-serif!important;letter-spacing:.12em!important;color:#54AFBB!important}
  /* 아이콘 창 */
  .stage .leftcol .apps-panel{margin-top:10px!important;border-radius:0 16px 16px 16px!important;background:linear-gradient(#fff,#F8FDFE)!important;border:1.5px solid #D7F1F4!important;box-shadow:0 12px 28px rgba(49,172,189,.10)!important;padding:18px 12px 16px!important;filter:none!important;overflow:visible!important}
  .apps-panel .panel-tab{left:-1.5px!important;top:-28px!important;height:30px!important;padding:0 12px 0 10px!important;border-radius:12px 12px 0 0!important;background:#fff!important;border:1.5px solid #D7F1F4!important;border-bottom:0!important;gap:6px!important;box-shadow:none!important}
  .apps-panel .panel-tab::before,.apps-panel .panel-tab::after{display:none!important}
  .apps-panel .panel-tab svg{width:12px!important;height:12px!important;stroke:#57D2E3;color:#57D2E3}
  .apps-panel .panel-tab span{font:900 15px 'Big Shoulders Display',sans-serif!important;letter-spacing:.06em!important;background:linear-gradient(135deg,#79DFED,#3DC6D8 50%,#3FCFB8);-webkit-background-clip:text;background-clip:text;color:transparent!important}
  .stage .leftcol .apps{gap:14px 4px!important}
  .app.app-tile{font:600 10px/1.1 'Barlow Condensed',sans-serif!important;letter-spacing:.02em!important;gap:5px!important;color:#22444F!important}
  .app-ic.tilebox{width:42px!important;height:42px!important;border-radius:12px!important}
  .app-ic.tilebox svg{width:17px!important;height:17px!important}
  .apps .app-ic.tilebox.os0{background:rgba(255,255,255,.92)!important;color:#31ACBD!important;border:2px solid #D3EFF3!important;box-shadow:0 3px 8px rgba(49,172,189,.10)!important}
  .apps .app-ic.tilebox.os1{background:linear-gradient(rgba(255,255,255,.55),rgba(255,255,255,0) 46%),linear-gradient(135deg,#96EBF7,#57D2E3 55%,#4BC4D4)!important;color:#fff!important;border:0!important;box-shadow:0 5px 12px rgba(49,172,189,.22),inset 0 0 0 1.5px rgba(255,255,255,.7)!important}
  .apps .app-ic.tilebox.os2{background:linear-gradient(rgba(255,255,255,.55),rgba(255,255,255,0) 46%),linear-gradient(135deg,#7FE3D2,#3FCFB8 55%,#22B5A0)!important;color:#fff!important;border:0!important;box-shadow:0 5px 12px rgba(34,181,160,.22),inset 0 0 0 1.5px rgba(255,255,255,.7)!important}
  .apps .app-ic.tilebox.os3{background:linear-gradient(rgba(255,255,255,.55),rgba(255,255,255,0) 46%),linear-gradient(160deg,#F2FCF9,#D6F3EC)!important;color:#16A08A!important;border:0!important;box-shadow:0 3px 8px rgba(49,172,189,.10),inset 0 0 0 1.5px rgba(255,255,255,.9)!important}
  .apps .app-ic.tilebox.os4{background:linear-gradient(rgba(255,255,255,.55),rgba(255,255,255,0) 46%),linear-gradient(160deg,#F5FDFE,#DFF6F9)!important;color:#31ACBD!important;border:0!important;box-shadow:0 3px 8px rgba(49,172,189,.10),inset 0 0 0 1.5px rgba(255,255,255,.9)!important}
  .apps .app-ic .badge{right:-5px!important;top:-5px!important;width:15px!important;height:15px!important;min-width:0!important;padding:0!important;border-radius:50%!important;background:linear-gradient(135deg,#FF7A8C,#F05468)!important;box-shadow:0 2px 6px rgba(240,84,104,.35),inset 0 0 0 1.5px #fff!important;color:#fff!important;font:800 9px 'Barlow Condensed',sans-serif!important;display:flex!important;align-items:center;justify-content:center;border:0!important}
  /* 아래 바 */
  .taskbar{left:10px!important;right:10px!important;bottom:10px!important;height:56px!important;border-radius:16px!important;padding:0 9px!important;gap:8px!important;background:rgba(255,255,255,.78)!important;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1.5px solid #D3EFF3!important;box-shadow:0 8px 22px rgba(49,172,189,.10),inset 0 1px 0 #fff!important}
  .start{position:relative;height:36px!important;padding:0 13px!important;border-radius:11px!important;background:linear-gradient(135deg,#96EBF7 0%,#57D2E3 55%,#3FCFB8 100%)!important;box-shadow:0 6px 16px rgba(49,172,189,.22),inset 0 2px 0 rgba(255,255,255,.5)!important;border:1.5px solid rgba(255,255,255,.9)!important;color:#fff!important;font:800 12px 'Barlow Condensed',sans-serif!important;letter-spacing:.12em!important;gap:6px!important;overflow:hidden}
  .start::after{content:'';position:absolute;left:8px;right:8px;top:2px;height:42%;border-radius:99px;background:linear-gradient(rgba(255,255,255,.6),rgba(255,255,255,0));pointer-events:none}
  .start svg{position:relative;z-index:1;width:11px!important;height:11px!important;fill:#fff;stroke:none}
  .start span{position:relative;z-index:1}
  .mini{height:38px!important;border-radius:11px!important;background:#fff!important;border:1.5px solid #D3EFF3!important;padding:0 4px!important;gap:8px!important}
  .mini-cover{position:relative;width:28px!important;height:28px!important;border-radius:50%!important;background:linear-gradient(150deg,#96EBF7,#3FCFB8)!important;box-shadow:inset 0 0 0 2px rgba(255,255,255,.8);animation:tr-orbit 8s linear infinite}
  .mini-cover::before{content:'';position:absolute;left:11px;top:11px;width:6px;height:6px;border-radius:50%;background:#fff}
  .mini-cover::after{display:none!important}
  .mini-t small{font:400 7px 'DM Mono',monospace!important;letter-spacing:.2em!important;color:#84B6BD!important}
  .mini-t b{font:700 12px 'Barlow Condensed',sans-serif!important;letter-spacing:.04em!important;color:#22444F!important}
  .mini-eq{display:none!important}
  .mini-play{width:28px!important;height:28px!important;border-radius:9px!important;background:linear-gradient(135deg,#96EBF7 0%,#57D2E3 55%,#3FCFB8 100%)!important;box-shadow:0 6px 16px rgba(49,172,189,.22),inset 0 2px 0 rgba(255,255,255,.5)!important;border:1.5px solid rgba(255,255,255,.9)!important;color:#fff!important}
  .mini-play svg{width:9px!important;height:9px!important;fill:#fff}
}
@media (min-width:721px) and (min-aspect-ratio:4/5) and (min-height:600px),(min-width:1101px) and (min-height:600px){ .ho-npb-row{display:none} }

/* 패드 · 아이폰 사파리가 큰 글씨를 마음대로 키우지 않게 */
html{-webkit-text-size-adjust:none!important;text-size-adjust:none!important}
/* ---------- 휴대폰 · 메인 홈(새틴 880) 맞춤 시안 (MobOTR) ---------- */
@media (max-width:720px),(max-aspect-ratio:4/5) and (max-width:1100px),(max-height:599px){
  html,body{overflow-x:hidden!important;overscroll-behavior-x:none;max-width:100%}
  #desk{overflow:hidden!important;--sa:'Archivo Black','Big Shoulders Display',sans-serif;--sm:'DM Mono',monospace;background-color:#EFF8F9!important;background-image:linear-gradient(rgba(18,59,72,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(18,59,72,.055) 1px,transparent 1px)!important;background-size:40px 40px!important;color:#123B48}
  .stage{overflow-x:hidden!important;overflow-y:auto!important;touch-action:pan-y;overscroll-behavior-x:none}
  .stage::before{left:auto!important;right:-180px!important;top:-160px!important;width:420px!important;height:380px!important;background:#BDEFF2!important;opacity:.35!important;filter:blur(80px)!important}
  .stage::after{display:none!important}
  /* 위 바 : 로고 · ON AIR · 앱 버튼 / 아래 줄 HOME · CATEGORY · NOTICE · 날짜 */
  .topbar{left:16px!important;right:16px!important;top:0!important;height:82px!important;border-radius:0!important;padding:0!important;display:flex!important;flex-wrap:nowrap!important;align-items:flex-start;gap:0 8px!important;background:#EFF8F9!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;border:0!important;border-bottom:1px solid #CFE6EA!important;box-shadow:none!important}
  .topbar::before{content:'';position:absolute;left:0;right:0;top:48px;height:1px;background:#DDEFF1}
  .logo-dark{order:0;flex:0 1 auto;min-width:0;top:0!important;align-self:flex-start!important;margin:0!important;height:48px!important;padding:0!important;border:0!important;border-radius:0!important;background:none!important;box-shadow:none!important;gap:8px!important;overflow:visible}
  .logo-dark::after{display:none!important}
  .logo-dark .logo-ic{width:22px!important;height:22px!important;border-radius:50%!important;background:#1FA8B8!important;color:#fff!important;border:0!important}
  .logo-dark .logo-ic svg{width:11px!important;height:11px!important;fill:#fff!important;stroke:none!important}
  .logo-dark > div{display:flex!important;flex-direction:row!important;align-items:center;gap:8px}
  .logo-dark b{font:400 14px/1 var(--sa)!important;letter-spacing:-.01em!important;color:#123B48!important}
  .logo-dark small{display:block!important;font:400 9.5px/1 var(--sm)!important;letter-spacing:0!important;color:#7C979E!important;margin:0!important;text-transform:none}
  .top-r{order:1;position:static!important;flex-shrink:0;margin-left:auto!important;height:48px;display:flex!important;align-items:center;gap:12px!important}
  .top-r .pill{display:flex!important;height:auto!important;padding:0!important;border:0!important;background:none!important;gap:6px!important;font:400 10px var(--sa)!important;letter-spacing:0!important;color:#123B48!important;white-space:nowrap}
  .top-r .pill b{font-weight:400!important;color:#123B48!important}
  .top-r .pill .led{width:7px!important;height:7px!important;background:#5ED6C8!important;box-shadow:none!important;animation:e-blink 1.6s infinite}
  .top-r .theme-btn{display:none!important}
  .top-r .pill [data-bind]{font-size:0!important}
  .top-r .pill [data-bind]::after{content:'ON AIR';font:400 10px var(--sa)}
  .top-r .sq[data-nav=launcher]{display:grid!important;place-items:center;width:28px!important;height:28px!important;border-radius:50%!important;background:none!important;border:1px solid #CFE6EA!important;color:#123B48!important;box-shadow:none!important}
  .top-r .sq svg{width:12px!important;height:12px!important;stroke-width:2}
  .top-r .clock{display:flex!important;align-items:center;position:absolute;right:0;top:48px;height:34px;font:400 10px var(--sa)!important;letter-spacing:0!important;color:#7C979E!important}
  .topnav{order:3;position:absolute!important;left:0;top:48px;height:34px;display:flex!important;align-items:center;gap:24px!important}
  .topnav button,.topnav button[data-nav=home]{display:block!important;position:relative;width:auto!important;height:auto!important;padding:6px 2px!important;border:0!important;border-radius:0!important;background:none!important;box-shadow:none!important;font:400 11px var(--sa)!important;letter-spacing:.04em!important;color:#7C979E!important}
  .topnav button svg{display:none!important}
  .topnav button[data-nav=home]{color:#123B48!important}
  .topnav button[data-nav=home]::before{display:none!important}
  .topnav button[data-nav=home]::after{content:'';position:absolute;left:0;right:0;bottom:-1px;height:3px;border-radius:2px;background:#1FA8B8}
  /* 내용 */
  .stage{top:82px!important;bottom:0!important;padding:14px 20px 104px!important;gap:16px!important}
  .ho-kick{display:none!important}
  .ho-title{margin-top:4px!important;height:200px!important;margin-bottom:0!important}
  .ho-npb-row,.ho-np,.h-otr.np-open .ho-np{display:none!important}
  .ho-npb{height:30px;padding:0 12px;box-sizing:border-box;border-radius:10px;background:#fff!important;border:1.4px solid #CFE6EA!important;box-shadow:0 4px 10px rgba(18,59,72,.06)!important;gap:6px;font:400 10px var(--sa)!important;letter-spacing:.02em!important;color:#123B48!important}
  .ho-npb i{position:relative;width:18px!important;height:18px!important;border-radius:50%!important;background:#1FA8B8!important;box-shadow:none!important;animation:none!important}
  .ho-npb i::after{content:'';position:absolute;left:7px;top:5px;border-left:6px solid #fff;border-top:4px solid transparent;border-bottom:4px solid transparent}
  .h-otr.np-open .ho-np{border-radius:22px!important;background:linear-gradient(180deg,#fff,#F4FAFB)!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;border:1px solid #D6ECEE!important;box-shadow:inset 0 1px 0 #fff,0 10px 24px rgba(18,59,72,.07)!important;padding:14px!important}
  .np-h b{font:400 14px var(--sa)!important;letter-spacing:-.01em!important;background:none!important;-webkit-background-clip:border-box!important;background-clip:border-box!important;color:#123B48!important}
  .np-disc{background:radial-gradient(circle,#fff 0 9px,rgba(255,255,255,0) 9.5px 15px,rgba(255,255,255,.85) 15.5px 25px,transparent 25.5px),conic-gradient(from 20deg,#C9EEF0,#8FDCE3,#7FE3D2,#C9F3EA,#A6E3E6,#C9EEF0)!important;box-shadow:0 8px 18px rgba(18,59,72,.2),inset 0 0 0 2px rgba(255,255,255,.85)!important}
  .np-core{background:linear-gradient(135deg,#8FDCE3,#1FA8B8 55%,#3FCFB8)!important}
  .np-list div{font:400 9.5px var(--sa)!important;letter-spacing:0!important;color:#7C979E!important}
  .np-list div.on{color:#123B48!important}
  .np-list b{font-weight:400!important;color:#1FA8B8!important}
  .np-bar{height:6px!important;border:0!important;padding:0!important;background:#CFE6EA!important}
  .np-bar span{background:#1FA8B8!important}
  .np-time{font:400 8px var(--sm)!important;color:#7C979E!important}
  /* 자물쇠 + 열쇠 (지금 것 그대로) */
  .kd-ell{display:block!important}
  .stage .keysec{overflow:hidden!important;height:272px!important}
  /* 출입증 */
  .mobile-pass{border-radius:20px!important;background:rgba(255,255,255,.78)!important;border:1.5px solid #D6ECEE!important;box-shadow:0 8px 22px rgba(18,59,72,.10),inset 0 1px 0 #fff!important}
  .mobile-pass::before{box-shadow:inset 0 1px 2px rgba(18,59,72,.25)!important}
  .mobile-pass .pass-img .face.front .ph,.mobile-pass .pass-img .face.front > div:first-child{background:linear-gradient(155deg,#A6E3E6,#38C2CF 55%,#6FDCC8)!important}
  .mobile-pass .pass-top strong{color:#123B48!important}
  .mobile-pass .pass-meta > div{border-color:#D6ECEE!important}
  .mobile-pass .pass-meta b,.mobile-pass .pass-meta .st-chip{color:#2E8A96!important}
  .mobile-pass .together small{color:#7C979E!important}
  .mobile-pass .together b{background:linear-gradient(135deg,#5ECBD6,#1A9AAA 50%,#3FCFB8)!important;-webkit-background-clip:text!important;background-clip:text!important}
  .mobile-pass .pbar{border-color:#D6ECEE!important}
  .mobile-pass .pbar i{background:linear-gradient(90deg,#A6E8EC,#38C2CF 60%,#4FD6C0)!important}
  .mobile-pass .nextrow,.mobile-pass .nextrow b{color:#123B48!important}
  .mobile-pass .nextrow span{color:#1A8F9E!important}
  .mobile-pass .pass-perf{background:linear-gradient(90deg,transparent,#D6ECEE 12%,#BFEDE4 88%,transparent)!important}
  .mobile-pass .barcode svg rect{fill:#A9C9CE!important}
  .mobile-pass .barcode span{color:#2E8A96!important}
  /* 아이콘 창 : 6칸 × 5줄 + 2 */
  .stage .leftcol .apps-panel{margin-top:34px!important;border-radius:0 16px 16px 16px!important;background:linear-gradient(180deg,#fff,#F3FAFB)!important;border:1.2px solid #CFE6EA!important;box-shadow:0 12px 28px rgba(18,59,72,.06)!important;padding:22px 8px 22px!important}
  .apps-panel .panel-tab{left:-1.2px!important;top:-33px!important;height:34px!important;padding:0 18px 0 14px!important;border-radius:14px 14px 0 0!important;background:#fff!important;border:1.2px solid #CFE6EA!important;border-bottom:0!important;gap:8px!important}
  .apps-panel .panel-tab svg{width:15px!important;height:15px!important;stroke:#1FA8B8!important;color:#1FA8B8!important;stroke-width:2.1}
  .apps-panel .panel-tab span{font:400 15px var(--sa)!important;letter-spacing:-.01em!important;background:none!important;-webkit-background-clip:border-box!important;background-clip:border-box!important;color:#123B48!important}
  .stage .leftcol .apps{grid-template-columns:repeat(6,minmax(0,1fr))!important;gap:18px 2px!important}
  .app.app-tile,.apps .app-tile{font:400 8.5px/1.15 var(--sa)!important;letter-spacing:-.01em!important;color:#123B48!important;gap:6px!important;text-align:center;white-space:normal!important;word-break:keep-all}
  .app-ic.tilebox,.apps .app-ic.tilebox{width:46px!important;height:46px!important;border-radius:11px!important}
  .app-ic.tilebox svg,.apps .app-ic.tilebox svg{width:19px!important;height:19px!important}
  .apps .app-ic.tilebox.os0{background:linear-gradient(180deg,#FFFFFF,#F4FAFB)!important;color:#123B48!important;border:1px solid #D6ECEE!important;box-shadow:inset 0 1px 0 #fff,0 4px 10px rgba(18,59,72,.07)!important}
  .apps .app-ic.tilebox.os1{background:linear-gradient(180deg,#38C2CF 0%,#1B9CAB 100%)!important;color:#fff!important;border:0!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.2),0 6px 14px rgba(31,168,184,.2)!important}
  .apps .app-ic.tilebox.os2{background:linear-gradient(180deg,#215666 0%,#0F3542 100%)!important;color:#fff!important;border:0!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 6px 14px rgba(18,59,72,.2)!important}
  .apps .app-ic.tilebox.os3{background:linear-gradient(180deg,#E8F7F8 0%,#D2EFF0 100%)!important;color:#168F9E!important;border:0!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.7)!important}
  .apps .app-ic.tilebox.os4{background:linear-gradient(180deg,#F5FBFB,#EBF5F6)!important;color:#123B48!important;border:1px solid #DCEEF0!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.7)!important}
  .apps .app-ic .badge{width:17px!important;height:17px!important;right:-6px!important;top:-6px!important;background:#FF5A6E!important;box-shadow:0 0 0 2px #fff!important;font:400 9px var(--sa)!important}
  /* 아래 바 : ▶ 곡 제목 · 이퀄라이저 · D+ / 저작권 */
  .taskbar{left:16px!important;right:16px!important;bottom:0!important;height:76px!important;border-radius:0!important;padding:0 0 26px!important;gap:10px!important;background:#EFF8F9!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;border:0!important;border-top:1px solid #CFE6EA!important;box-shadow:0 -8px 16px #EFF8F9!important}
  .taskbar .start,.tasks,.tb-r > .sq,.mini-cover{display:none!important}
  .tb-r{display:contents!important}
  .mini{flex:0 1 auto!important;min-width:0!important;height:auto!important;padding:0!important;border:0!important;border-radius:0!important;background:none!important;box-shadow:none!important;gap:10px!important;display:flex!important;align-items:center}
  .mini-play{order:-1;width:28px!important;height:28px!important;flex-shrink:0;border-radius:50%!important;background:#1FA8B8!important;border:0!important;box-shadow:none!important;color:#fff!important}
  .mini-play::after{display:none!important}
  .mini-play svg{width:11px!important;height:11px!important;fill:#fff}
  .mini-t{display:flex!important;flex-direction:row!important;align-items:center;min-width:0}
  .mini-t small{display:none!important}
  .mini-t b{font:400 11px var(--sa)!important;letter-spacing:0!important;color:#123B48!important;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .mini-t b::after{content:' — 月とナイフ';color:#7C979E}
  .mini-eq{display:flex!important;gap:2px;height:13px;align-items:flex-end;width:auto!important;flex-shrink:0}
  .mini-eq i{display:block!important;width:3px!important;height:100%!important;background:#1FA8B8!important;border-radius:0!important;transform-origin:bottom;animation:e-eq .5s ease-in-out infinite alternate!important;margin:0!important}
  .mini-eq i:nth-child(2){animation-duration:.65s!important;animation-delay:.1s!important}
  .mini-eq i:nth-child(3){animation-duration:.8s!important;animation-delay:.2s!important}
  .st-dd{display:flex!important;order:2;margin-left:auto;flex-shrink:0;height:26px;padding:0 11px;border-radius:99px;background:#1FA8B8;color:#fff;font:400 10.5px var(--sa);align-items:center;border:0;white-space:nowrap}
  .credit{display:flex!important;position:absolute;right:0;bottom:0;height:26px;align-items:flex-start;padding-top:2px;box-sizing:border-box;margin:0!important;flex-direction:row!important}
  .credit small,.credit b{font:400 9.5px var(--sa)!important;letter-spacing:0!important;color:#7C979E!important;background:none!important;-webkit-text-fill-color:#7C979E!important}
  .credit b::before{content:' · '}
}
`;document.head.appendChild(st);})();
/* =========================================================
   SYRINGE 시안 (PC 메인 홈) — 위 배너 · 50칸 아이콘 · 오른쪽 출입증/SPEC SHEET · 아래 바
   휴대폰 화면은 건드리지 않아요
   ========================================================= */
function syOn() { return !isMobile() && !!document.querySelector('.sy-hero'); }
function syHero() {
  const h = document.querySelector('.sy-hero'); if (!h) return;
  const C = S.clinic || {}, list = (S.pairs && S.pairs.length) ? S.pairs : [S.pair], i = pairIdx % list.length, p = list[i], c = pairCalc(p);
  h.querySelector('.sy-pair').textContent = `${p.a} × ${p.b}`;
  h.querySelector('.sy-dd').textContent = 'D+' + c.d;
  h.querySelector('.sy-next').innerHTML = `<span>NEXT · <b>D+${c.goal}</b></span><b>${c.left}일 남음</b>`;
  h.querySelector('.sy-bar i').style.width = c.pct + '%';
  h.querySelector('.sy-sub').innerHTML = `<span>${ymd(c.next)}</span><span>${c.pct}%</span>`;
  h.querySelector('.sy-dots').innerHTML = list.map((_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('');
}
function syPass(el) {
  const W = deskW(), z = 238 / 308;
  if (WKZ) { el.style.zoom = ''; el.style.transformOrigin = '0 0'; el.style.transform = `scale(${z})`; el.dataset.wz = 1; el.style.width = '308px'; el.style.left = Math.round(W - 19 - 238) + 'px'; el.style.top = '54px'; syLayout(); return; }
  el.style.zoom = z; el.dataset.wz = z;
  el.style.width = '308px'; el.style.left = Math.round((W - 19 - 238) / z) + 'px'; el.style.top = Math.round(54 / z) + 'px';
  syLayout();
}
function syLayout() {
  const desk = $('#desk'); if (!desk) return;
  const W = deskW(), H = innerHeight / Z;
  // 아이콘 창은 높이 고정(556 · 10×6) — 화면이 커지면 위 배너가 커져요
  const pw = W - 18 - 270 - 22, heroH = H - 54 - 68 - 576;
  desk.style.setProperty('--sy-ts', Math.max(1, Math.min(1.06, pw / 1130)).toFixed(4));
  desk.style.setProperty('--hk', Math.max(1, Math.min(1.35, 1 + (heroH - 202) / 400)).toFixed(4));
  // 큰 글씨가 길면(UNRELEASED 등) 오른쪽 D+ 칸에 닿지 않게 자동으로 줄여요
  const t = desk.querySelector('.sy-title'), hero = desk.querySelector('.sy-hero');
  if (t && hero) { t.style.removeProperty('--tfit'); const max = hero.clientWidth - 44 - 27 - 300 - 46, w = t.scrollWidth; if (w > max) t.style.setProperty('--tfit', (max / w).toFixed(4)); }
  // 선·키커·큰글씨·칩 세로 배치 : 큰 글씨 위/아래 '눈에 보이는' 공백을 똑같이 맞추고, 남는 높이는 위아래 여백으로
  if (hero && t) { const pr = hero.querySelector('.sy-pairrow');
    if (pr) { ['--lb', '--kb', '--tb', '--pb'].forEach(k => hero.style.removeProperty(k));
      const H = hero.clientHeight, P = pr.offsetHeight, tf0 = parseFloat(t.style.getPropertyValue('--tfit')) || 1;
      const fs0 = parseFloat(getComputedStyle(t).fontSize) / tf0 * tf0;
      const cv = syLayout._c || (syLayout._c = document.createElement('canvas').getContext('2d'));
      const met = fs => { cv.font = `900 ${fs}px Pretendard, sans-serif`; const m = cv.measureText('UNRELEASED'), fa = m.fontBoundingBoxAscent ?? fs * .95, fd = m.fontBoundingBoxDescent ?? fs * .24, base = (fs - fa - fd) / 2 + fa, cap = m.actualBoundingBoxAscent || fs * .72; return { base, cap, below: fs - base }; };
      const KH = 12, KV = 2.5, G1 = 14, MT = 22, MB = 20;   // 10×6 으로 배너가 낮아져서 위/아래 여백을 줄였어요 (예전 34 · 26)   // 키커 높이, 키커 글자 아래 여백, 선↔키커, 위/아래 여백
      const need = (fs, G) => { const m = met(fs); return MB + P + G * 1.3 + m.cap + G + KH - KV + MT; };   // 위 초록 선은 빼서 그 자리만큼 여백으로   // 큰 글씨 아래(칩 쪽) 여백을 1.3배로
      let f = 1, G = 0;
      for (; f > .66; f -= .01) { const fs = fs0 * f, m = met(fs); G = Math.min(.42 * m.cap, (H - need(fs, 0)) / 2.3); if (G >= .36 * m.cap && G >= 19) break; }   // 큰 글씨 위아래가 붙지 않게 (여백 최소 21)
      const fs = fs0 * f, m = met(fs); G = Math.max(18, G);
      if (f < 1) t.style.setProperty('--tfit', (tf0 * f).toFixed(4));
      const extra = Math.max(0, H - need(fs, G)), pb = MB + extra / 2;
      const tb = pb + P + G * 1.3 - m.below;                 // 큰 글씨 baseline이 칩 위 G 만큼
      const kb = tb + m.below + m.cap + G - KV;          // 키커 글자 바닥이 큰 글씨 윗선 위 G 만큼
      const lb = kb + KH + G1;
      [['--pb', pb], ['--tb', tb], ['--kb', kb], ['--lb', lb]].forEach(([k, v]) => hero.style.setProperty(k, v.toFixed(1) + 'px')); } }
}
(function syringe() {
  const C = S.clinic; if (!C) return;
  const st = document.createElement('style');
  st.textContent = `
@media (min-width:721px) and (min-aspect-ratio:4/5) and (min-height:600px),(min-width:1101px) and (min-height:600px){
  #desk{font-synthesis:none;--syf:'Archivo Black','IBM Plex Sans KR',sans-serif;--syb:'Inter','IBM Plex Sans KR',sans-serif;--sys:'Noto Serif Display','Noto Serif',Georgia,serif;--sy-g:#3FAE84;--sy-m:#6CCBA6;--sy-d:#1D4A40;--sy-ink:#26332F;--sy-gr:#7F8F8A;--sy-ln:#DDE8E3;
    background-color:#FEFEFE!important;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18'%3E%3Ccircle cx='9' cy='9' r='.95' fill='rgba(70,100,90,.2)'/%3E%3C/svg%3E")!important;background-size:18px 18px!important}
  #desk.sy-rz *,#desk.sy-rz *::before,#desk.sy-rz *::after{transition:none!important}
  #desk .stage::before,#desk .stage::after{display:none!important}
  #desk .keysec,#desk .h-otr,#desk .h-note,#desk .blueprint,#desk .ot-folder,#desk .st-dd,#desk .taskbar .mini-eq,#desk .top-r .sq.theme-btn,#desk #winlayer .win.passwin::before,#desk #winlayer .win.passwin::after,#desk #winlayer .win.passwin > .win-h::before,#desk #winlayer .win.passwin > .win-h::after{display:none!important}
  /* 위 바 */
  #desk .topbar{left:12px!important;right:12px!important;top:0!important;height:41px!important;padding:0!important;border:0!important;border-radius:0!important;background:none!important;box-shadow:none!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;display:flex!important;align-items:center!important;gap:0!important}
  #desk .topbar .logo-dark{height:28px!important;padding:0 10px 0 5px!important;margin:0!important;gap:7px!important;border-radius:8px!important;background:#fff!important;border:1px solid #E1EAE6!important;box-shadow:0 2px 6px rgba(30,70,60,.06)!important;top:0!important;align-self:center!important}
  #desk .topbar .logo-dark::after{display:none!important}
  #desk .topbar .logo-ic{width:19px!important;height:19px!important;border-radius:50%!important;background:linear-gradient(160deg,#7FD6B2,#4DB88E)!important;border:0!important;color:#fff!important;display:grid!important;place-items:center}
  #desk .topbar .logo-ic svg{width:12px!important;height:12px!important;stroke:#fff!important;fill:none!important;stroke-width:3.2!important}
  #desk .topbar .logo-dark > div{display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:1px!important}
  #desk .topbar .logo-dark b{font:800 9.5px/1 var(--syf)!important;letter-spacing:.01em!important;color:var(--sy-ink)!important;background:none!important;-webkit-text-fill-color:currentColor!important}
  #desk .topbar .logo-dark small{display:block!important;font:800 6px/1 var(--syf)!important;letter-spacing:.06em!important;color:var(--sy-g)!important;margin:0!important;text-transform:uppercase}
  #desk .topnav{position:static!important;margin-left:22px!important;display:flex!important;gap:22px!important;height:41px!important;align-items:center!important}
  #desk .topnav button,#desk .topnav button[data-nav=home]{position:relative!important;display:flex!important;align-items:center!important;gap:4px!important;height:41px!important;width:auto!important;padding:0!important;border:0!important;border-radius:0!important;background:none!important;box-shadow:none!important;font:800 8.5px var(--syf)!important;letter-spacing:.06em!important;color:#4A5753!important}
  #desk .topnav button i{display:block!important;width:10px!important;height:10px!important;color:#4A5753!important}
  #desk .topnav button i svg{display:block!important;width:10px!important;height:10px!important;stroke-width:2!important}
  #desk .topnav button[data-nav=home]::before,#desk .topnav button[data-nav=home]::after{display:none!important}
  #desk .top-r{position:static!important;margin-left:auto!important;display:flex!important;align-items:center!important;gap:9px!important;height:41px!important}
  #desk .top-r .pill{display:flex!important;align-items:center!important;height:19px!important;padding:0 9px!important;gap:5px!important;border-radius:99px!important;background:#fff!important;border:1px solid #E1EAE6!important;box-shadow:none!important;font:800 7.5px var(--syf)!important;letter-spacing:.06em!important;color:var(--sy-ink)!important}
  #desk .top-r .pill b,#desk .top-r .pill span{font:inherit!important;color:inherit!important;-webkit-text-fill-color:currentColor!important}
  #desk .top-r .pill .led{width:5px!important;height:5px!important;border-radius:50%!important;background:#5CC79A!important;box-shadow:0 0 0 2px rgba(92,199,154,.18)!important}
  #desk .top-r .clock{position:static!important;display:block!important;font:700 8px var(--syf)!important;letter-spacing:.04em!important;color:#6F7D79!important;margin:0 4px 0 2px!important;height:auto!important}
  #desk .top-r .sq{display:grid!important;place-items:center!important;width:20px!important;height:20px!important;border-radius:6px!important;background:#fff!important;border:1px solid #E1EAE6!important;box-shadow:none!important;color:#4A5753!important}
  #desk .top-r .sq svg{width:9px!important;height:9px!important}
  /* 무대 */
  #desk .stage{position:absolute!important;inset:0!important;padding:0!important;overflow:visible!important}
  #desk .stage .leftcol{position:absolute!important;left:18px!important;top:54px!important;right:292px!important;bottom:68px!important;width:auto!important;height:auto!important;transform:none!important;zoom:1!important;margin:0!important;scale:none!important;translate:none!important;rotate:none!important}
  #desk .stage .leftcol .hz.ltop{position:absolute!important;left:0!important;top:0!important;right:0!important;width:auto!important;height:calc(100% - 576px)!important;min-height:190px!important;transform:none!important;margin:0!important;zoom:1!important}
  /* 위 배너 */
  .sy-hero{--syf:var(--syb);position:absolute;inset:0;border-radius:20px;background:radial-gradient(120% 140% at 20% 0%,#F6F9F1 0%,#EEF5EC 55%,#E7F1EA 100%);border:1px solid #DCE9E1;box-shadow:0 10px 26px rgba(30,70,60,.06),inset 0 1px 0 #fff;overflow:visible;font-family:var(--syf);color:var(--sy-ink)}
  .sy-hero::before{content:'';position:absolute;left:10px;top:10px;width:16px;height:16px;border:1.4px solid rgba(80,170,130,.45);border-right:0;border-bottom:0;border-radius:12px 0 0 0}
  .sy-hero::after{content:'';position:absolute;right:10px;bottom:10px;width:16px;height:16px;border:1.4px solid rgba(80,170,130,.45);border-left:0;border-top:0;border-radius:0 0 12px 0}
  .sy-tab{position:absolute;right:-1px;top:-1px;height:40px;padding:0 14px 0 18px;display:flex;align-items:center;gap:8px;background:#FEFEFE;border:1px solid #DCE9E1;border-top:0;border-right:0;border-radius:0 0 0 20px}
  .sy-tab::before{content:'';position:absolute;left:-21px;top:0;width:20px;height:20px;background:radial-gradient(circle at 0 100%,transparent 19px,#FEFEFE 19.5px);}
  .sy-pill{height:22px;padding:0 10px;display:inline-flex;align-items:center;gap:5px;border-radius:99px;background:#fff;border:1px solid #E1EAE6;font:800 7.5px var(--syf);letter-spacing:.04em;color:var(--sy-ink);white-space:nowrap}
  .sy-pill i{width:5px;height:5px;border-radius:50%;background:#5CC79A}
  .sy-line{display:none!important;position:absolute;left:46px;bottom:var(--lb,calc(80px + 101px * var(--hk,1)));width:67px;height:3px;border-radius:2px;background:#5BBE95}
  .sy-kick{position:absolute;left:46px;bottom:var(--kb,calc(56px + 101px * var(--hk,1)));line-height:12px;font:700 10.5px var(--syf);letter-spacing:.33em;color:#2E3B38;white-space:nowrap}
  .sy-title{position:absolute;left:44px;bottom:var(--tb,56px);font:900 calc(112px * var(--hk,1) * var(--tfit,1))/1 'Pretendard',sans-serif;transform-origin:0 100%;letter-spacing:-.045em;color:var(--sy-d);white-space:nowrap}
  .sy-pairrow{position:absolute;left:46px;bottom:var(--pb,19px);display:flex;align-items:center;gap:8px;white-space:nowrap}
  .sy-pair{font:700 21px/1 var(--syf);letter-spacing:.01em;color:#1F5546;margin-right:9px}
  .sy-chip{height:22px;padding:0 10px;display:inline-flex;align-items:center;border-radius:99px;border:1.3px solid #49A887;font:700 8.5px var(--syf);letter-spacing:.01em;color:#1F5546}
  .sy-r{position:absolute;right:34px;top:calc(40px + (100% - 40px - 146px) / 2);width:300px;height:146px}
  .sy-nav{position:absolute;right:2px;top:0;display:flex;align-items:center;gap:8px}
  .sy-nav button{width:14px;height:16px;padding:0;border:0;background:none;color:#24413A;font:400 16px/1 var(--syf);cursor:pointer;display:grid;place-items:center}
  .sy-nav button svg{width:11px;height:11px;stroke-width:2.6}
  .sy-dots{display:flex;gap:4px;align-items:center}
  .sy-dots i{width:5px;height:5px;border-radius:99px;background:#BFDCCF;transition:width .25s,background .25s}
  .sy-dots i.on{width:16px;background:#5BBE95}
  .sy-dd{position:absolute;left:2px;top:18px;font:800 72px/1 var(--syf);letter-spacing:-.025em;background:linear-gradient(180deg,#6FD0A6,#45B285);-webkit-background-clip:text;background-clip:text;color:transparent}
  .sy-next{position:absolute;left:0;right:0;top:88px;display:flex;justify-content:space-between;align-items:baseline;font:600 10.5px var(--syf);color:#6B7A76}
  .sy-next span b{font-weight:700;color:var(--sy-ink)}
  .sy-next > b{font:700 11px var(--syf);color:#3E9C77}
  .sy-bar{position:absolute;left:0;right:0;top:106.5px;height:3px;border-radius:99px;background:#DCEDE5;overflow:hidden}
  .sy-bar i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#9BE0C3,#6CCBA6)}
  .sy-sub{position:absolute;left:0;right:0;top:119px;display:flex;justify-content:space-between;font:500 9.5px var(--syf);letter-spacing:.03em;color:#7F8F8A}
  /* 아이콘 창 */
  #desk .stage .leftcol .apps-panel{position:absolute!important;left:0!important;right:0!important;top:auto!important;bottom:0!important;width:auto!important;height:556px!important;margin:0!important;padding:0!important;border-radius:18px!important;background:rgba(252,254,253,.94)!important;border:1px solid #E3ECE8!important;box-shadow:0 10px 24px rgba(30,70,60,.06)!important;transform:none!important;zoom:1!important;overflow:visible!important}
  #desk .apps-panel .panel-tab{position:absolute!important;left:22px!important;top:-21px!important;height:21px!important;padding:0 6px 0 10px!important;display:flex!important;align-items:center!important;gap:6px!important;border-radius:9px 9px 0 0!important;background:rgba(252,254,253,.94)!important;border:1px solid #E3ECE8!important;border-bottom:0!important;box-shadow:none!important}
  #desk .apps-panel .panel-tab i{display:none!important}
  #desk .apps-panel .panel-tab span{font:800 7.5px var(--syf)!important;letter-spacing:.14em!important;color:#1E2A27!important;background:none!important;-webkit-text-fill-color:currentColor!important}
  #desk .apps-panel .panel-tab .sy-cnt{display:none!important;min-width:15px;height:15px;padding:0 3px;box-sizing:border-box;border-radius:99px;background:#1E2A27;color:#fff;font:800 7px/15px var(--syf);text-align:center}
  #desk .stage .leftcol .apps{position:absolute!important;inset:26px 2px 20px!important;width:auto!important;height:auto!important;display:grid!important;grid-template-columns:repeat(12,minmax(0,1fr))!important;justify-content:stretch!important;grid-template-rows:repeat(6,auto)!important;align-content:space-between!important;gap:0 0!important;padding:0!important;margin:0!important;transform:none!important}
  #desk .apps .app-tile{display:flex!important;flex-direction:column!important;align-items:center!important;gap:calc(6px * var(--sy-ts,1))!important;padding:0!important;margin:0!important;background:none!important;border:0!important;font:600 calc(8.5px * var(--sy-ts,1))/1.15 var(--syf)!important;letter-spacing:-.01em!important;color:#4A5753!important;text-align:center!important;white-space:normal!important;word-break:keep-all!important;overflow-wrap:anywhere;max-width:100%;padding:0 2px!important;box-sizing:border-box}
  #desk .apps .app-tile .cjk{font:800 1em/1.15 'Noto Sans JP','IBM Plex Sans KR',sans-serif;letter-spacing:0}
  #desk .apps .app-ic.tilebox{width:calc(50px * var(--sy-ts,1))!important;height:calc(50px * var(--sy-ts,1))!important;border-radius:calc(11.5px * var(--sy-ts,1))!important;background:#fff!important;border:1px solid #E4ECE8!important;box-shadow:0 4px 10px rgba(30,70,60,.07),inset 0 -2px 0 rgba(30,70,60,.03)!important;color:#45AE86!important;display:grid!important;place-items:center!important}
  #desk .apps .app-ic.tilebox svg{width:calc(19px * var(--sy-ts,1))!important;height:calc(19px * var(--sy-ts,1))!important;stroke-width:1.7!important}
  #desk .apps .app-ic.tilebox.sy1{background:linear-gradient(160deg,#94E2C2,#6CCBA6)!important;border:0!important;color:#fff!important;box-shadow:0 6px 14px rgba(80,190,145,.28),inset 0 1px 0 rgba(255,255,255,.4)!important}
  #desk .apps .app-ic.tilebox.sy2{background:linear-gradient(160deg,#2C4A43,#1A2E29)!important;border:0!important;color:#fff!important;box-shadow:0 6px 14px rgba(20,45,40,.25)!important}
  #desk .apps .app-ic.tilebox.sy3{background:linear-gradient(160deg,#1E2422,#0E1110)!important;border:0!important;color:#fff!important;box-shadow:0 6px 14px rgba(10,20,18,.3)!important}
  #desk .apps .app-ic .badge{right:-6px!important;top:-6px!important;width:17px!important;height:17px!important;border-radius:50%!important;background:#F05A6A!important;box-shadow:0 0 0 2px #fff!important;font:800 8.5px/17px var(--syf)!important;color:#fff!important;text-align:center!important;padding:0!important}
  #desk .apps .app-ic .ndot{width:6px!important;height:6px!important;right:-2px!important;top:-2px!important;background:#5CC79A!important;box-shadow:0 0 0 2px #fff!important}
  /* 오른쪽 : 출입증 카드 */
  #desk #winlayer .win.passwin{border-radius:14px!important;background:#fff!important;border:1px solid #DCEAE4!important;box-shadow:0 12px 28px rgba(30,70,60,.10)!important;overflow:hidden!important}
  #desk #winlayer .win.passwin > .win-h{height:35px!important;padding:0 10px 0 14px!important;background:linear-gradient(90deg,#7BD3AE,#5DBF97)!important;border:0!important;border-radius:0!important;color:#fff!important}
  #desk #winlayer .win.passwin > .win-h .win-ic{display:grid!important;place-items:center!important;width:12px!important;height:12px!important;color:#fff!important;background:none!important;margin-right:6px!important}
  #desk #winlayer .win.passwin > .win-h .win-ic svg{width:12px!important;height:12px!important;stroke:#fff!important;stroke-width:3!important;fill:none!important}
  #desk #winlayer .win.passwin > .win-h{justify-content:flex-start!important}
  #desk #winlayer .win.passwin > .win-h .win-t{flex:1!important;text-align:left!important;margin:0!important;display:block!important;font:800 9.5px var(--syf)!important;letter-spacing:.14em!important;color:#fff!important;-webkit-text-fill-color:#fff!important;background:none!important}
  #desk #winlayer .win.passwin > .win-h .win-btns button[data-pair]{display:none!important}
  #desk #winlayer .win.passwin > .win-h .win-btns button{width:20px!important;height:20px!important;border-radius:6px!important;background:rgba(255,255,255,.28)!important;border:0!important;color:#fff!important;box-shadow:none!important}
  #desk #winlayer .win.passwin > .win-h .win-btns button svg{width:10px!important;height:10px!important;stroke:#fff!important}
  #desk #winlayer .win.passwin > .win-b{background:#fff!important;padding:0!important}
  #desk #winlayer .passwin .pass{padding:49px 16px 0!important;background:none!important;font-family:var(--syf)!important}
  #desk #winlayer .passwin .pass-top > div{display:block!important}
  #desk #winlayer .passwin .pass-top{display:flex!important;justify-content:space-between!important;align-items:center!important;margin:0 0 10px!important;padding:0!important}
  #desk #winlayer .passwin .pass-top span,#desk #winlayer .passwin .pass-top span .pcnt{display:block!important;font:800 9px var(--syf)!important;letter-spacing:.16em!important;color:#7F8F8A!important;-webkit-text-fill-color:#7F8F8A!important}
  #desk #winlayer .passwin .pass-top span .pcnt{display:none!important}
  #desk #winlayer .passwin .pass-top strong{display:none!important}
  #desk #winlayer .passwin .pass-top > b{display:block!important;font:800 9px var(--syf)!important;letter-spacing:.04em!important;color:#3FAE84!important}
  #desk #winlayer .passwin .pass-img{height:156px!important;margin:0!important;border-radius:10px!important;overflow:hidden!important}
  #desk #winlayer .passwin .pass-img .face.front > :first-child{background:linear-gradient(160deg,#CFEEE0,#9AD9BE 55%,#B9E5D2)!important}
  #desk #winlayer .passwin .pass-tag{display:none!important}
  #desk #winlayer .passwin .pass-meta{display:grid!important;grid-template-columns:1fr 1.15fr auto!important;gap:6px!important;margin:14px 0 0!important;padding:0!important;border:0!important}
  #desk #winlayer .passwin .pass-meta > div{display:flex!important;flex-direction:column!important;align-items:flex-start!important;border:0!important;padding:0!important;margin:0!important;background:none!important}
  #desk #winlayer .passwin .pass-meta small{display:block!important;font:800 7.5px var(--syf)!important;letter-spacing:.14em!important;color:#8A9894!important;margin-bottom:4px!important}
  #desk #winlayer .passwin .pass-meta b{font:800 11.5px var(--syf)!important;letter-spacing:0!important;color:#1E2A27!important;white-space:nowrap!important}
  #desk #winlayer .passwin .pass-meta .st-chip{display:inline-flex!important;align-items:center!important;gap:4px!important;height:16px!important;padding:0 8px!important;border-radius:99px!important;background:#6CCBA6!important;border:0!important;font:800 7.5px var(--syf)!important;letter-spacing:.08em!important;color:#fff!important}
  #desk #winlayer .passwin .pass-meta .st-chip::before{content:'';width:5px;height:5px;border-radius:50%;background:#fff}
  #desk #winlayer .passwin .ot-dbox{margin:18px 0 0!important;padding:0!important;border:0!important;background:none!important;box-shadow:none!important}
  #desk #winlayer .passwin .together{display:flex!important;justify-content:space-between!important;align-items:flex-end!important;padding:0!important;margin:0!important;border:0!important}
  #desk #winlayer .passwin .together small{font:700 8px var(--syf)!important;letter-spacing:.16em!important;color:#7F8F8A!important;margin-bottom:6px!important}
  #desk #winlayer .passwin .together b{font:800 50px/1 var(--syf)!important;letter-spacing:-.03em!important;background:linear-gradient(180deg,#6FD0A6,#45B285)!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important;-webkit-text-fill-color:transparent!important}
  #desk #winlayer .passwin .together b em{font:800 22px var(--syf)!important;font-style:normal!important;letter-spacing:0!important}
  #desk #winlayer .passwin .nextrow{display:flex!important;justify-content:space-between!important;margin:12px 0 0!important;padding:0!important;border:0!important}
  #desk #winlayer .passwin .nextrow b{font:800 9.5px var(--syf)!important;letter-spacing:.02em!important;color:#1E2A27!important}
  #desk #winlayer .passwin .nextrow span{font:700 9.5px var(--syf)!important;color:#3FAE84!important}
  #desk #winlayer .passwin .pbar{height:5px!important;margin:9px 0 0!important;padding:0!important;border:0!important;border-radius:99px!important;background:#E1EEE8!important}
  #desk #winlayer .passwin .pbar i{border-radius:99px!important;background:linear-gradient(90deg,#9BE0C3,#6CCBA6)!important}
  #desk #winlayer .passwin .nextsub{display:flex!important;justify-content:space-between!important;margin:8px 0 0!important;font:500 8.5px var(--syf)!important;letter-spacing:.04em!important;color:#8A9894!important}
  #desk #winlayer .passwin .nextsub span{color:inherit!important;font:inherit!important}
  #desk #winlayer .passwin .pass-perf{height:0!important;margin:14px 0 0!important;border:0!important;border-top:1px dashed #DCE8E2!important;background:none!important}
  #desk #winlayer .passwin .pass-perf::before,#desk #winlayer .passwin .pass-perf::after{display:none!important}
  #desk #winlayer .passwin .barcode{display:flex!important;align-items:center!important;gap:12px!important;padding:12px 16px 14px!important;margin:0 -16px!important;background:none!important;border:0!important}
  #desk #winlayer .passwin .barcode svg rect{fill:#1E2A27!important}
  #desk #winlayer .passwin .barcode span{font:800 8px var(--syf)!important;letter-spacing:.1em!important;color:#1E2A27!important}
  /* 오른쪽 : SPEC SHEET */
  #desk .stage .spec{display:block!important;position:absolute!important;right:19px!important;left:auto!important;top:auto!important;bottom:158px!important;width:238px!important;height:auto!important;margin:0!important;padding:0!important;border-radius:12px!important;background:#fff!important;border:1px solid #DCEAE4!important;box-shadow:0 10px 24px rgba(30,70,60,.07)!important;overflow:hidden!important;transform:none!important;font-family:var(--syf)!important;z-index:1}
  #desk .spec .sp-h{position:relative!important;padding:13px 14px 12px!important;margin:0!important;border:0!important;border-bottom:1px solid #E6EEEA!important;background:none!important}
  #desk .spec .sp-h small{display:block!important;font:800 5.5px var(--syf)!important;letter-spacing:.2em!important;color:#8A9894!important;margin:0 0 4px!important}
  #desk .spec .sp-h b{display:block!important;font:900 16px/1 var(--syf)!important;letter-spacing:-.01em!important;color:#121A18!important;background:none!important;-webkit-text-fill-color:currentColor!important}
  #desk .spec .sp-h b::after{content:'';display:block;width:24px;height:2.5px;border-radius:2px;background:#6CCBA6;margin-top:7px}
  #desk .spec .sp-ic{position:absolute!important;right:13px!important;top:14px!important;width:18px!important;height:18px!important;border-radius:50%!important;border:1.5px solid #6CCBA6!important;background:#fff!important;color:#5BBE95!important;display:grid!important;place-items:center!important}
  #desk .spec .sp-ic svg{width:11px!important;height:11px!important;stroke-width:3!important}
  #desk .spec .sp-g{display:grid!important;grid-template-columns:1fr 1fr!important;gap:0!important;padding:0!important;margin:0!important;border:0!important}
  #desk .spec .sp-g > div{padding:9px 12px 8px!important;border:0!important;border-bottom:1px solid #E6EEEA!important;margin:0!important;background:none!important}
  #desk .spec .sp-g > div:nth-child(odd){border-right:1px solid #E6EEEA!important}
  #desk .spec .sp-g > div:nth-last-child(-n+2){border-bottom:0!important}
  #desk .spec .sp-g small{display:block!important;font:800 5.5px var(--syf)!important;letter-spacing:.18em!important;color:#8A9894!important;margin:0 0 4px!important}
  #desk .spec .sp-g b{font:800 10px var(--syf)!important;letter-spacing:0!important;color:#121A18!important;-webkit-text-fill-color:currentColor!important;background:none!important}
  #desk .spec .sp-g b.blue{color:#3FAE84!important}
  /* 아래 바 */
  #desk .taskbar{left:12px!important;right:12px!important;bottom:8px!important;top:auto!important;height:41px!important;padding:0 10px 0 6px!important;border-radius:10px!important;background:rgba(250,252,251,.92)!important;border:1px solid #E1EAE6!important;box-shadow:none!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;display:flex!important;align-items:center!important;gap:8px!important}
  #desk .taskbar .start{order:0!important;display:flex!important;align-items:center!important;gap:5px!important;height:27px!important;padding:0 12px 0 9px!important;border-radius:8px!important;background:linear-gradient(160deg,#8ADBB9,#6CCBA6)!important;border:0!important;box-shadow:0 4px 10px rgba(80,190,145,.25)!important;font:800 9.5px var(--syf)!important;letter-spacing:.08em!important;color:#fff!important}
  #desk .taskbar .start i,#desk .taskbar .start i svg{display:block!important;width:11px!important;height:11px!important;color:#fff!important;stroke:#fff!important;fill:none!important;stroke-width:3!important}
  #desk .taskbar .start i svg *{stroke:#fff!important;fill:none!important}
  #desk .taskbar .start span{font:inherit!important;color:#fff!important;-webkit-text-fill-color:#fff!important}
  #desk .tasks{order:1!important;display:flex!important;gap:6px!important;flex:1!important;min-width:0!important}
  #desk .tasks .task{height:24px!important;padding:0 10px!important;border-radius:99px!important;background:#fff!important;border:1px solid #E1EAE6!important;box-shadow:none!important;display:flex!important;align-items:center!important;gap:5px!important;font:800 8.5px var(--syf)!important;letter-spacing:.04em!important;color:#1E2A27!important}
  #desk .tasks .task::before{content:'';width:5px;height:5px;border-radius:50%;background:#5CC79A;flex-shrink:0}
  #desk .tasks .task span,#desk .tasks .task svg,#desk .tasks .task i{font:inherit!important;color:inherit!important}
  #desk .tasks .task > i,#desk .tasks .task > svg{display:none!important}
  #desk .tb-r{order:2!important;display:flex!important;align-items:center!important;gap:7px!important;margin-left:auto!important}
  #desk .taskbar .mini{display:flex!important;align-items:center!important;gap:7px!important;width:auto!important;height:27px!important;padding:0 4px 0 3px!important;border-radius:8px!important;background:linear-gradient(90deg,#2F6A57,#4C9B7F)!important;border:0!important;box-shadow:0 4px 10px rgba(30,80,60,.2)!important}
  #desk .taskbar .mini-cover{display:block!important;width:21px!important;height:21px!important;border-radius:5px!important;flex-shrink:0;border:0!important;overflow:hidden!important}
  #desk .taskbar .mini-t{display:flex!important;flex-direction:column!important;align-items:flex-start!important;text-align:left!important;gap:1px!important;min-width:0!important;width:74px!important}
  #desk .taskbar .mini-t small{display:block!important;font:800 5.5px var(--syf)!important;letter-spacing:.14em!important;color:rgba(255,255,255,.65)!important}
  #desk .taskbar .mini-t b{font:800 8.5px var(--syf)!important;letter-spacing:0!important;color:#fff!important;-webkit-text-fill-color:#fff!important;text-transform:none!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  #desk .taskbar .mini-t b::after{content:none!important}
  #desk .taskbar .mini::after{content:'···';order:3;font:800 9px var(--syf);color:rgba(255,255,255,.75);letter-spacing:.05em}
  #desk .taskbar .mini-play{order:4;width:20px!important;height:20px!important;border-radius:6px!important;background:#fff!important;border:0!important;box-shadow:none!important;color:#1E2A27!important;display:grid!important;place-items:center!important}
  #desk .taskbar .mini-play svg{width:8px!important;height:8px!important;fill:#1E2A27!important;stroke:#1E2A27!important}
  #desk .taskbar .mini-play::after{display:none!important}
  #desk .tb-r > .sq{display:grid!important;place-items:center!important;width:22px!important;height:22px!important;border-radius:6px!important;background:#fff!important;border:1px solid #E1EAE6!important;box-shadow:none!important;color:#4A5753!important}
  #desk .tb-r > .sq svg{width:10px!important;height:10px!important}
  #desk .taskbar .credit{position:static!important;display:flex!important;flex-direction:column!important;align-items:flex-end!important;gap:2px!important;margin:0 0 0 6px!important;padding:0!important;height:auto!important}
  #desk .taskbar .credit small{font:700 6.5px var(--syf)!important;letter-spacing:.06em!important;color:#8A9894!important;-webkit-text-fill-color:#8A9894!important;background:none!important}
  #desk .taskbar .credit b{font:800 8px var(--syf)!important;letter-spacing:0!important;color:#1E2A27!important;-webkit-text-fill-color:#1E2A27!important;background:none!important}
  #desk .taskbar .credit b::before{content:none!important}
}
html:not(.sy-owner) .sy-write,html:not(.sy-owner) #desk .top-r .sq.sy-write{display:none!important}
@media (max-width:720px),(max-aspect-ratio:4/5) and (max-width:1100px),(max-height:599px){ .sy-only,#desk .top-r .sq.sy-only:not(.sy-write){display:none!important} .apps .app-tile:nth-child(n+33){display:none!important} .apps-panel .panel-tab .sy-cnt{display:none} }
`;
  document.head.appendChild(st);
  // 위 배너
  const lt = document.querySelector('.hz.ltop');
  lt && lt.insertAdjacentHTML('afterbegin', `<section class="sy-hero">
    <div class="sy-tab"><span class="sy-pill"><i></i>${esc(C.tab || '')}</span><span class="sy-pill sy-date"></span></div>
    <i class="sy-line"></i><div class="sy-kick">${esc(C.kicker || '')}</div><div class="sy-title">${titleHTML(C.title || '')}</div>
    <div class="sy-pairrow"><b class="sy-pair"></b>${(C.chips || []).map(t => `<span class="sy-chip">${esc(t)}</span>`).join('')}</div>
    <div class="sy-r"><div class="sy-nav"><button data-pair="-1" title="이전 페어">${ic('chevl')}</button><span class="sy-dots"></span><button data-pair="1" title="다음 페어">${ic('chevr')}</button></div>
      <div class="sy-dd"></div><div class="sy-next"></div><div class="sy-bar"><i></i></div><div class="sy-sub"></div></div></section>`);
  const dt = document.querySelector('.sy-date'); if (dt) { const d = new Date(); dt.textContent = `${MON[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`; }
  syHero();
  // 위 메뉴 · 아이콘 · 아래 바 글자
  $$('.sy-navt').forEach(e => e.textContent = C.nav || 'LUVINFO');
  $('.logo-dark .logo-ic') && ($('.logo-dark .logo-ic').innerHTML = ic('syplus'));
  $('.taskbar .start i') && ($('.taskbar .start i').innerHTML = ic('syplus'));
  $('.spec .sp-ic') && ($('.spec .sp-ic').innerHTML = ic('syplus'));
  $$('.win.passwin .win-ic').forEach(e => e.innerHTML = ic('syplus'));
  // 한자 · 한글 이름은 굵은 고딕으로 (영문 이름과 같은 굵기로 보이게)
  $$('.apps .app-tile, #launcher .app-tile').forEach(t => [...t.childNodes].forEach(n => { if (n.nodeType === 3 && /[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/.test(n.textContent)) { const b = document.createElement('span'); b.className = 'cjk'; b.textContent = n.textContent; n.replaceWith(b); } }));
  const tab = $('.apps-panel .panel-tab'); tab && tab.insertAdjacentHTML('beforeend', `<b class="sy-cnt">${$$('.apps-panel .apps .app-tile').length}</b>`);
  // 시안 아이콘 칸 색 (자리 순서대로) : 0 흰색 · 1 민트 · 2 진한 초록 · 3 검정
  const SYM = [0,0,1,3,0,0,0,0,1,2, 0,0,0,0,0,0,0,1,0,0, 0,0,0,0,1,0,2,0,0,0, 0,1,0,2,0,0,0,0,1,0, 2,0,0,0,0,1,0,2,0,0];
  $$('.apps-panel .apps .app-ic.tilebox').forEach((t, i) => { if (SYM[i]) t.classList.add('sy' + SYM[i]); });
  fit();
  syTheme();

  /* ---------- 휴대폰 : 지금 PC 홈(SYRINGE · 민트)과 같은 모양으로 ---------- */
  { const m7 = document.createElement('style'); m7.textContent = `
@media (max-width:720px),(max-aspect-ratio:4/5) and (max-width:1100px),(max-height:599px){
  html.m7,#desk{background-color:#FEFEFE!important;background-image:radial-gradient(rgba(70,100,90,.17) 1px,transparent 1.35px)!important;background-size:18px 18px!important}
  #desk .stage::before,#desk .stage::after{display:none!important}
  /* 위 바 : 로고 알약 · 아이콘 버튼 */
  #desk .topbar{left:0!important;right:0!important;top:0!important;height:62px!important;padding:0 12px!important;display:flex!important;align-items:center!important;gap:4px!important;background:rgba(254,254,254,.88)!important;-webkit-backdrop-filter:blur(12px)!important;backdrop-filter:blur(12px)!important;border:0!important;border-bottom:1px solid #E1EAE6!important;box-shadow:none!important}
  #desk .topbar::before{display:none!important}
  #desk .topbar .logo-dark{align-self:center!important;height:42px!important;padding:0 14px 0 6px!important;border-radius:14px!important;background:#fff!important;border:1px solid #E1EAE6!important;box-shadow:0 4px 12px rgba(30,70,60,.06)!important;display:flex!important;align-items:center!important;gap:8px!important}
  #desk .topbar .logo-dark .logo-ic{width:28px!important;height:28px!important;background:linear-gradient(160deg,#7FD6B2,#4DB88E)!important;display:grid!important;place-items:center!important}
  #desk .topbar .logo-dark .logo-ic svg{width:14px!important;height:14px!important;stroke:#fff!important;fill:none!important;stroke-width:3!important}
  #desk .topbar .logo-dark > div{flex-direction:column!important;align-items:flex-start!important;gap:3px!important}
  #desk .topbar .logo-dark b{font:800 13px/1 'Pretendard',sans-serif!important;color:#1E2A27!important;letter-spacing:-.01em!important}
  #desk .topbar .logo-dark small{font:800 8px/1 'Pretendard',sans-serif!important;letter-spacing:.08em!important;color:#3FAE84!important;text-transform:uppercase!important}
  #desk .topnav{position:static!important;order:1;margin-left:6px!important;height:62px!important;display:flex!important;align-items:center!important;gap:0!important}
  #desk .topnav button,#desk .topnav button[data-nav=home]{display:grid!important;place-items:center!important;width:38px!important;height:38px!important;padding:0!important;font-size:0!important;color:#4A5753!important;border:0!important;background:none!important}
  #desk .topnav button[data-nav=home]{display:none!important}
  #desk .topnav button.sy-only{display:grid!important}
  #desk .topnav button i,#desk .topnav button svg{display:block!important;width:18px!important;height:18px!important}
  #desk .topnav button::after,#desk .topnav button::before{display:none!important}
  #desk .topnav button .sy-navt{display:none!important}
  #desk .top-r{order:2;margin-left:auto!important;height:62px!important;gap:6px!important}
  #desk .top-r .pill,#desk .top-r .clock{display:none!important}
  #desk .top-r .sq[data-nav=launcher],#desk .top-r .sq.sy-write{display:grid!important;place-items:center!important;width:38px!important;height:38px!important;border-radius:12px!important;background:#fff!important;border:1px solid #E1EAE6!important;color:#4A5753!important;box-shadow:none!important}
  html:not(.sy-owner) #desk .top-r .sq.sy-write{display:none!important}
  #desk .top-r .sq svg{width:15px!important;height:15px!important}
  /* 내용 순서 : 배너 → 아이콘 → D-DAY 카드 */
  #desk .stage{top:62px!important;padding:14px 12px 104px!important;gap:16px!important}
  #desk .stage .keysec,#desk .h-otr,#desk .ho-title{display:none!important}
  #desk .stage .hz.ltop{order:1!important;height:auto!important;margin:0!important}
  #desk .stage .leftcol .apps-panel{order:2!important}
  #desk .stage .mobile-pass{order:3!important}
  /* 배너 */
  #desk .sy-hero{display:block!important;position:relative!important;inset:auto!important;border-radius:24px!important;background:radial-gradient(120% 140% at 20% 0%,#F6F9F1 0%,#EEF5EC 55%,#E7F1EA 100%)!important;border:1px solid #DCE9E1!important;box-shadow:0 10px 26px rgba(30,70,60,.07),inset 0 1px 0 #fff!important;padding:58px 20px 20px!important;color:#26332F;font-family:'Pretendard',sans-serif}
  #desk .sy-hero::before{content:'';position:absolute;left:12px;top:12px;width:16px;height:16px;border:1.4px solid rgba(80,170,130,.45);border-right:0;border-bottom:0;border-radius:12px 0 0 0}
  #desk .sy-tab{position:absolute;right:-1px;top:-1px;height:40px;padding:0 12px 0 16px;display:flex;align-items:center;gap:6px;background:#FEFEFE;border:1px solid #DCE9E1;border-top:0;border-right:0;border-radius:0 0 0 20px}
  #desk .sy-pill{height:24px;padding:0 10px;display:inline-flex;align-items:center;gap:5px;border-radius:99px;background:#fff;border:1px solid #E1EAE6;font:800 9px 'Pretendard',sans-serif;letter-spacing:.04em;color:#26332F;white-space:nowrap}
  #desk .sy-pill i{width:6px;height:6px;border-radius:50%;background:#5CC79A}
  #desk .sy-line{display:block;width:44px;height:3px;border-radius:2px;background:#5BBE95;margin:0 0 10px 2px}
  #desk .sy-kick{font:700 10px 'Pretendard',sans-serif;letter-spacing:.3em;color:#2E3B38;margin:0 0 6px 2px;white-space:nowrap}
  #desk .sy-title{font:900 var(--mt,62px)/1 'Pretendard',sans-serif;letter-spacing:-.045em;color:#1D4A40;white-space:nowrap;margin-left:-1px}
  #desk .sy-pairrow{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-top:12px}
  #desk .sy-pair{font:800 19px/1 'Pretendard',sans-serif;color:#1F5546;margin-right:4px;width:100%;margin-bottom:4px}
  #desk .sy-chip{height:24px;padding:0 10px;display:inline-flex;align-items:center;border-radius:99px;border:1.3px solid #49A887;font:700 9.5px 'Pretendard',sans-serif;color:#1F5546;background:rgba(255,255,255,.6)}
  #desk .sy-r{position:relative;margin-top:18px;padding-top:16px;border-top:1px dashed #CFE3D9;height:148px}
  #desk .sy-nav{position:absolute;right:0;top:20px;display:flex;align-items:center;gap:8px}
  #desk .sy-nav button{width:24px;height:24px;padding:0;border:1px solid #DCE9E1;border-radius:50%;background:#fff;color:#24413A;display:grid;place-items:center}
  #desk .sy-nav button svg{width:11px;height:11px;stroke-width:2.6}
  #desk .sy-dots{display:flex;gap:4px;align-items:center}
  #desk .sy-dots i{width:5px;height:5px;border-radius:99px;background:#BFDCCF}
  #desk .sy-dots i.on{width:14px;background:#5BBE95}
  #desk .sy-dd{position:absolute;left:0;top:12px;font:900 58px/1 'Pretendard',sans-serif;letter-spacing:-.035em;background:linear-gradient(180deg,#6FD0A6,#45B285);-webkit-background-clip:text;background-clip:text;color:transparent}
  #desk .sy-next{position:absolute;left:0;right:0;top:84px;display:flex;justify-content:space-between;align-items:baseline;font:600 11px 'Pretendard',sans-serif;color:#6B7A76}
  #desk .sy-next span b{font-weight:800;color:#26332F}
  #desk .sy-next > b{font:800 11.5px 'Pretendard',sans-serif;color:#3E9C77}
  #desk .sy-bar{position:absolute;left:0;right:0;top:106px;height:3px;border-radius:99px;background:#DCEDE5;overflow:hidden}
  #desk .sy-bar i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#9BE0C3,#6CCBA6)}
  #desk .sy-sub{position:absolute;left:0;right:0;top:120px;display:flex;justify-content:space-between;font:500 10px 'Pretendard',sans-serif;color:#7F8F8A}
  /* 아이콘 : 4칸 (참고한 홈페이지처럼) */
  #desk .stage .leftcol .apps-panel{margin-top:26px!important;border-radius:0 22px 22px 22px!important;background:rgba(252,254,253,.96)!important;border:1px solid #E3ECE8!important;box-shadow:0 10px 26px rgba(30,70,60,.06)!important;padding:22px 8px 20px!important}
  #desk .apps-panel .panel-tab{left:-1px!important;top:-25px!important;height:26px!important;padding:0 8px 0 14px!important;border-radius:12px 12px 0 0!important;background:rgba(252,254,253,.96)!important;border:1px solid #E3ECE8!important;border-bottom:0!important;gap:7px!important}
  #desk .apps-panel .panel-tab svg,#desk .apps-panel .panel-tab i{display:none!important}
  #desk .apps-panel .panel-tab span{font:800 9.5px 'Pretendard',sans-serif!important;letter-spacing:.16em!important;color:#1E2A27!important}
  #desk .apps-panel .panel-tab .sy-cnt{display:none!important;min-width:17px;height:17px;padding:0 4px;box-sizing:border-box;border-radius:99px;background:#1E2A27;color:#fff;font:800 8.5px/17px 'Pretendard',sans-serif;text-align:center}
  #desk .stage .leftcol .apps{grid-template-columns:repeat(6,minmax(0,1fr))!important;gap:16px 0!important}
  #desk .apps .app-tile:nth-child(n+33){display:flex!important}
  #desk .apps-panel{flex-direction:column!important}
  #desk .m7-mq{display:none!important;margin:18px 4px 0;height:30px;border-radius:99px;background:#fff;border:1px solid #E1EAE6;overflow:hidden;white-space:nowrap;font:800 10px/30px 'Pretendard',sans-serif;letter-spacing:.14em;color:#2F5A4E;-webkit-mask:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
  #desk .m7-mq > div{display:inline-flex;animation:mqRun 26s linear infinite}
  #desk .m7-mq span{padding-right:0}
}
@media (max-aspect-ratio:4/5) and (min-width:600px) and (max-width:1100px){
  #desk .stage .leftcol .apps{grid-template-columns:repeat(6,minmax(0,1fr))!important}
  #desk .apps .app-tile:nth-child(n+33){display:flex!important}
  #desk .stage{padding-left:max(16px,calc(50% - 380px))!important;padding-right:max(16px,calc(50% - 380px))!important}
  #desk #winlayer .win:not(.passwin){left:50%!important;right:auto!important;width:min(680px,100%)!important;margin-left:calc(min(680px,100%) / -2)!important}
}
@media (max-width:720px),(max-aspect-ratio:4/5) and (max-width:1100px),(max-height:599px){
  #desk .apps .app-tile{font:700 11.5px/1.2 'Pretendard',sans-serif!important;letter-spacing:-.01em!important;color:#2A3A36!important;gap:8px!important}
  #desk .apps .app-tile .cjk{font:800 1em/1.2 'Pretendard','Pretendard JP',sans-serif!important}
  #desk .apps .app-ic.tilebox{width:58px!important;height:58px!important;border-radius:17px!important;background:#fff!important;border:1px solid #E4ECE8!important;box-shadow:0 4px 10px rgba(30,70,60,.07),inset 0 -2px 0 rgba(30,70,60,.03)!important;color:#45AE86!important}
  #desk .apps .app-ic.tilebox svg{width:22px!important;height:22px!important;stroke-width:1.7!important}
  #desk .apps .app-ic.tilebox.sy1{background:linear-gradient(160deg,#94E2C2,#6CCBA6)!important;border:0!important;color:#fff!important;box-shadow:0 6px 14px rgba(80,190,145,.28),inset 0 1px 0 rgba(255,255,255,.4)!important}
  #desk .apps .app-ic.tilebox.sy2{background:linear-gradient(160deg,#2E5A4E,#1E3D35)!important;border:0!important;color:#fff!important;box-shadow:0 6px 14px rgba(30,61,53,.3)!important}
  #desk .apps .app-ic.tilebox.sy3{background:linear-gradient(160deg,#2A2E2D,#121414)!important;border:0!important;color:#fff!important;box-shadow:0 6px 14px rgba(0,0,0,.25)!important}
  #desk .apps .app-ic .badge{background:#E5534B!important}
}
@media (max-width:720px){
  #desk .stage .leftcol .apps-panel{padding:20px 4px 18px!important}
  #desk .apps .app-tile{font:700 9.5px/1.2 'Pretendard',sans-serif!important;gap:6px!important;letter-spacing:-.02em!important;word-break:keep-all}
  #desk .apps .app-ic.tilebox{width:46px!important;height:46px!important;border-radius:14px!important}
  #desk .apps .app-ic.tilebox svg{width:19px!important;height:19px!important}
  #desk .apps .app-ic .badge{width:16px!important;height:16px!important;font-size:9px!important;right:-5px!important;top:-5px!important}
}
@media (max-width:720px),(max-aspect-ratio:4/5) and (max-width:1100px),(max-height:599px){
  /* D-DAY 카드 */
  #desk .stage .mobile-pass{border-radius:24px!important;background:#fff!important;border:1px solid #E1EAE6!important;box-shadow:0 10px 26px rgba(30,70,60,.07)!important}
  /* 아래 바 : 떠 있는 알약 */
  #desk .taskbar{left:10px!important;right:10px!important;bottom:10px!important;height:60px!important;padding:0 8px 0 8px!important;border-radius:20px!important;background:rgba(255,255,255,.9)!important;-webkit-backdrop-filter:blur(14px)!important;backdrop-filter:blur(14px)!important;border:1px solid #E1EAE6!important;box-shadow:0 10px 30px rgba(30,70,60,.14)!important;align-items:center!important}
  #desk .taskbar .credit{display:none!important}
  #desk .mini{height:44px!important;padding:0 14px 0 4px!important;border-radius:14px!important;background:linear-gradient(160deg,#4DB88E,#2F9C74)!important;gap:10px!important}
  #desk .mini-play{width:34px!important;height:34px!important;border-radius:11px!important;background:#fff!important;color:#2F9C74!important}
  #desk .mini-play svg{fill:#2F9C74!important;color:#2F9C74!important;stroke:#2F9C74!important}
  #desk .mini-t{flex-direction:column!important;align-items:flex-start!important;gap:2px}
  #desk .mini-t small{display:block!important;font:800 8px 'Pretendard',sans-serif!important;letter-spacing:.14em;color:rgba(255,255,255,.75)!important}
  #desk .mini-t b{font:800 12.5px 'Pretendard',sans-serif!important;color:#fff!important;text-transform:none!important}
  #desk .mini-t b::after{content:''!important}
  #desk .mini-eq i{background:#fff!important}
  #desk .st-dd{height:36px!important;padding:0 14px!important;border-radius:12px!important;background:#EAF6F0!important;color:#2F9C74!important;font:900 13px 'Pretendard',sans-serif!important;border:1px solid #D3EBDF!important}
}`; document.head.appendChild(m7); }

  // 움직임 준비 : 아이콘 차례 번호 · 휴대폰 흐르는 글자 · D+ 숫자 올라가기 · 하트 톡
  $$('.apps-panel .apps .app-tile').forEach((t, i) => t.style.setProperty('--i', i));
  { const ap = $('.apps-panel'), mq = `${C.marquee || `THE CLINICAL GUIDING PROTOCOL ✦ ${UN(S.pair?.a || 'PURE')} × ${UN(S.pair?.b || 'UXI')} ✦ RUNNING AWAY IS NOT ALLOWED ✦ ${UN(S.venue || 'ARCH MEDICAL CENTER')} ✦ `}`;
    if (ap && !ap.querySelector('.m7-mq')) ap.insertAdjacentHTML('beforeend', `<div class="m7-mq"><div><span>${esc(UN(mq)).repeat(3)}</span><span>${esc(UN(mq)).repeat(3)}</span></div></div>`); }
  const countUp = () => { const el = $('.sy-dd'); if (!el) return; const m = el.textContent.match(/(\d+)/); if (!m) return; const to = +m[1], pre = el.textContent.slice(0, m.index), t0 = performance.now(), D = 1300;
    const st = now => { const k = Math.min(1, (now - t0) / D), e = 1 - Math.pow(1 - k, 3); el.textContent = pre + Math.round(to * e); if (k < 1) requestAnimationFrame(st); }; requestAnimationFrame(st); };
  if (document.body.classList.contains('entered')) countUp(); else new MutationObserver((ms, o) => { if (document.body.classList.contains('entered')) { o.disconnect(); setTimeout(countUp, 350); } }).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  document.addEventListener('click', e => { const h = e.target.closest('[data-open="dday"],.dz-heart,[data-icon="heart"]'); if (!h) return; const t = h.querySelector('.app-ic,svg') || h; t.classList.remove('hrt-pop'); void t.offsetWidth; t.classList.add('hrt-pop'); });
  // 휴대폰 배너 큰 글씨 : 카드 너비에 꽉 차게
  const mFit = () => { if (!isMobile()) return; const h = $('.sy-hero'), t = h && h.querySelector('.sy-title'); if (!t) return; t.style.setProperty('--mt', '62px'); const W = h.clientWidth - 40, w = t.scrollWidth; t.style.setProperty('--mt', Math.min(innerWidth > 600 ? 140 : 84, 62 * W / Math.max(1, w)).toFixed(1) + 'px'); };
  mFit(); addEventListener('resize', mFit); document.fonts && document.fonts.ready.then(mFit); setTimeout(mFit, 500);
})();
/* ---------- 열리는 창들도 SYRINGE 색으로 (청록 → 민트 초록) ----------
   창 모양 · 크기 · 배치는 그대로 두고 색만 바꿔요. 사진(img)은 건드리지 않아요. 입장화면 · 휴대폰 화면은 그대로 */
function syMapHex(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  if (d < .04) return null;
  const s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn);
  let h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; if (h < 0) h += 360;
  if (h < 150 || h > 214) return null;   // 청록 계열만
  const h2 = 155 + (h - 187) * .5, s2 = s * (s > .5 ? .72 : .85);
  const c = (1 - Math.abs(2 * l - 1)) * s2, x = c * (1 - Math.abs((h2 / 60) % 2 - 1)), m = l - c / 2;
  const [R, G, B] = h2 < 180 ? [0, c, x] : [0, x, c];
  return [Math.round((R + m) * 255), Math.round((G + m) * 255), Math.round((B + m) * 255)];
}
function syMapStr(v) {
  if (!v || !/#|rgb/.test(v)) return v;
  v = v.replace(/#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3})\b/gi, (all, hx) => {
    if (hx.length === 3) hx = hx.split('').map(c => c + c).join('');
    const n = [0, 2, 4].map(i => parseInt(hx.substr(i, 2), 16)), o = syMapHex(...n); if (!o) return all;
    return '#' + o.map(x => x.toString(16).padStart(2, '0')).join('') + (hx.length === 8 ? hx.substr(6) : '');
  });
  return v.replace(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)\s*([,/]\s*[\d.]+%?)?\s*\)/gi, (all, r, g, b, a) => {
    const o = syMapHex(+r, +g, +b); if (!o) return all;
    return a ? `rgba(${o.join(',')},${a.replace(/^[,/]\s*/, '')})` : `rgb(${o.join(',')})`;
  });
}
function syTheme() {
  if (!document.querySelector('.sy-hero')) return;
  const SKIP = /intro|\.en-|\.en2|\.sy-|#desk \.(topbar|taskbar|stage|apps|tasks|tb-r|top-r|topnav|spec)|keysec|ks-|k-duo|kd-|mobile-pass/;
  const walk = (rules, inMob) => { for (const r of rules) {
    if (r.cssRules && r.media) { walk(r.cssRules, inMob || /max-width:\s*720px/.test(r.media.mediaText)); continue; }
    if (r.cssRules && !r.style) { walk(r.cssRules, inMob); continue; }
    if (!r.style || !r.selectorText) continue;
    const sel = r.selectorText;
    if (inMob) { if (/intro|\.en-|\.en2|\.sy-|\.m7/.test(sel)) continue; }
    else if (SKIP.test(sel) && !/\.win|#winlayer|launcher|toast/.test(sel)) continue;
    for (let i = 0; i < r.style.length; i++) { const p = r.style[i], v = r.style.getPropertyValue(p), n = syMapStr(v); if (n !== v) r.style.setProperty(p, n, r.style.getPropertyPriority(p)); }
  } };
  for (const sh of document.styleSheets) { let rs; try { rs = sh.cssRules; } catch (e) { continue; } if (rs) walk(rs, false); }
  // 창 안에서 글자 · 그림이 직접 쓰는 색 (style · fill · stroke)
  const fix = el => { if (!(el instanceof Element) || el.closest('.sy-hero,.apps-panel')) return;
    [el, ...el.querySelectorAll('[style],[fill],[stroke],stop')].forEach(e => { if (e.closest('.rs-blk,.fl-team,.sr-yr,.sr-info,[data-keepc]')) return;   // ARCH 그룹 · 속성 색은 그대로
      const st = e.getAttribute('style'); if (st) { const n = syMapStr(st); if (n !== st) e.setAttribute('style', n); }
      ['fill', 'stroke', 'stop-color'].forEach(a => { const v = e.getAttribute(a); if (v) { const n = syMapStr(v); if (n !== v) e.setAttribute(a, n); } });
    }); };
  ['#winlayer', '#launcher', '#toasts'].forEach(q => { const host = $(q); if (!host) return; fix(host);
    new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(fix))).observe(host, { childList: true, subtree: true }); });
}
/* ---------- 화면에서 직접 바꾼 글자 (data.js 의 textOverrides) ----------
   ✎ EDIT 에서 아무 글자나 눌러 바꾸면 { 원래 글자: 바꾼 글자 } 로 저장돼서 모두에게 똑같이 보여요 */
const TOV = (RAW.textOverrides && typeof RAW.textOverrides === 'object' && !Array.isArray(RAW.textOverrides)) ? RAW.textOverrides : {};
RAW.textOverrides = TOV;
const tovSkip = n => { const p = n.parentElement; return !p || !!p.closest('script,style,textarea,input,select,.sye,.sye-ebar,.sye-tbox,.sye-pop'); };
const tovApply = root => {
  if (!root || !Object.keys(TOV).length) return;
  if (root.nodeType === 3) root = root.parentElement; if (!root) return;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), list = []; let n;
  while ((n = w.nextNode())) list.push(n);
  list.forEach(n => { const t = n.textContent, k = t.trim(); if (k && Object.prototype.hasOwnProperty.call(TOV, k) && TOV[k] !== k && !tovSkip(n)) n.textContent = t.replace(k, TOV[k]); });
};
tovApply(document.body);
new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(x => tovApply(x)))).observe(document.body, { childList: true, subtree: true });
/* ---------- 클릭 효과 : 반짝(민트) + 효과음 (작게~중간) ----------
   · SFX_VOL : 효과음 크기 (0 = 끄기 · 0.2 = 작게~중간 · 0.4 = 꽤 커요)
   · 앱 아이콘 · 창 열기 = '띠링' / 그 밖의 클릭 = '딸깍' (파일 없이 브라우저에서 만들어요) */
const SFX_VOL = 0.2, FX_ON = true;
const SFX = (() => {
  let ac = null, noise = null;
  const ctx = () => { if (!ac) { const A = window.AudioContext || window.webkitAudioContext; if (!A) return null; try { ac = new A(); } catch (e) { return null; } } if (ac.state === 'suspended') ac.resume(); return ac; };
  const nz = a => { if (noise) return noise; const n = Math.floor(a.sampleRate * .05); noise = a.createBuffer(1, n, a.sampleRate); const d = noise.getChannelData(0); for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 4); return noise; };
  const tick = (a, t, v) => {   // 딸깍 : 아주 짧은 마찰음 + 떨어지는 몸통음
    const s = a.createBufferSource(), hp = a.createBiquadFilter(), g = a.createGain(); s.buffer = nz(a); hp.type = 'highpass'; hp.frequency.value = 1800;
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0001, t + .012); s.connect(hp); hp.connect(g); g.connect(a.destination); s.start(t); s.stop(t + .02);
    const o = a.createOscillator(), g2 = a.createGain(); o.type = 'triangle'; o.frequency.setValueAtTime(1350 * (1 + (Math.random() - .5) * .1), t); o.frequency.exponentialRampToValueAtTime(520, t + .02);
    g2.gain.setValueAtTime(v * .55, t); g2.gain.exponentialRampToValueAtTime(.0001, t + .024); o.connect(g2); g2.connect(a.destination); o.start(t); o.stop(t + .03); };
  const bell = (a, t, f, v, dur) => {   // 띠링 : 부드럽게 울리고 잔잔하게 사라지는 소리
    const lp = a.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2600; lp.connect(a.destination);
    [[1, 1], [2, .12]].forEach(([m, k]) => { const o = a.createOscillator(), g = a.createGain(); o.type = 'sine'; o.frequency.setValueAtTime(f * m, t);
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v * k, t + .025); g.gain.exponentialRampToValueAtTime(.0001, t + dur / m); o.connect(g); g.connect(lp); o.start(t); o.stop(t + dur + .05); }); };
  const go = fn => { if (!SFX_VOL) return; const a = ctx(); if (a) fn(a, a.currentTime + .005); };
  const tear = (a, t, v) => {   // 찌익 : 종이가 찢어지는 짧은 소리 (거친 잡음이 아래로 훑어 내려가요)
    const n = Math.floor(a.sampleRate * .32), buf = a.createBuffer(1, n, a.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) { const k = i / n, grain = Math.random() < .35 ? 1 : .25; d[i] = (Math.random() * 2 - 1) * grain * Math.pow(1 - k, 1.6) * Math.min(1, k * 40); }
    const s = a.createBufferSource(), bp = a.createBiquadFilter(), g = a.createGain(); s.buffer = buf; bp.type = 'bandpass'; bp.Q.value = 1.4;
    bp.frequency.setValueAtTime(4200, t); bp.frequency.exponentialRampToValueAtTime(1300, t + .3); g.gain.value = v;
    s.connect(bp); bp.connect(g); g.connect(a.destination); s.start(t); };
  const live = () => ac && ac.state === 'running';
  return { wake: () => SFX_VOL && ctx(),
    hover: () => go((a, t) => tick(a, t, SFX_VOL * .45)),
    key: () => go((a, t) => tick(a, t, SFX_VOL * .35)),
    wrong: () => go((a, t) => { [0, .13].forEach(d => { const o = a.createOscillator(), g = a.createGain(), lp = a.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900; o.type = 'triangle'; o.frequency.setValueAtTime(330, t + d); o.frequency.exponentialRampToValueAtTime(220, t + d + .12); g.gain.setValueAtTime(0, t + d); g.gain.linearRampToValueAtTime(SFX_VOL * .5, t + d + .01); g.gain.exponentialRampToValueAtTime(.0001, t + d + .16); o.connect(lp); lp.connect(g); g.connect(a.destination); o.start(t + d); o.stop(t + d + .2); }); }),
    unlock: () => go((a, t) => { tick(a, t, SFX_VOL); tick(a, t + .07, SFX_VOL * .8); bell(a, t + .16, 1046.5, SFX_VOL * .2, 1.1); bell(a, t + .28, 1568, SFX_VOL * .15, 1.4); }),
    ready: () => { if (live()) go((a, t) => { bell(a, t, 1174.7, SFX_VOL * .14, .8); }); },
    tear: () => go((a, t) => { tear(a, t, SFX_VOL * 1.1); bell(a, t + .18, 784, SFX_VOL * .2, 1.2); bell(a, t + .3, 1174.7, SFX_VOL * .16, 1.4); bell(a, t + .42, 1568, SFX_VOL * .12, 1.6); }),
    tap: () => go((a, t) => tick(a, t, SFX_VOL * .9)), open: () => go((a, t) => { bell(a, t, 880, SFX_VOL * .22, .9); bell(a, t + .11, 1318.5, SFX_VOL * .17, 1.1); }) };
})();
// 눈송이 효과 : 얇은 링 + 작은 눈 결정이 흩날려요 (가운데 큰 눈송이는 없어요)
const FX = (() => {
  if (!FX_ON) return { burst() {} };
  const cv = document.createElement('canvas'); cv.setAttribute('aria-hidden', 'true'); cv.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:2147483000';
  document.body.appendChild(cv); const c = cv.getContext('2d'); let W = 0, H = 0, raf = 0, last = 0; const L = [], DUR = .7;
  const size = () => { const D = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; cv.width = W * D; cv.height = H * D; c.setTransform(D, 0, 0, D, 0, 0); }; size(); addEventListener('resize', size);
  const MINT = '#6CC9A3', SOFT = '#A6E6CF', ICE = '#CFF3EC', out = k => 1 - Math.pow(1 - k, 3), back = k => 1 + 3.2 * Math.pow(k - 1, 3) + 2.2 * Math.pow(k - 1, 2);
  // 눈송이 모양 : 가지 6개 · 가지마다 V 모양 잔가지 2쌍 · 끝에 작은 마름모
  const flake = (r, lw, col, fill) => { c.lineCap = 'round'; c.lineJoin = 'round'; c.lineWidth = lw; c.strokeStyle = col;
    for (let i = 0; i < 6; i++) { c.save(); c.rotate(i * Math.PI / 3); c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -r);
      [[.38, .24], [.66, .17]].forEach(([p, l]) => { c.moveTo(0, -r * p); c.lineTo(-r * l, -r * (p + l * .95)); c.moveTo(0, -r * p); c.lineTo(r * l, -r * (p + l * .95)); });
      c.stroke(); const d = r * .1; c.beginPath(); c.moveTo(0, -r - d); c.lineTo(d * .7, -r); c.lineTo(0, -r + d); c.lineTo(-d * .7, -r); c.closePath(); c.fillStyle = col; c.fill(); c.restore(); }
    c.beginPath(); for (let i = 0; i < 6; i++) { const t = i * Math.PI / 3; c[i ? 'lineTo' : 'moveTo'](Math.sin(t) * r * .2, -Math.cos(t) * r * .2); } c.closePath(); c.fillStyle = fill; c.fill(); c.stroke(); };
  const mini = (r, col) => { c.lineCap = 'round'; c.lineWidth = Math.max(.8, r * .28); c.strokeStyle = col; c.beginPath(); for (let i = 0; i < 3; i++) { const t = i * Math.PI / 3; c.moveTo(Math.sin(t) * r, -Math.cos(t) * r); c.lineTo(-Math.sin(t) * r, Math.cos(t) * r); } c.stroke(); };
  const draw = f => { const k = Math.min(1, f.t / DUR), s = f.s; c.save(); c.translate(f.x, f.y);
    // 얇은 얼음 링
    c.globalAlpha = (1 - k) * .8; c.beginPath(); c.arc(0, 0, (6 + 26 * out(k)) * s, 0, Math.PI * 2); c.lineWidth = Math.max(.01, 1.6 * s * (1 - k)); c.strokeStyle = SOFT; c.stroke();
    // 흩날리는 작은 눈 결정 (밖으로 퍼지다 살짝 내려앉아요)
    f.bits.forEach((b, i) => { const p = out(k), d = (10 + b.d * p) * s, x = Math.cos(b.a) * d, y = Math.sin(b.a) * d + 10 * s * k * k;
      c.save(); c.globalAlpha = Math.max(0, 1 - Math.pow(k, 1.6)) * (.75 + .25 * Math.sin(k * 18 + i)); c.translate(x, y); c.rotate(b.rot + k * b.spin);
      if (b.dot) { c.beginPath(); c.arc(0, 0, b.r * s * .55, 0, Math.PI * 2); c.fillStyle = b.col; c.fill(); } else mini(b.r * s * (1 - k * .3), b.col); c.restore(); });
    c.restore(); };
  const loop = now => { const dt = Math.max(0, Math.min(.05, (now - last) / 1000)); last = now; c.clearRect(0, 0, W, H);
    for (let i = L.length - 1; i >= 0; i--) { L[i].t += dt; if (L[i].t >= DUR) L.splice(i, 1); else draw(L[i]); } raf = L.length ? requestAnimationFrame(loop) : 0; if (!raf) c.clearRect(0, 0, W, H); };
  const mk = () => { const r0 = Math.random() * Math.PI * 2; return Array.from({ length: 7 }, (_, i) => ({ a: r0 + i * Math.PI * 2 / 7 + (Math.random() - .5) * .5, d: 16 + Math.random() * 12, r: 2.2 + Math.random() * 1.4, rot: Math.random() * Math.PI, spin: (Math.random() - .5) * 4, dot: i % 3 === 2, col: i % 2 ? MINT : SOFT })); };
  return { burst(x, y, s) { L.push({ x, y, s: s || 1, t: 0, r: Math.random() * Math.PI / 3, bits: mk() }); if (!raf) { last = performance.now(); raf = requestAnimationFrame(loop); } }, _draw: (f) => draw(f), _mk: mk, _c: () => c };
})();
// 끌기(창 옮기기 등)는 빼고, 제자리 클릭 · 탭에만
let fxDown = null;
addEventListener('pointerdown', e => { fxDown = e.button === 0 ? { x: e.clientX, y: e.clientY } : null; if (fxDown) SFX.wake(); }, true);
addEventListener('pointerup', e => { if (!fxDown) return; const moved = Math.hypot(e.clientX - fxDown.x, e.clientY - fxDown.y) >= 8; fxDown = null; if (moved) return;
  try { const t = e.target, big = !!(t && t.closest && t.closest('.app-tile,[data-open],[data-ci],.gx-enter,.en-hit'));
    FX.burst(e.clientX, e.clientY, big ? 1.5 : 1); if (t.closest && t.closest('#intro .gx-enter')) return; big ? SFX.open() : SFX.tap(); } catch (err) {} }, true);
/* =========================================================
   ✎ EDIT (나만 보이는 편집) — 주소 끝에 ?owner 를 한 번 붙여서 들어오면 이 브라우저에선 계속 보여요 (?guest 로 끄기)
   · 사진 자리를 누르면 사진 넣기 / 바꾸기 / 빼기 (이 브라우저에 저장)
   · [글 수정] 으로 글 · 목록 고치기 (이 브라우저에 저장)
   · [홈페이지에 저장] → 글(data.js)과 사진(media/)이 GitHub에 바로 저장돼서 1~10분 뒤 모두에게 보여요
   · [JS 내보내기] → 예전처럼 파일로 받기 (백업용)
   ========================================================= */
(function syeOwner() {
  if (!OWNER) return;
  const clone = o => JSON.parse(JSON.stringify(o));
  let ED = clone(RAW), dirty = false;
  const LABEL = { textOverrides: '화면에서 직접 바꾼 글자 (원래 글자 → 바꾼 글자)', imgPos: '사진 위치 · 크기 (사진 자리에서 조절)', brand: '로고 · 이름', clinic: '위 배너 (SYRINGE)', online: '위 바 알약 글자', credit: '아래 바 오른쪽 글자', spec: 'SPEC SHEET 카드', pairs: '페어 목록 (오른쪽 카드 · 배너 D+)', pair: '기본 페어 (D-DAY 알림)', pairLabels: '페어 카드 작은 글자', venue: '페어 카드 위 제목', passLabel: '페어 카드 작은 제목', characters: '캐릭터 정리 창 (東京青藍大学 · ARCH · FRONTLINE · ETC.)', members: 'MEMBER 프로필', memberOpen: '처음 보이는 MEMBER 번호', extraApps: '아이콘 창 내용 (Gallery · About · Mail …)', bgm: '음악 (Player · 아래 BGM)', chat: 'TALK 메신저 (대화방)', toasts: '자동 알림', memo: 'Memo', records: 'Records (CATEGORY)', notice: 'Notice', monitor: 'Stage Monitor', pedal: 'Pedal Board', neighbors: 'Neighbors', internet: 'Internet', game: 'Game', links: 'Link Hub', intro: '입장화면', title: '(예전) 큰 제목', heroTicket: '(예전) 티켓', studio: '(예전) 글자', residence: '(예전) 글자', footer: '(예전) 글자', marquee: '(예전) 흐르는 글자', home: '(예전/휴대폰) 메인 글자', blueprint: '(예전) 설계도' };
  const GROUPS = [['메인 화면', ['clinic', 'brand', 'online', 'credit', 'spec']], ['페어 · D-DAY', ['pairs', 'pair', 'pairLabels', 'venue', 'passLabel']], ['캐릭터', ['characters', 'members', 'memberOpen']], ['아이콘 창', ['extraApps']], ['음악', ['bgm']], ['메신저 · 알림', ['chat', 'toasts']], ['글 · 기록', ['memo', 'records', 'notice']], ['기타 창', ['monitor', 'pedal', 'neighbors', 'internet', 'game', 'links']], ['입장화면', ['intro']], ['예전 글자', ['title', 'heroTicket', 'studio', 'residence', 'footer', 'marquee', 'home', 'blueprint']]];
  const used = new Set(GROUPS.flatMap(g => g[1])), rest = Object.keys(ED).filter(k => !used.has(k)); if (rest.length) GROUPS.push(['그 밖에', rest]);
  const IMGK = /^(image|imageBack|img|cover|photo|avatar|banner|thumb|passImage|bg|face|profile|pic|poster)$/i;
  const isImgVal = v => typeof v === 'string' && (/^data:image\//.test(v) || /^https?:\/\/.+\.(png|jpe?g|gif|webp|avif|svg)(\?.*)?$/i.test(v) || /^(https?:)?\/\/(i\.)?(imgur|pbs\.twimg|postfiles|blogfiles|i\.pinimg|cdn\.discordapp|media\.discordapp|lh\d\.googleusercontent)/i.test(v));
  const css = document.createElement('style');
  css.textContent = `
.sye-fab{position:fixed;right:14px;bottom:62px;z-index:99990;height:38px;padding:0 16px;border-radius:99px;border:0;background:linear-gradient(160deg,#8ADBB9,#4DB88E);color:#fff;font:800 13px 'Inter','IBM Plex Sans KR',sans-serif;letter-spacing:.04em;box-shadow:0 8px 20px rgba(40,120,90,.3);cursor:pointer}
.sye-bar{position:fixed;left:50%;top:8px;transform:translateX(-50%);z-index:99990;max-width:calc(100vw - 24px);padding:7px 14px;border-radius:99px;background:#1E2A27;color:#fff;font:600 11.5px 'IBM Plex Sans KR',sans-serif;box-shadow:0 6px 16px rgba(0,0,0,.18);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sye-bar b{color:#8ADBB9}
.sye{position:fixed;top:0;right:0;bottom:0;width:min(460px,100vw);z-index:99995;background:#F7FAF9;border-left:1px solid #DCE9E1;box-shadow:-14px 0 40px rgba(20,50,40,.16);display:flex;flex-direction:column;font:500 13px/1.45 'IBM Plex Sans KR','Inter',sans-serif;color:#1E2A27;transform:translateX(105%);transition:transform .28s ease}
.sye.on{transform:none}
.sye *{box-sizing:border-box}
.sye-h{padding:14px 16px 10px;border-bottom:1px solid #E1EAE6;background:#fff}
.sye-h h3{margin:0;font:800 16px 'Inter','IBM Plex Sans KR',sans-serif;display:flex;align-items:center;gap:8px}
.sye-h h3 i{width:22px;height:22px;border-radius:50%;background:#6CCBA6;color:#fff;display:grid;place-items:center;font-style:normal;font-size:15px}
.sye-h p{margin:6px 0 0;font-size:11.5px;color:#6B7A76}
.sye-x{position:absolute;right:12px;top:12px;width:30px;height:30px;border-radius:8px;border:1px solid #E1EAE6;background:#fff;font-size:16px;cursor:pointer;color:#4A5753}
.sye-tabs{display:flex;gap:6px;overflow-x:auto;padding:10px 12px;border-bottom:1px solid #E1EAE6;background:#fff;scrollbar-width:none}
.sye-tabs button{flex:none;height:30px;padding:0 12px;border-radius:99px;border:1px solid #DCE9E1;background:#fff;font:700 12px 'IBM Plex Sans KR',sans-serif;color:#4A5753;cursor:pointer}
.sye-tabs button.on{background:#1E2A27;border-color:#1E2A27;color:#fff}
.sye-body{flex:1;overflow:auto;padding:12px 14px 30px;-webkit-overflow-scrolling:touch}
.sye-sec{margin-bottom:12px;border:1px solid #E1EAE6;border-radius:12px;background:#fff;overflow:hidden}
.sye-sec > summary,.sye-obj > summary{list-style:none;cursor:pointer;padding:11px 13px;font:800 13px 'IBM Plex Sans KR',sans-serif;display:flex;align-items:center;gap:8px}
.sye-sec > summary::-webkit-details-marker,.sye-obj > summary::-webkit-details-marker{display:none}
.sye-sec > summary::before,.sye-obj > summary::before{content:'▸';color:#5BBE95;font-size:11px;transition:transform .2s}
.sye-sec[open] > summary::before,.sye-obj[open] > summary::before{transform:rotate(90deg)}
.sye-sec > summary small{margin-left:auto;font:600 10.5px 'Inter',sans-serif;color:#9AA7A3}
.sye-in{padding:2px 13px 12px}
.sye-f{display:block;margin:9px 0 0}
.sye-f > span{display:block;font:700 11px 'Inter','IBM Plex Sans KR',sans-serif;color:#6B7A76;margin-bottom:4px;word-break:break-all}
.sye input[type=text],.sye input[type=number],.sye textarea{width:100%;border:1px solid #DCE6E2;border-radius:8px;background:#FBFDFC;padding:8px 10px;font:500 13px 'IBM Plex Sans KR',sans-serif;color:#1E2A27;outline:none}
.sye input:focus,.sye textarea:focus{border-color:#6CCBA6;background:#fff;box-shadow:0 0 0 3px rgba(108,203,166,.18)}
.sye textarea{min-height:64px;resize:vertical}
.sye-obj{margin:10px 0 0;border:1px solid #E6EEEA;border-radius:10px;background:#FBFDFC}
.sye-obj > summary{padding:8px 11px;font-size:12px}
.sye-obj > .sye-in{padding:0 11px 10px}
.sye-item{position:relative;margin:10px 0 0;padding:8px 10px 10px;border:1px dashed #D2E2DB;border-radius:10px;background:#fff}
.sye-item-h{display:flex;align-items:center;gap:6px;font:800 11px 'Inter',sans-serif;color:#5BBE95}
.sye-item-h span{flex:1}
.sye-item-h button,.sye-add{height:26px;min-width:26px;padding:0 8px;border-radius:7px;border:1px solid #DCE6E2;background:#fff;font:700 12px 'IBM Plex Sans KR',sans-serif;color:#4A5753;cursor:pointer}
.sye-item-h button.del{color:#D9506A}
.sye-add{margin-top:10px;height:32px;width:100%;border-style:dashed;color:#3FAE84}
.sye-tup{display:grid;gap:6px}
.sye-img{display:flex;gap:8px;align-items:flex-start;margin-top:6px}
.sye-img img{width:64px;height:64px;object-fit:cover;border-radius:8px;border:1px solid #E1EAE6;background:#EEF4F1}
.sye-img small{font-size:11px;color:#8A9894;line-height:1.4}
.sye-chk{display:flex;align-items:center;gap:8px;margin-top:9px;font-weight:700;font-size:12px}
.sye-f2{padding:10px 14px calc(12px + env(safe-area-inset-bottom));border-top:1px solid #E1EAE6;background:#fff;display:grid;grid-template-columns:1fr 1fr;gap:8px}
.sye-f2 button{height:40px;border-radius:10px;border:1px solid #DCE6E2;background:#fff;font:800 12.5px 'IBM Plex Sans KR',sans-serif;color:#1E2A27;cursor:pointer}
.sye-f2 .pri{background:linear-gradient(160deg,#8ADBB9,#4DB88E);border:0;color:#fff}
.sye-f2 .dark{background:#1E2A27;border:0;color:#fff}
.sye-dirty{grid-column:1/-1;font-size:11.5px;color:#D9506A;text-align:center;min-height:15px}
.sye-help{margin:0 0 12px;padding:10px 12px;border-radius:10px;background:#EAF6F0;color:#2E5A4B;font-size:12px;line-height:1.55}
`;
  document.head.appendChild(css);
  const el = (h) => { const t = document.createElement('template'); t.innerHTML = h.trim(); return t.content.firstChild; };
  const E = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const getP = p => p.reduce((o, k) => o == null ? o : o[k], ED);
  const setP = (p, v) => { const o = getP(p.slice(0, -1)); o[p[p.length - 1]] = v; dirty = true; mark(); };
  const blank = v => Array.isArray(v) ? v.map(blank) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blank(x)])) : typeof v === 'string' ? '' : typeof v === 'number' ? 0 : typeof v === 'boolean' ? false : v;
  const longKey = /^(body|text|desc|note|line|intro|value|memo|content|bio|story|lines|caption|sub|msg|quote)$/i;
  function field(v, path, label) {
    const key = String(path[path.length - 1]), ps = JSON.stringify(path);
    if (typeof v === 'boolean') return `<label class="sye-chk"><input type="checkbox" data-p='${E(ps)}' ${v ? 'checked' : ''}> ${E(label)}</label>`;
    if (typeof v === 'number') return `<label class="sye-f"><span>${E(label)}</span><input type="number" step="any" data-p='${E(ps)}' value="${E(v)}"></label>`;
    if (typeof v === 'string' || v == null) {
      const s = v ?? '', img = IMGK.test(key) || isImgVal(s), long = !img && (s.length > 46 || /\n/.test(s) || (longKey.test(key) && s.length > 20));
      const inp = long ? `<textarea data-p='${E(ps)}' rows="${Math.min(8, Math.max(2, Math.ceil(s.length / 34)))}">${E(s)}</textarea>` : `<input type="text" data-p='${E(ps)}' value="${E(s)}" ${img ? 'placeholder="사진 주소(https://…)를 붙여넣어요"' : ''}>`;
      return `<label class="sye-f"><span>${E(label)}${img ? ' · 사진' : ''}</span>${inp}${img ? `<div class="sye-img">${s ? `<img src="${E(s)}" alt="">` : ''}<small>${s ? '사진을 빼려면 칸을 비우면 돼요' : '비워두면 기본 그라데이션이 나와요'}</small></div>` : ''}</label>`;
    }
    if (Array.isArray(v)) {
      const tuple = v.length && v.every(x => !Array.isArray(x) && (x === null || typeof x !== 'object'));
      const items = v.map((x, i) => {
        const inner = (x !== null && typeof x === 'object') ? body(x, path.concat(i)) : field(x, path.concat(i), tuple ? `${i + 1}번` : `${i + 1}`);
        const pv = (x && typeof x === 'object') ? Object.values(x).find(y => typeof y === 'string' && y.trim()) || (Array.isArray(x) ? x.find(y => typeof y === 'string' && y.trim()) : '') : '';
        return `<div class="sye-item"><div class="sye-item-h"><span>${tuple ? '' : '#' + (i + 1) + (pv ? ' · ' + E(String(pv).slice(0, 24)) : '')}</span><button data-mv='${E(JSON.stringify([path, i, -1]))}' title="위로">↑</button><button data-mv='${E(JSON.stringify([path, i, 1]))}' title="아래로">↓</button><button class="del" data-del='${E(JSON.stringify([path, i]))}' title="지우기">✕</button></div>${inner}</div>`;
      }).join('');
      return `<details class="sye-obj" ${path.length < 3 ? 'open' : ''}><summary>${E(label)} <small style="margin-left:auto;color:#9AA7A3">${v.length}개</small></summary><div class="sye-in">${items}<button class="sye-add" data-add='${E(ps)}'>+ 하나 더 추가</button></div></details>`;
    }
    return `<details class="sye-obj" ${path.length < 2 ? 'open' : ''}><summary>${E(label)}</summary><div class="sye-in">${body(v, path)}</div></details>`;
  }
  function body(o, path) {
    if (Array.isArray(o)) return o.map((x, i) => field(x, path.concat(i), `${i + 1}번`)).join('');
    return Object.keys(o).map(k => field(o[k], path.concat(k), k)).join('');
  }
  css.textContent += `
.sye-own{height:20px;padding:0 9px;border-radius:6px;border:1px solid #E1EAE6;background:#fff;color:#1E2A27;font:400 7.5px 'Archivo Black','Inter',sans-serif;letter-spacing:.08em;cursor:pointer;white-space:nowrap;flex:none}
html.sye-editing .sye-own{background:#1E2A27;border-color:#1E2A27;color:#fff}
@media (max-width:720px),(max-aspect-ratio:4/5) and (max-width:1100px),(max-height:599px){.sye-own{height:28px;padding:0 11px;border-radius:99px;font-size:10px}.sye-ebar{bottom:88px!important}}
.sye-pdel{display:flex;justify-content:flex-end;margin:8px 0 0}
.sye-pdel button{height:28px;padding:0 12px;border-radius:8px;border:1px solid #F0C9D1;background:#fff;color:#D9506A;font:700 12px 'IBM Plex Sans KR',sans-serif;cursor:pointer}
.sye-ebar{position:fixed;left:50%;bottom:58px;transform:translateX(-50%);z-index:99990;display:none;align-items:center;gap:6px;padding:6px 6px 6px 14px;border-radius:99px;background:#1E2A27;color:#fff;font:600 11.5px 'IBM Plex Sans KR',sans-serif;white-space:nowrap;max-width:calc(100vw - 16px);overflow-x:auto;box-shadow:0 10px 26px rgba(20,40,35,.3);scrollbar-width:none}
html.sye-editing .sye-ebar{display:flex}
.sye-ebar span{margin-right:4px;color:#BDEBD7}
.sye-ebar button{flex:none;border:0;border-radius:99px;background:rgba(255,255,255,.16);color:#fff;padding:7px 11px;cursor:pointer;font:700 11px 'IBM Plex Sans KR',sans-serif}
.sye-ebar button.pri{background:#6CCBA6;color:#10221C}
.sye-ebar button.end{background:#fff;color:#1E2A27}
html.sye-editing [data-slot]{cursor:copy!important;outline:2px dashed #3FAE84!important;outline-offset:-4px!important}
html.sye-editing [data-slot].is-empty::after,html.sye-editing [data-slot]:not(:has(img))::after{content:'+ PHOTO';position:absolute;inset:0;display:grid;place-items:center;font:800 10px 'Inter',sans-serif;letter-spacing:.14em;color:#2E8F69;background:rgba(255,255,255,.35);pointer-events:none;z-index:3}
html.sye-editing [data-slot]{position:relative}
.sye-pop{position:fixed;z-index:99999;display:none;flex-direction:column;min-width:170px;background:#fff;border-radius:12px;border:1px solid #DCE9E1;box-shadow:0 14px 34px rgba(20,40,35,.2);overflow:hidden}
.sye-pop.on{display:flex}
.sye-pop button{border:0;border-bottom:1px solid #EEF3F1;background:none;padding:11px 16px;text-align:left;cursor:pointer;font:700 13px 'IBM Plex Sans KR',sans-serif;color:#1E2A27}
.sye-pop button:last-child{border-bottom:0;color:#8A9894}
.sye-pop button:hover{background:#F2F8F5}
.sye-toast{position:fixed;left:50%;top:14px;transform:translateX(-50%) translateY(-8px);z-index:99999;padding:9px 16px;border-radius:99px;background:#1E2A27;color:#fff;font:700 12px 'IBM Plex Sans KR',sans-serif;opacity:0;transition:.25s;pointer-events:none;max-width:calc(100vw - 24px);text-align:center}
.sye-toast.on{opacity:1;transform:translateX(-50%)}
`;
  const toast = (() => { const t = el('<div class="sye-toast"></div>'); document.body.appendChild(t); let tm; return m => { t.textContent = m; t.classList.add('on'); clearTimeout(tm); tm = setTimeout(() => t.classList.remove('on'), 2600); }; })();
  /* ---------- 사진 (이 브라우저에만 저장 : IndexedDB) ---------- */
  const PV = {}; SLOTS.forEach(x => { PV[x.path] = x.val; });
  const idb = () => new Promise((ok, no) => { if (!window.indexedDB) return no(); const r = indexedDB.open('sy-photos', 1); r.onupgradeneeded = () => r.result.createObjectStore('img'); r.onsuccess = () => ok(r.result); r.onerror = () => no(r.error); });
  const idbAll = () => idb().then(d => new Promise(ok => { const out = {}, c = d.transaction('img', 'readonly').objectStore('img').openCursor(); c.onsuccess = () => { const x = c.result; if (x) { out[x.key] = x.value; x.continue(); } else ok(out); }; c.onerror = () => ok(out); })).catch(() => ({}));
  const idbPut = (k, v) => idb().then(d => new Promise((ok, no) => { const t = d.transaction('img', 'readwrite'); t.objectStore('img').put(v, k); t.oncomplete = ok; t.onerror = () => no(t.error); }));
  const idbDel = k => idb().then(d => new Promise(ok => { const t = d.transaction('img', 'readwrite'); t.objectStore('img').delete(k); t.oncomplete = ok; }));
  const setURL = (k, b) => { if (SLOT_URL[k] && SLOT_URL[k].startsWith('blob:')) URL.revokeObjectURL(SLOT_URL[k]); if (b) SLOT_URL[k] = URL.createObjectURL(b); else delete SLOT_URL[k]; };
  // 화면에 이미 그려진 사진 칸 다시 칠하기
  const paint = (only) => document.querySelectorAll(only ? `[data-slot="${CSS.escape(only)}"]` : '[data-slot]').forEach(e => {
    const k = e.dataset.slot; if (!k) return; const fb = e.dataset.fb, u = SLOT_URL[k] || PV[k] || (fb ? SLOT_URL[fb] || PV[fb] || '' : '');
    let im = e.querySelector(':scope > img');
    if (u) { if (!im) { im = document.createElement('img'); im.alt = ''; e.querySelectorAll(':scope > .ph-ic, :scope > .pb-txt').forEach(x => x.remove()); e.prepend(im); } im.src = u; e.classList.remove('is-empty'); const ip = (RAW.imgPos || {})[k]; if (ip) im.style.cssText = imgPosCss(ip); else if (!e.classList.contains('sye-adj')) { im.style.objectPosition = ''; im.style.transform = ''; } }
    else { if (im) im.remove(); e.classList.add('is-empty'); }
  });
  idbAll().then(all => { Object.keys(all).forEach(k => setURL(k, all[k])); paint(); });
  new MutationObserver(ms => { if (ms.some(m => [...m.addedNodes].some(n => n.nodeType === 1 && (n.matches?.('[data-slot]') || n.querySelector?.('[data-slot]'))))) paint(); }).observe(document.body, { childList: true, subtree: true });
  const fP = el('<input type="file" accept="image/*" hidden>'), fB = el('<input type="file" accept=".json,application/json" hidden>');
  const pop = el('<div class="sye-pop"></div>');
  const own = el('<button class="sye-own" type="button">✎ EDIT</button>');
  const bar = el(`<div class="sye-ebar"><span class="sye-st"></span><span class="sye-tip">글자 누르면 고치기 · 사진 자리에 누르기 / 끌어다 놓기 / 붙여넣기</span><button data-e="undo" title="되돌리기 (Ctrl+Z)">↶ 되돌리기</button><button data-e="publish" class="pub">홈페이지에 저장</button><button data-e="export">JS 내보내기</button><button data-e="backup">백업 저장</button><button data-e="restore">백업 불러오기</button><button data-e="end" class="end">끝내기</button></div>`);
  let tgt = null;
  const setEdit = on => { SYE_ON = on; document.documentElement.classList.toggle('sye-editing', on); try { localStorage.setItem('syEdit', on ? '1' : '0'); } catch (e) {} if (!on) { pop.classList.remove('on'); pane.classList.remove('on'); } };
  const pick = k => { tgt = k; fP.value = ''; fP.click(); };
  window.__syePick = pick;   // 입장 화면 사진 칸에서도 쓰기
  // 아직 홈페이지에 저장 안 한 수정 개수 (아래 바에 표시)
  let PEND = (() => { try { return +localStorage.getItem('sye-pend') || 0; } catch (e) { return 0; } })();
  const pend = (d = 1) => { PEND = d === 0 ? 0 : PEND + d; try { localStorage.setItem('sye-pend', String(PEND)); if (d !== 0) localStorage.removeItem('sye-pub-at'); } catch (e) {} showPend(); };
  const showPend = () => { const st = bar.querySelector('.sye-st'), ex = bar.querySelector('[data-e=publish]'); if (st) st.innerHTML = PEND ? `<i class="dot"></i>아직 저장 안 한 수정 <b>${PEND}</b>개` : '<i class="ok">✓</i>홈페이지와 같아요'; ex && ex.classList.toggle('attn', PEND > 0); };
  const putPhoto = (k, f) => { if (!f || !/^image\//.test(f.type)) { toast('사진 파일만 넣을 수 있어요'); return; } idbPut(k, f).then(() => { setURL(k, f); PV[k] = PV[k] || ''; paint(k); pend(); toast('사진을 넣었어요 · 모두에게 보이게 하려면 JS 내보내기'); }).catch(() => toast('저장하지 못했어요')); };
  fP.addEventListener('change', () => { const f = fP.files && fP.files[0]; if (!f || !tgt) return; putPhoto(tgt, f); });
  // 사진 끌어다 놓기 · 붙여넣기 (참고한 홈페이지처럼)
  let hovSlot = null;
  document.addEventListener('pointerover', e => { if (!SYE_ON) return; const sl = e.target.closest && e.target.closest('[data-slot]'); hovSlot = sl && sl.dataset.slot ? sl : null; });
  document.addEventListener('dragover', e => { if (!SYE_ON) return; const sl = e.target.closest && e.target.closest('[data-slot]'); $$('.sye-drop').forEach(x => x !== sl && x.classList.remove('sye-drop')); if (sl && sl.dataset.slot) { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; sl.classList.add('sye-drop'); } });
  document.addEventListener('dragleave', e => { const sl = e.target.closest && e.target.closest('[data-slot]'); if (sl && !sl.contains(e.relatedTarget)) sl.classList.remove('sye-drop'); });
  document.addEventListener('drop', e => { if (!SYE_ON) return; const sl = e.target.closest && e.target.closest('[data-slot]'); $$('.sye-drop').forEach(x => x.classList.remove('sye-drop')); if (!sl || !sl.dataset.slot) return; e.preventDefault(); const f = [...(e.dataTransfer.files || [])].find(x => /^image\//.test(x.type)); if (f) putPhoto(sl.dataset.slot, f); else toast('사진 파일을 끌어다 놓아 주세요'); });
  document.addEventListener('paste', e => { if (!SYE_ON || !hovSlot || e.target.closest('input,textarea')) return; const f = [...(e.clipboardData?.files || [])].find(x => /^image\//.test(x.type)); if (!f) return; e.preventDefault(); putPhoto(hovSlot.dataset.slot, f); });
  // 사진 위치 · 크기 조절 : 사진을 끌어서 보이는 부분을 옮기고, 휠(또는 + −)로 확대
  const setPos = (k, p) => { RAW.imgPos = RAW.imgPos || {}; if (p) RAW.imgPos[k] = p; else delete RAW.imgPos[k]; try { const d = JSON.parse(localStorage.getItem('sye-draft') || 'null') || {}; d.imgPos = RAW.imgPos; localStorage.setItem('sye-draft', JSON.stringify(d)); } catch (err) {} if (ED) ED.imgPos = clone(RAW.imgPos); };
  const adjBar = el('<div class="sye-adjbar"><span>끌어서 위치 · 휠로 크기</span><button type="button" data-m="0,-1" title="위로">↑</button><button type="button" data-m="0,1" title="아래로">↓</button><button type="button" data-m="-1,0" title="왼쪽으로">←</button><button type="button" data-m="1,0" title="오른쪽으로">→</button><button type="button" data-z="-1">−</button><button type="button" data-z="1">＋</button><button type="button" data-z="0">원래대로</button><button type="button" data-z="ok" class="pri">완료</button></div>');
  document.body.append(adjBar);
  let adj = null;
  // 움직이기 : 사진이 칸보다 넓은 방향은 보이는 부분을 옮기고, 꽉 맞는 방향은 사진 자체를 옮겨요 (위아래 · 좌우 다 돼요)
  const adjMove = (p0, dxPct, dyPct) => { const im = adj.el.querySelector('img'), r = adj.el.getBoundingClientRect(); const nr = im && im.naturalWidth ? im.naturalWidth / im.naturalHeight : r.width / r.height, cr = r.width / r.height;
    const hx = nr > cr + .01, vy = nr < cr - .01, s = p0[2] || 1;
    if (hx) adj.p[0] = Math.max(0, Math.min(100, +(p0[0] - dxPct / s).toFixed(1))); else adj.p[3] = Math.max(-45, Math.min(45, +((p0[3] || 0) + dxPct / s).toFixed(1)));
    if (vy) adj.p[1] = Math.max(0, Math.min(100, +(p0[1] - dyPct / s).toFixed(1))); else adj.p[4] = Math.max(-45, Math.min(45, +((p0[4] || 0) + dyPct / s).toFixed(1))); };
  const adjApply = () => { if (!adj) return; $$(`[data-slot="${CSS.escape(adj.k)}"] > img`).forEach(im => { im.style.cssText = imgPosCss(adj.p); }); };
  const adjEnd = save => { if (!adj) return; const a = adj; adj = null; a.el.classList.remove('sye-adj'); adjBar.classList.remove('on'); if (save) { setPos(a.k, (a.p[0] === 50 && a.p[1] === 50 && a.p[2] === 1 && !a.p[3] && !a.p[4]) ? null : a.p); pend(); toast('사진 위치를 저장했어요'); } else { const o = (RAW.imgPos || {})[a.k]; $$(`[data-slot="${CSS.escape(a.k)}"] > img`).forEach(im => { im.style.cssText = o ? imgPosCss(o) : ''; }); } };
  const adjStart = sl => {
    adjEnd(true); const k = sl.dataset.slot, o = (RAW.imgPos || {})[k] || [50, 50, 1];
    adj = { k, el: sl, p: [o[0], o[1], o[2] || 1, o[3] || 0, o[4] || 0] }; sl.classList.add('sye-adj'); adjApply();
    const r = sl.getBoundingClientRect(); adjBar.classList.add('on'); adjBar.style.left = Math.max(8, Math.min(r.left + r.width / 2 - 170, innerWidth - 348)) + 'px'; adjBar.style.top = (r.bottom + 54 > innerHeight ? Math.max(8, r.top - 46) : r.bottom + 8) + 'px';
  };
  adjBar.addEventListener('click', e => { e.stopPropagation(); const mb = e.target.closest('[data-m]'); if (mb && adj) { const [mx, my] = mb.dataset.m.split(',').map(Number); adjMove(adj.p.slice(), mx * 3, my * 3); adjApply(); return; }
    const b = e.target.closest('[data-z]'); if (!b || !adj) return; const z = b.dataset.z; if (z === 'ok') return adjEnd(true); if (z === '0') adj.p = [50, 50, 1, 0, 0]; else adj.p[2] = Math.max(.5, Math.min(3, +(adj.p[2] + (+z) * .1).toFixed(2))); adjApply(); });
  ['pointerdown', 'mousedown', 'click'].forEach(ev => adjBar.addEventListener(ev, e => e.stopPropagation()));
  document.addEventListener('pointerdown', e => {
    if (!adj) return; const ar = adj.el.getBoundingClientRect(), inside = e.clientX >= ar.left && e.clientX <= ar.right && e.clientY >= ar.top && e.clientY <= ar.bottom, sl = adj.el;
    if (!inside) { if (!e.target.closest('.sye-adjbar')) adjEnd(true); return; }
    e.preventDefault(); e.stopPropagation(); const r = sl.getBoundingClientRect(), sx = e.clientX, sy = e.clientY, p0 = adj.p.slice();
    const mv = ev => { if (!adj) return; adjMove(p0, (ev.clientX - sx) / r.width * 100, (ev.clientY - sy) / r.height * 100); adjApply(); };
    const up = () => { removeEventListener('pointermove', mv); removeEventListener('pointerup', up); };
    addEventListener('pointermove', mv); addEventListener('pointerup', up);
  }, true);
  document.addEventListener('wheel', e => { if (!adj) return; const ar = adj.el.getBoundingClientRect(); if (e.clientX < ar.left || e.clientX > ar.right || e.clientY < ar.top || e.clientY > ar.bottom) return; e.preventDefault(); adj.p[2] = Math.max(.5, Math.min(3, +(adj.p[2] - Math.sign(e.deltaY) * .06).toFixed(2))); adjApply(); }, { passive: false });
  document.addEventListener('keydown', e => { if (adj && (e.key === 'Escape' || e.key === 'Enter')) { e.preventDefault(); adjEnd(e.key === 'Enter'); } });
  document.addEventListener('click', e => {
    if (!SYE_ON || e.target.closest('.sye-ebar,.sye-pop,.sye,.sye-own,.sye-adjbar') || e.target === fP || e.target === fB) return;
    if (adj) { e.preventDefault(); e.stopPropagation(); return; }
    if (pop.classList.contains('on')) { pop.classList.remove('on'); e.preventDefault(); e.stopPropagation(); return; }
    const sl = e.target.closest('[data-slot]'); if (!sl || !sl.dataset.slot) return;
    e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
    const k = sl.dataset.slot, fbk = sl.dataset.fb, fbHas = fbk && (SLOT_URL[fbk] || PV[fbk]); if (!SLOT_URL[k] && !PV[k] && !fbHas) { pick(k); return; }
    pop.innerHTML = '';
    [['위치 · 크기 조절', () => adjStart(sl)], [!SLOT_URL[k] && !PV[k] ? '이 자리에만 다른 사진 넣기' : '다른 사진으로 바꾸기', () => pick(k)], ...(!SLOT_URL[k] && !PV[k] ? [] : [[fbHas ? '사진 빼기 (목록 사진으로 돌아가요)' : '사진 빼기', () => { idbDel(k).then(() => { setURL(k, null); PV[k] = ''; setPos(k, null); paint(k); pend(); toast('사진을 뺐어요'); }); }]]), ['취소', () => {}]].forEach(([t, f]) => { const x = el(`<button type="button">${t}</button>`); x.onclick = ev => { ev.stopPropagation(); pop.classList.remove('on'); f(); }; pop.appendChild(x); });
    pop.style.left = Math.min(e.clientX, innerWidth - 190) + 'px'; pop.style.top = Math.min(e.clientY, innerHeight - 150) + 'px'; pop.classList.add('on');
  }, true);
  ['pointerdown', 'mousedown'].forEach(ev => document.addEventListener(ev, e => { if (SYE_ON && e.target.closest('[data-slot]') && !e.target.closest('.sye')) e.stopPropagation(); }, true));
  /* ---------- 글 수정 창 ---------- */
  const pane = el(`<aside class="sye"><div class="sye-h"><h3><i>✎</i>글 수정</h3><p>고치고 <b>[적용해서 보기]</b> → 다 되면 아래 바의 <b>[홈페이지에 저장]</b> 을 누르면 모두에게 보여요. 사진은 화면의 사진 자리를 바로 눌러서 넣어요.</p><button class="sye-x" title="닫기">✕</button></div>
    <div class="sye-tabs">${GROUPS.map((g, i) => `<button data-t="${i}" class="${i ? '' : 'on'}">${E(g[0])}</button>`).join('')}</div><div class="sye-body"></div>
    <div class="sye-f2"><div class="sye-dirty"></div><button class="pri" data-a="apply">적용해서 보기</button><button data-a="reset">글 처음으로 되돌리기</button></div></aside>`);
  document.body.append(bar, pop, pane, fP, fB); showPend();
  { const tr = document.querySelector('.top-r'), w = tr && tr.querySelector('.sy-write'); if (tr) tr.insertBefore(own, w || tr.querySelector('[data-nav=launcher]')); else document.body.append(own); }
  let tab = 0;
  const draw = () => {
    const [, keys] = GROUPS[tab];
    pane.querySelector('.sye-body').innerHTML = keys.filter(k => k in ED).map((k, i) => `<details class="sye-sec" ${i === 0 ? 'open' : ''}><summary>${E(LABEL[k] || k)}<small>${E(k)}</small></summary><div class="sye-in">${(ED[k] !== null && typeof ED[k] === 'object' && !Array.isArray(ED[k])) ? body(ED[k], [k]) : field(ED[k], [k], Array.isArray(ED[k]) ? '목록' : '내용')}</div></details>`).join('');
  };
  const mark = () => { pane.querySelector('.sye-dirty').textContent = dirty ? '아직 적용 안 한 수정이 있어요' : ''; };
  draw();
  /* ---------- 글자 바로 고치기 : 편집 모드에서 글자를 누르면 그 자리에 작은 입력창이 떠요 ---------- */
  const TRE = /⁤([​‌‍⁠]+)⁢([^⁡⁤⁢]*)⁡/g;
  const tid = s => parseInt(s.replace(/./g, c => '​‌‍⁠'.indexOf(c)), 4);
  const rawAt = p => p.reduce((o, k) => o == null ? o : o[k], RAW);
  const wrapTxt = root => {
    if (!root || !TXT_PATH.length) return;
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => /[⁤⁡]/.test(n.data) ? 1 : 3 }), ns = [];
    while (tw.nextNode()) ns.push(tw.currentNode);
    ns.forEach(n => {
      const par = n.parentNode; if (!par) return;
      if (par.closest && (par.closest('svg,textarea,script,style,title') || par.closest('.sye-t'))) { n.data = UN(n.data); return; }
      const d = n.data, fr = document.createDocumentFragment(); let last = 0, m, hit = false; TRE.lastIndex = 0;
      while ((m = TRE.exec(d))) {
        const id = tid(m[1]), p = TXT_PATH[id], raw = p && rawAt(p);
        if (m.index > last) fr.append(UN(d.slice(last, m.index)));
        if (typeof raw === 'string' && raw === m[2]) { const sp = document.createElement('span'); sp.className = 'sye-t'; sp.dataset.tp = id; sp.textContent = m[2]; fr.append(sp); hit = true; }
        else fr.append(m[2]);
        last = TRE.lastIndex;
      }
      if (!hit) { n.data = UN(d); return; }
      if (last < d.length) fr.append(UN(d.slice(last)));
      par.replaceChild(fr, n);
    });
  };
  wrapTxt(document.body);
  new MutationObserver(ms => ms.forEach(m => { if (m.type === 'characterData') { if (/[⁤⁡]/.test(m.target.data)) wrapTxt(m.target.parentNode); } else m.addedNodes.forEach(a => { if (a.nodeType === 1) wrapTxt(a); else if (a.nodeType === 3 && /[⁤⁡]/.test(a.data)) wrapTxt(a.parentNode); }); }))
    .observe(document.body, { childList: true, subtree: true, characterData: true });
  // 저장 : 이 브라우저에 바로 저장 (JS 내보내기로 진짜 반영)
  let svT = 0;
  const saveTxt = (p, v) => {
    let o = RAW; for (let i = 0; i < p.length - 1; i++) o = o[p[i]]; o[p[p.length - 1]] = v;
    let e = ED; for (let i = 0; i < p.length - 1 && e; i++) e = e[p[i]]; if (e) e[p[p.length - 1]] = v;
    clearTimeout(svT); svT = setTimeout(() => { try { const d = JSON.parse(localStorage.getItem('sye-draft') || 'null') || {}; d[p[0]] = clone(RAW[p[0]]); localStorage.setItem('sye-draft', JSON.stringify(d)); } catch (err) { toast('저장 공간이 부족해서 저장하지 못했어요'); } }, 250);
  };
  const UNDO = [];
  const undo = () => { const u = UNDO.pop(); if (!u) { toast('되돌릴 수정이 없어요'); return; } saveTxt(TXT_PATH[u.id], u.v); $$(`.sye-t[data-tp="${u.id}"]`).forEach(x => { x.textContent = u.v; }); if (PEND > 0) pend(-1); toast('하나 되돌렸어요'); };
  addEventListener('keydown', e => { if (!SYE_ON || !(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== 'z' || e.shiftKey || e.target.closest('input,textarea,[contenteditable]')) return; e.preventDefault(); undo(); });
  const tbox = el(`<div class="sye-tbox"><div class="sye-tl"><b>✎ 글 고치기</b><small></small></div><textarea rows="1" spellcheck="false"></textarea><div class="sye-tb"><span>Enter 저장 · Esc 취소</span><button type="button" data-tb="x">취소</button><button type="button" data-tb="ok" class="pri">저장</button></div></div>`);
  document.body.append(tbox);
  const ta = tbox.querySelector('textarea');
  let cur = null, orig = '';
  const fitTa = () => { ta.style.height = 'auto'; ta.style.height = Math.min(160, ta.scrollHeight) + 'px'; };
  const live = v => { $$(`.sye-t[data-tp="${cur}"]`).forEach(x => { x.textContent = v; }); };
  const closeBox = keep => { if (cur == null) return; if (!keep) live(orig); else if (ta.value !== orig) { UNDO.push({ id: cur, v: orig }); saveTxt(TXT_PATH[cur], ta.value); pend(); toast('고쳤어요 · 이 브라우저에 저장됐어요'); } $$('.sye-t.on').forEach(x => x.classList.remove('on')); tbox.classList.remove('on'); cur = null; };
  const openBox = sp => {
    closeBox(true); cur = sp.dataset.tp; orig = sp.textContent; ta.value = orig;
    const p = TXT_PATH[cur]; tbox.querySelector('.sye-tl small').textContent = p.join(' › ');
    $$(`.sye-t[data-tp="${cur}"]`).forEach(x => x.classList.add('on'));
    tbox.classList.add('on'); const r = sp.getBoundingClientRect(), W = Math.min(340, innerWidth - 20);
    tbox.style.width = W + 'px'; tbox.style.left = Math.max(10, Math.min(r.left, innerWidth - W - 10)) + 'px';
    const below = r.bottom + 8, h = tbox.offsetHeight || 120; tbox.style.top = (below + h > innerHeight - 10 ? Math.max(10, r.top - h - 8) : below) + 'px';
    fitTa(); setTimeout(() => { ta.focus(); ta.select(); }, 0);
  };
  ta.addEventListener('input', () => { fitTa(); live(ta.value.replace(/\n/g, ' ')); });
  let imeEnter = false;
  ta.addEventListener('keydown', e => { e.stopPropagation(); if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (e.isComposing || e.keyCode === 229) { imeEnter = true; return; } closeBox(true); } if (e.key === 'Escape') { e.preventDefault(); closeBox(false); } });
  ta.addEventListener('compositionend', () => { if (imeEnter) { imeEnter = false; setTimeout(() => closeBox(true), 0); } });
  tbox.addEventListener('click', e => { e.stopPropagation(); const b = e.target.closest('[data-tb]'); if (b) closeBox(b.dataset.tb === 'ok'); });
  ['pointerdown', 'mousedown', 'click'].forEach(ev => document.addEventListener(ev, e => {
    if (!SYE_ON) return;
    if (e.target.closest('.sye-tbox')) { e.stopPropagation(); if (ev === 'click' && !e.target.closest('.sye-tbox2')) { const b = e.target.closest('[data-tb]'); if (b) closeBox(b.dataset.tb === 'ok'); } return; }
    const sp = e.target.closest('.sye-t');
    if (sp && !e.target.closest('.sye,.sye-ebar,.sye-pop')) { e.stopPropagation(); e.preventDefault(); if (ev === 'click') openBox(sp); return; }
    if (ev === 'pointerdown' && cur != null) closeBox(true);
  }, true));
  const css2 = document.createElement('style');
  css2.textContent = `html.sye-editing .sye-t{outline:1px dashed rgba(63,174,132,.42);outline-offset:2px;border-radius:3px;cursor:text!important;transition:background .15s}
html.sye-editing .sye-t:hover{background:rgba(127,214,176,.28);outline-style:solid}
html.sye-editing .sye-t.on{background:rgba(127,214,176,.4);outline:2px solid #3FAE84}
.sye-tbox{position:fixed;z-index:100000;display:none;background:#fff;border:1px solid #DDE8E3;border-radius:14px;box-shadow:0 16px 40px rgba(29,74,64,.22);padding:10px 10px 9px;font-family:'IBM Plex Sans KR','Inter',sans-serif;color:#1D4A40}
.sye-tbox.on{display:block;animation:syeT .18s ease-out}
@keyframes syeT{from{opacity:0;transform:translateY(-4px)}}
.sye-tl{display:flex;align-items:baseline;gap:8px;margin:0 2px 7px}.sye-tl b{font-size:12px;color:#3FAE84}.sye-tl small{font:600 9.5px 'Inter',monospace;color:#9AABA5;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sye-tbox textarea{display:block;width:100%;box-sizing:border-box;resize:none;border:1.5px solid #CFE6DB;border-radius:9px;padding:8px 10px;font:500 14px/1.45 'IBM Plex Sans KR','Inter',sans-serif;color:#1D4A40;outline:none;background:#F6FBF8}
.sye-tbox textarea:focus{border-color:#3FAE84;background:#fff}
.sye-tb{display:flex;align-items:center;gap:6px;margin-top:8px}.sye-tb span{margin-right:auto;font-size:10.5px;color:#9AABA5}
.sye-tb button{height:28px;padding:0 12px;border-radius:8px;border:1px solid #DDE8E3;background:#fff;font:700 12px 'IBM Plex Sans KR',sans-serif;color:#1D4A40;cursor:pointer}
.sye-tb button.pri{background:#3FAE84;border-color:#3FAE84;color:#fff}`;
  document.head.appendChild(css2);
  /* ---------- 아무 글자나 눌러서 바꾸기 (data.js 에 없는 글자 · 메뉴 · 앱 이름 등) ---------- */
  const tb2 = el(`<div class="sye-tbox sye-tbox2"><div class="sye-tl"><b>✎ 글자 바꾸기</b><small>화면에서 바로 바꾼 글자 · 같은 글자는 다 같이 바뀌어요</small></div><textarea rows="1" spellcheck="false"></textarea><div class="sye-tb"><span>Enter 저장 · Esc 취소</span><button type="button" data-tb="reset">원래대로</button><button type="button" data-tb="x">취소</button><button type="button" data-tb="ok" class="pri">저장</button></div></div>`);
  document.body.append(tb2);
  const ta2 = tb2.querySelector('textarea');
  let k2 = null, shown2 = '';
  const fit2 = () => { ta2.style.height = 'auto'; ta2.style.height = Math.min(160, ta2.scrollHeight) + 'px'; };
  // 지금 화면에 shown 으로 보이는 글자를 모두 v 로 바꾸기
  const swapAll = (shown, v) => { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), list = []; let n; while ((n = w.nextNode())) list.push(n);
    list.forEach(n => { if (n.textContent.trim() === shown && !tovSkip(n)) n.textContent = n.textContent.replace(shown, v); }); };
  const saveTov = () => { try { const d = JSON.parse(localStorage.getItem('sye-draft') || 'null') || {}; d.textOverrides = clone(TOV); localStorage.setItem('sye-draft', JSON.stringify(d)); } catch (e) { toast('저장 공간이 부족해서 저장하지 못했어요'); } };
  const close2 = mode => {
    if (k2 == null) return;
    const v = ta2.value.replace(/\s*\n\s*/g, ' ').trim();
    if (mode === 'ok' && v && v !== shown2) { if (v === k2) delete TOV[k2]; else TOV[k2] = v; swapAll(shown2, v); saveTov(); pend(); toast('바꿨어요 · [홈페이지에 저장]을 누르면 모두에게 보여요'); }
    else if (mode === 'reset' && shown2 !== k2) { delete TOV[k2]; swapAll(shown2, k2); saveTov(); pend(); toast('원래 글자로 되돌렸어요'); }
    tb2.classList.remove('on'); k2 = null;
  };
  const open2 = (shown, rr) => {
    closeBox(true); close2('x');
    k2 = Object.keys(TOV).find(k => TOV[k] === shown) || shown; shown2 = shown; ta2.value = shown;
    tb2.querySelector('[data-tb=reset]').style.display = k2 !== shown ? '' : 'none';
    tb2.querySelector('.sye-tl small').textContent = k2 !== shown ? `원래 글자: ${k2}` : '같은 글자는 다 같이 바뀌어요';
    tb2.classList.add('on'); const W = Math.min(340, innerWidth - 20);
    tb2.style.width = W + 'px'; tb2.style.left = Math.max(10, Math.min(rr.left, innerWidth - W - 10)) + 'px';
    const h = tb2.offsetHeight || 120; tb2.style.top = (rr.bottom + 8 + h > innerHeight - 10 ? Math.max(10, rr.top - h - 8) : rr.bottom + 8) + 'px';
    fit2(); setTimeout(() => { ta2.focus(); ta2.select(); }, 0);
  };
  ta2.addEventListener('input', fit2);
  let ime2 = false;
  ta2.addEventListener('keydown', e => { e.stopPropagation(); if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (e.isComposing || e.keyCode === 229) { ime2 = true; return; } close2('ok'); } if (e.key === 'Escape') { e.preventDefault(); close2('x'); } });
  ta2.addEventListener('compositionend', () => { if (ime2) { ime2 = false; setTimeout(() => close2('ok'), 0); } });
  tb2.addEventListener('click', e => { e.stopPropagation(); const b = e.target.closest('[data-tb]'); if (b) close2(b.dataset.tb); });
  const textAt = (x, y) => {
    let n = null;
    if (document.caretRangeFromPoint) { const r = document.caretRangeFromPoint(x, y); n = r && r.startContainer; }
    else if (document.caretPositionFromPoint) { const p = document.caretPositionFromPoint(x, y); n = p && p.offsetNode; }
    const inside = t => { if (!t || t.nodeType !== 3 || !t.textContent.trim() || tovSkip(t)) return null; const rg = document.createRange(); rg.selectNodeContents(t); const rr = rg.getBoundingClientRect();
      return (rr.width && x >= rr.left - 3 && x <= rr.right + 3 && y >= rr.top - 3 && y <= rr.bottom + 3) ? { n: t, rr } : null; };
    let hit = inside(n);
    if (!hit) {   // 선택이 막힌 글자(user-select:none)는 위치로 다시 찾아요
      const elx = document.elementFromPoint(x, y); if (!elx || elx.closest('svg') && !elx.closest('text')) return null;
      const w = document.createTreeWalker(elx, NodeFilter.SHOW_TEXT); let t; while (!hit && (t = w.nextNode())) hit = inside(t);
    }
    return hit;
  };
  ['pointerdown', 'mousedown', 'click'].forEach(ev => document.addEventListener(ev, e => {
    if (!SYE_ON) return;
    if (e.target.closest('.sye-tbox2')) { e.stopPropagation(); if (ev === 'click') { const b = e.target.closest('[data-tb]'); if (b) close2(b.dataset.tb); } return; }
    // B. 홈페이지 화면(바탕 · 창 · 런처) 글자만 — 편집 창 · 입력칸 · 버튼 모음은 그대로 눌리게
    if (!e.target.closest('#desk,#winlayer,#launcher') || e.target.closest('form,.sye-fm,.sye-t,.sye,.sye-ebar,.sye-pop,.sye-tbox,input,textarea,select,[data-slot],.cx-add,.cd-tags .ed,.tk-row,.tk-me,.tkroom .chat-list,.tkroom .chat-head')) return;
    const hit = textAt(e.clientX, e.clientY);
    if (!hit) { if (ev === 'pointerdown' && k2 != null) close2('ok'); return; }
    const t = hit.n.textContent.trim(); if (t.length > 300) return;
    e.stopPropagation(); e.preventDefault(); if (ev === 'click') open2(t, hit.rr);
  }, true));
  own.onclick = e => { e.stopPropagation(); setEdit(!SYE_ON); toast(SYE_ON ? '편집 모드 · 사진 자리를 누르면 사진 넣기' : '편집을 끝냈어요'); };
  pane.querySelector('.sye-x').onclick = () => pane.classList.remove('on');
  pane.querySelector('.sye-tabs').onclick = e => { const b = e.target.closest('[data-t]'); if (!b) return; tab = +b.dataset.t; pane.querySelectorAll('.sye-tabs button').forEach(x => x.classList.toggle('on', x === b)); draw(); pane.querySelector('.sye-body').scrollTop = 0; };
  pane.addEventListener('input', e => {
    const t = e.target; if (!t.dataset.p) return; const p = JSON.parse(t.dataset.p);
    setP(p, t.type === 'checkbox' ? t.checked : t.type === 'number' ? (t.value === '' ? 0 : +t.value) : t.value);
    const box = t.parentElement.querySelector('.sye-img'); if (box) box.innerHTML = t.value ? `<img src="${E(t.value)}" alt=""><small>사진을 빼려면 칸을 비우면 돼요</small>` : '<small>비워두면 기본 그라데이션이 나와요</small>';
  });
  pane.addEventListener('click', e => {
    const b = e.target.closest('[data-add],[data-del],[data-mv],[data-a]'); if (!b) return; e.preventDefault();
    const keep = pane.querySelector('.sye-body').scrollTop;
    if (b.dataset.add) { const p = JSON.parse(b.dataset.add), arr = getP(p); arr.push(arr.length ? blank(clone(arr[arr.length - 1])) : ''); dirty = true; }
    else if (b.dataset.del) { const [p, i] = JSON.parse(b.dataset.del); if (!confirm('이 항목을 지울까요?')) return; getP(p).splice(i, 1); dirty = true; }
    else if (b.dataset.mv) { const [p, i, d] = JSON.parse(b.dataset.mv), arr = getP(p), j = i + d; if (j < 0 || j >= arr.length) return; [arr[i], arr[j]] = [arr[j], arr[i]]; dirty = true; }
    else if (b.dataset.a === 'apply') { try { const df = {}; Object.keys(ED).forEach(k => { if (JSON.stringify(ED[k]) !== JSON.stringify(SITE0[k])) df[k] = ED[k]; }); localStorage.setItem('sye-draft', JSON.stringify(df)); sessionStorage.setItem('sye-fast', '1'); sessionStorage.setItem('sye-open', String(tab)); } catch (err) { alert('저장 공간이 부족해서 적용하지 못했어요'); return; } location.reload(); return; }
    else if (b.dataset.a === 'reset') { if (!confirm('글 수정한 내용을 모두 지우고 지금 홈페이지에 저장돼 있는 내용으로 되돌릴까요? (넣은 사진은 그대로예요)')) return; try { localStorage.removeItem('sye-draft'); sessionStorage.setItem('sye-fast', '1'); } catch (err) {} location.reload(); return; }
    mark(); draw(); pane.querySelector('.sye-body').scrollTop = keep;
  });
  /* ---------- JS 내보내기 : data.js (사진 칸엔 파일 이름) + 사진 파일들 ---------- */
  const save = (blob, name) => { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000); };
  const shrink = (blob, max) => new Promise(ok => { const url = URL.createObjectURL(blob), im = new Image();
    im.onload = () => { const sc = Math.min(1, max / Math.max(im.naturalWidth, im.naturalHeight)), w = Math.round(im.naturalWidth * sc), h = Math.round(im.naturalHeight * sc), cv = document.createElement('canvas'), cx = cv.getContext('2d'); cv.width = w; cv.height = h; cx.drawImage(im, 0, 0, w, h); URL.revokeObjectURL(url);
      const px = cx.getImageData(0, 0, w, h).data; let alpha = false; for (let i = 3; i < px.length; i += 16) if (px[i] < 250) { alpha = true; break; }
      if (alpha) cv.toBlob(b => ok({ blob: b, ext: 'png' }), 'image/png'); else { const c2 = document.createElement('canvas'), x2 = c2.getContext('2d'); c2.width = w; c2.height = h; x2.fillStyle = '#fff'; x2.fillRect(0, 0, w, h); x2.drawImage(cv, 0, 0); c2.toBlob(b => ok({ blob: b, ext: 'jpg' }), 'image/jpeg', .9); } };
    im.onerror = () => { URL.revokeObjectURL(url); ok(null); }; im.src = url; });
  const setAt = (o, path, v) => { const p = path.split('.'); let x = o; for (let i = 0; i < p.length - 1; i++) { if (x == null) return false; x = x[p[i]]; } if (x == null) return false; x[p[p.length - 1]] = v; return true; };
  function exportJS() {
    const out = clone(RAW), files = []; toast('사진 정리하는 중이에요…');
    Object.keys(PV).forEach(k => { if (PV[k] === '' && !SLOT_URL[k]) setAt(out, k, ''); });
    idbAll().then(all => Promise.all(Object.keys(all).map(k => shrink(all[k], /hero|banner|back|imageBack/.test(k) ? 1800 : 1400).then(r => {
      if (!r || !r.blob) return; const name = k.replace(/[^A-Za-z0-9]+/g, '_') + '.' + r.ext; if (setAt(out, k, name)) files.push({ name, blob: r.blob });
    })))).then(() => {
      const head = `/* =========================================================\n   data.js — 홈페이지 내용은 전부 여기서 수정해요. (✎ EDIT → JS 내보내기로 만든 파일 · ${new Date().toLocaleString('ko-KR')})\n   - 나루의 data.js 를 이 파일로 덮어쓰면 모두에게 보여요.\n` + (files.length ? `   - 같이 받은 사진 ${files.length}장을 나루에 '그 이름 그대로' 올려 주세요: ${files.map(f => f.name).join(', ')}\n` : '') + `   ========================================================= */\n\n`;
      const parts = Object.keys(out).map(k => `  // ${(LABEL[k] || k).replace(/\*\//g, '')}\n  ${JSON.stringify(k)}: ${JSON.stringify(out[k], null, 2).replace(/\n/g, '\n  ')}`);
      save(new Blob([head + 'const SITE = {\n' + parts.join(',\n\n') + '\n};\n'], { type: 'text/javascript' }), 'data.js');
      files.forEach((f, i) => setTimeout(() => save(f.blob, f.name), 450 * (i + 1)));
      pend(0);
      toast(files.length ? `data.js + 사진 ${files.length}장을 받았어요 · 전부 나루에 올려 주세요` : 'data.js 를 받았어요 · 나루에 덮어써 주세요');
    }).catch(() => toast('내보내지 못했어요 · 다시 눌러 주세요'));
  }
  const toData = b => new Promise(ok => { const r = new FileReader(); r.onload = () => ok(r.result); r.readAsDataURL(b); });
  /* ---------- 홈페이지에 저장 (GitHub) ---------- */
  const GH = { owner: '10293810', repo: 'offtherecord', branch: 'main', api: window.__GH_API || 'https://api.github.com' };
  const ghToken = ask => { let t = ''; try { t = localStorage.getItem('gh-token') || ''; } catch (e) {}
    if (!t || ask) { t = (prompt('GitHub 토큰을 붙여 넣어 주세요.\n(처음 한 번만 넣으면 이 브라우저가 기억해요)') || '').trim(); if (t) try { localStorage.setItem('gh-token', t); } catch (e) {} }
    return t; };
  const b64text = str => { const b = new TextEncoder().encode(str); let bin = ''; for (let i = 0; i < b.length; i += 0x8000) bin += String.fromCharCode.apply(null, b.subarray(i, i + 0x8000)); return btoa(bin); };
  const ghPut = (tok, path, content, msg) => {
    const url = `${GH.api}/repos/${GH.owner}/${GH.repo}/contents/${path}`, H = { Authorization: 'Bearer ' + tok, Accept: 'application/vnd.github+json' };
    return fetch(url + '?ref=' + GH.branch + '&t=' + Date.now(), { headers: H, cache: 'no-store' }).then(r => r.ok ? r.json() : (r.status === 404 ? null : Promise.reject(Object.assign(new Error('HTTP ' + r.status), { status: r.status }))))
      .then(cur => fetch(url, { method: 'PUT', headers: H, body: JSON.stringify(Object.assign({ message: msg, content, branch: GH.branch }, cur && cur.sha ? { sha: cur.sha } : {})) }))
      .then(r => r.ok ? r.json() : r.json().catch(() => ({})).then(j => { throw Object.assign(new Error(j.message || ('HTTP ' + r.status)), { status: r.status }); }));
  };
  let PUBBING = false;
  function publishGH() {
    if (PUBBING) return; const tok = ghToken(); if (!tok) { toast('토큰이 있어야 저장할 수 있어요'); return; }
    PUBBING = true; const btn = bar.querySelector('[data-e=publish]'); if (btn) { btn.disabled = true; btn.textContent = '저장하는 중…'; }
    const done = () => { PUBBING = false; if (btn) { btn.disabled = false; btn.textContent = '홈페이지에 저장'; } };
    const out = clone(RAW), stamp = Date.now().toString(36), pics = [];
    Object.keys(PV).forEach(k => { if (PV[k] === '' && !SLOT_URL[k]) setAt(out, k, ''); });
    toast('사진 정리하는 중이에요…');
    idbAll().then(all => Promise.all(Object.keys(all).map(k => shrink(all[k], /hero|banner|back|imageBack/.test(k) ? 1800 : 1400).then(r => {
      if (!r || !r.blob) return; const name = 'media/' + k.replace(/[^A-Za-z0-9]+/g, '_') + '-' + stamp + '.' + r.ext;
      if (setAt(out, k, name)) pics.push({ name, blob: r.blob });
    })))).then(() => pics.reduce((p, f, i) => p.then(() => { toast(`사진 올리는 중… (${i + 1}/${pics.length})`); return toData(f.blob).then(u => ghPut(tok, f.name, u.split(',')[1], '사진 올리기: ' + f.name)); }), Promise.resolve()))
    .then(() => {
      const head = `/* =========================================================\n   data.js — 홈페이지 내용 (✎ EDIT → 홈페이지에 저장 · ${new Date().toLocaleString('ko-KR')})\n   - 홈페이지 주소 끝에 ?owner 를 붙여 들어가면 ✎ EDIT 로 바로 고칠 수 있어요.\n   - 사진은 media/ 폴더에 있어요.\n   ========================================================= */\n\n`;
      const parts = Object.keys(out).map(k => `  // ${(LABEL[k] || k).replace(/\*\//g, '')}\n  ${JSON.stringify(k)}: ${JSON.stringify(out[k], null, 2).replace(/\n/g, '\n  ')}`);
      toast('글 저장하는 중…');
      return ghPut(tok, 'data.js', b64text(head + 'const SITE = {\n' + parts.join(',\n\n') + '\n};\n'), '홈페이지 수정' + (pics.length ? ` (사진 ${pics.length}장)` : ''));
    }).then(() => {
      pend(0); try { localStorage.setItem('sye-pub-at', String(Date.now())); } catch (e) {}
      toast(pics.length ? `저장했어요! 사진 ${pics.length}장 · 1~10분 뒤 모두에게 보여요` : '저장했어요! 1~10분 뒤 모두에게 보여요'); done();
    }).catch(err => {
      done();
      if (err && (err.status === 401 || err.status === 403 || err.status === 404)) { try { localStorage.removeItem('gh-token'); } catch (e) {} toast('토큰이 맞지 않아요 · 다시 누르면 토큰을 새로 넣을 수 있어요'); }
      else toast('저장하지 못했어요 · 인터넷 연결을 확인하고 다시 눌러 주세요');
      console.warn('publish', err);
    });
  }
  if (SYE_CLEAN) idbAll().then(all => Promise.all(Object.keys(all).map(k => idbDel(k)))).catch(() => {});
  bar.addEventListener('click', e => {
    const a = e.target.dataset && e.target.dataset.e; if (!a) return;
    if (a === 'publish') publishGH();
    if (a === 'end') { setEdit(false); toast('편집을 끝냈어요'); }
    if (a === 'text') pane.classList.toggle('on');
    if (a === 'undo') undo();
    if (a === 'export') exportJS();
    if (a === 'restore') { fB.value = ''; fB.click(); }
    if (a === 'backup') idbAll().then(all => { const ks = Object.keys(all); let draft = null; try { draft = JSON.parse(localStorage.getItem('sye-draft') || 'null'); } catch (err) {}
      if (!ks.length && !draft) { toast('아직 백업할 내용이 없어요'); return; }
      const items = {}; return Promise.all(ks.map(k => toData(all[k]).then(u => { items[k] = u; }))).then(() => { save(new Blob([JSON.stringify({ items, draft })], { type: 'application/json' }), 'homepage-backup.json'); toast('백업 파일을 저장했어요'); }); });
  });
  fB.addEventListener('change', () => { const f = fB.files && fB.files[0]; if (!f) return;
    f.text().then(t => { const j = JSON.parse(t) || {}, it = j.items || {}, ks = Object.keys(it);
      return Promise.all(ks.map(k => fetch(it[k]).then(r => r.blob()).then(bl => idbPut(k, bl)))).then(() => {
        if (j.draft) { try { localStorage.setItem('sye-draft', JSON.stringify(j.draft)); } catch (err) {} }
        toast(`백업을 불러왔어요 (사진 ${ks.length}장${j.draft ? ' · 글 수정' : ''})`); try { sessionStorage.setItem('sye-fast', '1'); } catch (err) {} setTimeout(() => location.reload(), 900); });
    }).catch(() => toast('백업 파일을 읽지 못했어요')); });
  /* ---------- 캐릭터 · 페어 추가 / 수정 / 삭제 (창 안의 + 추가 · ✎ 수정 버튼) ---------- */
  document.documentElement.classList.add('sy-owner');
  css.textContent += `
html:not(.sye-editing) .cx-add,html:not(.sye-editing) .cd-tags .ed{display:none!important}
.sye-fm{position:fixed;inset:0;z-index:99996;display:none;align-items:center;justify-content:center;background:rgba(20,40,35,.28);padding:14px}
.sye-fm.on{display:flex}
.sye-fm form{width:min(520px,100%);max-height:calc(100vh - 28px);display:flex;flex-direction:column;background:#F7FAF9;border-radius:16px;box-shadow:0 24px 60px rgba(20,40,35,.3);overflow:hidden;font:500 13px/1.45 'IBM Plex Sans KR',sans-serif;color:#1E2A27}
.sye-fm .fh{padding:14px 16px;background:#fff;border-bottom:1px solid #E1EAE6;font:800 15px 'IBM Plex Sans KR',sans-serif;display:flex;align-items:center}
.sye-fm .fh button{margin-left:auto;width:30px;height:30px;border-radius:8px;border:1px solid #E1EAE6;background:#fff;cursor:pointer}
.sye-fm .fb{flex:1;overflow:auto;padding:4px 16px 16px}
.sye-fm .sec{margin:16px 0 2px;font:800 11px 'Inter',sans-serif;letter-spacing:.14em;color:#3FAE84}
.sye-fm label{display:block;margin-top:10px}
.sye-fm label > span{display:block;font:700 11.5px 'IBM Plex Sans KR',sans-serif;color:#4A5753;margin-bottom:4px}
.sye-fm input,.sye-fm textarea,.sye-fm select{width:100%;box-sizing:border-box;border:1px solid #DCE6E2;border-radius:8px;background:#fff;padding:8px 10px;font:500 13px 'IBM Plex Sans KR',sans-serif;color:#1E2A27;outline:none}
.sye-fm input:focus,.sye-fm textarea:focus{border-color:#6CCBA6;box-shadow:0 0 0 3px rgba(108,203,166,.18)}
.sye-fm small{display:block;margin-top:3px;font-size:11px;color:#8A9894}
.sye-fm .note{margin:12px 0 0;padding:10px 12px;border-radius:10px;background:#EAF6F0;color:#2E5A4B;font-size:12px}
.sye-fm .ff{display:flex;gap:8px;padding:12px 16px calc(12px + env(safe-area-inset-bottom));background:#fff;border-top:1px solid #E1EAE6}
.sye-fm .ff button{height:40px;padding:0 16px;border-radius:10px;border:1px solid #DCE6E2;background:#fff;font:800 13px 'IBM Plex Sans KR',sans-serif;cursor:pointer;color:#1E2A27}
.sye-fm .ff .sv{flex:1;border:0;background:linear-gradient(160deg,#8ADBB9,#4DB88E);color:#fff}
.sye-fm .ff .del{color:#D9506A}
.sye-fm details.more{margin-top:16px;border-top:1px solid #E1EAE6;padding-top:4px}
.sye-fm details.more summary{cursor:pointer;list-style:none;font:800 12.5px 'IBM Plex Sans KR',sans-serif;color:#3FAE84;padding:10px 0 4px}
.sye-fm details.more summary::before{content:'＋ ';}.sye-fm details.more[open] summary::before{content:'－ ';}
.sye-fm .re-r{display:flex;gap:6px;margin-top:6px;align-items:flex-start}
.sye-fm .re-r input,.sye-fm .re-r textarea{flex:1;min-width:0}
.sye-fm .re-x{width:32px;height:34px;flex:none;border:1px solid #DCE6E2;border-radius:8px;background:#fff;color:#D9506A;font:700 15px/1 sans-serif;cursor:pointer}
.sye-fm .re-add{margin-top:7px;height:30px;padding:0 12px;border:1px dashed #6CCBA6;border-radius:8px;background:#fff;color:#3FAE84;font:700 12px 'IBM Plex Sans KR',sans-serif;cursor:pointer}
.sye-fm label.pic input{padding:7px;background:#F4FAF7;border-style:dashed}
`;
  const fm = el(`<div class="sye-fm"><form><div class="fh"><span class="ft"></span><button type="button" class="fx">✕</button></div><div class="fb"></div><div class="ff"></div></form></div>`);
  document.body.appendChild(fm);
  const F = fm.querySelector('form'), FB = fm.querySelector('.fb'), FF = fm.querySelector('.ff');
  const lines = v => String(v || '').split('\n').map(x => x.trim()).filter(Boolean);
  const bars = l => l.split('|').map(x => x.trim());
  const kv = l => { const k = l.indexOf(':'); return k < 0 ? [l, ''] : [l.slice(0, k).trim(), l.slice(k + 1).trim()]; };
  let FS = null;
  const fClose = () => { fm.classList.remove('on'); FS = null; };
  fm.querySelector('.fx').onclick = fClose; fm.addEventListener('click', e => { if (e.target === fm) fClose(); });
  const fld = (label, name, val, type, hint, opts) => {
    let inp; if (type === 'area') inp = `<textarea name="${name}" rows="${opts || 3}">${E(val)}</textarea>`;
    else if (type === 'select') inp = `<select name="${name}">${opts.map(o => `<option value="${E(o)}" ${o === (val || '') ? 'selected' : ''}>${E(o || '— 없음 —')}</option>`).join('')}</select>`;
    else inp = `<input name="${name}" type="${type || 'text'}" value="${E(val)}">`;
    return `<label><span>${label}</span>${inp}${hint ? `<small>${hint}</small>` : ''}</label>`; };
  const W = () => RAW.characters && RAW.characters.worlds || {};
  function fOpen({ w, t, i }) {
    const world = W()[w]; if (!world) return; const list = world[t] || (world[t] = []), isP = t === 'pair', o = i == null ? {} : (list[i] || {});
    const memberNames = ['', ...(world.member || []).map(m => m.name)];
    fm.querySelector('.ft').textContent = `${i == null ? '새로 추가' : '수정'} · ${world.name || w} ${isP ? '페어' : t === 'au' ? 'AU' : '캐릭터'}`;
    let h = '';
    const rowsOf = rs => (rs || []).map(r => Array.isArray(r) ? r.join(' : ') : r).join('\n');
    const pic = (label, name, has) => `<label class="pic"><span>${label}</span><input type="file" name="${name}" accept="image/*"><small>${has ? '바꿀 때만 골라요 · ' : ''}여기서 고르면 저장할 때 같이 들어가요 (나중에 사진 자리를 눌러서 바꿔도 돼요)</small></label>`;
    if (!isP) { const P = o.profile || {};
      h += `<div class="sec">기본 (이것만 적어도 돼요)</div>` + fld('이름 *', 'name', o.name) + fld(teamsOf(world) ? '한국어 이름' : world.style === 'roster' ? '코드네임 (영어)' : '영어 이름', 'en', o.en) + (world.style === 'roster' ? fld('그룹', 'rgroup', (g => g ? g.name + ' · ' + g.cls : '')((world.groups || []).find(g => g.key === o.group)), 'select', '목록에서 들어갈 줄', ['', ...(world.groups || []).map(g => g.name + ' · ' + g.cls)]) + fld('속성', 'el', rsElOf(o), 'select', '고르면 뱃지 색이 알아서 바뀌어요', Object.keys(RS_EL)) : '') + (world.grades ? fld('학년', 'year', o.year || '', 'select', '목록에서 학년별로 나눠서 보여줘요', ['', ...GR_Y.map(g => g[0])]) : '') + (teamsOf(world) ? fld('소속팀', 'dept', o.dept || (teamsOf(world).find(x => !x.match) || {}).key, 'select', '고른 팀 칸에 들어가요 · 카드 위 작은 글씨', [...teamsOf(world).map(x => x.key), ...(o.dept && !teamsOf(world).some(x => x.key === o.dept) ? [o.dept] : [])]) : fld('소속 · 학부', 'dept', o.dept, 'text', '카드 위 작은 글씨')) + fld('한 줄 소개', 'quote', o.quote) + fld('태그', 'tags', (o.tags || []).join(', '), 'text', '쉼표로 나눠요 · 예) #다정, #고양이상')
        + pic(o.card ? '카드 사진 바꾸기' : '카드 사진', 'pic', !!o.card)
        + (world.style !== 'roster' ? fld('사진 쓰는 방법', 'picmode', o.picMode === 'sep' ? '목록 · 첫 화면 · 전환 사진 모두 따로' : '목록 · 전환 사진 같게 (첫 화면만 따로)', 'select', '목록 = 카드 사진 · 첫 화면 = 캐릭터 누르면 나오는 큰 사진 · 전환 = 페어에서 캐릭터 바꿀 때 작은 동그라미 · 비어 있는 자리는 목록 사진을 빌려 보여줘요', ['목록 · 전환 사진 같게 (첫 화면만 따로)', '목록 · 첫 화면 · 전환 사진 모두 따로']) : '')
        + `<details class="more"><summary>더 적기 · 프로필 · 프롬프트 · 노래 (안 적어도 돼요)</summary>`
        + fld('사진 옆 작은 칸', 'spec', rowsOf(o.spec || [['AGE', ''], ['HEIGHT', ''], ['BIRTH', ''], ['LOVER', '']]), 'area', '', 4)
        + fld('프로필 표', 'rows', rowsOf(P.rows || [['좋아하는 것', ''], ['싫어하는 것', ''], ['특징', '']]), 'area', '', 4)
        + fld('성격', 'personality', P.personality, 'area', '', 3) + fld('메모', 'memo', P.memo, 'area', '', 2)
        + fld('프롬프트', 'prompts', (o.prompts || []).map(p => `${p.title || ''} | ${p.text || ''}`).join('\n'), 'area', '', 4)
        + fld('노래', 'music', (o.music || []).map(m => `${m.title || ''} | ${m.artist || ''} | ${m.src || ''}`).join('\n'), 'area', '', 3)
        + fld('캐릭터 송 (♪ 버튼) mp3 주소', 'theme', (o.theme && o.theme.src) || '', 'text', '없으면 비워요')
        + `</details><details class="more"><summary>리뷰 (TALK) 적기</summary>`
        + fld('리뷰', 'talk', (o.talk || []).map(x => [x.name, x.relation, x.call, x.text, x.likes].map(v => v == null ? '' : v).join(' | ') + ((x.replies || []).length ? ' | ' + x.replies.map(r => r.join(': ')).join(' // ') : '')).join('\n'), 'area', '리뷰 하나 = 카드 하나 · 맨 위 리뷰가 BEST 로 보여요', 3)
        + `</details>`;
    } else { const A = o.a || {}, B = o.b || {};
      h += `<div class="sec">기본 (이것만 적어도 돼요)</div>` + fld('페어 이름 *', 'name', o.name)
        + fld('캐릭터 A', 'alink', A.link || '', 'select', 'MEMBER 캐릭터를 고르면 사진 · 소개를 그대로 가져와요', memberNames) + fld('캐릭터 A 이름 (MEMBER 에 없으면)', 'aname', A.link ? '' : A.name)
        + fld('캐릭터 B', 'blink', B.link || '', 'select', '', memberNames) + fld('캐릭터 B 이름 (MEMBER 에 없으면)', 'bname', B.link ? '' : B.name)
        + fld('시작일', 'since', o.since, 'date', 'D+ 날짜가 매일 자동으로 계산돼요')
        + pic(o.photo ? '페어 사진 바꾸기' : '페어 사진 (가로 16:9)', 'pic', !!o.photo)
        + `<details class="more"><summary>더 적기 (안 적어도 돼요)</summary>`
        + fld('영어 이름', 'en', o.en) + fld('한 줄 소개', 'quote', o.quote) + fld('뱃지 (왼쪽 위 · 예: MAIN)', 'badge', o.badge) + fld('태그 (작은 글씨)', 'tags', o.tags, 'text', '예) 태그 X 태그')
        + fld('상태', 'status', o.status, 'text', '예) BONDED, ING, 썸, 연애 중') + fld('다음 기념일 (D+숫자)', 'next', o.next || 100, 'number') + fld('메모', 'memo', o.memo, 'area', '', 3)
        + fld('캐릭터 A 작은 글씨', 'asub', A.sub) + fld('캐릭터 B 작은 글씨', 'bsub', B.sub)
        + `</details>`;
    }
    h += `<div class="note">다 적었으면 <b>저장</b> → 모두에게 보이게 하려면 아래 바의 <b>홈페이지에 저장</b>.</div>`;
    FB.innerHTML = h; FB.scrollTop = 0;
    const rowEd = (name, cols, sep, cls) => {
      const ta = F.elements[name]; if (!ta) return; ta.style.display = 'none';
      const box = document.createElement('div'); box.className = 'rowed'; ta.after(box);
      const plus = document.createElement('button'); plus.type = 'button'; plus.className = 're-add'; plus.textContent = cls === 'talk' ? '+ 리뷰 하나 더' : '+ 한 줄 더'; box.append(plus);
      const sync = () => { ta.value = [...box.querySelectorAll('.re-r')].map(r => [...r.querySelectorAll('input,textarea')].map(x => x.value.replace(/\s*\n\s*/g, ' ').trim()))
        .filter(v => v.some(Boolean)).map(v => v.join(sep)).join('\n'); };
      const add = vals => { const r = document.createElement('div'); r.className = 're-r' + (cls ? ' ' + cls : '');
        r.innerHTML = cols.map(c => { const x = c.area ? `<textarea rows="${c.rows || 2}" placeholder="${E(c.p)}"></textarea>` : `<input${c.num ? ' type="number" min="0"' : ''} placeholder="${E(c.p)}">`; return c.cap ? `<label class="rc"><em>${E(c.cap)}</em>${x}</label>` : x; }).join('') + '<button type="button" class="re-x" title="이 줄 지우기">×</button>';
        [...r.querySelectorAll('input,textarea')].forEach((x, j) => { x.value = vals[j] || ''; }); box.insertBefore(r, plus); };
      const split = l => sep.trim() === ':' ? kv(l) : (() => { const b = bars(l); return cols.length === 2 ? [b[0], b.slice(1).join(' | ')] : b; })();
      const ls = ta.value.split('\n').filter(l => l.trim()); (ls.length ? ls : ['']).forEach(l => add(split(l)));
      box.addEventListener('input', sync);
      box.addEventListener('click', e => { if (e.target === plus) { add([]); sync(); box.querySelector('.re-r:last-of-type input,.re-r:last-of-type textarea')?.focus(); } else if (e.target.classList.contains('re-x')) { e.target.parentElement.remove(); sync(); } });
      sync();
    };
    if (!isP) {
      rowEd('spec', [{ p: '항목 (예: AGE)' }, { p: '내용' }], ' : ');
      rowEd('rows', [{ p: '항목 (예: 좋아하는 것)' }, { p: '내용' }], ' : ');
      rowEd('prompts', [{ p: '제목' }, { p: '프롬프트', area: true }], ' | ');
      rowEd('music', [{ p: '노래 제목' }, { p: '가수' }, { p: 'mp3 주소 (없으면 비워요)' }], ' | ');
      rowEd('talk', [{ cap: '이름', p: '예) 하루' }, { cap: '관계', p: '예) 소꿉친구' }, { cap: '부르는 말', p: '예) 너' }, { cap: '리뷰 내용', p: '이 캐릭터에 대한 한마디', area: true, rows: 3 }, { cap: '좋아요', p: '0', num: true }, { cap: '답글 (없으면 비워요)', p: '이름: 내용 // 이름: 내용', area: true }], ' | ', 'talk');
    }
    FF.innerHTML = `<button type="submit" class="sv">저장</button>${i != null ? '<button type="button" class="del">삭제</button>' : ''}<button type="button" class="cc">취소</button>`;
    FF.querySelector('.cc').onclick = fClose;
    const del = FF.querySelector('.del'); if (del) { let armed = false; del.onclick = () => { if (!armed) { armed = true; del.textContent = '한 번 더 누르면 삭제'; return; } fDelete(w, t, i); }; }
    // 보기 좋게 : 제목 위 작은 글씨 · 칸을 하얀 카드로 묶고 · 짧은 칸은 두 줄로 나란히
    F.classList.add('cf'); const ft2 = fm.querySelector('.ft'); ft2.innerHTML = `<small>${E((world.name || w) + ' · ' + (isP ? 'PAIR' : t === 'au' ? 'AU' : 'CHARACTER'))}</small><span>${i == null ? '새로 추가' : `<b>${E(o.name || '')}</b> 수정`}</span>`;
    const pack = root => { const kids = [...root.children]; let card = null;
      kids.forEach(k => { if (k.classList.contains('sec')) { card = document.createElement('div'); card.className = 'fcard'; k.before(card); card.append(k); return; }
        if (k.tagName === 'DETAILS') { pack(k); card = null; return; } if (k.classList.contains('note') || k.tagName === 'SUMMARY') { card = null; return; }
        if (!card) { card = document.createElement('div'); card.className = 'fcard'; k.before(card); } card.append(k); }); };
    pack(FB);
    const duoRow = (a, b) => { const A = F.elements[a], B = F.elements[b]; const la = A && A.closest('label'), lb = B && B.closest('label'); if (!la || !lb || la.parentElement !== lb.parentElement) return; const r = document.createElement('div'); r.className = 'frow'; la.before(r); r.append(la, lb); };
    duoRow('name', 'en'); duoRow('rgroup', 'el'); duoRow('year', 'dept');
    // 제안 칩 : 한국어 이름 → 영어 이름 후보 · 세이란 학부 → 일본어 학부 후보 (누르면 넣어져요, 안 누르면 그대로)
    const sug = (inp, get) => { if (!inp) return; const box = document.createElement('div'); box.className = 'fsug'; (inp.closest('label') || inp).append(box);
      const draw = () => { const c = get().filter((x, i, a) => x && x !== inp.value.trim() && a.indexOf(x) === i); box.innerHTML = c.length ? `<span>제안</span>${c.map(x => `<button type="button">${E(x)}</button>`).join('')}` : ''; };
      box.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; inp.value = b.textContent; inp.dispatchEvent(new Event('input', { bubbles: true })); draw(); });
      return draw; };
    const nmI = F.elements.name, enI = F.elements.en;
    // '성 이름' 하나만 (서은율 → Seo Eunyul) · FRONTLINE 은 이름 칸이 영어(아래 칸 한국어 → 위 이름 칸에 제안) · ETC 는 양쪽 다
    if (nmI && enI) { const fl = !!teamsOf(world), etc = w === 'etc' || /^etc/i.test(world.name || ''), ko = x => /[가-힣]/.test(x.value) ? romaKo(x.value).slice(0, 1) : [];
      const ds = []; if (!fl) ds.push(sug(enI, () => ko(nmI))); if (fl || etc) ds.push(sug(nmI, () => ko(enI)));
      const d = () => ds.forEach(f => f && f()); nmI.addEventListener('input', d); enI.addEventListener('input', d); d(); }
    const dpI = F.elements.dept;
    if (dpI && world.grades && dpI.tagName === 'INPUT') { dpI.setAttribute('list', 'sy-depts'); if (!document.getElementById('sy-depts')) { const dl = document.createElement('datalist'); dl.id = 'sy-depts'; dl.innerHTML = [...new Set(Object.values(JP_DEPT))].map(x => `<option value="${x}学部">`).join(''); document.body.append(dl); }
      const d = sug(dpI, () => /[가-힣]/.test(dpI.value) ? [jaDept(dpI.value)] : []); dpI.addEventListener('input', d); d(); } duoRow('alink', 'aname'); duoRow('blink', 'bname');
    FS = { w, t, i, o }; fm.classList.add('on');
  }
  function commit(msg, w, sel) { pend(); try { localStorage.setItem('sye-draft', JSON.stringify(RAW)); } catch (e) { alert('저장 공간이 부족해서 저장하지 못했어요'); return; }
    toast(msg); fClose();
    // 새로고침 없이 그 자리에서 바로 바뀌어요 (혹시 실패하면 예전처럼 다시 불러와요)
    liveChars(w, sel).catch(err => { console.error(err); try { sessionStorage.setItem('sye-fast', '1'); sessionStorage.setItem('sye-reopen', w); } catch (e) {} setTimeout(() => location.reload(), 400); });
  }
  function liveChars(w, sel) {
    const c = JSON.parse(JSON.stringify(RAW.characters || {})); SYE_TZ(c, ['characters']); SYE_TT(c, ['characters'], 'characters');
    SLOTS.forEach(x => { if (x.path.startsWith('characters.')) PV[x.path] = x.val; });
    return idbAll().catch(() => ({})).then(all => {
      Object.keys(SLOT_URL).filter(k => k.startsWith('characters.') && !(k in all)).forEach(k => setURL(k, null));
      Object.keys(all).filter(k => k.startsWith('characters.')).forEach(k => setURL(k, all[k]));
      S.characters = c;
      if (sel) { charSel = sel; charTabKey = sel.t; charView = 'photo'; charTab = 'profile'; }
      const ok = charSel && ((((c.worlds || {})[charSel.w] || {})[charSel.t]) || [])[charSel.i];
      if (!ok) { charSel = null; closeWin('chardet'); closeWin('agent'); }
      if (wins.get('chars')) openChars();
      if (ok && (sel || wins.get('chardet') || wins.get('agent'))) openCharDetail();
      paint();
    });
  }
  function fDelete(w, t, i) {
    const list = W()[w][t]; list.splice(i, 1);
    const base = `characters.worlds.${w}.${t}.`; idbAll().then(all => Promise.all(Object.keys(all).filter(k => k.startsWith(base)).map(k => { const rest = k.slice(base.length), n = parseInt(rest, 10), tail = rest.slice(String(n).length);
      if (n === i) return idbDel(k); if (n > i) return idbDel(k).then(() => idbPut(base + (n - 1) + tail, all[k])); }))).then(() => commit('삭제했어요', w), () => commit('삭제했어요', w));
  }
  F.addEventListener('submit', e => {
    e.preventDefault(); if (!FS) return; const v = n => { const x = F.elements[n]; return x ? x.value.trim() : ''; };
    const { w, t, i } = FS, list = W()[w][t], o = JSON.parse(JSON.stringify(FS.o)), isP = t === 'pair';
    if (!v('name')) { toast('이름을 적어 주세요'); return; }
    if (!isP) {
      ['name', 'en', 'dept', 'quote'].forEach(k => { o[k] = v(k); });
      if (W()[w].grades) { if (v('year')) o.year = v('year'); else delete o.year; }
      if (F.elements.picmode) { if (/모두 따로/.test(v('picmode'))) o.picMode = 'sep'; else delete o.picMode; }
      if (W()[w].style === 'roster') { const gk = ((W()[w].groups || []).find(g => g.name + ' · ' + g.cls === v('rgroup')) || {}).key; if (gk) o.group = gk; delete o.grade; o.el = v('el') || '무속성'; o.attr = rsBadge(o.el, ''); o.attrColor = RS_EL[o.el]; }
      o.tags = v('tags').split(',').map(x => x.trim()).filter(Boolean);
      o.spec = lines(v('spec')).map(kv);
      o.profile = Object.assign({}, o.profile, { rows: lines(v('rows')).map(kv), personality: v('personality'), memo: v('memo') });
      o.prompts = lines(v('prompts')).map(l => { const b = bars(l); return b.length > 1 ? { title: b[0], text: b.slice(1).join(' | ') } : { title: '프롬프트', text: b[0] }; });
      o.music = lines(v('music')).map(l => { const b = bars(l); return { title: b[0] || '', artist: b[1] || '', src: b[2] || '' }; });
      o.theme = Object.assign({ title: 'CHARACTER SONG' }, o.theme, { src: v('theme') });
      o.talk = lines(v('talk')).map(l => { const b = bars(l); return { name: b[0] || '', avatar: '', relation: b[1] || '', call: b[2] || '', best: false, likes: +(b[4] || 0) || 0, text: b[3] || '', replies: b[5] ? b[5].split('//').map(x => kv(x.replace(':', ' : ')).map(s => s.trim())).filter(r => r[0] || r[1]) : [] }; });
      if (o.talk[0]) o.talk[0].best = true;
      if (!('card' in o)) o.card = ''; if (!('photo' in o)) o.photo = ''; if (!('avatar' in o)) o.avatar = ''; if (!o.gallery) o.gallery = ['', '', ''];
    } else {
      ['name', 'en', 'badge', 'tags', 'quote', 'status', 'since', 'memo'].forEach(k => { o[k] = v(k); }); o.next = +v('next') || 100;
      o.a = Object.assign({ avatar: '' }, o.a, { name: v('alink') || v('aname'), sub: v('asub'), link: v('alink') });
      o.b = Object.assign({ avatar: '' }, o.b, { name: v('blink') || v('bname'), sub: v('bsub'), link: v('blink') });
      if (!('photo' in o)) o.photo = ''; if (!('back' in o)) o.back = '';
    }
    if (i == null) list.push(o); else list[i] = o;
    const msg = i == null ? '추가했어요' : '저장했어요', file = F.elements.pic && F.elements.pic.files && F.elements.pic.files[0];
    if (file && /^image\//.test(file.type)) { const idx = i == null ? list.length - 1 : i; idbPut(`characters.worlds.${w}.${t}.${idx}.${isP ? 'photo' : 'card'}`, file).then(() => commit(msg + ' · 사진도 넣었어요', w), () => commit(msg, w)); }
    else commit(msg, w);
  });
  // + 추가 : 따로 창을 띄우지 않고, 같은 모양의 새 카드를 바로 만들어서 열어줘요 → 글자를 눌러 고치고 사진 자리를 눌러 사진을 넣어요
  function quickAdd({ w, t }) {
    const world = W()[w]; if (!world) return; const list = world[t] || (world[t] = []), n = list.length + 1;
    let o;
    if (t === 'pair') o = { badge: 'NEW', name: `새 페어 ${n}`, en: 'NEW PAIR', quote: '페어 한 줄 소개를 적어 주세요', tags: '태그 X 태그', status: 'ING', since: new Date().toISOString().slice(0, 10), next: 100, photo: '', back: '', memo: '페어 메모를 적어 주세요',
      a: { name: '캐릭터 A', sub: 'A', avatar: '', link: '' }, b: { name: '캐릭터 B', sub: 'B', avatar: '', link: '' } };
    else if (world.style === 'roster' && (world.member || [])[0]) { o = JSON.parse(JSON.stringify(world.member[0])); Object.assign(o, { name: `새 캐릭터 ${n}`, en: `New Character ${n}`, quote: '‘한 줄 소개를 적어 주세요.’', card: '', avatar: '', hero: '', gallery: ['', '', ''] });
      o.duo = [Object.assign(JSON.parse(JSON.stringify(o)), { name: '페르소나', en: 'Persona', tag: 'PERSONA', level: '[ PERSONA FILE ]', badge: '', theme: o.theme === 'dark' ? 'light' : 'dark', group: undefined, attr: undefined, attrColor: undefined })]; delete o.duo[0].duo; }
    else o = { dept: '소속', name: `새 캐릭터 ${n}`, en: `New Character ${n}`, quote: '한 줄 소개를 적어 주세요', tags: ['#태그'],
      spec: [['AGE', '00'], ['HEIGHT', '000'], ['BIRTH', '00.00'], ['LOVER', '연인 이름']], card: '', photo: '', theme: { title: 'CHARACTER SONG', src: '' },
      profile: { rows: [['좋아하는 것', '내용'], ['싫어하는 것', '내용'], ['특징', '내용']], personality: '성격을 적어 주세요.', memo: '짧은 메모를 적어 주세요.' },
      prompts: [{ title: '기본 외형', text: '프롬프트를 적어요' }], gallery: ['', '', ''], music: [{ title: '노래 제목', artist: '가수', src: '' }], talk: [] };
    list.push(o);
    commit((t === 'pair' ? '새 페어' : '새 캐릭터') + '를 만들었어요 · 글자를 눌러 고치고, 사진 자리를 눌러 사진을 넣어요', w, { w, t, i: list.length - 1 });
  }
  // ARCH : 상대(duo) 캐릭터 추가 · 지우기
  addEventListener('sye-duo', e => { const { w, i, del, swap } = e.detail || {}, world = W()[w], m = world && (world.member || [])[i]; if (!m) return;
    if (swap) { m.duoFirst = !m.duoFirst; if (!m.duoFirst) delete m.duoFirst; agentKey = ''; commit(m.duoFirst ? '페르소나를 앞자리로 옮겼어요' : '캐릭터를 앞자리로 옮겼어요', w, null); return; }
    const duo = Array.isArray(m.duo) ? m.duo : (m.duo = []);
    if (del) { duo.splice(del - 1, 1); const base = `characters.worlds.${w}.member.${i}.duo.`;
      idbAll().then(all => Promise.all(Object.keys(all).filter(k => k.startsWith(base)).map(k => { const rest = k.slice(base.length), n = parseInt(rest, 10), tail = rest.slice(String(n).length);
        if (n === del - 1) return idbDel(k); if (n > del - 1) return idbDel(k).then(() => idbPut(base + (n - 1) + tail, all[k])); }))).catch(() => {}).then(() => { agentWho = 0; commit('상대 캐릭터를 지웠어요', w, null); }); return; }
    const o = JSON.parse(JSON.stringify(m)); delete o.duo; delete o.group; delete o.attr; delete o.attrColor;
    Object.assign(o, { theme: m.theme === 'dark' ? 'light' : 'dark', name: '페르소나', en: 'Persona', tag: 'PERSONA', level: '[ PERSONA FILE ]', code: '', badge: '', quote: '‘이 캐릭터의 상대, 내 페르소나예요. 한 줄 소개를 적어 주세요.’', card: '', avatar: '', hero: '', gallery: ['', '', ''] });
    duo.push(o); agentWho = duo.length; agentKey = w + '/' + i;
    commit('페르소나를 만들었어요 · 글자를 눌러 고치고, 사진 자리를 눌러 사진을 넣어요', w, null);
  });
  /* ---------- TALK 대화방 추가 · 수정 · 삭제 ---------- */
  const tRooms = () => {
    const c = RAW.chat || (RAW.chat = {});
    if (!c.rooms) RAW.chat = { me: c.me || { name: '나', avatar: '' }, rooms: [{ name: c.partner || '상대', status: c.status || '', avatar: c.avatar || '', time: '', unread: 0, messages: c.messages || [], replies: c.replies || [], incoming: c.incoming || [] }] };
    return RAW.chat.rooms;
  };
  const tCommit = (msg, i) => { pend(); try { localStorage.setItem('sye-draft', JSON.stringify(RAW)); sessionStorage.setItem('sye-fast', '1'); sessionStorage.setItem('sye-talk-open', String(i)); } catch (e) { alert('저장 공간이 부족해서 저장하지 못했어요'); return; } toast(msg); setTimeout(() => location.reload(), 500); };
  const tm = el(`<div class="sye-fm tk-fm"><form><div class="fh"><span class="ft"></span><button type="button" class="fx">✕</button></div><div class="fb"></div><div class="ff"></div></form></div>`);
  document.body.appendChild(tm);
  const TF = tm.querySelector('form'), TB = tm.querySelector('.fb'), TFF = tm.querySelector('.ff');
  const tClose = () => tm.classList.remove('on');
  tm.querySelector('.fx').onclick = tClose; tm.addEventListener('click', e => { if (e.target === tm) tClose(); });
  const toLines = ms => (ms || []).map(m => (m.from === 'me' ? '나: ' : m.name ? '@' + m.name + ': ' : '') + (m.text || '') + (m.react ? ' [' + m.react + ']' : '')).join('\n');
  const fromLines = t => t.split('\n').map(l => l.trim()).filter(Boolean).map(l => {
    let rx = ''; const rm = l.match(/\s*\[([^\]]{1,12})\]\s*$/); if (rm) { rx = rm[1].trim(); l = l.slice(0, rm.index); }
    const o = (() => { let m = l.match(/^(나|me)\s*[:：]\s*(.*)$/i); if (m) return { from: 'me', text: m[2] };
    m = l.match(/^@([^:：]{1,20})[:：]\s*(.*)$/); if (m) return { from: 'them', name: m[1].trim(), text: m[2] };
    return { from: 'them', text: l }; })();
    if (rx) o.react = rx; return o;
  });
  let TS = null;
  function tOpen(i) {
    const R = tRooms(), r = i == null ? { name: `새 대화방 ${R.length + 1}`, status: '온라인', avatar: '', time: '방금', unread: 1, messages: [{ from: 'them', text: '첫 메시지를 적어 주세요' }], replies: ['답장을 적어 주세요'], incoming: [] } : R[i];
    if (!r) return; TS = { i };
    tm.querySelector('.ft').textContent = i == null ? '＋ 새 대화방' : '✎ 대화방 수정';
    TB.innerHTML = `<div class="sec">대화방</div>
      <label><span>이름 (목록 · 대화 창 위)</span><input name="name" value="${E(r.name || '')}"></label>
      <label><span>상태 한 줄</span><input name="status" value="${E(r.status || '')}" placeholder="예: 대기실 · 온라인"></label>
      <label><span>공지 (대화 창 위에 고정 · 비우면 안 보여요)</span><input name="notice" value="${E(r.notice || '')}" placeholder="예: 토요일 축제 리허설 오후 3시 · 402호 집합"></label>
      <div style="display:flex;gap:8px"><label style="flex:1"><span>목록에 보이는 시간</span><input name="time" value="${E(r.time || '')}" placeholder="예: 오후 9:41 · 어제"></label><label style="width:120px"><span>안 읽은 메시지 수</span><input name="unread" type="number" min="0" value="${+r.unread || 0}"></label></div>
      <div class="sec">대화 내용</div>
      <label><span>한 줄에 메시지 하나</span><textarea name="messages" rows="10">${E(toLines(r.messages))}</textarea>
        <small>그냥 적으면 <b>상대</b> 말풍선 · <b>나: 내용</b> 은 내 말풍선 · 단톡방이면 <b>@이름: 내용</b> 으로 보낸 사람을 정해요 · 끝에 <b>[♥ 2]</b> 를 붙이면 하트 반응</small></label>
      <label><span>내가 메시지를 보내면 돌아오는 답장 (한 줄에 하나 · 차례대로)</span><textarea name="replies" rows="3">${E((r.replies || []).join('\n'))}</textarea></label>
      <label><span>홈에 있으면 가끔 오는 알림 (한 줄에 하나 · 맨 위 대화방만)</span><textarea name="incoming" rows="2">${E((r.incoming || []).join('\n'))}</textarea></label>
      <div class="sec">나</div>
      <label><span>내 이름 (모든 대화방 공통)</span><input name="me" value="${E((RAW.chat.me || {}).name || '')}"></label>
      ${i != null && i > 0 ? '<label class="tk-topck"><input type="checkbox" name="top" style="width:auto;margin-right:6px">목록 맨 위로 올리기</label>' : ''}
      <div class="note">프로필 사진은 <b>✎ EDIT</b> 를 켠 상태에서 목록이나 대화 창의 동그라미 사진 자리를 눌러서 넣어요. 다 고쳤으면 <b>저장</b> → 모두에게 보이게 하려면 아래 바의 <b>홈페이지에 저장</b>.</div>`;
    TFF.innerHTML = `<button type="submit" class="sv">저장</button>${i != null ? '<button type="button" class="del">삭제</button>' : ''}<button type="button" class="cc">취소</button>`;
    TFF.querySelector('.cc').onclick = tClose;
    const del = TFF.querySelector('.del'); if (del) { let armed = false; del.onclick = () => { if (!armed) { armed = true; del.textContent = '한 번 더 누르면 삭제'; return; } tDelete(i); }; }
    tm.classList.add('on'); setTimeout(() => TF.elements.name.focus(), 50);
  }
  function tDelete(i) {
    const R = tRooms(); R.splice(i, 1); const base = 'chat.rooms.';
    idbAll().then(all => Promise.all(Object.keys(all).filter(k => k.startsWith(base)).map(k => { const rest = k.slice(base.length), n = parseInt(rest, 10), tail = rest.slice(String(n).length);
      if (n === i) return idbDel(k); if (n > i) return idbDel(k).then(() => idbPut(base + (n - 1) + tail, all[k])); }))).then(() => tCommit('대화방을 지웠어요', -1), () => tCommit('대화방을 지웠어요', -1));
  }
  TF.addEventListener('submit', e => {
    e.preventDefault(); if (!TS) return; const v = n => (TF.elements[n] ? TF.elements[n].value.trim() : '');
    if (!v('name')) { toast('대화방 이름을 적어 주세요'); return; }
    const R = tRooms(), i = TS.i, o = i == null ? { avatar: '' } : JSON.parse(JSON.stringify(R[i]));
    Object.assign(o, { name: v('name'), status: v('status'), notice: v('notice'), time: v('time'), unread: Math.max(0, +v('unread') || 0), messages: fromLines(TF.elements.messages.value), replies: v('replies').split('\n').map(x => x.trim()).filter(Boolean), incoming: v('incoming').split('\n').map(x => x.trim()).filter(Boolean) });
    if (v('me')) RAW.chat.me = Object.assign({ avatar: '' }, RAW.chat.me, { name: v('me') });
    let at = i;
    if (i == null) { R.push(o); at = R.length - 1; } else R[i] = o;
    const top = TF.elements.top && TF.elements.top.checked;
    if (top && at > 0) {   // 맨 위로 : 사진 자리 번호도 같이 옮겨요
      R.splice(at, 1); R.unshift(o); const base = 'chat.rooms.', from = at;
      idbAll().then(all => { const ks = Object.keys(all).filter(k => k.startsWith(base)), ops = [];
        ks.forEach(k => { const rest = k.slice(base.length), n = parseInt(rest, 10), tail = rest.slice(String(n).length); if (n <= from) ops.push([k, base + (n === from ? 0 : n + 1) + tail, all[k]]); });
        return Promise.all(ops.map(([k]) => idbDel(k))).then(() => Promise.all(ops.map(([, k2, val]) => idbPut(k2, val)))); }).then(() => tCommit('저장했어요 · 맨 위로 올렸어요', 0), () => tCommit('저장했어요', 0));
      return;
    }
    tCommit(i == null ? '새 대화방을 만들었어요' : '저장했어요', at);
  });

  /* ---------- 입장 화면 · 비밀번호 수정 ---------- */
  const im = el(`<div class="sye-fm in-fm"><form><div class="fh"><span class="ft">✎ 입장 화면 · 비밀번호</span><button type="button" class="fx">✕</button></div><div class="fb"></div><div class="ff"><button type="submit" class="sv">저장</button><button type="button" class="cc">취소</button></div></form></div>`);
  document.body.appendChild(im);
  const IF = im.querySelector('form'), IB = im.querySelector('.fb');
  const iClose = () => im.classList.remove('on');
  im.querySelector('.fx').onclick = iClose; im.querySelector('.cc').onclick = iClose; im.addEventListener('click', e => { if (e.target === im) iClose(); });
  function iOpen() {
    const I = RAW.intro || {}, K = I.clinic || {}, L = I.lock || {};
    const f = (lab, n, v, ph = '', note = '') => `<label><span>${lab}</span><input name="${n}" value="${E(v ?? '')}" placeholder="${E(ph)}">${note ? `<small>${note}</small>` : ''}</label>`;
    IB.innerHTML = `<div class="sec">비밀번호 화면</div>
      ${f('비밀번호', 'pw', L.password, '비워두면 잠금 없이 바로 입장', '바꾸면 다음에 들어올 때부터 새 비밀번호를 물어봐요 · 저장소가 공개라 중요한 비밀번호는 쓰지 마세요')}
      ${f('위 작은 글씨', 'ltitle', L.title, 'MEMBERS ONLY')}${f('안내 문구', 'ltext', L.text, '비밀번호를 입력해 주세요')}${f('틀렸을 때 문구', 'lwrong', L.wrong, '비밀번호가 달라요')}
      <div class="sec">입장 티켓</div>
      ${f('큰 제목', 'title', K.title || RAW.clinic?.title, 'UNRELEASED')}
      ${f('왼쪽 위 검은 탭 글씨', 'online', K.online, 'NOW REHEARSING')}
      ${f('사진 아래 말풍선', 'bubble', K.bubble, '조용히 들어와 주세요 ♪')}
      ${f('제목 아래 한 줄', 'sub', K.sub, 'FRONT ROW × LEAD VOCAL')}
      ${f('검은 꼬리표 글씨', 'tag', K.tag, 'off the record')}
      ${f('오른쪽 큰 글씨 (3글자 정도)', 'stub', K.stub, 'OTR')}
      ${f('버튼 글씨 (다 찼을 때)', 'enter', K.enter, 'ENTER')}${f('누른 뒤 글씨', 'admitted', K.admitted, 'WELCOME')}
      <label><span>로딩 중 바뀌는 글씨 (한 줄에 하나 · 맨 아래 줄은 다 찼을 때)</span><textarea name="status" rows="5">${E((K.status || []).join('\n'))}</textarea></label>
      <div class="note">동그라미 사진(로고)은 입장 화면에서 동그라미를 눌러서 넣어요. 다 고쳤으면 <b>저장</b> → 모두에게 보이게 하려면 아래 바의 <b>홈페이지에 저장</b>.</div>`;
    im.classList.add('on');
  }
  IF.addEventListener('submit', e => {
    e.preventDefault(); const v = n => (IF.elements[n] ? IF.elements[n].value.trim() : '');
    const I = RAW.intro = RAW.intro || {}, K = I.clinic = I.clinic || {}, L = I.lock = I.lock || {};
    const set = (o, k, val) => { if (val) o[k] = val; else delete o[k]; };
    L.password = v('pw'); set(L, 'title', v('ltitle')); set(L, 'text', v('ltext')); set(L, 'wrong', v('lwrong'));
    ['title', 'online', 'bubble', 'sub', 'tag', 'stub', 'enter', 'admitted'].forEach(k => set(K, k, v(k)));
    const st = IF.elements.status.value.split('\n').map(x => x.trim()).filter(Boolean); if (st.length >= 2) K.status = st;
    pend(); try { localStorage.setItem('sye-draft', JSON.stringify(RAW)); sessionStorage.setItem('sye-fast', '1'); if (L.password) sessionStorage.setItem('gt-pass', L.password); } catch (er) { alert('저장 공간이 부족해서 저장하지 못했어요'); return; }
    toast('입장 화면을 고쳤어요'); setTimeout(() => location.reload(), 500);
  });
  addEventListener('sye-intro', iOpen);
  addEventListener('sye-talk', e => tOpen(e.detail ? e.detail.i : null));
  addEventListener('sye-char', e => e.detail && e.detail.i == null ? quickAdd(e.detail) : fOpen(e.detail));
  // 편집 중 : 목록 카드의 글자(소속 · 이름 · 영어 이름)를 누르면 그 캐릭터의 수정 창이 바로 열려요
  window.addEventListener('click', e => {
    if (!SYE_ON || !e.isTrusted) return; const ov = e.target.closest && e.target.closest('#winlayer .cxwin [data-ci] .cx-ov, #winlayer .cxwin [data-ci] .ov, #winlayer .cxwin [data-ci] .cp-h, #winlayer .cxwin [data-ci] .cp-ov');
    if (!ov) return; const c = ov.closest('[data-ci]'); e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
    fOpen({ w: charWorld, t: charTabKey, i: +c.dataset.ci });
  }, true);
  ['pointerdown', 'mousedown'].forEach(ev => window.addEventListener(ev, e => { if (SYE_ON && e.target.closest && e.target.closest('#winlayer .cxwin [data-ci] .cx-ov, #winlayer .cxwin [data-ci] .ov, #winlayer .cxwin [data-ci] .cp-h, #winlayer .cxwin [data-ci] .cp-ov')) e.stopPropagation(); }, true));
  // 편집 중에도 캐릭터 · 페어 목록의 카드를 누르면 상세 창이 열려요 (카드 안 글자 · 사진은 상세 창에서 고쳐요)
  let cardPass = false;
  const cardOf = e => SYE_ON && !cardPass && e.isTrusted && e.target.closest && e.target.closest('#winlayer .cxwin [data-ci]');   // 코드로 누른 클릭은 그대로 통과
  ['pointerdown', 'mousedown'].forEach(ev => window.addEventListener(ev, e => { if (cardOf(e)) e.stopPropagation(); }, true));
  window.addEventListener('click', e => { const c = cardOf(e); if (!c) return; e.stopPropagation(); e.preventDefault(); cardPass = true; try { c.click(); } finally { cardPass = false; } }, true);
  document.addEventListener('click', e => { const b = e.target.closest('.cd-tags .ed'); if (!b || !charSel) return; e.preventDefault(); e.stopPropagation(); fOpen({ w: charSel.w, t: charSel.t, i: charSel.i }); }, true);
  // 저장하고 다시 불러오면 그 캐릭터 창을 다시 열어줘요
  try { const rw = sessionStorage.getItem('sye-reopen'); if (rw) { sessionStorage.removeItem('sye-reopen'); const t0 = Date.now(), iv = setInterval(() => { if (document.querySelector('#intro') && Date.now() - t0 < 9000) return; clearInterval(iv); const id = Object.keys(GRP_APPS).find(k => GRP_APPS[k] === rw); const a = id && document.querySelector(`.apps [data-open="${id}"]`); a && setTimeout(() => a.click(), 400);
    let sel = null; try { sel = JSON.parse(sessionStorage.getItem('sye-reopen-sel') || 'null'); sessionStorage.removeItem('sye-reopen-sel'); } catch (e) {}
    if (sel) { let tries = 0, tabbed = false; const go = () => { const win = document.querySelector('#winlayer .cxwin');
        if (win && sel.t !== 'member' && !tabbed) { win.querySelector(`[data-ck="${sel.t}"]`)?.click(); tabbed = true; return setTimeout(go, 450); }
        const c = win && win.querySelector(`[data-ci="${sel.i}"]`);
        if (c) { setTimeout(() => { c.scrollIntoView({ block: 'nearest' }); c.click(); }, 350); } else if (++tries < 25) setTimeout(go, 250); };
      setTimeout(go, 700); }
  }, 200); } } catch (e) {}
  /* ---------- ✎ 연필 : Notice 에 글쓰기 (나만) ---------- */
  const wf = el(`<div class="sye-fm sye-wf"><form><div class="fh"><span>✎ Notice 에 글쓰기</span><button type="button" class="fx">✕</button></div><div class="fb">
    <label><span>제목 *</span><input name="title" required placeholder="글 제목"></label>
    <label><span>분류</span><input name="tag" value="NOTICE"><small>제목 옆 작은 글씨 · 예) NOTICE, UPDATE, 배너</small></label>
    <label><span>한 줄 요약</span><input name="excerpt" placeholder="목록 카드에 보이는 한 줄"></label>
    <label><span>내용</span><textarea name="body" rows="7" placeholder="본문을 적어요"></textarea></label>
    <label><span>사진 (여러 장 가능)</span><input name="pics" type="file" accept="image/*" multiple><small>사진은 이 브라우저에 저장되고, JS 내보내기 할 때 사진 파일로 같이 나와요</small></label>
    <div class="note">올리면 이 브라우저의 Notice 에 바로 보여요. 모두에게 보이게 하려면 ✎ EDIT → 홈페이지에 저장</div>
    </div><div class="ff"><button type="button" class="fx2">취소</button><button type="submit" class="sv">올리기</button></div></form></div>`);
  document.body.appendChild(wf);
  const wForm = wf.querySelector('form');
  const wClose = () => wf.classList.remove('on');
  wf.querySelectorAll('.fx,.fx2').forEach(b => b.onclick = wClose);
  wf.addEventListener('click', e => { if (e.target === wf) wClose(); });
  document.querySelector('.sy-write')?.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); wForm.reset(); wf.classList.add('on'); setTimeout(() => wForm.elements.title.focus(), 50); }, true);
  const draftNow = () => { let d = null; try { d = JSON.parse(localStorage.getItem('sye-draft') || 'null'); } catch (e) {} return Object.assign(clone(RAW), d || {}); };
  const saveDraft = d => { localStorage.setItem('sye-draft', JSON.stringify(d)); sessionStorage.setItem('sye-fast', '1'); };
  wForm.addEventListener('submit', e => {
    e.preventDefault(); const F = wForm.elements, title = F.title.value.trim(); if (!title) return;
    const d = draftNow(); d.notice = d.notice || { posts: [] }; d.notice.posts = d.notice.posts || [];
    const no = Math.max(0, ...d.notice.posts.map(p => +p.no || 0)) + 1, idx = d.notice.posts.length, now = new Date();
    const esc2 = t => t.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])).replace(/\n/g, '<br>');
    const files = [...(F.pics.files || [])];
    const post = { no, title, tag: F.tag.value.trim() || 'NOTICE', date: `${now.getFullYear()}. ${now.getMonth() + 1}. ${now.getDate()}.`, excerpt: F.excerpt.value.trim(),
      images: files.map(f => ({ src: '', name: f.name, size: Math.max(1, Math.round(f.size / 1024)) + 'KB', url: '' })),
      fields: F.body.value.trim() ? [{ label: 'NOTE', value: esc2(F.body.value.trim()) }] : [] };
    d.notice.posts.push(post);
    Promise.all(files.map((f, j) => idbPut(`notice.posts.${idx}.images.${j}.src`, f))).then(() => {
      try { saveDraft(d); sessionStorage.setItem('sye-notice', String(no)); } catch (err) { alert('저장 공간이 부족해서 올리지 못했어요'); return; }
      toast('Notice 에 올렸어요'); setTimeout(() => location.reload(), 500);
    }).catch(() => toast('사진을 저장하지 못했어요'));
  });
  // 글 지우기 (Notice 글 창 안)
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-pdel]'); if (!b) return; e.preventDefault(); e.stopPropagation();
    if (!confirm('이 글을 지울까요?')) return;
    const no = +b.dataset.pdel, d = draftNow(), i = (d.notice?.posts || []).findIndex(p => +p.no === no); if (i < 0) return;
    const n = d.notice.posts[i].images?.length || 0; d.notice.posts.splice(i, 1);
    for (let j = 0; j < n; j++) idbDel(`notice.posts.${i}.images.${j}.src`);
    try { saveDraft(d); } catch (err) {} toast('글을 지웠어요'); setTimeout(() => location.reload(), 500);
  }, true);
  try { const nn = sessionStorage.getItem('sye-notice'); if (nn) { sessionStorage.removeItem('sye-notice'); setTimeout(() => { try { DEFS.notice(); } catch (err) {} }, 4200); } } catch (e) {}
  try { navigator.storage && navigator.storage.persist && navigator.storage.persist(); } catch (e) {}
  setEdit(SYE_ON);
  try { const o = sessionStorage.getItem('sye-open'); if (o != null) { sessionStorage.removeItem('sye-open'); tab = Math.min(+o || 0, GROUPS.length - 1); pane.querySelectorAll('.sye-tabs button').forEach((x, i) => x.classList.toggle('on', i === tab)); draw(); pane.classList.add('on'); } } catch (e) {}
  if (SYE_FAST) { const t0 = Date.now(), iv = setInterval(() => { const h = document.querySelector('.en-hit'); if (h && !h.disabled) { h.click(); clearInterval(iv); } if (Date.now() - t0 > 8000) clearInterval(iv); }, 120); }
})();
// 바탕화면은 첫 화면 뒤에서 미리 만들어 두기 (입장할 때 끊김 방지)
requestAnimationFrame(() => setTimeout(startDesk, 50));
})();

/* ---------- 글꼴 : 홈페이지 전체를 프리텐다드로 (참고한 홈페이지들과 같은 글꼴) ---------- */
(() => {
  const PT = "'Pretendard','Pretendard Variable','Pretendard JP','Noto Sans JP',sans-serif";
  const MONO = /mono|courier|consolas/i, HEAVY = /Archivo Black|Big Shoulders|Noto Serif Display|Montserrat/i, FONT = /Archivo|Inter\b|Space Grotesk|Barlow|Big Shoulders|Outfit|Noto Serif|Montserrat|IBM Plex Sans|Noto Sans|Pretendard|sans-serif|serif/i;
  const HV = new Set();
  const bump = (v, heavy) => heavy ? v.replace(/^\s*(?:(italic|oblique)\s+)?(normal|bold|[1-9]00)?\s*/, (m, it) => `${it ? it + ' ' : ''}900 `) : v;
  const fix = (sheet, pass) => { let rs; try { rs = sheet.cssRules; } catch (e) { return; } if (!rs) return;
    for (const r of rs) { if (r.cssRules && !r.style) { fix(r, pass); continue; } const st = r.style; if (!st || r.type === 5) continue;
      if (pass === 0) { for (let i = 0; i < st.length; i++) { const k = st[i]; if (!k.startsWith('--')) continue; const v = st.getPropertyValue(k); if (!FONT.test(v) || MONO.test(v) || /Pretendard/.test(v.split(',')[0])) continue; if (HEAVY.test(v)) HV.add(k); st.setProperty(k, PT, st.getPropertyPriority(k)); } continue; }
      const pr = st.getPropertyPriority('font') || st.getPropertyPriority('font-family');
      const fv = st.getPropertyValue('font');
      if (fv && /var\(/.test(fv)) { const m = fv.match(/var\((--[\w-]+)/); if (m && HV.has(m[1]) && !/\b(800|900)\b/.test(fv)) st.setProperty('font', bump(fv, true), pr); continue; }
      const ff = st.getPropertyValue('font-family');
      if (ff && /var\(/.test(ff)) { const m = ff.match(/var\((--[\w-]+)/); if (m && HV.has(m[1])) { const w = parseInt(st.fontWeight) || 400; if (w < 800) st.setProperty('font-weight', '900', pr); } continue; }
      if (!st.fontFamily) continue;
      const fam = st.fontFamily; if (MONO.test(fam) || /Pretendard/.test(fam.split(',')[0])) continue;
      if (HEAVY.test(fam)) { const w = parseInt(st.fontWeight) || 400; if (w < 800) st.setProperty('font-weight', /Archivo Black/i.test(fam) ? '900' : '800', pr); }
      st.setProperty('font-family', PT, pr); } };
  const scan = () => { const ss = [...document.styleSheets]; ss.forEach(x => fix(x, 0)); ss.forEach(x => fix(x, 1)); };
  scan(); addEventListener('load', scan); document.fonts && document.fonts.ready.then(() => typeof fit === 'function' && fit());
  let q = 0; new MutationObserver(ms => { if (ms.some(m => [...m.addedNodes].some(n => n.nodeName === 'STYLE' || n.nodeName === 'LINK'))) { cancelAnimationFrame(q); q = requestAnimationFrame(scan); } }).observe(document.head, { childList: true });
  const st = document.createElement('style'); st.textContent = `body,button,input,textarea,select{font-family:${PT}}`; document.head.appendChild(st);
})();

/* ---------- 마우스 커서 : 아이콘 커서 (PC 전용) — data.js 의 cursor 로 바꿀 수 있어요: 'capsule' · 'syringe' · 'clover' · 'wand' · 'pill' ---------- */
(() => {
  if (!matchMedia('(pointer:fine)').matches) return;
  const O = '#1D4A40';
  const C={};
  // A: 말랑 주사기 (민트 약 + 하트 손잡이)
  C.syr=(hov)=>`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><defs><linearGradient id="l" x1="0" x2="1"><stop offset="0" stop-color="#A6EDCD"/><stop offset="1" stop-color="#3FAE84"/></linearGradient></defs><g transform="rotate(45 16 16)">
  <path d="M16 26.4V31.2" stroke="${O}" stroke-width="2.6" stroke-linecap="round"/><path d="M16 26.4V31" stroke="#E9F4EF" stroke-width="1" stroke-linecap="round"/>
  <rect x="14" y="23.6" width="4" height="3.2" rx="1" fill="#fff" stroke="${O}" stroke-width="1.3"/>
  <rect x="15" y="4.6" width="2" height="6" fill="#fff" stroke="${O}" stroke-width="1.3"/>
  <path d="M16 6.2s-3.6-2.1-4.1-4C11.5.9 12.4-.2 13.6-.2c1 0 1.7.6 2.4 1.4.7-.8 1.4-1.4 2.4-1.4 1.2 0 2.1 1.1 1.7 2.4-.5 1.9-4.1 4-4.1 4z" transform="translate(0 1.4)" fill="${hov?'#3FAE84':'#8FDDBA'}" stroke="${O}" stroke-width="1.3" stroke-linejoin="round"/>
  <rect x="9.6" y="10" width="12.8" height="2.6" rx="1.3" fill="#fff" stroke="${O}" stroke-width="1.3"/>
  <rect x="11.4" y="12.4" width="9.2" height="11.8" rx="2.2" fill="#F4FBF8" stroke="${O}" stroke-width="1.4"/>
  <path d="M11.4 ${hov?14.2:17}h9.2v5a2.2 2.2 0 0 1-2.2 2.2h-4.8a2.2 2.2 0 0 1-2.2-2.2z" fill="url(#l)" stroke="${O}" stroke-width="1.4" stroke-linejoin="round"/>
  <path d="M13 14.6v3.6" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/><path d="M18.6 15.4h2M18.6 18.2h2M18.6 21h2" stroke="${O}" stroke-width=".9" stroke-linecap="round"/></g>
  ${hov?'<path d="M27 2l.9 2.5 2.5.9-2.5.9L27 8.8l-.9-2.5-2.5-.9 2.5-.9z" fill="#3FAE84" stroke="#fff" stroke-width=".7"/>':''}</svg>`;
  // B: 네잎클로버
  const leaf=(r,f)=>`<path d="M0 0C-3.6-3.6-7.6-5.9-7-9.4-6.5-13.4-1.8-12.8 0-10 1.8-12.8 6.5-13.4 7-9.4 7.6-5.9 3.6-3.6 0 0Z" transform="rotate(${r})" fill="${f}" stroke="${O}" stroke-width="1.6" stroke-linejoin="round"/>`;
  C.clover=(hov)=>`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><defs><radialGradient id="g" cx=".5" cy=".3" r=".8"><stop offset="0" stop-color="#C9F3DF"/><stop offset="1" stop-color="${hov?'#3FAE84':'#6CCBA6'}"/></radialGradient></defs><path d="M17 19c2 4 2.4 7.6 1.4 11" fill="none" stroke="${O}" stroke-width="1.8" stroke-linecap="round"/><g transform="translate(15 15) scale(1.02)">${[0,90,180,270].map(r=>leaf(r,'url(#g)')).join('')}<circle r="2.6" fill="#fff" stroke="${O}" stroke-width="1.3"/></g><ellipse cx="9.4" cy="8.2" rx="1.8" ry="1" transform="rotate(-40 9.4 8.2)" fill="#fff" opacity=".9"/></svg>`;
  // C: 별 지팡이
  C.wand=(hov)=>`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><defs><linearGradient id="s" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#D3F6E6"/><stop offset="1" stop-color="${hov?'#3FAE84':'#6CCBA6'}"/></linearGradient></defs><path d="M13 13L29 29" stroke="${O}" stroke-width="4.4" stroke-linecap="round"/><path d="M13 13L29 29" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M18 18l2 2M22 22l2 2" stroke="#6CCBA6" stroke-width="2"/><path d="M10 1.6l2.5 5.2 5.6.8-4.1 3.9 1 5.6-5-2.7-5 2.7 1-5.6L1.9 7.6l5.6-.8z" fill="url(#s)" stroke="${O}" stroke-width="1.5" stroke-linejoin="round"/><circle cx="8.4" cy="7.4" r="1" fill="#fff"/>${hov?'<path d="M25 3l.8 2.2 2.2.8-2.2.8L25 9l-.8-2.2-2.2-.8 2.2-.8z" fill="#3FAE84"/>':''}</svg>`;
  // D: 하트 캡슐
  C.hpill=(hov)=>`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g transform="rotate(-45 16 16)"><rect x="10.4" y="2.4" width="11.2" height="27.2" rx="5.6" fill="#fff" stroke="${O}" stroke-width="1.7"/><path d="M10.4 16h11.2v8a5.6 5.6 0 0 1-11.2 0z" fill="${hov?'#3FAE84':'#7FD6B0'}" stroke="${O}" stroke-width="1.7"/><path d="M16 11.6s-2.4-1.4-2.7-2.7c-.2-.9.4-1.6 1.2-1.6.6 0 1.1.4 1.5.9.4-.5.9-.9 1.5-.9.8 0 1.4.7 1.2 1.6-.3 1.3-2.7 2.7-2.7 2.7z" fill="#7FD6B0"/><path d="M13 19v3.4" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/></g></svg>`;
  // E: 도트 반쪽 민트 캡슐 💊 (평소) / 도트 민트 하트 사탕 (누를 수 있는 곳)
  const CAP_PILL = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"22\" viewBox=\"0 0 24 22\" shape-rendering=\"crispEdges\"><rect x=\"2\" y=\"0\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"4\" y=\"0\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"6\" y=\"0\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"20\" y=\"0\" width=\"2\" height=\"2\" fill=\"#3FAE84\"/><rect x=\"0\" y=\"2\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"2\" y=\"2\" width=\"2\" height=\"2\" fill=\"#FFFFFF\"/><rect x=\"4\" y=\"2\" width=\"2\" height=\"2\" fill=\"#FFFFFF\"/><rect x=\"6\" y=\"2\" width=\"2\" height=\"2\" fill=\"#F4FBF8\"/><rect x=\"8\" y=\"2\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"18\" y=\"2\" width=\"2\" height=\"2\" fill=\"#3FAE84\"/><rect x=\"20\" y=\"2\" width=\"2\" height=\"2\" fill=\"#3FAE84\"/><rect x=\"22\" y=\"2\" width=\"2\" height=\"2\" fill=\"#3FAE84\"/><rect x=\"0\" y=\"4\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"2\" y=\"4\" width=\"2\" height=\"2\" fill=\"#FFFFFF\"/><rect x=\"4\" y=\"4\" width=\"2\" height=\"2\" fill=\"#F4FBF8\"/><rect x=\"6\" y=\"4\" width=\"2\" height=\"2\" fill=\"#F4FBF8\"/><rect x=\"8\" y=\"4\" width=\"2\" height=\"2\" fill=\"#F4FBF8\"/><rect x=\"10\" y=\"4\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"20\" y=\"4\" width=\"2\" height=\"2\" fill=\"#3FAE84\"/><rect x=\"0\" y=\"6\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"2\" y=\"6\" width=\"2\" height=\"2\" fill=\"#F4FBF8\"/><rect x=\"4\" y=\"6\" width=\"2\" height=\"2\" fill=\"#F4FBF8\"/><rect x=\"6\" y=\"6\" width=\"2\" height=\"2\" fill=\"#F4FBF8\"/><rect x=\"8\" y=\"6\" width=\"2\" height=\"2\" fill=\"#F4FBF8\"/><rect x=\"10\" y=\"6\" width=\"2\" height=\"2\" fill=\"#D2ECDF\"/><rect x=\"12\" y=\"6\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"2\" y=\"8\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"4\" y=\"8\" width=\"2\" height=\"2\" fill=\"#F4FBF8\"/><rect x=\"6\" y=\"8\" width=\"2\" height=\"2\" fill=\"#F4FBF8\"/><rect x=\"8\" y=\"8\" width=\"2\" height=\"2\" fill=\"#F4FBF8\"/><rect x=\"10\" y=\"8\" width=\"2\" height=\"2\" fill=\"#D2ECDF\"/><rect x=\"12\" y=\"8\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"14\" y=\"8\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"4\" y=\"10\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"6\" y=\"10\" width=\"2\" height=\"2\" fill=\"#F4FBF8\"/><rect x=\"8\" y=\"10\" width=\"2\" height=\"2\" fill=\"#D2ECDF\"/><rect x=\"10\" y=\"10\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"12\" y=\"10\" width=\"2\" height=\"2\" fill=\"#A6EBCB\"/><rect x=\"14\" y=\"10\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"16\" y=\"10\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"6\" y=\"12\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"8\" y=\"12\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"10\" y=\"12\" width=\"2\" height=\"2\" fill=\"#A6EBCB\"/><rect x=\"12\" y=\"12\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"14\" y=\"12\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"16\" y=\"12\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"18\" y=\"12\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"8\" y=\"14\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"10\" y=\"14\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"12\" y=\"14\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"14\" y=\"14\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"16\" y=\"14\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"18\" y=\"14\" width=\"2\" height=\"2\" fill=\"#2F9C74\"/><rect x=\"20\" y=\"14\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"10\" y=\"16\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"12\" y=\"16\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"14\" y=\"16\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"16\" y=\"16\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"18\" y=\"16\" width=\"2\" height=\"2\" fill=\"#2F9C74\"/><rect x=\"20\" y=\"16\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"12\" y=\"18\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"14\" y=\"18\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"16\" y=\"18\" width=\"2\" height=\"2\" fill=\"#2F9C74\"/><rect x=\"18\" y=\"18\" width=\"2\" height=\"2\" fill=\"#2F9C74\"/><rect x=\"20\" y=\"18\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"14\" y=\"20\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"16\" y=\"20\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"18\" y=\"20\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/></svg>";   // 도트 캡슐 (24px)
  const CAP_HEART = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"22\" height=\"20\" viewBox=\"0 0 22 20\" shape-rendering=\"crispEdges\"><rect x=\"2\" y=\"0\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"4\" y=\"0\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"6\" y=\"0\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"14\" y=\"0\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"16\" y=\"0\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"18\" y=\"0\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"0\" y=\"2\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"2\" y=\"2\" width=\"2\" height=\"2\" fill=\"#A6EBCB\"/><rect x=\"4\" y=\"2\" width=\"2\" height=\"2\" fill=\"#A6EBCB\"/><rect x=\"6\" y=\"2\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"8\" y=\"2\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"12\" y=\"2\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"14\" y=\"2\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"16\" y=\"2\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"18\" y=\"2\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"20\" y=\"2\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"0\" y=\"4\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"2\" y=\"4\" width=\"2\" height=\"2\" fill=\"#A6EBCB\"/><rect x=\"4\" y=\"4\" width=\"2\" height=\"2\" fill=\"#FFFFFF\"/><rect x=\"6\" y=\"4\" width=\"2\" height=\"2\" fill=\"#A6EBCB\"/><rect x=\"8\" y=\"4\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"10\" y=\"4\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"12\" y=\"4\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"14\" y=\"4\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"16\" y=\"4\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"18\" y=\"4\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"20\" y=\"4\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"0\" y=\"6\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"2\" y=\"6\" width=\"2\" height=\"2\" fill=\"#A6EBCB\"/><rect x=\"4\" y=\"6\" width=\"2\" height=\"2\" fill=\"#A6EBCB\"/><rect x=\"6\" y=\"6\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"8\" y=\"6\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"10\" y=\"6\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"12\" y=\"6\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"14\" y=\"6\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"16\" y=\"6\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"18\" y=\"6\" width=\"2\" height=\"2\" fill=\"#2F9C74\"/><rect x=\"20\" y=\"6\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"0\" y=\"8\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"2\" y=\"8\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"4\" y=\"8\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"6\" y=\"8\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"8\" y=\"8\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"10\" y=\"8\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"12\" y=\"8\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"14\" y=\"8\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"16\" y=\"8\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"18\" y=\"8\" width=\"2\" height=\"2\" fill=\"#2F9C74\"/><rect x=\"20\" y=\"8\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"2\" y=\"10\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"4\" y=\"10\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"6\" y=\"10\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"8\" y=\"10\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"10\" y=\"10\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"12\" y=\"10\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"14\" y=\"10\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"16\" y=\"10\" width=\"2\" height=\"2\" fill=\"#2F9C74\"/><rect x=\"18\" y=\"10\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"4\" y=\"12\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"6\" y=\"12\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"8\" y=\"12\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"10\" y=\"12\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"12\" y=\"12\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"14\" y=\"12\" width=\"2\" height=\"2\" fill=\"#2F9C74\"/><rect x=\"16\" y=\"12\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"6\" y=\"14\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"8\" y=\"14\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"10\" y=\"14\" width=\"2\" height=\"2\" fill=\"#5CC79A\"/><rect x=\"12\" y=\"14\" width=\"2\" height=\"2\" fill=\"#2F9C74\"/><rect x=\"14\" y=\"14\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"8\" y=\"16\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"10\" y=\"16\" width=\"2\" height=\"2\" fill=\"#2F9C74\"/><rect x=\"12\" y=\"16\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/><rect x=\"10\" y=\"18\" width=\"2\" height=\"2\" fill=\"#1D4A40\"/></svg>";   // 도트 하트 사탕 (22px)
  // 도트 주사기 하나로 (평소 · 누를 수 있는 곳 모두 같은 모양) — 바늘 끝이 클릭 지점
  const SYR_DOT = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"30\" viewBox=\"0 0 20 20\" shape-rendering=\"crispEdges\"><rect x=\"0\" y=\"0\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"1\" y=\"1\" width=\"1\" height=\"1\" fill=\"#8FA7A0\"/><rect x=\"2\" y=\"2\" width=\"1\" height=\"1\" fill=\"#8FA7A0\"/><rect x=\"3\" y=\"3\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"4\" y=\"3\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"7\" y=\"3\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"3\" y=\"4\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"4\" y=\"4\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"5\" y=\"4\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"6\" y=\"4\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"7\" y=\"4\" width=\"1\" height=\"1\" fill=\"#3FAE84\"/><rect x=\"8\" y=\"4\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"4\" y=\"5\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"5\" y=\"5\" width=\"1\" height=\"1\" fill=\"#5CC79A\"/><rect x=\"6\" y=\"5\" width=\"1\" height=\"1\" fill=\"#5CC79A\"/><rect x=\"7\" y=\"5\" width=\"1\" height=\"1\" fill=\"#3FAE84\"/><rect x=\"8\" y=\"5\" width=\"1\" height=\"1\" fill=\"#3FAE84\"/><rect x=\"9\" y=\"5\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"4\" y=\"6\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"5\" y=\"6\" width=\"1\" height=\"1\" fill=\"#5CC79A\"/><rect x=\"6\" y=\"6\" width=\"1\" height=\"1\" fill=\"#5CC79A\"/><rect x=\"7\" y=\"6\" width=\"1\" height=\"1\" fill=\"#5CC79A\"/><rect x=\"8\" y=\"6\" width=\"1\" height=\"1\" fill=\"#3FAE84\"/><rect x=\"9\" y=\"6\" width=\"1\" height=\"1\" fill=\"#3FAE84\"/><rect x=\"10\" y=\"6\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"3\" y=\"7\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"4\" y=\"7\" width=\"1\" height=\"1\" fill=\"#A6EBCB\"/><rect x=\"5\" y=\"7\" width=\"1\" height=\"1\" fill=\"#A6EBCB\"/><rect x=\"6\" y=\"7\" width=\"1\" height=\"1\" fill=\"#5CC79A\"/><rect x=\"7\" y=\"7\" width=\"1\" height=\"1\" fill=\"#5CC79A\"/><rect x=\"8\" y=\"7\" width=\"1\" height=\"1\" fill=\"#5CC79A\"/><rect x=\"9\" y=\"7\" width=\"1\" height=\"1\" fill=\"#3FAE84\"/><rect x=\"10\" y=\"7\" width=\"1\" height=\"1\" fill=\"#3FAE84\"/><rect x=\"11\" y=\"7\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"4\" y=\"8\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"5\" y=\"8\" width=\"1\" height=\"1\" fill=\"#A6EBCB\"/><rect x=\"6\" y=\"8\" width=\"1\" height=\"1\" fill=\"#A6EBCB\"/><rect x=\"7\" y=\"8\" width=\"1\" height=\"1\" fill=\"#5CC79A\"/><rect x=\"8\" y=\"8\" width=\"1\" height=\"1\" fill=\"#5CC79A\"/><rect x=\"9\" y=\"8\" width=\"1\" height=\"1\" fill=\"#5CC79A\"/><rect x=\"10\" y=\"8\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"11\" y=\"8\" width=\"1\" height=\"1\" fill=\"#F4FBF8\"/><rect x=\"12\" y=\"8\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"5\" y=\"9\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"6\" y=\"9\" width=\"1\" height=\"1\" fill=\"#A6EBCB\"/><rect x=\"7\" y=\"9\" width=\"1\" height=\"1\" fill=\"#A6EBCB\"/><rect x=\"8\" y=\"9\" width=\"1\" height=\"1\" fill=\"#5CC79A\"/><rect x=\"9\" y=\"9\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"10\" y=\"9\" width=\"1\" height=\"1\" fill=\"#F4FBF8\"/><rect x=\"11\" y=\"9\" width=\"1\" height=\"1\" fill=\"#F4FBF8\"/><rect x=\"12\" y=\"9\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"13\" y=\"9\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"6\" y=\"10\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"7\" y=\"10\" width=\"1\" height=\"1\" fill=\"#A6EBCB\"/><rect x=\"8\" y=\"10\" width=\"1\" height=\"1\" fill=\"#CFEFE0\"/><rect x=\"9\" y=\"10\" width=\"1\" height=\"1\" fill=\"#F4FBF8\"/><rect x=\"10\" y=\"10\" width=\"1\" height=\"1\" fill=\"#F4FBF8\"/><rect x=\"11\" y=\"10\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"12\" y=\"10\" width=\"1\" height=\"1\" fill=\"#F4FBF8\"/><rect x=\"13\" y=\"10\" width=\"1\" height=\"1\" fill=\"#F4FBF8\"/><rect x=\"14\" y=\"10\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"17\" y=\"10\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"7\" y=\"11\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"8\" y=\"11\" width=\"1\" height=\"1\" fill=\"#CFEFE0\"/><rect x=\"9\" y=\"11\" width=\"1\" height=\"1\" fill=\"#CFEFE0\"/><rect x=\"10\" y=\"11\" width=\"1\" height=\"1\" fill=\"#F4FBF8\"/><rect x=\"11\" y=\"11\" width=\"1\" height=\"1\" fill=\"#F4FBF8\"/><rect x=\"12\" y=\"11\" width=\"1\" height=\"1\" fill=\"#F4FBF8\"/><rect x=\"13\" y=\"11\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"14\" y=\"11\" width=\"1\" height=\"1\" fill=\"#F4FBF8\"/><rect x=\"15\" y=\"11\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"16\" y=\"11\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"17\" y=\"11\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"8\" y=\"12\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"9\" y=\"12\" width=\"1\" height=\"1\" fill=\"#CFEFE0\"/><rect x=\"10\" y=\"12\" width=\"1\" height=\"1\" fill=\"#CFEFE0\"/><rect x=\"11\" y=\"12\" width=\"1\" height=\"1\" fill=\"#F4FBF8\"/><rect x=\"12\" y=\"12\" width=\"1\" height=\"1\" fill=\"#F4FBF8\"/><rect x=\"13\" y=\"12\" width=\"1\" height=\"1\" fill=\"#F4FBF8\"/><rect x=\"14\" y=\"12\" width=\"1\" height=\"1\" fill=\"#F4FBF8\"/><rect x=\"15\" y=\"12\" width=\"1\" height=\"1\" fill=\"#F4FBF8\"/><rect x=\"16\" y=\"12\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"9\" y=\"13\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"10\" y=\"13\" width=\"1\" height=\"1\" fill=\"#CFEFE0\"/><rect x=\"11\" y=\"13\" width=\"1\" height=\"1\" fill=\"#CFEFE0\"/><rect x=\"12\" y=\"13\" width=\"1\" height=\"1\" fill=\"#F4FBF8\"/><rect x=\"13\" y=\"13\" width=\"1\" height=\"1\" fill=\"#F4FBF8\"/><rect x=\"14\" y=\"13\" width=\"1\" height=\"1\" fill=\"#F4FBF8\"/><rect x=\"15\" y=\"13\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"10\" y=\"14\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"11\" y=\"14\" width=\"1\" height=\"1\" fill=\"#CFEFE0\"/><rect x=\"12\" y=\"14\" width=\"1\" height=\"1\" fill=\"#CFEFE0\"/><rect x=\"13\" y=\"14\" width=\"1\" height=\"1\" fill=\"#F4FBF8\"/><rect x=\"14\" y=\"14\" width=\"1\" height=\"1\" fill=\"#F4FBF8\"/><rect x=\"15\" y=\"14\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"11\" y=\"15\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"12\" y=\"15\" width=\"1\" height=\"1\" fill=\"#F4FBF8\"/><rect x=\"13\" y=\"15\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"14\" y=\"15\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"15\" y=\"15\" width=\"1\" height=\"1\" fill=\"#F4FBF8\"/><rect x=\"16\" y=\"15\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"19\" y=\"15\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"11\" y=\"16\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"12\" y=\"16\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"15\" y=\"16\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"16\" y=\"16\" width=\"1\" height=\"1\" fill=\"#F4FBF8\"/><rect x=\"17\" y=\"16\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"18\" y=\"16\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"19\" y=\"16\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"10\" y=\"17\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"11\" y=\"17\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"16\" y=\"17\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"17\" y=\"17\" width=\"1\" height=\"1\" fill=\"#5CC79A\"/><rect x=\"18\" y=\"17\" width=\"1\" height=\"1\" fill=\"#5CC79A\"/><rect x=\"19\" y=\"17\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"16\" y=\"18\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"17\" y=\"18\" width=\"1\" height=\"1\" fill=\"#5CC79A\"/><rect x=\"18\" y=\"18\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"15\" y=\"19\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"16\" y=\"19\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/><rect x=\"17\" y=\"19\" width=\"1\" height=\"1\" fill=\"#1D4A40\"/></svg>";
  const U = s => `url("data:image/svg+xml,${encodeURIComponent(s)}") 1 1`;
  // 커서 : 도트 화살표 + 점선 + 하트 네 잎 클로버 (버튼 · 앱 위에서는 클로버가 살짝 다가와요) — 화살표 끝이 클릭 지점
  const CUR = (n, x, y, f) => { const a = `image-set(url("media/${n}.png?v=8") 1x, url("media/${n}@2x.png?v=8") 2x) ${x} ${y}, ${f}`, b = `-webkit-image-set(url("media/${n}.png?v=8") 1x, url("media/${n}@2x.png?v=8") 2x) ${x} ${y}, ${f}`;
    try { if (CSS.supports('cursor', a)) return a; if (CSS.supports('cursor', b)) return b; } catch (e) {} return `url("media/${n}.png?v=8") ${x} ${y}, ${f}`; };
  const NORM = CUR('cursor-snow', 3, 3, 'auto'), PTR = CUR('cursor-snow-hover', 3, 3, 'pointer');
  const css = document.createElement('style');
  css.textContent = `html,body{cursor:${NORM}}a,button,label,summary,select,[role=button],[data-app],.app-tile{cursor:${PTR}}input[type=text],input:not([type]),textarea,[contenteditable=true]{cursor:text}`;
  document.head.appendChild(css);
  const done = new WeakSet();
  const fix = sheet => { let rs; try { rs = sheet.cssRules; } catch (e) { return; } if (!rs) return;
    for (const r of rs) { if (r.cssRules && !r.style) { fix(r); continue; } const st = r.style; if (!st || !st.cursor) continue;
      if (st.cursor === 'pointer') st.setProperty('cursor', PTR, st.getPropertyPriority('cursor'));
      else if (st.cursor === 'default' || st.cursor === 'auto') st.setProperty('cursor', NORM, st.getPropertyPriority('cursor')); } };
  const scan = () => { for (const s of document.styleSheets) { const o = s.ownerNode; if (o && done.has(o) && o !== css) continue; if (o === css) continue; fix(s); o && done.add(o); } };
  scan(); addEventListener('load', scan);
  new MutationObserver(ms => { if (ms.some(m => [...m.addedNodes].some(n => n.nodeName === 'STYLE' || n.nodeName === 'LINK'))) requestAnimationFrame(scan); }).observe(document.head, { childList: true });
})();
/* 메인 화면 배경 : 비밀번호 화면과 같은 점무늬 + 민트 번짐 (조금 더 연하게 · 동그라미 · 큰 글씨 없이) */
(() => { const st = document.createElement('style'); st.textContent = `
html body #desk,html.m7 body #desk{background-color:#FEFEFE!important;background-image:radial-gradient(circle,rgba(60,72,90,.13) 1px,transparent 1.5px),radial-gradient(44% 40% at 0% 0%,rgba(214,242,228,.85),rgba(214,242,228,0) 72%),radial-gradient(44% 40% at 100% 100%,rgba(214,242,228,.85),rgba(214,242,228,0) 72%),radial-gradient(30% 28% at 52% 48%,rgba(238,250,244,.6),rgba(238,250,244,0) 72%)!important;background-size:18px 18px,100% 100%,100% 100%,100% 100%!important;background-repeat:repeat,no-repeat,no-repeat,no-repeat!important;background-position:9px 9px,0 0,0 0,0 0!important}`; document.head.appendChild(st); })();
/* 휴대폰 : 캐릭터 · 페어 상세 창 — 목록 창과 같은 자리에 꽉 찬 시트 + 위 이름 카드 + 가운데 큰 사진(아래로 스르륵) + 오른쪽 아래 동그라미 + 아래 노래 바 */
(() => { const st = document.createElement('style'); st.textContent = `
@media (max-width:720px),(max-aspect-ratio:4/5) and (max-width:1100px),(max-height:599px){
  html.msheet #desk #winlayer .win.cydet.float{background:#FEFEFE!important;background-image:radial-gradient(rgba(20,35,30,.1) 1px,transparent 1.4px)!important;background-size:16px 16px!important;border:1px solid #fff!important;box-shadow:0 18px 40px -18px rgba(20,35,30,.3)!important;overflow:hidden!important}
  html.msheet #desk #winlayer .win.cydet.float .win-h{height:22px!important;padding:0!important;justify-content:center!important;background:transparent!important}
  html.msheet #desk #winlayer .win.cydet.float .win-h::before{content:'';width:38px;height:4px;border-radius:99px;background:rgba(20,35,30,.14);margin-top:8px}
  html.msheet #desk #winlayer .win.cydet.float .win-h > *,html.msheet #desk #winlayer .win.cydet.float > .sh-grab,html.msheet #desk #winlayer .win.cydet.float .win-h::after{display:none!important}
  html.msheet #desk #winlayer .win.cydet.float .win-b{padding:22px 12px 12px!important;display:flex!important;flex-direction:column!important;height:100%!important;box-sizing:border-box}
  html.msheet #desk #winlayer .win.cydet.float .cy-pcard{position:relative;z-index:3;flex:none;margin:0!important;border:0!important;border-radius:18px!important;background:#fff!important;box-shadow:0 8px 22px -10px rgba(20,35,30,.18)!important}
  html.msheet #desk #winlayer .win.cydet.float .cy-pstage,html.msheet #desk #winlayer .win.cydet.float .cf-stage{position:relative!important;flex:1 1 auto!important;min-height:0!important;margin:0 -12px!important;display:block!important;z-index:1}
  html.msheet #desk #winlayer .win.cydet.float .cy-pstage .cy-pv,html.msheet #desk #winlayer .win.cydet.float .cf-stage .cy-pv{position:absolute!important;left:0!important;right:0!important;top:-26px!important;bottom:-6px!important;width:auto!important;height:auto!important;max-width:none!important;aspect-ratio:auto!important;margin:0!important;transform:none!important}
  html.msheet #desk #winlayer .win.cydet.float .cy-pv .ph{position:absolute!important;inset:0!important;width:auto!important;height:auto!important;border-radius:0!important;border:0!important;box-shadow:none!important;background:linear-gradient(180deg,rgba(207,238,222,0),rgba(207,238,222,.85) 16%,rgba(207,238,222,.25) 70%,rgba(207,238,222,0))!important;-webkit-mask:linear-gradient(180deg,#000 62%,transparent 98%);mask:linear-gradient(180deg,#000 62%,transparent 98%)}
  html.msheet #desk #winlayer .win.cydet.float .cy-pv .ph > img{width:100%!important;height:100%!important;object-fit:cover;object-position:50% 12%}
  html.msheet #desk #winlayer .win.cydet.float .cy-pv .ph .ph-ic{opacity:.45}
  html.msheet #desk #winlayer .win.cydet.float .cy-pv::before,html.msheet #desk #winlayer .win.cydet.float .cy-pv::after{display:none!important}
  html.msheet #desk #winlayer .win.cydet.float .cf-side{position:absolute!important;right:12px!important;bottom:14px!important;top:auto!important;z-index:4}
  html.msheet #desk #winlayer .win.cydet.float .pf-bar,html.msheet #desk #winlayer .win.cydet.float .cy-foot2{position:relative;z-index:3;flex:none;margin-top:8px!important}
}`; document.head.appendChild(st); })();
/* 음악 플레이어 : 민트 유리 (D 시안) */
(() => { const st = document.createElement('style'); st.textContent = `
#desk .win.mglass{background:rgba(255,255,255,.66)!important;border:1.5px solid #fff!important;border-radius:30px!important;box-shadow:0 30px 60px -26px rgba(20,35,30,.3)!important;-webkit-backdrop-filter:blur(20px) saturate(1.2)!important;backdrop-filter:blur(20px) saturate(1.2)!important;overflow:hidden!important;color:#14231E}
#desk .win.mglass .win-h{background:transparent!important;border:0!important;height:46px!important;padding:0 16px 0 20px!important;position:relative;z-index:2}
#desk .win.mglass .win-h .win-ic{background:none!important;color:#3B544B!important;width:auto!important;box-shadow:none!important}
#desk .win.mglass .win-h .win-ic svg{width:13px;height:13px}
#desk .win.mglass .win-t{font:800 10.5px 'Inter',sans-serif!important;letter-spacing:.16em!important;color:#3B544B!important}
#desk .win.mglass .win-s{display:none}
#desk .win.mglass .win-btns button{width:22px!important;height:22px!important;border-radius:50%!important;background:rgba(20,35,30,.08)!important;border:0!important;color:#3B544B!important}
#desk .win.mglass .win-b{padding:0!important;background:transparent!important;overflow-y:auto;overflow-x:hidden;scrollbar-width:none}
#desk .win.mglass .win-b::-webkit-scrollbar{display:none}
.mplayer.mg{position:relative;display:flex;flex-direction:column;padding:4px 18px 16px;gap:0;background:none!important}
.mplayer.mg .mg-glow{position:absolute;left:-60px;right:-60px;top:-110px;height:380px;background:radial-gradient(closest-side,rgba(111,208,166,.6),rgba(111,208,166,0));filter:blur(18px);pointer-events:none;z-index:0}
.mplayer.mg > *{position:relative;z-index:1}
.mplayer.mg .mp-art{width:236px;height:236px;margin:8px auto 0;border-radius:26px;overflow:hidden;background:linear-gradient(150deg,#2E5A4C,#3FAE84 60%,#A9E6CB);box-shadow:0 30px 40px -20px rgba(47,120,95,.7);transition:transform .5s cubic-bezier(.3,1.4,.5,1);transform:scale(.94)}
.win.mglass.playing .mplayer.mg .mp-art{transform:none}
.mplayer.mg .mp-art::after{content:'';position:absolute}
.mplayer.mg .mp-art img{width:100%;height:100%;object-fit:cover;display:block}
.mplayer.mg .mp-np{display:flex;align-items:flex-start;gap:10px;margin-top:22px;text-align:left}
.mplayer.mg .mp-np > div{flex:1;min-width:0}
.mplayer.mg .mp-np h4{margin:0;font:900 19px/1.2 'Pretendard',sans-serif!important;letter-spacing:-.03em;color:#14231E!important}
.mplayer.mg .mp-np p{margin:5px 0 0;font:600 10.5px 'Inter',sans-serif;letter-spacing:.04em;color:#6E7E78!important}
.mplayer.mg .mg-heart{color:#3FAE84;margin-top:4px}.mplayer.mg .mg-heart svg{width:16px;height:16px;fill:#3FAE84}
.mplayer.mg .mp-prog{display:block;margin-top:16px}
.mplayer.mg .mp-prog .bar{height:5px;border-radius:9px;background:rgba(20,35,30,.09)!important;cursor:pointer;position:relative;overflow:hidden}
.mplayer.mg .mp-prog .bar i{display:block;height:100%;border-radius:9px;background:#14231E!important}
.mplayer.mg .mg-t{display:flex;justify-content:space-between;margin-top:7px;font:600 10px 'DM Mono',monospace;color:#6E7E78}
.mplayer.mg .mp-ctrl{display:flex;align-items:center;justify-content:center;gap:28px;margin-top:6px}
.mplayer.mg .mp-ctrl button{background:none!important;border:0!important;color:#14231E!important;width:30px;height:30px;display:grid;place-items:center;box-shadow:none!important;padding:0}
.mplayer.mg .mp-ctrl button svg{width:20px;height:20px}
.mplayer.mg .mp-ctrl .big{width:60px!important;height:60px!important;border-radius:50%!important;background:#fff!important;box-shadow:0 10px 24px -8px rgba(20,35,30,.3)!important;transition:transform .2s}
.mplayer.mg .mp-ctrl .big:active{transform:scale(.92)}
.mplayer.mg .mp-lyric{margin-top:14px;border-radius:16px;background:rgba(255,255,255,.75);padding:11px 14px;display:flex;align-items:center;gap:10px;text-align:left;font:700 12px 'Pretendard',sans-serif;color:#2F5A4E!important;min-height:0}
.mplayer.mg .mp-lyric b{flex:none;font:800 9px 'Inter',sans-serif;letter-spacing:.14em;color:#3FAE84}
.mplayer.mg .mp-lyric span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mplayer.mg .mp-list{display:flex;flex-direction:column;gap:2px;margin-top:10px;max-height:none}
.mplayer.mg .mp-list button{display:flex!important;align-items:center;gap:10px;height:42px;padding:0 8px!important;border-radius:12px!important;background:transparent!important;border:0!important;color:#14231E!important;font:700 12.5px 'Pretendard',sans-serif!important;text-align:left;box-shadow:none!important}
.mplayer.mg .mp-list button:hover{background:rgba(255,255,255,.55)!important}
.mplayer.mg .mp-list button.on{background:rgba(255,255,255,.85)!important}
.mplayer.mg .mg-mini{width:28px;height:28px;border-radius:8px;overflow:hidden;flex:none;background:linear-gradient(150deg,#2E5A4C,#3FAE84 60%,#A9E6CB)}
.mplayer.mg .mg-mini i,.mplayer.mg .mg-mini img{display:block;width:100%;height:100%;object-fit:cover;background:inherit}
.mplayer.mg .mg-tt{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mplayer.mg .mp-list em{font:600 10px 'DM Mono',monospace;font-style:normal;color:#6E7E78}
.mplayer.mg .mg-eq{display:none;align-items:flex-end;gap:2px;height:12px}
.mplayer.mg .mg-eq i{width:3px;height:5px;border-radius:1px;background:#3FAE84}
.mplayer.mg .mp-list button.on em{display:none}.mplayer.mg .mp-list button.on .mg-eq{display:flex}
.win.mglass.playing .mg-eq i{animation:mgEq .9s ease-in-out infinite}
.win.mglass.playing .mg-eq i:nth-child(2){animation-delay:-.3s}.win.mglass.playing .mg-eq i:nth-child(3){animation-delay:-.6s}
@keyframes mgEq{0%,100%{height:4px}50%{height:12px}}
.mplayer.mg .mp-vol{display:flex;align-items:center;gap:10px;margin-top:10px;padding:0 8px;color:#6E7E78}
.mplayer.mg .mp-vol svg{width:15px;height:15px}
.mplayer.mg .mp-vol input{flex:1;accent-color:#3FAE84;height:3px}
`; document.head.appendChild(st); })();
/* TALK : 폰 메시지 앱 느낌 (흰 바탕 · 민트) — 목록 창 + 대화 창 */
(() => { const st = document.createElement('style'); st.textContent = `
#desk .win.tkwin,#desk .win.tkroom{border-radius:30px!important;background:#fff!important;border:0!important;box-shadow:0 30px 60px -26px rgba(20,35,30,.32),0 0 0 5px #fff,0 0 0 6px #E3ECE8!important;overflow:hidden!important}
#desk .win.tkwin > .win-h{display:none!important}
#desk .win.tkwin .win-b,#desk .win.tkroom .win-b{padding:0!important;overflow:hidden!important;display:flex;flex-direction:column;background:#fff!important}
.tk{display:flex;flex-direction:column;height:100%;min-height:0;color:#14231E;font-family:'Pretendard','IBM Plex Sans KR',sans-serif}
.tk-top{display:flex;align-items:center;justify-content:space-between;padding:20px 18px 10px 20px}
.tk-top b{font:900 22px 'Pretendard',sans-serif;letter-spacing:-.03em}
.tk-tbtn{display:flex;gap:6px}
.tk-tbtn button{width:30px;height:30px!important;padding:0!important;border-radius:10px!important;border:0!important;background:#F3F7F5!important;color:#3B544B!important;display:grid;place-items:center;cursor:pointer;box-shadow:none!important}
.tk-tbtn button svg{width:15px;height:15px}
.tk-search{display:flex;align-items:center;gap:8px;margin:2px 16px 8px;height:34px;padding:0 12px;border-radius:12px;background:#F3F7F5;color:#9AABA4}
.tk-search svg{width:14px;height:14px;flex:none}
.tk-search input{flex:1;min-width:0;border:0;outline:0;background:none;font:600 12px 'Pretendard',sans-serif;color:#14231E}
.tk-tabs{display:flex;gap:6px;padding:0 16px 6px}
.tk-tabs button{height:26px;padding:0 12px;border-radius:99px;border:0;background:#F3F7F5;color:#6E7E78;font:700 11px 'Pretendard',sans-serif;cursor:pointer}
.tk-tabs button.on{background:#14231E;color:#fff}
.tk-list{flex:1;min-height:0;overflow-y:auto;padding:2px 8px 8px;scrollbar-width:none}
.tk-list::-webkit-scrollbar{display:none}
.tk-row{display:flex;align-items:center;gap:11px;padding:8px 10px;border-radius:16px;cursor:pointer;transition:background .15s}
.tk-row:hover{background:#F6FAF8}.tk-row.on{background:#EEF8F3}
.tk .tk-av{width:42px;height:42px;flex:none;border-radius:50%!important;overflow:hidden;box-shadow:none!important;border:0!important}
.tk-tx{flex:1;min-width:0}.tk-tx b{display:block;font:800 13px 'Pretendard',sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tk-tx p{margin:3px 0 0;font:500 11.5px 'Pretendard',sans-serif;color:#8A9894;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tk-meta{display:flex;flex-direction:column;align-items:flex-end;gap:5px;flex:none}
.tk-meta small{font:600 10px 'Pretendard',sans-serif;color:#A3B2AD}
.tk-meta i{min-width:18px;height:18px;padding:0 5px;border-radius:99px;background:#3FAE84;color:#fff;font:800 10px/18px 'Inter',sans-serif;font-style:normal;text-align:center}
.tk-nav{display:flex;justify-content:space-around;padding:8px 16px 12px;border-top:1px solid #F0F4F2;flex:none}
.tk-nav span{display:flex;flex-direction:column;align-items:center;gap:3px;font:700 9.5px 'Pretendard',sans-serif;color:#A3B2AD}
.tk-nav span.on{color:#3FAE84}.tk-nav svg{width:17px;height:17px}
/* 대화 창 */
#desk .win.tkroom > .win-h{height:auto!important;padding:0!important;background:#fff!important;border:0!important;display:block!important;position:relative}
#desk .win.tkroom > .win-h .win-btns{display:none!important}
.tkroom .chat-head{position:relative;display:flex;justify-content:center;padding:14px 16px 10px}
.tkroom .chat-head .back,.tkroom .chat-head .tk-ed{position:absolute;top:16px;width:30px;height:30px!important;padding:0!important;border-radius:10px!important;border:0!important;display:grid!important;place-items:center;cursor:pointer;box-shadow:none!important}
.tkroom .chat-head .back{left:14px;background:none!important;color:#3FAE84}
.tkroom .chat-head .tk-ed{right:14px;background:#F3F7F5!important;color:#3B544B!important}
.tkroom .chat-head svg{width:17px;height:17px}
.tk-hc{display:flex;flex-direction:column;align-items:center;min-width:0;max-width:70%}
.tk-stack{display:flex}
.tkroom .tk-hav{width:38px;height:38px;flex:none;border-radius:50%!important;overflow:hidden;border:2.5px solid #fff!important;box-shadow:none!important;margin-left:-11px}
.tkroom .tk-hav:first-child{margin-left:0}
.tk-hc b{margin-top:5px;font:800 13px 'Pretendard',sans-serif;color:#14231E;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.tk-hc small{display:flex;align-items:center;gap:5px;font:600 10px 'Pretendard',sans-serif;color:#3FAE84}
.tk-hc small i{width:6px;height:6px;border-radius:50%;background:#3FAE84}
.tk-pin{display:flex;align-items:center;gap:8px;margin:0 14px 2px;padding:7px 12px;border-radius:12px;background:#fff;box-shadow:0 0 0 1px #EAF0ED,0 4px 12px -8px rgba(20,35,30,.2);font:400 11px 'Pretendard',sans-serif;color:#2F5A4E;text-align:left}
.tk-pin b{flex:none;padding:3px 6px;border-radius:6px;background:#3FAE84;color:#fff;font:800 9.5px 'Pretendard',sans-serif}
.tk-pin span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tkroom .chat{background:#fff!important;height:100%}
.tkroom .chat-list{background:#fff!important;padding:10px 16px 12px!important;gap:5px!important}
.tk-day{align-self:center;margin:0 auto 6px;height:20px;padding:0 10px;border-radius:99px;background:#F3F7F5;font:500 9.5px/20px 'Pretendard',sans-serif;color:#8A9894;width:max-content}
.tkroom .who{font:500 9.5px 'Pretendard',sans-serif!important;color:#8A9894!important;margin-top:6px}
.tkroom .who .av{width:28px!important;height:28px!important;border-radius:50%!important}
.tkroom .who.me{display:none!important}
.tkroom .msg{font:400 11.5px/1.5 'Pretendard',sans-serif!important;padding:7px 12px!important;border-radius:18px!important;border:0!important;box-shadow:none!important;max-width:74%}
.tkroom .msg.them{background:#EEF3F1!important;color:#14231E!important;margin-left:36px!important}
.tkroom .msg.me{background:linear-gradient(135deg,#7FD7B1,#3FAE84)!important;color:#fff!important;box-shadow:0 6px 14px -8px rgba(47,156,116,.8)!important}
.tkroom .msg.emo{background:none!important;box-shadow:none!important;font-size:26px!important;padding:0 6px!important}
.tk-re{align-self:flex-start;margin:-8px 0 0 44px;height:20px;padding:0 7px;border-radius:99px;background:#fff;box-shadow:0 1px 5px rgba(20,35,30,.15);font:500 9.5px/20px 'Pretendard',sans-serif;color:#3FAE84;position:relative;z-index:1}
.tk-re.me{align-self:flex-end;margin:-8px 6px 0 0}
.tk-rd{align-self:flex-end;font:400 9px 'Pretendard',sans-serif;color:#A3B2AD}.tk-rd em{font-style:normal;color:#3FAE84;font-weight:800;margin-right:4px}
.tkroom .chat-in{display:flex!important;align-items:center;gap:8px;padding:10px 14px 14px!important;background:#fff!important;border-top:0!important}
.tkroom .chat-in .plus{width:32px!important;height:32px!important;border-radius:50%!important;background:#F1F5F3!important;color:#3FAE84!important;border:0!important;flex:none;display:grid;place-items:center;padding:0!important}
.tkroom .chat-in label{flex:1;min-width:0;display:flex;align-items:center;gap:6px;height:38px;padding:0 4px 0 14px;border-radius:99px;border:1.5px solid #E3ECE8;background:#fff}
.tkroom .chat-in input{flex:1;min-width:0;border:0!important;outline:0;background:none!important;font:400 11.5px 'Pretendard',sans-serif;color:#14231E;padding:0!important;height:auto!important;box-shadow:none!important}
.tkroom .chat-in .sm{color:#A3B2AD;display:grid;place-items:center}.tkroom .chat-in .sm svg{width:17px;height:17px}
.tkroom .chat-in label button{width:30px!important;height:30px!important;border-radius:50%!important;background:#14231E!important;color:#fff!important;border:0!important;flex:none;display:grid;place-items:center;padding:0!important}
.tkroom .chat-in svg{width:15px;height:15px}
.tk .tk-add{display:grid}
html:not(.sye-editing) .tk .tk-add,html:not(.sye-editing) .tkroom .tk-ed{display:none!important}
.tk-fm{z-index:99997}
.tk-fm .tk-topck{display:flex!important;align-items:center;font:700 12px 'IBM Plex Sans KR',sans-serif;margin-top:14px;padding:0}
@media (max-width:720px),(max-aspect-ratio:4/5) and (max-width:1100px),(max-height:599px){
  #desk .win.tkwin,#desk .win.tkroom{box-shadow:0 18px 40px -18px rgba(20,35,30,.3)!important}
  #desk .win.tkwin > .win-h{display:none!important}
}
`; document.head.appendChild(st); })();
/* 배너 · 아이콘 패널 : 배경에 맞춰 조금 더 밝게 */
(() => { const st = document.createElement('style'); st.textContent = `
html body #desk .sy-hero{background-image:radial-gradient(120% 140% at 20% 0%,#FBFDF9 0%,#F5FAF3 55%,#EFF7F2 100%)!important}
html body #desk .apps-panel{background-color:rgba(252,254,253,.96)!important}
html body #desk .taskbar{background-color:rgba(253,254,254,.94)!important}
`; document.head.appendChild(st); })();
/* Pedal Board : 흰 바탕 · 민트 · 진짜 페달처럼 */
(() => { const st = document.createElement('style'); st.textContent = `
#desk .win.pb2{background:#fff!important;border:1px solid #E6EEEA!important;border-radius:24px!important;box-shadow:0 30px 60px -28px rgba(20,35,30,.3)!important;overflow:hidden}
#desk .win.pb2 > .win-h{background:#fff!important;border-bottom:1px solid #F0F4F2!important}
#desk .win.pb2 .pd-head .tile{background:linear-gradient(135deg,#6FD0A6,#3FAE84)!important;color:#fff!important;border-radius:10px!important}
#desk .win.pb2 .pd-head .st{background:#EAF7F1!important;color:#2F9C74!important;border:0!important}
#desk .win.pb2 .win-b{padding:14px!important;background:#fff!important;overflow-y:auto;scrollbar-width:none}
.pb{display:flex;flex-direction:column;gap:12px;font-family:'Pretendard','IBM Plex Sans KR',sans-serif;color:#14231E}
.pb-chain{border-radius:20px;background:#F6FAF8;border:1px solid #E6EEEA;padding:12px 14px 12px;background-image:linear-gradient(rgba(20,35,30,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(20,35,30,.035) 1px,transparent 1px);background-size:16px 16px}
.pb-ch-h{display:flex;justify-content:space-between;align-items:center;font:800 9.5px 'Inter',sans-serif;letter-spacing:.16em;color:#8A9894}
.pb-ch-h b{height:22px;padding:0 9px;border-radius:99px;background:#fff;color:#2F9C74;font:800 10px/22px 'Pretendard',sans-serif;letter-spacing:0;box-shadow:0 1px 4px rgba(20,35,30,.08)}
.pb-rig{display:flex;align-items:center;margin:14px 0 12px;min-height:104px}
.pb-jack{flex:none;display:flex;flex-direction:column;align-items:center;gap:4px;font:800 8.5px 'Inter',sans-serif;letter-spacing:.12em;color:#8A9894}
.pb-jack i{width:18px;height:18px;border-radius:50%;background:#fff;border:4px solid #2F4E45;box-shadow:0 2px 6px rgba(20,35,30,.18)}
.pb-cable{flex:1;min-width:6px;height:3px;border-radius:3px;background:#2F4E45;opacity:.8}
.pb-cable.sm{flex:0 0 6px}
.pb-slots{display:flex;align-items:center}
.pb-slot{width:62px;height:92px;border-radius:12px;border:1.5px dashed #BFD9CC;background:rgba(255,255,255,.7);display:grid;place-items:center;cursor:default;transition:transform .2s}
.pb-slot em{font:800 11px 'DM Mono',monospace;font-style:normal;color:#A9BDB4}
.pb-slot.on{border:0;background:none;cursor:pointer}
.pb-slot.on:hover{transform:translateY(-2px)}
.pb-amp{flex:none;width:58px;height:84px;border-radius:12px;background:#2F4E45;padding:7px;display:flex;flex-direction:column;gap:5px;align-items:stretch;box-shadow:0 10px 18px -10px rgba(20,35,30,.6);position:relative}
.pb-grill{flex:1;border-radius:6px;background:radial-gradient(circle,#4E7266 1.2px,transparent 1.6px) 0 0/5px 5px,#253F37}
.pb-vu{height:5px;border-radius:3px;background:#1B2E28;overflow:hidden}.pb-vu i{display:block;height:100%;width:0;background:linear-gradient(90deg,#7FD7B1,#F2C66B);transition:width .4s}
.pb-amp small{font:800 7.5px 'Inter',sans-serif;letter-spacing:.2em;color:#9FC9B8;text-align:center}
.pb-amp.live{animation:pbAmp .5s ease-in-out infinite alternate}
.pb-amp.live .pb-grill{background:radial-gradient(circle,#7FD7B1 1.2px,transparent 1.6px) 0 0/5px 5px,#253F37}
@keyframes pbAmp{to{transform:scale(1.035)}}
/* 페달 */
.pb-ped{position:relative;display:flex;flex-direction:column;align-items:center;width:62px;height:92px;border-radius:12px;background:var(--c);padding:8px 6px 7px;box-shadow:inset 0 -6px 0 rgba(0,0,0,.08),0 8px 16px -10px rgba(20,35,30,.55);animation:pbIn .35s cubic-bezier(.3,1.5,.5,1)}
@keyframes pbIn{from{transform:translateY(-14px) scale(.9);opacity:0}}
.pb-ped .pb-led{position:absolute;right:8px;top:7px;width:6px;height:6px;border-radius:50%;background:#F06A6A;box-shadow:0 0 6px #F06A6A}
.pb-kn{display:flex;gap:7px;margin-top:6px}.pb-kn i{width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 2px 3px rgba(0,0,0,.18);position:relative}
.pb-kn i::after{content:'';position:absolute;left:6px;top:2px;width:2px;height:5px;border-radius:1px;background:#2F4E45}
.pb-ped b{margin-top:8px;font:800 7.5px 'Inter',sans-serif;letter-spacing:.1em}
.pb-ped.lt b{color:#2F4E45}.pb-ped.dk b{color:#fff}
.pb-fs{margin-top:auto;width:24px;height:24px;border-radius:50%;background:#E9EEEC;border:3px solid rgba(0,0,0,.12);box-shadow:inset 0 -2px 0 rgba(0,0,0,.12)}
.pb-ped.sm{animation:pbIn .35s cubic-bezier(.3,1.5,.5,1)}
/* 통계 */
.pb-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.pb-stats div{border-radius:12px;background:#fff;padding:8px 10px;box-shadow:0 1px 4px rgba(20,35,30,.06)}
.pb-stats small{display:block;font:800 8.5px 'Inter',sans-serif;letter-spacing:.14em;color:#8A9894}
.pb-stats b{display:flex;align-items:baseline;gap:3px;margin-top:2px;font:800 17px 'Inter',sans-serif;color:#14231E}
.pb-stats em{font:600 9.5px 'Inter',sans-serif;font-style:normal;color:#8A9894}
.pb-mission{display:flex;align-items:center;gap:8px;margin:0;padding:9px 12px;border-radius:12px;background:#EEF8F3;font:500 11.5px 'Pretendard',sans-serif}
.pb-mission span{flex:none;padding:3px 7px;border-radius:6px;background:#3FAE84;color:#fff;font:700 9.5px 'Pretendard',sans-serif}
.pb-mission b{font-weight:700;color:#2F5A4E}
.pb-shelf-h{display:flex;align-items:baseline;justify-content:space-between;padding:0 2px}
.pb-shelf-h b{font:800 13px 'Pretendard',sans-serif}.pb-shelf-h small{font:500 10.5px 'Pretendard',sans-serif;color:#8A9894}
.pb-shelf{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.pb-pick{display:flex;flex-direction:column;align-items:center;gap:7px;padding:10px 4px 9px;border-radius:16px;border:1px solid #EEF3F1;background:#fff;cursor:pointer;transition:transform .15s,box-shadow .2s}
.pb-pick:hover{box-shadow:0 8px 18px -12px rgba(20,35,30,.4);transform:translateY(-2px)}
.pb-pick .pb-ped{animation:none}
.pb-pick.hit .pb-ped{animation:pbStomp .3s}
@keyframes pbStomp{40%{transform:translateY(3px) scale(.96)}}
.pb-nm b{font:700 11.5px 'Pretendard',sans-serif;color:#14231E}
.pb-act{display:flex;gap:8px}
.pb-act button{height:44px;border-radius:14px;border:0;font:800 13px 'Pretendard',sans-serif;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:7px}
.pb-act .go{flex:1;background:#E9EFEC;color:#8A9894;transition:all .25s}
.pb-act .go svg{width:15px;height:15px}
.pb-act .go.ready{background:linear-gradient(135deg,#7FD7B1,#3FAE84);color:#fff;box-shadow:0 12px 22px -10px rgba(47,156,116,.75)}
.pb-act .clr{width:84px;background:#F3F7F5;color:#3B544B}
.pb-res{display:flex;align-items:center;gap:10px;min-height:52px;padding:10px 14px;border-radius:16px;border:1px solid #E6EEEA;background:#fff;font:500 11.5px/1.45 'Pretendard',sans-serif;color:#3B544B}
.pb-res > i{flex:none;width:22px;height:22px;border-radius:7px;background:var(--c,#E9EFEC)}
.pb-res b{display:inline;font:800 13px 'Pretendard',sans-serif;color:#14231E;margin-right:6px}
.pb-res small{display:block;margin-top:2px;font:500 11px 'Pretendard',sans-serif;color:#6E7E78}
.pb-res .new{display:inline-block;padding:1px 6px;border-radius:5px;background:#F06A6A;color:#fff;font:800 9px 'Inter',sans-serif;vertical-align:2px}
.pb-res.pop{animation:pbRes .45s cubic-bezier(.3,1.5,.5,1)}
@keyframes pbRes{from{transform:scale(.94);opacity:.4}}
`; document.head.appendChild(st); })();
/* Link Hub : 레코드 선반 (OOC 창과 같은 틀) — 커버를 누르면 바로 이동 */
(() => { const st = document.createElement('style'); st.textContent = `
#desk .win.lha{border-radius:24px!important;background:#F3FCFD!important;background-image:linear-gradient(rgba(49,172,189,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(49,172,189,.06) 1px,transparent 1px)!important;background-size:22px 22px!important;border:1.5px solid #D3EFF3!important;box-shadow:0 30px 60px -28px rgba(30,80,90,.35)!important;overflow:hidden!important}
#desk .win.lha::before{content:'';position:absolute;left:28px;right:28px;top:0;height:4px;border-radius:0 0 4px 4px;background:linear-gradient(90deg,#5FD3BC,#31ACBD);z-index:3}
#desk .win.lha > .win-h{position:absolute!important;left:0;right:60px;top:0;height:40px!important;background:transparent!important;border:0!important;z-index:2}
#desk .win.lha .win-b{padding:0!important;background:transparent!important;overflow-y:auto;scrollbar-width:none}
#desk .win.lha .win-b::-webkit-scrollbar{display:none}
.lha-w{display:flex;flex-direction:column;min-height:100%;font-family:'Pretendard',sans-serif;color:#15202A}
.lha-hd{display:flex;align-items:center;gap:12px;padding:20px 18px 12px}
.lha-num{font:900 46px/1 'Inter',sans-serif;letter-spacing:-.04em;color:transparent;background:radial-gradient(circle,#31ACBD 1.3px,transparent 1.7px) 0 0/4.5px 4.5px;-webkit-background-clip:text;background-clip:text}
.lha-hd small{display:inline-block;height:20px;padding:0 9px;border-radius:99px;background:#fff;border:1px solid #D3EFF3;font:800 9px/18px 'Inter',sans-serif;letter-spacing:.14em;color:#31ACBD}
.lha-hd b{display:block;font:900 21px 'Inter',sans-serif;letter-spacing:-.02em;color:#31ACBD;margin-top:3px}
.lha-hd em{display:block;font:700 9.5px 'Inter',sans-serif;font-style:normal;letter-spacing:.14em;color:#7C979E;margin-top:2px}
.lha-x{margin-left:auto;align-self:flex-start;width:30px;height:30px;border-radius:50%;background:#fff;border:1px solid #D3EFF3;display:grid;place-items:center;color:#31ACBD;cursor:pointer;padding:0}
.lha-x svg{width:13px;height:13px}
.lha-dash{margin:0 18px 14px;border-top:1.5px dashed #B9E2E8}
.lha-gr{display:grid;grid-template-columns:1fr 1fr;gap:16px 14px;padding:0 18px}
.lha-it{display:block;text-decoration:none;color:inherit;min-width:0}
.lha-sl{position:relative;display:block;width:calc(100% - 14px);aspect-ratio:1}
.lha-vn{position:absolute;left:0;top:5%;width:90%;height:90%;border-radius:50%;background:radial-gradient(circle,#2A3842 0%,#15202A 70%);transform:translateX(22%);transition:transform .45s cubic-bezier(.3,1.3,.5,1)}
.lha-vn::after{content:'';position:absolute;left:50%;top:50%;width:32%;height:32%;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,#F3FCFD 0 3px,#5FD3BC 4px)}
.lha-it:hover .lha-vn,.lha-it:active .lha-vn{transform:translateX(29%) rotate(40deg)}
.lha-cv{position:absolute;inset:0;border-radius:12px;overflow:hidden;box-shadow:0 12px 20px -12px rgba(20,40,50,.5);z-index:1;transition:transform .25s}
.lha-it:hover .lha-cv{transform:translateY(-2px)}
.lha-cv .ph{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;border-radius:0!important;border:0!important;box-shadow:none!important}
.lha-it.c0 .lha-cv .ph{background:linear-gradient(150deg,#15202A,#2E4652)!important}
.lha-it.c1 .lha-cv .ph{background:linear-gradient(150deg,#A8E6F0,#5FC9D6)!important}
.lha-it.c2 .lha-cv .ph{background:linear-gradient(150deg,#FDF1C9,#F6D77A)!important}
.lha-it.c3 .lha-cv .ph{background:linear-gradient(150deg,#D9F3F7,#B6E3EC)!important}
.lha-it.c4 .lha-cv .ph{background:linear-gradient(150deg,#FCE1E7,#F4A9B8)!important}
.lha-it.c5 .lha-cv .ph{background:linear-gradient(150deg,#7FD9C6,#36B3B8)!important}
.lha-cv .ph .ph-ic{display:none}
.lha-cv .ph::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 78% 22%,rgba(255,255,255,.35),transparent 45%);pointer-events:none}
.lha-cv em{position:absolute;left:8px;top:7px;font:800 9px 'DM Mono',monospace;font-style:normal;color:rgba(255,255,255,.92);z-index:2;pointer-events:none;text-shadow:0 1px 3px rgba(0,0,0,.15)}
.lha-it.c2 .lha-cv em,.lha-it.c3 .lha-cv em,.lha-it.c4 .lha-cv em{color:rgba(21,32,42,.55);text-shadow:none}
.lha-it b{display:block;margin-top:9px;font:800 12.5px 'Pretendard',sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lha-it p{margin:2px 0 0;font:500 10.5px 'Pretendard',sans-serif;color:#7C979E;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lha-f{margin-top:auto;display:flex;justify-content:space-between;padding:18px 18px 14px;font:800 9px 'Inter',sans-serif;letter-spacing:.14em;color:#9AB3B9}
`; document.head.appendChild(st); })();
/* 장르 목록 창 (東京青藍大学 · ARCH · FRONTLINE · ETC.) : OOC · Profile 창과 같은 틀 — 상세 창은 그대로 */
(() => { const st = document.createElement('style'); st.textContent = `
#desk .win.cxwin{border-radius:24px!important;background:#F3FCFD!important;background-image:linear-gradient(rgba(49,172,189,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(49,172,189,.06) 1px,transparent 1px)!important;background-size:22px 22px!important;border:1.5px solid #D3EFF3!important;box-shadow:0 22px 50px -14px rgba(34,78,92,.35),inset 0 1px 0 #fff!important;overflow:hidden}
#desk .win.cxwin::before{content:'';position:absolute;left:28px;right:28px;top:0;height:4px;border-radius:0 0 4px 4px;background:linear-gradient(90deg,#5FD3BC,#31ACBD)!important;z-index:3}
#desk .win.cxwin > .win-h{background:transparent!important;border:0!important;padding:14px 14px 0 16px!important;height:auto!important;min-height:44px}
#desk .win.cxwin .cxh-tabs{gap:20px!important;padding:0 0 0 8px!important;background:transparent!important;box-shadow:none!important;border-radius:0!important}
#desk .win.cxwin .cxh-tabs .btab{position:relative;height:32px!important;padding:0!important;border-radius:0!important;background:transparent!important;border:0!important;box-shadow:none!important;color:#9DB4B8!important;font:800 11.5px 'Inter',sans-serif!important;letter-spacing:.1em;gap:6px!important;transition:color .2s}
#desk .win.cxwin .cxh-tabs .btab:hover{color:#3BB3B6!important}
#desk .win.cxwin .cxh-tabs .btab.on{color:#15202A!important}
#desk .win.cxwin .cxh-tabs .btab.on::after{content:'';position:absolute;left:0;right:0;bottom:0;height:3px;border-radius:3px;background:linear-gradient(90deg,#6BCFC0,#3BB3B6)}
#desk .win.cxwin .cxh-tabs .btab .fav{width:16px!important;height:16px!important;background:transparent!important;color:inherit!important;box-shadow:none!important;border:0!important}
#desk .win.cxwin .cxh-tabs .btab .fav svg{width:14px!important;height:14px!important}
#desk .win.cxwin .cxh-tabs .btab .fav,#desk .win.cxwin .cxh-tabs .btab .fav *{color:inherit!important;stroke:currentColor!important}
#desk .win.cxwin .cxh-tabs .btab small,#desk .win.cxwin .cxh-tabs .btab em{background:none!important;min-width:0;padding:0;height:auto;color:#B7C9CC!important;font:800 10px 'Inter',sans-serif!important;opacity:1!important}
#desk .win.cxwin .cxh-tabs .btab.on small,#desk .win.cxwin .cxh-tabs .btab.on em{color:#3BB3B6!important;background:none!important}
#desk .win.cxwin .rs-card{border:0!important;border-radius:16px!important;background:transparent!important;box-shadow:0 12px 20px -12px rgba(34,78,92,.45)!important}
#desk .win.cxwin .rs-card.on{box-shadow:0 0 0 2.5px #5FD3BC,0 12px 20px -12px rgba(34,78,92,.45)!important}
#desk .win.cxwin .rs-card .ov{background:linear-gradient(transparent,rgba(20,60,64,.55))!important}
#desk .win.cxwin .win-b{background:transparent!important}
#desk .win.cxwin .cx{background:transparent!important}
.cx .cxz-head{padding:10px 18px 10px!important;cursor:default;animation:none}
.cx .cxz-head .dz-num{font-size:56px}
.cx .cxz-head b{font-size:22px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px}
.cx .cxz-head .cx-add{margin-left:auto;align-self:flex-start}
.cx > .dz-rule{margin:0 18px 12px}
#desk .win.cxwin .cx-card{border-radius:16px!important;box-shadow:0 12px 20px -12px rgba(34,78,92,.45)!important}
#desk .win.cxwin .cp-card{border-color:#D3EFF3!important}
`; document.head.appendChild(st); })();
(() => { const st = document.createElement('style'); st.textContent = `#desk .win.cxwin .cx-top2 h3{color:#31ACBD!important}#desk .win.cxwin .cx-meta span{color:#7C979E!important}#desk .win.cxwin .cx-scroll .ph:not(:has(img)){background:linear-gradient(160deg,#BDEBE0 0%,#7FD3C2 55%,#4DB8AE 100%)!important}#desk .win.cxwin .cx-scroll .ph:not(:has(img))::before,#desk .win.cxwin .cx-scroll .ph:not(:has(img))::after{opacity:.35}`; document.head.appendChild(st); })();
/* 장르 창 : 제목 아래 점선 (OOC 창처럼) */
(() => { const st = document.createElement('style'); st.textContent = `.cx .cx-top2{display:flex;align-items:center;justify-content:flex-start!important;gap:12px}.cx .cx-top2 .cx-add{margin-left:auto}.cx .cxt-t{min-width:0}.cx .cxt-t .cx-meta{margin:4px 0 0!important;padding:0!important}.cx > .cxr{margin:8px 0 4px!important}.cx .cx-scroll > .rs-sec:first-child{margin-top:0!important}`; document.head.appendChild(st); })();
/* Profile ~ ETC. (dz · cx 창) · 캐릭터 상세 · Link Hub : 초록 민트와 틸의 중간 · 파스텔 민트로 색만 바꿔요
   (이 창들에 쓰인 CSS 규칙을 복사해서 초록 · 청록 계열 색만 골라 바꿔 붙여요 — 사진 색은 그대로) */
(() => {
  const H0 = 156;   // 메인 · 입장 화면 민트(#3FAE84 · #6FD0A6)와 같은 색상   // 목표 색상 (초록 155 ↔ 틸 187 의 중간 · 파스텔 민트)
  const SEL = /dzwin|\.dz|rmz|\.rm-|\.rm\b|cxwin|\.cx|cydet|chardet|charwin|\.cd-|\.cy-|\.cf-|\.lha/;
  const toHsl = (r, g, b) => { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2; let h = 0, s = 0;
    if (mx !== mn) { const d = mx - mn; s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; } return [h, s, l]; };
  const toRgb = (h, s, l) => { const k = n => (n + h / 30) % 12, a = s * Math.min(l, 1 - l), f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))); return [f(0), f(8), f(4)].map(x => Math.round(x * 255)); };
  const shift = (r, g, b) => { let [h, s, l] = toHsl(+r, +g, +b); if (s < .12 || h < 120 || h > 205) return null;
    h = H0; s = Math.min(s, .6) * .82; if (l < .86) l = l + (1 - l) * .2;   // 색상은 민트 하나로 맞추고 · 연하고 부드럽게
    return toRgb(h, s, l); };
  const remap = txt => txt.replace(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(\s*,\s*[\d.]+)?\s*\)/g, (m, r, g, b, a) => { const c = shift(r, g, b); return c ? (a ? `rgba(${c.join(', ')}${a})` : `rgb(${c.join(', ')})`) : m; });
  const run = () => {
    const out = [];
    const walk = rules => { for (const r of rules) {
      if (r.cssRules && (r.type === 4 || r.type === 12)) { const inner = []; const save = out.length; walk(r.cssRules); const got = out.splice(save); if (got.length) out.push(`@media ${r.conditionText || r.media.mediaText}{${got.join('')}}`); continue; }
      if (r.selectorText && SEL.test(r.selectorText) && /rgb/.test(r.style.cssText)) { const t = remap(r.style.cssText); if (t !== r.style.cssText) out.push(`${r.selectorText}{${t}}`); }
    } };
    for (const sh of document.styleSheets) { if (sh.ownerNode && sh.ownerNode.id === 'mint-mid') continue; try { walk(sh.cssRules); } catch (e) {} }
    let st = document.getElementById('mint-mid'); if (!st) { st = document.createElement('style'); st.id = 'mint-mid'; }
    st.textContent = out.join('\n'); document.head.appendChild(st);
  };
  run(); setTimeout(run, 0); addEventListener('load', run);
})();
/* 편집 중 : 목록 카드 글자에 ✎ 표시 */
(() => { const st = document.createElement('style'); st.textContent = `
html.sye-editing #winlayer .cxwin [data-ci] .cx-ov,html.sye-editing #winlayer .cxwin [data-ci] .ov,html.sye-editing #winlayer .cxwin [data-ci] .cp-h{outline:1.5px dashed rgba(255,255,255,.85);outline-offset:-4px;border-radius:10px;cursor:text}
html.sye-editing #winlayer .cxwin [data-ci] .cx-ov::before,html.sye-editing #winlayer .cxwin [data-ci] .ov::before{content:'✎ 글자 수정';position:absolute;right:8px;top:-22px;height:18px;padding:0 7px;border-radius:99px;background:#fff;color:#2F9C74;font:800 9.5px/18px 'Pretendard',sans-serif;box-shadow:0 2px 6px rgba(0,0,0,.15)}
html.sye-editing #winlayer .cxwin [data-ci] .cx-ov,html.sye-editing #winlayer .cxwin [data-ci] .ov,html.sye-editing #winlayer .cxwin [data-ci] .cp-h{z-index:5;pointer-events:auto!important}
`; document.head.appendChild(st); })();
/* 메인 화면 : 입장 화면 분위기 살짝 (반짝이 별 · 천천히 움직이는 민트 빛 · 모서리 십자) — 큰 틀은 그대로 */
(() => {
  const dk = document.getElementById('desk'); if (!dk || dk.querySelector('.desk-fx')) return;
  const sp = (x, y, s, d) => `<svg class="dfx-sp" style="left:${x}%;top:${y}%;width:${s}px;height:${s}px;animation-delay:${d}s" viewBox="0 0 24 24"><path d="M12 1.5C12.6 8 16 11.4 22.5 12 16 12.6 12.6 16 12 22.5 11.4 16 8 12.6 1.5 12 8 11.4 11.4 8 12 1.5z"/></svg>`;
  const fx = document.createElement('div'); fx.className = 'desk-fx'; fx.setAttribute('aria-hidden', 'true');
  fx.innerHTML = `${sp(2.2, 30, 16, 0)}${sp(81.5, 3.6, 13, -1.2)}${sp(97.6, 47, 15, -2)}${sp(48, 95.6, 12, -.6)}${sp(1.4, 88, 11, -1.7)}`;
  dk.prepend(fx);
  const st = document.createElement('style'); st.textContent = `
#desk .desk-fx{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
#desk .dfx-b{position:absolute;border-radius:50%;filter:blur(60px);opacity:.55;animation:dfxB 16s ease-in-out infinite alternate}
#desk .dfx-b.b1{left:30%;top:-18%;width:34vw;height:28vw;background:#E3F6EC}
#desk .dfx-b.b2{right:22%;bottom:-20%;width:30vw;height:26vw;background:#DDF3E9;animation-delay:-8s}
@keyframes dfxB{to{transform:translate(5vw,4vh) scale(1.1)}}
#desk .dfx-sp{position:absolute;fill:#fff;stroke:#5E9C86;stroke-width:1.2;stroke-linejoin:round;opacity:.8;animation:dfxTw 3.4s ease-in-out infinite}
@keyframes dfxTw{0%,100%{transform:scale(1) rotate(0)}50%{transform:scale(.5) rotate(45deg);opacity:.35}}
#desk .dfx-cr{position:absolute;width:18px;height:18px;opacity:.28}
#desk .dfx-cr::before,#desk .dfx-cr::after{content:'';position:absolute;background:#14231E}
#desk .dfx-cr::before{left:8.5px;top:0;width:1px;height:18px}#desk .dfx-cr::after{top:8.5px;left:0;height:1px;width:18px}
#desk .dfx-cr.c1{left:6px;top:52px}#desk .dfx-cr.c2{right:6px;top:52px}#desk .dfx-cr.c3{left:6px;bottom:64px}#desk .dfx-cr.c4{right:6px;bottom:64px}
@media (max-width:720px),(max-aspect-ratio:4/5) and (max-width:1100px),(max-height:599px){#desk .dfx-cr,#desk .dfx-sp:nth-of-type(n+3){display:none}}
@media (prefers-reduced-motion:reduce){#desk .dfx-b,#desk .dfx-sp{animation:none}}
`; document.head.appendChild(st);
})();

/* ---------- FRONTLINE 소속팀 나누기 · 카드 이름 한 줄 맞추기 ---------- */
(() => {
  const st = document.createElement('style'); st.textContent = `
  .cx-grid .cx-card{container-type:inline-size}
  .cx-grid .cx-card .cx-ov{padding-left:10px!important;padding-right:8px!important}
  .cx-grid .cx-card .cx-ov .cx-nm{font-size:clamp(10px,10cqw,16px)!important}
  .mp-tab{position:relative}
  .mp-tab .mp-dx{position:absolute;top:2px;right:4px;width:16px;height:16px;border-radius:50%;background:#fff;border:1px solid #DCE8E2;color:#8A9894;font:700 11px/14px sans-serif;text-align:center;font-style:normal;cursor:pointer}
  .mp-tab.mp-add{border:1.5px dashed #9EDBC2!important;background:transparent!important;display:grid!important;place-items:center!important;padding:0!important;min-width:0}
  .mp-tab.mp-add b{color:#7FD7B1!important;font:800 18px/1 sans-serif!important}
  .fl-team{margin:0 0 22px}
  .fl-team:last-child{margin-bottom:4px}
  .fl-th{display:flex;align-items:center;gap:10px;margin:0 2px 12px;padding-bottom:10px;border-bottom:1px solid color-mix(in srgb,var(--tc) 30%,#E3ECE8);position:relative}
  .fl-th::after{content:'';position:absolute;left:0;bottom:-1px;width:54px;height:2px;border-radius:2px;background:var(--tc)}
  .fl-em{flex:none;width:28px;height:28px;border-radius:9px;display:grid;place-items:center;background:var(--tc);box-shadow:0 4px 10px color-mix(in srgb,var(--tc) 32%,transparent),inset 0 1px 0 rgba(255,255,255,.35)}
  .fl-silver .fl-em{background:linear-gradient(150deg,#D9E0E5,#97A4AD 55%,#7E8B94)}
  .fl-crown .fl-em{background:linear-gradient(150deg,#F4DC94,#CFA046 55%,#B5862E)}
  .fl-black .fl-em{background:linear-gradient(150deg,#4A5257,#23282B 60%,#121517)}
  .fl-red .fl-em{background:linear-gradient(150deg,#F28B86,#E0565B 55%,#C8403F)}
  .fl-none .fl-em{background:linear-gradient(150deg,#8FDDBB,#3FAE84 60%,#2F946E)}
  .fl-em svg{width:15px;height:15px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
  .fl-tt{display:flex;flex-direction:column;gap:4px;min-width:0}
  .fl-tt b{font:900 11.5px/1 'Montserrat','IBM Plex Sans KR',sans-serif;letter-spacing:.14em;color:#1E2A27;white-space:nowrap}
  .fl-tt small{font:600 9.5px/1 'IBM Plex Sans KR',sans-serif;color:#7C8B86;letter-spacing:.04em;white-space:nowrap}
  .fl-tt small i{font-style:normal;color:var(--tc);margin:0 1px}
  .fl-deco{flex:none;width:34px;margin-left:auto!important;align-self:center;height:5px;margin:0 2px 0 6px;opacity:.55}
  .fl-red .fl-deco{background:repeating-linear-gradient(-45deg,var(--tc) 0 3px,transparent 3px 7px);-webkit-mask:linear-gradient(90deg,transparent,#000 70%);mask:linear-gradient(90deg,transparent,#000 70%)}
  .fl-silver .fl-deco{background:repeating-linear-gradient(90deg,var(--tc) 0 1px,transparent 1px 6px) bottom/100% 5px no-repeat,repeating-linear-gradient(90deg,var(--tc) 0 1px,transparent 1px 30px) bottom/100% 8px no-repeat;-webkit-mask:linear-gradient(90deg,transparent,#000 60%);mask:linear-gradient(90deg,transparent,#000 60%)}
  .fl-crown .fl-deco{height:6px;background:radial-gradient(circle,var(--tc) 0 1.6px,transparent 2px) 100% 50%/14px 6px repeat-x;-webkit-mask:linear-gradient(90deg,transparent,#000 70%);mask:linear-gradient(90deg,transparent,#000 70%);opacity:.7}
  .fl-black .fl-deco{background:radial-gradient(circle,var(--tc) 0 1px,transparent 1.4px) 0 0/5px 4px;-webkit-mask:linear-gradient(90deg,transparent,#000 65%);mask:linear-gradient(90deg,transparent,#000 65%);opacity:.45}
  .fl-none .fl-deco{height:5px;background:repeating-linear-gradient(270deg,var(--tc) 0 5px,transparent 5px 9px);border-radius:2px;-webkit-mask:linear-gradient(90deg,transparent,#000 70%);mask:linear-gradient(90deg,transparent,#000 70%);opacity:.4}
  .fl-em,.fl-tt small{display:none!important}
  .fl-th em{flex:none;font:800 9px/1 'DM Mono',monospace;font-style:normal;letter-spacing:.08em;color:var(--tc)}
  .fl-silver .fl-th em{color:#7E8B94}
  .fl-team .cx-card.on{outline-color:var(--tc)!important}
  .cx-grid .cx-card .cx-ov .cx-en{white-space:nowrap!important;overflow:hidden}`;
  document.head.appendChild(st);
})();
/* ---------- 색감 정리 (퓨어.kr 처럼) : 바탕 · 선은 차분한 쿨그레이 · 글씨는 깊은 먹색 · 포인트는 맑은 민트 하나 ----------
   (모든 CSS 규칙의 초록 · 청록 계열 색을 밝기에 따라 세 갈래로 다시 칠해요 — 사진 색은 그대로) */
(() => {
  if (window.__noPurePal) return;
  const toHsl = (r, g, b) => { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2; let h = 0, s = 0;
    if (mx !== mn) { const d = mx - mn; s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; } return [h, s, l]; };
  const toRgb = (h, s, l) => { const k = n => (n + h / 30) % 12, a = s * Math.min(l, 1 - l), f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))); return [f(0), f(8), f(4)].map(x => Math.round(x * 255)); };
  const HA = 154;                      // 대표 민트 (바탕에 깔던 연한 민트빛 계열)
  const shift = (r, g, b) => { let [h, s, l] = toHsl(+r, +g, +b);
    const greenish = h >= 95 && h <= 205;
    if (!greenish) return null;
    if (s < .22) { if (l > .97) return null; return toRgb(214, Math.min(s, .1), l); }          // 초록빛 도는 회색 → 차분한 쿨그레이
    if (l < .3) return toRgb(222, .12, Math.min(l, .11) + .01);                                  // 진한 초록 글씨 · 선 → 먹색
    if (l >= .84) return toRgb(212, .2, Math.max(l, .9));                                        // 아주 연한 민트 바탕 → 쿨 화이트
    if (l >= .66) return toRgb(HA, .5, Math.max(l, .8));                                         // 연한 민트 → 파스텔 민트 (대표색)
    return toRgb(HA, .42, Math.max(.52, Math.min(.62, l + .1)));                                 // 중간 민트 · 청록 → 부드러운 민트 하나 (글씨 · 선용)
  };
  const remap = txt => txt.replace(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(\s*,\s*[\d.]+)?\s*\)/g, (m, r, g, b, a) => { const c = shift(r, g, b); return c ? (a ? `rgba(${c.join(', ')}${a})` : `rgb(${c.join(', ')})`) : m; })
    .replace(/#([0-9a-f]{6}|[0-9a-f]{3})\b/gi, (m, hx) => { if (hx.length === 3) hx = hx.split('').map(x => x + x).join(''); const c = shift(parseInt(hx.slice(0, 2), 16), parseInt(hx.slice(2, 4), 16), parseInt(hx.slice(4, 6), 16)); return c ? '#' + c.map(v => v.toString(16).padStart(2, '0')).join('') : m; });
  // 색만 그 자리에서 바꿔요 (규칙을 맨 뒤로 복사하면 크기 · 칸 규칙 순서가 뒤집혀서 모바일 아이콘이 커졌어요)
  const mine = new WeakMap();          // 규칙마다 내가 칠한 값 (다른 색 스크립트가 나중에 바꾸면 다시 칠해요)
  const run = () => {
    const walk = rules => { for (const r of rules) {
      if (r.cssRules && (r.type === 4 || r.type === 12)) { walk(r.cssRules); continue; }
      if (!r.style || !r.selectorText) continue;
      if (!/rgb|#[0-9a-f]{3}/i.test(r.style.cssText)) continue;
      const st = r.style, props = []; for (let i = 0; i < st.length; i++) props.push(st[i]);
      let m = mine.get(r); if (!m) mine.set(r, m = {});
      for (const pr of props) { const v = st.getPropertyValue(pr); if (m[pr] === v) continue; const t = remap(v); if (t !== v) st.setProperty(pr, t, st.getPropertyPriority(pr)); m[pr] = st.getPropertyValue(pr); }
    } };
    for (const sh of document.styleSheets) { try { walk(sh.cssRules); } catch (e) {} }
  };
  run(); [50, 400, 1200, 3000].forEach(t => setTimeout(run, t)); addEventListener('load', () => { setTimeout(run, 50); setTimeout(run, 600); });
})();
/* APPLICATIONS 옆 : 숫자 대신 작은 민트 점 (상단 칩의 점과 같은 느낌) — 색 정리에 안 옅어지게 점에 직접 칠해요 */
(() => { const st = document.createElement('style'); st.textContent = `#desk .apps-panel .panel-tab .sy-cnt{display:inline-block!important;font-size:0!important;color:transparent!important;min-width:0!important;width:6px!important;height:6px!important;padding:0!important;border-radius:50%!important;margin-left:2px!important;vertical-align:middle!important}`; document.head.appendChild(st);
  const paint = () => document.querySelectorAll('.apps-panel .panel-tab .sy-cnt').forEach(e => { e.style.setProperty('background', '#7FD7B1', 'important'); e.style.setProperty('box-shadow', '0 0 0 3px rgba(127,215,177,.22)', 'important'); });
  paint(); [100, 800, 2500].forEach(t => setTimeout(paint, t)); addEventListener('load', () => setTimeout(paint, 100)); })();

/* ARCH 목록 카드 : 사진 꽉 찬 세로 카드 · 얇은 테두리 · 아래 이름 + 속성 뱃지  */
(() => { const st = document.createElement('style'); st.textContent = `
#desk .win.cxwin .rs-blk{margin-bottom:18px}
#desk .win.cxwin .rs-sec{align-items:center;gap:10px;margin-top:6px}
#desk .win.cxwin .rs-sec b{font:900 16px var(--sans)!important;letter-spacing:-.01em;color:#16202A!important}
#desk .win.cxwin .rs-sec > span{margin-left:auto;font:900 10px var(--sans)!important;letter-spacing:.05em;color:var(--cc,var(--gc))!important}
#desk .win.cxwin .rs-sec b *{font:inherit!important}
#desk .win.cxwin .rs-ln{height:3px!important;border-radius:2px;margin:8px 0 14px;background:linear-gradient(90deg,var(--gc) 0%,color-mix(in srgb,var(--gc) 55%,transparent) 35%,transparent 72%)!important}
#desk .win .mp-tabs{position:relative}
#desk .win .mp-swap{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:3;width:24px;height:24px;border-radius:50%;border:1px solid #D5DEE4;background:#fff;color:#3E8C72;font:900 12px var(--sans);box-shadow:0 2px 6px rgba(20,40,50,.15);cursor:pointer}
#desk .win.cxwin .rs-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:12px!important}
#desk .win.cxwin .rs-card{border-radius:8px!important;border:1.5px solid rgba(120,140,158,.55)!important;background:#2B3746!important;box-shadow:0 8px 18px -8px rgba(15,22,30,.45)!important;aspect-ratio:3/4}
#desk .win.cxwin .rs-card.on{box-shadow:0 0 0 2.5px #5FD3BC,0 8px 18px -8px rgba(15,22,30,.45)!important}
#desk .win.cxwin .rs-card > .ph{position:absolute!important;inset:0!important;width:auto!important;height:auto!important;border-radius:0!important}
#desk .win.cxwin .rs-blk .rs-card .ph.is-empty,#desk .win.cxwin .rs-blk .rs-card .ph:not(:has(img)){background-image:linear-gradient(#334255,#2A3647)!important}
#desk .win.cxwin .rs-blk .rs-card .ph::after{display:none!important}
#desk .win.cxwin .rs-card .ov{padding:44px 11px 12px!important;background:linear-gradient(rgba(14,17,22,0),rgba(14,17,22,.82) 55%,rgba(14,17,22,.95))!important}
#desk .win.cxwin .rs-card .ov b{font:900 15px var(--sans)!important;color:#fff!important;letter-spacing:-.01em;text-shadow:0 1px 6px rgba(0,0,0,.35)}
#desk .win.cxwin .rs-card .ov i{margin-top:5px!important;font:800 9px/1.15 var(--sans)!important;padding:3px 8px!important;border-radius:999px!important;box-shadow:none}
`; document.head.appendChild(st); })();

/* 캐릭터 수정 창 : 깔끔한 카드형 (세이란 · ARCH · FRONTLINE · ETC 공통) */
(() => { const st = document.createElement('style'); st.textContent = `
.sye-fm{background:rgba(24,32,40,.34)!important;backdrop-filter:blur(3px)}
.sye-fm form.cf{width:min(560px,100%);background:#F3F6F8;border-radius:20px;box-shadow:0 30px 70px -20px rgba(20,30,40,.45),0 0 0 1px rgba(255,255,255,.7) inset;position:relative}
.sye-fm form.cf::before{content:'';position:absolute;left:0;right:0;top:0;height:4px;background:linear-gradient(90deg,#A6E6CF,#7FD7B1 45%,#CDEFE2);z-index:2}
.sye-fm form.cf .fh{padding:18px 20px 14px;background:#fff;border-bottom:1px solid #E7ECEF}
.sye-fm form.cf .ft{display:flex;flex-direction:column;gap:3px;font:800 17px 'IBM Plex Sans KR',sans-serif;color:#18212A;letter-spacing:-.01em}
.sye-fm form.cf .ft small{font:800 10px 'Inter',sans-serif;letter-spacing:.16em;color:#5CC29C;text-transform:uppercase}
.sye-fm form.cf .ft b{color:#3E8C72}
.sye-fm form.cf .fh button{width:34px;height:34px;border-radius:50%;border:0;background:#F1F4F6;color:#5B6670;font-size:13px}
.sye-fm form.cf .fh button:hover{background:#E6F6EF;color:#3E8C72}
.sye-fm form.cf .fb{padding:6px 16px 18px}
.sye-fm form.cf .fcard{background:#fff;border:1px solid #E6ECEF;border-radius:16px;padding:4px 16px 16px;margin-top:12px;box-shadow:0 1px 2px rgba(20,30,40,.03)}
.sye-fm form.cf .sec{display:flex;align-items:center;gap:8px;margin:14px 0 4px;font:800 10.5px 'Inter','IBM Plex Sans KR',sans-serif;letter-spacing:.12em;color:#3E8C72}
.sye-fm form.cf .sec::before{content:'';width:7px;height:7px;border-radius:50%;background:#7FD7B1;box-shadow:0 0 0 3px rgba(127,215,177,.22)}
.sye-fm form.cf label{margin-top:12px}
.sye-fm form.cf label > span{font:700 11.5px 'IBM Plex Sans KR',sans-serif;color:#4C5862;margin-bottom:6px}
.sye-fm form.cf input,.sye-fm form.cf textarea,.sye-fm form.cf select{border:1px solid transparent;background:#F4F6F8;border-radius:11px;padding:10px 12px;font:500 13.5px 'IBM Plex Sans KR',sans-serif;color:#18212A;transition:background .15s,border-color .15s,box-shadow .15s}
.sye-fm form.cf input:hover,.sye-fm form.cf textarea:hover,.sye-fm form.cf select:hover{background:#EEF2F4}
.sye-fm form.cf input:focus,.sye-fm form.cf textarea:focus,.sye-fm form.cf select:focus{background:#fff;border-color:#8FDDBE;box-shadow:0 0 0 4px rgba(127,215,177,.2)}
.sye-fm form.cf select{appearance:none;-webkit-appearance:none;padding-right:34px;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 4.5l3 3 3-3' fill='none' stroke='%233E8C72' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;cursor:pointer}
.sye-fm form.cf small{margin-top:5px;font-size:10.5px;color:#97A3AB}
.sye-fm form.cf .frow{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.sye-fm form.cf .frow > label{min-width:0}
.sye-fm form.cf label.pic input{background:#F7FBF9;border:1.5px dashed #B9E6D4;border-radius:12px;padding:12px;color:#5B6670}
.sye-fm form.cf label.pic input::file-selector-button{margin-right:10px;border:0;border-radius:999px;padding:6px 14px;background:#E3F6EE;color:#2F7A60;font:800 12px 'IBM Plex Sans KR',sans-serif;cursor:pointer}
.sye-fm form.cf details.more{margin-top:14px;border-top:0;padding-top:0}
.sye-fm form.cf details.more summary{display:flex;align-items:center;justify-content:center;gap:6px;padding:12px;border-radius:14px;background:#fff;border:1px dashed #C9E9DC;color:#3E8C72;font:800 12.5px 'IBM Plex Sans KR',sans-serif}
.sye-fm form.cf details.more summary:hover{background:#F2FBF7}
.sye-fm form.cf details.more[open] summary{border-style:solid;border-color:#E6ECEF}
.sye-fm form.cf .re-r input,.sye-fm form.cf .re-r textarea{background:#F4F6F8}
.sye-fm form.cf .re-x{border:0;background:#FBEFF2;border-radius:10px;height:40px}
.sye-fm form.cf .re-add{border:1px dashed #9EDDC4;border-radius:999px;height:32px;background:#fff;color:#3E8C72}
.sye-fm form.cf .note{margin:14px 2px 0;background:transparent;border:0;padding:0;text-align:center;color:#8A979F;font-size:11.5px}
.sye-fm form.cf .note b{color:#3E8C72}
.sye-fm form.cf .ff{padding:12px 16px calc(14px + env(safe-area-inset-bottom));border-top:1px solid #E7ECEF;gap:8px}
.sye-fm form.cf .ff button{height:44px;border-radius:13px;border:1px solid #E3E9ED;font:800 13.5px 'IBM Plex Sans KR',sans-serif}
.sye-fm form.cf .ff .sv{background:linear-gradient(160deg,#9BE2C6,#5CC29C);box-shadow:0 8px 18px -8px rgba(76,180,141,.7);color:#fff;border:0}
.sye-fm form.cf .ff .sv:hover{filter:brightness(1.04)}
.sye-fm form.cf .ff .del{color:#D9506A;background:#FFF7F9;border-color:#F6DDE3}
@media (max-width:520px){.sye-fm form.cf .frow{grid-template-columns:1fr}}
`; document.head.appendChild(st); })();

/* 입장화면 비눗방울 : 살짝 비치는 투명 방울 (무지개빛 테두리 · 하이라이트는 그대로) · 카드에 안 걸치는 빈 자리로 */
(() => { const st = document.createElement('style'); st.textContent = `
#intro.gt .gt-ball{left:812px!important;top:44px!important;width:158px!important;height:158px!important}
#intro.gt .gt-db{background:radial-gradient(circle at 50% 50%,rgba(255,255,255,.03) 0 48%,rgba(255,255,255,.16) 66%,rgba(214,240,231,.5) 86%,rgba(178,224,208,.78) 100%),radial-gradient(circle at 32% 26%,rgba(255,255,255,.3),transparent 45%),radial-gradient(circle at 70% 82%,rgba(160,215,196,.22),transparent 50%)!important;
  box-shadow:0 24px 36px -24px rgba(47,120,95,.32),0 0 0 1px rgba(160,212,194,.35),inset 0 0 0 1.5px rgba(255,255,255,.95),inset 0 -12px 24px rgba(120,195,170,.2),inset 0 10px 18px rgba(255,255,255,.25)!important;-webkit-backdrop-filter:blur(.6px) saturate(1.08)!important;backdrop-filter:blur(.6px) saturate(1.08)!important}
#intro.gt .gt-hl{opacity:1}
#intro.gt .gt-film{filter:blur(1.2px)!important}
#intro.gt .gt-hl2{opacity:.8}
#intro.gt .gt-ball::after{content:'';position:absolute;left:-46px;top:96px;width:38px;height:38px;border-radius:50%;background:radial-gradient(circle at 34% 30%,rgba(255,255,255,.9) 0 9%,transparent 16%),radial-gradient(circle,rgba(255,255,255,.02) 0 50%,rgba(214,240,231,.55) 86%,rgba(178,224,208,.8) 100%);box-shadow:0 0 0 1px rgba(160,212,194,.35),inset 0 0 0 1.2px rgba(255,255,255,.95);animation:gt-bob 4.2s 2.2s ease-in-out infinite reverse;pointer-events:none}
#intro.gt.m .gt-ball{left:auto!important;right:50px!important;top:168px!important;width:52px!important;height:52px!important}
#intro.gt.m .gt-ball::after{left:-22px;top:40px;width:16px;height:16px}
@media (min-width:600px){#intro.gt.m .gt-ball{right:16%!important;top:170px!important;width:72px!important;height:72px!important}}
`; document.head.appendChild(st); })();

/* 수정 창 리뷰 : 리뷰 하나를 작은 카드로 (이름 · 관계 · 부르는 말 / 내용 / 좋아요 · 답글) */
(() => { const st = document.createElement('style'); st.textContent = `
.sye-fm .rowed:has(.re-r.talk){counter-reset:rv}
.sye-fm .re-r.talk{position:relative;display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px 10px;margin-top:10px;padding:30px 12px 12px;background:#fff;border:1px solid #E6ECEF;border-radius:14px;counter-increment:rv;box-shadow:0 1px 2px rgba(20,30,40,.03)}
.sye-fm .re-r.talk::before{content:'REVIEW ' counter(rv,decimal-leading-zero);position:absolute;left:12px;top:10px;font:800 9.5px 'Inter',sans-serif;letter-spacing:.14em;color:#5CC29C}
.sye-fm .re-r.talk:first-of-type::after{content:'BEST';position:absolute;left:92px;top:8px;font:800 8.5px 'Inter',sans-serif;letter-spacing:.1em;color:#fff;background:#7FD7B1;border-radius:999px;padding:2px 7px}
.sye-fm .re-r.talk .rc{display:flex;flex-direction:column;gap:4px;margin:0;min-width:0}
.sye-fm .re-r.talk .rc em{font:700 10.5px 'IBM Plex Sans KR',sans-serif;font-style:normal;color:#6A7680}
.sye-fm .re-r.talk .rc:nth-child(4){grid-column:1 / -1}
.sye-fm .re-r.talk .rc:nth-child(5){grid-column:1 / 2}
.sye-fm .re-r.talk .rc:nth-child(6){grid-column:2 / -1}
.sye-fm .re-r.talk input,.sye-fm .re-r.talk textarea{width:100%;flex:none!important}
.sye-fm .re-r.talk .re-x{position:absolute;right:8px;top:6px;width:24px!important;height:24px!important;border-radius:50%!important;font-size:13px!important;line-height:1!important;padding:0}
.sye-fm .rowed:has(.re-r.talk) .re-add{width:100%;margin-top:10px}
@media (max-width:520px){.sye-fm .re-r.talk{grid-template-columns:1fr 1fr}.sye-fm .re-r.talk .rc:nth-child(3){grid-column:1 / -1}.sye-fm .re-r.talk .rc:nth-child(5),.sye-fm .re-r.talk .rc:nth-child(6){grid-column:1 / -1}}
`; document.head.appendChild(st); })();

/* 東京青藍大学 목록 : 학교 소개 카드 + 학년별 줄 (청람색 진하기로 학년 구분) */
(() => { const st = document.createElement('style'); st.textContent = `
.sr-info{position:relative;margin:2px 0 20px;padding:16px 18px 14px;border-radius:16px;color:#fff;overflow:hidden;background:linear-gradient(135deg,#2C5590 0%,#3D6DB0 55%,#6E98D2 100%);box-shadow:0 14px 26px -16px rgba(32,69,126,.7)}
.sr-info::before{content:'';position:absolute;right:-30px;top:-40px;width:170px;height:170px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.16),transparent 65%)}
.sr-info::after{content:'';position:absolute;inset:0;background:radial-gradient(circle,rgba(255,255,255,.12) 1px,transparent 1.4px) 0 0/12px 12px;-webkit-mask:linear-gradient(90deg,transparent 40%,#000);mask:linear-gradient(90deg,transparent 40%,#000);pointer-events:none}
.sr-ib{position:relative;z-index:1;display:flex;align-items:center;gap:12px}
.sr-crest{flex:none;width:38px;height:38px;border-radius:11px;display:grid;place-items:center;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.35);font:700 19px 'Noto Serif JP','Noto Serif CJK JP',serif}
.sr-it{display:flex;flex-direction:column;gap:2px;min-width:0}
.sr-it b{font:800 17px 'Noto Sans JP','IBM Plex Sans KR',sans-serif;letter-spacing:.04em}
.sr-it small{font:700 10px 'Inter',sans-serif;letter-spacing:.14em;opacity:.8;text-transform:uppercase}
.sr-ib em{margin-left:auto;font:800 10px 'Inter',sans-serif;font-style:normal;letter-spacing:.14em;padding:5px 9px;border-radius:999px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.3);white-space:nowrap}
.sr-chips{position:relative;z-index:1;display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}
.sr-chips i{font:700 10.5px 'Noto Sans JP','IBM Plex Sans KR',sans-serif;font-style:normal;padding:4px 9px;border-radius:999px;background:rgba(255,255,255,.14);color:#fff}
.sr-motto{position:relative;z-index:1;margin-top:10px;font:700 12px 'Noto Serif JP','Noto Serif CJK JP',serif;letter-spacing:.3em;opacity:.95}
.sr-motto span{font:800 9px 'Noto Sans JP',sans-serif;letter-spacing:.12em;margin-right:8px;padding:2px 6px;border-radius:4px;background:#fff;color:#2C5590;vertical-align:1px}
.sr-yr{margin:0 0 22px}
.sr-yh{display:flex;align-items:center;gap:10px;margin:0 2px 12px}
.sr-yn{flex:none;width:28px;height:28px;border-radius:9px;display:grid;place-items:center;background:var(--yc);color:#fff;font:900 14px 'Inter',sans-serif;box-shadow:0 4px 10px color-mix(in srgb,var(--yc) 35%,transparent),inset 0 1px 0 rgba(255,255,255,.35)}
.sr-yt{display:flex;flex-direction:column;gap:2px}
.sr-yh b.sr-yt{font:800 15px 'Noto Sans JP','IBM Plex Sans KR',sans-serif;color:#18212A;letter-spacing:.02em}
.sr-yt small{font:800 9px 'Inter',sans-serif;letter-spacing:.16em;color:var(--yc)}
.sr-yl{flex:1;height:2px;border-radius:2px;margin-left:4px;background:linear-gradient(90deg,var(--yc),color-mix(in srgb,var(--yc) 25%,transparent) 60%,transparent)}
.sr-yh em{font:900 13px 'Inter',sans-serif;font-style:normal;color:var(--yc)}
.sr-yh em i{font:800 9px 'Noto Sans JP',sans-serif;font-style:normal;margin-left:2px;opacity:.8}
`; document.head.appendChild(st); })();

/* 수정 창 제안 칩 */
(() => { const st = document.createElement('style'); st.textContent = `
.sye-fm .fsug{display:flex;flex-wrap:wrap;align-items:center;gap:5px;margin-top:6px}
.sye-fm .fsug:empty{display:none}
.sye-fm .fsug span{font:800 9.5px 'Inter','IBM Plex Sans KR',sans-serif;letter-spacing:.08em;color:#9AA6AE;margin-right:2px}
.sye-fm .fsug button{border:1px dashed #9EDDC4;background:#F3FBF7;color:#2F7A60;border-radius:999px;padding:3px 10px;font:700 11.5px 'IBM Plex Sans KR','Noto Sans JP',sans-serif;cursor:pointer;transition:background .15s}
.sye-fm .fsug button::before{content:'＋ ';opacity:.6}
.sye-fm .fsug button:hover{background:#E1F6EC;border-style:solid}
`; document.head.appendChild(st); })();
