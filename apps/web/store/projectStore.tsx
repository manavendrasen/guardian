import create from "zustand";

type TProject = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

const useProjectStore = create<TProject>((set) => ({
  isVisible: false,
  setIsVisible: (isVisible: boolean) => {
    set((state: TProject) => ({ ...state, isVisible: isVisible }));
  },
}));

export default useProjectStore;
