// Socket

const Chat = require('./model/Chat');
const socketio = require('socket.io');

const io = socketio();

const socketApi = {
    io
};


io.on('connection', (socket) => {
    //console.log("connected")
    // On new chat message it creates new message object 
    socket.on('chat message', (message) => {
        io.emit(message.to, message)
        const msg = new Chat({
            message: message.message,
            from: message.from,
            to: message.to,
            date: message.date,
            params: message.params
        });
        try {
            msg.save();
        } catch (error) {
            console.log(error)
        }
    });
});


module.exports = socketApi;