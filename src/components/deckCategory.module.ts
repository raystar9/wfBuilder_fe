import { create } from 'zustand';

type CategoryStore = {
    selectedCategory: {
        lCategory: string;
        mCategory: string;
        sCategory: string;
    },
    storeLCategory : (lCategory:CategoryStore['selectedCategory']['lCategory']) => void,
    storeMCategory : (lCategory:CategoryStore['selectedCategory']['mCategory']) => void,
}

const useCategoryStore = create<CategoryStore>()(set => ({
    selectedCategory : {
        lCategory: "01",
        mCategory: "0101",
        sCategory: "010101",
    },
    storeLCategory : (lCategory) => set((state) => ({...state, selectedCategory:{...state.selectedCategory, lCategory:lCategory}})),
    storeMCategory : (mCategory) => set((state) => ({...state, selectedCategory:{...state.selectedCategory, mCategory:mCategory}})),
}))

export {useCategoryStore}