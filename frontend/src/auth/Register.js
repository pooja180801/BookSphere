import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, register } from '../state/Authorization/Action';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { auth } = useSelector(store => store);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    }
  }, [token, auth.token]);

  const handleLogin = () => {
    navigate(`/login`);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!formData.username.trim()) {
      validationErrors.username = "Username is required!";
    }
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Invalid email!";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required!";
    } else if (formData.password.length < 8) {
      validationErrors.password = "Password should be at least 8 characters!";
    }

    setErrors(validationErrors);
    console.log(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password
      };

      dispatch(register(userData))
      console.log("userData", userData);
    }
  };

  return (
    <Grid item xs={12} lg={7}>
      <Box className='rounded-s-md shadow-md p-5'>
        <form onSubmit={handleRegister}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                id='username'
                name='username'
                label='Username'
                fullWidth
                autoComplete='username'
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id='email'
                name='email'
                label='Email'
                fullWidth
                autoComplete='email'
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id='password'
                name='password'
                label='Password'
                fullWidth
                type='password'
                autoComplete='new-password'
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
            </Grid>
          </Grid>
          <button
            type="submit"
            className="mt-6 mx-auto flex w-[20rem] items-center justify-center rounded-md border border-transparent bg-css-purple py-3 px-8 text-base font-medium text-custom-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Register
          </button>
        </form>

        <div className='flex justify-center flex-col items-center'>
          <div className='py-3 flex items-center mt-2'>
            <p>If you already have an account?</p>
            <Button onClick={handleLogin} className='ml-5 ' size='small'>Login</Button>
          </div>
        </div>
      </Box>
    </Grid>
  );
};

export default Register;
