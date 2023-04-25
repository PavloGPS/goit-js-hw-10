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
let name = '';

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

    console.log(fetchCountries(name));
  }
  function onFetchCountriesError() {
    Notify.failure("Oops, there is no country with that name");
  }
  function renderCountriesList() {
    //to do render of markup countries list
  }
  function createCountryListMarkup() {
    //to do markup of countries list
  }
  
  function renderCountrieInfo() {
    //to do render of markup countrie info
  }
  function createCountryInfoMarkup() {
    //to do markup of countrie info
  }
