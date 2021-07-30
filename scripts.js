function selectNumberOfCards(){
    let numberOfCards = 0;
    while (numberOfCards < 4 || numberOfCards > 14 || numberOfCards % 2 !== 0){
        numberOfCards = Number(prompt("Selecione um nº par de cartas (4 - 14)"));
    }
    return numberOfCards;
}
function prepareDeck(){
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
    playerName = prompt("Qual é o seu nome? (Máximo de 7 caracteres)");
    numberOfCards = selectNumberOfCards();
    prepareDeck();
    deck.sort(shuffle);
    cardsDistribution();
    correctGuesses = 0;
    cardsFlipped = 0;
    time = 0;
    timeoutID = setInterval(clock, 1000);
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
    document.querySelector(".game-over").classList.add("hidden");
    let wantToPlayAgain;
    while (wantToPlayAgain !== "sim" && wantToPlayAgain !== "não"){
        wantToPlayAgain = prompt("Deseja jogar novamente (sim/não)?");
    }
    if (wantToPlayAgain === "sim"){
        prepareTheGame();
    }
}
function calculateScore(){
    return (5 * numberOfCards - time);
}
function sortHighScore(a, b) {
    if (Number(a[0]) < Number(b[0])) {
      return 1;
    }
    if (Number(a[0]) > Number(b[0])) {
      return -1;
    }
    return 0;
}
function updateHighScore(){
    let text = `<tr>
                    <th>Pts</th>
                    <th>Nome</th>
                    <th>Cartas</th>
                    <th>Tempo</th>
                </tr>`;
    for(i = 0; i < highScore.length && i < 10; i++){
        text += `<tr>
                    <td>${highScore[i][0]}</td>
                    <td>${highScore[i][1]}</td>
                    <td>${highScore[i][2]}</td>
                    <td>${highScore[i][3]}</td>
                </tr>`;
    }
    document.querySelector("table").innerHTML = text;
}
function saveHighScore(){
    highScore.push([calculateScore(), playerName.substring(0,7), numberOfCards, time]);
    highScore.sort(sortHighScore);
    updateHighScore();
}
function gameOver(){
    alert(`Você ganhou em ${cardsFlipped} jogadas (${time} segundos)!`);
    saveHighScore();
    document.querySelector(".game-over").classList.remove("hidden");
}
function checkIfGameOver(){
    const allCards = document.querySelectorAll(".card");
    if((allCards.length / 2 ) === correctGuesses){
        clearInterval(timeoutID);
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
let numberOfCards;
let playerName;
let cardsFlipped;
let correctGuesses;
let time;
let timeoutID;
let highScore = [];
prepareTheGame();