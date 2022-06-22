import * as PIXI from 'pixi.js'
import rickyImage from "./images/Ricky.png"
import bubbleImage from "./images/bubble.png"
import backgroundImage from "./images/background.jpg"
import menubutton from "./images/menubutton.png";
import inventoryIMG from "./images/inventory.png"
import { Fish } from './fish';
import { App } from './menu';
import { inventory } from './Inventory';

export class Game{
    // settings
    pixiWidth = 800;
    pixiHeight = 450;

    // globals
    pixi : PIXI.Application;
    loader : PIXI.Loader;

    // fish : PIXI.Sprite;
    fish : Fish;
    fishes : Fish[];
    menubutton : App;
    inventory : inventory;
    
    /**
     * Constructor
     * 
     * Initialize Pixi
     * Load assets
     */
    constructor(){
        this.fishes = [];

        this.pixi = new PIXI.Application({ width: this.pixiWidth, height: this.pixiHeight });
        this.pixi.stage.interactive = true;
        this.pixi.stage.hitArea = this.pixi.renderer.screen;
        document.body.appendChild(this.pixi.view);

        this.loader = new PIXI.Loader();
        this.loader.add('fishTexture', rickyImage)
            .add('bubbleTexture', bubbleImage)
            .add('waterTexture', backgroundImage)
            .add('menuTexture', menubutton)
            .add('inventoryTexture', inventoryIMG);
        this.loader.load(()=>this.loadCompleted());
    }
    /**
     * Load Completed
     * 
     * Runs after assets loaded
     * Creates background
     * Creates bubbles
     * Creates fishes
     * creates menubutton
     */

    loadCompleted() {
        let water = new PIXI.Sprite(this.loader.resources["waterTexture"].texture!);
        water.height = this.pixiHeight;
        water.width = this.pixiWidth;
        this.pixi.stage.addChild(water);
        this.fish = new Fish(this.loader.resources["fishTexture"].texture!)

        let menubutton = new PIXI.Sprite(this.loader.resources["menuTexture"].texture!)
        menubutton.scale.set(0.1);
        menubutton.anchor.set(0.1);
        menubutton.x = 715;
        menubutton.y = 385;
        this.pixi.stage.addChild(menubutton)

        menubutton.interactive = true;
        menubutton.buttonMode = true;

        menubutton.on('pointerdown', () => this.onClickMenu());

        let inventory = new PIXI.Sprite(this.loader.resources["inventoryTexture"].texture!)
        inventory.scale.set(0.15);
        inventory.anchor.set(0.1);
        inventory.x = 550;
        inventory.y = 365;
        this.pixi.stage.addChild(inventory)

        inventory.interactive = true;
        inventory. buttonMode = true;

        inventory.on('pointerdown', () => this.onClickInventory());
        
        // this.fish.anchor.set(0.5)
        this.pixi.stage.addChild(this.fish)
        for(let i = 0; i < 5; i++){
            let temp = new Fish(this.loader.resources["fishTexture"].texture!);
            this.pixi.stage.addChild(temp);
            this.fishes.push(temp);
        }
        
        this.pixi.ticker.add((delta)=>this.update(delta));
    }
    /**
     * Update
     * @param delta 
     * 
     * Updates fishes & bubbles
     */
    update(delta: number){
        this.fish.update(delta);
        for(let f = 0; f < this.fishes.length; f++){
            this.fishes[f].update(delta);
        }
    }

    onClickMenu(){
        console.log('open menu');
        document.getElementsByTagName('canvas')[0].remove();
        new App();
}

onClickInventory(){
        console.log('open inventory');
        document.getElementsByTagName('canvas')[0].remove();
        new inventory();
}
 
}
