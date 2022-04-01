const zoomOutButton = document.querySelector('.scale__control--smaller');
const zoomInButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview');
const sliderContainer = document.querySelector('.effect-level');
const sliderElement = document.querySelector ('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const radioButtons = document.querySelectorAll ('.effects__radio');
let scaleValue = parseFloat(scaleInput.value);
const STEP = '25%';
const MAX_SCALE ='100';

zoomOutButton.addEventListener('click', () => {
  if (scaleValue >= 50 && scaleValue <= 100) {
    scaleValue -= parseFloat(STEP);
    imagePreview.style.transform = `scale(${scaleValue / 100})`;
  }
  scaleInput.value = `${scaleValue}%`;
});

zoomInButton.addEventListener ('click', () => {

  if (scaleValue >= 25 && scaleValue <= 75) {
    scaleValue += parseFloat(STEP);
    imagePreview.style.transform = `scale(${scaleValue / 100})`;
  }
  scaleInput.value = `${scaleValue}%`;
});

sliderContainer.classList.add('hidden');
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },}
});


const EFFECT_BUTTONS = ['effect-chrome', 'effect-sepia', 'effect-marvin', 'effect-phobos','effect-heat'];

const CLASSES = ['effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat'];

const EFFECTS = [
  {name: 'chrome',
    filter: 'grayscale',
    units: '',
    settings: {
      range: {
        min: 0,
        max: 1,
      },
      start: 0,
      step: 0.1
    }
  },
  {name: 'sepia',
    filter: 'sepia',
    units:'',
    settings: {
      range: {
        min: 0,
        max: 1,
      },
      start: 0,
      step: 0.1
    }
  },
  {name: 'marvin',
    filter: 'invert',
    units: '%',
    settings: {
      range: {
        min: 0,
        max: 100,
      },
      start: 0,
      step:  1
    }
  },
  {name: 'phobos',
    filter: 'blur',
    units: 'px',
    settings: {
      range: {
        min: 0,
        max: 3,
      },
      start: 0,
      step:  0.1
    }
  },
  {name: 'heat',
    filter: 'brightness',
    units:'',
    settings: {
      range: {
        min: 1,
        max: 3,
      },
      start: 1,
      step: 0.1
    }
  }];

radioButtons.forEach ((button) => {
  button.addEventListener('change', (evt) => {
    sliderContainer.classList.add('hidden');
    for (let i = 0; i < EFFECT_BUTTONS.length; i++){
      imagePreview.classList.remove(CLASSES[i]);

      if (evt.target.checked && evt.target.id === EFFECT_BUTTONS[i]) {
        sliderContainer.classList.remove('hidden');
        imagePreview.classList.add(CLASSES[i]);
        sliderElement.noUiSlider.updateOptions(EFFECTS[i].settings);
        sliderElement.noUiSlider.set(EFFECTS[i].settings.range.max);
        sliderElement.noUiSlider.on('update', () => {
          const filterValue= sliderElement.noUiSlider.get(true);
          valueElement.value = filterValue;
          imagePreview.style.filter = `${EFFECTS[i].filter}(${filterValue}${EFFECTS[i].units})`;
        });
      }
    }
  });
});
export {imagePreview, scaleInput, MAX_SCALE};
