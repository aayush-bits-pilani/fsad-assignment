import React, { useEffect, useState } from 'react';
import { getDrives, updateDrive } from '../api/api';

const DriveList = () => {
  const [drives, setDrives] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getDrives();
      setDrives(res.data);
    })();
  }, []);

  const handleUpdate = async (id) => {
    const newDate = prompt('Enter new drive date (YYYY-MM-DD):');
    const newDoses = prompt('Enter new number of doses:');
    await updateDrive(id, { driveDate: newDate, availableDoses: Number(newDoses) });
    alert('Drive updated');
    const res = await getDrives();
    setDrives(res.data);
  };

  return (
    <div>
      <h3>Upcoming Drives</h3>
      <ul>
        {drives.map(d => (
          <li key={d._id}>
            {d.vaccineName} - {new Date(d.driveDate).toLocaleDateString()} - {d.availableDoses} doses
            <button onClick={() => handleUpdate(d._id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DriveList;
