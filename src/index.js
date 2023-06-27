import './css/style.css';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import refs from './js/services/refs';

const loader = document.querySelector('.loader');
const selectCat = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');

// Приховати інформацію про кота за замовчуванням
catInfoEl.classList.add('cat-none');

// Приховати селектор за замовчуванням
selectCat.classList.add('hide');

// Показати лоадер
loader.classList.add('loader');

selectCat.addEventListener('change', showInfoCat);

function makeupSelect() {
  fetchBreeds()
    .then(data => {
      loader.classList.remove('loader');
      selectCat.innerHTML = data.map(({ name, id }) => `<option value="${id}">${name}</option>`).join('');
      selectCat.classList.remove('hide');
    })
    .catch(() => {
      loader.classList.remove('loader');
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}

makeupSelect();

function showInfoCat() {
  const id = selectCat.value;
  
  loader.classList.add('loader');
  catInfoEl.classList.add('cat-none');
  
  fetchCatByBreed(id)
    .then(data => {
      loader.classList.remove('loader');
      catInfoEl.classList.remove('cat-none');
      makeUpCatInfo(data[0]);
    })
    .catch(() => {
      loader.classList.remove('loader');
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}

function makeUpCatInfo(breed) {
  let title = `<h2>${breed.breeds[0].name}</h2>`;
  let image = `<div><img src="${breed.url}" width='600' alt="${breed.breeds[0].name}"></div>`;
  let description = `<h3>Description</h3><p>${breed.breeds[0].description}</p>`;
  let temperament = `<h3>Temperament</h3><p>${breed.breeds[0].temperament}</p>`;
  catInfoEl.innerHTML = image + '<div class="cat-box">' + title + description + temperament + '</div>';
  console.log(title);
}