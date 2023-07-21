var slider=tns({
  container: '.carousel__inner',
  items:1,
  controls:false,
  nav:false,
  responsive:{
    0:{
      nav:true,
      navPosition:'bottom',
      
    },
    992:{
      nav:false,
    }
  }
})

document.querySelector('.next').onclick = function () {
  slider.goTo('next');
};

document.querySelector('.prev').onclick = function () {
  slider.goTo('prev');
};