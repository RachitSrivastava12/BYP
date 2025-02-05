import { create } from 'zustand';
import { PortfolioData } from '../types/portfolio';

interface PortfolioState {
  portfolioData: PortfolioData | null;
  setPortfolioData: (data: PortfolioData) => void;
  generatePortfolio: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  portfolioData: null,
  setPortfolioData: (data) => set({ portfolioData: data }),
  generatePortfolio: () => {
    // This would typically make an API call to generate the portfolio
    console.log('Generating portfolio...');
  },
}));