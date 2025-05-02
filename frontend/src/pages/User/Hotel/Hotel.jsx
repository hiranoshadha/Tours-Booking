import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import home from "../../.././assets/Background.jpg";
import hotel1 from "../../.././assets/hotel1.jpg";
import hotel2 from "../../.././assets/hotel2.webp";
import hotel3 from "../../.././assets/hotel3.jpg";
import hotel4 from "../../.././assets/hotel4.jpg";
import hotel5 from "../../.././assets/hotel5.jpg";

const HotelPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

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


      {/* Booking Section */}
      <section
  className="bg-cover bg-center h-96 relative"
  style={{ backgroundImage: `url(${hotel4})` }}
>
  {/* Gradient Overlay with higher opacity */}
  <div className="absolute inset-0 bg-gradient-to-r from-purple-200 via-pink-300 to-orange-500 opacity-70"></div>
  
  <div className="container mx-auto text-center py-24 relative z-10">
    <h2 className="text-4xl font-extrabold bg-clip-text bg-gradient-to-r from-yellow-400 via-red-300 to-pink-200 mb-6 animate__animated animate__fadeIn text-blue-400">
      Welcome to FlamingGO's Tour Quotation Calculator,
    </h2>
    <p className="text-2xl font-semibold text-gray-100 opacity-90 mb-6 leading-relaxed">
      Where planning your dream vacation is just a click away. Get instant, accurate
      quotes for customized tours tailored to your needs and budget.
    </p>
  </div>
</section>




      <section className="container mx-auto my-8 text-center" id="booking">
        <div className="bg-white shadow-lg p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">SELECT HOTELS</h2>

          {/* Hotel Search Area */}
          <div className="mb-6">
            <label className="block text-lg mb-2">Search Hotels</label>
            <div className="flex justify-center space-x-4">
              <input
                type="text"
                placeholder="Enter hotel name or location"
                className="p-2 rounded-md border border-gray-300 w-64"
              />

              {/* Availability Filter */}
              <select
                className="p-2 rounded-md border border-gray-300"
                defaultValue="all"
              >
                <option value="all">All Hotels</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>

              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Room Section */}
      <section id="rooms" className="container mx-auto py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Our Hotels</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {["Family Hotel", "Luxury Hotel", "Deluxe Hotel"].map((Hotel, idx) => (
            <div key={idx} className="bg-white shadow-md rounded-lg">
              <img
                src={hotel1}
                alt="Room"
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{Hotel}</h3>
                <p className="text-lg text-gray-600">
                  Starting from $199 per night
                </p>
                <button className="bg-orange-500 text-white py-2 px-4 rounded-md mt-4">
                  Detailes
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Services Section */}
      <section id="services" className="bg-gray-100 py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 container mx-auto text-center">
          {[
            "Restaurant",
            "Transport Facility",
            "Free Wi-Fi",
            "Spa & Salon",
            "Swimming Pool",
            "Mini Bar",
            "Conference Room",
            "Game Room",
          ].map((service, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <MdSearch className="text-4xl text-orange-500 mx-auto" />
              </div>
              <h4 className="font-semibold text-lg">{service}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Our Gallery Section */}
      <section id="gallery" className="py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Our Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto">
          {["image1", "image2", "image3", "image4", "image5", "image6"].map(
            (img, idx) => (
              <div key={idx} className="bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={hotel2}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )
          )}
        </div>
      </section>

      {/* What People Say Section */}
      <section id="reviews" className="bg-blue-600 text-white py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">
          What People Say
        </h2>
        <div className="flex justify-center space-x-8">
          {["John Doe", "Esther Howard", "Kathryn Murphy"].map((name, idx) => (
            <div key={idx} className="text-center">
              <img
                src={hotel3}
                alt={`Review ${idx + 1}`}
                className="rounded-full mx-auto mb-4 w-24 h-24 object-cover"
              />
              <p className="text-lg font-semibold">{name}</p>
              <p className="text-sm">
                "Great experience, had an amazing stay!"
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
            <p>&copy; 2025 Hotel. All rights reserved.</p>
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

export default HotelPage;
