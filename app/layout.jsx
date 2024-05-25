// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
/* import '@mantine/core/styles.css'; */
import Navbar from '@/components/Navbar';
import './globals.css';

/* import { ColorSchemeScript, MantineProvider} from '@mantine/core';
import theme from '@/theme'; */

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
        {/* <MantineProvider defaultColorScheme='light'>
          <Navbar />
          <div>bla</div>
          {children}
        </MantineProvider> */}
        {children}
      </body>
    </html>
  );
}