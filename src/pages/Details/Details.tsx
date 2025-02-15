import { api } from "../../services/api";
import {Key, useEffect, useState} from "react";
import { ProductsType } from "../../dtos/productDto";
import { useParams } from "react-router-dom";
import { Box, Input, Button, Text, Chip, Card, Label, Title} from "@nimbus-ds/components";
import { Page, Layout, FormField } from "@nimbus-ds/patterns";
// import { TiendanubeIcon } from "@nimbus-ds/icons";
import {formatMetadata} from "../../utils/formatMetadata";
import DescriptionPRO from "./Description";

type routeDataPros = {
    id: string;
}

export function Details() {
    const [products, setProducts] = useState<ProductsType[]>([]);
    const { id } = useParams<routeDataPros>();

    const formattedMetadata = products.map(product => formatMetadata(product.hub_dados_produto_metadados)).filter(meta => meta !== null);
    
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

    const stripHtml = (html: string) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
      };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Page maxWidth="800px">
                <Page.Header title="Detalhes do produto"  />
                <Page.Body>
                    <Layout columns="1">
                    <Layout.Section>
                        <Card>
                        <Card.Header title={`Informações do produto ${id}`  } />
                        <Card.Body>
                            <Box
                                display="flex"
                                flexDirection="column"
                                gap="4"
                            >
                            <FormField.Input
                                label="Nome do produto"
                                crossOrigin=""
                                disabled
                                value={products[0]?.hub_dados_produto_titulo}
                            />
                            <FormField.Textarea
                                id="multiline-input"
                                label="Descrição do produto"
                                lines={5}
                                crossOrigin=""
                                disabled
                                value={stripHtml(products[0]?.hub_dados_produto_descricao || "")}
                            />
                            </Box>
                        </Card.Body>
                        </Card>
                        <DescriptionPRO />
                    </Layout.Section>
                    </Layout>
                </Page.Body>
            </Page>
        </div>
    )

};

