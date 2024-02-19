import React from "react";
import style from './Form.module.css'





function Form() {
    return ( 
        <>
        <div className={style['container']}>
        <h1>Ask a question</h1>
        <p>Fill out our form and well get back to you in 24 hours.</p>
        <form>
            <input type="text" placeholder="Full Name"/>
            <input type="email" placeholder="Email"/>
            <input type="text" placeholder="Subject"/>
            <textarea placeholder="Message"></textarea>
            <div className={style['button']}>
                <button>Send Message</button>
            </div>
        </form>
        </div>
        </>
     );
}

export default Form;