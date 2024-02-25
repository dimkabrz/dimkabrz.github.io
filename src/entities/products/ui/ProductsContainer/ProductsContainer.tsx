import {Button} from "../../../../shared/ui/Button";
import {ProductsTable} from "../ProductsTable";
import './ProductsContainer.css'
import {useContext, useState} from "react";
import {ProductsContext} from "../../../../app/App.tsx";
import {Params} from "../../api";


export const ProductsContainer = () => {

    const context = useContext(ProductsContext);

    const [params, setParams] = useState<Params>({});

    const isFiltered = Object.values(params)[0]

    const loadingStatus = context.loading;

    const reloadFilter = () => {
        setParams({});
        context.reloadData()
    }
    return (
        <div className={'products_container'}>
            {loadingStatus && <div className={'shadow'}></div>}
            <div className={'paginate_panel'}>
                <div className={`${isFiltered && 'disable_paginate'}`}>
                    <Button
                        disabled={context.offsetLength === 0}
                        onClick={context.requestPrevPage}
                    >{'<='}
                    </Button>
                    <Button
                        onClick={context.requestNextPage}
                    >{'=>'}
                    </Button>
                </div>
                <Button onClick={reloadFilter}>Сбросить фильтры</Button>
            </div>
            <ProductsTable params={params} setParams={setParams}/>
        </div>
    );
};

