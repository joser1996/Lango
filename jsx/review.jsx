"use strict";

function ReviewHeader(props) {
    return(
        <header id="reviewHeader">
            <div id="addDiv">
                <button id="addButton" onClick={goToLango}>Add</button>
            </div>
            <h1>Lango!</h1>
        </header>
    );
}


function Main(props) {
    return(
        <main id="reviewMain">
            <div id="reviewTextCard">
                <p id="pReview">
                    "\u304A\u306F\u3088\u3046\u3054\u3056\u3044\u307E\u3059\u3002"
                </p>
            </div>

            <div id="reviewInputCard">
                <textarea id="revTextArea" onKeyPress={checkEnter}>
                    Good Morning
                </textarea>
            </div>

            <div id="nextButtonDiv" onClick={nextCard}>
                <button id="nextButton">Next</button>
            </div>
        </main>
    );
}

function ReviewFooter(props) {
    return(
        <footer id="reviewFooter">
            <p id="reviewName">Big Chungus</p>
        </footer>
    );
}

function Master(props) {
    return(
        <div id="masterDiv">
            <ReviewHeader />
            <Main />
            <ReviewFooter />
        </div>

    );
}

var master = Master()
/***************************** Helper functions **********************************/
function loadReview() {
    console.log("In load Review")
    ReactDOM.render(master, document.getElementById("root"));
}

function goToLango() {
    console.log("In goToLango")
}

function checkEnter() {
    console.log("In check enter")
}

function nextCard() {
    console.log("In next card")
}

let cardIndex = 0;
let cards = null;
function updateReview(data) {
    if(data) {
        cards = data;
        let maxSize = data.length;
        if(cardIndex == maxSize) {
            cardIndex = 0;
        }
        let card = document.getElementById("pReview");
        card.textContent = data[cardIndex].japanese;

        let userInput = document.getElementById("revTextArea");
        userInput.value = "";
    }
}