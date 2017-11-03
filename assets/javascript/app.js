window.onload = function () {
    function Questions(qTitle, qDisplay, a1, a2, a3, a4, correct, correctImg, wrongImg, correctSong, wrongSong, ) {
        this.qTitle = qTitle;
        this.qDisplay = qDisplay;
        this.a1 = a1;
        this.a2 = a2;
        this.a3 = a3;
        this.a4 = a4;
        this.correct = correct;
        this.correctImg = correctImg;
        this.wrongImg = wrongImg;
        this.correctSong = correctSong;
        this.wrongSong = wrongSong;

    }
    var correctSound = new Audio("assets/images/Correct-answer.mp3");
    var wrongSound = new Audio("assets/images/Wrong-answer-sound-effect.mp3");
    var rickRolled = new Audio("assets/images/RickRollD.mp3");
    var sadViolin = new Audio("assets/images/SadViolin.mp3");
    var rickWrong = new Audio("assets/images/rickFuck.mp3");

    var question1 = new Questions("Question 1", "What is 1+1 = ?", 1, 2, 3, 4, 2, "correct.jpg", "wrong.jpg", correctSound, wrongSound);
    var question2 = new Questions("Question 2", "What should Rick do?", "Roll", "Morty", "Dance", "Wubudubudubdub", "Roll", "rickRoll.jpg", "rickWrong.jpg", rickRolled, rickWrong);
    var question3 = new Questions("Question 3", "How do you get a Unicorn?", "Boku-wa Doraemon", "Unlucky", "Very soon!", "We'll never know...", "Sucks to be you", "unicorn.jpg", "unicorn.jpg", sadViolin, sadViolin);



    var List_Questions = [question1, question2, question3];

    var TIMESTATIC = 100;
    var timeLeft = TIMESTATIC;

    var showQuestion;

    // Count will keep track of the index of the currently displaying picture.
    var count = List_Questions.length-1;
    var score = 0;
    var isTimeon = false;
    var isAnswered = false;
    // TODO: Use jQuery to run "startSlideshow" when we click the "start" button.


    // This function will replace display whatever image it's given
    // in the 'src' attribute of the img tag.
    function displayQuestion() {
        $("#contentHeader").html(List_Questions[count].qTitle);
        $("#contentBody").html(List_Questions[count].qDisplay);
        $("#answer-1").html(List_Questions[count].a1);
        $("#answer-2").html(List_Questions[count].a2);
        $("#answer-3").html(List_Questions[count].a3);
        $("#answer-4").html(List_Questions[count].a4);
    }

    function start() {
        setInterval(displayTime, 100);
        makeQuestion();
        $("#score").html("Score: " + score);        
        showQuestion = setInterval(makeQuestion, timeLeft * 100);
    }

    function makeQuestion() {
        isTimeon = true;
        isAnswered = false;
        nextQuestion();
        displayQuestion();
    }

    function nextQuestion() {
        count++;
        if (count === List_Questions.length) { count = 0 };
    }

    function rightSlide() {
        //$("#contentBody").html("<img src='assets/images/" + List_Questions[count].correctImg + "'>");
        List_Questions[count].correctSong.play();
    }

    function wrongSlide() {
        //$("#contentBody").html("<img src='assets/images/" + List_Questions[count].wrongImg + "'>");
        List_Questions[count].wrongSong.play();
    }

    function displayTime() {
        $("#timer").html(timeConvert());
    }

    function timeConvert() {
        if (isTimeon) {
            timeLeft--;
            if (timeLeft > 100) {

                return timeLeft.toString().substring(0, 2);
            }
            else if (timeLeft < 10 && timeLeft > 0) {
                return "0." + timeLeft.toString();
            }
            else if (timeLeft < 101 && timeLeft > 9) {
                return timeLeft.toString()[0] + "." + timeLeft.toString()[1];
            }
            else {
                score--;
                $("#score").html("Score: " + score);
                timeLeft = TIMESTATIC;
                return timeConvert;
            }
        }
    }

    function checkAnswer(event) {
        return (event == List_Questions[count].correct);
    }

    
    $(document).on("click", ".questionbox", function () {
        if (!isAnswered) {
            timeLeft = TIMESTATIC;
            isTimeon = false;
            isAnswered = true;
            var event = $(this).text();
            if (checkAnswer(event)) {
                score++;
                $("#score").html("Score: " + score);
                clearInterval(showQuestion);
                rightSlide();
                makeQuestion();
                showQuestion = setInterval(makeQuestion, TIMESTATIC * 100)

            }
            else {
                score--;
                $("#score").html("Score: " + score);
                clearInterval(showQuestion);
                wrongSlide();
                makeQuestion();
                showQuestion = setInterval(makeQuestion, TIMESTATIC * 100)
            }
        }
    });
    start();
}












