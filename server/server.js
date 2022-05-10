
const { instrument } = (require)("@socket.io/admin-ui")
const io = (require)("socket.io")(3001, {
	cors: {
		origin: "*",
	},
})

const userIo = io.of('/user')

userIo.on('connection', socket => {
	console.log(socket.username + ' connected to user namespace')
})

userIo.use((socket, next) => {
	if(socket.handshake.auth.token){
		socket.username = getUsernameFromToken(socket.handshake.auth.token)
		next()
	}
	else{
		next(newError("please send token"))
	}
})

function getUsernameFromToken(token){
	return token
}

io.on("connection", socket => {
	console.log(socket.id)
	socket.on('send-message', (message, room) => {
		if(room === ""){
			socket.broadcast.emit('receive-message', message)
		}
		else{
			socket.to(room).emit('receive-message', message)
		}
		
		console.log(message)
	})

	socket.on('join-room', (room, cb) => {
		socket.join(room)
		cb("joined " + room)
	})
})  

instrument(io, { auth: false })




