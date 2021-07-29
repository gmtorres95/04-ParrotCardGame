function selectNumberOfCards(){
    let numberOfCards = 0;
    while (numberOfCards < 4 || numberOfCards > 14 || numberOfCards % 2 !== 0){
        numberOfCards = Number(prompt("Selecione o nº de cartas (4-14)"));
    }
    return numberOfCards;
}
function prepareDeck(numberOfCards){
    deck = [];
    for(i = 0; i < numberOfCards; i++){
        deck.push(`
        <div class="card ${i}" onclick="selectCard(this)">
            <div class="cover face">
                <img src="/media/card-cover.png" alt="Parrot Card">
            </div>
            <div class="front face">
                <img src="/media/gifs/card${Math.floor((i+2)/2)}.gif" alt="Parrot ${Math.floor((i+2)/2)}">
            </div>
        </div>
        `);
    }
}
function shuffle(){ 
	return Math.random() - 0.5; 
}
function cardsDistribution(){
    let cards = "";
    for (i = 0; i < deck.length; i++){
        cards += deck[i];
    }
    document.querySelector(".board").innerHTML = cards;
}
function clock(){
    time++;
    document.querySelector(".time").innerHTML = "TEMPO: " + time;
}
function prepareTheGame(){
    const numberOfCards = selectNumberOfCards();
    prepareDeck(numberOfCards);
    deck.sort(shuffle);
    cardsDistribution();
    correctGuesses = 0;
    cardsFlipped = 0;
    time = 0;
    timeout = setInterval(clock, 1000);
}
function compareCards(){
    if(firstCard.innerHTML === secondCard.innerHTML){
        return true;
    }
    return false;
}
function resetCards(){
    firstCard = "";
    secondCard = "";
}
function checkIfPlayAgain(){
    let wantToPlayAgain;
    while (wantToPlayAgain !== "sim" && wantToPlayAgain !== "não"){
        wantToPlayAgain = prompt("Deseja jogar novamente (sim/não)?");
    }
    if (wantToPlayAgain === "sim"){
        prepareTheGame();
    }
}
function gameOver(){
    alert(`Você ganhou em ${cardsFlipped} jogadas (${time} segundos)!`);
    checkIfPlayAgain();
}
function checkIfGameOver(){
    const allCards = document.querySelectorAll(".card");
    if((allCards.length / 2 ) === correctGuesses){
        clearTimeout(timeout);
        setTimeout(gameOver, 1000);
    }
}
function checkTurn(){
    const isThePlayerRight = compareCards();
    if(isThePlayerRight === false){
        setTimeout(flipCard, 1000, firstCard);
        setTimeout(flipCard, 1000, secondCard);
    }
    else {
        correctGuesses++;
    }
    resetCards();
    checkIfGameOver();
}
function flipCard(selectedCard){
    selectedCard.classList.toggle("selected");
}
function selectCard(selectedCard){
    if(selectedCard.classList.contains("selected") === false){
        flipCard(selectedCard);
        cardsFlipped++;
        if(firstCard === ""){
            firstCard = selectedCard;
        }
        else{
            secondCard  = selectedCard;
            checkTurn();
        }
    }
}
let firstCard = "";
let secondCard = "";
let deck;
let cardsFlipped;
let correctGuesses;
let time;
let timeout;
prepareTheGame();