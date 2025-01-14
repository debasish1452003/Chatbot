import { hash, compare } from "bcrypt";
import User from "../models/User.js";
// get all users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(201).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
// create new user
export const userSignUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).send("User already registered");
        }
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        user.save();
        return res
            .status(201)
            .json({ message: "User created Succesfully", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error", cause: error.message });
    }
};
// User login
export const userLogin = async (req, res, next) => {
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
        return res
            .status(201)
            .json({
            message: "Login Succesful",
            id: user._id.toString(),
            password: user.password,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=user-controllers.js.map