import React, { useState } from "react";
import { Card, Box, Button } from "@nimbus-ds/components";
import { DragDotsIcon } from "@nimbus-ds/icons";
import { FormField } from "@nimbus-ds/patterns";
import QuillEditorLocalImages from "./EditorImageAndText"; // Editor para texto+imagem
import ImageUploader from "./EditorImage"; // Editor que só permite inserir imagem

// Atualize a interface Section para incluir o tipo de seção
interface Section {
  id: number;
  title: string;
  description: string;
  type: "textImage" | "imageOnly";
}

interface SortableItemProps {
  section: Section;
  isDragging: boolean;
  onDragStart: (id: number) => void;
  onDragEnd: () => void;
  onTitleChange: (id: number, newTitle: string) => void;
  onDescriptionChange: (id: number, newDescription: string) => void;
  onSave: (id: number) => void;
  onDelete: (id: number) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({
  section,
  isDragging,
  onDragStart,
  onDragEnd,
  onTitleChange,
  onDescriptionChange,
  onSave,
  onDelete,
}) => {
  const containerStyle: React.CSSProperties = {
    transition: "transform 0.3s ease-in-out",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    opacity: isDragging ? 0.8 : 1,
    cursor: isDragging ? "grabbing" : "grab",
    border: "1px solid #ddd",
    padding: "16px",
    margin: "8px 0",
    backgroundColor: "#FFF",
    borderRadius: "4px",
    boxShadow: isDragging ? "0px 4px 10px rgba(0, 0, 0, 0.1)" : "none",
    position: "relative",
  };

  return (
    <Box
      style={containerStyle}
      draggable
      onDragStart={() => onDragStart(section.id)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
    >
      {section.type === "textImage" ? (
        // Seção com título e editor de texto
        <>
          <div style={{ marginBottom: "16px" }}>
            <FormField.Input
              crossOrigin=""
              label={
                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                  <span>Título da Seção {section.id}</span>
                  <DragDotsIcon
                    style={{
                      width: "24px",
                      height: "24px",
                      color: "#333",
                      cursor: isDragging ? "grabbing" : "grab",
                    }}
                    aria-label="Arraste para mover"
                  />
                </Box>
              }
              value={section.title}
              onChange={(e) =>
                onTitleChange(section.id, (e.target as HTMLInputElement).value)
              }
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <QuillEditorLocalImages
              value={section.description}
              onChange={(newDescription) =>
                onDescriptionChange(section.id, newDescription)
              }
            />
          </div>
        </>
      ) : (
        // Seção somente de imagem
        <>
          <div style={{ marginBottom: "16px" }}>
            <ImageUploader
              value={section.description}
              onChange={(newDescription) =>
                onDescriptionChange(section.id, newDescription)
              }
            />
          </div>
        </>
      )}
      <Box display="flex" gap="3" marginY="2" justifyContent="flex-end">
        <Button appearance="primary" onClick={() => onSave(section.id)}>
          Salvar
        </Button>
        <Button appearance="danger" onClick={() => onDelete(section.id)}>
          Excluir
        </Button>
      </Box>
    </Box>
  );
};

const DescriptionPRO: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [savedSections, setSavedSections] = useState<{
    [key: number]: { title: string; description: string };
  }>({});

  // Adiciona uma seção com título e editor de texto
  const addSectionTextImage = () => {
    const newSection: Section = {
      id: Date.now(),
      title: "",
      description: "",
      type: "textImage",
    };
    setSections([...sections, newSection]);
    console.log("Seção Texto e Imagem adicionada:", newSection);
  };

  // Adiciona uma seção somente para imagem
  const addSectionImage = () => {
    const newSection: Section = {
      id: Date.now(),
      title: "", // pode ser ignorado ou omitido no UI
      description: "",
      type: "imageOnly",
    };
    setSections([...sections, newSection]);
    console.log("Seção Somente Imagem adicionada:", newSection);
  };

  const handleDragStart = (id: number) => {
    setDraggingId(id);
    console.log("Início do arraste:", id);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setDragOverIndex(null);
  };

  const handleDrop = (index: number) => {
    if (draggingId === null || draggingId === sections[index].id) return;

    const oldIndex = sections.findIndex((s) => s.id === draggingId);
    const newIndex = index;

    const updatedSections = [...sections];
    const [movedSection] = updatedSections.splice(oldIndex, 1);
    updatedSections.splice(newIndex, 0, movedSection);

    setSections(updatedSections);
    setDraggingId(null);
    console.log("Seções após reordenação:", updatedSections);
  };

  const handleTitleChange = (id: number, newTitle: string) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, title: newTitle } : section
      )
    );
  };

  const handleDescriptionChange = (id: number, newDescription: string) => {
    console.log("Nova descrição:", newDescription);
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, description: newDescription } : section
      )
    );
  };

  const handleSaveSection = (id: number) => {
    const section = sections.find((s) => s.id === id);
    if (section) {
      setSavedSections((prev) => ({
        ...prev,
        [id]: { title: section.title, description: section.description },
      }));
      console.log("Seção salva:", section);
    }
  };

  const handleDeleteSection = (id: number) => {
    setSections((prevSections) =>
      prevSections.filter((section) => section.id !== id)
    );
    setSavedSections((prevSaved) => {
      const { [id]: removed, ...rest } = prevSaved;
      return rest;
    });
    console.log("Seção excluída, id:", id);
  };

  return (
    <Card>
      <Card.Header title="Seções personalizadas" />
      <Card.Body>
        <Box display="flex" flexDirection="column" gap="4">
          {sections.map((section, index) => (
            <div
              key={section.id}
              onDragOver={() => setDragOverIndex(index)}
              onDrop={() => handleDrop(index)}
              style={{
                position: "relative",
                transition: "background-color 0.3s ease",
                backgroundColor: dragOverIndex === index ? "#F0F0F0" : "transparent",
              }}
            >
              <SortableItem
                section={section}
                isDragging={section.id === draggingId}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onTitleChange={handleTitleChange}
                onDescriptionChange={handleDescriptionChange}
                onSave={handleSaveSection}
                onDelete={handleDeleteSection}
              />
            </div>
          ))}
        </Box>
        <Box display="flex" justifyContent="center" gap="4">
          <Button
            style={{ margin: "20px 0" }}
            appearance="primary"
            onClick={addSectionTextImage}
          >
            Adicionar Seção Texto e Imagem
          </Button>
          <Button
            style={{ margin: "20px 0" }}
            appearance="primary"
            onClick={addSectionImage}
          >
            Adicionar Seção Somente Imagem
          </Button>
        </Box>

        {/* Visualização dos dados salvos */}
        <pre>{JSON.stringify(savedSections, null, 2)}</pre>
      </Card.Body>
    </Card>
  );
};

export default DescriptionPRO;
