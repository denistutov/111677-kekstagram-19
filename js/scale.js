'use strict';

(function () {
  var uploadPicture = document.querySelector('.img-upload');

  var picturePreview = uploadPicture.querySelector('.img-upload__preview');
  var scaleControlSmaller = uploadPicture.querySelector('.scale__control--smaller');
  var scaleControlBigger = uploadPicture.querySelector('.scale__control--bigger');
  var scaleControlValue = uploadPicture.querySelector('.scale__control--value');

  scaleControlValue.value = window.constants.DEFAULT_SCALE;
  scaleControlValue.setAttribute('value', window.constants.DEFAULT_SCALE);

  var currentScaleValue = scaleControlValue.value.slice(0, -1);

  var scalePicture = function (value) {
    scaleControlValue.setAttribute('value', value + '%');
    scaleControlValue.value = value + '%';
    picturePreview.style.transform = 'scale(' + value * 0.01 + ')';
  };

  scaleControlSmaller.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (currentScaleValue > window.constants.MIN_SCALE && currentScaleValue <= window.constants.MAX_SCALE) {
      currentScaleValue -= window.constants.STEP_SCALE;
      scalePicture(currentScaleValue);
    }
  });

  scaleControlBigger.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (currentScaleValue >= window.constants.MIN_SCALE && currentScaleValue < window.constants.MAX_SCALE) {
      currentScaleValue += window.constants.STEP_SCALE;
      scalePicture(currentScaleValue);
    }
  });

})();
