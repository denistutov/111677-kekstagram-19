'use strict';

(function () {

  var uploadPicture = document.querySelector('.img-upload');

  var editingForm = uploadPicture.querySelector('.img-upload__form');

  var inputPicture = uploadPicture.querySelector('#upload-file');
  var formPicture = uploadPicture.querySelector('.img-upload__overlay');
  var cancelUploadButton = uploadPicture.querySelector('#upload-cancel');

  var picturePreview = uploadPicture.querySelector('.img-upload__preview');
  var effectItemList = uploadPicture.querySelector('.effects__list');
  var effectLevelBar = uploadPicture.querySelector('.img-upload__effect-level');

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

  // Открытие окна редактирования изображения
  var showFormPicture = function () {
    window.utils.body.classList.add('modal-open');
    formPicture.classList.remove('hidden');
    effectLevelBar.classList.add('hidden');

    scaleControlValue.value = window.utils.DEFAULT_SCALE + ' %';
    scaleControlValue.setAttribute('value', window.utils.DEFAULT_SCALE + ' %');
    window.slider.setDefaultPinValues();

    document.addEventListener('keydown', window.utils.onFormEscPress);
    window.form.hashTagsText.addEventListener('input', window.form.onTextHashTagsInput);
    effectItemList.addEventListener('click', onEffectItemListMouseClick);
    editingForm.addEventListener('submit', sendData);
  };

  // Закрытие окна редактирования изображения
  var closeFormPicture = function () {
    inputPicture.value = '';
    window.form.hashTagsText.value = '';
    window.scale.currentScaleValue = window.utils.DEFAULT_SCALE;
    picturePreview.removeAttribute('style');

    document.removeEventListener('keydown', window.utils.onFormEscPress);
    window.form.hashTagsText.removeEventListener('input', window.form.onTextHashTagsInput);
    effectItemList.removeEventListener('click', onEffectItemListMouseClick);
    editingForm.removeEventListener('submit', sendData);

    formPicture.classList.add('hidden');
  };

  cancelUploadButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeFormPicture();
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

  function sendData(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(editingForm), onSuccess, onError);
  }

  function onSuccess() {
    closeFormPicture();
    window.info.renderInfoMessage('#success', '.success');
  }

  function onError(errorMessage) {
    closeFormPicture();
    window.info.renderInfoMessage('#error', '.error', errorMessage);
  }

  var onEffectItemListMouseClick = function (evt) {
    var target = evt.target;
    if (target.parentNode.className === 'effects__label') {
      var effectName = target.className
        .split('effects__preview')
        .pop()
        .substr(2);
      currentEffectName = effectName;
      window.slider.setDefaultPinValues();
      setEffectFilter(effectName);
    }
  };

  window.picture = {
    showFormPicture: showFormPicture,
    closeFormPicture: closeFormPicture,
    changeEffectValue: changeEffectValue
  };
})();
