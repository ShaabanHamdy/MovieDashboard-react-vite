import {
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useContext } from "react";
import { ContainerContext } from "../context/MoviesContext";
import { type Movie } from "../types/movieType";

const MovieTableContainer = () => {
  const {
    handleEdit,
    filteredMovies,
    paginatedMovies,
    handleDelete,
    page,
    setPage,
    rowsPerPage,
  } = useContext(ContainerContext);

  return (
    <div className="w-full">
      {/* Responsive wrapper for horizontal scroll on small screens */}
      <div className="overflow-x-auto">
        <TableContainer component={Paper} className="shadow-lg min-w-[900px]">
          <Table>
            <TableHead className="bg-blue-100">
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Director</TableCell>
                <TableCell>Budget</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Year/Time</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedMovies.map((movie: Movie) => (
                <TableRow key={movie._id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex flex-col items-center space-y-1 w-24">
                      <img
                        className="w-16 h-16 object-cover rounded-md"
                        alt={movie.title}
                        src={`${movie.movieImage}`}

                      />
                      <span className="text-sm text-center break-words">
                        {movie.title}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{movie.type}</TableCell>
                  <TableCell>{movie.director}</TableCell>
                  <TableCell>{movie.budget}</TableCell>
                  <TableCell>{movie.location}</TableCell>
                  <TableCell>{movie.duration}</TableCell>
                  <TableCell>{movie.year}</TableCell>
                  <TableCell>
                    <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
                      <Button
                      sx={{ marginRight: "10px" }}
                        size="small"
                        variant="outlined"
                        onClick={() => handleEdit(movie)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(movie._id!)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <Pagination
          count={Math.ceil(filteredMovies.length / rowsPerPage)}
          page={page}
          onChange={(_event, value) => setPage(value)}
          color="primary"
        />
      </div>
    </div>
  );
};

export default MovieTableContainer;
