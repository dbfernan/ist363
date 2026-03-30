const API_KEY = "oquhDOGqQbnguiBfRpV9h6hEXBi2EccWeNt5snoNQhGetACn";
const URL = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${API_KEY}`;

const container = document.getElementById("books-container");
const errorDiv = document.getElementById("error-message");

async function fetchBooks() {
    try {
        const response = await fetch(URL);

        if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        displayBooks(data.results.books);

    } catch (error) {
        console.error("Error:", error);
        errorDiv.textContent = "Failed to load book data. Please try again later.";
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
            <span class="card-title">${book.title}</span>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Description:</strong> ${book.description || "No description available."}</p>
            </div>
        </div>
        `;

        container.appendChild(col);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const elems = document.querySelectorAll('.parallax');
    M.Parallax.init(elems);
});

fetchBooks();