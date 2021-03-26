const display = document.getElementById("display")
const title = document.getElementById("title")
const author = document.getElementById("author")
const pages = document.getElementById("pages")
const read = document.getElementById("read")




let myLibrary = [];

function Book (title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${(read) ? `read already`: `not read yet`} `
  }
}

function addToLibrary(title, author, pages, read) {
  let newBook = new Book (title, author, pages, read)
  myLibrary.push(newBook)
}

function displayBooks() {
  myLibrary.forEach (function (book) {
    title.innerHTML = book.title;
    author.innerHTML = book.author;
    pages.innerHTML = book.pages;
    read.innerHTML = book.read;
  })
}

addToLibrary("The Lord of the Rings", "J. R. R. Tolkien", 1000, true)
displayBooks()
console.log(myLibrary)

// Create new card for each book when displaying Books - each with data attribute corresponding to array index