import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import UserView from './components/UserView';
import { Layout, Menu } from 'antd'; // For basic layout
import './App.css'; // You can add global styles here if needed

const { Header, Content } = Layout;

// Sample initial users
const initialUsers = [
  {
    userId: 1,
    firstName: 'John',
    lastName: 'Doe',
    userName: 'johndoe',
    userType: 'Admin User',
    department: 'Backend',
  },
  {
    userId: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    userName: 'janesmith',
    userType: 'System User',
    department: 'Frontend',
  },
  {
    userId: 3,
    firstName: 'Alice',
    lastName: 'Brown',
    userName: 'aliceb',
    userType: 'Admin User',
    department: 'QA',
  },
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
          <div className="logo " /> 
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/">User Management</Link>
            </Menu.Item>
          </Menu>
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