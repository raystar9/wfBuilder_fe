import { useContext } from "react"
import { CharactersContext } from "@/context/context";
import Image from "next/image";

export default function CharacterList(props: { option?: FilterOption }) {
    const charactersContext = useContext(CharactersContext);

    if (props.option?.type) {
        return (<>
            {charactersContext.map((item, idx) =>
                <Image src={"/" + item.id + ".png"} width={100} height={100} alt=""/>
            )}
        </>)
    } else {
        return (<>
            {
                charactersContext.filter((item) => { return props.option?.type === item.type })
                    .map((item, idx) => 
                        <Image key={idx} src={"/" + item.id + ".png"} width={100} height={100} alt=""/>
                )
            }
        </>)
    }
}

type FilterOption = {
    type?:string
}