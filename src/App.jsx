import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import UserView from './components/UserView';
import { Layout,Button} from 'antd'; 

const { Header, Content } = Layout;

// Sample initial users form web server used for now but can be removed later on
const initialUsers = [
  {
    userId: 1,
    firstName: 'Mohit',
    lastName: 'Rawal',
    userName: 'rawal7',
    userType: 'Admin User',
    department: 'Frontend',
  }
];

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [nextUserId, setNextUserId] = useState(initialUsers.length+1);

  // --- CRUD Operations ---
  const addUser = (user) => {
    const newUser = { ...user, userId: nextUserId };
    setUsers([...users, newUser]);
    setNextUserId(nextUserId + 1);
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map((user) => (user.userId === updatedUser.userId ? updatedUser : user)));
  };

  const deleteUser = (userId) => {
    setUsers(users.filter((user) => user.userId !== userId));
  };

  const getUserById = (userId) => {
    return users.find(user => user.userId === Number(userId));
  };


  return (
    <Router>
      <Layout className="min-h-screen "> 
        <Header>
        <div className="mt-2 flex justify-start">
           <Button className='p-6 mt-0 m-2 bg-green-600 text-white' type="secondary">
              <Link to="/">User Management</Link>
           </Button>
        </div>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: '10px' }}> 
          <div className="p-4 bg-white rounded-lg shadow-md"> 
            <Routes>
              <Route
                path="/"
                element={<UserTable users={users} onDelete={deleteUser} />}
              />
              <Route
                path="/user/create"
                element={<UserForm onSave={addUser} mode="create" />}
              />
              <Route
                path="/user/view/:userId"
                element={<UserView getUserById={getUserById} />}
              />
              <Route
                path="/user/update/:userId"
                element={<UserForm onSave={updateUser} getUserById={getUserById} mode="update" />}
              />
            </Routes>
          </div>
        </Content>
       
      </Layout>
    </Router>
  );
}

export default App;  