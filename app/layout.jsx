
import '@mantine/core/styles.css';
import './globals.css';
import { FooterLinks } from '@/components/FooterLinks';

import { ColorSchemeScript, MantineProvider} from '@mantine/core';
import theme from '@/theme';

export const metadata = {
  title: 'IN PROGRESS',
  description: 'I have followed setup instructions carefully',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <MantineProvider defaultColorScheme='light'>
          {children}

          <FooterLinks />
        </MantineProvider> 
      </body>
    </html>
  );
}