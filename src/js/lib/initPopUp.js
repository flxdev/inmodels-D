export default function initPopUp() {
  var _this = $(this);
  _this.b = {
    open: $('.js-popup-button'),
  };
  _this.c = {
    popup: $('.js-popup-container'),
  };
  _this.f = {};
  _this.conf = {
    active_class: 'active',
    close_selector: '.closePopup',
    initial_class: 'popup-initialed',
    header_class: 'is-hidden'
  };
  _this.f.initModalActions = function(_popup) {
    /**
		 * Close buttons.
		 */
    $(_popup).on('click touchstart ', '.modal-container', function(e) {
      if (!$(_this.conf.close_selector).is(e.target)) {
        e.stopPropagation();
      }
    });

    _popup.find(_this.conf.close_selector).add(_popup).off('click.popup').on('click.popup touchstart ', function() {
      _this.f.closePopup(_popup);
    });
  };

  _this.f.closePopup = function(_popup) {
    _popup.removeClass(_this.conf.active_class);
    setTimeout(function() {
      window.DOM.showScroll();
    },5);
  };

  _this.f.openPopup = function(_popup) {
    _popup.addClass(_this.conf.active_class);
    setTimeout(function() {
      window.DOM.hideScroll();
    },5);
  };
  /**
	 * Initial.
	 */
  $.each(_this.c.popup.not('.' + _this.conf.initial_class), function() {
    var _popup = $(this);
    _this.f.initModalActions(_popup);
    _popup.off('reinit').on('reinit', function() {
      _this.f.initModalActions(_popup);
    });
    _popup.addClass(_this.conf.initial_class);
  });

  _this.b.open.off('click.popup').on('click.popup', function(e) {
    e.preventDefault();
    var _b = $(this),
      _popup = _this.c.popup.filter('[data-modal="' + _b.data('modal') + '"]');
    _this.f.openPopup(_popup);
    return false;
  });

  window.DOM = {
    body: $('body'),
    html: $('html'),
    __prevScrollTop: 0,
    hideScroll: function() {
      // let top = $(window).scrollTop();
      this.__prevScrollTop = $(window).scrollTop();
      this.body.css('top',-this.__prevScrollTop + 'px');
      window.scroll(0, this.__prevScrollTop);
      this.body.addClass('show-menu');
    },
    showScroll: function() {
      this.body.removeClass('show-menu');
      this.__prevScrollTop && (window.scroll(0, this.__prevScrollTop));
      this.__prevScrollTop = null;
    }
  };

}
