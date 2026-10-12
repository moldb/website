// B-Tech Consulting — shared behaviour
(function () {
  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Decorative sequence background in hero
  var seq = document.querySelector('.seq');
  if (seq) {
    var bases = 'ACGT', out = '';
    for (var i = 0; i < 2600; i++) out += bases[Math.floor(Math.random() * 4)];
    seq.textContent = out;
  }

  // Publications: search + topic filter
  var search = document.getElementById('pub-search');
  if (search) {
    var pubs = Array.prototype.slice.call(document.querySelectorAll('.pub'));
    var years = Array.prototype.slice.call(document.querySelectorAll('.pub-year'));
    var filters = Array.prototype.slice.call(document.querySelectorAll('.filter-btn'));
    var empty = document.querySelector('.pub-empty');
    var count = document.getElementById('pub-count');
    var topic = 'all';
    function apply() {
      var q = search.value.trim().toLowerCase(), shown = 0;
      pubs.forEach(function (p) {
        var ok = (topic === 'all' || p.dataset.topic === topic) &&
                 (!q || p.textContent.toLowerCase().indexOf(q) !== -1);
        p.hidden = !ok; if (ok) shown++;
      });
      years.forEach(function (h) {
        var any = false, el = h.nextElementSibling;
        while (el && !el.classList.contains('pub-year')) { if (el.classList.contains('pub') && !el.hidden) any = true; el = el.nextElementSibling; }
        h.hidden = !any;
      });
      if (empty) empty.style.display = shown ? 'none' : 'block';
      if (count) count.textContent = shown;
    }
    search.addEventListener('input', apply);
    filters.forEach(function (f) {
      f.addEventListener('click', function () {
        topic = f.dataset.topic;
        filters.forEach(function (o) { o.setAttribute('aria-pressed', o === f ? 'true' : 'false'); });
        apply();
      });
    });
    apply();
  }

  // Contact form -> opens the visitor's email client addressed to Brian
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var d = new FormData(form);
      var to = form.dataset.to;
      var subject = '[' + d.get('topic') + '] Inquiry from ' + d.get('name');
      var body = d.get('message') + '\n\n—\n' + d.get('name') +
        (d.get('org') ? '\n' + d.get('org') : '') + '\n' + d.get('email');
      window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      var note = document.getElementById('form-status');
      if (note) note.textContent = 'Your email app should open with the message ready to send. If it doesn’t, write to ' + to + ' directly.';
    });
  }
})();
