import sayHello from './lib/sayHello';
import setInputFocus from './lib/inputFocus';
import clearSearchField from './lib/clearSearchField';
import initDropzone from './lib/initDropzone';
import formValidator from './lib/formValidator';
import showVideo from './lib/homeVideo';
import initPopUp from './lib/initPopUp';

(async() => {
  sayHello();
  setInputFocus();
  clearSearchField();
  formValidator();
  initDropzone();
  showVideo();
  initPopUp();
  
})();

window.DOM = {
  body: $('body'),
  html: $('html'),
  __prevScrollTop: 0,
  hideScroll: function() {
    // let top = $(window).scrollTop();
    this.__prevScrollTop = $(window).scrollTop();
    this.body.css('top',-this.__prevScrollTop + 'px');
    window.scroll(0, this.__prevScrollTop);
    this.body.addClass('menu-mobile');
  },
  showScroll: function() {
    this.body.removeClass('menu-mobile');
    this.__prevScrollTop && (window.scroll(0, this.__prevScrollTop));
    this.__prevScrollTop = null;
  }
};
