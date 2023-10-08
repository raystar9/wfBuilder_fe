import { MouseEvent, ChangeEvent, useContext } from "react";
import { useCategoryStore} from "@/stores/categoryStore";
import { wfContext, Code} from "@/context/context";

export default function DeckCategory(props:{onLargeCategoryChange?:(newCategory:string) => void, onMediumCategoryChange?:(newCategory:string) => void}) {
    const categoryStore = useCategoryStore()
    const categories = useContext(wfContext.getCategoryContext());

    const LCategory = (<>
        <select name="" id="" onChange={
            event => { 
                categoryStore.setCurrentLargeCategory(event.target.value); 
                props.onLargeCategoryChange?props.onLargeCategoryChange(event.target.value):null;
            }} 
            value={categoryStore.currentLargeCategory}>
            <option key="0" value=""></option>
            {
                categories.largeCategories.map((item: Code, idx: number) => {
                    return (
                        <option key={idx + 1} value={item.key}>{item.name}</option>
                    )
                })
            }
        </select>
    </>)
    const MCategory = (<>
        <select name="" id="" 
            onChange={event => { 
                categoryStore.setCurrentMediumCategory(event.target.value);
                props.onMediumCategoryChange?props.onMediumCategoryChange(event.target.value):null;
            }}
            value={categoryStore.currentMediumCategory}
            style={{minWidth:"100px"}}
        >
            <option key="0" value="" ></option>
            {
                categories.mediumCategories.filter(item => { return item.relKey == categoryStore.currentLargeCategory }).map((item: Code, idx: number) => {
                    return (
                        <option key={idx + 1} value={item.key}>{item.name}</option>
                    )
                })
            }
        </select>
    </>)

    // const SCategory = (<>
    //     <select name="" id="" /*value={selectedCategory.sCategory}*/>
    //         <option key="0" value=""></option>
    //         {
    //             categories.smallCategories.filter(item => { return item.relKey == categoryStore.currentMediumCategory }).map((item: Code, idx: number) => {
    //                 return (
    //                     <option key={idx + 1} value={item.key}>{item.name}</option>
    //                 )
    //             })
    //         }
    //     </select>
    // </>)
    return (<div style={{"display":"inline-block"}}>
        {LCategory}
        {MCategory}
        {/* {SCategory} */}
    </div>);
}