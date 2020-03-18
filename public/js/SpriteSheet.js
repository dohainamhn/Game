export default class SpriteSheet {
    constructor(image,width = 16,height = 16){
        this.image = image;
        this.width = width;
        this.height = height;
        this.titles = new Map()
    }
    define(name,x,y)
    { 
        const buffer = document.createElement('canvas');
        buffer.height = this.height;
        buffer.width = this.width;
        buffer
                .getContext('2d')
                .drawImage(
                this.image,
                x*this.width,
                y*this.height,
                this.width,
                this.height,
                0,
                0,
                this.width,
                this.height,
        )
        this.titles.set(name,buffer)
    }
    draw(name, context, x, y) {
        const buffer = this.titles.get(name);
        context.drawImage(buffer, x, y);
    }
}