'use strict';

(function () {
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var STEP_SCALE = 25;

  var uploadPicture = document.querySelector('.img-upload');
  var picturePreview = uploadPicture.querySelector('.img-upload__preview');
  var scaleControlSmaller = uploadPicture.querySelector('.scale__control--smaller');
  var scaleControlBigger = uploadPicture.querySelector('.scale__control--bigger');
  var scaleControlValue = uploadPicture.querySelector('.scale__control--value');

  var currentScaleValue = window.utils.DEFAULT_SCALE;

  var scalePicture = function (value) {
    scaleControlValue.setAttribute('value', value + '%');
    scaleControlValue.value = value + '%';
    picturePreview.style.transform = 'scale(' + value * 0.01 + ')';
  };

  scaleControlSmaller.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (window.resize.currentScaleValue > MIN_SCALE && currentScaleValue <= MAX_SCALE) {
      window.resize.currentScaleValue -= STEP_SCALE;
      scalePicture(window.resize.currentScaleValue);
    }
  });

  scaleControlBigger.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (window.resize.currentScaleValue >= MIN_SCALE && window.resize.currentScaleValue < MAX_SCALE) {
      window.resize.currentScaleValue += STEP_SCALE;
      scalePicture(window.resize.currentScaleValue);
    }
  });

  window.resize = {
    scalePicture: scalePicture,
    currentScaleValue: currentScaleValue
  };
})();
