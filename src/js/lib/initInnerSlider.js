import Swiper from 'swiper/dist/js/swiper';
import lightGallery from 'lightGallery/dist/js/lightgallery.min.js';
import debounce from './debounce';

export default function initInnerSlider() {

  let in_slider = $('.inner-slider');
  if (in_slider.length) {

    const pagiTriggers = $('.swiper-navigation').find('.slide-target');
    const slides = $('.swiper-slide');
    const slidesLength = slides.length;
    const indicator = $('.slide-indicator');

    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      // direction: 'horizontal',
      spaceBetween: 20,
      freeMode: true,
      // pagination: false,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      on: {
        init: function() {
          pagiTriggers.first().addClass('active');
        },
      },
      mousewheel: {
        sensitivity: 1.2,
        eventsTarged: '.block-inner'
      },
    });

    var wrapPad = parseInt($('.swiper-navigation').width());
    
    
    swiper.on('progress',debounce(() => {
      let active = $('.swiper-slide-active');
      let triggerIndex = active.index();
      if(triggerIndex + 3 > slidesLength) {
        let trigger = slides.eq(triggerIndex + 1).data('link');
        pagiTriggers.removeClass('active').filter(`[data-slide="${trigger}"]`).addClass('active');
        sychronize();
      } else {
        let trigger = active.data('link');
        pagiTriggers.removeClass('active').filter(`[data-slide="${trigger}"]`).addClass('active');
        sychronize();
      }
    }));

    pagiTriggers.each(function() {
      let _ = $(this);
      _.on('click',() => {
        let target = _.data('slide');
        let realInd = swiper.realIndex;
        let neededItems = slides.filter(`[data-link="${target}"]`);
        let neededItemsIndex = neededItems.first().index();
        setTimeout(() => {
          swiper.slideTo(neededItemsIndex);
          
        },20);

      });
    });
    sychronize();
    
    /* synchrones */
    function sychronize() {
      var active = 0;
      var indicatorL = 0;
      pagiTriggers.each(function() {
        var linkP = $(this);
        
        if(!linkP.hasClass('active')) {
          indicatorL=indicatorL+linkP.outerWidth();
        } else {
          active++;
        }
        if(active) {
          return false;
        }
      });
      indicator.css({'left':indicatorL + 20});
    }



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
