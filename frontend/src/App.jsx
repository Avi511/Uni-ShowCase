import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import StudentsDashbourd from './pages/StudentsDashbourd';
import ProjectDetail from './pages/ProjectDetail';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/recruiter" 
          element={
            <ProtectedRoute allowedRoles={['Recruiter']}>
              <RecruiterDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/studentsdashbourd" 
          element={
            <ProtectedRoute allowedRoles={['Student']}>
              <StudentsDashbourd />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
