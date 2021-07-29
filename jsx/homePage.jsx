"use strict";
import Master from "./components/master";

ReactDOM.render(<Master />, document.getElementById("root"));

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