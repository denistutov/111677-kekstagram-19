'use strict';

(function () {
  var getTemplateClone = function (template, innerSelector) {
    var templateElement = document.querySelector(template);
    var elementToClone = templateElement.querySelector(innerSelector);
    if ('content' in templateElement) {
      elementToClone = templateElement.content.querySelector(innerSelector);
    }
    return elementToClone;
  };

  var renderMessageForm = function (templateElement, innerSelector, message, buttonText) {
    var overlay = window.utils.body;
    var template = getTemplateClone(templateElement, innerSelector);
    var templateMessage = template.cloneNode(true);
    var templateBtn = templateMessage.querySelector((innerSelector + '__button'));
    overlay.appendChild(templateMessage);


    if (message !== undefined) {
      templateMessage.querySelector(innerSelector + '__title').textContent = message;
    }

    if (buttonText !== undefined) {
      templateBtn.textContent = buttonText;
    }

    var onRenderMessageFormPressEsc = function (evt) {
      if (evt.key === window.utils.ESC_KEY) {
        window.utils.body.removeChild(templateMessage);
        closeRenderMessage();
      }
    };

    var onRenderMessageFormClick = function () {
      overlay.removeChild(templateMessage);
      closeRenderMessage();
    };

    var closeRenderMessage = function () {
      overlay.removeAttribute('class');
      document.removeEventListener('keydown', onRenderMessageFormPressEsc);
      templateBtn.addEventListener('click', onRenderMessageFormClick);
    };

    document.addEventListener('keydown', onRenderMessageFormPressEsc);
    templateBtn.addEventListener('click', onRenderMessageFormClick);
  };

  window.info = {
    renderMessageForm: renderMessageForm
  };

})();
