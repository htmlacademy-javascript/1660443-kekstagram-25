const AUTHOR_COMMENT = document.querySelector('.img-upload__form');

const pristineAuthorComment = new Pristine(AUTHOR_COMMENT, {
  classTo: 'text__upload-label',
  errorTextParent: 'text__upload-label',
  errorTextClass: 'text__upload-label-error-text',
});

const isValid = pristineAuthorComment.validate();

AUTHOR_COMMENT.addEventListener('submit', (evt) => {
  evt.preventDefault();
  isValid();
});




