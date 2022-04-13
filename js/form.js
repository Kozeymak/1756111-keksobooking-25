const formTemplate = document.querySelector('.ad-form');
const mapFiltersTemplate = document.querySelector('.map__filters');
const typeFlat = formTemplate.querySelector('select[name=type]');
const pricePerNight = formTemplate.querySelector('input[name=price]');
const timeIn = formTemplate.querySelector('select[name=timein]');
const timeOut = formTemplate.querySelector('select[name=timeout]');
const numberRooms = formTemplate.querySelector('select[name=rooms]');
const numberGuests = formTemplate.querySelector('select[name=capacity]');

const activate = () => {
  formTemplate.classList.remove('ad-form--disabled');
  mapFiltersTemplate.classList.remove('mapfilters--disabled');
  formTemplate.querySelectorAll('fieldset, select').forEach(item => item.disabled = false);
  mapFiltersTemplate.querySelectorAll('select, fieldset').forEach(item => item.disabled = false);
};

const deactivate = () => {
  formTemplate.classList.add('ad-form--disabled');
  mapFiltersTemplate.classList.add('map__filters--disabled');
  formTemplate.querySelectorAll('fieldset').forEach(item => item.disabled = true);
  mapFiltersTemplate.querySelectorAll('select, fieldset').forEach(item => item.disabled = true);
};


// тип жилья - мин цена
const minPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const setMinPrice = () => {
  const value = minPrice[typeFlat.value];

  pricePerNight.setAttribute('min', value);
  pricePerNight.setAttribute('placeholder', value);
};

// заезд - выезд
const toSyncTimeOut = () => {
  timeOut.value = timeIn.value;
};

const toSyncTimeIn = () => {
  timeIn.value = timeOut.value;
};

// колво комнат - колво гостей
const checkNumberOfGuestsAndRooms = () => {
  const roomsValue = parseInt(numberRooms.value, 10);
  const guestsValue = parseInt(numberGuests.value, 10);

  if (roomsValue !== 100 && guestsValue === 0) {
    numberGuests.setCustomValidity('Недостаточно гостей');
  } else if (roomsValue < guestsValue) {
    numberGuests.setCustomValidity('Гостей очень много');
  } else if (roomsValue === 100 && guestsValue !== 0) {
    numberGuests.setCustomValidity('Данный вариант не для гостей');
  } else {
    numberGuests.setCustomValidity('');
  }
};

// навешиваем обработчики
numberRooms.addEventListener('change', () => {
  checkNumberOfGuestsAndRooms();
});

numberGuests.addEventListener('change', () => {
  checkNumberOfGuestsAndRooms();
});

typeFlat.addEventListener('change', () => {
  setMinPrice();
});

timeIn.addEventListener('change', () => {
  toSyncTimeOut();
});

timeOut.addEventListener('change', () => {
  toSyncTimeIn();
});

const form = document.querySelector('.ad-form');

const pristine = new pristine(form, {
  classTo: 'setup-wizard-form__element',
  errorTextParent: 'setup-wizard-form__element',
  errorTextClass: 'setup-wizard-form__error-text',
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});

export {activate, deactivate};
