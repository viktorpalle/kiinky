import BottomNav from '../components/BottomNav';
import { myProfile } from '../data/mockData';

/* ── Icônes ─────────────────────────────────────────────── */
function CameraIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M12 15.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4Z"/>
      <path d="M9 3 7.17 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.17L15 3H9Zm3 14a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"/>
    </svg>
  );
}

function PinOffIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8888AA" strokeWidth="2" strokeLinecap="round">
      <line x1="1" y1="1" x2="23" y2="23"/>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    </svg>
  );
}

function CrownIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M2 19h20v2H2zM2 6l5 7 5-7 5 7 5-7v11H2V6z"/>
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
      <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/>
    </svg>
  );
}

function HeelIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
      <path d="M21 17c0 2.2-1.8 4-4 4H6l-3-6s4-1 6-4l3 4 3-6c1.5 0 6 1.2 6 8Z"/>
      <circle cx="8" cy="19" r="1.5" fill="white"/>
      <circle cx="14" cy="19" r="1.5" fill="white"/>
    </svg>
  );
}

function HeartsIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
      <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8888AA" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/>
    </svg>
  );
}

/* ── Bouton profil ───────────────────────────────────────── */
const ACTION_BUTTONS = [
  {
    key: 'messages',
    label: 'Chat Msg',
    Icon: ChatIcon,
    color: '#7B2FBE',
    shadow: 'rgba(123, 47, 190, 0.45)',
  },
  {
    key: 'visitors',
    label: 'VISITEURS',
    Icon: HeelIcon,
    color: '#FF3366',
    shadow: 'rgba(255, 51, 102, 0.45)',
  },
  {
    key: 'liked',
    label: "M'A LIKE",
    Icon: HeartsIcon,
    color: '#E8560A',
    shadow: 'rgba(232, 86, 10, 0.45)',
  },
  {
    key: null,
    label: "J'AI LIKE",
    Icon: StarIcon,
    color: '#0099CC',
    shadow: 'rgba(0, 153, 204, 0.45)',
  },
];

function ActionButton({ button, badgeCount }) {
  const { label, Icon, color, shadow } = button;
  return (
    <button
      className="flex flex-col items-center gap-2 active:scale-95 transition-transform duration-150"
    >
      <div className="relative">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: color,
            boxShadow: `0 4px 20px ${shadow}`,
          }}
        >
          <Icon />
        </div>
        {badgeCount > 0 && (
          <span
            className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center text-[11px] font-bold text-white leading-none"
            style={{ backgroundColor: '#FF3366' }}
          >
            {badgeCount}
          </span>
        )}
      </div>
      <span
        className="text-xs font-semibold tracking-wide"
        style={{ color: '#FFFFFF', fontFamily: "'DM Sans', sans-serif" }}
      >
        {label}
      </span>
    </button>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function ProfilePage() {
  const { pseudo, age, avatar, locationEnabled, badges } = myProfile;

  return (
    <div
      className="flex flex-col"
      style={{ backgroundColor: '#0D0D1A', height: '100dvh', paddingTop: 'env(safe-area-inset-top)' }}
    >

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-1 pb-3">
        <h1
          className="text-lg font-bold text-white"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          Mon profil
        </h1>
        <button className="p-1 active:opacity-60">
          <SettingsIcon />
        </button>
      </div>

      {/* Contenu scrollable */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">

        {/* Zone avatar */}
        <div className="flex flex-col items-center pt-4 pb-6 px-6">

          {/* Avatar avec bordure gradient animée */}
          <div className="relative w-[120px] h-[120px]">
            {/* Anneau gradient tournant — animate-spin-slow déclenche la keyframe spin */}
            <div
              className="absolute inset-0 rounded-full animate-spin-slow"
              style={{
                background: 'conic-gradient(#FF3366, #7B2FBE, #9D4EDD, #FF3366, #7B2FBE, #FF3366)',
              }}
            />
            {/* Masque sombre pour créer l'effet bordure */}
            <div
              className="absolute rounded-full"
              style={{ inset: '3px', backgroundColor: '#0D0D1A' }}
            />
            {/* Photo */}
            <img
              src={avatar}
              alt={pseudo}
              className="absolute rounded-full object-cover"
              style={{ inset: '5px' }}
              draggable={false}
            />
            {/* Bouton caméra */}
            <button
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center border-2"
              style={{
                backgroundColor: '#7B2FBE',
                borderColor: '#0D0D1A',
              }}
            >
              <CameraIcon />
            </button>
          </div>

          {/* Pseudo + âge */}
          <h2
            className="mt-4 text-xl font-bold text-white tracking-wide"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            {pseudo}
          </h2>
          <p className="text-text-sec text-sm mt-0.5">{age} ans</p>

          {/* Pastille localisation */}
          <div
            className="flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full"
            style={{ backgroundColor: 'rgba(136, 136, 170, 0.12)' }}
          >
            <PinOffIcon />
            <span className="text-xs font-medium" style={{ color: '#8888AA' }}>
              Localisation désactivée
            </span>
          </div>
        </div>

        {/* Bandeau VIP */}
        <div className="mx-4 mb-6">
          <div
            className="rounded-card px-4 py-3.5 flex items-center gap-3"
            style={{
              background: 'linear-gradient(135deg, #FF6B00, #FF3366)',
              boxShadow: '0 4px 20px rgba(255, 107, 0, 0.35)',
            }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              <CrownIcon />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-tight">
                Obtenez VIP pour débloquer tous les potentiels
              </p>
              <p className="text-white/70 text-xs mt-0.5">
                Accès illimité · Profils secrets · Boost
              </p>
            </div>
            <div
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ backgroundColor: 'rgba(255,255,255,0.25)', color: 'white' }}
            >
              Essayer
            </div>
          </div>
        </div>

        {/* Grille 4 boutons 2x2 */}
        <div className="mx-4 mb-6">
          <div
            className="rounded-card p-5"
            style={{ backgroundColor: '#1A1A2E' }}
          >
            <div className="grid grid-cols-2 gap-y-6">
              {ACTION_BUTTONS.map((btn) => (
                <div key={btn.label} className="flex justify-center">
                  <ActionButton
                    button={btn}
                    badgeCount={btn.key ? badges[btn.key] ?? 0 : 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section infos supplémentaires */}
        <div className="mx-4 mb-6">
          <div
            className="rounded-card divide-y divide-white/[0.06]"
            style={{ backgroundColor: '#1A1A2E' }}
          >
            {[
              { label: 'Modifier mon profil', icon: '✏️' },
              { label: 'Mes photos', icon: '🖼️' },
              { label: 'Paramètres de confidentialité', icon: '🔒' },
            ].map(({ label, icon }) => (
              <button
                key={label}
                className="w-full flex items-center justify-between px-4 py-3.5 active:bg-white/5 transition-colors first:rounded-t-card last:rounded-b-card"
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{icon}</span>
                  <span className="text-white text-sm font-medium">{label}</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8888AA" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div className="h-4" />
      </div>

      <BottomNav />
    </div>
  );
}
