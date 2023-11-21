import Token from "../models/token.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

export const isTokenBlacklisted = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    jwt.verify(token, process.env.JWT_CIPHER_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const userId = decoded.userId;

      await Token.findOneAndDelete({ userId });

      res.status(200).json({ message: "Logged out successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
