import { useCategoryStore } from '@/stores/categoryStore';
import axios from 'axios';
import useSWR from 'swr';

// const useDeck = (param?:{largeCategory?:string, mediumCategory?:string, smallCategory?:string}) => {
const useDeck = (largeCategory?:string,mediumCategory?:string,smallCategory?:string) => {
  const {data, error, isLoading, mutate} = useSWR(['decks', largeCategory, mediumCategory, smallCategory], (params) => {
    let url = `http://127.0.0.1:3000/rest/decks?largeCategory=${params[1]}&mediumCategory=${params[2]}&smallCategory=${params[3]}`;
    return axios.get(url).then(res => res.data).catch(e => console.log(e))
  })
  return {decks:data, error, isLoading, mutate};
}

export {useDeck}