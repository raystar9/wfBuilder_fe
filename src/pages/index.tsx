import Deck from '../components/deck';
import DeckCategory from '../components/deckCategory';
import { Component, ReactNode, useRef, useState, } from "react";
import { useCategoryStore } from '@/components/deckCategory.module'
import {useDeckStore} from '@/components/deck.module'

export default function Main() {
    const { selectedCategory, storeLCategory } = useCategoryStore();
    const inquiryDecks = useDeckStore().inquiryDecks;

    const inqCond = {
        largeCategory:selectedCategory.lCategory,
        mediumCategory:selectedCategory.mCategory,
        smallCategory:selectedCategory.sCategory,
    }
    return <>
        <DeckCategory />
        <button onClick={() => {inquiryDecks(inqCond)}}>조회</button>
        <Deck/>
    </>
}
