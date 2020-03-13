'use strict';

(function () {
  var PICTURE_COUNT = 25;

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

  var createPicturesArray = function (count) {
    var pictures = [];
    var pictureUrl = window.utils.generateArrayRandomNumber(1, count);

    for (var i = 0; i < count; i++) {
      pictures[i] = {
        url: 'photos/' + pictureUrl[i] + '.jpg',
        description: 'Тут должно быть описание', // Но не понятно откуда его брать
        likes: window.utils.getRandomNumber(15, 200),
        comments: createCommentsArray(window.utils.getRandomNumber(1, 10))
      };
    }

    return pictures;
  };

  var createCommentsArray = function (count) {
    var comments = [];

    for (var i = 0; i < count; i++) {
      var commentLength = window.utils.getRandomNumber(1, 2);
      var commentText = '';

      for (var j = 0; j < commentLength; j++) {
        commentText = commentText + window.utils.getRandomArrayValue(messagesArray);
      }

      comments[i] = {
        avatar: 'img/avatar-' + window.utils.getRandomNumber(1, 6) + '.svg',
        message: commentText,
        name: window.utils.getRandomArrayValue(namesArray)
      };
    }

    return comments;
  };

  var picturesArray = createPicturesArray(PICTURE_COUNT);

  window.data = {
    messagesArray: messagesArray,
    namesArray: namesArray,
    picturesArray: picturesArray
  };
})();
