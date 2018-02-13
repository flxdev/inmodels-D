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

var cbk = function(e) {
  if(e.currentTarget.href === window.location.href) {
    e.preventDefault();
    e.stopPropagation();
    $('.modal-layout').removeClass('active');
    setTimeout(function() {
      window.DOM.showScroll();
    },5);
  }
};
function preventDbClick() {
  var links = document.querySelectorAll('a[href]');

  for(var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', cbk);
  }
}
var BarbaWitget = {
  init: function() {  
  	var scope = this;
    window.DOM.getScrollWidth();
    preventDbClick();
    Barba.Pjax.start();
    Barba.Prefetch.init();
    Barba.Dispatcher.on('newPageReady', function(currentStatus) {
      var link = currentStatus.url.split(window.location.origin)[1].substring(0);
      var navigationLinks = document.querySelectorAll('.js-nav');
      var navigationLinkIsActive = document.querySelectorAll('[href="' + link + '"]');

      Array.prototype.forEach.call(navigationLinks, function(navigationLink) {
        return navigationLink.classList.remove('active');
      });
      Array.prototype.forEach.call(navigationLinkIsActive, function(navigationLink) {
        return navigationLink.classList.add('active');
      });
      preventDbClick();

    }); 
    Barba.Dispatcher.on('transitionCompleted', (currentStatus, oldStatus, container) => {
      setTimeout(() => {
        scrollAnimations();
      },300);
    }); 
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
          tl.set(window.DOM.navLogo, {
            className: '+=hide-anim'
          });
          tl.set(window.DOM.navLang, {
            className: '+=hide-anim'
          });
          this.delay = 1;
          tl
            .set(window.DOM.pageLoader, {
              delay: this.delay,
              className: '+=page-load'
            })
            .to(window.DOM.pageLoaderW, 0.5, {
              scaleY: 1,
            })
            .set(window.DOM.menu, {
              className: '-=hide-anim'
            })
            .set(window.DOM.navLogo, {
              className: '-=hide-anim'
            })
            .set(window.DOM.navLang, {
              className: '-=hide-anim'
            })
            .to(window.DOM.pageLoaderB, 0.6, {
              scaleY: 1,
            });
        } else {
          this.delay = 0;
          tl
            .set(window.DOM.pageLoader, {
              delay: this.delay,
              className: '+=page-load'
            })
          // .to(window.DOM.pageLoaderW, 0.5, {
          //   scaleY: 1,
          // })
            .set(window.DOM.menu, {
              className: '-=hide-anim'
            })
            .set(window.DOM.navLogo, {
              className: '-=hide-anim'
            })
            .set(window.DOM.navLang, {
              className: '-=hide-anim'
            })
            .to(window.DOM.pageLoaderB, 0.6, {
              scaleY: 1,
            });
        }

        
        return deferred.promise;
      },

      fadeIn: function() {
        const _this = this;
        let newCont = $(this.newContainer);
        let oldCont = $(this.oldContainer);
        let blockContent = newCont.find('.block-load');
        let blockBg = newCont.find('.block__bg');
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
                .set(blockContent, {
                  y: 50,
                  autoAlpha: 0,
                })
                .set(blockBg, {
                  y: -50,
                  autoAlpha: 0,
                })
                .to(window.DOM.pageLoaderW, 0.4, {
                  scaleY: 0,
                  transformOrigin:'top center',
                  
                })
                .to(window.DOM.pageLoaderB, 0.4, {
                  scaleY: 0,
                  transformOrigin:'top center',
                  // clearProps:'all'
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
                })
                .to(blockBg, 0.5, {
                  y: 0,
                  autoAlpha: 1,
                }, '+=0.4');

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

  	window.DOM.headerLinks.addClass('show-header-links');
    initAboutSliders();
    initRellaxParalax();
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
    $('.gallery-news-footer').addClass('visible');

    youtubeVideo();
    stickInit();
    initRellaxParalax();
    scrollAnimations();
  },
  onLeave: function() {
    window.DOM.headerLinks.removeClass('show-header-links');
    $('.gallery-news-footer').removeClass('visible');

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
    initModels();
    setInputFocus();
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
    $('.inner-wrap').addClass('active');
    window.DOM.navBurger.addClass('hide-nav-burger');
    window.DOM.navBack.addClass('view-nav-back');
  },
  onLeave: function() {
  	window.DOM.navLogo.removeClass('hide-nav-logo');
    setTimeout(function() {
      window.DOM.navBurger.removeClass('hide-nav-burger');
      window.DOM.navBack.removeClass('view-nav-back');
    }, 500);
    $('.inner-info').removeClass('active');
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

// $(document).ready(function() {


// });

window.onload = () => {
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
  scrollAnimations();
  window.DOM.body.removeClass('loading');
};
