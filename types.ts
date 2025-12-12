import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
}

export interface Chapter {
  id: number;
  title: string;
  summary: string;
  takeaways: string[];
}

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Resource {
  title: string;
  description: string;
  type: 'PDF' | 'Template' | 'Audio';
  downloadUrl: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
}

// --- Auth & AI Types ---

export type SubscriptionTier = 'free' | 'standard' | 'premium';

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  timestamp: number;
  attachment?: {
    name: string;
    type: 'image' | 'video';
  };
}

export interface ChatSession {
  id: string;
  title: string;
  date: string;
  preview: string;
  messages: ChatMessage[];
}

export interface PaymentMethod {
  brand: 'Visa' | 'Mastercard';
  last4: string;
  expiry: string;
}

export interface User {
  email: string;
  name: string;
  dob?: string;
  profilePicture?: string;
  subscriptionTier: SubscriptionTier;
  nextBillingDate?: string; // ISO Date string
  paymentMethod?: PaymentMethod | null;
  chatHistory: ChatSession[];
  freeUsageCount: number;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: 'USER_NOT_FOUND' | 'WRONG_PASSWORD' }>;
  signup: (email: string, name: string, password: string) => void;
  logout: () => void;
  updateSubscription: (tier: SubscriptionTier) => void;
  incrementFreeUsage: () => void;
  saveChatSession: (messages: ChatMessage[], existingSessionId?: string) => void;
  updateUserProfile: (data: Partial<User> & { password?: string }) => void;
}