const getRandomNumber = (minNumber, maxNumber) => {//почему не работает, если без обновления второй раз вставить в консоль браузера?
  if (minNumber < 0) {
    return('Введите значение больше 0');
  }
  return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
};
getRandomNumber(5, 10);
// посмотрела даже другие Kekstagram на GitHub - другого способа вернуть рандомное число не нашла. Если есть - помоги!!

const checkMaxLenght = (lineNumber, lineMaxLenght) => {
  const lineLenght = 120;
  if (lineLenght <= lineMaxLenght) {
    return true;
  }
  return false;
};
checkMaxLenght(3, 140);
//какая-то странная функция. Не правильнее ли вторым параметром написать длину строки и передавать ее при вызове, а переменной сделать максимальную длину? Ведь размер комментария меняется чаще, чем максимальное количество символов? Но в ДЗ указаны именно такие параметры.
