$(document).ready(function() {

	//variables for app
	var time = 30;
	var count = 0;
	var counter = null;
	var hasGameEnded = false;
	var numQuestionsCorrect = 0;
	var numQuestionsWrong = 0;
	var numQuestions = 10;
	var startButtonClicked = false;
	var questions = ["Who has tried to kill Bart?", "What was the happiest day of Ralph Wiggum's life?", "Who sold the Monorail to Springfield?", "What is Selma's pet iguana's name?",
					"What secret society did Homer join?", "Which state did Lisa represent in the Geography Pagaent?", "What color was Bart's lucky cap?",
					"What was the name of Homer's helper monkey?", "Who was Lisa's first crush?", "What is the neighboring town of Springfield?"];

	var answerChoices = [["Sideshow Bob", "Krusty", "Homer", "Sideshow Mel"], ["The day he met Super Nintendo Chalmers.", "When he ate tomacco.", "When List gave him a Valentine's Card", "The day he and Bart ditched school together."], 
						["Lionel Hutz", "Mr. Burns", "Leonard Nimoy", "Lyle Lanley"], ["Boo boo", "Jimbo", "Willie", "Jub Jub"], [ "The NRA", "The Stonecutters",  "Ned Flanders' Left handers",  "The King Pins"],
						 [ "Florida", "Illinois", "Massachusetts",  "Idaho"], ["Yellow", "Green",  "Red", "Blue"], ["Mojo", "Snowball", "Jub Jub", "Bo bo"],
						  ["Milhouse", "Martin", "Ralph", "Nelson"], ["Branson", "Groeningville", "Capitol City",  "Shelbyville"]];

	var answers = ["Sideshow Bob", "When List gave him a Valentine's Card", "Lyle Lanley", "Jub Jub", "The Stonecutters", "Florida", "Red", "Mojo", "Nelson", "Shelbyville"];

	startGame();


	//function for the start button
	function startGame() {
		$('#startButton').on('click', function() {
			startButtonClicked = true;
			displayGame();
			if (!hasGameEnded) {
				startButton();
				$('#startButton').hide();
				if (time === 0) {
					//ran out of time, you got it wrong: next question setTimeout here?
				}

				//if answer cliked correct, then well done, you guessed correctly
				//numQuestions--
				//else if answer clicked incorect, didn't get it right, 
				//numQuestions--
				//if(numQuestions ==== 10) stop game and show results.  reset game if want to try again.
			}
			
		});
	}
	//helper functions for startbutton
	function startButton() {
		counter = setInterval(countDown, 1000);
	}

	function stop() {
		clearInterval(counter);
		counter = null;
	}
	function countDown() {
		time--;
		var countingDownSeconds = time;
		$('#displayCountDownClock').html("Time remaining: " + countingDownSeconds);
	}	

	function reset() {
		time = 30;
		
	}

	//display the game functions
	function displayGame() {
		startButtonClicked = true;
		if (startButtonClicked) {
			$('#displayQuestion').html("<h2>" + questions[count] + "</h2>");
		}
		displayAnswerChoices();
	}

	function displayAnswerChoices() {
		var setOfChoices = answerChoices[count];
		for (var i = 0; i < setOfChoices.length; i++) {
			$('#displayAnswerChoices').append("<h3 id=" + i + ">" + setOfChoices[i] + "</h3><br>")
			$('#' + i).on('click', function() {
				stop();
				var answered = $(this).text();
				if (answered === answers[count]) {
					numQuestionsCorrect++;
					alert("you got it correct!");

				} else {
					numQuestionsWrong++;
					alert("no, you got it wrong..");
				}
			});
		}
		
	}
});