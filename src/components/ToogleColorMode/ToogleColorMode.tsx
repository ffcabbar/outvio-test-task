import { IconButton, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useContext } from 'react';
import { ColorModeContext } from '../../context/ThemeContext';

export const ToogleColorMode = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const handleLocalStorage = (val: string) => {
    localStorage.setItem('appTheme', val);
  };

  return (
    <IconButton onClick={colorMode.toggleColorMode} color="inherit">
      {theme.palette.mode === 'dark' ? (
        <Brightness7 onClick={() => handleLocalStorage('light')} />
      ) : (
        <Brightness4 onClick={() => handleLocalStorage('dark')} />
      )}
    </IconButton>
  );
};
