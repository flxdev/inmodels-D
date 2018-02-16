export default function showVideo() {

  const videoSource = document.createElement('source');
  // let newSourse = videoSource.cloneNode();
  // newSourse.setAttribute('src', url);
  // image.appendChild(newSourse);
  // image.onloadeddata = resolve;
  let video_c = $('.video-container');
  
  if(video_c.length > 0) {

    let video = video_c.find('video'),
  	 src = video.data('src');
  
    if(!isMobile()) {
      let newSourse = videoSource.cloneNode();
      newSourse.setAttribute('src', src);
      video[0].appendChild(newSourse);
       
      video[0].onloadeddata = function() {
        video.addClass('fadeIn animated');
      };
      // video[0].load();
      // $(window).on('resize', debounce(initsize));
    }
  }
  function isMobile() {
    return (/Android|webOS|iPhone|iPod|iPad|BlackBerry|Windows Phone|iemobile/i.test(navigator.userAgent));
  }

}
