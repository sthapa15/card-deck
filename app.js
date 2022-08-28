import Deck, {EmptyDeckException} from "./deck.js";

   /**
   * Renders the current deck into the HTML page
   */
  function renderDeck(deck) {
    document.getElementById("cards_in_deck_div").innerHTML = "";
    if (deck.getRemainingCardsCount() > 0) {
      for (let i = deck.getRemainingCardsCount()-1; i >= 0; i--) {
        const currentCard = deck.getRemainingCardsList()[i];
        const divToAdd = document.createElement("div");
        divToAdd.innerHTML = currentCard.getCardAsString();
        document.getElementById("cards_in_deck_div").appendChild(divToAdd);
      }
    } else {
      const divToAdd = document.createElement("div");
      divToAdd.innerHTML = "There are no more cards remaining in the deck";
      document.getElementById("cards_in_deck_div").appendChild(divToAdd);
    }
    document.getElementById("cards_remaining_counter").innerHTML = "Cards remaining in deck: " + deck.getRemainingCardsCount();
  }

  /**
   * Renders the deal of one card
   */
  function renderOneCardDeal(deck) {
    try {
      const dealtCard = deck.dealOneCard();
      const divToAdd = document.createElement("div");
      divToAdd.innerHTML = dealtCard.getCardAsString();

      const targetDiv = document.getElementById("dealt_cards_div")
      targetDiv.insertBefore(divToAdd, targetDiv.children[0]);
      renderDeck(deck);
    } catch (err) {
      if (err instanceof EmptyDeckException) {
        alert("There are no cards left in the deck to deal.");
      }
    }
  }

  function handleClickShuffle(deck) {
    //const btn = document.getElementById("shuffle");
    document.getElementById("shuffle_btn").onclick = () => {
      deck.shuffleDeck();
      renderDeck(deck);
    };
  }

  function handleClickDeal(deck) {
    let newArr = [];
    let count = deck.getRemainingCardsCount();
    document.getElementById("deal_btn").onclick = () => {
      console.log(count);
      renderOneCardDeal(deck);
      console.log(deck.getRemainingCardsList());
    };
    return newArr;
  }

  function handleReset(deck) {
    document.getElementById("reset_btn").onclick = () => {
      document.getElementById("dealt_cards_div").innerHTML = "";
      deck.resetDeck();
      renderDeck(deck);
    };
  }

let myDeck = new Deck();
renderDeck(myDeck);
handleClickShuffle(myDeck);
handleClickDeal(myDeck);
handleReset(myDeck);
