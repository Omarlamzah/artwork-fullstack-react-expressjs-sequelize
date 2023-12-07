const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Enable CORS for all routes
app.use(cors());

const io = socketIO(server, {
    cors: {
        origin: "http://localhost:3000", // your frontend server's origin
        methods: ["GET", "POST"]
    }
});

app.get('/', (req, res) => {
    res.send("Welcome to support");
});

var count = 0
var clients = [];
var supports = [];

// Function to send updates to clients and supports without duplicates
function sendUpdates() {
    const uniqueClients = removeDuplicates(clients);
    const uniqueSupports = removeDuplicates(supports);

    io.emit("supportstoclient", { supports: uniqueSupports });
    io.emit("clientstosupport", { clients: uniqueClients });
}

// Function to remove duplicates based on the 'id' property
function removeDuplicates(array) {
    const uniqueObjects = [];
    const uniqueIds = new Set();

    for (const item of array) {
        if (!uniqueIds.has(item.id)) {
            uniqueIds.add(item.id);
            uniqueObjects.push(item);
        }
    }

    return uniqueObjects;
}

io.on('connection', (socket) => {
    count++;
    console.log("A user connected" + count);
    sendUpdates();

    socket.on("sendemail", (data) => {
        const client = { id: socket.id, email: data.email }
        clients.push(client);
        console.log(clients);
        sendUpdates();
    });

    socket.on("sendemailsupport", (data) => {
        const support = { id: socket.id, email: data.email }
        supports.push(support);
        console.log(supports);
        sendUpdates();
    });

    socket.on('chatmessage', (msg) => {
        io.to(msg.to).emit('chatmessage', { from: socket.id, message: msg.message, "timestamp": msg.timestamp });
     });

    socket.on('istyping', () => {
        io.emit('istyping', { from: socket.id });
        console.log("istyping");
    });

    socket.on('isnotyping', () => {
        io.emit('isnotyping', { from: socket.id });  
        console.log("is not typing");
    });


    socket.on('newnotification', (msg) => {
        io.emit('newnotification', msg  ); 
        console.log(msg);
    });

    socket.on('disconnect', () => {
        const updateclients = clients.filter(client => client.id !== socket.id);
        const updatesupports = supports.filter(support => support.id !== socket.id);

        if (updateclients.length < clients.length) {
            clients = updateclients;
            sendUpdates();
            console.log(clients);
        }

        if (updatesupports.length < supports.length) {
            supports = updatesupports;
            sendUpdates();
        }
    });
});

server.listen(2000, () => {
    console.log('Server support on port 2000');
});
