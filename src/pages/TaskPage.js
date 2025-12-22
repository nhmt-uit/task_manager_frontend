import { useState } from 'react';
import TaskForm from '../components/task/TaskForm';
import TaskList from '../components/task/TaskList';

const TaskPage = () => {
  const [reload, setReload] = useState(false);

  return (
    <>
      <TaskForm onSuccess={() => setReload(!reload)} />
      <TaskList reload={reload} />
    </>
  );
};

export default TaskPage;
