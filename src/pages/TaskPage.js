import { Card } from "antd";
import TaskForm from "components/task/TaskForm";
import TaskList from "components/task/TaskList";
import { useState } from "react";

const TaskPage = () => {
  const [reload, setReload] = useState(false);

  return (
    <Card title="My Tasks">
      <TaskForm onSuccess={() => setReload(!reload)} />
      <TaskList reload={reload} />
    </Card>
  );
};

export default TaskPage;
