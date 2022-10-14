import create from "zustand";

type TDashboard = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

const useDashboardStore = create<TDashboard>((set) => ({
  isVisible: false,
  setIsVisible: (isVisible: boolean) => {
    set((state: TDashboard) => ({ ...state, isVisible: isVisible }));
  },
}));

export default useDashboardStore;
