import {getRandomArrayElement, getRandomPositiveNumber} from './util.js';

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

const MIN_COMMENTS = 0 ;
const MAX_COMMENTS = 15;
const ARRAY_NUMBER = 25;
const UNIQUE_ID_NUMBERS = [];
const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 6;
const MIN_RANDOM_ID = 1;
const MAX_RANDOM_ID = 1000;

for (let i = 1; i<=(MAX_COMMENTS*ARRAY_NUMBER); i++ ) {
  const uniqueNumber = getRandomPositiveNumber (MIN_RANDOM_ID, MAX_RANDOM_ID);
  if (uniqueNumber !== UNIQUE_ID_NUMBERS[i]) {
    UNIQUE_ID_NUMBERS.push (uniqueNumber);
  }
}

const createComments = () => ({
  id: getRandomArrayElement(UNIQUE_ID_NUMBERS),
  avatar: `img/avatar-${getRandomPositiveNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const PHOTOS = [];

for (let i = 1; i <= ARRAY_NUMBER; i++) {
  const ArrayComments = Array.from({length:(getRandomPositiveNumber(MIN_COMMENTS, MAX_COMMENTS)),}, createComments);

  PHOTOS.push({
    id: i,
    url: `photos/${i}.jpg`,
    description: `Фотография ${i}`,
    likes: getRandomPositiveNumber(15, 200),
    comments: ArrayComments
  });
}
export {PHOTOS };
