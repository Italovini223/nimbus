export type ProductsType = {
    id: any;
    empresa_id: number;
    empresa_loja_id: number;
    hub_dados_produto_descricao: string;
    hub_dados_produto_dta: string;
    hub_dados_produto_dtc: string;
    hub_dados_produto_guid: string;
    hub_dados_produto_id: number;
    hub_dados_produto_imagem_padrao: string | null;
    hub_dados_produto_metadados: string;
    hub_dados_produto_nuvemshop_id: number;
    hub_dados_produto_publicado: number;
    hub_dados_produto_titulo: string;
    hub_dados_produto_url: string;
};

export type ProductMetadata = {
    id: number;
    name: { pt: string };
    tags: string;
    brand: string;
    handle: { pt: string };
    images: {
      id: number;
      src: string;
      width: number;
      height: number;
    }[];
    variants: {
      id: number;
      price: string;
      stock: number;
      values: { pt: string }[];
      image_id: number;
    }[];
  }
  