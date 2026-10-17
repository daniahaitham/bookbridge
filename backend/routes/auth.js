// routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import db from "../configration/db.js";

const router = express.Router();

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  const { name, email, phonenum, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "name, email and password are required" });
  }
  try {
    const exists = await db.query("SELECT 1 FROM users WHERE email = $1", [email]);
    if (exists.rows.length > 0) return res.status(400).json({ message: "User already exists" });

    const hash = await bcrypt.hash(password, 10); // never store plain-text passwords
    const result = await db.query(
      `INSERT INTO users (name, email, phonenum, password)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, phonenum, is_admin, created_at`,
      [name, email, phonenum, hash]
    );
    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const user = result.rows[0];
    const isHashed = user.password.startsWith("$2");
    // Accounts created before hashing was added still have plain-text passwords:
    // accept them once, then upgrade them to a hash.
    const ok = isHashed ? await bcrypt.compare(password, user.password) : password === user.password;
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    if (!isHashed) {
      await db.query("UPDATE users SET password = $1 WHERE id = $2", [await bcrypt.hash(password, 10), user.id]);
    }

    delete user.password; // never send the password back
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
