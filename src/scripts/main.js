// Sound and music variable
const music = document.querySelector('.music');
const fail = document.querySelector('.fail');
const success = document.querySelector('.success');
const victory = document.querySelector('.victory');
const defeat = document.querySelector('.defeat');

// Top options sound slider variables
const sliderAreaSoundOptionsOff = document.querySelector('.slider-area__sound-options--off');
const sliderAreaSoundOptionsOn = document.querySelector('.slider-area__sound-options--on');
const peg1Sound = document.querySelector('.peg1__sound');

// Top options background slider variables
const sliderAreaBackgroundOptionsDefault = document.querySelector('.slider-area__background-options--default');
const sliderAreaBackgroundOptionsMint = document.querySelector('.slider-area__background-options--mint');
const sliderAreaBackgroundOptionsOcean = document.querySelector('.slider-area__background-options--ocean');
const sliderAreaBackgroundOptionsRoyal = document.querySelector('.slider-area__background-options--royal');
const peg2Background = document.querySelector('.peg2__background')

// Get current year and credit section for footer
let currentYear = new Date().getFullYear();
const credit = document.querySelector('.footer-credit span');

// Getting various sections of the DOM
let quote = document.querySelector('.quote-container .quote');
const letters = document.getElementsByClassName('letter');
const keys = document.getElementsByClassName('key');
const overlays = document.getElementsByClassName('overlay');
const sticks = document.getElementsByClassName('stick');
const gallows = document.querySelector('.gallows-container');
let author = document.querySelector('.quote-container .author');

// variables needed for gameStart() to work properly
let quoteArray = [];
let visibleQuoteArray = [];
let lettersToGo;

// Array of all the possible colors for the main title
const colorArray = [
  '#B82020',
  '#F56E6E',
  '#D64141',
  '#970A0A',
  '#6E0000',
  '#B89E20',
  '#F5DE6E',
  '#D6BC41',
  '#977F0A',
  '#6E5B00',
  '#38227F',	
  '#6A57A9',
  '#4E3893',
  '#261268',
  '#17074B',
  '#199419',	
  '#58C458',
  '#34AB34',
  '#087908',
  '#005800'
];

const allSticks = Array.from(sticks);
let hangmanCounter;

// Add visible class to the overlays so they disappear
// and remove visible class from each stick
const overlayArray = Array.from(overlays);
overlayArray.forEach(overlay => {
  overlay.addEventListener('click', () => {
    overlay.classList.remove('visible');
    startGame();
    allSticks.forEach(stick => {
      stick.classList.remove('visible');
    });
    hangmanCounter = 0;
  });
});

// Function to adjust sound slider if player wants background music
sliderAreaSoundOptionsOn.addEventListener('click', () => {
  peg1Sound.classList.remove('left');
  peg1Sound.classList.add('right');
  music.play();
  music.volume = .5;
  music.loop = true;
});

sliderAreaSoundOptionsOff.addEventListener('click', () => {
  peg1Sound.classList.add('left');
  peg1Sound.classList.remove('right');
  music.pause();
});

// Function so the player has the option to change the background color
sliderAreaBackgroundOptionsDefault.addEventListener('click', () => {
  peg2Background.classList.add('default');
  peg2Background.classList.remove('mint');
  peg2Background.classList.remove('ocean');
  peg2Background.classList.remove('royal');
  document.body.style.background = 'linear-gradient(#fff, #555)'
});

sliderAreaBackgroundOptionsMint.addEventListener('click', () => {
  peg2Background.classList.add('mint');
  peg2Background.classList.remove('default');
  peg2Background.classList.remove('ocean');
  peg2Background.classList.remove('royal');
  document.body.style.background = 'linear-gradient(#91eeab, #205730)'
});

sliderAreaBackgroundOptionsOcean.addEventListener('click', () => {
  peg2Background.classList.add('ocean');
  peg2Background.classList.remove('mint');
  peg2Background.classList.remove('default');
  peg2Background.classList.remove('royal');
  document.body.style.background = 'linear-gradient(#c3ecff, #0c4857)'
});

sliderAreaBackgroundOptionsRoyal.addEventListener('click', () => {
  peg2Background.classList.add('royal');
  peg2Background.classList.remove('mint');
  peg2Background.classList.remove('ocean');
  peg2Background.classList.remove('default');
  document.body.style.background = 'linear-gradient(#dea4ff, #791886)'
});

// Function to randomly change the color of each letter in the title
let lettersArray = Array.from(letters);
lettersArray.forEach(letter => {
  let randNum = Math.floor(Math.random() * colorArray.length);
  letter.style.color = colorArray[randNum];
})

