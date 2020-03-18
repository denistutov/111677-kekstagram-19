'use strict';

(function () {
  var MAX_HASHTAG_COUNT = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadPicture = document.querySelector('.img-upload');
  var uploadInput = document.querySelector('.img-upload__input');
  var hashTagsText = uploadPicture.querySelector('.text__hashtags');
  var commentsText = uploadPicture.querySelector('.text__description');
  var formUploadImage = uploadPicture.querySelector('.img-upload__form');
  var imagePreview = uploadPicture.querySelector('.img-upload__preview');
  var inputPicture = uploadPicture.querySelector('#upload-file');

  var reader; // Загрузка FileReader

  inputPicture.addEventListener('change', function () {
    var imageFile = uploadInput.files[0];
    uploadImage(imageFile);
  });

  var uploadImage = function (imageFile) {
    var fileName = imageFile.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      window.editor.showFormPicture();

      reader = new FileReader();
      reader.addEventListener('load', function () {
        imagePreview.firstElementChild.src = reader.result;
      });

      reader.readAsDataURL(imageFile);
    } else {
      var errorMessage = 'Фотография не правильного формата';
      window.info.renderMessageForm('#error', '.error', errorMessage);
    }
  };

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

  var onTextHashTagsInput = function () {
    hashTagsText.setCustomValidity(checkHashTags(hashTagsText.value));
    formUploadImage.reportValidity(hashTagsText);

    if (checkHashTags(hashTagsText.value) !== '') {
      hashTagsText.style.borderColor = 'red';
    } else {
      hashTagsText.removeAttribute('style');
    }
  };

  window.form = {
    hashTagsText: hashTagsText,
    commentsText: commentsText,
    onTextHashTagsInput: onTextHashTagsInput
  };
})();
