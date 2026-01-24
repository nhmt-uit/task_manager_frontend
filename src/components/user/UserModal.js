// pages/users/UserModal.jsx
import { Modal, Form, Input, Select, message } from "antd";
import { userService } from "services/user.service";
import { useEffect } from "react";

export default function UserModal({ open, onClose, onSuccess, user }) {
  const [form] = Form.useForm();
  const isEditMode = !!user;

  useEffect(() => {
    if (user && open) {
      // Edit mode: populate form with user data
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else if (!user && open) {
      // Create mode: reset form
      form.resetFields();
      form.setFieldsValue({ role: "member" });
    }
  }, [user, open, form]);

  const handleSubmit = async () => {
    try {
    const values = await form.validateFields();

      if (isEditMode) {
        // Edit mode: update user (exclude password and email from update)
        await userService.updateUser(user._id, {
          name: values.name,
          role: values.role,
        });
        message.success("User updated successfully");
      } else {
        // Create mode: create new user
    await userService.createUser(values);
        message.success("User created successfully");
      }

    onSuccess();
    onClose();
      form.resetFields();
    } catch (error) {
      message.error(isEditMode ? "Failed to update user" : "Failed to create user");
      console.error("Error:", error);
    }
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={open}
      title={isEditMode ? "Edit User" : "Create User"}
      onCancel={handleClose}
      onOk={handleSubmit}
      okText={isEditMode ? "Update" : "Create"}
    >
      <Form layout="vertical" form={form}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: !isEditMode, type: "email" }]}
        >
          <Input disabled={isEditMode} />
        </Form.Item>

        {!isEditMode && (
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, min: 6 }]}
        >
          <Input.Password />
        </Form.Item>
        )}

        <Form.Item label="Role" name="role" initialValue="member">
          <Select
            options={[
              { value: "member", label: "Member" },
              { value: "admin", label: "Admin" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
