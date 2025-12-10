const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mens_kurta = require('./Men/men_kurta')

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Serve static files
app.use('/static', express.static(path.join(__dirname)));

// Helper function to read JSON files
const readJSONFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
};

// Helper function to read JS files (for shoes.js)
const readJSFile = (filePath) => {
  try {
    delete require.cache[require.resolve(filePath)];
    return require(filePath);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return {};
  }
};

// API Routes

// Get all categories from Navigation
app.get('/api/navigation', (req, res) => {
  try {
    const navigation = require('./Navigation.jsx');
    res.json(navigation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load navigation data' });
  }
});

// Women's products
app.get('/api/women/dresses', (req, res) => {
  const dresses = readJSONFile(path.join(__dirname, 'Women', 'women_dress.json'));
  res.json(dresses);
});

app.get('/api/women/jeans', (req, res) => {
  const jeans = readJSONFile(path.join(__dirname, 'Women', 'women_jeans.json'));
  res.json(jeans);
});

app.get('/api/women/lengha-choli', (req, res) => {
  const lenghaCholi = readJSONFile(path.join(__dirname, 'Women', 'LenghaCholi.json'));
  res.json(lenghaCholi);
});

// Men's products
app.get('/api/men/jeans', (req, res) => {
  const jeans = readJSONFile(path.join(__dirname, 'Men', 'men_jeans.json'));
  res.json(jeans);
});

app.get("/api/men/mens_kurta", (req, res) => {
  res.json(mens_kurta);
});

app.get('/api/men/shirts', (req, res) => {
  const shirts = readJSONFile(path.join(__dirname, 'Men', 'men_shirt.json'));
  res.json(shirts);
});

// Shoes
app.get('/api/shoes', (req, res) => {
  const shoesData = readJSFile(path.join(__dirname, 'shoes.js'));
  res.json(shoesData);
});

// Generic category endpoints
app.get('/api/products/:category', (req, res) => {
  const { category } = req.params;
  const categoryMap = {
    'gouns': 'Gouns/gouns.js',
    'kurta': 'Kurta/kurta.js',
    'saree': 'Saree',
    'dress': 'dress/page1.js',
    'pants': 'pants/men_page1.js'
  };

  if (categoryMap[category]) {
    try {
      const filePath = path.join(__dirname, categoryMap[category]);
      let data;
      
      if (filePath.endsWith('.js')) {
        data = readJSFile(filePath);
      } else {
        // Handle directory with multiple files
        const files = fs.readdirSync(filePath);
        data = {};
        files.forEach(file => {
          const fileName = path.parse(file).name;
          if (file.endsWith('.js')) {
            data[fileName] = readJSFile(path.join(filePath, file));
          } else if (file.endsWith('.json')) {
            data[fileName] = readJSONFile(path.join(filePath, file));
          }
        });
      }
      
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: `Failed to load ${category} data` });
    }
  } else {
    res.status(404).json({ error: 'Category not found' });
  }
});

// Search endpoint
app.get('/api/search', (req, res) => {
  const { q, category, minPrice, maxPrice } = req.query;
  // Implementation for search functionality
  res.json({ message: 'Search functionality - to be implemented', query: req.query });
});

// Get all products (combined)
app.get('/api/products', (req, res) => {
  try {
    const allProducts = [];
    
    // Add women's products
    const womenDresses = readJSONFile(path.join(__dirname, 'Women', 'women_dress.json'));
    const womenJeans = readJSONFile(path.join(__dirname, 'Women', 'women_jeans.json'));
    allProducts.push(...womenDresses, ...womenJeans);
    
    // Add men's products
    const menJeans = readJSONFile(path.join(__dirname, 'Men', 'men_jeans.json'));
    allProducts.push(...menJeans);
    
    res.json(allProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load products' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Ecommerce Products API',
    version: '1.0.0',
    endpoints: {
      navigation: '/api/navigation',
      allProducts: '/api/products',
      womenDresses: '/api/women/dresses',
      womenJeans: '/api/women/jeans',
      menJeans: '/api/men/jeans',
      shoes: '/api/shoes',
      search: '/api/search?q=searchterm',
      health: '/api/health'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Ecommerce API Server running on http://localhost:${PORT}`);
  console.log(`📊 Access your data at http://localhost:${PORT}/api/products`);
  // console.log(`🔍 API documentation at http://localhost:${PORT}`);
});

module.exports = app;
