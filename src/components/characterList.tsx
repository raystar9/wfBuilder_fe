import { MouseEvent, useContext, useEffect } from "react"
//import { CharactersContext } from "@/context/context";
import Image from "next/image";
// import { useCharacterStore } from "@/stores/characterStore";
import styles from './characterList.module.scss';
import { wfContext } from "@/context/context";

export default function CharacterList(props: { onCharacterClick?:(id:string) => void, option?: FilterOption }) {
    const characters = useContext(wfContext.getCharacterContext());
    // const characterStore = useCharacterStore();

    // const characters = charactersContext.characters;
    // useEffect(() => {
    //     if(characters.length == 0) {
    //         charactersContext.inquiryCharacters();
    //     }
    // }, [])
    if (props.option?.type) {
        return (<>
            {
                characters.filter((item) => { return props.option?.type === item.type })
                    .map((item, idx) => 
                        <Image className={styles.image} loading="eager" key={idx} src={`/characters/${item.id}.png`} width={106} height={106} alt=""/>
                )
            }
        </>)
    } else {
        return (<>
            {characters.map((item, idx) =>
                <Image className={styles.image} loading="eager" key={idx} id={`c-image-${item.id}`} src={`/characters/${item.id}.png`} width={106} height={106} alt="" onClick={e => {props.onCharacterClick? props.onCharacterClick((e.target as HTMLImageElement).id.substring(8)): null}}/>
            )}
        </>)
    }
}

type FilterOption = {
    type?:string
}