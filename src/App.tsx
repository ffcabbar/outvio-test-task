import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Box, CircularProgress, Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToogleColorMode } from './components/ToogleColorMode/ToogleColorMode';
import { fetchData } from './api';

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // theme
  useLayoutEffect(() => {
    if (localStorage) {
      const isDarkTheme = localStorage.getItem('darkTheme');
      setIsDarkTheme(isDarkTheme === 'true' ? true : false);
    }
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkTheme ? 'dark' : 'light'
        }
      }),
    [isDarkTheme]
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const fetchedData = await fetchData();
    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        {!isLoading ? (
          <>
            <Box
              sx={{
                display: 'flex',
                m: 1,
                p: 1,
                justifyContent: 'flex-end'
              }}
            >
              <ToogleColorMode isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
            </Box>
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '30px'
            }}
          >
            <h1>Loading...</h1>
            <div>
              <CircularProgress />
            </div>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;
