// Basic Card Space Constructor

"use strict"; // This enables strict mode which flags uncaught errors. I can omit it or keep it in, whichever seems smarter to you

class Space {
	constructor(gridNum, type, adjSpace) { // Sets up the object constructor. Duh :P

		this.gridNum = gridNum;
		this.type = type;
		this.cardStack = [];
		this.adjSpace= adjSpace; //adjacent royal spaces. You can suggest better variable names
		var img;
	}

	getImg() {
    return this.img;
  }
	
	setImg(img) {
	  this.img=img;
	}

}

class MatrixSpace extends Space { // Making an object constructor for the number spaces in the matrix. Adding the adjacent spaces to do royal checks.
  
	constructor(gridNum, type, adjSpace, adjSpace2, attackSpace1, attackSpace2) {

		super(gridNum, type, adjSpace);
		this.adjSpace2 = adjSpace2;
    this.attackSpace1 = attackSpace1; // royal spaces that will be attacked when you place a card in this space. You can suggest better variable names
    this.attackSpace2 = attackSpace2;

	}
}

//          ---------- Royal space global variables ----------          

const r1 = new Space('r1', 'royal-space', 'm1');

const r2 = new Space('r2', 'royal-space', 'm2');

const r3 = new Space('r3', 'royal-space', 'm3');

const r4 = new Space('r4', 'royal-space', 'm3');

const r5 = new Space('r5', 'royal-space', 'm6');

const r6 = new Space('r6', 'royal-space', 'm9');

const r7 = new Space('r7', 'royal-space', 'm9');

const r8 = new Space('r8', 'royal-space', 'm8');

const r9 = new Space('r9', 'royal-space', 'm7');

const r10 = new Space('r10', 'royal-space', 'm7');

const r11 = new Space('r11', 'royal-space', 'm4');

const r12 = new Space('r12', 'royal-space', 'm1');

//          ---------- Number space global constiables ----------          

const m1 = new MatrixSpace('m1', 'number', 'r1', 'r12');

const m2 = new MatrixSpace('m2', 'number', 'r2', null);

const m3 = new MatrixSpace('m3', 'number', 'r3', 'r4');

const m4 = new MatrixSpace('m4', 'number', 'r11', null);

const m5 = new MatrixSpace('m5', 'number', null, null);

const m6 = new MatrixSpace('m6', 'number', 'r5', null);

const m7 = new MatrixSpace('m7', 'number', 'r9', 'r10');

const m8 = new MatrixSpace('m8', 'number', 'r8', null);

const m9 = new MatrixSpace('m9', 'number', 'r6', 'r7');

//          ---------- Space Array Const Setup ----------          

const matrixSpaces = [m1, m2, m3, m4, m5, m6, m7, m8, m9];

const matrixSpacesSetup = [m1, m2, m3, m4, m6, m7, m8, m9];

const royalSpaces = [r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12];

const allSpaces = [...matrixSpaces, ...royalSpaces];

for (let space of allSpaces) {
	space.setImg('imgs/card-space-blank.png');
}

/*     ----------     Basic card constructor     ----------     */

class Card {
	constructor(img, name, value) {
		this.img = img;
		this.name = name;
		this.value = value;
		var gridNum;
	}

	getGridNum() {
    return this.gridNum;
  }
	
	setGridNum(gridNum) {
	  this.gridNum = gridNum;
	}
}

const noCard = new Card('imgs/card-space-blank.png', 'None', -1);


/*     ---------- ~~~ Royal card constructor ~~~ ----------     */

class Royal extends Card {
	constructor(img, name, value, suit, colour, type='royal') {

		super(img, name, value);
		this.suit = suit;
		this.colour = colour;
		this.type = type;
	}
}

/*               -------------------- Royal Object Creation --------------------               */

const spadeKing = new Royal('imgs/spade-king.png', 'King of Spades', 13, 'spade', 'black');

const spadeQueen = new Royal('imgs/spade-queen.png', 'Queen of Spades', 12, 'spade', 'black');

const spadeJack = new Royal('imgs/spade-jack.png', 'Jack of Spades', 11, 'spade', 'black');

const heartKing = new Royal('imgs/heart-king.png', 'King of Hearts', 13, 'heart', 'red');

const heartQueen = new Royal('imgs/heart-queen.png', 'Queen of Hearts', 12, 'heart', 'red');

const heartJack = new Royal('imgs/heart-jack.png', 'Jack of Hearts', 11, 'heart', 'red');

const diamondKing = new Royal('imgs/diamond-king.png', 'King of Diamonds', 13, 'diamond', 'red');

const diamondQueen = new Royal('imgs/diamond-queen.png', 'Queen of Diamonds', 12, 'diamond', 'red');

