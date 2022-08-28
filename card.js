class Card {
  constructor(suit, rank, value) {
    this.suit = suit;
    this.rank = rank;
    this.value = value;
  }

  show() {
    const showCard = document.querySelector(".card");
    showCard.innerText = `Card is ${this.rank} of ${this.value}`;
    // console.log();
    return this;
  }
}

class Deck {
  constructor() {
    this.deck = [];

    const suits = ["diamonds", "clubs", "spades", "hearts"];
    const ranks = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; //for face cards

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        this.deck.push(new Card(suits[i], ranks[j], values[j]));
      }
    }
  }

  //   createDeck() {
  //     const suits = ["diamonds", "clubs", "spades", "hearts"];
  //     const ranks = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
  //     const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; //for face cards

  //     for (let i = 0; i < suits.length; i++) {
  //       for (let j = 0; j < ranks.length; j++) {
  //         this.deck.push(new Card(suits[i], ranks[j], values[j]));
  //       }
  //     }

  getCount() {
    return this.deck.length;
  }

  //new method

  shuffleDeck() {
    //
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

  dealDeck() {
    //  let dealtCard;
    //for (let i = 0; i < this.deck.length; i++) {
    let dealtCard = this.deck.pop();
    //let dealtCard = this.deck.pop();
    // return dealtCard;

    console.log(`Dealt a card. The deck has ${this.deck.length} cards left`);

    return dealtCard;
    //  }
  }

  dealRecord() {
    let dealRecord = [];
    dealRecord.push(this.dealtCard);
    return dealRecord;
  }

  //class to show suit
  showSpecified(suit) {}
}

class Player {}

//test number 1 to test just card class;
const displayCard = document.querySelector(".card");

let testCard = new Card("spade", "king", 13);
console.log(testCard);

//test creeate deck method in class deck
let newDeck = new Deck();
newDeck.shuffleDeck();
console.log(newDeck.deck);
newDeck.show();
newDeck.dealDeck();
console.log(newDeck.dealRecord());
displayCard.innerText = "test";
