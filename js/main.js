const checkStringLength = (string, stringMaxLength) => string.length <= stringMaxLength;
checkStringLength(3, 140);

const getRandomPositiveNumber = (a, b) => {
  const minNumber = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const maxNumber = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result =  Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  return result;
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveNumber(0, elements.length - 1)];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [
  'Василий',
  'Барсик',
  'Антонио',
  'Рудольф',
  'Иннокентий',
  'Бонифаций',
  'Гарфильд',
  'Арнольд',
  'Леопольд',
  'Том',
  'Феликс',
  'Тихон'
];

const minComments = 1;
const maxComments = 7;
const arrayNumber = 25;
const uniqueIdNumber = [];

for (let i = 1; i<=(maxComments*arrayNumber); i++ ) {
  const uniqueNumber = getRandomPositiveNumber (1, 1000);
  if (uniqueNumber !== uniqueIdNumber[i]) {
    uniqueIdNumber.push (uniqueNumber);
  }
}

const createComments = () => ({
  id: getRandomArrayElement(uniqueIdNumber),
  avatar: `img/avatar-${getRandomPositiveNumber(1, 6)}.svg`,
  message: getRandomArrayElement(messages),
  name: getRandomArrayElement(names),
});

const photoDescription = [];
console.log(photoDescription);

for (let i = 1; i <= arrayNumber; i++) {
  const ArrayComments = Array.from({length:(getRandomPositiveNumber(minComments, maxComments)),}, createComments);

  photoDescription.push({
    id: i,
    url: `photo/${i}.jpg`,
    description: `Фотография ${i}`,
    likes: getRandomPositiveNumber(15, 200),
    comments: ArrayComments
  });
}
