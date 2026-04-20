const NYT_API_KEY = "oquhDOGqQbnguiBfRpV9h6hEXBi2EccWeNt5snoNQhGetACn";

const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const genreInput = document.getElementById("genre-input");
const searchBtn = document.getElementById("search-btn");
const errorMsg = document.getElementById("error-message");
const searchGrid = document.getElementById("search-results-container");
const nytGrid = document.getElementById("books-container");

const parallaxImg = document.getElementById("parallax-img");
window.addEventListener("scroll", () => {
    parallaxImg.style.transform = `translateY(${window.scrollY * 0.35}px)`;
}, { passive: true });

// --- Saved Books Helpers ---
function getSavedBooks() {
    return JSON.parse(localStorage.getItem("df-saved-books") || "[]");
}

function isBookSaved(id) {
    return getSavedBooks().some(b => b.id === id);
}

function toggleSaveBook(book) {
    const saved = getSavedBooks();
    const idx = saved.findIndex(b => b.id === book.id);
    if (idx === -1) {
        saved.push(book);
    } else {
        saved.splice(idx, 1);
    }
    localStorage.setItem("df-saved-books", JSON.stringify(saved));
}

// --- Book Card ---
function bookCard({ id, image, title, lines, bookData }) {
    const saved = isBookSaved(id);
    const encodedData = encodeURIComponent(JSON.stringify(bookData));
    return `
        <div class="book-card bg-white rounded-xl shadow overflow-hidden flex flex-col relative">
            <button
                class="bookmark-btn absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur shadow hover:scale-110 transition-transform"
                data-id="${id}"
                data-book="${encodedData}"
                aria-label="Save book"
                title="${saved ? 'Remove from My Books' : 'Save to My Books'}"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 bookmark-icon" fill="${saved ? '#7f1d1d' : 'none'}" stroke="#7f1d1d" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 3a2 2 0 0 0-2 2v16l9-4 9 4V5a2 2 0 0 0-2-2H5z"/>
                </svg>
            </button>
            <img src="${image}" alt="${title}" class="w-full h-64 object-cover bg-stone-100"
                onerror="this.src='images/placeholder.png'">
            <div class="p-4 flex flex-col gap-1">
                <p class="font-bold text-lg leading-snug pr-8" style="font-family:'Alegreya',serif">${title}</p>
                ${lines.map(l => `<p class="text-xs text-stone-600">${l}</p>`).join("")}
            </div>
        </div>`;
}

// Delegate bookmark clicks on a container
function attachBookmarkListeners(container) {
    container.addEventListener("click", e => {
        const btn = e.target.closest(".bookmark-btn");
        if (!btn) return;

        const id = btn.dataset.id;
        const bookData = JSON.parse(decodeURIComponent(btn.dataset.book));
        toggleSaveBook({ id, ...bookData });

        const nowSaved = isBookSaved(id);
        const icon = btn.querySelector(".bookmark-icon");
        icon.setAttribute("fill", nowSaved ? "#7f1d1d" : "none");
        btn.title = nowSaved ? "Remove from My Books" : "Save to My Books";

        btn.classList.add("scale-125");
        setTimeout(() => btn.classList.remove("scale-125"), 150);
    });
}

attachBookmarkListeners(searchGrid);
attachBookmarkListeners(nytGrid);

// --- Search ---
searchBtn.addEventListener("click", async () => {
    errorMsg.textContent = "";

    const params = new URLSearchParams();
    if (titleInput.value.trim())  params.set("title",   titleInput.value.trim());
    if (authorInput.value.trim()) params.set("author",  authorInput.value.trim());
    if (genreInput.value.trim())  params.set("subject", genreInput.value.trim());

    if (!params.size) {
        errorMsg.textContent = "Enter at least one search field.";
        return;
    }

    try {
        const res  = await fetch(`https://openlibrary.org/search.json?${params}`);
        const data = await res.json();

        searchGrid.innerHTML = data.docs.slice(0, 12).map(book => {
            const id = book.key || book.cover_i || book.title;
            const image = book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                : "images/placeholder.png";
            const author = book.author_name?.join(", ") ?? "Unknown";
            const year = book.first_publish_year ?? "N/A";

            return bookCard({
                id,
                image,
                title: book.title,
                lines: [
                    `<strong>Author:</strong> ${author}`,
                    `<strong>Year:</strong> ${year}`,
                ],
                bookData: { image, title: book.title, author, year, description: "" }
            });
        }).join("");
    } catch {
        errorMsg.textContent = "Error fetching search results.";
    }
});

