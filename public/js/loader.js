export function loadImage(url){
    return new Promise(function(resovle){
        const image = new Image()
        image.addEventListener('load',function(){
            resovle(image);
        })
        image.src = url
    })
}