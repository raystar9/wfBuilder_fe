import { MouseEvent, useContext, useEffect } from "react"
//import { CharactersContext } from "@/context/context";
import Image from "next/image";
// import { useCharacterStore } from "@/stores/characterStore";
import styles from './characterList.module.scss';
import { Character, wfContext } from "@/context/context";
import TypeSelectBar from "./typeSelectBar";


export default function CharacterList(props: { onCharacterClick?: (id: string) => void, option?: FilterOption }) {
    const characters = useContext(wfContext.getCharacterContext());
    return <>
        <CharactersBody characters={characters} onCharacterClick={props.onCharacterClick} option={props.option}></CharactersBody>
    </>
}

function CharactersBody(props: { characters: Character[], onCharacterClick?: (id: string) => void, option?: FilterOption }) {
    if (props.option?.type) {
        return (<>
            {
                props.characters.filter((item) => { return props.option?.type === item.type }).map((item, idx) =>
                        <EachCharacter character={item} key={idx} onCharacterClick={props.onCharacterClick}></EachCharacter>
                    )
            }
        </>)
    } else {
        return (<>
            {props.characters.map((item, idx) =>
                <EachCharacter character={item} key={idx} onCharacterClick={props.onCharacterClick}></EachCharacter>
            )}
        </>)
    }

}

function EachCharacter(props:{character:Character, onCharacterClick?: (id: string) => void}) {
    return <img className={styles.image} id={`c-image-${props.character.id}`} src={`/characters/${props.character.id}.png`} alt="" onClick={e => { props.onCharacterClick ? props.onCharacterClick(props.character.id) : null }} />
}

type FilterOption = {
    type?: string
}