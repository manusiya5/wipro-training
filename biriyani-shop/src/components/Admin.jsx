import { useState } from "react";
import productsData from "../data/Products.json";

function Admin() {
  const [items, setItems] = useState([
    ...productsData.biriyani,
    ...productsData.starters,
    ...productsData.cooldrinks
  ]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const addItem = () => {
    if (!name || !price || !image) {
      alert("Fill all fields");
      return;
    }

    const newItem = {
      id: Date.now(),
      name,
      price,
      image
    };

    setItems([...items, newItem]);
    setName("");
    setPrice("");
    setImage("");
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <section className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">
        Admin 
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">Add New Item</h3>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <button
          onClick={addItem}
          className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-amber-950"
        >
          Add Item
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow hover:scale-105 duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-48 w-full object-cover rounded-t-xl"
            />

            <div className="p-4 text-center">
<h4 className="font-bold item-title">{item.name}</h4>
              <p className="text-orange-600">₹{item.price}</p>

              <button
                onClick={() => deleteItem(item.id)}
                className="mt-3 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Admin;
