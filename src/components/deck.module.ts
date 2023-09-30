import {create} from 'zustand'
import axios from 'axios';

type DeckStore = {
    decks:DeckType[],
    inquiryDecks: (inquiryCondition:InquiryCondition) => void,
    setDeck: (decks:DeckType[]) => void,
    updateDeck: (option:UpdateOption) => void,
    registerDeck: (deck:DeckType, codes?:CodeType[]) => Promise<void>
}

type CodeType = {
    codeKind?:string
    codeKey?:string
}

const useDeckStore = create<DeckStore>()(set => ({
        decks:[
        ],
        inquiryDecks: async (inquiryCondition:InquiryCondition) => {
            try {
                const result = await axios.get("http://127.0.0.1:3000/rest/decks?" 
                + "largeCategory=" + inquiryCondition.largeCategory
                + "&mediumCategory=" + inquiryCondition.mediumCategory
                + "&smallCategory=" + inquiryCondition.smallCategory)
                set(() => ({decks:result.data}));
            } catch(e) {
            }
        },
        setDeck:(decks: DeckType[]) => {
            set((state) => {
                return ({...state, decks});
            })
        },
        updateDeck: (option:UpdateOption) => {
            const idx = option.index?option.index:0;
            set(state => {
                if(!state.decks[idx]) {
                    return state;
                }
                let newObj:DeckType[] = [...state.decks];
                newObj[idx][option.position] = option.value;
                return ({...state, decks:newObj});
            })
        },
        registerDeck: async (deck, codes) => {
            try {
                const result = await axios.post("http://127.0.0.1:3000/rest/decks", {deck, codes});
                return;
            } catch(e) {
                throw e;
            }
        }
    })
)

export {useDeckStore} 
export type {DeckType}

type InquiryCondition = {
    largeCategory?:string;
    mediumCategory?:string;
    smallCategory?:string;
}

type DeckType =  {
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
    position: keyof DeckType;
    value:string;
    index?:number;
}