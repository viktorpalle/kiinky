import { useState } from 'react';
import BottomNav from '../components/BottomNav';
import { moments } from '../data/mockData';

function CommentIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? '#FF3366' : 'none'} stroke={filled ? '#FF3366' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
      <line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" strokeWidth="0">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </svg>
  );
}

function MomentPost({ post }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [reported, setReported] = useState(false);

  const toggleLike = () => {
    setLiked((v) => {
      setLikeCount((c) => (v ? c - 1 : c + 1));
      return !v;
    });
  };

  return (
    <div
      className="mx-4 rounded-card p-4"
      style={{ backgroundColor: '#1A1A2E' }}
    >
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-3">
        <div className="relative flex-shrink-0">
          <img
            src={post.avatar}
            alt={post.pseudo}
            className="w-10 h-10 rounded-full object-cover"
          />
          {/* Bordure gradient fine */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, #FF3366, #7B2FBE)',
              mask: 'radial-gradient(circle at center, transparent 17px, black 18px)',
              WebkitMask: 'radial-gradient(circle at center, transparent 17px, black 18px)',
            }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <p
            className="text-white font-semibold text-sm leading-tight truncate"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {post.pseudo}
          </p>
          <p className="text-[11px]" style={{ color: '#8888AA' }}>{post.timeAgo}</p>
        </div>
      </div>

      {/* Texte du post */}
      <p
        className="text-white text-sm leading-relaxed mb-4"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {post.text}
      </p>

      {/* Barre d'interactions */}
      <div
        className="flex items-center gap-5 pt-3"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Commentaires */}
        <button className="flex items-center gap-1.5 active:opacity-60 transition-opacity" style={{ color: '#8888AA' }}>
          <CommentIcon />
          {post.comments > 0 && (
            <span className="text-xs font-medium">{post.comments}</span>
          )}
        </button>

        {/* Like */}
        <button
          onClick={toggleLike}
          className="flex items-center gap-1.5 active:scale-110 transition-transform"
          style={{ color: liked ? '#FF3366' : '#8888AA' }}
        >
          <HeartIcon filled={liked} />
          {likeCount > 0 && (
            <span className="text-xs font-medium">{likeCount}</span>
          )}
        </button>

        {/* Signalement — poussé à droite */}
        <button
          onClick={() => setReported(true)}
          className="ml-auto flex items-center gap-1 active:opacity-60 transition-opacity"
          style={{ color: reported ? '#FF3366' : '#8888AA' }}
        >
          <FlagIcon />
          {reported && <span className="text-[10px]">Signalé</span>}
        </button>
      </div>
    </div>
  );
}

export default function MomentsPage() {
  return (
    <div
      className="flex flex-col"
      style={{ backgroundColor: '#0D0D1A', height: '100dvh', paddingTop: 'env(safe-area-inset-top)' }}
    >

      {/* Header */}
      <div
        className="flex items-center justify-between px-4 pt-1 pb-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <h1
          className="text-lg font-bold text-white"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          Moments
        </h1>

        {/* Bouton + */}
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform"
          style={{
            background: 'linear-gradient(135deg, #9D4EDD, #7B2FBE)',
            boxShadow: '0 2px 12px rgba(123, 47, 190, 0.5)',
          }}
        >
          <PlusIcon />
        </button>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto scrollbar-hide py-4 flex flex-col gap-3">
        {moments.map((post) => (
          <MomentPost key={post.id} post={post} />
        ))}
        <div className="h-2" />
      </div>

      <BottomNav />
    </div>
  );
}
