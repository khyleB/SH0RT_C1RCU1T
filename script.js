"use strict";

/*
 ____ ____ ____ ____ ____ ____ _________ ____ ____ ____ ____ ____ ____ ____ ____ ____ 
||H |||e |||l |||p |||e |||r |||       |||F |||u |||n |||c |||t |||i |||o |||n |||s ||
||__|||__|||__|||__|||__|||__|||_______|||__|||__|||__|||__|||__|||__|||__|||__|||__||
|/__\|/__\|/__\|/__\|/__\|/__\|/_______\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|

// Functions with a somewhat general purpose that will be called by other functions. Not tied directly to any observers.*/



function miscTestFunction(data) {
  // Obviously will be deleted when all functions are in place, just helps me test my signals and click events! :D

  alert(data + " has been passed into me, your test function! :D");

}
  


function getRandomCard(array) {
  // Rolls a random number and gets the card at that index

  if(array.length === 0) {
    gameOver();
    return;
  }

  let randCardIndex = Math.floor(Math.random() * (array.length));
  return array[randCardIndex];

}



function cardRemover(card, array) {
  // Removes a card from a given array

  let cardIndex = array.indexOf(card);
  array.splice(cardIndex, 1);

  if(array.length === 0) {
    drawPile.attr("src", "imgs/card-space-blank.png");
    gameOver();
  }
}



function gameOver() {
  // Game over function!

  alert("Draw pile empty - game over!");
  // [unsubscribe all observer subscriptions here]
}



function setHtmlDrawnCard(card) {
  // All this does is set the text & image of the current card that has been drawn

  drawnCard.attr("src", card.img);
  drawnText.text(card.name);

}



function setImageMatrix(space, card) {
  // Sets image based on gridnum

  let imgSelector = $(`#${space.gridNum}`);
  imgSelector.attr("src", card.img);
}



function clickOnMatrix(space, callback)
 // Adds event listener to a given html element. This is not called directly with a signal, so don't worry about the multiple arguments - they are accounted for in line 235

{

  console.log("clickOnMatrix successfully called!")

  let clickableSpace = spaceSelectors[space];

  clickableSpace.addClass('card-clickable');

  clickableSpace.on('click', callback);

}



function clickOffMatrix(space)
  // Removes event listener from a given html element

{

  let clickableSpace = spaceSelectors[space];

  clickableSpace.removeClass('card-clickable');

  clickableSpace.off('click');

}

/*
 ____ ____ ____ ____ _________ ____ ____ ____ ____ ____ ____ _________ ____ ____ ____ ____ ____ ____ ____ ____ ____ 
||C |||a |||r |||d |||       |||F |||i |||l |||t |||e |||r |||       |||F |||u |||n |||c |||t |||i |||o |||n |||s ||
||__|||__|||__|||__|||_______|||__|||__|||__|||__|||__|||__|||_______|||__|||__|||__|||__|||__|||__|||__|||__|||__||
|/__\|/__\|/__\|/__\|/_______\|/__\|/__\|/__\|/__\|/__\|/__\|/_______\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|

// Functions either called directly by an observer or by other functions fired by that observer. They filter cards in space arrays, such as matrixSpaces and royalSpaces.*/



function emptySpaceFinder(array) {
  // Goes through a space array and finds spaces with no cards. Duh! (Returns the array of empties)

  var emptySpaces = []

  for (let space of array) {

    if (space.cardStack.length === 0) {
      emptySpaces.push(space);
    }

  }

  return emptySpaces;

}



function matchFinder(criteria, array, card) {
  // Looks through an array to find criteria matches - ie. suit/colour. Returns an array of any matches found.

  let matches = [];
  for (let item of array) {
    if(item.adjSpace.criteria === card.criteria) {
      matches.push(item);
    }
  }
  return matches;
}



function highCardFinder(array) {
  // Finds the highest numerical cards in a given array and returns the results

  let highestCards = [];
  highestCards.push(array[0]);
  
  for (let card of array) {
    if (card.value > highestCards[0] || card.value > highestCards[1]) {
      highestCards = [];
      highestCards.push(card);

    } else if (card.value === highestCards[0]) {
      highestCards.push(card);

    } else {
      console.log(`${card.name} is lower in value than ${highestCards[0].name}!`);
      console.log(highestCards.length);
    }
  }
  return highestCards;
}



/*
  __   __   __   __   __   __   __   __   _______   __   __   __   __   __   __   __   __   __
||O |||n |||. |||C |||l |||i |||c |||k |||       |||O |||b |||s |||e |||r |||v |||e |||r |||s ||
||__|||__|||__|||__|||__|||__|||__|||__|||_______|||__|||__|||__|||__|||__|||__|||__|||__|||__||
|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/_______\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|

*/

const currentCardObserver = new Observer(drawPile);
// Observes drawpile clicks

currentCardObserver.subscribe(setHtmlDrawnCard);
// Subscribes "setHtmlDrawnCard" to be fired every time the draw pile is clicked & the current card is updated.

const matrixClickObserver = new Observer(matrixSpaces);

