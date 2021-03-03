import React, { createContext, useState } from 'react';
import {fbAddTask, fbGetTasks, fbUpdateTask, fbSnapshot} from '../services/firebase';


const TaskContext = createContext();
export default TaskContext;

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);


  async function getTasks() {
    await fbGetTasks().then(response => {
      setTasks(response);
    });
  };

  async function addTask(task) {
    await fbAddTask(task).then(response => {
      setTasks([response, ...tasks]);
      //todo: add the new task you just created to the tasks state
    })
  }

  async function updateTask(task) {
    await fbUpdateTask(task).then((res) => {
      //todo: update task in the local state taht was updated
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: tasks,
        getTasks,
        addTask,
        updateTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
