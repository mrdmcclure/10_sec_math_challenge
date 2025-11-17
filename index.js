$(document).ready(function(){  // basically followed the class example for the JS code
    var current_problem;
    var interval;
    var time_remaining = 10;
    var score = 0;
    var highscore = 0;  // adding the high score bonus feature
    
    var updatetime = function (amount) {
      time_remaining += amount;  // this should only happen when there is a correct answer recorded - should check on this before submitting
      $('#time-left').text(time_remaining);
    };
    
    var newscore = function (amount) {
      score += amount;
      $('#score').text(score);
      update_highscore(score)
    };

  var update_highscore = function (score) {  // to implment highscore feature
    if (score > highscore) {  // not sure if this will introduce a bug, check on it before submitting
      highscore = score;
      $('#highScore').text(score);  // links from html
    }
  };

  var startgame = function () {
    if (!interval) {
      if (time_remaining === 0) {
        updatetime(10);
        newscore(-score);
      }  // this starts the game
      interval = setInterval(function () {  // function in the library
        updatetime(-1);
        if (time_remaining === 0) {
          clearInterval(interval); // function in the library
          interval = undefined;  // this ends the game
        }
      }, 1000);  // magic number of 1000 because of 1000ms in 1s
    }
  };
    // add logic to have substaction and others

// formatting is indented below with a lot of spaces to help with debugging


    var random_number_creator = function (limit) {
      return Math.ceil(Math.random() * limit);  // returns a whole number smaller then the limit
    };
    
    var question_generator = function () {  // generate a random math problem
      var question = {};
      var operate = [];
    
        if ($('#plus').prop('checked')) {
          operate.push('+')  // the symbols are being highlighted, check on this
        }
        if ($('#minus').prop('checked')) {
          operate.push('−')
        }
        if ($('#multiply').prop('checked')) {
          operate.push('×')
        }
        if ($('#divide').prop('checked')) {
          operate.push('÷')
        }
    
        var operator = operate[Math.floor(Math.random() * operate.length)];
    
        var num1 = random_number_creator(10);
        var num2 = random_number_creator(10);
    
        if (operator === '−') {  // need these so it does not go below zero
          if (num1 <= num2) {
            return question_generator();
          }
        }
    
        if (operator === "÷") {
          if(num1 % num2 !== 0 || num1 <= num2 || num2 === 1) {
            return question_generator();
          }
        }
    



      question.answer = num1 + num2;
      // question.equation = String(num1) + " + " + String(num2);  // we are only doing addition here - comment this out otherwise it will create bugs
      
      question.equation = String(num1) + " " + operator + " " + String(num2);

      switch (operator) {
        case "+":
          question.answer = num1 + num2;
          break;
        case "−":
          question.answer = num1 - num2;
          break;
        case "×":
          question.answer = num1 * num2;
          break;
        case "÷":
          question.answer = num1 / num2;
          break;
      }


      
      return question;
    };
    
    var renderNewQuestion = function () {  // here is where the problem being displayed is generated, this function is in the class example
      current_problem = question_generator();
      $('#equation').text(current_problem.equation);  
    };
    
    var check_answer = function (userInput, answer) {
      if (userInput === answer) {
        renderNewQuestion();  // renderNewQuestion is in the class example walkthrough, note to self: refer back to it for debugging
        $('#user-input').val('');  // if the wrong answer is chosen, it does not clear, probably not important
        updatetime(+1);
        newscore(+1);
        
      }
    };
    
    $('#user-input').on('keyup', function () {
      startgame();
      check_answer(Number($(this).val()), current_problem.answer);
    });
    
    renderNewQuestion();
  });