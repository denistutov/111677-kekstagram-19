'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

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
    var pictureImage = pictureTemplate.querySelector('.picture__img');

    for (var i = 0; i < array.length; i++) {
      pictureImage.setAttribute('id', i);
      pictureFragment.appendChild(renderPicture(array[i]));
    }

    return container.appendChild(pictureFragment);
  };

  insertPictures(window.data.picturesArray, picturesContainer);
})();
