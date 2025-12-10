import React from 'react';

const AddressCard = ({ address, onEdit, onDelete, showActions = true }) => {
  if (!address) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300 text-center">
        <p className="text-gray-500">No address found</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-lg text-gray-900">
              {address.firstName} {address.lastName}
            </p>
            <p className="text-gray-600">
              {address.street}, {address.city}, {address.state} {address.zipCode}
            </p>
            <p className="text-gray-600">Phone: {address.mobile}</p>
          </div>
          
          {showActions && (
            <div className="flex space-x-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(address)}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(address._id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
