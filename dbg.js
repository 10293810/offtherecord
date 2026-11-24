/* ?debug 로 열면 화면 아래에 진단 상자 : 오류 · 누른 곳 · 반응 기록 (사진 찍어서 보내주기용) */
(function () {
  if (!/[?&]debug\b/.test(location.search)) return;
  var box = document.createElement('div'), lines = [];
  box.style.cssText = 'position:fixed;left:6px;right:6px;bottom:6px;max-height:22vh;overflow:auto;z-index:2147483647;background:rgba(20,30,40,.88);color:#fff;font:11px/1.35 monospace;padding:8px;border-radius:8px;pointer-events:none;white-space:pre-wrap;word-break:break-all';
  function log(s) { all.push(s); if (all.length > 300) all.shift(); lines.push(s); if (lines.length > 40) lines.shift(); box.textContent = lines.join('\n'); }
  function who(el) { var o = []; for (var i = 0; el && el.nodeType === 1 && i < 5; i++, el = el.parentElement) { var c = (typeof el.className === 'string' ? el.className : (el.className && el.className.baseVal) || '').trim().split(/\s+/).slice(0, 2).join('.'); o.push(el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (c ? '.' + c : '')); } return o.join(' < '); }
  window.addEventListener('error', function (e) { log('ERR ' + e.message + ' @' + (e.filename || '').split('/').pop() + ':' + e.lineno + ':' + e.colno); });
  window.addEventListener('unhandledrejection', function (e) { log('REJ ' + (e.reason && (e.reason.message || e.reason))); });
  var all = [], btn = document.createElement('button');
  btn.textContent = '진단 기록 복사'; btn.style.cssText = 'position:fixed;right:10px;top:10px;z-index:2147483647;font:700 16px sans-serif;padding:12px 18px;border-radius:12px;border:0;background:#3FAE84;color:#fff;box-shadow:0 4px 14px rgba(0,0,0,.25)';
  function copy() { var t = all.join('\n'); var ok = function () { btn.textContent = '복사됨! 채팅에 붙여넣기'; };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ok, fb); else fb();
    function fb() { var a = document.createElement('textarea'); a.value = t; a.style.cssText = 'position:fixed;top:0;left:0;opacity:0'; document.body.appendChild(a); a.select(); a.setSelectionRange(0, t.length); try { document.execCommand('copy'); ok(); } catch (e) {} a.remove(); } }
  btn.addEventListener('touchend', function (e) { e.preventDefault(); e.stopPropagation(); copy(); }, true); btn.addEventListener('click', function (e) { e.stopPropagation(); copy(); }, true);
  function add() { if (document.body && !box.parentNode) { document.body.appendChild(box); document.body.appendChild(btn); } }
  document.addEventListener('DOMContentLoaded', function () { add(); log(navigator.userAgent); log('screen ' + innerWidth + 'x' + innerHeight + ' coarse=' + matchMedia('(pointer:coarse)').matches + ' fine=' + matchMedia('(pointer:fine)').matches); });
  ['touchstart', 'pointerdown', 'click'].forEach(function (t) {
    document.addEventListener(t, function (e) {
      if (e.target === btn) return; add(); var x = e.touches ? e.touches[0].clientX : e.clientX, y = e.touches ? e.touches[0].clientY : e.clientY;
      var top = document.elementFromPoint(x, y);
      log(t + ' ' + Math.round(x) + ',' + Math.round(y) + '\n  tgt: ' + who(e.target) + (top !== e.target ? '\n  top: ' + who(top) : ''));
    }, true);
  });
})();
