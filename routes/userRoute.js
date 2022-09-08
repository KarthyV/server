import express from "express";
import { User } from "../model/userModel.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const Users = await User.find();
    return res.status(200).send(Users);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body.values;
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      newUser.password = "";
      return res.status(201).send(newUser);
    });
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body.values;
    const user = await User.findOne({ email: email });
    console.log(user);
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        user.password = "";
        if (result) return res.status(201).send(user);
        else return res.status(200).send("Invalid Credentials");
      });
    } else {
      return res.status(200).send("Invalid Credentials");
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await User.findByIdAndUpdate({ _id: id }, req.body.values);
    return res.status(201).send(response);
  } catch (error) {
    return res.status(400).send(error);
  }
});

export default router;
