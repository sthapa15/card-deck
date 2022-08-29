import {CARD_SUITS, CARD_RANKS, CARD_VALUES} from './utils/constants.js'

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

  /**
   * Get a string representation for the card
   * @returns a string representation of the card that includes Rank and Suit
   */
  getCardAsString() {
    return `${this.rank} of ${this.suit}`;
  }
}

/**
 * Exception used to represent a bad operation on an empty Deck
 */
export class EmptyDeckException extends Error {
  constructor(message) {
    super(message);
    this.name = "EmptyDeckException";
  }
}

/**
 * class to create a Deck object with several methods that manipulates the deck
 */
export default class Deck {
  /**
   * constructor creates an array of cards (deck) at the start of deck object creation
   * Optional Shuffle parameter determines if deck is immediately shuffled after creation
   * If Shuffle is set false, then the deck will be left in ascending order per suit
   */
  constructor(shuffle = true) {
    this.resetDeck(shuffle);
  }

  /**
   * Reset state of the deck to 52 cards, used for class construction as well
   * Optional Shuffle parameter determines if deck is immediately shuffled after creation
   * If Shuffle is set false, then the deck will be left in ascending order per suit
   */
  resetDeck(shuffle = true) {
    this.deck = []; //respresents the deck
    this.dealHistory=[]; // maintain a historic list of cards dealt by this deck in order dealt
    for (let i = 0; i < CARD_SUITS.length; i++) {
      for (let j = 0; j < CARD_RANKS.length; j++) {
        this.deck.push(new Card(CARD_SUITS[i], CARD_RANKS[j], CARD_VALUES[j]));
      }
    }
    if (shuffle) {
      this.shuffleDeck();
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
   * Gets the deal history of the deck
   * @returns a list of cards dealt from this deck (in the order they were dealt)
   */
  getDealHistory() {
    return this.dealHistory;
  }

  /**
   * Get list of cards remaining in deck
   * @returns list of card objects representing cards remaining in deck
   */
  getRemainingCardsList() {
    return this.deck;
  }

  /**
   * Shuffles the current deck as is (no reset)
   */
  shuffleDeck() {
    let location1, location2, temp;
    if (this.getRemainingCardsCount() > 0){
        for (let i = 0; i < 1000; i++) {
            //arbritatry number of loops to make it more "random"
            location1 = Math.floor(Math.random() * this.getRemainingCardsCount());
            location2 = Math.floor(Math.random() * this.getRemainingCardsCount());
            temp = this.deck[location1];
            this.deck[location1] = this.deck[location2];
            this.deck[location2] = temp;
        }
    }
  }

   /**
   * Deals cards from the deck based on number specificed in 'dealCount' parameter
   * if dealCount is more than the number of cards left in the deck, all cards are dealt
   * dealCount defaults to 1 if no value is provided
   * @returns A list representing the card(s) that were dealt
   */
    dealOneOrMoreCards(dealCount=1) {
        const currentCardCount = this.getRemainingCardsCount();
        if (currentCardCount > 0) {
            let returnList = []
            if (dealCount > currentCardCount) {
                dealCount = currentCardCount;
            }
            for (let i = 0; i < dealCount; i++) {
                let dealtCard = this.deck.pop()
                this.dealHistory.push(dealtCard)
                returnList.push(dealtCard)
            }
            return returnList;
        } else {
            throw new EmptyDeckException("No cards remaining!");
        }
    }
}
