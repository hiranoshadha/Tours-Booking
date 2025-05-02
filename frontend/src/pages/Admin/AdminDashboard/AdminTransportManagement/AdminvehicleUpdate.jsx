import { useState } from "react";
import SideNavbar from "./../../../../components/AdminDashboard/Navbar";
import Header from "./../../../../components/AdminDashboard/Header";

export default function UpdateVehicleForm() {
  const [vehicle, setVehicle] = useState({
    number: "",
    name: "",
    type: "",
    seat: "",
    price: "",
    description: "",
    amenities: [],
    accessibility: [],
    images: [null, null, null],
  });

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVehicle((prev) => {
          const updatedImages = [...prev.images];
          updatedImages[index] = reader.result;
          return { ...prev, images: updatedImages };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const amenitiesOptions = ["Wi-Fi", "Sofa box", "Air conditioner", "TV Cable"];
  const accessibilityOptions = [
    "Wheelchair accessible",
    "Shower grab bars",
    "Hearing aid compatible",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-3xl mx-auto p-6 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold mb-4">Edit Vehicle Details</h2>

            {/* Image Upload Boxes */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[0, 1, 2].map((index) => (
                <div key={index} className="border-2 border-dashed border-gray-400 p-4 rounded-lg text-center bg-gray-100">
                  {vehicle.images[index] ? (
                    <img
                      src={vehicle.images[index]}
                      alt="Uploaded"
                      className="w-full h-24 object-cover rounded"
                    />
                  ) : (
                    <div className="text-gray-500 text-3xl"></div>
                  )}
                  <label className="text-gray-600 block mt-2">Add Image</label>
                  <input
                    type="file"
                    className="mt-2"
                    onChange={(e) => handleImageUpload(e, index)}
                  />
                </div>
              ))}
            </div>

            {/* Vehicle Details */}
            <h3 className="mb-2">Vehicle No:</h3>
              <input
                type="text"
                name="number"
                placeholder="Vehicle No"
                value={vehicle.number}
                onChange={handleChange}
                className="border p-2 rounded bg-white mb-4 h-12 w-96"
              />

              <h3 className="mb-2">Vehicle Name:</h3>
              <input
                type="text"
                name="name"
                placeholder="Vehicle Name"
                value={vehicle.name}
                onChange={handleChange}
                className="border p-2 rounded bg-white mb-4 h-12 w-96"
              />

            <h3 className="mb-2">Vehicle Type:</h3>
            <input
              type="text"
              name="type"
              placeholder="Vehicle Type"
              value={vehicle.type}
              onChange={handleChange}
              className="border p-2 rounded bg-white mb-4 h-12 w-96"
            />

            <h3 className="mb-2">Seat:</h3>
            <input
              type="text"
              name="seat"
              placeholder="Seat"
              value={vehicle.seat}
              onChange={handleChange}
              className="border p-2 rounded bg-white mb-4 h-12 w-96"
            />

            <h3 className="mb-2">Price (Km):</h3>
            <input
              type="text"
              name="price"
              placeholder="Price (Km)"
              value={vehicle.price}
              onChange={handleChange}
              className="border p-2 rounded bg-white mb-4 h-12 w-96"
            />

            <h4 className="mb-2">Vehicle Description:</h4>
            <textarea
              name="description"
              placeholder="Vehicle Description"
              value={vehicle.description}
              onChange={handleChange}
              className="w-full border p-2 mt-4 rounded bg-white mb-4 h-12 w-96"
            />


            {/* Amenities */}
            <div className="mt-4">
              <h3 className="font-semibold">Amenities</h3>
              <div className="grid grid-cols-2 gap-2">
                {amenitiesOptions.map((amenity) => (
                  <label key={amenity} className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox" />
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
                    <input type="checkbox" className="form-checkbox" />
                    <span>{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                Add Vehicle
              </button>
              <button className="border py-2 px-4 rounded hover:bg-gray-100">Cancel</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
