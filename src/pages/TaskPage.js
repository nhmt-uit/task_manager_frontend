import { useState } from "react";
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import Header from '../components/Header';

const TaskPage = () => {
  const [reload, setReload] = useState(false);

  return (
    <>
      <Header />
      <TaskForm onSuccess={() => setReload(!reload)} />
      <TaskList reload={reload} />
    </>
  );
};

export default TaskPage;