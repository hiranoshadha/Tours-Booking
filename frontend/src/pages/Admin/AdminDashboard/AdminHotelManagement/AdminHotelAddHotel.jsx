import React, { useState } from "react";
import { MdAdd, MdCancel } from "react-icons/md"; // Importing icons
import SideNavbar from "./../../../../components/AdminDashboard/Navbar";
import Header from "./../../../../components/AdminDashboard/Header";
import axios from "axios"; // Importing Axios
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate

const AddHotel = () => {
  const navigate = useNavigate(); // Use navigate hook for navigation

  const [hotelName, setHotelName] = useState("");
  const [hotelAddress, setHotelAddress] = useState("");
  const [hotelTelNo, setHotelTelNo] = useState("");
  const [hotelType, setHotelType] = useState("");
  const [hotelCategory, setHotelCategory] = useState("");
  const [tourArea, setTourArea] = useState("");
  const [hotelCapacity, setHotelCapacity] = useState("");
  const [roomPrice, setRoomPrice] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [images, setImages] = useState([]);

  // Define state for amenities
  const [amenities, setAmenities] = useState({
    petFriendly: false,
    smoking: false,
    wifi: false,
    miniBar: false,
    coffeeMaker: false,
    cityView: false,
    shower: false,
    sofaBox: false,
    refrigerator: false,
    airConditioner: false,
    tvCable: false,
    seaView: false,
  });

  // Define state for accessibility features
  const [accessibility, setAccessibility] = useState({
    wheelchairAccessible: false,
    showerGrabBars: false,
    hearingAidCompatible: false,
  });

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  // Handle image removal
  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Handle amenities change
  const handleAmenityChange = (event) => {
    const { name, checked } = event.target;
    setAmenities((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  // Handle accessibility change
  const handleAccessibilityChange = (event) => {
    const { name, checked } = event.target;
    setAccessibility((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  // Validate form fields before submitting
  const validateForm = () => {
    if (
      !hotelName ||
      !hotelAddress ||
      !hotelTelNo ||
      !hotelType ||
      !hotelCategory ||
      !tourArea ||
      !hotelCapacity ||
      !roomPrice ||
      !roomDescription
    ) {
      alert("Please fill out all required fields.");
      return false;
    }

    // Validate hotelTelNo (exactly 10 digits)
    const telNoRegex = /^\d{10}$/;
    if (!telNoRegex.test(hotelTelNo)) {
      alert("Hotel Tel-No must be exactly 10 digits.");
      return false;
    }

    // Validate hotelCapacity (at least 10)
    if (hotelCapacity < 10) {
      alert("Hotel capacity must be at least 10.");
      return false;
    }

    // Validate roomPrice (Rs. 10,000 or greater)
    if (roomPrice < 10000) {
      alert("Room price must be Rs. 10,000 or greater.");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before submitting
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("hotelName", hotelName);
    formData.append("hotelAddress", hotelAddress);
    formData.append("hotelTelNo", hotelTelNo);
    formData.append("hotelType", hotelType);
    formData.append("hotelCategory", hotelCategory);
    formData.append("tourArea", tourArea);
    formData.append("hotelCapacity", hotelCapacity);
    formData.append("roomPrice", roomPrice);
    formData.append("roomDescription", roomDescription);
    formData.append("amenities", JSON.stringify(amenities));
    formData.append("accessibility", JSON.stringify(accessibility));

    // Append images to formData
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      // Send POST request to backend to add hotel
      const response = await axios.post(
        "http://localhost:3000/api/hotels",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important to set this for file upload
          },
        }
      );

      alert("Hotel added successfully!");
      navigate("/adminHotelManagement");
    } catch (error) {
      console.error("Error adding hotel:", error);
      alert("There was an error adding the hotel.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className=" mx-auto p-8 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Add New Hotel</h2>

            <form onSubmit={handleSubmit}>
              {/* Hotel Picture Section */}
              <div className="mb-6">
                <label className="block mb-2 font-medium text-gray-700">
                  Hotel Picture
                </label>
                <div className="w-full max-w-[700px] overflow-x-auto">
                  <div className="flex space-x-4 py-2 flex-nowrap">
                    {/* Display uploaded images */}
                    {images.length > 0 ? (
                      images.map((image, index) => (
                        <div
                          key={index}
                          className="relative min-w-[160px] w-40 h-40"
                        >
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Hotel Pic ${index + 1}`}
                            className="object-cover w-full h-full rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => handleImageRemove(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                          >
                            <MdCancel />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="w-40 h-40 border-2 border-dashed border-gray-400 flex justify-center items-center rounded-lg min-w-[160px]">
                        <span className="text-gray-500">No images</span>
                      </div>
                    )}

                    {/* "Add Image" button */}
                    <label
                      htmlFor="image-upload"
                      className="w-40 h-40 border-2 border-dashed border-gray-400 flex justify-center items-center rounded-lg cursor-pointer min-w-[160px]"
                    >
                      <MdAdd size={24} className="text-gray-500" />
                    </label>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Hotel Details Section */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Hotel Name *
                  </label>
                  <input
                    type="text"
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Hotel Address *
                  </label>
                  <input
                    type="text"
                    value={hotelAddress}
                    onChange={(e) => setHotelAddress(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Hotel Tel-No *
                  </label>
                  <input
                    type="tel"
                    value={hotelTelNo}
                    onChange={(e) => setHotelTelNo(e.target.value)}
                    required
                    pattern="^\d{10}$"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Hotel Type *
                  </label>
                  <select
                    value={hotelType}
                    onChange={(e) => setHotelType(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Hotel Type</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Suite">Suite</option>
                    <option value="Standard">Standard</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Hotel Category *
                  </label>
                  <select
                    value={hotelCategory}
                    onChange={(e) => setHotelCategory(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Hotel Category</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Budget">Budget</option>
                    <option value="Standard">Standard</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Tour Area *
                  </label>
                  <select
                    value={tourArea}
                    onChange={(e) => setTourArea(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Tour Area</option>
                    <option value="Down south">Down south</option>
                    <option value="North">North</option>
                    <option value="East">East</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Hotel Capacity *
                  </label>
                  <input
                    type="number"
                    value={hotelCapacity}
                    onChange={(e) => setHotelCapacity(e.target.value)}
                    required
                    min="10"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Room Price *
                  </label>
                  <input
                    type="number"
                    value={roomPrice}
                    onChange={(e) => setRoomPrice(e.target.value)}
                    required
                    min="10000"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block mb-2 font-medium text-gray-700">
                    Room Description *
                  </label>
                  <textarea
                    value={roomDescription}
                    onChange={(e) => setRoomDescription(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/* Amenities Section */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    "Pet-friendly",
                    "Smoking",
                    "Wi-Fi",
                    "Mini-bar",
                    "Coffee maker",
                    "City view",
                    "Shower",
                    "Sofa box",
                    "Refrigerator",
                    "Air conditioner",
                    "TV Cable",
                    "Sea view",
                  ].map((amenity, index) => (
                    <label key={index} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name={amenity.toLowerCase().replace(" ", "")}
                        checked={
                          amenities[amenity.toLowerCase().replace(" ", "")]
                        }
                        onChange={handleAmenityChange}
                        className="form-checkbox"
                      />
                      <span>{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Accessibility Features Section */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">
                  Accessibility Features
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    "Wheelchair accessible",
                    "Shower grab bars",
                    "Hearing aid compatible",
                  ].map((feature, index) => (
                    <label key={index} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name={feature.toLowerCase().replace(" ", "")}
                        checked={
                          accessibility[feature.toLowerCase().replace(" ", "")]
                        }
                        onChange={handleAccessibilityChange}
                        className="form-checkbox"
                      />
                      <span>{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500"
                >
                  Add Hotel
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddHotel;
