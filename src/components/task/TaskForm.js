import { useState } from 'react';
import { taskService } from 'services/task.service';

const TaskForm = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await taskService.createTask({ title, description });
    setTitle('');
    setDescription('');
    onSuccess();
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button>Add Task</button>
    </form>
  );
};

export default TaskForm;