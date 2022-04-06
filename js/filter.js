const pictureFilter = document.querySelector ('.img-filters');
const popularButton = document.querySelector('#filter-discussed');
const randomButton = document.querySelector('#filter-random');
const defaultButton = document.querySelector('#filter-default');
const buttons = document.querySelectorAll('.img-filters__button');
const buttonActive = document.querySelector('.img-filters__button--active');
buttonActive.style.color = '#ff4e4e';
buttonActive.style.backgroundColor = '#ffffff';

pictureFilter.classList.remove('img-filters--inactive');

const clearPreviousPictures = () => {
  const allPictures = document.querySelectorAll ('.picture');
  allPictures.forEach((unit) => {
    unit.remove();
  });
  buttons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
    button.style.color = null;
    button.style.backgroundColor = null;
  });
};

export {popularButton, randomButton, defaultButton, clearPreviousPictures};

