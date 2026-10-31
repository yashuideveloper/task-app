import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  const exisitingUser = await User.findOne({ email })
  if (exisitingUser) {
    return res.status(409).json({ message: "Email already registered" });
  }

  // store the new user in the database
  const newUser = await User.create({
    username,
    email,
    password,
  });

  res.status(201).json({
  message: "User registered successfully",
  user: {
    id: newUser._id,
    username: newUser.username,
    email: newUser.email,
  },
});
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({email}).select("+password"); // Include password in the query result

    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ message: "Login successful", token, user: { id: user._id, username: user.username, email: user.email }});
};

export {
  registerUser,
  loginUser,
};