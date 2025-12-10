import React, { useState, useEffect } from 'react'
import MainCarousel from '../../componants/HomeCarousel/MainCarousel'
import HomeSectionCarousel from '../../componants/HomeSectionCarousel/HomeSectionCarousel';
import Womentop from './womentop';
import Mens_kurta from './Mens_kurta';

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('http://localhost:3001/api/products');
        //const response = await fetch(`${api}` /api/products);
        
        if (!response.ok) {
          
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category
  {/*const mensKurta = products.filter(product => 
    product.category?.toLowerCase().includes('kurta') || 
    product.title?.toLowerCase().includes('kurta')
  );*/}
  
  const womensJeans = products.filter(product => 
   // product.category?.toLowerCase().includes('') || 
    product.title?.toLowerCase().includes('jeans')
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Error loading products: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <MainCarousel />      
      {/*<HomeSectionCarousel data={mensKurta} title={"Men's Kurta"}/>*/}
      <Mens_kurta/>
      <HomeSectionCarousel data={womensJeans} title={"Women's Jeans"}/>
      <Womentop/>
    </div>
  )
}

export default Homepage
