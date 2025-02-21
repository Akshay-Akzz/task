import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './Pages/Admin/Dashboard/Dash/Dashboard'
import Listing from './Pages/Admin/Dashboard/List/Listing';
import AddList from './Pages/Admin/Dashboard/List/AddList';

const Layout = lazy(() => import('./Pages/Admin/Auth/Layout'));
const Login = lazy(() => import('./Pages/Admin/Auth/Login'));
const Register = lazy(() => import('./Pages/Admin/Auth/Register'));
// const Dashboard = lazy(() => import('./pages/Admin/Dashboard/Dash/Dashboard'));
// const AddList = lazy(() => import('./Pages/Admin/Dashboard/List/AddList'));
// const Listing = lazy(() => import('./Pages/Admin/Dashboard/List/Listing'));

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path='dashboard' element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }>
        <Route path="addlist" element={<AddList />} />
        <Route path="editlist/:id" element={<AddList />} />
        <Route path="list" element={<Listing />} />
      </Route>
    </Routes>
  )
}

export default App
