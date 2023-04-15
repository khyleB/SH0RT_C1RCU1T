/*Hi Avi, I am using the object constructor from my original file with modifications. I'll leave you a note at each line explaining what's going on,
and you can let me know if any of it seems problematic (Y)*/

// Basic Card Space Constructor

"use strict"; // This enables strict mode which flags uncaught errors. I can omit it or keep it in, whichever seems smarter to you

class MatrixSpace { 
	
	constructor(topCard, gridNum, type) { // Sets up the object constructor. Duh :P
    
		this.topCard = topCard; // Like in python objects, you pass arguments(?) into the brackets when u make a new object and it refers to those values to assign ur object properties
		this.cardStack = [];

		this.gridNum = gridNum;
		this.type = type;
    
		this.img = 'imgs/card-space-blank.png';
	}
  
	setImage() {

		let imgSelector = $(`#${this.gridNum}`); // jQuery syntax for targetting the relevant html element. Every html element on the board has an id that lines up with the gridnums of these objects.

		imgSelector.attr("src", this.img);
	}

}

class NumberSpace extends MatrixSpace { // Making an object constructor for the number spaces in the matrix. Adding the adjacent spaces to do royal checks.
  
	constructor(topCard, gridNum, type, adjSpace1, adjSpace2, attackSpace1, attackSpace2) {

		super(topCard, gridNum, type);
		this.adjSpace1 = adjSpace1; //adjacent royal spaces. You can suggest better variable names
		this.adjSpace2 = adjSpace2;
    
    this.attackSpace1 = attackSpace1; // royal spaces that will be attacked when you place a card in this space. You can suggest better variable names
    this.attackSpace2 = attackSpace2;
	}
}

class RoyalSpace extends MatrixSpace { // Same as above, with royal spaces. 
  
	constructor(topCard, gridNum, type) {
		
    super(topCard, gridNum, type);
    
	}
  setDeathImage() { // Hoping it will be more efficient just to run a method to replace royal image when killed. It used to be handled in the big card place loop
   
    let imgSelector = $(`#${this.gridNum}`); 
    imgSelector.attr("src", imgs/dead-royal.png);
    
  }
}

// Royal space global variables

const royal1 = new royalSpace(null, 'r1', 'royal-space');
var r1 = {...royal1}; // This makes a copy of the object so it can be modified but the original stays the same (Y)
// I'm not sure if there is a more efficient way to do this than just assigning them all manually
//I'm also not sure if it would be smarter to establish the variables in the document where we'll be using them, since I assume we want to keep the bulky constructors in one document

const royal2 = new royalSpace(null, 'r2', 'royal-space');
var r2 = {...royal2};

const royal3 = new royalSpace(null, 'r3', 'royal-space');
var r3 = {...royal3};

const royal4 = new royalSpace(null, 'r4', 'royal-space');
var r4 = {...royal4};

const royal5 = new royalSpace(null, 'r5', 'royal-space');
var r5 = {...royal5};

const royal6 = new royalSpace(null, 'r6', 'royal-space');
var r6 = {...royal6};

const royal7 = new royalSpace(null, 'r7', 'royal-space');
var r7 = {...royal7};

const royal8 = new royalSpace(null, 'r8', 'royal-space');
var r8 = {...royal8};

const royal9 = new royalSpace(null, 'r9', 'royal-space');
var r9 = {...royal9};

const royal10 = new royalSpace(null, 'r10', 'royal-space');
var r10 = {...royal10};

const royal11 = new royalSpace(null, 'r11', 'royal-space');
var r11 = {...royal11};

const royal12 = new royalSpace(null, 'r12', 'royal-space');
var r12 = {...royal12};

// Number space global variables

const numSpace1 = new numberSpace(null, 'm1', 'number', 'r1', 'r12');
var m1 = {...numSpace1};

const numSpace2 = new numberSpace(null, 'm2', 'number', 'r2', null);
var m2 = {...numSpace2};

const numSpace3 = new numberSpace(null, 'm3', 'number', 'r3', 'r4');
var m3 = {...numSpace3};

const numSpace4 = new numberSpace(null, 'm4', 'number', 'r11', null);
var m4 = {...numSpace4};

