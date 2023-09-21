import { Component, ReactNode, useContext, useState, useReducer } from "react";
import { Code } from "@/pages/code";
import { CategoriesContext } from "@/context/context";
import { useCategoryStore } from "./deckCategory.module";

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
    const categoryContext = useContext(CategoriesContext);
    //const [categories] = useState(categoryContext);
    // const [selectedCategory, dispatch] = useReducer(reducer, {
    //     L_CATEGORY: "01",
    //     M_CATEGORY: "0101",
    //     S_CATEGORY: "010101",
    // });
    const {selectedCategory, storeLCategory, storeMCategory} = useCategoryStore();

    const LCategory = (<>
        <select name="" id="" onChange={event => { storeLCategory(event.target.value) }} value={selectedCategory.lCategory}>
            <option key="0" value=""></option>
            {
                categoryContext.lCategories.map((item: Code, idx: number) => {
                    return (
                        <option key={idx + 1} value={item.key}>{item.name}</option>
                    )
                })
            }
        </select>
    </>)
    const MCategory = (<>
        <select name="" id="" onChange={event => { storeMCategory(event.target.value)}} value={selectedCategory.mCategory}>
            <option key="0" value="" ></option>
            {
                categoryContext.mCategories.filter(item => { return item.relKey == selectedCategory.lCategory }).map((item: Code, idx: number) => {
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
                categoryContext.sCategories.filter(item => { return item.relKey == selectedCategory.mCategory }).map((item: Code, idx: number) => {
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