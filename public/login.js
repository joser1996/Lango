function loginMaster(props) {
    return React.createElement(
        "main",
        { id: "loginMain" },
        React.createElement(
            "div",
            { id: "leftSide" },
            React.createElement(
                "div",
                { id: "welcomeText" },
                React.createElement(
                    "p",
                    { id: "ttl" },
                    "Welcome to Lango!"
                ),
                React.createElement(
                    "p",
                    { id: "sub" },
                    "Customize your vocabulary"
                )
            )
        ),
        React.createElement(
            "div",
            { id: "rightSide" },
            React.createElement(
                "a",
                { href: "auth/google" },
                " Log In"
            )
        )
    );
}

ReactDOM.render(loginMaster(), document.getElementById('loginRoot'));

function loadLogin() {
    ReactDOM.render(loginMaster, document.getElementById('loginRoot'));
}
