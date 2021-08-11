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
                { href: "auth/google", className: "google-btn" },
                React.createElement(
                    "div",
                    { className: "google-icon-wrapper" },
                    React.createElement("img", { className: "google-icon",
                        src: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    })
                ),
                React.createElement(
                    "p",
                    { "class": "btn-text" },
                    React.createElement(
                        "b",
                        null,
                        "Sign in with google"
                    )
                )
            )
        )
    );
}

ReactDOM.render(loginMaster(), document.getElementById('loginRoot'));

function loadLogin() {
    ReactDOM.render(loginMaster(), document.getElementById('loginRoot'));
}
