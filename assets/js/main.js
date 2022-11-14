$(document).ready(function () {
  $('.play-btn').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });

  function openMobileMenu() {
    $('.nav.nav--mobile').addClass('nav--active');
  }

  function closeMobileMenu() {
    $('.nav.nav--mobile').removeClass('nav--active');
  }

  $('.header__burger').on('click', function () {
    openMobileMenu();
  });

  $('.nav__close').on('click', function () {
    closeMobileMenu();
  });

  $('nav a').on('click', function (event) {
    if (this.hash !== '') {
      event.preventDefault();

      var hash = this.hash;
      closeMobileMenu();
      $('html, body').animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          window.location.hash = hash;
        },
      );
    }
  });
});
