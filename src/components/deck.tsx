import { Component, ReactNode, useState, useEffect } from 'react';
import styles from './deck.module.scss';

function Deck(props:{decks:DeckType[], type?:string}) {
    var deckList = props.decks.map((deck, idx) => {
        return (
            <ul key={idx} className={styles.deck}>
                <li>
                    <DeckSlot main={deck.m1} unison={deck.u1} equipment={deck.e1} soul={deck.s1}></DeckSlot>
                </li>
                <li>
                    <DeckSlot main={deck.m2} unison={deck.u2} equipment={deck.e2} soul={deck.s2}></DeckSlot>
                </li>
                <li>
                    <DeckSlot main={deck.m3} unison={deck.u3} equipment={deck.e3} soul={deck.s3}></DeckSlot>
                </li>
            </ul>)
    });
    return (
        <div>
            {deckList}
        </div>
    )
}
function DeckSlot (props:DeckSlotType) {
    return (<div className={styles.deckSlot}>
        <div className={styles.main}><div className={styles.image}>{props.main}</div></div>
        <div className={styles.equipment}><div className={styles.image}>{props.equipment}</div></div>
        <div className={styles.soul}><div className={styles.image}>{props.soul}</div></div>
        <div className={styles.unison}><div className={styles.image}>{props.unison}</div></div>
    </div>);
}

type DeckSlotType =  {
    main?: string,
    unison?: string,
    equipment?: string,
    soul?: string,
}

type DeckType =  {
    m1?: string,
    m2?: string,
    m3?: string,
    u1?: string,
    u2?: string,
    u3?: string,
    e1?: string,
    e2?: string,
    e3?: string,
    s1?: string,
    s2?: string,
    s3?: string,
}

export default Deck