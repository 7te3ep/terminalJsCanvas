let canvas = document.getElementById('canva')
import {random} from "./modules/random.js";
import {c, ctx} from "./modules/canvas.js";


var gameFrame = 0
var cursor = {
    x:50,
    y:100,
    show:true
}
var charOnScreen = []
var prompt = []
var terminal = {
    margin:50,
    lineHeight:40
} 

function nextLine(){
    cursor.y += 50 
    cursor.x = 50 
}

function write(keys,editable){
    keys.forEach(function(item){
        cursor.show = true
        gameFrame = 1
    
        charOnScreen.push({value:item,x:cursor.x,y:cursor.y})
        if (editable){
            prompt.push({value:item,x:cursor.x,y:cursor.y})
        }
    
        cursor.x +=  item.length * 25
    })
}

window.addEventListener("keyup",function(e){
    if (e.key == "Backspace"){
        if (prompt.length > 0){
            cursor.x = charOnScreen[charOnScreen.length-1].x
            cursor.y = charOnScreen[charOnScreen.length-1].y
            charOnScreen.pop()
            prompt.pop()
        }
        return
    }
    switch (e.key){
        case "Enter":
            nextLine()
            write(["t","e","r","m","i","n","a","l","~",":"," "],false)
            prompt = []
            return
        case "Shift":
            return
        case 'CapsLock':
            return
    }
    if (cursor.x + e.key.length * 25 > canvas.width -100){
        nextLine()
    }
    write([e.key],true)

})


write(["t","e","r","m","i","n","a","l","_","7","t","e","3","e","p","~",":"," "],false)
let gameloop = setInterval(function(){
    //CLEAR 
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    console.log(cursor.x,prompt)

    if (cursor.show){
        ctx.fillRect(cursor.x,cursor.y-40,20,40)
    }
    if (gameFrame % 10 == 0){
        cursor.show = !cursor.show
    }
    charOnScreen.forEach(function(item){
        ctx.fillText(item.value,item.x,item.y)
    })

    gameFrame ++

    if (gameFrame == 1000){
        gameFrame = 0
    }
},32) 
