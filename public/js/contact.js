$(document).ready(function() {

$('#submit').on("click", function() {
	event.preventDefault();

	var name = $("#person").val().trim();
	var email = $("#email").val().trim();
	var message = $("#message").val().trim();

	var newContact = {
		name: name,
		email: email,
		message: message
	}

	console.log(newContact);

	$("#person").val('');
	$("#email").val('');
	$("#message").val('');


 $.ajax("/contact", {
      type: "POST",
      data: newContact
    }).then(
      function() {
        console.log("new contact");
         location.reload();
      }
    );
});

  // <object width="300" height="500" data="/documents/Assistant.pdf" id="acting" alt="Acting Resume">
  //   <p>Insert your error message here, if the PDF cannot be displayed.</p>
  // </object>

  // <img id="acting" src='/images/IMG_51431.jpg' alt='Acting Resume'  width='300' height"500">

// Get the modal
var modal = document.getElementById('myModal1');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var modalImg1 = document.getElementById("img01");
var captionText1 = document.getElementById("caption1");

$("#developer").on("click", function () {
	console.log("click");
    modal.style.display = "block";
    modalImg1.src = this.src;
    captionText1.innerHTML = this.alt;
});
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("exit")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
    modal.style.display = "none";
}

span2.onclick = function() { 
    modal2.style.display = "none";
}

});