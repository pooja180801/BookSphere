import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../state/order/Action';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const OrderSummary = () => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const data = { orderId: params.orderId };
    dispatch(getOrderById(data));
  }, [dispatch, params.orderId]);

  const { loading, order, error } = useSelector((state) => state.order);
  console.log("order", order);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-xl border rounded-md shadow-md p-5 bg-custom-white">
        <h2 className="text-lg font-medium text-css-purple text-center">Order Summary</h2>
        <div className="mt-4 space-y-2">
          {order?.data?.orderItems?.map((item, index) => (
            <div key={index} className="flex flex-row justify-between items-start  p-2 rounded-md">
              <div>
              <span className="w-full sm:w-auto text-start ">{item.books?.bookname ?? 'Unknown Book'}</span>
              <div className="flex w-full text-custom-gray-500 sm:w-auto justify-between sm:justify-start items-center mt-2 sm:mt-0 ">
                <span className="text-start">{item?.quantity ?? 'N/A'}</span>
                <span className="mx-1">×</span>
                <span>{item.books?.bookprice ? item.books.bookprice : 'N/A'}</span>
               
              </div>
              </div>
              <span className="w-full sm:w-auto text-end pt-6  ">{item.price ? item?.price.toFixed(2) : 'N/A'}</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold pt-8 px-3">
            <span>Total</span>
            <span>Rs.{order?.data?.totalPrice ? order?.data?.totalPrice.toFixed(2) : 'N/A'}</span>
          </div>
        </div>
       
      </div>
      </div>
      <div className='flex items-center justify-center'>
       <Link
                          to='/checkout/orderSummary/:orderId/orderConfirmation'
                          className="w-[12rem] flex items-center justify-center rounded-md border border-transparent bg-css-purple text-custom-white px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Confirm Order
                        </Link>
                        </div>
    </div>
  );
};

export default OrderSummary;