const diamondJack = new Royal('imgs/diamond-jack.png', 'Jack of Diamonds', 11, 'diamond', 'red');

const clubKing = new Royal('imgs/club-king.png', 'King of Clubs', 13, 'club', 'black');

const clubQueen = new Royal('imgs/club-queen.png', 'Queen of Clubs', 12, 'club', 'black');

const clubJack = new Royal('imgs/club-jack.png', 'Jack of Clubs', 11, 'club', 'black');

//Spade card constructor

class Spade extends Card {
	constructor(img, name, value, suit='spade', colour='black', type='number') {
		super(img, name, value);
		this.suit = suit;
		this.colour = colour;
		this.type = type;
	}
}

/*               -------------------- Numbered Spades Object Creation --------------------               */

const spadeTwo = new Spade('imgs/spade-two.png', 'Two of Spades', 2);

const spadeThree = new Spade('imgs/spade-three.png', 'Three of Spades', 3);

const spadeFour = new Spade('imgs/spade-four.png', 'Four of Spades', 4);

const spadeFive = new Spade('imgs/spade-five.png', 'Five of Spades', 5);

const spadeSix = new Spade('imgs/spade-six.png', 'Six of Spades', 6);

const spadeSeven = new Spade('imgs/spade-seven.png', 'Seven of Spades', 7);

const spadeEight = new Spade('imgs/spade-eight.png', 'Eight of Spades', 8);

const spadeNine = new Spade('imgs/spade-nine.png', 'Nine of Spades', 9);

const spadeTen = new Spade('imgs/spade-ten.png', 'Ten of Spades', 10);

//Heart card constructor

class Heart extends Card {
	constructor(img, name, value, suit='heart', colour='red', type='number') {
		super(img, name, value);
		this.suit = suit;
		this.colour = colour;
		this.type = type;
	}
}

/*               -------------------- Numbered Hearts Object Creation --------------------               */

const heartTwo = new Heart('imgs/heart-two.png', 'Two of Hearts', 2);

const heartThree = new Heart('imgs/heart-three.png', 'Three of Hearts', 3);

const heartFour = new Heart('imgs/heart-four.png', 'Four of Hearts', 4);

const heartFive = new Heart('imgs/heart-five.png', 'Five of Hearts', 5);

const heartSix = new Heart('imgs/heart-six.png', 'Six of Hearts', 6);

const heartSeven = new Heart('imgs/heart-seven.png', 'Seven of Hearts', 7);

const heartEight = new Heart('imgs/heart-eight.png', 'Eight of Hearts', 8);

const heartNine = new Heart('imgs/heart-nine.png', 'Nine of Hearts', 9);

const heartTen = new Heart('imgs/heart-ten.png', 'Ten of Hearts', 10);

//Diamond card constructor

class Diamond extends Card {
	constructor(img, name, value, suit='diamond', colour='red', type='number') {
		super(img, name, value);
		this.type = type;
		this.suit = suit;
		this.colour = colour;
	}
}

/*               -------------------- Numbered Diamonds Object Creation --------------------               */

const diamondTwo = new Diamond('imgs/diamond-two.png', 'Two of Diamonds', 2);

const diamondThree = new Diamond('imgs/diamond-three.png', 'Three of Diamonds', 3);

const diamondFour = new Diamond('imgs/diamond-four.png', 'Four of Diamonds', 4);

const diamondFive = new Diamond('imgs/diamond-five.png', 'Five of Diamonds', 5);

const diamondSix = new Diamond('imgs/diamond-six.png', 'Six of Diamonds', 6);

const diamondSeven = new Diamond('imgs/diamond-seven.png', 'Seven of Diamonds', 7);

const diamondEight = new Diamond('imgs/diamond-eight.png', 'Eight of Diamonds', 8);

const diamondNine = new Diamond('imgs/diamond-nine.png', 'Nine of Diamonds', 9);

const diamondTen = new Diamond('imgs/diamond-ten.png', 'Ten of Diamonds', 10);

//Club card constructor

class Club extends Card {
	constructor(img, name, value, suit='club', colour='black', type='number') {
		super(img, name, value);
		this.suit = suit;
		this.colour = colour;
		this.type = type;
	}
}

/*               -------------------- Numbered Clubs Object Creation --------------------               */

const clubTwo = new Club('imgs/club-two.png', 'Two of Clubs', 2);

const clubThree = new Club('imgs/club-three.png', 'Three of Clubs', 3);

const clubFour = new Club('imgs/club-four.png', 'Four of Clubs', 4); 

const clubFive = new Club('imgs/club-five.png', 'Five of Clubs', 5);

const clubSix = new Club('imgs/club-six.png', 'Six of Clubs', 6);

