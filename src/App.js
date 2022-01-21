import { useState } from "react"
import { Container, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { AppProvider } from './utils/contexts/AppContext'
import MainDrawer from './components/MainDrawer'

import './styles/global.css';

const App = () => {
  const [state, setState] = useState({

  })

  return (
    <AppProvider>
      <CssBaseline />
      <Container disableGutters maxWidth="false">
        <Box sx={{ minHeight: '100vh' }}>
          <MainDrawer />
        </Box>
      </Container>
    </AppProvider>
  );
}

export default App;
