import { useState } from "react";
import axios from "axios";

function CreatePost() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  // Image select
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Image type validation
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    // Image size validation - 10MB
    if (file.size > 10 * 1024 * 1024) {
      alert("Image size should be less than 10MB.");
      return;
    }

    setImage(file);

    // Preview
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  // Remove image
  const removeImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(null);
    setPreview(null);
  };

  // Submit post
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Image validation
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    try {
      setLoading(true);

      // Create FormData
      const formData = new FormData();

      formData.append("image", image);
      formData.append("caption", caption);

      // Send data to backend
      const response = await axios.post(
        "http://localhost:3000/create-post",
        formData
      );

      console.log("Server Response:", response.data);

      alert("Post created successfully!");

      // Reset form
      removeImage();
      setCaption("");

    } catch (error) {
      console.error("Create Post Error:", error);

      if (error.response) {
        alert(
          error.response.data.message ||
            "Failed to create post."
        );
      } else {
        alert("Server is not reachable.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="create-page">

      {/* Heading */}
      <div className="create-heading">
        <p>SHARE YOUR MOMENT</p>

        <h1>Create Post</h1>

        <span>
          Turn your memories into moments.
        </span>
      </div>

      {/* Form */}
      <form
        className="create-card"
        onSubmit={handleSubmit}
      >

        {/* Image Upload */}
        <label className="upload-box">

          {preview ? (
            <div className="preview-wrapper">

              <img
                src={preview}
                alt="Preview"
                className="preview-image"
              />

              <button
                type="button"
                className="remove-image"
                onClick={removeImage}
              >
                ✕
              </button>

            </div>
          ) : (
            <div className="upload-content">

              <div className="upload-icon">
                ＋
              </div>

              <h3>
                Upload an image
              </h3>

              <p>
                PNG, JPG or JPEG up to 10MB
              </p>

              <span className="choose-btn">
                Choose Image
              </span>

            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            hidden
          />

        </label>

        {/* Caption */}
        <div className="caption-section">

          <div className="caption-header">

            <label>
              Caption
            </label>

            <span>
              {caption.length}/2200
            </span>

          </div>

          <textarea
            value={caption}
            onChange={(e) =>
              setCaption(e.target.value)
            }
            placeholder="Write something about this moment..."
            maxLength={2200}
          />

        </div>

        {/* Submit */}
        <button
          className="share-button"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Sharing..."
            : "✦ Share Moment"}
        </button>

      </form>
    </main>
  );
}

export default CreatePost;

