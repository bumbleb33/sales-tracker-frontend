import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddSale from './pages/AddSale';
import './index.css';
import SalesList from './pages/SalesList';
import AdminPanel from './pages/AdminPanel';
import AdminView from './pages/AdminView';
import Dashboard from './pages/Dashboard';
import DashboardCharts from './pages/DashboardCharts';



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/add-sale" element={<AddSale />} />
    <Route path="/sales-list" element={<SalesList />} />
    <Route path="/admin-panel" element={<AdminPanel />} />
    <Route path="/admin-view" element={<AdminView />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/dashboard-charts" element={<DashboardCharts />} />


  </Routes>
  </BrowserRouter>
);
