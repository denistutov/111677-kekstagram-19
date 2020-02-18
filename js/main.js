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

var socialCommentTemplate = document.querySelector('#social-comment').content;

var renderBigPicture = function (picture) {
  bigPictureImg.src = picture.url;
  bigPictureImg.alt = picture.description;
  bigPictureLikesCount.textContent = picture.likes;
  bigPictureCommentsCount.textContent = picture.comments.length;
  bigPictureDescription.textContent = picture.description;
  bigPictureSocialComments.innerHTML = '';
  bigPictureSocialComments.appendChild(insertSocialComments(picture.comments));
};

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

bigPicture.classList.remove('hidden');
bigPictureSocialCommentsCount.classList.add('hidden');
bigPictureCommentsLoader.classList.add('hidden');
body.classList.add('modal-open');

renderBigPicture(picturesArray[0]);
