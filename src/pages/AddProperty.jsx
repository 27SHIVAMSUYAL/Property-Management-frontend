import React, { useState } from "react";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const AddProperty = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    description: "",
  });
  const [qrCode, setQrCode] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setQrCode(null);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/properties`, formData);
      setQrCode(response.data.property.qrCodeUrl);
      setMessage("Property added successfully!");
      setFormData({ name: "", location: "", price: "", description: "" }); // Reset form
    } catch (error) {
      setMessage("Failed to add property");
    }
  };

  // Function to Download QR Code
  const handleDownload = () => {
    if (qrCode) {
      const link = document.createElement("a");
      link.href = qrCode;
      link.download = "Property_QR_Code.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Property</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Property Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>

      {message && <p className="mt-4 text-green-500">{message}</p>}

      {qrCode && (
        <div className="mt-6 flex flex-col items-center">
          <p className="text-lg font-semibold">QR Code:</p>
          <img src={qrCode} alt="Property QR Code" className="mt-2 border rounded shadow-md" />

          {/* Download Button */}
          <button 
            onClick={handleDownload} 
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded shadow-md"
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProperty;
