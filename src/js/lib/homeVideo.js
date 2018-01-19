import vide from 'vide';

export default function showVideo() {
  // let video_wrap = $('.block__video'),
  //   video = video_wrap.find('video'),
  // 	src = video.data('src');
  // if(video.length > 0) {
  //   if(!isMobile()) {
  //     video[0].src = src;
  //     video[0].load = function() {
  //       video.addClass('fadeIn animated');
  //     };
  //     video[0].load();
  //     // $(window).on('resize', debounce(initsize));
  //   }
  // }
  // function isMobile() {
  //   return (/Android|webOS|iPhone|iPod|iPad|BlackBerry|Windows Phone|iemobile/i.test(navigator.userAgent));
  // }
  $('.video-container').vide({
    mp4: './img/video.mp4',
    // webm: './img/video.webm',
    poster: './img/video.jpg'
  }, {
    bgColor: '#f0eae8',
    volume: 0,
    muted: true,
    posterType: 'jpg'
  });
} 
