import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import ProfileCard from '../components/ProfileCard';
import { profiles } from '../data/mockData';

function EyeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8888AA" strokeWidth="1.8" strokeLinecap="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

const TABS = ['Récents', 'À proximité'];

export default function HomePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1); // "À proximité" actif par défaut

  return (
    <div
      className="flex flex-col"
      style={{ backgroundColor: '#0D0D1A', height: '100dvh', paddingTop: 'env(safe-area-inset-top)' }}
    >

      {/* Header */}
      <div
        className="flex items-center justify-between px-4 pt-1 pb-0"
        style={{ backgroundColor: '#0D0D1A' }}
      >
        {/* Onglets */}
        <div className="flex items-end gap-5">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className="pb-2 relative text-sm font-semibold transition-colors"
              style={{
                color: activeTab === i ? '#ffffff' : '#8888AA',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {tab}
              {activeTab === i && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ backgroundColor: '#9D4EDD' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Icône messages */}
        <button
          onClick={() => navigate('/messages')}
          className="p-1 active:opacity-60"
        >
          <EyeIcon />
        </button>
      </div>

      {/* Séparateur */}
      <div className="h-px mx-4" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />

      {/* Grille scrollable */}
      <div
        className="flex-1 overflow-y-auto scrollbar-hide px-3 pt-3 pb-2"
      >
        <div className="grid grid-cols-2 gap-3">
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>

        {/* Padding bas pour ne pas être caché par la nav */}
        <div className="h-4" />
      </div>

      <BottomNav />
    </div>
  );
}
