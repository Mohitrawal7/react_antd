import  { useEffect, useState } from 'react';
import {Space,Form, Input, Button, Select, Card, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
const { Option } = Select;
const { Title } = Typography;
const layout = {
labelCol: { span: 8 }, 
wrapperCol: { span: 20 },
};
const tailLayout = {
wrapperCol: { offset: 6, span: 16 }, 
};
const UserForm = ({ onSave, getUserById, mode }) => {
const [form] = Form.useForm(); 
const navigate = useNavigate();
const { userId } = useParams(); 
const [loading, setLoading] = useState(false);
const isUpdateMode = mode === 'update';
const pageTitle = isUpdateMode ? 'Update User' : 'Create New User';
useEffect(() => {
if (isUpdateMode && userId) {
const userToUpdate = getUserById(userId);
if (userToUpdate) {
form.setFieldsValue(userToUpdate); 
} else {
console.error("User not found for update:", userId);
navigate('/');
}
} else {
form.resetFields();
}
}, [isUpdateMode, userId, getUserById, form, navigate]);
const onFinish = async (values) => {
setLoading(true);
await new Promise(resolve => setTimeout(resolve, 500));
if (isUpdateMode) {
  onSave({ ...values, userId: parseInt(userId, 10) }); 
} else {
  onSave(values); 
}
setLoading(false);
navigate('/');

};
const onFinishFailed = (errorInfo) => {
console.log('Failed:', errorInfo);
};
return (
<Card className='m-2 p-7' title={<Title level={2}>{pageTitle}</Title>}>
<Form
{...layout}
form={form}
name="user_form"
onFinish={onFinish}
onFinishFailed={onFinishFailed}
className="max-w-xl mx-auto "
>
<Form.Item
label="First Name"
name="firstName"

>
<Input />
</Form.Item>
<Form.Item
      label="Last Name"
      name="lastName"
      
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="User Name"
      name="userName"
      
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="User Type"
      name="userType"
    >
      <Select placeholder="Select a user type">
        <Option value="Admin User">Admin User</Option>
        <Option value="System User">System User</Option>
      </Select>
    </Form.Item>

    <Form.Item
      label="Department"
      name="department"
    >
      <Select placeholder="Select a department">
        <Option value="Frontend">Frontend</Option>
        <Option value="Backend">Backend</Option>
        <Option value="QA">QA</Option>
        <Option value="Marketing">Marketing</Option>
      </Select>
    </Form.Item>

    <Form.Item {...tailLayout}>
      <Space>
        <Button className='hover:bg-black bg-green-600' type="primary" htmlType="submit" loading={loading}>
          {isUpdateMode ? 'Update User' : 'Create User'}
        </Button>
        <Button  htmlType="button" onClick={() => navigate('/')}>
          Cancel
        </Button>       
      </Space>
    </Form.Item>
  </Form>
</Card>

);
};
export default UserForm;
