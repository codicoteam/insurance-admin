/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { menuSectionIds } from "./sidebarConstants";

export interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  expandedSections: Record<string, boolean>;
  toggleSection: (sectionId: string) => void;
  setExpandedSections: (sections: Record<string, boolean>) => void;
  activeSectionId: string | null;
  setActiveSectionId: (id: string | null) => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined,
);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    home: true,
  });
  const [activeSectionId, setActiveSectionId] = useState<string | null>("home");

  const toggleSection = useCallback((sectionId: string): void => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
    setActiveSectionId(sectionId);
  }, []);

  // Auto-expand section based on current route and collapse others
  useEffect(() => {
    const currentPath = location.pathname;

    // Find which section contains the current path
    const activeSection = menuSectionIds.find((sectionId) => {
      // Map section IDs to their paths
      const sectionPaths: Record<string, string[]> = {
        home: ["/", "/dashboard"],
        users: ["/users"],
        kyc: ["/kyc"],
        products: ["/products", "/forms"],
        pricing: ["/pricing"],
        underwriting: ["/underwriting"],
        quotes: ["/quotes"],
        policies: ["/policies"],
        claims: ["/claims"],
        reporting: ["/reporting"],
        system: ["/system"],
      };

      const paths = sectionPaths[sectionId] || [];
      return paths.some((path) => currentPath.startsWith(path));
    });

    if (activeSection) {
      setActiveSectionId(activeSection);
      // Collapse all other sections, expand the active one
      const newSections: Record<string, boolean> = {};
      menuSectionIds.forEach((id) => {
        newSections[id] = id === activeSection;
      });
      setExpandedSections(newSections);
    }
  }, [location.pathname]);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        setIsOpen,
        isCollapsed,
        setIsCollapsed,
        expandedSections,
        toggleSection,
        setExpandedSections,
        activeSectionId,
        setActiveSectionId,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
