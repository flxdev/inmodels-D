import Isotope from 'isotope-layout/dist/isotope.pkgd.min.js';

export default function initModels() {

  let elem = document.querySelector('.models-wrap');
  if(elem) {
   
    let iso = new Isotope( elem, {
      itemSelector: '.models-item',
      layoutMode: 'masonry',
      filter: '*',
      masonry: {
        columnWidth: '.models-item'
      },
      stamp: '.stamp-models',
      stagger: 30,
      transitionDuration: '0.6s',
      hiddenStyle: {
        opacity: 0,
        transform: 'translateY(40px)'
      },
      visibleStyle: {
        opacity: 1,
        transform: 'none'
      }
    });
    iso.layout();

    let $quicksearch = $('#searching').on('keyup', debounce( function() {
      let qsRegex = new RegExp( $quicksearch.val(), 'gi' );
      iso.arrange({
        filter: function(itemElem) {
          return qsRegex ? itemElem.querySelector('.models-item__title').innerText.match( qsRegex ) : true;
        }
      });
      let searchField = document.querySelector('.form-search');
      let filterLength = iso.filteredItems.length;
      switch(filterLength) {
        case 3:
          $('.stamp-models').removeClass('hide-stamp').addClass('re-stamp');
          iso.stamp('.stamp-models');
          searchField.classList.remove('not-found');
          break;
        case 2:
        case 1:
          $('.stamp-models').addClass('hide-stamp');
          iso.unstamp('.stamp-models');
          searchField.classList.remove('not-found');
          break;
        default:
          $('.stamp-models').removeClass('hide-stamp re-stamp');
          iso.stamp('.stamp-models');
          break;
      }
      if(iso.filteredItems.length < 1) {
        searchField.classList.add('not-found');
        let searchFieldValue = $quicksearch.val();
        $('.not-found-result').text('"' + searchFieldValue + '"');
      } else {
        searchField.classList.remove('not-found');
      }
      iso.arrange();
      iso.layout();
    }, 200 ));
    

    let clr_bttn = $('.clear-bttn').on('click', debounce( function() {
      $('.clear-bttn').parent().removeClass('editing').find('input').val('').focus();
      let qsRegex = new RegExp( $quicksearch.val(), 'gi' );
      iso.arrange({
        filter: function(itemElem) {
          return qsRegex ? itemElem.querySelector('.models-item__title').innerText.match( qsRegex ) : true;
        }
      });
      let searchField = document.querySelector('.form-search');
      if(iso.filteredItems.length < 1) {
        searchField.classList.add('not-found');
        let searchFieldValue = $quicksearch.val();
        $('.not-found-result').text('"' + searchFieldValue + '"');
      } else {
        searchField.classList.remove('not-found');
      }
      iso.arrange();
      iso.layout();
    }, 200 ));
    
    // debounce so filtering doesn't happen every millisecond
    function debounce( fn, threshold ) {
      let timeout;
      return function debounced() {
        if ( timeout ) {
          clearTimeout( timeout );
        }
        function delayed() {
          fn();
          timeout = null;
        }
        timeout = setTimeout( delayed, threshold || 100 );
      };
    }
    
    var ajaxPagerLoadingClass = 'ajax-pager-loading',
      ajaxPagerLazyClass = 'lazy',
      ajaxPagerWrapClass = 'ajax-pager-wrap',
      ajaxPagerLinkClass = 'ajax-pager-link',
      ajaxPagerLoaderClass = 'loading',
      ajaxWrapAttribute = 'wrapper-class',
      busy = false,

      attachScrollPagination = function(wrapperClass) {
        var $wrapper = $('.' + wrapperClass),
          $window = $(window);

        if($wrapper.length && $('.' + ajaxPagerWrapClass).length && $('.' + ajaxPagerWrapClass).hasClass(ajaxPagerLazyClass)) {
          $window.off('scroll.pagen').on('scroll.pagen', function() {
            if(($window.scrollTop() + $window.height()) > ($wrapper.offset().top + $wrapper.height()) && !busy) {
              busy = true;
              $('.' + ajaxPagerLinkClass).click();
            }
          });
        }
      },

      ajaxPagination = function(e) {
        e.preventDefault();

        busy = true;
        var wrapperClass = $('.'+ajaxPagerLinkClass).data(ajaxWrapAttribute),
          $wrapper = $('.' + wrapperClass),
          $link = $(this),
          container = $('.ajax-list'),
          loadingClass= 'loading';

        if($wrapper.length) {
          container.addClass(loadingClass);
          $.get($link.attr('href'), {'AJAX_PAGE' : 'Y'}, function(data) {
            // if(isHistoryApiAvailable()) {
            //   if($link.attr('href') !== window.location) {
            //     window.history.pushState(null, null, $link.attr('href'));
            //   }
            // }
            
            $('.' + ajaxPagerWrapClass).remove();
            container.append(data);

            var h_model = document.querySelectorAll('.hide-model');
            for (var i = 0, len = h_model.length; i<len; i++) {
              elem.appendChild(h_model[i]).classList.remove('hide-model');
            }
            
            setTimeout(function() {
              iso.appended( h_model );
              iso.arrange();
              iso.layout();
            }, 50);
            

            if($('.' + ajaxPagerWrapClass).hasClass(ajaxPagerLazyClass)) {
              attachScrollPagination(wrapperClass);
              busy = false;
            }
            container.removeClass(loadingClass);
          });

        }
      };

    // function isHistoryApiAvailable() {return!(!window.history||!history.pushState);}

    $(function() {
    
      if($('.'+ajaxPagerLinkClass).length && $('.'+ajaxPagerLinkClass).data(ajaxWrapAttribute).length) {
     
        if($('.' + ajaxPagerWrapClass).hasClass(ajaxPagerLazyClass)) {
       
          attachScrollPagination($('.'+ajaxPagerLinkClass).data(ajaxWrapAttribute));
          busy = false;
        }
        $(document).on('click touchstart', '.' + ajaxPagerLinkClass, ajaxPagination);

      }
    });
  }

  var scrolled;
  window.onscroll = function() {
    scrolled = window.pageYOffset || document.documentElement.scrollTop;
  };

  window.DOM.navSearch.off('click').on('click',function(e) {
    e.preventDefault();
    let el_scroll = $(this).attr('href'),
      el_input = $(el_scroll).find('input'),
      el_off = $(el_scroll).offset().top;
    if($(el_scroll).hasClass('active')) {
      if(scrolled > el_off) {
        $('html, body').animate({scrollTop: el_off}, 300);
        el_input.focus();
        return false;
      } else {
        $(el_scroll).removeClass('active');
        return false;
      }
    } else {
      $(el_scroll).addClass('active');
      $('html, body').animate({scrollTop: el_off}, 300);
      el_input.focus();
      return false;
    }
  });

  

}
