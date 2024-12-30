function AdminMenuCard({ item, onEdit, onDelete }) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-white">{item.name}</h3>
            <p className="text-gray-400">{item.category}</p>
            <p className="text-green-500 font-bold mt-2">₹{item.price.toFixed(2)}</p>
            <p className="text-gray-400 mt-1">
              Status: {item.availability ? 
                <span className="text-green-500">Available</span> : 
                <span className="text-red-500">Unavailable</span>
              }
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(item)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(item._id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default AdminMenuCard;