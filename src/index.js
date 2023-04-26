import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchCountries } from './fetchCountries.js';

import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const textInputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
let textToSearch = '';

textInputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
  textToSearch = evt.target.value.trim();

  if (!textToSearch) {
    countryListEl.innerHTML = '';
    countryInfoEl.innerHTML = '';
    return;
  }

  fetchCountries(textToSearch)
    .then(countriesArr => {
      if (countriesArr.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        throw new Error('matchesOverflowError');
      }
      return countriesArr;
    })
    .then(countriesArr => {
      if (countriesArr.length > 1 && countriesArr.length < 11) {
        renderCountriesList(countriesArr);
      }
      return countriesArr;
    })
    .then(countriesArr => {
      if (countriesArr.length === 1) {
        renderCountrieInfo(countriesArr);
      }
    })
    .catch(error => {
      if (error.message === 'matchesOverflowError') {
      } else {
        onFetchCountriesError();
      }
    });

  console.log(fetchCountries(textToSearch));
}

function onFetchCountriesError() {
  Notify.failure('Oops, there is no country with that name');
}

function renderCountriesList(data) {
  countryInfoEl.innerHTML = '';
  const markup = createCountryListMarkup(data);
  countryListEl.innerHTML = markup;
}

function createCountryListMarkup(countriesList) {
  return countriesList
    .map(({ name, flags }) => {
      const country = name.official;
      const flag = flags.svg;

      return `<li class="country-list__item">
        <img src="${flag}"
        alt="flag of ${country}"
        class="country-flag">
        <h2 class="coutry__subtitle">${country}</h2>
      </li>`;
    })
    .join('');
}

function renderCountrieInfo(data) {
  countryListEl.innerHTML = '';
  const markup = createCountryInfoMarkup(data);
  countryInfoEl.innerHTML = markup;
}
function createCountryInfoMarkup(countryInfo) {
  return countryInfo
    .map(({ name, capital, population, flags, languages }) => {
      const country = name.official;
      const flagDescription = flags.alt;
      const flag = flags.svg;
      const allTongues = Object.values(languages).join(',');

      return `<div class="card-wraper"><p class="card-top__box">
        <img src="${flag}"
        alt="${flagDescription}"
        class="country-flag">
        <h2 class="coutry__title">${country}</h2>        
      </p>
      <ul class="card-properties">      
      <li class="card-properties__item">
        <h3 class="property__title">
        Capital:
          <span class="property__value">
            ${capital}
          </span></h3>
      </li>
      <li class="card-properties__item">
        <h3 class="property__title">
        Population:
          <span class="property__value">
            ${population}
          </span></h3>
      </li>
      <li class="card-properties__item">
        <h3 class="property__title">
          Languages:
          <span class="property__value">
            ${allTongues}
          </span></h3>
      </li>
    </ul>
    </div>`;
    })
    .join('');
  //to do markup of countrie info
}
