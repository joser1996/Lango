"use strict";

function logo(props) {
    return React.createElement(
        "h1",
        { id: "logo" },
        "Lango!"
    );
}

function LangoHeader(props) {
    return React.createElement(
        "header",
        { id: "langoHeader" },
        React.createElement(
            "button",
            { id: "startButton", onClick: goToReview },
            "Start Review"
        ),
        React.createElement(
            "h1",
            { id: "langoLogo" },
            "Lango!"
        )
    );
}

function FirstCard(props) {
    return React.createElement(
        "div",
        { id: "textCard" },
        React.createElement(
            "p",
            { id: "firstCard" },
            "\"\""
        )
    );
}

function FirstInputCard(props) {
    return React.createElement(
        "div",
        { id: "inputTextCard" },
        React.createElement("textarea", { id: "firstCardInput", onKeyPress: checkReturn })
    );
}

function SaveButton(props) {
    return React.createElement(
        "button",
        { className: "butt", onClick: storeWords },
        "Save"
    );
}

function LangoFooter(props) {
    return React.createElement(
        "footer",
        null,
        React.createElement(
            "p",
            { id: "langoUser" },
            "Big Chungus"
        )
    );
}

function CardsDiv(props) {
    return React.createElement(
        "div",
        { id: "cardsDiv" },
        React.createElement(FirstInputCard, null),
        React.createElement(FirstCard, null)
    );
}

function ButtonDiv(props) {
    return React.createElement(
        "div",
        { id: "buttonDiv" },
        React.createElement(SaveButton, null)
    );
}

function MainBody(props) {
    return React.createElement(
        "main",
        { id: "langoMain" },
        React.createElement(CardsDiv, null),
        React.createElement(ButtonDiv, null)
    );
}

function Master(props) {
    return React.createElement(
        "div",
        { id: "masterDiv" },
        React.createElement(LangoHeader, null),
        React.createElement(MainBody, null),
        React.createElement(LangoFooter, null)
    );
}

ReactDOM.render(Master(), document.getElementById("root"));
/**************************Helper Functions*****************************/

function checkReturn(event) {
    console.log(event.charCode);
    if (event.charCode === 13) {
        CORSRequest();
    }
}

//loadReview() in review.js
function goToReview() {
    loadReview();
    getWords();
}

function loadLango() {
    console.log("IN loadLango()");
    ReactDOM.render(Master(), document.getElementById("root"));
}
