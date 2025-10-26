import { Box, Typography } from '@mui/material';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LeftNav from './components/LeftNav';
import { InmateProvider } from './contexts/InmateContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <InmateProvider>
          <Box 
            sx={{ 
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'rgb(28, 37, 54)', // Dark blue background matching left nav
            }}
          >
            {/* Main Content Area with Nav and Content */}
            <Box 
              sx={{ 
                flex: 1,
                display: 'flex',
                minHeight: 0, // Important for flex child to shrink
              }}
            >
              {/* Left Navigation Pane */}
              <LeftNav />
              
              {/* Main Content Pane */}
              <Box 
                sx={{ 
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden', // Prevent overflow at this level
                }}
              >
                {children}
              </Box>
              </Box>
            
            {/* Footer */}
            <Box 
              sx={{ 
                bgcolor: 'grey.100',
                borderTop: 1,
                borderColor: 'divider',
                py: 1,
                px: 2,
                minHeight: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="body2" color="text.secondary">
                © 2024 Inmate Rooster - Inmate Profile System
              </Typography>
            </Box>
          </Box>
        </InmateProvider>
      </body>
    </html>
  );
}
