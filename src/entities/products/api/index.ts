import axios from "axios";
import md5 from "md5-ts";
import {ID} from "../../../app/App.tsx";


export type Params = Partial<Record<'brand' | 'price' | 'product' | 'id', string | number>>;
type FieldsParams = {
    field: 'brand' | 'price',
    offset: number,
    limit: number
}
export const createAuthHash = (date: Date) => {
    const password = 'Valantis';
    const getCurrentDate = (date: Date) => {
        const currentYear = date.getUTCFullYear();
        const actualMonth = date.getUTCMonth() + 1;
        const currentMonth = actualMonth > 9 ? `${actualMonth}` : `0${actualMonth}`;
        const actualDay = date.getUTCDate();
        const currentDay = actualDay > 9 ? actualDay : `0${actualDay}`;
        return `${currentYear}${currentMonth}${currentDay}`;
    }
    const timeStamp = getCurrentDate(date);

    return md5(`${password}_${timeStamp}`);
}
export const getIds = async (offset: number) => {
    const date = new Date();
    const authHash = createAuthHash(date);
    const response = await axios.post('https://api.valantis.store:41000', {
            "action": "get_ids",
            "params": {"offset": offset, "limit": 50}
        }, {
            headers: {
                'X-Auth': authHash
            }
        }
    );
    const data = response.data.result;
    const set = new Set(response.data.result);
    if (data.length > set.size) {
        const response = await axios.post('https://api.valantis.store:41000', {
                "action": "get_ids",
                "params": {"offset": 50, "limit": data.length - set.size}
            }, {
                headers: {
                    'X-Auth': authHash
                }
            }
        );
        return [...data, ...response.data.result]
    }
    return data
}

export const getProductsById = async (idsList: ID[]) => {
    const date = new Date();
    const authHash = createAuthHash(date);
    const response = await axios.post('https://api.valantis.store:41000', {
            "action": "get_items",
            "params": {"ids": idsList}
        }, {
            headers: {
                'X-Auth': authHash
            }
        }
    );
    return response.data.result
}
export const getFilteredIds = async (params: Params) => {
    const date = new Date();
    const authHash = createAuthHash(date);
    const response = await axios.post('https://api.valantis.store:41000', {
            "action": "filter",
            "params": params
        }, {
            headers: {
                'X-Auth': authHash
            }
        }
    );
    return response.data.result
}

export const getFields = async (params: FieldsParams) => {
    const date = new Date();
    const authHash = createAuthHash(date);
    const response = await axios.post('https://api.valantis.store:41000', {
            "action": "get_fields",
            "params": params
        }, {
            headers: {
                'X-Auth': authHash
            }
        }
    );
    return response.data.result
}