import React, { useState } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Layout from '../components/Layout/Layout';

const App = ({ Component, pageProps }: any) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const darkTheme = createTheme({
    palette: {
      mode: theme,
      primary: {
        main: '#6247AA',
      },
    },
  });

  return (
    <main>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline enableColorScheme />
        <Layout theme={theme} setTheme={setTheme}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </main>
  );
};

export default App;
