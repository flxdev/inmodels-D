import Isotope from 'isotope-layout/dist/isotope.pkgd.min.js';

export default function initGallery() {

  let elem = document.querySelector('.gallery-wrap');
  if(elem) {
    let iso = new Isotope( elem, {
      itemSelector: '.gallery-item',
      layoutMode: 'masonry',
      filter: '*',
      masonry: {
        columnWidth: '.gallery-item'
      },
      stamp: '.stamp-gallery',
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

    let filtersElem = document.querySelector('.gallery-filter');
    filtersElem.addEventListener( 'click', function( event ) {
      let filterValue = event.target.getAttribute('data-filter');
      iso.arrange({ filter: filterValue });
      iso.layout();
    });

    var ajaxPagerLazyClass = 'lazy',
      ajaxPagerWrapClass = 'ajax-pager-wrap',
      ajaxPagerLinkClass = 'ajax-pager-link',
      ajaxPagerLoaderClass = 'loading',
      ajaxWrapAttribute = 'wrapper-class',
      busy = false,


      // attachScrollPagination = function(wrapperClass) {
      //   var $wrapper = $('.' + wrapperClass),
      //     $window = $(window);

      //   if($wrapper.length && $('.' + ajaxPagerWrapClass).length && $('.' + ajaxPagerWrapClass).hasClass(ajaxPagerLazyClass)) {
      //     $window.off('scroll.pagen').on('scroll.pagen', function() {
      //       if(($window.scrollTop() + $window.height()) > ($wrapper.offset().top + $wrapper.height()) && !busy) {
      //         busy = true;
      //         $('.' + ajaxPagerLinkClass).click();
      //         console.log('has click');

      //       }
      //     });
      //   }
      // },

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
            if(isHistoryApiAvailable()) {
              if($link.attr('href') !== window.location) {
                window.history.pushState(null, null, $link.attr('href'));
              }
            }
            
            $('.' + ajaxPagerWrapClass).remove();
            container.append(data);

            var h_gallery = document.querySelectorAll('.hide-gallery');
            for (var i = 0, len = h_gallery.length; i<len; i++) {
              elem.appendChild(h_gallery[i]).classList.remove('hide-gallery');
            }
            iso.appended( h_gallery );
            setTimeout(function() {
              iso.arrange();
              iso.layout();
            }, 50);
            if($('.' + ajaxPagerWrapClass).hasClass(ajaxPagerLazyClass)) {
              // attachScrollPagination(wrapperClass);
              busy = false;
            }
            container.removeClass(loadingClass);
          });

        }
      };

    function isHistoryApiAvailable() {return!(!window.history||!history.pushState);}

    $(function() {
    
      if($('.'+ajaxPagerLinkClass).length && $('.'+ajaxPagerLinkClass).data(ajaxWrapAttribute).length) {
     
        if($('.' + ajaxPagerWrapClass).hasClass(ajaxPagerLazyClass)) {
          busy = false;
        }
        $(document).on('click touchstart', '.' + ajaxPagerLinkClass, ajaxPagination);

      }
    });


  }

}
