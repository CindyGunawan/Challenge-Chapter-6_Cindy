const userRock = document.getElementById('user-rock');
const userPaper = document.getElementById('user-paper');
const userScissor = document.getElementById('user-scissor');
const comRock = document.getElementById('com-rock');
const comPaper = document.getElementById('com-paper');
const comScissor = document.getElementById('com-scissor');
const resultText = document.getElementById ("versus");
const gameReset = document.getElementById ("reset");
const clickButton=[...document.getElementsByClassName("hide")]
const button = document.querySelector('button');

function comChoice () {
    var choices = ['rock','paper','scissor'];
    var randomChoices = Math.floor(Math.random() *3);
    return choices [randomChoices];
}

function winResult(){
    resultText.setAttribute("style","font-size:28px ; color:white");
    resultText.style.backgroundColor = "#4C9654";
    resultText.style.padding ="50px 50px 50px 50px";
    resultText.style.borderRadius = "20px";
}

function drawResult(){
    resultText.setAttribute("style","font-size:28px ; color:white");
    resultText.style.backgroundColor = "#035B0C";
    resultText.style.padding ="50px 50px 50px 50px";
    resultText.style.borderRadius = "20px";
}

function userWin (){
    console.log("Kamu Menang");
    winResult();
    resultText.innerText = "PLAYER 1 WIN";
}

function comWin (){
    console.log("Komputer Menang");
    winResult();
    resultText.innerText = "COM WIN";
}

function gameDraw (){
    console.log("Seri");
    drawResult();
    resultText.innerText = "DRAW";
}

function possibleChoice(userChoice){
    const computerChoice = comChoice ();

    switch (userChoice + computerChoice) {
        case "rockscissor":
        case "scissorpaper":
        case "paperrock":
            userWin();

            break;
        case "scissorrock":
        case "rockpaper":
        case "paperscissor":
            comWin();

            break;
        case "scissorscissor":
        case "rockrock":
        case "paperpaper":
            gameDraw();

    }

    switch(computerChoice){
        case "rock":
        comRock.classList.add ('focus');

            break;
        case "scissor":
        comScissor.classList.add ('focus');

            break;
        case "paper":
        comPaper.classList.add ('focus');
    }

}

function gamePlay(){
    userRock.addEventListener('click', function () {
        userRock.classList.add ('focus');
        possibleChoice("rock");
        clickButton.forEach(clickButton2 => {
            clickButton2.setAttribute("style","cursor:not-allowed;pointer-events:none;")
        })
    })

    userPaper.addEventListener('click', function () {
        userPaper.classList.add ('focus');
        possibleChoice("paper");
        clickButton.forEach(clickButton2 => {
            clickButton2.setAttribute("style","cursor:not-allowed;pointer-events:none;")
        })
    })

    userScissor.addEventListener('click', function () {
        userScissor.classList.add ('focus');
        possibleChoice("scissor");
        clickButton.forEach(clickButton2 => {
            clickButton2.setAttribute("style","cursor:not-allowed;pointer-events:none;")
        })
    })
}

gamePlay();

gameReset.addEventListener('click',function(){
    clickButton.forEach(clickButton2 => {
        clickButton2.classList.remove('focus')
    });
    clickButton.forEach(clickButton2 => {
        clickButton2.removeAttribute("style","cursor:not-allowed;pointer-events:none;")
    })

    resultText.removeAttribute("style","font-size:; color:")
    resultText.style.backgroundColor = "transparent";

    resultText.innerText = "vs";

})





