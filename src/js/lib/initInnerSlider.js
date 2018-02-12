import Swiper from 'swiper/dist/js/swiper';
import lightGallery from 'lightGallery/dist/js/lightgallery.min.js';
import debounce from './debounce';

export default function initInnerSlider() {

  let in_slider = $('.inner-slider');
  if (in_slider.length) {

    const pagiTriggers = $('.swiper-navigation').find('.slide-target');
    const slides = $('.swiper-slide');
    const slidesLength = slides.length;

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
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: false,
      },
    });

    swiper
      .on('progress',debounce(() => {
        let active = $('.swiper-slide-visible').last();
        // let active = active.removeClass('swiper-slide-visible');
        let trigger = active.data('link');
        let triggerIndex = active.index() + 1;
        pagiTriggers.removeClass('active').filter(`[data-slide="${trigger}"]`).addClass('active');
        //   if(triggerIndex + 1 === slidesLength) {
        //     pagiTriggers.removeClass('active').last().addClass('active');
        //   }
      }));
    // .on('reachEnd',() => {
    //   // setTimeout(() => {
    //   let trigger = $('.swiper-slide').last().data('link');
    //   pagiTriggers.removeClass('active').filter(`[data-slide="${trigger}"]`).addClass('active');
    //   // },5);
    //   return false;
    // })
    // .on('reachBeginning',() => {
    //   // setTimeout(() => {
    //   let trigger = $('.swiper-slide').first().data('link');
    //   pagiTriggers.removeClass('active').filter(`[data-slide="${trigger}"]`).addClass('active');
    //   // },5);

    // });

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
