import { Button, MenuItem, TextField } from "@mui/material";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import React, { useContext } from "react";
import { ContainerContext } from "../context/MoviesContext";

const MoviesForm = () => {
  const { handleSubmit, movies, formData, setFormData, setImageFile } =
    useContext(ContainerContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleExportCSV = () => {
    const csv = Papa.unparse(movies);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "movies.csv");
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
        />
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
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <Button variant="outlined" onClick={handleExportCSV}>
          Export CSV
        </Button>
      </form>
    </div>
  );
};

export default MoviesForm;
