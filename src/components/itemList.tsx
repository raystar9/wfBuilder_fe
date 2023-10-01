import { MouseEvent, useContext, useEffect } from "react"
//import { CharactersContext } from "@/context/context";
import Image from "next/image";
import { wfContext } from "@/context/context";

export default function ItemList(props: { onItemClick?:(id:string) => void, option?: FilterOption }) {
    const items = useContext(wfContext.getItemContext());
    
    if (props.option?.type) {
        return (<>
            {
                items.filter((item) => { return props.option?.type === item.type })
                    .map((item, idx) => 
                        <Image loading="eager" key={idx} src={`/items/${item.id}.png`} width={64} height={64} alt="" style={{imageRendering:"pixelated"}}/>
                )
            }
        </>)
    } else {
        return (<>
            {items.map((item, idx) =>
                <Image loading="eager" key={idx} id={`i-image-${item.id}`} src={`/items/${item.id}.png`} width={40} height={40} alt="" onClick={e => {props.onItemClick? props.onItemClick((e.target as HTMLImageElement).id.substring(8)): null}} style={{imageRendering:"pixelated"}}/>
            )}
        </>)
    }
}

type FilterOption = {
    type?:string
}