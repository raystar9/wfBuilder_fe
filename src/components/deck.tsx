import { Component, ReactNode, useState, useEffect } from 'react';
import styles from './deck.module.scss';
import Image from 'next/image';
import Modal from './modal';
import { DeckType, useDeckStore } from './deck.module';

function Deck(props: { type?: string, deckChangeHandler?: () => void }) {
    const {decks, updateDeck} = useDeckStore();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState({ index:0, position: "e1"});

    const openModalPopup = () => {
        setModalVisible(true);
    }

    const closeModalPopup = () => {
        setModalVisible(false);
    }
    const setSelectedImagePosition = (position: string) => {
        setSelectedImage({index:0, position})
    }

    const setCharacter = (id: string) => {
        updateDeck({index:selectedImage.index, position:selectedImage.position as keyof DeckType, value:id})
    }

    return (
        <div>
            {
            decks.map((deck, idx) =>
                <ul key={idx} className={styles.deck}>
                    <li>
                        <DeckSlot position="1" main={deck.m1} unison={deck.u1} equipment={deck.e1} soul={deck.s1} type={props.type} onClick={openModalPopup} clickPositionHandler={setSelectedImagePosition}></DeckSlot>
                    </li>
                    <li>
                        <DeckSlot position="2" main={deck.m2} unison={deck.u2} equipment={deck.e2} soul={deck.s2} type={props.type} onClick={openModalPopup}></DeckSlot>
                    </li>
                    <li>
                        <DeckSlot position="3" main={deck.m3} unison={deck.u3} equipment={deck.e3} soul={deck.s3} type={props.type} onClick={openModalPopup}></DeckSlot>
                    </li>
                </ul>
            )
            }
            {props.type === "register" && <Modal visible={modalVisible} closeModalHandler={closeModalPopup}></Modal>}
        </div>
    )
}
function DeckSlot(props: DeckSlotType) {
    return (<div className={styles.deckSlot}>
        <div className={styles.main} {...props.type === "register" && { onClick: event=>{props.onClick?props.onClick(event):null;props.clickPositionHandler?props.clickPositionHandler(`e${props.position}`):null;} }}>
            {props.main && <Image src={`/${props.main}.png`} width="100" height="100" alt="" className={styles.image} />}
        </div>
        <div className={styles.equipment} {...props.type === "register" && { onClick: props.onClick }}>
            {props.equipment && <Image src={`/${props.equipment}.png`} width="100" height="100" alt="" className={styles.image} />}
        </div>
        <div className={styles.soul} {...props.type === "register" && { onClick: props.onClick }}>
             {props.soul && <Image src={`/${props.soul}.png`} width="100" height="100" alt="" className={styles.image} />}
        </div>
        <div className={styles.unison} {...props.type === "register" && { onClick: props.onClick }}>
             {props.unison && <Image src={`/${props.unison}.png`} width="100" height="100" alt="" className={styles.image} />}
        </div>
    </div>);
}

type DeckSlotType = {
    position:string;
    main?: string,
    unison?: string,
    equipment?: string,
    soul?: string,
    type?: string,
    onClick?: (event) => void
    clickPositionHandler?: (id:string) => void
}   



export default Deck