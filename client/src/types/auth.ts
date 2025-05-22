// Types related to authentication

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  initials: string;
  createdAt?: string;
  lastLogin?: string;
  avatar?: string;
  preferences?: {
    darkMode?: boolean;
    notificationEnabled?: boolean;
  };
  stats?: {
    totalNotes: number;
    recentNotes: number;
    lastActivity?: string;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null;
  token: string | null;
}
