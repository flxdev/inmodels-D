import * as dropzone from 'dropzone';

export default function initDropzone() {

  let drop = $('.drop-item');
  if(drop.length) {
    drop.each(function() {
      $(this).dropzone({
        url: '/file/post',
        clickable : true,
        addRemoveLinks : true,
        dictRemoveFile: '',
        createImageThumbnails : false,
        hiddenInputContainer: '.drop-item',
        dictFileTooBig : 'Вы превысили допустимый размер файла. Загрузите файл с меньшим размером.',
        dictResponseError : 'Сервер ответил с ошибкой',
        dictInvalidFileType: 'Неверный тип файла',
        maxFilesize: '10',
        maxFiles: '1',
        autoDiscover:false,
        //acceptedFiles: _.hasClass('image')? '.jpg,.png,.webp' : '.doc,.docx,.pdf',
      });
    });
  }

}
