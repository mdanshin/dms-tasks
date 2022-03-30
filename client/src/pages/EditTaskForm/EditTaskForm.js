import { useEffect, useCallback, useState } from 'react'
import TaskService from '../../services/task-service'
import { useNavigate, useParams } from 'react-router-dom';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { TodoContext } from "../../context/todo-context";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export default function EditTaskForm() {
    let { id } = useParams();

    const { update } = React.useContext(TodoContext);
    const [todo, setTodo] = useState({ name: '', summary: '', description: '' })
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const fetchTodo = useCallback(async () => {
        const tasks = await TaskService.getTaskById(id)
        return tasks
    }, [id])

    useEffect(() => {
        fetchTodo()
            .then((data) => {
                setTodo(data.data)
                setIsLoading(false)
            })
    }, [fetchTodo, setTodo])

    function changeHandler(event) {
        const { name, value, checked } = event.target

        if (event.target.type === 'checkbox') {
            setTodo((prevState) => ({ ...prevState, [name]: checked }))
        } else {
            setTodo((prevState) => ({ ...prevState, [name]: value }))
        }
    }

    function submitHandler(event) {
        event.preventDefault()
        setTodo(todo)
        TaskService.udateTask(id, todo)
        update(todo)
        navigate('/')
    }

    return (
        <div>
            {isLoading
                ?
                <>
                    Loading...
                </>
                :
                <>
                    {todo
                        ?
                        <>
                            <Container component="main" maxWidth="lg">
                                <CssBaseline />
                                <Box
                                    sx={{
                                        marginTop: 8,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                        <FormatListBulletedIcon />
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        Update task
                                    </Typography>
                                    <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="name"
                                            label="name"
                                            name="name"
                                            autoFocus
                                            value={todo.name}
                                            onChange={changeHandler}
                                        />
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            name="summary"
                                            label="summary"
                                            id="summary"
                                            value={todo.summary || ''}
                                            onChange={changeHandler}
                                        />
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            name="description"
                                            label="description"
                                            id="description"
                                            value={todo.description}
                                            onChange={changeHandler}
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Update
                                        </Button>
                                    </Box>
                                </Box>
                            </Container>
                        </>
                        : <>Task not found</>}
                </>}
        </div>
    );
}