$(document).ready(function() {

function myFunction() {
    var x = document.getElementById("main-menu");
    if (x.className === "nav") {
        x.className += " responsive";
    } else {
        x.className = "nav";
    }
}

$("#link").on("click", function() {
	myFunction();
	});
	});