import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleTheme, theme }) =>  {
  const navigate = useNavigate();

  const { cart } = useCart();
  const count = cart.reduce((a, c) => a + c.qty, 0);
const [openMenu, setOpenMenu] = useState(false);

   const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");

    navigate("/login", { replace: true });
  };
  return (
    <div>
    <header className="bg-black text-white px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Biriyani Shop</h1>

        <nav className="flex gap-6 items-center">
        <button> <Link to="/home">Home</Link></button> 
          <div className="relative">
  <button
    onClick={() => setOpenMenu(!openMenu)}
    className=" font-semibold"
  >
    Menu ▾
  </button>

  {openMenu && (
    <div className="absolute top-full mt-2 w-44 bg-white text-black rounded-lg shadow-lg z-50">
      <Link
        to="/biriyani"
        className="block px-4 py-2 hover:bg-orange-100"
        onClick={() => setOpenMenu(false)}
      >
        Biriyani
      </Link>
      

      <Link
        to="/starters"
        className="block px-4 py-2 hover:bg-orange-100"
        onClick={() => setOpenMenu(false)}
      >
        Starters
      </Link>

      <Link
        to="/cooldrinks"
        className="block px-4 py-2 hover:bg-orange-100"
        onClick={() => setOpenMenu(false)}
      >
        Cool Drinks
      </Link>
    </div>
  )}
</div>

            <Link to="/adminlogin">Admin</Link>

          {/* CART ICON */}
          <Link to="/cart" className="relative">
            🛒
            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-xs px-2 rounded-full">
                {count}
              </span>
            )}
          </Link>
           <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
        >
          Logout
        </button>
        <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded bg-white text-black text-sm"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        
      </div>
        </nav>
      </div>
      </header>
     
      </div>
    
  );
}

export default Header;
