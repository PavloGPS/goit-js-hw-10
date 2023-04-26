import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
// const BASE_URL="https://restcountries.com/v3.1";
// const END_POINT_NAME= "/name"
const textInputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
let searchName = '';

textInputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
    searchName = evt.target.value.trim();

    if (!searchName){
        countryListEl.innerHTML='';
        countryInfoEl.innerHTML='';
        return;
    }

    fetchCountries(searchName)
    .then(countriesArr=>{
        if(countriesArr.length>10){
            Notify.info("Too many matches found. Please enter a more specific name.");
        throw new Error('matchesOverflowError');
    }
    return countriesArr;
    })
    .then(countriesArr=>{
        if(countriesArr.length>1 && countriesArr.length<11){
           renderCountriesList(countriesArr); 
        }
        return countriesArr;
    })
    .then(countriesArr=>{
        if(countriesArr.length === 1){
           renderCountrieInfo(countriesArr); 
        }
    })
    .catch(error=>{
        if(error.message==='matchesOverflowError'){            
        }else{
            onFetchCountriesError()
        }
    })

    console.log(fetchCountries(searchName));
  }

  function onFetchCountriesError() {
    Notify.failure("Oops, there is no country with that name");
  }

  function renderCountriesList(data) {
    countryInfoEl.innerHTML='';
    const markup = createCountryListMarkup(data);
    countryListEl.innerHTML = markup;
  }

  function createCountryListMarkup(countriesList) {
    return countriesList.map(({name,flags})=>{
        const country = name.official;
        const flag = flags.svg;
        return `<li class="country-list__item">
        <img src="${flag}"
        alt="flag of ${country}"
        class="country-flag">
        <h2 class="coutry__title">${country}</h2>
      </li>`
    }).join('');
    //to do markup of countries list
  }
  
  function renderCountrieInfo(data) {
    countryListEl.innerHTML='';
    const markup= createCountryInfoMarkup(data)
    countryInfoEl.innerHTML=markup;
    
  }
  function createCountryInfoMarkup(countryInfo) {
    return countryInfo.map(({name,capital,population,flags,languages})=>{
        const country = name.official;
        const flagDescription = flags.alt;
        const flag = flags.svg;
        const allTongues = Object.values(languages).join(',');
        
        return `<p class="card-top__box">
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
    </ul>`
    }).join('');
    //to do markup of countrie info
  }
