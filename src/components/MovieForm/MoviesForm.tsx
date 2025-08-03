import { Button, MenuItem, TextField } from "@mui/material";
import React, { useContext } from "react";
import { ContainerContext } from "../context/MoviesContext";

const MoviesForm = () => {
  const {
 
    uploadedFileName,
    setUploadedFileName,
    fileInputRef,
    handleSubmit,
    formData,
    setFormData,
    setImageFile,
  } = useContext(ContainerContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
      setUploadedFileName(e.target.files[0].name);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50 p-6 rounded shadow"
        encType="multipart/form-data"
        >
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          >
          

        </TextField>
        <TextField
          label="Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          select
          required
        >
          <MenuItem value="Movie">Movie</MenuItem>
          <MenuItem value="TV Show">TV Show</MenuItem>
        </TextField>
        <TextField
          label="Director"
          name="director"
          value={formData.director}
          onChange={handleChange}
          required
        />
        <TextField
          label="Budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          required
        />
        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <TextField
          label="Duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
        />
        <TextField
          label="Year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          required
        />

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
          id="upload-button"
        />

        {/* Upload Button */}
        <label htmlFor="upload-button">
          <Button variant="outlined" component="span" fullWidth>
            Upload Movie Image
          </Button>
        {uploadedFileName && (
          <span className="text-sm text-gray-600">
            Selected File: {uploadedFileName}
          </span>
        )}
        </label>
        {/* Show selected file name */}

        <Button type="submit" 
        variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default MoviesForm;
