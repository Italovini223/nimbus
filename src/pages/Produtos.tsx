import { api } from "../services/api";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import productImage from "../assets/vestido.png";
import { ProductsType } from "../dtos/productDto";
import { IconButton, Box, Input, Button, Text, Chip, Table, Thumbnail, Icon, Tag } from "@nimbus-ds/components";
import { Page, Layout, DataTable } from "@nimbus-ds/patterns";
import { TiendanubeIcon, EditIcon } from "@nimbus-ds/icons";
import { useNavigate } from "react-router-dom";
import { formatMetadata } from "../utils/formatMetadata";

export const Produtos = () => {
    const [products, setProducts] = useState<ProductsType[]>([]);
    const navigate = useNavigate();
    const formattedMetadata = products.map(product => formatMetadata(product.hub_dados_produto_metadados)).filter(meta => meta !== null);


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


    const mainImage = formattedMetadata?.filter((meta) => meta !== null)?.[0]?.images?.find((img: any) => img.position === 1) || formattedMetadata?.filter((meta) => meta !== null)?.[0]?.images?.[0];

    return (
    <div>
        <Page.Header
            buttonStack={<><IconButton size="2rem" source={<TiendanubeIcon />}/><IconButton size="2rem" source={<TiendanubeIcon />}/><Button>Minhas aplicações<Icon source={ <TiendanubeIcon />}/></Button><Button>Ação secundária<Icon source={ <TiendanubeIcon />}/></Button><Button appearance="primary"><Icon color="neutral-background" source={<TiendanubeIcon />}/>Ação primária</Button></>}
            title="Lista de produtos"
        >
            <Box
            display="flex"
            flexDirection="column"
            gap="2"
            >
            <Box
                display="flex"
                gap="1"
            >
                <Input.Search placeholder="Buscar" />
                <Button>
                <Icon
                    color="currentColor"
                    source={<TiendanubeIcon />}
                />
                </Button>
            </Box>
            <Box
                alignItems="center"
                display="flex"
                gap="2" 
                >
                <Text>
                150 produtos
                </Text>
                <Chip
                removable
                text="Filtro aplicado"
                />
            </Box>
            </Box>
        </Page.Header>
        <Page.Body
            px={{
                md: '6',
                xs: 'none'
            }}
        >
            <Layout columns="1">
                <DataTable
                    footer={
                        <DataTable.Footer
                        itemCount="Mostrando 1-20 produtos de 40"
                        pagination={{
                            activePage: 1,
                            onPageChange: function noRefCheck() {},
                            pageCount: 2,
                        }}
                        />
                    }
                    header={
                        <DataTable.Header checkbox={{ checked: false, name: 'check-all-rows' }}>
                        <Table.Cell width="auto">Produto</Table.Cell>
                        <Table.Cell width="88px">Estoque</Table.Cell>
                        <Table.Cell width="100px">Preço</Table.Cell>
                        <Table.Cell width="88px">Promocional</Table.Cell>
                        <Table.Cell width="150px">Variantes</Table.Cell>
                        <Table.Cell width="80px">Ações</Table.Cell>
                        </DataTable.Header>
                    }
                    >
                    {products.map((product) => (
                        <DataTable.Row
                            key={product.hub_dados_produto_id}
                            backgroundColor={{ hover: "neutral-surface", rest: "neutral-background" }}
                            checkbox={{ checked: false, name: `check-${product.hub_dados_produto_id}` }}
                        >
                            <Table.Cell>
                            <Box display="flex" gap="2">
                                <Thumbnail
                                    alt={product.hub_dados_produto_titulo}
                                    aspectRatio="1/1"
                                    width="64px"
                                    src={formattedMetadata[products.indexOf(product)]?.images?.[0]?.src || productImage}
                                />
                                <Box display="flex" flexDirection="column" gap="1">
                                <button
                                    style={{
                                    border: "none",
                                    color: "blue",
                                    cursor: "pointer",
                                    textAlign: "left",
                                    }}
                                    onClick={() => handleGoToDetails(product.hub_dados_produto_id)}
                                >   
                                    {product.hub_dados_produto_titulo}
                                </button>
                                <Tag appearance="warning">ID: {product.hub_dados_produto_id}</Tag>
                                {formattedMetadata[products.indexOf(product)]?.tags?.length > 0 && (
                                    <Tag>{formattedMetadata[products.indexOf(product)]?.tags}</Tag>
                                )}
                                </Box>
                            </Box>
                            </Table.Cell>
                            <Table.Cell>
                                <span>{formattedMetadata[products.indexOf(product)]?.variants?.[0]?.stock}</span>
                            </Table.Cell>
                            <Table.Cell>
                                <span>{formattedMetadata[products.indexOf(product)]?.variants?.[0]?.price}</span>
                            </Table.Cell>
                            <Table.Cell>
                                <span>{formattedMetadata[products.indexOf(product)]?.variants?.[0]?.promotional_price}</span>
                            </Table.Cell>
                            <Table.Cell>    
                                <Text>
                                {formattedMetadata[products.indexOf(product)]?.variants?.map((variant: { variants: string; }, index: Key | null | undefined) => (
                                    <div key={index} style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                                        {variant.variants.split(", ").map((value, idx) => (
                                            <Tag key={idx}>{value}</Tag>
                                        ))}
                                    </div>
                                ))}

                                </Text>
                            </Table.Cell>
                            <Table.Cell>
                                <Box display="flex" gap="2">
                                    <IconButton size="2rem" source={<EditIcon />} onClick={() => handleGoToDetails(product.hub_dados_produto_id)} />
                                </Box>
                            </Table.Cell>
                        </DataTable.Row>
                        ))}
                </DataTable>

                

                {/* mobileContent={
                    <>
                    <Box px="4">
                        <Link as="button" onClick={function noRefCheck() {}}>Editar</Link>
                    </Box>
                    <DataList>
                        {Array.from({ length: 20 }).map((_, index) => (
                        <DataList.Row key={index} flexDirection="row" gap="2">
                            <Thumbnail alt="Nombre del producto" aspectRatio="1/1" width="64px" />
                            <Box display="flex" flexDirection="column" gap="1">
                            <Text color="primary-interactive">Nombre del producto</Text>
                            <Tag appearance="warning">
                                <Icon color="currentColor" source={ <TiendanubeIcon />}/>
                                Estado
                            </Tag>
                            <Text>Stock</Text>
                            </Box>
                        </DataList.Row>
                        ))}
                    </DataList>
                    </>
                }
                /> */}
            </Layout>
        </Page.Body>
    </div>

    );
};