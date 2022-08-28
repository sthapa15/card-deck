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

  getCardAsString() {
    return `${this.value} ${this.rank} of ${this.suit}`;
  }
}


class EmptyDeckException extends Error {
    constructor(message) {
      super(message);
      this.name = "EmptyDeckException";
    }
  }

/**
 * class to create a Deck object with several methods that manipulates the deck
 */
class Deck {

  /** 
   * constructor creates an array of cards (deck) at the start of deck object creation
   * Optional Shuffle parameter determines if deck is immediately shuffled after creation
   */
  constructor(shuffle=true) {
    this.resetDeck(shuffle)
  }


  /** 
   * Reset state of the deck to 52 cards, used for class construction as well
   * Optional Shuffle parameter determines if deck is immediately shuffled after creation
   */
  resetDeck(shuffle=true) {
    this.deck = [];
    for (let i = 0; i < SUITS.length; i++) {
      for (let j = 0; j < RANKS.length; j++) {
        this.deck.push(new Card(SUITS[i], RANKS[j], VALUES[j]));
      }
    }
    if (shuffle) {
        this.shuffleDeck()
    }
  }

  /** 
   * Get cards remaining in the deck
   * @returns number of cards remaining in the deck
   */
  getRemainingCardsCount() {
    return this.deck.length;
  }

  /**
   * Get list of cards remaining in deck 
   * @returns list of card objects representing cards remaining in deck
   */
  getRemainingCardsList() {
    return this.deck;
  }

  /**
   * Shuffles the current deck
   */
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
  }

  /**
   * Deals one card by removing and returning the top card from the deck
   * @returns Card that is dealt
   */
  dealOneCard() {
    if (this.deck.length > 0) {
      return this.deck.pop();
    } else {
      throw new EmptyDeckException("No cards remaining!");
    }
  }

  /**
   * Renders the current deck into the HTML page
   */
  renderDeck() {
    document.getElementById("cards_in_deck_div").innerHTML = "";
    if (this.getRemainingCardsCount() > 0) {
        for (let i = 0; i < this.deck.length; i++) {
            const currentCard = this.deck[i]
            const divToAdd = document.createElement("div")
            divToAdd.innerHTML = currentCard.getCardAsString();
            document.getElementById("cards_in_deck_div").appendChild(divToAdd);
        }
    } else {
        const divToAdd = document.createElement("div")
        divToAdd.innerHTML =  "There are no more cards remaining in the deck"
        document.getElementById("cards_in_deck_div").appendChild(divToAdd);
    }
    document.getElementById("cards_remaining_counter").innerHTML = 'Cards remaining in deck: ' + this.getRemainingCardsCount()
  }

  /**
   * Renders the deal of one card
   */
  renderOneCardDeal() {
    try {
        const dealtCard = this.dealOneCard();
        const divToAdd = document.createElement("div")
        divToAdd.innerHTML = dealtCard.getCardAsString();

        document.getElementById("dealt_cards_div").appendChild(divToAdd);
        this.renderDeck();
    } catch (err) {
        if (err instanceof EmptyDeckException) {
            alert("There are no cards left in the deck to deal.");
        }
    }
  }

  handleClickShuffle() {
    //const btn = document.getElementById("shuffle");
    document.getElementById("shuffle_btn").onclick = () => {
      this.shuffleDeck();
      this.renderDeck();
    };
  }

  handleClickDeal() {
    let newArr = [];
    let count = this.getRemainingCardsCount();
    document.getElementById("deal_btn").onclick = () => {
      console.log(count);
      this.renderOneCardDeal()
      console.log(this.getRemainingCardsList());
    };
    return newArr;
  }

  handleReset() {
    document.getElementById("reset_btn").onclick = () => {
        document.getElementById("dealt_cards_div").innerHTML = '';
        this.resetDeck();
        this.renderDeck();
    }

  }
}

//rough tests

let newDeck = new Deck();
newDeck.handleClickShuffle();
newDeck.handleClickDeal();
newDeck.handleReset();
