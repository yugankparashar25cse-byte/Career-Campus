const skillsForm = document.getElementById("skills-form");

let isProfileSubmitting = false;
let isRedirecting = false;
skillsForm.addEventListener("submit", async function (event) {
    event.preventDefault();
   
    console.log("SUBMIT HANDLER STARTED");
    console.log("Default prevented:", event.defaultPrevented);

    if (isProfileSubmitting) return;

    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("User information not found. Please create an account first.");
        window.location.href = "login.html#signup";
        return;
    }

    const degree = document.getElementById("degree").value.trim();
    const year = document.getElementById("year").value;
    const specialization = document.getElementById("specialization").value.trim();

    const interests = Array.from(
        document.querySelectorAll('input[name="interest"]:checked')
    ).map(input => input.value);

    const skills = Array.from(
        document.querySelectorAll('input[name="skill"]:checked')
    ).map(input => input.value);

    const experienceInput = document.querySelector(
        'input[name="experience"]:checked'
    );

    const experience = experienceInput ? experienceInput.value : "";

    if (!degree || !year || interests.length === 0 ||
        skills.length === 0 || !experience) {
        alert("Please complete all required fields and select at least one interest and skill.");
        return;
    }

    const profileData = {
        userId,
        degree,
        year,
        specialization,
        interests,
        skills,
        experience
    };

    const submitButton = skillsForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    isProfileSubmitting = true;
    submitButton.disabled = true;
    submitButton.textContent = "Saving Profile...";

    try {
        const response = await fetch(
            "http://localhost:3000/api/profiles",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(profileData)
            }
        );

        const result = await response.json();

        if (!response.ok) {
            alert(result.message);
            return;
        }

      console.log("Profile saved successfully!");

isRedirecting = true;

console.log("Opening Career Guide now...");

window.location.href = "http://localhost:5500/career-guide.html";

return;

} catch (error) {
    console.error("Profile submission error:", error);
    alert("Unable to connect to the server. Please try again.");

} finally {
    isProfileSubmitting = false;

    if (!isRedirecting) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
}
});