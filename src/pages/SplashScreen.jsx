import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SplashScreen() {
  const navigate = useNavigate();
  const [logoVisible, setLogoVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [leaving,     setLeaving]     = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLogoVisible(true), 80);
    const t2 = setTimeout(() => setTextVisible(true), 480);
    // Début du fade-out 200ms avant la navigation
    const t3 = setTimeout(() => setLeaving(true), 1950);
    const t4 = setTimeout(() => navigate('/home', { replace: true }), 2150);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [navigate]);

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        backgroundColor: '#0D0D1A',
        height: '100dvh',
        opacity: leaving ? 0 : 1,
        transition: 'opacity 0.2s ease',
      }}
    >
      {/* Logo lèvres */}
      <div
        style={{
          opacity: logoVisible ? 1 : 0,
          transform: logoVisible ? 'scale(1)' : 'scale(0.25)',
          transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <div
          className="w-28 h-28 rounded-3xl overflow-hidden"
          style={{ boxShadow: '0 0 48px rgba(123, 47, 190, 0.55)' }}
        >
          <img src="/logo.svg" alt="Kiinky" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Texte Kiinky */}
      <div
        className="mt-6"
        style={{
          opacity: textVisible ? 1 : 0,
          transform: textVisible ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 0.45s ease, transform 0.45s ease',
        }}
      >
        <h1
          className="text-4xl font-bold tracking-wide"
          style={{
            fontFamily: "'Quicksand', sans-serif",
            background: 'linear-gradient(135deg, #FF3366, #9D4EDD)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Kiinky
        </h1>
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: textVisible ? 1 : 0,
          transition: 'opacity 0.45s ease 0.1s',
        }}
      >
        <p className="mt-1.5 text-sm" style={{ color: '#8888AA' }}>
          Trouve ta connexion
        </p>
      </div>
    </div>
  );
}
