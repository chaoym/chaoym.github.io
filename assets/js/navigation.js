// Keep the template's overflow navigation usable after choosing a section.
(function () {
  var nav = document.getElementById('site-nav');
  if (!nav) return;
  var button = nav.querySelector('button');
  var menu = nav.querySelector('.hidden-links');

  function closeMenu() {
    menu.classList.add('hidden');
    button.classList.remove('close');
    button.setAttribute('aria-expanded', 'false');
  }

  button.addEventListener('click', function () {
    button.setAttribute('aria-expanded', String(!menu.classList.contains('hidden')));
  });
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('click', function (event) {
    if (!nav.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !menu.classList.contains('hidden')) {
      closeMenu();
      button.focus();
    }
  });
}());
