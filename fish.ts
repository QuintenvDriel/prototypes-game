import * as PIXI from 'pixi.js'

export class Fish extends PIXI.Sprite{
    xspeed = 0
    yspeed = 0


   constructor(texture: PIXI.Texture){
       super(texture); //new PIXI.Sprite()

       window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
       window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

       this.scale.set(0.4);
       this.anchor.set(0.1);
       this.y = 100;
       //this.tint = Math.random() * 0xFF0000;
       
      //this.x = Math.random() * 800;
      //this.y = Math.random() * 450;
   }
   
   
    update(delta: number) {

this.x += this.xspeed
this.y += this.yspeed

        //this.x += delta * 1;
        //this.rotation += delta * 1;
    }

    shoot(){
        console.log("shooooot!")
    }

    onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                this.shoot()
                break;
            case "A":
            case "ARROWLEFT":
                this.xspeed = -4
                break
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 4
                break
            case "W":
            case "ARROWUP":
                this.yspeed = -4
                break
            case "S":
            case "ARROWDOWN":
                this.yspeed = 4
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                break;
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xspeed = 0
                break
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.yspeed = 0
                break
        }
    }
}
