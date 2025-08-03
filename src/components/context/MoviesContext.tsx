/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { type Movie, initialMovie } from "../types/movieType";
export const ContainerContext = createContext<any>(null);

export default function ContainerContextProvider(props: any) {
  const BASE_URL = "https://movie-dashboard-node.vercel.app/movie";
  const [movies, setMovies] = useState<Movie[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Movie>(initialMovie);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editImage, setEditImage] = useState<File | null>(null);
  const [search, setSearch] = useState<string>("");
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState<Movie>(initialMovie);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [filterField, setFilterField] = useState<string>("all");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  // ==========================================================================================
  const filteredMovies = movies.filter((movie: Movie) => {
    const keyword = search.toLowerCase();
    if (filterField === "all") {
      return (
        movie.title.toLowerCase().includes(keyword) ||
        movie.type.toLowerCase().includes(keyword) ||
        movie.director.toLowerCase().includes(keyword) ||
        movie.budget.toLowerCase().includes(keyword) ||
        movie.location.toLowerCase().includes(keyword) ||
        movie.duration.toLowerCase().includes(keyword) ||
        movie.year.toLowerCase().includes(keyword)
      );
    } else {
      const value = (movie as any)[filterField]?.toLowerCase();
      return value?.includes(keyword);
    }
  });
  const paginatedMovies = filteredMovies.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // ==========================================================================================
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/getAllUsersMovies`, {
        headers: {
          auth: localStorage.getItem("token") || "",
        },
      });
      setMovies(res.data.data);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setLoading(false);
    }
  };
  // ==========================================================================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      data.append(key, value as string | Blob)
    );
    if (imageFile) {
      data.append("movieImage", imageFile);
    } else {
      toast.error("Please upload an image");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/addNewMovie`, data, {
        headers: {
          auth: localStorage.getItem("token") || "",
        },
      });
      setRefreshTrigger((prev) => prev + 1);
      setSearch(""); // Clear search so new movie shows
      setFilterField("all"); // Reset filter
      fetchMovies(); // Refresh movie list
      setFormData(initialMovie);
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setUploadedFileName(null);
      toast.success("Movie added successfully!");
    } catch (error: any) {
      const errorMsg = error?.response?.data?.Error;
      if (errorMsg === "please upload the picture") {
        toast.error("Please upload the picture");
      }
      toast.error("Failed to add movie");
      console.error("Failed to submit movie:", errorMsg);
    }
  };
  // ==========================================================================================
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}/deleteOnemovie`, {
        data: { movie_id: id },
        headers: {
          auth: localStorage.getItem("token") || "",
        },
      });
      setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== id));
      fetchMovies();
      toast.success("Movie deleted");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete movie");
    }
  };

  // ==========================================================================================
  const handleEditSubmit = async () => {
    const data = new FormData();
    Object.entries(editData).forEach(([key, value]) =>
      data.append(key, value as string | Blob)
    );
    if (editData._id) data.append("movieId", editData._id);
    if (editImage) data.append("movieImage", editImage);

    try {
      await axios.put(`${BASE_URL}/updateMovie`, data, {
        headers: {
          auth: localStorage.getItem("token") || "",
        },
      });
      fetchMovies();
      setEditOpen(false);
      toast.success("Movie updated successfully");
    } catch (error) {
      console.error("Edit failed:", error);
      toast.error("Failed to update movie");
    }
  };
  // ==========================================================================================

  const handleEdit = (movie: Movie) => {
    setEditData(movie);
    setEditOpen(true);
  };

  // ==========================================================================================
  useEffect(() => {
    fetchMovies();
    setPage(1);
  }, [search, filterField, refreshTrigger]);

  return (
    <ContainerContext.Provider
      value={{
        uploadedFileName,
        setUploadedFileName,
        fileInputRef,
        handleEdit,
        filteredMovies,
        paginatedMovies,
        handleEditSubmit,
        handleDelete,
        handleSubmit,
        filterField,
        setFilterField,
        setMovies,
        movies,
        loading,
        setLoading,
        fetchMovies,
        formData,
        setFormData,
        imageFile,
        setImageFile,
        editImage,
        setEditImage,
        search,
        setSearch,
        editOpen,
        setEditOpen,
        editData,
        setEditData,
        page,
        setPage,
        rowsPerPage,
      }}
    >
      {props.children}
    </ContainerContext.Provider>
  );
}
