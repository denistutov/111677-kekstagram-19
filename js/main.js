'use strict';

var PICTURE_COUNT = 25;

var picturesContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var messagesArray = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var namesArray = [
  'Иван',
  'Юлия',
  'Клавдия',
  'Рудольф',
  'Иннокентий',
  'Елена'
];

var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getRandomArrayValue = function (array) {
  return array[getRandomNumber(0, array.length - 1)];
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

var createCommentsArray = function (count) {
  var comments = [];

  for (var i = 0; i < count; i++) {
    var commentLength = getRandomNumber(1, 2);
    var commentText = '';

    for (var j = 0; j < commentLength; j++) {
      commentText = commentText + getRandomArrayValue(messagesArray);
    }

    comments[i] = {
      avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
      message: commentText,
      name: getRandomArrayValue(namesArray)
    };
  }

  return comments;
};

var createPicturesArray = function (count) {
  var pictures = [];
  var pictureUrl = generateArrayRandomNumber(1, count);

  for (var i = 0; i < count; i++) {
    pictures[i] = {
      url: 'photos/' + pictureUrl[i] + '.jpg',
      description: 'Тут должно быть описание', // Но не понятно откуда его брать
      likes: getRandomNumber(15, 200),
      comments: createCommentsArray(getRandomNumber(1, 10))
    };
  }

  return pictures;
};

var picturesArray = createPicturesArray(PICTURE_COUNT);

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__img').alt = picture.description;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};


var insertPictures = function (array, container) {
  var pictureFragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    pictureFragment.appendChild(renderPicture(array[i]));
  }

  return container.appendChild(pictureFragment);
};

insertPictures(picturesArray, picturesContainer);

// Личный проект: больше деталей (часть 2)

var body = document.querySelector('body');

var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
var bigPictureSocialCommentsCount = bigPicture.querySelector('.social__comment-count');
var bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
var bigPictureSocialComments = bigPicture.querySelector('.social__comments');
var bigPictureDescription = bigPicture.querySelector('.social__caption');
var bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
var socialCommentTemplate = document.querySelector('#social-comment').content;

var renderSocialComment = function (comment) {
  var commentElement = socialCommentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
};

var insertSocialComments = function (commentsArray) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < commentsArray.length; i++) {
    fragment.appendChild(renderSocialComment(commentsArray[i]));
  }

  return fragment;
};

var showBigPicture = function () {
  bigPicture.classList.remove('hidden');
  bigPictureSocialCommentsCount.classList.add('hidden');
  bigPictureCommentsLoader.classList.add('hidden');
  body.classList.add('modal-open');
};

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

var renderBigPicture = function (picture) {
  bigPictureImg.src = picture.url;
  bigPictureImg.alt = picture.description;
  bigPictureLikesCount.textContent = picture.likes;
  bigPictureCommentsCount.textContent = picture.comments.length;
  bigPictureDescription.textContent = picture.description;
  bigPictureSocialComments.innerHTML = '';
  bigPictureSocialComments.appendChild(insertSocialComments(picture.comments));
  showBigPicture();
};

bigPictureCloseButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  closeBigPicture();
});

picturesContainer.addEventListener('click', function (evt) {
  var picture = evt.target;
});

// Личный проект: доверяй, но проверяй (часть 1)

var ESC_KEY = 'Escape';

var uploadPicture = document.querySelector('.img-upload');
var formUploadImage = uploadPicture.querySelector('.img-upload__form');
var inputPicture = uploadPicture.querySelector('#upload-file');
var formPicture = uploadPicture.querySelector('.img-upload__overlay');
var cancelUploadButton = uploadPicture.querySelector('#upload-cancel');

var picturePreview = uploadPicture.querySelector('.img-upload__preview');
var effectItem = uploadPicture.querySelectorAll('.effects__item');
var effectLevelBar = uploadPicture.querySelector('.img-upload__effect-level');
var effectLevelPin = uploadPicture.querySelector('.effect-level__pin');
var effectLevelLine = uploadPicture.querySelector('.effect-level__line');

