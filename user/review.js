"use strict";

function ReviewHeader(props) {
    return React.createElement(
        "header",
        { id: "reviewHeader" },
        React.createElement(
            "div",
            { id: "addDiv" },
            React.createElement(
                "button",
                { id: "addButton", onClick: goToLango },
                "Add"
            )
        ),
        React.createElement(
            "h1",
            null,
            "Lango!"
        )
    );
}

function Main(props) {
    return React.createElement(
        "main",
        { id: "reviewMain" },
        React.createElement(
            "div",
            { id: "reviewTextCard" },
            React.createElement(
                "p",
                { id: "pReview" },
                "\"\\u304A\\u306F\\u3088\\u3046\\u3054\\u3056\\u3044\\u307E\\u3059\\u3002\""
            )
        ),
        React.createElement(
            "div",
            { id: "reviewInputCard" },
            React.createElement(
                "textarea",
                { id: "revTextArea", onKeyPress: checkEnter },
                "Good Morning"
            )
        ),
        React.createElement(
            "div",
            { id: "nextButtonDiv", onClick: nextCard },
            React.createElement(
                "button",
                { id: "nextButton" },
                "Next"
            )
        )
    );
}

function ReviewFooter(props) {
    return React.createElement(
        "footer",
        { id: "reviewFooter" },
        React.createElement(
            "p",
            { id: "reviewName" },
            "Big Chungus"
        )
    );
}

function Master(props) {
    return React.createElement(
        "div",
        { id: "masterDiv" },
        React.createElement(ReviewHeader, null),
        React.createElement(Main, null),
        React.createElement(ReviewFooter, null)
    );
}

var master = Master();
/***************************** Helper functions **********************************/
function loadReview() {
    console.log("In load Review");
    ReactDOM.render(master, document.getElementById("root"));
}

function goToLango() {
    console.log("In goToLango");
}

function checkEnter() {
    console.log("In check enter");
}

function nextCard() {
    console.log("In next card");
}

let cardIndex = 0;
let cards = null;
function updateReview(data) {
    if (data) {
        cards = data;
        let maxSize = data.length;
        if (cardIndex == maxSize) {
            cardIndex = 0;
        }
        let card = document.getElementById("pReview");
        card.textContent = data[cardIndex].japanese;

        let userInput = document.getElementById("revTextArea");
        userInput.value = "";
    }
}
