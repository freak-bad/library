document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-bar').value.trim();
    if (query) {
        fetchBooks(query);
    }
});

function fetchBooks(query) {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayBooks(data.docs);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayBooks(books) {
    // Hide the existing book grid
    document.querySelector('.book-grid').style.display = 'none';

    // Clear any previous search results
    const searchResultsContainer = document.getElementById('search-results');
    if (searchResultsContainer) {
        searchResultsContainer.innerHTML = '';
        searchResultsContainer.style.display = 'grid'; // Show the search results container
    }

    // Create book cards for each search result
    books.forEach(book => {
        if (book.cover_i) { // Only include books with cover images
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';

            const img = document.createElement('img');
            img.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
            img.alt = book.title;

            const bookInfo = document.createElement('div');
            bookInfo.className = 'book-info';

            const title = document.createElement('p');
            title.textContent = book.title;

            const author = document.createElement('p');
            author.textContent = book.author_name ? book.author_name.join(', ') : 'Unknown Author';

            const readLink = document.createElement('a');
            readLink.href = `https://openlibrary.org${book.key}`;
            readLink.textContent = 'Read Book';

            const borrowButton = document.createElement('button');
            borrowButton.className = 'borrow-button';

            // Set button text based on stored state
            const borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
            const isBorrowed = borrowedBooks.some(b => b.key === book.key);
            borrowButton.textContent = isBorrowed ? 'Borrowed' : 'Borrow';

            borrowButton.addEventListener('click', function() {
                const borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
                if (borrowButton.textContent === 'Borrow') {
                    borrowButton.textContent = 'Borrowed';
                    borrowedBooks.push({
                        key: book.key,
                        title: book.title,
                        author_name: book.author_name,
                        cover_i: book.cover_i
                    });
                } else {
                    borrowButton.textContent = 'Borrow';
                    const index = borrowedBooks.findIndex(b => b.key === book.key);
                    if (index > -1) {
                        borrowedBooks.splice(index, 1);
                    }
                }
                localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
            });

            bookInfo.appendChild(title);
            bookInfo.appendChild(author);
            bookInfo.appendChild(readLink);
            bookInfo.appendChild(borrowButton);

            bookCard.appendChild(img);
            bookCard.appendChild(bookInfo);

            searchResultsContainer.appendChild(bookCard);
        }
    });
}

// Logout functionality
document.getElementById('logout-button').addEventListener('click', function() {
    // Clear current user data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('borrowedBooks');
    localStorage.removeItem('profilePic');
    localStorage.removeItem('username');
    localStorage.removeItem('email');

    // Redirect to login page
    window.location.href = "index.html";
});