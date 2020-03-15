'use strict';

(function () {
  var DEFAULT_PIN_VALUE = 100;

  var uploadPicture = document.querySelector('.img-upload');

  var inputPicture = uploadPicture.querySelector('#upload-file');
  var formPicture = uploadPicture.querySelector('.img-upload__overlay');
  var cancelUploadButton = uploadPicture.querySelector('#upload-cancel');

  var picturePreview = uploadPicture.querySelector('.img-upload__preview');
  // var effectItem = uploadPicture.querySelectorAll('.effects__item');
  var effectItemList = uploadPicture.querySelector('.effects__list');
  var effectLevelBar = uploadPicture.querySelector('.img-upload__effect-level');
  var effectLevelPin = uploadPicture.querySelector('.effect-level__pin');
  var effectLevelDepth = uploadPicture.querySelector('.effect-level__depth');
  var effectLevelValue = uploadPicture.querySelector('.effect-level__value');
  var effectLevelLine = uploadPicture.querySelector('.effect-level__line');

  var scaleControlValue = uploadPicture.querySelector('.scale__control--value');

  var shiftX; // Смещение пина по оси Х
  var lineCoords; // Кординаты области фильтра
  var pinCoords; // Кординаты пина

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

  // Открытие окна редактирования изображения
  var showFormPicture = function () {
    window.utils.body.classList.add('modal-open');
    formPicture.classList.remove('hidden');
    effectLevelBar.classList.add('hidden');
    scaleControlValue.value = window.utils.DEFAULT_SCALE + ' %';
    scaleControlValue.setAttribute('value', window.utils.DEFAULT_SCALE + ' %');
    setDefaultPinValues();
    document.addEventListener('keydown', window.utils.onFormEscPress);
    window.form.hashTagsText.addEventListener('input', window.form.onTextHashTagsInput);
    window.form.commentsText.addEventListener('input', window.form.onTextCommentInput);
  };

  // Закрытие окна редактирования изображения
  var closeFormPicture = function () {
    inputPicture.value = '';
    window.form.hashTagsText.value = '';
    window.scale.currentScaleValue = window.utils.DEFAULT_SCALE;
    picturePreview.removeAttribute('style');
    formPicture.classList.add('hidden');
    window.form.hashTagsText.removeEventListener('input', window.form.onTextHashTagsInput);
    window.form.commentsText.removeEventListener('input', window.form.onTextCommentInput);
    effectLevelPin.removeEventListener('mousedown', onPinLevelMouseDown);
  };

  cancelUploadButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeFormPicture();
  });

  inputPicture.addEventListener('change', function () {
    showFormPicture();
  });

  var getPictureEffect = function (effect, value) {
    switch (effect) {
      case 'chrome':
        picturePreview.style.filter = 'grayscale(' + value + ')';
        break;
      case 'sepia':
        picturePreview.style.filter = 'sepia(' + value + ')';
        break;
      case 'marvin':
        picturePreview.style.filter = 'invert(' + value + '%)';
        break;
      case 'phobos':
        picturePreview.style.filter = 'blur(' + value + 'px)';
        break;
      case 'heat':
        picturePreview.style.filter = 'brightness(' + value + ')';
        break;
      default:
        picturePreview.style.filter = '';
    }
  };

  var setEffectFilter = function (effect) {
    if (effect !== 'none') {
      getPictureEffect(effect, effectValuesArray[effect].max);
      if (effectLevelBar.classList.contains('hidden')) {
        effectLevelBar.classList.remove('hidden');
      }
    } else {
      getPictureEffect(effect);
      effectLevelBar.classList.add('hidden');
    }
  };

  var changeEffectValue = function (value) {
    var newMaxEffectValue = effectValuesArray[currentEffectName].max;
    var newMinEffectValue = effectValuesArray[currentEffectName].min;
    var newEffectValue = window.utils.getValueFromPercent(newMaxEffectValue, newMinEffectValue, value);
    getPictureEffect(currentEffectName, newEffectValue);
  };

  effectItemList.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.parentNode.className === 'effects__label') {
      var effectName = target.className
        .split('effects__preview')
        .pop()
        .substr(2);
      currentEffectName = effectName;
      setDefaultPinValues();
      setEffectFilter(effectName);
    }
  });

  var setDefaultPinValues = function () {
    effectLevelPin.style.left = DEFAULT_PIN_VALUE + '%';
    effectLevelDepth.style.width = DEFAULT_PIN_VALUE + '%';
    effectLevelValue.setAttribute('value', DEFAULT_PIN_VALUE);
  };

  var onPinLevelMouseDown = function (evt) {
    pinCoords = window.utils.getCoords(effectLevelPin);
    lineCoords = window.utils.getCoords(effectLevelLine);
    shiftX = evt.pageX - pinCoords.left;

    document.addEventListener('mousemove', onPinLevelMouseMove);
  };

  var onPinLevelMouseMove = function (evt) {
    var currentPinCoords = evt.pageX - shiftX - lineCoords.left;

    if (currentPinCoords < 0) {
      currentPinCoords = 0;
    }
    var lineWidth = effectLevelLine.offsetWidth;

    if (currentPinCoords > lineWidth) {
      currentPinCoords = lineWidth;
    }

    var currentValue = window.utils.getPercentFromLengh(currentPinCoords, lineWidth);
    effectLevelPin.style.left = currentValue + '%';
    effectLevelDepth.style.width = currentValue + '%';
    effectLevelValue.setAttribute('value', Math.round(currentValue));
    changeEffectValue(currentValue);
  };

  effectLevelPin.addEventListener('mousedown', onPinLevelMouseDown);

  document.addEventListener('mouseup', function () {
    document.removeEventListener('mousemove', onPinLevelMouseMove);
  });

  window.picture = {
    showFormPicture: showFormPicture,
    closeFormPicture: closeFormPicture
  };
})();