const numSpace5 = new numberSpace(null, 'm5', 'number', null, null);
var m5 = {...numSpace5};

const numSpace6 = new numberSpace(null, 'm6', 'number', 'r5', null);
var m6 = {...numSpace6};

const numSpace7 = new numberSpace(null, 'm7', 'number', 'r9', 'r10');
var m7 = {...numSpace7};

const numSpace8 = new numberSpace(null, 'm8', 'number', 'r8', null);
var m8 = {...numSpace8};

const numSpace9 = new numberSpace(null, 'm9', 'number', 'r6', 'r7');
var m9 = {...numSpace9};

/*     ----------     Basic card constructor     ----------     */

class Card {
	constructor(img, name, value, gridNum) {
		this.img = img;
		this.name = name;
		this.value = value;
		this.gridNum = gridNum;
	}
}

// Ghost card for high/low comparison

const ghostCard = new Card(null, '0', -1, null);

/*     ---------- ~~~ Royal card constructor ~~~ ----------     */

class Royal extends Card {
	constructor(img, name, value, gridNum, suit, colour, type='royal') {

		super(img, name, value, gridNum);
		this.suit = suit;
		this.colour = colour;
		this.type = type;
	}
}

/*               -------------------- Royal Object Creation --------------------               */

const spadeKingProto = new Royal('imgs/spade-king.png', 'King of Spades', 13, null, 'spade', 'black');
var spadeKing = {...spadeKingProto};

const spadeQueenProto = new Royal('imgs/spade-queen.png', 'Queen of Spades', 12, null, 'spade', 'black');
var spadeQueen = {...spadeQueenProto};

const spadeJackProto = new Royal('imgs/spade-jack.png', 'Jack of Spades', 11, null, 'spade', 'black');
var spadeJack = {...spadeJackProto};

const heartKingProto = new Royal('imgs/heart-king.png', 'King of Hearts', 13, null, 'heart', 'red');
var heartKing = {...heartKingProto};

const heartQueenProto = new Royal('imgs/heart-queen.png', 'Queen of Hearts', 12, null, 'heart', 'red');
var heartQueen = {...heartQueenProto};

const heartJackProto = new Royal('imgs/heart-jack.png', 'Jack of Hearts', 11, null, 'heart', 'red');
var heartJack = {...heartJackProto};

const diamondKingProto = new Royal('imgs/diamond-king.png', 'King of Diamonds', 13, null, 'diamond', 'red');
var diamondKing = {...diamondKingProto};

const diamondQueenProto = new Royal('imgs/diamond-queen.png', 'Queen of Diamonds', 12, null, 'diamond', 'red');
var diamondQueen = {...diamondQueenProto};

const diamondJackProto = new Royal('imgs/diamond-jack.png', 'Jack of Diamonds', 11, null, 'diamond', 'red');
var diamondJack = {...diamondJackProto};

const clubKingProto = new Royal('imgs/club-king.png', 'King of Clubs', 13, null, 'club', 'black');
var clubKing = {...clubKingProto};

const clubQueenProto = new Royal('imgs/club-queen.png', 'Queen of Clubs', 12, null, 'club', 'black');
var clubQueen = {...clubQueenProto};

const clubJackProto = new Royal('imgs/club-jack.png', 'Jack of Clubs', 11, null, 'club', 'black');
var clubJack = {...clubJackProto};

//Spade card constructor

class Spade extends Card {
	constructor(img, name, value, gridNum, suit='spade', colour='black', type='number') {
		super(img, name, value, gridNum);
		this.suit = suit;
		this.colour = colour;
		this.type = type;
	}
}

/*               -------------------- Numbered Spades Object Creation --------------------               */

const spadeTwoProto = new Spade('imgs/spade-two.png', 'Two of Spades', 2, null);
var spadeTwo = {...spadeTwoProto};

const spadeThreeProto = new Spade('imgs/spade-three.png', 'Three of Spades', 3, null);
var spadeThree = {...spadeThreeProto};

const spadeFourProto = new Spade('imgs/spade-four.png', 'Four of Spades', 4, null);
var spadeFour = {...spadeFourProto};

