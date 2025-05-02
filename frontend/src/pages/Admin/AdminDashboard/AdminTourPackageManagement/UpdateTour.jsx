import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SideNavbar from "./../../../../components/AdminDashboard/Navbar";
import Header from "./../../../../components/AdminDashboard/Header";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/tours";

const UpdateTour = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tourData, setTourData] = useState({
    name: "",
    destination: [""],
    days: "",
    Kmrs: "",
  });

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/${id}`)
      .then((response) => {
        const data = response.data;
        setTourData({
          name: data.name,
          destination: Array.isArray(data.destination) ? data.destination : [data.destination],
          days: data.days,
          Kmrs: data.Kmrs,
        });
      })
      .catch((error) => console.error("Error fetching tour data:", error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTourData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDestinationChange = (index, value) => {
    const newDestinations = [...tourData.destination];
    newDestinations[index] = value;
    setTourData((prevData) => ({
      ...prevData,
      destination: newDestinations,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedData = {
      name: tourData.name,
      destination: tourData.destination,
      days: tourData.days,
      Kmrs: tourData.Kmrs,
    };

    try {
      await axios.put(`${API_BASE_URL}/${id}`, updatedData);
      alert("Tour updated successfully!");
      navigate("/adminTourPackageManagement");
    } catch (error) {
      console.error("Error updating tour:", error);
      alert("Update failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-200 to-gray-100">
      <SideNavbar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="w-full max-w-lg bg-white shadow-2xl rounded-3xl p-10 text-center">
            <h2 className="text-4xl font-extrabold mb-6 text-indigo-600">Edit Tour Package</h2>
            <form onSubmit={handleUpdate} className="space-y-5">
              
              <input
                type="text"
                name="name"
                placeholder="Enter Tour Name"
                value={tourData.name}
                onChange={handleInputChange}
                required
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 transition hover:border-indigo-400"
              />

              {tourData.destination.map((destination, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Destination ${index + 1}`}
                  value={destination}
                  onChange={(e) => handleDestinationChange(index, e.target.value)}
                  required
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 transition hover:border-indigo-400"
                />
              ))}

              <input
                type="number"
                name="days"
                placeholder="Enter Number of Days"
                value={tourData.days}
                onChange={handleInputChange}
                required
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 transition hover:border-indigo-400"
              />

              <input
                type="number"
                name="Kmrs"
                placeholder="Enter Distance in Kilometers"
                value={tourData.Kmrs}
                onChange={handleInputChange}
                required
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 transition hover:border-indigo-400"
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
              >
                Update Tour
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UpdateTour;
