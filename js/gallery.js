'use strict';

(function () {
  var MAX_RANDOM_PICTURES = 10;

  var picturesContainer = document.querySelector('.pictures');
  var picturesFilterForm = document.querySelector('.img-filters');
  var originalPictures;
  var sortPictures;

  var onSuccess = function (pictures) {
    picturesFilterForm.classList.remove('img-filters--inactive');
    originalPictures = pictures;
    setPicturesOrder();
    renderGallery(pictures);
  };

  window.onError = function (errorMessage) {
    var errorViewer = document.createElement('div');
    errorViewer.style = 'z-index: 100; margin: 0 auto; padding: 15px 0; width: auto; height: 50px; text-align: center;' +
      ' background-color: rgba(255, 231, 82, 0.3); color: #ffe753';
    errorViewer.style.position = 'absolute';
    errorViewer.style.top = 0;
    errorViewer.style.left = 0;
    errorViewer.style.right = 0;
    errorViewer.style.fontSize = '30px';
    errorViewer.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorViewer);
  };

  window.backend.load(onSuccess, window.onError);

  var renderGallery = function (pictures) {
    clearGallery();
    picturesContainer.appendChild(window.render.insertPictures(pictures, picturesContainer));

    var onPicturesListClick = function (evt) {
      var target = evt.target;
      if (target.parentNode.className === 'picture') {
        window.preview.renderBigPicture(pictures[target.id]);
      }
    };

    picturesContainer.addEventListener('click', onPicturesListClick);
  };

  var clearGallery = function () {
    var pictureList = picturesContainer.querySelectorAll('.picture');
    for (var i = 0; i < pictureList.length; i++) {
      picturesContainer.removeChild(pictureList[i]);
    }
  };

  var setPicturesOrder = function () {
    picturesFilterForm.addEventListener('click', window.utils.debounce(function (evt) {
      var target = evt.target;
      switch (target.id) {
        case 'filter-random':
          sortPictures = originalPictures.slice().sort(function () {
            return Math.random() - 0.5;
          }).slice(0, MAX_RANDOM_PICTURES);
          break;
        case 'filter-discussed':
          sortPictures = originalPictures.slice().sort(function (first, second) {
            return second.comments.length - first.comments.length;
          });
          break;
        default:
          sortPictures = originalPictures;
          break;
      }
      renderGallery(sortPictures);
    }));
  };
})();
