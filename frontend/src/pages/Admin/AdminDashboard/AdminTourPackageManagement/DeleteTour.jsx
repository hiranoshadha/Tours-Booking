import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SideNavbar from "./../../../../components/AdminDashboard/Navbar";
import Header from "./../../../../components/AdminDashboard/Header";

const DeleteTour = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/tours/${id}`);
      navigate("/adminTourPackageManagement");
    } catch (error) {
      console.error("Error deleting tour package", error);
      alert("Failed to delete the tour package. Please try again.");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-200 to-gray-100">
      <SideNavbar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="w-full max-w-lg bg-white shadow-2xl rounded-3xl p-10 text-center">
            <h2 className="text-4xl font-extrabold mb-6 text-red-600">
              Delete Tour Package
            </h2>
            <p className="mb-8 text-lg">
              Are you sure you want to delete this tour package?
            </p>
            <div className="flex justify-around">
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl transition-colors"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => navigate("/adminTourPackageManagement")}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DeleteTour;
