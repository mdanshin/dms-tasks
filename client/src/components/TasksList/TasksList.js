import * as React from 'react';
import TaskService from '../../services/task-service'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import Accordion from '@mui/material/Accordion';
import Button from '@mui/material/Button';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TodoContext } from "../../context/todo-context";

export default function TasksList() {
    const { todoList, markAsCompleted } = React.useContext(TodoContext);

    async function completeTask(item) {
        await TaskService.completeTask(item._id, { isComplete: !item.isComplete })
        markAsCompleted(item._id)
    }

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    return (
        <div>
            <Box sx={{ m: 3 }}>
                {todoList
                    ? todoList.map((item) => {
                        return (
                            <div key={item._id} >
                                {item.isComplete
                                    ?
                                    <>
                                        {/* <Link to={item._id}>{item.name}</Link>
                                            <button onClick={() => { completeTask(item) }}>Done</button> */}
                                    </>
                                    :
                                    <>
                                        <Accordion expanded={expanded === item._id} onChange={handleChange(item._id)}>

                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                            >
                                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                                    {item.name}
                                                </Typography>
                                                <Typography sx={{ color: 'text.secondary' }}>{item.summary}</Typography>
                                            </AccordionSummary>

                                            <AccordionDetails>
                                                <Typography>{item.description}</Typography>
                                            </AccordionDetails>

                                            <Button color="secondary" component={Link} to={item._id} >Edit</Button>
                                            <Button color="error" onClick={() => { completeTask(item) }}>Done</Button>
                                        </Accordion>
                                    </>
                                }
                            </div>
                        )
                    })
                    : <h1>{'No task found'}</h1>}
            </Box>
        </div>
    )
}