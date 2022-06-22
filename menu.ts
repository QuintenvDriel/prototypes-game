import * as PIXI from 'pixi.js'
import { Game } from './game';
import playImage from "./images/playbutton.png";
import stopImage from "./images/shutdownbutton.png";
import rickyImage from "./images/Ricky.png";
import backgroundImage from "./images/color background.jpg";




export class App{
    private pixiWidth = 800;
    private pixiHeight = 450;
    private pixi : PIXI.Application;
    private loader:PIXI.Loader;


    constructor(){
        this.pixi = new PIXI.Application({ width: this.pixiWidth, height: this.pixiHeight }); 
        this.pixi.stage.interactive = true; 
        this.pixi.stage.hitArea = this.pixi.renderer.screen;
        document.body.appendChild(this.pixi.view);

        this.loader = new PIXI.Loader();
        this.loader.add('playTexture', playImage);
        this.loader.add('stopTexture', stopImage);
        this.loader.add('rickyTexture', rickyImage);
        this.loader.add('paperTexture', backgroundImage);
        this.loader.load(()=>this.loadCompleted());

    }

    loadCompleted(): void {
        let paper = new PIXI.Sprite(this.loader.resources["paperTexture"].texture!);
        paper.scale.set(4.0);
        this.pixi.stage.addChild(paper);
    

        let start = new PIXI.Sprite(this.loader.resources["playTexture"].texture!);
        start.scale.set(0.2);
        start.anchor.set(0.5);
        start.x = 200;
        start.y = 200;

        this.pixi.stage.addChild(start);
        
        start.interactive = true; 
        start.buttonMode = true;


let stop = new PIXI.Sprite(this.loader.resources["stopTexture"].texture!);
        stop.scale.set(0.2);
        stop.anchor.set(0.5);
        stop.x = 200;
        stop.y = 320;

        this.pixi.stage.addChild(stop);

        stop.interactive = true;
        stop.buttonMode = true;

        let ricky = new PIXI.Sprite(this.loader.resources["rickyTexture"].texture!);

        ricky.scale.set(0.5);
        ricky.anchor.set(0.5);
        ricky.x = 630;
        ricky.y = 280;

        this.pixi.stage.addChild(ricky);

        start.on('pointerdown', () => this.onClickStart());
        stop.on('pointerdown', () => this.onClickStop());
        
    }

    onClickStart(){
        console.log('lets play');
        document.getElementsByTagName('canvas')[0].remove();
        new Game();
        
    }

    onClickStop(){
        console.log('you stopped the game');
        document.getElementsByTagName('canvas')[0].remove();
    }

    
}


new App();
