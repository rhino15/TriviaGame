$(document).ready(function() {

	//variables for app
	var time = 500;
	var currentQuestionIndex = 0;
	var counter = null;
	var hasGameEnded = false;
	var numQuestionsCorrect = 0;
	var numQuestionsWrong = 0;
	var numQuestionsUnanswered = 0;
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

	var simpsonsImages = ["assets/images/sideshow_bob.jpg", "assets/images/valentine.jpeg", "assets/images/lyle_lanley.png", "assets/images/jub_jub.jpg", "assets/images/stonecutters.jpeg",
						"assets/images/florida.jpg", "assets/images/red.jpg", "assets/images/mojo.jpg", "assets/images/nelson.jpg", "assets/images/shelbyville.jpg"];
	

	startGame();


	//function for the start button
	function startGame() {
		$('#startButton').on('click', function() {
			startButtonClicked = true;
			displayGame();
		
			startTimer();
			$('#startButton').hide();	
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
		if (time === 0) {
			showImageAndStats();
			stopTimer();
			alert("you did not answer in time....doh.");
			numQuestionsUnanswered++;
			resetState();
		}
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

		if (currentQuestionIndex === 9) {
			endGame();
		}
		$("#displayAnswerChoices").empty();
		for (var i = 0; i < setOfChoices.length; i++) {
			$('#displayAnswerChoices').append("<div class='answerChoice'><h3 id=" + i + ">" + setOfChoices[i] + "</h3></div><br>");
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
		showImageAndStats();
		currentQuestionIndex++;
		displayGame();
		resetTimer();

	}

	function showImageAndStats() {
		$('#displayQuestion').empty();
		$('#displayAnswerChoices').empty();
		//show the image

		$('.simpsonsImages').html("<img src=" + simpsonsImages[currentQuestionIndex] + ">");
		numQuestions--;
	}

	function endGame() {
		var winningDiv = $('<div class=showResults>');
		var showWins = $('<h3>').html("Okily Dokily! You got " + numQuestionsCorrect + " correct!");
		winningDiv.append(showWins);

		var losingDiv = $('<div class=showResults>');
		var showLosses = $('<h3>').html("D'oh! You got " + numQuestionsWrong + " wrong!");
		losingDiv.append(showLosses);

		var questionsUnansweredDiv = $('<div class=showResults>');
		if (numQuestionsUnanswered > 0) {
			var showNumUnanswered = $('<h3>').html("You forgot to answer " + numQuestionsUnanswered + " questions...");
			questionsUnansweredDiv.append(showNumUnanswered);
		} else {
			var answeredAll = $('<h3>').html("Good jog, you answered all the questions.  Did you get them all correct?");
			questionsUnansweredDiv.append(answeredAll);
		}
		resetGame()
	}

	function resetState() {
		currentQuestionIndex++;
		displayGame();
		resetTimer();
	
	}

	function resetGame() {
		$('<button>').on("click", function() {
			var restartGameButton = $('<input type="button" value="Restart Game"/>')
			$('#restartGame').append(restartGameButton);
			currentQuestionIndex = 0;
			numQuestionsCorrect = 0;
			numQuestionsWrong = 0;
			numQuestionsUnanswered = 0;
			numQuestions = 10;
			displayGame();
			resetTimer();
		});
	}
});