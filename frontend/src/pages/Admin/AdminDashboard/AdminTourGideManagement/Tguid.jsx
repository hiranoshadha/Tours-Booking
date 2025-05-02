import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPen, FaTrashAlt, FaUpload, FaTrash } from "react-icons/fa"; // Icons for edit and delete
import GuideSummaryPDF from "./GuideSummaryPDF";
import Uploadimage from "../../../../assets/profile2.png"; // Import the GuideSummaryPDF component

const GuideTable = () => {
  const [guides, setGuides] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newGuide, setNewGuide] = useState({
    tourGuideID: "",
    name: "",
    Contact: "",
    language: [],
    experience: "",
    charges: "",
    photo: null,
  });
  const [editGuide, setEditGuide] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/guide");
      setGuides(response.data);
      setFilteredGuides(response.data);
    } catch (error) {
      console.error("Error fetching guides:", error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = guides.filter(
      (guide) =>
        guide.tourGuideID.toLowerCase().includes(query) ||
        guide.name.toLowerCase().includes(query)
    );
    setFilteredGuides(filtered);
  };

  const generateGuideID = () => {
    const count = guides.length + 1;
    return `TG${String(count).padStart(3, "0")}`;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newGuide.name) {
      newErrors.name = "Guide Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(newGuide.name)) {
      newErrors.name = "Guide Name must contain only letters and spaces";
    }

    if (!newGuide.Contact) {
      newErrors.Contact = "Contact No is required";
    } else if (!/^\d{10}$/.test(newGuide.Contact)) {
      newErrors.Contact = "Contact No must be exactly 10 digits";
    }

    if (!newGuide.charges) {
      newErrors.charges = "Charges Per Tour is required";
    } else if (!/^\d+(\.\d+)?$/.test(newGuide.charges)) {
      newErrors.charges = "Charges Per Tour must be a number";
    }

    if (newGuide.language.length === 0) {
      newErrors.language = "At least one language must be selected";
    }

    if (!newGuide.experience) {
      newErrors.experience = "Experience is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGuide({ ...newGuide, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewGuide({ ...newGuide, photo: file });
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  const handleLanguageChange = (e) => {
    const { value, checked } = e.target;
    let updatedLanguages = [...newGuide.language];
    if (checked) {
      updatedLanguages.push(value);
    } else {
      updatedLanguages = updatedLanguages.filter((lang) => lang !== value);
    }
    setNewGuide({ ...newGuide, language: updatedLanguages });
    if (updatedLanguages.length > 0) {
      setErrors({ ...errors, language: "" });
    }
  };

  const handleDeleteImage = () => {
    setNewGuide({ ...newGuide, photo: null });
    setPreviewImage(null);
  };

  const handleAddGuide = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    const generatedGuideID = generateGuideID();
    formData.append("tourGuideID", generatedGuideID);
    formData.append("name", newGuide.name);
    formData.append("Contact", newGuide.Contact);
    formData.append("language", newGuide.language.join(","));
    formData.append("experience", newGuide.experience);
    formData.append("charges", newGuide.charges);
    if (newGuide.photo) {
      formData.append("photo", newGuide.photo);
    }

    try {
      await axios.post("http://localhost:3000/api/guide", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Guide added successfully!");
      fetchGuides();
      setShowModal(false);
      setNewGuide({
        tourGuideID: "",
        name: "",
        Contact: "",
        language: [],
        experience: "",
        charges: "",
        photo: null,
      });
      setPreviewImage(null);
      setErrors({});
    } catch (error) {
      alert("Error adding guide.");
      console.error("Error adding guide:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this guide?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/guide/${id}`);
        alert("Guide deleted successfully!");
        fetchGuides();
      } catch (error) {
        alert("Error deleting guide.");
        console.error("Error deleting guide:", error);
      }
    }
  };

  const handleUpdate = (guide) => {
    setEditGuide(guide);
    setNewGuide({
      tourGuideID: guide.tourGuideID,
      name: guide.name,
      Contact: guide.Contact,
      language: guide.language,
      experience: guide.experience,
      charges: guide.charges,
      photo: null,
    });
    setPreviewImage(guide.photo ? `http://localhost:3000${guide.photo}` : null);
    setShowModal(true);
    setErrors({});
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("tourGuideID", newGuide.tourGuideID);
    formData.append("name", newGuide.name);
    formData.append("Contact", newGuide.Contact);
    formData.append("language", newGuide.language.join(","));
    formData.append("experience", newGuide.experience);
    formData.append("charges", newGuide.charges);
    if (newGuide.photo) {
      formData.append("photo", newGuide.photo);
    }

    try {
      await axios.put(
        `http://localhost:3000/api/guide/${editGuide._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Guide updated successfully!");
      fetchGuides();
      setShowModal(false);
      setEditGuide(null);
      setNewGuide({
        tourGuideID: "",
        name: "",
        Contact: "",
        language: [],
        experience: "",
        charges: "",
        photo: null,
      });
      setPreviewImage(null);
      setErrors({});
    } catch (error) {
      alert("Error updating guide.");
      console.error("Error updating guide:", error);
    }
  };

  const languages = [
    "Sinhala",
    "English",
    "French",
    "Spanish",
    "Arabic",
    "Portuguese",
    "Japanese",
    "Chinese",
    "Russian",
    "Hindi",
    "Urdu",
    "Bengali",
  ];

  return (
    <div className="container mx-auto mt-4 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">Tour Guides</h2>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search guides..."
          className="border rounded py-2 px-4 w-56 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="flex gap-2">
          <GuideSummaryPDF guides={guides} />
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => setShowModal(true)}
          >
            + Add New Guide
          </button>
        </div>
      </div>

      <table className="min-w-full table-auto shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm text-gray-600">
              GUID ID
            </th>
            <th className="px-4 py-2 text-left text-sm text-gray-600">
              GUIDE NAME
            </th>
            <th className="px-4 py-2 text-left text-sm text-gray-600">
              LANGUAGE
            </th>
            <th className="px-4 py-2 text-left text-sm text-gray-600">
              CONTACT NO
            </th>
            <th className="px-4 py-2 text-left text-sm text-gray-600">
              EXPERIENCE
            </th>
            <th className="px-4 py-2 text-left text-sm text-gray-600">PHOTO</th>
            <th className="px-4 py-2 text-left text-sm text-gray-600">
              CHARGES
            </th>
            <th className="px-4 py-2 text-left text-sm text-gray-600">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredGuides.map((guide) => (
            <tr key={guide._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-2 text-sm text-gray-700">
                {guide.tourGuideID}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">{guide.name}</td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {guide.language.map((lang, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-500 text-white text-xs rounded-full px-2 py-1 mr-2"
                  >
                    {lang}
                  </span>
                ))}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {guide.Contact}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {guide.experience}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {guide.photo ? (
                  <img
                    src={`http://localhost:3000${guide.photo}`}
                    alt={guide.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  "No Photo"
                )}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {guide.charges}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => handleUpdate(guide)}
                >
                  <FaPen />
                </button>
                <button
                  className="text-red-600 hover:text-red-800 ml-2"
                  onClick={() => handleDelete(guide._id)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add/Edit Guide */}
      {showModal && (
        <div
          className={`fixed inset-0 bg-opacity-50 backdrop-blur-lg transition-opacity duration-300 ease-in-out ${
            showModal ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setShowModal(false)}
        >
          <div className="flex justify-center items-center min-h-screen p-4 max-h-[90vh] overflow-y-auto">
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 max-h-[90vh] overflow-y-auto hide-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-600">
                {editGuide ? "Edit Guide" : "Add New Guide"}
              </h3>
              <form onSubmit={editGuide ? handleUpdateSubmit : handleAddGuide}>
                {/* Profile Picture */}
                <div className="text-center mb-4 border-dotted border-2 border-gray-300 p-6">
                  <div className="flex justify-center items-center mb-2">
                    <div className="w-40 h-40 rounded-full border-dashed border-2 border-b-sky-700 flex justify-center items-center">
                      <img
                        src={previewImage || Uploadimage}
                        alt="Profile Preview"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Profile Picture
                  </label>
                  <div className="flex justify-center gap-4">
                    <label className="bg-blue-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700 transition-colors">
                      <input
                        type="file"
                        id="photo-upload"
                        name="photo"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <span className="flex items-center gap-2">
                        <FaUpload className="w-3.5 h-3.5" /> {/* Upload Icon */}
                        Upload Image
                      </span>
                    </label>
                    <button
                      type="button"
                      className="bg-red-600 text-white py-2 px-5 rounded cursor-pointer hover:bg-red-700 transition-colors"
                      onClick={handleDeleteImage}
                      disabled={!previewImage}
                    >
                      <span className="flex items-center gap-2">
                        <FaTrash className="w-3.5 h-3.5" /> {/* Delete Icon */}
                        Delete Image
                      </span>
                    </button>
                  </div>
                </div>

                {/* Guide Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Guide Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newGuide.name}
                    onChange={handleInputChange}
                    placeholder="Guide Name"
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">{errors.name}</span>
                  )}
                </div>

                {/* Experience */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Experience <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={newGuide.experience}
                    onChange={handleInputChange}
                    placeholder="Experience"
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                  {errors.experience && (
                    <span className="text-red-500 text-sm">
                      {errors.experience}
                    </span>
                  )}
                </div>

                {/* Contact No */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Contact No <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="Contact"
                    value={newGuide.Contact}
                    onChange={handleInputChange}
                    placeholder="Contact No"
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                  {errors.Contact && (
                    <span className="text-red-500 text-sm">
                      {errors.Contact}
                    </span>
                  )}
                </div>

                {/* Charges Per Tour */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Charges Per Tour <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="charges"
                    value={newGuide.charges}
                    onChange={handleInputChange}
                    placeholder="Charges Per Tour"
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                  {errors.charges && (
                    <span className="text-red-500 text-sm">
                      {errors.charges}
                    </span>
                  )}
                </div>

                {/* Language Proficiency */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Language Proficiency <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang, index) => (
                      <label key={index} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          value={lang}
                          checked={newGuide.language.includes(lang)}
                          onChange={handleLanguageChange}
                          className="form-checkbox"
                        />
                        <span className="ml-2">{lang}</span>
                      </label>
                    ))}
                  </div>
                  {errors.language && (
                    <span className="text-red-500 text-sm">
                      {errors.language}
                    </span>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
                  <button
                    type="submit"
                    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto"
                  >
                    {editGuide ? "Update Guide" : "Add Guide"}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto"
                    onClick={() => {
                      setShowModal(false);
                      setNewGuide({
                        tourGuideID: "",
                        name: "",
                        Contact: "",
                        language: [],
                        experience: "",
                        charges: "",
                        photo: null,
                      });
                      setPreviewImage(null);
                      setErrors({});
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-600">
          Showing 1 to {filteredGuides.length} of {guides.length} results
        </span>
        <div className="flex gap-2">
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
            disabled
          >
            ←
          </button>
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
            disabled
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuideTable;
