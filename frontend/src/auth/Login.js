import React, { useState } from 'react';
import { Box, Grid, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearCart } from '../state/Authorization/Action';
import { getCart } from '../state/cart/Action';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error,success } = useSelector(state => state.auth);
    const [loginError, setLoginError] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = {
            email: formData.get("email"),
            password: formData.get("password")
        };

        try {
            await dispatch(login(userData));
            if (success) { 
                await dispatch(getCart());
                navigate(`/home`);
            } else {
                setLoginError("Login unsuccessful. Please check your credentials and try again.");
            }
        } catch (error) {
            setLoginError("An error occurred during login. Please try again.");
        }
    };

    const style = {
        top: '50%',
        left: '50%',
        width: 400,
        bgcolor: 'whitesmoke',
        borderRadius: 8,
        boxShadow: 24,
        pt: 2,
        pb: 3,
    };

    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} lg={7} container justifyContent="center" alignItems="center">
            <Box sx={style} className='rounded-s-md shadow-md p-5'>
            <h2 className="text-center text-css-purple text-2xl mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    
                    {loginError && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{loginError}</div>}

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
                        <Button onClick={() => navigate("/register")} className='ml-5 ' size='small'>Register</Button>
                    </div>
                </div>
            </Box>
        </Grid>
      </Grid>
    );
};

export default Login;
