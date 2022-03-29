import { useState, useContext } from 'react'
import TaskService from '../../services/task-service'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { TodoContext } from "../../context/todo-context";

export default function AddItem() {
    const { addTodoItem } = useContext(TodoContext);
    const [task, setTask] = useState({ name: '' })

    async function addTask(event) {
        event.preventDefault()
        try {
            const newTask = await TaskService.addTask(task)
            setTask({ name: '' })
            addTodoItem(newTask.data)
        } catch (e) {
            console.log(e.statusText); // how to handle error?
        }
    }

    function taskChangeHandler(event) {
        const { name, value } = event.target
        setTask((prevState) => ({ ...prevState, [name]: value }))
    }

    return (       
        <form autoComplete="off" onSubmit={addTask}>
            <Box sx={{ m: 3, display: 'flex', flexWrap: 'wrap' }}>
                <TextField
                    type={'text'}
                    label="TO DO ..."
                    onChange={taskChangeHandler}
                    name={'name'}
                    variant="outlined"
                    fullWidth
                    autoFocus
                    margin="normal"
                    value={task.name}
                />
                <Button fullWidth variant="contained" onClick={addTask} >Add task</Button>
            </Box>
        </form>
    )
}