console.log("AVijit Samanta");

let libraryForm = document.getElementById("libraryForm");

class Book {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}

class Display {
  add(book) {
    let books = localStorage.getItem("books");
    let booksObj;
    if (books == null) {
      booksObj = [];
    } else {
      booksObj = JSON.parse(books);
    }
    let myObj = {
      name: book.name,
      author: book.author,
      type: book.type,
    };
    booksObj.push(myObj);
    localStorage.setItem("books", JSON.stringify(booksObj));
    showBooks();
  }

  clear() {
    libraryForm.reset();
  }

  validate(book) {
    if (book.name.length < 2 || book.author.length < 2) {
      return false;
    }
    return true;
  }

  showMessage(type, msg) {
    let message = document.getElementById("message");
    message.innerHTML = `
  <div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>Message: </strong>${msg}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`;
    setTimeout(function () {
      message.innerHTML = "";
    }, 3000);
  }
}

showBooks();
function showBooks() {
  let books = localStorage.getItem("books");
  if (books == null) {
    booksObj = [];
  } else {
    booksObj = JSON.parse(books);

    let tableBody = document.getElementById("tableBody");
    let uiString;
    booksObj.forEach(function (element, index) {
      uiString += `<tr>
            <td>${element.name}</td>
            <td>${element.author}</td>
            <td>${element.type}</td>
        </tr>
      `;
    });
    tableBody.innerHTML += uiString;
  }
}
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

  let display = new Display();

  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.showMessage("success", `${book.name} is added successfully`);
  } else {
    display.showMessage("danger", "Sorry you can't add this book");
  }
}
