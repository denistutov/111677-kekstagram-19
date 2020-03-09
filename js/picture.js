'use strict';

(function () {
  var uploadPicture = document.querySelector('.img-upload');

  var inputPicture = uploadPicture.querySelector('#upload-file');
  var formPicture = uploadPicture.querySelector('.img-upload__overlay');
  var cancelUploadButton = uploadPicture.querySelector('#upload-cancel');

  var picturePreview = uploadPicture.querySelector('.img-upload__preview');
  var effectItem = uploadPicture.querySelectorAll('.effects__item');
  var effectLevelBar = uploadPicture.querySelector('.img-upload__effect-level');
  var effectLevelPin = uploadPicture.querySelector('.effect-level__pin');
  var effectLevelLine = uploadPicture.querySelector('.effect-level__line');

  var currentEffectName = '';
  var effectValuesArray = {
    'chrome': {
      min: 0,
      max: 1
    },
    'sepia': {
      min: 0,
      max: 1
    },
    'marvin': {
      min: 0,
      max: 100
    },
    'phobos': {
      min: 0,
      max: 3
    },
    'heat': {
      min: 1,
      max: 3
    }
  };

  var showFormPicture = function () {
    window.utils.body.classList.add('modal-open');
    formPicture.classList.remove('hidden');
    effectLevelBar.classList.add('hidden');
    document.addEventListener('keydown', window.utils.onFormEscPress);
  };

  var closeFormPicture = function () {
    formPicture.classList.add('hidden');
    inputPicture.value = '';
    window.form.hashTagsText.value = '';
  };

  cancelUploadButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeFormPicture();
  });

  inputPicture.addEventListener('change', function () {
    showFormPicture();
  });

  var getPercentEffectIntensity = function () {
    var currentPinPosition = effectLevelPin.getBoundingClientRect().left + effectLevelPin.getBoundingClientRect().width / 2;
    var left = effectLevelLine.getBoundingClientRect().left;
    var right = effectLevelLine.getBoundingClientRect().right;

    return window.utils.getPercentFromValues(right, left, currentPinPosition);
  };


  var setPictureEffect = function (effect, value) {
    if (effect === 'chrome') {
      picturePreview.style.filter = 'grayscale(' + value + ')';
    } else if (effect === 'sepia') {
      picturePreview.style.filter = 'sepia(' + value + ')';
    } else if (effect === 'marvin') {
      picturePreview.style.filter = 'invert(' + value + '%)';
    } else if (effect === 'phobos') {
      picturePreview.style.filter = 'blur(' + value + 'px)';
    } else if (effect === 'heat') {
      picturePreview.style.filter = 'brightness(' + value + ')';
    } else {
      picturePreview.style.filter = '';
    }
  };

  effectItem.forEach(function (picture) {
    picture.addEventListener('click', function (evt) {
      evt.preventDefault();
      var effectName = picture.firstElementChild.value;
      currentEffectName = effectName;

      if (effectName !== 'none') {
        setPictureEffect(effectName, effectValuesArray[effectName].max);
        if (effectLevelBar.classList.contains('hidden')) {
          effectLevelBar.classList.remove('hidden');
        }
      } else {
        setPictureEffect(effectName);
        effectLevelBar.classList.add('hidden');
      }
    });
  });

  effectLevelPin.addEventListener('mouseup', function (evt) {
    evt.preventDefault();
    var newMaxEffectValue = effectValuesArray[currentEffectName].max;
    var newMinEffectValue = effectValuesArray[currentEffectName].min;
    var currentPercent = getPercentEffectIntensity();
    var newEffectValue = window.utils.getValueFromPercent(newMaxEffectValue, newMinEffectValue, currentPercent);
    setPictureEffect(currentEffectName, newEffectValue);
  });

  window.picture = {
    showFormPicture: showFormPicture,
    closeFormPicture: closeFormPicture
  };
})();
