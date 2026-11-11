// ==========================================
// 1. GET SELECTED CAREER
// ==========================================

const selectedCareer =
    localStorage.getItem("selectedCareer") || "software-developer";

// ==========================================
// 2. PROJECT DATA FOR ALL SIX CAREERS
// ==========================================

const careerProjects = {
    "software-developer": [
        {
            icon: "♧",
            level: "Intermediate",
            title: "Student Management System",
            description: "Build an application to manage student records, grades and academic information using a database.",
            skills: ["Java", "SQL", "OOP"]
        },
        {
            icon: "▣",
            level: "Beginner",
            title: "Personal Portfolio Website",
            description: "Create a portfolio website to showcase your skills, projects and professional profile.",
            skills: ["HTML", "CSS", "JavaScript"]
        },
        {
            icon: "</>",
            level: "Intermediate",
            title: "Task Management Application",
            description: "Develop a task manager that allows users to create, update and track their tasks.",
            skills: ["JavaScript", "Node.js", "SQL"]
        }
    ],

    "full-stack-developer": [
        {
            icon: "</>",
            level: "Beginner",
            title: "Personal Portfolio Website",
            description: "Build a responsive portfolio with a frontend interface and a contact form.",
            skills: ["HTML", "CSS", "JavaScript"]
        },
        {
            icon: "▣",
            level: "Intermediate",
            title: "Task Management Application",
            description: "Create a full-stack task manager with user login and task management features.",
            skills: ["JavaScript", "Node.js", "MongoDB"]
        },
        {
            icon: "♧",
            level: "Advanced",
            title: "Student Portal",
            description: "Develop a student portal with authentication, profile management and academic records.",
            skills: ["React", "Node.js", "SQL"]
        }
    ],

    "data-analyst": [
        {
            icon: "▤",
            level: "Beginner",
            title: "Student Performance Analysis",
            description: "Analyze student marks and attendance to identify performance trends.",
            skills: ["Python", "Pandas", "Excel"]
        },
        {
            icon: "▦",
            level: "Intermediate",
            title: "Sales Data Dashboard",
            description: "Create an interactive dashboard to explore sales, revenue and business trends.",
            skills: ["Power BI", "SQL", "Excel"]
        },
        {
            icon: "⌕",
            level: "Intermediate",
            title: "Customer Data Analysis",
            description: "Explore customer data and identify patterns that can support business decisions.",
            skills: ["Python", "Statistics", "Tableau"]
        }
    ],

    "ai-ml-engineer": [
        {
            icon: "⌕",
            level: "Beginner",
            title: "House Price Prediction",
            description: "Build a machine learning model that predicts house prices using available data.",
            skills: ["Python", "Pandas", "NumPy"]
        },
        {
            icon: "▣",
            level: "Intermediate",
            title: "Spam Email Classifier",
            description: "Train a model to classify emails as spam or genuine messages.",
            skills: ["Python", "Machine Learning", "Statistics"]
        },
        {
            icon: "✧",
            level: "Advanced",
            title: "Image Classification System",
            description: "Develop a model that identifies and classifies images into different categories.",
            skills: ["Python", "Deep Learning", "NumPy"]
        }
    ],

    "cybersecurity": [
        {
            icon: "▣",
            level: "Beginner",
            title: "Password Strength Checker",
            description: "Create a tool that evaluates password strength using security rules.",
            skills: ["Python", "Cryptography"]
        },
        {
            icon: "⌕",
            level: "Intermediate",
            title: "Network Traffic Analyzer",
            description: "Study network traffic and identify unusual communication patterns.",
            skills: ["Networking", "Python", "Linux"]
        },
        {
            icon: "♧",
            level: "Advanced",
            title: "File Integrity Monitor",
            description: "Build a tool that detects unexpected changes to important files.",
            skills: ["Python", "Linux", "Cryptography"]
        }
    ],

    "cloud-engineer": [
        {
            icon: "☁",
            level: "Beginner",
            title: "Cloud Portfolio Hosting",
            description: "Deploy a personal portfolio website using a cloud hosting platform.",
            skills: ["AWS", "HTML", "CSS"]
        },
        {
            icon: "▣",
            level: "Intermediate",
            title: "Dockerized Web Application",
            description: "Package a web application into containers for easier deployment.",
            skills: ["Docker", "Linux", "Networking"]
        },
        {
            icon: "☁",
            level: "Advanced",
            title: "Cloud Backup System",
            description: "Create a cloud-based system to store and manage backup files.",
            skills: ["AWS", "Python", "Azure"]
        }
    ]
};

