import React, { useRef, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import Quill from "quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@nimbus-ds/components";

// Importação do Blot de Imagem personalizado
const ImageFormat = Quill.import("formats/image");

class CustomImage extends (ImageFormat as unknown as { create(arg0: any): unknown; new (): any }) {
  static blotName = "image";
  static tagName = "img";
  static scope = Quill.import("parchment").Scope.INLINE;

  static create(value: any) {
    const node = super.create(typeof value === "object" && value.url ? value.url : value) as HTMLElement;
    node.classList.remove("ql-align-center", "ql-align-left", "ql-align-right");
    if (typeof value === "object" && value.align) {
      node.classList.add(`ql-align-${value.align}`);
    }
    return node;
  }

  static value(node: any) {
    let align = "";
    if (node.classList.contains("ql-align-center")) align = "center";
    else if (node.classList.contains("ql-align-left")) align = "left";
    else if (node.classList.contains("ql-align-right")) align = "right";
    
    return { url: node.getAttribute("src"), align };
  }
}

Quill.register(CustomImage as any, true);

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  defaultAlignment?: "left" | "center" | "right";
}

const QuillEditorLocalImages: React.FC<QuillEditorProps> = ({ value, onChange, defaultAlignment = "left" }) => {
  const quillRef = useRef<ReactQuill>(null);
  const [imageSide, setImageSide] = useState<"left" | "right">("left"); // Estado para trocar o lado da imagem
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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
            setImageUrl(base64Image);
          }
        };
        reader.readAsDataURL(file);
      }
    };
  };

  const modules = useMemo(
    () => ({
      syntax: false,
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["clean"],
        ],
        handlers: {
          image: customImageHandler,
        },
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
    }),
    []
  );

  return (
    <>
      <div style={{ marginBottom: "10px", width: "100%", display: "flex", justifyContent: "center" }}>

        {/* Botão para trocar o lado */}
        <button
          onClick={() => setImageSide(imageSide === "left" ? "right" : "left")}
          style={{
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Alternar Lado
        </button>

      </div>

      <div style={{ display: "flex", flexDirection: imageSide === "left" ? "row" : "row-reverse", gap: "10px" }}>
        {/* Área da Imagem */}
        <div style={{ width: "30%", textAlign: "center", marginTop: "50px", display: "flex", justifyContent: "center", alignItems: "end" }}>
          {imageUrl ? (
            <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%", borderRadius: "8px" }} />
          ) : (
            <Button style={{ margin: "10px 0", padding: "10px", cursor: "pointer"  }} appearance="primary" onClick={customImageHandler}>
              Upload Imagem
            </Button>
          )}
        </div>

        {/* Área do Editor de Texto */}
        <div style={{ width: "70%", height: "100%" }}>
          <ReactQuill ref={quillRef} value={value} onChange={onChange} modules={modules} placeholder="Escreva algo..." />
        </div>
        
      </div>
    </>
  );
};

export default QuillEditorLocalImages;
