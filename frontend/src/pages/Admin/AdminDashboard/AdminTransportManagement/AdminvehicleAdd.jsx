import { useState } from "react";
import SideNavbar from "./../../../../components/AdminDashboard/Navbar";
import Header from "./../../../../components/AdminDashboard/Header";

export default function AddVehicleForm() {
  const [vehicle, setVehicle] = useState({
    number: "ABC1234",
    name: "Luxury Bus",
    type: "Bus",
    seat: "40",
    price: "50.00",
    description: "A luxurious bus with spacious seats and great comfort.",
    amenities: ["Wi-Fi", "Sofa box", "Air conditioner", "TV Cable"],
    accessibility: ["Wheelchair accessible", "Hearing aid compatible"],
    images: [
      "https://via.placeholder.com/150", // Placeholder image URLs for pre-filled images
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  });

  const amenitiesOptions = ["Wi-Fi", "Sofa box", "Air conditioner", "TV Cable"];
  const accessibilityOptions = [
    "Wheelchair accessible",
    "Shower grab bars",
    "Hearing aid compatible",
  ];

  // Function to handle image upload
  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVehicle((prev) => {
          const updatedImages = [...prev.images];
          updatedImages[index] = reader.result; // Store the image data
          return { ...prev, images: updatedImages };
        });
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-3xl mx-auto p-6 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold mb-4">➕ Add New Vehicle</h2>

            {/* Image Upload */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[0, 1, 2].map((index) => (
                <div key={index} className="border-2 border-dashed border-gray-400 p-4 rounded-lg text-center bg-gray-100">
                  {/* Display image if it's selected */}
                  {vehicle.images[index] ? (
                    <img
                      src={vehicle.images[index]}
                      alt={`Uploaded ${index + 1}`}
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                  ) : (
                    <div className="text-gray-500 text-3xl">+</div>
                  )}
                  <label className="text-gray-600 block mt-2">Add Image {index + 1}</label>
                  <input
                    type="file"
                    className="mt-2"
                    onChange={(e) => handleImageUpload(e, index)}
                  />
                </div>
              ))}
            </div>

            {/* Vehicle Details */}
            <h3 className="mb-4">Vehicle No:</h3>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Vehicle No"
                className="border p-2 rounded bg-white"
                value={vehicle.number}
                onChange={(e) => setVehicle({ ...vehicle, number: e.target.value })}
              />
              <h3>Vehicle Name:</h3>
              <input
                type="text"
                placeholder="Vehicle Name"
                className="border p-2 rounded bg-white"
                value={vehicle.name}
                onChange={(e) => setVehicle({ ...vehicle, name: e.target.value })}
              />
              <h3>Vehicle Type:</h3>
              <input
                type="text"
                placeholder="Vehicle Type"
                className="border p-2 rounded bg-white"
                value={vehicle.type}
                onChange={(e) => setVehicle({ ...vehicle, type: e.target.value })}
              />
            </div>

            <h3>Seat:</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input
                type="number"
                placeholder="Seat"
                className="border p-2 rounded bg-white"
                value={vehicle.seat}
                onChange={(e) => setVehicle({ ...vehicle, seat: e.target.value })}
                min="1"
              />
            </div>

            <h3>Price(Km):</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input
                type="text"
                placeholder="Price (Km)"
                className="border p-2 rounded bg-white"
                value={vehicle.price}
                onChange={(e) => {
                  // Allow only numeric input (including decimal points)
                  const value = e.target.value;
                  if (/^\d*\.?\d*$/.test(value)) {
                    setVehicle({ ...vehicle, price: value });
                  }
                }}
              />
            </div>

            <h3>Vehicle Description: </h3>
            <textarea
              placeholder="Vehicle Description"
              className="w-full border p-2 mt-4 rounded bg-white"
              value={vehicle.description}
              onChange={(e) => setVehicle({ ...vehicle, description: e.target.value })}
            />

            {/* Amenities */}
            <div className="mt-4">
              <h3 className="font-semibold">Amenities</h3>
              <div className="grid grid-cols-2 gap-2">
                {amenitiesOptions.map((amenity) => (
                  <label key={amenity} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={vehicle.amenities.includes(amenity)}
                      onChange={() => {
                        const updatedAmenities = vehicle.amenities.includes(amenity)
                          ? vehicle.amenities.filter((item) => item !== amenity)
                          : [...vehicle.amenities, amenity];
                        setVehicle({ ...vehicle, amenities: updatedAmenities });
                      }}
                    />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Accessibility Features */}
            <div className="mt-4">
              <h3 className="font-semibold">Accessibility Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {accessibilityOptions.map((feature) => (
                  <label key={feature} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={vehicle.accessibility.includes(feature)}
                      onChange={() => {
                        const updatedAccessibility = vehicle.accessibility.includes(feature)
                          ? vehicle.accessibility.filter((item) => item !== feature)
                          : [...vehicle.accessibility, feature];
                        setVehicle({ ...vehicle, accessibility: updatedAccessibility });
                      }}
                    />
                    <span>{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">Add Vehicle</button>
              <button className="border py-2 px-4 rounded hover:bg-gray-100">Cancel</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
