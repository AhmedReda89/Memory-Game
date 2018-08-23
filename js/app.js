
// Helper functions
Array.prototype.remove = function() {
    let what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};


// General variable declaration
let theDeck = document.getElementsByClassName("deck")[0],
stars = document.querySelectorAll('.rating-star'),
flippedCard1, flippedCard2, flippedCardsCount = 0, movesCount = 0, movesRating = 0;

// variables for timer
let timerWrap = document.getElementsByClassName('timer')[0],
    seconds = 0, minutes = 0, hours = 0,
    t;

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
    let li = document.createElement('li');
    li.classList.add('card');
    let image = document.createElement("i");
    theDeck.appendChild(li);
    li.appendChild(image);
    //image.classList.add("fa");
    return li;
}

//Shuffling and adding icons inside the cards object
function init() {
    let fakeDoc = document.createDocumentFragment();
        let x = classesArray.concat(classesArray);
        let newClassesArray = shuffle(x);
        for (let i=0; i < newClassesArray.length; i++) {
            let newCard = createCard();
            newCard.children[0].classList += newClassesArray[i];
            fakeDoc.appendChild(newCard);
        }
        theDeck.appendChild(fakeDoc);
        let listItems = document.querySelectorAll('.deck .card');
        listItems.forEach(function(item, index){
            listItems[index].addEventListener("click", flipCard);
        });
        document.querySelector('.moves').innerHTML = movesCount;
        timer();
}
init();

// clicking a card
function flipCard(evt) { 
    let element = evt.target;
    element.classList = revealIcon(evt);
    console.log(evt.target);
    document.querySelector('.moves').innerHTML = movesCount;
    scoreRating();
}

// display the card's symbol
function revealIcon(e){
    // Here we check if there's no cards flipped or only 1 is flipped
    let classNames = e.target.classList;
    if( e.target.tagName == "LI" && !classNames.contains('open') && 
    !classNames.contains('match') && flippedCardsCount < 2){ 
        classNames.add('open');
        classNames.add('show');
        //movesCount ++;
        if(flippedCard1 == undefined){
            flippedCard1 = e.target;
        }else{
            flippedCard2 = e.target;
        }
        flippedCardsCount ++;
        compareFlippedCards(e.target);   
        if(checkIfUserWon()){ // Congratulation popup 
            let congrPopup = document.getElementsByClassName('game-end-popup');
            let movesNo = document.querySelector('.game-end-popup .moves-no');
            let starsNo = document.querySelector('.game-end-popup .stars-no');
            starsNo.innerHTML = movesCount <= 22?'3':movesCount <= 26?'2':'1';
            movesNo.innerHTML = movesCount;
            congrPopup[0].style.display = "block";
            pauseTimer();
        }
    }
    else if( e.target.tagName == "LI" && classNames.contains('open')){
        classNames.remove('open');
        classNames.remove('show');
        flippedCardsCount--;
    }
    return classNames;
}

// checks if there're still unmatched cards
function checkIfUserWon (){
    let cards = document.getElementsByClassName("card");
    let allMatched = false;
    for (let index = 0; index < cards.length; index++) {
        if(cards[index].classList.contains("match")){
            allMatched = true;
        }else{
            allMatched = false;
            return false;
        }
    }
    return true;
}

// Check if cards match
function compareFlippedCards(el){
    //if the cards match highlight them and remove open and show classes for easier manipulation
    if(flippedCardsCount == 2){
        let cards = document.getElementsByClassName("card");
        
        let flippedCard1IconClasses = flippedCard1.children[0].classList;
        let flippedCard2IconClasses = flippedCard2.children[0].classList;
        if(JSON.stringify(flippedCard1IconClasses) == JSON.stringify(flippedCard2IconClasses)){
            for (let index = 0; index < cards.length; index++) {
                let cardOnHandClasses = cards[index].children[0].classList;
                if(JSON.stringify(flippedCard1IconClasses) == JSON.stringify(cardOnHandClasses)){
                    cards[index].classList.add('match');
                    cards[index].classList.remove('open');
                    cards[index].classList.remove('show');
                    flippedCard1 = undefined;
                    flippedCard2 = undefined;
                    flippedCardsCount --;
                }else if(JSON.stringify(flippedCard2IconClasses) == JSON.stringify(cardOnHandClasses)){
                    cards[index].classList.add('match');
                    cards[index].classList.remove('open');
                    cards[index].classList.remove('show');
                    flippedCard1 = undefined;
                    flippedCard2 = undefined;
                    flippedCardsCount --;
                }
            }
        }else{
            for (let index = 0; index < cards.length; index++) {
                setTimeout(function(){
                    cards[index].classList.remove('open');
                    cards[index].classList.remove('show');
                }, 1000)
            };
            flippedCard1 = undefined;
            flippedCard2 = undefined;
            flippedCardsCount = 0;
        }
        movesCount ++;
    }
}

// Resetting moves rating and reinitiating the game
function resetGame(){
    let congrPopup = document.getElementsByClassName('game-end-popup');
    congrPopup[0].style.display = "none";

    flippedCardsCount = 0;
    flippedCard1 = undefined;
    flippedCard2 = undefined;
    movesRating = 0;
    movesCount = 0;

    document.querySelector('.moves').innerHTML = movesCount;
    let cardsList = document.querySelectorAll('.card');
    Array.prototype.forEach.call(cardsList, card => {
        theDeck.removeChild(card);
    });
    
    init();
    clearTimer();
    Array.prototype.forEach.call(stars, star => {
        star.classList = "fa fa-star";
    });
    
    theDeck = document.getElementsByClassName("deck")[0];
    stars = document.querySelectorAll('.rating-star');
}

//count moves and rating score
function scoreRating(){
    if(movesCount <= 22){
        Array.prototype.forEach.call(stars, star => {
            star.classList = "fa fa-star";
        });
    }else if(movesCount <= 26){
        stars[0].classList = "fa fa-star";
        stars[1].classList = "fa fa-star";
        stars[2].classList = "fa fa-star-o";
    }else if(movesCount > 26){
        stars[0].classList = "fa fa-star";
        stars[1].classList = "fa fa-star-o";
        stars[2].classList = "fa fa-star-o";
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    
    return array;
}

// Timer functionality
// To do: use .prototype and put them all in one func to make it more Object oriented
function timer() {
    t = setTimeout(add, 1000);
}
function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    timerWrap.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + 
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();
}
function playTimer() {
    timer();
}
function pauseTimer() {
    clearTimeout(t);
}
function clearTimer() {
    clearTimeout(t);
    timerWrap.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
}