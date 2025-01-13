import { Box, Typography } from "@mui/material"
import TodoList from "./pages/tasks/tasks"


function App() {

  return (
    <>
      <Box component="section" sx={{ p: 2, border: '1px dashed grey', textAlign: 'center'}}>
        <Typography>
          TO-DO List
        </Typography>
      </Box>
      <Box
        component="section"
        sx={{
          p: 2, // Внутренний отступ
          textAlign: "center",
          width: {
            xs: "100%", // Полная ширина на маленьких экранах
            sm: "80%",  // 80% ширины на средних экранах
            md: "60%",  // 60% ширины на больших экранах
          },
          maxWidth: "600px", // Максимальная ширина, чтобы не превышать заданное значение
          margin: "0 auto", // Выравнивание по центру
        }}
      >
        <TodoList/>
      </Box>
    </>
  )
}

export default App
