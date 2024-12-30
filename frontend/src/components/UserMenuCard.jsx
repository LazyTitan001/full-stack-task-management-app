import { useCart } from '../context/CartContext';

function UserMenuCard({ item }) {
  const { addToCart } = useCart();

  if (!item.availability) {
    return null;
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-white">{item.name}</h3>
      <p className="text-gray-400">{item.category}</p>
      <p className="text-green-500 font-bold mt-2">₹{item.price.toFixed(2)}</p>
      <button
        onClick={() => addToCart(item)}
        className="mt-3 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default UserMenuCard;