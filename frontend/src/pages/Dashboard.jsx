import React from "react";
import { Calendar, UserPlus, BarChart3, DollarSign, PlusCircle, Trash2, Edit } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const Dashboard = () => {
  const stats = [
    { title: "Appointments", value: 950, percentage: "30%", increase: true, icon: <Calendar size={24} /> },
    { title: "New Patients", value: 1500, percentage: "50%", increase: true, icon: <UserPlus size={24} /> },
    { title: "Operations", value: 400, percentage: "40%", increase: true, icon: <BarChart3 size={24} /> },
    { title: "HPL Earning", value: "$15,500", percentage: "20%", increase: false, icon: <DollarSign size={24} /> },
  ];

  const patientData = [
    { name: "2020", rate: 30 },
    { name: "2021", rate: 50 },
    { name: "2022", rate: 70 },
    { name: "2023", rate: 85 },
    { name: "2024", rate: 90 },
  ];

  const departmentData = [
    { name: "Dental", value: 60, color: "#34D399" },
    { name: "Medicine", value: 25, color: "#F59E0B" },
    { name: "Cardiology", value: 15, color: "#6366F1" },
  ];

  const appointments = [
    { name: "Laila Mahmoud", doctor: "Dr. Zain Ahmed", date: "13/08/2024", time: "8:30" },
    { name: "Laila Mahmoud", doctor: "Dr. Zain Ahmed", date: "13/08/2024", time: "8:30" },
    { name: "Laila Mahmoud", doctor: "Dr. Zain Ahmed", date: "13/08/2024", time: "8:30" },
    { name: "Laila Mahmoud", doctor: "Dr. Zain Ahmed", date: "13/08/2024", time: "8:30" },
  ];

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      {/* Title */}
      <h1 className="mb-4">Dashboard</h1>

      {/* Stats Cards */}
      <div className="row">
        {stats.map((stat, index) => (
          <div key={index} className="col-md-3 mb-4">
            <div className="card shadow-sm p-3 d-flex flex-row align-items-center">
              <div className="me-3">{stat.icon}</div>
              <div>
                <h4 className="mb-0">{stat.value}</h4>
                <p className="text-muted small">{stat.percentage} Vs Last Month</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="row">
        {/* New Patient Rates Chart */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm p-4">
            <h5>New Patient Rates</h5>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={patientData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#06B6D4" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Patients by Department Pie Chart */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm p-4">
            <h5>Patients By Department</h5>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={departmentData} dataKey="value" cx="50%" cy="50%" outerRadius={60}>
                  {departmentData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Booked Appointments */}
      <div className="card shadow-sm p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>Booked Appointments</h5>
          <button className="btn btn-success d-flex align-items-center">
            <PlusCircle size={16} className="me-2" /> Add New
          </button>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Assigned Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{appointment.name}</td>
                  <td>{appointment.doctor}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">
                      <Edit size={16} />
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
