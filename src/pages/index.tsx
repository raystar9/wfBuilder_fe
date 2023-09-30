import { useCategoryStore } from '@/stores/codeStore';
import Deck from '../components/deck';
import DeckCategory from '../components/deckCategory';
import {useDeckStore} from '@/components/deck.module'
import Link from 'next/link';

export default function Main() {
    //const { selectedCategory, storeLCategory } = useCategoryStore();
    const categoryStore = useCategoryStore()
    const inquiryDecks = useDeckStore().inquiryDecks;

    const inqCond = {
        largeCategory:categoryStore.currentLargeCategory,
        mediumCategory:categoryStore.currentMediumCategory,
        smallCategory:categoryStore.currentSmallCategory,
    }
    return <>
        <DeckCategory />
        <button onClick={() => {inquiryDecks(inqCond)}}>조회</button>
        <Link rel="stylesheet" href="/register" ><button>등록</button></Link>
        <Deck type='inquiry'/>
    </>
}
