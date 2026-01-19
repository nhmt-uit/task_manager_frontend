// pages/users/UserModal.jsx
import { Modal, Form, Input, Select } from "antd";
import { userService } from "services/user.service";

export default function UserModal({ open, onClose, onSuccess }) {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    const values = await form.validateFields();
    await userService.createUser(values);
    onSuccess();
    onClose();
    form.resetFields();
  };

  return (
    <Modal
      open={open}
      title="Create User"
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Create"
    >
      <Form layout="vertical" form={form}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, min: 6 }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label="Role" name="role" initialValue="user">
          <Select
            options={[
              { value: "user", label: "User" },
              { value: "admin", label: "Admin" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
