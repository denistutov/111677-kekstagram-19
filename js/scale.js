'use strict';

(function () {
  var uploadPicture = document.querySelector('.img-upload');

  var picturePreview = uploadPicture.querySelector('.img-upload__preview');
  var scaleControlSmaller = uploadPicture.querySelector('.scale__control--smaller');
  var scaleControlBigger = uploadPicture.querySelector('.scale__control--bigger');
  var scaleControlValue = uploadPicture.querySelector('.scale__control--value');

  var currentScaleValue = window.constants.DEFAULT_SCALE;;

  var scalePicture = function (value) {
    scaleControlValue.setAttribute('value', value + '%');
    scaleControlValue.value = value + '%';
    picturePreview.style.transform = 'scale(' + value * 0.01 + ')';
  };

  scaleControlSmaller.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (window.scale.currentScaleValue > window.constants.MIN_SCALE && currentScaleValue <= window.constants.MAX_SCALE) {
      window.scale.currentScaleValue -= window.constants.STEP_SCALE;
      scalePicture(window.scale.currentScaleValue);
    }
  });

  scaleControlBigger.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (window.scale.currentScaleValue >= window.constants.MIN_SCALE && window.scale.currentScaleValue < window.constants.MAX_SCALE) {
      window.scale.currentScaleValue += window.constants.STEP_SCALE;
      scalePicture(window.scale.currentScaleValue);
    }
  });
  
window.scale = {
	scalePicture: scalePicture,
	currentScaleValue: currentScaleValue
};

})();
