import { useState } from "react";

interface FileUploadProps {
  onUploadComplete?: (url: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string>("");
  const [uploadAuthToken, setUploadAuthToken] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string>("");

  // 🔹 Substitua pelos seus dados do Backblaze B2
    const B2_KEY_ID = "00204f1b60844b70000000011";
    const B2_APP_KEY = "K002xAl798KYCSwVYKM/ibmhaRplEU8";
    const BUCKET_NAME = "nuvempro-static";
    const BUCKET_ID = "d0c4ef816b16400884b40b17";
    const API_URL = "https://api.backblazeb2.com/b2api/v2";

  // 🔹 Defina a estrutura da pasta onde o arquivo será armazenado
  const folderPath = "nuvempro_static/customer_files/999/app_dp";

  // 🔹 Obtém a URL de Upload e o Token de autorização para upload
  const getUploadUrl = async (): Promise<void> => {
    try {
      // 1️⃣ Autorização na API do Backblaze B2
      const authResponse = await fetch(`${API_URL}/b2_authorize_account`, {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(`${B2_KEY_ID}:${B2_APP_KEY}`),
        },
      });
      const authData = await authResponse.json();
      if (!authData.apiUrl) throw new Error("Erro na autorização");

      // 2️⃣ Obtém a URL de Upload do Bucket
      const bucketResponse = await fetch(
        `${authData.apiUrl}/b2api/v2/b2_get_upload_url`,
        {
          method: "POST",
          headers: {
            Authorization: authData.authorizationToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bucketId: BUCKET_ID }),
        }
      );
      const bucketData = await bucketResponse.json();
      if (!bucketData.uploadUrl) throw new Error("Erro ao obter URL de Upload");

      setUploadUrl(bucketData.uploadUrl);
      setUploadAuthToken(bucketData.authorizationToken); // Use o token de upload correto
    } catch (error) {
      console.error("Erro ao obter URL de upload:", error);
    }
  };

  // 🔹 Faz o upload do arquivo para o Backblaze B2
  const handleUpload = async (): Promise<void> => {
    if (!file || !uploadUrl || !uploadAuthToken) {
      console.error("Arquivo ou URL de upload ausentes.");
      return;
    }

    // 🔹 Define o caminho final do arquivo dentro da pasta especificada
    const filePath = `${folderPath}/${file.name}`.replace(/\/+/g, "/");

    try {
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          // Use o token exatamente como retornado, sem o prefixo "Bearer"
          Authorization: uploadAuthToken,
          "X-Bz-File-Name": encodeURIComponent(filePath),
          "Content-Type": file.type,
          "X-Bz-Content-Sha1": "do_not_verify",
        },
        body: file,
      });
      const data = await response.json();
      if (data.fileId) {
        // Modificação: força o uso do endpoint f002
        const url = `https://f002.backblazeb2.com/file/${BUCKET_NAME}/${filePath}`;
        setFileUrl(url);
        if (onUploadComplete) {
          onUploadComplete(url);
        }
      } else {
        throw new Error("Erro ao fazer upload do arquivo");
      }
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={getUploadUrl}>Obter URL de Upload</button>
      <button onClick={handleUpload} disabled={!uploadUrl}>
        Fazer Upload
      </button>
      {fileUrl && (
        <div>
          <p>Arquivo enviado com sucesso!</p>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            Ver Arquivo
          </a>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
