"use strict";

const express = require("express");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20');
const cookieSession = require('cookie-session');
const APIRequest = require("request");
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dotenv = require("dotenv");
dotenv.config();

//database stuff start
const dbSchema = `
CREATE TABLE IF NOT EXISTS Users(
    id INT PRIMARY KEY NOT NULL,
    first_name TEXT,
    last_name TEXT
);

CREATE TABLE IF NOT EXISTS FlashCards (
    user_id INT NOT NULL,
    word_one TEXT NOT NULL,
    word_two TEXT NOT NULL,
    seen INT,
    correct INT,
        FOREIGN KEY (user_id) REFERENCES Users(id)
);
`
const dbPath = path.resolve(__dirname, process.env.DB_PATH);
const DB = new sqlite3.Database(dbPath, function(err) {
    if (err) {
        console.log("Failed to load DB: " + process.env.DB_PATH +" " + err);
        return;
    }
    console.log("Connected to " + process.env.DB_PATH + ' database.');
    DB.exec('PRAGMA foreign_keys=ON;', function(error) {
        if (error) {
            console.error("Failed to enable foreign keys.");
        } else {
            console.log("Enabled foreign key enforecement.")
        }
    });

    DB.exec(dbSchema, function(err) {
        if (err) {
            console.log("Failed to run schema: " + err);
        } else {
            console.log("No Error");
        }
    });
    console.log("Done");
});


const app = express();
app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Listening at http://${process.env.HOST}:${process.env.PORT}`);
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
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
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
app.use("/", printURL);


/* Check validity of cookies at the beginning of pipeline
 * Will get cookies out of request, decrypt and check if 
 * session is still going on.
 * Attatches session property to req
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
app.use( express.static('public')); 


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
	    res.redirect('/user/lango.html');
	}
);

// static files in /user are only available after login
app.get('/user/*',
    isAuthenticated, // only pass on to following function if user is logged in
	express.static('.') // serving files that start with /user from here gets them from
);

/****************Backend Requests **********************************************/

app.get('/user/translate', translateHandler);

app.get('/user/store', storeHandler);

app.get('/user/fetch-cards', getCards);

app.get('user/getName', fetchNameHandler);

app.get('/test', testDB);

app.use(fileNotFound);
/*******************************End login stuff*************************************/
// function to check whether user is logged when trying to access
// personal data
function isAuthenticated(req, res, next) {
    console.log("In isAuthenticated")
    if (req.user) {
        //console.log("req.session:",req.session);
        //console.log("req.user:",req.user);
        next();
    } else {
        res.redirect('/login.html');
    }
}


/* function called during login, the second time passport.authenticate
 * is called (in /auth/redirect/),
 * once we actually have the profile data from Google.
 */ 
function gotProfile(accessToken, refreshToken, profile, done) {
    console.log("Got Profile");
    //get info from google profile
    let first_name = profile.name.givenName;
    let last_name = profile.name.familyName;
    let userId = parseInt(profile.id, 10); 

    // here is a good place to check if user is in DB,
    // and to store him in DB if not already there. 
    // Second arg to "done" will be passed into serializeUser,
    // should be key to get user out of database.

    let localUserCMD = "SELECT * FROM Users WHERE id = " + userId +";";
    DB.get(localUserCMD, userCallback);

    function userCallback(err, row) {
        let userInsert = 'INSERT into Users (id, first_name, last_name) VALUES (@0, @1, @2);';
        if(err) {
            console.log("Error in gotProfile");
            console.log("got: ", err, "\n");
        } else if (row != undefined) {
            console.log("User is already in DB!\n\n");
            console.log("row: ", row, "\n");
        } else {
            //user is not in the DB
            DB.run(userInsert, userId, first_name, last_name, insertCallback);
        }
    }
    let rowId = userId;
    done(null, rowId); 
}


/* Part of Server's sesssion set-up.  
 * The second operand of "done" becomes the input to deserializeUser
 * on every subsequent HTTP request with this session's cookie.
 */
passport.serializeUser((dbID, done) => {
	console.log("In serialize user. ID: ", dbID);
	console.log();
	done(null, dbID);
});

