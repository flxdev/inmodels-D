import Isotope from 'isotope-layout/dist/isotope.pkgd.js';

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

    let filtersElem = document.querySelector('.gallery-filter');
    filtersElem.addEventListener( 'click', function( event ) {
      let filterValue = event.target.getAttribute('data-filter');
      iso.arrange({ filter: filterValue });
    });

    let addItem = document.querySelector('.add-gallery-item');
    addItem.addEventListener( 'click', function( event ) {
      event.preventDefault();
      alert('zagruzka');  
    });
  }

}
