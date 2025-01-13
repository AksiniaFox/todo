import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import TaskStore from "../../stores/task.store/task.store";
import { Button, Checkbox, TextField, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";

const TodoList = observer(() => {
  const [text, setText] = useState("");

  useEffect(() => {
    TaskStore.fetchTasks();
  }, []);

  const addTask = () => {
    if (text.trim()) {
      TaskStore.addTask(text.trim());
      setText("");
    }
  };

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

      {/* Задачи */}
      <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
        {TaskStore.tasks.map((task) => (
          <Box
            key={task.id}
            component="li"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
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
              <DeleteIcon sx={{ color: pink[500] }} />
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
});

export default TodoList;
