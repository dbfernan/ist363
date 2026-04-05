const API_KEY = "oquhDOGqQbnguiBfRpV9h6hEXBi2EccWeNt5snoNQhGetACn";
const NYT_URL = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${API_KEY}`;

const searchContainer = document.getElementById("search-results-container");
const container = document.getElementById("books-container");

const errorDiv = document.getElementById("error-message");

let titleInput, authorInput, genreInput, searchBtn;

function buildSearchURL() {

    const params = [];

    if (titleInput.value.trim())
        params.push(`title=${encodeURIComponent(titleInput.value.trim())}`);
    if (authorInput.value.trim())
        params.push(`author=${encodeURIComponent(authorInput.value.trim())}`);
    if (genreInput.value.trim())
        params.push(`subject=${encodeURIComponent(genreInput.value.trim())}`);

    return params.length ? "https://openlibrary.org/search.json?" + params.join("&") : null;

}

async function searchBooks() {

    const url = buildSearchURL();

    if (!url) {
        errorDiv.textContent = "Enter at least one search criteria.";
        return;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        displaySearchResults(data.docs.slice(0, 12));
    } catch (error) {
        console.error(error);
        errorDiv.textContent = "Error fetching search results.";
    }

}

function displaySearchResults(books) {
    
    books.forEach(book => {
        const coverUrl = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : "images/placeholder.png";

        const col = document.createElement("div");
        col.className = "col s12 m6 l4";
        col.innerHTML = `
            <div class="card book-card">
                <div class="card-image">
                    <img src="${coverUrl}" alt="${book.title}">
                </div>
                <div class="card-content">
                    <p class="card-title">${book.title}</p>
                    <p><strong>Author:</strong> ${book.author_name ? book.author_name.join(", ") : "Unknown"}</p>
                    <p><strong>Year:</strong> ${book.first_publish_year || "N/A"}</p>
                </div>
            </div>`;
        searchContainer.appendChild(col);
    });
}

async function fetchBooks() {

    try {
        const response = await fetch(NYT_URL);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        displayBooks(data.results.books);

    } catch (error) {
        console.error("Error:", error);
        errorDiv.textContent = "Error fetching books.";
    }

}

function displayBooks(books) {

    container.innerHTML = "";

    books.slice(0, 6).forEach(book => {
        const col = document.createElement("div");
        col.className = "col s12 m6 l4";
        col.innerHTML = `
            <div class="card book-card">
                <div class="card-image">
                    <img src="${book.book_image}" alt="${book.title}">
                </div>
                <div class="card-content">
                    <p class="card-title">${book.title}</p>
                    <p><strong>Author:</strong> ${book.author}</p>
                    <p><strong>Description:</strong> ${book.description || "Description not available."}</p>
                </div>
            </div>`;
        container.appendChild(col);
    });

}

document.addEventListener("DOMContentLoaded", function () {

    M.Parallax.init(document.querySelectorAll(".parallax"));

    titleInput = document.getElementById("title-input");
    authorInput = document.getElementById("author-input");
    genreInput = document.getElementById("genre-input");
    searchBtn = document.getElementById("search-btn");

    searchBtn.addEventListener("click", () => {
        errorDiv.textContent = "";
        searchBooks();
    });

    fetchBooks();

});