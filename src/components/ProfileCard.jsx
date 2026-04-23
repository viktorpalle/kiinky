import { useState } from 'react';

function PinIcon() {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="#8888AA">
      <path d="M5 0C2.79 0 1 1.79 1 4c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4Zm0 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/>
    </svg>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg width="18" height="16" viewBox="0 0 18 16" fill={filled ? '#FF3366' : 'none'} stroke={filled ? '#FF3366' : 'white'} strokeWidth="1.5">
      <path d="M9 14.5S1 9.5 1 4.5A4 4 0 0 1 9 2.527 4 4 0 0 1 17 4.5C17 9.5 9 14.5 9 14.5Z"/>
    </svg>
  );
}

const AGE_BADGE_COLORS = [
  { bg: 'rgba(123, 47, 190, 0.85)', text: '#fff' },
  { bg: 'rgba(255, 51, 102, 0.85)', text: '#fff' },
  { bg: 'rgba(68, 221, 136, 0.85)', text: '#FFF0F5' },
  { bg: 'rgba(157, 78, 221, 0.85)', text: '#fff' },
];

export default function ProfileCard({ profile }) {
  const [liked, setLiked] = useState(false);
  const badgeColor = AGE_BADGE_COLORS[profile.id % AGE_BADGE_COLORS.length];

  return (
    <div
      className="relative rounded-card overflow-hidden cursor-pointer active:scale-95 transition-transform duration-150"
      style={{
        backgroundColor: '#FAE0EA',
        boxShadow: '0 2px 16px rgba(30, 10, 60, 0.4)',
        aspectRatio: '3/4',
      }}
      onClick={() => {}}
    >
      {/* Photo */}
      <img
        src={profile.photo}
        alt={profile.pseudo}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Gradient overlay bas */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: '55%',
          background: 'linear-gradient(to top, rgba(13,13,26,0.97) 0%, rgba(13,13,26,0.6) 55%, transparent 100%)',
        }}
      />

      {/* Badge âge — coin supérieur droit */}
      <div
        className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[11px] font-bold"
        style={{ backgroundColor: badgeColor.bg, color: badgeColor.text }}
      >
        {profile.age}
      </div>

      {/* Contenu bas */}
      <div className="absolute bottom-0 inset-x-0 px-2.5 pb-2.5 pt-1">
        {/* Pseudo */}
        <p
          className="text-[#2D1040] font-semibold text-sm leading-tight truncate"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {profile.pseudo}
        </p>

        {/* Localisation */}
        <div className="flex items-center gap-1 mt-0.5">
          <PinIcon />
          <span className="text-text-sec text-[10px] truncate leading-tight">
            {profile.city}, {profile.region}
          </span>
        </div>

        {/* Distance + cœur */}
        <div className="flex items-center justify-between mt-1.5">
          <span
            className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
            style={{ backgroundColor: 'rgba(68, 221, 136, 0.15)', color: '#44DD88' }}
          >
            {profile.distance}
          </span>

          <button
            onClick={(e) => { e.stopPropagation(); setLiked((v) => !v); }}
            className="p-1 rounded-full active:scale-110 transition-transform"
            style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          >
            <HeartIcon filled={liked} />
          </button>
        </div>
      </div>
    </div>
  );
}
