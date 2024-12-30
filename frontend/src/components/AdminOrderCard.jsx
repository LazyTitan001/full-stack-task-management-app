function AdminOrderCard({ order, onStatusUpdate }) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Order #{order._id.slice(-6)}
            </h3>
            <p className="text-gray-400">
              Customer: {order.userId?.username || 'Unknown'}
            </p>
            <div className="mt-2">
              {order.items.map((item, index) => (
                <div key={index} className="text-sm text-gray-300">
                  {item.quantity}x {item.menuItem?.name || 'Unavailable Item'} - ₹
                  {((item.menuItem?.price || 0) * item.quantity).toFixed(2)}
                </div>
              ))}
            </div>
            <p className="text-green-500 font-bold mt-2">
              Total: ₹{(order.totalAmount || 0).toFixed(2)}
            </p>
          </div>
          <div>
            <select
              value={order.status}
              onChange={(e) => onStatusUpdate(order._id, e.target.value)}
              className="bg-gray-700 text-white rounded px-3 py-1"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
  
  export default AdminOrderCard;