import Swiper from 'swiper';

export default function initSliders() {

  console.log(' go go swiper ranger ');
  var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: false,
    slidesPerView: 2,
    slidesPerGroup: 2,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      type: 'custom',
      clickable: 'true'
    },
  });

}
