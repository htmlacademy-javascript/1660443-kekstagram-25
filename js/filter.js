const pictureFilter = document.querySelector ('.img-filters');
const popularButton = document.querySelector('#filter-discussed');
const randomButton = document.querySelector('#filter-random');
const standardButton = document.querySelector('#filter-default');
const buttons = document.querySelectorAll('.img-filters__button');
const activeButton = document.querySelector('.img-filters__button--active');
activeButton.style.color = '#ff4e4e';
activeButton.style.backgroundColor = '#ffffff';

window.addEventListener('load', () => {
  pictureFilter.classList.remove('img-filters--inactive');
});

const clearPicturesList = () => {
  const picturesList = document.querySelectorAll ('.picture');
  picturesList.forEach((unit) => {
    unit.remove();
  });
  buttons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
    button.style.color = null;
    button.style.backgroundColor = null;
  });
};

export {popularButton, randomButton, standardButton, clearPicturesList};

