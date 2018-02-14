export default function aboutMenu() {
  $('.about-menu__link').on('click', function() {
    $('.about-menu__link').removeClass('active');
    $(this).addClass('active');
  });
}
