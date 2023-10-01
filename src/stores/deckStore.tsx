import {create} from 'zustand'
import axios from 'axios';
import serverConfig from '@/config';

type DeckStore = {
    deck:Deck,
    // inquiryDecks: (inquiryCondition:InquiryCondition) => void,
    setDeck: (deck:Deck) => void,
    updateDeck: (option:UpdateOption) => void,
    registerDeck: (deck:Deck, codes?:CodeType[]) => Promise<void>
}

type CodeType = {
    codeKind?:string
    codeKey?:string
}

const useDeckStore = create<DeckStore>()(set => ({
        deck:{},
        setDeck:(deck: Deck) => {
            set((state) => {
                return ({...state, deck});
            })
        },
        updateDeck: (option:UpdateOption) => {
            set(state => {
                if(!state.deck) {
                    return state;
                }
                let newObj:Deck = {...state.deck};
                newObj[option.position] = option.value;
                return ({...state, deck:newObj});
            })
        },
        registerDeck: async (deck, codes) => {
            try {
                const result = await axios.post(`http://${serverConfig.publicIp}:${serverConfig.backendPort}/rest/decks`, {deck, codes});
                return;
            } catch(e) {
                throw e;
            }
        }
    })
)

export {useDeckStore} 
export type {Deck}

type InquiryCondition = {
    largeCategory?:string;
    mediumCategory?:string;
    smallCategory?:string;
}

type Deck =  {
    m1?: string,
    m2?: string,
    m3?: string,
    u1?: string,
    u2?: string,
    u3?: string,
    e1?: string,
    e2?: string,
    e3?: string,
    s1?: string,
    s2?: string,
    s3?: string,
    deckCodes?:string,
    comments?:string
}

type UpdateOption = {
    position: keyof Deck;
    value:string;
}