import { MouseEvent, useContext, useEffect } from "react"
//import { CharactersContext } from "@/context/context";
import Image from "next/image";
import { Item, wfContext } from "@/context/context";
import styles from './itemList.module.scss';

export default function ItemList(props: { onItemClick?:(id:string) => void, option?: FilterOption }) {
    const items = useContext(wfContext.getItemContext());
    return <ItemBody items={items} onItemClick={props.onItemClick}></ItemBody>
}

function ItemBody(props: {items:Item[], onItemClick?:(id:string) => void, option?: FilterOption }) {
    if (props.option?.type) {
        return (<>
            {
                props.items.filter((item) => { return props.option?.type === item.type })
                    .map((item, idx) => (
                        <EachItem item={item} key={idx} onItemClick={props.onItemClick}></EachItem>
                        )
                    )
            }
        </>)
    } else {
        return (<>
            {props.items.map((item, idx) =>
                <EachItem item={item} key={idx} onItemClick={props.onItemClick}></EachItem>
            )}
        </>)
    }
}

function EachItem(props:{item:Item, onItemClick?:(id:string) => void}) {
    return (<>
        <div className={styles.imageContainer} id={`i-image-${props.item.id}`} onClick={e => {props.onItemClick? props.onItemClick((props.item.id)): null}}>
            <img className={styles.image} src={`/items/${props.item.id}.png`} alt=""/>
        </div>
    </>)
}

type FilterOption = {
    type?:string
}