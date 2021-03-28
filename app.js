const display = document.querySelector(".display")
const fbtn = document.getElementById("fbutton")
const sbtn = document.getElementById("sbutton")

let myLibrary = []

// If localStorage is occupied - upload content to myLibrary
if(!localStorage.getItem('library')) {
  ;
}  else {
  let retrievedData = localStorage.getItem("library");
  myLibrary = JSON.parse(retrievedData);
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

// Add new book to the library, as well as to local storage
function addToLibrary(title, author, pages, read) {
  if (title == "" || author == "" || pages == "") {
    console.log('Error - enter proper values')
  } else if (title.length > 30 || author.length > 30 || pages.length > 7) {
    console.log('Error - values too long')
  } else {
    let newBook = new Book (title, author, pages, read)
    myLibrary.push(newBook)
    localStorage.setItem(" ", JSON.stringify(myLibrary))
  }
}

// Create new card to display each book
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
  newRemove.classList.add("dom_button");
  newRemove.setAttribute("id", `${param}`);
  newRemove.innerHTML = "Remove";
  newRead.classList.add("read")
  newRead.classList.add("dom_button")
  newRead.setAttribute("data-index", `${param}`);
  newRead.setAttribute("id", `read${param}`);
 
    if (myLibrary[param-1].read == true) { // Set up proper color of a "read" button 
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

// Display new book when the book is added
function displayBook() {
 let book = myLibrary[myLibrary.length - 1]
 let i = myLibrary.length
 createCard (i)
 document.getElementById(`title${i}`).innerHTML = `${book.title}`
 document.getElementById(`author${i}`).innerHTML = `${book.author}`
 document.getElementById(`pages${i}`).innerHTML = `${book.pages} pages`
}

// Display all books if localStorage is occupied
function displayBooks() {
  myLibrary.forEach (function (book, i) {
  if (myLibrary[i] != null) {
    createCard(i+1)
    document.getElementById(`title${i+1}`).innerHTML = `${book.title}`
    document.getElementById(`author${i+1}`).innerHTML = `${book.author}`
    document.getElementById(`pages${i+1}`).innerHTML = `${book.pages} pages`
  }})
}

// Get values that user inputs in the form
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
  // Remove specific card and push current cards to localStorage
  if (e.target.classList == 'rbutton') {
    let card = document.getElementById(`card${e.target.id}`)
    card.remove()
    delete myLibrary[e.target.id-1]
    localStorage.setItem("library", JSON.stringify(myLibrary))
  }
  // Change read status and save status to localStorage
  if (e.target.classList == "read") {
  if (myLibrary[e.target.dataset.index-1].read == true) {
    myLibrary[e.target.dataset.index-1].read = false
    localStorage.setItem("library", JSON.stringify(myLibrary))
  } else {
    myLibrary[e.target.dataset.index-1].read = true
    localStorage.setItem("library", JSON.stringify(myLibrary))
  }
  // Update color and innerHTML of a button depending on a read status, as well
  if (e.target.classList == "read" && myLibrary[e.target.dataset.index-1].read == true) {
    e.target.style.backgroundColor = "green"
    e.target.innerHTML = "I've read this book already"
  }else {
    e.target.style.backgroundColor = "red"
    e.target.innerHTML = "I didn't read it yet"
  }
  }
}
// Event Bubble ends here

// Add new cards with data provided by the user
fbtn.addEventListener("click", () => {
  getInputValue()
  displayBook()
})

// Remove all cards and clear localStorage
sbtn.addEventListener("click", () => {
  localStorage.clear("library")
  myLibrary = []
  while (display.firstChild) {
    display.removeChild(display.lastChild);
  }
})