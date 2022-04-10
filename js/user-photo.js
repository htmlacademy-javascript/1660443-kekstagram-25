const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserElement = document.querySelector('.img-upload__input');
const userPhotoPreviewElement = document.querySelector('.img-upload__preview img');

fileChooserElement.addEventListener('change', () => {
  const file = fileChooserElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));
  if (matches) {
    userPhotoPreviewElement.src = URL.createObjectURL(file);
  }
});

