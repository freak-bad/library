document.addEventListener('DOMContentLoaded', function() {
    // Load profile data from localStorage
    const username = localStorage.getItem('username') || 'John Doe';
    const email = localStorage.getItem('email') || 'john.doe@example.com';
    
    // Update the profile page with the dynamic data
    const usernameElement = document.getElementById('username');
    const emailElement = document.getElementById('email');
    
    if (usernameElement) {
        usernameElement.textContent = username;
    } else {
        console.error('Username element not found');
    }
    
    if (emailElement) {
        emailElement.textContent = email;
    } else {
        console.error('Email element not found');
    }

    // Load borrowed books
    const borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    const borrowedBooksContainer = document.getElementById('borrowed-books');

    if (borrowedBooksContainer) {
        borrowedBooksContainer.innerHTML = ''; // Clear previous content
        borrowedBooks.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';

            const img = document.createElement('img');
            img.src = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : 'https://via.placeholder.com/200x300?text=No+Cover';
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
            readLink.target = '_blank'; // Opens the link in a new tab

            bookInfo.appendChild(title);
            bookInfo.appendChild(author);
            bookInfo.appendChild(readLink);

            bookCard.appendChild(img);
            bookCard.appendChild(bookInfo);

            borrowedBooksContainer.appendChild(bookCard);
        });
    } else {
        console.error('Borrowed books container not found');
    }

    // Handle profile picture upload
    document.getElementById('profile-pic-upload').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('profile-pic').src = e.target.result;
                // Save the profile picture URL to localStorage
                localStorage.setItem('profilePic', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Load profile picture from localStorage
    const profilePic = localStorage.getItem('profilePic');
    if (profilePic) {
        document.getElementById('profile-pic').src = profilePic;
    }
});
