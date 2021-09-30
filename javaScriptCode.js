var isPlayerPlaying = false, score = 0, answer, seconds;
defineBoxOnClick();
document.getElementById("startGameBox").onclick = function()
{
    if(isPlayerPlaying == true)
        {
            location.reload();
        }
    else 
        {
            seconds = 60;
            resetData();
            runTimer();
            showNextQuestsion();
        }
    isPlayerPlaying = !isPlayerPlaying;
}

function resetData()
{
    resetScore();
    changeBoxToReset();
}

function resetScore()
{
    score = 0;
    document.getElementById("playerPoints").innerHTML = score;
}

function runTimer()
{
    expose("remainingTimeBox");
    expose("Time");
    document.getElementById("remainingTimeBox").style.visibility = "visible";
    timerInterval = setInterval(function() { 
    seconds--; 
    document.getElementById("Time").innerHTML = seconds;
    if(seconds == 0)
        {
            stopCountAndGameOver();
        }     
    }
    , 1000);
}

function stopCountAndGameOver()
{
    clearInterval(timerInterval);
    gameOver();
}

function updateScore()
{
    document.getElementById("playerPoints").innerHTML = score;
}

function gameOver()
{
    document.getElementById("gameOverBox").style.display = "block";
    document.getElementById("score").innerHTML = score;
    hideAll();
}

function hideAll()
{
    hide("correctAnswer");
    hide("wrongAnswer");
    hide("Time");
    score = 0;
    document.getElementById("remainingTimeBox").style.visibility = "hidden"
}

function changeBoxToReset()
{
   document.getElementById("startGameBox").innerHTML = "reset Game";
}

function expose(i_String)
        {
            document.getElementById(i_String).style.display = "block";
        }
        
function hide(i_String)
        {
           document.getElementById(i_String).style.display = "none";
        }

function showNextQuestsion()
{
    var question = getQuestionAndShow();
    setBoxesWithAnswerAndRandoms(question);
}

function getQuestionAndShow()
{
    var randomNumberOne = Math.floor(1 + Math.random() * 10);
    var randomNumberTwo = Math.floor(1 + Math.random() * 10);
    document.getElementById("AlgebricQuestion").innerHTML = randomNumberOne + ' X ' + randomNumberTwo;
    return (randomNumberOne * randomNumberTwo);
}

function setBoxesWithAnswerAndRandoms(i_Result)
{
    var randomNumber;
    var randomBox;
    answer = i_Result
    for(i = 0 ; i < 4 ; i++)
        {
            randomNumber = Math.floor(Math.random() * 82 );
            document.getElementById("box" + i).innerHTML = randomNumber;
        }
    
    randomBox = Math.floor(Math.random() * 4);
    document.getElementById("box" + randomBox).innerHTML = i_Result;
}

function defineBoxOnClick(){
 for(var i=0 ; i < 4; i++)
    {
 document.getElementById("box" + i).onclick = function()
 {
    if(isPlayerPlaying ==true)
        {
          if(this.innerHTML == answer)
             {
                seconds += 3;
                 expose("correctAnswer");
                 setTimeout(function(){
                     hide("correctAnswer");}, 1000);
                 score++;
                 updateScore();
                 showNextQuestsion();
             }
        else
            {
                expose("wrongAnswer");
                setTimeout(function(){
                    hide("wrongAnswer");}, 1000); 
           }
        }
 }
}
}