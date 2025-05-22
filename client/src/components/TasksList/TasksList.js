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
  const [sortAsc, setSortAsc] = React.useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  // Сортировка по plannedFinishDate (null всегда в конце)
  const sortedTodoList = React.useMemo(() => {
    if (!todoList) return [];
    return [...todoList].sort((a, b) => {
      if (!a.plannedFinishDate && !b.plannedFinishDate) return 0;
      if (!a.plannedFinishDate) return 1;
      if (!b.plannedFinishDate) return -1;
      const dateA = new Date(a.plannedFinishDate);
      const dateB = new Date(b.plannedFinishDate);
      return sortAsc ? dateA - dateB : dateB - dateA;
    });
  }, [todoList, sortAsc]);

  return (
    <div>
      <Box sx={{ m: 3 }}>
        <Button
          variant="outlined"
          sx={{ mb: 2 }}
          onClick={() => setSortAsc((prev) => !prev)}
        >
          Sort by date {sortAsc ? '▲' : '▼'}
        </Button>
        {sortedTodoList.length
          ? sortedTodoList.map((item) => {
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
                    <Accordion
                      expanded={expanded === item._id}
                      onChange={handleChange(item._id)}
                      sx={{
                        mb: 1, // добавляет отступ снизу
                        ...(item.plannedFinishDate &&
                          new Date(item.plannedFinishDate) < new Date() &&
                          !item.isComplete
                          ? { bgcolor: '#ffeaea', color: 'tomato' }
                          : {})
                      }}
                    >

                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        {/* Дата планируемого завершения слева, ширина по ширине текста */}
                        <Typography
                          sx={{
                            minWidth: 0,
                            width: 'auto',
                            marginRight: 2,
                            color:
                              item.plannedFinishDate &&
                                new Date(item.plannedFinishDate) < new Date() &&
                                !item.isComplete
                                ? 'tomato'
                                : 'text.secondary',
                            fontStyle: 'italic',
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                            display: 'inline-block',
                            textAlign: 'left'
                          }}
                        >
                          {item.plannedFinishDate ? new Date(item.plannedFinishDate).toLocaleDateString() : ''}
                        </Typography>
                        <Typography
                          sx={{
                            width: '33%',
                            flexShrink: 0,
                            color:
                              item.plannedFinishDate &&
                                new Date(item.plannedFinishDate) < new Date() &&
                                !item.isComplete
                                ? 'tomato'
                                : 'inherit'
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          sx={{
                            color:
                              item.plannedFinishDate &&
                                new Date(item.plannedFinishDate) < new Date() &&
                                !item.isComplete
                                ? 'tomato'
                                : 'text.secondary'
                          }}
                        >
                          {item.summary}
                        </Typography>
                      </AccordionSummary>

                      <AccordionDetails
                        sx={
                          item.plannedFinishDate &&
                            new Date(item.plannedFinishDate) < new Date() &&
                            !item.isComplete
                            ? { color: 'tomato' }
                            : { color: 'inherit' }
                        }
                      >
                        <Typography>
                          {item.description}
                        </Typography>
                        {item.plannedFinishDate && (
                          <Typography sx={{ mt: 1, fontStyle: 'italic' }}>
                            Due date: {new Date(item.plannedFinishDate).toLocaleDateString()}
                          </Typography>
                        )}
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