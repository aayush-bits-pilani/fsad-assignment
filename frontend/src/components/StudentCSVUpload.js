import React, { useState } from 'react';
import { uploadCSV } from '../api/api';

const StudentCSVUpload = ({ onRefresh }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert('No file selected');
    const formData = new FormData();
    formData.append('file', file);

    await uploadCSV(formData);
    alert('Students imported');
    setFile(null);
    onRefresh();
  };

  return (
    <div>
      <h3>Upload Students via CSV</h3>
      <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default StudentCSVUpload;
