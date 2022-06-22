import * as PIXI from 'pixi.js'
import { Game } from './game';
import { item } from './item';
import backgroundImage from './images/background.jpg';
import inventoryImage from './images/inventory.png';
import backButton from './images/back-button.png';
import item1 from './images/pot2.png';
//import test from './images/shark.png';


export class inventory{
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
        this.loader.add ('backgroundTexture', backgroundImage);
        this.loader.add ('inventorytexture', inventoryImage);
        this.loader.add ('backTexture', backButton);
        this.loader.add ('potTexture', item1);
        this.loader.load(()=>this.loadCompleted());

    }

    loadCompleted(): void {

        let background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!);
        background.scale.set(1.0);
        this.pixi.stage.addChild(background);

        let inventory = new PIXI.Sprite(this.loader.resources["inventorytexture"].texture!);
        inventory.scale.set(0.7);
        this.pixi.stage.addChild(inventory);

        let back = new PIXI.Sprite(this.loader.resources["backTexture"].texture!);
        back.scale.set(0.3);
        back.x = 60;
        back.y = 15;
        this.pixi.stage.addChild(back);

        back.interactive = true; 
        back.buttonMode = true;
        back.on('pointerdown', () => this.onClickBack());
        
        
        let item1 = new PIXI.Sprite(this.loader.resources['potTexture'].texture!);
        item1.scale.set(0.37);
        item1.x = 94;
        item1.y = 110;
        this.pixi.stage.addChild(item1);

        item1.interactive = true;
        item1.buttonMode = true;
        item1.on('pointerdown', () => this.onClickItem1());


        

    }

    onClickBack(){
        console.log('back to the game');
        document.getElementsByTagName('canvas')[0].remove();
        new Game();
    }

    onClickItem1(){
        console.log('clicked on item 1');
        document.getElementsByTagName('canvas')[0].remove();
        new item();
    }
        
    
}

