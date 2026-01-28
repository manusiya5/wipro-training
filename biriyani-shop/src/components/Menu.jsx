import { useState } from "react";
import products from "../data/Products.json";
import { useCart } from "../context/CartContext";

function Menu() {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");

 const menuItems = products.biriyani;

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Our Menu
      </h2>

     

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl hover:scale-105 duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-60 w-full object-cover rounded-2xl"
            />

            <div className="p-4 text-center">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-orange-600 font-semibold">
                ₹{item.price}
              </p>

              <button
                onClick={() => addToCart(item)}
                className="mt-3 w-full bg-black text-white py-2 rounded-xl hover:bg-amber-950"
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Menu;
