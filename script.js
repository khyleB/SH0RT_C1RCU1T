/*

CURRENT ISSUES:
- Need to notify observer on drawpile click, but the "notify" function is attached to the subject object, which "drawpile" is not an interation of
- All cards have a "set gridNum" method that you must call when they're placed, AND remove when they're returned to the deck.


SUMMARY OF CHANGES 29/05/2023:
- Brought back "currentCard" variable since it is the only way I can understand how to refer to and alter game behaviour. It is called "currentCard" and is a var whose contents will be replaced whenever a card is drawn or placed
- Made a "noCard" variable so that instead of having seperate functions to set the blank card image, it will always just refer to currentCard and replace it with noCard when it's emptied. Whether the observer pattern will refer to this or it will be one of many events that fires from click events remains to be seen wrt efficiency



*/

"use strict";

/*
 ____ ____ ____ ____ ____ ____ _________ ____ ____ ____ ____ ____ ____ ____ ____ ____ 
||H |||e |||l |||p |||e |||r |||       |||F |||u |||n |||c |||t |||i |||o |||n |||s ||
||__|||__|||__|||__|||__|||__|||_______|||__|||__|||__|||__|||__|||__|||__|||__|||__||
|/__\|/__\|/__\|/__\|/__\|/__\|/_______\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\| */

// Remove var randomCard since you only want to use it locally. ✓
// Having it be public just tempts you to call it instead of currentCardSubject ✓
// Reminder to myself that you have to make it like "var [tempVar] = [function()]"



function clickOn(space, event)
 // Adds event listener to a given html element

{

  let clickableSpace = spaceSelectors[space];

  clickableSpace.addClass('card-clickable');

  clickableSpace.on('click', event);

}



function clickOff(space, event)
  // Removes event listener from a given html element

{

  let clickableSpace = spaceSelectors[space];

  clickableSpace.removeClass('card-clickable');

  clickableSpace.off('click');

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
  // All this does is set the text of the current card that has been drawn

  drawnCard.attr("src", card.img);
  drawnText.text(card.name);

}



function setImageMatrix(space, card) {
  // Sets image based on gridnum

  let imgSelector = $(`#${space.gridNum}`);
  imgSelector.attr("src", card.img);
}



function matchFinder(criteria, array, card) {
  // 

  let matches = [];
  for (let item of array) {
    if(item.adjSpace.criteria === card.criteria) {
      matches.push(item);
    }
  }
  return matches;
}



function highCardFinder(array) {
  //

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
      return;
    }
  }
}



/*
  __   __   __   __   __   __   __   __   _______   __   __   __   __   __   __   __   __   __
||O |||n |||. |||C |||l |||i |||c |||k |||       |||O |||b |||s |||e |||r |||v |||e |||r |||s ||
||__|||__|||__|||__|||__|||__|||__|||__|||_______|||__|||__|||__|||__|||__|||__|||__|||__|||__||
|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/_______\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|

*/


const currentCardObserver = new Observer(drawPile);

currentCardObserver.subscribe(setHtmlDrawnCard);

// Define function to check card placement

//currentCardObserver.subscribe([cardPlaceFunction]);


drawPile.on("click", () => {
  let data = drawCard(playingDeck);
  currentCard = data;
  currentCardObserver.notify(data);
});

/*

[htmlElement].on("click", () => {
  Observable.notify(event.target.id); // Notifies all subscribed observers
});

*/





/*function spaceClicked(card, space) {
  // Function 

  spaceUpdate(space, card);
  drawnCard.attr("src", "imgs/card-space-blank.png");
  currentCardSubject.state === null;
}*/



//currentCardObserver.subscribe(clickableSpaceCss); <-- This should maybe get kicked out of this section & just get called by another function



function cardSpaceFinderRoys(card) {
  
  let validSpaces = [];
  let currentRoyal = card;
  if (currentRoyal.type === 'royal') {
    
    validSpaces = matchFinder('suit', royalSpaces, currentRoyal);
    if(validSpaces.length === 0) {

      validSpaces = matchFinder('colour', royalSpaces, currentRoyal);
      if (validSpaces.length = 0) {
      
        validSpaces = royalSpaces;
      }
    }

    if (validSpaces[0] == true) {

      console.log(validSpaces[0]);
      validSpaces = highCardFinder(validSpaces);  

    } else {
      
      validSpaces = [...royalSpaces];
      console.log(validSpaces);
    }

    for (let space of validSpaces) {
      console.log(space);
        clickableSpaceCss(space.gridNum);
      }
  
  } else {
    return;
  }
}



function cardSpaceFinderNums(card) {
  let validSpaces = [];

  if (card.type === 'number') {
    for (let space of matrixSpaces) {
      if (space.cardStack[0] === undefined || card.value >= space.cardStack[0].value) {
        console.log(card.name);
        console.log(space);
        validSpaces.push(space.gridNum);
      }
    }
    for (let validSpace of validSpaces) {
      clickableSpaceCss(validSpace.gridNum);
    }

  } else {
    return;
  }
}



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



function cardSpaceClicked(event) {
  
  var clickedSpace = String(event.target.id);

  clickedSpaceSubject.setState(clickedSpace);
}



function drawCard() {

  //if (currentCardSubject.state === null) { < -- Future conditional when testing is done

  var randomCard = getRandomCard(playingDeck);
  return randomCard;

    // Next - clickableSpaceCss(randomCard ? OR - maybe this is an opportunity for observer pattern when randomCard is generated? Hm...)
  //}
}



drawPile.on('click', drawCard);

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

 console.log(playingDeck.length);
 
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

//Function remove_placed_cards_from_deck(placed_cards[], full_deck[]) – Return playing_deck[]
// This function is likely not needed any more, since we just remove cards right after we draw them
for (let space of allSpaces) {
  setImageMatrix(space, space);
}

gameSetup();
