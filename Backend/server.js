const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// JSON file location
const usersFile = path.join(__dirname, "Data", "users.json");
const profilesFile = path.join(__dirname, "Data", "profiles.json");

// Registration API
app.post("/api/register", async (req, res) => {
    try {
        const { fullName, email, password, college, degree } = req.body;

        // Validate required fields
        if (!fullName || !email || !password || !college || !degree) {
            return res.status(400).json({
                message: "Please fill in all required fields."
            });
        }

        // Read existing users
        const users = JSON.parse(fs.readFileSync(usersFile, "utf8"));

        // Check duplicate email
        const existingUser = users.find(
            user => user.email.toLowerCase() === email.toLowerCase()
        );

        if (existingUser) {
            return res.status(409).json({
                message: "An account with this email already exists."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user object
        const newUser = {
            id: Date.now().toString(),
            fullName,
            email: email.toLowerCase(),
            password: hashedPassword,
            college,
            degree
        };

        // Save user
        users.push(newUser);
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

        res.status(201).json({
            message: "Account created successfully!",
            userId: newUser.id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error while registering user."
        });
    }
});

// Save student profile API
app.post("/api/profiles", (req, res) => {
    try {
        const {
            userId,
            degree,
            year,
            specialization,
            interests,
            skills,
            experience
        } = req.body;

        // Validate required information
        if (
            !userId ||
            !degree ||
            !year ||
            !Array.isArray(interests) ||
            interests.length === 0 ||
            !Array.isArray(skills) ||
            skills.length === 0 ||
            !experience
        ) {
            return res.status(400).json({
                message: "Please complete all required profile fields."
            });
        }

        // Read existing profiles
        const profiles = JSON.parse(
            fs.readFileSync(profilesFile, "utf8")
        );

        // Check whether profile already exists
        const existingProfile = profiles.find(
            profile => profile.userId === userId
        );

        if (existingProfile) {
            return res.status(409).json({
                message: "Profile already exists for this user."
            });
        }

        // Create profile
        const newProfile = {
            id: Date.now().toString(),
            userId,
            degree,
            year,
            specialization,
            interests,
            skills,
            experience
        };

        // Save profile in JSON file
        profiles.push(newProfile);

        fs.writeFileSync(
            profilesFile,
            JSON.stringify(profiles, null, 2)
        );

        res.status(201).json({
            message: "Profile saved successfully!"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error saving profile."
        });
    }
});

// Login API
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter email and password."
            });
        }

        // Read registered users
        const users = JSON.parse(
            fs.readFileSync(usersFile, "utf8")
        );

        // Find user by email
        const user = users.find(
            u => u.email.toLowerCase() === email.toLowerCase()
        );

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        // Compare entered password with saved hash
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        // Check whether user has completed their profile
        const profiles = JSON.parse(
            fs.readFileSync(profilesFile, "utf8")
        );

        const hasProfile = profiles.some(
            profile => profile.userId === user.id
        );

        res.status(200).json({
            message: "Login successful!",
            userId: user.id,
            hasProfile: hasProfile
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error during login."
        });
    }
});

// Get student profile API
app.get("/api/profiles/:userId", (req, res) => {
    try {
        const userId = req.params.userId;

        // Read saved profiles
        const profiles = JSON.parse(
            fs.readFileSync(profilesFile, "utf8")
        );

        // Find profile using user ID
        const profile = profiles.find(
            p => p.userId === userId
        );

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found."
            });
        }

        // Return student profile
        res.status(200).json(profile);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error fetching profile."
        });
    }
});

// Test route
app.get("/", (req, res) => {
    res.send("Career Campus Backend is Running!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