// --- NYT Best Sellers ---
(async () => {
    try {
        const res = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${NYT_API_KEY}`);
        const data = await res.json();

        nytGrid.innerHTML = data.results.books.slice(0, 6).map(book => {
            const id = book.primary_isbn13 || book.title;
            return bookCard({
                id,
                image: book.book_image,
                title: book.title,
                lines: [
                    `<strong>Author:</strong> ${book.author}`,
                    book.description || "No description available.",
                ],
                bookData: {
                    image: book.book_image,
                    title: book.title,
                    author: book.author,
                    year: "",
                    description: book.description || ""
                }
            });
        }).join("");
    } catch {
        errorMsg.textContent = "Error fetching NYT best sellers.";
    }
})();

// --- My Books Page ---
if (document.getElementById("books-grid")) {
    const grid       = document.getElementById("books-grid");
    const emptyState = document.getElementById("empty-state");
    const bookCount  = document.getElementById("book-count");
    const clearBtn   = document.getElementById("clear-btn");

    function render() {
        const books = getSavedBooks();
        grid.innerHTML = "";

        if (books.length === 0) {
            emptyState.classList.remove("hidden");
            emptyState.classList.add("flex");
            bookCount.textContent = "";
            clearBtn.classList.add("hidden");
            return;
        }

        emptyState.classList.add("hidden");
        emptyState.classList.remove("flex");
        bookCount.textContent = `${books.length} book${books.length !== 1 ? "s" : ""} saved`;
        clearBtn.classList.remove("hidden");

        books.forEach((book, i) => {
            const card = document.createElement("div");
            card.className = "book-card bg-white rounded-xl shadow overflow-hidden flex flex-col relative fade-in";
            card.style.animationDelay = `${i * 60}ms`;
            card.innerHTML = `
                <button class="remove-btn absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur shadow hover:scale-110 transition-transform"
                    data-id="${book.id}" title="Remove from My Books" aria-label="Remove book">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="#7f1d1d" stroke="#7f1d1d" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 3a2 2 0 0 0-2 2v16l9-4 9 4V5a2 2 0 0 0-2-2H5z"/>
                    </svg>
                </button>
                <img src="${book.image}" alt="${book.title}" class="w-full h-64 object-cover bg-stone-100"
                    onerror="this.src='images/placeholder.png'">
                <div class="p-4 flex flex-col gap-1">
                    <p class="font-bold text-lg leading-snug pr-8" style="font-family:'Alegreya',serif">${book.title}</p>
                    <p class="text-xs text-stone-600"><strong>Author:</strong> ${book.author || "Unknown"}</p>
                    ${book.year ? `<p class="text-xs text-stone-600"><strong>Year:</strong> ${book.year}</p>` : ""}
                    ${book.description ? `<p class="text-xs text-stone-500 mt-1 line-clamp-3">${book.description}</p>` : ""}
                </div>
            `;
            grid.appendChild(card);
        });
    }

    grid.addEventListener("click", e => {
        const btn = e.target.closest(".remove-btn");
        if (!btn) return;
        const card = btn.closest(".book-card");
        card.style.transition = "opacity 0.2s, transform 0.2s";
        card.style.opacity = "0";
        card.style.transform = "scale(0.95)";
        setTimeout(() => {
            removeSavedBook(btn.dataset.id);
            render();
        }, 200);
    });

    clearBtn.addEventListener("click", () => {
        if (confirm("Remove all saved books?")) {
            localStorage.removeItem("df-saved-books");
            render();
        }
    });

    function removeSavedBook(id) {
        const saved = getSavedBooks().filter(b => b.id !== id);
        localStorage.setItem("df-saved-books", JSON.stringify(saved));
    }

    render();
}
