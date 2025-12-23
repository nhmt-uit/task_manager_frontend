import { Modal, Form, Input, Select } from "antd";
import { taskService } from "services/task.service";

const EditTaskModal = ({ open, onClose, task, onSuccess }) => {
  const [form] = Form.useForm();

  const submit = async () => {
    const values = await form.validateFields();
    await taskService.updateTask(task._id, values);
    onSuccess();
    onClose();
  };

  return (
    <Modal
      title="Edit Task"
      open={open}
      onOk={submit}
      onCancel={onClose}
      okText="Save"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          title: task?.title,
          status: task?.status,
        }}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="status" label="Status">
          <Select
            options={[
              { value: "todo", label: "Todo" },
              { value: "doing", label: "Doing" },
              { value: "done", label: "Done" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTaskModal;
