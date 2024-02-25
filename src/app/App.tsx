import './App.css'
import {ProductsContainer} from "../entities/products/ui/ProductsContainer";
import {useGetProducts} from "../entities/products/model";
import {createContext} from "react";
import {Params} from "../entities/products/api";


export type Product = {
    brand: null | string,
    id: string,
    price: number,
    product: string
}

export type ID = string;

export const ProductsContext = createContext<{
    products: Product[],
    offsetLength: number,
    requestPrevPage: () => void,
    requestNextPage: () => void,
    loading: boolean,
    filterData: (value: Params) => void,
    reloadData: () => void
}>({
    products: [], offsetLength: 0, requestNextPage: () => {
    }, requestPrevPage: () => {
    }, loading: false, filterData: () => {
    }, reloadData: () => {
    }
})

function App() {

    const value = useGetProducts();

    return (
        <ProductsContext.Provider value={value}>
            <ProductsContainer/>
        </ProductsContext.Provider>
    )
}

export default App
