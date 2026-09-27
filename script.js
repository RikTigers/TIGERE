//проекты
(function () {
  var slides = document.querySelectorAll('#carousel .project');
  var dotsWrap = document.getElementById('dots');
  var current = 0;
  var interval = 5000;
  var timer;
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  slides.forEach(function (_, i) {
    var dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Проект ' + (i + 1));
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', function () {
      goTo(i);
      restart();
    });
    dotsWrap.appendChild(dot);
  });

  var dots = dotsWrap.querySelectorAll('button');

  function goTo(i) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = i;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function prev() {
    goTo((current - 1 + slides.length) % slides.length);
  }

  function restart() {
    clearInterval(timer);
    if (!prefersReducedMotion.matches) {
      timer = setInterval(next, interval);
    }
  }

  document.getElementById('next').addEventListener('click', function () {
    next();
    restart();
  });

  document.getElementById('prev').addEventListener('click', function () {
    prev();
    restart();
  });

  restart();
})();

//портфолио
(function () {
  var galleries = [
    { key: 'nexeon', label: 'NEXEON', count: 4 },
    { key: 'ttr', label: 'Try To Read', count: 4 },
    { key: 'ttrp', label: 'Try To RP', count: 4 }
  ];

  var overlay = document.getElementById('modal-overlay');
  var modalGrid = document.getElementById('modal-grid');
  var lastFocused = null;

  function openModal() {
    modalGrid.innerHTML = '';
    galleries.forEach(function (project) {
      for (var i = 1; i <= project.count; i++) {
        var img = document.createElement('img');
        img.className = 'modal-photo';
        img.src = 'images/' + project.key + '/' + i + '.jpg';
        img.alt = project.label + ' - скриншот ' + i;
        img.loading = 'lazy';
        modalGrid.appendChild(img);
      }
    });

    lastFocused = document.activeElement;
    overlay.classList.add('open');
    document.getElementById('modal-close').focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  document.getElementById('portfolio-open').addEventListener('click', openModal);
  document.getElementById('modal-close').addEventListener('click', closeModal);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });
})();

// связ
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var message = document.getElementById('message').value;
  var body = 'От: ' + name + ' (' + email + ')\n\n' + message;
  var mailto = 'mailto:you@example.com'
    + '?subject=' + encodeURIComponent('Сообщение с сайта - от ' + name)
    + '&body=' + encodeURIComponent(body);
  window.location.href = mailto;
});