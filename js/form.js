'use strict';

(function () {
  var MAX_HASHTAG_COUNT = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_COMMENTS_SYMBOLS = 140;

  var uploadPicture = document.querySelector('.img-upload');
  var hashTagsText = uploadPicture.querySelector('.text__hashtags');
  var commentsText = uploadPicture.querySelector('.text__description');
  var formUploadImage = uploadPicture.querySelector('.img-upload__form');

  var getHashTagValidityMessage = function (hashtag) {
    if (hashtag.slice(0, 1) !== '#') {
      return 'Хэштэг должен начинаться с символа #';
    } else if (hashtag.length === 1) {
      return 'Хэштэг не может быть пустым';
    } else if (hashtag.match(/#[a-zA-Zа-яА-Я0-9]*/)[0] !== hashtag) {
      return 'Хэштэг должен содержать только буквы и числа';
    } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
      return 'Максимальная длина хэштэга: ' + MAX_HASHTAG_LENGTH + ' (' + hashtag + ')';
    }

    return '';
  };

  var checkHashTags = function (hashTagStr) {
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

    if (uniqHashTags.length > MAX_HASHTAG_COUNT) {
      return 'Максимальное количество хэштэгов: ' + MAX_HASHTAG_COUNT;
    }

    return '';
  };

  var checkComments = function () {
    if (commentsText.textLength > MAX_COMMENTS_SYMBOLS) {
      return 'Максимальная длинна комментария должна быть: ' + MAX_COMMENTS_SYMBOLS;
    }

    return '';
  };

  var onTextHashTagsInput = function () {
    hashTagsText.setCustomValidity(checkHashTags(hashTagsText.value));
    formUploadImage.reportValidity(hashTagsText);
  };

  var onTextCommentInput = function () {
    commentsText.setCustomValidity(checkComments(commentsText.textContent));
    commentsText.reportValidity(commentsText);
  };

  window.form = {
    hashTagsText: hashTagsText,
    commentsText: commentsText,
    onTextHashTagsInput: onTextHashTagsInput,
    onTextCommentInput: onTextCommentInput
  };
})();
