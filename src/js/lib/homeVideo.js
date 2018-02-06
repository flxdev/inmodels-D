export default function showVideo() {

  let video_c = $('.video-container');
  
  if(video_c.length > 0) {

    let video = video_c.find('video'),
  	 src = video.data('src');
  
    if(!isMobile()) {
      video[0].src = src;
      video[0].load = function() {
        video.addClass('fadeIn animated');
      };
      video[0].load();
      // $(window).on('resize', debounce(initsize));
    }
  }
  function isMobile() {
    return (/Android|webOS|iPhone|iPod|iPad|BlackBerry|Windows Phone|iemobile/i.test(navigator.userAgent));
  }

}
