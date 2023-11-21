import User from "../models/login.model.js";
import Token from "../models/token.model.js";
import { isTokenBlacklisted } from "../Middlewares/tokenBlacklist.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailPattern.test(email);
  };

  if (username.length > 25)
    return res
      .status(401)
      .json({ message: "Invalid username max 25 characters" });

  if (!isValidEmail(email))
    return res.status(401).json({ message: "Invalid email" });

  const user = new User({
    username,
    email,
    password,
  });
  try {
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email === 1) {
      res.status(400).json({ error: "Email address is already in use." });
    } else {
      console.log(error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const existingToken = await Token.findOne({ userId: user._id });

    if (existingToken) {
      await Token.findByIdAndDelete(existingToken._id);
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_CIPHER_KEY, {
      expiresIn: "1h",
    });

    await Token.create({ userId: user._id, token });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout =
  (isTokenBlacklisted,
  (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    blacklist.add(token);

    res.status(200).json({ message: "Logged out successfully" });
  });
