const photos = [];

const createGallery = (pictures) => {

  const photoListFragment = document.createDocumentFragment();
  const photoContainer = document.querySelector ('.pictures');
  const photoTemplateFragment = document.querySelector('#picture').content;
  const photoTemplate = photoTemplateFragment.querySelector('.picture');

  pictures.forEach((photo) => {
    photos.push(photo);
    const pictureElement =  photoTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__img').src = photo.url;
    photoListFragment.appendChild (pictureElement);
  });
  photoContainer.appendChild(photoListFragment);
};

export {createGallery, photos};

