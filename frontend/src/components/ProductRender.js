import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findProducts } from '../state/product/Action'; 
import ViewProductsCarousel from './ViewProductsCarousel';

const ProductRender = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findProducts());
  }, [dispatch]);

  const { loading, productsByGenre, error } = useSelector(state => state.products);

  if (loading) return <div className=' h-[100svh] flex items-center justify-center p-3'>
  <p className=' text-center'>
  Loading!!!
  </p>
  </div>;

  if (error) return <div className=' h-[100svh] flex items-center justify-center p-3'>
    <p className=' text-center'>
    Something went wrong, Failed to load products. Please try again later!!!!
    </p>
    </div>;

  if (!productsByGenre) return null;

  return (
    <>
      {Object.entries(productsByGenre).map(([genre, books]) => (
        <ViewProductsCarousel key={genre} genre={genre} books={books} />
      ))}
    </>
  );
};

export default ProductRender;
