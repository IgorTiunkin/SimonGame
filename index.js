function markPressedButton(event) {
    let clicked = event.target;
    clicked.classList.add("pressed");
    setTimeout(() => clicked.classList.remove("pressed"), 100);
}

function playMusicOnClick(event) {
    let idOfClicked = event.target.id;
    new Audio("./sounds/"+idOfClicked+".mp3").play();
}

function clickHandler(event) {
    markPressedButton(event);
    playMusicOnClick(event);
    checkClick(event);
}

$(".btn").click((event) => clickHandler(event));


function chooseRandomID() {
    let randomNumber = Math.floor(Math.random()*4+1);
    let nextButtonId = "";
    switch (randomNumber) {
        case 1 : nextButtonId = "green";
            break;
        case 2 : nextButtonId = "red";
            break;
        case 3 : nextButtonId = "yellow";
            break;
        case 4 : nextButtonId = "blue";
            break;
    }
    return "#"+nextButtonId;
}

function blinkNextButton(button) {
    button.fadeOut();
    setTimeout(()=>button.fadeIn(), 100);
}

function checkClick(event) {
    let idToCheck = "#"+event.target.id;
    let currentPointer = gameStatus.currentPointer;
    let currentRightId = gameStatus.listOfButtons[currentPointer];
    if (idToCheck===currentRightId) {
        if (currentPointer===gameStatus.listOfButtons.length-1) {
            gameContinue()
        } else {
            gameStatus.currentPointer++;
        }
        console.log(gameStatus);
    } else {
        console.log("Game Over");
        $("body").addClass("game-over");
        new Audio("./sounds/wrong.mp3").play();
        setTimeout(()=>gameStart(), 500);
    }
}

function gameContinue() {
    let randomID = chooseRandomID();
    gameStatus.listOfButtons.push(randomID);
    gameStatus.currentLevel++;
    gameStatus.currentPointer = 0;
    $("#level-title").text("Current level : " + gameStatus.currentLevel);
    let nextButton = $(randomID);
    blinkNextButton(nextButton);
}

function gameStart() {
    gameStatus.listOfButtons = [];
    gameStatus.currentLevel = 0;
    $("body").removeClass("game-over");
    gameContinue();
}


var gameStatus = {
    listOfButtons : [],
    currentLevel : 1,
    currentPointer : 1
}


gameStart();
