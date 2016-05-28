$(document).ready(function() {

	//variables for app
	var time = 30;
	var currentQuestionIndex = 0;
	var counter = null;
	var hasGameEnded = false;
	var numQuestionsCorrect = 0;
	var numQuestionsWrong = 0;
	var numQuestionsUnanswered = 0;
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
		$('#resetButton').hide();
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
			$("#unanswered").html("<h3>I'm not a genuis, or are I??? You forgot to answer the question...</h3>")
			numQuestionsUnanswered++;
			setTimeout(function () {
				resetState();
			}, 5000)
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
		//startButtonClicked = true;
		if (currentQuestionIndex === 10) {
			endGame();
		}

		if (startButtonClicked) {
			$('#displayQuestion').html("<h2>" + questions[currentQuestionIndex] + "</h2>");
		}

		displayAnswerChoices();
	}

	function displayAnswerChoices() {
		var setOfChoices = answerChoices[currentQuestionIndex];
		
		$("#displayAnswerChoices").empty();
		$(".simpsonsImages").empty();
		$("#questionCorrect").empty();
		$("#questionWrong").empty();
		$("#unanswered").empty();

		for (var i = 0; i < setOfChoices.length; i++) {
			$('#displayAnswerChoices').append("<div class='answerChoice'><button class='answer' id=" + i + ">" + setOfChoices[i] + "</button></div><br>");
			$('#' + i).on('click', function() {
				stopTimer();
				var answered = $(this).text();
				var isCorrect = answered === answers[currentQuestionIndex];
				showNextQuestion(isCorrect);
			});
		}
		
	}

	function showNextQuestion(isCorrect) {
		$('#questionCorrect').empty();
		$("#questionWrong").empty();

		if (isCorrect) {
			numQuestionsCorrect++;
			$('#questionCorrect').html("<h3>Okily Dokily, Partner!!! You got it Righterino!!! You guessed " + answers[currentQuestionIndex] +"!</h3>")
		} else {
			numQuestionsWrong++;
			$("#questionWrong").html("<h3>D'oh...You got it wrong... The answer was " + answers[currentQuestionIndex] + "...</h3>")
		}
	
		showImageAndStats();

		if (currentQuestionIndex === 10) {
			endGame();
		}

		setTimeout(function () {
			resetState();
		}, 5000)

	}

	function showImageAndStats() {
		$('#displayQuestion').empty();
		$('#displayAnswerChoices').empty();
		$('.simpsonsImages').empty();
		//show the image
		
		$('.simpsonsImages').append("<img src=" + simpsonsImages[currentQuestionIndex] + ">");
	}

	function endGame() {
		$('#resetGame').empty();
		$("#displayAnswerChoices").empty();
		$(".simpsonsImages").empty();
		$("#questionCorrect").empty();
		$("#questionWrong").empty();
		$("#unanswered").empty();

		$('#restartGame').append("<h3>Okily Dokily! You got " + numQuestionsCorrect + " correct!</h3>");
		$('#restartGame').append("<h3>D'oh! You got " + numQuestionsWrong + " wrong!</h3>");

		if (numQuestionsUnanswered > 0) {
			$('#restartGame').append("<h3>You forgot to answer " + numQuestionsUnanswered + " questions...</h3>");
		} else {
			$('#restartGame').append("<h3>You answered all the questions. Everything is coming up, Milhouse</h3>");
		}	
		$('#resetButton').show();
		resetGameButton();
	}

	function resetState() {
		currentQuestionIndex++;
		displayGame();
		resetTimer();
	
	}

	function resetGameButton() {
		$('#resetButton').hide();
		$('#resetButton').on('click', function() {
			resetGame();	
		});
	}

	function resetGame() {		
		currentQuestionIndex = 0;
		numQuestionsCorrect = 0;
		numQuestionsWrong = 0;
		numQuestionsUnanswered = 0;
		displayGame();
		resetTimer();
		clearInterval(counter);
	}
});