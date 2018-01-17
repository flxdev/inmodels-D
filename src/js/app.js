import setInputFocus from './lib/inputFocus';
import clearSearchField from './lib/clearSearchField';
import initDropzone from './lib/initDropzone';
import formValidator from './lib/formValidator';
import showVideo from './lib/homeVideo';
import initPopUp from './lib/initPopUp';
import stickInit from './lib/stickInit';

(async() => {
  setInputFocus();
  clearSearchField();
  formValidator();
  initDropzone();
  showVideo();
  initPopUp();
  stickInit();
  
})();
