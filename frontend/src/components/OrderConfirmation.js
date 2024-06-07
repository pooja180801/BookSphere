import React from 'react';
import { Link } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const OrderConfirmation = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className=" text-[6rem] text-css-purple">
        <CheckCircleOutlineIcon sx={{ fontSize:'12rem' }}/>
      </div>
      <div className="text-2xl font-medium mt-4">
        Order Confirmed
      </div>
      <div className=" text-custom-gray-500 my-4">
        Your order has been successfully confirmed.
      </div>
      <div className=" mt-8">
        Continue Shopping?
      <Link to="/" className=' ml-7 hover: text-css-purple '>
        Go to Homepage
      </Link>
    </div>
    </div>
  );
};

export default OrderConfirmation;