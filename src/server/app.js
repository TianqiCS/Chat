let express = require('express');
let app = express();

let server = app.listen(8080, function(){
    console.log('server is running on port 8080')
});

let socket = require('socket.io');
let io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

