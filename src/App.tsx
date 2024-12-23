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
      <Box component="section" sx={{ p: 2, textAlign: 'center'}}>
        <TodoList/>
      </Box>
    </>
  )
}

export default App
