const express = require('express')
const app = express();
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const {auth} = require('./middleware/auth');
const {User} = require("./models/User");
/* const {Video} = require('../server/models/Video'); */
const { Router } = require('express');
const multer = require('multer'); 

//storage multer config
const storage = multer.diskStorage({

    destination: (req, file, cb) => {  
     cb(null, 'uploads/')   
     },    
    filename: (req, file, cb) => {   
     cb(null, `${Date.now()}_${file.originalname}`)   
     }
    })

    const fileFilter = (req, file, cb) => {
     // mime type 체크하여 원하는 타입만 필터링
      if (file.mimetype == 'video/mp4' ) {
     cb(null, true); 
     } else { 
     cb({msg:'mp4 파일만 업로드 가능합니다.'}, false);
     } 
    
    
    
    }
    
    
    
    const upload = multer({ storage: storage, fileFilter: fileFilter }).single("file")
    
//video

Router.post('/api/video/uploadfiles', (req,res) =>{

   //클라이언트에서 받는 비디오 서버에 저장.
   upload(req,res, err => {
       if(err) {
           return res.json({success: false, err})
       }
       return res.json({ success: true, url: res.req.file.path,
         fileName: res.req.file.filename})
   })
})

module.exports = router;