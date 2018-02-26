import * as dropzone from 'dropzone';

export default function initDropzone() {

  let drop = $('.drop-item');
  if(drop.length) {
    drop.each(function() {
      let _t = $(this);
      _t.dropzone({
        //url: '/file/post',
        clickable : true,
        addRemoveLinks : true,
        dictRemoveFile: '',
        ignoreHiddenFiles: false,
        createImageThumbnails : false,
        dictFileTooBig : 'Вы превысили допустимый размер файла. Загрузите файл с меньшим размером.',
        dictResponseError : 'Сервер ответил с ошибкой',
        dictInvalidFileType: 'Неверный тип файла',
        maxFilesize: '2',
        maxFiles: '1',
        autoDiscover : false,
        acceptedFiles: '.jpg, .jpeg, .png, .pdf',
        autoProcessQueue : false,
        init: function() {

          var _tItem = _t.find('input');

          this.on('addedfile', function(file) {
            _tItem.val(file.name);
            _tItem.validate();
          });

          this.on('removedfile', function(file) {
            _tItem.removeAttr('value');
            _tItem.validate();
          });

          var submitButton = $('button[type="submit"]');
          var wrapperThis = this;

          submitButton.on('click', function(e) {
            wrapperThis.processQueue();
          });
        }
      });
    });
  }
}
