import React from 'react'
import { NavLink } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import style from './WhatWeDo.module.css'
import Pyramids from '../../assets/fynn-schmidt-IYKL2uhgsnU-unsplash.jpg'
import Italy from '../../assets/jacek-dylag-SPpsFbCaN2A-unsplash.jpg'
import Footer from '../Footer/Footer';




function WhatWeDo() {
    return (
        <>
            <Navbar />
            <div className={style['bgImage']}></div>
            <div className={style['header__title']}>
                <h1>What We Do</h1>
            </div>
            <div className={style['container']}>
                <div className={style['body__content']}>
                    <h3>Our Mission</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec tincidunt neque. Duis nulla lectus, tristique ac mattis quis, efficitur ac nunc. Integer mollis, dolor at dictum vulputate, arcu ipsum commodo neque, nec imperdiet diam dui feugiat libero. Donec eget tempus ante, id posuere turpis. Fusce molestie nisi tincidunt augue.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec tincidunt neque. Duis nulla lectus, tristique ac mattis quis, efficitur ac nunc. Integer mollis, dolor at dictum vulputate, arcu ipsum commodo neque, nec imperdiet diam dui feugiat libero. Donec eget tempus ante, id posuere turpis. Fusce molestie nisi tincidunt augue.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris nec tincidunt neque. Duis nulla lectus, tristique ac mattis quis, efficitur ac nunc.
                        Integer mollis, dolor at dictum vulputate, arcu ipsum commodo neque, nec imperdiet diam dui feugiat libero.
                        Donec eget tempus ante, id posuere turpis. Fusce molestie nisi tincidunt augue.</p>
                        <img src={Pyramids} alt='Giza'/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec tincidunt neque. Duis nulla lectus, tristique ac mattis quis, efficitur ac nunc. Integer mollis, dolor at dictum vulputate, arcu ipsum commodo neque, nec imperdiet diam dui feugiat libero. Donec eget tempus ante, id posuere turpis. Fusce molestie nisi tincidunt augue.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec tincidunt neque. Duis nulla lectus, tristique ac mattis quis, efficitur ac nunc. Integer mollis, dolor at dictum vulputate, arcu ipsum commodo neque, nec imperdiet diam dui feugiat libero. Donec eget tempus ante, id posuere turpis. Fusce molestie nisi tincidunt augue.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris nec tincidunt neque. Duis nulla lectus, tristique ac mattis quis, efficitur ac nunc.
                        Integer mollis, dolor at dictum vulputate.</p>
                        <div className={style['blockquote']}>
                            <p>"The world is full of magic things, patiently waiting for our senses to grow sharper."<span>-W.B. Yeats</span></p>
                        </div>
                    <h3>Our Vission</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec tincidunt neque. Duis nulla lectus, tristique ac mattis quis, efficitur ac nunc. Integer mollis, dolor at dictum vulputate, arcu ipsum commodo neque, nec imperdiet diam dui feugiat libero. Donec eget tempus ante, id posuere turpis. Fusce molestie nisi tincidunt augue.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec tincidunt neque. Duis nulla lectus, tristique ac mattis quis, efficitur ac nunc. Integer mollis, dolor at dictum vulputate, arcu ipsum commodo neque, nec imperdiet diam dui feugiat libero. Donec eget tempus ante, id posuere turpis. Fusce molestie nisi tincidunt augue.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris nec tincidunt neque. Duis nulla lectus, tristique ac mattis quis, efficitur ac nunc.
                        Integer mollis, dolor at dictum vulputate, arcu ipsum commodo neque, nec imperdiet diam dui feugiat libero.
                        Donec eget tempus ante, id posuere turpis. Fusce molestie nisi tincidunt augue.</p>
                        <img src={Italy} alt='Italy'/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec tincidunt neque. Duis nulla lectus, tristique ac mattis quis, efficitur ac nunc. Integer mollis, dolor at dictum vulputate, arcu ipsum commodo neque, nec imperdiet diam dui feugiat libero. Donec eget tempus ante, id posuere turpis. Fusce molestie nisi tincidunt augue.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec tincidunt neque. Duis nulla lectus, tristique ac mattis quis, efficitur ac nunc. Integer mollis, dolor at dictum vulputate, arcu ipsum commodo neque, nec imperdiet diam dui feugiat libero. Donec eget tempus ante, id posuere turpis. Fusce molestie nisi tincidunt augue.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris nec tincidunt neque. Duis nulla lectus, tristique ac mattis quis, efficitur ac nunc.
                        Integer mollis, dolor at dictum vulputate.</p>
                </div>
                <div className={style['nav__join']}>
                <button><NavLink to='/login'>Join Us Now</NavLink></button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default WhatWeDo;