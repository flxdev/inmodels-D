import Isotope from 'isotope-layout/dist/isotope.pkgd.js';

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
      transitionDuration: '0.8s',
      hiddenStyle: {
        opacity: 0,
        transform: 'scale(0.001)'
      },
      visibleStyle: {
        opacity: 1,
        transform: 'scale(1)'
      }
    });

    
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

  }

  var scrolled;
  window.onscroll = function() {
    scrolled = window.pageYOffset || document.documentElement.scrollTop;
    console.log(scrolled);
  };
  $('.navigation-search').on('click',function(e) {
    e.preventDefault();
    let el_scroll = $(this).attr('href'),
      el_off = $(el_scroll).offset().top;
    if($(el_scroll).hasClass('active')) {
      if(scrolled > el_off) {
        $('html, body').animate({scrollTop: el_off}, 300);
        return false;
      } else {
        $(el_scroll).removeClass('active');
        return false;
      }
    } else {
      $(el_scroll).addClass('active');
      $('html, body').animate({scrollTop: el_off}, 300);
      return false;
    }
  });

}
