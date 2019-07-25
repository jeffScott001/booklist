//DOM Elements
const formSubmit = document.querySelector("#book-form");
const massage = document.querySelector("#alert");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const isbn = document.querySelector("#isbn");
const bookList = document.querySelector("#table-body");

//Event Listeners
formSubmit.addEventListener("submit", submitForm);
bookList.addEventListener("click", removeBook);
document.addEventListener("DOMContentLoaded", loadBooks);

//functions
function submitForm(e) {
  e.preventDefault();
  if (title.value !== "" && author.value !== "" && isbn.value !== "") {
    let tr = document.createElement("tr");

    tr.innerHTML = `
            <td>${title.value}</td>
            <td>${author.value}</td>
            <td>${isbn.value}</td>
            <td><button class = 'btn-delete'>X</button></td>
    `;

    bookList.appendChild(tr);

    //New object
    const book = new AddBook(title.value, author.value, isbn.value);

    //call the save function
    book.save();
    //clear the form
    // title.value = "";
    // author.value = "";
    // isbn.value = "";

    //aleart the user
    massage.classList.remove("hidden");
    massage.textContent = "Book Added";
    setTimeout(() => {
      massage.classList.add("hidden");
    }, 2000);
  } else {
    massage.textContent = "Fill all the fields";
    massage.classList.remove("hidden");
    massage.style.background = "#a91b0d";
    setTimeout(() => {
      massage.classList.add("hidden");
    }, 2000);
  }
}
//Add book to local storage
function AddBook(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
AddBook.prototype.save = function() {
  if (localStorage.getItem("books") !== null) {
    const books = JSON.parse(localStorage.getItem("books"));
    books.push(this);
    localStorage.setItem("books", JSON.stringify(books));
  } else {
    const bookArray = [this];
    localStorage.setItem("books", JSON.stringify(bookArray));
    console.log(bookArray);
  }
};

//load saved books
function loadBooks() {
  if (localStorage.getItem("books") !== null) {
    const books = JSON.parse(localStorage.getItem("books"));

    books.forEach(book => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><button class = 'btn-delete'>X</button></td>
          `;
      bookList.appendChild(tr);
    });
  }
}

//Remove book
function removeBook(e) {
  if ((e.target.classList = "btn-delete")) {
    const r = confirm(`Are you sure you want to remove the book?`);
    if (r == true) {
      const book = e.target.parentElement.parentElement;
      bookList.removeChild(book);

      const id = e.target.parentElement.previousElementSibling.textContent;
      //update the local storage
      function updateLocalStorage() {
        const books = JSON.parse(localStorage.getItem("books"));
        books.forEach((book, index) => {
          if (id === book.isbn) {
            books.splice(index, 1);
            console.log(books);
            localStorage.setItem("books", JSON.stringify(books));
          }
        });
      }
      updateLocalStorage();
      //alert the user the book is added

      massage.classList.remove("hidden");

      massage.textContent = "Successfully removed...";
      setTimeout(() => {
        massage.classList.add("hidden");
      }, 4000);
    }
  }
}
