import { useEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import  TaskStore  from "../../stores/task.store/task.store";
import { Button, Checkbox, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from "@mui/material/colors";

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
    <>
        <TextField 
            id="outlined-basic" 
            label="Outlined" 
            variant="outlined" 
            value={text} 
            onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={addTask}>Добавить задачу</Button>
        {TaskStore.isLoading && <p>Загрузка...</p>}
        {TaskStore.error && <p>Ошибка: {TaskStore.error}</p>}
        <ul>
            {TaskStore.tasks.map((task) => (
                <p key={task.id}>
                    <Checkbox
                        checked={task.done}
                        onChange={() => TaskStore.toggleTaskDone(task.id)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <span
                    style={{
                        textDecoration: task.done ? "line-through" : "none", 
                        color: task.done ? "gray" : "black", 
                    }}
                    >
                    {task.text}
                    </span>
                    <Button onClick={() => TaskStore.deleteTask(task.id)}>
                        <DeleteIcon sx={{ color: pink[500] }}/>
                    </Button>
                </p>
            ))}
        </ul>
    </>
  );
});

export default TodoList;
