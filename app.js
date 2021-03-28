const display = document.querySelector(".display")
const fbtn = document.getElementById("fbutton")

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
  let newRemove = document.createElement("button")

  newDiv.classList.add("card")
  newDiv.setAttribute("id", `card${param}`);
  newDiv.setAttribute("data-index", `${param}`);
  newTitle.setAttribute("id", `title${param}`);
  newAuthor.setAttribute("id", `author${param}`);
  newPages.setAttribute("id", `pages${param}`);
  newRemove.classList.add("rbutton");
  newRemove.setAttribute("id", `${param}`);
  newRemove.innerHTML = "Hello";
  


  newDiv.appendChild(newTitle)
  newDiv.appendChild(newAuthor)
  newDiv.appendChild(newPages)
  newDiv.appendChild(newRemove)
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
    }
}
// Event Bubble ends here

fbtn.addEventListener("click", () => {
  getInputValue()
  displayBook()
})