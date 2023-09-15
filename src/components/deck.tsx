import {Component, ReactNode} from "react";
import axios from 'axios';
import styles from './deck.module.scss';


export default class Deck extends Component<DeckProps, DeckState> {

    constructor(readonly props: {}) {
        super(props);
        this.state = { m1: "10", m2: "101", m3: "102", u1: "103", u2: "104", u3: "105", e1: "106", e2: "107", e3: "108", s1: "109", s2: "110", s3: "111", }
    }
    async componentDidMount(): Promise<void> {
        const res = await (axios.get("http://127.0.0.1:3000/rest/decks/1"))
        console.log(res);
    }
    render(): ReactNode {
        return (
        <div>
            <ul className={styles.deck}>
                <li>
                    <DeckSlot main={this.state.m1} unison={this.state.u1} equipment={this.state.e1} soul={this.state.s1}></DeckSlot>
                </li>
                <li>
                    <DeckSlot main={this.state.m2} unison={this.state.u2} equipment={this.state.e2} soul={this.state.s2}></DeckSlot>
                </li>
                <li>
                    <DeckSlot main={this.state.m3} unison={this.state.u3} equipment={this.state.e3} soul={this.state.s3}></DeckSlot>
                </li>
            </ul>
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
            <div className={styles.main}>{this.props.main}</div>
            <div className={styles.unison}>{this.props.unison}</div>
            <div className={styles.equipment}>{this.props.equipment}</div>
            <div className={styles.soul}>{this.props.soul}</div>
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