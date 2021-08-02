//These functions will prepare the game for the player, starting at "prepareTheGame()"
function resetGame(){
    playerName = "";
    numberOfCards = 0;
    deck = [];
    correctGuesses = 0;
    cardsFlipped = 0;
    time = 0;
    firstCard = "";
    secondCard = "";
}
function askForName(){
    while(!playerName || playerName === ""){
        playerName = prompt("Qual é o seu nome? (Máximo de 7 caracteres)");
    }
}
function selectNumberOfCards(){
    while (numberOfCards < 4 || numberOfCards > 14 || numberOfCards % 2 !== 0){
        numberOfCards = Number(prompt("Selecione um nº par de cartas (4 - 14)"));
    }
}
function prepareDeck(){
    for(i = 0; i < numberOfCards; i++){
        deck.push(`
        <div class="card" onclick="selectCard(this)">
            <div class="cover face">
                <img src="/media/card-cover.png" alt="Card Cover">
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
    resetGame();
    askForName();
    selectNumberOfCards();
    prepareDeck();
    deck.sort(shuffle);
    cardsDistribution();
    timeoutID = setInterval(clock, 1000);
}

//These functions are the game mechanics, starting at "selectCard()"
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
function checkIfGameOver(){
    if((numberOfCards / 2 ) === correctGuesses){
        clearInterval(timeoutID);
        setTimeout(gameOver, 1000);
    }
}
function flipCard(selectedCard){
    selectedCard.classList.toggle("selected");
}
function checkTurn(){
    if(!compareCards()){
        setTimeout(flipCard, 1000, firstCard);
        setTimeout(flipCard, 1000, secondCard);
    }
    else {
        correctGuesses++;
    }
    resetCards();
    checkIfGameOver();
}
function selectCard(selectedCard){
    if(!selectedCard.classList.contains("selected")){
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

//These functions will end the game, starting at "gameOver()", and will update de HighScore board
function calculateScore(){
    return (5 * numberOfCards - time);
}
function logScore(){
    return {
        playerName: playerName.substring(0,7),
        playerGameMode: numberOfCards,
        playerGameTime: time,
        playerScore: calculateScore(),
    };
}
function sortScores(a, b) {
    if (Number(a.playerScore) < Number(b.playerScore)) {
      return 1;
    }
    if (Number(a.playerScore) > Number(b.playerScore)) {
      return -1;
    }
    return 0;
}
function updateHighScore(){
    let text = `<tr><th>Pts</th>
                    <th>Nome</th>
                    <th>Cartas</th>
                    <th>Tempo</th>
                </tr>`;
    for(i = 0; i < highScore.length && i < 10; i++){
        text += `<tr>
                    <td>${highScore[i].playerScore}</td>
                    <td>${highScore[i].playerName}</td>
                    <td>${highScore[i].playerGameMode}</td>
                    <td>${highScore[i].playerGameTime}</td>
                </tr>`;
    }
    document.querySelector("table").innerHTML = text;
}
function saveScore(){
    highScore.push(logScore());
    highScore.sort(sortScores);
    updateHighScore();
}
function gameOver(){
    alert(`Você ganhou em ${cardsFlipped} jogadas (${time} segundos)!`);
    saveScore();
    document.querySelector(".game-over").classList.remove("hidden");
}

//This function will check if the player wants to play again and restarts the game
function checkIfPlayAgain(){
    document.querySelector(".game-over").classList.add("hidden");
    let playerAnswer;
    while (playerAnswer !== "sim" && playerAnswer !== "não"){
        playerAnswer = prompt("Deseja jogar novamente (sim/não)?");
    }
    if (playerAnswer === "sim"){
        prepareTheGame();
    }
}

let playerName;
let numberOfCards;
let deck;
let time;
let timeoutID;
let firstCard;
let secondCard;
let cardsFlipped;
let correctGuesses;
let highScore = [];
prepareTheGame();