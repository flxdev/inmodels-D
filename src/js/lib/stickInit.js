import 'sticky-kit/dist/sticky-kit.min.js';

export default function stickInit() {


  $('.js-stick').stick_in_parent({
    parent: '.js-stick-parent',
    offset_top: 0,
  });
  console.log('stick go go');

}
