import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Grid, ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import LeftPanel from './components/LeftPanel';
import MiddleSection from './components/MiddleSection';
import RightPanel from './components/RightPanel';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

export const UserContext = createContext();

// Custom Material 3 Theme
const theme = createTheme({
  palette: {
    mode: 'dark', // True dark theme
    primary: {
      main: '#cb6ce6', // Your purple color
    },
    background: {
      default: '#121212', // True dark background
      paper: 'rgba(18, 18, 18, 0.9)', // Slightly lighter for surfaces
    },
    text: {
      primary: '#ffffff',
      secondary: '#ddd',
    },
  },
  shape: {
    borderRadius: 16, // M3 rounded corners
  },
  shadows: [
    'none', // 0
    '0px 1px 2px rgba(0, 0, 0, 0.3)', // 1
    '0px 2px 4px rgba(0, 0, 0, 0.4)', // 2
    '0px 3px 6px rgba(0, 0, 0, 0.5)', // 3, etc.
    // Customize as needed up to 24
    ...Array(21).fill('0px 3px 6px rgba(0, 0, 0, 0.5)'),
  ],
  typography: {
    fontFamily: "'Orbitron', sans-serif",
    h1: { fontWeight: 600 },
    h2: { fontWeight: 500 },
    h3: { fontWeight: 500 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.9), rgba(203, 108, 230, 0.1))',
          backdropFilter: 'blur(12px)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
          textTransform: 'none',
          padding: '10px 20px',
        },
      },
    },
  },
});

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Applies base M3 styles */}
        <Router>
          <ErrorBoundary>
            <div className="app-container">
              <Navbar />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Grid container>
                      <Grid item xs={1} md={1}>
                        <LeftPanel />
                      </Grid>
                      <Grid item xs={11} md={8}>
                        <MiddleSection />
                      </Grid>
                      <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <RightPanel />
                      </Grid>
                    </Grid>
                  }
                />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </ErrorBoundary>
        </Router>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default App;
