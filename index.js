$(function () { 
  beginQuiz();
  handleSubmit(); 
  renderQuiz(); 
}); 

const store = { 
  questions: [ 
    { 
      question: 'In “Sugar We’re Going Down,” Patrick sings:',
      answers: ['We’re going downtown and we’re turning around', 
      'We’re going bow-wow on a merry-go-round',
      'We’re going down, down in an earlier round', 
      'We’re going down down and around and around'], 
      correctAnswer: 'We’re going down, down in an earlier round'
    }, 
    {
      question: 'Which of the following did Patrick sing in “27”?',
      answers: ['My mind is a safe and I keep it in the onion ring', 
      'My mind is a safe and if I keep it in, we all get rich', 
      'My mind is a safe and if I keep it then we’re all a bridge', 
      'My mind is a safe and if I keep it then you’re a glitch'], 
      correctAnswer: 'My mind is a safe and if I keep it in, we all get rich'
    }, 
    { 
      question: 'In “Dance, Dance,” Patrick emphatically sings:',
      answers: ['I’m two quarters and a Honda', 
      'Only two horse in the barn now', 
      'I’m two poodles in a hot tub', 
      'I’m two quarters and a heart down'], 
      correctAnswer: 'I’m two quarters and a heart down'
    }, 
    { 
      question: 'What does Patrick chant in “Disloyal Order of Water Buffaloes”?',
      answers: ['Detox just to retox', 
      'Ritos just Doritos', 
      'De-tux just to re-tux',
      'Ding toss just to ring toss'],
      correctAnswer: 'Detox just to retox'
    }, 
    { 
      question: 'In “Nobody Puts Baby in the Corner,” Patrick sings:',
      answers: ['Happy Alice Pepper, I’d fail her every day', 
      'The hand behind this pen relives a failure every day', 
      'Have an Irish pepper, it’s a February day',
      'Ariana’s pepper makes it better every day'], 
      correctAnswer: 'The hand behind this pen relives a failure every day'
    }, 
    {
      question: 'What does Patrick croon in “The (After) Life of the Party”?',
      answers: ['But it hurts to watch you work the room', 
      'But it hurts to watch you with the moon',
      'Cut it loose, watch you work the room', 
      'But it hurts to watch you with the groom'], 
      correctAnswer: 'Cut it loose, watch you work the room'
    }, 
    { 
      question: 'Which of the following does Patrick sing in his falsetto on “The Take Over, The Break’s Over”?',
      answers: ['Wouldn’t you rather be a willow, than a Debussy', 
      'Wouldn’t you rather be a widow than a divorcee', 
      'Wouldn’t you rather be a weirdo than a diva, see', 
      'Wouldn’t you rather be a window of a DMV'], 
      correctAnswer: 'Wouldn’t you rather be a widow than a divorcee'
    }, 
    { 
      question: 'In “This Ain’t a Scene, It’s An Arms Race,” Patrick sings:',
      answers: ['I’m a leading man and the lies I weave are oh, so intricate', 
      'Army leading man, I’m so evil, oh, so intricate', 
      'I’m a leading man and I’m so evil, also into cats', 
      'I’m a leading man and NASA’s evil, you just might exist'], 
      correctAnswer: 'I’m a leading man and the lies I weave are oh, so intricate'
    }, 
    {
      question: 'In this staccato line of “Get Busy Living or Get Busy Dying (Do Your Part to Save The Scene And Stop Going to Shows),” Patrick gruffly barks:',
      answers: ['I’m adding lettuce to red dresses in a ghost town', 
      'I’m mailing letters to addresses in a ghost town', 
      'I’m adding lettuce to breakfast in a ghost town', 
      'I’m mailing letters to Alyssa’s in a ghost town'], 
      correctAnswer: 'I’m mailing letters to addresses in a ghost town'
    }, 
    { 
      question: 'What does Patrick say with the sugary vocals on “Grand Theft Autumn/Where Is Your Boy”?',
      answers: ['You need him, I could be him', 'I should eat him, I could eat him',
        'You kneed him, I could beat him', 
        'You freed him, I could see him'],
      correctAnswer: 'You need him, I could be him'
    }
  ],
  currentQuestionIndex: 0,
  questionsCorrectCount: 0,
};

function beginQuiz() { 
  $('#start-button').on('click', '#start', event => { 
    $('#quiz-block').removeClass('hidden');
    $('#start-button').addClass('hidden'); 
    console.log('`beginQuiz` ran'); 
  }); 
} 

function handleSubmit() {
  $('#question-form').on('click', '.submit', event => { 
    event.preventDefault(); 
    let userChoice = $('input[name=answerChoice]:checked').val();
    checkAnswer(userChoice);
    console.log('`handleSubmit` ran');
  });
}

