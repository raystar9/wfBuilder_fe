import { MouseEvent, useContext } from "react"
import { CharactersContext } from "@/context/context";
import Image from "next/image";

export default function CharacterList(props: { onCharacterClick?:(id:string) => void, option?: FilterOption }) {
    const charactersContext = useContext(CharactersContext);
    if (props.option?.type) {
        return (<>
            {
                charactersContext.filter((item) => { return props.option?.type === item.type })
                    .map((item, idx) => 
                        <Image key={idx} src={"/" + item.id + ".png"} width={100} height={100} alt=""/>
                )
            }
        </>)
    } else {
        return (<>
            {charactersContext.map((item, idx) =>
                <Image id={`c-image-${item.id}`} src={"/" + item.id + ".png"} width={100} height={100} alt="" onClick={e => {props.onCharacterClick? props.onCharacterClick((e.target as HTMLImageElement).id.substring(8)): null}}/>
            )}
        </>)
    }
}

type FilterOption = {
    type?:string
}