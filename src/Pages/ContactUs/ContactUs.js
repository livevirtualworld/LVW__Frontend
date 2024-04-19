import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import style from './ContactUs.module.css';
import Footer from "../Footer/Footer";
import Form from "./Form";

function ContactUs() {
    const [visibleQuestion, setVisibleQuestion] = useState(null);
    const [showForm, setShowForm] = useState(false)

    const faIconClass = (question) => {
        return visibleQuestion === question ? 'fa-caret-down' : 'fa-caret-up';
    };

    const toggleAnswer = (question) => {
        setVisibleQuestion(visibleQuestion === question ? null : question);
    };

    const faIconOnClick = (question) => {
        return () => toggleAnswer(question);
    };

    const faIcon = (question) => {
        return <i className={`fa-solid ${faIconClass(question)}`} onClick={faIconOnClick(question)}></i>;
    };

    const faQuestionAnswer = (question, answer) => {
        return (
            <div key={question} className={style['q__a']}>
                <div className={style['questions']} onClick={faIconOnClick(question)}>
                    <p>{question}</p>
                    {faIcon(question)}
                </div>
                {visibleQuestion === question && (
                    <div className={style['answer']}>
                        <p>{answer}</p>
                    </div>
                )}
            </div>
        );
    };

    const questionsAndAnswers = [
        {
            question: "What is LVW about?",
            answer: "LVW offers immersive live virtual experiences, including flagship Live Virtual Tours that transport you to captivating locations through Full-HD Quality live streams. Engage in real-time conversations with skilled specialists and tour guides, creating a personalized adventure. A professional camera operator ensures a cinematic live-stream, while a virtual director enhances the experience with specialized media content. LVW also provides Live Virtual Educational Experiences, offering interactive journeys through time led by verified professional tour guides and subject experts. With captivating virtual field trips, LVW brings innovative and enriching educational approaches to learners, regardless of their group's location."
        },
        {
            question: "What happens if I encounter technical issues during the tour?",
            answer: "If you experience any technical issues, please reach out to our dedicated support team at info@livevirtualworld.com . Our team is ready to assist you and address any concerns you may have."
        },
        {
            question: "What devices can I use to access LVW tours?",
            answer: "You can enjoy LVW tours on any streaming-enabled device, including laptops, tablets, computers, and smartphones."
        },
        {
            question: "Are there specific browsers I need to use?",
            answer: "We seamlessly support all major browsers to ensure a smooth experience. You can access LVW tours using the latest versions of popular browsers such as Google Chrome, Mozilla Firefox, Safari, and Microsoft Edge."
        },
        {
            question: "Do I need a stable internet connection to access LVW tours?",
            answer: "Yes, a stable internet connection is essential for uninterrupted enjoyment of LVW tours. Please ensure you have a reliable internet connection to fully experience our virtual tours."
        },
        {
            question: "In case of cancellation?",
            answer: "LVW tours are subject to cancellation or rescheduling due to inclement weather, health concerns, or unforeseen circumstances. If your tour is canceled or rescheduled, you'll receive a full credit, allowing you to join another tour or the rescheduled session. In case you miss the start time of your LVW tour, you can still join while the tour is in progress."
        },
    ];
    const navigateToProfile = (profileUrl) => {
        window.open(profileUrl, "_blank"); // Open the profile URL in a new tab
    };

    return (
        <>
            <Navbar />
            {!showForm ? (
                <>
                    <div className={style['bgImage']}></div>
                    <div className={style['header__title']}>
                        <h1>Contact Us</h1>
                    </div>
                    <div className={style['container']}>
                        <div className={style['main__title']}>
                            <h1>We are here to help you</h1>
                        </div>
                        <h2>Popular Questions</h2>
                        {questionsAndAnswers.map(({ question, answer }, index) => (
                            <div key={index}>
                                {faQuestionAnswer(question, answer)}
                            </div>
                        ))}
                        <h3>Contact Us:</h3>
                        <div className={style['contacts']}>
                            <div className={style['card']} onClick={() => window.location.href = "mailto:Info@lvw.live"}>
                                <i className="fa-solid fa-envelope"></i>
                                <p>Email</p>
                            </div>
                            <div className={style['card']} onClick={() => setShowForm(true)}>
                                <i className="fa-solid fa-envelope"></i>
                                <p>Ask a question</p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <Form />
            )}
            <div className={style['social__icons']}>
                <i class="fa-brands fa-facebook-f" onClick={() => navigateToProfile("https://www.facebook.com/story.php?story_fbid=406443851756849&substory_index=898726195041079&id=100071737136498")}></i>
                <i class="fa-brands fa-instagram" onClick={() => navigateToProfile("https://www.instagram.com/live_virtual_world?igsh=MzRlODBiNWFlZA==")}></i>
                <i class="fa-brands fa-linkedin-in" onClick={() => navigateToProfile("https://www.linkedin.com/company/live-virtual-world/")}></i>
                <i class="fa-brands fa-youtube" onClick={() => navigateToProfile("https://youtube.com/@livevirtualworld7827?si=EnL3pBzNfYYrxW8W")}></i>
            </div>

            <Footer />
        </>
    );
}

export default ContactUs;
