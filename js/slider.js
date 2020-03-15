'use strict';

(function () {
  var uploadPicture = document.querySelector('.img-upload');

  var effectLevelDepth = uploadPicture.querySelector('.effect-level__depth');
  var effectLevelValue = uploadPicture.querySelector('.effect-level__value');
  var effectLevelLine = uploadPicture.querySelector('.effect-level__line');
  var effectLevelPin = uploadPicture.querySelector('.effect-level__pin');

  var DEFAULT_PIN_VALUE = 100;
  var shiftX; // Смещение пина по оси Х
  var lineCoords; // Кординаты области фильтра
  var pinCoords; // Кординаты пина

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
    window.picture.changeEffectValue(currentValue);
  };

  effectLevelPin.addEventListener('mousedown', onPinLevelMouseDown);

  document.addEventListener('mouseup', function () {
    document.removeEventListener('mousemove', onPinLevelMouseMove);
  });

  window.slider = {
    setDefaultPinValues: setDefaultPinValues
  };
})();
