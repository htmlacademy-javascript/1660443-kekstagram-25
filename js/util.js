const getRandomPositiveNumber = (a, b) => {
  const minNumber = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const maxNumber = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
};

const MIN_RANDOM_ELEMENT = 0;

const getRandomArrayElement = (elements) => elements[getRandomPositiveNumber(MIN_RANDOM_ELEMENT, elements.length - 1)];

const ALERT_SHOW_TIME = 10000;


const makeElement = (tagName, className, text) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.color = 'black';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomArrayElement, makeElement, isEscapeKey, showAlert, debounce};

