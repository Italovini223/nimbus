import { api } from "../services/api";
import { useEffect, useState } from "react";
import { ProductsType } from "../dtos/productDto";
import { IconButton, Box, Input, Button, Text, Chip, Table, Thumbnail, Link, Icon, Tag } from "@nimbus-ds/components";
import { Page, Layout, DataList, DataTable } from "@nimbus-ds/patterns";
import { TiendanubeIcon } from "@nimbus-ds/icons";
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

        <Page.Header
            buttonStack={<><IconButton size="2rem" source={<TiendanubeIcon />}/><IconButton size="2rem" source={<TiendanubeIcon />}/><Button>Mis aplicaciones<Icon source={ <TiendanubeIcon />}/></Button><Button>Acción secundaria<Icon source={ <TiendanubeIcon />}/></Button><Button appearance="primary"><Icon color="neutral-background" source={<TiendanubeIcon />}/>Acción primaria</Button></>}
            title="Listado de productos"
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
                        150 productos
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
                        itemCount="Mostrando 1-20 productos de 40"
                        pagination={{
                            activePage: 1,
                            onPageChange: function noRefCheck() {},
                            pageCount: 2,
                        }}
                        />
                    }
                    header={
                        <DataTable.Header checkbox={{ checked: false, name: 'check-all-rows' }}>
                        <Table.Cell width="auto">Producto</Table.Cell>
                        <Table.Cell width="88px">Stock</Table.Cell>
                        <Table.Cell width="88px">Precio</Table.Cell>
                        <Table.Cell width="88px">Promocional</Table.Cell>
                        <Table.Cell width="150px">Variantes</Table.Cell>
                        <Table.Cell width="80px">Acciones</Table.Cell>
                        </DataTable.Header>
                    }
                    >
                    {Array.from({ length: 20 }).map((_, index) => (
                        <DataTable.Row
                        key={index}
                        backgroundColor={{ hover: 'neutral-surface', rest: 'neutral-background' }}
                        checkbox={{ checked: false, name: `check-${index}` }}
                        >
                        <Table.Cell>
                            <Box display="flex" gap="2">
                            <Thumbnail alt="Nombre del producto" aspectRatio="1/1" width="64px" />
                            <Box display="flex" flexDirection="column" gap="1">
                                <Text color="primary-interactive">Nombre del producto</Text>
                                <Tag appearance="warning">Tag de producto</Tag>
                            </Box>
                            </Box>
                        </Table.Cell>
                        <Table.Cell>
                            <Input placeholder="0" type="number" />
                        </Table.Cell>
                        <Table.Cell>
                            <Input append="R$" placeholder="0" type="number" />
                        </Table.Cell>
                        <Table.Cell>
                            <Input append="R$" placeholder="0" type="number" />
                        </Table.Cell>
                        <Table.Cell>
                            <Text>Variante 1 / Variante 2 / Variante 3 / Variante 4</Text>
                        </Table.Cell>
                        <Table.Cell>
                            <Box display="flex" gap="2">
                            <IconButton size="2rem" source={ <TiendanubeIcon />}/>
                            <IconButton size="2rem" source={ <TiendanubeIcon />}/>
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