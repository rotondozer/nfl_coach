$(form).submit(function(event) {
  **** FOR EVERY FORM SUBMIT ***
  prevent the default action of submit form
  if (playCall HAS NOT been established) {
    store input value in global var playCall
    check if placeholder should be set for run or pass
    if (playCall === 'run') {
      set input placeholder to specify run play
    } else if (playCall === 'pass') {
      set input placeholder to specify pass play
    } else {
      if playCall is not run or pass, alert user to resubmit;
      playCall = null;
    }
  }

  else if (playCall HAS been established and stored from previous form submit) {
    Check stored playCall value for run or pass
    if (playCall === 'run') {
      use input value to store in global var runType
      use if else if statements to evaluate runType call appropriate runType function
        if function call is complete reset placeholder to RUN OR PASS for next playCall
      else nothing matches function call, alert user to resubmit runType
    }
    else if (playCall === 'pass') {
      use input value to store in global var passType
      evaluate passType
      use if else if statements to call appropriate passType function
      function call complete so reset placeholder to RUN OR PASS for next playCall
        if function call is complete reset placeholder to RUN OR PASS for next playCall
      else nothing matches function call, alert user to resubmit passType
    }

    empty playCall, empty runType, empty passType
  }

  input value should always be emptied after every form submit
});


****** DRIVE FUNCTION *********
first submit
  user inputs general play
second submit
  user inputs specific play
  huddle() checks
    if general + specific matches playTypes properties
      playExecution() is called on those two inputs
      numberGenerator.effectiveness() called on probability
        if threshold not crossed
          function exits with local var playOutcome = 0
        if threshold crossed
          numberGenerator.effectiveness(playTypes[object input parameter].effectiveness category property)
          ydsGainedThisDown assigned value based on num generated
          ydsGained returned (or appended here?)




****** PLAY TYPES FUNCTION ******

function playResults(generalPlay, specificPlay) {
  call probability function to determine if play will execute
}
