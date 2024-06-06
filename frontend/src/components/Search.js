import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { searchProducts } from '../state/product/Action';
import ViewProducts from './ViewProducts';

const Search = () => {
  const [searchKey, setSearchKey] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);
  const dispatch = useDispatch();

  const { loading, products, error } = useSelector(state => state.products);

  const handleSearch = (e) => {
    e.preventDefault();
    products.data=null
    const searchKey = document.getElementById("search").value;
    if (searchKey) {
      setSearchKey(searchKey);
      dispatch(searchProducts(searchKey));
      setSearchClicked(true);
    } else {
      setSearchClicked(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 w-screen bg-custom-whitesmoke">
      <div className="w-full max-w-[40rem]">
        <div className="mt-5 flex justify-between items-center">
          <input
            id="search"
            name="search"
            type="search"
            placeholder="Keyword"
            autoFocus
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            className="flex-grow mr-2 rounded-md border border-custom-black bg-white py-2 px-3 leading-5 placeholder-gray-500 focus:border-css-purple focus:placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm"
          />
          <button
            type="submit"
            onClick={handleSearch}
            className="flex-shrink-0 h-full px-4 py-2 rounded-md border border-transparent bg-css-purple text-custom-white font-medium shadow-sm hover:bg-custom-whitesmoke hover:text-css-purple focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Search
          </button>
        </div>
      </div>

      <div>
        {searchClicked && !loading && !products?.data?.length && ( 
          <div style={{ textAlign: 'center', fontSize: '18px', color: 'gray', marginTop: '10px' }}>No products found</div>
        )}

        {products?.data?.length ? (
          <div className="w-full mt-4 flex flex-wrap justify-center">
            {products.data.map((book, index) => (
              <ViewProducts key={index} book={book} />
            ))}
          </div>
        ) : null}
      </div>

    </div>
  );
};

export default Search;
