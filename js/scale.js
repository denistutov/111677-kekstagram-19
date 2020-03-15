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
    if (window.scale.currentScaleValue > MIN_SCALE && currentScaleValue <= MAX_SCALE) {
      window.scale.currentScaleValue -= STEP_SCALE;
      scalePicture(window.scale.currentScaleValue);
    }
  });

  scaleControlBigger.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (window.scale.currentScaleValue >= MIN_SCALE && window.scale.currentScaleValue < MAX_SCALE) {
      window.scale.currentScaleValue += STEP_SCALE;
      scalePicture(window.scale.currentScaleValue);
    }
  });

  window.scale = {
    scalePicture: scalePicture,
    currentScaleValue: currentScaleValue
  };
})();
