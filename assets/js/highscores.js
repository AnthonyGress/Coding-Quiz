var highScoreList = JSON.parse(localStorage.getItem("highScore"));
var playerEl = document.querySelector("#player-name");
var scoreEl = document.querySelector("#player-score");
var clearBtn = document.querySelector("#clear")

console.log(highScoreList);
// print out all player names
for (let i = 0; i < highScoreList.length; i++) {
    var playerNode = document.createElement("p");
    playerNode.textContent = highScoreList[i].player;
    playerEl.appendChild(playerNode);
}
// print out all player scores
for (let j = 0; j < highScoreList.length; j++) {
    var scoreNode = document.createElement("p");
    scoreNode.textContent = highScoreList[j].score;
    scoreEl.appendChild(scoreNode); 
}

clearBtn.addEventListener("click", clearStorage);

function clearStorage(){
    // clear local storage
    localStorage.clear();
    // refresh page
    window.location.reload();
}