function checkAnswer(userChoice) { 
  let correctChoice = store.questions[store.currentQuestionIndex].correctAnswer; 
  if (userChoice == correctChoice) { 
    store.questionsCorrectCount++; 
    handleFeedback(true, correctChoice);
    store.currentQuestionIndex++; 
  } else if (userChoice === undefined) { 
    handleFeedback(undefined, correctChoice);
    store.currentQuestionIndex; 
  } else if (userChoice !== correctChoice) { 
    handleFeedback(false, correctChoice); 
    store.currentQuestionIndex++; 
  }
  if (store.currentQuestionIndex == store.questions.length) { 
    renderFinalScore(); 
  } else { 
    renderQuiz(); 
  }
  console.log('`checkAnswer` ran');
} 

function renderQuestionText() { 
  let showProgress = '<span>(' + (store.currentQuestionIndex + 1) + '/' + (store.questions.length) + ') </span>';
  let questionText = store.questions[store.currentQuestionIndex].question; 
  $('.question-text').html(showProgress + questionText);
  console.log('`renderQuestionText` ran');
} 

function renderQuestionOptions(answers) { 
  $('#question-form label').each(function (index, label) { 
    $(this).find('input').attr('value', answers[index]); 
    $(this).find('input').prop('checked', false);
    $(this).find('span').text(answers[index]); 
  }); 
  console.log('`renderQuestionOptions` ran');
} 

function renderQuiz () { 
  let currentQuestion = store.questions[store.currentQuestionIndex]; 
  renderQuestionText();
  renderQuestionOptions(currentQuestion.answers); 
  console.log('`renderQuiz` ran');
} 

function handleFeedback(userChoice, correctChoice) { 
  let feedback = $('.popup-text');
  if (userChoice === true) { 
    feedback.find('h2').text('You got it!');
    feedback.find('h4').text(`No one can pick apart Patrick’s bad enunciation like you. You’ve guessed ${store.questionsCorrectCount} out of ${store.questions.length} lyrics correctly.`); 
    feedback.find('img').attr('src', 'https://i.pinimg.com/originals/d4/ac/dd/d4acdda8928dceb6a2eba9532a85eb29.jpg'); 
    feedback.find('img').attr('alt', 'Gif of Patrick Stump in Fall Out Boy’s Dance, Dance video, shown drawing a heart in the air'); 
  } else if (userChoice === undefined) { 
    feedback.find('h2').text('Choose a lyric!'); 
    feedback.find('h4').text(`You have to choose a lyric to move to the next question. If you’re wrong, that’s okay. He can be hard to understand.`);
    feedback.find('img').attr('src', 'http://78.media.tumblr.com/e37bd7f76ebfda9997d42064a21d004b/tumblr_oziqsoYRrJ1rrpslpo4_r1_400.gif'); 
    feedback.find('img').attr('alt', 'Gif of Patrick Stump touching his head in confusion, pale pink lines on a dark blue background rippling outward in circles from his head'); 
    } else if (userChoice === false) { 
    feedback.find('h2').text('Sorry, no!'); 
    feedback.find('h4').text(`The correct answer is, “${correctChoice}.” Don’t sweat it, though. You’ve guessed ${store.questionsCorrectCount} out of ${store.questions.length} lyrics correctly.`);
    feedback.find('img').attr('src', 'https://media.giphy.com/media/1ZuZnQFAx3WTe/giphy.gif'); 
    feedback.find('img').attr('alt', 'Gif of Patrick Stump cocking his head and grimacing a bit, as if to say, "Not quite"');
  }
    $('.popup-text').dialog(feedback);
} 

function renderFinalScore() { 
$('#quiz-block').addClass('hidden'); 
  $('#restart').removeClass('hidden'); 
  let element = $('.final-score');
  element.html(`<h2>You guessed ${store.questionsCorrectCount} out of ${store.questions.length} lyrics correctly!</h2><p>Quiz concept heavily inspired by this vine:<p><center><div style="position:relative;height:0;padding-bottom:75.0%"><iframe src="https://www.youtube.com/embed/z8tfLcn8Fl8?ecver=2" width="480" height="360" frameborder="0" allow="autoplay; encrypted-media" style="position:absolute;width:100%;height:90%;left:0" allowfullscreen></iframe></div></center>`);
  handleRestart();
} 

function resetQuiz() { 
  store.questionsCorrectCount = 0;
  store.currentQuestionIndex = 0;
  $('.final-score').html('');
} 

function handleRestart() {
  $('#restart').on('click', event => { 
    $('#quiz-block').removeClass('hidden');
    $('#start-over').addClass('hidden'); 
    $('#restart').addClass('hidden');
    resetQuiz(); 
    renderQuiz();
});
}