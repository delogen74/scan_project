import React from 'react';
import styles from './LimitsPanel.module.css';
import Loader from '../Loader/Loader';

const LimitsPanel = ({ loading, error, limits }) => {
    if (loading) {
        return <Loader size="small" />;
    }

    if (error) {
        return <span className={styles.error}>{error}</span>;
    }

    if (limits) {
        return (
            <span className={styles.limits}>
        Лимит: {limits.usedCompanies} / {limits.companyLimit}
      </span>
        );
    }

    return null;
};

export default LimitsPanel;
