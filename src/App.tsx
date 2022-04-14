import { useState } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';
import { CountryPicker, TabComponent, ToogleColorMode } from './components/index';
import { IDataType } from './common/types';
import { useFetch } from './hooks/useFetch';

const App = () => {
  const { data, loading, defaultCountry } = useFetch(
    'https://covid.ourworldindata.org/data/owid-covid-data.json'
  );

  const [selectedCountry, setSelectedCountry] = useState<IDataType | null>(defaultCountry);

  const handleCountryChange = (val: string) => {
    const selectedCountry = data.find((f) => f.location === val);
    if (selectedCountry) {
      setSelectedCountry(selectedCountry);
    }
  };

  return (
    <>
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
              <ToogleColorMode />
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
    </>
  );
};

export default App;
