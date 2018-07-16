
// Helper functions
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};


// variable declaration
var theDeck = document.getElementsByClassName("deck")[0];
var opennedCards = [];

// icons array
const classesArray = [
    "fa fa-diamond",
    "fa fa-paper-plane",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bomb"
];

//Draw a card with an i tag to hold the icon later
function createCard() {
    var li = document.createElement('li');
    li.classList.add('card');
    var image = document.createElement("i");
    theDeck.appendChild(li);
    li.appendChild(image);
    //image.classList.add("fa");
    return li;
}

//Shuffling and adding icons inside the cards object
function init() {
    var fakeDoc = document.createDocumentFragment();
        var x = classesArray.concat(classesArray);
        var newClassesArray = shuffle(x);
        //console.log(newClassesArray);
        for (var i=0; i < newClassesArray.length; i++) {
            var newCard = createCard();
            newCard.children[0].classList += newClassesArray[i];
            fakeDoc.appendChild(newCard);
        }
        theDeck.appendChild(fakeDoc);
        var listItems = document.querySelectorAll('.deck .card');
        //debugger;
        listItems.forEach(function(item, index){
            listItems[index].addEventListener("click", flipCard);
        });
}
init();

// display the card's symbol
function revealIcon(e){
    var classNames = e.target.classList;
    classNames.add('open');
    classNames.add('show');
    return classNames;
}
// hide the card's symbol
function hideIcon(e){
    var classNames = e.target.classList;
    classNames.remove("open");
    classNames.remove('show');
    return classNames;
}

// Add card to oppened cards lits
function addToOpennedList(item){
   /*  - if the list already has another card, check to see if the two cards match
    *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
    *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
    *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
    *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
    */
    opennedCards.push(item);
}
// remove card to oppened cards lits
function removeFromOpennedList(item){ // to be tested
    console.log('test');
    console.log(item);
    opennedCards.remove(item);
    console.log(item);
}

function compareRevealedCards(el){
    
}

// clicking a card
function flipCard(evt) { 
    var element = evt.target;
    element.classList = revealIcon(evt);
    addToOpennedList(element);
}

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
