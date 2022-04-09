import {pageBody} from './fullscreen.js';
import {isEscapeKey, showAlert} from './util.js';
import {photoPreview, scaleInput, MAX_SCALE, sliderContainerElement} from './photo-effects.js';
import {sendData} from './api.js';

const MAX_COMMENTS = 5;
const RE = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
const formUploaded = document.querySelector('.img-upload__form');
const photoUploaded= formUploaded.querySelector('#upload-file');
const photoEditing = formUploaded.querySelector('.img-upload__overlay');
const cancelButton = formUploaded .querySelector('#upload-cancel');
const commentInput = formUploaded .querySelector('.text__description');
const hashtagInput = formUploaded.querySelector('.text__hashtags');
const submitButton = formUploaded .querySelector('.img-upload__submit');
const initialEffectButton = formUploaded .querySelector('#effect-none');
const successTemplateFragment = document.querySelector('#success').content;
const successTemplate = successTemplateFragment.querySelector('.success');
pageBody.appendChild(successTemplate);
successTemplate.classList.add('hidden');
const errorTemplateFragment = document.querySelector('#error').content;
const errorTemplate = errorTemplateFragment.querySelector('.error');
pageBody.appendChild(errorTemplate);
errorTemplate.classList.add('hidden');

const pristine = new Pristine(formUploaded, {
  classTo: 'text__upload-label',
  errorTextParent: 'text__upload-label',
  errorTextClass: 'text__upload-label-error-text',
});

const closeUploadForm = () => {
  pageBody.classList.remove('modal-open');
  photoEditing.classList.add('hidden');
  commentInput .value = '';
  hashtagInput.value = '';
  photoUploaded.value = '';
  photoPreview.className ='img-upload__preview';
  photoPreview.classList.add('effect-none');
  photoPreview.style.filter = '';
  photoPreview.style.transform = `scale(${MAX_SCALE / 100})`;
  scaleInput.value =`${MAX_SCALE}%`;
  sliderContainerElement.classList.add('hidden');
  initialEffectButton.checked = true;
  pristine.reset();
};

const onFormEscapeKeydown = (evt) => {
  if (isEscapeKey(evt) && evt.target !== commentInput  && evt.target !== hashtagInput) {
    evt.preventDefault();
    closeUploadForm();
    document.removeEventListener('keydown', onFormEscapeKeydown);
  }
};

const OpenUploadForm = () => {
  pageBody.classList.add('modal-open');
  photoEditing.classList.remove('hidden');
  document.addEventListener('keydown', onFormEscapeKeydown);
};

photoUploaded.addEventListener('change', () => {
  OpenUploadForm();
});

cancelButton.addEventListener('click', () => {
  closeUploadForm();
  document.removeEventListener('keydown', onFormEscapeKeydown);
});

const onMessageEscapeKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    successTemplate.classList.add('hidden');
    errorTemplate.classList.add('hidden');
    document.removeEventListener('keydown', onMessageEscapeKeydown);
    document.removeEventListener('keydown', onFormEscapeKeydown);
  }
};

const onClickHideMessage = (evt) => {
  if(evt.target.className !== 'success__inner' && evt.target.className !== 'error__inner') {
    successTemplate.classList.add('hidden');
    errorTemplate.classList.add('hidden');
    document.removeEventListener('keydown', onMessageEscapeKeydown);
    document.removeEventListener('keydown', onFormEscapeKeydown);
  }
};

const blockButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
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
    successTemplate.classList.add('hidden');
    document.removeEventListener('keydown', onMessageEscapeKeydown);
    document.removeEventListener('keydown', onFormEscapeKeydown);
  });
};

const closeSuccessBlock = () => {
  const successButton = document.querySelector('.success__button');
  closeResultBlock(successButton);
};


const closeErrorBlock = () => {
  const errorButton = document.querySelector('.success__button');
  closeResultBlock(errorButton);
};


const setUserFormSubmit = (onSuccess) => {
  formUploaded.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockButton();

      sendData (
        () => {
          onSuccess();
          showResultBlock(successTemplate);
        },
        () => {
          showResultBlock(errorTemplate);
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
  formUploaded.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (checking) {
      blockButton();

      sendData (
        () => {
          onSuccess();
          showResultBlock(successTemplate);
        },
        () => {
          showResultBlock(errorTemplate);
        },
        new FormData(evt.target),
      );
    }
  });};


const getHashtagArray = () => {
  const hashtagElements = hashtagInput.value.toLowerCase().split(' ').filter((hashtag) => hashtag !== '');
  return hashtagElements;
};

const checkHashtagNumber = () => {
  getHashtagArray();
  return getHashtagArray().length <= MAX_COMMENTS;
};
pristine.addValidator(hashtagInput, checkHashtagNumber, 'Вы можете добавить не более 5 хэштегов');
checkHashtag ();

const checkHashtagSpelling = () => getHashtagArray().every((element) => (element.match(RE)));

pristine.addValidator(hashtagInput, checkHashtagSpelling, 'Хэш-тег должен начинаться с символа # (решётка); строка после решётки должна состоять  только из букв и чисел, хеш-тег не может состоять только из одной решётки; максимальная длина одного хэш-тега 20 символов, включая решётку');

const checkSameValue = () => {
  const uniqueElements = new Set(getHashtagArray());
  return getHashtagArray().length === uniqueElements.size;
};

pristine.addValidator(hashtagInput, checkSameValue, 'Хэштеги не должгы повторяться');

const showInfoMessage = (checking) => {
  if (checking ===  false) {
    showAlert ('Неверно заполнены поля ввода данных');
  }
};
showInfoMessage();
setUserFormSubmit(closeUploadForm);
closeSuccessBlock();
closeErrorBlock();
