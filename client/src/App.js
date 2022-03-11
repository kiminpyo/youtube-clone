
import {
  BrowserRouter,
  Route,
  Routes} from "react-router-dom";
  
  import LandingPage from './components/views/LandingPage/LandingPage'
  import LoginPage from './components/views/LoginPage/LoginPage'
  import RegisterPage from './components/views/RegisterPage/RegisterPage'
  import MainPage from './components/views/MainPage/MainPage'
  import VideoUploadPage from "./components/views/VideoUploadPage/VideoUploadPage";
  import NavBar from "./components/views/NavBar/NavBar";
  function App() {
  
    return (
/* auth  관련 null ==> 누구나 
true ==>  유저만 들어감
false ==> 유저는 못들어감 */
      <BrowserRouter>
        <NavBar/>
      <Routes>
    
      <Route exact path="/" element = {<LandingPage/> }/>
      <Route exact path="/main" element = {<MainPage/>}/>
      <Route exact path="/video/upload" element = {<VideoUploadPage/> }/>
      <Route exact path="/login" element = {<LoginPage/>}/>
      <Route exact path="/register" element = {<RegisterPage/>}/>
      
      </Routes>
      
      </BrowserRouter>
      
    );
  
  }
export default App;
