"use strict";


// To be fixed: Replace all 2s, since they're slightly larger than the other playing cards.
// To be fixed: Replace the odd looking 5.
// To be added: Tutorial screen to replace the tutorial bar.
// BUG: I was allowed to place the 4 of clubs over the 5 of diamonds. The 4 of clubs was also added at the end of 
// the card stack not the beginning like it's supposed to.
// Update it seems its the mislabelled 5 of clubs. I think we never merged your new image to GitHub.



for (let space of allSpaces) {
  setImageMatrix(space, space);
}

$(window).on('load', gameSetup);



// Shows the tutorial screen
rulesButton.on('click', () => {
  tutorialOverlay.toggle('expand-rules');
})



// Hides the tutorial screen
tutorialButton.on('click', () => {
  tutorialOverlay.toggle('overlay')
})


// Resets game state
newGameButton.on("click", () => {

  // Resets all data to be like the beginning of the game
  resetData(); 

  // Repopulates the playingDeck with fullDeck
  gameSetup();
  
 });
 


 function resetData () {
  // Reset the draw pile
  scoreValue = 0;
  drawPile.removeClass('card-clickable');
  currentCard = noCard;
  setHtmlDrawnCard(currentCard);

  // Reset all spaces
  for (let space of allSpaces) {
    // How does this function work? It needs a ard argument, but we pass it 2 space objects.
    setImageMatrix(space, space);
    space.setImg('imgs/card-space-blank.png');
    space.cardStack = [];
    makeMatrixSpacesUnclickable(allSpaces)
  }

  // Reset all cards
  for (let card of fullDeck) {
    card.gridNum = null;
    // How do you reset the health/value of the royal cards?
  }
}




/*
                ▄▀▄     ▄▀▄          ____ ____ ____ _________ ____ ____ ____ ____ _________ ____ ____ ____ ____ ____          ▄▀▄     ▄▀▄  
               ▄█░░▀▀▀▀▀░░█▄        ||N |||e |||w |||       |||G |||a |||m |||e |||       |||L |||o |||o |||p |||! ||        ▄█░░▀▀▀▀▀░░█▄        
           ▄▄  █░░░░░░░░░░░█  ▄▄    ||__|||__|||__|||_______|||__|||__|||__|||__|||_______|||__|||__|||__|||__|||__||    ▄▄  █░░░░░░░░░░░█  ▄▄    
          █▄▄█ █░░▀░░┬░░▀░░█ █▄▄█   |/__\|/__\|/__\|/_______\|/__\|/__\|/__\|/__\|/_______\|/__\|/__\|/__\|/__\|/__\|   █▄▄█ █░░▀░░┬░░▀░░█ █▄▄█   
*/



//Function setup(setup_numerical_fields[] ✓, numerical_cards[] ✓)

function gameSetup() {
 
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

    updateSpace(matrixSpace, randomCard);
    cardRemover(randomCard, playingDeck);

    }
    drawPile.addClass('card-clickable')
}





/*
 ____ ____ ____ ____ ____ ____ _________ ____ ____ ____ ____ ____ ____ ____ ____ ____ 
||H |||e |||l |||p |||e |||r |||       |||F |||u |||n |||c |||t |||i |||o |||n |||s ||
||__|||__|||__|||__|||__|||__|||_______|||__|||__|||__|||__|||__|||__|||__|||__|||__||
|/__\|/__\|/__\|/__\|/__\|/__\|/_______\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|/__\|

// Functions with a somewhat general purpose that will be called by other functions. Not tied directly to any observers.*/



function getRandomCard(array) {
  // Rolls a random number and gets the card at that index

  if(array.length === 0) {
    gameOver("Game Over - You're out of cards!");
    return;
  }

  let randCardIndex = Math.floor(Math.random() * (array.length));
  return array[randCardIndex];

}



function gameOver(message) {
  // Game over function!

  alert(message);
  // [unsubscribe all observer subscriptions here]
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
    gameOver("Game Over - You're out of cards!");
  }
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
   let clickableSpace = spaceSelectors[space.gridNum];
   clickableSpace.addClass('card-clickable');
   clickableSpace.on('click', function () {resetCardStack(space)});
   clickableSpace.on('click', function () {updateSpace(space ,currentCard)});
   clickableSpace.on('click', function () {attackRoyal(space)});
   clickableSpace.on('click', function () {setHtmlDrawnCard(noCard); currentCard=noCard; makeMatrixSpacesUnclickable(array); drawPile.addClass('card-clickable'); });
  }
}



