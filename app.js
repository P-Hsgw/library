const display = document.querySelector(".display")
const fbtn = document.getElementById("fbutton")

let myLibrary = []

if(!localStorage.getItem('library')) {
  ;
} else {
  let retrievedData = localStorage.getItem("library");
  // myLibrary = JSON.parse(retrievedData);
  console.log(myLibrary)
  displayBooks()
}


// Remember to handle errors - no input, negative pages, too long input, maximum myLibrary length
function Book (title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read

}

Book.prototype.isRead = function () {

  console.log( "book is read")
}
function addToLibrary(title, author, pages, read) {
  let newBook = new Book (title, author, pages, read)
  myLibrary.push(newBook)
  localStorage.setItem("library", JSON.stringify(myLibrary))
}

function createCard (param) {
  let newDiv = document.createElement("div");
  let newTitle = document.createElement("p");
  let newAuthor = document.createElement("p");
  let newPages = document.createElement("p");
  let newRemove = document.createElement("button")
  let newRead = document.createElement("button")

  newDiv.classList.add("card")
  newDiv.setAttribute("id", `card${param}`);
  newDiv.setAttribute("data-index", `card${param}`);
  newTitle.setAttribute("id", `title${param}`);
  newAuthor.setAttribute("id", `author${param}`);
  newPages.setAttribute("id", `pages${param}`);
  newRemove.classList.add("rbutton");
  newRemove.setAttribute("id", `${param}`);
  newRemove.innerHTML = "Hello";
  newRead.classList.add("read")
  newRead.setAttribute("data-index", `${param}`);
  newRead.setAttribute("id", `read${param}`);
  if (myLibrary[param-1].read == true) {
    newRead.style.backgroundColor = "green"
    newRead.innerHTML = "I've read this book already"
  } else {
    newRead.style.backgroundColor = "red"
    newRead.innerHTML = "I didn't read it yet"
  }

  newDiv.appendChild(newTitle)
  newDiv.appendChild(newAuthor)
  newDiv.appendChild(newPages)
  newDiv.appendChild(newRemove)
  newDiv.appendChild(newRead)
  display.appendChild(newDiv)
}

function displayBook() {
 let book = myLibrary[myLibrary.length - 1]
 let i = myLibrary.length
 createCard (i)
 document.getElementById(`title${i}`).innerHTML = `${book.title}`
 document.getElementById(`author${i}`).innerHTML = `${book.author}`
 document.getElementById(`pages${i}`).innerHTML = `${book.pages} pages`
}

function displayBooks() {
  myLibrary.forEach (function (book, i) {
    createCard(i+1)
    document.getElementById(`title${i+1}`).innerHTML = `${book.title}`
    document.getElementById(`author${i+1}`).innerHTML = `${book.author}`
    document.getElementById(`pages${i+1}`).innerHTML = `${book.pages} pages`
  })
}

function getInputValue(){
  // Selecting the input element and getting its value 
  let inputTitle = document.getElementById("btitle").value;
  let inputAuthor = document.getElementById("bauthor").value;
  let inputPages = document.getElementById("bpages").value
  let inputRead = document.getElementById("bread").value == "yes" ? true : false;
  addToLibrary(inputTitle, inputAuthor, inputPages, inputRead)
}

// Event Bubble for buttons inside Cards
if (display.addEventListener) {
  display.addEventListener('click', handler, false);
}else if (display.attachEvent) {
  display.attachEvent('onclick', handler);
}

function handler(e) {
  if (e.target.classList == 'rbutton') {
    let card = document.getElementById(`card${e.target.id}`)
    card.remove()
    delete myLibrary[e.target.id-1]
    localStorage.setItem("library", JSON.stringify(myLibrary))
  }
  if (e.target.classList == "read") {
  if (myLibrary[e.target.dataset.index-1].read == true) {
    myLibrary[e.target.dataset.index-1].read = false
    localStorage.setItem("library", JSON.stringify(myLibrary))
  } else {
    myLibrary[e.target.dataset.index-1].read = true
    localStorage.setItem("library", JSON.stringify(myLibrary))
  }
  if (e.target.classList == "read" && myLibrary[e.target.dataset.index-1].read == true) {
    e.target.style.backgroundColor = "green"
    e.target.innerHTML = "I've read this book already"
    localStorage.setItem("library", JSON.stringify(myLibrary))
  }else {
    e.target.style.backgroundColor = "red"
    e.target.innerHTML = "I didn't read it yet"
    localStorage.setItem("library", JSON.stringify(myLibrary))
  }
  console.log(myLibrary[e.target.dataset.index-1].read)
  }
}
// Event Bubble ends here

fbtn.addEventListener("click", () => {
  getInputValue()
  displayBook()
  console.log(myLibrary)
})