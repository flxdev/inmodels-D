import Swiper from 'swiper/dist/js/swiper';
import lightGallery from 'lightGallery/dist/js/lightgallery.min.js';

export default function initInnerSlider() {

  let in_slider = $('.inner-slider');
  if (in_slider.length) {

  	var slide_link = [];

  	$('.swiper-container .swiper-slide').each(function(i) {
      slide_link.push($(this).data('link'));
    });

  	var swiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      // direction: 'horizontal',
      spaceBetween: 20,
      freeMode: true,
      freeModeMomentumBounce: false,
      freeModeSticky: true,
      // grabCursor: true,
      // mousewheel: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function(index, className) {
          return '<span class=" ' + className + ' ' + slide_link[index] + '">' + slide_link[index] + '</span>';
        },
      },
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: false,
      },
    });

    swiper.on('transitionEnd', function() {
      let trigger = $('.swiper-slide-active').data('link');
      $('.' + trigger).addClass('active').siblings().removeClass('active');
    });

    $('.slide-target').on('click', function(e) {
    	e.preventDefault();
    	swiper.slideTo(0);
    	// let bttn_class = $(this).data('slide');
    	// $('.swiper-pagination-bullet.' + bttn_class)[0].click();
    });

    in_slider.lightGallery({
	    selector: '.item',
	    mode: 'lg-slide',
	    cssEasing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
	    loop: false,
	    hideControlOnEnd: true,
	    mousewheel: true,
	    download: false,
	    speed: 800
    });
  }
  
  
}
