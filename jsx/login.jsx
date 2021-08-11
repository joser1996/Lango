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
                {/* <a href="auth/google"> Log In</a> */}
                <a href="auth/google" className="google-btn">
                    <div className="google-icon-wrapper">
                        <img className="google-icon"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                        />
                    </div>
                    <p class="btn-text"><b>Sign in with google</b></p>
                </a>
            </div>
        </main>
    );
}

ReactDOM.render(loginMaster(), document.getElementById('loginRoot'));

function loadLogin() {
    ReactDOM.render(loginMaster(), document.getElementById('loginRoot'));
}