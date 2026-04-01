import { create } from 'zustand';

/* ============================================================
   Weblyr AI — UI State Store (Zustand)
   Only UI state — no server data. No fetching.
   ============================================================ */

interface UIState {
  /** Mobile nav overlay open state */
  isNavOpen: boolean;
  setNavOpen: (open: boolean) => void;
  toggleNav: () => void;

  /** Whether the page has scrolled past the hero threshold */
  isScrolled: boolean;
  setScrolled: (scrolled: boolean) => void;

  /** Current active section for nav highlighting */
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isNavOpen: false,
  setNavOpen: (open) => set({ isNavOpen: open }),
  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),

  isScrolled: false,
  setScrolled: (scrolled) => set({ isScrolled: scrolled }),

  activeSection: '',
  setActiveSection: (section) => set({ activeSection: section }),
}));
