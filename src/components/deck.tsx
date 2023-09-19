import {Component, ReactNode} from "react";
import axios from 'axios';
import styles from './deck.module.scss';


export default class Deck extends Component<DeckProps, {"decks":DeckState[]}> {

    constructor(readonly props: {}) {
        super(props);
        this.state = {
            "decks": [
                {m1: "10", m2: "101", m3: "102", u1: "103", u2: "104", u3: "105", e1: "106", e2: "107", e3: "108", s1: "109", s2: "110", s3: "111", }, 
                { m1: "10", m2: "101", m3: "102", u1: "103", u2: "104", u3: "105", e1: "106", e2: "107", e3: "108", s1: "109", s2: "110", s3: "111", }
            ]
        }
    }
    async componentDidMount(): Promise<void> {
        //const res = await (axios.get("http://127.0.0.1:3000/rest/decks/1"))
        //console.log(res);
    }
    render(): ReactNode {
        var deckList = this.state.decks.map( (deck, idx) => {
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
        );
    }
}

class DeckSlot extends Component {
    constructor(readonly props: {
        main?:string, 
        unison?:string, 
        equipment?:string, 
        soul?:string,
    }){
        super(props);

    }

    render(): ReactNode {
        return (<div className={styles.deckSlot}>
            <div className={styles.main}><div className={styles.image}>{this.props.main}</div></div>
            <div className={styles.equipment}><div className={styles.image}>{this.props.equipment}</div></div>
            <div className={styles.soul}><div className={styles.image}>{this.props.soul}</div></div>
            <div className={styles.unison}><div className={styles.image}>{this.props.unison}</div></div>
            </div>);
    }
}

interface DeckProps{

}

interface DeckState {
    m1?:string,
    m2?:string,
    m3?:string,
    u1?:string,
    u2?:string,
    u3?:string,
    e1?:string,
    e2?:string,
    e3?:string,
    s1?:string,
    s2?:string,
    s3?:string,
}