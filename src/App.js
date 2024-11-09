import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';
import Dashboard from './views/Dashboard';
import Users from './views/Users';
import { AuthContext } from './AuthContext';
import UsersCreate from './views/UsersCreate';

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginForm />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginForm />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignupForm />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/users" element={isAuthenticated ? <Users /> : <Navigate to="/login" />} />
        <Route path="/users-create" element={isAuthenticated ? <UsersCreate /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
