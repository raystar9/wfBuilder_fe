import { Component, ReactNode, useState, useEffect, useReducer, MouseEvent} from 'react';
import styles from './deck.module.scss';
import Image from 'next/image';
import Modal from './modal';
import {Deck, useDeckStore} from '@/stores/deckStore'
import useSWR from 'swr'
import axios from 'axios';
import { useDeck } from '@/swr/useDeck';
import { useCategoryStore } from '@/stores/categoryStore';

function Decks(props: { type?: string, deckChangeHandler?: () => void, onRegisterComplete?:()=>void}) {
    const [characterModalVisible, setCharacterModalVisible] = useState(false);
    const [itemModalVisible, setItemModalVisible] = useState(false);
    const [selectedPosition, setPosition] = useState({ index:0, itemPosition: "e1"});
    const category = useCategoryStore();
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
    
    function setSelectedImagePosition(index:number, itemPosition: string) {
        setPosition({index:index, itemPosition})
    }
    
    function setDeckItem (id: string) {
        updateDeck({position:selectedPosition.itemPosition as keyof Deck, value:id})
    }
    
    function deckSlotAttrFactory(index:number, deck:Deck, characterPosition:number) {
        return Object.assign({
            main:deck[`m${characterPosition}`],
            equipment:deck[`e${characterPosition}`],
            soul:deck[`s${characterPosition}`],
            unison:deck[`u${characterPosition}`],
        }, props?.type === "register"? {
            onMainClick:()=>{openCharacterModal(); setSelectedImagePosition(index, `m${characterPosition}`)},
            onUnisonClick:()=> {openCharacterModal(); setSelectedImagePosition(index, `u${characterPosition}`)},
            onSoulClick:()=> {openItemModal(); setSelectedImagePosition(index, `s${characterPosition}`)},
            onEquipmentClick:()=> {openItemModal(); setSelectedImagePosition(index, `e${characterPosition}`)},
        }:null)
    }
    
    if(props.type === "inquiry") {
        const {decks, error, isLoading} = useDeck(category.currentLargeCategory, category.currentMediumCategory, category.currentSmallCategory)
        if(error) {
            return <></>
        }
        if(isLoading) {
            return <></>
        }
        return (
            <div>{
                decks.map((deck, idx) =>{
                    return (<ul key={idx} className={styles.deck}>
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
                    )
                })
            }</div>
        )
    } else if(props.type === "register") {
        const {deck} = useDeckStore();
        return (<><ul className={styles.deck}>
            <li>
                <DeckSlot {...deckSlotAttrFactory(0, deck, 1)}></DeckSlot>
            </li>
            <li>
                <DeckSlot {...deckSlotAttrFactory(0, deck, 2)}></DeckSlot>
            </li>
            <li>
                <DeckSlot {...deckSlotAttrFactory(0, deck, 3)}></DeckSlot>
            </li>
        </ul>
        <Modal type="characters" visible={characterModalVisible} closeModalHandler={()=>{closeCharacterModal()}} onImageClick={id => {setDeckItem(id); closeCharacterModal();}}></Modal>
        <Modal type="items" visible={itemModalVisible} closeModalHandler={()=>{closeItemModal()}} onImageClick={id => {setDeckItem(id); closeItemModal();}}></Modal>
        </>)
    }
}

function DeckSlot(props: DeckSlotType) {
    return (<div className={styles.deckSlot}>
        <div className={styles.main} {...{ onClick: props.onMainClick}}>
            {props.main && <Image src={`/characters/${props.main}.png`} width="100" height="100" alt="" className={styles.image} />}
        </div>
        <div className={styles.equipment} {...{ onClick: props.onEquipmentClick}}>
            {props.equipment && <Image src={`/items/${props.equipment}.png`} width="100" height="100" alt="" className={styles.image} style={{imageRendering:"pixelated"}}/>}
        </div>
        <div className={styles.soul}  {...{ onClick: props.onSoulClick}}>
             {props.soul && <Image src={`/items/${props.soul}.png`} width="100" height="100" alt="" className={styles.image}  style={{imageRendering:"pixelated"}}/>}
        </div>
        <div className={styles.unison}  {...{ onClick: props.onUnisonClick}}>
             {props.unison && <Image src={`/characters/${props.unison}.png`} width="100" height="100" alt="" className={styles.image} />}
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