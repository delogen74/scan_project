import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm/AuthForm';
import Search from './pages/Search/Search';
import Results from './pages/Results/Results';
import RestorePassword from './pages/RestorePassword/RestorePassword';
import Home from './pages/Home/Home';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Tariffs from './pages/Tariffs/Tariffs';
import FAQ from './pages/FAQ/FAQ';
import TariffDetails from './pages/Tariffs/TariffDetails';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<AuthForm />} />
                <Route path="/register" element={<AuthForm />} />
                <Route path="/restore-password" element={<RestorePassword />} />
                <Route
                    path="/search"
                    element={
                        <ProtectedRoute>
                            <Search />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/results"
                    element={
                        <ProtectedRoute>
                            <Results />
                        </ProtectedRoute>
                    }
                />
                <Route path="/tariffs" element={<Tariffs />} />
                <Route path="/tariffs/:tariffId" element={<TariffDetails />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
