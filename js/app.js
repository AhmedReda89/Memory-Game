/*
 * Create a list that holds all of your cards
 */
var theDeck = document.getElementsByClassName("deck")[0];
console.log(theDeck)
const classesArray = [
    "fa fa-diamond",
    "fa fa-paper-plane-0",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bomb"
];

function createCard() {
    var li = document.createElement('li');
    li.classList.add('card');
    var image = document.createElement("i");
    theDeck.appendChild(li);
    li.appendChild(image);
    image.classList.add("fa");
    return li;
}

function init() {
    var fakeDoc = document.createDocumentFragment();
        var x = classesArray.concat(classesArray);
        var newClassesArray = shuffle(x);
        console.log(newClassesArray);
        for (var i=0; i < newClassesArray.length; i++) {
            var newCard = createCard();
            newCard.children[0].classList += newClassesArray[i];
            fakeDoc.appendChild(newCard);
        }
        theDeck.appendChild(fakeDoc);
        theDeck.children.addEventListener("click", flipCard);
}
init();

function flipCard(e) {
    var classNames = e.target.classList;
    classNames.add('open');
    classNames.add('show');
    return classNames;
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    
    return array;
}

    



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
