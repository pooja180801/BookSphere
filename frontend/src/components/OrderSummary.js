import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../state/order/Action';
import { useLocation, useParams } from 'react-router-dom';

const OrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();


  const { loading, order, error } = useSelector((state) => state.order);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full px-5 py-7 mt-8 border h-auto bg-custom-white border-css-purple">
      <div>
        <h2 className="text-lg font-medium text-css-purple text-center">Order Summary</h2>
        <div className="mt-4 space-y-2">
          {order?.orderItems?.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>{item.book?.bookname ?? 'Unknown Book'}</span>
              <span>
                Rs.{item.book?.bookprice ? item.book.bookprice.toFixed(2) : 'N/A'}
              </span>
            </div>
          ))}
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>
              Rs.{order?.totalPrice ? order.totalPrice.toFixed(2) : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
