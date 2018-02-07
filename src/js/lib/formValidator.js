
export default function formValidator() {
  let _form = $('.js-validate');
  if (_form.length) {
    _form.each(function() {
      let FormThis = $(this);

      $.validate({
        form: FormThis,
        modules: 'logic',
        borderColorOnError: true,
        scrollToTopOnError: true,
        validateHiddenInputs: true,
        inlineErrorMessageCallback: true,
        submitErrorMessageCallback: true,
        inlineErrorMessageCallback:  function($input, errorMessage) {
          if (errorMessage) {
            singleErrorMessages($input, errorMessage);
          } else {
            singleRemoveErrorMessages($input);
          }
          return false; // prevent default behaviour
        },
        onValidate: () => {
          // CheckForSelect(form_this);
        },
        onSuccess: () => {
          // formResponse(form_this);
          // resetForm(form_this);
          return false;
        },
      });
    });
    function singleErrorMessages(item, errorMessage)
    {
      var currentElementParentObject = item.parent();
      currentElementParentObject.find('.form-error').remove();
      currentElementParentObject.append(`<div class='help-block form-error'>${errorMessage}</div>`);
    }

    function singleRemoveErrorMessages(item)
    {
      var currentElementParentObject = item.parent();
      currentElementParentObject.find('.form-error').remove();
    }
  }
}
