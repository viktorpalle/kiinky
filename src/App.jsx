import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';

const HomePage     = lazy(() => import('./pages/HomePage'));
const ProfilePage  = lazy(() => import('./pages/ProfilePage'));
const MessagesPage = lazy(() => import('./pages/MessagesPage'));
const ChatPage     = lazy(() => import('./pages/ChatPage'));
const MomentsPage  = lazy(() => import('./pages/MomentsPage'));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    // La clé sur ce div déclenche le remount + l'animation CSS à chaque changement de route
    <div key={location.pathname} className="page-enter">
      <Routes location={location}>
        <Route path="/"         element={<SplashScreen />} />
        <Route path="/home"     element={<HomePage />} />
        <Route path="/profile"  element={<ProfilePage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/moments"  element={<MomentsPage />} />
        <Route path="*"         element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ flex: 1, backgroundColor: '#FFF0F5' }} />}>
        <AnimatedRoutes />
      </Suspense>
    </BrowserRouter>
  );
}
