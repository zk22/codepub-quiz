import create from "zustand";
import { getCookie, setCookie } from "./storage";

type Info = {
  userId: string;
  quizId: string;
  isStarted?: boolean;
  isFinished?: boolean;
  correctCount?: number;
  totalCount?: number;
  duration?: number;
  selectedQuestionIndex: number;
};

type Store = {
  info: Info;
  setInfo: (user: Info) => void;
};

const useStore = create<Store>((set) => ({
  info: { selectedQuestionIndex: 0, ...getCookie("codepub.info") },
  setInfo: (info) =>
    set(() => {
      setCookie("codepub.info", info, "", { path: "/" });
      return { info };
    }),
}));

export default useStore;
export const { getState } = useStore;
