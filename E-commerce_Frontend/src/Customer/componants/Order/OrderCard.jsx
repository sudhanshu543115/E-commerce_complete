import React from "react";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  if (!order) {
    return null;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600';
      case 'shipped':
        return 'text-blue-600';
      case 'delivered':
        return 'text-green-600';
      case 'cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Order Placed';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const expectedDeliveryDate = order.deliveryDate 
    ? formatDate(order.deliveryDate)
    : 'To be announced';

  return (
    <div 
      onClick={() => navigate(`/account/orders/${order._id}`)} 
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-100"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {order.orderItems && order.orderItems[0] && order.orderItems[0].product && (
                <img
                  src={order.orderItems[0].product.images?.[0] || '/placeholder-product.jpg'}
                  alt="Product"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)} bg-gray-100`}>
                  {getStatusText(order.status)}
                </span>
                <span className="text-sm text-gray-500">
                  Order #{order._id.slice(-8).toUpperCase()}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-1">
                {order.orderItems?.length || 0} item{order.orderItems?.length !== 1 ? 's' : ''}
              </h3>
              
              {order.orderItems && order.orderItems[0] && (
                <p className="text-gray-600 text-sm">
                  {order.orderItems[0].product?.name || 'Product name not available'}
                </p>
              )}
              
              <p className="text-sm text-gray-500">
                Ordered on {formatDate(order.orderDate)}
              </p>
            </div>
          </div>
        </div>

        <div className="text-right ml-6">
          <p className="text-lg font-semibold text-gray-900">
            ₹{order.totalAmount || order.totalPrice || 0}
          </p>
          
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              Expected Delivery: {expectedDeliveryDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
