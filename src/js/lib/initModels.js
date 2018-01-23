import Isotope from 'isotope-layout/dist/isotope.pkgd.js';

export default function initModels() {

  let elem = document.querySelector('.models-wrap');
  if(elem) {
    var qsRegex;
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

    var $quicksearch = $('#searching').keyup( debounce( function() {
      qsRegex = new RegExp( $quicksearch.val(), 'gi' );
      console.log('piu');
      iso.arrange({
        filter: function(itemElem) {
          console.log( itemElem.querySelector('.models-item__title').innerText );
          return qsRegex ? itemElem.querySelector('.models-item__title').innerText.match( qsRegex ) : true;
        }
      });
    }, 200 ) );


    // debounce so filtering doesn't happen every millisecond
    function debounce( fn, threshold ) {
      var timeout;
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


  $('.navigation-search').on('click',function(e) {
    e.preventDefault();
    let el_scroll = $(this).attr('href'),
      el_off = $(el_scroll).offset().top;
    if($(el_scroll).hasClass('active')) {
      $(el_scroll).removeClass('active');
      return false;
    } else {
      $(el_scroll).addClass('active');
      $('html, body').animate({scrollTop: el_off}, 600);
      return false;
    }
   
  });

}

// filter: function( itemElem ) {
//    var number = itemElem.querySelector('.number').innerText;
//    return parseInt( number, 10 ) > 50;
//  }

// computedList() {
//     return this.list.filter((item) => {
//         return item.title.toLowerCase().indexOf(this.query.toLowerCase()) !== -1
//     })
// }
// item.title объект где ищем
// this.query что ищем
