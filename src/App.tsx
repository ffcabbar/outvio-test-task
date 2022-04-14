import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { CountryPicker, TabComponent, ToogleColorMode, Loader } from './components/index';
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
        {loading && <Loader />}

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
