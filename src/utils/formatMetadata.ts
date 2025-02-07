export function formatMetadata(metadataString: string) {
    try {
      const metadata = JSON.parse(metadataString);
  
      return {
        id: metadata.id,
        name: metadata.name?.pt?.trim() || "Sem nome",
        brand: metadata.brand?.trim() || "Sem marca",
        tags: metadata.tags
          ? metadata.tags.split(",").map((tag: string) => tag.trim())
          : [],
        handle: metadata.handle?.pt || null,
        images: Array.isArray(metadata.images)
          ? metadata.images.map((img: any) => ({
              id: img.id,
              src: img.src,
              width: img.width,
              height: img.height,
              position: img.position,
            }))
          : [],
          variants: Array.isArray(metadata.variants)
            ? metadata.variants.map((v: {
              weight: number;
              height: number;
              width: number;
              depth: number;
                stock: any;
                promotional_price: any;
                    image_id: any; price: string; values?: any[] 
                }) => ({
                price: v?.price,
                stock: v?.stock,
                promotional_price: v?.promotional_price,
                images: metadata.images.filter((img: any) => img.id === v.image_id),
                variants: v?.values?.map(val => val.pt).join(", "),
                depth: v?.depth || 0,
                width: v?.width || 0,
                height: v?.height || 0,
                weight: v?.weight || 0,
                }))
            : [],

        published: metadata.published,
        seo_title: metadata.seo_title?.pt || "",
        video_url: metadata.video_url,
        attributes: Array.isArray(metadata.attributes)
          ? metadata.attributes.map((attr: any) => attr.pt)
          : [],
        categories: metadata.categories || [],
        created_at: metadata.created_at,
        updated_at: metadata.updated_at,
        description: metadata.description?.pt || "",
        canonical_url: metadata.canonical_url,
        free_shipping: metadata.free_shipping,
        seo_description: metadata.seo_description?.pt || "",
        requires_shipping: metadata.requires_shipping,
      };
    } catch (error) {
      console.error("Erro ao processar metadados:", error);
      return null; // Retorna null em caso de erro
    }
  }
  