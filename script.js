let myLibrary = [];
const bookSubmitButton = document.getElementById("submit");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = Math.random() + title;

}

function addBookToLibrary() {
    const titleInput = document.getElementById("title").value;
    const authorInput = document.getElementById("author").value;
    const pagesInput = document.getElementById("pages").value;
    const readInput = document.getElementById("read").checked;

    const newBook = new Book(titleInput, authorInput, pagesInput, readInput);
    myLibrary.push(newBook);
}

function updateDisplay() {
    // Clears the display
    const library = document.querySelector(".library");
    library.innerHTML = "";

    // Creates elements & adds books from list
    myLibrary.forEach(newBook => {
        const book = document.createElement("div");
        book.classList.add("book", "card", "mx-2", "mt-3");
        book.style.width = "18rem";
        book.dataset.bookID = newBook.id;


        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        const cardTop = document.createElement("div");
        cardTop.classList.add("d-flex", "justify-content-between", "align-items-center");
        cardBody.append(cardTop);

        const title = document.createElement("h5");
        title.classList.add("card-title", "mb-0");
        title.textContent = newBook.title;
        book.append(cardBody);

        const removeButton = document.createElement("button");
        removeButton.classList.add("btn", "btn-danger", "btn-sm", "py-0");
        removeButton.addEventListener("click", e => removeBook(e));
        removeButton.textContent = "X";
        cardTop.append(title, removeButton);


        const bookInfo = document.createElement("ul");
        bookInfo.classList.add("list-group", "list-group-flush");
        const author = document.createElement("li");
        author.classList.add("list-group-item");
        author.textContent = newBook.author;


        const pages = document.createElement("li");
        pages.classList.add("list-group-item");
        pages.textContent = newBook.pages;
        bookInfo.append(pages);

        const inputHolder = document.createElement("span");
        inputHolder.classList.add("pt-2")
        const read = document.createElement("input");
        const readLi = document.createElement("li");
        readLi.classList.add("list-group-item");
        read.type = "checkbox";
        if (newBook.read) read.checked = true;
        read.classList.add("pt-2");
        read.addEventListener("change", e => updateRead(e));
        inputHolder.append(read);
        readLi.textContent = "Read ";
        readLi.append(inputHolder);


        bookInfo.append(author, pages, readLi);
        book.append(bookInfo);
        library.append(book);



    })


}

bookSubmitButton.addEventListener("click", e => {
    e.preventDefault();
    addBookToLibrary();
    updateDisplay();
});

function removeBook(event) {
    let targetBook = event.currentTarget.parentNode.parentNode.parentNode.dataset.bookID;
    console.log(event.currentTarget.parentNode.parentNode.parentNode);
    let index = myLibrary.findIndex(book => book.id == targetBook)
    myLibrary.splice(index, 1);
    updateDisplay();
}

function updateRead(event) {
    let targetBook = event.currentTarget.parentNode.parentNode.parentNode.parentNode.dataset.bookID;
    console.log(event.currentTarget.parentNode.parentNode.parentNode.parentNode);
    let index = myLibrary.findIndex(book => book.id == targetBook)
    myLibrary[index].read = !myLibrary[index].read;
}


const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");


