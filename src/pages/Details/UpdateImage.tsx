const getUploadUrl = async () => {
    const API_KEY_ID = "SUA_KEY_ID";
    const APPLICATION_KEY = "SUA_APPLICATION_KEY";
  
    const credentials = btoa(`${API_KEY_ID}:${APPLICATION_KEY}`); // Encode para Basic Auth
  
    try {
      const response = await fetch("https://api.backblazeb2.com/b2api/v2/b2_authorize_account", {
        method: "GET",
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });
  
      const data = await response.json();
      if (data.authorizationToken) {
        const uploadUrlResponse = await fetch(`${data.apiUrl}/b2api/v2/b2_get_upload_url`, {
          method: "POST",
          headers: {
            Authorization: data.authorizationToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bucketId: "SEU_BUCKET_ID" }),
        });
  
        const uploadData = await uploadUrlResponse.json();
        return uploadData; // Retorna o uploadUrl e authorizationToken
      } else {
        console.error("Erro ao obter token:", data);
      }
    } catch (error) {
      console.error("Erro ao obter URL de upload:", error);
    }
  };
  

  import { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState("");
  const [uploadAuthToken, setUploadAuthToken] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleGetUploadUrl = async () => {
    const uploadData = await getUploadUrl();
    if (uploadData) {
      setUploadUrl(uploadData.uploadUrl);
      setUploadAuthToken(uploadData.authorizationToken);
    }
  };

  const handleUpload = async () => {
    if (!file || !uploadUrl || !uploadAuthToken) {
      console.error("Faltando parâmetros para upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);

    try {
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          Authorization: uploadAuthToken,
          "X-Bz-File-Name": encodeURIComponent(file.name),
          "Content-Type": file.type,
          "X-Bz-Content-Sha1": "do_not_verify",
        },
        body: file,
      });

      const data = await response.json();
      if (data.fileId) {
        setFileUrl(`https://f000.backblazeb2.com/file/SEU_BUCKET_NAME/${file.name}`);
      }
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleGetUploadUrl}>Obter URL de Upload</button>
      <button onClick={handleUpload} disabled={!uploadUrl}>Fazer Upload</button>
      {fileUrl && <img src={fileUrl} alt="Uploaded" />}
    </div>
  );
};

export default FileUpload;
