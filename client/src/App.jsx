import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Grid } from '@mui/material';
import LeftPanel from './components/LeftPanel';
import MiddleSection from './components/MiddleSection';
import RightPanel from './components/RightPanel';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import './App.css';

const App = () => {
  return (
    <Router>
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
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
