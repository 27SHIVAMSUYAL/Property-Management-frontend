import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const Dashboard = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch all properties from the backend
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/properties`);
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  // Function to download QR Code as an image
  const downloadQRCode = (qrCodeUrl, name) => {
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `${name}-QRCode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold text-blue-600 text-center mb-6">Dashboard</h1>
      <p className="text-lg text-gray-700 text-center">You are successfully logged in.</p>

      {/* Add Property Button */}
      <div className="flex justify-center mt-6">
        <Link to="/add-property">
          <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
            Add Property
          </button>
        </Link>
      </div>

      {/* Display All Properties */}
      <div className="mt-8">
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property._id} className="p-4 border rounded shadow-md bg-gray-50">
                <h2 className="text-xl font-semibold">{property.name}</h2>
                <p className="text-gray-700">📍 {property.location}</p>
                <p className="text-gray-700">💰 Price: {property.price}</p>
                <p className="text-gray-700">📝 {property.description}</p>

                {/* QR Code Display */}
                {property.qrCodeUrl && (
                  <div className="mt-4">
                    <img src={property.qrCodeUrl} alt="QR Code" className="w-32 h-32 mx-auto" />
                    <button
                      className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => downloadQRCode(property.qrCodeUrl, property.name)}
                    >
                      Download QR Code
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">No properties added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
