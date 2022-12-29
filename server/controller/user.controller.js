import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { json } from "express";
import mongoose from "mongoose";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({ message: "User already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json("There is a server error");
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      res.status(400).json({ message: "The user don't exist" });
    }

    const isPasswordCrt = await bcrypt.compare(password, userExist.password);
    if (!isPasswordCrt) {
      res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { email: userExist.email, id: userExist._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: userExist, token });
  } catch (error) {
    res.status(500).json("something is worong with the server.");
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    const filteredUsersData = [];
    allUsers.forEach((user) => {
      filteredUsersData.push({
        _id: user._id,
        name: user.name,
        joinedOn: user.joinedOn,
        about: user.about,
        tags: user.tags,
      });
    });
    res.status(200).json(filteredUsersData);
  } catch (error) {
    res.status(500).json("Server error");
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    let filteredUserData = {
      _id: user._id,
      name: user.name,
      joinedOn: user.joinedOn,
      tags: user.tags,
    };

    res.status(200).json(filteredUserData);
  } catch (error) {
    res.status(500).json("Server error");
  }
};

export const postUserData = async (req, res) => {
  const {id:_id} = req.params;
  const {name, about, tags} = req.body;
  console.log(req.body);
  if (!mongoose.Types.ObjectId.isValid(_id))
    res.status(404).json("User is unavailable.");
  try {
   const userPosted = await User.findByIdAndUpdate(_id,{$set:{'name':name,'about':about,'tags':tags}},{new:true});
   res.status(200).json(userPosted);
  } catch (error) {
    res.status(500).json({message:"server error."});
  }
}

export const deleteUser = async (req, res) => {
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(404).json("User is unavailable.");

    try {
      await User.findByIdAndDelete(id);
      res.status(200).json({message:"Successfully deleted the user"})
    } catch (error) {
      res.status(500).json({message:"Server side problem"})
      
    }

}