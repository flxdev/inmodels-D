import Swiper from 'swiper';

export default function initAboutSliders() {

  let aboutSlider = $('.about-slider');
  if(aboutSlider.length) {
    console.log(' go go swiper ranger ');
    let about_slider = new Swiper ('.about-slider', {
      direction: 'horizontal',
      loop: false,
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20,
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: 'true'
      },
    });
  }
}
