import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Grid } from '@mui/material';
import LeftPanel from './components/LeftPanel';
import MiddleSection from './components/MiddleSection';
import RightPanel from './components/RightPanel';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import ErrorBoundary from './components/ErrorBoundary'; // Added import
import './App.css';

export const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <ErrorBoundary> {/* Wrap the entire app in ErrorBoundary */}
          <div className="app-container">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <Grid container>
                    <Grid item xs={2} md={2}>
                      <LeftPanel />
                    </Grid>
                    <Grid item xs={10} md={7}>
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
    </UserContext.Provider>
  );
};

export default App;