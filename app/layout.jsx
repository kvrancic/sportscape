
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
        <MantineProvider defaultColorScheme='dark' theme={{
          primaryColor: 'orange',
          colors: {
            'orange': [
              "#FFF4E6",  // orange 1
              "#FFE8CC",  // orange 2
              "#FFD8A8",  // orange 3
              "#FFC078",  // orange 4
              "#FFA94D",  // orange 5
              "#FF922B",  // orange 6
              "#FD7E14",  // orange 7
              "#F76707",  // orange 8
              "#E8590C",  // orange 9
              "#D9480F"   // orange 10
            ],
          },
        }}>
          <div className="flex flex-col min-h-[65vh]">
            {children}

          </div>

          <FooterLinks />
        </MantineProvider> 
      </body>
    </html>
  );
}