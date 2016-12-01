// define score  variables, first to 10 wins
let teamOneScore = 0;
let teamTwoScore = 0;
let winningScore = 3;
let whoseTurn = Math.floor((Math.random() * 2) + 1);
let teamOnesTurn;
let answer;
let random_index;
let userAnswer;
// determine who plays first
function playFirst() {
    if (whoseTurn === 1) {
        teamOnesTurn = true;
        $(".teamOne").toggleClass("activeTeam");
        $(".scoreOne").html(teamOneScore);
        $(".scoreTwo").html(teamTwoScore);
    } else {
        teamOnesTurn = false;
        $(".teamTwo").toggleClass("activeTeam");
        $(".scoreOne").html(teamOneScore);
        $(".scoreTwo").html(teamTwoScore);
    }
}

function resetScores(){
    teamOneScore = 0;
    teamTwoScore = 0;
    $(".scoreOne").html(teamOneScore);
    $(".scoreTwo").html(teamTwoScore);
}

function resetQuestionAnswer(){
    $(".trivia_question").empty();
    $("input").val("");
}

// function checkAnswer(answer) {
//     console.log(answer);
//     userAnswer = document.getElementsByTagName("input").value;
//     console.log(userAnswer);
// }

function selectCategory() {
    let url = $(this).attr("name");
    $(".trivia_question").empty();
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json"
    }).done(function(response) {
        random_index = Math.floor((Math.random() * response.clues.length));
        $(".trivia_question").append("<p class='questionBox'>" + response.clues[random_index].question + "</p>");
        answer = response.clues[random_index].answer;
        answer = answer.toLowerCase().replace(/[\\\-\/!@,#"'$.%^&*()]/g, '').replace(/<i>/g, "").replace("</i>i>", "");
        console.log("answer", answer);
    });
  }

playFirst();
// On selecting category, append randomly indexed question to trivia
$("a").on("click", selectCategory);
// compare users answer on submit to questions answer

$("#submit").on("click",function() {
    if (answer.toLowerCase().replace(/[\\\-\/!@,#"'$.%^&*()]/g, '').replace(/<i>/g, "").replace("</i>i>", "") == $("input").val().toLowerCase().replace(/[\\\-\/!@,#"'$.%^&*()]/g, '')) {
        if(teamOnesTurn) {
            teamOneScore++;
            if(teamOneScore >= winningScore) {
                alert("Congrats! Team One has won!");
                resetScores();
            }
            $(".scoreOne").html(teamOneScore);
            resetQuestionAnswer();
        } else {
            teamTwoScore++;
            if(teamTwoScore >= winningScore) {
                alert("Congrats! Team Two has won!");
                resetScores();
            }
            $(".scoreTwo").html(teamTwoScore);
            resetQuestionAnswer();
        }
    } else {
        alert("Sorry, that was incorrect. The correct answer was "+ answer + ".  It is the other teams turn.");
        if (teamOnesTurn) {
            teamOnesTurn = false;
            $(".trivia_question").empty();
            $("input").val("");
            $(".teamTwo").toggleClass("activeTeam");
            $(".teamOne").toggleClass("activeTeam");
        } else {
            teamOnesTurn = true;
            $(".trivia_question").empty();
            $("input").val("");
            $(".teamTwo").toggleClass("activeTeam");
            $(".teamOne").toggleClass("activeTeam");
        }
    }
});
