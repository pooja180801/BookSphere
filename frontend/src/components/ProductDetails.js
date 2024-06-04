import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findProductsById } from '../state/product/Action'; 
import { addItemToCart } from '../state/cart/Action';

const ProductDetails = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store)
  const { loading, product, error } = useSelector(state => state.products);

  useEffect(() => {
    const data = { bookId: params.productId };
    dispatch(findProductsById(data));
  }, [params.productId]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToBag = (bookId) => {
    const reqData = {
      bookId: bookId
    };
    dispatch(addItemToCart(reqData));
    navigate(`/cart`)
  };

  return (
    <Transition show={open}>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as="div" // Render as a div instead of a fragment
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="fixed inset-0 bg-custom-black bg-opacity-50" />
            <div className="w-[25rem] h-[40rem] max-w-md transform overflow-hidden rounded-lg bg-custom-whitesmoke p-6 text-left align-middle shadow-xl transition-all relative">
              <div className="relative">
                <Link to="/" className="absolute right-4 top-4 text-custom-black hover:text-css-purple" onClick={handleClose}>
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </Link>
                {product && (
                  <div className="flex flex-col items-center">
                    <div className="relative h-[17rem] w-[12rem]">
                      <img src={require(`../assets/images/${product?.imageUrl}`)} className="object-cover object-top mt-3 w-full h-full" alt={product?.bookname} />
                    </div>
                    <div className="w-full mt-4 flex flex-col items-center">
                      <h1 className="text-2xl font-bold tracking-tight text-css-purple mb-3">{product?.bookname}</h1>
                      <p className="mt-2 text-center text-sm text-custom-gray-500 mb-3">by {product?.author}</p>
                      <p className="text-1xl tracking-tight text-custom-black">Rs.{product?.bookprice}</p>
                      <div className="mt-4">
                        <p className="text-base text-custom-gray-500">{product?.bookdesc}</p>
                      </div>
                      <button
                        onClick={() => handleAddToBag(product.bookId)}
                        type="button"
                        className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-css-purple py-3 px-8 text-base font-medium text-custom-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Add to bag
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition>
  );
};

export default ProductDetails;
