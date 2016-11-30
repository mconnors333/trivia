// define score  variables, first to 10 wins
let teamOneScore = 0;
let teamTwoScore = 0;
let winningScore = 11;
let whoseTurn = Math.floor((Math.random() * 2) + 1);
let teamOnesTurn;
let answer;
let random_index;
let userAnswer;
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
    console.log(this);
    let url = $(this).attr("name");
    $(".trivia_question").empty();
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json"
    }).done(function(response) {
        console.log("ajax complete");
        random_index = Math.floor((Math.random() * response.clues.length));
        $(".trivia_question").append("<p>" + response.clues[random_index].question + "</p>");
        answer = response.clues[random_index].answer;
        console.log("answer", answer);
    });
  }

playFirst();
console.log("whose turn", teamOnesTurn);
// On selecting category, append randomly indexed question to trivia
$("a").on("click", selectCategory);
// compare users answer on submit to questions answer

$("#submit").on("click",function() {
    console.log(this);
    if (answer == $("input").val()) {
        if(teamOnesTurn) {
            teamOneScore++;
            $(".trivia_question").empty();
            console.log("teamone: " + teamOneScore);
        } else {
            teamTwoScore++;
            $(".trivia_question").empty();
            console.log("teamtwo: " + teamTwoScore);
        }
    } else {
        alert("sorry that was incorrect.  It is the other teams turn.");
        if (teamOnesTurn) {
            teamOnesTurn = false;
            $(".trivia_question").empty();
            console.log("whose turn", teamOnesTurn);
        } else {
            teamOnesTurn = true;
            $(".trivia_question").empty();
            console.log("whose turn", teamOnesTurn);
        }
    }
});


// else deduct a point and let other team choose category
