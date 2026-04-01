export const profiles = [
  {
    id: 1,
    pseudo: 'yoan49',
    age: 34,
    city: 'Angers',
    region: 'Pays de la Loire',
    country: 'FR',
    distance: '2 km',
    photo: 'https://i.pravatar.cc/400?img=11',
  },
  {
    id: 2,
    pseudo: 'alexmalinat',
    age: 36,
    city: 'Paris',
    region: 'Île-de-France',
    country: 'FR',
    distance: '5 km',
    photo: 'https://i.pravatar.cc/400?img=12',
  },
  {
    id: 3,
    pseudo: 'Leo88',
    age: 44,
    city: 'Paris',
    region: 'Île-de-France',
    country: 'FR',
    distance: '8 km',
    photo: 'https://i.pravatar.cc/400?img=15',
  },
  {
    id: 4,
    pseudo: 'julien12000',
    age: 44,
    city: 'Espalion',
    region: 'Occitanie',
    country: 'FR',
    distance: '320 km',
    photo: 'https://i.pravatar.cc/400?img=17',
  },
  {
    id: 5,
    pseudo: 'darkRaven_75',
    age: 29,
    city: 'Lyon',
    region: 'Auvergne-Rhône-Alpes',
    country: 'FR',
    distance: '462 km',
    photo: 'https://i.pravatar.cc/400?img=25',
  },
  {
    id: 6,
    pseudo: 'sweety_nana',
    age: 27,
    city: 'Bordeaux',
    region: 'Nouvelle-Aquitaine',
    country: 'FR',
    distance: '560 km',
    photo: 'https://i.pravatar.cc/400?img=47',
  },
  {
    id: 7,
    pseudo: 'shadow_knight',
    age: 32,
    city: 'Marseille',
    region: 'Provence-Alpes-Côte d\'Azur',
    country: 'FR',
    distance: '780 km',
    photo: 'https://i.pravatar.cc/400?img=59',
  },
  {
    id: 8,
    pseudo: 'miss_luna33',
    age: 33,
    city: 'Nantes',
    region: 'Pays de la Loire',
    country: 'FR',
    distance: '14 km',
    photo: 'https://i.pravatar.cc/400?img=44',
  },
];

export const conversations = [
  {
    id: 1,
    contactPseudo: 'yoan49',
    contactAvatar: 'https://i.pravatar.cc/100?img=11',
    lastMessage: '… chérie ?',
    date: '2026/03/13',
    unreadCount: 3,
  },
  {
    id: 2,
    contactPseudo: 'Mouad',
    contactAvatar: 'https://i.pravatar.cc/100?img=33',
    lastMessage: 'Hi',
    date: '2026/03/13',
    unreadCount: 1,
  },
  {
    id: 3,
    contactPseudo: 'alexmalinat',
    contactAvatar: 'https://i.pravatar.cc/100?img=12',
    lastMessage: 'pq tu peux pas ?',
    date: '2026/03/12',
    unreadCount: 1,
  },
  {
    id: 4,
    contactPseudo: 'darkRaven_75',
    contactAvatar: 'https://i.pravatar.cc/100?img=25',
    lastMessage: "Jai besoin que tu m'aide pour finir…",
    date: '2026/03/11',
    unreadCount: 2,
  },
  {
    id: 5,
    contactPseudo: 'shadow_knight',
    contactAvatar: 'https://i.pravatar.cc/100?img=59',
    lastMessage: 'ok si tu veux on peut jouer…',
    date: '2026/03/10',
    unreadCount: 2,
  },
];

// Conversations statiques (sans script)
export const messages = {
  2: [
    { id: 1, sender: 'them', text: 'Hi', timestamp: '14:22' },
    { id: 2, sender: 'me', text: 'Salut !', timestamp: '14:35' },
    { id: 3, sender: 'them', text: 'Tu fais quoi là ?', timestamp: '14:36' },
    { id: 4, sender: 'me', text: 'Pas grand chose, je traîne', timestamp: '14:38' },
    { id: 5, sender: 'them', text: 'Ah cool, on pourrait se voir ?', timestamp: '14:40' },
  ],
};

/**
 * Scripts de tournage.
 * initial : messages X déjà affichés à l'ouverture du chat.
 * responses : tableau de "lots" — chaque lot est déclenché quand l'acteur envoie un message.
 *   Quand un lot contient plusieurs messages, ils arrivent les uns après les autres
 *   avec chacun leur propre indicateur de frappe.
 */
