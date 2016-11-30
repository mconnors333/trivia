// define score  variables, first to 10 wins
let teamOneScore = 0;
let teamTwoScore = 0;
let winningScore = 11;
let whoseTurn = Math.floor((Math.random() * 2) + 1);
let teamOnesTurn;
let answer = [];
let random_index;
let userAnswer;
let answerIndex = 0;
// determine who plays first
function playFirst() {
    if (whoseTurn === 1) {
        teamOnesTurn = true;
    } else {
        teamOnesTurn = false;
    }
}

// function checkAnswer(answer) {
//     console.log(answer);
//     userAnswer = document.getElementsByTagName("input").value;
//     console.log(userAnswer);
// }

function selectCategory() {
    answerIndex++;
    let url = $(this).attr("name");
    $(".trivia_question").empty();
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json"
    }).done(function(response) {
        random_index = Math.floor((Math.random() * response.clues.length));
        $(".trivia_question").append("<p>" + response.clues[random_index].question + "</p>");
        answer[answerIndex] = response.clues[random_index].answer;
        console.log("answer", answer);
    });
    $("button").click(function() {
        console.log("answer index", answerIndex);
        if (answer[answerIndex] == $("input").val()) {
            if(teamOnesTurn) {
                teamOneScore = teamOneScore + (answerIndex - (answerIndex - 1));
                $(".trivia_question").empty();
                console.log("teamone: " + teamOneScore);
            } else {
                teamTwoScore = teamTwoScore + (answerIndex - (answerIndex - 1));
                $(".trivia_question").empty();
                console.log("teamtwo: " + teamTwoScore);
            }
        } else {
            alert("sorry that was incorrect.  It is the other teams turn.");
            if (teamOnesTurn) {
                teamOnesTurn = false;
                console.log("whose turn", teamOnesTurn);
            } else {
                teamOnesTurn = true;
                console.log("whose turn", teamOnesTurn);
            }
        }
    });
  }

playFirst();
console.log("whose turn", teamOnesTurn);
// On selecting category, append randomly indexed question to trivia
$("a").on("click", selectCategory);
// compare users answer on submit to questions answer



// else deduct a point and let other team choose category
