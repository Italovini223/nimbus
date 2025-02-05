import { api } from "../services/api";
import {useEffect, useState} from "react";
import { ProductsType } from "../dtos/productDto";
import { useParams } from "react-router-dom";

type routeDataPros = {
    id: string;
}

export function Details() {
    const [products, setProducts] = useState<ProductsType[]>([]);
    const { id } = useParams<routeDataPros>();


    
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
           const filterdData = data.filter((product: ProductsType) => product.hub_dados_produto_id === Number(id));
            setProducts(filterdData);
            console.log(id);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Produto:</h1>
            <ul>
                {
                    products.map((product) => (
                        <li key={product.hub_dados_produto_id}>
                            <h1>{product.hub_dados_produto_titulo}</h1>
                            <textarea>
                                {product.hub_dados_produto_descricao}

                            </textarea>
                        </li>
                    ))
                }
            </ul>
        </div>
    )

};