function makeMatrixSpacesUnclickable(array)
  // Removes event listener from a given html element

{
  for (let space of array) {
    let clickableSpace = spaceSelectors[space.gridNum];

    clickableSpace.removeClass('card-clickable');

    clickableSpace.off('click');
  }
}



function miscTestFunction(data) {
  // Obviously will be deleted when all functions are in place, just helps me test my signals and click events! :D

  alert(data + " has been passed into me, your test function! :D");

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



// takes an array of cards
function findLowestValue(array) {
  let lowestCards = [array[0]];
  for (let card of array) {
    if (card.value === lowestCards[lowestCards.length-1].value) {
      lowestCards.push(card);
      console.log(lowestCards)
    }
    else if (card.value < lowestCards[lowestCards.length-1].value) {
      lowestCards = [];
      lowestCards.push(card);
      console.log(lowestCards)
    }
  }
  console.log(lowestCards);

  let lowestCardSpaces = [];
  for (let space of lowestCards) {
    lowestCardSpaces.push(matrixObjects[space.gridNum]);
  }
  return lowestCardSpaces;
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

  else if (card.type === 'ace') {

    checkAceSpaces();

  }

  else {
    checkJokerSpaces();
  }
}



function checkNumberSpaces() {
    
    //var emptySpaces = findEmptySpaces(matrixSpaces); 
    var validSpaces = findLowerValueCards(currentCard);

    if (validSpaces.length === 0) {
      gameOver("Game Over - You can't play your card!")
    
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


  // First we put all royal spaces with no cards into the array emptyRoyalSpaces
  var emptyRoyalSpaces = [];
  
  for (let space of royalSpaces) {

    if (space.cardStack.length === 0) {
      emptyRoyalSpaces.push(space);
    }
  }
  console.log(emptyRoyalSpaces);


  // Then we put all the matrix spaces adjacent to the empty royal spaces in the array adjacentMatrixSpaces
  var adjacentMatrixSpaces = [];

  for (let space of emptyRoyalSpaces) {
    var adjMatrixSpace = space.adjSpace;
    // matrixObjects is a dict that we can use to find space objects based on a string 
    adjMatrixSpace = matrixObjects[adjMatrixSpace]
    console.log(adjMatrixSpace);
    if (adjMatrixSpace.cardStack.length != 0) {
      adjacentMatrixSpaces.push(adjMatrixSpace);
    }
  }
  console.log(adjacentMatrixSpaces);


  // Then we check all the adjacent matrix spaces for top cards with matching suits, color or highest value
  var suitMatches = findSuitMatches(adjacentMatrixSpaces, currentCard);
  var colorMatches = findColorMatches(adjacentMatrixSpaces, currentCard);
  var valueMatches = findTopCards(adjacentMatrixSpaces);


  // If there is a suit match on one of the adjacent matrix spaces, highlight its neighboring empty royal spaces
  if (suitMatches.length != 0) {
    var highestValueCard = findHighestValueSuit(suitMatches);
    var arrayMatrixSpaces = [matrixObjects[highestValueCard.gridNum]];
    var arrayRoyalSpaces = convertMatrixToRoyalSpaces(arrayMatrixSpaces);
    makeMatrixSpacesClickable(arrayRoyalSpaces);
    return;
  }


  // If there is a no suit, but a color match on one of the adjacent matrix spaces, 
  // highlight its neighboring empty royal spaces
  else if (colorMatches.length != 0) {
    var highestValueCard = findHighestValueColor(colorMatches);
    console.log(highestValueCard);
    var arrayMatrixSpaces = [matrixObjects[highestValueCard.gridNum]];
    var arrayRoyalSpaces = convertMatrixToRoyalSpaces(arrayMatrixSpaces);
    makeMatrixSpacesClickable(arrayRoyalSpaces);
    return;
  }


  // Else check for the card with the highest value and highlight its neighboring empty royal spaces
  else {
    var valueMatches = findTopCards(adjacentMatrixSpaces);
    var highestValue = findHighestValue(valueMatches);
    console.log(highestValue);
    // If cards are tied for the highest value, then highlight both of their neighboring empty royal spaces
    if (highestValue.length > 1) {
      var arrayMatrixSpaces = [matrixObjects[highestValue[0].gridNum],matrixObjects[highestValue[1].gridNum]]
      console.log(arrayMatrixSpaces);
      var arrayRoyalSpaces = convertMatrixToRoyalSpaces(arrayMatrixSpaces);
      makeMatrixSpacesClickable(arrayRoyalSpaces);
      return;
    }
    // if there is one card with the highest value, then highlight its neighboring empty royal spaces
    else {
      var arrayMatrixSpaces = [matrixObjects[highestValue[0].gridNum]]
      console.log(arrayMatrixSpaces);
      var arrayRoyalSpaces = convertMatrixToRoyalSpaces(arrayMatrixSpaces);
      makeMatrixSpacesClickable(arrayRoyalSpaces);
      return;
    }
  }
}



// Takes arrays of matrix spaces and finds their empty adjacent royal spaces
function convertMatrixToRoyalSpaces (array) {
  var relevantRoyalSpaces = []
  for (let space of array) {
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


function checkAceSpaces() {
  makeMatrixSpacesClickable(matrixSpaces);
}


function checkJokerSpaces() {
  var topCards = []
  for (let space of matrixSpaces) {
    if (space.cardStack.length != 0) {
      topCards.push(space.cardStack[0]);
    } 
  }
  console.log(topCards)
  var jokerSpaces = findLowestValue(topCards);
  makeMatrixSpacesClickable(jokerSpaces);
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
    drawPile.removeClass('card-clickable')
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



function updateSpace(space, card) {
  let selector = spaceSelectors[space.gridNum];
  card.setGridNum(space.gridNum)
  selector.attr("src", card.img);
  space.cardStack.unshift(card);
}



//checks if a royal is present and attacks
function attackRoyal (space) {

  var royalTargets = []
  if (space.type != 'royal-space') {
    royalTargets = getAttackTargets(space);
    console.log(royalTargets);
  }
  else {
    return;
  }

  // check that there is at least 1 royal target
  if (royalTargets.length != 0) {
    var attackCards = [];
    var targetCard;

    // we're checking one royal at a time
    for (let target of royalTargets) {
      // target is a royal space and the function returns an array with the attacker cards
      attackCards = getAttackers(target);
      targetCard = getTargetCard(target);
       //check if both attack cards are present
      console.log(attackCards)
      if (attackCards.length === 2) {
        evaluateRoyalTarget(attackCards, targetCard )
      }
      else {
        return;
      }
    }

  // if there ar no royal targets end the function
  }
  else {
    return;
  }
}


// returns an array with the royal space objects to attack
function getAttackTargets (space) {
  var attackArray = [];
  if (space.attackSpace1 != null && royalObjects[space.attackSpace1].cardStack != 0 ) {
    attackArray.push(royalObjects[space.attackSpace1]);
  }
  if (space.attackSpace2 != null && royalObjects[space.attackSpace2].cardStack != 0) {
    attackArray.push(royalObjects[space.attackSpace2]);
  }
  console.log(attackArray)
  return attackArray;
}


// returns all number cards involved in attack
function getAttackers (target) {
  var attackers = [matrixObjects[target.attacker1], matrixObjects[target.attacker2]]
  var attackerCards = [];
  for (let attacker of attackers) {

    if (attacker.cardStack.length > 0 ) {
      attackerCards.push(attacker.cardStack[0])
    }
  }
  return attackerCards;
}



function getTargetCard(target) {
  return target.cardStack[0];
}




function evaluateRoyalTarget(attackCards, targetCard) {
  if (targetCard.rank === 'jack') {
    attackTarget(attackCards, targetCard);
  }
  else if (targetCard.rank === 'queen') {
    if (targetCard.colour === attackCards[0].colour && targetCard.colour === attackCards[1].colour )
      attackTarget(attackCards, targetCard);
  }
  else {
    if (targetCard.suit === attackCards[0].suit && targetCard.suit === attackCards[1].suit )
      attackTarget(attackCards, targetCard);

  }  
}


function attackTarget (attackCards, targetCard) {
  if (targetCard.value <= attackCards[0].value + attackCards[1].value) {
    updateSpace(royalObjects[targetCard.gridNum], graveyard);
    updateScore(targetCard.value);
  }
}



function resetCardStack (space) {
  if (space.type != 'royal-space' && currentCard.type === 'joker' || space.type != 'royal-space' && currentCard.type === 'ace') {
    addCardsToDeck(space.cardStack);
    console.log(space.cardStack);
    space.cardStack.length = 0;
  }
}



function addCardsToDeck(cardStack) {
  for (let card of cardStack) {
    alert(card.name + ' has been added to the deck.')
    playingDeck.push(card);
  }
}



function updateScore(value) {
  scoreValue = scoreValue + value;
  Score.html(scoreValue);
}