"use client";
import { createContext, useState } from "react";

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

interface User {
  id: string;
  name: string;
  role: string;
}

export const UserContext = createContext<UserContextType>({
  user: {
    id: "",
    name: "",
    role: "",
  },
  setUser: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    role: "",
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
