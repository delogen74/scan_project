import React from 'react';
import styles from './FAQ.module.css';

const FAQ = () => {
    return (
        <div className={styles.faqContainer}>
            <h1>Часто задаваемые вопросы</h1>
            <div className={styles.question}>
                <h3>Вопрос 1</h3>
                <p>Ответ на вопрос 1.</p>
            </div>
            <div className={styles.question}>
                <h3>Вопрос 2</h3>
                <p>Ответ на вопрос 2.</p>
            </div>
        </div>
    );
};

export default FAQ;
