import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Login from './Login';
import Register from './Register';
import { useLocation, useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'whitesmoke',
  borderRadius: 8,
  boxShadow: 24,
  pt: 2,
  px: 3,
  pb: 3,
};

const AuthModal = ({ handleClose, open }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleCloseModal = () => {
    handleClose();
    navigate('/');
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {location.pathname === '/login' ? <Login /> : <Register />}
          <button
            onClick={handleCloseModal}
            className="flex items-center justify-center rounded-full bg-gray-300 w-8 h-8 absolute top-2 right-2"
          >
            <XMarkIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModal;
