# Ecommerce Products Data API

This project provides a REST API to access ecommerce product data from anywhere. The data includes products for men, women, shoes, and various categories like jeans, dresses, kurtas, etc.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the API Server
```bash
npm run server
```

The API will be available at `http://localhost:3001`

### 3. Start Both Server and React App (Development)
```bash
npm run dev
```

## API Endpoints

### Base URL: `http://localhost:3001`

| Endpoint | Description |
|----------|-------------|
| `GET /` | API documentation and available endpoints |
| `GET /api/health` | Health check |
| `GET /api/navigation` | Navigation categories |
| `GET /api/products` | All products combined |
| `GET /api/women/dresses` | Women's dresses |
| `GET /api/women/jeans` | Women's jeans |
| `GET /api/women/lengha-choli` | Women's lengha choli |
| `GET /api/men/jeans` | Men's jeans |
| `GET /api/men/shirts` | Men's shirts |
| `GET /api/shoes` | Shoes data |
| `GET /api/products/:category` | Products by category (gouns, kurta, saree, etc.) |
| `GET /api/search?q=term` | Search products (to be implemented) |

## Example Usage

### Get All Products
```bash
curl http://localhost:3001/api/products
```

### Get Women's Dresses
```bash
curl http://localhost:3001/api/women/dresses
```

### Get Navigation Data
```bash
curl http://localhost:3001/api/navigation
```

## Data Structure

Each product contains:
- `imageUrl`: Product image URL
- `brand`: Brand name
- `title`: Product title
- `color`: Product color
- `discountedPrice`: Current price
- `price`: Original price
- `discountPersent`: Discount percentage
- `size`: Available sizes array
- `quantity`: Stock quantity
- `topLavelCategory`: Main category (Men/Women)
- `secondLavelCategory`: Sub category (Clothing)
- `thirdLavelCategory`: Specific category (men_jeans, women_dress, etc.)
- `description`: Product description

## Deployment Options

### Option 1: Local Network Access
- Start the server with `npm run server`
- Access from other devices on your network using your computer's IP address
- Example: `http://192.168.1.100:3001/api/products`

### Option 2: Cloud Deployment
Deploy to platforms like:
- **Heroku**: Free tier available
- **Vercel**: Great for Node.js APIs
- **Railway**: Simple deployment
- **DigitalOcean**: VPS hosting

### Option 3: Tunneling (Temporary Access)
Use tools like:
- **ngrok**: `npx ngrok http 3001`
- **localtunnel**: `npx localtunnel --port 3001`

## CORS Enabled

The API includes CORS headers, so you can access it from any web application or mobile app.

## File Structure

```
├── server.js              # Express API server
├── Navigation.jsx          # Navigation categories
├── Women/                  # Women's products
│   ├── women_dress.json
│   ├── women_jeans.json
│   └── LenghaCholi.json
├── Men/                    # Men's products
│   ├── men_jeans.json
│   └── men_shirt.json
├── shoes.js               # Shoes data
├── Gouns/                 # Gouns category
├── Kurta/                 # Kurta category
├── Saree/                 # Saree category
└── package.json           # Dependencies and scripts
```

## Contributing

1. Add new product data files in appropriate directories
2. Update server.js to include new endpoints
3. Test the API endpoints
4. Update this README with new endpoints

## License

This project is for educational and development purposes.
