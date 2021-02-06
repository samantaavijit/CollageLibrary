console.log("Avijit Samanta");

// Book Constructor
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

// Display Constructor
function Display() {}

// Add methods to display prototype

// Add submit event listener to libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
    e.preventDefault(); // do not reload the form
  console.log("Form Submit");
}
