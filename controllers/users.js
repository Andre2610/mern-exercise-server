import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body.data;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      res.status(404).send({ message: "User does not exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      res.status(404).send({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).send({ result: existingUser, token });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({ message: "Something went wrong." });
  }
};

export const signUp = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } =
    req.body.data;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).send({ message: "User already exists." });
    console.log(`Password: ${password}, confirm password: ${confirmPassword}`);
    if (password !== confirmPassword)
      return res.status(400).send({ message: "Passwords do not match." });

    const hashedPassword = bcrypt.hashSync(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).send({ token, result });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({ message: "Something went wrong." });
  }
};
