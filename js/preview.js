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
  var socialCommentTemplate = document.querySelector('#social-comment').content;

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

  var renderBigPicture = function (picture) {
    bigPictureImg.src = picture.url;
    bigPictureImg.alt = picture.description;
    bigPictureLikesCount.textContent = picture.likes;
    bigPictureCommentsCount.textContent = 10;
    bigPictureDescription.textContent = picture.description;
    bigPictureSocialComments.innerHTML = '';
    bigPictureSocialComments.appendChild(insertSocialComments(picture.comments));
    showBigPicture();
  };

  bigPictureCloseButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeBigPicture();
  });

  window.preview = {
    renderBigPicture: renderBigPicture
  };
})();
