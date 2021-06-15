"use strict";

function logo(props) {
    return(
        <h1 id="logo">Lango!</h1>
    );
}

function langoHeader(props) {
    return(
        <header id="langoHeader">
            <div id="startDiv">
                <button id="startButton">Start Review</button>
                <h1>Lango!</h1>
            </div>
        </header>
    );
}

function firstCard(props) {
    return(
        <div id="textCard">
            <p id="firstCard">""</p>
        </div>
    );
}

function firstInputCard(props) {
    return(
        <div id="inputTextCard">
            <textarea id="firstCardInput" onKeyPress={checkReturn}></textarea>
        </div>
    );
}

function saveButton(props) {
    return(
        <button className="butt" onClick={storeWord}>Save</button>
    );
}

function langoFooter(props) {
    return(
        <footer>
            <p id="langoUser">Big Chungus</p>
        </footer>
    );
}

function cardsDiv(props) {
    return(
        <div id="cardsDiv">
            <firstInputCard />
            <firstCard />
        </div>
    );
}

function buttonDiv(props) {
    return(
        <div id="buttonDIv">
            <saveButton />
        </div>
    );
}

function mainBody(props) {
    return(
        <main id="langoMain">
            <cardsDiv />
            <buttonDiv />
        </main>
    );
}

function master(props) {
    return(
        <div id="masterDiv">
            <langoHeader />
            <mainBody />
            <langoFooter />
        </div>
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

