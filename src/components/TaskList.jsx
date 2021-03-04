import React, { useState, useContext } from 'react'
import TaskContext from '../contexts/Task'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import styled from 'styled-components'
import {BiCheckbox, BiCheckboxChecked} from "react-icons/bi"


function TaskList() {
  const emptyTask = {
    category: '', 
    name: '', 
    completed: false
  }
  const [newTask, setNewTask] = useState(false);
  const [task, setTask] = useState(emptyTask)
  const { tasks, addTask, updateTask } = useContext(TaskContext);

  const updateCompleted = task => {
    task.task.completed = !task.task.completed;
    updateTask(task);
    boxChecked(task);
  };

  const boxChecked = task => {
    if (task.completed) {return `<BiCheckboxChecked type="checkbox" checked={task.task.completed} onChange={() => updateCompleted(task)}/>`}
    else return `<td><BiCheckbox type="checkbox" checked={task.task.completed} onChange={() => updateCompleted(task)}/></td>`;
  }

  const saveTask = () => {
    // debugger;
    console.log(task);
    addTask(task).then(() => {
    cancelTask(/*complete the cancel task todo*/);
    setTask(...tasks);
    });
  };

  const cancelTask = () => {
    setTask(emptyTask);
    setNewTask(!newTask);
    //todo: reset the task state and hide the form
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setTask({...task, [name]: value});
    //todo: update the task state with these variables
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const Table = styled.div`
    border: 2px solid white;
    border-spacing: 5px;
    align-items: center;
    justify-content: center;
    margin-top:10%;
    margin-bottom:25%;

  `;

  const Tr = styled.tr`
    border: 1px solid white;


  `;


  return (
  <Container fluid >
      <div className="TaskList">
        <Button onClick={() => setNewTask(!newTask)}>+</Button>
        <Table>
        <thead>

          <tr border='1px solid white'>
           <th>Category</th>
            <th>Name</th>
            <th>Completed</th>
          </tr>

        </thead>

        <tbody>
          {
            newTask && (
              <tr>
                <td>
                  <input type="text" value={task.category} onChange={handleChange} name="category"/>
                </td>
                <td>
                  <input type="text" value={task.name} onChange={handleChange} name="name"/>
                </td>
                <td>
                  <button disabled={task.name.length === 0 || task.category.length === 0 ? true : false} onClick={saveTask}>save</button> <br/>
                  <button onClick={cancelTask}>cancel</button>
                </td>
              </tr>
            )
          }
          {
            tasks.map(task => (
              <tr key={task.id}>
                <td>{task.task.category}</td>
                <td>{task.task.name}</td>
                {/* <td>{boxChecked}</td> */}
                <td><input type="checkbox" checked={task.task.completed} onChange={() => updateCompleted(task)}/></td>
              </tr>
            ))
          }
        </tbody>
        </Table>
      </div>
  </Container>
  );
}


export default TaskList;
