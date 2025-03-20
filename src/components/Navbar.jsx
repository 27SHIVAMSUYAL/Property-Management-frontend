import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center text-white">
            <h1 className="text-xl font-bold">Property App</h1>
            <div>
                {!token ? (
                    <>
                        <Link to="/" className="px-4">Login</Link>
                      
                    </>
                ) : (
                    <>
                     
                        <button onClick={handleLogout} className="px-4">Logout</button>
                        <Link to="/dashboard" className="px-4">Dashboard</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
