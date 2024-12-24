import React from 'react';
import styles from './Loader.module.css';
import classNames from 'classnames';

const Loader = ({ size = 'default' }) => (
    <div className={classNames(styles.loader, styles[size])}></div>
);

export default Loader;
