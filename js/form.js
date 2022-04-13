const form = document.querySelector('.ad-form');
const mapFiltersTemplate = document.querySelector('.map__filters');
const typeFlat = form.querySelector('select[name=type]');
const price = form.querySelector('input[name=price]');
const timeIn = form.querySelector('select[name=timein]');
const timeOut = form.querySelector('select[name=timeout]');
const numberRooms = form.querySelector('select[name=rooms]');
const numberGuests = form.querySelector('select[name=capacity]');

const activate = () => {
  form.classList.remove('ad-form--disabled');
  mapFiltersTemplate.classList.remove('mapfilters--disabled');
  form.querySelectorAll('fieldset, select').forEach(item => item.disabled = false);
  mapFiltersTemplate.querySelectorAll('select, fieldset').forEach(item => item.disabled = false);
};

const deactivate = () => {
  form.classList.add('ad-form--disabled');
  mapFiltersTemplate.classList.add('map__filters--disabled');
  form.querySelectorAll('fieldset').forEach(item => item.disabled = true);
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
  price.min = value;
  price.placeholder = value;
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

const onFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
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

const pristine = new pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span', errorTextClass: 'ad-form__error'
});

form.addEventListener('submit', onFormSubmit);

export {activate, deactivate};
