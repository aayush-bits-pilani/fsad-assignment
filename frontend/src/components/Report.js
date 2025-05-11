import React, { useEffect, useState } from 'react';
import { getReport, exportReportCSV } from '../api/api';

const Report = () => {
  const [report, setReport] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getReport();
      setReport(res.data);
    })();
  }, []);

  const downloadCSV = async () => {
    const res = await exportReportCSV();
    const blob = new Blob([res.data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vaccination-report.csv';
    a.click();
  };

  return (
    <div>
      <h3>Vaccination Report</h3>
      <button onClick={downloadCSV}>Download CSV</button>
      <table border="1">
        <thead>
          <tr>
            <th>Student ID</th><th>Name</th><th>Grade</th><th>Vaccine</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {report.flatMap(s =>
            s.vaccinations.map(v => (
              <tr key={s.studentId + v.date}>
                <td>{s.studentId}</td>
                <td>{s.name}</td>
                <td>{s.grade}</td>
                <td>{v.vaccineName}</td>
                <td>{v.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
