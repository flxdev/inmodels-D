import $ from 'jquery/dist/jquery';
import './lib/domConf';
import Barba from 'barba.js/dist/barba.min';
import setInputFocus from './lib/inputFocus';
import initDropzone from './lib/initDropzone';
import formValidator from './lib/formValidator';
import showVideo from './lib/homeVideo';
import initPopUp from './lib/initPopUp';
import stickInit from './lib/stickInit';
import youtubeVideo from './lib/youtubeVideo';
import initGallery from './lib/initGallery';
import initModels from './lib/initModels';
import initAboutSliders from './lib/initSliders';
import initRellaxParalax from './lib/initRellaxParalax';
import scrollAnimations from './lib/scrollAnimations';
import initInnerSlider from './lib/initInnerSlider';
import { TimelineMax, Sine} from 'gsap';

// setInputFocus();
// formValidator();
// initDropzone();
// showVideo();
// stickInit();
// youtubeVideo();
// initGallery();
// initModels();
// initAboutSliders();
// initRellaxParalax();


var BarbaWitget = {
  init: function() {  
  	var scope = this;
    window.DOM.getScrollWidth();
    console.log(window.DOM.menu);
    Barba.Pjax.start();
    Barba.Prefetch.init();

    var FadeTransition = Barba.BaseTransition.extend({
      start: function() {
        Promise
          .all([this.newContainerLoading, this.fadeOut()])
          .then(this.fadeIn.bind(this));
      },

      fadeOut: function() {
        var deferred = Barba.Utils.deferred();
        let tl = new TimelineMax({
          onComplete: () => {
            window.DOM.menuClose.trigger('click');
            deferred.resolve();
          }
        });
        if(window.DOM.menu.hasClass('active')) {
          tl.set(window.DOM.menu, {
            className: '+=hide-anim'
          });
          this.delay = 1;
        } else {
          this.delay = 0;
        }

        tl
          .set(window.DOM.pageLoader, {
            delay: this.delay,
            className: '+=page-load'
          })
          .to(window.DOM.pageLoaderW, 0.4, {
            scaleY: 1,
          })
          .to(window.DOM.pageLoaderB, 0.4, {
            scaleY: 1,
          });
        return deferred.promise;
      },

      fadeIn: function() {
        const _this = this;
        let newCont = $(this.newContainer);
        let oldCont = $(this.oldContainer);
        let blockContent = newCont.find('.block-content');
        window.scroll(0, 0);
        window.DOM.hideScroll();
        let tlIn = new TimelineMax();
        tlIn
          .set(oldCont,{
            display: 'none'
          })
          .set(newCont, {
            autoAlpha: 1,
            onComplete: () => {
              _this.done();
              
              tlIn
                .set(window.DOM.menu, {
                  className: '-=hide-anim'
                })
                .set(blockContent, {
                  y: 150,
                  autoAlpha: 0,
                })
                .to(window.DOM.pageLoaderB, 0.4, {
                  scaleY: 0,
                  transformOrigin:'top center',
                  // clearProps:'all'
                })
                .to(window.DOM.pageLoaderW, 0.4, {
                  scaleY: 0,
                  transformOrigin:'top center',
                  
                })
                .to(blockContent, 0.5, {
                  y: 0,
                  autoAlpha: 1,
                  clearProps:'all',
                  onComplete: () => {

                    tlIn
                      .set(window.DOM.pageLoaderB, {
                        clearProps:'all'
                      })
                      .set(window.DOM.pageLoaderW, {
                        clearProps:'all'
                      })
                      .set(window.DOM.pageLoader, {
                        className: '-=page-load'
                      });
                    window.DOM.showScroll();
                  }
                });

            }
          });
      }
    });
    Barba.Pjax.getTransition = function() {
      return FadeTransition;
    };    
  }
};

var index = Barba.BaseView.extend({
  namespace: 'index',
  onEnter: function() {
  	window.DOM.navLang.addClass('visible-lang');
  },
  onEnterCompleted: function() {
  	showVideo();
  },
  onLeave: function() {
  	window.DOM.navLang.removeClass('visible-lang');
  },
  onLeaveComplete: function() {
  }
});

var about = Barba.BaseView.extend({
  namespace: 'about',
  onEnter: function() {
    
  },
  onEnterCompleted: function() {
    initRellaxParalax();
  	window.DOM.headerLinks.addClass('show-header-links');
    initAboutSliders();
    
    scrollAnimations();
  },
  onLeave: function() {
  	window.DOM.headerLinks.removeClass('show-header-links');
    
  },
  onLeaveComplete: function() {
    window.DOM.rellax.destroy();
  }
});


var gallery = Barba.BaseView.extend({
  namespace: 'gallery',
  onEnter: function() {
  },
  onEnterCompleted: function() {
  	window.DOM.headerLinks.addClass('show-header-links');
    initGallery();
  },
  onLeave: function() {
  	window.DOM.headerLinks.removeClass('show-header-links');
  },
  onLeaveComplete: function() {
  }
});

var galleryNews = Barba.BaseView.extend({
  namespace: 'gallery-news',
  onEnter: function() {
    
  },
  onEnterCompleted: function() {
  	window.DOM.headerLinks.addClass('show-header-links');
    initRellaxParalax();
    youtubeVideo();
    stickInit();
    scrollAnimations();
  },
  onLeave: function() {
    window.DOM.headerLinks.removeClass('show-header-links');

  },
  onLeaveComplete: function() {
    window.DOM.rellax.destroy();
  }
});

var models = Barba.BaseView.extend({
  namespace: 'models',
  onEnter: function() {
  	
  },
  onEnterCompleted: function() {
  	window.DOM.headerLinks.addClass('show-header-links');
    window.DOM.navSearch.addClass('active');
    scrollAnimations();
    initModels();
    // ajaxPagenation();
  },
  onLeave: function() {
    window.DOM.navSearch.removeClass('active');
    window.DOM.headerLinks.removeClass('show-header-links');
  },
  onLeaveComplete: function() {
  }
});

var contacts = Barba.BaseView.extend({
  namespace: 'contacts',
  onEnter: function() {

  },
  onEnterCompleted: function() {
    stickInit();
    formValidator();
    initDropzone();
    setInputFocus();
    scrollAnimations();
  },
  onLeaveComplete: function() {
  }
});

var innerModel = Barba.BaseView.extend({
  namespace: 'inner-model',
  onEnter: function() {
  	window.DOM.navLogo.addClass('hide-nav-logo');
  },
  onEnterCompleted: function() {
  	initInnerSlider();
  	youtubeVideo();
  },
  onLeave: function() {
  	window.DOM.navLogo.removeClass('hide-nav-logo');
  },
  onLeaveComplete: function() {
  }
});


var error = Barba.BaseView.extend({
  namespace: 'error',
  onEnter: function() {
  	window.DOM.navLang.addClass('visible-lang');
  },
  onEnterCompleted: function() {
  },
  onLeave: function() {
  	window.DOM.navLang.removeClass('visible-lang');
  },
  onLeaveComplete: function() {
  }
});

index.init();
about.init();
gallery.init();
galleryNews.init();
models.init();
contacts.init();
innerModel.init();
error.init();
initPopUp();
BarbaWitget.init();
