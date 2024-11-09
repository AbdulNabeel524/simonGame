// $("h1");

$(document).ready(function () {
  let userClickedPattern = [];
  let gamePattern = [];
  const buttonColours = ["red", "blue", "green", "yellow"];
  function nextSequence() {
    userClickedPattern = [];
    const randomNumber = Math.floor(Math.random() * 4);
    //   console.log(randomNumber);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // console.log(randomChosenColour);
    let flashingButton = $(`#${randomChosenColour}`);
    flashingButton.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("h1").text(`Level ${level}`);
    level++;
    console.log(level);
  }

  $(".btn").click(function () {
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    // console.log(userClickedPattern);
    // console.log(gamePattern);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  });
  function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
  }
  function animatePress(currentColour) {
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(function () {
      $(`#${currentColour}`).removeClass("pressed");
    }, 100);
  }
  let level = 1;
  $(document).on("click", function () {
    if (level < 2) {
      nextSequence();
    }
  });

  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      $("body").addClass("game-over");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      playSound("wrong");
      $("#level-title").text(
        `Game Over😐,Max level reached ${level - 1}, Press Any Key to Restart`
      );
      // console.log(false);
      startOver();
    }
  }
  /*
  function checkAnswer(currentLevel) {
    if (JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern)) {
      if (gamePattern[gamePattern.length - 1] === currentLevel) {
        console.log(true);
      } else {
        $("body").addClass("game-over");

        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 100);
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        console.log(false);
      }
      console.log("sequence finished");
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    } else {
      if (gamePattern[gamePattern.length - 1] === currentLevel) {
        console.log(true);
      }
    }
  }
  */
  function startOver() {
    level = 1;
    gamePattern = [];
  }
});
