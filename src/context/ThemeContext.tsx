import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { createContext, useLayoutEffect, useMemo, useState } from 'react';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

type Props = {
  children: React.ReactNode;
};

type AppTheme = 'light' | 'dark';

const ThemeContextProvider = ({ children }: Props) => {
  const [mode, setMode] = useState<AppTheme>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      }
    }),
    []
  );

  useLayoutEffect(() => {
    if (localStorage) {
      const theme = localStorage.getItem('appTheme');
      if (theme) {
        setMode(theme as AppTheme);
      } else {
        localStorage.setItem('appTheme', 'light');
      }
    }
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode
        }
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export { ThemeContextProvider, ColorModeContext };
