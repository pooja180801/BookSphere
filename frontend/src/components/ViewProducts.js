import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductDetails from './ProductDetails';

const ViewProducts = ({ book }) => {
  const navigate = useNavigate();

  const handleViewProducts = (bookId) => {
    navigate(`/viewProduct/${bookId}`); 
  };


  return (
    <div className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[14rem] mx-auto border border-black hover:shadow-custom-hover">
      <div className="relative h-[17rem] w-[12rem]">
        <div className="absolute top-[13px] left-[3px] bg-custom-whitesmoke text-css-purple font-bold text-[18px] rounded-[0.5rem] p-[0.5rem]">
          Rs.{book.bookprice}
        </div>
        <img src={require(`../assets/images/${book.imageUrl}`)} className="object-cover object-top mt-3 w-full h-full" alt={book.bookname} />
      </div>
      <div className="p-4">
        <h3 className="mt-2 text-lg font-medium text-gray-900 h-[3rem] text-center flex justify-center items-center">
          {book.bookname}
        </h3>
        <p className="mt-2 text-center text-sm text-custom-gray-500">by {book.authorName}</p>
      </div>
      <div className="w-full px-1 my-2">
        <button
          type="button"
          onClick={()=>handleViewProducts(book.bookId)}
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-css-purple py-3 px-8 text-base font-medium text-custom-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          View Products
        </button>
      </div>
    </div>
  );
};

export default ViewProducts;
