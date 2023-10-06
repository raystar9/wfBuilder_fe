import { GetStaticProps, InferGetStaticPropsType } from 'next';
import {useState} from 'react';
import Link from 'next/link';
import axios from 'axios';

import Decks from '@/components/deck';
import DeckCategory from '@/components/deckCategory';
import { useCategoryStore } from '@/stores/categoryStore';
// import { useDeckStore } from '@/stores/deckStore'
import { Character, Code, Item, wfContext } from '@/context/context';
import useSWR, {SWRConfig, unstable_serialize} from 'swr';
// import { useDeck } from '@/swr/useDeck';
import serverConfig from '@/config';
import { useDeckStore } from '@/stores/deckStore';

export const getStaticProps = (async context => {
    const largeCategories = (await axios.get(`http://127.0.0.1:${serverConfig.backendPort}/rest/codes/01`)).data;
    const mediumCategories = (await axios.get(`http://127.0.0.1:${serverConfig.backendPort}/rest/codes/02`)).data;
    const smallCategories = (await axios.get(`http://127.0.0.1:${serverConfig.backendPort}/rest/codes/03`)).data;
    const items = (await axios.get(`http://127.0.0.1:${serverConfig.backendPort}/rest/items`)).data;
    const characters = (await axios.get(`http://127.0.0.1:${serverConfig.backendPort}/rest/characters`)).data;
    // const characters = (await axios.get(`http://127.0.0.1:${serverConfig.frontendPort}/api/characters`)).data;
    return { props: { categories: { largeCategories, mediumCategories, smallCategories }, items, characters, fallback:[unstable_serialize(["decks", "", "", ""])] }, revalidate:3600 }
}) satisfies GetStaticProps

export default function Main(props: InferGetStaticPropsType<typeof getStaticProps>) {
    const categoryStore = useCategoryStore()
    const deckStore = useDeckStore();
    const [decks, setDecks] = useState();
    // const inquiryDecks = useDeckStore().inquiryDecks;
    wfContext.createCategoryContext(props.categories);
    wfContext.createItemContext(props.items);
    wfContext.createCharacterContext(props.characters);
    
    const inqCond = {
        largeCategory: categoryStore.currentLargeCategory,
        mediumCategory: categoryStore.currentMediumCategory,
        smallCategory: categoryStore.currentSmallCategory,
    }
    
    async function inquiryDecks(inqCond) {
        const decks = (await axios.get(`http://${serverConfig.publicAddr}:${serverConfig.frontendPort}/api/decks?largeCategory=${inqCond.largeCategory}&mediumCategory=${inqCond.mediumCategory}&smallCategory=${inqCond.smallCategory}&`)).data
        setDecks(() =>  decks)
    }
    return <>
        <DeckCategory />
        <button onClick={() => { inquiryDecks(inqCond) }}>조회</button>
        {/* <button onClick={() => {mutate([categoryStore.currentLargeCategory, categoryStore.currentMediumCategory, categoryStore.currentSmallCategory])}}>조회</button> */}
        <Link rel="stylesheet" href="/register" ><button onClick={e => {deckStore.setDeck({})}}>등록</button></Link>
        <Decks type='inquiry' decks={decks} />
    </>
}
