import {create} from 'zustand'
import axios from 'axios';

type DeckStore = {
    decks:DeckType[],
    inquiryDecks: (inquiryCondition:InquiryCondition) => void,
    updateDeck: (option:UpdateOption) => void,
}

const useDeckStore = create<DeckStore>()(set => ({
        decks:[
        // { m1: "10", m2: "101", m3: "102", u1: "103", u2: "104", u3: "105", e1: "106", e2: "107", e3: "108", s1: "109", s2: "110", s3: "111", },
        // { m1: "10", m2: "101", m3: "102", u1: "103", u2: "104", u3: "105", e1: "106", e2: "107", e3: "108", s1: "109", s2: "110", s3: "111", }
        ],
        inquiryDecks: async (inquiryCondition:InquiryCondition) => {
            try {
                const result = await axios.get("http://127.0.0.1:3000/rest/decks?" 
                + "large-category=" + inquiryCondition.largeCategory
                + "&medium-category=" + inquiryCondition.mediumCategory
                + "&small-category=" + inquiryCondition.smallCategory)
                set(() => ({decks:result.data}));
            } catch(e) {
            }
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
}

type UpdateOption = {
    position: keyof DeckType;
    value:string;
    index?:number;
}