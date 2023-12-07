const express = require('express');
const session = require('express-session');

const app = express();

// Configure express-session
app.use(session({
    secret: 'your-secret-key', // Replace with your own secret key
    resave: true,
    saveUninitialized: true
}));

// Route to set a session variable
app.get('/set', (req, res) => {
    req.session.username = 'JohnDoe';
    res.send('Session data has been set.');
});

// Route to get the session variable
app.get('/get', (req, res) => {
    const username = req.session.username;
    res.send('Session data: ' + username);
});

// Route to destroy the session
   app.get('/out', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
        }
        res.send('Logged out. Session destroyed.');
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
