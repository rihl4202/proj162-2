AFRAME.registerComponent("player-movement", {
    init: function () {
      this.move();
    },
    move: function () {
      window.addEventListener("keydown", (e) => {
        // Add the condition to play sound

        if(
          e.key==="ArrowUp" || 
          e.key === "ArrowDown" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight" 
        ){
          var entity = document.querySelector("#sound1")
          entity.components.sound.playSound()
        }
      });
    },
  });
