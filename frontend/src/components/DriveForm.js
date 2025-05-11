import React, { useState } from 'react';
import { createDrive } from '../api/api';

const DriveForm = ({ onRefresh }) => {
  const [form, setForm] = useState({
    vaccineName: '',
    driveDate: '',
    availableDoses: 0,
    grades: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createDrive({ 
      ...form, 
      grades: form.grades.split(',').map(g => g.trim()) 
    });
    alert('Drive created');
    onRefresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Vaccination Drive</h3>
      <input name="vaccineName" placeholder="Vaccine Name" onChange={handleChange} required />
      <input name="driveDate" type="date" onChange={handleChange} required />
      <input name="availableDoses" type="number" placeholder="Doses" onChange={handleChange} required />
      <input name="grades" placeholder="Applicable Grades (e.g., 5,6,7)" onChange={handleChange} required />
      <button type="submit">Create Drive</button>
    </form>
  );
};

export default DriveForm;
