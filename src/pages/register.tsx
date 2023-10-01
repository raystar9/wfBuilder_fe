import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from 'next/navigation';
import axios from "axios";

import Decks from "@/components/deck";
import DeckCategory from "@/components/deckCategory";
import { useDeckStore, Deck } from '@/stores/deckStore'
import { wfContext } from "@/context/context";
import { Category, useCategoryStore } from "@/stores/categoryStore";
import { useItemStore } from "@/stores/itemStore";
import serverConfig from '@/config';

export const getStaticProps = (async () => {
    const largeCategories = (await axios.get(`http://${serverConfig.publicIp}:${serverConfig.backendPort}/rest/codes/01`)).data;
    const mediumCategories = (await axios.get(`http://${serverConfig.publicIp}:${serverConfig.backendPort}/rest/codes/02`)).data;
    const smallCategories = (await axios.get(`http://${serverConfig.publicIp}:${serverConfig.backendPort}/rest/codes/03`)).data;
    const items = (await axios.get(`http://${serverConfig.publicIp}:${serverConfig.backendPort}/rest/items`)).data;
    const characters = (await axios.get(`http://${serverConfig.publicIp}:${serverConfig.backendPort}/rest/characters`)).data;
    return {props: {categories: {largeCategories,mediumCategories,smallCategories}, items, characters}}
}) satisfies GetStaticProps

export default function Register(props:InferGetStaticPropsType<typeof getStaticProps>) {
    wfContext.createCategoryContext(props.categories);
    wfContext.createItemContext(props.items);
    wfContext.createCharacterContext(props.characters);
    const router = useRouter();
    const {deck, registerDeck} = useDeckStore();
    const {items, inquiryItems} = useItemStore();
    const categoryStore = useCategoryStore();

    async function registerDeckToServer(deck:Deck, categories:Category) {
        try {
            const codes = new Array();
            if(categories.currentLargeCategory){
                codes.push({
                    "codeKind":"01",
                    "codeKey":categories.currentLargeCategory
                });
            }
            if(categories.currentMediumCategory){
                codes.push({
                    "codeKind":"02",
                    "codeKey":categories.currentMediumCategory
                });
            }
            if(categories.currentSmallCategory){
                codes.push({
                    "codeKind":"03",
                    "codeKey":categories.currentSmallCategory
                });
            }
            
            await registerDeck(deck, codes);
            alert("done!");
            router.push("/")
        }catch(e) {
            alert("Server is not available.")
        }
    }

    return (<>
        <DeckCategory/>
        <Decks type="register"></Decks>
        <button onClick={() => {registerDeckToServer(deck, categoryStore)}}>등록하기</button>
    </>)
}
