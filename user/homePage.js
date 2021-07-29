"use strict";

import Master from "./components/master";

ReactDOM.render(React.createElement(Master, null), document.getElementById("root"));

function checkReturn() {
    console.log("In checkReturn");
}

function storeWord() {
    console.log("In storeWord");
}

function goToReview() {
    loadReview();
    getWords();
}
