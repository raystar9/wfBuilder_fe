import { MouseEvent } from "react";
import styles from './raritySelectBar.module.scss'

export default function RaritySelectBar(props: { onClick: (event: MouseEvent, type: string) => void, selectedRarity:RaritySelected}) {
  return <ul className={styles.typeList}>
    {/* <li {...(props.selectedElements[1] === true && {className:styles.selected})}><img src="/types/1.png" alt="" onClick={(e) => { props.onClick(e, "1") }} /></li>
    <li {...(props.selectedElements[2] === true && {className:styles.selected})}><img src="/types/2.png" alt="" onClick={(e) => { props.onClick(e, "2") }} /></li>
    <li {...(props.selectedElements[3] === true && {className:styles.selected})}><img src="/types/3.png" alt="" onClick={(e) => { props.onClick(e, "3") }} /></li>
    <li {...(props.selectedElements[4] === true && {className:styles.selected})}><img src="/types/4.png" alt="" onClick={(e) => { props.onClick(e, "4") }} /></li>
    <li {...(props.selectedElements[5] === true && {className:styles.selected})}><img src="/types/5.png" alt="" onClick={(e) => { props.onClick(e, "5") }} /></li> */}
    <li {...(props.selectedRarity[5] === true && {className:styles.selected})} onClick={(e) => { props.onClick(e, "5") }}>5★</li>
    <li {...(props.selectedRarity[4] === true && {className:styles.selected})} onClick={(e) => { props.onClick(e, "4") }}>4★</li>
    <li {...(props.selectedRarity[3] === true && {className:styles.selected})} onClick={(e) => { props.onClick(e, "3") }}>3★</li>
    <li {...(props.selectedRarity[2] === true && {className:styles.selected})} onClick={(e) => { props.onClick(e, "2") }}>2★</li>
    <li {...(props.selectedRarity[1] === true && {className:styles.selected})} onClick={(e) => { props.onClick(e, "1") }}>1★</li>
  </ul>
}

export type RaritySelected = {
  "5": boolean
  "4": boolean,
  "3": boolean,
  "2": boolean,
  "1": boolean,
}