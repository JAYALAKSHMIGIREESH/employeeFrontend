import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './EmployeeList.css';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Fetch all employees
        axios
            .get("https://employee-be99.onrender.com/employees")
            .then((res) => setEmployees(res.data))
            .catch((err) => console.error(err));
    }, []);

    // Handle delete employee
    const handleDelete = (id) => {
        axios
            .delete(`https://employee-be99.onrender.com/employees/${id}`)
            .then(() => {
                // Remove employee 
                setEmployees(employees.filter((emp) => emp.id !== id));
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="container">
            <h2 className="main-hd">Employee List</h2>
            <Link to="/add" className="add-btn">
                Add Employee
            </Link>
            <table  className="details ">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.status}</td>
                            <td className="actions">
                                <Link to={`/edit/${emp.id}`}>
                                    <button className="edit-btn">Edit</button>
                                </Link>
                                <button onClick={() => handleDelete(emp.id)} className="delete-btn">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
