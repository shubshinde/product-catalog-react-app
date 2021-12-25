
import './App.css';
import logo from './logo.png';
import axios from "axios";
import React from "react";


export default function App() {

  const baseURL = "https://fakestoreapi.com/products";

  const render_products = (Products) => {

    return <div className='category-section fixed'>
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">Products ({Products.length})</h2>

      <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10" style={{ maxHeight: '800px', overflowY: 'scroll' }}>
        {/* Loop Products */}
        {Products.map((product, index) => (
          <div key={index} className="group relative shadow-lg" >
            <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
              <img
                alt="Product Image"
                src={product.image}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
            </div>
            <div className="flex justify-between p-3">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href={product.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    <span style={{ fontSize: '16px', fontWeight: '600' }}>{product.title}</span>
                  </a>
                  <p>Tag - {product.category}</p>
                </h3>
                <p className="mt-1 text-sm text-gray-500">Rating: {product.rating.rate}</p>
              </div>
              <p className="text-sm font-medium text-green-600">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  }

  const [Products, setProducts] = React.useState(null);
  const [Categories, setCategories] = React.useState(null);
  const [error, setError] = React.useState(null);

  // Get all Products.
  React.useEffect(() => {

    axios.get(baseURL).then((response) => {

      setProducts(response.data);
      console.log(Products);

    }).catch(error => {

      setError(error);
    });

  }, []);

  // Get Product Categories.
  React.useEffect(() => {

    axios.get(baseURL + '/categories').then((responseCategories) => {

      setCategories(responseCategories.data);
      console.log(Categories, 'Categories');

    }).catch(error => {

      setError(error);
    });

  }, []);

  if (error) return `Error: ${error.message}`;
  if (!Products) return <center style={{ marginTop: '200px' }}> <img src="https://icons8.com/preloaders/preloaders/1474/Walk.gif" style={{ width: '70px' }} /> </center>;

  return (
    <div className="flex fixed flex-row">
      <div className="h-screen  bg-slate-800 p-3 xl:basis-1/5" style={{ minWidth: '65%' }}>
        <img className="w-full" src={logo} alt="Sunset in the mountains" />
        <div className="px-6 py-4">
          <h1 className="text-3xl mb-2 font-bold text-white"> Product Catalog App </h1>
          <p className="text-gray-700 text-white">
            by - <b style={{ color: 'orange' }}>Shubham</b>
          </p>
          <div className="py-10">
            { (Categories) ? <p className='text-white'>Tags : </p> : ''}
            {
              (Categories) ? Categories.map(tag =>
                <span
                  key={tag}
                  className="inline-block bg-amber-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">
                  {tag}
                </span>
              ) : ''
            }
          </div>
        </div>
      </div>
      <div className="ml-5  p-10 xl:basis-4/5">
        {render_products(Products)}
      </div>
    </div>
  );
}