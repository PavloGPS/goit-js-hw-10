import './css/styles.css';
import { fetchCountries } from "./fetchCountries.js";
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
// const BASE_URL="https://restcountries.com/v3.1";
// const END_POINT_NAME= "/name"
const textInputEl=document.querySelector("#search-box");
const countryListEl=document.querySelector(".country-list");
const countryInfoEl=document.querySelector(".country-info");
let name="";

textInputEl.addEventListener(
    'input',
    debounce(evt => {
      name = textInputEl.value;
      console.log(fetchCountries(name));      
    }, DEBOUNCE_DELAY)
  );
