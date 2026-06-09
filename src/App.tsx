import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import SystemSettings from './pages/SystemSettings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages - no sidebar */}
        <Route path="/" element={<Home />} />
        <Route path="/gioi-thieu" element={<About />} />
        <Route path="/login" element={<Login />} />
        {/* Admin pages - with sidebar layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bao-cao" element={<Reports />} />
          <Route path="/he-thong" element={<SystemSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
