import React, { useState, useEffect } from "react";
import { MdSearch } from "react-icons/md";
import { getImageUrl } from '../../../utils/imageUtils';
import home from "../../.././assets/Background.jpg";
import vehicle1 from "../../.././assets/hotel1.jpg"; // You'll need to add these images
import vehicle2 from "../../.././assets/hotel2.webp";
import vehicle3 from "../../.././assets/hotel3.jpg";
import vehicle4 from "../../.././assets/hotel4.jpg";
import axios from "axios";

const Transport = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch vehicles from the API
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/transport");
        setVehicles(response.data);
        setFilteredVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setFilteredVehicles(vehicles);
    } else {
      const filtered = vehicles.filter(vehicle => 
        vehicle.vehiclename.toLowerCase().includes(query.toLowerCase()) ||
        vehicle.vehicletype.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredVehicles(filtered);
    }
  };

  return (
    <div className="font-sans">
      {/* Header Section */}
      <header className="bg-orange-600 text-white py-6">
        <div className="container mx-auto flex justify-between items-center">
            <div className="text-4xl font-bold">Flamingo Tours</div>
            <nav className="flex space-x-6 text-lg">
            <a href="/TourPackage" className="hover:text-gray-200">
                Package
            </a>
            <a href="/Transport" className="hover:text-gray-200">
                Transport
            </a>
            <a href="/TourGide" className="hover:text-gray-200">
                Tour Guide
            </a>
            <a href="/userHotel" className="hover:text-gray-200">
                Hotels
            </a>
            <a href="/TourCotationCaculation" className="hover:text-gray-200">
                Quotation
            </a>
            <a href="#" className="hover:text-gray-200">
                Login
            </a>
            <a href="#" className="hover:text-gray-200">
                Sign Up
            </a>
            </nav>
        </div>
        </header>


      {/* Banner Section */}
      <section
        className="bg-cover bg-center h-96 relative"
        style={{ backgroundImage: `url(${vehicle4 || home})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-200 via-pink-300 to-orange-500 opacity-70"></div>
        
        <div className="container mx-auto text-center py-24 relative z-10">
          <h2 className="text-4xl font-extrabold bg-clip-text bg-gradient-to-r from-yellow-400 via-red-300 to-pink-200 mb-6 animate__animated animate__fadeIn text-blue-400">
            Choose Your Perfect Transport
          </h2>
          <p className="text-2xl font-semibold text-gray-100 opacity-90 mb-6 leading-relaxed">
            Travel in comfort and style with our fleet of modern vehicles. 
            From luxury cars to spacious vans, we have the perfect transport option for your journey.
          </p>
        </div>
      </section>

      {/* Vehicle Search Section */}
      <section id="vehicles" className="container mx-auto py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Our Vehicles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.length > 0 ? (
            filteredVehicles.map((vehicle, idx) => (
                <div key={idx} className="bg-white shadow-md rounded-lg">
                <img
                    src={vehicle.photo || vehicle1}
                    alt={vehicle.vehiclename}
                    className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-4">
                    <h3 className="text-xl font-semibold">{vehicle.vehiclename}</h3>
                    <button 
                    className="bg-orange-500 text-white py-2 px-4 rounded-md mt-4"
                    onClick={() => {
                        setSelectedVehicle(vehicle);
                        setShowModal(true);
                    }}
                    >
                    View Details
                    </button>
                </div>
                </div>
            ))
            ) : (
            <p className="text-center col-span-3">No vehicles found matching your criteria.</p>
            )}
        </div>

        {/* Vehicle Details Modal */}
        {showModal && selectedVehicle && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-90vh overflow-y-auto">
                <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedVehicle.vehiclename}</h2>
                <button 
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                >
                    ×
                </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img
                    src={getImageUrl(selectedVehicle.photo, vehicle1)}
                    alt={selectedVehicle.vehiclename}
                    className="w-full h-64 object-cover rounded-lg"
                />
                
                <div>
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Vehicle No:</span> {selectedVehicle.vehicleNo}</p>
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Type:</span> {selectedVehicle.vehicletype}</p>
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Seats:</span> {selectedVehicle.seat}</p>
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Driver:</span> {selectedVehicle.drivername}</p>
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Price per km:</span> ${selectedVehicle.PriceKm}</p>
                </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                <button 
                    className="bg-orange-500 text-white py-2 px-6 rounded-md"
                    onClick={() => setShowModal(false)}
                >
                    Close
                </button>
                </div>
            </div>
            </div>
        )}
        </section>

      {/* Our Vehicles Section */}
      <section id="vehicles" className="container mx-auto py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Our Vehicles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map((vehicle, idx) => (
              <div key={idx} className="bg-white shadow-md rounded-lg">
                <img
                  src={getImageUrl(vehicle.photo, vehicle1)}
                  alt={vehicle.vehiclename}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{vehicle.vehiclename}</h3>
                  <p className="text-gray-600">Type: {vehicle.vehicletype}</p>
                  <p className="text-gray-600">Seats: {vehicle.seat}</p>
                  <p className="text-gray-600">Driver: {vehicle.drivername}</p>
                  <p className="text-lg text-gray-600">
                    ${vehicle.PriceKm} per km
                  </p>
                  <button className="bg-orange-500 text-white py-2 px-4 rounded-md mt-4">
                    Book Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3">No vehicles found matching your criteria.</p>
          )}
        </div>
      </section>

      {/* Vehicle Features Section */}
      <section id="features" className="bg-gray-100 py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Vehicle Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 container mx-auto text-center">
          {[
            "Air Conditioning",
            "Comfortable Seating",
            "Experienced Drivers",
            "GPS Navigation",
            "Luggage Space",
            "Wi-Fi Available",
            "Child Seats",
            "24/7 Support",
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <MdSearch className="text-4xl text-orange-500 mx-auto" />
              </div>
              <h4 className="font-semibold text-lg">{feature}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Vehicle Gallery Section */}
      <section id="gallery" className="py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Vehicle Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto">
          {[1, 2, 3, 4, 5, 6].map((img, idx) => (
            <div key={idx} className="bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={vehicle2}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="bg-blue-600 text-white py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">
          What Our Clients Say
        </h2>
        <div className="flex justify-center space-x-8">
          {["James Brown", "Sophia Lee", "Ahmed Khan"].map((name, idx) => (
            <div key={idx} className="text-center">
              <img
                src={vehicle3}
                alt={`Review ${idx + 1}`}
                className="rounded-full mx-auto mb-4 w-24 h-24 object-cover"
              />
              <p className="text-lg font-semibold">{name}</p>
              <p className="text-sm">
                "The vehicles were clean, comfortable, and the drivers were professional and knowledgeable."
              </p>
              <div className="mt-2">
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto flex justify-between">
          <div>
            <p>&copy; 2025 Flamingo Tours. All rights reserved.</p>
          </div>
          <div>
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Transport;
