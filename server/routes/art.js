const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const artController = require("../controllers/artController");

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

// 이미지 업로드 및 분석 요청
router.post("/analyze", upload.single("image"), artController.analyzeArtwork);

// Base64 이미지 데이터로 분석 요청
router.post("/analyze-base64", artController.analyzeArtworkBase64);

module.exports = router;
