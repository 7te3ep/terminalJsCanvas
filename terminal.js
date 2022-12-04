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

var cmd = [
    {value:"help",info:"Give all commands available"},
    {value:"clear",info:"Clear all commands, they still on memory of arrow up"},
    {value:"github",info:"Show my github"},
    {value:"contact",info:"Show my email adress"},
]
var charOnScreen = []
var prompt = []

var terminal = {
    cmdMemoryIndex:-1,
    lastCmd : [],
    lastWord:"",
    scroll : 0,
    margin:50,
    lineHeight:40,
}

function highLightCmd(word){
    var match = true
    cmd.every(function(cmd){
        match = true
        for (let i = 0;i<word.length;i++){
            if (word[i].value != cmd.value[i] /*&& i <= cmd.length-1*/){
                match = false
            }
        }
        if (match){
            for (let i = 1;i-1<word.length;i++){
                charOnScreen[charOnScreen.length-(i)].color = text.color3
            }
            //return
        }else {
            for (let i = 1;i-1<word.length;i++){
                charOnScreen[charOnScreen.length-(i)].color = text.color1
            }
            return true
        }
    })
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
        
        if (cursor.x + keys[i].length * 25 > canvas.width -130){
            nextLine()
        }else {
            cursor.x +=  keys[i].length * 25
        }
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
            cmd.forEach(function(item){write(item.value+" : "+item.info+", ",true,text.color1,true)})
            break
        case "quoi":
            write("FEUUUUUUR",true,text.color3)
            break
        case "clear":
            modifyScroll(50,false)
            charOnScreen = []
            prompt = []
            break
        case "github":
            write("https://github.com/7te3ep",true,text.color3)
            break
        case "contact":
            write("7te3ep@gmail.com",true,text.color3)
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
                terminal.lastWord = terminal.lastWord.slice(0, -1)
                cursor.x = charOnScreen[charOnScreen.length-1].x
                cursor.y = charOnScreen[charOnScreen.length-1].y
                charOnScreen.pop()
                prompt.pop()
            }
            return

        case "Enter":
            terminal.lastWord = ""
            nextLine()
            getCommand(prompt)
            write("terminal_7te3ep~: ",false,text.color2)
            prompt = []
            return

        case "Shift":
            return

        case 'CapsLock':
            return

        case 'Dead':
            return

        case "ArrowDown":
            if (terminal.cmdMemoryIndex-1 <= terminal.lastCmd.length-1 && terminal.cmdMemoryIndex-1>=0){
                charOnScreen.splice(charOnScreen.length-prompt.length,prompt.length)
                cursor.x -=  prompt.length * 25
                prompt = []
                terminal.cmdMemoryIndex -= 1
                let lastCmd = terminal.lastCmd[terminal.lastCmd.length-1-terminal.cmdMemoryIndex]
                write(lastCmd,true,text.color1)
            }
            return

        case "ArrowUp":
            if (terminal.cmdMemoryIndex+1 <= terminal.lastCmd.length-1 && terminal.cmdMemoryIndex+1>=0){
                charOnScreen.splice(charOnScreen.length-prompt.length,prompt.length)
                cursor.x -=  prompt.length * 25
                prompt = []
                terminal.cmdMemoryIndex += 1
                let lastCmd = terminal.lastCmd[terminal.lastCmd.length-1-terminal.cmdMemoryIndex]
                write(lastCmd,true,text.color1)
            }
            return
        case " ":
            terminal.lastWord = ""
            write(e.key,true,text.color1)
            return
        default:
            terminal.lastWord = terminal.lastWord+e.key
            write(e.key,true,text.color1)
            highLightCmd(prompt)
            //terminal.lastWord
    }
    if (cursor.x + e.key.length * 25 > canvas.width -100){
        nextLine()
    }
})

window.addEventListener("wheel", event => {
    const delta = (Math.sign(event.deltaY)*50)
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

let card = document.querySelector('#canva');

document.addEventListener('mousemove', function(e) {
    let xAxis = (window.innerWidth / 2 - e.pageX) /20 ;
    let yAxis = (window.innerHeight / 2 - e.pageY) /50;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});


// ________________________________________
/// You have Egyptian flu: you're going to \
//\ be a mummy.                            /
// ----------------------------------------
//        \   ^__^
//         \  (oo)\_______
//            (__)\       )\/\
//                ||----w |
//                ||     ||"