var slider = tns({
  container: '.carousel__inner',
  items: 1,
  controls: false,
  nav: false,
  responsive: {
    0: {
      nav: true,
      navPosition: 'bottom',

    },
    992: {
      nav: false,
    }
  }
})

document.querySelector('.next').onclick = function () {
  slider.goTo('next');
};

document.querySelector('.prev').onclick = function () {
  slider.goTo('prev');
};

$(document).ready(function () {

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this)
        .index()).addClass('catalog__content_active');
  });

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    })
  }

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  //Modal

  $('[data-modal="consultation"]').on('click', function () {
    $('.overlay, #consultation').fadeIn("slow");
  });

  $('.button_mini').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn("slow");
    });
  })

  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #thanks, #order').fadeOut("slow");
  });

  function validForm(selector) {
    $(selector).validate({
      rules: {
        name: {
          required: true,
          minlength: 3
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Введіть своє ім'я",
          minlength: $.validator.format("Введіть {0} символи")
        },
        phone: "Введіть свій номер",
        email: {
          required: "Введіть свою пошту",
          email: "Некоректна адреса"
        }
      }
    });
  }

  validForm("#consultation .feed-form");
  validForm("#consultation-form");
  validForm("#order .feed-form");

  $("input[name=phone]").mask("+38(099)999-99-99");

  $('form').submit(function (e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function () {
      $(this).find("input").val("");

      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn("slow")

      $('form').trigger('reset');
    });

    return false;
  })

  $(window).scroll(function () {

    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    } else
      $('.pageup').fadeOut();

  })

  $("a[href='#up'], a[href='#catalog']").on('click', function (event) {
    const _hash = $(this).attr("href");
    $('html, body').animate({
      scrollTop: $(_hash).offset().top
    });
    return false;
  });

  new WOW({
    animateClass: "animate__animated"
  }).init();

});