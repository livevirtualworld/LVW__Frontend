import React from "react";
import { NavLink } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import style from './WhoWeAre.module.css'
import Footer from "../Footer/Footer";



function WhoWeAre() {
    return (
        <>
            <Navbar />
            <div className={style['bgImage']}></div>
            <div className={style['header__title']}>
                <h1>Who We Are</h1>
            </div>
            <div className={style['container']}>
                <div className={style['main__title']}>
                    <h1>A World Without Borders</h1>
                </div>
                <div className={style['body__content']}>
                    <h2>Our Services</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec tincidunt neque. Duis nulla lectus, tristique ac mattis quis, efficitur ac nunc. Integer mollis, dolor at dictum vulputate, arcu ipsum commodo neque, nec imperdiet diam dui feugiat libero. Donec eget tempus ante, id posuere turpis. Fusce molestie nisi tincidunt augue.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec tincidunt neque. Duis nulla lectus, tristique ac mattis quis, efficitur ac nunc. Integer mollis, dolor at dictum vulputate, arcu ipsum commodo neque, nec imperdiet diam dui feugiat libero. Donec eget tempus ante, id posuere turpis. Fusce molestie nisi tincidunt augue.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris nec tincidunt neque. Duis nulla lectus, tristique ac mattis quis, efficitur ac nunc.
                        Integer mollis, dolor at dictum vulputate, arcu ipsum commodo neque, nec imperdiet diam dui feugiat libero.
                        Donec eget tempus ante, id posuere turpis. Fusce molestie nisi tincidunt augue.</p>
                        <h2>1- Education</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec tincidunt neque. Duis nulla lectus, tristique ac mattis quis, efficitur ac nunc. Integer mollis, dolor at dictum vulputate, arcu ipsum commodo neque, nec imperdiet diam dui feugiat libero. Donec eget tempus ante, id posuere turpis. Fusce molestie nisi tincidunt augue.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec tincidunt neque. Duis nulla lectus, tristique ac mattis quis, efficitur ac nunc. Integer mollis, dolor at dictum vulputate, arcu ipsum commodo neque, nec imperdiet diam dui feugiat libero. Donec eget tempus ante, id posuere turpis. Fusce molestie nisi tincidunt augue.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris nec tincidunt neque. Duis nulla lectus, tristique ac mattis quis, efficitur ac nunc.
                        Integer mollis, dolor at dictum vulputate.</p>
                </div>
                <div className={style['last__div']}>
                    <h2>Start Your Tour</h2>
                    <button><NavLink to='/login'>Join Us Now</NavLink></button>
                </div>
            </div>
            <Footer />
        </>

    );
}

export default WhoWeAre;