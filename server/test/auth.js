// Import required libraries and modules
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const session = require('express-session');

const app = express(); // Create an Express.js application

// Configure session middleware to store user sessions
app.use(session({
    secret: 'your-secret-key', // Replace with your own secret key for session encryption
    resave: true,
    saveUninitialized: true
}));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure the Google Strategy for Passport
passport.use(new GoogleStrategy({
    clientID: '312037713949-7n4ptm3gl10rt7t6e68q3vj2um5jugnp.apps.googleusercontent.com', // Your Google OAuth client ID
    clientSecret: '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', // Your Google OAuth client secret
    callbackURL: 'http://localhost:3000/auth/google/callback' // The URL where Google will redirect users after authentication
}, (token, tokenSecret, profile, done) => {
    // Handle user authentication here (e.g., save user to the database)
    // In this callback, you should implement logic to save or retrieve user information.
    // The 'profile' object contains user information from Google.
    return done(null, profile); // Pass the user profile to the next step
}));

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
    done(null, user); // Serialize the user object
});

passport.deserializeUser((user, done) => {
    done(null, user); // Deserialize the user object
});

// Create routes for Google login

// Route to initiate the Google authentication process
app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
);

// Callback route where Google redirects the user after authentication
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      console.log(req.user)
        //  res.redirect('/profile'); // Redirect to the user profile page upon successful authentication
    }
);

// User profile route
app.get('/profile', (req, res) => {
    res.send('Welcome, ' + req.user.displayName); // Display the user's name
});

// Logout route
app.get('/logout', (req, res) => {
    req.logout(); // Log the user out
    res.redirect('/'); // Redirect to the home page
});

// Start the Express.js server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
