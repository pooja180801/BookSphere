import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MainCoverImage from '../components/MainCoverImage';
import ProductRender from '../components/ProductRender';

const HomePage = () => {
  const location = useLocation();

  return (
    <div>
      {<MainCoverImage />}
      <ProductRender/>
    </div>
  );
};

export default HomePage;
