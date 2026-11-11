// CREATE ACCOUNT FORM
const signupForm = document.querySelector(".signup-form");

let isSignupSubmitting = false;

signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Prevent multiple submissions
    if (isSignupSubmitting) return;

    // Get form values
    const fullName = document.getElementById("full-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const college = collegeSelect.value === "Other"
    ? otherCollege.value.trim()
    : collegeSelect.value;

const degree = degreeSelect.value === "Other"
    ? otherDegree.value.trim()
    : degreeSelect.value;

    // Check password length
    if (password.length < 8) {
        alert("Password must contain at least 8 characters.");
        return;
    }

    // Check password confirmation
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Prepare registration data
    const userData = {
        fullName,
        email,
        password,
        college,
        degree
    };

    const submitButton = signupForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    // Disable button during submission
    isSignupSubmitting = true;
    submitButton.disabled = true;
    submitButton.textContent = "Creating Account...";

    try {
        const response = await fetch(
            "http://localhost:3000/api/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            }
        );

        const result = await response.json();

        if (!response.ok) {
            alert(result.message);
            return;
        }

        console.log("Registration successful!");

        // Save registered user ID
        localStorage.setItem("userId", result.userId);

        // Open profile setup
        window.location.replace("about-your-skills.html");

    } catch (error) {
        console.error("Registration error:", error);
        alert("Unable to connect to the server. Please try again.");

    } finally {
        // Restore button if submission fails or page stays open
        isSignupSubmitting = false;
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
});
// LOGIN FORM
const loginForm = document.querySelector(".login-view .auth-form");

let isLoginSubmitting = false;

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Prevent multiple submissions
    if (isLoginSubmitting) return;

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    // Validate fields
    if (!email || !password) {
        alert("Please enter your email and password.");
        return;
    }

    const submitButton = loginForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    // Disable button during login
    isLoginSubmitting = true;
    submitButton.disabled = true;
    submitButton.textContent = "Logging In...";

    try {
        const response = await fetch(
            "http://localhost:3000/api/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            alert(result.message);
            return;
        }

        localStorage.setItem("userId", result.userId);

        if (result.hasProfile) {
            window.location.replace("career-guide.html");
        } else {
            window.location.replace("about-your-skills.html");
        }

    } catch (error) {
        console.error("Login error:", error);
        alert("Unable to connect to the server. Please try again.");

    } finally {
        isLoginSubmitting = false;
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
});
// Show and Hide Password
const passwordToggles = document.querySelectorAll(".eye-icon");

passwordToggles.forEach(function (button) {
    button.addEventListener("click", function () {
        const input = document.getElementById(
            button.getAttribute("data-target")
        );

        const isHidden = input.type === "password";

        input.type = isHidden ? "text" : "password";

        button.innerHTML = isHidden
            ? `<svg viewBox="0 0 24 24" width="19" height="19"
                 fill="none" stroke="currentColor" stroke-width="1.8"
                 stroke-linecap="round" stroke-linejoin="round">
                 <path d="M3 3l18 18"/>
                 <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"/>
                 <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c6.4 0 10 7 10 7a16 16 0 0 1-3 3.8"/>
                 <path d="M6.2 6.2C3.5 8 2 12 2 12s3.6 7 10 7c1 0 2-.2 2.9-.5"/>
               </svg>`
            : `<svg viewBox="0 0 24 24" width="19" height="19"
                 fill="none" stroke="currentColor" stroke-width="1.8"
                 stroke-linecap="round" stroke-linejoin="round">
                 <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/>
                 <circle cx="12" cy="12" r="3"/>
               </svg>`;

        button.setAttribute(
            "aria-label",
            isHidden ? "Hide password" : "Show password"
        );
    });
});
// Other College and Degree fields
const collegeSelect = document.getElementById("college");
const degreeSelect = document.getElementById("degree");

const otherCollege = document.getElementById("other-college");
const otherDegree = document.getElementById("other-degree");

// Show or hide Other College input
collegeSelect.addEventListener("change", function () {
    if (collegeSelect.value === "Other") {
        otherCollege.classList.add("visible");
        otherCollege.required = true;
    } else {
        otherCollege.classList.remove("visible");
        otherCollege.required = false;
        otherCollege.value = "";
    }
});

// Show or hide Other Degree input
degreeSelect.addEventListener("change", function () {
    if (degreeSelect.value === "Other") {
        otherDegree.classList.add("visible");
        otherDegree.required = true;
    } else {
        otherDegree.classList.remove("visible");
        otherDegree.required = false;
        otherDegree.value = "";
    }
});