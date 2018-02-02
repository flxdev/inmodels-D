import Rellax from 'rellax/rellax.js';

export default function initRellaxParalax() {

  let rellaxParalax = $('.rellax');
  if (rellaxParalax.length) {
    window.DOM.rellax = new Rellax('.rellax',{
    	center: true
    });
  }

}
