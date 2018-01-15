export default function setInputFocus() {
  
  let inputs = $('.input-item');
  if(inputs.length) {
    inputs.each(function() {
      let _t = $(this);
      _t.on('click', function() {
        if(!_t.hasClass('focus')) {
          $(this).addClass('focus');
          $(this).find('input').focus();
        }
      });
      $(document).on('click', function(e) {
        if (!_t.is(e.target) && _t.has(e.target).length === 0) {
          _t.removeClass('focus');
        }
      }); 
    });
  }

  
  let _input_f = $('.input-field');
  if(_input_f.length) {
    _input_f.each(function() {
      $(this).on('input change',function() {
        let _val = $(this).val().length,
          parent = $(this).parent();
        if(_val<=0) {
          parent.removeClass('editing');
        } else {
          parent.addClass('editing');
        }
      });
    });
  }

  let select_item = $('.select-list__item');
  if(select_item.length) {
    select_item.each(function() {
      let _item = $(this);
      _item.on('click', function(e) {
        e.stopPropagation();
        console.log('click');
        let value = $(this).text(),
          parent = $(this).closest('.select');
        parent.find('.select-link').text(value);
        parent.find('input').val(value).validate();
        parent.removeClass('focus');
  
      });
    });
  }

}
