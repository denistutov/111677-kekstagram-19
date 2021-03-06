'use strict';

(function () {
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

    array.forEach(function (picture, index) {
      pictureImage.setAttribute('id', index);
      pictureFragment.appendChild(renderPicture(picture));
    });

    return container.appendChild(pictureFragment);
  };

  window.render = {
    insertPictures: insertPictures
  };
})();
