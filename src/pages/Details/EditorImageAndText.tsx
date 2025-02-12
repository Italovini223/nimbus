import React, { useRef, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import "react-quill/dist/quill.snow.css";

// --- Definição do Custom Image Blot com suporte a alinhamento via classes ---
const ImageFormat = Quill.import("formats/image");

class CustomImage extends ImageFormat {
  static create(value: any) {
    // Cria o nó usando a URL (se value for objeto, extrai value.url)
    const node = super.create(
      typeof value === "object" && value.url ? value.url : value
    );
    // Remove classes de alinhamento existentes
    node.classList.remove("ql-align-center", "ql-align-left", "ql-align-right");
    // Se o valor for um objeto e tiver propriedade "align", adiciona a classe correspondente
    if (typeof value === "object" && value.align) {
      if (value.align === "center") {
        node.classList.add("ql-align-center");
      } else if (value.align === "left") {
        node.classList.add("ql-align-left");
      } else if (value.align === "right") {
        node.classList.add("ql-align-right");
      }
    }
    return node;
  }

  static value(node: any) {
    let align = "";
    if (node.classList.contains("ql-align-center")) {
      align = "center";
    } else if (node.classList.contains("ql-align-left")) {
      align = "left";
    } else if (node.classList.contains("ql-align-right")) {
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
Quill.register(CustomImage, true);

// --- Estilos para alinhamento (opcional, podem ser incluídos em um arquivo CSS) ---
const alignmentStyles = `
.ql-align-center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.ql-align-left {
  display: block;
  margin-right: auto;
}
.ql-align-right {
  display: block;
  margin-left: auto;
}
`;
if (typeof document !== "undefined") {
  const styleTag = document.createElement("style");
  styleTag.innerHTML = alignmentStyles;
  document.head.appendChild(styleTag);
}

// --- Componente do Editor ---
interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  // Prop opcional para definir o alinhamento padrão ao inserir a imagem
  defaultAlignment?: "left" | "center" | "right";
}

const QuillEditorLocalImages: React.FC<QuillEditorProps> = ({ value, onChange, defaultAlignment }) => {
  const quillRef = useRef<ReactQuill>(null);

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
            const range = editor.getSelection();
            if (range) {
              // Se defaultAlignment estiver definida, insere a imagem com o alinhamento configurado;
              // caso contrário, insere apenas a URL (sem atributo de alinhamento)
              if (defaultAlignment) {
                editor.insertEmbed(range.index, "image", { url: base64Image, align: defaultAlignment });
              } else {
                editor.insertEmbed(range.index, "image", base64Image);
              }
            }
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
          [{ font: [] }],
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["link", "image", "video"],
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
    [defaultAlignment]
  );

  return (
    <ReactQuill
      ref={quillRef}
      value={value}
      onChange={onChange}
      modules={modules}
      placeholder="Escreva algo aqui..."
    />
  );
};

export default QuillEditorLocalImages;
