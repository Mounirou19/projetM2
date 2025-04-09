import logo from './logo.svg';
import './App.css';
// import './styles.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ProtectedRouteAdmin from './ProtectedRouteAdmin';
import ProtectedRouteUser from './ProtectedRouteUser';
import HomePage from './components/HomePage';
import MediaPage from './components/media/MediaPage';
import OneMediaPage from './components/media/OneMediaPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import NotFoundPage from './NotFoundPage';
import AdminPage from './components/admin/AdminPage';
import StatsPage from './components/admin/StatsPage';
import SeeContact from './components/admin/SeeContact';
import CreateUser from './components/admin/CreateUser';
import EditUser from './components/admin/EditUser';
import CreateMedia from './components/admin/CreateMedia';
import EditMedia from './components/admin/EditMedia';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilPage from './components/profil/ProfilPage';
import EditProfilPAge from './components/profil/EditProfilPage';
import Header from './Header';
import Logout from './components/LogoutPage';

function App() {
  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path="*" element={<NotFoundPage/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/profil" element={<ProfilPage />} /> */}
        <Route path="/profil" element={
          <ProtectedRouteUser>
            <ProfilPage />
          </ProtectedRouteUser>} />
        <Route path="/profil/edit/:id" element={
          <ProtectedRouteUser>
            <EditProfilPAge />
          </ProtectedRouteUser>} />
        {/* <Route path="/admin" element={<AdminPage />} /> */}
        <Route path="/admin" element={
          <ProtectedRouteAdmin>
            <AdminPage />
          </ProtectedRouteAdmin>} />
        <Route path="/admin/contact/:id" element={
          <ProtectedRouteAdmin>
            <SeeContact />
          </ProtectedRouteAdmin>} />  
        <Route path="/admin/stats" element={
          <ProtectedRouteAdmin>
            <StatsPage />
          </ProtectedRouteAdmin>} />
        <Route path="/admin/create/user" element={
          <ProtectedRouteAdmin>
            <CreateUser />
          </ProtectedRouteAdmin>} />
        <Route path="/admin/edit/user/:id" element={
          <ProtectedRouteAdmin>
            <EditUser />
          </ProtectedRouteAdmin>} />
        <Route path="/admin/create/media" element={
          <ProtectedRouteAdmin>
            <CreateMedia />
          </ProtectedRouteAdmin>} />
        <Route path="/admin/edit/media/:id" element={
          <ProtectedRouteAdmin>
            <EditMedia />
          </ProtectedRouteAdmin>} />
        <Route path="/media/:id" element={<OneMediaPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
