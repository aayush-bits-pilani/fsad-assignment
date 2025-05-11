import React, { useState } from 'react';
import { upsertStudent } from '../api/api';

const StudentForm = ({ onRefresh }) => {
  const [student, setStudent] = useState({ studentId: '', name: '', grade: '' });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await upsertStudent(student);
    setStudent({ studentId: '', name: '', grade: '' });
    onRefresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add / Update Student</h3>
      <input name="studentId" placeholder="Student ID" value={student.studentId} onChange={handleChange} required />
      <input name="name" placeholder="Name" value={student.name} onChange={handleChange} required />
      <input name="grade" placeholder="Grade" value={student.grade} onChange={handleChange} required />
      <button type="submit">Save</button>
    </form>
  );
};

export default StudentForm;
