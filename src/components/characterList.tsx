import { MouseEvent, useContext, useEffect } from "react"
//import { CharactersContext } from "@/context/context";
import Image from "next/image";
import { useCharacterStore } from "@/stores/characterStore";

export default function CharacterList(props: { onCharacterClick?:(id:string) => void, option?: FilterOption }) {
    //const charactersContext = useContext(CharactersContext);
    const characterStore = useCharacterStore();
    const characters = characterStore.characters;
    useEffect(() => {
        if(characters.length == 0) {
            characterStore.inquiryCharacters();
        }
    }, [])
    if (props.option?.type) {
        return (<>
            {
                characters.filter((item) => { return props.option?.type === item.type })
                    .map((item, idx) => 
                        <Image key={idx} src={"/" + item.id + ".png"} width={100} height={100} alt=""/>
                )
            }
        </>)
    } else {
        return (<>
            {characters.map((item, idx) =>
                <Image key={idx} id={`c-image-${item.id}`} src={"/" + item.id + ".png"} width={100} height={100} alt="" onClick={e => {props.onCharacterClick? props.onCharacterClick((e.target as HTMLImageElement).id.substring(8)): null}}/>
            )}
        </>)
    }
}

type FilterOption = {
    type?:string
}