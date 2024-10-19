import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './EmployeeForm.css'; // Import the external CSS

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    status: "active",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`https://employee-be99.onrender.com/employees/${id}`)
        .then((res) => setEmployee(res.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!employee.name || !employee.email || !employee.status) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(employee.email)) {
      setError("Please enter a valid email.");
      return;
    }

    setError("");

    if (id) {
      axios
        .put(`https://employee-be99.onrender.com/employees/${id}`, employee)
        .then(() => navigate("/"))
        .catch((err) => console.error(err));
    } else {
      axios
        .post("https://employee-be99.onrender.com/employees", employee)
        .then(() => navigate("/"))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? "Edit Employee" : "Add Employee"}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee Name</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        <div   style={{width:'100%'}}className="form-group">
          <label >Status</label>
          <select name="status" value={employee.status} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button type="submit">{id ? "Update Employee" : "Add Employee"}</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
