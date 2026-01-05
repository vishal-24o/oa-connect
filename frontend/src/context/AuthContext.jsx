import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    const storedToken = localStorage.getItem("auth_token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  // Login
  function login(userData, jwtToken) {
    setUser(userData);
    setToken(jwtToken);

    localStorage.setItem("auth_user", JSON.stringify(userData));
    localStorage.setItem("auth_token", jwtToken);
  }

  // Logout
  function logout() {
    setUser(null);
    setToken(null);

    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_token");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
