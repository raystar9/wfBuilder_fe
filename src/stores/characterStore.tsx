import {create} from 'zustand'
import axios from 'axios';

type CharacterStore = {
  characters:Character[],
  inquiryCharacters: () => void
}

const useCharacterStore = create<CharacterStore>() (set => ({
  characters: [],
  inquiryCharacters: async () => {
    const result = await axios.get("http://127.0.0.1:3000/rest/characters");
    set(() => {
      return {characters:result.data}
    })
  }
}))

// const characterStore = useCharacterStore();

// if(characterStore.characters.length == 0) {
//   characterStore.inquiryCharacters()
// }

type Character = {
  id:string
  type:string
  name:string
}

export {useCharacterStore}