document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const usernameError = document.getElementById("username-error");
    const passwordError = document.getElementById("password-error");
    const apiError = document.getElementById("api-error");
    const apiSuccess = document.getElementById("api-success");

    // Regex for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Form submit event listener
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the form from submitting the traditional way

        let valid = true;

        // Reset previous error messages
        usernameError.textContent = "";
        passwordError.textContent = "";
        apiError.textContent = "";
        apiSuccess.textContent = "";

        usernameError.style.display = "none";
        passwordError.style.display = "none";
        apiError.style.display = "none";
        apiSuccess.style.display = "none";

        // Validate username/email
        if (!usernameInput.value) {
            usernameError.textContent = "Username/Email cannot be empty.";
            usernameError.style.display = "block";
            valid = false;
        } else if (!emailRegex.test(usernameInput.value)) {
            usernameError.textContent = "Please enter a valid email address.";
            usernameError.style.display = "block";
            valid = false;
        }

        // Validate password
        if (!passwordInput.value) {
            passwordError.textContent = "Password cannot be empty.";
            passwordError.style.display = "block";
            valid = false;
        } else if (passwordInput.value.length < 6) {
            passwordError.textContent = "Password must be at least 6 characters long.";
            passwordError.style.display = "block";
            valid = false;
        }

        // If form is not valid, prevent submission
        if (!valid) return;

        // If form is valid, proceed with API call
        const payload = {
            username: usernameInput.value,
            password: passwordInput.value
        };

        // Call the API using fetch
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed.');
            }
            return response.json();
        })
        .then(data => {
            // Show success message
            apiSuccess.textContent = "Login successful!";
            apiSuccess.style.display = "block";
            setTimeout(() => {
                apiSuccess.style.display = 'none';
            }, 3000);
        })
        .catch(error => {
            // Show error message
            apiError.textContent = error.message;
            apiError.style.display = "block";
            setTimeout(() => {
                apiError.style.display = 'none';
            }, 3000);
        });
    });

    
});