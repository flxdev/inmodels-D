import $ from 'jquery';
import setInputFocus from './lib/inputFocus';
import clearSearchField from './lib/clearSearchField';
import initDropzone from './lib/initDropzone';
import formValidator from './lib/formValidator';
import showVideo from './lib/homeVideo';
import initPopUp from './lib/initPopUp';
import stickInit from './lib/stickInit';
import youtubeVideo from './lib/youtubeVideo';
import initGallery from './lib/initGallery';
import initModels from './lib/initModels';
import initAboutSliders from './lib/initSliders';

setInputFocus();
clearSearchField();
formValidator();
initDropzone();
showVideo();
initPopUp();
stickInit();
youtubeVideo();
initGallery();
initModels();
initAboutSliders();

