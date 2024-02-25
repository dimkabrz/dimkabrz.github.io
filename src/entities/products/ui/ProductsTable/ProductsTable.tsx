import {ProductsContext} from "../../../../app/App.tsx";
import {ProductRow} from "../ProductRow";
import './ProductsTable.css'
import {SetStateAction, useContext, useEffect, useRef, useState} from "react";
import {getFields, Params} from "../../api";

type Props = {
    params:Params
    setParams:(value:SetStateAction<Params>) => void
}

export const ProductsTable = ({params, setParams}: Props) => {
    const [brands, setBrands] = useState<string[]>([]);
    const [prices, setPrices] = useState<number[]>([]);


    const context = useContext(ProductsContext);

    const setFilteredBrand = (value:string) => {
        if(value === ''){
            setParams({})
            return
        }
        setParams({brand:value});
        context.filterData({brand:value})
    }

    const setFilteredPrice = (value:number) => {
        if(value === 0){
            setParams({})
            return
        }
        setParams({price:value});
        context.filterData({price:value})
    }



    const refTypingTimer = useRef<number>()
    const debounce = (value:string) => {
        if(value === ''){
            setParams({})
            return
        }
        setParams({product:value});
        clearTimeout(refTypingTimer.current);
        refTypingTimer.current = setTimeout(() => {
            context.filterData({product:value})
        }, 1000);
    }

    useEffect(() => {
       getFields({
            field: 'brand',
            offset: 0,
            limit: 10000
        }).then(data => {
            setBrands(Array.from(new Set(data.filter(Boolean))))
        })
        getFields({
            field: 'price',
            offset: 0,
            limit: 10000
        }).then(data => {
            setPrices(Array.from(new Set(data)))
        })
    }, [])
    return (
        <table>
            <thead>
            <tr>
                <th>id</th>
                <th>
                    <input
                        value={params.product ?? ''}
                        placeholder={'Название'}
                        className="filter_select"
                        onChange={(e) => debounce(e.target.value)}
                    />
                </th>
                <th>
                    <select value={params.price ?? ''} onChange={(e) => setFilteredPrice(+e.target.value)}>
                        <option value=''>Цена</option>
                        {prices.map(price => <option key={price} value={price}>{price}</option>)}
                    </select>
                </th>
                <th>
                    <select value={params.brand ?? ''} onChange={(e) => setFilteredBrand(e.target.value)}>
                        <option value=''>Бренд</option>
                        {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                    </select>
                </th>
            </tr>
            </thead>
            <tbody>
            {context.products.map(product => <ProductRow key={product.id} product={product}/>)}
            {context.products.length === 0 && 'Нет данных о запрашиваемых продуктах'}
            </tbody>
        </table>
    );
};

