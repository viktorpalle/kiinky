import { useNavigate } from 'react-router-dom';
import { conversations, extraConversations } from '../data/mockData';

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  );
}

function ConversationItem({ conv, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-white/5 transition-colors"
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <img
          src={conv.contactAvatar}
          alt={conv.contactPseudo}
          className="w-12 h-12 rounded-full object-cover"
        />
        {/* Pastille en ligne */}
        <span
          className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
          style={{ backgroundColor: '#44DD88', borderColor: '#0D0D1A' }}
        />
      </div>

      {/* Texte */}
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between mb-0.5">
          <span
            className="font-semibold text-sm truncate"
            style={{ color: '#9D4EDD', fontFamily: "'DM Sans', sans-serif" }}
          >
            {conv.contactPseudo}
          </span>
          <span className="text-[11px] flex-shrink-0 ml-2" style={{ color: '#8888AA' }}>
            {conv.date}
          </span>
        </div>
        <p className="text-[13px] truncate" style={{ color: '#8888AA' }}>
          {conv.lastMessage}
        </p>
      </div>

      {/* Badge non lus */}
      {conv.unreadCount > 0 && (
        <span
          className="flex-shrink-0 min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center text-[11px] font-bold text-white leading-none"
          style={{ backgroundColor: '#FF3366' }}
        >
          {conv.unreadCount}
        </span>
      )}
    </button>
  );
}

export default function MessagesPage() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col"
      style={{ backgroundColor: '#0D0D1A', height: '100dvh', paddingTop: 'env(safe-area-inset-top)' }}
    >

      {/* Header */}
      <div
        className="flex items-center px-4 pt-1 pb-3 relative"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <button
          onClick={() => navigate(-1)}
          className="p-1 active:opacity-60 mr-2"
        >
          <BackIcon />
        </button>
        <h1
          className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-white"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          Message
        </h1>
      </div>

      {/* Liste */}
      <div className="flex-1 overflow-y-auto scrollbar-hide divide-y divide-white/[0.04]">
        {conversations.map((conv) => (
          <ConversationItem
            key={conv.id}
            conv={conv}
            onClick={() => navigate(`/chat/${conv.id}`)}
          />
        ))}
        {extraConversations.map((conv) => (
          <ConversationItem
            key={conv.id}
            conv={conv}
            onClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
