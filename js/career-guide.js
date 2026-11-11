
// ==========================================
// 1. GET HTML ELEMENTS
// ==========================================

const searchInput = document.getElementById("career-search");
const categorySelect = document.getElementById("career-category");
const searchForm = document.querySelector(".career-search");
const careerCards = document.querySelectorAll(".career-card");
const noResults = document.getElementById("no-results");
const careerSections = document.querySelectorAll(".featured-career");

// ==========================================
// 2. CAREER SEARCH AND CATEGORY FILTER
// ==========================================

function filterCareers() {
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedCategory = categorySelect.value;

    let visibleCount = 0;

    careerCards.forEach(function (card) {
        const careerName = card.querySelector("h3").textContent.toLowerCase();
        const careerDescription = card.querySelector("p").textContent.toLowerCase();
        const cardCategory = card.dataset.category;

        const matchesSearch =
            careerName.includes(searchText) ||
            careerDescription.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            cardCategory === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.hidden = false;
            visibleCount++;
        } else {
            card.hidden = true;
        }
    });

    noResults.hidden = visibleCount !== 0;
}

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    filterCareers();

    document.getElementById("career-paths").scrollIntoView({
        behavior: "smooth"
    });
});

searchInput.addEventListener("input", filterCareers);
categorySelect.addEventListener("change", filterCareers);

// ==========================================
// 3. SHOW SELECTED CAREER SECTION
// ==========================================

// ==========================================
// 3. SHOW SELECTED CAREER + UPDATE ROADMAP
// ==========================================

const careerRoadmapData = {
    "software-developer": [
        ["Foundations", "HTML, CSS, Logic"],
        ["Programming", "Python, Java"],
        ["Data Structures", "Arrays, Trees, Graphs"],
        ["Databases", "SQL, ORMs"],
        ["Development", "Frameworks, APIs"],
        ["Projects", "Portfolio work"]
    ],

    "full-stack-developer": [
        ["Foundations", "HTML, CSS, Logic"],
        ["HTML & CSS", "Layouts, Styling"],
        ["JavaScript", "DOM, Events, ES6"],
        ["Frontend", "React, UI Design"],
        ["Backend", "Node.js, APIs, SQL"],
        ["Projects", "Full-stack Applications"]
    ],

    "data-analyst": [
        ["Foundations", "Logic, Basic Statistics"],
        ["Excel", "Formulas, Spreadsheets"],
        ["SQL", "Queries, Joins"],
        ["Python", "Pandas, NumPy"],
        ["Visualization", "Power BI, Tableau"],
        ["Projects", "Data Analysis Portfolio"]
    ],

    "ai-ml-engineer": [
        ["Foundations", "Programming, Logic"],
        ["Python", "Python Fundamentals"],
        ["Mathematics", "Statistics, Algebra"],
        ["Data Analysis", "NumPy, Pandas"],
        ["Machine Learning", "Models, Algorithms"],
        ["Projects", "AI/ML Applications"]
    ],

    "cybersecurity": [
        ["Foundations", "Computer Basics"],
        ["Networking", "Networks, Protocols"],
        ["Linux", "Commands, Systems"],
        ["Security Basics", "Cryptography, Security"],
        ["Ethical Hacking", "Testing, Vulnerabilities"],
        ["Projects", "Security Labs"]
    ],

    "cloud-engineer": [
        ["Foundations", "Programming, Logic"],
        ["Linux", "Commands, Administration"],
        ["Networking", "TCP/IP, DNS"],
        ["Cloud Basics", "AWS, Azure"],
        ["Containers", "Docker, Deployment"],
        ["Projects", "Cloud Applications"]
    ]
};

function updateCareerRoadmap(careerId) {

    const stages = careerRoadmapData[careerId];

    if (!stages) return;

    const roadmapTimeline = document.querySelector(".roadmap-timeline");
    const progressText = document.querySelector(".overall-progress > div > span");
    const progressBar = document.querySelector(".overall-track > span");

    const completedStages = 2;

    // Update six roadmap stages
    if (roadmapTimeline) {
        roadmapTimeline.innerHTML = stages.map(function (stage, index) {

            let stageClass = "";
            let number = String(index + 1).padStart(2, "0");
            let status = "";

            if (index < completedStages) {
                stageClass = "completed";
                number = "✓";
                status = "<small>Done</small>";
            } else if (index === completedStages) {
                stageClass = "current";
                status = "<small>Up next</small>";
            }

            return `
                <article class="roadmap-step ${stageClass}">
                    <span class="roadmap-number">${number}</span>
                    <h3>${stage[0]}</h3>
                    <p>${stage[1]}</p>
                    ${status}
                </article>
            `;
        }).join("");
    }

    // Update overall progress
    if (progressText) {
        progressText.textContent =
            `${completedStages} of 6 stages complete`;
    }

    if (progressBar) {
        progressBar.style.width =
            `${(completedStages / 6) * 100}%`;
    }
}

