const path = require('path');
const multer = require('multer');
const express = require("express");
const router = express.Router();


let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    console.log(file.mimetype);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    if (ext !== '.jpg') {
      console.log('it is not jpg');
      return cb(new Error('only jpg is allowed'), false);
    }
    cb(null, true);
  },
}).single('file');
    
    //=================================
    
    // Video
    
    //=================================
    
    router.post("/uploadfiles", (req, res) => {
    
     upload(req, res, err => {
     if (err) {   
     return res.json({ success: false, err })
     } 
     else{
     return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
     }
     })
    });

    module.exports = router;