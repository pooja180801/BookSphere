import { Box, Grid, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createOrder } from '../state/order/Action';
import { useNavigate } from 'react-router-dom';

const DeliveryAddressForm = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    const data = new FormData(e.currentTarget);

    const address = {
      firstName: data.get("firstname"),
      lastName: data.get("lastname"),
      address: data.get("address"),
      city: data.get("city"),
      district: data.get("district"),
      postalcode: data.get("postalcode"),
      phoneNum: data.get("phoneNumber"),
    }
  

      const orderData={address,navigate}
      dispatch(createOrder(orderData));

    console.log(address)

  }
  return (
    <div className="flex justify-center items-center h-screen ">
    <div className="max-w-[40rem] border rounded-md shadow-md p-5 bg-custom-white">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>

              <TextField
                required
                id='firstname'
                name='firstname'
                label='First name'
                fullWidth
                autoComplete='given-name'

              />

            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='lastname'
                name='lastname'
                label='Last name'
                fullWidth
                autoComplete='given-name'
              />
            </Grid>

            <Grid item xs={12} >
              <TextField
                required
                id='address'
                name='address'
                label='Address'
                fullWidth
                autoComplete='given-name'
                multiline
                rows={3}

              />

            </Grid>


            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='city'
                name='city'
                label='City'
                fullWidth
                autoComplete='given-name'
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='district'
                name='district'
                label='District'
                fullWidth
                autoComplete='given-name'
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='postalcode'
                name='postalcode'
                label='Postal Code'
                fullWidth
                autoComplete='given-name'
              />
            </Grid>


            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='phoneNumber'
                name='phoneNumber'
                label='Phone Number'
                fullWidth
                autoComplete='given-name'
              />
            </Grid>
          </Grid>
          <button
            type="submit"
            className="mt-6 mx-auto flex w-[20rem] items-center justify-center rounded-md border border-transparent bg-css-purple py-3 px-8 text-base font-medium text-custom-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Proceed to Payment
          </button>
        </form>
   
    </div>
    </div>


  );
};

export default DeliveryAddressForm;
