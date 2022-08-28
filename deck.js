//Constants
const SUITS = ["Diamonds", "Clubs", "Spades", "Hearts"];
const RANKS = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
const VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; //for face cards

/** creates a card class which can be used to make card objets
 * suit - suit of card
 * rank - rank of card (ace, numbers, jack, queen, king)
 * values - number values of reach rank of rank
 */
class Card {
  constructor(suit, rank, value) {
    this.suit = suit;
    this.rank = rank;
    this.value = value;
  }
  show() {}
}

/**
 * class to create a Deck object with several methods that manipulates the deck
 */
class Deck {
  /** constructor creates an array of cards (deck) at the start of deck object creation */
  constructor() {
    this.reset()
  }

  reset() {
    this.deck = [];
    for (let i = 0; i < SUITS.length; i++) {
      for (let j = 0; j < RANKS.length; j++) {
        this.deck.push(new Card(SUITS[i], RANKS[j], VALUES[j]));
      }
    }
  }

  /** returns length of deck */
  getCount() {
    return this.deck.length;
  }

  getRemainingCards() {
    return this.deck;
  }

  //new method
  shuffleDeck() {
    let location1, location2, temp;
    for (let i = 0; i < 1000; i++) {
      //arbritatry number of loops to make it more "random"
      location1 = Math.floor(Math.random() * this.deck.length);
      location2 = Math.floor(Math.random() * this.deck.length);
      temp = this.deck[location1];
      this.deck[location1] = this.deck[location2];
      this.deck[location2] = temp;
    }
    return this;
  }

  dealOneCard() {
    let dealtCard = this.deck.pop();
    if (this.deck.length > 0) {
      return dealtCard;
    } else {
      throw new Error("No cards remaining!");
    }
  }

  renderDeck() {
    document.getElementById("card").innerHTML = "";
    for (let i = 0; i < this.deck.length; i++) {
      const rank = document.createElement("div");
      const value = document.createElement("div");
      const suit = document.createElement("div");
      rank.className = "card";
      value.className = "value";
      suit.className = "suit " + this.deck[i].suit;

      value.innerHTML = `${this.deck[i].value} ${this.deck[i].rank} of ${this.deck[i].suit}`;
      rank.appendChild(value);
      rank.appendChild(suit);

      document.getElementById("card").appendChild(rank);
    }
  }

  renderDeal() {
    let card = this.dealOneCard();

    const dealtCards = document.createElement("div");
    const dealtText = document.createTextNode(`${card.rank} ${card.value} ${card.suit}`);

    dealtCards.appendChild(dealtText);
    document.getElementById("myList").appendChild(dealtCards);
    this.renderDeck();
  }

  handleClickShuffle() {
    //const btn = document.getElementById("shuffle");
    document.getElementById("shuffle").onclick = () => {
      this.shuffleDeck();
      this.renderDeck();
    };
  }

  handleClickDeal() {
    let newArr = [];
    let count = this.getCount();
    document.getElementById("deal").onclick = () => {
      console.log(this.renderDeal());
      console.log(count);
      console.log(this.getRemainingCards());
    };
    return newArr;
  }

  handleReset() {
    document.getElementById("reset").onclick = () => {
        console.log('clearing elements');
        document.getElementById("myList").innerHTML = '';
        this.reset();
        this.shuffleDeck();
        this.renderDeck();
    }

  }
}

//rough tests

let newDeck = new Deck();

//test shuffle new deck created
newDeck.shuffleDeck(); //can put this up there but it will do shuffle first
//newDeck.renderDeck();
//console.log(newDeck.dealOneCard());
newDeck.handleClickShuffle();
newDeck.handleClickDeal();
newDeck.handleReset();
