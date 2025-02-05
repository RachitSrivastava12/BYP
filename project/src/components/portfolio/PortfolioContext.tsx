import React, { createContext, useContext, useState } from 'react';
import { PortfolioData } from '../../types/portfolio';

interface PortfolioContextType {
  portfolioData: PortfolioData | null;
  setPortfolioData: (data: PortfolioData) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);

  return (
    <PortfolioContext.Provider value={{ portfolioData, setPortfolioData }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};