const checkStringLength = (string, stringMaxLength) => string.length <= stringMaxLength;
checkStringLength(3, 140);

const getRandomPositiveNumber = (a, b) => {
  const minNumber = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const maxNumber = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
};

const MIN_RANDOM_ELEMENT = 0;

const getRandomArrayElement = (elements) => elements[getRandomPositiveNumber(MIN_RANDOM_ELEMENT, elements.length - 1)];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
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

const MIN_COMMENTS = 1;
const MAX_COMMENTS = 7;
const ARRAY_NUMBER = 25;
const UNIQUE_ID_NUMBER = [];
const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 6;
const MIN_RANDOM_ID = 1;
const MAX_RANDOM_ID = 1000;

for (let i = 1; i<=(MAX_COMMENTS*ARRAY_NUMBER); i++ ) {
  const uniqueNumber = getRandomPositiveNumber (MIN_RANDOM_ID, MAX_RANDOM_ID);
  if (uniqueNumber !== UNIQUE_ID_NUMBER[i]) {
    UNIQUE_ID_NUMBER.push (uniqueNumber);
  }
}

const createComments = () => ({
  id: getRandomArrayElement(UNIQUE_ID_NUMBER),
  avatar: `img/avatar-${getRandomPositiveNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const PHOTO_DESCRIPTION = [];

for (let i = 1; i <= ARRAY_NUMBER; i++) {
  const ArrayComments = Array.from({length:(getRandomPositiveNumber(MIN_COMMENTS, MAX_COMMENTS)),}, createComments);

  PHOTO_DESCRIPTION.push({
    id: i,
    url: `photo/${i}.jpg`,
    description: `Фотография ${i}`,
    likes: getRandomPositiveNumber(15, 200),
    comments: ArrayComments
  });
}
