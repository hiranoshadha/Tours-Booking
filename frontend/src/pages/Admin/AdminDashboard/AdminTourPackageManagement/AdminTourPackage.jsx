import React, { useState, useEffect } from "react";
import SideNavbar from "./../../../../components/AdminDashboard/Navbar";
import Header from "./../../../../components/AdminDashboard/Header";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { MdEdit, MdDelete } from 'react-icons/md';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // <-- Import useNavigate

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminTourPackage = () => {
  const navigate = useNavigate();  // <-- Use useNavigate
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [tourPackages, setTourPackages] = useState([]);

  // Fetch data from API
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/tours')
      .then((response) => {
        setTourPackages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const availablePackages = tourPackages.filter((pkg) => pkg.available);
  const bookedPackages = tourPackages.filter((pkg) => !pkg.available);

  const getTabData = () => {
    let data = [];
    if (activeTab === "all") data = tourPackages;
    if (activeTab === "available") data = availablePackages;
    if (activeTab === "booked") data = bookedPackages;
    return data.filter((pkg) =>
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const bookingData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{ label: "Bookings", data: [200, 250, 300, 150, 280, 320], backgroundColor: "rgba(54, 162, 235, 0.6)" }]
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Tour Packages Management</h2>
            <div className="flex items-center space-x-4">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
                <DatePicker selected={selectedMonth} onChange={(date) => setSelectedMonth(date)} dateFormat="MMMM yyyy" showMonthYearPicker />
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500">Generate Report</button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-4">
            <div className="bg-white p-5 shadow rounded-lg">
              <h3 className="text-gray-600">Monthly Revenue</h3>
              <p className="text-2xl font-bold">$124,563</p>
            </div>
            <div className="bg-white p-5 shadow rounded-lg">
              <h3 className="text-gray-600">Total Bookings</h3>
              <p className="text-2xl font-bold">1,248</p>
            </div>
            <div className="bg-white p-5 shadow rounded-lg">
              <h3 className="text-gray-600">Booking Rate</h3>
              <p className="text-2xl font-bold">84%</p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Booking Distribution</h3>
            <div className="space-x-4">
              <label className="text-gray-700">
                <input type="radio" name="dist" defaultChecked className="mr-1" /> OTA
              </label>
              <label className="text-gray-700">
                <input type="radio" name="dist" className="mr-1" /> Corporate
              </label>
            </div>
          </div>

          <div className="bg-white p-5 shadow rounded-lg mb-6">
            <h4 className="text-gray-600 mb-2">Monthly Booking Distribution Chart</h4>
            <div className="w-full h-64">
              <Bar data={bookingData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top" }, title: { display: false } }, scales: { y: { beginAtZero: true } } }} />
            </div>
          </div>

          <div className="flex space-x-4 mb-4">
            {["all", "available", "booked"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg ${activeTab === tab ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-300"}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Packages
              </button>
            ))}
            <button
              onClick={() => navigate("/adminTourPackageManagement/addTour")}  // <-- Update the navigate function here
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
            >
              Add Tour
            </button>
          </div>

          <div className="tour-package-table-container bg-white p-5 shadow rounded-lg">
            <h3 className="text-lg font-semibold mb-4">{activeTab === "all" ? "All Packages" : activeTab === "available" ? "Available Packages" : "Booked Packages"}</h3>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th className="p-2 border">Tour ID</th>
                  <th className="p-2 border">Tour Name</th>
                  <th className="p-2 border">Destination</th>
                  <th className="p-2 border">Duration (Days)</th>
                  <th className="p-2 border">Distance (Km)</th>
                  <th className="p-2 border">Photo</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {getTabData().map((pkg) => (
                  <tr key={pkg.TourID} className="text-center">
                    <td className="p-2 border">{pkg.TourID}</td>
                    <td className="p-2 border">{pkg.name}</td>
                    <td className="p-2 border">
                      {pkg.destination
                        .join(", ")
                        .match(/.{1,60}([^,]*|,)/g)
                        .map((line, index) => (
                          <div key={index}>{line}</div>
                        ))}
                    </td>
                    <td className="p-2 border">{pkg.days}</td>
                    <td className="p-2 border">{pkg.Kmrs}</td>
                    <td className="p-2 border">
                      {pkg.photo && <img src={`http://localhost:3000${pkg.photo}`} alt="Tour Image" className="w-16 h-16 object-cover" />}
                    </td>
                    <td className="p-2 border">
                    <button
                     className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                     onClick={() => navigate(`/adminTourPackageManagement/updateTour/${pkg.TourID}`)}
                      >
                      <MdEdit className="inline mr-2" /> Update
                      </button>

                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => navigate(`/adminTourPackageManagement/deleteTour/${pkg.TourID}`)}
                      >
                        <MdDelete className="inline mr-2" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {getTabData().length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-gray-500">No packages found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminTourPackage;
