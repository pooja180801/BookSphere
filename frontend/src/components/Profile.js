import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';

const Profile = ({ open, setOpen }) => {
  const { user ,loading,error} = useSelector(state => state.auth);
  console.log("profile",user)
  console.log("open",open)

  if (!user) {
    return <div>Loading...</div>;
  }
  const data = user.data;

  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={() => setOpen(false)}>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-custom-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-[25rem] h-20rem] max-w-md transform overflow-hidden rounded-lg bg-custom-whitesmoke p-6 text-left align-middle shadow-xl transition-all">
                <div className="relative">
                  <Grid item xs={12} lg={7}>
                    <Box className='rounded-md shadow-md p-5 bg-custom-whitesmoke'>
                      <Typography variant="h5" gutterBottom className="mb-10 text-css-purple text-center">
                        User Profile
                      </Typography>
                      <div className="mb-4">
                        <strong className="text-custom-gray-500">Username:</strong><br /> {data.username}
                      </div>
                      <div className="mb-4">
                        <strong className="text-custom-gray-500">Email:</strong> <br />{data.email}
                      </div>
                      <div>
                        <strong className="text-custom-gray-500">Role:</strong><br /> {data.role}
                      </div>
                    </Box>
                  </Grid>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Profile;
