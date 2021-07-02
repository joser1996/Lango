"strict mode";

const { response } = require("express");

function createCORSRequest(method, url) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    return xhr;
}


/*
 * Making the request to google translate APIs
 *
*/
function CORSRequest() {
    console.log("Attempting to make request!");
    let url = "translate?english=";
    let englishWord = document.getElementById("firstCardInput");
    url = url + englishWord.value;
    console.log("URL: ", url);

    let xhr = createCORSRequest("GET", url);
    if (!xhr) {
        alert("CORS not supported");
        return;
    }

    xhr.onload = function () {
        let responseString = xhr.responseText;
        if(responseString === "we good ;") {
            console.log(responseString);
        } else {
            let object = JSON.parse(responseString);
            console.log("Res Object: ", object);
            let japanese = document.getElementById("firstCard");
            let userName = document.getElementById("langoUser");
            japanese.innerHTML = object.japanese;
            console.log("object: ", object)
        }
    };

    xhr.onerror = function () {
        alert("Woops, there was an error making the request!");
    };

    console.log("Sending Request!");
    xhr.send();
}


/*
 *Function to store word pairs into the data base which I haven't made
 * yet
 */

function storeWords() {
    let url = "store?english=";
    let englishCard = document.getElementById("firstCardInput");
    let japaneseCard = document.getElementById("firstCard");
    let englishWord = englishCard.value;
    let japaneseWord = japaneseCard.innerHTML;

    //if blank
    if(englishWord === "") {
        console.log("blank");
    } else {
        url = url + englishWord + "&japanese=" + japaneseWord;
        console.log("URL: ", url);
        let xhr = createCORSRequest("GET", url);
        if(!xhr) {
            alert("Browser doesn't support CORS!");
            return;
        }

        xhr.onload = function() {
            let responseStr = xhr.responseText;
            console.log(responseStr);
        };

        xhr.onerror = function() {
            alert("Woops, there was an error making the request.");
        };
        japaneseCard.innerHTML = "";
        englishCard.value = "";
        xhr.send();
    }
}