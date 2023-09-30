import axios from 'axios';
import {create} from 'zustand';

type Category = {
  largeCategories:Code[]
  mediumCategories:Code[]
  smallCategories:Code[]
  currentLargeCategory:string,
  currentMediumCategory:string,
  currentSmallCategory:string,
  setCurrentLargeCategory: (key:string) => void,
  setCurrentMediumCategory: (key:string) => void,
  setCurrentSmallCategory: (key:string) => void,
  selectCategories: () => void
}

const useCategoryStore = 
create<Category>()(set=> ({
    largeCategories:[],
    mediumCategories:[],
    smallCategories:[],
    currentLargeCategory:"",
    currentMediumCategory:"",
    currentSmallCategory:"",
    setCurrentLargeCategory: key => {set((prevState) => ({...prevState, currentLargeCategory:key}))},
    setCurrentMediumCategory: key => {set((prevState) => ({...prevState, currentMediumCategory:key}))},
    setCurrentSmallCategory: key => {set((prevState) => ({...prevState, currentSmallCategory:key}))},
    selectCategories: async () => {
      const largeCategories = (await axios.get("http://127.0.0.1:3000/rest/codes/01")).data;
      const mediumCategories = (await axios.get("http://127.0.0.1:3000/rest/codes/02")).data;
      const smallCategories = (await axios.get("http://127.0.0.1:3000/rest/codes/03")).data;
      set(() => {
        return {largeCategories, mediumCategories, smallCategories}
      })
    }
  }
))

type Code = {
  codeKind:string;
  key:string;
  relKey?:string;
  name:string;
}
// return create()(set=> ({
//   categories: {
//     largeCategory:"",
//     mediumCategory:"",
//     smallCategory:"",
//   }
// })
// )
export type {Category, Code}
export {useCategoryStore}