// ----- *IMPORTANT* -----
// This function starts the game
function startGame() {
  // Fetch random quote
  quoteArray = [];
  visibleQuoteArray = [];
  lettersToGo = 0;

  fetch('https://type.fit/api/quotes')
  .then(res => res.json())
  .then(data => {
    randQuote(data);
  })
  .catch(err => console.log('Error:', err));

  // Function to pick random quote and set letters to _s
  function randQuote(data) {
  let randNum = Math.floor(Math.random() * data.length);
  quoteArray = data[randNum].text.split('');
  author.innerText = `- ${data[randNum].author}`;
  

    for(let i = 0; i < quoteArray.length; i ++) {
      switch(quoteArray[i]) {
        case ' ':
          visibleQuoteArray[i] = ' '
          lettersToGo ++;
          break;
        case '.':
          visibleQuoteArray[i] = '.';
          lettersToGo ++;
          break;
        case ',':
          visibleQuoteArray[i] = ',';
          lettersToGo ++;
          break;
        case ':':
          visibleQuoteArray[i] = ':';
          lettersToGo ++;
          break;
        case ';':
          visibleQuoteArray[i] + ';';
          lettersToGo ++;
          break
        case '"': 
          visibleQuoteArray[i] = '"';
          lettersToGo ++;
          break;
        case "'":
          visibleQuoteArray[i] = "'";
          lettersToGo ++;
          break;
        case "-":
          visibleQuoteArray[i] = '-';
          lettersToGo ++;
          break;
        case "1":
          visibleQuoteArray[i] = '1';
          lettersToGo ++;
          break;
        case "2":
          visibleQuoteArray[i] = '2';
          lettersToGo ++;
          break;
        case "3":
          visibleQuoteArray[i] = '3';
          lettersToGo ++;
          break;
        case "4":
          visibleQuoteArray[i] = '4';
          lettersToGo ++;
          break;
        case "5":
          visibleQuoteArray[i] = '5';
          lettersToGo ++;
          break;
        case "6":
          visibleQuoteArray[i] = '6';
          lettersToGo ++;
          break;
        case "7":
          visibleQuoteArray[i] = '7';
          lettersToGo ++;
          break;
        case "8":
          visibleQuoteArray[i] = '8';
          lettersToGo ++;
          break;
        case "9":
          visibleQuoteArray[i] = '9';
          lettersToGo ++;
          break;
        case "0":
          visibleQuoteArray[i] = '0';
          lettersToGo ++;
          break;
        default:
          visibleQuoteArray[i] = '_';
          break;
      }
    }; 
    quote.innerText = visibleQuoteArray.join('');
  }

  // Function to check if the players guess is correct
  const allKeys = Array.from(keys);
  let lettersGuessed = [];

  allKeys.forEach(key => {

    key.addEventListener('click', () => {
      // For loop to check possible conditions and respond accordingly
      for(let i = 0; i < quoteArray.length; i ++) {
        if(quoteArray[i].toUpperCase() === key.innerText &&
          !lettersGuessed.includes(key.innerText)) {
          visibleQuoteArray[i] = quoteArray[i];
          quote.innerText = visibleQuoteArray.join('');
          lettersToGo ++;
          success.pause();
          success.currentTime = 0;
          success.play();
          success.volume = .5
        } 

        // If key.innerText is not equal to visibleQuoteArray[i]
        // then we add a stick to the stickman and break
        if(!quoteArray.includes(key.innerText.toLowerCase() ||
          !quoteArray.includes(key.innerText.toUpperCase()))) {
          allSticks[hangmanCounter].classList.add('visible');
          hangmanCounter <= allSticks.length ?
            hangmanCounter ++ : hangmanCounter;
          fail.pause();
          fail.currentTime = 0;
          fail.play();
          fail.volume = .5;
          break;
        }
      }

      // If lettersToGo equals the length of visible quote array]
        // then we show the victory screen and play victory music
        if(lettersToGo === visibleQuoteArray.length) {
          overlayArray[1].classList.add('visible');
          victory.play();
          victory.volume = .5;
        }

      // If hangmanCounter reaches allSticks.length we
        // show the defeat screan and play defeat music
        if(hangmanCounter === allSticks.length) {
          overlayArray[2].classList.add('visible');
          defeat.play();
          defeat.volume = .5;
        }
    });
  });
}             

// Call function on window load
//window.onload = startGame();

// Dynamically set the year on the copyright
credit.innerText = currentYear;