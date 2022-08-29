# Summary
For the card deck homework, I created a Card class to represent each card and a Deck class to represent a set of 52 cards and manage the logic of dealing and shuffling the deck. Both of these classes are in deck.js. deck.js currently contains basic functions like creating a deck, shuffling, resetting and dealing cards. However, this class can be easily expanded to add new functions for future use cases.

There is a constants.js file that helps maintain the constants used by the class. Currently, this includes information about the suits, ranks, and value of cards to generate the 52 unique cards needed. It also contains a ‘shuffle randomization factor’ to help with our shuffling logic.

The constants file provides an easy way to change the constants used by the code; we can make the change in one file and avoid confusion of having to find constants we want to change. Any new constants we add as the code grows should be added here to continue this approach. For now, a good use case might be if needed to change how the cards are valued (e.g. if Ace is high or low) we can make a quick adjustment in this class by changing the Ace’s value to 14.

I also created an app.js file along with an index.html file that provides rendering functions to help test and demo the functionality of the deck.js.

## Trade-offs and other decisions

### Using Basic Javascript & HTML
For now, I’ve used basic javascript since the use case for the deck is fairly simple and introducing a framework may be overkill. I also chose to include html and make a static page for the functionality so that the end user can interact with the program and “deck”.  However, for scalability as the code grows in complexity I would switch to a more powerful framework such as react.js to help make it easier to develop and add new features. A larger extension of this project would be making a playable card game (blackjack, poker, etc.). 

### Improvement Areas
I would add more to the design aspect and include actual card images or even try to animate a deck through css or a design library. I did debug and test classes and methods manually with the chrome developer tools using console.log, but in the future, I would use a testing framework such as Jest or Mocha. 

### Shuffling Approach
My shuffle algorithm works by taking two random cards in the deck and switching their places in the deck order. This process is repeated n times with a new set of random cards each time; n is currently 1000 but can be configured.

Another approach I considered for shuffling was to create another array of size 52 and move each card from the current array to a random location in the new array. However, this approach was not chosen as it would take more memory since there would temporarily need to be two arrays of size 52 and does not offer as simple of a lever to control the degree of randomization as the chosen method.

## Core code breakdown
The card class and deck class are summarized below in terms of functionality. 

## Card Class - Breakdown

### Constructor / Summary
Card Class represents the card as an object with value, rank and suit. Suit represents the suit for the card, value represents the card numerical value of the (0-13) and rank represents card’s name (2-10, Ace, Jack, Queen, King). I chose to include both rank and value as value will make it easier to compare cards if that need arises and rank makes it easy to create human readable representations of the card. 

### Method: getCardAsString
This method provides an easy to get the card as a human readable string representation. Useful for testing and for any UI.


## Deck Class - Breakdown

### Constructor / Summary
The deck class represents a deck via a array containing 52 card objects. The end of the array represents the top of the deck and the beginning represents the bottom. As cards are dealt, they are removed from the end of the array. 

When the class is created the deck is populated with the 52 initial card objects and shuffled. There is an optional shuffle parameter that allows us to control whether the deck is shuffled or ‘new deck order’ is maintained after creation. 

There is also another array in the class that represents the deal history. Cards are added to this array as they are dealt to help maintain a record of cards that were dealt and in what order. The array includes cards that were dealt first at the start of the array and the most recently dealt card at the end of the array.


### Method: resetDeck 
This method resets the state of the deck to an initial state based on the suit, rank and value constants stored in constants.js. For now, this will populate the deck array with 52 cards (4 suits with 13 cards in each suit), create the deal history array and shuffle the deck.There is also an optional ‘shuffle’ parameter to control whether the deck is shuffled during reset or not. The default behavior is to shuffle.

This method is also used during construction to create the deck. By using the same method for construction and reset, it will be easy to change what the ‘initial’ state of the deck should be. 

### Method: shuffleDeck
This method shuffles the deck by picking two random cards in the array and swapping them. This process is repeated 1000 times, selecting a new set of random cards each time. The number of times this shuffle is repeated can be easily changed in the constants file.


### Method: dealOneOrMoreCards
This method deals 1 or more cards from the deck based on an optional parameter. The default number of cards dealt is 1 if the optional parameter is not provided. The dealt cards are returned as an array. When the cards are dealt, they are also added to the deal history to be able to keep a record of the history. 


### Method: getRemainingCardCount
A method to get the number of cards remaining in the array. Used by the class itself and class consumers. 

### Method: getRemainingCards
A method to get an array representing the cards remaining in the deck.

### Method: getDealHistory
A method to get an array representing the cards that have been dealt.


