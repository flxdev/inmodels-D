import initRellaxParalax from './initRellaxParalax';
import $ from 'jquery/dist/jquery.js';

window.DOM = {
  body: $('body'),
  html: $('html'),
  navLang: $('.header-links'),
  navLogo: $('.navigation-logo'),
  navSearch: $('.navigation-search'),
  headerLinks: $('.navigation-lang'),
  docLang: $('html').attr('lang'),
  menu: $('.js-popup-container'),
  menuClose: $('.js-popup-container').find('.closePopup'),
  pageLoader: $('.page-loader'),
  pageLoaderW: $('.page-elem.white'),
  pageLoaderB: $('.page-elem.blend'),
  passiveSupported: false,
  bodyScrollTop: null,
  scrollWidth: null,
  getScrollWidth: function() {
    // Узнаем ширину скролл панели
    const div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.visibility = 'hidden';
    this.body[0].appendChild(div);
    this.scrollWidth = div.offsetWidth - div.clientWidth;
    this.body[0].removeChild(div);
  },
  hideScrollSimple: function() {
    if (this.body[0].offsetHeight < this.body[0].scrollHeight) {
      this.body.css('padding-right',this.scrollWidth + 'px');
    }
    this.body.addClass('loading');
  },
  showScrollSimple: function() {
    this.body.removeClass('loading');
    this.body[0].style.paddingRight = '';
  },
  hideScroll: function() {
    if (window.innerWidth > document.documentElement.clientWidth) {
      this.body.css('padding-right',this.scrollWidth);
    }
    this.bodyScrollTop = $(window).scrollTop();
    this.body.css('top',-this.bodyScrollTop + 'px');
    window.scroll(0, this.bodyScrollTop);
    this.body.addClass('show-menu');
    $('.js-stick').trigger('sticky_kit:recalc');
  },
  showScroll: function() {
  	this.body.removeClass('show-menu');
    this.bodyScrollTop && (window.scroll(0, this.bodyScrollTop));
    this.bodyScrollTop = null;
    this.body[0].style.paddingRight = '';
    $('.js-stick').trigger('sticky_kit:recalc'); 
  },
  addListenerMulti(el, s, fn) {
    s.split(' ').forEach(e => el.addEventListener(e, fn, window.DOM.passiveSupported ? { passive: true } : false));
  },
};
