import { Table, Button, Space, Tag, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, EyeOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const UserTable = ({ users, onDelete }) => {
  const navigate = useNavigate();

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'User Type',
      dataIndex: 'userType',
      key: 'userType',
      render: (userType) => (
         <Tag color={userType === 'Admin User' ? 'green' : 'yellow'}>  {/* highlight color */} {/*  */} 
          {userType.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => ( 
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate(`/user/view/${record.userId}`)}
            title="View"
          />
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/user/update/${record.userId}`)}
            title="Edit"
          />
            <Button type="primary"
             danger icon={<DeleteOutlined />}
             onClick={()=> onDelete(record.userId)}
             title="Delete" />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-4 flex justify-end"> 
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/user/create')}
        >
          Add User
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="userId" 
        pagination={{ pageSize: 7 }} 
        bordered 
      />
    </div>
  );
};

export default UserTable;