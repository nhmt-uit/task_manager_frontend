import { Form, Input, Button, Select, Row, Col, Typography, Space } from "antd";
import { PlusOutlined, FileTextOutlined } from "@ant-design/icons";
import { taskService } from "services/task.service";

const { Text } = Typography;

const TaskForm = ({ onSuccess }) => {
  const [form] = Form.useForm();

  const submit = async (values) => {
    await taskService.createTask(values);
    form.resetFields();
    onSuccess();
  };

  return (
    <div style={{ padding: "8px" }}>
    <Form
      form={form}
        layout="vertical"
      onFinish={submit}
        size="large"
    >
        <Row gutter={16}>
          <Col xs={24} sm={12} lg={8}>
      <Form.Item
        name="title"
              label={
                <Space>
                  <FileTextOutlined style={{ color: "#1890ff" }} />
                  <Text strong>Task Title</Text>
                </Space>
              }
              rules={[
                { required: true, message: "Please enter a task title" },
                { min: 3, message: "Title must be at least 3 characters" }
              ]}
      >
              <Input
                placeholder="Enter your task title..."
                style={{ borderRadius: "6px" }}
              />
      </Form.Item>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Form.Item
              name="status"
              label={
                <Space>
                  <span style={{ color: "#52c41a" }}>●</span>
                  <Text strong>Initial Status</Text>
                </Space>
              }
              initialValue="todo"
            >
        <Select
                placeholder="Select status"
                style={{ borderRadius: "6px" }}
          options={[
                  {
                    value: "todo",
                    label: (
                      <Space>
                        <span style={{ color: "#8c8c8c" }}>●</span>
                        To Do
                      </Space>
                    )
                  },
                  {
                    value: "doing",
                    label: (
                      <Space>
                        <span style={{ color: "#1890ff" }}>●</span>
                        Doing
                      </Space>
                    )
                  },
                  {
                    value: "done",
                    label: (
                      <Space>
                        <span style={{ color: "#52c41a" }}>●</span>
                        Done
                      </Space>
                    )
                  },
                ]}
        />
      </Form.Item>
          </Col>

          <Col xs={24} lg={8}>
            <Form.Item label=" " colon={false}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                icon={<PlusOutlined />}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  fontWeight: "600"
                }}
                block
              >
                Create Task
      </Button>
            </Form.Item>
          </Col>
        </Row>
    </Form>
    </div>
  );
};

export default TaskForm;
