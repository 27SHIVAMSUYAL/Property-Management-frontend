import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const PropertyDetails = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/properties/${propertyId}`);
        setProperty(response.data);
      } catch (err) {
        setError("Property not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  if (loading) return <p className="text-center text-gray-600">Loading property details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800">{property.name}</h1>
      <p className="text-gray-600 mt-2"><strong>Location:</strong> {property.location}</p>
      <p className="text-gray-600"><strong>Price:</strong> ₹{property.price.toLocaleString()}</p>
      <p className="text-gray-600"><strong>Description:</strong> {property.description}</p>
    </div>
  );
};

export default PropertyDetails;
