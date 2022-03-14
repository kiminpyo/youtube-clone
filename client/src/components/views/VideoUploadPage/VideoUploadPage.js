import TextArea from 'antd/lib/input/TextArea'
import React, {useState} from 'react'
import auth from '../../../hoc/auth'
import axios  from 'axios'
import {Typography, Button, Form, message, Input} from 'antd'
import {PlusOutlined} from'@ant-design/icons'
import Dropzone from 'react-dropzone'

  
   TextArea = Input;
const { Title} = Typography;

const PrivateOptions = [
  {value : 0 ,label: "Private"},
  {value : 1 , label : "public"}
]
const CategoryOptions = [
  { value: 0 ,label: "Film & Animation"},
  { value: 1 ,label: "Autos & Vehicles"},
  { value: 2 ,label: "Music"},
  { value: 3 ,label: "Pets & Animals"}
 
]

function VideoUploadPage() {

  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDiscription] = useState("");
  const [Private, setPrivate] = useState(0);
  const [Category ,setCategory] = useState("Film & Animation");

  //e ==>
  const onTitleChange = (e) => {
    console.log(e)
    setVideoTitle(e.currentTarget.value)

  }
  const onDiscriptionChange = (e) => {
    console.log(e)
    setDiscription(e.currentTarget.value)
  }
  const onPrivateChange = (e) => {
    console.log(e)
    setPrivate(e.currentTarget.value)
  }

  const onCategoryChange = (e) => {
    console.log(e)
    setCategory(e.currentTarget.value)
  }
  const onDrop = (files) => {

    let formData = new FormData;
    //파일보낼 때 안하면 오류생긴다.
    const config ={
    header:{'content-type' : 'multipart/form-data'}
    }
    formData.append("file", files[0])

      console.log(files)
    
      axios.post('/api/video/uploadfiles', formData, config)
    .then(response =>{
      if(response.data.success){
        console.log(response.data)
      }else{
        alert('비디오 업로드 실패')
      }
    })
  }




  return (
    <div style={{maxWidth: '700px', margin: '2rem auto'}}>
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
            <Title level={2}>Upload Video</Title>
        </div>
          <Form onSubmit>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              {/* Drop zone */}
            
                    <Dropzone
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={1000000}
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
                <img src alt/>
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
              onChange={onDiscriptionChange}
              value={Description}
          />
          <br/>
          <br/>

          <select onChange={onPrivateChange}>
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
          <Button type="primary" size="large" onClick>
              Submit
          </Button>
          </Form>
    </div>
  )
}
//다른 파일에서도 이용할 수 있게
export default auth (VideoUploadPage, true)