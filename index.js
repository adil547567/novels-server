const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// إعداد تخزين الملفات
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// رفع الروايات
app.post("/upload", upload.single("novel"), (req, res) => {
  if (!req.file) return res.status(400).send("لم يتم رفع أي ملف.");
  res.send({ link: `https://novels-server.vercel.app/uploads/${req.file.filename}` });
});

// عرض الروايات
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => console.log(`السيرفر يعمل على المنفذ ${PORT}`));
