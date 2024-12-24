import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Search.module.css';
import { validateINN } from '../../utils/validateINN';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistograms, fetchDocumentIds, fetchDocuments } from '../../redux/slices/searchSlice';
import Loader from '../../components/Loader/Loader';
import PublicationCard from '../../components/PublicationCard/PublicationCard';

const Search = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        inn: '',
        maxFullness: false,
        inBusinessNews: false,
        onlyMainRole: false,
        tonality: 'any',
        onlyWithRiskFactors: false,
        includeTechNews: false,
        includeAnnouncements: false,
        includeDigests: false,
        documentCount: 10,
        startDate: '',
        endDate: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!validateINN(formData.inn)) {
            newErrors.inn = 'Некорректный ИНН';
        }

        if (!formData.startDate || !formData.endDate) {
            newErrors.date = 'Необходимо указать оба периода дат';
        } else {
            if (new Date(formData.startDate) > new Date(formData.endDate)) {
                newErrors.date = 'Дата начала не может быть позже даты конца';
            }
            const today = new Date();
            if (new Date(formData.startDate) > today || new Date(formData.endDate) > today) {
                newErrors.date = 'Даты не могут быть в будущем';
            }
        }

        if (formData.documentCount < 1 || formData.documentCount > 1000) {
            newErrors.documentCount = 'Количество документов должно быть от 1 до 1000';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Отправляем данные в Redux для дальнейшей обработки
            dispatch(fetchHistograms(formData));
            dispatch(fetchDocumentIds(formData));
            navigate('/results', { state: { searchParams: formData } });
        }
    };

    const isFormValid = () => {
        return (
            formData.inn &&
            validateINN(formData.inn) &&
            formData.startDate &&
            formData.endDate &&
            Object.keys(errors).length === 0
        );
    };

    return (
        <div className={styles.searchContainer}>
            <h1>Поиск публикаций</h1>
            <form onSubmit={handleSubmit} className={styles.searchForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="inn">ИНН*</label>
                    <input
                        type="text"
                        id="inn"
                        name="inn"
                        value={formData.inn}
                        onChange={handleChange}
                        placeholder="Введите ИНН (10 цифр)"
                        required
                    />
                    {errors.inn && <span className={styles.error}>{errors.inn}</span>}
                </div>
                <div className={styles.formGroupCheckbox}>
                    <input
                        type="checkbox"
                        id="maxFullness"
                        name="maxFullness"
                        checked={formData.maxFullness}
                        onChange={handleChange}
                    />
                    <label htmlFor="maxFullness">Признак максимальной полноты</label>
                </div>
                <div className={styles.formGroupCheckbox}>
                    <input
                        type="checkbox"
                        id="inBusinessNews"
                        name="inBusinessNews"
                        checked={formData.inBusinessNews}
                        onChange={handleChange}
                    />
                    <label htmlFor="inBusinessNews">Упоминания в бизнес-контексте</label>
                </div>
                <div className={styles.formGroupCheckbox}>
                    <input
                        type="checkbox"
                        id="onlyMainRole"
                        name="onlyMainRole"
                        checked={formData.onlyMainRole}
                        onChange={handleChange}
                    />
                    <label htmlFor="onlyMainRole">Главная роль в публикации</label>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="tonality">Тональность*</label>
                    <select
                        id="tonality"
                        name="tonality"
                        value={formData.tonality}
                        onChange={handleChange}
                        required
                    >
                        <option value="any">Любая</option>
                        <option value="positive">Позитивная</option>
                        <option value="negative">Негативная</option>
                    </select>
                </div>
                <div className={styles.formGroupCheckbox}>
                    <input
                        type="checkbox"
                        id="onlyWithRiskFactors"
                        name="onlyWithRiskFactors"
                        checked={formData.onlyWithRiskFactors}
                        onChange={handleChange}
                    />
                    <label htmlFor="onlyWithRiskFactors">Публикации только с риск-факторами</label>
                </div>
                <div className={styles.formGroupCheckbox}>
                    <input
                        type="checkbox"
                        id="includeTechNews"
                        name="includeTechNews"
                        checked={formData.includeTechNews}
                        onChange={handleChange}
                    />
                    <label htmlFor="includeTechNews">Включать технические новости рынков</label>
                </div>
                <div className={styles.formGroupCheckbox}>
                    <input
                        type="checkbox"
                        id="includeAnnouncements"
                        name="includeAnnouncements"
                        checked={formData.includeAnnouncements}
                        onChange={handleChange}
                    />
                    <label htmlFor="includeAnnouncements">Включать анонсы и календари</label>
                </div>
                <div className={styles.formGroupCheckbox}>
                    <input
                        type="checkbox"
                        id="includeDigests"
                        name="includeDigests"
                        checked={formData.includeDigests}
                        onChange={handleChange}
                    />
                    <label htmlFor="includeDigests">Включать сводки новостей</label>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="documentCount">Количество документов в выдаче*</label>
                    <input
                        type="number"
                        id="documentCount"
                        name="documentCount"
                        value={formData.documentCount}
                        onChange={handleChange}
                        min="1"
                        max="1000"
                        required
                    />
                    {errors.documentCount && <span className={styles.error}>{errors.documentCount}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="startDate">Дата начала поиска*</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="endDate">Дата конца поиска*</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                    />
                    {errors.date && <span className={styles.error}>{errors.date}</span>}
                </div>
                <button type="submit" disabled={!isFormValid()} className={styles.submitButton}>
                    Поиск
                </button>
            </form>
        </div>
    );
};
export default Search;
