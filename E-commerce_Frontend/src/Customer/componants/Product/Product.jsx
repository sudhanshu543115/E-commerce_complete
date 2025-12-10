'use client'
import ProductCard from "./ProductCard";

//import Mens_kurta from "../../../Data/Mens_kurta";
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid';
import { sigleFilter, filters } from "./FilterData.jsx";
import { useLocation, useNavigate } from "react-router-dom";

const sortOptions = [
  { name: 'Featured', value: 'featured', current: true },
  { name: 'Price: Low to High', value: 'price-asc', current: false },
  { name: 'Price: High to Low', value: 'price-desc', current: false },
  { name: 'Name: A to Z', value: 'name-asc', current: false },
  { name: 'Name: Z to A', value: 'name-desc', current: false },
  { name: 'Newest First', value: 'newest', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function updateQueryParams(params, key, valueArray) {
  const newParams = new URLSearchParams(params.toString());
  newParams.delete(key);
  valueArray.forEach(v => {
    if (v) newParams.append(key, v);
  });
  return newParams;
}
const  Product=() =>{
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSort, setCurrentSort] = useState('featured');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

         //const response = await fetch('https://e-commerce-api-wvt2.onrender.com/api/products');
        //const response = await fetch(`${import.meta.env.API_BASE_URL}/api/products`);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`);


        
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

  const params = new URLSearchParams(location.search);

  function handleFilterChange(e, filterId) {
    const { value, checked } = e.target;
    const currentValues = params.getAll(filterId);
    let newValues = [...currentValues];

    if (checked) {
      newValues.push(value);
    } else {
      newValues = newValues.filter(v => v !== value);
    }
    const newParams = updateQueryParams(params, filterId, newValues);
    navigate(`${location.pathname}?${newParams.toString()}`, { replace: true });
  }

  function isOptionSelected(filterId, optionValue) {
    return params.getAll(filterId).includes(optionValue);
  }

  // Filtering logic for products
  const activeFilters = {};
  params.forEach((v, k) => {
    if (!activeFilters[k]) activeFilters[k] = [];
    activeFilters[k].push(v);
  });

  // Filter products first
  const filteredProducts = products.filter(product => {
    return Object.entries(activeFilters).every(([filterId, values]) => {
      if (values.length === 0) return true;
      
      // Handle different filter types
      let productValue;
      switch(filterId) {
        case 'color':
          productValue = product.color?.toLowerCase();
          break;
        case 'brand':
          productValue = product.brand?.toLowerCase();
          break;
        case 'price':
          // Handle price ranges
          const price = product.discountedPrice || product.price;
          return values.some(range => {
            if (range === '0-499') return price >= 0 && price <= 499;
            if (range === '500-999') return price >= 500 && price <= 999;
            if (range === '1000-1999') return price >= 1000 && price <= 1999;
            if (range === '2000+') return price >= 2000;
            return false;
          });
        default:
          productValue = product[filterId]?.toString().toLowerCase();
      }
      
      if (!productValue) return true;
      return values.some(v => v.toLowerCase() === productValue);
    });
  });

  // Then sort the filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(currentSort) {
      case 'price-asc':
        return (a.discountedPrice || a.price) - (b.discountedPrice || b.price);
      case 'price-desc':
        return (b.discountedPrice || b.price) - (a.discountedPrice || a.price);
      case 'name-asc':
        return (a.title || a.name || '').localeCompare(b.title || b.name || '');
      case 'name-desc':
        return (b.title || b.name || '').localeCompare(a.title || a.name || '');
      case 'newest':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case 'featured':
      default:
        return 0; // Keep original order for featured
    }
  });

  const handleSortChange = (sortValue) => {
    setCurrentSort(sortValue);
  };

  const renderFilterSection = (section, mobile = false) => (
    <Disclosure key={section.id} as="div" className={mobile ? "border-t border-gray-200 px-4 py-6" : "border-b border-gray-200 py-6"}>
      <h3 className={mobile ? "-mx-2 -my-3 flow-root" : "-my-3 flow-root"}>
        <DisclosureButton className={`group flex w-full items-center justify-between bg-white ${mobile ? "px-2 py-3" : "py-3 text-sm"} text-gray-400 hover:text-gray-500`}>
          <span className="font-medium text-gray-900">{section.name}</span>
          <span className="ml-6 flex items-center">
            <PlusIcon aria-hidden="true" className="h-5 w-5 group-open:hidden" />
            <MinusIcon aria-hidden="true" className="h-5 w-5 hidden group-open:block" />
          </span>
        </DisclosureButton>
      </h3>
      <DisclosurePanel className="pt-6">
        <div className="space-y-6">
          {section.options.map((option, optionIdx) => (
            <div key={option.value} className="flex gap-3">
              <div className="flex h-5 items-center">
                <input
                  value={option.value}
                  id={`${mobile ? "filter-mobile" : "filter"}-${section.id}-${optionIdx}`}
                  name={`${section.id}[]`}
                  type="checkbox"
                  checked={isOptionSelected(section.id, option.value)}
                  onChange={(e) => handleFilterChange(e, section.id)}
                  className="h-4 w-4 rounded-sm border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
              <label
                htmlFor={`${mobile ? "filter-mobile" : "filter"}-${section.id}-${optionIdx}`}
                className={`${mobile ? "min-w-0 flex-1" : "text-sm"} text-gray-600`}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );

  return (
    <div className="bg-white">
      {/* Mobile filter dialog */}
      <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop className="fixed inset-0 bg-black/25" />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative ml-auto flex h-full max-w-xs flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="relative -mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <form className="mt-4 border-t border-gray-200">
              {filters.map(section => renderFilterSection(section, true))}
              {sigleFilter.map(section => renderFilterSection(section, true))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                Sort
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 ml-1 h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                />
              </MenuButton>
              <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none">
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <MenuItem key={option.name}>
                      <button
                        onClick={() => handleSortChange(option.value)}
                        className={classNames(
                          currentSort === option.value ? 'font-medium text-gray-900' : 'text-gray-500',
                          'block w-full text-left px-4 py-2 text-sm hover:bg-gray-100'
                        )}
                      >
                        {option.name}
                      </button>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>
            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
              <span className="sr-only">View grid</span>
              <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters desktop */}
            <form className="hidden lg:block">
              {filters.map(section => renderFilterSection(section))}
              {sigleFilter.map(section => renderFilterSection(section))}
            </form>

            {/* Product grid */}
            <div className="lg:col-span-3 w-full">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-lg">Loading products...</div>
                </div>
              ) : error ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-red-500">Error loading products: {error}</div>
                </div>
              ) : sortedProducts.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-gray-500">No products found matching your filters.</div>
                </div>
              ) : (
                <div className="flex flex-wrap justify-center">
                  {sortedProducts.map((item) => (
                    <ProductCard key={item.id} product={item} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Product;
