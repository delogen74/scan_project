import React from 'react';
import parse from 'html-react-parser';
import styles from './PublicationCard.module.css';

const PublicationCard = ({ document }) => {
    const getFirstParagraphs = (markup, count = 2) => {
        try {
            if (!markup) return 'Контент недоступен.';
            const content = parse(markup);
            const paragraphs = Array.isArray(content)
                ? content.filter((node) => node.type === 'p').slice(0, count)
                : [];
            return paragraphs.map((node, index) => <p key={index}>{node.props.children}</p>);
        } catch (error) {
            return 'Ошибка обработки содержимого.';
        }
    };

    return (
        <div className={styles.card}>
            <p className={styles.date}>
                {new Date(document.issueDate).toLocaleDateString()} | {document.source.name}
            </p>
            <h3 className={styles.title}>{document.title.text}</h3>
            <div className={styles.content}>
                {getFirstParagraphs(document.content.markup, 2)}
            </div>
            <a href={document.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                Читать в источнике
            </a>
            <p className={styles.wordCount}>{document.attributes.wordCount} слов</p>
        </div>
    );
};

export default PublicationCard;
