import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import styles from './Results.module.css';
import Loader from '../../components/Loader/Loader';
import PublicationCard from '../../components/PublicationCard/PublicationCard';
import resultImage from '../../assets/images/result-1.png';

const Results = () => {
    const location = useLocation();
    const { searchParams } = location.state || {};
    const [documentIds, setDocumentIds] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [visibleCount, setVisibleCount] = useState(2);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDocumentIds = async () => {
            try {
                const response = await axios.post('/api/v1/objectsearch', {
                    intervalType: 'month',
                    histogramTypes: ['totalDocuments', 'riskFactors'],
                    issueDateInterval: {
                        startDate: `${searchParams.startDate}T00:00:00`,
                        endDate: `${searchParams.endDate}T23:59:59`,
                    },
                    searchContext: {
                        targetSearchEntitiesContext: {
                            targetSearchEntities: [
                                {
                                    type: 'company',
                                    inn: searchParams.inn,
                                    maxFullness: searchParams.maxFullness,
                                    inBusinessNews: searchParams.inBusinessNews || null,
                                },
                            ],
                            onlyMainRole: searchParams.onlyMainRole,
                            tonality: searchParams.tonality,
                            onlyWithRiskFactors: searchParams.onlyWithRiskFactors,
                        },
                    },
                    similarMode: 'duplicates',
                    limit: 1000,
                    sortType: 'sourceInfluence',
                    sortDirectionType: 'desc',
                });
                setDocumentIds(response.data.items.map((item) => item.encodedId));
            } catch (err) {
                console.error('Ошибка загрузки ID документов:', err);
                setError('Не удалось загрузить данные. Попробуйте позже.');
            }
        };

        fetchDocumentIds();
    }, [searchParams]);

    useEffect(() => {
        const fetchDocuments = async () => {
            if (!documentIds.length) return;

            setLoading(true);
            try {
                const idsToFetch = documentIds.slice(0, visibleCount);
                const response = await axios.post('/api/v1/documents', { ids: idsToFetch }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });

                const fetchedDocs = response.data
                    .filter((doc) => doc.ok)
                    .map((doc) => doc.ok);
                setDocuments(fetchedDocs);
            } catch (err) {
                console.error('Ошибка загрузки документов:', err);
                setError('Ошибка при загрузке документов.');
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, [documentIds, visibleCount]);

    const loadMore = () => {
        setVisibleCount((prev) => prev + 2);
    };

    return (
        <div className={styles.resultsContainer}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Ищем. Скоро будут результаты</h1>
                    <p className={styles.subtitle}>
                        Поиск может занять некоторое время, просим сохранять терпение.
                    </p>
                </div>
                <img src={resultImage} alt="Результаты" className={styles.image}/>
            </div>
            <div className={styles.summary}>
                <h2>Общая сводка</h2>
                <p>Найдено {documentIds.length} вариантов</p>
            </div>
            <div className={styles.documents}>
                <h2>Список документов</h2>
                {loading ? (
                    <Loader />
                ) : (
                    documents.map((doc) => (
                        <PublicationCard key={doc.id} document={doc} />
                    ))
                )}
            </div>
            {visibleCount < documentIds.length && (
                <button onClick={loadMore} className={styles.loadMoreButton}>
                    Показать больше
                </button>
            )}
            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
};

export default Results;
