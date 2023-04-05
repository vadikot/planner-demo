import React from 'react';
import TaskList from '~/components/Task/ui/TaskList';
import CreateTaskForm from '~/components/Task/ui/CreateTaskForm';

const TaskPage = () => (
    <div>
        <h1 style={{ textAlign: 'center' }}>Task page</h1>
        <CreateTaskForm />
        <TaskList />
    </div>
);

export default TaskPage;
