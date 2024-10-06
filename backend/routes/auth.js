const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");

const generateRandomAvatar = () => {
  const randomAvatar = Math.floor(Math.random() * 71);
  return `https://i.pravatar.cc/300?img=${randomAvatar}`;
};
// Kullanıcı oluşturma (Create - Register)
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, avatar } = req.body;
    const defaultAvatar = generateRandomAvatar();
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      return res.status(400).json({
        error: "Aynı e-posta zaten kullanılıyor.",
      });
    }
    myavatar = avatar;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (myavatar===""){
      myavatar=defaultAvatar
    }
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar: myavatar,
    });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error.",
    });
  }
});

// Kullınıcı girişi (Login)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(401).json({
        error: "Invalid email.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid password.",
      });
    }
    res.status(200).json({
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
      avatar: user.avatar,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error.",
    });
  }
});

// Kullanıcı bilgilerini güncelleme (Update - PUT)
// Kullanıcı bilgilerini güncelleme (Update - PUT)
router.put("/update/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı." });
    }

    user.sucsribe = "true"; // sucsribe alanını true olarak ayarlıyoruz

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});


module.exports = router;
