export default function clearSearchField() {
  let clr_bttn = $('.clear-bttn');
  clr_bttn.on('click', function(e) {
  	e.preventDefault();
    $(this).parent().removeClass('editing').find('input').val('').focus();
  });
}
