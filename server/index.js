require('dotenv').config()
const express = require('express')
const cors = require('cors') //cross-origin resource sharing
const http = require('http')
const {Server} = require('socket.io')
const socketIo = require('./src/socket/socket')

const app = express()
const port = 5000

const server = http.createServer(app)
const io = new Server(server, {
    cors: { origin: 'http://localhost:3000' } //siapa saja yang bisa mengakses server socket kita
})
socketIo(io)

const router = require('./src/routes/router')

app.use(express.json())
app.use(cors()) //agar bisa post, patch, delete
app.use('/api/v1', router)

app.use('/uploads', express.static(__dirname + '/uploads')) //biar gambarnya terlihat

server.listen(port)