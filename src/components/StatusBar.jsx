import { useState, useEffect } from 'react';

function BatteryIcon() {
  return (
    <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
      <rect x="0.5" y="0.5" width="18" height="11" rx="2.5" stroke="white" strokeOpacity="0.9" strokeWidth="1"/>
      <rect x="2" y="2" width="13" height="8" rx="1.5" fill="white"/>
      <path d="M19.5 4.5V7.5C20.3284 7.5 21 6.82843 21 6C21 5.17157 20.3284 4.5 19.5 4.5Z" fill="white" fillOpacity="0.7"/>
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
      <path d="M8 9.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"/>
      <path d="M8 6.5C9.66 6.5 11.17 7.14 12.3 8.19L13.71 6.78A7.47 7.47 0 0 0 8 4.5a7.47 7.47 0 0 0-5.71 2.28l1.41 1.41A5.48 5.48 0 0 1 8 6.5Z" opacity="0.7"/>
      <path d="M8 3.5c2.76 0 5.26 1.12 7.07 2.93l1.41-1.41A11.96 11.96 0 0 0 8 1.5C4.69 1.5 1.69 2.81-.48 4.97l1.41 1.41A9.96 9.96 0 0 1 8 3.5Z" opacity="0.4"/>
    </svg>
  );
}

function SignalIcon() {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="white">
      <rect x="0" y="8" width="2.5" height="4" rx="1"/>
      <rect x="3.5" y="5.5" width="2.5" height="6.5" rx="1"/>
      <rect x="7" y="3" width="2.5" height="9" rx="1"/>
      <rect x="10.5" y="0" width="2.5" height="12" rx="1"/>
    </svg>
  );
}

export default function StatusBar({ transparent = false }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const interval = setInterval(update, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex items-center justify-between px-4 pb-1 z-50 flex-shrink-0"
      style={{
        paddingTop: 'calc(env(safe-area-inset-top) + 4px)',
      }}
    >
      <span className="text-[#2D1040] text-xs font-semibold font-display tracking-wide">
        {time}
      </span>
      <div className="flex items-center gap-1.5">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  );
}