// Show selected career
function showCareer(careerId, shouldScroll = true) {

    localStorage.setItem("selectedCareer", careerId);

    careerSections.forEach(function (section) {
        section.hidden = section.id !== careerId;
    });

    // Update the roadmap for the selected career
    updateCareerRoadmap(careerId);

    const selectedCareerSection = document.getElementById(careerId);

    if (selectedCareerSection && shouldScroll) {
        selectedCareerSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

document.querySelectorAll(".career-card a[href^='#']")
    .forEach(function (link) {
        link.addEventListener("click", function (event) {
            const careerId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(careerId);

            if (targetSection && targetSection.classList.contains("featured-career")) {
                event.preventDefault();
                showCareer(careerId);
                history.replaceState(null, "", "#" + careerId);
            }
        });
    });
// ==========================================
// 4. CAREER SKILLS DATA
// ==========================================

const careerSkills = {
    "software-developer": [
        "Java", "Python", "Data Structures",
        "Algorithms", "SQL", "Git"
    ],

    "full-stack-developer": [
        "HTML", "CSS", "JavaScript", "React",
        "Node.js", "SQL", "Git"
    ],

    "data-analyst": [
        "Python", "SQL", "Excel",
        "Statistics", "Power BI", "Tableau"
    ],

    "ai-ml-engineer": [
        "Python", "Machine Learning", "Statistics",
        "NumPy", "Pandas", "Deep Learning"
    ],

    "cybersecurity": [
        "Networking", "Linux", "Python",
        "Cryptography", "Network Security", "Risk Analysis"
    ],

    "cloud-engineer": [
        "AWS", "Azure", "Linux",
        "Networking", "Docker", "Python"
    ]
};

// ==========================================
// 5. NORMALIZE SKILL NAMES
// ==========================================

function normalizeSkill(skill) {
    const aliases = {
        "cpp": "c++",
        "nodejs": "node.js",
        "ml": "machine learning"
    };

    const normalized = skill.trim().toLowerCase();

    return aliases[normalized] || normalized;
}

// ==========================================
// 6. UPDATE SKILL MATCH FOR EACH CAREER
// ==========================================

function updateCareerSkills(studentSkills) {
    const knownSkills = studentSkills.map(normalizeSkill);

    careerSections.forEach(function (section) {
        const careerId = section.id;
        const requiredSkills = careerSkills[careerId];

        if (!requiredSkills) return;

        const matchedSkills = requiredSkills.filter(function (skill) {
            return knownSkills.includes(normalizeSkill(skill));
        });

        const missingSkills = requiredSkills.filter(function (skill) {
            return !knownSkills.includes(normalizeSkill(skill));
        });

        const totalSkills = requiredSkills.length;
        const matchCount = matchedSkills.length;
        const percentage = Math.round((matchCount / totalSkills) * 100);

        // Update required skill tags
        const skillTags = section.querySelector(".skill-tags");

        if (skillTags) {
            skillTags.innerHTML = requiredSkills.map(function (skill) {
                const isKnown = knownSkills.includes(normalizeSkill(skill));

                return `<span class="${isKnown ? "skill-known" : ""}">
                    ${isKnown ? "✓ " : ""}${skill}
                </span>`;
            }).join("");
        }

        // Update skills match count and progress
        const matchHeading = section.querySelector(".match-heading span");
        const matchTrack = section.querySelector(".match-track span");
        const matchTags = section.querySelector(".match-tags");

        if (matchHeading) {
            matchHeading.textContent = `${matchCount}/${totalSkills} skills`;
        }

        if (matchTrack) {
            matchTrack.style.width = `${percentage}%`;
        }

        if (matchTags) {
            matchTags.innerHTML = matchedSkills.length
                ? matchedSkills.map(skill => `<span>✓ ${skill}</span>`).join("")
                : "<span>No matching skills yet</span>";
        }

        // Update skill gap analysis
        const gapPanel = section.querySelector(".gap-panel");

        if (gapPanel) {
            const heading = gapPanel.querySelector(".gap-panel-heading");

            gapPanel.innerHTML = "";

            gapPanel.appendChild(heading);

            missingSkills.forEach(function (skill) {
                const row = document.createElement("div");
                row.className = "gap-row";

                row.innerHTML = `
                    <div>
                        <span>${skill}</span>
                        <small>Not started</small>
                    </div>
                    <div class="gap-track">
                        <span class="gap-empty"></span>
                    </div>
                `;

                gapPanel.appendChild(row);
            });

            const footnote = document.createElement("p");
            footnote.className = "gap-footnote";
            footnote.innerHTML = missingSkills.length
                ? `Your roadmap will focus on these <strong>${missingSkills.length} missing skills</strong> to help you reach this career path.`
                : "You have all the required skills for this career path!";

            gapPanel.appendChild(footnote);
        }

        // Update skill counts
        const skillCounts = section.querySelector(".skill-counts");

        if (skillCounts) {
            const countBoxes = skillCounts.querySelectorAll("div");

            if (countBoxes.length >= 2) {
                countBoxes[0].querySelector("strong").textContent = matchCount;
                countBoxes[1].querySelector("strong").textContent = missingSkills.length;
            }
        }
    });
}

// ==========================================
// 7. FETCH STUDENT PROFILE FROM BACKEND
// ==========================================

async function loadStudentProfile() {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        console.log("No logged-in student found. Showing default career data.");
        return;
    }

    try {
        const response = await fetch(
            `http://localhost:3000/api/profiles/${encodeURIComponent(userId)}`
        );

        if (!response.ok) {
            throw new Error("Unable to fetch student profile.");
        }

        const profile = await response.json();

        if (!Array.isArray(profile.skills)) {
            throw new Error("Student skills are not available.");
        }

        updateCareerSkills(profile.skills);

        console.log("Career skill analysis updated successfully!");

    } catch (error) {
        console.error("Profile loading error:", error);
    }
}

// ==========================================
// 8. INITIAL PAGE SETUP
// ==========================================

const requestedCareer = window.location.hash.substring(1);

const savedCareer = localStorage.getItem("selectedCareer");

const validCareer = Array.from(careerSections).some(function (section) {
    return section.id === requestedCareer;
});

const validSavedCareer = Array.from(careerSections).some(function (section) {
    return section.id === savedCareer;
});

// URL career gets priority over the previously selected career
const initialCareer = validCareer
    ? requestedCareer
    : validSavedCareer
        ? savedCareer
        : "software-developer";

showCareer(initialCareer, false);

loadStudentProfile();
