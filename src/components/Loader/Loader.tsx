import { Box, CircularProgress } from '@mui/material';

export const Loader = () => {
  return (
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
  );
};
