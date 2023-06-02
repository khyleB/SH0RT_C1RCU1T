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



function drawCard() {

  var randomCard = getRandomCard(playingDeck);
  return randomCard;

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



function makeMatrixSpacesClickable(array) {
 // Adds event listener to a given html element. This is not called directly with a signal, so don't worry about the multiple arguments - they are accounted for in line 235

  for (let space of array) {

    console.log(space);

    let clickableSpace = spaceSelectors[space.gridNum];

    clickableSpace.addClass('card-clickable');

  //  clickableSpace.on('click', callback);
  }

}



function makeMatrixSpacesUnclickable(array)
  // Removes event listener from a given html element

{

  let clickableSpace = spaceSelectors[space.gridNum];

  clickableSpace.removeClass('card-clickable');

  clickableSpace.off('click');

}

/*
 ____ ____ ____ ____ _________ ____ ____ ____ ____ ____ ____ _________ ____ ____ ____ ____ ____ ____ ____ ____ ____ 
||C |||a |||r |||d |||       |||F |||i |||l |||t |||e |||r |||       |||F |||u |||n |||c |||t |||i |||o |||n |||s ||
||__|||__|||__|||__|||_______|||__|||__|||__|||__|||__|||__|||_______|||__|||__|||__|||__|||__|||__|||__|||__|||__||
|/__\|/__\|/__\|/__\|/_______\|/__\|/__\|/__\|/__\|/__\|/__\|/_______\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|

// Functions either called directly by an observer or by other functions fired by that observer. They filter cards in space arrays, such as matrixSpaces and royalSpaces.*/



function findEmptySpaces(array) {
  // Goes through a space array and finds spaces with no cards. Duh! (Returns the array of empties)

  var emptySpaces = []

  for (let space of array) {

    if (space.cardStack.length === 0) {
      emptySpaces.push(space);
    }

  }

  return emptySpaces;

}



function findSuitMatches(array, card) {
  // Looks through an array to find criteria matches - ie. suit/colour. Returns an array of any matches found.

  let matches = [];
  for (let item of array) {
    if(item.cardStack[0].suit === card.suit) {
      matches.push(item.cardStack[0]);
    }
  }
  return matches;
}

function findColorMatches(array, card) {
  // Looks through an array to find criteria matches - ie. suit/colour. Returns an array of any matches found.

  let matches = [];
  for (let item of array) {
    if(item.cardStack[0].colour === card.colour) {
      matches.push(item.cardStack[0]);
    }
  }
  return matches;
}

function findHighestValueSuit(array) {
  // Finds the highest numerical cards in a given array and returns the results
  // Hi future Avi, please remember that this gets duplicate cards because of royal spaces sharing matrix space
  let highestCards = [];
  highestCards.push(array[0]);
  for (let card of array) {
    if (card.value >= highestCards[highestCards.length-1].value) {
      highestCards = [];
      highestCards.push(card);
    } else {
      console.log(`${card.name} is lower in value than ${highestCards[highestCards.length-1].name}!`);
    }
  }
  return highestCards[highestCards.length-1];
}

function findHighestValueColor (array) {
  let highestCards = [];
  highestCards.push(array[0]);
  for (let card of array) {
    if (card != highestCards[highestCards.length-1]) {
      if (card.value > highestCards[highestCards.length-1].value) {
        highestCards.push(card);
        highestCards.splice(0,highestCards.length-1)
      } 
      else if (card.value === highestCards[highestCards.length-1].value) {
        highestCards.push(card);
      }
      else {
        console.log(`${card.name} is lower in value than ${highestCards[highestCards.length-1].name}!`);
      }
    }
  }
    return highestCards[highestCards.length-1];
  }


function findHighestValue (array) {
  let highestCards = [];
  highestCards.push(array[0]);
  for (let card of array) {
    if (card != highestCards[highestCards.length-1]) {
      if (card.value > highestCards[highestCards.length-1].value) {
        highestCards.push(card);
        highestCards.splice(0,highestCards.length-1)
      } 
      else if (card.value === highestCards[highestCards.length-1].value) {
        highestCards.push(card);
      }
      else {
        console.log(`${card.name} is lower in value than ${highestCards[highestCards.length-1].name}!`);
      }
    }
  }
    return highestCards;
}

function findTopCards (array) {
  let matches = [];
  for (let item of array) {
      matches.push(item.cardStack[0]);
  }
  return matches;
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


// "In addition to that, you should use descriptive nouns and verbs as prefixes. For example, if we declare a function to retrieve a name, the function name should be getName."



function checkCardType(card) {
  // Checks if drawn card is a number card and fires the appropriate helper functions

  if (card.type === 'royal') {
  
    checkRoyalSpaces();      
  
  }

  else if (card.type === 'number') {

    checkNumberSpaces();

  }
}



function checkNumberSpaces() {
    
    //var emptySpaces = findEmptySpaces(matrixSpaces); 
    var validSpaces = findLowerValueCards(currentCard);

    if (validSpaces.length === 0) {
      gameOver()
    
    } else {
      makeMatrixSpacesClickable(validSpaces)
    }

}



function findLowerValueCards() {

  var lowerValueSpaces = [];

  for (let space of matrixSpaces) {
  
    if (space.cardStack.length === 0 || space.cardStack[0].value <= currentCard.value) {
      lowerValueSpaces.push(space)
    }
  }
  return lowerValueSpaces;
}



function checkRoyalSpaces() {
  // Hi future Avi, please remember that this gets duplicate cards because of royal spaces sharing matrix space
  var emptyRoyalSpaces = [];
    
  for (let space of royalSpaces) {

    if (space.cardStack.length === 0) {
      emptyRoyalSpaces.push(space);
    }
  }
  console.log(emptyRoyalSpaces);
  var adjacentMatrixSpaces = [];

  for (let space of emptyRoyalSpaces) {
    var adjMatrixSpace = space.adjSpace;
    adjMatrixSpace = matrixObjects[adjMatrixSpace]
    console.log(adjMatrixSpace);
    if (adjMatrixSpace.cardStack.length != 0) {
      adjacentMatrixSpaces.push(adjMatrixSpace);
    }
  }

  console.log(adjacentMatrixSpaces);
  var suitMatches = findSuitMatches(adjacentMatrixSpaces, currentCard);
  var colorMatches = findColorMatches(adjacentMatrixSpaces, currentCard);
  var valueMatches = findTopCards(adjacentMatrixSpaces);

  if (suitMatches.length != 0) {
    var highestValueCard = findHighestValueSuit(suitMatches);
    var arrayMatrixSpaces = [matrixObjects[highestValueCard.gridNum]];
    var arrayRoyalSpaces = convertMatrixToRoyalSpaces(arrayMatrixSpaces);
    makeMatrixSpacesClickable(arrayRoyalSpaces);
    return;
  }
  else if (colorMatches.length != 0) {
    var highestValueCard = findHighestValueColor(colorMatches);
    console.log(highestValueCard);
    var arrayMatrixSpaces = [matrixObjects[highestValueCard.gridNum]];
    var arrayRoyalSpaces = convertMatrixToRoyalSpaces(arrayMatrixSpaces);
    makeMatrixSpacesClickable(arrayRoyalSpaces);
    return;
  }
  else {
    var valueMatches = findTopCards(adjacentMatrixSpaces);
    var highestValue = findHighestValue(valueMatches);
    console.log(highestValue);
    if (highestValue.length > 1) {
      var arrayMatrixSpaces = [matrixObjects[highestValue[0].gridNum],matrixObjects[highestValue[1].gridNum]]
      console.log(arrayMatrixSpaces);
      var arrayRoyalSpaces = convertMatrixToRoyalSpaces(arrayMatrixSpaces);
      makeMatrixSpacesClickable(arrayRoyalSpaces);
      return;
    }
    else {
      var arrayMatrixSpaces = [matrixObjects[highestValue[0].gridNum]]
      console.log(arrayMatrixSpaces);
      var arrayRoyalSpaces = convertMatrixToRoyalSpaces(arrayMatrixSpaces);
      makeMatrixSpacesClickable(arrayRoyalSpaces);
      return;
    }

  }


/*
  var suitMatches = matchFinder('suit', adjacentMatrixSpaces, currentCard)
  console.log(suitMatches);



  var colourMatches = matchFinder('colour', adjacentMatrixSpaces, currentCard)

  if (suitMatches.length != 0) {
    var highestValue = findHighestValue(suitMatches)
    var highestAdjs = [];
    for (let adjacentSpace of highestValue.adjSpaces) {
      if (adjacentSpace != null) {
        highestAdjs.push(window[adjacentSpace])
      }
    }
    console.log(highestAdjs)
    makeMatrixSpacesClickable(highestAdjs)
    return;

  } 
  else if (suitMatches.length > 1) {

  }

  makeMatrixSpacesClickable(emptyRoyalSpaces)
*/
}


function convertMatrixToRoyalSpaces (array) {
  var relevantRoyalSpaces = []
  for (let space of array) {
    console.log(space.adjSpace)
    console.log(space.adjSpace2)
    console.log(royalObjects[space.adjSpace].cardStack.length)
    if (space.adjSpace !=  null && royalObjects[space.adjSpace].cardStack.length === 0) {
      relevantRoyalSpaces.push(royalObjects[space.adjSpace])
    }
    if (space.adjSpace2 != null && royalObjects[space.adjSpace2].cardStack.length === 0) {
      relevantRoyalSpaces.push(royalObjects[space.adjSpace2])
    }
  }
  console.log(relevantRoyalSpaces)
  return relevantRoyalSpaces
}
























currentCardObserver.subscribe(checkCardType);



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
  card.setGridNum(space.gridNum)
  console.log(card.gridNum)
  console.log(selector);
  selector.attr("src", card.img);
  space.cardStack.unshift(card);
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
    console.log(randomCardIndex);

    while(randomCardIndex === -1) {
      console.log(`Double card: ${randomCard.name}. Getting new card!`)
      randomCard = getRandomCard(numberDeck);
      randomCardIndex = playingDeck.indexOf(randomCard);
      console.log(`New card: ${randomCard.name}`);
    }

    spaceUpdate(matrixSpace, randomCard);
    cardRemover(randomCard, playingDeck);

    }
}

for (let space of allSpaces) {
  setImageMatrix(space, space);
}

$(window).on('load', gameSetup);
