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
        acceptedFiles: 'image/*,application/pdf',
        autoProcessQueue : false,
        init: function() {
          this.on('success', function(file) {
            if (_t.hasClass('dz-success')) {
              _t.find('input').val('true').validate();
            }
          });
        }
      });
    });
  }
}
