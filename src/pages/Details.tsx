import { api } from "../services/api";
import {Key, useEffect, useState} from "react";
import { ProductsType } from "../dtos/productDto";
import { useParams } from "react-router-dom";
import { Box, Input, Button, Text, Chip, Icon, Tag, Card, Checkbox, Label, Tooltip, Link, Select, Title} from "@nimbus-ds/components";
import { Page, Layout, FormField, InteractiveList  } from "@nimbus-ds/patterns";
import { TiendanubeIcon } from "@nimbus-ds/icons";
import {formatMetadata} from "../utils/formatMetadata";

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
                                value={products[0]?.hub_dados_produto_descricao}
                            />
                            </Box>
                        </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header title="Imagens do produto" />
                            <Card.Body>
                                <Box
                                display="flex"
                                flexDirection="column"
                                gap="4"
                                >
                                <Box
                                    display="flex"
                                    flexWrap="wrap"
                                    gap="4"
                                >
                                    {formattedMetadata[0]?.images?.map((image: { src: string }, index: Key) => (
                                        <Box key={index} width="auto">
                                            <img src={image.src} alt="imagem do produto" style={{maxWidth: "100px"}} />
                                        </Box>
                                    ))}
                                </Box>
                                </Box>
                            </Card.Body>
                        </Card>
                        <Card>
                        <Card.Header title="Preço do produto" />
                        <Card.Body>
                            <Box
                            display="flex"
                            flexDirection="column"
                            gap="4"
                            >
                            <Box
                                display="grid"
                                gap="4"
                                gridTemplateColumns="1fr 1fr"
                            >
                                <FormField.Input
                                append={<Text color="neutral-textDisabled">R$</Text>}
                                appendPosition="start"
                                label="Preço"
                                crossOrigin=""
                                disabled
                                value={formattedMetadata[0]?.variants?.[0]?.price}
                                />

                                {formattedMetadata[0]?.variants?.[0]?.promotional_price &&
                                    <FormField.Input
                                    append={<Text color="neutral-textDisabled">R$</Text>}
                                    appendPosition="start"
                                    label="Precio promocional"
                                    crossOrigin=""
                                    disabled
                                    value={formattedMetadata[0]?.variants?.[0]?.promotional_price}
                                    />
                                }
                            </Box>
                            </Box>
                        </Card.Body>
                        </Card>
                        <Card padding="none">
                        <Card.Header>
                            <Box
                            pt="4"
                            px="4"
                            >
                            <Title as="h4">
                                Estoque do produto
                            </Title>
                            </Box>
                        </Card.Header>
                        <Card.Body>
                            <Box
                            display="flex"
                            flexDirection="column"
                            gap="4"
                            >
                            <Box
                                display="grid"
                                gap="4"
                                gridTemplateColumns="1fr 1fr"
                                px="4"
                            >
                                <Box
                                display="flex"
                                flexDirection="column"
                                gap="2"
                                marginBottom="3"
                                >
                                <Label htmlFor="barcode">
                                    Estoque
                                </Label>
                                <Input 
                                    id="estoque"
                                    disabled
                                    value={formattedMetadata[0]?.variants?.[0]?.stock ?? "∞"}
                                />
                                </Box>
                            </Box>
                            
                            </Box>
                        </Card.Body>
                        </Card>
                        <Card>
                        <Card.Header title="Peso e dimensões" />
                        <Card.Body>
                            <Box
                            display="flex"
                            flexDirection="column"
                            gap="4"
                            >
                            <Box
                                display="grid"
                                gap="4"
                                gridTemplateColumns={{
                                md: '1fr 1fr 1fr 1fr',
                                xs: '1fr 1fr'
                                }}
                            >
                                <FormField.Input
                                append={<Text color="neutral-textDisabled">kg</Text>}
                                appendPosition="end"
                                label="Peso"
                                crossOrigin=""
                                disabled
                                value={formattedMetadata[0]?.variants?.[0]?.weight}
                                />
                                <FormField.Input
                                append={<Text color="neutral-textDisabled">cm</Text>}
                                appendPosition="end"
                                label="Largo"
                                crossOrigin=""
                                disabled
                                value={formattedMetadata[0]?.variants?.[0]?.height}
                                />
                                <FormField.Input
                                append={<Text color="neutral-textDisabled">cm</Text>}
                                appendPosition="end"
                                label="Ancho"
                                crossOrigin=""
                                disabled
                                value={formattedMetadata[0]?.variants?.[0]?.width}
                                />
                                <FormField.Input
                                append={<Text color="neutral-textDisabled">cm</Text>}
                                appendPosition="end"
                                label="Alto"
                                crossOrigin=""
                                disabled
                                value={formattedMetadata[0]?.variants?.[0]?.depth}
                                />
                            </Box>
                            </Box>
                        </Card.Body>
                        </Card>
                        
                        <Card>
                        <Card.Header title="Categorías" />
                        <Card.Body>
                            <Box
                                display="flex"
                                flexDirection="row"
                                flexWrap="wrap"
                                gap="2"
                            >
                                {formattedMetadata[0]?.categories?.map((category: { name: { pt: string } }, index: Key) => (
                                    <Box key={index} width="25%">
                                        <Chip
                                            removable
                                            text={category.name.pt}
                                        />
                                    </Box>
                                ))}

                            </Box>
                        </Card.Body>
                        </Card>
                        <Box
                        display="flex"
                        flexDirection="column"
                        gap="2"
                        >
                        </Box>
                        <Box
                        display="flex"
                        gap="2"
                        justifyContent="flex-end"
                        >
                        <Button>
                            Cancelar
                        </Button>
                        <Button appearance="primary">
                            Guardar
                        </Button>
                        </Box>
                    </Layout.Section>
                    </Layout>
                </Page.Body>
                </Page>




        </div>
    )

};

