let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,
    this.info = function() {
        if (read) {
            console.log(`${this.title} by ${this.author}, ${this.pages} pages, read`)
        }
        else {
            console.log(`${this.title} by ${this.author}, ${this.pages} pages, not yet read`)
        }
    }
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary[myLibrary.length] = new Book(title, author, pages, read);
}

// addBookToLibrary("bible", "God", "a lot", true);



function addLastToTable() {
    let table = document.querySelector('#tbl');
    var row = table.insertRow(1);
    var title = row.insertCell(0);
    var titleText = document.createTextNode(myLibrary[myLibrary.length-1].title);
    title.style.fontStyle = "italic";
    title.appendChild(titleText);
    var author = row.insertCell(1);
    var authorText = document.createTextNode(myLibrary[myLibrary.length-1].author);
    author.appendChild(authorText);
    var pages = row.insertCell(2);
    var pagesText = document.createTextNode(myLibrary[myLibrary.length-1].pages);
    pages.appendChild(pagesText);
    var read = row.insertCell(3);
    var readText = document.createTextNode(myLibrary[myLibrary.length-1].read);
    read.appendChild(readText);

}

// EVENT LISTENER FOR NEW BOOK

let newbook = document.querySelector('#newbook');
newbook.addEventListener ('click', () => {

    addBookToLibrary(
        prompt('Title?'),
        prompt('Author?'),
        prompt('Page count?'),
        confirm('Have you finished it? (Click \'OK\' for yes, or \'Cancel\' for no.)')
    )
    addLastToTable();
})
