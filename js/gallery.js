'use strict';

(function () {
  var SERVER_URL_UPLOAD = 'https://js.dump.academy/kekstagram/data';
  var MAX_RANDOM_PICTURES = 10;

  var picturesContainer = document.querySelector('.pictures');
  var picturesFilterForm = document.querySelector('.img-filters');
  var filterButtons = picturesFilterForm.querySelectorAll('.img-filters__button');
  var originalPictures;
  var sortPictures;

  var onSuccess = function (pictures) {
    picturesFilterForm.classList.remove('img-filters--inactive');
    originalPictures = pictures;
    setPicturesOrder();
    renderGallery(pictures);
  };

  var onError = function (errorMessage) {
    window.info.renderMessageForm('#error', '.error', errorMessage, 'Закрыть');
  };

  // Загрузка данных по сети
  window.backend.open(onSuccess, onError, 'GET', '', SERVER_URL_UPLOAD);

  var renderGallery = function (pictures) {
    clearGallery();
    picturesContainer.appendChild(window.render.insertPictures(pictures, picturesContainer));

    var onPicturesListClick = function (evt) {
      var target = evt.target;
      if (target.classList.contains('picture__img')) {
        window.preview.renderBigPicture(pictures[target.id]);
      }
    };

    var onPicturesListKeyDown = function (evt) {
      var target = evt.target.firstElementChild;
      if (evt.key === window.utils.ENTER_KEY) {
        window.preview.renderBigPicture(pictures[target.id]);
      }
    };

    picturesContainer.addEventListener('keydown', onPicturesListKeyDown);
    picturesContainer.addEventListener('click', onPicturesListClick);
  };

  var clearGallery = function () {
    var pictureList = picturesContainer.querySelectorAll('.picture');

    pictureList.forEach(function (element) {
      picturesContainer.removeChild(element);
    });
  };

  var changeActiveFilterButtons = function (activeButton) {
    filterButtons.forEach(function (button) {
      button.classList.remove('img-filters__button--active');
    });

    if (activeButton.classList.contains('img-filters__button')) {
      activeButton.classList.add('img-filters__button--active');
    }
  };

  var setPicturesOrder = function () {
    picturesFilterForm.addEventListener('click', window.utils.debounce(function (evt) {
      var target = evt.target;
      switch (target.id) {
        case 'filter-random':
          sortPictures = originalPictures.slice().sort(function () {
            return Math.random() - 0.5;
          });
          sortPictures.length = MAX_RANDOM_PICTURES;
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
      changeActiveFilterButtons(target);
      renderGallery(sortPictures);
    }));
  };

  window.gallery = {
    onError: onError
  };
})();
