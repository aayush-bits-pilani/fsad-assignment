exports.validateStudentCSV = (row) => {
    return row.studentId && row.name && row.grade;
  };
  