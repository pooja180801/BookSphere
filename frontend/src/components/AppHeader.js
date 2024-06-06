import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Fragment, useEffect, useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { clearCart, getUser, logout } from '../state/Authorization/Action';

import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthModal from '../auth/AuthModal';
import { useSelector, useDispatch } from 'react-redux';
import Profile from './Profile';

const navigation = {
  pages: [
    { name: 'Home', href: '/' },
    { name: 'Genres', href: '/products' },

  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AppHeader() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const { auth } = useSelector(store => store)
  const dispatch = useDispatch();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [profileOpen, setProfileOpen] = useState(false)

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpenAuthModal(true);
    setOpen(false);
    navigate("/register")
  };

  const handleClose=()=>{
    setOpenAuthModal(false);
  }

  const handleProfile = () => {
    setProfileOpen(true); 
    setOpen(false);
    handleCloseUserMenu(); 
  };

  const handleRegister=()=>{
    setOpen(false);
    navigate(`/register`)
  }
  

  useEffect(() => {
    if (token) {
      dispatch(getUser(token))
    }
  }, [token, auth.token])

  useEffect(() => {
    if (auth.user?.data) {
      handleClose();
      if (location.pathname === "/login" || location.pathname === "/register") {
        navigate(-1); 
      }
    }
   
  }, [auth.user]);


  const handleLogout=()=>{
    dispatch(logout())
    handleCloseUserMenu();
    setOpen(false);
   
  }

  const handleCart=()=>{
    if (auth.user?.data?.username) {
      navigate(`/cart`);
    } else {
    navigate(`/register`)
    }
  }

  const { cart} = useSelector((state) => state.cart);
 

  return (
    <div className="bg-custom-white">
    {/* Mobile menu */}
    <Transition show={open}>
      <Dialog className="relative z-40 lg:hidden" onClose={setOpen}>
        <Transition.Child
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-custom-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-css-purple pb-12 shadow-xl">
              <div className="flex px-4 pb-2 pt-5 justify-end">
                <button
                  type="button"
                  className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-custom-white hover:text-custom-black hover:bg-custom-white"
                  onClick={() => setOpen(false)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-6 text-custom-white px-4 py-6 text-center">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a
                      href={page.href}
                      className="-m-2 block p-2 font-medium text-custom-white hover:text-custom-black hover:bg-custom-white"
                    >
                      {page.name}
                    </a>
                  </div>
                ))}
              </div>

              {auth.user?.data?.username ? (
                <div className="space-y-6 px-4 py-6 text-center text-custom-white">
                  <div className="flow-root">
                    <Button
                      onClick={handleProfile}
                      sx={{
                        width:'100%',
                        fontSize:'15px',
                        fontWeight: 'medium',
                        color: 'white',
                        '&:hover': {
                          color: 'purple',
                          backgroundColor: 'white',
                        },
                        textTransform: 'none',
                      }}
                    >
                      Profile
                    </Button>
                  </div>
                  <div className="flow-root">
                    <Button
                      onClick={handleLogout}
                      sx={{
                        width:'100%',
                        fontSize:'15px',
                        fontWeight: 'medium',
                        color: 'white',
                        '&:hover': {
                          color: 'purple',
                          backgroundColor: 'white',
                          borderRadius:'0'
                        },
                        textTransform: 'none',
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              ) : (
                <div className=" px-4 py-1 text-center">
                  <div className="flow-root">
                    <Button
                      onClick={handleRegister}
                      sx={{
                        width:'100%',
                        fontSize:'15px',
                        fontWeight: 'medium',
                        color: 'white',
                        '&:hover': {
                          color: 'purple',
                          backgroundColor: 'white',
                        },
                        textTransform: 'none',
                      }}
                    >
                      SignUp
                    </Button>
                  </div>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>

      <header className="relative bg-custom-white">
        {/* Header content */}
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-custom-black">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-custom-white p-2 text-custom-black lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <span className="sr-only">Your Company</span>
                  <div className="flex items-center">
                    <AutoStoriesIcon style={{ color: 'purple', fontSize: '40px' }} />
                    <p className="ml-2 text-xl" style={{ color: 'purple', fontFamily: 'Dancing Script, cursive' }}>BookSphere</p>
                  </div>
                </a>
              </div>

              {/* Pages */}
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:items-center lg:space-x-6">
                  {navigation.pages.map((page) => (
                    <a key={page.name} href={page.href} className="text-sm font-medium text-custom-black hover:text-css-purple">
                      {page.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {auth.user?.data?.username ? (
                    <div>
                      <Avatar
                        className='text-custom-white'
                        onClick={handleUserClick}
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        sx={{ bgcolor: 'purple', color: "white", cursor: 'pointer' }}
                      >
                        {auth.user.data.username[0].toUpperCase()}
                      </Avatar>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        MenuListProps={{
                          "aria-labelledby": "basic-button"
                        }}
                        PaperProps={{
                          sx: {
                            '& .MuiMenuItem-root': {
                              '&:hover': {
                                background: 'purple',
                                color: 'white',
                              },
                            },
                          }
                        }}
                      >
                        <MenuItem onClick={handleProfile}>
                          Profile
                        </MenuItem>
                        <MenuItem onClick={()=>navigate(`/products`)}>
                          Genres
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                          Logout
                        </MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <Button
                      onClick={()=>navigate(`/register`)}
                      className='text-sm font-medium text-custom-gray-500 hover:text-css-purple'
                      style={{ textTransform: 'none', color: 'GrayText' }}
                    >
                      SignUp
                    </Button>
                  )}
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="/search" className="p-2 text-custom-black hover:text-css-purple">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Button onClick={handleCart} className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-custom-black group-hover:text-css-purple"
                      aria-hidden="true"
                    />
                    <span className="ml-1top-0 text-sm font-medium text-custom-black group-hover:text-css-purple">{cart?.totalItem}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <Profile open={profileOpen} setOpen={setProfileOpen} />
      
    </div>
  )
}