const spadeFiveProto = new Spade('imgs/spade-five.png', 'Five of Spades', 5, null);
var spadeFive = {...spadeFiveProto};

const spadeSixProto = new Spade('imgs/spade-six.png', 'Six of Spades', 6, null);
var spadeSix = {...spadeSixProto};

const spadeSevenProto = new Spade('imgs/spade-seven.png', 'Seven of Spades', 7, null);
var spadeSeven = {...spadeSevenProto};

const spadeEightProto = new Spade('imgs/spade-eight.png', 'Eight of Spades', 8, null);
var spadeEight = {...spadeEightProto};

const spadeNineProto = new Spade('imgs/spade-nine.png', 'Nine of Spades', 9, null);
var spadeNine = {...spadeNineProto};

const spadeTenProto = new Spade('imgs/spade-ten.png', 'Ten of Spades', 10, null);
var spadeTen = {...spadeTenProto};

//Heart card constructor

class Heart extends Card {
	constructor(img, name, value, gridNum, suit='heart', colour='red', type='number') {
		super(img, name, value, gridNum);
		this.suit = suit;
		this.colour = colour;
		this.type = type;
	}
}

/*               -------------------- Numbered Hearts Object Creation --------------------               */

const heartTwoProto = new Heart('imgs/heart-two.png', 'Two of Hearts', 2, null);
var heartTwo = {...heartTwoProto};

const heartThreeProto = new Heart('imgs/heart-three.png', 'Three of Hearts', 3, null);
var heartThree = {...heartThreeProto};

const heartFourProto = new Heart('imgs/heart-four.png', 'Four of Hearts', 4, null);
var heartFour = {...heartFourProto};

const heartFiveProto = new Heart('imgs/heart-five.png', 'Five of Hearts', 5, null);
var heartFive = {...heartFiveProto};

const heartSixProto = new Heart('imgs/heart-six.png', 'Six of Hearts', 6, null);
var heartSix = {...heartSixProto};

const heartSevenProto = new Heart('imgs/heart-seven.png', 'Seven of Hearts', 7, null);
var heartSeven = {...heartSevenProto};

const heartEightProto = new Heart('imgs/heart-eight.png', 'Eight of Hearts', 8, null);
var heartEight = {...heartEightProto};

const heartNineProto = new Heart('imgs/heart-nine.png', 'Nine of Hearts', 9, null);
var heartNine = {...heartNineProto};

const heartTenProto = new Heart('imgs/heart-ten.png', 'Ten of Hearts', 10, null);
var heartTen = {...heartTenProto};

//Diamond card constructor

class Diamond extends Card {
	constructor(img, name, value, gridNum, suit='diamond', colour='red', type='number') {
		super(img, name, value, gridNum);
		this.type = type;
		this.suit = suit;
		this.colour = colour;
	}
}

/*               -------------------- Numbered Diamonds Object Creation --------------------               */

const diamondTwoProto = new Diamond('imgs/diamond-two.png', 'Two of Diamonds', 2, null);
var diamondTwo = {...diamondTwoProto};

const diamondThreeProto = new Diamond('imgs/diamond-three.png', 'Three of Diamonds', 3, null);
var diamondThree = {...diamondThreeProto};

const diamondFourProto = new Diamond('imgs/diamond-four.png', 'Four of Diamonds', 4, null);
var diamondFour = {...diamondFourProto};

const diamondFiveProto = new Diamond('imgs/diamond-five.png', 'Five of Diamonds', 5, null);
var diamondFive = {...diamondFiveProto};

const diamondSixProto = new Diamond('imgs/diamond-six.png', 'Six of Diamonds', 6, null);
var diamondSix = {...diamondSixProto};

const diamondSevenProto = new Diamond('imgs/diamond-seven.png', 'Seven of Diamonds', 7, null);
var diamondSeven = {...diamondSevenProto};

const diamondEightProto = new Diamond('imgs/diamond-eight.png', 'Eight of Diamonds', 8, null);
var diamondEight = {...diamondEightProto};

const diamondNineProto = new Diamond('imgs/diamond-nine.png', 'Nine of Diamonds', 9, null);
var diamondNine = {...diamondNineProto};

