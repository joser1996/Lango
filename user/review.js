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

function loadReview() {
    ReactDOM.render(React.createElement(Master, null), document.getElementById("root"));
}
