require('dotenv').config({ path: '../../.env' });
const functions = require('firebase-functions');

const { getAllScreams, postOneScream } = require('./handlers/screams');
const { signup, login } = require('./handlers/users');
const FBAuth = require('./util/fbAuth');

const app = require('express')();

// Screams routes
app.get('/screams', getAllScreams);
app.post('/scream', FBAuth, postOneScream);

// User routes
app.post('/signup', signup);
app.post('/login', login);

exports.api = functions.region('europe-west1').https.onRequest(app);