const clubSeven = new Club('imgs/club-seven.png', 'Seven of Clubs', 7);

const clubEight = new Club('imgs/club-eight.png', 'Eight of Clubs', 8);

const clubNine = new Club('imgs/club-nine.png', 'Nine of Clubs', 9);

const clubTen = new Club('imgs/club-ten.png', 'Ten of Clubs', 10);

/*     ---------- ~~~ Ace card constructor ~~~ ----------     */

class Ace extends Card {
	constructor(img, name, value, suit, colour, type='ace') {

		super(img, name, value);
		this.suit = suit;
		this.colour = colour;
		this.type = type;
	}
}

/*               -------------------- Ace Object Creation --------------------               */

const spadeAce = new Ace('imgs/spade-ace.png', 'Ace of Spades', 1, 'spade', 'black');

const heartAce = new Ace('imgs/heart-ace.png', 'Ace of Hearts', 1, 'heart', 'red');

const diamondAce = new Ace('imgs/diamond-ace.png', 'Ace of Diamonds', 1, 'diamond', 'red');

const clubAce = new Ace('imgs/club-ace.png', 'Ace of Clubs', 1, 'club', 'black');

/*     ---------- ~~~ Joker card constructor ~~~ ----------     */

class Joker extends Card {
	constructor(img, name, value, suit=null, colour=null, type='joker') {

		super(img, name, value);
		this.suit = suit;
		this.colour = colour;
		this.type = type;

	}
}

/*               -------------------- Joker Object Creation --------------------               */

const redJoker = new Joker('imgs/joker-red.png', 'Red Joker', 0);

const blackJoker = new Joker('imgs/joker-black.png', 'Black Joker', 0);

/* --------------------------------- */

const fullDeck = [spadeKing, spadeQueen, spadeJack, spadeTen, spadeNine, spadeEight, spadeSeven, spadeSix, spadeFive, spadeFour, spadeThree, spadeTwo, spadeAce, heartKing, heartQueen, heartJack, heartTen, heartNine, heartEight, heartSeven, heartSix, heartFive, heartFour, heartThree, heartTwo, heartAce, diamondKing, diamondQueen, diamondJack, diamondTen, diamondNine, diamondEight, diamondSeven, diamondSix, diamondFive, diamondFour, diamondThree, diamondTwo, diamondAce, clubKing, clubQueen, clubJack, clubTen, clubNine, clubEight, clubSeven, clubSix, clubFive, clubFour, clubThree, clubTwo, clubAce, blackJoker, redJoker];

const numberDeck = [spadeTen, spadeNine, spadeEight, spadeSeven, spadeSix, spadeFive, spadeFour, spadeThree, spadeTwo, heartTen, heartNine, heartEight, heartSeven, heartSix, heartFive, heartFour, heartThree, heartTwo, diamondTen, diamondNine, diamondEight, diamondSeven, diamondSix, diamondFive, diamondFour, diamondThree, diamondTwo, clubTen, clubNine, clubEight, clubSeven, clubSix, clubFive, clubFour, clubThree, clubTwo];

for (let card of fullDeck) {
	card.setGridNum(null);
}

/*          ----------  VAR Variables that relate to these CONST variables  ----------          */

var playingDeck = [];

var topCardArray = [];

var topCardsFiltered = [];

var currentCard = noCard;

/*          ----------  HTML Selector Variables  ----------          */


const royalSpaceSelectors = {
	r1: $('#r1'),
	r2: $('#r2'),
	r3: $('#r3'),
	r4: $('#r4'),
	r5: $('#r5'),
	r6: $('#r6'),
	r7: $('#r7'),
	r8: $('#r8'),
	r9: $('#r9'),
	r10: $('#r10'),
	r11: $('#r11'),
	r12: $('#r12'),
};

const matrixSpaceSelectors = {

	m1: $('#m1'),
	m2: $('#m2'),
	m3: $('#m3'),
	m4: $('#m4'),
	m5: $('#m5'),
	m6: $('#m6'),
	m7: $('#m7'),
	m8: $('#m8'),
	m9: $('#m9'),
};

const spaceSelectors = {
	...royalSpaceSelectors,
	...matrixSpaceSelectors
}

const drawnText = $("#drawn-text");

const drawnCard = $("#drawn-card");

const drawPile = $("#draw-pile");

// This is just to remind myself what I gotta do:

/*Global data:
numerical_fields[], numerical_cards[], full_deck[], 
all_numerical_fields [ m1 … m9 ], setup_numerical_fields [ m1...m9, no m5],
free_royal_fields [r1…r12]
Field : Object { “card_stack” : array [ ], grind_num : int }, 
Card : Object { “grid_num” : int }*/
