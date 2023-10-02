import { MouseEvent } from "react";
import CharacterList from "./characterList";
import styles from "./modal.module.scss";
import ItemList from "./itemList";
import TypeSelectBar from "./typeSelectBar";

export default function Modal(props:{type:string, visible:boolean, closeModalHandler:()=>void, onImageClick?:(id:string)=>void}) {
    
    const setSelectedType = (type:string) => {

    }


    return (
        <div className={styles.modalWrap +" " + (props.visible?styles.visible:"")} onClick={event => {if(event.currentTarget === event.target) {props.closeModalHandler()}}}>
            <div className={styles.modalMain}>
                <table className={styles.conditionTable}>
                    <tr>
                        <td><TypeSelectBar onClick={(e, type) => {setSelectedType(type)}}></TypeSelectBar></td>
                        <td><button className={styles.closeButton} onClick={event => {props.closeModalHandler()}}>close</button></td>
                    </tr>
                </table>
                <div className={styles.modalBody}>
                    {
                        props.type === "characters" &&
                        <CharacterList onCharacterClick={id => {props.onImageClick? props.onImageClick(id): null}}></CharacterList> ||
                        props.type === "items" && 
                        <ItemList onItemClick={id => {props.onImageClick? props.onImageClick(id): null}}></ItemList>
                    }
                </div>
            </div>
        </div>
    )
}