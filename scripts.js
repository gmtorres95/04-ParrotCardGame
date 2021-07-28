function flipCard(selectedCard){
    selectedCard.classList.toggle("selected");
}
function selectNumberOfCards(){
    let numberOfCards = 0;
    while (numberOfCards < 4 || numberOfCards > 14 || numberOfCards % 2 !== 0){
        numberOfCards = Number(prompt("Selecione o nº de cartas (4-14)"));
    }
    return numberOfCards;
}
selectNumberOfCards();