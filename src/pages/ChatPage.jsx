import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { conversations, messages as mockMessages, chatScripts } from '../data/mockData';

function BackIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  );
}

function AttachIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8888AA" strokeWidth="1.8" strokeLinecap="round">
      <rect x="3" y="3" width="18" height="18" rx="3"/>
      <circle cx="8.5" cy="8.5" r="1.5" fill="#8888AA"/>
      <path d="M21 15l-5-5L5 21"/>
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/>
    </svg>
  );
}

function PhotoBubble({ isMe, explicit, imageUrl }) {
  const radius = isMe ? '14px 14px 4px 14px' : '14px 14px 14px 4px';

  // Vraie photo prise par l'acteur
  if (imageUrl) {
    return (
      <div style={{ borderRadius: radius, overflow: 'hidden', width: '200px' }}>
        <img
          src={imageUrl}
          alt=""
          style={{ width: '100%', display: 'block', maxHeight: '260px', objectFit: 'cover' }}
          draggable={false}
        />
      </div>
    );
  }

  // Placeholder scripté (messages mock du dataset)
  return (
    <div
      className="relative overflow-hidden flex items-center justify-center"
      style={{
        width: '160px',
        height: '200px',
        borderRadius: radius,
        backgroundColor: isMe ? '#5a1f8e' : '#1e1e3a',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: explicit
            ? 'linear-gradient(135deg, #2a1040 0%, #1a0a2e 50%, #0d0d1a 100%)'
            : 'linear-gradient(135deg, #1e1e3a 0%, #252542 100%)',
          filter: 'blur(2px)',
        }}
      />
      <div className="relative flex flex-col items-center gap-2" style={{ zIndex: 1 }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round">
          <rect x="3" y="3" width="18" height="18" rx="3"/>
          <circle cx="8.5" cy="8.5" r="1.5" fill="rgba(255,255,255,0.5)" stroke="none"/>
          <path d="M21 15l-5-5L5 21"/>
        </svg>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>Photo</span>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start mb-2">
      <div
        className="px-4 py-3"
        style={{ backgroundColor: '#252542', borderRadius: '18px 18px 18px 4px' }}
      >
        <div className="flex gap-1 items-center" style={{ height: '14px' }}>
          <span className="typing-dot" />
          <span className="typing-dot" style={{ animationDelay: '0.18s' }} />
          <span className="typing-dot" style={{ animationDelay: '0.36s' }} />
        </div>
      </div>
    </div>
  );
}

function TimeSeparator({ text }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
      <span className="text-[11px] px-2" style={{ color: '#8888AA' }}>{text}</span>
      <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
    </div>
  );
}

