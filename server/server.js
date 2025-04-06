const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");

// 환경 변수 로드
dotenv.config();

// Express 앱 초기화
const app = express();
const PORT = 3001;

// 미들웨어 설정
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// 파일 업로드를 위한 multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB 제한
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|webp/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb(
      new Error(
        "지원되지 않는 파일 형식입니다. jpg, jpeg, png, gif, webp 형식만 가능합니다."
      )
    );
  },
});

// uploads 폴더 생성 확인
const fs = require("fs");
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// 라우트 임포트
const artRoutes = require("./routes/art");

// 라우트 설정
app.use("/api/art", artRoutes);

// 기본 라우트
app.get("/", (req, res) => {
  res.send("AI Art Curator API is running");
});

// 에러 핸들러
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "서버 에러가 발생했습니다",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
