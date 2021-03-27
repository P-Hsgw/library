const display = document.querySelector(".display")

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

function createCard (param) {
  let newDiv = document.createElement("div");
  let newTitle = document.createElement("p");
  let newAuthor = document.createElement("p");
  let newPages = document.createElement("p");

  newDiv.classList.add("card")
  newDiv.setAttribute("id", `${param}`); // add paragraphs for each class element
  newTitle.setAttribute("id", `title${param}`)
  newAuthor.setAttribute("id", `author${param}`)
  newPages.setAttribute("id", `pages${param}`)

  newDiv.appendChild(newTitle)
  newDiv.appendChild(newAuthor)
  newDiv.appendChild(newPages)
  display.appendChild(newDiv)
}

function displayBooks() {
  myLibrary.forEach (function (book, i) {
    createCard (i)
    document.getElementById(`title${i}`).innerHTML = `${book.title}`
    document.getElementById(`author${i}`).innerHTML = `${book.author}`
    document.getElementById(`pages${i}`).innerHTML = `${book.pages} pages`
  })
}

addToLibrary("The Lord of the Rings", "J. R. R. Tolkien", 1000, true)
addToLibrary("The Lord of the Rings", "J. R. R. Tolkien", 1000, true)
addToLibrary("The Lord of the Rings", "J. R. R. Tolkien", 1000, true)

addToLibrary("The Lord of the Rings", "J. R. R. Tolkien", 1000, true)

addToLibrary("The Lord of the Rings", "J. R. R. Tolkien", 1000, true)

addToLibrary("The Lord of the Rings", "J. R. R. Tolkien", 1000, true)

addToLibrary("The Lord of the Rings", "J. R. R. Tolkien", 1000, true)

addToLibrary("The Lord of the Rings", "J. R. R. Tolkien", 1000, true)

addToLibrary("The Lord of the Rings", "J. R. R. Tolkien", 1000, true)

addToLibrary("The Lord of the Rings", "J. R. R. Tolkien", 1000, true)

addToLibrary("The Lord of the Rings", "J. R. R. Tolkien", 1000, true)

addToLibrary("The Lord of the Rings", "J. R. R. Tolkien", 1000, true)

addToLibrary("The Lord of the Rings", "J. R. R. Tolkien", 1000, true)


displayBooks()
console.log(myLibrary)


// document.getElementById("uniqueID").value;