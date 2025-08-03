import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext } from "react";
import { ContainerContext } from "../context/MoviesContext";

const MovieEditModal = () => {
  const {
    setEditData,
    setEditImage,
    editOpen,
    setEditOpen,
    editData,
    handleEditSubmit,
  } = useContext(ContainerContext);
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  return (
    <div>
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Movie</DialogTitle>
        <DialogContent className="grid grid-cols-1 gap-4 py-2">
          <TextField
            name="title"
            label="Title"
            value={editData.title}
            onChange={handleEditChange}
          />
          <TextField
            name="type"
            label="Type"
            value={editData.type}
            onChange={handleEditChange}
          />

          <TextField
            name="director"
            label="Director"
            value={editData.director}
            onChange={handleEditChange}
          />
          <TextField
            name="budget"
            label="Budget"
            value={editData.budget}
            onChange={handleEditChange}
          />
          <TextField
            name="location"
            label="Location"
            value={editData.location}
            onChange={handleEditChange}
          />
          <TextField
            name="duration"
            label="Duration"
            value={editData.duration}
            onChange={handleEditChange}
          />
          <TextField
            name="year"
            label="Year"
            value={editData.year}
            onChange={handleEditChange}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setEditImage(e.target.files?.[0] || null)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MovieEditModal;
