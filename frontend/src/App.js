import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import StudentCSVUpload from './components/StudentCSVUpload';
import DriveForm from './components/DriveForm';
import DriveList from './components/DriveList';
import Report from './components/Report';

const App = () => {
  const [token, setToken] = useState(null);

  if (!token) return <Login onLogin={setToken} />;

  return (
    <Router>
      <nav>
        <Link to="/">Dashboard</Link> | 
        <Link to="/students">Students</Link> | 
        <Link to="/drives">Drives</Link> | 
        <Link to="/report">Reports</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={
          <>
            <StudentForm onRefresh={() => {}} />
            <StudentCSVUpload onRefresh={() => {}} />
            <StudentList />
          </>
        } />
        <Route path="/drives" element={
          <>
            <DriveForm onRefresh={() => {}} />
            <DriveList />
          </>
        } />
        <Route path="/report" element={<Report />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
