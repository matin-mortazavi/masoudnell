"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface LogoContextType {
  logoInNav: boolean;
  setLogoInNav: (value: boolean) => void;
}

const LogoContext = createContext<LogoContextType | undefined>(undefined);

export const LogoProvider = ({ children }: { children: ReactNode }) => {
  
  const [logoInNav, setLogoInNav] = useState(false);

  return (
    <LogoContext.Provider value={{ logoInNav, setLogoInNav }}>
      {children}
    </LogoContext.Provider>
  );
};

export const useLogoContext = () => {
  const context = useContext(LogoContext);
  if (!context) {
    throw new Error("useLogoContext must be used within LogoProvider");
  }
  return context;
};
