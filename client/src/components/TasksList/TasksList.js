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
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const priorities = [
  { value: 'high', label: 'High', icon: '🔴' },
  { value: 'middle', label: 'Middle', icon: '🟠' },
  { value: 'low', label: 'Low', icon: '🟢' },
];

export default function TasksList() {
  const theme = useTheme();
  const { todoList, markAsCompleted } = React.useContext(TodoContext);

  const [expanded, setExpanded] = React.useState(false);
  const [sortAsc, setSortAsc] = React.useState(true);
  const [sortByPriority, setSortByPriority] = React.useState(false);
  const [priorityFilter, setPriorityFilter] = React.useState(['all']);

  // Перенесите функцию внутрь компонента!
  function handlePriorityCheckboxChange(priority) {
    if (priority === 'all') {
      setPriorityFilter(['all']);
      return;
    }
    let newFilter = priorityFilter.includes(priority)
      ? priorityFilter.filter(p => p !== priority)
      : [...priorityFilter.filter(p => p !== 'all'), priority];
    if (newFilter.length === 0) newFilter = ['all'];
    setPriorityFilter(newFilter);
  }

  async function completeTask(item) {
    await TaskService.completeTask(item._id, { isComplete: !item.isComplete })
    markAsCompleted(item._id)
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  const handlePriorityFilterChange = (event) => {
    let value = event.target.value;
    if (typeof value === 'string') value = value.split(',');

    if (value.includes('all')) {
      setPriorityFilter(['all']);
    } else if (value.length === 0) {
      setPriorityFilter(['all']);
    } else {
      setPriorityFilter(value);
    }
  };

  const sortedTodoList = React.useMemo(() => {
    const priorityOrder = { high: 3, middle: 2, low: 1 }; // переместили внутрь useMemo
    if (!todoList) return [];
    let sorted = [...todoList];
    if (sortByPriority) {
      sorted.sort((a, b) => {
        const pa = priorityOrder[a.priority] || 0;
        const pb = priorityOrder[b.priority] || 0;
        if (pa !== pb) return sortAsc ? pb - pa : pa - pb;
        if (!a.plannedFinishDate && !b.plannedFinishDate) return 0;
        if (!a.plannedFinishDate) return 1;
        if (!b.plannedFinishDate) return -1;
        const dateA = new Date(a.plannedFinishDate);
        const dateB = new Date(b.plannedFinishDate);
        return sortAsc ? dateA - dateB : dateB - dateA;
      });
    } else {
      sorted.sort((a, b) => {
        if (!a.plannedFinishDate && !b.plannedFinishDate) return 0;
        if (!a.plannedFinishDate) return 1;
        if (!b.plannedFinishDate) return -1;
        const dateA = new Date(a.plannedFinishDate);
        const dateB = new Date(b.plannedFinishDate);
        return sortAsc ? dateA - dateB : dateB - dateA;
      });
    }
    return sorted;
  }, [todoList, sortAsc, sortByPriority]);

  const filteredTodoList = React.useMemo(() => {
    if (priorityFilter.includes('all')) return sortedTodoList;
    return sortedTodoList.filter(item => priorityFilter.includes(item.priority));
  }, [sortedTodoList, priorityFilter]);

  return (
    <div>
      <Box sx={{ m: 3, display: 'flex', alignItems: 'center' }}>
        <Button
          variant="outlined"
          sx={{ mb: 2 }}
          onClick={() => setSortAsc((prev) => !prev)}
        >
          Sort by date {sortAsc ? '▲' : '▼'}
        </Button>
        <Button
          variant={sortByPriority ? "contained" : "outlined"}
          sx={{ mb: 2, ml: 2 }}
          onClick={() => setSortByPriority((prev) => !prev)}
        >
          Sort by priority {sortByPriority ? '★' : ''}
        </Button>
        <Select
          multiple
          value={priorityFilter}
          onChange={handlePriorityFilterChange}
          renderValue={(selected) => {
            if (selected.includes('all')) return 'All priorities';
            return selected.map(val =>
              val === 'high' ? '🔴' :
                val === 'middle' ? '🟠' :
                  val === 'low' ? '🟢' : ''
            ).join(' ');
          }}
          MenuProps={{ disablePortal: true }}
          sx={{
            mb: 2,
            ml: 2,
            minWidth: 120,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            '.MuiSelect-select': {
              display: 'flex',
              alignItems: 'center',
              py: 0,
            }
          }}
          size="small"
        >
          <MenuItem key="all" value="all">
            <Checkbox checked={priorityFilter.length === 1 && priorityFilter[0] === 'all'} />
            All priorities
          </MenuItem>
          <MenuItem key="high" value="high">
            <Checkbox checked={priorityFilter.includes('high')} />
            <span style={{ fontSize: 20, verticalAlign: 'middle' }}>🔴</span> High
          </MenuItem>
          <MenuItem key="middle" value="middle">
            <Checkbox checked={priorityFilter.includes('middle')} />
            <span style={{ fontSize: 20, verticalAlign: 'middle' }}>🟠</span> Middle
          </MenuItem>
          <MenuItem key="low" value="low">
            <Checkbox checked={priorityFilter.includes('low')} />
            <span style={{ fontSize: 20, verticalAlign: 'middle' }}>🟢</span> Low
          </MenuItem>
        </Select>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, ml: 2 }}>
        <Checkbox
          checked={priorityFilter.length === 1 && priorityFilter[0] === 'all'}
          onChange={() => setPriorityFilter(['all'])}
        />
        <span style={{ marginRight: 12 }}>All priorities</span>
        {priorities.map(p => (
          <React.Fragment key={p.value}>
            <Checkbox
              checked={priorityFilter.includes(p.value)}
              onChange={() => handlePriorityCheckboxChange(p.value)}
              sx={{ color: p.value === 'high' ? 'red' : p.value === 'middle' ? 'orange' : 'green' }}
            />
            <span style={{ fontSize: 20, verticalAlign: 'middle', marginRight: 12 }}>{p.icon}</span>
            <span style={{ marginRight: 12 }}>{p.label}</span>
          </React.Fragment>
        ))}
      </Box>
      {filteredTodoList.length
        ? filteredTodoList.map((item) => {
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
                      mb: 1,
                      ...(item.plannedFinishDate && !item.isComplete
                        ? (() => {
                          const now = new Date();
                          const due = new Date(item.plannedFinishDate);
                          const diffDays = (due - now) / (1000 * 60 * 60 * 24);

                          // Цвета для светлой и тёмной темы
                          const overdueBg = theme.palette.mode === 'dark' ? '#3a2323' : '#ffeaea';
                          const overdueColor = theme.palette.mode === 'dark' ? '#ff7b72' : 'tomato';
                          const soonBg = theme.palette.mode === 'dark' ? '#39351a' : '#fffbe6';
                          const soonColor = theme.palette.mode === 'dark' ? '#ffe066' : '#bfa100';

                          if (due < now) {
                            // Просрочено
                            return { bgcolor: overdueBg, color: overdueColor };
                          } else if (diffDays >= 0 && diffDays <= 2) {
                            // До дедлайна 1-2 дня
                            return { bgcolor: soonBg, color: soonColor };
                          }
                          return {};
                        })()
                        : {})
                    }}
                  >

                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      {/* Приоритет задачи */}
                      <Typography
                        sx={{
                          width: '10px',
                          flexShrink: 0,
                          marginRight: 3,
                          fontWeight: 600,
                          color:
                            item.priority === 'high'
                              ? 'red'
                              : item.priority === 'middle'
                                ? 'orange'
                                : 'green',
                          display: 'inline-block',
                          textAlign: 'center'
                        }}
                      >
                        {item.priority === 'high' && '🔴'}
                        {item.priority === 'middle' && '🟠'}
                        {item.priority === 'low' && '🟢'}
                      </Typography>
                      {/* Дата планируемого завершения слева */}
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
    </div>
  )
}