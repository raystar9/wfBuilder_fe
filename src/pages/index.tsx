import { GetStaticProps, InferGetStaticPropsType } from 'next';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import axios from 'axios';

import Decks from '@/components/deck';
import DeckCategory from '@/components/deckCategory';
import { useCategoryStore } from '@/stores/categoryStore';

import { Character, Code, Item, wfContext } from '@/context/context';
import useSWR, {SWRConfig, unstable_serialize} from 'swr';
import serverConfig from '@/config';
import { useDeckStore } from '@/stores/deckStore';
import styles from './index.module.scss';

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
    const [page, setPage] = useState(1);

    // const inquiryDecks = useDeckStore().inquiryDecks;
    wfContext.createCategoryContext(props.categories);
    wfContext.createItemContext(props.items);
    wfContext.createCharacterContext(props.characters);

    useEffect(() => {
        inquiryDecks(page, inqCond)
    }, [])
    const nextPage = () => {
        setPage(prevPage => {
            const page = ++prevPage;
            inquiryDecks(page, inqCond)
            return page
        })
        
    }
    const prevPage = () => {
        setPage(prevPage => {
            if(prevPage > 1){
                const page = --prevPage;
                inquiryDecks(page, inqCond)
                return page
            } else {
                return 1
            }
        })
    }
    const inqCond = {
        largeCategory: categoryStore.currentLargeCategory,
        mediumCategory: categoryStore.currentMediumCategory,
        smallCategory: categoryStore.currentSmallCategory,
    }
    
    async function inquiryDecks(page:number, inqCond) {
        const decks = (await axios.get(`http://${serverConfig.publicAddr}:${serverConfig.frontendPort}/api/decks?largeCategory=${inqCond.largeCategory}&mediumCategory=${inqCond.mediumCategory}&smallCategory=${inqCond.smallCategory}&page=${page}`)).data
        setDecks(() =>  decks)
    }
    return <>
        <div className={styles.inquiryArea}>
            <div className={styles.deckCategory}>
                <DeckCategory 
                    onLargeCategoryChange={(newCategory) => {
                        inqCond.largeCategory = newCategory;
                        inquiryDecks(page, inqCond)
                    }} 
                    onMediumCategoryChange={(newCategory) => {
                        inqCond.mediumCategory = newCategory;
                        inquiryDecks(page, inqCond)
                    }}
                />
            </div>
            <div className={styles.alignRight}>
                <div className={styles.pagination}>
                    <button onClick={() => {prevPage()}}>&lt;</button>
                    <p>{page}</p>
                    <button onClick={() => {nextPage()}}>&gt;</button>
                </div>
                {/* <button onClick={() => { inquiryDecks(inqCond, page) }}>조회</button> */}
            <div className={styles.register}><Link rel="stylesheet" href="/register" ><button onClick={e => {deckStore.setDeck({})}}>등록</button></Link></div>
            </div>
        </div>
        
        <Decks type='inquiry' decks={decks} />
    </>
}
