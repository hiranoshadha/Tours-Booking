import React, { useState } from "react";
import { MdAdd, MdCancel } from "react-icons/md";
import SideNavbar from "./../../../../components/AdminDashboard/Navbar";
import Header from "./../../../../components/AdminDashboard/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTourForm = () => {
  const navigate = useNavigate();
  const [tourData, setTourData] = useState({
    TourID: '',
    name: '',
    destination: [''],
    days: '',
    Kmrs: '',
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTourData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDestinationChange = (index, value) => {
    const newDestinations = [...tourData.destination];
    newDestinations[index] = value;
    setTourData((prevData) => ({
      ...prevData,
      destination: newDestinations,
    }));
  };

  const handleAddDestination = () => {
    setTourData((prevData) => ({
      ...prevData,
      destination: [...prevData.destination, ''],
    }));
  };

  const handleRemoveDestination = (index) => {
    const newDestinations = tourData.destination.filter((_, i) => i !== index);
    setTourData((prevData) => ({
      ...prevData,
      destination: newDestinations,
    }));
  };

  const handleFileChange = (e) => {
    setTourData((prevData) => ({ ...prevData, photo: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("TourID", tourData.TourID);
    formData.append("name", tourData.name);
    formData.append("destination", JSON.stringify(tourData.destination));
    formData.append("days", tourData.days);
    formData.append("Kmrs", tourData.Kmrs);
    if (tourData.photo) {
      formData.append("photo", tourData.photo);
    }

    axios
      .post("http://localhost:3000/api/tours", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        alert("Tour added successfully");
        navigate("/admin/tour-packages");
      })
      .catch((error) => console.error("Error submitting tour:", error));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto flex items-center justify-center">
          <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-6 text-blue-600">Create Your Tour Package</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" name="TourID" placeholder="Tour ID" value={tourData.TourID} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-lg hover:border-blue-400" />
              <input type="text" name="name" placeholder="Tour Name" value={tourData.name} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-lg hover:border-blue-400" />
              {tourData.destination.map((destination, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <input type="text" name={`destination-${index}`} value={destination} onChange={(e) => handleDestinationChange(index, e.target.value)} required className="w-full p-3 border border-gray-300 rounded-lg hover:border-blue-400" />
                  {tourData.destination.length > 1 && (
                    <button type="button" onClick={() => handleRemoveDestination(index)} className="text-red-500 hover:text-red-700">
                      <MdCancel size={24} />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={handleAddDestination} className="text-blue-600 flex items-center justify-center space-x-2 hover:text-blue-800">
                <MdAdd size={24} /> <span>Add Destination</span>
              </button>
              <input type="number" name="days" placeholder="Duration (Days)" value={tourData.days} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-lg hover:border-blue-400" />
              <input type="number" name="Kmrs" placeholder="Distance (Km)" value={tourData.Kmrs} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-lg hover:border-blue-400" />
              <input type="file" accept="image/*" onChange={handleFileChange} required className="w-full p-3 border border-gray-300 rounded-lg hover:border-blue-400" />
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500">Add Tour</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddTourForm;
