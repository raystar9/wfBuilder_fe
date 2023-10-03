import { MouseEvent, useState } from "react";
import CharacterList from "./characterList";
import styles from "./modal.module.scss";
import ItemList from "./itemList";
import TypeSelectBar from "./typeSelectBar";
import RaritySelectBar from "./raritySelectBar";

export default function Modal(props: { type: string, visible: boolean, closeModalHandler: () => void, onImageClick?: (id: string) => void }) {

    const [selectedElementsChar, setSelectedElementChar] = useState({ "0": false, "1": false, "2": false, "3": false, "4": false, "5": false });
    const [selectedElementsEq, setSelectedElementEq] = useState({ "0": false, "1": false, "2": false, "3": false, "4": false, "5": false, "6":false});
    const [selectedRarity, setSelectedRarity] = useState({"1": false, "2": false, "3": false, "4": false, "5": false });

    const toggleSelectedType = (type: string, kind:string) => {
        const switchElem = (prevState) => {
            const changes = {};
            if(prevState[type] === true) {
                changes[type] = false
            } else {
                changes[type] = true
            }
            return {...prevState, ...changes}
        }

        if(kind == "characters")  {
            setSelectedElementChar(switchElem);
        } else if(kind == "items") {
            setSelectedElementEq(switchElem);
        }
    }

    const toggleSelectedRarity = (type: string) => {
        setSelectedRarity(prevState => {
            const changes = {};
            if(prevState[type] === true) {
                changes[type] = false
            } else {
                changes[type] = true
            }
            return {...prevState, ...changes}
        });
    }

    return (
        <div className={styles.modalWrap + " " + (props.visible ? styles.visible : "")} onClick={event => { if (event.currentTarget === event.target) { props.closeModalHandler() } }}>
            <div className={styles.modalMain}>
                <div className={styles.conditionDiv}>
                    <div>
                    <div><TypeSelectBar onClick={(e, type) => { toggleSelectedType(type, props.type) }} selectedElements={
                        props.type === "characters"?selectedElementsChar:selectedElementsEq
                        }></TypeSelectBar></div>
                        <br/>
                    <div><RaritySelectBar onClick={(e, type) => { toggleSelectedRarity(type) }} selectedRarity={selectedRarity}></RaritySelectBar></div>
                    </div>
                    <div><button className={styles.closeButton} onClick={event => { props.closeModalHandler() }}>close</button></div>
                </div>
                <div className={styles.modalBody}>
                    {
                        props.type === "characters" &&
                        <CharacterList onCharacterClick={id => { props.onImageClick ? props.onImageClick(id) : null } } selectedElements={selectedElementsChar} selectedRarity={selectedRarity}></CharacterList> ||
                        props.type === "items" &&
                        <ItemList onItemClick={id => { props.onImageClick ? props.onImageClick(id) : null }} selectedElements={selectedElementsEq} selectedRarity={selectedRarity}></ItemList>
                    }
                </div>
            </div>
        </div>
    )
}