import React, { useRef, useMemo, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import Quill from "quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@nimbus-ds/components";

// --- Blot Customizado para Imagens ---
const ImageFormat = Quill.import("formats/image");

class CustomImage extends (ImageFormat as unknown as { create(arg0: any): unknown; new (): any }) {
  static blotName = "image";
  static tagName = "img";
  static scope = Quill.import("parchment").Scope.INLINE;

  static create(value: any): Node {
    const node = super.create(value.url || value) as HTMLElement;
    if (typeof value === "object" && value.align) {
      node.style.display = "block";
      node.style.marginLeft = value.align === "center" ? "auto" : value.align === "right" ? "auto" : "0";
      node.style.marginRight = value.align === "center" ? "auto" : value.align === "left" ? "auto" : "0";
    }
    return node;
  }

  static value(node: any) {
    return { url: node.getAttribute("src"), align: node.style.textAlign || "left" };
  }
}

Quill.register(CustomImage as any, true);

// --- Componente de Upload de Imagens ---
interface ImageUploaderProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange }) => {
  const quillRef = useRef<ReactQuill>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    setImageUrl(value); // Atualiza a imagem quando o valor mudar
  }, [value]);

  const customImageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64Image = e.target?.result as string;
          if (base64Image) {
            setImageUrl(base64Image); // Atualiza o estado da imagem
            onChange(base64Image); // Dispara o onChange para salvar a imagem
          }
        };
        reader.readAsDataURL(file);
      }
    };
  };

  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      {/* Exibir a Imagem Uploadada */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Uploaded"
          style={{ maxWidth: "100%", height: "auto", borderRadius: "8px", marginBottom: "10px" }}
        />
      ) : (
        <p>Nenhuma imagem selecionada</p>
      )}

      <div style={{ margin: "10px 0", width: "100%", display: 'flex', justifyContent: 'center' }}>
        <Button style={{ margin: "10px 0" }} appearance="primary" onClick={customImageHandler}>
          Selecionar imagem
        </Button>
      </div>
    </div>
  );
};

export default ImageUploader;
