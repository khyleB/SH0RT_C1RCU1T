/*
Function setup(setup_numerical_fields[], numerical_cards[]) – Return placed_cards[ card.grid_num ]
*/

function gameSetup() {
  for (let numberSpace of numberSpacesSetup) {
  getRandomCard(numberDeck)
    // then remove card from playing deck and insert it into space
  }
}

function setCurrentCard(card) {
  currentCard = card;
  drawnCard.attr("src", currentCard.img);
  drawnText.innerText = 'currentCard.name';
}



function getRandomCard(array) {

  let randCardIndex = Math.floor(Math.random() * (array.length-1)); // Gets a random index number from the array passed in
  let randomCard = array[randCardIndex]; // Gets the card at that index and puts it in a variable
  array.splice(randCardIndex, 1); // This is where I'll need your help - originally I took the card out of the array. Do we want that?
  setCurrentCard(randomCard);
}
