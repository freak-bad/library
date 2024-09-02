document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    // Clear previous user data
    localStorage.removeItem('borrowedBooks');
    localStorage.removeItem('profilePic');
    localStorage.removeItem('username');
    localStorage.removeItem('email');

    const storedUser = JSON.parse(localStorage.getItem(username));

    if (storedUser && storedUser.password === password) {
        localStorage.setItem('currentUser', username); // Save the current user
        localStorage.setItem('username', username);
        localStorage.setItem('email', storedUser.email);
        window.location.href = "LIBRARY.html";
    } else {
        alert('Invalid username or password. Please try again.');
    }
});

document.getElementById('show-signup').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('login-logo').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('signup-form').style.display = 'none'; 
    document.getElementById('login-logo').style.display = 'block'; 
    document.getElementById('login-form').style.display = 'block';
});

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();

    if (username && email && password) {
        if (localStorage.getItem(username)) {
            alert('User already exists. Please log in.');
        } else {
            const user = { email: email, password: password };
            localStorage.setItem(username, JSON.stringify(user));
            alert('Signup successful! You can now log in.');

            document.getElementById('signup-form').style.display = 'none';
            document.getElementById('login-form').style.display = 'block';
            document.getElementById('login-logo').style.display = 'block';
        }
    } else {
        alert('Please fill in all fields.');
    }
});
