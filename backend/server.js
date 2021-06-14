"use strict";

const express = require("express");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20');
const cookieSession = require('cookie-session');



//Variables
const hostName = "localhost";
const port = 8000;

const app = express();
app.listen(port, hostName, () => {
    console.log(`Listening at http://${hostName}:${port}`);
});

/***************************Log in stuff**********************************/

/* Google login credentials, used when the user contacts
 * Google, to tell them where he is trying to login to, and show
 * that this domain is registered for this service. 
 * Google will respond with a key we can use to retrieve profile
 * information, packed into a redirect response that redirects to
 * server162.site:[port]/auth/redirect
 */
const googleLoginData = {
    clientID: '334402565352-50ptaigepmc37e8ccq8psc25gbos913q.apps.googleusercontent.com',
    clientSecret: 'KqwGbQz0tvWHjP0COBygPZ9A',
    callbackURL: '/auth/redirect'
};


/* Strategy configuration. 
 * Tell passport we will be using login with Google, and
 * give it our data for registering us with Google.
 * The gotProfile callback is for the server's HTTPS request
 * to Google for the user's profile information.
 * It will get used much later in the pipeline. 
 */
passport.use( new GoogleStrategy(googleLoginData, gotProfile) );

// pipeline stage that just echos url, for debugging
app.use("/", printURL)

/* Check validity of cookies at the beginning of pipeline
 * Will get cookies out of request, decrypt and check if 
 * session is still going on.
 */ 
app.use(cookieSession({
    maxAge: 6 * 60 * 60 * 1000, // Six hours in milliseconds
    // meaningless random string used by encryption
    keys: ['hanger waldo mercy dance']  
}));


// Initializes request object for further handling by passport
app.use(passport.initialize()); 

/* If there is a valid cookie, will call deserializeUser()
 * deserializeUser() can, for instance, take info out of an
 * sqlite3 user DB table, based on an input userID. Attaches
 * user info to req, in req.user. 
 */
app.use(passport.session());


// can I find a static file?
//can load files that are in the public directory
//anyone can access these
app.use(express.static('public')); 


/* next, handler for url that starts login with Google.
 * The app (in public/login.html) redirects to here (not an AJAX request!)
 * Kicks off login process by telling Browser to redirect to
 * Google. The object { scope: ['profile'] } says to ask Google
 * for their user profile information.
 *
 * passport.authenticate sends off the 302 response
 * with fancy redirect URL containing request for profile, and
 * client ID string to identify this app. 
 */
app.get('/auth/google', passport.authenticate('google',{ scope: ['profile'] }) );


// Google redirects here after user successfully logs in
// This route has three handler functions, one run after the other.
app.get('/auth/redirect',
	// for educational purposes
	function (req, res, next) {
	    console.log("at auth/redirect");
	    next();
	},
	/* This will issue Server's own HTTPS request to Google
	 * to access the user's profile information with the 
	 * temporary key we got in the request. 
	 */
	passport.authenticate('google'),
	/* then it will run the "gotProfile" callback function,
	 * set up the cookie, call serialize, whose "done" 
	 * will come back here to send back the response
	 * ...with a cookie in it for the Browser! 
	 */
	function (req, res) {
	    console.log('Logged in and using cookies!')
	    res.redirect('/user/lang.html');
	}
);

// static files in /user are only available after login
app.get('/user/*',
    isAuthenticated, // only pass on to following function if user is logged in
	express.static('.') // serving files that start with /user from here gets them from
);


/*******************************End login stuff*************************************/

/* function called during login, the second time passport.authenticate
 * is called (in /auth/redirect/),
 * once we actually have the profile data from Google.
 */ 
function gotProfile(accessToken, refreshToken, profile, done) {
    console.log("Google profile",profile);
    let fName = profile.name.givenName;
    let lName = profile.name.familyName;
    let userIdentification = profile.id; 
    // here is a good place to check if user is in DB,
    // and to store him in DB if not already there. 
    // Second arg to "done" will be passed into serializeUser,
    // should be key to get user out of database.
    console.log("firstName: ", fName);
    console.log("lastName: ", lName);
    console.log("UserID: ", userIdentification); 
    done(null); 
}


// function to check whether user is logged when trying to access
// personal data
function isAuthenticated(req, res, next) {
	//console.log(req);
    if (req.user) {
	console.log("Req.session:",req.session);
	console.log("Req.user:",req.user);
	next();
    } else {
	res.redirect('/loginReact.html');  // change to main page !!!!!!!!!!!!!
	// Browser to go to login page
    }
}


function printURL (req, res, next) {
    console.log(req.url);
    next();
}