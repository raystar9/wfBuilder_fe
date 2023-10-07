import { MouseEvent, useContext, useEffect } from "react"
import styles from './characterList.module.scss';
import { Character, wfContext } from "@/context/context";
import TypeSelectBar, { TypeSelected } from "./typeSelectBar";
import { RaritySelected } from "./raritySelectBar";
import Image from "next/image";


export default function CharacterList(props: { onCharacterClick?: (id: string) => void, selectedElements:TypeSelected, selectedRarity:RaritySelected }) {
    const characters = useContext(wfContext.getCharacterContext());
    let _selectedElements = {};
    if(!props.selectedElements["0"] && !props.selectedElements["1"] && !props.selectedElements["2"] && !props.selectedElements["3"] && !props.selectedElements["4"] && !props.selectedElements["5"]){
        _selectedElements["0"] = true;
        _selectedElements["1"] = true;
        _selectedElements["2"] = true;
        _selectedElements["3"] = true;
        _selectedElements["4"] = true;
        _selectedElements["5"] = true;
    } else {
        _selectedElements = props.selectedElements;
    }

    let _selectedRarity = {};
    if(!props.selectedRarity["1"] && !props.selectedRarity["2"] && !props.selectedRarity["3"] && !props.selectedRarity["4"] && !props.selectedRarity["5"]) {
        _selectedRarity["1"] = true;
        _selectedRarity["2"] = true;
        _selectedRarity["3"] = true;
        _selectedRarity["4"] = true;
        _selectedRarity["5"] = true;
    } else {
        _selectedRarity = props.selectedRarity
    }

    const resultElement = new Array();
    const keys = Object.keys(_selectedRarity).sort((a, b) => {return +b-+a})
    for(let i in keys) {
        let _characters = characters.filter((item) => {
            return item.stars === keys[i]
        });
        resultElement.push(<li key={i} className={!_selectedRarity[keys[i]]? styles.hide:""}><RarityGroup key={i} characters={_characters} selectedElements={_selectedElements as TypeSelected} onCharacterClick={props.onCharacterClick}></RarityGroup></li>);
    }
    return (<ul className={styles.characterBody}>{resultElement}</ul>);
}

function RarityGroup(props:{characters:Character[], selectedElements:TypeSelected, onCharacterClick}) {
    const resultElement = new Array();
    const keys = Object.keys(props.selectedElements).sort((a, b) => {return +a-+b})
    for(let i in keys) {
        let _characters = props.characters.filter((item) => {
            return item.type === keys[i]
        });
        resultElement.push(<li className={!props.selectedElements[keys[i]]? styles.hide:""} key={i}><ElementGroup characters={_characters} onCharacterClick={props.onCharacterClick}></ElementGroup></li>);
    }
    return (<ul>{resultElement}</ul>);
}

function ElementGroup(props:{characters:Character[], onCharacterClick}) {
    return (<>
        {
        props.characters.map((item) => 
                <img key={item.id} className={styles.image} id={`c-image-${item.id}`} src={`/characters/${item.id}.png`} alt="" onClick={e => { props.onCharacterClick ? props.onCharacterClick(item.id) : null }} />
            )
        }
    </>)
}