import React, { useEffect, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, updateCartItem } from '../state/cart/Action';
import CartItem from './CartItem';
import { Snackbar, Alert } from '@mui/material';

export default function Cart() {
  const [open, setOpen] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, cart, error } = useSelector((state) => state);
  console.log("cartitems", cart.cartItems);

  useEffect(() => {
    dispatch(getCart());
  }, [cart.updatedCartItem,cart.deletedCartItem]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };


  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={setOpen}>
        <TransitionChild
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-custom-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-custom-whitesmoke shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <DialogTitle className="text-lg font-medium text-custom-black">Shopping cart</DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          <Link to="/" className="absolute right-4 top-4 text-custom-black hover:text-css-purple" onClick={handleClose}>
                            <span className="sr-only">Close</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {cart?.cart?.cartItems?.length > 0 ? (
                              cart.cart.cartItems.map((product, index) => (
                                <CartItem key={index} product={product} onRemove={handleRemoveNotification}/>
                              ))
                            ) : (
                              <p className=' h-[100svh] flex items-top justify-center p-3'>Your cart is empty.</p>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>Rs.{cart.cart?.totalPrice}.00</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                      <Link
                          to='/checkout'
                          className="w-full flex items-center justify-center rounded-md border border-transparent bg-css-purple text-custom-white px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>

      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowNotification(false)} severity="info">
          Item removed from cart
        </Alert>
      </Snackbar>


    </Transition>
  );
}
