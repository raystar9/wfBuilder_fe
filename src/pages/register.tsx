import Deck from "@/components/deck";
import { DeckType, useDeckStore } from "@/components/deck.module";
import DeckCategory from "@/components/deckCategory";
import { Category, useCategoryStore } from "@/stores/codeStore";
import { useRouter } from 'next/navigation';

export default function Register() {
    const router = useRouter();
    const {decks, registerDeck} = useDeckStore();
    //const categoryStore = useCategoryStore();
    const categoryStore = useCategoryStore();

    async function registerDeckToServer(deck:DeckType, categories:Category) {
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
        <DeckCategory />
        <Deck type="register"></Deck>
        <button onClick={() => {registerDeckToServer(decks[0], categoryStore)}}>등록하기</button>
    </>)
}
