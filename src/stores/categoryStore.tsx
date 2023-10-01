import axios from 'axios';
import { create } from 'zustand';

type Category = {
  currentLargeCategory: string,
  currentMediumCategory: string,
  currentSmallCategory: string,
  setCurrentLargeCategory: (key: string) => void,
  setCurrentMediumCategory: (key: string) => void,
  setCurrentSmallCategory: (key: string) => void,
}

const useCategoryStore =
  create<Category>()(set => ({
    currentLargeCategory: "",
    currentMediumCategory: "",
    currentSmallCategory: "",
    setCurrentLargeCategory: key => { set((prevState) => ({ ...prevState, currentLargeCategory: key })) },
    setCurrentMediumCategory: key => { set((prevState) => ({ ...prevState, currentMediumCategory: key })) },
    setCurrentSmallCategory: key => { set((prevState) => ({ ...prevState, currentSmallCategory: key })) },
  }
  ))

export type { Category }
export { useCategoryStore }