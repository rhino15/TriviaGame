$(document).ready(function() {

	//variables for app
	var time = 30;
	var currentQuestionIndex = 0;
	var counter = null;
	var hasGameEnded = false;
	var numQuestionsCorrect = 0;
	var numQuestionsWrong = 0;
	var numQuestions = 10;
	var startButtonClicked = false;
	var questions = ["Who has tried to kill Bart?", "What was the happiest day of Ralph Wiggum's life?", "Who sold the Monorail to Springfield?", "What is Selma's pet iguana's name?",
					"What secret society did Homer join?", "Which state did Lisa represent in the Geography Pagaent?", "What color was Bart's lucky cap?",
					"What was the name of Homer's helper monkey?", "Who was Lisa's first crush?", "What is the neighboring town of Springfield?"];

	var answerChoices = [["Sideshow Bob", "Krusty", "Homer", "Sideshow Mel"], ["The day he met Super Nintendo Chalmers.", "When he ate tomacco.", "When Lisa gave him a Valentine's Card", "The day he and Bart ditched school together."], 
						["Lionel Hutz", "Mr. Burns", "Leonard Nimoy", "Lyle Lanley"], ["Boo boo", "Jimbo", "Willie", "Jub Jub"], [ "The NRA", "The Stonecutters",  "Ned Flanders' Left handers",  "The King Pins"],
						 [ "Florida", "Illinois", "Massachusetts",  "Idaho"], ["Yellow", "Green",  "Red", "Blue"], ["Mojo", "Snowball", "Jub Jub", "Bo bo"],
						  ["Milhouse", "Martin", "Ralph", "Nelson"], ["Branson", "Groeningville", "Capitol City",  "Shelbyville"]];

	var answers = ["Sideshow Bob", "When Lisa gave him a Valentine's Card", "Lyle Lanley", "Jub Jub", "The Stonecutters", "Florida", "Red", "Mojo", "Nelson", "Shelbyville"];

	var simpsonsImages = []
	startGame();


	//function for the start button
	function startGame() {
		$('#startButton').on('click', function() {
			startButtonClicked = true;
			displayGame();
			if (!hasGameEnded) {
				startTimer();
				$('#startButton').hide();
			}
			
		});
	}
	//helper functions for startbutton
	function startTimer() {
		counter = setInterval(countDown, 1000);
	}

	function stopTimer() {
		clearInterval(counter);
		counter = null;
	}
	function countDown() {
		time--;
		//if time === 0 show next question
		var countingDownSeconds = time;
		$('#displayCountDownClock').html("Time remaining: " + countingDownSeconds);
	}	

	function resetTimer() {
		time = 30;
		startTimer()
	}

	//display the game functions
	function displayGame() {
		startButtonClicked = true;
		if (startButtonClicked) {
			$('#displayQuestion').html("<h2>" + questions[currentQuestionIndex] + "</h2>");
		}
		displayAnswerChoices();
	}

	function displayAnswerChoices() {
		var setOfChoices = answerChoices[currentQuestionIndex];
		$("#displayAnswerChoices").empty();
		for (var i = 0; i < setOfChoices.length; i++) {
			$('#displayAnswerChoices').append("<h3 id=" + i + ">" + setOfChoices[i] + "</h3><br>")
			$('#' + i).on('click', function() {
				stopTimer();
				var answered = $(this).text();
				var isCorrect = answered === answers[currentQuestionIndex];
				showNextQuestion(isCorrect);
			});
		}
		
	}

	function showNextQuestion(isCorrect) {
		if (isCorrect) {
			numQuestionsCorrect++;
			alert("you got it correct!");
		} else {
			numQuestionsWrong++;
			alert("no, you got it wrong..");
		}
		currentQuestionIndex++;
		//counter = setTimeout(showImage(), 4000);
		displayGame();
		resetTimer();
	}

	function showImage() {

	}
});