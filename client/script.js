const joinRoomButton = document.getElementById('room-button')
const messageInput = document.getElementById('message-input')
const roomInput = document.getElementById('room-input')
const form = document.getElementById('form')
const button = document.getElementById('button')
const socket = io("http://localhost:3001")

let name = prompt("Enter username:")
if (name.length > 0) {
    const userSocket = io("http://localhost:3001/user", { auth: { token: name } })
}

socket.on("connect", () => {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    displayMessage('you connected with id: ' + socket.id)
})

socket.on("receive-message", message => {
    displayMessage(message)
})

form.addEventListener("submit", e => {
    e.preventDefault()
    console.log("submit")
    const message = messageInput.value
    const room = roomInput.value

    if (message === "") return
    displayMessage('you: ' + message)
    let fullMessage = (name + ': ' + message)
    socket.emit('send-message', fullMessage, room)


})

joinRoomButton.addEventListener("click", () => {
    console.log("button clicked")
    const room = roomInput.value

    socket.emit('join-room', room, message => {
        displayMessage(message)
    })
})

function displayMessage(message) {
    console.log("entered display message")
    const div = document.createElement("div")
    div.textContent = message
    console.log(message);
    document.getElementById("message-container").append(div)
    messageInput.value = ""

}


// test()