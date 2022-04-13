import { useLayoutEffect, useMemo, useState } from 'react';
import { Box, CircularProgress, Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CountryPicker, TabComponent, ToogleColorMode } from './components/index';
import { IDataType } from './common/types';
import { useFetch } from './hooks/useFetch';

const App = () => {
  const { data, loading, defaultCountry } = useFetch(
    'https://covid.ourworldindata.org/data/owid-covid-data.json'
  );

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<IDataType | null>(defaultCountry);

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

  const handleCountryChange = (val: string) => {
    const selectedCountry = data.find((f) => f.location === val);
    if (selectedCountry) {
      setSelectedCountry(selectedCountry);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        sx={{
          marginTop: '8rem'
        }}
      >
        {loading && (
          <>
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '30px'
              }}
            >
              <h5>It might take longer than usual. Data is quite big.</h5>
            </Box>
          </>
        )}

        {!loading && data && defaultCountry && (
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
            <Box
              sx={{
                display: 'flex',
                m: 1,
                p: 1
              }}
            >
              <CountryPicker
                handleCountryChange={handleCountryChange}
                data={data}
                defaultCountry={defaultCountry}
              />
            </Box>
            {selectedCountry && <TabComponent selectedCountry={selectedCountry} allData={data} />}
          </>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;
