const multer = require("multer");
// const path = require("path");

// const upload = multer({
//   storage: multer.diskStorage({
//     //파일이 저장될 경로
//     destination(req, file, callback) {
//       callback(null, "uploads/");
//     },
//     //같은 이름의 이미지 중복 업로드시 오류 발생을 피하기 위하여, 파일명을 유일하게 만들어 줌

//     filename(req, file, callback) {
//       const ext = path.extname(file.originalname);

//       const timestamp = new Date().getTime().valueOf();
//       const filename = path.basename(file.originalname, ext) + timestamp + ext;
//       callback(null, filename);
//     },
//   }),
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname.split(".");
    const ext = originalname[originalname.length - 1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
