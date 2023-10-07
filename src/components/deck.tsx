import { Component, ReactNode, useState, useEffect, useReducer, MouseEvent} from 'react';
import styles from './deck.module.scss';
import Modal from './modal';
import {Deck, useDeckStore} from '@/stores/deckStore'
// import { useDeck } from '@/swr/useDeck';
import { useCategoryStore } from '@/stores/categoryStore';

    
function deckSlotAttrFactory(index:number, deck:Deck, characterPosition:number) {
    return Object.assign({
        main:deck[`m${characterPosition}`],
        equipment:deck[`e${characterPosition}`],
        soul:deck[`s${characterPosition}`],
        unison:deck[`u${characterPosition}`],
    })
}


function Decks(props: {decks?:Deck[], type?: string}) {
    if(props.type === "inquiry") {
        return <InquiryDecks decks={props.decks??[]}></InquiryDecks>
    } else if(props.type === "register") {
        return <RegisterDecks></RegisterDecks>
    }
}

function InquiryDecks(props:{decks:Deck[]}) {
    const category = useCategoryStore();
    return (
        <div>
            {
            props.decks.map((deck, idx) =>{
                return (<div key={idx} className={styles.deck}>
                    <div className={styles.titleArea}>
                        <div><p>{deck.title}</p></div>
                        <div><input type="text" value={deck.deckCode}/></div>
                    </div>
                    <ul>
                    <li>
                        <DeckSlot {...deckSlotAttrFactory(idx, deck, 1)}></DeckSlot>
                    </li>
                    <li>
                        <DeckSlot {...deckSlotAttrFactory(idx, deck, 2)}></DeckSlot>
                    </li>
                    <li>
                        <DeckSlot {...deckSlotAttrFactory(idx, deck, 3)}></DeckSlot>
                    </li>
                </ul>
                </div>)
            })
        }</div>
    )
}
function RegisterDecks() {
    const [characterModalVisible, setCharacterModalVisible] = useState(false);
    const [itemModalVisible, setItemModalVisible] = useState(false);
    const [selectedPosition, setPosition] = useState({ itemPosition: "e1"});
    const {deck, updateDeck} = useDeckStore();

    function openCharacterModal() {
        setCharacterModalVisible(true);
    }
    function closeCharacterModal() {
        setCharacterModalVisible(false);
    }
    function openItemModal() {
        setItemModalVisible(true);
    }
    function closeItemModal() {
        setItemModalVisible(false);
    }
    
    function setSelectedImagePosition(itemPosition: string) {
        setPosition({itemPosition})
    }
    
    function setDeckItem (id: string) {
        updateDeck({position:selectedPosition.itemPosition as keyof Deck, value:id})
    }

    function deckSlotEventFactory(characterPosition:number) {
        return {
            onMainClick:()=>{openCharacterModal(); setSelectedImagePosition(`m${characterPosition}`)},
            onUnisonClick:()=> {openCharacterModal(); setSelectedImagePosition(`u${characterPosition}`)},
            onSoulClick:()=> {openItemModal(); setSelectedImagePosition(`s${characterPosition}`)},
            onEquipmentClick:()=> {openItemModal(); setSelectedImagePosition(`e${characterPosition}`)},
        }
    }
    return (<div className={styles.deck}>
        <div className={styles.titleArea}>
            <div><input type="text" placeholder='제목' onChange={e => {{updateDeck({position:"title",value:e.target.value})}}}/></div>
            <div><input type="text" placeholder='덱 코드' maxLength={6} onChange={e => {{updateDeck({position:"deckCode",value:e.target.value})}}}/></div>
        </div>
        
    <ul >
        <li>
            <DeckSlot {...deckSlotAttrFactory(0, deck, 1)} {...deckSlotEventFactory(1)}></DeckSlot>
        </li>
        <li>
            <DeckSlot {...deckSlotAttrFactory(0, deck, 2)} {...deckSlotEventFactory(2)}></DeckSlot>
        </li>
        <li>
            <DeckSlot {...deckSlotAttrFactory(0, deck, 3)} {...deckSlotEventFactory(3)}></DeckSlot>
        </li>
    </ul>
    <Modal type="characters" visible={characterModalVisible} closeModalHandler={()=>{closeCharacterModal()}} onImageClick={id => {setDeckItem(id); closeCharacterModal();}}></Modal>
    <Modal type="items" visible={itemModalVisible} closeModalHandler={()=>{closeItemModal()}} onImageClick={id => {setDeckItem(id); closeItemModal();}}></Modal>
    </div>
    )
}

function DeckSlot(props: DeckSlotType) {
    return (<div className={styles.deckSlot}>
        <div className={styles.main} {...{ onClick: props.onMainClick}}>
            {props.main && <img src={`/characters/${props.main}.png`} alt="" className={styles.image} />}
        </div>
        <div className={styles.equipment} {...{ onClick: props.onEquipmentClick}}>
            {props.equipment && <img src={`/items/${props.equipment}.png`}  alt="" className={styles.image} style={{imageRendering:"pixelated"}}/>}
        </div>
        <div className={styles.soul}  {...{ onClick: props.onSoulClick}}>
             {props.soul && <img src={`/items/${props.soul}.png`} alt="" className={styles.image} style={{imageRendering:"pixelated"}}/>}
        </div>
        <div className={styles.unison}  {...{ onClick: props.onUnisonClick}}>
             {props.unison && <img src={`/characters/${props.unison}.png`} alt="" className={styles.image} />}
        </div>
    </div>);
}

type DeckSlotType = {
    main?: string,
    unison?: string,
    equipment?: string,
    soul?: string,
    type?: string,
    onMainClick?: (event:MouseEvent) => void,
    onEquipmentClick?: (event:MouseEvent) => void,
    onUnisonClick?: (event:MouseEvent) => void,
    onSoulClick?: (event:MouseEvent) => void,
}   

export default Decks