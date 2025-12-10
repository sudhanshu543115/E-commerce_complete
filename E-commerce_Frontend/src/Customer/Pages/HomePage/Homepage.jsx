import React, { useState, useEffect } from 'react';
import MainCarousel from '../../componants/HomeCarousel/MainCarousel';
import HomeSectionCarousel from '../../componants/HomeSectionCarousel/HomeSectionCarousel';
import Womentop from './womentop';
//import Mens_kurta from './Mens_kurta';

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/men/mens_kurta`);
        //const response = await fetch(`${api}/api/products`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Access the mens_kurta array from the response object
        setProducts(data.mens_kurta);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category (you can adjust or use as needed)
  const mensKurta = products.filter(product =>
    product.category?.toLowerCase().includes('kurta') ||
    product.title?.toLowerCase().includes('kurta')
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
      {/* Render filtered mensKurta products */}
      <HomeSectionCarousel data={mensKurta} title={"Mens Kurta"} />
      <Womentop />
    </div>
  );
};

export default Homepage;
