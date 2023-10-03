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
    const _selectedElements: string[] = []
    for (var i in props.selectedElements) {
      if (props.selectedElements[i] == true)
        _selectedElements.push(i);
    }
    if (_selectedElements.length == 0) {
      _selectedElements.push(...["0", "1", "2", "3", "4", "5"])
    }
    const _selectedRarity: string[] = [];
    for (var i in props.selectedRarity) {
      if (props.selectedRarity[i] == true)
      _selectedRarity.push(i);
    }
    if (_selectedRarity.length == 0) {
        _selectedRarity.push(...["1", "2", "3", "4", "5"])
    }

    const _characters = characters.filter((item) => {
        for(let i in _selectedElements) {
            if(_selectedElements[i] === item.type) break;
            if(_selectedElements.length - 1 == +i) {
                return false;
            }
        }
        for(let i in _selectedRarity) {
            if(_selectedRarity[i] === item.stars) break;
            if(_selectedRarity.length - 1 == +i) {
                return false;
            }
        }
        return item;
    })
    
    return (<div>
        {_characters.map((item, idx) =>
        <img key={idx} className={styles.image} id={`c-image-${item.id}`} src={`/characters/${item.id}.png`} alt="" onClick={e => { props.onCharacterClick ? props.onCharacterClick(item.id) : null }} />
        )}
    </div>)
}