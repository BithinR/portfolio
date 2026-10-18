/* ============================================================================
   PORTFOLIO SCRIPT — Bithin Krishna Radhakrishnan
   Effects: particle network, cascading data streams, cursor glow,
   typing headline, 3D card tilt, scroll reveal, mobile nav.
   All effects respect prefers-reduced-motion.
   ============================================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ======================================================================
     TYPING HEADLINE — edit the roles array below to change the words
     ====================================================================== */
  var roles = [
    "Cybersecurity Graduate",
    "Aspiring SOC Analyst",
    "Network Security Learner",
    "Security Automation Builder"
  ];
  var typedEl = document.getElementById("typed-role");
  var roleIdx = 0, charIdx = 0, deleting = false;

  function typeLoop() {
    if (!typedEl) return;
    var word = roles[roleIdx];
    if (!deleting) {
      charIdx++;
      typedEl.textContent = word.slice(0, charIdx);
      if (charIdx === word.length) { deleting = true; setTimeout(typeLoop, 1400); return; }
      setTimeout(typeLoop, 70);
    } else {
      charIdx--;
      typedEl.textContent = word.slice(0, charIdx);
      if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; setTimeout(typeLoop, 300); return; }
      setTimeout(typeLoop, 40);
    }
  }
  if (!reduceMotion) typeLoop();
  else if (typedEl) typedEl.textContent = roles[0];

  /* ======================================================================
     MOBILE NAV TOGGLE
     ====================================================================== */
  var toggle = document.getElementById("nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) { menu.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
    });
  }

  /* ======================================================================
     SCROLL REVEAL
     ====================================================================== */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("visible"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ======================================================================
     3D TILT (on .tilt elements) — the "5D" depth effect
     ====================================================================== */
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".tilt").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = "perspective(700px) rotateY(" + (x * 14) + "deg) rotateX(" + (-y * 14) + "deg) translateY(-4px)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "perspective(700px) rotateY(0) rotateX(0) translateY(0)";
      });
    });
  }

  /* ======================================================================
     CURSOR GLOW
     ====================================================================== */
  var cursor = document.getElementById("fx-cursor");
  if (cursor && !reduceMotion && window.matchMedia("(hover: hover)").matches) {
    var cx = window.innerWidth / 2, cy = window.innerHeight / 3, tx = cx, ty = cy;
    window.addEventListener("mousemove", function (e) { tx = e.clientX; ty = e.clientY; });
    (function anim() {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      cursor.style.transform = "translate(" + (cx - 240) + "px," + (cy - 240) + "px)";
      requestAnimationFrame(anim);
    })();
  } else if (cursor) { cursor.style.display = "none"; }

  /* ======================================================================
     PARTICLE NETWORK CANVAS
     ====================================================================== */
  var pCanvas = document.getElementById("fx-particles");
  if (pCanvas && !reduceMotion) {
    var pctx = pCanvas.getContext("2d");
    var nodes = [], dpr;
    function sizeParticles() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      pCanvas.width = window.innerWidth * dpr;
      pCanvas.height = window.innerHeight * dpr;
      pCanvas.style.width = window.innerWidth + "px";
      pCanvas.style.height = window.innerHeight + "px";
      pctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function makeNodes() {
      nodes = [];
      var count = Math.min(90, Math.floor(window.innerWidth / 16));
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.6 + 0.6
        });
      }
    }
    function drawParticles() {
      pctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      var linkDist = 130;
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > window.innerWidth) n.vx *= -1;
        if (n.y < 0 || n.y > window.innerHeight) n.vy *= -1;
        pctx.beginPath();
        pctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        pctx.fillStyle = "rgba(0,229,255,0.7)";
        pctx.fill();
        for (var j = i + 1; j < nodes.length; j++) {
          var m = nodes[j];
          var dx = n.x - m.x, dy = n.y - m.y;
          var d2 = dx * dx + dy * dy;
          if (d2 < linkDist * linkDist) {
            var a = (1 - Math.sqrt(d2) / linkDist) * 0.28;
            pctx.strokeStyle = "rgba(139,92,246," + a + ")";
            pctx.lineWidth = 0.7;
            pctx.beginPath(); pctx.moveTo(n.x, n.y); pctx.lineTo(m.x, m.y); pctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawParticles);
    }
    sizeParticles(); makeNodes(); drawParticles();
    window.addEventListener("resize", function () { sizeParticles(); makeNodes(); });
  }

  /* ======================================================================
     CASCADING DATA STREAM CANVAS (ghost-in-the-shell style glyph rain)
     ====================================================================== */
  var sCanvas = document.getElementById("fx-stream");
  if (sCanvas && !reduceMotion) {
    var sctx = sCanvas.getContext("2d");
    var cols = [], fs = 16, glyphs = "アイウエオカキクケコサシスセソタチツテト01<>/\\{}[]#$%&*+=?";
    var colors = ["rgba(0,229,255,", "rgba(255,46,196,", "rgba(139,92,246,", "rgba(43,255,176,"];
    function sizeStream() {
      var dprS = Math.min(window.devicePixelRatio || 1, 2);
      sCanvas.width = window.innerWidth * dprS;
      sCanvas.height = window.innerHeight * dprS;
      sCanvas.style.width = window.innerWidth + "px";
      sCanvas.style.height = window.innerHeight + "px";
      sctx.setTransform(dprS, 0, 0, dprS, 0, 0);
      var n = Math.floor(window.innerWidth / fs);
      cols = [];
      for (var i = 0; i < n; i++) cols.push(Math.floor(Math.random() * -40));
    }
    function drawStream() {
      sctx.fillStyle = "rgba(4,5,13,0.12)";
      sctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      sctx.font = fs + "px monospace";
      for (var i = 0; i < cols.length; i++) {
        var ch = glyphs.charAt(Math.floor(Math.random() * glyphs.length));
        var col = colors[Math.floor(Math.random() * colors.length)];
        var y = cols[i] * fs;
        sctx.fillStyle = col + (0.35 + Math.random() * 0.4) + ")";
        sctx.fillText(ch, i * fs, y);
        if (y > window.innerHeight && Math.random() > 0.975) cols[i] = 0;
        cols[i]++;
      }
      requestAnimationFrame(drawStream);
    }
    sizeStream(); drawStream();
    window.addEventListener("resize", sizeStream);
  }
})();
