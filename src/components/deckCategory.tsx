import { Component, ReactNode, useContext, useState, useReducer, useEffect } from "react";
import { CategoriesContext } from "@/context/context";
import { useCategoryStore, Code } from "@/stores/codeStore";

function reducer(state, action) {
    switch (action.type) {
        case "L_CATEGORY_ONCHANGE":
            return { ...state, L_CATEGORY: action.value };
        case "M_CATEGORY_ONCHANGE":
            return { ...state, M_CATEGORY: action.value };
        default:
            return state;
    }
}

export default function DeckCategory() {
    //const categoryContext = useContext(CategoriesContext);
    const categoryStore = useCategoryStore()
    debugger;
    useEffect(()=>{
        if(categoryStore.largeCategories) {
            categoryStore.selectCategories()
        }
    }, []);
    //const [categories] = useState(categoryContext);
    // const [selectedCategory, dispatch] = useReducer(reducer, {
    //     L_CATEGORY: "01",
    //     M_CATEGORY: "0101",
    //     S_CATEGORY: "010101",
    // });
    //const {selectedCategory, storeLCategory, storeMCategory} = useCategoryStore();
    

    const LCategory = (<>
        <select name="" id="" onChange={event => { categoryStore.setCurrentLargeCategory(event.target.value) }} value={categoryStore.currentLargeCategory}>
            <option key="0" value=""></option>
            {
                categoryStore.largeCategories.map((item: Code, idx: number) => {
                    return (
                        <option key={idx + 1} value={item.key}>{item.name}</option>
                    )
                })
            }
        </select>
    </>)
    const MCategory = (<>
        <select name="" id="" onChange={event => { categoryStore.setCurrentMediumCategory(event.target.value)}} value={categoryStore.currentMediumCategory}>
            <option key="0" value="" ></option>
            {
                categoryStore.mediumCategories.filter(item => { return item.relKey == categoryStore.currentLargeCategory }).map((item: Code, idx: number) => {
                    return (
                        <option key={idx + 1} value={item.key}>{item.name}</option>
                    )
                })
            }
        </select>
    </>)

    const SCategory = (<>
        <select name="" id="" /*value={selectedCategory.sCategory}*/>
            <option key="0" value=""></option>
            {
                categoryStore.smallCategories.filter(item => { return item.relKey == categoryStore.currentMediumCategory }).map((item: Code, idx: number) => {
                    return (
                        <option key={idx + 1} value={item.key}>{item.name}</option>
                    )
                })
            }
        </select>
    </>)
    return (<>
        {LCategory}
        {MCategory}
        {SCategory}
    </>);
}