// ==========================================
// 3. DISPLAY PROJECTS FOR SELECTED CAREER
// ==========================================

const projectsGrid = document.querySelector(".projects-grid");

const projects = careerProjects[selectedCareer] ||
                 careerProjects["software-developer"];

if (projectsGrid) {
    projectsGrid.innerHTML = projects.map(function (project) {

        const levelClass = project.level.toLowerCase();

        const githubSearch = "https://github.com/search?q=" +
            encodeURIComponent(project.title) + "&type=repositories";

        return `
            <article class="project-card">

                <div class="project-card-top">
                    <span class="project-icon" aria-hidden="true">
                        ${project.icon}
                    </span>

                    <span class="level ${levelClass}">
                        ${project.level}
                    </span>
                </div>

                <h3>${project.title}</h3>

                <p>${project.description}</p>

                <div class="project-skills">
                    ${project.skills.map(function (skill) {
                        return `<span>${skill}</span>`;
                    }).join("")}
                </div>

                <a href="${githubSearch}"
                   target="_blank"
                   rel="noopener noreferrer">
                    Explore Project <span>→</span>
                </a>

            </article>
        `;
    }).join("");
}

console.log("Projects updated for:", selectedCareer);

// ----------------------------------
// DYNAMIC LEARNING RESOURCES
// ----------------------------------

