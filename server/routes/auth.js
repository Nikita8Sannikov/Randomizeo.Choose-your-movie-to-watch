import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import User from "../models/User.js";
import finalConfig from "../config/index.js";
const router = Router();
const jwtSecret = finalConfig.jwtSecret;

// /api/auth/register
router.post(
	"/register",
	[
		check("email", "Invalid email").isEmail(),
		check("password", "Password must be at least 6 characters").isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(400).json({
					errors: errors.array(),
					message: "Invalid registration data",
				});
				return;
			}

			const { email, password, name } = req.body;
			console.log(email, password, name);

			const candidate = await User.findOne({ email });

			if (candidate) {
				res.status(400).json({ message: "This user already exists" });
				return;
			}

			const hashPassword = await bcrypt.hash(password, 12);

			const user = new User({
				name,
				email,
				password: hashPassword,
			});

			await user.save();

			res.status(201).json({ message: "User created" });
		} catch (e) {
			res.status(500).json({ message: "Smth wrong, try again" });
		}
	}
);

// /api/auth/login
router.post(
	"/login",
	[
		// check("email", "Correct email required").normalizeEmail().isEmail(),
		check("email", "Correct email required").isEmail(),
		check("password", "Password required").exists(),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(400).json({
					errors: errors.array(),
					message: "Invalid login data",
				});
				return;
			}
			const { email, password } = req.body;

			const user = await User.findOne({ email });

			if (!user) {
				res.status(404).json({ message: "User not found" });
				return;
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				res.status(400).json({ message: "Wrong password" });
				return;
			}

			const token = jwt.sign({ userId: user.id }, jwtSecret, {
				expiresIn: "1h",
			});

			res.cookie("auth_token", token, {
				httpOnly: true,
				sameSite: "none",
				secure: true,
				maxAge: 3600000,
				partitioned: true, // позволяет браузеру сохранять third-party cookies (куки с другого домена) в изолированном контексте.
			});
				res.status(200).json({
					_id: user.id,
					email: user.email,
					name: user.name,
					avatar: user.avatar,
					films: user.films,
					watched: user.watched
				});
		} catch (e) {
			res.status(500).json({ message: "Smth wrong, try again" });
		}
	}
);

// /api/auth/logout
router.post("/logout", async (req, res) => {
	try {
		res.clearCookie("auth_token", {
			httpOnly: true,
			sameSite: "none",
			secure: true,
		});
		res.status(200).json({ message: "Logout successful" });
	} catch (e) {
		res.status(500).json({ message: "Smth wrong, try again" });
	}
});

// /api/auth/me
router.get("/me", async (req, res) => {
	try {
		const token = req.cookies.auth_token;
		if (!token) {
			return res.status(401).json({ message: "No token provided" });
		}

		const decoded = jwt.verify(token, jwtSecret);
		const userId = decoded.userId;

		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.status(200).json(user);
	} catch (e) {
		console.error("Error in /me:", e);
		res.status(500).json({
			message: "Smth wrong, try again",
			error: e.message,
		});
	}
});

export default router;
