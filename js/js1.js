var msg = 'Hello'
var cmds = null
var user = 'guest'

window.onload = function () {
    var url = "../cmds.json"
    var request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            cmds = JSON.parse(request.responseText);
            // console.log(cmds);
        }
    }
}


window.addEventListener('keydown', (event)=> {
    // console.log(event)
    if (event.key === 'Backspace') {
        msg = msg.substr(0, msg.length - 1)
    } else if (msg.length <= 10 && (event.key === ' ' || /^\w{0,1}$/.test(event.key))) {
        msg += event.key
    }
    document.getElementById("add").innerHTML = msg
}, false)

window.addEventListener('keydown', (event)=> {
    if (event.key === 'Enter') {
        enter(msg)
        while(msg.length > 0){
            msg = msg.substr(0, msg.length - 1)
            document.getElementById("add").innerHTML = msg
        }
        //msg = ''
    }
}, false)

document.oncontextmenu = () => { return false }

function enter (msg) {
    // console.log(msg)
    if (user == 'guest') {
        creatTable('>$ ' + msg)
    } else if (user == 'root') {
        creatTable('># ' + msg)
    }
    cmd(msg)
    return 0
}

function creatTable (msg) {
    var tableData="<tr>"
    tableData+="<td>"+msg+"</td>"
    tableData+="</tr>"
    document.getElementById("table1").innerHTML += tableData
}

function cmd (msg) {
    msg = msg.replace( /\s+/g ,"_")
    msg = "cmds." + msg
     console.log(msg)
    var cmd = eval(msg)
    // console.log(cmd)
    eval(cmd)
}