const careerResources = {
    "software-developer": [
        { icon: "📚", title: "Data Structures", description: "Learn arrays, linked lists, stacks, queues and algorithms.", type: "Documentation", url: "https://www.geeksforgeeks.org/data-structures/" },
        { icon: "☕", title: "Java Programming", description: "Learn Java fundamentals and object-oriented programming.", type: "Official Guide", url: "https://dev.java/learn/" },
        { icon: "🗄️", title: "SQL", description: "Practice SQL queries and database fundamentals.", type: "Interactive Tutorial", url: "https://sqlbolt.com/" },
        { icon: "💻", title: "Git & GitHub", description: "Learn version control and manage your coding projects.", type: "Documentation", url: "https://docs.github.com/en/get-started" }
    ],

    "full-stack-developer": [
        { icon: "🌐", title: "HTML & CSS", description: "Learn website structure, styling and layouts.", type: "Learning Guide", url: "https://developer.mozilla.org/en-US/docs/Learn" },
        { icon: "⚡", title: "JavaScript", description: "Understand JavaScript programming and DOM manipulation.", type: "Official Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
        { icon: "⚛️", title: "React", description: "Build interactive user interfaces using React.", type: "Official Tutorial", url: "https://react.dev/learn" },
        { icon: "🟢", title: "Node.js", description: "Learn server-side JavaScript development.", type: "Official Guide", url: "https://nodejs.org/en/learn" }
    ],

    "data-analyst": [
        { icon: "🐍", title: "Python", description: "Learn Python programming for data analysis.", type: "Official Tutorial", url: "https://docs.python.org/3/tutorial/" },
        { icon: "🗄️", title: "SQL", description: "Practice database queries and data retrieval.", type: "Interactive Tutorial", url: "https://sqlbolt.com/" },
        { icon: "📊", title: "Microsoft Excel", description: "Improve spreadsheet, formula and data analysis skills.", type: "Learning Guide", url: "https://support.microsoft.com/en-us/excel" },
        { icon: "📈", title: "Power BI", description: "Learn data visualization and interactive dashboards.", type: "Learning Path", url: "https://learn.microsoft.com/en-us/training/powerplatform/power-bi" }
    ],

    "ai-ml-engineer": [
        { icon: "🐍", title: "Python", description: "Build a strong foundation in Python programming.", type: "Official Tutorial", url: "https://docs.python.org/3/tutorial/" },
        { icon: "🔢", title: "NumPy", description: "Learn numerical computing and array operations.", type: "Official Guide", url: "https://numpy.org/learn/" },
        { icon: "🐼", title: "Pandas", description: "Learn data manipulation and analysis.", type: "Official Guide", url: "https://pandas.pydata.org/docs/getting_started/index.html" },
        { icon: "🤖", title: "Machine Learning", description: "Understand machine learning concepts and models.", type: "Free Course", url: "https://developers.google.com/machine-learning/crash-course" }
    ],

    "cybersecurity": [
        { icon: "🌐", title: "Networking", description: "Understand networking fundamentals and security.", type: "Learning Platform", url: "https://skillsforall.com/" },
        { icon: "🐧", title: "Linux", description: "Learn Linux commands and operating system basics.", type: "Interactive Guide", url: "https://linuxjourney.com/" },
        { icon: "🔐", title: "Cryptography", description: "Explore secure storage and cryptographic practices.", type: "Security Guide", url: "https://cheatsheetseries.owasp.org/" },
        { icon: "🛡️", title: "Network Security", description: "Understand common web security risks and protection.", type: "Security Guide", url: "https://owasp.org/" }
    ],

    "cloud-engineer": [
        { icon: "☁️", title: "AWS", description: "Learn cloud computing through AWS training.", type: "Learning Platform", url: "https://skillbuilder.aws/" },
        { icon: "🔷", title: "Microsoft Azure", description: "Explore cloud services and Azure fundamentals.", type: "Learning Path", url: "https://learn.microsoft.com/en-us/training/azure/" },
        { icon: "🐳", title: "Docker", description: "Learn containerization and application deployment.", type: "Official Guide", url: "https://docs.docker.com/get-started/" },
        { icon: "🐧", title: "Linux", description: "Understand Linux commands and server management.", type: "Interactive Guide", url: "https://linuxjourney.com/" }
    ]
};

// Get selected career resources
const selectedResources = careerResources[selectedCareer] || careerResources["software-developer"];

// Update resource heading
const alignmentLabel = document.querySelector(".alignment-label");

if (alignmentLabel) {
    const careerName = selectedCareer
        .replaceAll("-", " ")
        .replace(/\b\w/g, letter => letter.toUpperCase());

    alignmentLabel.textContent = `Aligned with ${careerName} path`;
}

// Display resources
const resourcesPanel = document.querySelector(".resources-panel");

if (resourcesPanel) {
    resourcesPanel.innerHTML = "";

    selectedResources.forEach(resource => {
        const resourceItem = document.createElement("div");
        resourceItem.className = "resource-item";

        resourceItem.innerHTML = `
            <div class="resource-icon">${resource.icon}</div>

            <div class="resource-copy">
                <h3>${resource.title}</h3>
                <p>${resource.description}</p>
                <span class="resource-type">${resource.type}</span>
            </div>

            <a href="${resource.url}" target="_blank" rel="noopener noreferrer">
                Explore
            </a>
        `;

        resourcesPanel.appendChild(resourceItem);
    });
}

// ----------------------------------
// DYNAMIC CAREER ROADMAP
// ----------------------------------

const careerRoadmaps = {
    "software-developer": {
        stages: ["Foundations", "Programming", "Data Structures", "Databases", "Development", "Projects"],
        shortStages: ["Found.", "Prog.", "Data S.", "DB", "Dev", "Projects"],
        next: "Data Structures",
        completed: 2
    },

    "full-stack-developer": {
        stages: ["Foundations", "HTML & CSS", "JavaScript", "Frontend", "Backend", "Projects"],
        shortStages: ["Found.", "HTML/CSS", "JS", "Frontend", "Backend", "Projects"],
        next: "JavaScript",
        completed: 2
    },

    "data-analyst": {
        stages: ["Foundations", "Excel", "SQL", "Python", "Visualization", "Projects"],
        shortStages: ["Found.", "Excel", "SQL", "Python", "Visuals", "Projects"],
        next: "SQL",
        completed: 2
    },

    "ai-ml-engineer": {
        stages: ["Foundations", "Python", "Mathematics", "Data Analysis", "Machine Learning", "Projects"],
        shortStages: ["Found.", "Python", "Maths", "Data", "ML", "Projects"],
        next: "Mathematics",
        completed: 2
    },

    "cybersecurity": {
        stages: ["Foundations", "Networking", "Linux", "Security Basics", "Ethical Hacking", "Projects"],
        shortStages: ["Found.", "Network", "Linux", "Security", "Hacking", "Projects"],
        next: "Networking",
        completed: 2
    },

    "cloud-engineer": {
        stages: ["Foundations", "Linux", "Networking", "Cloud Basics", "Docker", "Projects"],
        shortStages: ["Found.", "Linux", "Network", "Cloud", "Docker", "Projects"],
        next: "Linux",
        completed: 2
    }
};

// Get selected career roadmap
const roadmap = careerRoadmaps[selectedCareer] || careerRoadmaps["software-developer"];

const roadmapFeature = document.querySelector(".roadmap-feature");
const roadmapChecklist = document.querySelector(".roadmap-checklist");

if (roadmapFeature && roadmapChecklist) {

    // Update next recommended focus
    const focusText = roadmapFeature.querySelector("p");

    if (focusText) {
        focusText.innerHTML =
            `Your next recommended focus is <strong>${roadmap.next}.</strong> Building this skill will unlock the next stage of your roadmap.`;
    }

    // Update progress count
    const progressCount = roadmapFeature.querySelector(".progress-label strong");

    if (progressCount) {
        progressCount.textContent = `${roadmap.completed} of 6 stages`;
    }

    // Update progress bar
    const progressBar = roadmapFeature.querySelector(".roadmap-progress span");

    if (progressBar) {
        progressBar.style.width = `${(roadmap.completed / 6) * 100}%`;
    }

    // Update mini stages
    const miniStages = roadmapFeature.querySelector(".mini-stages");

    if (miniStages) {
        miniStages.innerHTML = roadmap.shortStages
            .map(stage => `<span>${stage}</span>`)
            .join("");
    }

    // Update roadmap title
    const careerTitle = selectedCareer
        .replaceAll("-", " ")
        .replace(/\b\w/g, letter => letter.toUpperCase());

    const checklistTitle = roadmapChecklist.querySelector("h2");

    if (checklistTitle) {
        checklistTitle.textContent = `${careerTitle} Path`;
    }

    // Update checklist stages
    const checklist = roadmapChecklist.querySelector("ul");

    if (checklist) {
        checklist.innerHTML = roadmap.stages.map((stage, index) => {
            let statusClass = "pending";
            let statusIcon = "";
            let statusText = "";

            if (index < roadmap.completed) {
                statusClass = "done";
                statusIcon = "✓";
                statusText = '<span class="status-label done-label">Done</span>';
            } else if (index === roadmap.completed) {
                statusClass = "up-next";
                statusIcon = "•";
                statusText = '<span class="status-label next-label">Up next</span>';
            }

            return `
                <li class="${statusClass}">
                    <span class="status-dot">${statusIcon}</span>
                    <strong>${stage}</strong>
                    ${statusText}
                </li>
            `;
        }).join("");
    }
}
