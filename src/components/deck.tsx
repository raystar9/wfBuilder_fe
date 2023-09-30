import { Component, ReactNode, useState, useEffect, useReducer, MouseEvent} from 'react';
import styles from './deck.module.scss';
import Image from 'next/image';
import Modal from './modal';
import { DeckType, useDeckStore } from './deck.module';

function Deck(props: { type?: string, deck?:DeckType, deckChangeHandler?: () => void, onRegisterComplete?:()=>void}) {
    // Constructor
    useEffect(() => {
        if(props.type === "register") {
            setDeck([{}]);
        } else if(props.type === "update" && props.deck) {
            setDeck([props.deck]);
        } else if(props.type === "inquiry") {
            setDeck([]);
        }
    }, [])

    const {decks, setDeck, inquiryDecks, updateDeck, registerDeck} = useDeckStore();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPosition, setPosition] = useState({ index:0, itemPosition: "e1"});

    function openModal() {
        setModalVisible(true);
    }
    function closeModal() {
        setModalVisible(false);
    }

    function setSelectedImagePosition(index:number, itemPosition: string) {
        setPosition({index:index, itemPosition})
    }

    function setCharacter (id: string) {
        updateDeck({index:selectedPosition.index, position:selectedPosition.itemPosition as keyof DeckType, value:id})
    }

    function deckSlotAttrFactory(index:number, deck:DeckType, characterPosition:number) {
        return Object.assign({
            main:deck[`m${characterPosition}`],
            equipment:deck[`e${characterPosition}`],
            soul:deck[`s${characterPosition}`],
            unison:deck[`u${characterPosition}`],
        }, props?.type === "register"? {
            onMainClick:()=>{openModal(); setSelectedImagePosition(index, `m${characterPosition}`)},
            onUnisonClick:()=> {openModal(); setSelectedImagePosition(index, `u${characterPosition}`)},
            onSoulClick:()=> {openModal(); setSelectedImagePosition(index, `s${characterPosition}`)},
            onEquipmentClick:()=> {openModal(); setSelectedImagePosition(index, `e${characterPosition}`)},
        }:null)
    }

    return (
        <div>
            {
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
            })}
            {props.type === "register" && (<>
            <Modal visible={modalVisible} closeModalHandler={()=>{closeModal()}} onImageClick={id => {setCharacter(id); closeModal();}}></Modal>
            </>
            )
            }
        </div>
    )
}

function DeckSlot(props: DeckSlotType) {
    return (<div className={styles.deckSlot}>
        <div className={styles.main} {...{ onClick: props.onMainClick}}>
            {props.main && <Image src={`/${props.main}.png`} width="100" height="100" alt="" className={styles.image} />}
        </div>
        <div className={styles.equipment} {...{ onClick: props.onEquipmentClick}}>
            {props.equipment && <Image src={`/${props.equipment}.png`} width="100" height="100" alt="" className={styles.image} />}
        </div>
        <div className={styles.soul}  {...{ onClick: props.onSoulClick}}>
             {props.soul && <Image src={`/${props.soul}.png`} width="100" height="100" alt="" className={styles.image} />}
        </div>
        <div className={styles.unison}  {...{ onClick: props.onUnisonClick}}>
             {props.unison && <Image src={`/${props.unison}.png`} width="100" height="100" alt="" className={styles.image} />}
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

export default Deck