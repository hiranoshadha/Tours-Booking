import React, { useState } from "react";
import SideNavbar from "./../../../../components/AdminDashboard/Navbar";
import Header from "./../../../../components/AdminDashboard/Header";
import { MdAdd, MdCancel, MdSearch, MdEdit, MdDelete } from "react-icons/md";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";



// Register necessary chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function TransportManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [vehicles, setVehicles] = useState([
    { id: "QB5329", vehicleName: "Bus 001", vehicleType: "Luxury", mobileNo: "0771231236", capacity: 50, availability: "Unavailable", price: 5000 },
    { id: "ABG8530", vehicleName: "Van 023", vehicleType: "Deluxe", mobileNo: "0771231248", capacity: 20, availability: "Available", price: 3000 },
    { id: "BCQ2061", vehicleName: "Car 108", vehicleType: "Standard", mobileNo: "0771242736", capacity: 5, availability: "Available", price: 1500 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const topVehicles = [
    { name: "Bus 001", revenue: "$12,340", trips: 156, occupancy: "90%", rating: 4.9 },
    { name: "Van 023", revenue: "$8,750", trips: 120, occupancy: "85%", rating: 4.7 },
    { name: "Car 108", revenue: "$6,250", trips: 100, occupancy: "80%", rating: 4.6 },

    
  ];

  const handleAddNewVehicle = () => {
    setCurrentVehicle({ id: "", vehicleName: "", vehicleType: "", capacity: "", availability: "Available", price: "", photoUrl: "" });
    setIsModalOpen(true);
  };

  const handleSaveChanges = () => {
    if (currentVehicle.id) {
      const updatedVehicles = vehicles.map((vehicle) => vehicle.id === currentVehicle.id ? currentVehicle : vehicle);
      setVehicles(updatedVehicles);
    } else {
      setVehicles([...vehicles, { ...currentVehicle, id: Math.random().toString(36).substr(2, 9) }]);
    }
    setIsModalOpen(false);
  };

  const getTabData = () => {
    let data = vehicles;
    if (activeTab === "available") data = vehicles.filter((v) => v.availability === "Available");
    if (activeTab === "booked") data = vehicles.filter((v) => v.availability === "Unavailable");
    return data.filter((vehicle) => vehicle.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()));
  };

 

  const handleUpdateVehicle = (vehicle) => {
    setCurrentVehicle(vehicle);
    setIsModalOpen(true);
  };

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentVehicle((prevVehicle) => ({
      ...prevVehicle,
      [name]: value,
    }));
  };

  const handleDeleteVehicle = (vehicleId) => {
    const updatedVehicles = vehicles.filter((vehicle) => vehicle.id !== vehicleId);
    setVehicles(updatedVehicles);
    setIsDeleteConfirmOpen(false); // Close confirmation modal
  };

  const openDeleteConfirmation = (vehicle) => {
    setCurrentVehicle(vehicle);
    setIsDeleteConfirmOpen(true);
  };

  // Example data for Monthly Booking Distribution (hypothetical data)
  const monthlyBookingData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Trips",
        data: [120, 150, 180, 130, 170, 160, 200, 190, 210, 240, 220, 230], // Replace with actual data
        backgroundColor: "rgba(43, 151, 252, 0.5)",
        borderColor: "rgba(43, 151, 252, 0.5)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Booking Distribution",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Transport Management</h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-gray-200 rounded">Select Month</button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded">Generate Report</button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="p-4 bg-white rounded shadow">
                <h3 className="text-gray-500">Monthly Revenue</h3>
                <p className="text-2xl font-semibold">$124,563 <span className="text-green-500 text-sm">+2.5%</span></p>
              </div>
              <div className="p-4 bg-white rounded shadow">
                <h3 className="text-gray-500">Total Trips</h3>
                <p className="text-2xl font-semibold">1,248 <span className="text-green-500 text-sm">+3.2%</span></p>
              </div>
              <div className="p-4 bg-white rounded shadow">
                <h3 className="text-gray-500">Occupancy Rate</h3>
                <p className="text-2xl font-semibold">84% <span className="text-red-500 text-sm">-2%</span></p>
              </div>
            </div>

           {/* Booking Overview Chart */}
            <div className="mb-6 bg-white p-5 shadow rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Booking Overview</h3> {/* Updated Label Name */}
              <div className="space-x-4 mb-4">
                <label className="text-gray-700">
                  <input type="radio" name="dist" defaultChecked className="mr-1" /> OTA
                </label>
                <label className="text-gray-700">
                  <input type="radio" name="dist" className="mr-1" /> Corporate
                </label>
              </div>

                {/* Booking Overview Chart */}
                <div className="w-full h-64">
                  <Bar
                    data={{
                      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                      datasets: monthlyBookingData.datasets,
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { position: "top" },
                        title: { display: false },
                      },
                      scales: { y: { beginAtZero: true } },
                    }}
                  />
                </div>
              </div>

    

              {/* Top Performance Vehicles Table */}
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold mb-4">Top Performance Vehicles</h3>
                  <table className="w-full border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-gray-200 text-center">
                        <th className="p-2 border">Vehicle Name</th>
                        <th className="p-2 border">Revenue</th>
                        <th className="p-2 border">Total Trips</th>
                        <th className="p-2 border">Occupancy Rate</th>
                        <th className="p-2 border">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topVehicles.map((vehicle, idx) => (
                        <tr key={idx} className="text-center">
                          <td className="p-2 border">{vehicle.name}</td>
                          <td className="p-2 border">{vehicle.revenue}</td>
                          <td className="p-2 border">{vehicle.trips}</td>
                          <td className="p-2 border">{vehicle.occupancy}</td>
                          <td className="p-2 border">{vehicle.rating} ⭐</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>


                      {/* Transport Filter Buttons */}
                      <div className="flex space-x-4 mb-4">
                        <button
                          className={`px-4 py-2 rounded ${activeTab === "all" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
                          onClick={() => setActiveTab("all")}
                        >
                          All Vehicles
                        </button>
                        <button
                          className={`px-4 py-2 rounded ${activeTab === "available" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
                          onClick={() => setActiveTab("available")}
                        >
                          Available Vehicles
                        </button>
                        <button
                          className={`px-4 py-2 rounded ${activeTab === "booked" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
                          onClick={() => setActiveTab("booked")}
                        >
                          Booked Vehicles
                        </button>
                      </div>
                      

                      <div className="flex items-center justify-between mb-4">
                        <input
                          type="text"
                          placeholder="Search vehicle..."
                          className="border px-3 py-2 rounded-lg"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <button onClick={handleAddNewVehicle} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                          + Add a new Vehicle
                        </button>
                      </div>
                      

            {/*All vehicle*/}      
            <h2 className="text-2xl font-semibold text-left">All Vehicles</h2>

            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th className="p-2 border">Vehicle No</th>
                  <th className="p-2 border">Vehicle Name</th>
                  <th className="p-2 border">Vehicle Type</th>
                  <th className="p-2 border">Seat</th>
                  <th className="p-2 border">Availability</th>
                  <th className="p-2 border">Price (Km)</th>
                  <th className="p-2 border">Photo</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {getTabData().map((vehicle, idx) => (
                  <tr key={idx} className="text-center">
                    <td className="p-2 border">{vehicle.id}</td>
                    <td className="p-2 border">{vehicle.vehicleName}</td>
                    <td className="p-2 border">{vehicle.vehicleType}</td>
                    <td className="p-2 border">{vehicle.capacity}</td>
                    <td className={`p-2 border ${vehicle.availability === "Available" ? "text-green-500" : "text-red-500"}`}>{vehicle.availability}</td>
                    <td className="p-2 border">{vehicle.price}</td>
                    <td className="p-2 border">
                      <img src={vehicle.photoUrl} alt="Vehicle" className="w-16 h-16 object-cover rounded-md mx-auto" />
                    </td>
                    <td className="p-2 border">
                      <div className="flex justify-center space-x-2">
                        <button
                          className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          onClick={() => handleUpdateVehicle(vehicle)}
                        >
                          <MdEdit size={16} /> <span>Update</span>
                        </button>
                        <button
                          className="flex items-center space-x-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          onClick={() => openDeleteConfirmation(vehicle)}
                        >
                          <MdDelete size={16} /> <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Modal for updating vehicle */}
                  {isModalOpen && currentVehicle && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-semibold mb-4">Update Vehicle</h3>
            <div className="mb-4">
              <label className="block mb-2">Vehicle No</label>
              <input
                type="text"
                name="id"
                value={currentVehicle.id}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Vehicle Name</label>
              <input
                type="text"
                name="vehicleName"
                value={currentVehicle.vehicleName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Vehicle Type</label>
              <input
                type="text"
                name="vehicleType"
                value={currentVehicle.vehicleType}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Capacity</label>
              <input
                type="number"
                name="capacity"
                value={currentVehicle.capacity}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={currentVehicle.price}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
                {/* Photo Upload Field */}
                <div className="mb-4">
                  <label className="block mb-2">Vehicle Photo</label>
                  <input
                    type="file"
                    name="photoUrl"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setCurrentVehicle((prevVehicle) => ({
                            ...prevVehicle,
                            photoUrl: reader.result, // Update photoUrl with the image data
                          }));
                        };
                        reader.readAsDataURL(file); // Convert image to base64 string
                      }
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {currentVehicle.photoUrl && (
                    <div className="mt-2">
                      <img
                        src={currentVehicle.photoUrl}
                        alt="Vehicle Preview"
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

            {/* Delete Confirmation Modal */}
            {isDeleteConfirmOpen && currentVehicle && (
              <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <h3 className="text-2xl font-semibold mb-4">Are you sure you want to delete this vehicle?</h3>
                  <p className="mb-4">
                    Vehicle Name: {currentVehicle.vehicleName}
                    <br />
                    Vehicle No: {currentVehicle.id}
                  </p>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setIsDeleteConfirmOpen(false)}
                      className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeleteVehicle(currentVehicle.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Confirm Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default TransportManagement;
