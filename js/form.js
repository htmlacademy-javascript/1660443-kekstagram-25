import {PAGE_BODY} from './fullscreen.js';
import {isEscapeKey} from './util.js';

const FORM_UPLOAD = document.querySelector('.img-upload__form');
const PHOTO_UPLOAD= FORM_UPLOAD.querySelector('#upload-file');
const PHOTO_EDITING = FORM_UPLOAD.querySelector('.img-upload__overlay');
const CANCEL_BUTTON = FORM_UPLOAD.querySelector('#upload-cancel');
const COMMENT_INPUT = FORM_UPLOAD.querySelector('.text__description');
const HASHTAG_INPUT = FORM_UPLOAD.querySelector('.text__hashtags');
const MAX_COMMENTS = 5;
const RE = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;


const CloseUploadForm = () => {
  PAGE_BODY.classList.remove('modal-open');
  PHOTO_EDITING.classList.add('hidden');
  COMMENT_INPUT.value = '';
  HASHTAG_INPUT.value = '';
  PHOTO_UPLOAD.value = '';
};

const onUploadEscapeKeydown = (evt) => {
  if (isEscapeKey(evt) && evt.target !== COMMENT_INPUT && evt.target !== HASHTAG_INPUT) {
    evt.preventDefault();
    CloseUploadForm();
    document.removeEventListener('keydown', onUploadEscapeKeydown);
  }
};

const OpenUploadForm = () => {
  PAGE_BODY.classList.add('modal-open');
  PHOTO_EDITING.classList.remove('hidden');
  document.addEventListener('keydown', onUploadEscapeKeydown);
};

PHOTO_UPLOAD.addEventListener('change', () => {
  OpenUploadForm();
});

CANCEL_BUTTON.addEventListener('click', () => {
  CloseUploadForm();
  document.removeEventListener('keydown', onUploadEscapeKeydown);
});

const pristine = new Pristine(FORM_UPLOAD, {
  classTo: 'text__upload-label',
  errorTextParent: 'text__upload-label',
  errorTextClass: 'text__upload-label-error-text',
});

FORM_UPLOAD.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

const GetHashtagArray = () => {
  const HASHTAG_ELEMENTS = HASHTAG_INPUT.value.toLowerCase().split(' ').filter((hashtag) => hashtag !== '');
  return HASHTAG_ELEMENTS;
};

const checkHashtagNumber = () => {
  GetHashtagArray();
  return GetHashtagArray().length <= MAX_COMMENTS;
};
pristine.addValidator(HASHTAG_INPUT, checkHashtagNumber, 'Вы можете добавить не более 5 хэштегов');


const checkHashtagSpelling = () => GetHashtagArray().every((element) => (element.match(RE)));

pristine.addValidator(HASHTAG_INPUT, checkHashtagSpelling, 'Хэш-тег начинается с символа # (решётка); строка после решётки должна состоять  только из букв и чисел, хеш-тег не может состоять только из одной решётки; максимальная длина одного хэш-тега 20 символов, включая решётку');

const checkSameValue = () => {
  const uniqueElements = new Set(GetHashtagArray());
  return GetHashtagArray().length === uniqueElements.size;
};

pristine.addValidator(HASHTAG_INPUT, checkSameValue, 'Хэштеги не должгы повторяться');

