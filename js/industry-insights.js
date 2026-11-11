
document.addEventListener("DOMContentLoaded", function () {

    const skillItems = document.querySelectorAll(".skills-cloud > span");
    const roleCards = document.querySelectorAll(".role-card");
    const rolesSection = document.querySelector("#career-roles");

    // Career roles associated with each skill
    const skillCareerMap = {
        "artificial intelligence": ["AI / ML Engineer"],
        "data analytics": ["Data Analyst", "AI / ML Engineer"],
        "cloud computing": ["Cloud Engineer"],
        "cybersecurity": ["Cybersecurity Analyst"],
        "python": ["Software Developer", "Data Analyst", "AI / ML Engineer"],
        "java": ["Software Developer"],
        "sql": ["Data Analyst"],
        "git & github": ["Software Developer"],
        "ui/ux design": ["UX/UI Designer"],
        "communication": []
    };

    // Add a message above career roles
    const filterMessage = document.createElement("p");
    filterMessage.id = "skill-filter-message";
    filterMessage.textContent = "Select a skill above to explore related career roles.";

    if (rolesSection) {
        const heading = rolesSection.querySelector(".section-heading");
        heading.insertAdjacentElement("afterend", filterMessage);
    }

    // Make skills clickable
    skillItems.forEach(function (skillItem) {

        skillItem.style.cursor = "pointer";
        skillItem.setAttribute("tabindex", "0");
        skillItem.setAttribute("role", "button");
        skillItem.setAttribute("aria-pressed", "false");

        function selectSkill() {

            const skillName = skillItem.childNodes[0].textContent.trim().toLowerCase();
            const relatedRoles = skillCareerMap[skillName] || [];

            // Reset all skills
            skillItems.forEach(function (item) {
                item.style.outline = "";
                item.setAttribute("aria-pressed", "false");
            });

            // Highlight selected skill
            skillItem.style.outline = "2px solid #c9a45c";
            skillItem.setAttribute("aria-pressed", "true");

            let visibleCount = 0;

            // Filter career roles
            roleCards.forEach(function (card) {

                const roleName = card.querySelector("h3").textContent.trim();

                const matches = relatedRoles.includes(roleName);

                card.hidden = !matches;

                if (matches) visibleCount++;
            });

            // Update message
            if (filterMessage) {
                filterMessage.textContent = visibleCount
                    ? `${skillItem.childNodes[0].textContent.trim()} is used in ${visibleCount} career role(s).`
                    : `No matching career roles are currently listed for ${skillItem.childNodes[0].textContent.trim()}.`;
            }

            // Scroll to career roles
            rolesSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        skillItem.addEventListener("click", selectSkill);

        skillItem.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                selectSkill();
            }
        });
    });

    // Reset button
    const resetButton = document.createElement("button");
    resetButton.textContent = "Show All Career Roles";
    resetButton.type = "button";
    resetButton.style.cssText =
        "margin-top:12px;padding:9px 14px;border:1px solid #c9a45c;border-radius:4px;background:#fff;color:#0b2032;cursor:pointer;font-size:12px;";

    if (rolesSection) {
        filterMessage.insertAdjacentElement("afterend", resetButton);
    }

    resetButton.addEventListener("click", function () {

        roleCards.forEach(card => card.hidden = false);

        skillItems.forEach(item => {
            item.style.outline = "";
            item.setAttribute("aria-pressed", "false");
        });

        filterMessage.textContent =
            "Select a skill above to explore related career roles.";
    });

    console.log("Industry Insights JavaScript connected successfully!");
});

// Read Insight functionality
document.querySelectorAll(".read-insight").forEach(function (link) {

    link.addEventListener("click", function (event) {
        event.preventDefault();

        const insightType = this.dataset.insight;

        const insights = {
            ai: {
                title: "AI is Transforming Work",
                message: "Artificial Intelligence is changing how companies build products, analyze information and automate tasks. Learning AI concepts and tools can help students prepare for emerging career opportunities."
            },

            skills: {
                title: "Skills Are Becoming More Important",
                message: "Employers value practical skills, problem-solving, adaptability and continuous learning alongside academic qualifications. Building and demonstrating your skills can improve your career readiness."
            },

            projects: {
                title: "Projects Build Career Readiness",
                message: "Practical projects help students apply their knowledge, develop portfolios and demonstrate real-world problem-solving abilities. A strong project portfolio can support job and internship applications."
            }
        };

        const selectedInsight = insights[insightType];

        if (selectedInsight) {
            alert(
                selectedInsight.title + "\n\n" +
                selectedInsight.message
            );
        }
    });

});
