import validator from 'jquery-form-validator/form-validator/jquery.form-validator.min.js';
import autosize from 'autosize';
import inputmask from 'inputmask/dist/min/jquery.inputmask.bundle.min.js';

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
  autosize($('textarea'));

  $('input[type="tel"]').on('click', function() {
    $(this).inputmask({
      'mask': '8 (999) 999-99-99',
      showMaskOnFocus: true,
      showMaskOnHover: false,
    });
  });
  
  $('button[type="submit"]').on('click', function() {
    let error_l;
    setTimeout(function() {
      let error_l = $('.error').length;
      if(!error_l) {
        $('form').fadeOut(400);
        $('.block-success').delay(450).fadeIn(400);
      }
    }, 50);

    
  });
}
