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
      <Alert className='my-28 mx-10` p-4'
        message="Error"
        description="User not found."
        type="error"
        showIcon
        action={
          <Button className='' size="small" type="primary" onClick={() => navigate('/')}>
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

  //same but for department
   const departmentDisplay = (
    <span className={user.department === 'Frontend' ||user.department==='Backend' ? 'text-red-600 font-semibold' : 'text-blue-600 font-semibold'}>
      {user.department}
    </span>
  );

  return (
    <Card className='m-2 p-7 w-full flex-col'
      title={
         <Title className='mt-2 mr-4 sm:text-lg whitespace-normal break-words font-semibold truncate' level={3}>
          User Details: {user.firstName} {user.lastName}
          </Title>
            }
      extra={
        <Button  className=' sm:mb-0 sm:mt-0 mt-20 mb-4 text-base bg-green-600 text-white' 
        onClick={() => navigate('/')}
        >
          Back to List
        </Button>
             }
    >
      <Descriptions className='mt-2' bordered column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs:1  }}>
        <Descriptions.Item label="User ID">{user.userId}</Descriptions.Item>
        <Descriptions.Item label="User Name">{user.userName}</Descriptions.Item>
        <Descriptions.Item label="First Name">{user.firstName}</Descriptions.Item>
        <Descriptions.Item label="Last Name">{user.lastName}</Descriptions.Item>
        <Descriptions.Item label="User Type" >{userTypeDisplay}</Descriptions.Item>
        <Descriptions.Item label="Department" >{departmentDisplay}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default UserView;