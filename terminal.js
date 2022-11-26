let canvas = document.getElementById('canva')
import {random} from "./modules/random.js";
import {c, ctx} from "./modules/canvas.js";

var text = {
    color1: "#D3D7CF",
    color2:"#26A269",
    color3:"#A347BA"
}

var gameFrame = 0
var cursor = {
    x:50,
    y:100,
    show:true
}
var charOnScreen = []
var prompt = []
var terminal = {
    cmdMemoryIndex:-1,
    lastCmd : [],
    scroll : 0,
    margin:50,
    lineHeight:40
} 

function nextLine(){
    cursor.y += 50 
    cursor.x = 50 
}

function write(keys,editable,color,jump){
    for (let i = 0;i<keys.length;i++){
        cursor.show = true
        gameFrame = 1
    
        charOnScreen.push({value:keys[i],x:cursor.x,y:cursor.y,color:color})
        if (editable){
            prompt.push({value:keys[i],x:cursor.x,y:cursor.y})
        }
    
        cursor.x +=  keys[i].length * 25
    }
    if (jump){
        nextLine()
    }
}

function getCommand(command){
    var result = ""
    for (let i = 0;i<command.length;i++){
        result = result + command[i].value
    }
    switch(result){
        case "help":
            write("Commands are : ",true,text.color3,true)
            write("help : to see all commands ",true,text.color1,true)
            write("clear : to clear the terminal ",true,text.color1)
            break
        case "quoi":
            write("FEUUUUUUR",true,text.color3)
            break
        case "clear":
            modifyScroll(50,false)
            charOnScreen = []
            prompt = []
            break
        default:
            write("To get started, type help and enjoy",true,text.color3)
            break
    }
    terminal.lastCmd.push(result)
    terminal.cmdMemoryIndex = -1
    nextLine()
}

function modifyScroll(value,add){
    if (add){
        cursor.y += value
        charOnScreen.forEach(function(item){
            item.y += value
        })
        prompt.forEach(function(item){
            item.y += value
        })
    }else {
        terminal.scroll = 0
        cursor.y = value
        charOnScreen.forEach(function(item){
            item.y = value
        })
        prompt.forEach(function(item){
            item.y = value
        })
    }
}

window.addEventListener("keydown",function(e){
    switch (e.key){
        case  "Backspace":
            if (prompt.length > 0){
                cursor.x = charOnScreen[charOnScreen.length-1].x
                cursor.y = charOnScreen[charOnScreen.length-1].y
                charOnScreen.pop()
                prompt.pop()
            }
            return
        case "Enter":
            nextLine()
            getCommand(prompt)
            write("terminal_7te3ep~: ",false,text.color2)
            prompt = []
            return
        case "Shift":
            return
        case 'CapsLock':
            return
        case "ArrowDown":
                console.log(terminal.cmdMemoryIndex, terminal.lastCmd)
                if (terminal.cmdMemoryIndex-1 <= terminal.lastCmd.length-1 && terminal.cmdMemoryIndex-1>=0){
                charOnScreen.splice(charOnScreen.length-prompt.length,prompt.length)
                cursor.x -=  prompt.length * 25
                prompt = []
                terminal.cmdMemoryIndex -= 1
                console.log(terminal.cmdMemoryIndex, terminal.lastCmd)
                write(terminal.lastCmd[terminal.lastCmd.length-1-terminal.cmdMemoryIndex],true,text.color1)
    
            }
            return
        case "ArrowUp":
                console.log(terminal.cmdMemoryIndex, terminal.lastCmd)
                if (terminal.cmdMemoryIndex+1 <= terminal.lastCmd.length-1 && terminal.cmdMemoryIndex+1>=0){
                charOnScreen.splice(charOnScreen.length-prompt.length,prompt.length)
                cursor.x -=  prompt.length * 25
                prompt = []
                terminal.cmdMemoryIndex += 1
                console.log(terminal.cmdMemoryIndex, terminal.lastCmd)
                write(terminal.lastCmd[terminal.lastCmd.length-1-terminal.cmdMemoryIndex],true,text.color1)
            }
            return
        default:
            write(e.key,true,text.color1)
    }
    if (cursor.x + e.key.length * 25 > canvas.width -100){
        nextLine()
    }

})

window.addEventListener("wheel", event => {
    const delta = (Math.sign(event.deltaY)*50)
    console.log(terminal.scroll)
    if (cursor.y + delta >= 10+terminal.margin || cursor.y >= canvas.height){
        if (terminal.scroll+ delta <= 0){
            modifyScroll(delta,true)
            terminal.scroll += delta
        }
    }
});

write("terminal_7te3ep~: ",false,text.color2)
let gameloop = setInterval(function(){
    //CLEAR 
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (cursor.show){
        ctx.fillStyle = text.color1
        ctx.fillRect(cursor.x,cursor.y-38,20,40)
    }
    if (gameFrame % 10 == 0){
        cursor.show = !cursor.show
    }
    charOnScreen.forEach(function(item){
        ctx.fillStyle = item.color
        ctx.fillText(item.value,item.x,item.y)
    })

    gameFrame ++

    if (gameFrame == 1000){
        gameFrame = 0
    }
},32)

