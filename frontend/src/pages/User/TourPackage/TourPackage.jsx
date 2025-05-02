import React, { useState, useEffect } from "react";
import { MdSearch } from "react-icons/md";
import { getImageUrl } from '../../../utils/imageUtils';
import home from "../../.././assets/Background.jpg";
import tour1 from "../../.././assets/hotel1.jpg"; // You'll need to add these images
import tour2 from "../../.././assets/hotel2.webp";
import tour3 from "../../.././assets/hotel3.jpg";
import tour4 from "../../.././assets/hotel4.jpg";
import axios from "axios";

const TourPackage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch tours from the API
    const fetchTours = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/tours");
        setTours(response.data);
        console.log(response.data);
        setFilteredTours(response.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setFilteredTours(tours);
    } else {
      const filtered = tours.filter(tour => 
        tour.name.toLowerCase().includes(query.toLowerCase()) ||
        tour.destination.some(dest => dest.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredTours(filtered);
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
        style={{ backgroundImage: `url(${tour4 || home})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-200 via-pink-300 to-orange-500 opacity-70"></div>
        
        <div className="container mx-auto text-center py-24 relative z-10">
          <h2 className="text-4xl font-extrabold bg-clip-text bg-gradient-to-r from-yellow-400 via-red-300 to-pink-200 mb-6 animate__animated animate__fadeIn text-blue-400">
            Discover Our Exciting Tour Packages
          </h2>
          <p className="text-2xl font-semibold text-gray-100 opacity-90 mb-6 leading-relaxed">
            Explore Sri Lanka with our carefully crafted tour packages designed to give you 
            the perfect balance of adventure, relaxation, and cultural immersion.
          </p>
        </div>
      </section>

      {/* Tour Search Section */}
      <section className="container mx-auto my-8 text-center" id="booking">
        <div className="bg-white shadow-lg p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">FIND YOUR PERFECT TOUR</h2>

          {/* Tour Search Area */}
          <div className="mb-6">
            <label className="block text-lg mb-2">Search Tour Packages</label>
            <div className="flex justify-center space-x-4">
              <input
                type="text"
                placeholder="Enter destination or tour name"
                className="p-2 rounded-md border border-gray-300 w-64"
                value={searchQuery}
                onChange={handleSearch}
              />

              {/* Duration Filter */}
              <select
                className="p-2 rounded-md border border-gray-300"
                defaultValue="all"
              >
                <option value="all">All Durations</option>
                <option value="1-3">1-3 Days</option>
                <option value="4-7">4-7 Days</option>
                <option value="8-14">8-14 Days</option>
                <option value="15+">15+ Days</option>
              </select>

              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Tour Packages Section */}
      <section id="packages" className="container mx-auto py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Our Tour Packages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.length > 0 ? (
            filteredTours.map((tour, idx) => (
                <div key={idx} className="bg-white shadow-md rounded-lg">
                <img
                    src={getImageUrl(tour.photo , tour1)}
                    alt={tour.name}
                    className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-4">
                    <h3 className="text-xl font-semibold">{tour.name}</h3>
                    <button 
                    className="bg-orange-500 text-white py-2 px-4 rounded-md mt-4"
                    onClick={() => {
                        setSelectedTour(tour);
                        setShowModal(true);
                    }}
                    >
                    View Details
                    </button>
                </div>
                </div>
            ))
            ) : (
            <p className="text-center col-span-3">No tour packages found matching your criteria.</p>
            )}
        </div>

        {/* Tour Details Modal */}
        {showModal && selectedTour && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-90vh overflow-y-auto">
                <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedTour.name}</h2>
                <button 
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                >
                    ×
                </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img
                    src={getImageUrl(selectedTour.photo , tour1)}
                    alt={selectedTour.name}
                    className="w-full h-64 object-cover rounded-lg"
                />
                
                <div>
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Tour ID:</span> {selectedTour.TourID}</p>
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Destinations:</span> {selectedTour.destination?.join(", ")}</p>
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Duration:</span> {selectedTour.days} days</p>
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Distance:</span> {selectedTour.Kmrs} km</p>
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

      {/* Tour Highlights Section */}
      <section id="highlights" className="bg-gray-100 py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Tour Highlights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 container mx-auto text-center">
          {[
            "Cultural Heritage",
            "Wildlife Safaris",
            "Beach Getaways",
            "Mountain Treks",
            "Ancient Ruins",
            "Local Cuisine",
            "Adventure Sports",
            "Scenic Landscapes",
          ].map((highlight, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <MdSearch className="text-4xl text-orange-500 mx-auto" />
              </div>
              <h4 className="font-semibold text-lg">{highlight}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Tour Gallery Section */}
      <section id="gallery" className="py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Tour Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto">
          {[1, 2, 3, 4, 5, 6].map((img, idx) => (
            <div key={idx} className="bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={tour2}
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
          What Our Travelers Say
        </h2>
        <div className="flex justify-center space-x-8">
          {["David Wilson", "Lisa Chang", "Robert Patel"].map((name, idx) => (
            <div key={idx} className="text-center">
              <img
                src={tour3}
                alt={`Review ${idx + 1}`}
                className="rounded-full mx-auto mb-4 w-24 h-24 object-cover"
              />
              <p className="text-lg font-semibold">{name}</p>
              <p className="text-sm">
                "The tour was perfectly organized and exceeded all our expectations!"
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

export default TourPackage;
