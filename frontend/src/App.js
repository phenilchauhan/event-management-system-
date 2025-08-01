// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Home from './pages/Home';
// import CreateEvent from './pages/CreateEvent';
// import { getUserRole } from './utils/auth';

// function App() {
//   const token = localStorage.getItem('token');
//   const role = getUserRole();

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={!token ? <Register /> : <Navigate to="/home" />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
//         <Route path="/create-event" element={token && role === 'admin' ? <CreateEvent /> : <Navigate to="/home" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';
import LocationList from './pages/LocationList';
import LocationForm from './pages/LocationForm';
import LocationView from './pages/LocationView';
// import AdminDashboard from './pages/AdminDashboard';
// import UserRegistrations from './pages/UserRegistrations';
import { getUserRole } from './utils/auth';

function App() {
  const token = localStorage.getItem('token');
  const role = getUserRole();

  return (
    <Router>
      <Routes>
        {/* Redirect based on token and role */}
        <Route
          path="/"
          element={
            !token ? <Navigate to="/login" /> : <Navigate to="/home" />
          }
        />
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/create-event"
          element={token && role === 'admin' ? <CreateEvent /> : <Navigate to="/home" />}
        />
        <Route
          path="/event/:id"
          element={token ? <EventDetails /> : <Navigate to="/login" />}
        />

        {/* Location Management (admin only) */}
        <Route
          path="/locations"
          element={token && role === 'admin' ? <LocationList /> : <Navigate to="/home" />}
        />
        <Route
          path="/locations/create"
          element={token && role === 'admin' ? <LocationForm /> : <Navigate to="/home" />}
        />
        <Route
          path="/locations/edit/:id"
          element={token && role === 'admin' ? <LocationForm /> : <Navigate to="/home" />}
        />
        <Route
          path="/locations/view/:id"
          element={token && role === 'admin' ? <LocationView /> : <Navigate to="/home" />}
        />
        {/* <Route
          path="/my-registrations"
          element={token && role === 'user' ? <UserRegistrations /> : <Navigate to="/home" />}
        /> */}
        {/* <Route
          path="/admin"
          element={token && role === 'admin' ? <AdminDashboard /> : <Navigate to="/home" />}
        /> */}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
