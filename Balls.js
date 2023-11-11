AFRAME.registerComponent("balls", {
    init:function(){
        this.throwBall()
    },

    throwBall:function(){
        window.addEventListener("keydown", (e)=>{
            if(e.key==="r"){
                var ball = document.createElement("a-entity")
                ball.setAttribute("geometry", {
                    primitive:"sphere",
                    radius:1
                })
                ball.setAttribute("material", "color", "purple")
                ball.setAttribute("dynamic-body", {shape:"sphere", mass:"0"})

                var cam=document.querySelector("#camera")
                var pos = cam.getAttribute("position")
                ball.setAttribute("position", {
                    x:pos.x,y:pos.y,z:pos.z
                })
                var camera = document.querySelector("#camera").object3D
                var direction=new THREE.Vector3()

                camera.getWorldDirection(direction)
                ball.setAttribute("velocity",direction.multiplyScalar(-10))

                var scene = document.querySelector("#scene")
                scene.appendChild(ball)

                this.removeBalls()
            }
        })
    },
    
    removeBalls:function(e){
        console.log(e.detail.target.el)
        console.log(e.detail.body.el)
    
        var element = e.detail.target.el
        var elementHit = e.detail.body.el 
    
        if(elementHit.id.includes("pin")){
          elementHit.setAttribute("material", {opacity:0.6, transparent:true})
        }
    
        var impulse = new CANNON.Vec3(-2, 2, 1)
        var worldPoint = new CANNON.Vec3().copy(elementHit.getAttribute("position"))

        elementHit.body.applyImpulse(impulse,worldPoint)
        element.removeEventListener("collide", this.removeBalls)
    
        var scene = document.querySelector("#scene")
        scene.removeChild(element)
    
      },

      walkSound: function () {
        var entity = document.querySelector("#sound1");
        entity.components.sound.playSound();
      },
    
    });