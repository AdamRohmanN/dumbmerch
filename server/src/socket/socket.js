const socketIo = (io) => {
    io.on('connection', (socket) => {
        console.log('client connect');
    })
}

module.exports = socketIo