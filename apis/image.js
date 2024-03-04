const { Router } = require('express');
const multer = require('multer');
const path = require('path'); // path 모듈 임포트
const { prodImg, Product } = require('../models/index');
const prodSubCategorySchema = require('../models/schemas/prodSubCategory');

const router = Router();

// 이미지를 저장할 디렉토리 설정
const storage = multer.diskStorage({
  destination: function (req, file, done) {
    done(null, path.join(__dirname, '../views/static/images/product'));
  },
  filename: function (req, file, done) {
    const ext = path.extname(file.originalname); // 파일의 확장자
    done(null, path.basename(file.originalname, ext) + ext);
  }
});

// 파일 업로드를 처리하는 미들웨어 설정
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

router.get('/upload', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../views/static/images/product/test1.webp')
  );
});

// admin 미들웨어 추가
router.post('/upload', upload.array('webImage'), (req, res, next) => {
  if (!req.files) {
    const error = new Error('파일을 추가하세요');
    return next(error);
  }
  const result = req.files.map((file) => {
    return {
      message: '파일이 저장되었습니다.',
      filename: file.filename
    };
  });
  res.json(result);
});

module.exports = router;
