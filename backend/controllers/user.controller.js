const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const register = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existUser = await User.findOne({ username });
    if (existUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      password: passwordHash
    });

    await newUser.save();

    res.status(201).json({ message: "User Registered" });

  } catch (e) {
    res.status(500).json({ message: `Error: ${e}` });
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Password incorrect" });
    }

    const token = crypto.randomBytes(10).toString('hex');
    user.token = token;
    await user.save();
    res.status(200).json({
      token: user.token,
      username: user.username,
      name: user.name
    });




  } catch (e) {
    res.status(500).json({ message: `Error: ${e}` });
  }
}

module.exports = { register, login };
