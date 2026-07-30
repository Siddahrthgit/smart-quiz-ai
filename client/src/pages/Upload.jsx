import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      setError("Please choose a file first.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        navigate("/quiz");
      } else {
        setError(res.data.message || "Upload failed.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong during upload."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: 480, margin: "0 auto" }}>
      <h1>Upload Study Material</h1>
      <p>Upload a PDF or TXT file to generate a quiz.</p>

      <input
        type="file"
        accept=".pdf,.txt"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Generating questions..." : "Upload & Generate Quiz"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Upload;
