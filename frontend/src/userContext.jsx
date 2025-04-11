import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  const fetchUser = () => {
    axios
      .get('/auth/profile', { withCredentials: true })
      .then(({ data }) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setReady(true));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}
