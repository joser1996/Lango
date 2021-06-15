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
        { className: "butt", onClick: storeWord },
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
        { id: "buttonDIv" },
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

function checkReturn() {
    console.log("In checkReturn");
}

function storeWord() {
    console.log("In storeWord");
}
