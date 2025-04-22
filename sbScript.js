let player;
let playerCount = 2;
let trackPlayer = 1;
let cuPlayer;
let reSetGame;
const snake = {
  32: 12,
  45: 7,
  52: 10,
  65: 54,
  91: 73,
  97: 59,
};
const ladder = {
  5: 58,
  14: 49,
  39: 60,
  53: 72,
  64: 83,
  75: 94,
};

function creatBlock() {
  document.getElementById("getReadyBoard").style.display = "none";
  document.getElementById("snakeGamePlay").style.display = "flex";
  const board = document.getElementById("board");
  board.innerHTML = "";
  reSetGame = 0;
  cuPlayer = player[`player${trackPlayer}`];
  document.getElementById("showCurrentPlayer").innerText = `player${trackPlayer}`;
  let numAss = 1;
  for (i = 1; i <= 10; i++) {
    let rowB = document.createElement("div");
    if (i % 2 == 0) {
      rowB.setAttribute("class", "blc revBlc");
    } else {
      rowB.setAttribute("class", "blc");
    }
    for (j = 1; j <= 10; j++) {
      let blc = document.createElement("div");
      let blNum = document.createElement("p");
      let coinHol = document.createElement("span");
      blNum.innerText = numAss;
      coinHol.setAttribute("id", numAss++);
      coinHol.setAttribute("class", "coin");
      blc.appendChild(blNum);
      blc.appendChild(coinHol);
      rowB.appendChild(blc);
    }
    board.appendChild(rowB);
  }
  placePlayer();
}

function placePlayer() {
  let fisrtBlc = document.getElementById("1");
  for (i = 1; i <= playerCount; i++) {
    fisrtBlc.classList.add(`coin${i}`);
  }
  document.getElementById("showCurrentPlayer").innerText =
    player[`player${trackPlayer}`].name;
}

function adjustPlayerCount(adjPly) {
  player = {
    player1: { name: "bot1", type: "user", position: 1, celebrate: false },
    player2: { name: "bot2", type: "bot", position: 1, celebrate: false },
    player3: { name: "bot3", type: "bot", position: 1, celebrate: false },
    player4: { name: "bot4", type: "bot", position: 1, celebrate: false },
  };
  document.getElementById("getReadyBoard").style.display = "flex";
  document.getElementById("snakeGamePlay").style.display = "none";
  document.getElementById("setGamePlayer").style.display = "none";
  document.getElementById("setPlayerCnt").style.display = "flex";
  let playerCntDisplay = document.getElementById("cnt");
  playerCntDisplay.innerText = playerCount;
  if (adjPly == "add") {
    ++playerCount == 5 ? playerCount-- : playerCount;
  } else if (adjPly == "min") {
    --playerCount == 1 ? playerCount++ : playerCount;
  }
  playerCntDisplay.innerText = playerCount;
}

function playerDetails() {
  document.getElementById("setPlayerCnt").style.display = "none";
  document.getElementById("setGamePlayer").style.display = "flex";
  let plyDet = document.getElementById("getPlayerDetail");
  plyDet.innerHTML = "";
  for (i = 1; i <= playerCount; i++) {
    let inPly = document.createElement("input");
    inPly.type = "text";
    inPly.placeholder = `Player${i} name`;
    inPly.setAttribute("id", `player${i}Detail`);
    plyDet.appendChild(inPly);
  }
}

function assignPlayer() {
  let ply1 = document.getElementById("player1Detail");
  if (ply1.value.trim() == "") {
    ply1.style.border = "red 2px solid";
    return;
  }
  for (i = 1; i <= playerCount; i++) {
    let inVal = document.getElementById(`player${i}Detail`).value.trim();
    if (inVal != "") {
      player[`player${i}`].name = inVal;
      player[`player${i}`].type = "user";
    }
  }
  creatBlock();
}

function decidePlayer() {
  if (trackPlayer == playerCount) {
    trackPlayer = 1;
  } else {
    trackPlayer++;
  }
  if (player[`player${trackPlayer}`].position == 100) {
    decidePlayer();
  }
  cuPlayer = player[`player${trackPlayer}`];
  document.getElementById("showCurrentPlayer").innerText =
    player[`player${trackPlayer}`].name;
}

function rollDise() {
  let assAni = document.getElementById("diesHolder");
  let randomValue = Math.floor(Math.random() * 6) + 1;
  const dise = document.getElementById("dise");
  assAni.disabled = true;
  setTimeout(() => {
    assAni.disabled = false
  }, 1500)
  assAni.classList.remove("rollAni");
  void assAni.offsetWidth;
  assAni.classList.add("rollAni");
  dise.src = `dise${randomValue}.png`;
  moveCoinByDise(randomValue);
  if (cuPlayer.position == 100 && cuPlayer.celebrate == false) {
    cuPlayer.celebrate = true;
    reSetGame++;
    alert(`${cuPlayer.name} have won`);
    if (reSetGame == playerCount) {
      alert("Game is finised all player won the match");
      adjustPlayerCount(playerCount);
    }
  }
  if (randomValue < 6) {
    decidePlayer();
  }
  if (player[`player${trackPlayer}`].type == "bot") {
    rollDise();
  }
}

function moveCoinByDise(move) {
  let temp = document.getElementById(cuPlayer.position);
  cuPlayer.position += move;
  if (cuPlayer.position > 100) {
    cuPlayer.position -= move;
  } else if (cuPlayer.position in snake) {
    cuPlayer.position = snake[cuPlayer.position];
  } else if (cuPlayer.position in ladder) {
    cuPlayer.position = ladder[cuPlayer.position];
  }
  temp.classList.remove(`coin${trackPlayer}`);
  temp = document.getElementById(cuPlayer.position);
  temp.classList.add(`coin${trackPlayer}`);
}
