import { MouseEvent } from "react";
import styles from './typeSelectBar.module.scss'

export default function TypeSelectBar(props: { onClick: (event: MouseEvent, type: string) => void, selectedElements:TypeSelected}) {
  return <ul className={styles.typeList}>
    <li {...(props.selectedElements[0] === true && {className:styles.selected})}><img src="/types/0.png" alt="" onClick={(e) => { props.onClick(e, "0") }} /></li>
    <li {...(props.selectedElements[1] === true && {className:styles.selected})}><img src="/types/1.png" alt="" onClick={(e) => { props.onClick(e, "1") }} /></li>
    <li {...(props.selectedElements[2] === true && {className:styles.selected})}><img src="/types/2.png" alt="" onClick={(e) => { props.onClick(e, "2") }} /></li>
    <li {...(props.selectedElements[3] === true && {className:styles.selected})}><img src="/types/3.png" alt="" onClick={(e) => { props.onClick(e, "3") }} /></li>
    <li {...(props.selectedElements[4] === true && {className:styles.selected})}><img src="/types/4.png" alt="" onClick={(e) => { props.onClick(e, "4") }} /></li>
    <li {...(props.selectedElements[5] === true && {className:styles.selected})}><img src="/types/5.png" alt="" onClick={(e) => { props.onClick(e, "5") }} /></li>
    {(props.selectedElements[6] !== undefined) && <li {...(props.selectedElements[6] === true && {className:styles.selected})}><img src="/types/6.png" alt="" onClick={(e) => { props.onClick(e, "6") }} /></li>}
  </ul>
}

export type TypeSelected = {
  "0": boolean,
  "1": boolean,
  "2": boolean,
  "3": boolean,
  "4": boolean,
  "5": boolean,
  "6"?: boolean
}