'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var DEBOUNCE_INTERVAL = 500;
  var DEFAULT_SCALE = 100;
  var body = document.querySelector('body');

  var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var getPercentFromLengh = function (number, lengh) {
    return (number / lengh) * 100;
  };

  var getValueFromPercent = function (maxValue, minValue, percent) {
    return percent * ((maxValue - minValue) / 100) + minValue;
  };

  var getPercentFromValues = function (maxValue, minValue, value) {
    return Math.round((value - minValue) * 100 / (maxValue - minValue));
  };

  var onFormEscPress = function (evt) {
    if (!(window.form.hashTagsText === document.activeElement || window.form.commentsText === document.activeElement) && evt.key === window.utils.ESC_KEY) {
      window.editor.closeFormPicture();
    }
  };

  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();

    return {
      right: box.right,
      left: box.left
    };
  };

  var debounce = function (func, wait) {
    wait = wait || DEBOUNCE_INTERVAL;
    var timeout;

    function wrapper() {
      var args = arguments;
      var later = function () {
        timeout = null;
        func.apply(wrapper, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    }
    return wrapper;
  };

  window.utils = {
    body: body,
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    DEFAULT_SCALE: DEFAULT_SCALE,
    onFormEscPress: onFormEscPress,
    getRandomNumber: getRandomNumber,
    getPercentFromLengh: getPercentFromLengh,
    getValueFromPercent: getValueFromPercent,
    getPercentFromValues: getPercentFromValues,
    getCoords: getCoords,
    debounce: debounce
  };
})();
