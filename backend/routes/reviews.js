const express = require("express");
const router = express.Router();

// Tüm ürünleri getirme (Read- All)
router.get("/", async (req, res)=> {
    res.send("Yorumlar getirildi!");
})


module.exports = router;