const express = require("express");
const router = express.Router();

// Diğer rota dosyalarını içe aktarıyoruz
const userRoute = require("./users.js");
const reviewRoute = require("./reviews.js");
const authRoute = require("./auth.js");
// Her rotayı ilgili yol altında kullanıyoruz
router.use("/users", userRoute);
router.use("/reviews", reviewRoute);
router.use("/auth", authRoute);


module.exports = router;