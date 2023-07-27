'use strict';
//selecting elements
const score0el = document.getElementById('score--0');
const score1el = document.getElementById('score--1');
const diceel = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0el = document.getElementById('current--0');
const current1el = document.getElementById('current--1');
const player0el = document.querySelector('.player--0');
const player1el = document.querySelector('.player--1');

let cscore, score, activepl, playing;

//starting conditions
const initial = function () {
  score0el.textContent = 0;
  score1el.textContent = 0;
  current0el.textContent = 0;
  current1el.textContent = 0;

  diceel.classList.add('hidden');
  cscore = 0;
  activepl = 0;
  score = [0, 0];
  playing = true;

  player0el.classList.remove('player--winner');
  player1el.classList.remove('player--winner');
  document
    .querySelector(`.player--${activepl}`)
    .classList.add('player--active');
};

//switch player function
const switchplayer = function () {
  document.getElementById(`current--${activepl}`).textContent = 0;
  cscore = 0;
  activepl = activepl === 0 ? 1 : 0;
  player0el.classList.toggle('player--active');
  player1el.classList.toggle('player--active');
};
initial();
//rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generating random numbers
    let dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceel.classList.remove('hidden');
    diceel.src = `dice-${dice}.png`;

    if (dice !== 1) {
      document.getElementById(`current--${activepl}`).textContent = cscore +=
        dice;
    } else {
      switchplayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activepl] = score[activepl] + cscore;

    document.getElementById(`score--${activepl}`).textContent = score[activepl];

    if (score[activepl] >= 100) {
      playing = false;
      diceel.classList.add('hidden');
      document
        .querySelector(`.player--${activepl}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activepl}`)
        .classList.remove('player--active');
    } else {
      switchplayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  initial();
});
