function loginMaster(props) {
    return(
        <main id="loginMain">
            <div id="leftSide">
                <div id="welcomeText">
                    <p id="ttl">Welcome to Lango!</p>
                    <p id="sub">Customize your vocabulary</p>
                </div>
            </div>
            <div id="rightSide">
                <a href="auth/google"> Log In</a>
            </div>
        </main>
    );
}

ReactDOM.render(loginMaster(), document.getElementById('loginRoot'));

function loadLogin() {
    ReactDOM.render(loginMaster(), document.getElementById('loginRoot'));
}