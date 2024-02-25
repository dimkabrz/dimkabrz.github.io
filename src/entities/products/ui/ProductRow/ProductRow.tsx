import {Product} from "../../../../app/App.tsx";
type Props = {
    product: Product;
};
export const ProductRow = ({product}: Props) => {
    return (
        <tr>
            <td>
                <div>
                    {product.id}
                </div>

            </td>
            <td>
                <div>
                    {product.product}
                </div>

            </td>
            <td>
                <div>
                    {product.price}
                </div>

            </td>
            <td>
                <div>
                    {product.brand}
                </div>
            </td>
        </tr>
    );
};

