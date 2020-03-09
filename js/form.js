'use strict';

(function () {
  var uploadPicture = document.querySelector('.img-upload');
  var hashTagsText = uploadPicture.querySelector('.text__hashtags');
  var commentsText = uploadPicture.querySelector('.text__description');
  var formUploadImage = uploadPicture.querySelector('.img-upload__form');

  function getHashTagValidityMessage(hashtag) {
    if (hashtag.slice(0, 1) !== '#') {
      return 'Хэштэг должен начинаться с символа #';
    } else if (hashtag.length === 1) {
      return 'Хэштэг не может быть пустым';
    } else if (hashtag.match(/#[a-zA-Zа-яА-Я0-9]*/)[0] !== hashtag) {
      return 'Хэштэг должен содержать только буквы и числа';
    } else if (hashtag.length > window.constants.MAX_HASHTAG_LENGTH) {
      return 'Максимальная длина хэштэга: ' + window.constants.MAX_HASHTAG_LENGTH + ' (' + hashtag + ')';
    }

    return '';
  }

  function checkHashTags(hashTagStr) {
    if (hashTagStr.length === 0) {
      return '';
    }

    var hashTags = hashTagStr.split(' ');
    var validityString = '';
    var uniqHashTags = [];
    var upperHashTag = [];
    for (var i = 0; i < hashTags.length; i++) {
      validityString = getHashTagValidityMessage(hashTags[i]);
      if (validityString) {
        return validityString;
      }
      upperHashTag = hashTags[i].toUpperCase();
      if (uniqHashTags.includes(upperHashTag)) {
        return 'Хэштэги не должны повторяться (' + hashTags[i] + ')';
      }
      uniqHashTags.push(upperHashTag);
    }

    if (uniqHashTags.length > window.constants.MAX_HASHTAG_COUNT) {
      return 'Максимальное количество хэштэгов: ' + window.constants.MAX_HASHTAG_COUNT;
    }

    return '';
  }

  function onTextHashTagsInput() {
    hashTagsText.setCustomValidity(checkHashTags(hashTagsText.value));
    formUploadImage.reportValidity(hashTagsText);
  }

  hashTagsText.addEventListener('input', onTextHashTagsInput);

  window.form = {
    hashTagsText: hashTagsText,
    commentsText: commentsText
  };
})();