var scaleControlSmaller = uploadPicture.querySelector('.scale__control--smaller');
var scaleControlBigger = uploadPicture.querySelector('.scale__control--bigger');
var scaleControlValue = uploadPicture.querySelector('.scale__control--value');

var hashTagsText = uploadPicture.querySelector('.text__hashtags');

var DEFAULT_SCALE = '100%';
var MAX_SCALE = 100;
var MIN_SCALE = 25;
var STEP_SCALE = 25;
var MAX_HASHTAG_LENGTH = 20;
var MAX_HASHTAG_COUNT = 5;

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

var getValueFromPercent = function (maxValue, minValue, percent) {
  return percent * ((maxValue - minValue) / 100) + minValue;
};

var getPercentFromValues = function (maxValue, minValue, value) {
  return Math.round((value - minValue) * 100 / (maxValue - minValue));
};

var getPercentEffectIntensity = function () {
  var currentPinPosition = effectLevelPin.getBoundingClientRect().left + effectLevelPin.getBoundingClientRect().width / 2;
  var left = effectLevelLine.getBoundingClientRect().left;
  var right = effectLevelLine.getBoundingClientRect().right;

  return getPercentFromValues(right, left, currentPinPosition);
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
    picturePreview.style = '';
  }
};

effectItem.forEach(function (picture) {
  picture.addEventListener('click', function (evt) {
    evt.preventDefault();
    var effectName = picture.firstElementChild.value;
    currentEffectName = effectName;

    if (effectName !== 'none') {
      setPictureEffect(effectName, effectValuesArray[effectName].max);
      if (effectLevelBar.classList.contains('hidden')) {
        effectLevelBar.classList.remove('hidden');
      }
    } else {
      setPictureEffect(effectName);
      effectLevelBar.classList.add('hidden');
    }
  });
});

effectLevelPin.addEventListener('mouseup', function (evt) {
  evt.preventDefault();
  var newMaxEffectValue = effectValuesArray[currentEffectName].max;
  var newMinEffectValue = effectValuesArray[currentEffectName].min;
  var currentPercent = getPercentEffectIntensity();
  var newEffectValue = getValueFromPercent(newMaxEffectValue, newMinEffectValue, currentPercent);
  setPictureEffect(currentEffectName, newEffectValue);
});

var showFormPicture = function () {
  formPicture.classList.remove('hidden');
  effectLevelBar.classList.add('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onFormPicturePressEsc);
};

var closeFormPicture = function () {
  formPicture.classList.add('hidden');
  inputPicture.value = '';
  hashTagsText.value = '';
};

var onFormPicturePressEsc = function (evt) {
  if (evt.key === ESC_KEY) {
    closeFormPicture();
  }
};

cancelUploadButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  closeFormPicture();
});

inputPicture.addEventListener('change', function () {
  showFormPicture();
});

scaleControlValue.value = DEFAULT_SCALE;
var currentScaleValue = scaleControlValue.value.slice(0, -1);

var scalePicture = function (value) {
  scaleControlValue.value = value + '%';
  picturePreview.style.transform = 'scale(' + value * 0.01 + ')';
};

scaleControlSmaller.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (currentScaleValue > MIN_SCALE && currentScaleValue <= MAX_SCALE) {
    currentScaleValue -= STEP_SCALE;
    scalePicture(currentScaleValue);
  }
});

scaleControlBigger.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (currentScaleValue >= MIN_SCALE && currentScaleValue < MAX_SCALE) {
    currentScaleValue += STEP_SCALE;
    scalePicture(currentScaleValue);
  }
});

function getHashTagValidityMessage(hashtag) {
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

  if (uniqHashTags.length > MAX_HASHTAG_COUNT) {
    return 'Максимальное количество хэштэгов: ' + MAX_HASHTAG_COUNT;
  }

  return '';
}

function onTextHashTagsInput() {
  hashTagsText.setCustomValidity(checkHashTags(hashTagsText.value));
  formUploadImage.reportValidity(hashTagsText);
}

hashTagsText.addEventListener('input', onTextHashTagsInput);
