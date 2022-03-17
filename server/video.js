const path = require('path');
const multer = require('multer');
const express = require("express");
const router = express.Router();
const {Video} = require('./models/Video');
var ffmpeg = require('fluent-ffmpeg');

const { json } = require('express/lib/response');


let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if(ext != '.mp4') {
      return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
    }
    cb(null, true)
  }
})

const upload = multer({ storage: storage }).single('file')

    
    //=================================
    
    // Video
    
    //=================================
    
    router.post("/uploadfiles", (req, res) => {
      // 클라에서 받은 비디오를 서버에 저장
      upload(req, res, (err) => {
        if (err) {
          return res.json({ success: false, err });
        }
        console.log(res.req.file.path)
        return res.json({
          success: true,
          url: res.req.file.path,
          fileName: res.req.file.filename,
        });
      });
    });
    router.post('/uploadVideo', (req,res) => {

      const video = new Video(req.body)
      video.save((err, doc) => {
        console.log(err)
        if(err) return res.json({ success: false, err})
        res.status(200).json({ succenss: true })
      })
    })
    
    
    router.post("/thumbnail", (req, res) => {
   /*    let filePath = "";
      let fileDuration = "";
      console.log(req.body)
      // 비디오 전체 정보 추출
      ffmpeg.ffprobe(req.body.url, function (err, metadata) {
        console.dir(metadata);
        console.log(metadata.format.duration);
    
        fileDuration = metadata.format.duration;
      });
    
      //썸네일 생성, 비디오 길이 추출
      ffmpeg(req.body.url)
        .on("filenames", function (filenames) {
          console.log("Will generate " + filenames.join(", "));
    
          filePath = "uploads/thumbnails/" + filenames[0];
        })
        .on("end", function () {
          console.log("Screenshots taken");
          return res.json({
            success: true,
            url: filePath,
            fileDuration: fileDuration,
          });
        })
        .on("error", function (err) {
          console.log(err);
          return res.json({ success: false, err });
        })
        .screenshots({
          // Will take screens at 20%, 40%, 60% and 80% of the video
          count: 1,
          folder: "../uploads/thumbnails",
          size: "320x240",
          // %b input basename ( filename w/o extension )
          filename: "thumbnail-%b.png",
        }); */
    });
    module.exports = router;