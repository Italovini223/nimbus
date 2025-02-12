import React, { useRef, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import "highlight.js/styles/default.css";
import "react-quill/dist/quill.snow.css";
import { Button } from "@nimbus-ds/components";

// --- Definição do Custom Image Blot com suporte a alinhamento ---
const ImageFormat = Quill.import("formats/image");

class CustomImage extends ImageFormat {
  static create(value: any) {
    // Se value for um objeto com { url, align }, utiliza a url para criar o elemento
    const node = super.create(
      typeof value === "object" && value.url ? value.url : value
    );
    if (typeof value === "object" && value.align) {
      // Aplica estilos inline de acordo com o alinhamento desejado
      if (value.align === "center") {
        node.style.display = "block";
        node.style.marginLeft = "auto";
        node.style.marginRight = "auto";
      } else if (value.align === "left") {
        node.style.display = "block";
        node.style.marginRight = "auto";
      } else if (value.align === "right") {
        node.style.display = "block";
        node.style.marginLeft = "auto";
      }
    }
    return node;
  }

  static value(node: any) {
    let align = "";
    if (
      node.style.display === "block" &&
      node.style.marginLeft === "auto" &&
      node.style.marginRight === "auto"
    ) {
      align = "center";
    } else if (node.style.display === "block" && node.style.marginRight === "auto") {
      align = "left";
    } else if (node.style.display === "block" && node.style.marginLeft === "auto") {
      align = "right";
    }
    return {
      url: node.getAttribute("src"),
      align: align,
    };
  }
}
CustomImage.blotName = "image";
CustomImage.tagName = "img";
// Registra o blot customizado
Quill.register(CustomImage, true);

// --- Componente que só permite inserir imagens ---
interface ImageUploaderProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange }) => {
  const quillRef = useRef<ReactQuill>(null);

  // Handler para converter a imagem em base64 e inseri-la no final do conteúdo
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
          const base64Image = e.target?.result;
          if (base64Image && quillRef.current) {
            const editor = quillRef.current.getEditor();
            // Insere a imagem no final do conteúdo com alinhamento centralizado
            const length = editor.getLength();
            editor.insertEmbed(length, "image", { url: base64Image, align: "center" });
            // Atualiza o estado com o conteúdo HTML atual do editor
            onChange(editor.root.innerHTML);
          }
        };
        reader.readAsDataURL(file);
      }
    };
  };

  // Configuração dos módulos: removemos o toolbar para não permitir edições de texto
  const modules = useMemo(
    () => ({
      toolbar: false, // sem toolbar interna
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
    }),
    []
  );

  return (
    <div>
        {/* Editor em modo readOnly para desabilitar entrada de texto */}
        <ReactQuill
            ref={quillRef}
            value={value}
            onChange={onChange}
            modules={modules}
            readOnly={true}
            placeholder="Somente imagens serão inseridas"
        />
        <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "20px 0" }}>
            <Button style={{ margin: "20px 0" }} appearance="primary" onClick={customImageHandler}>
                Selecionar imagem
            </Button>
        </div>
    </div>
  );
};

export default ImageUploader;
