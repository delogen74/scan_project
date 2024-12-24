import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosConfig'; // Используем кастомный экземпляр Axios

const initialState = {
    histograms: [],
    documentIds: [],
    documents: [],
    loadingHistograms: false,
    loadingDocumentIds: false,
    loadingDocuments: false,
    errorHistograms: null,
    errorDocumentIds: null,
    errorDocuments: null,
};

// Асинхронный thunk для получения сводок (histograms)
export const fetchHistograms = createAsyncThunk(
    'search/fetchHistograms',
    async (searchParams, { rejectWithValue }) => {
        try {
            const payload = constructHistogramsPayload(searchParams);
            const response = await axios.post('/api/v1/objectsearch/histograms', payload);
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || 'Ошибка загрузки сводки');
        }
    }
);

// Асинхронный thunk для получения ID публикаций
export const fetchDocumentIds = createAsyncThunk(
    'search/fetchDocumentIds',
    async (searchParams, { rejectWithValue }) => {
        try {
            const payload = constructObjectSearchPayload(searchParams);
            const response = await axios.post('/api/v1/objectsearch', payload);
            return response.data.items.map(item => item.encodedId);
        } catch (err) {
            return rejectWithValue(err.response?.data || 'Ошибка поиска публикаций');
        }
    }
);

// Асинхронный thunk для получения содержимого публикаций
export const fetchDocuments = createAsyncThunk(
    'search/fetchDocuments',
    async (documentIds, { rejectWithValue }) => {
        try {
            const payload = {
                ids: documentIds.slice(0, 100), // Максимум 100
            };
            const response = await axios.post('/api/v1/documents', payload);
            return response.data.filter(doc => doc.ok).map(doc => doc.ok);
        } catch (err) {
            return rejectWithValue(err.response?.data || 'Ошибка загрузки документов');
        }
    }
);

// Функция для построения payload для histograms
const constructHistogramsPayload = (params) => ({
    intervalType: 'month',
    histogramTypes: ['totalDocuments', 'riskFactors'],
    issueDateInterval: {
        startDate: `${params.startDate}T00:00:00+03:00`,
        endDate: `${params.endDate}T23:59:59+03:00`,
    },
    searchContext: {
        targetSearchEntitiesContext: {
            targetSearchEntities: [
                {
                    type: 'company',
                    sparkId: null,
                    entityId: null,
                    inn: params.inn,
                    maxFullness: params.maxFullness,
                    inBusinessNews: params.inBusinessNews || null,
                },
            ],
            onlyMainRole: params.onlyMainRole,
            tonality: params.tonality,
            onlyWithRiskFactors: params.onlyWithRiskFactors,
        },
    },
    similarMode: 'duplicates',
    limit: 1000,
    sortType: 'sourceInfluence',
    sortDirectionType: 'desc',
});

// Функция для построения payload для objectsearch
const constructObjectSearchPayload = (params) => ({
    ...constructHistogramsPayload(params),
});

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        resetSearch(state) {
            state.histograms = [];
            state.documentIds = [];
            state.documents = [];
            state.loadingHistograms = false;
            state.loadingDocumentIds = false;
            state.loadingDocuments = false;
            state.errorHistograms = null;
            state.errorDocumentIds = null;
            state.errorDocuments = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Обработка fetchHistograms
            .addCase(fetchHistograms.pending, (state) => {
                state.loadingHistograms = true;
                state.errorHistograms = null;
            })
            .addCase(fetchHistograms.fulfilled, (state, action) => {
                state.loadingHistograms = false;
                state.histograms = action.payload;
            })
            .addCase(fetchHistograms.rejected, (state, action) => {
                state.loadingHistograms = false;
                state.errorHistograms = action.payload;
            })
            // Обработка fetchDocumentIds
            .addCase(fetchDocumentIds.pending, (state) => {
                state.loadingDocumentIds = true;
                state.errorDocumentIds = null;
            })
            .addCase(fetchDocumentIds.fulfilled, (state, action) => {
                state.loadingDocumentIds = false;
                state.documentIds = action.payload;
            })
            .addCase(fetchDocumentIds.rejected, (state, action) => {
                state.loadingDocumentIds = false;
                state.errorDocumentIds = action.payload;
            })
            // Обработка fetchDocuments
            .addCase(fetchDocuments.pending, (state) => {
                state.loadingDocuments = true;
                state.errorDocuments = null;
            })
            .addCase(fetchDocuments.fulfilled, (state, action) => {
                state.loadingDocuments = false;
                state.documents = [...state.documents, ...action.payload];
            })
            .addCase(fetchDocuments.rejected, (state, action) => {
                state.loadingDocuments = false;
                state.errorDocuments = action.payload;
            });
    },
});

export const { resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
