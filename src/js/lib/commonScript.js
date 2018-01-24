export default function commonScript() {
  $('.about-menu__link').on('click', function(e) {
  	e.preventDefault();
  	$('.about-menu__link').removeClass('active');
    $(this).addClass('active').siblings();
  });
}
