import SpriteSheet from './SpriteSheet.js'
import {loadImage} from './loader.js'

const canvas    = document.getElementById('screen')
const context   = canvas.getContext('2d')

console.log(
    loadImage('./img/mario.png').then(function(image){
        const sprites = new SpriteSheet(image,16,16)
        sprites.define('ground',1,1)
        sprites.draw('ground',context,0,0)
    }))
