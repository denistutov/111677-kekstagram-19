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

  var getRandomArrayValue = function (array) {
    return array[getRandomNumber(0, array.length - 1)];
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

  var generateArrayRandomNumber = function (min, max) {
    var totalNumbers = max - min + 1;
    var arrayTotalNumbers = [];
    var arrayRandomNumbers = [];
    var tempRandomNumber = 0;

    while (totalNumbers--) {
      arrayTotalNumbers.push(totalNumbers + min);
    }

    while (arrayTotalNumbers.length) {
      tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
      arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
      arrayTotalNumbers.splice(tempRandomNumber, 1);
    }

    return arrayRandomNumbers;
  };

  var onFormEscPress = function (evt) {
    if (window.form.hashTagsText === document.activeElement || window.form.commentsText === document.activeElement) {
      return;
    } else {
      if (evt.key === window.utils.ESC_KEY) {
        window.picture.closeFormPicture();
      }
    }
  };

  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();

    return {
      right: box.right,
      left: box.left
    };
  };

  var getTemplateClone = function (template, innerSelector) {
    var templateElement = document.querySelector(template);
    var elementToClone = templateElement.querySelector(innerSelector);
    if ('content' in templateElement) {
      elementToClone = templateElement.content.querySelector(innerSelector);
    }
    return elementToClone;
  };

  var renderInfoMessage = function (templateElement, innerSelector, message, buttonText) {
    var overlay = body;
    var template = getTemplateClone(templateElement, innerSelector);
    var templateMessage = template.cloneNode(true);
    var templateBtn = templateMessage.querySelector((innerSelector + '__button'));
    overlay.appendChild(templateMessage);


    if (message !== undefined) {
      templateMessage.querySelector(innerSelector + '__title').textContent = message;
    }

    if (buttonText !== undefined) {
      templateBtn.textContent = buttonText;
    }

    document.addEventListener('keydown', function (evt) {
      if (evt.key === ESC_KEY) {
        overlay.removeChild(templateMessage);
      }
    });

    templateBtn.addEventListener('click', function () {
      overlay.removeChild(templateMessage);
    });
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
    generateArrayRandomNumber: generateArrayRandomNumber,
    getRandomArrayValue: getRandomArrayValue,
    renderInfoMessage: renderInfoMessage,
    getCoords: getCoords,
    debounce: debounce
  };
})();
