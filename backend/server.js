const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const cors = require("cors");
const mainRoute = require("./routes/index.js");
const PORT = process.env.PORT || 3000;
const logger = require("morgan");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB'ye başarıyla bağlandı.");
  } catch (error) {
    console.error("MongoDB bağlantı hatası:", error.message);
    process.exit(1); // Uygulamayı hata durumunda kapat
  }
};

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cors())

app.use("/api", mainRoute);
app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
  } catch (error) {
    console.error("Sunucu başlatma hatası:", error.message);
    process.exit(1); // Uygulamayı hata durumunda kapat
  }
});
