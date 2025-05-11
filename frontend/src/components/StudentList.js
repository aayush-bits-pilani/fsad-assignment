import React, { useEffect, useState } from 'react';
import { getStudents, vaccinateStudent, getDrives } from '../api/api';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [drives, setDrives] = useState([]);
  const [selectedDriveId, setSelectedDriveId] = useState('');

  const refresh = async () => {
    const sRes = await getStudents();
    const dRes = await getDrives();
    setStudents(sRes.data);
    setDrives(dRes.data);
  };

  const handleVaccinate = async (studentId) => {
    if (!selectedDriveId) return alert('Please select a vaccination drive');
    await vaccinateStudent({ studentId, driveId: selectedDriveId });
    refresh();
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div>
      <h3>Student List</h3>
      <label>Select Vaccination Drive: </label>
      <select value={selectedDriveId} onChange={(e) => setSelectedDriveId(e.target.value)}>
        <option value="">-- Select Drive --</option>
        {drives.map(d => (
          <option key={d._id} value={d._id}>
            {d.vaccineName} - {new Date(d.driveDate).toLocaleDateString()}
          </option>
        ))}
      </select>

      <ul>
        {students.map(s => (
          <li key={s.studentId}>
            {s.name} ({s.grade}) - {s.vaccinatedRecords.length > 0 ? '✅' : '❌'}
            <button onClick={() => handleVaccinate(s.studentId)}>Mark Vaccinated</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
