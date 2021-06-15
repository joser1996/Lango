"use strict";

function logo(props) {
    return React.createElement(
        "h1",
        { id: "logo" },
        "Lango!"
    );
}

function langoHeader(props) {
    return React.createElement(
        "header",
        { id: "langoHeader" },
        React.createElement(
            "div",
            { id: "startDiv" },
            React.createElement(
                "button",
                { id: "startButton" },
                "Start Review"
            ),
            React.createElement(
                "h1",
                null,
                "Lango!"
            )
        )
    );
}

function firstCard(props) {
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

function firstInputCard(props) {
    return React.createElement(
        "div",
        { id: "inputTextCard" },
        React.createElement("textarea", { id: "firstCardInput", onKeyPress: checkReturn })
    );
}

function saveButton(props) {
    return React.createElement(
        "button",
        { className: "butt", onClick: storeWord },
        "Save"
    );
}

function langoFooter(props) {
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

function cardsDiv(props) {
    return React.createElement(
        "div",
        { id: "cardsDiv" },
        React.createElement("firstInputCard", null),
        React.createElement("firstCard", null)
    );
}

function buttonDiv(props) {
    return React.createElement(
        "div",
        { id: "buttonDIv" },
        React.createElement("saveButton", null)
    );
}

function mainBody(props) {
    return React.createElement(
        "main",
        { id: "langoMain" },
        React.createElement("cardsDiv", null),
        React.createElement("buttonDiv", null)
    );
}

function master(props) {
    return React.createElement(
        "div",
        { id: "masterDiv" },
        React.createElement("langoHeader", null),
        React.createElement("mainBody", null),
        React.createElement("langoFooter", null)
    );
}

ReactDOM.render(master, document.getElementById("root"));
/**************************Helper Functions*****************************/

function checkReturn() {
    console.log("In checkReturn");
}

function storeWord() {
    console.log("In storeWord");
}
