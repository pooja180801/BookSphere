import { Box, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createOrder } from '../state/order/Action';
import { useNavigate } from 'react-router-dom';

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [cityError, setCityError] = useState('');
  const [districtError, setDistrictError] = useState('');
  const [postalCodeError, setPostalCodeError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setFirstNameError('');
    setLastNameError('');
    setAddressError('');
    setCityError('');
    setDistrictError('');
    setPostalCodeError('');
    setPhoneNumberError('');


    if (!firstName.trim()) {
      setFirstNameError('First Name is required');
      return;
    }

    if (!lastName.trim()) {
      setLastNameError('Last Name is required');
      return;
    }

    if (!address.trim()) {
      setAddressError('Address is required');
      return;
    }

    if (!city.trim()) {
      setCityError('City is required');
      return;
    }

    if (!district.trim()) {
      setDistrictError('District is required');
      return;
    }

    const postalCodeRegex = /^[0-9]{5}$/;
    if (!postalCode.match(postalCodeRegex)) {
      setPostalCodeError('Please enter a valid 5-digit postal code');
      return;
    }

    const phoneNumberRegex = /^[0-9]{10}$/;
    if (!phoneNumber.match(phoneNumberRegex)) {
      setPhoneNumberError('Please enter a valid 10-digit phone number');
      return;
    }

    const addressData = {
      firstName,
      lastName,
      address,
      city,
      district,
      postalcode: postalCode,
      phoneNum: phoneNumber,
    };

    const orderData = { address: addressData, navigate };
    dispatch(createOrder(orderData));

    console.log(addressData);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-[40rem] border rounded-md shadow-md p-5 bg-custom-white">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="firstname"
                name="firstname"
                label="First name"
                fullWidth
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={!!firstNameError}
                helperText={firstNameError}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="lastname"
                name="lastname"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={!!lastNameError}
                helperText={lastNameError}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="address"
                name="address"
                label="Address"
                fullWidth
                autoComplete="street-address"
                multiline
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                error={!!addressError}
                helperText={addressError}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="address-level2"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                error={!!cityError}
                helperText={cityError}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="district"
                name="district"
                label="District"
                fullWidth
                autoComplete="address-level1"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                error={!!districtError}
                helperText={districtError}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="postalcode"
                name="postalcode"
                label="Postal Code"
                fullWidth
                autoComplete="postal-code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                error={!!postalCodeError}
                helperText={postalCodeError}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number"
                fullWidth
                autoComplete="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                error={!!phoneNumberError}
                helperText={phoneNumberError}
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
