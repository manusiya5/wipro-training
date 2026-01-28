import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart
  } = useCart();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">
        🛒 Your cart is empty
      </div>
    );
  }

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Your Cart
      </h2>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between bg-white shadow rounded-xl p-4 mb-4"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-orange-600 font-semibold">
                ₹{item.price}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => decreaseQty(item.id)}
              className="px-3 py-1 bg-gray-200 rounded-lg"
            >
              −
            </button>

            <span className="font-semibold">{item.qty}</span>

            <button
              onClick={() => increaseQty(item.id)}
              className="px-3 py-1 bg-gray-200 rounded-lg"
            >
              +
            </button>
          </div>

          <div className="text-right">
            <p className="font-semibold">
              ₹{item.price * item.qty}
            </p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 text-sm mt-1"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="text-right mt-6">
        <h3 className="text-xl font-bold">
          Total: ₹{totalAmount}
        </h3>

        <button className="mt-3 bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-amber-950">
          Checkout
        </button>
      </div>
    </section>
  );
}

export default Cart;
