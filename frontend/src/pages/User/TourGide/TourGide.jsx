import React, { useState, useEffect } from "react";
import { MdSearch } from "react-icons/md";
import { getImageUrl } from '../../../utils/imageUtils';
import home from "../../.././assets/Background.jpg";
import guide1 from "../../.././assets/hotel1.jpg"; // You'll need to add these images
import guide2 from "../../.././assets/hotel2.webp";
import guide3 from "../../.././assets/hotel3.jpg";
import guide4 from "../../.././assets/hotel4.jpg";
import axios from "axios";

const TourGide = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [guides, setGuides] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch guides from the API
    const fetchGuides = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/guide");
        console.log(response.data);
        setGuides(response.data);
        setFilteredGuides(response.data);
      } catch (error) {
        console.error("Error fetching guides:", error);
      }
    };

    fetchGuides();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setFilteredGuides(guides);
    } else {
      const filtered = guides.filter(guide => 
        guide.name.toLowerCase().includes(query.toLowerCase()) ||
        guide.language.some(lang => lang.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredGuides(filtered);
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
        style={{ backgroundImage: `url(${guide4 || home})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-200 via-pink-300 to-orange-500 opacity-70"></div>
        
        <div className="container mx-auto text-center py-24 relative z-10">
          <h2 className="text-4xl font-extrabold bg-clip-text bg-gradient-to-r from-yellow-400 via-red-300 to-pink-200 mb-6 animate__animated animate__fadeIn text-blue-400">
            Explore with Our Expert Tour Guides
          </h2>
          <p className="text-2xl font-semibold text-gray-100 opacity-90 mb-6 leading-relaxed">
            Discover Sri Lanka with knowledgeable local guides who bring history and culture to life.
            Choose the perfect guide for your adventure.
          </p>
        </div>
      </section>

      {/* Guide Search Section */}
      <section className="container mx-auto my-8 text-center" id="booking">
        <div className="bg-white shadow-lg p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">FIND YOUR TOUR GUIDE</h2>

          {/* Guide Search Area */}
          <div className="mb-6">
            <label className="block text-lg mb-2">Search Tour Guides</label>
            <div className="flex justify-center space-x-4">
              <input
                type="text"
                placeholder="Enter guide name or language"
                className="p-2 rounded-md border border-gray-300 w-64"
                value={searchQuery}
                onChange={handleSearch}
              />

              {/* Language Filter */}
              <select
                className="p-2 rounded-md border border-gray-300"
                defaultValue="all"
              >
                <option value="all">All Languages</option>
                <option value="english">English</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="spanish">Spanish</option>
                <option value="chinese">Chinese</option>
              </select>

              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Guides Section */}
      <section id="guides" className="container mx-auto py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Our Tour Guides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.length > 0 ? (
            filteredGuides.map((guide, idx) => (
              <div key={idx} className="bg-white shadow-md rounded-lg">
                <img
                  src={getImageUrl(guide.photo, guide1)}
                  alt={guide.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{guide.name}</h3>
                  <button 
                    className="bg-orange-500 text-white py-2 px-4 rounded-md mt-4"
                    onClick={() => {
                      setSelectedGuide(guide);
                      setShowModal(true);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3">No guides found matching your criteria.</p>
          )}
        </div>

        {/* Guide Details Modal */}
        {showModal && selectedGuide && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-90vh overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedGuide.name}</h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <img
                src={getImageUrl(selectedGuide.photo, guide1)}
                alt={selectedGuide.name}
                className="w-full h-64 object-cover rounded-lg"
              />
                
                <div>
                  <p className="text-gray-700 mb-2"><span className="font-semibold">Guide ID:</span> {selectedGuide.tourGuideID}</p>
                  <p className="text-gray-700 mb-2"><span className="font-semibold">Contact:</span> {selectedGuide.Contact}</p>
                  <p className="text-gray-700 mb-2"><span className="font-semibold">Languages:</span> {selectedGuide.language?.join(", ")}</p>
                  <p className="text-gray-700 mb-2"><span className="font-semibold">Experience:</span> {selectedGuide.experience}</p>
                  <p className="text-gray-700 mb-2"><span className="font-semibold">Charges:</span> ${selectedGuide.charges} per day</p>
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

      {/* Guide Specialties Section */}
      <section id="specialties" className="bg-gray-100 py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Guide Specialties
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 container mx-auto text-center">
          {[
            "Cultural Tours",
            "Wildlife Safaris",
            "Historical Sites",
            "Adventure Tours",
            "City Tours",
            "Food Tours",
            "Photography Tours",
            "Trekking",
          ].map((specialty, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <MdSearch className="text-4xl text-orange-500 mx-auto" />
              </div>
              <h4 className="font-semibold text-lg">{specialty}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Guide Gallery Section */}
      <section id="gallery" className="py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Guide Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto">
          {[1, 2, 3, 4, 5, 6].map((img, idx) => (
            <div key={idx} className="bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={guide2}
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
          What Travelers Say
        </h2>
        <div className="flex justify-center space-x-8">
          {["Sarah Johnson", "Michael Chen", "Emma Rodriguez"].map((name, idx) => (
            <div key={idx} className="text-center">
              <img
                src={guide3}
                alt={`Review ${idx + 1}`}
                className="rounded-full mx-auto mb-4 w-24 h-24 object-cover"
              />
              <p className="text-lg font-semibold">{name}</p>
              <p className="text-sm">
                "Our guide was knowledgeable and made our trip unforgettable!"
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

export default TourGide;
