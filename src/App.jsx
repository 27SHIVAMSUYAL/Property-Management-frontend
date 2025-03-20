import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import PropertyDetails from "./pages/PropertyDetails";  // Import PropertyDetails Page
import AddProperty from "./pages/AddProperty";

// Import AddProperty Page

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
      
        <Route path="/property/:propertyId" element={<PropertyDetails />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-property" element={<AddProperty />} /> {/* New Route */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
