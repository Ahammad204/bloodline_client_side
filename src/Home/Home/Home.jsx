import React from 'react';
import Banner from '../Banner/Banner';
import FeaturedSection from '../Featured/Featured';
import ContactUs from '../ContactForm/ContactForm';

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <FeaturedSection></FeaturedSection>
            <ContactUs></ContactUs>
        </>
    );
};

export default Home;