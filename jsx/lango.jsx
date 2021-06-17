"use strict";

function logo(props) {
    return(
        <h1 id="logo">Lango!</h1>
    );
}

function LangoHeader(props) {
    return(
        <header id="langoHeader">
            <button id="startButton">Start Review</button>
            <h1 id="langoLogo">Lango!</h1>
        </header>
    );
}

function FirstCard(props) {
    return(
        <div id="textCard">
            <p id="firstCard">""</p>
        </div>
    );
}

function FirstInputCard(props) {
    return(
        <div id="inputTextCard">
            <textarea id="firstCardInput" onKeyPress={checkReturn}></textarea>
        </div>
    );
}

function SaveButton(props) {
    return(
        <button className="butt" onClick={storeWord}>Save</button>
    );
}

function LangoFooter(props) {
    return(
        <footer>
            <p id="langoUser">Big Chungus</p>
        </footer>
    );
}

function CardsDiv(props) {
    return(
        <div id="cardsDiv">
            <FirstInputCard />
            <FirstCard />
        </div>
    );
}

function ButtonDiv(props) {
    return(
        <div id="buttonDiv">
            <SaveButton />
        </div>
    );
}

function MainBody(props) {
    return(
        <main id="langoMain">
            <CardsDiv />
            <ButtonDiv />
        </main>
    );
}

function Master(props) {
    return(
        <div id="masterDiv">
            <LangoHeader />
            <MainBody />
            <LangoFooter />
        </div>
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

