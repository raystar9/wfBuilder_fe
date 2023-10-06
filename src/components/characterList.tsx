import { MouseEvent, useContext, useEffect } from "react"
//import { CharactersContext } from "@/context/context";
import Image from "next/image";
// import { useCharacterStore } from "@/stores/characterStore";
import styles from './characterList.module.scss';
import { Character, wfContext } from "@/context/context";
import TypeSelectBar, { TypeSelected } from "./typeSelectBar";
import { RaritySelected } from "./raritySelectBar";


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
        if(!_selectedRarity[keys[i]]){
            continue;
        }
        let _characters = characters.filter((item) => {
            return item.stars === keys[i]
        });
        resultElement.push(<RarityGroup characters={_characters} selectedElements={_selectedElements as TypeSelected} onCharacterClick={props.onCharacterClick}></RarityGroup>);
    }
    return (<ul>{resultElement}</ul>);
    // const _selectedElements: string[] = []
    // for (var i in props.selectedElements) {
    //   if (props.selectedElements[i] == true)
    //     _selectedElements.push(i);
    // }
    // if (_selectedElements.length == 0) {
    //   _selectedElements.push(...["0", "1", "2", "3", "4", "5"])
    // }
    // const _selectedRarity: string[] = [];
    // for (var i in props.selectedRarity) {
    //   if (props.selectedRarity[i] == true)
    //   _selectedRarity.push(i);
    // }
    // if (_selectedRarity.length == 0) {
    //     _selectedRarity.push(...["1", "2", "3", "4", "5"])
    // }
    const _characters = characters.reduce((prev, curr, idx, array) => {
        return prev;
    })

    // const _characters = characters.filter((item) => {
    //     for(let i in _selectedElements) {
    //         if(_selectedElements[i] === item.type) break;
    //         if(_selectedElements.length - 1 == +i) {
    //             return false;
    //         }
    //     }
    //     for(let i in _selectedRarity) {
    //         if(_selectedRarity[i] === item.stars) break;
    //         if(_selectedRarity.length - 1 == +i) {
    //             return false;
    //         }
    //     }
    //     return item;
    // })
    
    // return (<div>
    //     {_characters.map((item, idx) =>
    //     <img key={idx} className={styles.image} id={`c-image-${item.id}`} src={`/characters/${item.id}.png`} alt="" onClick={e => { props.onCharacterClick ? props.onCharacterClick(item.id) : null }} />
    //     )}
    // </div>)
}

function RarityGroup(props:{characters:Character[], selectedElements:TypeSelected, onCharacterClick}) {
    const resultElement = new Array();
    const keys = Object.keys(props.selectedElements).sort((a, b) => {return +a-+b})
    for(let i in keys) {
        if(!props.selectedElements[keys[i]]){
            continue;
        }
        let _characters = props.characters.filter((item) => {
            return item.type === keys[i]
        });
        resultElement.push(<li><ElementGroup characters={_characters} onCharacterClick={props.onCharacterClick}></ElementGroup></li>);
    }
    return (<li><ul>{resultElement}</ul></li>);
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