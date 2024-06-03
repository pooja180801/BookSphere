import React from 'react';
import { Box, Grid,Button, TextField } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../state/Authorization/Action';

const Login = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = {
      email: formData.get("email"),
      password: formData.get("password")
    };
    dispatch(login(userData))
    console.log("userData", userData);
  };

  return (
    <Grid item xs={12} lg={7}>
      <Box className=' rounded-s-md shadow-md p-5'>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                id='email'
                name='email'
                label='Email'
                fullWidth
                autoComplete='email'
              />
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
              />
            </Grid>
          </Grid>
          <button
            type="submit"
            className="mt-6 mx-auto flex w-[20rem] items-center justify-center rounded-md border border-transparent bg-css-purple py-3 px-8 text-base font-medium text-custom-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        <div className='flex justify-center flex-col items-center'>
            <div className='py-3 flex items-center mt-2'>
                <p>if you don't have an account?</p>
                <Button onClick={()=>navigate("/register")} className='ml-5 ' size='small'>Register</Button>
            </div>
        </div>
      </Box>
    </Grid>
  );
};

export default Login;

