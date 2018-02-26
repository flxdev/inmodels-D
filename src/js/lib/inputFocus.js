import validator from 'jquery-form-validator/form-validator/jquery.form-validator.min.js';
import 'jquery-form-validator/src/modules/security.js';
import autosize from 'autosize';

export default function setInputFocus() {

  var form_valid = $('.js-validate');
  if (form_valid.length) {
    form_valid.each(function() {
      var form_this = $(this);
      $.validate({
        form: form_this,
        validateOnBlur : true,
        validateHiddenInputs : true,
        modules: 'security',
        reCaptchaSiteKey: '6LfyQ0YUAAAAALnPYQDtOHEU5cBfXMIMC3m5kPXn',
        reCaptchaSize: 'normal',
        reCaptchaTheme: 'light',
        // onSuccess  : function() {
        //   $('.drop-item').processQueue();
        // }
      });
    });
  }


  let inputs = $('.input-item');
  if(inputs.length) {
    inputs.each(function() {
      let _t = $(this);
      _t.on('click', function() {
        if(!_t.hasClass('focus')) {
          _t.addClass('focus');
          _t.find('input').focus();
        } else {
          if(_t.hasClass('select')) {
            _t.removeClass('focus');
          }
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
        let value = $(this).text(),
          parent = $(this).closest('.select');
        parent.find('.select-link').text(value);
        parent.find('input').val(value).validate();
        parent.removeClass('focus');
  
      });
    });
  }

  autosize($('textarea'));

  $('input').keydown(function(event) {
    if(event.keyCode === 13) {
      event.preventDefault();
      return false;
    }
  });
  
  $('input[type="tel"]').on('click', function() {
    let i_val =  $(this).val();
    if(!i_val) {
      $(this).val('+');
    }
  });

  $('input[type="tel"]').on('blur', function() {
    let i_val =  $(this).val();
    if(i_val === '+') {
      $(this).val('');
    }
  });
  
}
