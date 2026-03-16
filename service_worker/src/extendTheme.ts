import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: 'Helvetica, "Noto Sans JP", sans-serif',
        fontWeight: 300,
        fontSize: '14px',
      }
    }
  }
});