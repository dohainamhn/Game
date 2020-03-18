
class snake {
    constructor()
    {
        this.box = 32;
        this.canvas = document.getElementById('screen')
        this.context = this.canvas.getContext('2d')

        this.foodImage = new Image()
        this.foodImage.src = './img/food.png'
        this.snakehead = new Image()
        this.snakehead.src = './img/snakehead.png'

        this.food = {
            x : Math.floor(Math.random()*17+1) * this.box,
            y : Math.floor(Math.random()*15+3) * this.box
        }
        
        this.direction = null

        this.score = 0

        this.snake = [{
            x: 5*this.box,
            y: 6*this.box
        }]
        var self = this;


        this.draw = function(){
            
            self.context.clearRect(0,0,800,600)
            for(let i = 0;i<self.snake.length;i++)
            {
                if(i<1){
                    self.context.drawImage(self.snakehead,self.snake[i].x,self.snake[i].y,self.box,self.box)
                }
                else{
                    self.context.fillStyle = 'green'
                    self.context.fillRect(self.snake[i]['x'],self.snake[i]['y'],self.box,self.box)
                    self.context.strokeStyle = "red";
                    self.context.strokeRect(self.snake[i].x,self.snake[i].y,self.box,self.box);
                    }
                }
               
            self.context.drawImage(self.foodImage,self.food.x,self.food.y,self.box,self.box)
            
            let snakeX = self.snake[0].x;
            let snakeY = self.snake[0].y;
            
            
            if(self.snake[0].x == self.food.x && self.snake[0].y == self.food.y )
            {
                self.score++
                console.log(self.score)
                let x =  Math.floor(Math.random()*17) * self.box
                let y =  Math.floor(Math.random()*15) * self.box
                let check = true
                while(check)
                {
                    for(let i = 0; i < self.snake.length;i++)
                    {
                        if(x == self.snake[i].x && y == self.snake[i].y) {
                            console.log(`snake x ${ self.snake[i].x}, snake y:${ self.snake[i].y},x${x},y:${y}`)
                            x =  Math.floor(Math.random()*17) * self.box
                            y =  Math.floor(Math.random()*15) * self.box
                        }
                        else check = false
                    }
                }
                

                self.food = {
                    x: x,
                    y: y
                }
            }
            else{
                self.snake.pop()
            }

            let newHeadSnake = {
                x : snakeX,
                y : snakeY
            }
            self.snake.unshift(newHeadSnake)
            
            if( self.direction == "LEFT") self.snake[0].x -= self.box
            if(  self.direction == "UP") self.snake[0].y -= self.box;
            if(  self.direction == "RIGHT") self.snake[0].x += self.box;
            if(  self.direction == "DOWN") self.snake[0].y  += self.box;
            
            if(self.snake[0].x<0||self.snake[0].y<0||self.snake[0].x>768||self.snake[0].y>600||self.collision())
            {
                clearInterval(game)
                self.context.fillText('Phe Oc Cho Thua Roi Do Ngu Si', 200, 300,600);
            }

            self.countScore()
        }

        

        this.direction = function(event){
            let key = event.keyCode;
            if( key == 37 && self.direction != "RIGHT"){
                self.direction = "LEFT"
            }else if(key == 38 && self.direction != "DOWN"){
                self.direction = "UP";
            }else if(key == 39 && self.direction != "LEFT"){
                self.direction = "RIGHT";
            }else if(key == 40 && self.direction != "UP"){
                self.direction = "DOWN";
            }
        }

        this.collision = function(){
            for(let i =1;i<self.snake.length;i++){
                if(self.snake[0].x == self.snake[i].x && self.snake[0].y == self.snake[i].y){
                    return  true
                }
            }
            return false
        }

        this.countScore = function(){
            self.context.fillStyle = 'green'
            self.context.font = "30px Arial"
            self.context.fillText(`Score: ${self.score}`, 10, 30,60);
        }
        
    }
}
let g = new snake()
window.addEventListener('keydown',g.direction)
let game = setInterval(g.draw,100)
