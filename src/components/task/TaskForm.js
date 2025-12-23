import { Form, Input, Button, Select } from "antd";
import { taskService } from "services/task.service";

const TaskForm = ({ onSuccess }) => {
  const [form] = Form.useForm();

  const submit = async (values) => {
    await taskService.createTask(values);
    form.resetFields();
    onSuccess();
  };

  return (
    <Form
      form={form}
      layout="inline"
      onFinish={submit}
      style={{ marginBottom: 16 }}
    >
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Enter task title" }]}
      >
        <Input placeholder="Task title" />
      </Form.Item>

      <Form.Item name="status" initialValue="todo">
        <Select
          options={[
            { value: "todo", label: "Todo" },
            { value: "doing", label: "Doing" },
            { value: "done", label: "Done" },
          ]}
          style={{ width: 120 }}
        />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Add
      </Button>
    </Form>
  );
};

export default TaskForm;
