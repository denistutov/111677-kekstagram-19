'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  var bigPictureSocialCommentsCount = bigPicture.querySelector('.social__comment-count');
  var bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
  var bigPictureSocialComments = bigPicture.querySelector('.social__comments');
  var bigPictureDescription = bigPicture.querySelector('.social__caption');
  var bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
  var bigPictureLoaderButton = bigPicture.querySelector('.social__comments-loader');
  var socialCommentTemplate = document.querySelector('#social-comment').content;

  var COMMENTS_COUNT = 5;

  var socialCommentsOriginal = []; // Все загруженные комментарии
  var socialCommentsCopy = []; // Копия массива из которого будут удаяться объекты
  var socialCommentsBlock = []; // Блок выводимых комментарием

  var showBigPicture = function () {
    bigPicture.classList.remove('hidden');
    bigPictureSocialCommentsCount.classList.add('hidden');
    bigPictureCommentsLoader.classList.add('hidden');
    window.utils.body.classList.add('modal-open');

    window.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.ESC_KEY) {
        closeBigPicture();
      }
    });
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    window.utils.body.classList.remove('modal-open');
    bigPictureCloseButton.removeEventListener('click', onBigPictureCloseButtonMouseClick);
    bigPictureLoaderButton.removeEventListener('click', onBigPictureLoaderButtonMouseClick);
  };

  var renderSocialComment = function (comment) {
    var commentElement = socialCommentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };

  var getBlockSocialComments = function (array) {
    var comments = [];
    var commentsCount = COMMENTS_COUNT;

    if (array.length < commentsCount) {
      commentsCount = array.length;
    }

    for (var i = 0; i < commentsCount; i++) {
      comments.push(array.shift());
    }

    if (array.length === 0 || array.length < COMMENTS_COUNT) {
      bigPictureLoaderButton.classList.add('hidden');
    }

    return comments;
  };

  var insertSocialComments = function (commentsArray) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < commentsArray.length; i++) {
      fragment.appendChild(renderSocialComment(commentsArray[i]));
    }

    return fragment;
  };

  var renderBigPicture = function (picture) {
    bigPictureImg.src = picture.url;
    bigPictureImg.alt = picture.description;
    bigPictureLikesCount.textContent = picture.likes;
    bigPictureCommentsCount.textContent = picture.comments.length;
    bigPictureDescription.textContent = picture.description;
    bigPictureSocialComments.innerHTML = '';

    socialCommentsOriginal = picture.comments;
    socialCommentsCopy = socialCommentsOriginal.slice();
    socialCommentsBlock = getBlockSocialComments(socialCommentsCopy);
    bigPictureSocialComments.appendChild(insertSocialComments(socialCommentsBlock));

    showBigPicture();
    bigPictureLoaderButton.classList.remove('hidden');
    bigPictureLoaderButton.addEventListener('click', onBigPictureLoaderButtonMouseClick);
    bigPictureCloseButton.addEventListener('click', onBigPictureCloseButtonMouseClick);
  };

  var onBigPictureCloseButtonMouseClick = function (evt) {
    evt.preventDefault();
    closeBigPicture();
  };

  var onBigPictureLoaderButtonMouseClick = function (evt) {
    evt.preventDefault();
    socialCommentsBlock = getBlockSocialComments(socialCommentsCopy);
    bigPictureSocialComments.appendChild(insertSocialComments(socialCommentsBlock));
  };

  window.preview = {
    renderBigPicture: renderBigPicture
  };
})();
