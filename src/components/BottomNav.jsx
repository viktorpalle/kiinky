import { useNavigate, useLocation } from 'react-router-dom';

function HomeIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? '#9D4EDD' : '#8888AA'}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  );
}

function KinksIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#9D4EDD' : '#8888AA'} strokeWidth="2" strokeLinecap="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  );
}

function MomentsIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? '#9D4EDD' : '#8888AA'}>
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/>
    </svg>
  );
}

function GroupsIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? '#9D4EDD' : '#8888AA'}>
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>
  );
}

function ProfileIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? '#9D4EDD' : '#8888AA'}>
      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
    </svg>
  );
}

const tabs = [
  { label: 'Rencontre', path: '/home', Icon: HomeIcon },
  { label: 'Kinks', path: null, Icon: KinksIcon },
  { label: 'Moments', path: '/moments', Icon: MomentsIcon },
  { label: 'Groupes', path: null, Icon: GroupsIcon },
  { label: 'Moi', path: '/profile', Icon: ProfileIcon, badge: 11 },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav
      className="flex items-center justify-around px-2 pt-2 border-t border-white/5 flex-shrink-0"
      style={{
        backgroundColor: '#0D0D1A',
        paddingBottom: 'calc(env(safe-area-inset-bottom) + 8px)',
      }}
    >
      {tabs.map(({ label, path, Icon, badge }) => {
        const active = path && location.pathname === path;
        return (
          <button
            key={label}
            onClick={() => path && navigate(path)}
            className="flex flex-col items-center gap-0.5 min-w-[48px] relative"
          >
            <div className="relative">
              <Icon active={active} />
              {badge && (
                <span className="absolute -top-1.5 -right-1.5 bg-badge text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                  {badge}
                </span>
              )}
            </div>
            <span
              className="text-[10px] font-medium"
              style={{ color: active ? '#9D4EDD' : '#8888AA' }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
