console.log("Avijit Samanta");

let libraryForm = document.getElementById("libraryForm");

// Book Constructor
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

// Display Constructor
function Display() {}

// Add methods to display prototype
Display.prototype.add = function (book) {
  console.log("Adding data to table");
  let tableBody = document.getElementById("tableBody");
  let uiString = `
            <tr>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.type}</td>
            </tr>
  `;
  tableBody.innerHTML += uiString;
};

Display.prototype.clear = function () {
  libraryForm.reset();
};

Display.prototype.validate = function (book) {
  if (book.name.length < 2 || book.author.length < 2) {
    return false;
  }
  return true;
};

Display.prototype.show = function (type, msg) {
  let message = document.getElementById("message");
  message.innerHTML = `
  <div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>Message: </strong>${msg}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`;
  setTimeout(function () {
    message.innerHTML = "";
  }, 2000);
};

// Add submit event listener to libraryForm
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  e.preventDefault(); // do not reload the form
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("auther").value;
  let radio = document.getElementsByName("type");
  let type;
  for (i = 0; i < radio.length; i++) {
    if (radio[i].checked) type = radio[i].value;
  }
  let book = new Book(name, author, type);
  console.log(book);

  let display = new Display();

  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show("success", `${book.name} is added successfully`);
  } else {
    display.show("danger", "Sorry you can't add this book");
  }
}
