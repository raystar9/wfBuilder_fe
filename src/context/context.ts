import {Context, createContext} from 'react';

class WFContext {
  private categoryContext:Context<Category>
  private characterContext:Context<Character[]>
  private itemContext:Context<Item[]>
  //private deckContext:Context<Deck[]>

  createCategoryContext = (init:Category) => {
    this.categoryContext = createContext<Category>(init)
  }

  createItemContext = (init:Item[]) => {
    this.itemContext = createContext<Item[]>(init)
  }

  createCharacterContext = (init:Item[]) => {
    this.characterContext = createContext<Character[]>(init)
  }

  // createDeckContext = (init:Category) => {
  //   this.categoryContext = createContext<Category>(init)
  // }

  getCategoryContext = () => this.categoryContext
  getItemContext = () => this.itemContext
  getCharacterContext = () => this.characterContext
  //getDeckContext = () => this.deckContext
}

const wfContext = new WFContext();

//const createCategoryContext = (init:Category) => {return createContext<Category>(init)}

type Category = {
  largeCategories:Code[]
  mediumCategories:Code[]
  smallCategories:Code[]
}

type Item = {
  id:string
  name:string
  type:string
  stars:string
}

type Code = {
  codeKind:string;
  key:string;
  relKey?:string;
  name:string;
}

type Character = {
    id: string
    type: string
    name: string
    stars:string
}

export type {Code, Item, Character}
export {wfContext}