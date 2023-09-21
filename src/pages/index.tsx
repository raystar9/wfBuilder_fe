import Deck from '../components/deck';
import DeckCategory from '../components/deckCategory';
import { Component, ReactNode, useRef, useState, } from "react";
import { Code } from "./code";
import { useCategoryStore } from '@/components/deckCategory.module'
import axios from 'axios';

export default function Main() {
    const [state, setState] = useState(
    [
        // { m1: "10", m2: "101", m3: "102", u1: "103", u2: "104", u3: "105", e1: "106", e2: "107", e3: "108", s1: "109", s2: "110", s3: "111", },
        // { m1: "10", m2: "101", m3: "102", u1: "103", u2: "104", u3: "105", e1: "106", e2: "107", e3: "108", s1: "109", s2: "110", s3: "111", }
    ])
    
    const { selectedCategory, storeLCategory } = useCategoryStore();

    const selectDeckList = () => {
        axios.get("http://127.0.0.1:3000/rest/decks?" 
        + "large-category=" + selectedCategory.lCategory 
        + "&medium-category=" + selectedCategory.mCategory 
        + "&small-category=" + selectedCategory.sCategory ).then(decks => {
            // debugger;
            setState(state => {
                return decks.data;
            })
        }).catch(res => {
            console.log(res);
        })
    }
    return <>
        <DeckCategory />
        <button onClick={() => {selectDeckList()}}>조회</button>
        <Deck decks={state}/>
    </>
}
