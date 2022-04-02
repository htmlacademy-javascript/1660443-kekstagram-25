import {pageBody} from './fullscreen.js';
import {isEscapeKey, showAlert} from './util.js';
import {imagePreview, scaleInput, MAX_SCALE} from './photo-effects.js';
import {sendData} from './api.js';

const formUpload = document.querySelector('.img-upload__form');
const photoUpload= formUpload.querySelector('#upload-file');
const photoEditing = formUpload.querySelector('.img-upload__overlay');
const cancelButton = formUpload.querySelector('#upload-cancel');
const commentInput = formUpload.querySelector('.text__description');
const hashtagInput = formUpload.querySelector('.text__hashtags');
const submitButton = formUpload.querySelector('.img-upload__submit');


const successTemplateFragment = document.querySelector('#success').content;
const successTemplate = successTemplateFragment.querySelector('.success');
pageBody.appendChild(successTemplate);
successTemplate.classList.add('hidden');

const successButton = document.querySelector('.success__button');
successButton.addEventListener('click', () => {
  successTemplate.classList.add('hidden');
});


const errorTemplateFragment = document.querySelector('#error').content;
const errorTemplate = errorTemplateFragment.querySelector('.error');
pageBody.appendChild(errorTemplate);
errorTemplate.classList.add('hidden');

const errorButton = document.querySelector('.error__button');
errorButton.addEventListener('click', () => {
  errorTemplate.classList.add('hidden');
});

const MAX_COMMENTS = 5;
const RE = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;


const closeUploadForm = () => {
  pageBody.classList.remove('modal-open');
  photoEditing.classList.add('hidden');
  commentInput .value = '';
  hashtagInput.value = '';
  photoUpload.value = '';
  imagePreview.id ='effect-none';
  scaleInput.value =`${MAX_SCALE}%`;
};

const onUploadEscapeKeydown = (evt) => {
  if (isEscapeKey(evt) && evt.target !== commentInput  && evt.target !== hashtagInput) {
    evt.preventDefault();
    closeUploadForm();
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
  closeUploadForm();
  document.removeEventListener('keydown', onUploadEscapeKeydown);
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
};

const showErrorBlock  = () => {
  errorTemplate.classList.remove('hidden');
  unblockSubmitButton();
  closeUploadForm();
};

const showSuccessBlock  = () =>{
  successTemplate.classList.remove('hidden');
  unblockSubmitButton();
  closeUploadForm();
};


const pristine = new Pristine(formUpload, {
  classTo: 'text__upload-label',
  errorTextParent: 'text__upload-label',
  errorTextClass: 'text__upload-label-error-text',
});

const setUserFormSubmit = (onSuccess) => {
  formUpload.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();

      sendData (
        () => {
          onSuccess();
          showSuccessBlock();
        },
        () => {
          showErrorBlock();
        },
        new FormData(evt.target),
      );
    }
    else {
      showAlert ('Неверно заполнены поля ввода данных');
    }
  });
};
setUserFormSubmit(closeUploadForm);

const checkHashtag = (checking, onSuccess)  => {
  formUpload.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (checking) {
      blockSubmitButton();

      sendData (
        () => {
          onSuccess();
          showSuccessBlock();
        },
        () => {
          showErrorBlock();
        },
        new FormData(evt.target),
      );
    }
  });};


const GetHashtagArray = () => {
  const HASHTAG_ELEMENTS = hashtagInput.value.toLowerCase().split(' ').filter((hashtag) => hashtag !== '');
  return HASHTAG_ELEMENTS;
};

const checkHashtagNumber = () => {
  GetHashtagArray();
  return GetHashtagArray().length <= MAX_COMMENTS;
};
pristine.addValidator(hashtagInput, checkHashtagNumber, 'Вы можете добавить не более 5 хэштегов');
checkHashtag ();

const checkHashtagSpelling = () => GetHashtagArray().every((element) => (element.match(RE)));

pristine.addValidator(hashtagInput, checkHashtagSpelling, 'Хэш-тег должен начинаться с символа # (решётка); строка после решётки должна состоять  только из букв и чисел, хеш-тег не может состоять только из одной решётки; максимальная длина одного хэш-тега 20 символов, включая решётку');

const checkSameValue = () => {
  const uniqueElements = new Set(GetHashtagArray());
  return GetHashtagArray().length === uniqueElements.size;
};

pristine.addValidator(hashtagInput, checkSameValue, 'Хэштеги не должгы повторяться');

const showInfoMessage = (checking) => {
  if (checking ===  false) {
    showAlert ('Неверно заполнены поля ввода данных');
  }
};
showInfoMessage();
