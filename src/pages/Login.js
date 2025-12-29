import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button, Typography } from "antd";

import { authService } from 'services/auth.service';
import { useAuth } from 'contexts/AuthContext';

const { Title, Text } = Typography;

const Login = () => {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async () => {
    // e.preventDefault();
    try {
      const res = await authService.login({ email, password });
      login(res.data.token);
      navigate('/tasks');
    } catch {
      setError('Login failed');
    }
  };

 return (
    <div style={styles.wrapper}>
      <Card style={styles.card}>
        <Title level={3} style={{ textAlign: "center" }}>
          Task Manager
        </Title>
        <Text type="secondary" style={{ display: "block", textAlign: "center", marginBottom: 24 }}>
          Login to continue
        </Text>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email" }]}
          >
            <Input placeholder="email@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fa",
  },
  card: {
    width: 360,
    borderRadius: 8,
  },
};

export default Login;
