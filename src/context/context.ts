import {createContext} from 'react';

const CategoriesContext = createContext({
    lCategories: [
        { codeKind: "L_CATEGORY", key: "01", name: "test" },
        { codeKind: "L_CATEGORY", key: "02", name: "testA" },
        { codeKind: "L_CATEGORY", key: "03", name: "testB" },
        { codeKind: "L_CATEGORY", key: "04", name: "testC" },
        { codeKind: "L_CATEGORY", key: "05", name: "testD" },
    ],
    mCategories: [
        { codeKind: "M_CATEGORY", key: "0101", relKey: "01", name: "01test" },
        { codeKind: "M_CATEGORY", key: "0102", relKey: "01", name: "01testA" },
        { codeKind: "M_CATEGORY", key: "0103", relKey: "01", name: "01testB" },
        { codeKind: "M_CATEGORY", key: "0104", relKey: "01", name: "01testC" },
        { codeKind: "M_CATEGORY", key: "0105", relKey: "01", name: "01testD" },
        { codeKind: "M_CATEGORY", key: "0101", relKey: "02", name: "02test" },
        { codeKind: "M_CATEGORY", key: "0102", relKey: "02", name: "02testA" },
        { codeKind: "M_CATEGORY", key: "0103", relKey: "02", name: "02testB" },
        { codeKind: "M_CATEGORY", key: "0104", relKey: "02", name: "02testC" },
        { codeKind: "M_CATEGORY", key: "0105", relKey: "02", name: "02testD" },
    ],
    sCategories: [
        { codeKind: "S_CATEGORY", key: "010101", relKey: "0101", name: "0101test" },
        { codeKind: "S_CATEGORY", key: "010102", relKey: "0101", name: "0101testA" },
        { codeKind: "S_CATEGORY", key: "010103", relKey: "0101", name: "0101testB" },
        { codeKind: "S_CATEGORY", key: "010104", relKey: "0101", name: "0101testC" },
        { codeKind: "S_CATEGORY", key: "010105", relKey: "0101", name: "0101testD" },
    ]})
export {CategoriesContext};