const diamondTenProto = new Diamond('imgs/diamond-ten.png', 'Ten of Diamonds', 10, null);
var diamondTen = {...diamondTenProto};

//Club card constructor

class Club extends Card {
	constructor(img, name, value, gridNum, suit='club', colour='black', type='number') {
		super(img, name, value, gridNum);
		this.suit = suit;
		this.colour = colour;
		this.type = type;
	}
}

/*               -------------------- Numbered Clubs Object Creation --------------------               */

const clubTwoProto = new Club('imgs/club-two.png', 'Two of Clubs', 2, null);
var clubTwo = {...clubTwoProto};

const clubThreeProto = new Club('imgs/club-three.png', 'Three of Clubs', 3, null);
var clubThree = {...clubThreeProto};

const clubFourProto = new Club('imgs/club-four.png', 'Four of Clubs', 4, null); 
var clubFour = {...clubFourProto};

const clubFiveProto = new Club('imgs/club-five.png', 'Five of Clubs', 5, null);
var clubFive = {...clubFiveProto};

const clubSixProto = new Club('imgs/club-six.png', 'Six of Clubs', 6, null);
var clubSix = {...clubSixProto};

const clubSevenProto = new Club('imgs/club-seven.png', 'Seven of Clubs', 7, null);
var clubSeven = {...clubSevenProto};

const clubEightProto = new Club('imgs/club-eight.png', 'Eight of Clubs', 8, null);
var clubEight = {...clubEightProto};

const clubNineProto = new Club('imgs/club-nine.png', 'Nine of Clubs', 9, null);
var clubNine = {...clubNineProto};

const clubTenProto = new Club('imgs/club-ten.png', 'Ten of Clubs', 10, null);
var clubTen = {...clubTenProto};

/*     ---------- ~~~ Ace card constructor ~~~ ----------     */

class Ace extends Card {
	constructor(img, name, value, gridNum, suit, colour, type='ace') {

		super(img, name, value, gridNum);
		this.suit = suit;
		this.colour = colour;
		this.type = type;
	}
}

/*               -------------------- Ace Object Creation --------------------               */

const spadeAceProto = new Ace('imgs/spade-ace.png', 'Ace of Spades', 1, null, 'spade', 'black');
var spadeAce = {...spadeAceProto};

const heartAceProto = new Ace('imgs/heart-ace.png', 'Ace of Hearts', 1, null, 'heart', 'red');
var heartAce = {...heartAceProto};

const diamondAceProto = new Ace('imgs/diamond-ace.png', 'Ace of Diamonds', 1, null, 'diamond', 'red');
var diamondAce = {...diamondAceProto};

const clubAceProto = new Ace('imgs/club-ace.png', 'Ace of Clubs', 1, null, 'club', 'black');
var clubAce = {...clubAceProto};

/*     ---------- ~~~ Joker card constructor ~~~ ----------     */

class Joker extends Card {
	constructor(img, name, value, gridNum, suit=null, colour=null, type='joker') {

		super(img, name, value, gridNum);
		this.suit = suit;
		this.colour = colour;
		this.type = type;
	}
}

/*               -------------------- Joker Object Creation --------------------               */

const redJokerProto = new Joker('imgs/joker-red.png', 'Red Joker', 0, null);
var redJoker = {...redJokerProto};

const blackJokerProto = new Joker('imgs/joker-black.png', 'Black Joker', 0, null);
var blackJoker = {...blackJokerProto};

const numberSpaces = [m1, m2, m3, m4, m5, m6, m7, m8, m9];

const numberSpacesSetup = [m1, m2, m3, m4, m6, m7, m8, m9];

const royalSpaces = [r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12];

const fullDeck = []








// This is just to remind myself what I gotta do:

/*Global data:
numerical_fields[], numerical_cards[], full_deck[], 
all_numerical_fields [ m1 … m9 ], setup_numerical_fields [ m1...m9, no m5],
free_royal_fields [r1…r12]
Field : Object { “card_stack” : array [ ], grind_num : int }, 
Card : Object { “grid_num” : int }*/