/* Called by passport.session pipeline stage on every HTTP request with
 * a current session cookie. 
 * Where we should lookup user database info. 
 * Whatever we pass in the "done" callback becomes req.user
 * and can be used by subsequent middleware.
 */
passport.deserializeUser((dbID, done) => {
    let findUserCMD = 'SELECT * FROM Users WHERE id = '
    let localUserCMD = findUserCMD + dbID;
    let userData = {
        id: "someId",
        first_name: "fName",
        last_name: "lName"
    };
    DB.get(localUserCMD, (err, row) => {
        if(err) {
            return console.error("error: ", err);
        } else if(row) {
            //not making it here
            console.log("Got row back\n\n");
            console.log(row);
            userData = {
                id: row.id,
                first_name: row.first_name,
                last_name: row.last_name
            };
            //were not in here
            console.log("DONE: ", userData);
            done(null, userData);
        }
    });
    console.log("Do I make it here");
    //done(null, userData);
});

function printURL (req, res, next) {
    console.log(req.url);
    next();
}

/**************************Handlers***********************************/
function fetchNameHandler(req, res, next) {
    if (req) {
        let responseObj = {
            first_name: req.user.first_name
        };
        res.json(responseObj);
    } else {
        next();
    }
}

function testDB(req, res, next) {
    console.log("Testing")
    dumpDB();
    res.json({done: true});
}

function translateHandler(req, res, next) {
    let queryObject = req.query;
    let url = process.env.API_URL + process.env.API_KEY

    if(queryObject.english != undefined) {
        let word = queryObject.english;
        let requestObj = {
            "source": "en",
            "target": "ja",
            "q": [word]
        };

        APIRequest(
            {
                url: url,
                method: "POST",
                headers: {"content-type": "application/json"},
                json: requestObj
            },
            APICallback
        );

        function APICallback(err, APIResHead, APIResBody) {
            if(err || (APIResHead.statusCode != 200)) {
                console.log("Got an API error!");
                console.log(APIResBody);
            } else {
                if(APIResHead.error) {
                    console.log(APIResHead.error);
                } else {
                    console.log("In Japanese", APIResBody.data.translations[0].translatedText);
                    let response = {
                        "english": word,
                        "japanese":APIResBody.data.translations[0].translatedText
                    };
                    res.json(response);
                }
            }
        }// END APICallBack

    } else {
        next();
    }
}

function storeHandler(req, res, next) {
    let url = req.url;
    let qObj = req.query;
    const cmdI = "INSERT INTO FlashCards (user_id, word_one, word_two, seen, correct) VALUES (@0, @1, @2, 0, 0);"
    console.log("User: " + Object.keys(req.user));
    if((qObj.english != undefined) && (qObj.japanese != undefined)) {
        DB.run(cmdI, req.user.id, qObj.english, qObj.japanese, insertCallback);
        res.json("Attempting to store data!");
    } else {
        next();
    }
}

function insertCallback(err) {
    if(err){console.log(err);}
    else {
        dumpDB();
        console.log("\n\n");
    }
}

function dumpDB() {
    DB.all('SELECT * FROM FlashCards', dataCallback);
    DB.all('SELECT * FROM Users', dataCallback);
    function dataCallback(err, data) {
        console.log(data);
    }
}

function alreadyLoggedIn(req, res, next) {
    console.log("In already logged in");
    if(req.user) {
        res.redirect("/user/lango.html");
    } else {
        next();
    }

}

function getCards(req, res, next) {
    if(req) {
        let command = 'SELECT * FROM FlashCards WHERE user_id = ';
        command = command + req.user.id;
        console.log("Command: ", command);
        DB.all(command, getCardsCallback);

        let responseObj = {
            firist_name: req.user.first_name
        };
        console.log("ResObject: ", responseObj);
        function getCardsCallback(err, rowData) {
            if(err) {
                console.log("Error::getCards:: ", err);
            } else {
                responseObj.Data = rowData;
                res.json(responseObj);
            }
        }
    } else {
        next();
    }
}

function fileNotFound(req, res) {
    let url = req.url;
    res.type('text/plain');
    res.status(404);
    res.send("Cannot find " + url);
}