'use strict';

(function () {
  var body = document.querySelector('body');

  var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var getRandomArrayValue = function (array) {
    return array[getRandomNumber(0, array.length - 1)];
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
      if (evt.key === window.constants.ESC_KEY) {
        window.picture.closeFormPicture();
      }
    }
  };

  window.utils = {
    body: body,
    onFormEscPress: onFormEscPress,
    getRandomNumber: getRandomNumber,
    getValueFromPercent: getValueFromPercent,
    getPercentFromValues: getPercentFromValues,
    generateArrayRandomNumber: generateArrayRandomNumber,
    getRandomArrayValue: getRandomArrayValue
  };
})();
