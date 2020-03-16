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

  var renderInfoMessage = function (templateElement, innerSelector, message, buttonText) {
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

    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.ESC_KEY) {
        overlay.removeChild(templateMessage);
      }
    });

    templateBtn.addEventListener('click', function () {
      overlay.removeChild(templateMessage);
      overlay.removeAttribute('class');
    });
  };

  window.info = {
    renderInfoMessage: renderInfoMessage
  };

})();
