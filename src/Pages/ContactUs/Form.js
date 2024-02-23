import React, { useState } from "react";
import style from './Form.module.css'
import axios from 'axios'





function Form() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { fullName, email, subject, message };
        try {
            const response = await axios.post('http://localhost:5000/user/contactus', formData);
            console.log(response.data);
            setFullName('');
            setEmail('');
            setSubject('');
            setMessage('');
        } catch (error) {
            console.error('Error:', error.response.data.message);
            // Handle error, show error message, etc.
        }
    };
    return (
        <>
            <div className={style['form__container']}>
                <h1>Ask a question</h1>
                <p>Fill out our form and well get back to you in 24 hours.</p>
                <form onSubmit={handleSubmit} className={style['contact__form']}>
                    <input type="text" placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} />
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" placeholder="Subject" onChange={(e) => setSubject(e.target.value)} />
                    <textarea placeholder="Message" onChange={(e) => setMessage(e.target.value)}></textarea>
                    <div className={style['button']}>
                        <button>Send Message</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Form;