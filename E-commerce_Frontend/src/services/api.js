 const API_BASE_URL = import.meta.env.BACKEND_URL ;
 //const API_BASE_URL = 'http://localhost:9000';

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
};

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
        headers: getAuthHeaders(),
        ...options
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Auth API calls
export const authAPI = {
    login: (credentials) => apiCall('/auth/signin', {
        method: 'POST',
        body: JSON.stringify(credentials)
    }),
    
    signup: (userData) => apiCall('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData)
    }),
    
    logout: () => apiCall('/auth/logout', {
        method: 'POST'
    })
};

// User API calls
export const userAPI = {
    getProfile: () => apiCall('/api/users/profile'),
    updateProfile: (userData) => apiCall('/api/users/profile', {
        method: 'PUT',
        body: JSON.stringify(userData)
    })
};

// Product API calls
export const productAPI = {
    getAll: () => apiCall('/api/products'),
    getById: (id) => apiCall(`/api/products/${id}`),
    getByCategory: (category) => apiCall(`/api/products?category=${category}`)
};

// Cart API calls
export const cartAPI = {
    getCart: () => apiCall('/api/cart'),
    addToCart: (productId, quantity) => apiCall('/api/cart/items', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity })
    }),
    updateCartItem: (itemId, quantity) => apiCall(`/api/cart/items/${itemId}`, {
        method: 'PUT',
        body: JSON.stringify({ quantity })
    }),
    removeFromCart: (itemId) => apiCall(`/api/cart/items/${itemId}`, {
        method: 'DELETE'
    })
};

// Order API calls
export const orderAPI = {
    createOrder: (orderData) => apiCall('/api/orders', {
        method: 'POST',
        body: JSON.stringify(orderData)
    }),
    getOrders: () => apiCall('/api/orders'),
    getOrderById: (id) => apiCall(`/api/orders/${id}`),
    updateOrderStatus: (orderId, status) => apiCall(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
    })
};

// Address API calls
export const addressAPI = {
    getUserAddresses: () => apiCall('/api/orders/addresses'),
    createAddress: (addressData) => apiCall('/api/orders/addresses', {
        method: 'POST',
        body: JSON.stringify(addressData)
    }),
    updateAddress: (addressId, addressData) => apiCall(`/api/orders/addresses/${addressId}`, {
        method: 'PUT',
        body: JSON.stringify(addressData)
    }),
    deleteAddress: (addressId) => apiCall(`/api/orders/addresses/${addressId}`, {
        method: 'DELETE'
    })
};

export default apiCall;
