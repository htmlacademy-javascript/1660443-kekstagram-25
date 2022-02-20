const getRandomNumber = (minNumber, maxNumber) => {
  if (minNumber < 0) {
    return('Введите значение больше 0');
  }
  return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
};
getRandomNumber(5, 10);


const checkMaxLength = (lineNumber, lineMaxLength) => {
  const lineLength = 120;
  return lineLength <= lineMaxLength;
};
checkMaxLength(3, 140);

