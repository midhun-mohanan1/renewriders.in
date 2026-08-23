// Renew Riders — shared interactions

(function () {
  // Header background on scroll
  var header = document.querySelector('.site-header');
  var onScroll = function () {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav drawer
  var toggle = document.querySelector('.nav-toggle');
  var drawer = document.querySelector('.mobile-drawer');
  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      var open = drawer.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        drawer.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in-view'); });
  }

  // Current year in footer
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // "Find It For Me" — compose a pre-filled WhatsApp message
  var finderForm = document.getElementById('finderForm');
  if (finderForm) {
    finderForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var brand = finderForm.brand.value.trim();
      var model = finderForm.model.value.trim();
      var budget = finderForm.budget.value.trim();
      var year = finderForm.year.value.trim();
      var fuel = finderForm.fuel.value.trim();

      var lines = ["Hi Renew Riders! I'm looking for a specific vehicle:"];
      if (brand) lines.push('Brand: ' + brand);
      if (model) lines.push('Model: ' + model);
      if (budget) lines.push('Budget: ' + budget);
      if (year) lines.push('Year: ' + year);
      if (fuel) lines.push('Fuel: ' + fuel);
      lines.push('');
      lines.push('Please let me know if you have this or can source it.');

      var message = encodeURIComponent(lines.join('\n'));
      var waNumber = '919292115582';
      window.open('https://wa.me/' + waNumber + '?text=' + message, '_blank', 'noopener');
    });
  }
})();
