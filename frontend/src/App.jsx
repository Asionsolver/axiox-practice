import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/products");
        if (res && res.data) {
          // console.log(res);
          setProducts(res.data);
        }
        setLoading(false);
      } catch (error) {
        if (error) {
          // console.log(error);
          // console.log(error.response.status);
          // console.log(error.response.statusText);
          setError(
            `Error from response: status: ${error.response.status} - Message: Data ${error.response.statusText}`
          );
        } else {
          setError(
            `Error from server: status: 500 - Message: ${error.message}`
          );
        }
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-9xl font-bold text-blue-500">LOADING...</h1>
      </div>
    );
  }
  return (
    <div className="h-screen w-screen bg-gray-800 flex flex-col">
      <div>
        <h1 className="text-3xl font-bold underline text-center text-orange-500">
          Practice How to handle API Optimize Way with Axios
        </h1>
      </div>

      <h3 className="text-2xl font-bold text-center text-blue-500">
        Number of products: {products.length}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-700 rounded-lg p-5 shadow-lg"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-60 object-cover"
            />
            <h3 className="text-xl font-bold text-blue-500">{product.name}</h3>
            <p className="text-gray-400">{product.description}</p>
            <div className="flex justify-between items-center mt-3">
              <h3 className="text-xl font-bold text-orange-500">
                ${product.price}
              </h3>
              <h3 className="text-xl font-bold text-green-500">
                {product.countInStock} in stock
              </h3>
            </div>
          </div>
        ))}
      </div>


      {error && (
        <div className="p-5">
          <div className="text-red-500 text-center">{error}</div>
        </div>
      )}
    </div>
  );
}

export default App;
