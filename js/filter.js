const pictureFilterElement = document.querySelector ('.img-filters');
const popularButtonElement = document.querySelector('#filter-discussed');
const randomButtonElement = document.querySelector('#filter-random');
const standardButtonElement = document.querySelector('#filter-default');
const buttons = document.querySelectorAll('.img-filters__button');
const activeButtonElement = document.querySelector('.img-filters__button--active');
activeButtonElement.style.color = '#ff4e4e';
activeButtonElement.style.backgroundColor = '#ffffff';

window.addEventListener('load', () => {
  pictureFilterElement.classList.remove('img-filters--inactive');
});

const clearPicturesList = () => {
  const picturesListElement = document.querySelectorAll ('.picture');
  picturesListElement.forEach((unit) => {
    unit.remove();
  });
  buttons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
    button.style.color = null;
    button.style.backgroundColor = null;
  });
};

export {popularButtonElement, randomButtonElement, standardButtonElement, clearPicturesList};

