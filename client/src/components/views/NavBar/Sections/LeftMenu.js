import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item 
     key="mail">
      <a href="/notice">소통 창구</a>
    </Menu.Item>
    <Menu.Item 
     key="upload">
      <a href="/video/upload">업로드</a>
    </Menu.Item>
    <SubMenu key="sub" title={<span> <a href="/news">기술 뉴스</a></span>}>
      <MenuItemGroup title="Item 1">
        <Menu.Item >Option 1</Menu.Item>
        <Menu.Item >Option 2</Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="Item 2">
        <Menu.Item >Option 3</Menu.Item>
        <Menu.Item >Option 4</Menu.Item> 
      </MenuItemGroup>
    </SubMenu>
  </Menu>
  )
}

export default LeftMenu