import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Invalid credentials" });
  }
};

//Token Authentication
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//register User

const registerUser = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    //Checking is user already registered
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "user already registered" });
    }
    //Validating email format and strong password

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "please enter a valid email",
      });
    }

    if (password.length < 4) {
      return res.json({
        success: false,
        message: "password must be at least 5 characters",
      });
    }

    //Hassing password
    // const salt = await bcrypt.genSalt(10);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new userModel({
      name: name,
      email: email, //name and email Getting from req.body
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };
