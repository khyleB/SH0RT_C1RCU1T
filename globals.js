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

const royal1 = new RoyalSpot(null, 'r1', 'royal-space');
var r1 = {...royal1}; // This makes a copy of the object so it can be modified but the original stays the same (Y)
// I'm not sure if there is a more efficient way to do this than just assigning them all manually
//I'm also not sure if it would be smarter to establish the variables in the document where we'll be using them, since I assume we want to keep the bulky constructors in one document

const royal2 = new RoyalSpot(null, 'r2', 'royal-space');
var r2 = {...royal2};

const royal3 = new RoyalSpot(null, 'r3', 'royal-space');
var r3 = {...royal3};

const royal4 = new RoyalSpot(null, 'r4', 'royal-space');
var r4 = {...royal4};

const royal5 = new RoyalSpot(null, 'r5', 'royal-space');
var r5 = {...royal5};

const royal6 = new RoyalSpot(null, 'r6', 'royal-space');
var r6 = {...royal6};

const royal7 = new RoyalSpot(null, 'r7', 'royal-space');
var r7 = {...royal7};

const royal8 = new RoyalSpot(null, 'r8', 'royal-space');
var r8 = {...royal8};

const royal9 = new RoyalSpot(null, 'r9', 'royal-space');
var r9 = {...royal9};

const royal10 = new RoyalSpot(null, 'r10', 'royal-space');
var r10 = {...royal10};

const royal11 = new RoyalSpot(null, 'r11', 'royal-space');
var r11 = {...royal11};

const royal12 = new RoyalSpot(null, 'r12', 'royal-space');
var r12 = {...royal12};

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

/*               -------------------- Royal Object Creation --------------------               */

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
ovar clubAce = {...clubAceProto};

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











// This is just to remind myself what I gotta do:

/*Global data:
numerical_fields[], numerical_cards[], full_deck[], 
all_numerical_fields [ m1 … m9 ], setup_numerical_fields [ m1...m9, no m5],
free_royal_fields [r1…r12]
Field : Object { “card_stack” : array [ ], grind_num : int }, 
Card : Object { “grid_num” : int }*/
