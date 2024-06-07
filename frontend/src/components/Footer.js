import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

const Footer = () => {
    return (
        <div>
            <Grid className='bg-custom-gray-500 text-custom-white text-center my-8 py-5 flex justify-around' container sx={{ background: 'rgba(211, 211, 211, 1)', color: 'black', py: '3' }}>
                <Grid item xs={12} sm={6} md={3}>

                    <Typography className='pb-5 pt-5 font-bold underline text-css-purple mt-3' variant='h6'>Quick Links</Typography>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom>Register</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom>About</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom>Wishlist</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom>Contact Us</Button>
                    </div>

                </Grid>

                <Grid item xs={12} sm={6} md={3} >
                    <Typography className='pb-5 pt-5 font-bold underline text-css-purple' variant='h6'>Contact info</Typography>
                    <Typography className='pb-5' gutterBottom>+94-777-897-465</Typography>
                    <Typography className='pb-5' gutterBottom>BookSphere.com</Typography>
                    <Typography className='pb-5' gutterBottom>Colombo, Sri Lanka</Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                <Typography className='pb-5 pt-5 font-bold underline text-css-purple ' variant='h6'>Social Media</Typography>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',margin:'auto'}}>
        <Button className='pb-9' variant='h6' gutterBottom><FacebookIcon style={{color:'purple'}}/>Facebook</Button>
        <Button className='pb-9' variant='h6' gutterBottom><InstagramIcon style={{color:'purple'}}/>Instagram</Button>
        <Button className='pb-5' variant='h6' gutterBottom><XIcon style={{color:'purple',paddingLeft:'0'}}/>Twitter</Button>
    </div>
                </Grid>

                <Grid className='pt-10 text-3xl text-css-purple' item xs={12} >
                    <Typography variant='body2' component="p" align='center'>
                        &copy; 2024 BookSphere,All rights reserved.
                    </Typography>
                    <Typography variant='body2' component="p" align='center'>
                    Distributed only within Srilanka
                    </Typography>

                </Grid>
            </Grid>
        </div>
    )
}

export default Footer