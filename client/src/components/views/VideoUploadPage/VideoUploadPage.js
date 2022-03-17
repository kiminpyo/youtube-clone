import React, {useState} from 'react'
import auth from '../../../hoc/auth'
import axios  from 'axios'
import {Typography, Button, Form,  Input} from 'antd'
import {PlusOutlined} from'@ant-design/icons'
import Dropzone from 'react-dropzone'
import { useSelector } from 'react-redux'
  
const {TextArea} = Input;
const { Title} = Typography;

const PrivateOptions = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

const CategoryOptions = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Funny things" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" },
  { value: 4, label: "Daily Life" },
];

function VideoUploadPage() {
  const user = useSelector(state => state.user)
  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Privacy, setPrivacy] = useState(0);
  const [Category, setCategory] = useState("Film & Animation");

  const onTitleChange = (e) => {
    console.log(e)
    setVideoTitle(e.currentTarget.value);
  };

  const onDescriptionChange = (e) => {
    console.log(e)
    setDescription(e.currentTarget.value);
  };

  const onPrivacyChange = (e) => {
    console.log(e)
    setPrivacy(e.currentTarget.value);
  };

  const onCategoryChange = (e) => {
    console.log(e)
    setCategory(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
      const variables = {
      writer: user.userData._id,
       title: VideoTitle,
      description: Description,
      privacy: Privacy,
      category: Category 
    }
     axios.post('/api/video/uploadVideo', variables)
     .then((response) =>{

      if(response.data.success){
          console.log('업로드 완료')
          console.log(response.data)
      }else{
        alert('비디오 업로드 실패')
      }
     })
  }

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    console.log(files);

    axios.post("/api/video/uploadfiles", formData, config).then((response) => {
      if (response.data.success) {
        console.log(response.data);

       /*  axios.post("/api/video/thumbnail", variable).then((response) => {
          if (response.data.success) {
            console.log(response.data);
             setDuration(response.data.fileDuration);
            setThumbnailPath(response.data.url); 
          } else { 
            alert("썸네일 생성에 실패 했습니다.");
          }
        }); */
      } else {
        alert("비디오 업로드를 실패 했습니다.");
      }
    });
  };

 

return (
    <div style={{maxWidth: '700px', margin: '2rem auto'}}>
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
            <Title level={2}>Upload Video</Title>
        </div>
          <Form onSubmit={onSubmit}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              {/* Drop zone */}
            
              <Dropzone
            onDrop={onDrop}
            multiple={false} //한번에 파일을 2개이상올릴껀지
            maxSize={1000000000} //최대사이즈 조절
          >
                    {({ getRootProps, getInputProps}) => (
                        <div style={{ width: '300px', height: '240px', border: '1px solid lightgray',
                        alignItems: 'center', justifyContent: 'center',display:'flex'}} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <PlusOutlined  
                            style={{fontSize: '3rem', }}/>
                            
                        </div>
                    )}

                    </Dropzone>
            
              {/* Tumbnail */}
              <div>
                {/* <img src alt/> */}
              </div>
            </div>
          <br/>
          <br/>
          <label>Title</label>
          <Input
            onChange={onTitleChange}
            value={VideoTitle}
          />
          <br/>
          <br/>
          <label>Description</label>
          <TextArea
              onChange={onDescriptionChange}
              value={Description}
          />
          <br/>
          <br/>

          <select onChange={onPrivacyChange}>
          {PrivateOptions.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))}
        </select>

          <br/>
          <br/>
          <select onChange={onCategoryChange}>
                {CategoryOptions.map((item, index) =>(
                  <option key={index} value={item.value}>{item.label}</option>

                ))}
          </select>
          
          <br/>
          <br/>
          <Button type="primary" size="large" onClick={onSubmit}>
              Submit
          </Button>
          </Form>
    </div>
  )
}
//다른 파일에서도 이용할 수 있게
export default auth (VideoUploadPage,  null)