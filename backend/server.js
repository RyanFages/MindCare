const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();
const User = require("./collections/User");
const Journal = require("./collections/journal");
const Eval = require("./collections/Eval");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
});

const findUserByEmail = async (email) => {
    const normalizedEmail = String(email || "")
        .trim()
        .toLowerCase();
    if (!normalizedEmail) return null;
    return User.findOne({ email: normalizedEmail });
};

app.post("/api/auth/signup", async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res
                .status(400)
                .json({ message: "Email, mot de passe et nom requis." });
        }

        const normalizedEmail = String(email).trim().toLowerCase();
        const userName = String(name).trim();

        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res
                .status(409)
                .json({ message: "Un compte existe deja avec cet email." });
        }

        const passwordHash = await bcrypt.hash(String(password), 10);
        const newUser = await User.create({
            username: userName,
            email: normalizedEmail,
            password: passwordHash,
        });

        return res.status(201).json({
            user: {
                id: String(newUser._id),
                email: newUser.email,
                name: newUser.username,
            },
        });
    } catch (error) {
        if (error && error.code === 11000) {
            return res
                .status(409)
                .json({ message: "Un compte existe deja avec cet email." });
        }
        console.error("Erreur signup:", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
});

app.post("/api/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email et mot de passe requis." });
        }

        const normalizedEmail = String(email).trim().toLowerCase();
        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(401).json({ message: "Identifiants invalides." });
        }

        const isValidPassword = await bcrypt.compare(
            String(password),
            user.password,
        );
        if (!isValidPassword) {
            return res.status(401).json({ message: "Identifiants invalides." });
        }

        return res.json({
            user: {
                id: String(user._id),
                email: user.email,
                name: user.username,
            },
        });
    } catch (error) {
        console.error("Erreur login:", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
});

app.get("/api/journals", async (req, res) => {
    try {
        const { email } = req.query;
        const user = await findUserByEmail(email);
        if (!user) {
            return res
                .status(401)
                .json({ message: "Utilisateur introuvable." });
        }

        const entries = await Journal.find({ userId: user._id })
            .sort({ date: -1 })
            .lean();

        return res.json({
            entries: entries.map((entry) => ({
                id: String(entry._id),
                text: entry.content,
                date: entry.date,
            })),
        });
    } catch (error) {
        console.error("Erreur get journals:", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
});

app.post("/api/journals", async (req, res) => {
    try {
        const { email, text } = req.body;
        if (!email || !text) {
            return res.status(400).json({ message: "Email et texte requis." });
        }

        const user = await findUserByEmail(email);
        if (!user) {
            return res
                .status(401)
                .json({ message: "Utilisateur introuvable." });
        }

        const trimmedText = String(text).trim();
        if (!trimmedText) {
            return res.status(400).json({ message: "Texte invalide." });
        }

        const created = await Journal.create({
            userId: user._id,
            title: trimmedText.slice(0, 60),
            content: trimmedText,
        });

        return res.status(201).json({
            entry: {
                id: String(created._id),
                text: created.content,
                date: created.date,
            },
        });
    } catch (error) {
        console.error("Erreur create journal:", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
});

app.delete("/api/journals/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.query;

        const user = await findUserByEmail(email);
        if (!user) {
            return res
                .status(401)
                .json({ message: "Utilisateur introuvable." });
        }

        const deleted = await Journal.findOneAndDelete({
            _id: id,
            userId: user._id,
        });

        if (!deleted) {
            return res.status(404).json({ message: "Entree introuvable." });
        }

        return res.json({ ok: true });
    } catch (error) {
        console.error("Erreur delete journal:", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
});

app.get("/api/evals", async (req, res) => {
    try {
        const { email } = req.query;
        const user = await findUserByEmail(email);
        if (!user) {
            return res
                .status(401)
                .json({ message: "Utilisateur introuvable." });
        }

        const entries = await Eval.find({ userId: user._id })
            .sort({ date: -1 })
            .lean();

        return res.json({
            entries: entries.map((entry) => ({
                id: String(entry._id),
                date: entry.date,
                type: entry.type,
                concerns: Array.isArray(entry.concern) ? entry.concern : [],
            })),
        });
    } catch (error) {
        console.error("Erreur get evals:", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
});

app.post("/api/evals", async (req, res) => {
    try {
        const { email, type, concerns } = req.body;
        if (!email || !type) {
            return res.status(400).json({ message: "Email et type requis." });
        }

        const user = await findUserByEmail(email);
        if (!user) {
            return res
                .status(401)
                .json({ message: "Utilisateur introuvable." });
        }

        const created = await Eval.create({
            userId: user._id,
            concern: Array.isArray(concerns) ? concerns : [],
            type,
        });

        return res.status(201).json({
            entry: {
                id: String(created._id),
                date: created.date,
                type: created.type,
                concerns: Array.isArray(created.concern) ? created.concern : [],
            },
        });
    } catch (error) {
        console.error("Erreur create eval:", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
});

// Connexion à MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connecté à MongoDB !"))
    .catch((err) => console.error("Erreur de connexion", err));

app.listen(PORT, () => console.log(`Serveur lance sur le port ${PORT}`));
