import { CircularProgress } from "@mui/material";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { ContainerContext } from "../context/MoviesContext";
import MovieEditModal from "../MovieEditModal/MovieEditModal";
import MoviesForm from "../MovieForm/MoviesForm";
import MovieSearchFilter from "../MovieSearchFilter/MovieSearchFilter";
import MovieTableContainer from "../MovieTableContainer/MovieTableContainer";
export default function MovieTable() {
  const { loading } = useContext(ContainerContext);

  return (
    <div className="p-4 space-y-6 max-w-7xl mx-auto text-center">
      <Toaster />
      <h1 className="text-4xl font-bold text-blue-700">Media Management: Movies & TV Shows</h1>
      <MoviesForm />

      <MovieSearchFilter />
      {loading ? (
        <div className="flex justify-center py-10">
          <CircularProgress />
        </div>
      ) : (
        <>
          <MovieTableContainer />
        </>
      )}
      <MovieEditModal />
    </div>
  );
}
