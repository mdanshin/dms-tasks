import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'
import useRoutes from './routes/routes';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from './context/todo-context'

function App() {
  const routes = useRoutes()

  const [mode, setMode] = React.useState('dark');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider>
          <Router>
            <NavBar colorMode={colorMode} />
            {routes}
          </Router>
        </Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App
