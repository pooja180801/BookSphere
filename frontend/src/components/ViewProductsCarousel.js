import React, { useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ViewProducts from './ViewProducts';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const ViewProductsCarousel = ({ genre, books }) => {
  const buttonPrevStyle = {
    position: 'absolute',
    top: '45%',
    left: '0rem',
    background: 'purple',
    transform: 'translateY(-50%)',
    zIndex: 1,
    color: 'white',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem',
  };

  const buttonNextStyle = {
    position: 'absolute',
    top: '45%',
    right: '0rem',
    background: 'purple',
    transform: 'translateY(-50%)',
    zIndex: 1,
    color: 'white',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem',
  };


  const carouselRef = useRef(null);

  const responsive = { 0: { items: 1 }, 600: { items: 2 }, 950: { items: 3 }, 1100: { items: 4 } }

  const items = books.map((book, index) => (
    <ViewProducts key={index} book={book} />
  ));


  return (
    <div className="relative px-4 lg:px-4 mt-8 bg-custom-whitesmoke">
      <h2 className='text-4xl font-extrabold text-css-purple py-5 text-center'>{genre}</h2>
      <div className='relative p-5'>
      <button style={buttonPrevStyle} onClick={() => carouselRef.current.slidePrev()}>
        <ArrowBackIosNewIcon/>
      </button>
      <AliceCarousel
        ref={carouselRef}
        mouseTracking
        items={items}
        responsive={responsive}
        controlsStrategy="alternate"
        infinite
        disableButtonsControls
        disableDotsControls
      />
      <button style={buttonNextStyle} onClick={() => carouselRef.current.slideNext()}>
        <ArrowForwardIosIcon />
      </button>
      </div>
    </div>
  );
};

export default ViewProductsCarousel;
