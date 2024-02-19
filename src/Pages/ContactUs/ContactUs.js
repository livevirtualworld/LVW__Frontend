import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import style from './ContactUs.module.css';
import Footer from "../Footer/Footer";

function ContactUs() {
    const [visibleQuestion, setVisibleQuestion] = useState(null);

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
            question: "What is LVW and how does it work?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec tincidunt neque. Duis nulla lectus, tristique ac mattis quis, efficitur ac nunc. Integer mollis, dolor at dictum vulputate, arcu ipsum commodo neque, nec imperdiet diam dui feugiat libero. Donec eget tempus ante, id posuere turpis. Fusce molestie nisi tincidunt augue.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec tincidunt neque."
        },
        {
            question: "Question 2",
            answer: "Answer 2"
        },
        {
            question: "Question 3",
            answer: "Answer 3"
        },
        {
            question: "Question 4",
            answer: "Answer 4"
        },
        {
            question: "Question 5",
            answer: "Answer 5"
        },
        {
            question: "Question 6",
            answer: "Answer 6"
        },
        {
            question: "Question 7",
            answer: "Answer 7"
        }
    ];
    const navigateToProfile = (profileUrl) => {
        window.open(profileUrl, "_blank"); // Open the profile URL in a new tab
      };

    return (
        <>
            <Navbar />
            <div className={style['bgImage']}></div>
            <div className={style['header__title']}>
                <h1>Contact Us</h1>
            </div>
            <div className={style['container']}>
                <div className={style['main__title']}>
                    <h1>We are here to help you</h1>
                </div>
                <h2>Popular Questions</h2>
                {questionsAndAnswers.map(({ question, answer }) => (
                    faQuestionAnswer(question, answer)
                ))}
                <h3>Contact Us:</h3>
                <div className={style['contacts']}>
                    <div className={style['card']} onClick={() => window.location.href = "mailto:Info@lvw.live"}>
                        <i class="fa-solid fa-envelope"></i>
                        <p>Email</p>
                    </div>
                    <div className={style['card']}>
                        <i class="fa-solid fa-envelope"></i>
                        <p>Ask a question</p>
                    </div>
                </div>
                <div className={style['social__icons']}>
                <i class="fa-brands fa-facebook-f" onClick={() => navigateToProfile("https://www.facebook.com/story.php?story_fbid=406443851756849&substory_index=898726195041079&id=100071737136498")}></i>
                <i class="fa-brands fa-instagram" onClick={() => navigateToProfile("https://www.instagram.com/live_virtual_world?igsh=MzRlODBiNWFlZA==")}></i>
                <i class="fa-brands fa-linkedin-in" onClick={() => navigateToProfile("https://www.linkedin.com/company/live-virtual-world/")}></i>
                <i class="fa-brands fa-youtube" onClick={() => navigateToProfile("https://youtube.com/@livevirtualworld7827?si=EnL3pBzNfYYrxW8W")}></i>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ContactUs;
