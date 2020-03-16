'use strict';

(function () {
  var TIMEOUT = 10000;
  var SERVER_URL_UPLOAD = 'https://js.dump.academy/kekstagram/';
  var SERVER_URL_DOWNLOAD = 'https://js.dump.academy/kekstagram/data/';

  var initXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(getErrorMsg(xhr.status));
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.TIMEOUT = TIMEOUT;

    var getErrorMsg = function (status) {
      switch (status) {
        case 400:
          status = 'Неверный запрос';
          break;
        case 401:
          status = 'Пользователь не авторизован';
          break;
        case 404:
          status = 'Ошибка загрузки данных';
          break;

        default:
          status = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
      }
      return status;
    };
    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = initXHR(onLoad, onError);
      xhr.open('GET', SERVER_URL_DOWNLOAD);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = initXHR(onLoad, onError);
      xhr.open('POST', SERVER_URL_UPLOAD);
      xhr.send(data);
    }
  };

})();
