import {pageBodyElement} from './fullscreen.js';
import {isEscapeKey, showAlert} from './util.js';
import {photoPreviewElement, scaleInputElement, MAX_SCALE, sliderContainerElement} from './photo-effects.js';
import {sendData} from './api.js';

const MAX_COMMENTS = 5;
const RE = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
const formUploadedElement = document.querySelector('.img-upload__form');
const photoUploadedElement= formUploadedElement.querySelector('#upload-file');
const photoEditingElement = formUploadedElement.querySelector('.img-upload__overlay');
const cancelButtonElement = formUploadedElement.querySelector('#upload-cancel');
const commentInputElement = formUploadedElement.querySelector('.text__description');
const hashtagInputElement = formUploadedElement.querySelector('.text__hashtags');
const submitButtonElement = formUploadedElement.querySelector('.img-upload__submit');
const initialEffectButtonElement = formUploadedElement.querySelector('#effect-none');
const successTemplateFragment = document.querySelector('#success').content;
const successTemplateElement = successTemplateFragment.querySelector('.success');
pageBodyElement.appendChild(successTemplateElement);
successTemplateElement.classList.add('hidden');
const errorTemplateFragment = document.querySelector('#error').content;
const errorTemplateElement = errorTemplateFragment.querySelector('.error');
pageBodyElement.appendChild(errorTemplateElement);
errorTemplateElement.classList.add('hidden');

const pristine = new Pristine(formUploadedElement, {
  classTo: 'text__upload-label',
  errorTextParent: 'text__upload-label',
  errorTextClass: 'text__upload-label-error-text',
});

const closeUploadForm = () => {
  pageBodyElement.classList.remove('modal-open');
  photoEditingElement.classList.add('hidden');
  commentInputElement.value = '';
  hashtagInputElement.value = '';
  photoUploadedElement.value = '';
  photoPreviewElement.className ='img-upload__preview';
  photoPreviewElement.classList.add('effect-none');
  photoPreviewElement.style.filter = '';
  photoPreviewElement.style.transform = `scale(${MAX_SCALE / 100})`;
  scaleInputElement.value =`${MAX_SCALE}%`;
  sliderContainerElement.classList.add('hidden');
  initialEffectButtonElement.checked = true;
  pristine.reset();
};

const onFormEscapeKeydown = (evt) => {
  if (isEscapeKey(evt) && evt.target !== commentInputElement  && evt.target !== hashtagInputElement) {
    evt.preventDefault();
    closeUploadForm();
    document.removeEventListener('keydown', onFormEscapeKeydown);
  }
};

const OpenUploadForm = () => {
  pageBodyElement.classList.add('modal-open');
  photoEditingElement.classList.remove('hidden');
  document.addEventListener('keydown', onFormEscapeKeydown);
};

photoUploadedElement.addEventListener('change', () => {
  OpenUploadForm();
});

cancelButtonElement.addEventListener('click', () => {
  closeUploadForm();
  document.removeEventListener('keydown', onFormEscapeKeydown);
});

const onMessageEscapeKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    successTemplateElement.classList.add('hidden');
    errorTemplateElement.classList.add('hidden');
    document.removeEventListener('keydown', onMessageEscapeKeydown);
    document.removeEventListener('keydown', onFormEscapeKeydown);
  }
};

const onClickHideMessage = (evt) => {
  if(evt.target.className !== 'success__inner' && evt.target.className !== 'error__inner') {
    successTemplateElement.classList.add('hidden');
    errorTemplateElement.classList.add('hidden');
    document.removeEventListener('keydown', onMessageEscapeKeydown);
    document.removeEventListener('keydown', onFormEscapeKeydown);
  }
};

const blockButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Сохраняю...';
};

const unblockButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Сохранить';
};

const showResultBlock = (result) => {
  closeUploadForm();
  result.classList.remove('hidden');
  unblockButton();
  document.addEventListener('keydown', onMessageEscapeKeydown);
  result.addEventListener('click', onClickHideMessage);
};

const closeResultBlock = (result) => {
  result.addEventListener('click', () => {
    successTemplateElement.classList.add('hidden');
    document.removeEventListener('keydown', onMessageEscapeKeydown);
    document.removeEventListener('keydown', onFormEscapeKeydown);
  });
};

const closeSuccessBlock = () => {
  const successButtonElement = document.querySelector('.success__button');
  closeResultBlock(successButtonElement);
};


const closeErrorBlock = () => {
  const errorButtonElement = document.querySelector('.success__button');
  closeResultBlock(errorButtonElement);
};


const setUserFormSubmit = (onSuccess) => {
  formUploadedElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockButton();

      sendData (
        () => {
          onSuccess();
          showResultBlock(successTemplateElement);
        },
        () => {
          showResultBlock(errorTemplateElement);
        },
        new FormData(evt.target),
      );
    }
    else {
      showAlert ('Неверно заполнены поля ввода данных');
    }
  });
};

const checkHashtag = (checking, onSuccess)  => {
  formUploadedElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (checking) {
      blockButton();

      sendData (
        () => {
          onSuccess();
          showResultBlock(successTemplateElement);
        },
        () => {
          showResultBlock(errorTemplateElement);
        },
        new FormData(evt.target),
      );
    }
  });};


const getHashtagArray = () =>
  hashtagInputElement.value.toLowerCase().split(' ').filter((hashtag) => hashtag !== '');

const checkHashtagNumber = () => {
  getHashtagArray();
  return getHashtagArray().length <= MAX_COMMENTS;
};
pristine.addValidator(hashtagInputElement, checkHashtagNumber, 'Вы можете добавить не более 5 хэштегов');
checkHashtag ();

const checkHashtagSpelling = () => getHashtagArray().every((element) => (element.match(RE)));

pristine.addValidator(hashtagInputElement, checkHashtagSpelling, 'Хэш-тег должен начинаться с символа # (решётка); строка после решётки должна состоять  только из букв и чисел, хеш-тег не может состоять только из одной решётки; максимальная длина одного хэш-тега 20 символов, включая решётку');

const checkSameValue = () => {
  const uniqueElements = new Set(getHashtagArray());
  return getHashtagArray().length === uniqueElements.size;
};

pristine.addValidator(hashtagInputElement, checkSameValue, 'Хэштеги не должгы повторяться');

const showInfoMessage = (checking) => {
  if (checking ===  false) {
    showAlert ('Неверно заполнены поля ввода данных');
  }
};
showInfoMessage();
setUserFormSubmit(closeUploadForm);
closeSuccessBlock();
closeErrorBlock();
