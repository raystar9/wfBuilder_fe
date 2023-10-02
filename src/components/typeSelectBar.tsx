import { MouseEvent } from "react";
import styles from './typeSelectBar.module.scss'

export default function TypeSelectBar(props:{onClick:(event:MouseEvent, type:string) => void}) {
  return <ul className={styles.typeList}>
    <li><img src="/types/0.png" alt="" onClick={(e) => {props.onClick(e, "0")}}/></li>
    <li><img src="/types/1.png" alt="" onClick={(e) => {props.onClick(e, "1")}} /></li>
    <li><img src="/types/2.png" alt="" onClick={(e) => {props.onClick(e, "2")}} /></li>
    <li><img src="/types/3.png" alt="" onClick={(e) => {props.onClick(e, "3")}} /></li>
    <li><img src="/types/4.png" alt="" onClick={(e) => {props.onClick(e, "4")}} /></li>
    <li><img src="/types/5.png" alt="" onClick={(e) => {props.onClick(e, "5")}} /></li>
  </ul>
}