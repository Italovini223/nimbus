{/* <Card>
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
</Box> */}