/* Kavéra holiday snow. Turns itself off after Día de Reyes (Jan 6, 2027).
   Light canvas overlay: never blocks taps, pauses when the tab is hidden, off for "reduce motion". */
(function () {
  var END = new Date(2027, 0, 7); // first day without snow (local time)
  if (new Date() >= END) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (/[?&]nosnow\b/.test(location.search) || navigator.webdriver) return;

  var c = document.createElement('canvas');
  c.setAttribute('aria-hidden', 'true');
  c.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:40';
  document.body.appendChild(c);
  var ctx = c.getContext('2d'), W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), flakes = [];

  function size() {
    W = innerWidth; H = innerHeight;
    c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var want = W < 600 ? 38 : 70;
    while (flakes.length < want) flakes.push(make(true));
    flakes.length = want;
  }
  function make(anywhere) {
    var gold = Math.random() < 0.09, r = gold ? 1.2 + Math.random() * 1.6 : 1 + Math.random() * 3.2;
    return { x: Math.random() * W, y: anywhere ? Math.random() * H : -10, r: r, gold: gold,
      vy: 0.35 + r * 0.32 + Math.random() * 0.3, sway: 0.4 + Math.random() * 1.2, ph: Math.random() * 6.28,
      a: gold ? 0.9 : 0.45 + Math.random() * 0.45 };
  }
  var last = 0, running = true;
  function frame(ts) {
    if (!running) return;
    var dt = last ? Math.min((ts - last) / 16.7, 3) : 1; last = ts;
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < flakes.length; i++) {
      var f = flakes[i];
      f.ph += 0.012 * dt; f.y += f.vy * dt; f.x += Math.sin(f.ph) * f.sway * 0.35 * dt;
      if (f.y > H + 10 || f.x < -20 || f.x > W + 20) { flakes[i] = make(false); continue; }
      if (f.gold) {
        var tw = 0.55 + 0.45 * Math.sin(ts / 260 + f.ph * 5), s = f.r * 2.4;
        ctx.globalAlpha = f.a * tw; ctx.fillStyle = '#F2D28E';
        ctx.beginPath(); ctx.moveTo(f.x, f.y - s); ctx.lineTo(f.x + s * 0.28, f.y); ctx.lineTo(f.x, f.y + s); ctx.lineTo(f.x - s * 0.28, f.y); ctx.closePath(); ctx.fill();
        ctx.beginPath(); ctx.moveTo(f.x - s, f.y); ctx.lineTo(f.x, f.y + s * 0.28); ctx.lineTo(f.x + s, f.y); ctx.lineTo(f.x, f.y - s * 0.28); ctx.closePath(); ctx.fill();
      } else {
        ctx.globalAlpha = f.a; ctx.fillStyle = '#FFFFFF';
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.2832); ctx.fill();
        if (f.r > 1.8) { ctx.strokeStyle = 'rgba(150,120,110,.28)'; ctx.lineWidth = 0.8; ctx.stroke(); }
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }
  size(); addEventListener('resize', size);
  document.addEventListener('visibilitychange', function () {
    running = !document.hidden; last = 0; if (running) requestAnimationFrame(frame);
  });
  requestAnimationFrame(frame);
})();
