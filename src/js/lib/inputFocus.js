import validator from 'jquery-form-validator/form-validator/jquery.form-validator.min.js';
import 'jquery-form-validator/src/modules/security.js';
import 'jquery-form-validator/src/modules/file.js';
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
        modules: 'security, file',
        reCaptchaSiteKey: '6Ldb6EcUAAAAAGrmkKj7Q0ZEGXI0pzw-yvOXMhTE',
        reCaptchaSize: 'normal',
        reCaptchaTheme: 'light',
      });
    });
  }

  let drop_input = $('.drop-input');
  if(drop_input.length) {
    drop_input.each(function() {
      $(this).on('input change',function() {
        let _inp =  $(this),
          _inp_parent = _inp.parent().parent(),
          _inp_name = _inp_parent.find('.file-name'),
          _name_wrap = _inp_parent.find('.file-name-wrap'),
          str = _inp.val();
        if (str.lastIndexOf('\\')) {
          var i = str.lastIndexOf('\\')+1;
        }
        else{
          var i = str.lastIndexOf('/')+1;
        }           
        var filename = str.slice(i);
        _inp_name.html(filename);
        _inp.validate();
        _name_wrap.fadeIn(300);
      });
    });
  }

  let clear_file = $('.clear-file');
  if(clear_file.length) {
    clear_file.each(function() {
      let _clear = $(this);
      _clear.on('click', function() {
        let _clear_parent = $(this).parent().parent(),
          _clear_inp = _clear_parent.find('.drop-input'),
          _clear_name = _clear_parent.find('.file-name'),
          _clear_wrap = _clear_parent.find('.file-name-wrap');
        _clear_wrap.fadeOut(300);
        setTimeout( function() {
          _clear_inp.val('');
          _clear_inp.validate();
          _clear_name.html('');
        }, 350);
        
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
