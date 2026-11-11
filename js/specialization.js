
const degreeSelect = document.getElementById("degree");
const specializationSelect = document.getElementById("specialization");

const specializationOptions = {
    "B.Tech": [
        "Computer Science",
        "Artificial Intelligence and Machine Learning",
        "Data Science",
        "Cybersecurity",
        "Information Technology",
        "Electronics and Communication",
        "Mechanical Engineering"
    ],

    "B.E": [
        "Computer Science",
        "Artificial Intelligence",
        "Data Science",
        "Information Technology",
        "Electronics and Communication",
        "Mechanical Engineering"
    ],

    "BCA": [
        "Computer Applications",
        "Software Development",
        "Data Science",
        "Cybersecurity",
        "Web Development"
    ],

    "B.Sc": [
        "Computer Science",
        "Mathematics",
        "Statistics",
        "Physics",
        "Information Technology"
    ],

    "MCA": [
        "Computer Applications",
        "Software Development",
        "Artificial Intelligence",
        "Data Science",
        "Cybersecurity"
    ],

    "M.Tech": [
        "Computer Science",
        "Artificial Intelligence and Machine Learning",
        "Data Science",
        "Cybersecurity",
        "Software Engineering"
    ],

    "Other": [
        "General",
        "Other"
    ]
};

degreeSelect.addEventListener("change", function () {

    const selectedDegree = degreeSelect.value;

    // Clear previous specialization options
    specializationSelect.innerHTML = "";

    if (selectedDegree === "") {
        specializationSelect.disabled = true;

        specializationSelect.add(
            new Option("Select degree first", "")
        );

        return;
    }

    // Add the default option
    specializationSelect.add(
        new Option("Select your specialization", "")
    );

    // Get specializations for selected degree
    const options = specializationOptions[selectedDegree] || [];

    // Add specialization options
    options.forEach(function (specialization) {
        specializationSelect.add(
            new Option(specialization, specialization)
        );
    });

    specializationSelect.disabled = false;
});
