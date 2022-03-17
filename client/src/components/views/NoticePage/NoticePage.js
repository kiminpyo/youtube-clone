import React from 'react'
import auth from '../../../hoc/auth'
import {Table } from 'antd'
function NoticePage() {
    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ];
      
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
      ];
  return (
    <div>NoticePage
      
        <React.Fragment>
        <Table 
        dataSource={dataSource} columns={columns} />;
        </React.Fragment>
    </div>
  )
}

export default NoticePage
