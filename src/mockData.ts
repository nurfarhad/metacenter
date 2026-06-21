import { Thread, Account } from './types';

export const MOCK_ACCOUNTS: Account[] = [
  {
    id: 'acc1',
    name: 'Agency FB Page',
    platform: 'facebook',
    handle: '@metaagency',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MA&backgroundColor=0369a1',
  },
  {
    id: 'acc2',
    name: 'Client A FB',
    platform: 'facebook',
    handle: '@clienta',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=CA&backgroundColor=b91c1c',
  },
  {
    id: 'acc3',
    name: 'Agency IG',
    platform: 'instagram',
    handle: '@metaagency_ig',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=IG&backgroundColor=c026d3',
  },
  {
    id: 'acc4',
    name: 'Client B IG',
    platform: 'instagram',
    handle: '@clientb_brand',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=CB&backgroundColor=15803d',
  },
];

export const MOCK_THREADS: Thread[] = [
  {
    id: 't1',
    user: {
      id: 'u1',
      name: 'Alex Rivera',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    },
    platform: 'facebook',
    type: 'dm',
    snippet: 'Hey, I wanted to ask about the pricing for your silver package.',
    timestamp: '2m ago',
    unread: true,
    messages: [
      {
        id: 'm1',
        senderId: 'u1',
        text: 'Hey, I wanted to ask about the pricing for your silver package.',
        timestamp: '10:45 AM',
      },
      {
        id: 'm2',
        senderId: 'me',
        text: 'Hello Alex! Our silver package starts at $499/mo. Would you like a detailed brochure?',
        timestamp: '10:47 AM',
        isMe: true,
      },
      {
        id: 'm3',
        senderId: 'u1',
        text: 'Yes please! Also, does it include SEO audits?',
        timestamp: '10:50 AM',
      }
    ],
    targetPage: 'Agency FB Page',
  },
  {
    id: 't2',
    user: {
      id: 'u2',
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    platform: 'instagram',
    type: 'comment',
    snippet: 'This new branding looks incredible! Love the color palette. 😍',
    timestamp: '15m ago',
    unread: false,
    messages: [
      {
        id: 'm4',
        senderId: 'u2',
        text: 'This new branding looks incredible! Love the color palette. 😍',
        timestamp: '10:30 AM',
      }
    ],
    targetPage: 'Agency IG',
    originalPostUrl: 'https://instagram.com/p/C123456789',
  },
  {
    id: 't3',
    user: {
      id: 'u3',
      name: 'Marcus Bell',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    },
    platform: 'facebook',
    type: 'comment',
    snippet: 'Is this event open for non-residents as well?',
    timestamp: '1h ago',
    unread: true,
    messages: [
      {
        id: 'm5',
        senderId: 'u3',
        text: 'Is this event open for non-residents as well?',
        timestamp: '09:15 AM',
      }
    ],
    targetPage: 'Client A FB',
    originalPostUrl: 'https://facebook.com/posts/987654321',
  },
  {
    id: 't4',
    user: {
      id: 'u4',
      name: 'Elena Rodriguez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    },
    platform: 'instagram',
    type: 'dm',
    snippet: 'Can you check my order status #4592?',
    timestamp: '3h ago',
    unread: false,
    messages: [
      {
        id: 'm6',
        senderId: 'u4',
        text: 'Can you check my order status #4592?',
        timestamp: '07:20 AM',
      },
      {
        id: 'm7',
        senderId: 'me',
        text: 'Checking that for you right now, Elena!',
        timestamp: '07:25 AM',
        isMe: true,
      }
    ],
    targetPage: 'Client B IG',
  }
];