function Bubble({ msg }) {
  if (msg.type === 'separator') return <TimeSeparator text={msg.text} />;

  const isMe = msg.sender === 'me';
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className="max-w-[75%]">
        {msg.type === 'photo' ? (
          <PhotoBubble isMe={isMe} explicit={msg.explicit} imageUrl={msg.imageUrl} />
        ) : (
          <div
            className="px-3.5 py-2.5 text-sm text-white leading-snug"
            style={{
              backgroundColor: isMe ? '#7B2FBE' : '#252542',
              borderRadius: isMe
                ? '18px 18px 4px 18px'
                : '18px 18px 18px 4px',
              wordBreak: 'break-word',
            }}
          >
            {msg.text}
          </div>
        )}
        <p
          className={`text-[10px] mt-1 ${isMe ? 'text-right' : 'text-left'}`}
          style={{ color: '#8888AA' }}
        >
          {msg.timestamp}
        </p>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const convId = parseInt(id, 10);

  const conv = conversations.find((c) => c.id === convId);
  const script = chatScripts[convId];
  const initial = script ? script.initial : (mockMessages[convId] ?? []);

  const [msgs, setMsgs] = useState(initial);
  const [draft, setDraft] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const responseIndexRef = useRef(0);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, isTyping]);

  // Envoie une liste de messages scripté un par un, chacun précédé de son typing indicator
  const deliverBatch = (batch, index = 0) => {
    if (index >= batch.length) return;
    // petite pause avant de commencer à "écrire" (sauf premier qui attend déjà)
    const pause = index === 0 ? 0 : 600;
    setTimeout(() => {
      setIsTyping(true);
      const typingDelay = 1600 + Math.random() * 1000;
      setTimeout(() => {
        setIsTyping(false);
        const ts = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        setMsgs((prev) => [
          ...prev,
          { ...batch[index], id: Date.now() + index, timestamp: ts },
        ]);
        deliverBatch(batch, index + 1);
      }, typingDelay);
    }, pause);
  };

  const triggerScript = () => {
    if (!script) return;
    const { responses } = script;
    const idx = responseIndexRef.current;
    if (idx < responses.length) {
      responseIndexRef.current += 1;
      setTimeout(() => deliverBatch(responses[idx]), 800);
    }
  };

  const sendPhoto = (file) => {
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    const ts = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    setMsgs((prev) => [...prev, { id: Date.now(), sender: 'me', type: 'photo', imageUrl, timestamp: ts }]);
    triggerScript();
  };

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const now = new Date();
    const timestamp = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    setMsgs((prev) => [...prev, { id: Date.now(), sender: 'me', text, timestamp }]);
    setDraft('');
    inputRef.current?.blur();

    triggerScript();
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  if (!conv) {
    navigate('/messages', { replace: true });
    return null;
  }

  return (
    <div
      className="flex flex-col"
      style={{ backgroundColor: '#0D0D1A', height: '100dvh' }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 pb-3 flex-shrink-0"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 8px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <button onClick={() => navigate('/messages')} className="p-1 active:opacity-60">
          <BackIcon />
        </button>

        <img
          src={conv.contactAvatar}
          alt={conv.contactPseudo}
          className="w-9 h-9 rounded-full object-cover"
        />

        <div className="flex-1 min-w-0">
          <p
            className="font-semibold text-white text-sm leading-tight truncate"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {conv.contactPseudo}
          </p>
          <p className="text-[11px]" style={{ color: isTyping ? '#8888AA' : '#44DD88' }}>
            {isTyping ? 'En train d\'écrire…' : 'En ligne'}
          </p>
        </div>

        {/* Menu trois points */}
        <button className="p-1 active:opacity-60">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#8888AA">
            <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
          </svg>
        </button>
      </div>

      {/* Zone messages */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pt-4">
        {msgs.map((msg) => (
          <Bubble key={msg.id} msg={msg} />
        ))}

        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Barre de saisie */}
      <div
        className="flex-shrink-0 px-3 pt-3 flex items-end gap-2"
        style={{
          backgroundColor: '#0D0D1A',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {/* Input caméra caché */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="user"
          style={{ display: 'none' }}
          onChange={(e) => {
            sendPhoto(e.target.files?.[0]);
            e.target.value = '';
          }}
        />

        {/* Bouton photo */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0 active:opacity-60 transition-opacity"
          style={{ backgroundColor: '#1A1A2E' }}
        >
          <AttachIcon />
        </button>

        {/* Input */}
        <div
          className="flex-1 flex items-center px-4 py-2.5 rounded-full"
          style={{ backgroundColor: '#252542', minHeight: '44px' }}
        >
          <textarea
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Message..."
            rows={1}
            className="w-full bg-transparent text-white text-sm placeholder-[#8888AA] resize-none outline-none leading-snug"
            style={{ maxHeight: '100px', fontFamily: "'DM Sans', sans-serif" }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          />
        </div>

        {/* Bouton envoyer */}
        <button
          onClick={send}
          className="w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0 active:scale-90 transition-transform"
          style={{
            backgroundColor: draft.trim() ? '#7B2FBE' : '#252542',
            transition: 'background-color 0.15s ease, transform 0.1s ease',
          }}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}
