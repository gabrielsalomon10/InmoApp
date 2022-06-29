import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { SWRConfig } from 'swr';

import { lightTheme } from '../themes/light-theme';
import { UiProvider } from '../context/ui/UiProvider';
import { AuthProvider } from '../context';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='todo'>
      <SWRConfig
        value={{
          fetcher: ( resource, init ) => fetch( resource, init ).then( res => res.json() )
        }}
      >
        <AuthProvider>
          <UiProvider>
            <ThemeProvider theme={ lightTheme }>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </UiProvider>
        </AuthProvider>
      </SWRConfig>
      </div>
  )
}

export default MyApp
