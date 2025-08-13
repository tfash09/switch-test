// src/auth/authService.ts
type User = {
  name: string;
  email: string;
  token: string;
};

let mockUser: User | null = null;

export const authService = {
  loginWithOAuth: async (): Promise<User> => {
    // Simulate OAuth popup + token exchange delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock token & user info
    mockUser = {
      name: "Jane Doe",
      email: "jane@example.com",
      token: "mock-oauth-token-123456",
    };

    localStorage.setItem("mockUser", JSON.stringify(mockUser));
    return mockUser;
  },

  logout: () => {
    mockUser = null;
    localStorage.removeItem("mockUser");
  },

  getUser: (): User | null => {
    if (!mockUser) {
      const saved = localStorage.getItem("mockUser");
      if (saved) mockUser = JSON.parse(saved);
    }
    return mockUser;
  },

  isAuthenticated: (): boolean => {
    return !!authService.getUser();
  },
};
