import { MouseEvent, useContext, useEffect } from "react"
//import { CharactersContext } from "@/context/context";
import Image from "next/image";
import { Item, wfContext } from "@/context/context";
import styles from './itemList.module.scss';
import { TypeSelected } from "./typeSelectBar";
import { RaritySelected } from "./raritySelectBar";

export default function ItemList(props: { onItemClick?: (id: string) => void, selectedElements: TypeSelected, selectedRarity: RaritySelected }) {
  const items = useContext(wfContext.getItemContext());
  const _selectedElements: string[] = []
  for (var i in props.selectedElements) {
    if (props.selectedElements[i] == true)
      _selectedElements.push(i);
  }
  if (_selectedElements.length == 0) {
    _selectedElements.push(...["0", "1", "2", "3", "4", "5", "6"])
  }
  const _selectedRarity: string[] = [];
  for (var i in props.selectedRarity) {
    if (props.selectedRarity[i] == true)
    _selectedRarity.push(i);
  }
  if (_selectedRarity.length == 0) {
      _selectedRarity.push(...["5", "4", "3", "2", "1"])
  }

  const _items = items.filter((item) => {
      for(let i in _selectedElements) {
          if(_selectedElements[i] === item.type) break;
          if(_selectedElements.length - 1 == +i) {
              return false;
          }
      }
      for(let i in _selectedRarity) {
          if(_selectedRarity[i] === item.stars) break;
          if(_selectedRarity.length - 1 == +i) {
              return false;
          }
      }
      return item;
  }).sort((item1, item2) => {
    return +item2.stars - +item1.stars || +item1.type- +item2.type || +item1.id - +item2.id

  })
  return _items.map((item, idx) => {
    return (
      <div key={item.id} className={`${styles.imageContainer} ${styles["star"+item.stars]}`} id={`i-image-${item.id}`} onClick={e => { props.onItemClick ? props.onItemClick((item.id)) : null }}>
        <img className={styles.image} src={`/items/${item.id}.png`} alt="" />
      </div>)
  })
}