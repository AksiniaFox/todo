import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import TaskStore from "../../stores/task.store/task.store";
import { Button, Checkbox, TextField, Box, Tabs, Tab } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";


const FILTERS = {
  ALL: "all",
  COMPLETED: "completed",
  INCOMPLETE: "incomplete",
} as const;

type FilterType = typeof FILTERS[keyof typeof FILTERS];

const TodoList = observer(() => {
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<FilterType>(FILTERS.ALL);

  useEffect(() => {
    TaskStore.fetchTasks();
  }, []);

  const addTask = () => {
    if (text.trim()) {
      TaskStore.addTask(text.trim());
      setText("");
    }
  };

  const filteredTasks = TaskStore.tasks.filter((task) => {
    if (filter === FILTERS.COMPLETED) return task.done;
    if (filter === FILTERS.INCOMPLETE) return !task.done;
    return true;
  });

  return (
    <Box sx={{ p: 2 }}>
      {/* Поле ввода и кнопка */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2, 
        }}
      >
        <TextField
          id="outlined-basic"
          label="Добавить задачу"
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <Button
          onClick={addTask}
          variant="contained"
          color="primary"
          sx={{ minWidth: "48px", height: "56px" }}
        >
          <AddIcon />
        </Button>
      </Box>

      {/* Фильтры */}
      <Tabs
        value={filter}
        onChange={(e, newValue) => setFilter(newValue)}
        sx={{ mb: 2 }}
        aria-label="Фильтры задач"
      >
        <Tab label="Все" value={FILTERS.ALL} />
        <Tab label="Незавершенные" value={FILTERS.INCOMPLETE} />
        <Tab label="Выполненные" value={FILTERS.COMPLETED} />
      </Tabs>

      {/* Задачи */}
      <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
          {filteredTasks.map((task) => (
          <Box
            key={task.id}
            component="li"
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Checkbox
              checked={task.done}
              onChange={() => TaskStore.toggleTaskDone(task.id)}
              inputProps={{ "aria-label": "controlled" }}
              sx={{ p: 0, mr: 1 }}
            />
            <Box
              sx={{
                flexGrow: 1,
                textDecoration: task.done ? "line-through" : "none",
                color: task.done ? "gray" : "black",
                wordBreak: "break-word",
                margin: 0,
                textAlign: 'start',
              }}
            >
              {task.text}
            </Box>
            <Button onClick={() => TaskStore.deleteTask(task.id)} variant="text">
              <DeleteIcon sx={{ color: pink[500] }}/>
            </Button>


          </Box>
        ))}
      </Box>
    </Box>
  );
});

export default TodoList;
