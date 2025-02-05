import React from 'react';
import { useLocation } from 'react-router-dom';
import { ModernTemplate } from './ModernTemplate';
import { SidebarTemplate } from './SidebarTemplate';
import { TerminalTemplate } from './TerminalTemplate';
 function PortfolioRouter() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const template = searchParams.get('template') || 'modern';

  const templates = {
    modern: ModernTemplate,
    minimal: SidebarTemplate,
    creative: TerminalTemplate,
  };

  const SelectedTemplate = templates[template as keyof typeof templates];

  return <SelectedTemplate />;
}
export default PortfolioRouter;