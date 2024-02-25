import {getFilteredIds, getIds, getProductsById, Params} from "../api";
import {AxiosError} from "axios";
import {ID, Product} from "../../../app/App.tsx";
import {useEffect, useState} from "react";


const maxRetryAttempts = 3;
const retryDelay = 2000;
const getData = async (offset: number, retryAttempt = 0) => {

    try {
        const idsList = await getIds(offset);

        const uniqueIdsList = Array.from(new Set<ID>(idsList))

        const products = await getProductsById(uniqueIdsList);

        return products.reduce((acc: Product[], curr: Product) => {
            if (acc.length >= 50) {
                return acc;
            }

            const existingProduct = acc.find(product => product.id === curr.id);
            if (!existingProduct) {
                acc.push(curr);
            }
            return acc;
        }, [])

    } catch (e) {
        if (e && (e instanceof AxiosError)) {
            console.log(e.response?.data ? `Ошибка: ${e.response.data}` : 'Ошибка');
        }

        if (retryAttempt < maxRetryAttempts) {
            return new Promise((resolve) => {
                setTimeout(async () => {
                    resolve(await getData(offset, retryAttempt + 1))
                }, retryDelay);
            })
        } else {
            console.log('Exceeded maximum retry attempts. Aborting.');
            return []
        }
    }
}

const updateFilterData = async (params: Params, retryAttempt = 0) => {
    try {
        const filteredIDs = await getFilteredIds(params);

        const filteredProducts = await getProductsById(filteredIDs);

        return filteredProducts.reduce((acc: Product[], curr: Product) => {

            const existingProduct = acc.find(product => product.id === curr.id);
            if (!existingProduct) {
                acc.push(curr);
            }
            return acc;
        }, []);


    } catch (e) {
        if (e && (e instanceof AxiosError)) {
            console.log(e.response?.data ? `Ошибка: ${e.response.data}` : 'Ошибка');
        }

        if (retryAttempt < maxRetryAttempts) {
            return new Promise((resolve) => {
                setTimeout(async () => {
                    resolve(await updateFilterData(params, retryAttempt + 1))
                }, retryDelay);
            })
        } else {
            console.log('Exceeded maximum retry attempts. Aborting.');
            return []
        }
    }
}

export const useGetProducts = () => {
    const [offsetLength, setOffsetLength] = useState<number>(0);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        getData(offsetLength).then(data => {
            setProducts(data);
            setOffsetLength(products.length);
            setLoading(false)
        })
    }, [])
    const requestPrevPage = async () => {
        if (offsetLength < 50) {
            return
        }
        setLoading(true);
        const response = await getData(offsetLength - 50);
        setProducts(response);
        setOffsetLength(offsetLength - response.length);
        setLoading(false)
    }
    const requestNextPage = async () => {
        setLoading(true);
        const response = await getData(offsetLength + 50);
        setProducts(response);
        setOffsetLength(offsetLength + response.length);
        setLoading(false)
    }
    const filterData = async (params: Params) => {
        setLoading(true);
        const response = await updateFilterData(params);
        setProducts(response);
        setOffsetLength(0);
        setLoading(false);
    }
    const reloadData = async () => {
        setLoading(true)
        getData(0).then(data => {
            setProducts(data);
            setOffsetLength(0);
            setLoading(false)
        })
    }
    return {products, offsetLength, requestPrevPage, requestNextPage, loading, filterData, reloadData}
}














