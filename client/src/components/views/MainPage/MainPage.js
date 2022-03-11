import React from 'react'
import { useNavigate} from 'react-router-dom'
function MainPage() {
    let Navigate = useNavigate();
    
    const OnClickHandler = () => {
        Navigate('/login');
    }

  return (

    
    <div>
    
        <div>
            <button 
            onClick={OnClickHandler}>로그인
            </button>
        </div>
  

    </div>
  )
    
}

export default MainPage