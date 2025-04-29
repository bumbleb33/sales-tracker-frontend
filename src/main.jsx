import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddSale from './pages/AddSale';
import './index.css';
import SalesList from './pages/SalesList';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/add-sale" element={<AddSale />} />
    <Route path="/sales-list" element={<SalesList />} />
  </Routes>
  </BrowserRouter>
);
