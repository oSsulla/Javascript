/*
const liczba1 = document.querySelector('#liczba1');
const btnPrzelicz = document.querySelector('#przelicz');
const wynikiPojemnik = document.querySelector('#wyniki');

btnPrzelicz.addEventListener('click', () => {
    wynikPojemnik.innerHTML = liczba1.value
    console.dir(liczba1.value)
*/
const addInput = document.querySelector('.addInput');
const result = document.querySelector('.result');

const suma = document.querySelector('.sum');
const srednia = document.querySelector('.avg');
const minimum = document.querySelector('.min');
const maximum = document.querySelector('.max');

const allInputs = document.querySelectorAll('input');
let sum = 0;
let arr = [];

const callback = (e) => {
  arr.push(e.target.value);
  sum += Number(e.target.value);
  suma.textContent = sum || 0;
  srednia.textContent = sum / allInputs.length || 0;
  minimum.textContent = Math.min(...arr);
  maximum.textContent = Math.max(...arr);
};

allInputs.forEach((input) => {
  input.addEventListener('change', (e) => {
    callback(e);
  });

  input.addEventListener('focusout', (e) => {
    e.target.value == '' && input.remove(e.target);
  });
});

addInput.addEventListener('click', () => {
  if (allInputs.length >= 4) return;
  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.classList.add('num');
  newInput.placeholder = 'Wprowadź liczbe';
  newInput.addEventListener('input', (e) => callback(e));
  document.body.insertAdjacentElement('afterbegin', newInput);
});