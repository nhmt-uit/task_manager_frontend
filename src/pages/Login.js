import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Card, Form, Input, Button, Typography, message } from "antd";

import { authService } from "services/auth.service";
import { useAuth } from "contexts/AuthContext";

const { Title, Text } = Typography;

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      form.setFieldsValue({
        email: location.state.email,
      });
    }
  }, [location.state, form]);

  const onFinish = async (values) => {
    try {
      const res = await authService.login(values);
      login(res.data);
      navigate("/tasks");
      setLoading(true);
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      messageApi.open({
        type: "error",
        content: message,
      });
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      {contextHolder}
      <Card style={styles.card}>
        <Title level={3} style={{ textAlign: "center" }}>
          Task Manager
        </Title>
        <Text
          type="secondary"
          style={{ display: "block", textAlign: "center", marginBottom: 24 }}
        >
          Login to continue
        </Text>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Email is not valid" },
            ]}
          >
            <Input placeholder="email@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Password is required" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              autoFocus={!!location.state?.email}
              placeholder="••••••••"
            />
          </Form.Item>

          <Form.Item shouldUpdate>
            {() => {
              const hasErrors = form
                .getFieldsError()
                .some(({ errors }) => errors.length > 0);

              const touched = form.isFieldsTouched(true);

              return (
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!touched || hasErrors}
                  loading={loading}
                  block
                >
                  Login
                </Button>
              );
            }}
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <span>{`Don't have an account?`} </span>
          <Link to="/register">Register</Link>
        </div>
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
