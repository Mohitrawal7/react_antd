import { useEffect, useState } from 'react';
import { Descriptions, Card, Button, Spin, Alert, Typography } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';


const { Title } = Typography;

const UserView = ({ getUserById }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchedUser = getUserById(userId);
    if (fetchedUser) {
      setUser(fetchedUser);
    }
    setTimeout(() => setLoading(false), 300);
  }, [userId, getUserById]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64"> 
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return (
      <Alert
        message="Error"
        description="User not found."
        type="error"
        showIcon
        action={
          <Button size="small" type="primary" onClick={() => navigate('/')}>
            Back to List
          </Button>
        }
      />
    );
  }

  const userTypeDisplay = (
    <span className={user.userType === 'Admin User' ? 'text-green-600 font-semibold' : 'text-yellow-600 font-semibold'}>
      {user.userType}
    </span>
  );


  return (
    <Card className='m-20 p-3'
      title={<Title level={4}>User Details: {user.firstName} {user.lastName}</Title>}
      extra={
        <Button  className='ml-2' onClick={() => navigate('/')}>
          Back to List
        </Button>
      }
    >
      <Descriptions bordered column={{ xxl: 1, xl: 1, lg: 2, md: 1, sm: 1, xs: 1 }}>
        <Descriptions.Item label="User ID">{user.userId}</Descriptions.Item>
        <Descriptions.Item label="User Name">{user.userName}</Descriptions.Item>
        <Descriptions.Item label="First Name">{user.firstName}</Descriptions.Item>
        <Descriptions.Item label="Last Name">{user.lastName}</Descriptions.Item>
        <Descriptions.Item label="User Type" >{userTypeDisplay}</Descriptions.Item>
        <Descriptions.Item label="Department" >{user.department}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default UserView;