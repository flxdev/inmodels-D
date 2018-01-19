import Isotope from 'isotope-layout/dist/isotope.pkgd.min';

export default function initGallery() {



  let elem = document.querySelector('.js-isotope-wrap');
  let iso = new Isotope( elem, {
  // options
    itemSelector: '.js-isotope-item',
    layoutMode: 'fitRows',
  });


  $('.gallery-filter__item').click(function() {
    var selector = $(this).attr('data-filter');
    console.log(selector);
    iso = new Isotope( elem, { filter: selector });
    return false;
  });
  // $('.js-isotope-filter').on( 'click', 'a', function(e) {
  //   e.preventDefault();
    
  //   var $this = $(this);
  //   // don't proceed if already selected
  //   if ( !$this.hasClass('is-checked') ) {
  //     $this.parent().find('.is-checked').removeClass('is-checked');
  //     $this.addClass('is-checked');
  //   }
  //   var selector = $this.attr('data-filter');
  //   console.log(selector);
  //   iso = new Isotope( elem, { 
  //     itemSelector: '.js-isotope-item',
  //     filter: selector 
  //   });
  //   return false;
  // console.log(filterValue);
  // iso = new Isotope( elem, { 
  // 	itemSelector: '.js-isotope-item',
  // 	filter: filterValue });

  // });

  console.log('isotope');
}
