import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User, SubscriptionTier, ChatMessage, ChatSession } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from local storage on mount
  useEffect(() => {
    const storedSession = localStorage.getItem('hours_active_session');
    if (storedSession) {
      const email = JSON.parse(storedSession);
      const userData = localStorage.getItem(`user_data_${email}`);
      if (userData) {
        // We strip the password before setting state for security (even though it's local mock)
        const { password, ...safeUser } = JSON.parse(userData);
        setUser(safeUser);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: 'USER_NOT_FOUND' | 'WRONG_PASSWORD' }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const stored = localStorage.getItem(`user_data_${email}`);
    
    if (!stored) {
        return { success: false, error: 'USER_NOT_FOUND' };
    }

    const parsedData = JSON.parse(stored);

    // Simple string comparison for mock auth
    if (parsedData.password !== password) {
        return { success: false, error: 'WRONG_PASSWORD' };
    }

    // Success
    const { password: _, ...safeUser } = parsedData;
    setUser(safeUser);
    localStorage.setItem('hours_active_session', JSON.stringify(email));
    return { success: true };
  };

  const signup = (email: string, name: string, password: string) => {
    const newUser = {
        email,
        name,
        password, // Store password in "DB"
        subscriptionTier: 'free',
        chatHistory: [],
        freeUsageCount: 0,
        paymentMethod: null
    };
    // Save to "DB" (LocalStorage)
    localStorage.setItem(`user_data_${email}`, JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hours_active_session');
  };

  const updateSubscription = (tier: SubscriptionTier) => {
    if (user) {
        const now = new Date();
        const nextMonth = new Date(now.setMonth(now.getMonth() + 1));
        
        let updatedUser = { ...user, subscriptionTier: tier };

        if (tier === 'free') {
            // Downgrade: Remove billing info
            updatedUser.nextBillingDate = undefined;
            updatedUser.paymentMethod = null;
        } else {
            // Upgrade: Set billing info if not already present
            if (!updatedUser.paymentMethod) {
                updatedUser.paymentMethod = {
                    brand: 'Visa',
                    last4: '4242',
                    expiry: '12/28'
                };
            }
            updatedUser.nextBillingDate = nextMonth.toISOString();
        }

        setUser(updatedUser);
        
        // Update DB
        const dbKey = `user_data_${user.email}`;
        const stored = localStorage.getItem(dbKey);
        if (stored) {
            const parsed = JSON.parse(stored);
            localStorage.setItem(dbKey, JSON.stringify({ ...parsed, ...updatedUser }));
        }
    }
  };

  const incrementFreeUsage = () => {
      if (user) {
          const newCount = user.freeUsageCount + 1;
          const updatedUser = { ...user, freeUsageCount: newCount };
          setUser(updatedUser);
          
          // Update DB
          const dbKey = `user_data_${user.email}`;
          const stored = localStorage.getItem(dbKey);
          if (stored) {
              const parsed = JSON.parse(stored);
              localStorage.setItem(dbKey, JSON.stringify({ ...parsed, freeUsageCount: newCount }));
          }
      }
  };

  const saveChatSession = (messages: ChatMessage[], existingSessionId?: string) => {
      if (!user || messages.length === 0) return;

      const title = messages.find(m => m.role === 'user')?.text.slice(0, 30) + "..." || "New Conversation";
      const preview = messages[messages.length - 1].text.slice(0, 50) + "...";
      
      let updatedHistory = [...user.chatHistory];
      
      if (existingSessionId) {
          // Update existing session
          const sessionIndex = updatedHistory.findIndex(s => s.id === existingSessionId);
          if (sessionIndex !== -1) {
              updatedHistory[sessionIndex] = {
                  ...updatedHistory[sessionIndex],
                  messages,
                  preview,
                  date: new Date().toLocaleDateString() // Update date to now
              };
          } else {
              // Fallback if ID not found
              const newSession: ChatSession = {
                  id: existingSessionId,
                  title,
                  date: new Date().toLocaleDateString(),
                  preview,
                  messages
              };
              updatedHistory = [newSession, ...updatedHistory];
          }
      } else {
          // Create new session
          const newSession: ChatSession = {
              id: Date.now().toString(),
              title,
              date: new Date().toLocaleDateString(),
              preview,
              messages
          };
          updatedHistory = [newSession, ...updatedHistory];
      }

      const updatedUser = { ...user, chatHistory: updatedHistory };
      setUser(updatedUser);
      
      // Sync to "DB"
      const dbKey = `user_data_${user.email}`;
      const stored = localStorage.getItem(dbKey);
      if (stored) {
          const parsed = JSON.parse(stored);
          parsed.chatHistory = updatedHistory;
          localStorage.setItem(dbKey, JSON.stringify(parsed));
      }
  };

  const updateUserProfile = (data: Partial<User> & { password?: string }) => {
      if (!user) return;

      const { password, ...userDataToUpdate } = data;
      const updatedUser = { ...user, ...userDataToUpdate };
      setUser(updatedUser);

      // Update DB
      const dbKey = `user_data_${user.email}`;
      const stored = localStorage.getItem(dbKey);
      if (stored) {
          const parsed = JSON.parse(stored);
          const newDbRecord = { ...parsed, ...userDataToUpdate };
          if (password) {
              newDbRecord.password = password;
          }
          localStorage.setItem(dbKey, JSON.stringify(newDbRecord));
      }
  };

  return (
    <AuthContext.Provider value={{ 
        user, 
        isAuthenticated: !!user, 
        login, 
        signup, 
        logout, 
        updateSubscription, 
        incrementFreeUsage,
        saveChatSession,
        updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};