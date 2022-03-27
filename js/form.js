import {pageBody} from './fullscreen.js';
import {isEscapeKey} from './util.js';

const formUpload = document.querySelector('.img-upload__form');
const photoUpload= formUpload.querySelector('#upload-file');
const photoEditing = formUpload.querySelector('.img-upload__overlay');
const cancelButton = formUpload.querySelector('#upload-cancel');
const commentInput = formUpload.querySelector('.text__description');
const hashtagInput = formUpload.querySelector('.text__hashtags');
const MAX_COMMENTS = 5;
const RE = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;


const CloseUploadForm = () => {
  pageBody.classList.remove('modal-open');
  photoEditing.classList.add('hidden');
  commentInput .value = '';
  hashtagInput.value = '';
  photoUpload.value = '';
};

const onUploadEscapeKeydown = (evt) => {
  if (isEscapeKey(evt) && evt.target !== commentInput  && evt.target !== hashtagInput) {
    evt.preventDefault();
    CloseUploadForm();
    document.removeEventListener('keydown', onUploadEscapeKeydown);
  }
};

const OpenUploadForm = () => {
  pageBody.classList.add('modal-open');
  photoEditing.classList.remove('hidden');
  document.addEventListener('keydown', onUploadEscapeKeydown);
};

photoUpload.addEventListener('change', () => {
  OpenUploadForm();
});

cancelButton.addEventListener('click', () => {
  CloseUploadForm();
  document.removeEventListener('keydown', onUploadEscapeKeydown);
});

const pristine = new Pristine(formUpload, {
  classTo: 'text__upload-label',
  errorTextParent: 'text__upload-label',
  errorTextClass: 'text__upload-label-error-text',
});

formUpload.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

const GetHashtagArray = () => {
  const HASHTAG_ELEMENTS = hashtagInput.value.toLowerCase().split(' ').filter((hashtag) => hashtag !== '');
  return HASHTAG_ELEMENTS;
};

const checkHashtagNumber = () => {
  GetHashtagArray();
  return GetHashtagArray().length <= MAX_COMMENTS;
};
pristine.addValidator(hashtagInput, checkHashtagNumber, 'Вы можете добавить не более 5 хэштегов');


const checkHashtagSpelling = () => GetHashtagArray().every((element) => (element.match(RE)));

pristine.addValidator(hashtagInput, checkHashtagSpelling, 'Хэш-тег начинается с символа # (решётка); строка после решётки должна состоять  только из букв и чисел, хеш-тег не может состоять только из одной решётки; максимальная длина одного хэш-тега 20 символов, включая решётку');

const checkSameValue = () => {
  const uniqueElements = new Set(GetHashtagArray());
  return GetHashtagArray().length === uniqueElements.size;
};

pristine.addValidator(hashtagInput, checkSameValue, 'Хэштеги не должгы повторяться');


