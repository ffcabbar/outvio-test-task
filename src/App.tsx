import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Box, CircularProgress, Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CountryPicker, TabComponent, ToogleColorMode } from './components/index';
import { fetchData, IDataType } from './api';

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [data, setData] = useState<IDataType[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<IDataType | null>(null);

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

  // fetch data
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const fetchedData = await fetchData();
    setData(fetchedData);
    const globalData = fetchedData.find((f) => f.location === 'International');
    if (globalData) {
      setSelectedCountry(globalData);
    }
    setLoading(false);
  };

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
            <Box
              sx={{
                display: 'flex',
                m: 1,
                p: 1
              }}
            >
              <CountryPicker handleCountryChange={handleCountryChange} data={data} />
            </Box>
            {selectedCountry && <TabComponent selectedCountry={selectedCountry} allData={data} />}
          </>
        ) : (
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
      </Container>
    </ThemeProvider>
  );
};

export default App;