matrixClickObserver.subscribe(miscTestFunction);

function cardCheckerMatrix(card) {
  // Checks if drawn card is a number card and fires the appropriate helper functions

    if (card.type === 'royal') {
  
    return;
  
  } else {

    var newCard = card;
    var emptySpaces = emptySpaceFinder(matrixSpaces);
    for (let space of emptySpaces) {
    
      clickOnMatrix(space.gridNum, (event) => {
        var data = event.target.id;
        matrixClickObserver.notify(data);
    
      });
    }

    // function(newCard, array)

  }
}



currentCardObserver.subscribe(cardCheckerMatrix);



function cardCheckerRoyal(card) {
  // WIP FUNCTION - DOES NOTHING YET! :)
  // Checks if drawn card is royal and fires the appropriate helper functions
  
  if (card.type != 'royal') {
  
    return;
  
  } else {

    var newRoyal = card;
    // function(newRoyal, array)

  }
}



currentCardObserver.subscribe(cardCheckerRoyal);




// Define function to check card placement

/*

 ____ ____ ____ ____ _________ ____ ____ ____ ____ ____ _________ ____ ____ ____ ____ ____ ____ ____ ____ ____ 
||H |||T |||M |||L |||       |||C |||l |||i |||c |||k |||       |||F |||u |||n |||c |||t |||i |||o |||n |||s ||
||__|||__|||__|||__|||_______|||__|||__|||__|||__|||__|||_______|||__|||__|||__|||__|||__|||__|||__|||__|||__||
|/__\|/__\|/__\|/__\|/_______\|/__\|/__\|/__\|/__\|/__\|/_______\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|

Example past Khyle needed that I'm keeping just in case lol:
/*

[htmlElement].on("click", () => {
  Observable.notify(event.target.id); // Notifies all subscribed observers
});

*/

drawPile.on("click", () => {

  if(currentCard != noCard) {

    return;
  
  } else {
  
    let data = drawCard(playingDeck);
    cardRemover(data, playingDeck);
    currentCard = data;
    currentCardObserver.notify(data);
  
  }
});



/*
 ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ _________ ____ ____ ____ ____ ____ ____ ____ ____ ____ 
||C |||l |||i |||c |||k |||e |||d |||S |||p |||a |||c |||e |||       |||O |||b |||s |||e |||r |||v |||e |||r |||s ||
||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__|||_______|||__|||__|||__|||__|||__|||__|||__|||__|||__||
|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/_______\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|
*/



/* new subject - clickedSpace. Observer should fire:
- updateGridTopCard
- updateGridCardStack
- royalAttacker(if number)
*/



/*Function make_clickable(deck)
Input on_deck_clicked() → function make_uncklickable(deck)
Input on_deck_clicked() → function draw_card(playing_deck[]) return current_card
Function remove_current_card_from_deck(current_card, playing_deck[])
*/



function spaceUpdate(space, card) {
  let selector = spaceSelectors[space.gridNum];
  console.log(selector);
  selector.attr("src", card.img);
  space.cardStack.unshift(card);
}



function drawCard() {

  var randomCard = getRandomCard(playingDeck);
  return randomCard;

}


/*
                ▄▀▄     ▄▀▄          ____ ____ ____ _________ ____ ____ ____ ____ _________ ____ ____ ____ ____ ____          ▄▀▄     ▄▀▄  
               ▄█░░▀▀▀▀▀░░█▄        ||N |||e |||w |||       |||G |||a |||m |||e |||       |||L |||o |||o |||p |||! ||        ▄█░░▀▀▀▀▀░░█▄        
           ▄▄  █░░░░░░░░░░░█  ▄▄    ||__|||__|||__|||_______|||__|||__|||__|||__|||_______|||__|||__|||__|||__|||__||    ▄▄  █░░░░░░░░░░░█  ▄▄    
          █▄▄█ █░░▀░░┬░░▀░░█ █▄▄█   |/__\|/__\|/__\|/_______\|/__\|/__\|/__\|/__\|/_______\|/__\|/__\|/__\|/__\|/__\|   █▄▄█ █░░▀░░┬░░▀░░█ █▄▄█   
*/



//Function setup(setup_numerical_fields[] ✓, numerical_cards[] ✓)

function gameSetup() {

  currentCard = noCard;
 
  playingDeck = [...fullDeck]

  for (let matrixSpace of matrixSpacesSetup) {

    var randomCard = getRandomCard(numberDeck);
    let randomCardIndex = playingDeck.indexOf(randomCard);

    while(randomCardIndex === -1) {
      console.log(`Double card: ${randomCard.name}. Getting new card!`)
      randomCard = getRandomCard(numberDeck);
      randomCardIndex = playingDeck.indexOf(randomCard);
      console.log(`New card: ${randomCard.name}`);
    }

    spaceUpdate(matrixSpace, randomCard);
    cardRemover(randomCard, playingDeck);

    // function placeCard(randomCard); - still needs to be written
    //setImage(matrixSpace, randomCard);
    // placedCards.push(randomCard);

    }
}



$(window).on('load', gameSetup);
