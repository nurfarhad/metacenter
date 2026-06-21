export type Platform = 'facebook' | 'instagram';

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  attachments?: string[];
  isMe?: boolean;
}

export interface Thread {
  id: string;
  user: User;
  platform: Platform;
  type: 'dm' | 'comment';
  snippet: string;
  timestamp: string;
  unread: boolean;
  messages: Message[];
  targetPage?: string;
  originalPostUrl?: string;
}

export interface Account {
  id: string;
  name: string;
  platform: Platform;
  handle: string;
  avatar: string;
}

export type View = 'dashboard' | 'inbox' | 'publishing' | 'accounts' | 'settings';
