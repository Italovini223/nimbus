import { api } from "../services/api";
import {useEffect, useState} from "react";

type ProductsType = {
    id: number;
    name: string;
    price: number;
    stock: number;
};

export const Produtos = () => {

    const [products, setProducts] = useState<ProductsType[]>([]);

    const fetchData = async () => {
        try {
        const {data} = await api.get(
            "/Produtos?empresa_loja_id=12",
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }
        );
            console.log(data);
            setProducts(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Produtos:</h1>
            <ul>
                {
                    products.map((product) => (
                        <li key={product.id}>{product.name}</li>
                    ))
                }
            </ul>
        </div>
    )

};

