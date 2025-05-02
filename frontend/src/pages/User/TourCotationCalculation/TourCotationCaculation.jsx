import React, { useState } from 'react';
import hotel23 from '../../../assets/Hotel23.png';

const TourPackageQuotation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [groupQuantity, setGroupQuantity] = useState('');
  const [medicalNeeds, setMedicalNeeds] = useState([]);
  
  const handleMedicalChange = (e) => {
    const { value, checked } = e.target;
    setMedicalNeeds(prevState => checked ? [...prevState, value] : prevState.filter(item => item !== value));
  };

  return (
    <div className="font-sans">
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

      {/* Hero Section */}
      <section className="bg-cover bg-center h-96" style={{ backgroundImage: `url(${hotel23})` }}>
        <div className="container mx-auto text-center py-24 text-white">
          <h2 className="text-4xl font-bold mb-4">Travel, enjoy and live a new and full life</h2>
          <p className="text-xl mb-4">Built Wicket longer admire do barton vanity itself do in it.</p>
          <div className="flex justify-center space-x-6">
            <a href="#find-out" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg">Find out more</a>
            <a href="#play-demo" className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg">Play Demo</a>
          </div>
        </div>
      </section>

      {/* Report Preview Section */}
      <section className="container mx-auto py-8">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold">Report Preview</h3>
          <div className="space-x-4">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg">Preview</button>
            <button className="bg-gray-500 text-white px-6 py-3 rounded-lg">Edit</button>
          </div>
        </div>
        <div className="border border-gray-300 mt-6 p-6 text-center">
          <p>Preview will be generated here</p>
        </div>
      </section>

      {/* Create Tour Package Quotation */}
      <section className="container mx-auto py-8" id="quotation">
        <h3 className="text-2xl font-semibold mb-6">Create Tour Package Quotation</h3>
        <div className="bg-white shadow-lg p-8 rounded-lg">
          <form>
            {/* Tour Package */}
            <div className="mb-4">
              <label className="block text-lg">Select Tour Package</label>
              <select className="w-full p-3 border rounded-md mt-2">
                <option>Select Tour Package</option>
                <option>Package 1</option>
                <option>Package 2</option>
              </select>
            </div>

            {/* Select Vehicle */}
            <div className="mb-4">
              <label className="block text-lg">Select Vehicle</label>
              <select className="w-full p-3 border rounded-md mt-2">
                <option>Select Vehicle Type</option>
                <option>Vehicle 1</option>
                <option>Vehicle 2</option>
              </select>
            </div>

            {/* Select Hotel */}
            <div className="mb-4">
              <label className="block text-lg">Select Hotel Category</label>
              <select className="w-full p-3 border rounded-md mt-2">
                <option>Choose Hotel Category</option>
                <option>Luxury</option>
                <option>Standard</option>
              </select>
            </div>

            {/* Select Guide */}
            <div className="mb-4">
              <label className="block text-lg">Select Guide Type</label>
              <select className="w-full p-3 border rounded-md mt-2">
                <option>Choose Guide Type</option>
                <option>English</option>
                <option>Spanish</option>
              </select>
            </div>

            {/* Group Quantity */}
            <div className="mb-4">
              <label className="block text-lg">Group Quantity</label>
              <input
                type="number"
                className="w-full p-3 border rounded-md mt-2"
                placeholder="Enter number of people"
                value={groupQuantity}
                onChange={(e) => setGroupQuantity(e.target.value)}
              />
            </div>

            {/* Special Medical Needs Button */}
            <div className="flex justify-between items-center mb-6">
              <button type="button" className="bg-blue-500 text-white px-6 py-3 rounded-lg">
                Next
              </button>
              <button type="button" className="bg-gray-500 text-white px-6 py-3 rounded-lg">
                Special Medical Needs
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Special Medical Needs Section */}
      <section className="container mx-auto py-8">
        <h3 className="text-2xl font-semibold mb-6">Special Medical Needs</h3>
        <div className="bg-white shadow-lg p-8 rounded-lg">
          <form>
            <div className="space-y-4">
              <label className="block text-lg">Select applicable medical conditions</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Older than 65 years",
                  "With Arthritis",
                  "With Osteoporosis",
                  "Respiratory Disease",
                  "Pregnancy",
                  "Deep Vein Thrombosis",
                  "Heat and Cold Sensitivity",
                  "Hypertension/Heart Diseases",
                  "High Altitude Sickness",
                  "Insect Born Disease Risks",
                ].map((condition, idx) => (
                  <div key={idx} className="flex items-center">
                    <input
                      type="checkbox"
                      value={condition}
                      onChange={handleMedicalChange}
                      className="form-checkbox h-5 w-5 text-blue-500"
                    />
                    <span className="ml-2">{condition}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-lg">Room Description</label>
              <textarea
                className="w-full p-3 border rounded-md mt-2"
                rows="4"
                placeholder="Enter room description"
              />
            </div>

            {/* Confirm Medical Needs Button */}
            <div className="flex justify-between items-center mt-6">
              <button type="button" className="bg-blue-500 text-white px-6 py-3 rounded-lg">
                Confirm Medical Needs
              </button>
              <button type="button" className="bg-gray-500 text-white px-6 py-3 rounded-lg">
                Back
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-black text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Flamingo Tours. All rights reserved.</p>
          <div className="space-x-6">
            <a href="#" className="hover:text-gray-400">Facebook</a>
            <a href="#" className="hover:text-gray-400">Twitter</a>
            <a href="#" className="hover:text-gray-400">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TourPackageQuotation;
