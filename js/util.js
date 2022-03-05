const checkStringLength = (string, stringMaxLength) => string.length <= stringMaxLength;
checkStringLength(3, 140);

const getRandomPositiveNumber = (a, b) => {
  const minNumber = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const maxNumber = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
};

const MIN_RANDOM_ELEMENT = 0;

const getRandomArrayElement = (elements) => elements[getRandomPositiveNumber(MIN_RANDOM_ELEMENT, elements.length - 1)];

export {getRandomPositiveNumber, getRandomArrayElement};
