import 'sticky-kit/dist/sticky-kit.min';

export default function stickInit() {

  let stick = $('.js-stick');
  if(stick.length) {
  	stick.stick_in_parent({
      parent: '.js-stick-parent',
      offset_top: 0,
    });
  }

}
