 import { useState } from "react";
import Employee from "./Employee";

function EmployeeList() {
  const [promotEmployee, setPromotEmployee] = useState("");

  const employees = [
    { name: "Anu", currentRole: "Developer" },
    { name: "Anusiya", currentRole: "Designer" }
  ];

  const handlePromot = (employeeName) => {
    setPromotEmployee(employeeName);
  };

  return (
    <div className="w-96 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>

      {employees.map((emp, index) => (
        <Employee
          key={index}
          name={emp.name}
          currentRole={emp.currentRole}
          onPromote={handlePromot}
        />
      ))}

      {promotEmployee && (
        <p className="mt-4 text-green-600 font-semibold">
           {promotEmployee} has been promoted!
        </p>
      )}
    </div>
  );
}

export default EmployeeList;