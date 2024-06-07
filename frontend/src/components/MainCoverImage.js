import React from 'react';

const MainCoverImage = () => {
    return (
        <div className="relative h-[90vh]">
            <img className="w-full h-full object-cover" src="https://images.pexels.com/photos/207636/pexels-photo-207636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Cover"/>
            <div className="absolute inset-0 flex items-center justify-center bg-custom-black bg-opacity-50 text-custom-white">
                <h1 className="text-2xl font-bold text-center">Explore boundless worlds of knowledge and imagination with our online bookstore, where every page offers an adventure waiting to be discovered.</h1>
            </div>
        </div>
    );
};

export default MainCoverImage;
