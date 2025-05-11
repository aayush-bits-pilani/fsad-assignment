import React, { useEffect, useState } from 'react';
import { getStudents, getDrives } from '../api/api';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [drives, setDrives] = useState([]);

  useEffect(() => {
    (async () => {
      const sRes = await getStudents();
      const dRes = await getDrives();
      setStudents(sRes.data);
      setDrives(dRes.data);
    })();
  }, []);

  const vaccinatedCount = students.filter(s => s.vaccinatedRecords?.length).length;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Students: {students.length}</p>
      <p>Vaccinated: {vaccinatedCount} ({((vaccinatedCount / students.length) * 100 || 0).toFixed(1)}%)</p>

      <h3>Upcoming Vaccination Drives</h3>
      {drives.length ? (
        <ul>
          {drives.map(d => (
            <li key={d._id}>{d.vaccineName} on {new Date(d.driveDate).toLocaleDateString()}</li>
          ))}
        </ul>
      ) : (
        <p>No upcoming drives</p>
      )}
    </div>
  );
};

export default Dashboard;
