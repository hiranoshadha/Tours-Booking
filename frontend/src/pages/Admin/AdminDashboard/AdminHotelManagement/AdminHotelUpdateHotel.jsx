import React, { useState, useEffect } from "react";
import { MdAdd, MdCancel } from "react-icons/md"; // Importing icons
import SideNavbar from "./../../../../components/AdminDashboard/Navbar";
import Header from "./../../../../components/AdminDashboard/Header";
import axios from "axios"; // Importing Axios
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate

const EditHotel = () => {
  const { hotelId } = useParams(); // Get hotel ID from URL params
  const navigate = useNavigate(); // Use navigate hook for navigation

  // States to manage hotel data and image uploads
  const [hotelName, setHotelName] = useState("");
  const [hotelAddress, setHotelAddress] = useState("");
  const [hotelTelNo, setHotelTelNo] = useState("");
  const [hotelType, setHotelType] = useState("");
  const [hotelCategory, setHotelCategory] = useState("");
  const [tourArea, setTourArea] = useState("");
  const [roomCapacity, setRoomCapacity] = useState("");
  const [roomPrice, setRoomPrice] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [backendImages, setBackendImages] = useState([]); // Separate state for backend images
  const [newImages, setNewImages] = useState([]); // Separate state for new images
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
  const [accessibility, setAccessibility] = useState({
    wheelchairAccessible: false,
    showerGrabBars: false,
    hearingAidCompatible: false,
  });

  // Fetch hotel data on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/hotels/${hotelId}`)
      .then((response) => {
        const hotel = response.data;
        setHotelName(hotel.hotelName);
        setHotelAddress(hotel.hotelAddress);
        setHotelTelNo(hotel.hotelTelNo);
        setHotelType(hotel.hotelType);
        setHotelCategory(hotel.hotelCategory);
        setTourArea(hotel.tourArea);
        setRoomCapacity(hotel.roomCapacity);
        setRoomPrice(hotel.roomPrice);
        setRoomDescription(hotel.roomDescription);
        setAmenities(hotel.amenities);
        setAccessibility(hotel.accessibility);
        setBackendImages(hotel.images); // Store backend images separately
      })
      .catch((error) => {
        console.error("Error fetching hotel data:", error);
        alert("There was an error loading the hotel data.");
      });
  }, [hotelId]);

  // Handle image upload (new images)
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prevImages) => [...prevImages, ...files]);
  };

  // Handle image preview logic
  const handleImagePreview = (image) => {
    // Check if the image is a URL (backend image) or a File object (new image)
    if (typeof image === "string" && image.startsWith("http")) {
      return image; // For backend images, return the URL directly
    } else if (image instanceof File) {
      return URL.createObjectURL(image); // For new images, create an object URL for preview
    }
    return null; // If no valid image type, return null
  };

  // Handle image removal for new images
  const handleImageRemove = (index) => {
    setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
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
    if (!hotelName || !hotelAddress || !hotelTelNo || !hotelType || !hotelCategory || !tourArea || !roomCapacity || !roomPrice || !roomDescription) {
      alert("Please fill out all required fields.");
      return false;
    }

    // Validate hotelTelNo (exactly 10 digits)
    const telNoRegex = /^\d{10}$/;
    if (!telNoRegex.test(hotelTelNo)) {
      alert("Hotel Tel-No must be exactly 10 digits.");
      return false;
    }

    // Validate roomCapacity (at least 10)
    if (roomCapacity < 10) {
      alert("Room capacity must be at least 10.");
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
    formData.append("roomCapacity", roomCapacity);
    formData.append("roomPrice", roomPrice);
    formData.append("roomDescription", roomDescription);
    formData.append("amenities", JSON.stringify(amenities));
    formData.append("accessibility", JSON.stringify(accessibility));

    // Append both backend and new images to formData
    backendImages.forEach((image) => {
      formData.append("images", image); // Keep backend images as they are
    });
    newImages.forEach((image) => {
      formData.append("images", image); // Append new images
    });

    try {
      // Send PUT request to backend to update hotel data
      await axios.put(`http://localhost:3000/api/hotels/${hotelId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important to set this for file upload
        },
      });

      alert("Hotel changes saved successfully!");
      navigate("/adminHotelManagement"); // Navigate back to the hotel management page
    } catch (error) {
      console.error("Error updating hotel:", error);
      alert("There was an error saving the hotel changes.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="container mx-auto p-8 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">
              Edit Hotel #{hotelId}
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Room Picture Section */}
              <div className="mb-6">
                <label className="block mb-2 font-medium text-gray-700">
                  Hotel Picture
                </label>

                {/* Backend Images Section */}
                {backendImages.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">
                      Added Images
                    </h3>
                    <div className="flex overflow-x-auto py-2 space-x-4">
                      {backendImages.map((image, index) => (
                        <div key={index} className="relative w-40 h-40">
                          <img
                            src={`http://localhost:3000${image}`} // Preview backend image
                            alt={`Hotel Pic ${index + 1}`}
                            className="object-cover w-full h-full rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-4">New Images</h3>
                <div className="w-full max-w-[700px] overflow-x-auto">
                <div className="flex space-x-4 py-2 flex-nowrap">
                  
                  {/* New Images Section */}
                  {newImages.length > 0 && (
                    <div className="mb-6">
                      <div className="flex overflow-x-auto py-2 space-x-4">
                        {newImages.map((image, index) => (
                          <div key={index} className="relative w-40 h-40">
                            <img
                              src={handleImagePreview(image)} // Preview new image
                              alt={`New Hotel Pic ${index + 1}`}
                              className="object-cover w-full h-full rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => handleImageRemove(index)} // Remove new image
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                            >
                              <MdCancel />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add New Image */}
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
                    Hotel Contact *
                  </label>
                  <input
                    type="text"
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
                    <option value="Luxury">Luxury</option>
                    <option value="Budget">Budget</option>
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
                    <option value="Down south">Down south</option>
                    <option value="North">North</option>
                    <option value="East">East</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Room Capacity *
                  </label>
                  <input
                    type="number"
                    value={roomCapacity}
                    onChange={(e) => setRoomCapacity(e.target.value)}
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
                  Save Changes
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

export default EditHotel;