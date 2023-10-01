import axios from 'axios';
import { create } from 'zustand';

type ItemStore = {
  items:Item[],
  inquiryItems: (items:Item[]) => void
}

type Item = {
  id:string,
  name:string,
  type:string
}

const useItemStore = create<ItemStore>()(set => ({
  items: [],
  inquiryItems: (async (items) => {
    set(prevState => { return {...prevState, items}})
  })
}))

export { useItemStore }