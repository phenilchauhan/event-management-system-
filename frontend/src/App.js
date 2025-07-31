import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user } = useContext(AuthContext);

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Admin Route */}
      <Route
        path="/admin"
        element={
          isAdmin ? <AdminDashboard /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
}

export default App;
