'use strict';
// Selecting Elements
const scoreOneEl = document.getElementById('score--0');
const scoreTwoEl = document.getElementById('score--1');
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
const diceEl = document.getElementById('dice');
const btnRoll = document.querySelector('.btn--roll');
const currentScoreOne = document.getElementById('current--0');
const currentScoreTwo = document.getElementById('current--1');
const holdBtn = document.getElementById('hold');
const restBtn = document.getElementById('rest');

let scores, currentScore, activePlayer, playingStatus;

// initialization code
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playingStatus = true;
  diceEl.classList.add('hidden');
  currentScoreOne.textContent = 0;
  currentScoreTwo.textContent = 0;
  scoreOneEl.textContent = 0;
  scoreTwoEl.textContent = 0;
  dice.classList.add('hidden');
  playerOne.classList.remove('player--winner');
  playerTwo.classList.remove('player--winner');
  playerOne.classList.add('player--active');
  playerTwo.classList.remove('player--active');
};
init();

// switch to next player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;
  currentScore = 0;
  playerOne.classList.toggle('player--active');
  playerTwo.classList.toggle('player--active');
};

// Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playingStatus) {
    // Generating a roll dice number
    const dice = Math.trunc(Math.random() * 6) + 1;
    // display The Dice.
    diceEl.classList.remove('hidden');
    diceEl.src = `./imgs/dice-${dice}.png`;

    // Add dice to current score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});
// Hold Score button Functionality
holdBtn.addEventListener('click', function () {
  if (playingStatus) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //  check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      playingStatus = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switchPlayer
      switchPlayer();
    }
  }
});
// Rest Button Functionality
restBtn.addEventListener('click', init);
