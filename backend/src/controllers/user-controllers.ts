import { Request, Response, NextFunction } from "express";
import { hash, compare } from "bcrypt";
import User from "../models/User.js";
import { rmSync } from "fs";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

// get all users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(201).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

// create new user
export const userSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).send("User already registered");
    }

    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    user.save();

    // Create token and store cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    return res
      .status(201)
      .json({ message: "User created Succesfully", id: user._id.toString() });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error", cause: error.message });
  }
};

// User login
export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not registered");
    }

    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(403).send("Incorrect Id or Password");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({
      message: "Login Succesful",
      id: user._id.toString(),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
