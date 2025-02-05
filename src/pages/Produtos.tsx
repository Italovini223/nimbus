import { api } from "../services/api";
import { useEffect, useState } from "react";
import { ProductsType } from "../dtos/productDto";

import { useNavigate } from "react-router-dom";

export const Produtos = () => {
    const [products, setProducts] = useState<ProductsType[]>([]);
    const navigate = useNavigate();


    function handleGoToDetails(id: number) {
        navigate(`/details/${id}`, );
    }

    const fetchData = async () => {
        try {
            const { data } = await api.get(
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
                        <li key={product.hub_dados_produto_id}>
                            <button onClick={() => handleGoToDetails(product.hub_dados_produto_id)}>
                                {product.hub_dados_produto_titulo}
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};