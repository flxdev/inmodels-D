import Rellax from 'rellax/rellax.js';

export default function initRellaxParalax() {

  setTimeout(function() {
    let rellaxParalax = $('.rellax');
    if (rellaxParalax.length) {
      window.DOM.rellax = new Rellax('.rellax',{
    	center: true
      });
    }
  }, 0);
  

}
