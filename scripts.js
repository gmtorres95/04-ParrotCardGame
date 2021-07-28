function flipCard(selectedCard){
    selectedCard.classList.toggle("selected");
}
function shuffle() { 
	return Math.random() - 0.5; 
}
function selectNumberOfCards(){
    let numberOfCards = 0;
    while (numberOfCards < 4 || numberOfCards > 14 || numberOfCards % 2 !== 0){
        numberOfCards = Number(prompt("Selecione o nº de cartas (4-14)"));
    }
    return numberOfCards;
}
function prepareDeck(numberOfCards){
    for(index = 0; index < numberOfCards; index++){
        deck.push(`
        <div class="card" onclick="flipCard(this)">
            <div class="cover face">
                <img src="/media/card-cover.png" alt="Parrot Card">
            </div>
            <div class="front face">
                <img src="/media/gifs/card${Math.floor((index+2)/2)}.gif" alt="Parrot ${Math.floor((index+2)/2)}">
            </div>
        </div>
        `);
    }
}
function cardsDistribution(){
    let cards = "";
    for (index = 0; index < deck.length; index++){
        cards += deck[index];
    }
    document.querySelector(".board").innerHTML = cards;
}
function prepareTheGame(){
    const numberOfCards = selectNumberOfCards();
    prepareDeck(numberOfCards);
    deck.sort(shuffle);
    cardsDistribution();
}
let deck = [];
prepareTheGame();
