import React from 'react';
import styles from './CustomArrow.module.css';

const CustomArrow = ({ onClick, direction }) => {
    return (
        <div
            className={`${styles.arrow} ${direction === 'prev' ? styles.prev : styles.next}`}
            onClick={onClick}
        >
            {direction === 'prev' ? '←' : '→'}
        </div>
    );
};

export default CustomArrow;
