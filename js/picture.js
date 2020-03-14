'use strict';

(function () {
  var uploadPicture = document.querySelector('.img-upload');

  var inputPicture = uploadPicture.querySelector('#upload-file');
  var formPicture = uploadPicture.querySelector('.img-upload__overlay');
  var cancelUploadButton = uploadPicture.querySelector('#upload-cancel');

  var picturePreview = uploadPicture.querySelector('.img-upload__preview');
  // var effectItem = uploadPicture.querySelectorAll('.effects__item');
  var effectItemList = uploadPicture.querySelector('.effects__list');
  var effectLevelBar = uploadPicture.querySelector('.img-upload__effect-level');
  var effectLevelPin = uploadPicture.querySelector('.effect-level__pin');
  // var effectLevelDepth = uploadPicture.querySelector('.effect-level__depth');
  var effectLevelLine = uploadPicture.querySelector('.effect-level__line');

  var scaleControlValue = uploadPicture.querySelector('.scale__control--value');

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
    scaleControlValue.value = window.utils.DEFAULT_SCALE + ' %';
    scaleControlValue.setAttribute('value', window.utils.DEFAULT_SCALE + ' %');
    document.addEventListener('keydown', window.utils.onFormEscPress);
  };

  var closeFormPicture = function () {
    inputPicture.value = '';
    window.form.hashTagsText.value = '';
    picturePreview.removeAttribute('style');
    window.scale.currentScaleValue = window.utils.DEFAULT_SCALE;
    formPicture.classList.add('hidden');
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

  var setEffectFilter = function (effect) {
    if (effect !== 'none') {
      setPictureEffect(effect, effectValuesArray[effect].max);
      if (effectLevelBar.classList.contains('hidden')) {
        effectLevelBar.classList.remove('hidden');
      }
    } else {
      setPictureEffect(effect);
      effectLevelBar.classList.add('hidden');
    }
  };

  effectItemList.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.parentNode.className === 'effects__label') {
      var effectName = target.className.split('effects__preview').pop().substr(2);
      currentEffectName = effectName;
      setEffectFilter(effectName);
    }
  });

  effectLevelPin.addEventListener('mouseup', function (evt) {
    evt.preventDefault();
    var newMaxEffectValue = effectValuesArray[currentEffectName].max;
    var newMinEffectValue = effectValuesArray[currentEffectName].min;
    var currentPercent = getPercentEffectIntensity();
    var newEffectValue = window.utils.getValueFromPercent(newMaxEffectValue, newMinEffectValue, currentPercent);
    setPictureEffect(currentEffectName, newEffectValue);
  });

  var onPinLevelMoseMove = function () {
    effectLevelPin.style.left = getPercentEffectIntensity() + '%';
  };

  effectLevelPin.addEventListener('mousemove', onPinLevelMoseMove);

  window.picture = {
    showFormPicture: showFormPicture,
    closeFormPicture: closeFormPicture
  };
})();
