import { useEffect, useState } from "react";
import BaseUrl from "../constant";
import { useNavigate } from "react-router";
import { usecart } from "../hooks/CartContext";
import SmartImage from "../Components/SmartImage";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const {addtoCart}=usecart()
  const navigate=useNavigate()

  const productnavigate=()=>{
    navigate("/pages")
  }

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BaseUrl}api/v1/users/wishlist`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          
        });
        const data = await res.json();
        console.log("the api res: ",data)
        // Adjust based on your API response structure
        setWishlist(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${BaseUrl}api/v1/users/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to remove from wishlist");
    }

    // Update UI only AFTER backend success
    setWishlist(prev =>
      prev.filter(item => item._id !== productId)
    );
  } catch (error) {
    console.error("Remove wishlist error:", error);
  }
};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="flex justify-between items-center border-b pb-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-800">My Wishlist</h2>
        <span className="bg-gray-100 text-gray-600 px-4 py-1 rounded-full text-sm font-medium">
          {wishlist.length} Items
        </span>
      </header>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">Your wishlist is empty.</p>
          <button onClick={productnavigate} className="mt-4 text-blue-600 hover:underline">Continue Shopping</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlist.map((product) => (
            <div key={product._id} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
              
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <SmartImage 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  width={420}
                  height={420}
                  crop="fill"
                />
                {product.sections?.bestSeller && (
                  <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
                    Bestseller
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="p-5">
                <h4 className="text-lg font-semibold text-gray-800 truncate mb-1">
                  {product.title}
                </h4>
                
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">
                  {product.description || "No description available."}
                </p>

                <div className="flex items-center gap-3 mb-4">
                  {product.discount_price ? (
                    <>
                      <span className="text-xl font-bold text-red-600">Rs {product.discount_price}</span>
                      <span className="text-sm text-gray-400 line-through">Rs {product.price}</span>
                    </>
                  ) : (
                    <span className="text-xl font-bold text-gray-900">Rs {product.price}</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button onClick={()=>addtoCart(product)} className="flex-1 bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => handleRemove(product._id)}
                    className="p-2 text-gray-400 hover:text-red-600 border border-gray-200 rounded-lg hover:border-red-100 transition-colors"
                    title="Remove from wishlist"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
