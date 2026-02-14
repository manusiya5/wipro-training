import InventoryCard from "./InventoryCard";

function InventoryList() {
  const products = [
    { id: 3, name: "Tshirt", price: 700, category: "Dressess" },
    { id: 1, name: "Mobile", price: 50000, category: "Electronics" },
    { id: 2, name: "Chair", price: 1000, category: "Furniture" },
  ];

  return (
    <div className="container mt-4">
      <div className="row">
        {products.map((item) => (
          <div className="col-md-4" key={item.id}>
            <InventoryCard
              name={item.name}
              price={item.price}
              category={item.category}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default InventoryList;
