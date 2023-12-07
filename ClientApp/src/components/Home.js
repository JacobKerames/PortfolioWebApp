import React, { useEffect } from 'react';
import './Home.css';

const Home = () => {
    useEffect(() => {
        // Add the class to the body element
        document.body.classList.add('is-home');

        return () => {
            // Clean up: Remove class
            document.body.classList.remove('is-home');
        };
    }, []);

    return (
        <div className="home-container">
            {/* Content */}
        </div>
    );
}

export default Home;