export const chatScripts = {
  // ── Conversation 1 (yoan49) ──────────────────────────────
  // Script : X:Tu te touche? → L:Oui → X:Mmmh photo? → ...
  1: {
    initial: [
      { id: 's1_1', sender: 'them', text: 'Tu te touche ?', timestamp: '21:14' },
    ],
    responses: [
      // après L: "Oui"
      [{ sender: 'them', text: "Mmmh… tit' photo ?" }],
      // après L: [envoie photo]  →  X enchaîne deux messages
      [
        { sender: 'them', text: 'Miam…' },
        { sender: 'them', text: 'Tu te touche avec tes doigts?' },
      ],
      // après L: "Non"
      [{ sender: 'them', text: 'Avec quoi ma chérie ?' }],
      // après L: [envoie photo manche à balais]  →  X enchaîne 4 messages
      [
        { sender: 'them', text: "Ah ouais t'es vraiment une petite souillon toi…" },
        { sender: 'them', text: 'tu continues ?' },
        { sender: 'them', text: "t'en es où ?" },
        { sender: 'them', text: '… chérie ?' },
      ],
    ],
  },

  // ── Conversation 3 (alexmalinat) ────────────────────────
  // Script : L:tfq? → X:Jme branle… → L:pareil → X:photo? → L:Je peux pas → X:pq?
  3: {
    initial: [],
    responses: [
      // après L: "tfq ?"
      [{ sender: 'them', text: 'Jme branle en pensant à toi… Et toi tfq?' }],
      // après L: "pareil"
      [{ sender: 'them', text: 'mmmh.. photo ?' }],
      // après L: "Je peux pas là"
      [{ sender: 'them', text: 'pq tu peux pas ?' }],
    ],
  },

  // ── Conversation 4 (darkRaven_75) ───────────────────────
  // Script : X envoie d'abord, L répond
  4: {
    initial: [
      { id: 's4_1', sender: 'them', text: 'Dispo ??', timestamp: '19:44' },
      { id: 's4_2', sender: 'them', text: "Jai besoin que tu m'aide pour finir…", timestamp: '19:45' },
    ],
    responses: [
      [{ sender: 'them', text: "T'es là ?" }],
      [{ sender: 'them', text: "j'attends…" }],
      [{ sender: 'them', text: 'stp réponds moi' }],
    ],
  },

  // ── Conversation 5 (shadow_knight) ──────────────────────
  // Script : X envoie plusieurs messages dont une photo
  5: {
    initial: [
      { id: 's5_1', sender: 'them', text: 'Dispo ??', timestamp: '20:11' },
      { id: 's5_2', sender: 'them', text: "Jai besoin que tu m'aide pour finir…", timestamp: '20:12' },
      { id: 's5_3', sender: 'them', text: 'ok si tu veux on peut jouer…', timestamp: '20:13' },
      { id: 's5_4', sender: 'them', type: 'photo', explicit: true, timestamp: '20:14' },
    ],
    responses: [
      [{ sender: 'them', text: "C'est bien… continue" }],
      [{ sender: 'them', text: 'encore photo stp' }],
      [{ sender: 'them', text: 'mmmmh' }],
    ],
  },
};

export const moments = [
  {
    id: 1,
    pseudo: 'OBAID',
    avatar: 'https://i.pravatar.cc/100?img=53',
    timeAgo: 'il y a 5h',
    text: 'Any slave',
    comments: 1,
    likes: 1,
  },
  {
    id: 2,
    pseudo: 'jewelb1',
    avatar: 'https://i.pravatar.cc/100?img=49',
    timeAgo: 'il y a 5h',
    text: "Who's married and need a plus 1",
    comments: 0,
    likes: 1,
  },
  {
    id: 3,
    pseudo: 'smartfella',
    avatar: 'https://i.pravatar.cc/100?img=57',
    timeAgo: 'il y a 6h',
    text: 'Any girls into burps/farts?',
    comments: 4,
    likes: 4,
  },
  {
    id: 4,
    pseudo: 'Cheese96',
    avatar: 'https://i.pravatar.cc/100?img=61',
    timeAgo: 'il y a 7h',
    text: 'Hi im looking for someone to dominate me and be my master…',
    comments: 4,
    likes: 4,
  },
];

export const myProfile = {
  pseudo: 'XLouloucherry9',
  age: 28,
  avatar: 'https://i.pravatar.cc/400?img=44',
  locationEnabled: false,
  badges: {
    messages: 11,
    visitors: 3,
    liked: 7,
  },
};
