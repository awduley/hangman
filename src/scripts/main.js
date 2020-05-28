let currentYear = new Date().getFullYear();
let quote = document.querySelector('.quote-container');
const credit = document.querySelector('.footer-credit span');
const letters = document.getElementsByClassName('letter');
const keys = document.getElementsByClassName('key');
const overlays = document.getElementsByClassName('overlay');

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

// Add visible class to the overlays so they disappear
const overlayArray = Array.from(overlays);
overlayArray.forEach(overlay => {
  overlay.addEventListener('click', () => {
    overlay.classList.remove('visible');
  });
});

// Function to randomly change the color of each letter in the title
let lettersArray = Array.from(letters);
lettersArray.forEach(letter => {
  let randNum = Math.floor(Math.random() * colorArray.length);
  letter.style.color = colorArray[randNum];
})

let quoteArray = [];
let visibleQuoteArray = [];

// Fetch random quote
fetch('https://type.fit/api/quotes')
  .then(res => res.json())
  .then(data => {
    //randQuote(data);
  })
  //.catch(err => console.log('Error:', err));

// Function to pick random quote and set letters to _s
function randQuote(data) {
  let randNum = Math.floor(Math.random() * data.length);
  quoteArray = data[randNum].text.split('');
  console.log(quoteArray)

  for(let i = 0; i < quoteArray.length; i ++) {
    switch(quoteArray[i]) {
      case ' ':
        visibleQuoteArray[i] = ' '
        break;
      case '.':
        visibleQuoteArray[i] = '.';
        break;
      case ',':
        visibleQuoteArray[i] = ',';
        break;
      case ':':
        visibleQuoteArray[i] = ':';
        break;
      case ';':
        visibleQuoteArray[i] + ';';
        break
      case '"': 
        visibleQuoteArray[i] = '"';
        break;
      case "'":
        visibleQuoteArray[i] = "'";
        break;
      case "-":
        visibleQuoteArray[i] = '-';
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

allKeys.forEach(key => {
  key.addEventListener('click', () => {
    for(let i = 0; i < quoteArray.length; i ++) {
      if(quoteArray[i].toUpperCase() === key.innerText) {
        visibleQuoteArray[i] = quoteArray[i];
        quote.innerText = visibleQuoteArray.join('');
      }
    }
  });
});

// Dynamically set the year on the copyright
credit.innerText = currentYear;