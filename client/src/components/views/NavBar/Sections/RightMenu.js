/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../../Config'
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";


function RightMenu(props) {
  const user = useSelector(state => state.user)
    let navigate = useNavigate();
  const logoutHandler = () => {
   
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        localStorage.removeItem(response.data)
        console.log("로그아웃 완료")
        navigate("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    //로그인 안한 사람들은 여기가 렌더링
    console.log(user)
    console.log("로그인 안함")
    console.log(user.userData.error)
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="upload">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    console.log("로그인 완료")
    //로그인 한 사람들은 여기가 렌더링
    return (
      <Menu mode={props.mode}>
         <Menu.Item key="upload">
          <a href="/video/upload">Video</a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default RightMenu;