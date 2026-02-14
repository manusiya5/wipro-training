import InventoryList from "./components/InventoryList";

function App() {
  return (
    <>
      <h2 className="text-center mt-3">Inventory Catalog</h2>
      <InventoryList />
    </>
  );
}

export default App;

// import { Routes, Route, BrowserRouter } from "react-router-dom";
// import ProductList from "./pages/ProductList";
// import ProductDetail from "./pages/ProductDetail";

// function App() {
//   return (
//     <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<ProductList />} />
//       <Route path="/products/:id" element={<ProductDetail />} />
//     </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;



