import { MouseEvent } from "react";
import CharacterList from "./characterList";
import styles from "./modal.module.scss";

export default function Modal(props:{visible:boolean, closeModalHandler:()=>void, onImageClick?:(id:string)=>void}) {
    
    return (
        <div className={styles.modalWrap +" " + (props.visible?styles.visible:"")} onClick={event => {if(event.currentTarget === event.target) {props.closeModalHandler()}}}>
            <div className={styles.modalMain}>
                <div className="modalBody"></div>
                <div className={styles.buttonDiv}>
                    <button className={styles.closeButton} onClick={event => {props.closeModalHandler()}}>close</button>
                </div>
                <div>
                    <CharacterList onCharacterClick={id => {props.onImageClick? props.onImageClick(id): null}}></CharacterList>
                </div>
            </div>
        </div>
    )
}