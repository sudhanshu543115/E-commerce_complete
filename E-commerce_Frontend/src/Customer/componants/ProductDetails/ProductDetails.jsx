import { StarIcon } from "@heroicons/react/20/solid";
//import Mens_kurta from "../../../Data/Mens_kurta";
import { Box, Grid, Typography } from "@mui/material";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { LinearProgress } from "@mui/material";
import Rating from "@mui/material/Rating";
import ProductReviewCard from "./ProductReviewCard";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Default fallback data structure
const defaultProduct = {
  name: "Product",
  price: "$0",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Home", href: "#" },
    { id: 2, name: "Products", href: "#" },
  ],
  images: [],
  colors: [
    {
      id: "default",
      name: "Default",
      classes: "bg-gray-200 checked:outline-gray-400",
    },
  ],
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
  ],
  description: "Product description not available.",
  highlights: ["Quality product", "Great value", "Fast shipping"],
  details: "Product details not available.",
};

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // Try to fetch product by ID directly from backend
        const productResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/${productId}`);
        if (productResponse.ok) {
          const product = await productResponse.json();
          setProduct(product);
          return;
        }
        
        // If direct fetch fails, try to get all products and find by ID
        //const allProductsResponse = await fetch('https://e-commerce-api-wvt2.onrender.com/api/products');
        const allProductsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
        if (allProductsResponse.ok) {
          const allProducts = await allProductsResponse.json();
          // Try both string and number comparison for ID
          const foundProduct = allProducts.find(item => 
            item.id === parseInt(productId) || 
            item.id === productId ||
            item._id === productId
          );
          if (foundProduct) {
            setProduct(foundProduct);
            return;
          }
        }
        
        // Also try men's kurta endpoint
        const mensKurtaResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/men/mens_kurta`);
        if (mensKurtaResponse.ok) {
          const data = await mensKurtaResponse.json();
          const foundProduct = data.mens_kurta?.find(item => 
            item.id === parseInt(productId) || 
            item.id === productId ||
            item._id === productId
          );
          if (foundProduct) {
            setProduct(foundProduct);
            return;
          }
        }
        
        // If no product found from any API, set error
        throw new Error('Product not found');
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Get selected size from the form
    const selectedSizeElement = document.querySelector('input[name="size"]:checked');
    const selectedSize = selectedSizeElement ? selectedSizeElement.value : 'M';
    
    // Create cart item object
    const cartItem = {
      id: product.id,
      title: product.title || product.name,
      price: product.price,
      discountedPrice: product.discountedPrice,
      discountPersent: product.discountPersent,
      imageUrl: product.imageUrl || product.image,
      brand: product.brand,
      color: product.color,
      selectedSize: selectedSize,
      quantity: 1
    };
    
    // Get existing cart items from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex(item => 
      item.id === cartItem.id && item.selectedSize === selectedSize
    );
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      existingCart.push(cartItem);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(existingCart));
    
    // Dispatch custom event to update navbar counter
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Navigate to cart
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Product not found</div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {(product.breadcrumbs || defaultProduct.breadcrumbs).map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href="#"
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.title || product.name || "Product"}
              </a>
            </li>
          </ol>
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                alt={product.title || "Product Image"}
                src={product.imageUrl || product.image || "https://via.placeholder.com/400x500?text=No+Image"}
                className="row-span-2 aspect-3/4 size-full rounded-lg object-cover max-lg:hidden"
              />
            </div>
            <div className="flex flex-row space-x-5 justify-center">
              {/* Show main image as thumbnail if no additional images */}
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4">
                <img
                  alt={product.title || "Product Image"}
                  src={product.imageUrl || product.image || "https://via.placeholder.com/80x80?text=No+Image"}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-3 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-1 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-4">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title || product.name || "Product Name"}
              </h1>
              <h2 className="sr-only">Product information</h2>
              <div className="mt-1 flex gap-4">
                <p className="text-3xl tracking-tight text-gray-900">
                  ${product.discountedPrice || product.price || "0"}
                </p>
                {product.discountedPrice && product.price && (
                  <p className="text-xl tracking-tight line-through text-gray-400 items-center justify-center">
                    ${product.price}
                  </p>
                )}
                {product.discountPersent && (
                  <p className="text-3xl tracking-tight text-green-900">
                    {product.discountPersent}% off
                  </p>
                )}
              </div>
              {/* Reviews */}
              <div className="mt-2">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <Rating name="read-only" value={5} readOnly />
                    {/* {[0, 1, 2, 3, 4].map((rating) => (
              <Rating
                name="read-only"
                value={5} readOnly
                key={rating}
                aria-hidden="true"
                className={classNames(
                  reviews.average > rating
                    ? "text-gray-900"
                    : "text-gray-200",
                  "size-5 shrink-0"
                )}
              />
            ))} */}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div>
              {/* Colors */}
              {product.color && (
                <div className="mt-5">
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                  <div className="mt-4">
                    <span className="text-sm text-gray-600">{product.color}</span>
                  </div>
                </div>
              )}
              <form className="mt-3">
                {/* Sizes */}
                <div className="mt-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-2">
                    <div className="grid grid-cols-4 gap-3">
                      {(product.sizes || defaultProduct.sizes).map((size, index) => (
                        <label
                          key={size.id || index}
                          aria-label={size.name}
                          className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-gray-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
                        >
                          <input
                            defaultValue={size.id || size.name}
                            defaultChecked={index === 1}
                            name="size"
                            type="radio"
                            disabled={!size.inStock}
                            className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                          />
                          <span className="text-sm font-medium text-gray-900 uppercase group-has-checked:text-white">
                            {size.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <button
                  onClick={handleAddToCart}
                  type="submit"
                  className="mt-5 flex contained items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                >
                  Add to cart
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-5">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description || defaultProduct.description}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900">Brand</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">{product.brand || "Unknown Brand"}</p>
                </div>
              </div>

              {product.highlights && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                  <div className="mt-2">
                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                      {product.highlights.map((highlight, index) => (
                        <li key={index} className="text-gray-400">
                          <span className="text-gray-600">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="mt-3">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-2 space-y-6">
                  <p className="text-sm text-gray-600">
                    {product.details || defaultProduct.details}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rating And reviews */}
        <section className="">
          <h1 className="font-bold text-black text-2xl ml-20 mb-10 ">
            Recent Review And Ratings
          </h1>

          <div>
            <Grid container spacing={7}>
              {/* LEFT COLUMN: Reviews */}
              <Grid item xs={7}>
                <div className="space-y-4 ml-7">
                  {[1, 1, 1].map((_, index) => (
                    <ProductReviewCard key={index} />
                  ))}
                </div>
              </Grid>

              {/* RIGHT COLUMN: Rating Summary */}
              <Grid item xs={5} className="mx-110">
                <div style={{ marginTop: "" }}>
                  {/* push halfway down */}
                  <div className="space-y-4">
                    <h1 className="font-semibold text-xl pb-1">
                      Product Rating
                    </h1>
                    <div>
                      <Rating value={4} readOnly />
                      <p className="text-gray-600 opacity-60">646 Ratings</p>
                    </div>
                  </div>
                </div>

                <Box sx={{ width: "100%", mb: 1 }} className="flex">
                  <Grid container alignItems="center" spacing={2}>
                    {/* Label */}
                    <Grid item xs={3}>
                      <Typography variant="body2" color="text.primary">
                        Excellent
                      </Typography>
                    </Grid>

                    {/* Progress bar */}
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress variant="determinate" value={50} color="error" />
                    </Box>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </div>
        </section>

        {/* Similar products */}
        {/* <ProductCard /> */}
        <section className="pt-10">
          <h1 className="font-bold text-black text-2xl ml-20 mb-10">
            Similar Products
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
            {/* Similar products will be loaded from API or static data */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProductDetails;
