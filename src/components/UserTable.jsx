import { Table, Button, Space } from 'antd';
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
         <span className={userType === 'Admin User' ? 'text-green-600' : 'text-yellow-500'}> 
          {userType.toUpperCase()}
        </span>
      ),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      render: (department) => (
         <span className={department === 'Frontend' ||department==='Backend' ? 'text-red-700' : 'text-blue-700'}> 
          {department}
        </span>
      ),
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
            <Button  
             type="primary"
             danger icon={<DeleteOutlined />}
             onClick={()=> onDelete(record.userId)}
             title="Delete" />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-4 m-8 flex justify-end"> 
        <Button
        className='bg-green-600'
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
        pagination={{ pageSize: 1 }} 
        bordered 
      />
    </div>
  );
};

export default UserTable;